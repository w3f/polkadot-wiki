---
id: learn-parathreads
title: 平行线程
sidebar_label: 平行线程
---

Parathreads are an idea for parachains to temporarily participate (on a block by block basis) in Polkadot security without needing to lease a dedicated parachain slot. This is done through economically sharing the scarce resource of a _parachain slot_ among a number of competing resources (parathreads). Chains that otherwise would not be able to acquire a full parachain slot, or do not find it economically sensible to do so, are enabled to participate in Polkadot's shared security &mdash; albeit with an associated fee per executed block. It also offers a graceful off-ramp to parachains that no longer require a dedicated parachain slot, but would like to continue using the Relay Chain.

## 起源

根据在成都的[演讲](https://v.douyu.com/show/a4Jj7llO5q47Dk01)，这个想法的起源于于80年代末和90年代早期个人电脑上有限的内存资源概念类似。由于计算机上的内存记忆体资源有限，当某个程序需要更多内存时，计算机可以在硬盘通过使用_交换空间_创建虚拟记数亿体。交换空间允许计算机内存量扩大，权衡取舍并供更多程序同时运行，某些程序需要更长的时间才能完成。

## 平行线程 vs. 平行链

Parachains and parathreads are very similar from a development perspective. One can imagine that a chain developed with Substrate can at different points in its lifetime assume one of three states: an independent chain with secured bridge, a parachain, or a parathread. It can switch between these last two states with relatively minimal effort since the difference is more of an economic distinction than a technological one.

平行线程有着跟平行链连接 Polkadot 一样的好处。换句话说通过 ICMP 并受 Polkadot 验证人全面的经济安全保护发送信息到其它平行{链, 线程}。

The difference between parachains and parathreads is economic. Parachains must be registered through a normal means of Polkadot, i.e. governance proposal or parachain slot auction. Parathreads have a fixed fee for registration that would realistically be much lower than the cost of acquiring a parachain slot. Similar to how DOT are locked for the duration of parachain slots and then returned to the winner of the auction, the deposit for a parathread will be returned to the parathread after the conclusion of its term.

除了将平行线程代码注册到 Polkadot 中继链之外，注册平行线程不提供任何保证。当平行线程产生新的区块时，使用方必须支付费用参加每个区块链的拍卖，以使包含在下一个验证的中继链区块。所有已注册的平行线程都将参与拍卖，使将包含其平行线程。

有两个关于平行线程的有趣发现。第一，由于它们是逐个区块竞争，这跟比特币和以太坊处理交易相似。同样将会开发费用市场，意味着当繁忙时间使用平行线程，价格将推高，而较少人使用的时侯，费用将会较低。第二，这种机制与平行链机制明显不同，后者只要持有平行链槽保证可用，而注册平行线程没有给予此权利。

## 平行线程将如何运作？

中继链上的部分平行链槽将被指定为平行线程池的一部分。换句话说某些插槽将没有附上平行链，而是将被用作拍卖平行线程候选区块的空间，供每个区块获胜者使用。

Collators will offer a bid designated in DOT for inclusion of a parathread block candidate. The Relay Chain block author is able to select from these bids to include a parathread block. The obvious incentive is for them to accept the block candidate with the highest bid, which would bring them the most profit. The tokens from the parathread bids will likely be split 80-20, meaning that 80% goes into Polkadot treasury and 20% goes to the block author. This is the same split that applies also to transaction fees and, like many other parameters in Polkadot, can be changed through a governance mechanism.

## 平行线程经济学

There are two sources of compensation for collators:

1. Assuming a parathread has its own local token system, it pays the collators from the transaction fees in its local token. If the parathread does not implement a local token, or its local token has no value (e.g. it is used only for governance), then it can use DOT to incentivize collators.
2. 平行线程协议补贴。平行线程可以创建新代币，为收集人提供额外的奖励。 或许为平行线程创建代币的数量将是按时间函数決定。 包含在中继链中的平行线程区块传递的时间愈多，平行线程愿意补贴的代币越多使區塊被寫入的機會提高。 创建币过程的具体实施可以是通过本地的通胀或通过国库等资金储备。

Collators may be paid in local parathread currency. However, the Relay Chain transacts with the Polkadot universal currency (DOT) only. Collators must then submit block candidates with an associated bid in DOT.

## 平行链插槽交换

It will be possible for a parachain that holds a parachain slot to swap this slot with a parathread so that the parathread "upgrades" to a full parachain and the parachain becomes a parathread. The chain can also stop being a chain and continue as a thread without swapping the slot. The slot, if unoccupied, would be auctioned off in the next [auction period](learn-auction).

This provides a graceful off-ramp for parachains that have reached the end of their lease and do not have sufficient usage to justify renewal; they can remain registered on the Relay Chain but only produce new blocks when they need to.

Parathreads help ease the sharp stop of the parachain slot term by allowing parachains that are still doing something useful to produce blocks, even if it is no longer economically viable to rent a parachain slot.

## Resources

- [Parathreads: Pay-as-you-go Parachains](https://medium.com/polkadot-network/parathreads-pay-as-you-go-parachains-7440d23dde06)
