---
id: build-transaction-construction
title: 交易创建和签名
sidebar_label: 交易创建
---

這页将讨论 Polkadot 的交易格式以及如何创建、签名和提交交易。 与其它教程的页面一样，这一页展示了一些可用的工具。 **在整合时请前往每个工具的文档。**

## 交易格式

Polkadot 有一些所有交易的基本交易信息。

- 地址(Address)：发送帐户的 SS58 编码地址。
- 区块哈希(Block Hash)： [检查站](build-protocol-info#transaction-mortality) 区块。
- 区块编号(Block Number)：检查站区块的数量。
- 创世纪哈希 (Genesis Hash)：链的创世纪哈希。
- 元数据 (Metadata)：提交 runtime 的 SCALE 编码元数据。
- Nonce：此交易的nonce。
- Spec 版本：当前 runtime 的 spec 版本。
- 交易版本：交易格式的当前版本。
- 提示：提高交易优先级的[提示](build-protocol-info#fees)(可选项)。
- Era 阶段：检查站之后的有效交易的块数(可选项)。如果为零，则该交易[存续](build-protocol-info#transaction-mortality)。

从系统模块中查询的 nonce 不会考虑待处理的交易。如果您想要同时提交多个有效的交易，您必须跟踪并手动递增 nonce。

每个交易都有自己(与否)的参数添加。例如来自 Balances pallet 的 `transferKeepAlive`函数将需要：

- `dest`: 目标地址
- `#[compact] value`: 代币数量

一旦您有了必要的资料，您需要:

1. 创建未签名的交易
1. 创建签名的 payload。
1. payload 签名。
1. 将已签名的 payload 序列化为交易。
1. 提交序列化的交易。

Parity 提供了以下工具来帮助执行这些步骤。

## Polkadot-JS 工具

[Polkadot-JS 工具](https://github.com/polkadot-js/tools)包含一组用于与Substrate 客户端进行交互的命令行工具，包括一个用于创建，签名和广播交易的名为“ Signer CLI”的工具。

本示例将使用`signer submit`命令，该命令将创建并提交交易。 `signer sendOffline`命令具有完全相同的API，但不会广播交易。 `submit`和`sendOffline`必须连接到节点以获取当前元数据并构造一个有效交易。他们的 API 具有以下格式：

```bash
yarn run:signer <submit|sendOffline> --account <from-account-ss58> --ws <endpoint> <module.method> [param1] [...] [paramX]
```

签名:

```bash
yarn run:signer sign --account <from-account-ss58> --seed <seed> --type <sr25519|ed25519> <payload>
```

例如我们从 `121X5bEgTZcGQx5NZjwuTjqkoiG8B2wEAvrUFjuw24ZGZf2` 发送0.5 DOT 到 `15vrtLsCQF3qRYUcaEeh4JwepolNJkpsrqojqnZPc2y`

```bash
yarn run:signer submit --account 121X5bEgTZcGQx5NZjwuTjqqKoiG8B2wEAvrUFjuw24ZGZf2 --ws ws://127.0.0.1:9944 balances.transferKeepAlive 15vrtLsCQFG3qRYUcaEeeEih4JwepocNJHkpsrqojqnZPc2y 500000000000
```

这将返回 payload 签名和等待签名。 使用这个 payload 并使用 你的正常签名环境 (例如 airgapped 電腦、 VM 等) 签 payload：

```bash
yarn run:signer sign --account 121X5bEgTZcGQx5NZjwuTjqqKoiG8B2wEAvrUFjuw24ZGZf2 --seed "pulp gaze fuel ... mercy inherit equal" --type sr25519 0x040300ff4a83f1...a8239139ff3ff7c3f6
```

保存输出并将其带到您要广播的电脑，输入 `submit`'s 签名字段并发送交易(或如果使用 `sendOffline`，则只是退回 serialized 的交易)。

## Tx Wrapper

如果您不想使用 CLI 进行签名操作，Parity 提供了一个称为[TxWrapper](https://github.com/paritytech/txwrapper)的SDK，它可以离线生成和签名交易。请参阅[示例](https://github.com/paritytech/txwrapper/tree/master/examples)以获取指南。

**导入私钥:**

```ts
import { importPrivateKey } from '@substrate/txwrapper';

const keypair = importPrivateKey(“pulp gaze fuel ... mercy inherit equal”);
```

**从公钥中获取地址**

```ts
import { deriveAddress } from '@substrate/txwrapper';

// Public key, can be either hex string, or Uint8Array
const publicKey = “0x2ca17d26ca376087dc30ed52deb74bf0f64aca96fe78b05ec3e720a72adb1235”;
const address = deriveAddress(publicKey);
```

**离线构建交易**

```ts
import { methods } from "@substrate/txwrapper";

const unsigned = methods.balances.transferKeepAlive(
  {
    dest: "15vrtLsCQFG3qRYUcaEeeEih4JwepocNJHkpsrqojqnZPc2y",
    value: 500000000000,
  },
  {
    address: "121X5bEgTZcGQx5NZjwuTjqqKoiG8B2wEAvrUFjuw24ZGZf2",
    blockHash: "0x1fc7493f3c1e9ac758a183839906475f8363aafb1b1d3e910fe16fab4ae1b582",
    blockNumber: 4302222,
    genesisHash: "0xe3777fa922cafbff200cadeaea1a76bd7898ad5b89f7848999058b50e715f636",
    metadataRpc, // must import from client RPC call state_getMetadata
    nonce: 2,
    specVersion: 1019,
    tip: 0,
    eraPeriod: 64, // number of blocks from checkpoint that transaction is valid
    transactionVersion: 1,
  },
  {
    metadataRpc,
    registry, // Type registry
  }
);
```

**构建签名的 payload**

```ts
import { methods, createSigningPayload } from '@substrate/txwrapper';

// See "Construct a transaction offline" for "{...}"
const unsigned = methods.balances.transferKeepAlive({...}, {...}, {...});
const signingPayload = createSigningPayload(unsigned, { registry });
```

**对已签名的交易做序列化**

```ts
import { createSignedTx } from "@substrate/txwrapper";

// Example code, replace `signWithAlice` with actual remote signer.
// An example is given here:
// https://github.com/paritytech/txwrapper/blob/630c38d/examples/index.ts#L50-L68
const signature = await signWithAlice(signingPayload);
const signedTx = createSignedTx(unsigned, signature, { metadataRpc, registry });
```

**解析 payload 的类型**

您可能需要对 payload 进行解码，以在提交之前验证其内容。

```ts
import { decode } from "@substrate/txwrapper";

// Decode an unsigned tx
const txInfo = decode(unsigned, { metadataRpc, registry });

// Decode a signing payload
const txInfo = decode(signingPayload, { metadataRpc, registry });

// Decode a signed tx
const txInfo = decode(signedTx, { metadataRpc, registry });
```

**检查一笔交易的哈希值**

```ts
import { getTxHash } from ‘@substrate/txwrapper’;
const txHash = getTxHash(signedTx);
```

## 提交已签名的 Payload

有几种提交签名的 payload 的方法：

1. Signer CLI (`yarn run:signer submit --tx <signed-transaction> --ws <endpoint>`)
1. [Substrate API Sidecar](build-node-interaction#substrate-api-sidecar)
1. [RPC](build-node-interaction#polkadot-rpc)和`author_submitExtrinsic`或者 `author_submitAndWatchExtrinsic`，后者将使您订阅事件，并在交易得到验证且上链时得到事件的通知。

## 注意

在示例中使用的一些地址，请参阅[Subkey 文档](https://substrate.dev/docs/en/knowledgebase/integrate/subkey)。

```bash
$ subkey --network polkadot generate
Secret phrase `pulp gaze fuel ... mercy inherit equal` is account:
  Secret seed:      0x57450b3e09ba4598 ... ... ... ... ... ... ... .. 219756eeba80bb16
  Public key (hex): 0x2ca17d26ca376087dc30ed52deb74bf0f64aca96fe78b05ec3e720a72adb1235
  Account ID:       0x2ca17d26ca376087dc30ed52deb74bf0f64aca96fe78b05ec3e720a72adb1235
  SS58 Address:     121X5bEgTZcGQx5NZjwuTjqqKoiG8B2wEAvrUFjuw24ZGZf2

$ subkey --network polkadot generate
Secret phrase `exercise auction soft ... obey control easily` is account:
  Secret seed:      0x5f4bbb9fbb69261a ... ... ... ... ... ... ... .. 4691ed7d1130fbbd
  Public key (hex): 0xda04de6cd781c98acf0693dfb97c11011938ad22fcc476ed0089ac5aec3fe243
  Account ID:       0xda04de6cd781c98acf0693dfb97c11011938ad22fcc476ed0089ac5aec3fe243
  SS58 Address:     15vrtLsCQFG3qRYUcaEeeEih4JwepocNJHkpsrqojqnZPc2y
```
