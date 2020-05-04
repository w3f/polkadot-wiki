---
id: learn-parachains
title: Parachains
sidebar_label: Parachains
---

![One parachain](assets/network/one_parachain.png)

## 什么是平行链?

A parachain is an application-specific data structure that is globally coherent and validatable by the validators of the Polkadot relay chain. Most commonly a parachain will take the form of a blockchain, but there is no specific need for them to be actual blockchains. They take their name from the concept of parallelized chains that run parallel to the relay chain. Due to their parallel nature, they are able to parallelize transaction processing and achieve scalability of the Polkadot system. They [share in the security](learn-security) of the entire Polkadot network and can communicate with other parachains through [XCMP](learn-crosschain).

平行链由称为[收集人](maintain-collator)的网络维护者维护。 收集人节点的作用是运行平行链的全节点，保留平行链的所有必要信息，并生成新的候选区块，以传递给中继链验证器人进行验证并包含在 Polkadot 的共享状态里。 收集人节点的激励是对平行链的实施细节（请参见[平行链经济](#parachain-economies)）。 除非平行链实施规定这样做，否则它们无需将 DOT 押在中继链或持有代币。

The Polkadot Host (PH) allows for the state transitions performed on parachains to be specified as a Wasm executable. Proofs of new state transitions that occur on a parachain must be validated against the registered state transition function (STF) that is stored on the relay chain by the validators before Polkadot acknowledges a state transition has occurred on a parachain. The only constraint to the logic that a parachain is allowed to implement is that it must be verifiable by the relay chain validators. Verification most commonly takes the form of a bundled proof of a state transition known as a Proof-of-Verification (PoV) block, which is submitted to the validators from one or more of the parachain collators to be checked.

## 平行链经济学

平行链可能有自己的经济体和自己的原生币。方案像权益证明通常用于选择验证人以便用于验证区块和确定性。平行链并不需要处理以上功能。但是，由于 Polkadot 对于平行链可以实现的内容也是通用的，因此平行链可以选择实现抵押代币，但通常没有必要。

收集人可能通过平行链的原生币通胀来激励。 可能还有其他方法可以激励收集人而不需要通胀平行链原生币。

平行链也可实现使用原生币作为交易费用 。 Polkadot 对平行链如何决定交易的原始有效性没有硬性规定。例如平行链可以实现必须支付小额费用给收集人才能有效。中继链将强制执行此有效性。同样平行链不能包括他们的实现和 Polkadot 仍将强制执行其有效性。

平行链并不需要拥有它们自己的代币。如果它们拥有自己的代币，那将会是平行链决定如何使它们的代币有经济用途，需不是 Polkadot。

## Crowdfunding parachains

Polkadot allows for parachains to  crowdfund their slots in a decentralized and safe way. The logic for this is handled in the [crowdfunding pallet](https://github.com/paritytech/polkadot/blob/master/runtime/common/src/crowdfund.rs).

During a parachain auction, anyone can create a new crowdfunding campaign for a parachain slot. When a campaign is created, the range of slots (i.e. the duration of the lease) is specified. Up to four slots, for a total time duration of roughly two years, can be selected. The creator of the crowdfund becomes the owner of the campaign, and can later upload the parachain's code. When creating a campaign, a crowdfunding "cap" is also specified. The crowdfund will refuse to accept funds after the cap has been reached.

Parachain campaigns may use caps when they are confident they will raise enough funds to reach the minimum amount needed for a raise but do not want to raise too much over this amount. As a simplified example, let's consider that the total supply of DOTs is 10 million. We can assume that 5 million DOTs are bonded in the staking subsystem since that is what is optimized by the rewards. We are left with a maximum of 5 million DOTs to use in parachain auctions. If there were only 4 slots up for an auction then we can calculate that 1.25 million is enough to win any one of them. A parachain might choose to place this as their cap, so that no single parachain can be oversubscribed.

Once a crowdfunding campaign is open, anyone can contribute by sending a special transaction and depositing funds. Funds that are used to contribute must be transferrable (that is, not locked) because they will be moved into a module controlled account that was generated uniquely for this campaign.

During some point of the crowdfund campaign the owner will upload the parachain data. Ideally, the owner does this before soliciting contributions to the campaign so that the contributors can verify it. The data can only be uploaded once during the course of the campaign and it will be what is deployed for the parachain. Of course, once the parachain is running it can always change via runtime upgrades (as determined through its own local governance).

If a crowdfunding campaign is successful, that parachain will be on-boarded as a parachain in Polkadot. The funds that contributed to it will be locked in that parachain's account for the entire duration that it is active (up to two years). On one hand, this means that the parachain can do reliable accounting of contributors and reward them with parachain tokens in their local economies. On the other hand, the DOTs that contributors used will be essentially taken out of circulation for that time and cannot be used to stake or vote.

At the end of the parachain's lifecycle, it will enter into a retirement phase. During this phase, contributors can begin to withdraw their locked DOTs. Contributors must withdraw their funds during the retirement phase, otherwise they will be sent to the treasury when that parachain is dissolved. Likewise, any parachain that started a campaign but was unsuccessful at acquiring a slot will have a timeout during which contributors can withdraw their funds. If funds are not withdrawn during the timeout, they are dissolved to the treasury.

## Examples

Some examples of parachains:

- **Encrypted Consortium Chains** - These are possibly private chains that do not leak any information to the public, but still can be interacted with trustlessly due to the nature of the XCMP protocol.
- **高频链** - 这些链可以通过进行某些权衡或进行优化，在短时间内大量计算。
- **隐私链** - 这些链通过使用新颖的加密技术不会向公众泄露任何信息。
- **智能合约链** - 这些链可以通过部署称为 _智能合约_的代码来实现额外的逻辑。

## FAQ

### 平行链共识是什么?

"Parachain consensus" is special in that it will follow the Polkadot relay chain. Parachains cannot use other consensus algorithms that provide their own finality. Only sovereign chains (that must bridge to the relay chain via a parachain) can control their own consensus. Parachains have control over how blocks are authored and by whom.

### 平行链插槽如何分配？

Parachain slots will be acquirable through auction, please see the [parachain slots](learn-auction) article. Additionally, some parachain slots will be set aside to run [parathreads](learn-parathreads) - parathreads which bid on a per-block basis to be included in the relay chain.

### 平行链开发套件 (PDKs)

Parachain Development Kits are a set of tools that enable developers to create their own applications as parachains. For more info see [here](build-pdk).

### 部署平行链

Please see the builder's article on [deploying parachains](build-deploy-parachains).

## Resources

- [Polkadot: 平行链](https://medium.com/polkadot-network/polkadot-the-parachain-3808040a769a) - Polkadot 联合创始人 Rob Habermeier在2017年撰写的博客文章，将平行链介绍为 "一种更简单的区块链形式，它附加于“中继链”提供的安全性，而不是提供其自身的安全性。中继链为附加的平行链提供安全性，但是还为它们之间的安全消息传递提供了保证。"