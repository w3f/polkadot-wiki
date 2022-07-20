---
id: learn-transaction-fees
title: 交易费用
sidebar_label: 交易费用
---

区块链网络中的资源是有限的，例如存储和计算。交易费用是用来防止用户消耗太多资源。 Polkadot 使用基于权重的收费模式，而不是 gas-metering 模式。 因此在执行交易之前需要先收取费用；一旦费用支付，节点将执行交易。

[Web3 Foundation Research](https://research.web3.foundation/en/latest/polkadot/Token%20Economics.html) designed the Polkadot fee system with the following objectives:

- 每个中继链的区块链应该有效地处理从而被免延迟生成区块链。
- 中继链的增长率应该有界限。
- 每个区块都应有空间给特殊高优先的交易，例如不当行为报告。
- 该系统应能够处理需求激增的问题。
- 费用应缓慢变化，以便用户可以准确预测既定交易的费用。

## 费用计算

Polkadot 中继链的费用是根据以下四个参数计算的:

- 每字节费用 (亦称"长度费")
- 比重费用
- 小费(可选)

长度费是每字节的固定费用和交易的字节大小的结果。

Weights are a fixed number designed to manage the time it takes to validate a block. Each transaction has a base weight that accounts for the overhead of inclusion (e.g. signature verification) as well as a dispatch weight that accounts for the time to execute the transaction. The total weight is multiplied by a per-weight fee to calculate the transaction's weight fee.

小费是一种可选的交易费，用户可以添加来给予交易更优先的处理。

这四个费用共同构成了费用。在执行交易之前，将从用户的帐户中扣除这笔费用。一部分费用将给区块生成者，其余部分将流向[库房](learn-treasury)。在 Polkadot 的一开始阶段，该比例分别设置为 20％和 80％。

## 区块限制和交易优先

Polkadot 中的区块既有最大长度(字节)，也有最大比重。区块生产者将用这些限制填满交易到方块。每个区块的一部分―目前为 25%―保留给与该区块操作相关的重要交易。区块生产者将只能使用区块正常交易的 75%。一些操作交易例子：

- 错误报告
- 议会操作
- 选举中的成员操作(例如放弃候选人)

区块生产者根据每笔交易的总费用确定交易的优先次序。由于部分费用将给区块生产者，生产者将打包最高费用的交易，以获得最大回报。

## 费用调整

区块链上的交易量非常不正常，因此交易费用需要一种调整机制。然而，用户应该能够预测交易费用。

Polkadot 使用缓慢调整费用机制并提供小费来平衡这两个考虑。除了区块链*限制，* Polkadot 还有阻止填满的*目标。*根据当前区块相对于目标的充满度，下一个区块链的费用增加或减少。每次比重收费可在 24 小时内提高 30％，这个比率反映出需求的长期趋势， 为了考虑短期跳跃，Polkadot 在底线，字节和重量费用上使用小费。用户可以选择在收费中添加小费，给予交易更高的优先等级。

## 分片交易

在 Polkadot 的分片中进行的交易 - 平行链和对平行线程 - 不会引起中继链交易费用。 分片应用程序的用户甚至不需要持有 DOT， 因为每个分片都有自己的经济模式，可能有代币，也可能没有代币。 然而在有些情况下，这些人自己在中继链上进行交易。

[Parachains](learn-parachains) have a dedicated slot on the Relay Chain for execution, so their collators do not need to own DOT in order to include blocks. The parachain will make some transactions itself, for example, opening or closing an [XCMP](learn-xcm) channel, participating in an [auction](learn-auction) to renew its slot, or upgrading its runtime. Parachains have their own accounts on the Relay Chain and will need to use those funds to issue transactions on the parachain's behalf.

[Parathreads](learn-parathreads) will also make all the same transactions that a parachain might. In addition, the collators need to participate in an auction every block to progress their chain. The collators will need to have DOT to participate in these auctions.

## 其他资源限制策略

交易比重必须在执行前可以计算，因此只能是固定逻辑。有些交易需要通过其他策略限制资源。例如:

- 绑定(Bonds)：有些交易，如投票，有可能需要绑定保证金， 并在链上发生事件后退还或惩罚。 在投票的例子中，选举结束时返回，或者如果选民试图恶意行事，就会被惩罚。
- 存款(Deposits): 有些交易, 如设置[身份](learn-identity) 或认领索引, 无限期地使用存储空间。 如果用户决定释放存储空间，这些存款将会被退还。
- 烧毁(Burns)：交易可能会根据其内部逻辑烧毁资金。例如如果交易创建了新的存储，从而增加了状态容量，则交易可能会从用户那里烧毁资金。
- Limits: Some limits are part of the protocol. For example, nominators can only nominate 16 validators. This limits the complexity of [Phragmén](learn-phragmen).

## 进阶

此页面仅涵盖来自普通用户的交易。 不过，如果你看到區塊鏈浏览器的區块，你可能会看到一些"extrinsics"看起来与这些交易不同。 在 Polkadot (以及建立在 Substrate 上的任何链)中，extrinsic 在是一种来自链外的信息。 Extrinsics 可分为三类：

- 签名交易
- 无签名交易
- Inherents

此页面仅覆盖已签名的交易(signed transactions)，这是大多数用户与 Polkadot 互动的方式。 有签名的交易来自有资金的帐户，因此 Polkadot 可以收取交易费作为防止垃圾邮件的问题。

无签名的交易(unsigned transactions) 是指用户需要提交不控制资金的密钥对外在的特殊情况。 例如当用户在上线后 [领取他们的 DOT ](https://claims.polkadot.network) 他们的 DOT 地址还没有任何资金，因此是用了无签名的交易。验证人也会提交一些无签名的交易，其形式为 "heartbeat" 消息，表示它们在线。 这些 heartbeat 必须由验证人 [session keys 之一](learn-keys)签名。 Session keys 永远不会控制资金。 无签名的交易仅用于特殊情况，因为既然 Polkadot 无法为它们收取费用，每个交易需要自定义的验证逻辑。

最后，inherents 是没有签名或包含在交易队列中的信息。 因此，只有出块的人才能将固有的东西添加到区块中。 因为仅仅足够多的验证人已经同意它们是合理，就假定不信守者为 "真理"。 例如 Polkadot 区块包括固有的时间戳。 没有办法证明时间戳是真实的，可以证明有签字的资金的发出。 相反验证人根据他们认为时间戳的合理程度接受或拒绝区块。 在《Polkadot》中，它必须在他们自己的系统时钟的某个可接受范围之内。

## 了解更多

- [Web3 Foundation Research](https://research.web3.foundation/en/latest/polkadot/Token%20Economics.html#relay-chain-transaction-fees-and-per-block-transaction-limits)
- [Substrate Weights](https://substrate.dev/docs/en/knowledgebase/learn-substrate/weight)
- [Substrate 费用](https://substrate.dev/docs/en/knowledgebase/runtime/fees)
- [交易 (Extrinsics)](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics)
