---
id: learn-consensus
title: 波卡共识
sidebar_label: 波卡共识
---

## 我们为什么需要共识机制？

共识是一种在共享状态上达成协议的方法。为了使区块链的状态继续建立并向前进，网络中的所有节点必须达成一致共识。通过这种方式，分散网络中的节点可以保持彼此同步。 在区块链中，分布式节点网络没有共识，就无法确保一个节点认为是真实的状态将由其他节点共享。共识旨在参与者之间提供状态的客观事实，每个参与者对网络都有自己的主观观点。 这是这些节点间进行通信并达成协议并能够构建新区块的过程。

## 什么是 PoW 和 PoS？

工作量证明（PoW）和权益证明（PoS）已被用作表示区块链共识机制的简写形式，但并不能完整地描述。PoW是达成区块发布者共识的方法，也是完整的Nakamoto共识的一部分，该共识还包含链选择算法（比特币中最长的链规则）。同样PoS是用于选择验证者集的一组规则，并且未指定链选择规则或链如何达到最终性。传统上，PoS算法已与用于达成节点之间的拜占庭协议的算法配对。 例如，[ Tendermint ](learn-comparisons-cosmos)是一种实用的拜占庭容错算法，它使用PoS作为其验证者集选择方法。

## 为什么不提供工作证明（PoW）？

尽管 PoW 在达成共识的方式非常简单有效，但工作量证明共识耗费大量电力，没有经济效益或可证明的终结性，也没有有效的策略来抵抗卡特尔。

## 概率性与可证明性的最终性

运行PoW的纯中本聪共识区块链只能实现_概率最终性_的概念并达到_最终共识_ 概率最终性意味着在关于网络和参与者的一些假设下，如果我们看到在给定区块上构建了几个区块，则可以估计它是最终的概率。最终的共识意味着在将来的某个时刻，所有节点都将就一组数据的真实性达成共识。最终的共识可能需要很长时间，并且无法确定需要多长时间。但是，诸如GRANDPA或以太坊的Casper FFG之类的最终性小工具旨在为区块的最终性提供更强，更快的保证-特别是，在经过拜占庭协议的某些过程后，它们永远无法篡改。不可逆共识的概念称为_可证明的终结性。_

在GRANDPA论文中，它的表达方式如下：

> We say an oracle A in a protocol is *eventually consistent* if it returns the same value to all participants after some unspecified time.

## 什么是 GRANDPA/BABE?

### 混合共识

在讨论 Polkadot 的共识协议时，我们使用两个首字母缩写词：GRANDPA 和 BABE。我们讨论这两个首字母缩写词是因为 Polkadot 使用的是_混合共识_。 混合共识从区块生产机制中拆分了最终性小工具。

这是在 Polkadot 中获得概率最终性（始终产生新区块的能力）和可证明的最终性（在规范链上具有通用协议，没有任何机会逆转）的好处的一种方式。它还避免了每种机制的相应缺点（在概率最终性中不知不觉地遵循了错误的分叉的机会，以及在可证明的最终性中存在“过时”的可能性-无法产生新的区块）。 通过结合这两种机制，Polkadot 可以快速生成区块，而较慢的终结机制可以在单独的流程中运行以完成区块，而不会冒交易速度变慢或停顿的风险。

