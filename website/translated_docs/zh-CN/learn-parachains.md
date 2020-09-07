---
id: learn-parachains
title: 平行链
sidebar_label: 平行链
---

![One parachain](assets/network/one_parachain.png)

## 什么是平行链?

平行链是特定于应用程序的数据结构，它在上下上是一致的，并且可以由 Polkadot 中继链的验证人进行验证。通常平行链会是一条区块链, 但并没有特别要求它们必须是一条链，之所以叫他们平行链是因为它们于中继链并行运行。由于它们的并行性质，它们能够并行地处理交易并实现 Polkadot 系统的可伸缩性。它们[与 Polkadot 网络共享安全](learn-security)，并且可以通过[ XCMP ](learn-crosschain)与其它平行链进行通信。

Parachains are maintained by a network maintainer known as a [collator](learn-collator). The role of the collator node is to maintain a full-node of the parachain, retain all necessary information of the parachain, and produce new block candidates to pass to the Relay Chain validators for verification and inclusion in the shared state of Polkadot. The incentivization of a collator node is an implementation detail of the parachain (see [parachain economies](#parachain-economies)). They are not required to be staked on the Relay Chain or own DOT tokens unless stipulated to do so by the parachain implementation.

Polkadot Host (PH) 允许将在平行链上执行的状态转换指定为 Wasm 可执行文件。 在Polkadot 确认在平行链上发生状态转换之前，必须通过验证程序根据在中继链上存储的注册状态转换函数 (STF) 验证在平行链上发生的新状态转换的证据。允许执行平行链的逻辑的唯一约束是中继链验证程序必须可以验证该逻辑。 验证通常采用状态转换的捆绑式证明的形式，即验证的证明 (PoV) 区块，该验证从一个或多个平行链的收集人核对提交给验证人，以进行检查。

## 平行链经济学

平行链可能有自己的经济体和自己的原生币。方案像权益证明通常用于选择验证人以便用于验证区块和确定性。平行链并不需要处理以上功能。但是由于 Polkadot 对于平行链可以实现的内容也是通用的，因此平行链可以选择实现抵押代币，但通常没有必要。

收集人可能通过平行链的原生币通胀来激励。 可能还有其他方法可以激励收集人而不需要通胀平行链原生币。

平行链也可实现使用原生币作为交易费用 。 Polkadot 对平行链如何决定交易的原有 有效性没有硬性规定。例如平行链可以实现必须支付小额费用给收集人才能有效。中继链将强制执行此有效性。同样平行链不能包括他们的实现和 Polkadot 仍将强制执行其有效性。

平行链并不需要拥有它们自己的代币。如果它们拥有自己的代币，那将会是平行链决定如何使它们的代币有经济用途，需不是 Polkadot。

## 群众募资平行链

Polkadot 允许平行链以分散和安全的方式将他们的插槽募资。 这个逻辑 是在 [众筹 pallet](https://github.com/paritytech/polkadot/blob/master/runtime/common/src/crowdfund.rs) 中处理。

在平行链拍卖期间，任何人都可以为平行链插槽创建新的众筹活动。当活动创建时，将插槽范围(例如租期)指定。 最多可以选择四个插槽，总持续时间约为两年。 众筹的创建者成为活动的拥有者，并可以稍后上传平行链的代码。 在创建活动时，还指定了众筹"上限"。 达到上限后，众筹将拒绝接受资金。

Parachain campaigns may use caps when they are confident they will raise enough funds to reach the minimum amount needed for a raise but do not want to raise too much over this amount. As a simplified example, let's consider that the total supply of DOT is 10 million. We can assume that 5 million DOT are bonded in the staking subsystem since that is what is optimized by the rewards. We are left with a maximum of 5 million DOT to use in parachain auctions. If there were only 4 slots up for an auction then we can calculate that 1.25 million is enough to win any one of them. A parachain might choose to place this as their cap, so that no single parachain can be oversubscribed.

一旦众筹活动开始，任何人都可以通过发送特殊交易和存入资金来贡献。 用于贡献的资金必须是可转移的(即未锁定)，因为它们将被转移到为此活动系列唯一生成的模块控制帐户中。

在众筹活动的某个阶段，拥有者将上传平行链数据。 理想情况下，拥有者在向活动征集贡献之前进行此操作，以便贡献者可以对其进行验证。 在活动过程中，数据只能上传一次，这将是为平行链部署的。 当然，一旦平行链运行，它总是可以通过 runtime 升级来更改 (由其自身的本地治理确定)。

If a crowdfunding campaign is successful, that parachain will be on-boarded as a parachain in Polkadot. The funds that contributed to it will be locked in that parachain's account for the entire duration that it is active (up to two years). On one hand, this means that the parachain can do reliable accounting of contributors and reward them with parachain tokens in their local economies. On the other hand, the DOT that contributors used will be essentially taken out of circulation for that time and cannot be used to stake or vote.

At the end of the parachain's lifecycle, it will enter into a retirement phase. During this phase, contributors can begin to withdraw their locked DOT. Contributors must withdraw their funds during the retirement phase, otherwise they will be sent to the treasury when that parachain is dissolved. Likewise, any parachain that started a campaign but was unsuccessful at acquiring a slot will have a timeout during which contributors can withdraw their funds. If funds are not withdrawn during the timeout, they are dissolved to the treasury.

## 例子

平行链例子

- **加密联盟链** - 对于不希望泄漏信息的私有链, 基于 XCMP 的性质它们也能去信任地进行交互.
- **高频链** - 这些链可以通过进行某些权衡或进行优化，在短时间内大量计算。
- **隐私链** - 这些链通过使用新颖的加密技术不会向公众泄露任何信息。
- **智能合约链** - 这些链可以通过部署称为 _智能合约_的代码来实现额外的逻辑。

## 常见问题

### 平行链共识是什么?

"平行链共识"的特殊之处在于它将遵循 Polkadot 中继链。平行链不能使用其他提供确定性的共识算法。只有主权链 (必须通过转接桥的平行链接到中继链) 能够控制它们的共识。平行链可以控制区块的创作方式和通过谁。

### 平行链插槽如何分配？

平行链插槽通过使用拍卖方式获取。请查看[平行链插槽](learn-auction)文章。如此，一些平行链插槽将会运行[平行线程](learn-parathreads) - 平行线程通过以竞标每个区块方式包括在中继链内。

### What happens to parachains when the number of validators drops below a certain threshold?

The minimal safe ratio of validator per parachain is 5:1. With a sufficiently large set of validators, the randomness of their distribution along with [availability and validity](learn-availability) will make sure security is on-par. However, should there be a big outage of a popular cloud provider or another network connectivity catastrophe, it is reasonable to expect that the number of validators per chain will drop.

Depending on how many validators went offline, the outcome differs.

If a few validators went offline, the parachains whose validator groups will be too small to validate a block will skip those blocks. Their block production speed will slow down to any increment of 6 seconds, until the situation is resolved and the optimal number of validators is in that parachain's validator group again.

If anywhere from 30% to 50% of the validators go offline, availability will suffer because we need two thirds of the validator set to back the parachain candidates. In other words, all parachains will stop until the situation is resolved. Finality will also stop, but low-value transactions on the relay chain should be safe enough to execute, despite common forks. Once the required number of validators is in the validator set again, parachains will resume block production.

Given that collators are full nodes of the relay chain and the parachain they are running, they will be able to recognize a disruption as soon as it occurs and should stop producing block candidates. Likewise, it should be easy for them to recongize when it's safe to restart block production - perhaps based on finality delay, validator set size, or some other factor that is yet to be decided within [Cumulus](https://github.com/paritytech/cumulus).

### Parachain Development Kits (PDKs)

Parachain Development Kits are a set of tools that enable developers to create their own applications as parachains. For more info see [here](build-pdk).

### Deploying parachains

Please see the builder's article on [deploying parachains](build-deploy-parachains).

## 资源

- [Polkadot: 平行链](https://medium.com/polkadot-network/polkadot-the-parachain-3808040a769a) - Polkadot 联合创始人 Rob Habermeier 在2017年撰写的博客文章，将平行链介绍为 "一种更简单的区块链形式，它附加于中继链提供的安全性，而不是提供其自身的安全性。中继链为附加的平行链提供安全性，但是还为它们之间的安全消息传递提供了保证。"
