---
id: learn-parathreads
title: 平行线程
sidebar_label: 平行线程
---

平行线程的想法是样平行链暂时(按每个区块)使用 Polkadot 的安全性而不用租用专用的平行链链插槽。这是通过在众多资源竞争(平行线程)之间经济共享稀缺的_平行链插槽_资源来实现。那些无法获取整个平利链插槽或认为在经济上不合理的链仍然能够参与 Polkadot 的共享安全 - 尽管按每个区块需要的收取相关费用。它还为不再需要使用平行链插槽，但希望继续使用中继链的链提供了良好的脱链过程。

## 起源

根据在成都的[演讲](https://v.douyu.com/show/a4Jj7llO5q47Dk01)，这个想法的起源于于80年代末和90年代早期个人电脑上有限的内存资源概念类似。由于计算机上的内存记忆体资源有限，当某个程序需要更多内存时，计算机可以在硬盘通过使用_交换空间_创建虚拟记数亿体。交换空间允许计算机内存量扩大，权衡取舍并供更多程序同时运行，某些程序需要更长的时间才能完成。

## 平行线程 vs. 平行链

平行链和平行线程在开发方面很相似。可以想象使用 Substrate 开发的链其生命周期不同时间上采取以下三种状态之一：1) 带有安全转接桥的独立链 2) 平行链或 3) 平行线程因为更多差别是在经济上的区别而不是技术上，所以它可以帮助开发者用最小工夫在这两个状态之间切换。

平行线程有着跟平行链连接 Polkadot 一样的好处。换句话说通过 ICMP 并受 Polkadot 验证人全面的经济安全保护发送信息到其它平行{链, 线程}。

The difference between parachains and parathreads is economic. Parachains must be registered through a normal means of Polkadot, i.e. governance proposal or parachain slot auction. Parathreads have a fixed fee for registration that would realistically be much lower than the cost of acquiring a parachain slot. Similarly to how DOT are locked for the duration of parachain slots and then returned to the winner of the auction, the deposit for a parathread will be returned to the parathread after the conclusion of its term.

除了将平行线程代码注册到 Polkadot 中继链之外，注册平行线程不提供任何保证。当平行线程产生新的区块时，使用方必须支付费用参加每个区块链的拍卖，以使包含在下一个验证的中继链区块。所有已注册的平行线程都将参与拍卖，使将包含其平行线程。

有两个关于平行线程的有趣发现。第一，由于它们是逐个区块竞争，这跟比特币和以太坊处理交易相似。同样将会开发费用市场，意味着当繁忙时间使用平行线程，价格将推高，而较少人使用的时侯，费用将会较低。第二，这种机制与平行链机制明显不同，后者只要持有平行链槽保证可用，而注册平行线程没有给予此权利。

## 平行线程将如何运作？

中继链上的部分平行链槽将被指定为平行线程池的一部分。换句话说某些插槽将没有附上平行链，而是将被用作拍卖平行线程候选区块的空间，供每个区块获胜者使用。

Collators will offer a bid designated in DOT for inclusion of a parathread block candidate. The Relay Chain block author is able to select from these bids to include a parathread block. The obvious incentive is for them to accept the block candidate with the highest bid, which would bring them the most profit. The tokens from the parathread bids will likely be split 80-20, meaning that 80% goes into Polkadot treasury and 20% goes to the block author. This is the same split that applies also to transaction fees and, like many other parameters in Polkadot, can be changed through a governance mechanism.

有关平行线程协议的详细说明，请参见[此处](https://hackmd.io/UcOOzoyDR9WJpQBZICtg3Q?both#Parathread-Protocol)。

## 平行线程经济学

有两种补偿收集人的来源：

1. Assuming a parathread has its own local token system, it pays the collators from the transaction fees in its local token. If the parathread does not implement a local token, or its local token has no value (e.g. it is used only for governance), then it can use DOT to incentivize collators.
2. 平行线程协议补贴。平行线程可以创建新代币，为收集人提供额外的奖励。 或许为平行线程创建代币的数量将是按时间函数決定。 包含在中继链中的平行线程区块传递的时间愈多，平行线程愿意补贴的代币越多使區塊被寫入的機會提高。 创建币过程的具体实施可以是通过本地的通胀或通过国库等资金储备。

收集人可能会收取该平行线程的币作支付。但是中继链仅接收 Polkadot  (DOT) 进行交易。收集人必须提交所有出价的候选区块以 DOT 表示，这意味着如果平行线程提供本地币，收集人将需要了解此币与 DOT 之间的汇率，以便在中继链上放置适当的 DOT 出价并确保它们获利。

## 平行链插槽交换

It will be possible for a parachain that holds a parachain slot to swap this slot with a parathread so that the parathread "upgrades" to a full parachain and the parachain becomes a parathread. The chain can also stop being a chain and continue as a thread without swapping the slot. The slot, if unoccupied, would be [auctioned off in the next auction period](learn-auction).

This provides a graceful off-ramp for parachains that have reached the end of their lease and do not have sufficient usage to justify renewal; they can remain registered on the Relay Chain but only produce new blocks when they need to.

Parathreads help ease the sharp stop of the parachain slot term by allowing parachains that are still doing something useful to produce blocks, even if it is no longer economically viable to rent a parachain slot.

The off-boarding is always in the following order: Parachain -> Parathread -> Dormant thread. This process is not automatic due to a thread requiring a deposit, so an expired parachain will skip right to _dormant thread_ if for some reason there isn't a single operational entity of that chain left (no sudo or member of democracy to make that deposit).

When going dormant, the ParaId and the original genesis, as well as all the historically finalized blocks stay on the Relay Chain, so a dormant thread or chain can continue where it left off if it rebuilds its community and gathers the necessary funds for a new lease or parathread deposit.