过去已经提出了混合共识。 值得注意的是，它被提议（现已不复存在），作为以太坊向[ EIP 1011 ](http://eips.ethereum.org/EIPS/eip-1011)的股权证明过渡的一步。 [ Casper FFG ](#casper-ffg)。

### BABE

BABE (Blind Assignment for Blockchain Extension) is the block production mechanism that runs between the validator nodes and determines the authors of new blocks. BABE is comparable as an algorithm to Ouroboros Praos, with some key differences in chain selection rule and slot time adjustments. BABE assigns block production slots to validators according to stake and using the Polkadot [randomness cycle](learn-randomness).

Validators in Polkadot will participate in a [lottery](learn-randomness) in every slot that will tell them whether or not they are the block producer candidate for that slot. Slots are discrete units of time, nominally 6 seconds in length. Because of this randomness mechanism, multiple validators could be candidates for the same slot. Other times, a slot could be empty, resulting in inconsistent block time.

#### Multiple Validators per Slot

When multiple validators are block producer candidates in a given slot, all will produce a block and broadcast it to the network. At that point, it's a race. The validator whose block reaches most of the network first wins. Depending on network topology and latency, both chains will continue to build in some capacity, until finalization kicks in and amputates a fork. See Fork Choice below for how that works.

#### No Validators in Slot

When no validators have rolled low enough in the randomness lottery to qualify for block production, a slot can remain seemingly blockless. We avoid this by running a secondary, round-robin style validator selection algorithm in the background. The validators selected to produce blocks through this algorithm always produce blocks, but these _secondary_ blocks are ignored if the same slot also produces a primary block from a [VRF-selected](learn-randomness) validator. Thus, a slot can have either a _primary_ or a _secondary_ block, and no slots are ever skipped.

For more details on BABE, please see the [working research draft](http://research.web3.foundation/en/latest/polkadot/BABE/Babe/).

### GRANDPA: Finality gadget

GRANDPA (GHOST-based Recursive ANcestor Deriving Prefix Agreement) is the finality gadget that is implemented for the Polkadot relay chain.

It works in a partially synchronous network model as long as 2/3 of nodes are honest and can cope with 1/5 Byzantine nodes in an asynchronous setting.

A notable distinction is that GRANDPA reaches agreements on chains rather than blocks, greatly speeding up the finalization process, even after long-term network partitioning or other networking failures.

In other words, as soon as more than 2/3 of validators attest to a chain containing a certain block, all blocks leading up to that one are finalized at once.

#### Protocol

Please refer to heading 3 in [the paper](https://github.com/w3f/consensus/blob/master/pdf/grandpa.pdf) for a full description of the protocol.

#### Implementation

The [Rust implementation](https://github.com/paritytech/substrate/blob/master/srml/grandpa/src/lib.rs) is part of Substrate Runtime Module Library.

For even more detail, see the [GRANDPA research page](http://research.web3.foundation/en/latest/polkadot/GRANDPA/) on the W3F Research pages.

### Fork Choice

Bringing BABE and GRANDPA together, the fork choice of Polkadot becomes clear. BABE must always build on the chain that has been finalized by GRANDPA. When there are forks after the finalized head, BABE provides probabilistic finality by building on the chain with the most primary blocks.

![Best chain choice](assets/best_chain.png)

In the above image, the black blocks are finalized. Ones are primary, twos are secondary blocks. Even though the topmost chain is the longest chain on the latest finalized block, it does not qualify because it has fewer primaries at the time of evaluation than the one below it.

## 共识比较

### Nakamoto consensus

Nakamoto consensus consists of the longest chain rule using proof of work as its sybil resistance mechanism and leader election.

Nakamoto consensus only gives us probabilistic finality. Probabilistic finality states that a block in the past is only as safe as the number of confirmations it has, or the number of blocks that have been built on top of it. As more blocks are built on top of a specific block in a Proof of Work chain, more computational work has been expended behind this particular chain. However, it does not guarantee that the chain containing the block will always remain the agreed-upon chain, since an actor with unlimited resources could potentially build a competing chain and expend enough computational resources to create a chain that did not contain a specific block. In such a situation, the longest chain rule employed in Bitcoin and other proof of work chains would move to this new chain as the canonical one.

### PBFT / Tendermint

Please see the [relevant section](learn-comparisons-cosmos#consensus) in the Cosmos comparison article.

<!-- ### HoneyBadgerBFT -->

### Casper FFG

The two main differences between GRANDPA and Casper FFG (Friendly Finality Gadget) are:

 - in GRANDPA, different voters can cast votes simultaneously for blocks at different heights
 - GRANDPA only depends on finalized blocks to affect the fork-choice rule of the underlying block production mechanism

### Casper CBC

_Coming soon!_

<!-- ### Avalanche -->

## 资源

- [ GRANDPA论文](https://github.com/w3f/consensus/blob/master/pdf/grandpa.pdf)- GRANDPA 终极小工具的学术描述。 包含算法的形式证明。
- [Rust implementation](https://github.com/paritytech/finality-grandpa) - The reference implementation and the accompanying [Substrate runtime module](https://github.com/paritytech/substrate/blob/master/srml/grandpa/src/lib.rs).

<!-- ## Consensus in Polkadot

### Block Production

### Finality Gadget

### NPoS -->

