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

### GRANDPA: 最终性小工具

GRANDPA（基于 GHOST 的递归祖先派生前缀协议）是为 Polkadot 中继链实现的终局性小工具。

它工作在一个部分同步的网络模型中，只要2/3的节点是诚实的，并且能够在异步设置中处理1/5的拜占庭节点。

一个显着的区别是，即使在长期的网络分区或其他网络故障中，GRANDPA 仍在链上达成协议，而不是在区块上达成协议，从而极大地加快了最终确定过程。

#### 协议

Please refer to heading 3 in [the paper](https://github.com/w3f/consensus/blob/master/pdf/grandpa.pdf) for a full description of the protocol.

#### 实现

[ Rust实现](https://github.com/paritytech/substrate/blob/master/srml/grandpa/src/lib.rs) 是 Substrate Runtime 库的一部分。

有关更多详细信息，请参阅 W3F 研究页面上的[ GRANDPA 研究页面](http://research.web3.foundation/en/latest/polkadot/GRANDPA/)。

### BABE: 区块生成

BABE (Blind Assignment for Blockchain Extension) is the block production mechanism that runs between the validator nodes and determines the authors of new blocks.

BABE 会根据抵押并使用 Polkadot [随机周期](learn-randomness)，将区块生产时段分配给验证人。

BABE 可以与 Ouroboros Praos 相比，具有可比性，在链选择规则和时段调整方面存在一些关键差异。

For details on BABE, please see the [working draft](http://research.web3.foundation/en/latest/polkadot/BABE/Babe/).

## 共识比较

### 中本聪共识

中本聪共识包括最长的链条规则，该规则以工作证明作为其抵御反对的机制和领导者选举。

中本聪共识只给了我们概率确定性。概率最终性指出，过去的区块仅与其确认数或在其之上构建的区块数一样安全。由于在工作量证明链中的特定块之上构建了更多的块，因此在该特定链后面花费了更多的计算工作。 然而，它不能保证包含区块的链始终保持一致，因为拥有无限资源的参与者可能会构建竞争链并消耗足够的计算资源以创建不包含特定区块的链。在这种情况下，在比特币和其他工作链证明中采用的最长链规则将作为规范链转移到这一新链上。

### PBFT (拜占庭容错）/ Tendermint

请参阅 Cosmos 比较文章中的[相关部分](learn-comparisons-cosmos#consensus)。

<!-- ### HoneyBadgerBFT -->

### Casper FFG

Grander 和 Casper FFG (友好最终小工具）的两个主要区别是：

 - in GRANDPA, different voters can cast votes simultaneously for blocks at different heights
 - GRANDPA only depends on finalized blocks to affect the fork-choice rule of the underlying block production mechanism

### Casper CBC

_敬请期待！_

<!-- ### Avalanche -->

## 资源

- [ GRANDPA论文](https://github.com/w3f/consensus/blob/master/pdf/grandpa.pdf)- GRANDPA 终极小工具的学术描述。 包含算法的形式证明。
- [Rust implementation](https://github.com/paritytech/finality-grandpa) - The reference implementation and the accompanying [Substrate runtime module](https://github.com/paritytech/substrate/blob/master/srml/grandpa/src/lib.rs).

<!-- ## Consensus in Polkadot

### Block Production

### Finality Gadget

### NPoS -->

