---
id: learn-accounts
title: Polkadot 账户
sidebar_label: Polkadot 账户
description: 账户、账户索引、账户身份和回收机制的解释
---

本文档涵盖 Polkadot 和 Kusama 账户的基本地址及其在链上的保存。 欲了解更多关于加密技术背后的详细解释，请参阅 [加密页面](learn-cryptography)。

## 地址格式

The address format used in Substrate-based chains is SS58. SS58 is a modification of Base-58-check from Bitcoin with some minor modifications. Notably, the format contains an _address type_ prefix that identifies an address as belonging to a specific network.

例如:

- Polkadot 地址总是以数字1开头。
- Kusama 地址总是以大写字母开头，如C、D、F、G、H、J...
- 通用Substrate 地址以5开头。

这些前缀在[此处](https://github.com/paritytech/substrate/wiki/External-Address-Format-(SS58))定义。

重要的是要理解：不同网络的不同地址格式仅仅是由地址生成工具生成的公私钥对中同一公钥的不同表示形式（见下一节）。 这使得只要您转换格式，地址即可跨Substrate-chain 兼容。

### 您可能会好奇：前缀的设计机制

[SS58 文档](https://github.com/paritytech/substrate/wiki/External-Address-Format-(SS58)) 如此阐述：

- Polkadot 地址类型为 `000000b`, 所以十进制为 `0`。
- Kusama (Polkadot 金丝雀) 的地址类型是 `00000010b`, 所以十进制为 `2`。
- 通用的 Substrate 地址类型为 `001010b` ，即是 `42`。

因为 Base58-check 字母没有数字0，其最低值是1。所以 `000000b` 在 Base58-check 中是1。 如果我们试图 [解码](https://www.better-converter.com/Encoders-Decoders/Base58Check-to-Hexadecimal-Decoder) Polkadot 地址如 `1FRMM8PEiWXYax7rpS6X4ZX1aAAAx1CrKTyrVYhV24fg`, 结果为 `000aff6865635ae11013a83835c019d44ec3f865145943f487ae82a8e7bed3a66b29d7`，其第一个字节是 `00`，这确实是二进制 `00000000` 或十进制 `0`，因此符合 Polkadot 的地址类型。

让我们看看 Substrate 地址。如果我们解码 `5CK8D1sKNwF473wbuBP6NuhQfPaWUetNsWUNAAzVwTfxqjfr`, 我们得到 `2a0aff6865635ae11013a83835c019d44ec3f865145943f487ae82a8e7bed3a66b77e5`，其第一个字节为 `2a`， 当其 [从十六进制转换为十进制](https://www.rapidtables.com/convert/number/hex-to-decimal.html) 时为42。 42 二进制表示为 `00101010`，刚好如 SS58 文档所述。

最后，请看一下 Kusama 地址。 解码 `CpjsLDC1JFyrhm3ftC9Gs4QoyrkHKhZKtK7YqGTRFtTafgp` 得到 `020aff686565635ae11013a83835c019d44ec3f865145943f487ae82a8e7bed3a66b0985` ，其第一个字节为 `02`，正如文档指定。 如果我们尝试用其它字母开头的 Kusama 地址，如 `J4iggBtsWsb61RemU2TDWDXTNHqHNfBSAkGvVZBtn1AJV1a`, 我们仍然得到 `02` 作为第一字节： `02f2d606a67f58fa0b3ad2b556195a0ef905676efd4e3ec62f8fa1b8461355f1142509`。这似乎反直觉，有些地址总是有相同的前缀，而有些地址如 Kusama 可能会有很大变化。 但它只是 Base58-check 编码的一个小特点。

## 获取和管理地址

**最方便用户的** 方式创建一个 Kusama 地址是使用 [Polkadot JS UI](https://polkadot.js.org/apps/#/accounts)的。 记住要备份用于生成您账户的助记词——账户只保存在您的浏览器中，因此清理缓存也会清除您的帐户。之后您必须使用用户界面给您的助记词重新创建账户——这也将恢复您以前持有的所有余额。

一个 **更方便和推荐的** 保存您计算机上的帐户的方法是使用 [PolkadotJS 扩展程序](https://github.com/polkadot-js/extension)。 此扩展程序允许您清理浏览器缓存的同时保存您的帐户。 然而，也不要忘记备份你的助记词，如果你失去了对这台计算机的访问， 或者扩展程序在某种程度上崩溃无法修复，您还是会用到助记词。

请注意，由于您的帐户保存在浏览器中，所以它对于大持仓量账户并不安全。浏览器是一个“热钱包”，顾名思义，它容易受到各种攻击。 在处理大量金额时，请使用冷钱包。 创建冷钱包也很简单，只要安全地把你的账户的助记词删除，并从你的计算机中移除该帐户的所有痕迹。

除了扩展和默认的 UI之外、Polkadot 和 Kusama 地址还可以使用 [Subkey 工具](https://github.com/paritytech/substrate/tree/master/bin/utils/subkey)创建。 Subkey 是为熟悉命令行的用户提供的，而且看起来可能会吓人，但很容易上手。 按照 [此页面](https://substrate.dev/docs/en/ecosystem/subkey)中的说明操作。 使用得当的话，Subkey 是 **最安全的** 创建账户的方法。

另外还有一个很安全的 [Parity Signer](https://www.parity.io/signer/) ，但它当前只支持Kusama 地址，不支持 Polkadot 和通用 Substrate 地址。

或者，你可能在 [Polkaproject.com 页面](http://www.polkaproject.com/) 上找到一些钱包。 但牢记这些是 **未经审核的** ，除非另有说明，否则不正式隶属于Web3 基金会或Polkadot项目。

整合 [Ledger](https://ledger.com) 的硬件钱包即将面世。

## 账户保证金和账户回收

When you generate an account (address), you only generate a _key_ that lets you access it. The account does not exist yet on-chain. For that, it needs the existential deposit - 0.01 KSM / DOT. This deposit is paid by the account sending you tokens. The one "creating" you pays for your creation.

余额低于0.01会导致帐户 _被回收_。您的帐户将从区块链状态中删除以保持空间。 只要您有私钥或助记词，您就不会失去访问该地址的权限。 您仍然可以使用该地址 - 但它需要另一个拥有存款的账户来充值才能与链交互。

对于账户保证金还有另外一种理解方式。您是否留意过Windows上的 `Thumbs.db` 文件或 Mac 上的 `.DS_Store` 文件？那些都是垃圾文件，他们除了让文件预览速度更快一点之外毫无用处。如果一个文件夹除此文件外没有其它内容，您就可以将该文件夹删掉以清理磁盘空间。这并不意味着您永远失去了该文件夹的访问 —— 您可以随时重建该文件夹，因为您拥有 _密钥_，毕竟您是计算机的主人。它只是意味着您需要保持电脑整洁直到哪天您再次用到那个文件夹时再重新创建它。您的地址就像这个文件夹——它空无一物时从链上删除，但拥有保证金后被重建。

## 账户索引（Indices）

Kusama地址可以有一个索引。一个索引就像一个简短易读版本的地址。

索引按顺序排列。可以认为他们是像从0到任意数量的槽位：

`[0][1][2][3][4][5][6]...`

如果插槽0-2分别以地址A、B和C填充。 此时我为地址X存入保证金，该地址将自动放入插槽3。 此后，您可以通过转账给 `[3]` 来向我转钱，而不用记住我的整个地址。

```js
[0][1][2][3][4][5][6]...
[A][B][C][X][ ][ ][ ]...
```

但如果一个帐户如上文所述的那样被回收，那会怎样呢？ 在这种情况下，索引会被清空。换言之，这个插槽会再次腾出。 如果有人创建一个新帐户，他们最终可能会使用他人以前使用的一个索引。

因为账户索引的这种不确定性，它们 **或许不会出现** 在Polkadot主网上。

## 账户身份（Identities）

Kusama 网络上的 _身份_ 允许用户将上链元数据附加到他们的账户。 这个元数据可以由独立的登记员核实，以提供可信度。 了解更多关于如何设置或发布身份的信息，如何定义子账户， 或者如何成为登记员，请阅读 [本指南](learn-identity)。

## 多签名账户

可以在基于 Substrate 的链中创建多重签名帐户。 多重签名帐户由一个或多个地址和一个阈值组成。 阈值定义了多少签名者(参与地址)需要同意外部提交才能成功进行呼叫。

For example, Alice, Bob, and Charlie set up a multi-sig with a threshold of 2. This means Alice and Bob can execute any call even if Charlie disagrees with it. Likewise, Charlie and Bob can execute any call without Alice. A threshold is typically a number smaller than the total number of members but can also be equal to it, which means they all have to be in agreement.

多签名账户有以下几种用途：

- 确保您自己的藏匿状态L 使用额外的签名作为一个2FA 机制来获取您的资金。 一个 签名者可以在一台电脑上，另一台可以在另一台电脑上，或者在冷钱包中。 这减慢了您与链的互动，但是更加安全。
- 董事会决定：商业和基金会等法律实体利用多种方式集体对该实体的财政实行管理。
- 群组参与治理：多个账户可以做任何正常账户。多账户可以是 Kusama 治理中的一个理事会成员，在那里一组社区成员可以作为一个实体投票。

Multi-signature accounts **cannot be modified after being created**. Changing the set of members or altering the threshold is not possible and instead requires the dissolution of the current multi-sig and creation of a new one. As such, multi-sig account addresses are **deterministic**, i.e. you can always calculate the address of a multi-sig just by knowing the members and the threshold, without the account existing yet. This means one can send tokens to an address that does not exist yet, and if the entities designated as the recipients come together in a new multi-sig under a matching threshold, they will immediately have access to these tokens. Calculating the address of a multi-sig deterministically can be done in TypeScript like so:

```js
rawAddress(addresses: string[], threshold: number) {
    const addr = [...addresses]
    addr.sort()
    const prefix = 'modlpy/utilisuba'
    const payload = new Uint8Array(prefix.length + 1 + 32 * addresses.length + 2)
    payload.set(Array.from(prefix).map(c => c.charCodeAt(0)), 0)
    payload[prefix.length] = addresses.length << 2;
    addr.forEach((addr, idx) => {
        const decoded = decodeAddress(addr);
        payload.set(decoded, prefix.length + 1 + idx * 32)
    })
    payload[prefix.length + 1 + 32 * addresses.length] = threshold

    return blake2AsU8a(payload)
},
address(addresses: string[], threshold: number, ss58prefix?: number) {
    const hashed = this.rawAddress(addresses, threshold)
    return encodeAddress(hashed, ss58prefix)
}

const multiSigAddress = address(addresses, 2);
```

Polkadot JS Apps 用户界面还支持多签名帐户，如[Account Generate 页面](learn-account-generation#multi-signature-accounts)。这比手动更容易生成。
