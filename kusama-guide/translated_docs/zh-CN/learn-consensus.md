---
id: learn-consensus
title: 波卡共识
sidebar_label: 波卡共识
description: An explanation of the consensus model used in Polkadot and Kusama
---

## 为什么我们需要共识机制？

Consensus is a method for coming to agreement over a shared state. In order for the state of the blockchain to continue to build and move forward, all nodes in the network must agree and come to consensus. It is the way that the nodes in a decentralized network are able to stay synced with each other. Without consensus for the decentralized network of nodes in a blockchain, there is no way to ensure that the state one node believes is true will be shared by the other nodes. Consensus aims to provide the _objective_ view of the state amid participants which each have their own _subjective_ views of the network. It is the process by which these nodes communicate and come to agreement, and are able to build new blocks.

## 什么是 PoW 和 PoS？

Proof of Work (PoW) and Proof of Stake (PoS) have been used as short hand to refer to consensus mechanisms of blockchains, but that does not capture the full picture. PoW is the method for agreeing on a block author and part of the fuller [Nakamoto consensus](#nakamoto-consensus) that also encompasses a chain selection algorithm (longest chain rule in Bitcoin). Similarly, PoS is a set of rules for selecting the validator set and does not specify a chain selection rule or how a chain might reach finality. PoS algorithms have traditionally been paired with an algorithm for coming to Byzantine agreement between nodes. For example, [Tendermint](learn-comparisons-cosmos) is a practical Byzantine fault tolerant algorithm which uses PoS as its validator set selection method.

## 为什么不使用工作量证明(PoW)?

Although simple and effective in coming to a decentralized consensus, proof of work consensus consumes an incredible amount of energy, has no economic or provable finality, and has no effective strategy in resisting cartels.

## 概率性 vs 可证明的最终性

A pure Nakamoto consensus blockchain which runs PoW is only able to achieve the notion of _probabilistic finality_ and reach _eventual consensus_. Probabilistic finality means that under some assumptions about the network and participants, if we see a few blocks building on a given block, we can estimate the probability that it is final. Eventual consensus means that at some point in the future, all nodes will agree on the truthfulness of one set of data. This eventual consensus may take a long time and will not be able to be determined how long it will take ahead of time. However, finality gadgets such as GRANDPA or Ethereum's Casper FFG are designed to give stronger and quicker guarantees on the finality of blocks - specifically, that they can never be reverted after some process of Byzantine agreements has taken place. The notion of irreversible consensus is known as _provable finality._

在 GRANDPA 论文中，它的表达方式如下：

> We say an oracle A in a protocol is _eventually consistent_ if it returns the same value to all participants after some unspecified time.

## 什么是 GRANDPA / BABE?

### 混合共识

There are two acronyms we use when we talk about the consensus protocol of Polkadot, GRANDPA and BABE. We talk about both of these acronyms because Polkadot uses what is known as _hybrid consensus_. Hybrid consensus splits up the finality gadget from the block production mechanism.

This is a way of getting the benefits of probabilistic finality (the ability to always produce new blocks) and provable finality (having a universal agreement on the canonical chain with no chance for reversion) in Polkadot. It also avoids the corresponding drawbacks of each mechanism (the chance of unknowingly following the wrong fork in probabilistic finality, and a chance for "stalling" - not being able to produce new blocks - in provable finality). By combining these two mechanisms, Polkadot allows for blocks to be rapidly produced, and the slower finality mechanism to run in a separate process to finalize blocks without risking slower transaction processing or stalling.

Hybrid consensus has been proposed in the past. Notably, it was proposed (now defunct) as a step in Ethereum's transition to proof of stake in [EIP 1011](http://eips.ethereum.org/EIPS/eip-1011) which specified [Casper FFG](#casper-ffg).

### BABE

BABE (Blind Assignment for Blockchain Extension) is the block production mechanism that runs between the validator nodes and determines the authors of new blocks. BABE is comparable as an algorithm to Ouroboros Praos, with some key differences in chain selection rule and slot time adjustments. BABE assigns block production slots to validators according to stake and using the Polkadot [randomness cycle](learn-randomness).

Validators in Polkadot will participate in a [lottery](learn-randomness) in every slot that will tell them whether or not they are the block producer candidate for that slot. Slots are discrete units of time, nominally 6 seconds in length. Because of this randomness mechanism, multiple validators could be candidates for the same slot. Other times, a slot could be empty, resulting in inconsistent block time.

#### 同一时隙多个验证人

When multiple validators are block producer candidates in a given slot, all will produce a block and broadcast it to the network. At that point, it's a race. The validator whose block reaches most of the network first wins. Depending on network topology and latency, both chains will continue to build in some capacity, until finalization kicks in and amputates a fork. See Fork Choice below for how that works.

#### 时隙里没有验证人

When no validators have rolled low enough in the randomness lottery to qualify for block production, a slot can remain seemingly blockless. We avoid this by running a secondary, round-robin style validator selection algorithm in the background. The validators selected to produce blocks through this algorithm always produce blocks, but these _secondary_ blocks are ignored if the same slot also produces a primary block from a [VRF-selected](learn-randomness) validator. Thus, a slot can have either a _primary_ or a _secondary_ block, and no slots are ever skipped.

For more details on BABE, please see the [working research draft](https://research.web3.foundation/en/latest/polkadot/BABE/Babe.html).

### GRANDPA: 最终决定性工具

GRANDPA (GHOST-based Recursive ANcestor Deriving Prefix Agreement) is the finality gadget that is implemented for the Polkadot relay chain.

It works in a partially synchronous network model as long as 2/3 of nodes are honest and can cope with 1/5 Byzantine nodes in an asynchronous setting.

A notable distinction is that GRANDPA reaches agreements on chains rather than blocks, greatly speeding up the finalization process, even after long-term network partitioning or other networking failures.

In other words, as soon as more than 2/3 of validators attest to a chain containing a certain block, all blocks leading up to that one are finalized at once.

#### 协议

Please refer to heading 3 in [the paper](https://github.com/w3f/consensus/blob/master/pdf/grandpa.pdf) for a full description of the protocol.

#### 实现

The [Rust implementation](https://github.com/paritytech/substrate/blob/master/frame/grandpa/src/lib.rs) is part of Substrate Frame.

For even more detail, see the [GRANDPA research page](https://research.web3.foundation/en/latest/polkadot/GRANDPA.html) on the W3F Research pages.

### 分叉选择

Bringing BABE and GRANDPA together, the fork choice of Polkadot becomes clear. BABE must always build on the chain that has been finalized by GRANDPA. When there are forks after the finalized head, BABE provides probabilistic finality by building on the chain with the most primary blocks.

![Best chain choice](assets/best_chain.png)

In the above image, the black blocks are finalized. Ones are primary, twos are secondary blocks. Even though the topmost chain is the longest chain on the latest finalized block, it does not qualify because it has fewer primaries at the time of evaluation than the one below it.

## 共识比较

### 中本聪共识

Nakamoto consensus consists of the longest chain rule using proof of work as its sybil resistance mechanism and leader election.

Nakamoto consensus only gives us probabilistic finality. Probabilistic finality states that a block in the past is only as safe as the number of confirmations it has, or the number of blocks that have been built on top of it. As more blocks are built on top of a specific block in a Proof of Work chain, more computational work has been expended behind this particular chain. However, it does not guarantee that the chain containing the block will always remain the agreed-upon chain, since an actor with unlimited resources could potentially build a competing chain and expend enough computational resources to create a chain that did not contain a specific block. In such a situation, the longest chain rule employed in Bitcoin and other proof of work chains would move to this new chain as the canonical one.

### PBFT / Tendermint

Please see the [relevant section](learn-comparisons-cosmos#consensus) in the Cosmos comparison article.

<!-- ### HoneyBadgerBFT -->

### Casper FFG

GRANDPA 和 Casper FFG(确定性工具)之间的两个主要区别是：

- 在GRANDPA中，不同的选民可以同时为不同高度的区块投票
- GRANDPA only depends on finalized blocks to affect the fork-choice rule of the underlying block production mechanism

### Casper CBC

_即将来临!_

<!-- ### Avalanche -->

## 资源

- [GRANDPA paper](https://github.com/w3f/consensus/blob/master/pdf/grandpa.pdf) - The academic description of the GRANDPA finality gadget. Contains formal proofs of the algorithm.
- [Rust implementation](https://github.com/paritytech/finality-grandpa) - The reference implementation and the accompanying [Substrate pallet](https://github.com/paritytech/substrate/blob/master/frame/grandpa/src/lib.rs).

<!-- ## Consensus in Polkadot

### Block Production

### Finality Gadget

### NPoS -->

