---
id: maintain-errors
title: 出现错误如何解决
sidebar_label: 解决错误
---

Errors in Substrate-based chains are usually accompanied by descriptive messages. However, to read these messages, a tool parsing the blockchain data needs to request _chain metadata_ from a node. That metadata explains how to read the messages. One such tool with a built-in parser for chain metadata is the [Polkadot-JS Apps UI](https://polkadot.js.org/apps).

If this page does not answer your question, try searching for your problem at the [Polkadot Knowledge Base](https://support.polkadot.network/) for more information on troubleshooting your issue.

## PolkadotJS Apps 浏览器

Here's how to find out the detailed error description through Polkadot-JS Apps.

A typical failed transactions looks something like this:

![Error while sending a transaction](/img/errors/01.jpg)

The image displays only the error name as defined in the code, not its error message. Despite this error being rather self-explanatory, let's find its details.

In the [explorer tab](https://polkadot.js.org/apps/#/explorer), find the block in which this failure occured. Then, expand the `system.ExtrinsicFailed` frame:

![Error described](/img/errors/02.jpg)

Notice how the `details` field contains a human-readable description of the error. Most errors will have this, if looked up this way.

[This block](https://polkadot.js.org/apps/#/explorer/query/0xa10104ed21dfe409c7871a975155766c5dd97e1e2ac7faf3c90f1f8dca89104b) is a live example of the above.

If you cannot look up the error this way, or there is no message in the `details` field, consult the table below.

## Polkascan and Subscan

Polkascan and Subscan show the `ExtrinsicFailed` event when a transaction does not succeed ([example](https://polkascan.io/polkadot/event/2836233-3)). This event gives us the `error` and `index` indices of the error but does not give us a nice message to understand what it means. We will look up the error in the codebase ourselves to understand what went wrong.

First, we should understand that the `index` number is the index of the pallet in the runtime from which the error originated. The `error` is likewise the index of that pallet's errors which is the exact one we're looking for. Both of these indices start counting from 0.

For example, if `index` is 5 and `error` is 3, as in the example linked above, we need to look at the runtime for the fourth error (index 3) in the sixth pallet (index 5).

By looking at the [runtime code](https://github.com/paritytech/polkadot/blob/master/runtime/polkadot/src/lib.rs#L914) we see that the pallet at index 5 is "Balances". Now we will check the Balances pallet's code which is hosted in the Substrate repository, and look for the fourth error in the Error enum. According to [its source](https://github.com/paritytech/substrate/blob/master/frame/balances/src/lib.rs#L270) the error that we got is `InsufficientBalance` or in other words "Balance too low to send value".

## Common Errors

The table below lists the most commonly encountered errors and ways to resolve them.

| 錯誤                 | 描述                                     | 解决方案                                                                                                                          |
| ------------------ | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| BadOrigin          | 不允许您执行此操作，例如尝试使用非议会帐户创建议会动议。           | 要么切换到具有必要权限的帐户，要么检查您试图执行的操作是否被允许(例如调用 `system.setCode` 直接进行 runtime 升级，无需通过投票)。                                               |
| BadProof           | 交易签名似乎无效。                              | 您所连接的节点可能会跟随一个过时的分叉—通常待它同步好后再次尝试问题会被解决。 要检查更大的问题，检查您所连接的节点的最后一个最终确定了和当前最佳的区块，并将这些值与其他公开的节点数据进行比较 - 它们是否在同步？ 如果没有，请尝试连接到另一个节点。 |
| Future             | 交易 nonce 太高。                           | 减少 nonce 为当前 +1。检查您正在使用的发送交易的地址。                                                                                              |
| Stale              | 交易 nonce 太低。                           | 将当前的 nonce +1。检查您正在使用发送交易地址的 nonce。                                                                                           |
| ExhaustsResources  | 当前的区块没有足够的资源来提交这笔交易。                   | 请在下一个区块中再试一次。                                                                                                                 |
| Payment            | 无法支付交易费用。                              | 您可能没有足够可用的余额来支付这笔交易所需的费用。                                                                                                     |
| Temporarily banned | The transaction is temporarily banned. | The tx is already in pool. Either try on a different node, or wait to see if the initial transaction goes through.            |
