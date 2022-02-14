---
id: build-wallet-integration
title: Wallet integration
sidebar_label: Wallet integration
---

```
+--------------------+
|                    |
| Substrate/Polkadot |
|                    |
+---------+----------+
          |
          |
 +--------+---------+
 |                  |
 | Client interface |
 |                  |
 | +--------------+ |
 | | Client DB    | |
 | +--------------+ |
 |                  |
 +--------+---------+
          |
          |
 +--------+---------+
 |                  |
 |  Wallet backend  |
 |                  |
 +------------------+
```

## 1. 追踪链头

通过监察 `chain_subscribeFinalizedHeads` RPC (或轮询 `chain_getFinalizedHead` RPC 跟踪每个确认了的区块。

这将会提供一列最新确认了的区块头。

当新哈希到达，你可以使用 `chain_getBlock` 把该哈希变成区块。

如果新区块不是您处理的最后区块的直接子代，确保迭代它们之间的所有区块。因为 `chain_getBlock` 只接受哈希，所以你需要使用 ` chain_getBlockHash` 把那些数字转换成哈希并以这种方式在任意两个最终区块之间迭代。

## 2. 解码区块

您需要将基本数据的区块解码为有用的字段。

所有区块数据是使用基本 SCALE 编码数据，详细资料[在此](https://substrate.dev/docs/en/overview/low-level-data-format)。但是 SCALE 仅提供底层格式，它的字段和内部结构的详细信息可能会在不同链甚至在同一链不同区块之间改变。

对于 Polkadot 一开始，区块头格式为五字段结构：

```
struct Block:
    parent_hash: Hash
    number: Compact Number
    state_root: Hash
    extrinsics_root: Hash
    digest: Vec<DigestItem>
    extrinsics: Vec<Extrinsic>
```

这依赖于 `Hash`，固定长度的 32 字节值或在 SCALE `[u8; 32]`。它还依赖`DigestItem` (枚举类型):

```
enum DigestItem:
    ChangesTrieRoot: Hash
    PreRuntime: ConsensusItem
    Consensus: ConsensusItem
    Seal: ConsensusItem
    Other: Vec<u8>
struct ConsensusItem:
    id: [u8; 4]
    data: Vec<u8>
```

它还依赖于 `外部交易(Extrinsic)`。*外部交易*是概括了一般和其他(未签名)外部信息的交易。它是种高度可扩展的类型，本身没有固定格式。为了确保将来格式的兼容性，可以通过 RPC `state_getMetadata` 提供外部有关格式的元数据。

元数据本身以 SCALE 编码提供，其格式为：

```
struct Metadata:
    magic: u32
    version: u8
    modules: Vec<Module>
struct Module:
    name: String
    prefix: String
    storage: Option Vec<Storage>
    calls: Option Vec<Call>
    events: Option Vec<Event>
    constants: Vec<Constant>
enum StorageHasher:
    Blake2_128
    Blake2_256
    Twox128
    Twox256
    Twox64Concat
struct Constant:
    name: String
    type: Type
    value: Vec<u8>
    documentation: Vec<String>
struct Storage:
    name: String
    modifier: StorageModifier
    type: StorageType
    default: Vec<u8>
    documentation: Vec<String>
enum StorageModifier:
    Optional
    Default
enum StorageType:
    Plain: Type
    Map: StorageMapType
    DoubleMap: StorageDoubleMapType
struct StorageMapType:
    hasher: StorageHasher
    key: Type
    value: Type
    iterable: bool
struct StorageDoubleMapType:
    hasher: StorageHasher
    first_key: Type
    second_key: Type
    value: Type
    iterable: bool
struct Call:
    name: String
    arguments: Vec<CallArg>
    documentation: Vec<String>
struct CallArg:
    name: String
    type: Type
struct Event:
    name: String
    arguments: Vec<Type>
    documentation: Vec<String>
```

`Type`只是`String`，但是字符串的内容将被解释为类型的名称。

Substrate 链(实际上 Substrte 链是使用 SRML 构建) 例如 Polkadot 是由不同*模块*组成。每个模块可以想象有点像智能合，有各种交易(或 Substrate 术语，_外部交易_)，数据会持续在交易和区块, 事件和常量参数之间。元数据对所有东西进行编码，允许客户端代码创建特定的交易或解释链上发生了什么，甚至在不同的 Substrate 链之间或同一链不同升级或分叉之间。

There are two modules a wallet needs to be aware of: Balances and Indices. Balances allows you to send and receive funds between different accounts. Indices allows you to interpret user addresses.

## 3. 处理 SS58 和帐户地址

在 Polkadot (和大多数 Substrate 链)中，用户帐户由 32 字节(256 位)的 AccountId 识别。这只是 Substrate 使用的 x25519 加密的公钥。

但是为了使地址细小，我们为 Polkadot 上余额大于零的帐户编制索引，并仅使用此*索引*来标识该帐户。该索引比 32 字节长的 _AccountId_ 细小多个，通常仅用几个字节进行编码 。

Where Bitcoin has the Check58 address format and Ethereum used the `0x...` hex format, Polkadot (and Substrate) use the SS58 address format. This is a broad "meta-format" designed to handle many different cryptographies and chains. It has much in common with Bitcoin's Check58 format such as a version prefix, a hash-based checksum suffix and base-58 encoding. Further information on it can be found here [TODO]. Of the many supported "version codes", only one particular family of subformats is especially important for Polkadot support in wallets.

SS58 格式是版本前缀(对于 Polkadot 为一个字节，并总是为`0x00`，而 Kusama 为`0x02`)的 base-58 编码(使用与比特币相同的字母)，后跟一个或多个有效载荷字节，并以一个或多个校验字节结尾:

`0x00 <payload bytes> <checksum bytes>`

**地址的长度没有固定长度。**根据长度，有效负载可能具有不同的含义，并且有效负载与校验和字节的比率可能不同。下面是一个表，用于参考如何解释特定大小的地址:

| Total bytes | Version bytes | Payload bytes | Checksum bytes | Payload type |
| ----------- | ------------- | ------------- | -------------- | ------------ |
| 3           | 1             | 1             | 1              | Index        |
| 4           | 1             | 2             | 1              | Index        |
| 6           | 1             | 4             | 1              | Index        |
| 35          | 1             | 32            | 2              | AccountId    |

注意: 此表仅包含最常见的组合。SS58 包括几个更不常见的。为了达到最大的兼容性，然后根据完整的 SS58 规范实现。

一旦解码为字段，则应检查版本为`0x00`。然后应验证 checksum 是否等于 SS58 数据的 Blake2-256 哈希的开头，不包括 checksum 本身。如果 checksum 是一个字节，则检查哈希的第一个字节。如果是两个字节，则检查哈希的前两个字节。

最后在使用索引地址的情况下，索引应解码为 32 字节的帐户标识符。这可以通过检查 Indices 模块的存储来实现。

### 查找索引

查找索引有点麻烦，因为涉及查找存储，解码和解释。

我们关心的特定存储是`Indices`模块中的`EnumSet`。通过`state_getStorage` RPC 检查存储，必须向其提供密钥。该键对整个"查询"进行编码。通常应咨询元数据如何生成密钥。为此我们首先找到名称为`Indices`的` 模块`，然后在` Storage 模块中` `storage `字段中找到，名称为`EnumSet`。此项包含我们构造和解释查询所需的所有信息。

对于 Polkadot 我们发现该项目的`type`为`Map`，其关联值为`StorageMapType`，其`hasher`为 `Blake2_256`，其`key`是`T:: AccountIndex`(对于 Polkadot 来说是`u32`)，并且其`value`为`Vec<T::AccountId> `。

这意味着如果我们的索引由 SCALE 编码为`u32`为`<INDEX>`，那么我们的存储键是通过字符串`Indices EnumSet <INDEX>`的 Blake2 256 哈希确定。 实际上帐户是按 64 个批次存储的，因此要查找特定的索引，我们不按帐户索引查询，而是按其批次的索引查询，这只是意味着我们首先需要在编码之前将索引除以 64。

这会返回 SCALE-encoded `Vec<T::AccountId>` (`T::AccountId` 可能在 SCALE 定义为 `[u8; 32]` 或固定 32 字节数量) 包含我们感兴趣帐户的批次。要获取`AccountId`项，只需从向量中获取第`index％64`项。如果该项目不存在（或您得到一个空的存储)，则帐户索引无效。

否则您将拥有您的帐户 ID，并且可以将其及其标识和显示余额给用户。

## 4. 处理余额

在 Polkadot 中，帳戶结余可以在`Balances`模块内使用元数据的方式查找帐户索引查询被锁上的结余。在这种情况下我们需要查询存储中的`FreeBalance`。这里`StorageMapType`很相似，不同之处在于`key`的类型为`T::AccountId`(32 字节)和`value`是`BalanceOf<T>`，就 Polkadot 而言，它是`u128`(128 位值)。哈希函数与 Blake2 256 相同，因此完整的存储密钥将由字符串`Balances FreeBalance<ID>`的 Blake2 256 哈希给出，其中`<ID>`是 32 字节的`AccountId`。

注意: `FreeBalance`是该帐户控制的总余额，但没有考虑暂时锁定的部分，例如抵押中，投票或归属而锁定的部分。这些信息可以从链中查询，但不在本文档的范围之内。

DOT 代币结余将编码为 12 个数位。要获得 DOT 的实际数量，您需要将 128 位余额除以 1,000,000,000,000(10 \*\* 12)。 为了完整起见，Polkadot 的货币面额为:

| 余额值 | 名称      |
| ------ | --------- |
|        |           |
| 1      | Planck 10 |

**3 | Point 10**6 | Microdot (UDOT) 10**9 | Millidot (MDOT) 10**12 | Dot (DOT) 10\*\*15 | Blob

### 转移余额

要转移余额，必须准备和发送交易。在准备交易时，有两个关键部分: 一般交易部分和模块特定的交易`功能`部分通常需要来自链元数据的信息。

通常 Polkadot 的交易在 SCALE 中编码为 _signed_`Extrinsics`。为了便于之后兼容，外在进行双编码，因此初始编码将传回 SCALE（作为`Vec<u8>`）并输出使用的。这样做的效果是向它添加一个小长度前缀，使无法解释事务数据本身的系统仍然能够将它们传递为不透明的数据包。

The SCALE format is given by `Extrinsic`:

```
struct Extrinsic:
    tx: Option TransactionInfo
    function: Function
struct TransactionInfo:
    sender: Address
    sig: [u8; 64]
    era: Era
    nonce: Compact Nonce
    tip: Compact Balance
struct TransactionPayload:
    function: Function
    era: Era
    nonce: Nonce
    tip: Balance
    checkpoint_hash: Hash
```

对于交易，使用可选的`tx`。`Address`类型是经过特殊编码的 SCALE 类型，允许将帐户显示为帐户索引或 32 字节帐户 ID，以较方便的方式显示。格式在 SCALE [TODO] 中进行了说明。假设您希望提供一个 32 字节的帐户 ID，则只需在`0xff`字节前面添加前缀，就可以将其表示为`Address`。

`sig`字段必须包含 SCALE 编码的`SigPayload`的 25519 系列签名。 用于对负载进行签名的密钥必须与`sender`帐户相对应。 建议使用 Schnorr / Ristretto 25519("sr25519")签名格式。

Era is a one or two byte item, again with a special SCALE encoding format and it encodes the period (as a range of blocks) for which this transaction should be considered valid. It is an important safeguard against certain transaction replay attacks and should generally be used, however a simple wallet implementation that has no plans to reuse accounts after they become empty could ignore it. To ignore it and make the transaction "immortal", use an encoded `Era` of just one byte: `0x00`. However, if an account is removed from storage and a user re-funds an address, then previous immortal transactions could be replayed. Therefore, you may want to prevent account reaping and use mortal transactions to be safe.

随机数到目前为止，由发送人帐户发送的交易数量，就像在以太坊中一样。 它是`Nonce`类型，在逻辑上等效于`u64`。 为了获得正确的值，必须查询适当的存储，就像查询帐户余额时一样。 在这种情况下，它是`System`模块的`AccountNonce`。 因此所需的存储密钥是字符串` System AccountNonce<ID>`的 Blake2 256 哈希，其中`<ID>`是 32 字节的`AccountId`。 它将返回一个`Nonce`，可以在此处对其进行解码和使用。

注意: 从存储中检索的 nonce 没考虑*待处理*交易。如果您从一个帐户发送多个交易，则需要手动递增和跟踪此值。

`tip`是`Balance`(在逻辑上等同于 SCALE 中的`u128`类型)，它表示在繁忙的时候，为优先包含创建区块者支付一些额外费用。通常为零。

`checkpoint_hash`是 "区块检查点"的哈希，也就是说`era`字段指定的纪元的第一个区块。 如果只是使交易"immortal"，则应使用区块链的创始哈希。 这可以通过 RPC ` chain_getBlockHash(0)`确定。

最后 `function`是`Function`类型(在某些情况下有时称为`Call`或`Proposal`)，它描述了应该采取什么行动。它必须根据元数据构造。 在这种情况下，我们希望交易在`Balances`模块中实现`transfer`功能，以将余额从一个帐户转移到另一个帐户。 在模块列表中检查余额模块本身的索引很重要。 在这种情况下，它是第六项或索引 5。还需要检查元数据中余额`Module`的`calls`字段，并确定其中的索引转移功能。它在列表中排在第一位，因此索引为 0。

最后我们需要知道该函数需要哪些参数才能创建其余的交易。这在我们刚刚找到的元数据的`Call`项中提供。预期有两个参数：

- `dest` with a type of `<T::Lookup as StaticLookup>::Source` (aka `Address`); and
- `value` with a type of `Compact<T::Balance>` (aka `Compact Balance`).

在这种情况下 `函数` \* \* (即专门针对并且仅适用于 Polkadot 上的余额转帐交易) 将是以下结构：

```
struct BalanceTransferFunction:
    module_index: u8
    call_index: u8
    dest: Address
    value: Compact Balance
```

其中`module_index`是`0x05`，而`call_index`是`0x00`。`dest`与`sender`类似，可以作为帐户索引或 32 字节帐户 ID 提供，以较方便为准。如果提供帐户 ID，则只需在其前面加上字节`0xff`即可将其成为地址。

转帐的金额(不包括付给系统的任何费用)由`value`给出，并且必须是 SCALE compact 编码的数字。

### 提交和检查交易

一旦交易准备好，您将需要将其提交以包含在链中，并最终想要验证它是否真的包含在链中。

可以通过两种方式完成: 一种是使用简单 RPC `author_submitExtrinsic`，它将回传交易的哈希值。 提交后您可以继续手动检查交易是否在已确认的区块内(因为您都已经跟踪已确认的区块头)，直到看到您提交的交易为止，此时您知道交易已在链中。

另一种方法是使用 pub/sub RPC `author_submitAndWatchExtrinsic`。您同样提供 SCALE 编码的交易，但是在这里您会收到 subscription ID。 当交易被验证，广播并通过单独推送的消息包含在链中时，将通过 RPC 通知您。

## 总结

文章到此结束。在这里，您应该知道如何与 Substrate/Polkadot 节点进行交互，以便跟踪最终确定的链头、解码 SS58 地址、检查账户信息(如 balances & nonces) 以及构建、提交和跟踪交易。您还了解了 SCALE 编码器、Substrate 元数据系统以及如何构建面向未来的通用 Substrate 系统。

如果你有任何问题，请在 [Substrate Technical](https://area51.stackexchange.com/proposals/126136/substrate) 问。

_最初版本发布在[此处](https://hackmd.io/@gavwood/r1jTRX2Zr)。_
