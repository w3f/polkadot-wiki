---
id: learn-consensus
title: 波卡共识
sidebar_label: 波卡共识
description: 对 Polkadot 和 Kusama 所用的共识解释
---

## 为什么我们需要共识机制？

共识是一种在共享状态上达成协议的方法。为了使区块链的状态继续建立并向前进，网络中的所有节点必须达成一致共识。通过这种方式，去中心网络中的节点可以保持彼此同步。在区块链上如果去中心化网络节点没有共识，就无法确保由其他节点共享的状态 是真实的。共识旨在参与者之间提供状态的_客观_事实，每个参与者对网络都有自己的_主观_观点。这些节点间进行通信的过程并达成协议使能够构建新区块。

## 什么是 PoW 和 PoS？

工作量证明(PoW) 和权益证明(PoS) 已被用来作为区块链共识机制的简称，但这并不能完整地描述其全貌。 PoW是达成区块创造者共识的方法，也是[中本聪共识](#nakamoto-consensus)的一部分，该共识还包含链选择算法(根据比特币中最长链的规则)。同样PoS是用于选择验证人的一组规则并且没有指定链的选择规则或如何达到链的终点。传统上PoS算法已被融合到实现节点之间的拜占庭协议的算法配对。例如[Tendermint](learn-comparisons-cosmos)是实用性拜占庭容错算法，它使用PoS作为其验证人的选择方法。

## 为什么不使用工作量证明(PoW)?

尽管在下一个区块生产者达成去中心化共识方面既简单又有效，但中本聪共识实现的工作量证明却消耗了大量的能源，没有经济的或可证明的终结性，也没有有效的策略来抵抗卡特尔。

## 概率性 vs 可证明的最终性

PoW 中本聪共识只能实现_概率最终性_并会达到_最终共识_。概率最终性意味着假设在某些网络和参与者之下，如果我们看到多过区块在某个区块上构建了，则有很大概率估计它是最终了。最终共识意味着在接下来的某个时间，所有节点都将就一组数据的真实性达成共识。最终共识可能需要很长时间，并且无法确定需要多长时间。但是例如 GRANDPA 或以太坊的 Casper FFG 之类的最终性工具旨在为区块提供更强的最终性 -​​ 特别是更快的保证，在经过拜占庭协议的某些处理后，它们永远无法篡改。不可逆的共识概念称为_可证明的最终性。_

在 GRANDPA 论文中，它的表达方式如下：

> 如果在没有指定的时间后向所有参与者返回相同的值，oracle A 在协议中是*最终一致*。

## 什么是 GRANDPA / BABE?

### 混合共识

在讨论 Polkadot 的共识协议时，我们使用两个首字母缩写词：GRANDPA 和 BABE。我们讨论这两个的原因是因为 Polkadot 使用的是_混合共识_。混合共识从区块生产机制中拆分了最终性工具。

这是在 Polkadot 中获得概率最终性（拥有产生新区块的能力）和可证明的最终性（在规范链上具有通用协议，没有任何逆转机会）的好处。它还避免了每种机制的相应缺点（在概率最终性中不知不觉地遵循了错误的分叉的机会，以及在可证明的最终性中存在"过时"的可能性- 无法产生新的区块）。通过结合这两种机制，Polkadot 可以快速生成区块，而较慢的最终机制可以在单独的流程中运行以确定区块，而不会使交易速度变慢或停顿的风险。

过去已经提出了混合共识。值得注意的是它被提议(现已不存在)作为以太坊转向[ EIP 1011 ](http://eips.ethereum.org/EIPS/eip-1011)的权益证明过渡的一步。 [ Casper FFG ](#casper-ffg)。

### BABE

BABE (Blind Assignment for Blockchain Extension) 是在验证人节点与决定谁是产生新区块之间的产生区块机制。 BABE 与 Ouroboros Praos 相比，在链选择规则和时段调整方面存在一些关键差异。 BABE 根据抵押和使用 Polkadot [随机性周期](learn-randomness)分配区块生产插槽给验证人。

Polkadot 的验证人将会参与在每次的[抽奖](learn-randomness)去决定它们是否在那个时隙的生产区块候选人。时隙是用时间作单位，长度为6秒。由于这种随机性机制，多个验证人可能是同一时隙的候选人。在其余时间，时隙可能为空导致区块时间不一致。

#### 同一时隙多个验证人

当多个验证人在同一时隙也是区块生产侯选人，全部也会产生区块并广播到网络。那时侯将会是一场比赛。其那个区块到达网络大部分的验证人先获胜。取决于网络拓扑和延迟，两条链都将继续建立一定的容量，直到最终敲定并截断分叉为止。有关其工作原理，请参见下面的"分叉选择"。

#### 时隙里没有验证人

当没有任何验证人在随机抽奖中达到足够低的资格进行生产区块时，时隙便会没有区块。我们在后台通过运行辅助轮循样式验证人选择算法来避免这种情况。通过选择该算法生成区块的验证人始终生成区块，但是如果同一时隙也从[ VRF 选择](learn-randomness)验证人生成主块，则这些_次要_区块将被忽略。因此时隙可以具有_ 主要 _或_ 次要 _区块，并且不会跳过任何时隙。

有关更多 BABE 的详细信息，请参见[正在研究的草案](http://research.web3.foundation/zh/latest/polkadot/BABE/Babe/)。

#### Kusama 和 Polkadot 的 BABE 次生块的区别

Both Kusama and Polkadot uses the BABE block production mechanism outlined above. However, there is a slight difference in the secondary blocks that are produced between the two networks. Polkadot attaches the VRF output to secondary blocks (and therefore every block contributes to the Epoch randomness), while Kusama keeps the VRF output off the secondary blocks (meaning only the primary blocks contribute to Epoch randomness). The Polkadot method should give stronger randomness as more inputs are collected during every Epoch. Eventually, this change should make its way into Kusama too.

### GRANDPA: 最终决定性工具

GRANDPA (基于 GHOST 的递归祖先派生前缀协议) 是为 Polkadot 中继链实现的最终性工具。

只要2/3的节点是诚实的，并且可以在异步设置中处理1/5的拜占庭节点，它就可以作为同步的网络模型中的一部分运行。

一个明显的区别是，即使在长期的网络分区或其他网络故障之后，GRANDPA 还是在链上达成协议，而不是在区块上达成协议，从而大大加快了最终性确定的过程。

换句话说，一旦超过2/3的验证者证明包含某个块的链，则导致该块的所有块都会立即完成。

#### 协议

请参阅[该文件](https://github.com/w3f/consensus/blob/master/pdf/grandpa.pdf)中的标题3以获取该协议的完整说明。

#### 实施

[Rust 的执行](https://github.com/paritytech/substrate/blob/master/frame/grandpa/src/lib.rs)是 Substrate 框架的一部分。

更多详细的相关信息，请参见W3F研究页面上的[GRANDPA 研究页面](https://research.web3.foundation/en/latest/polkadot/GRANDPA.html)。

### 分叉选择

将 BABE 和 GRANDPA 结合在一起，Polkadot 的分叉选择变得很清晰。 BABE 必 须始终建立在 GRANDPA 最终确定的链条上。当最终确定的头后面有分叉时， BABE 通过在具有最主要区块的链上做构建来提供概率的确定。

![最佳链的选择](assets/best_chain.png)

在上图中，黑色块已确认。一个是主要的，两个是次要的块。即使最上面的链是最新确定的区块上的最长链，它仍然不符合条件，因为在评估时它的基数比下面的基数少。

## 共识比较

### 中本聪共识

中本聪共识包括最长链规则，该规则以工作量证明作为其 sybil 反抗机制和领导者选举。

中本聪共识只给了我们概率上的终局性。概率终局性指出，过去的区块仅与其确认数或在其之上构建的区块数一样安全。由于在工作量证明链中特定块之上构建了更多块，因此在此特定链之后花费了更多的计算工作。但是，它不能保证包含该块的链将始终保持商定后的链，因为拥有无限资源的参与者可能会构建竞争链并消耗足够的计算资源以创建不包含特定块的链。在这种情况下，比特币和其他工作链证明中采用的最长链规则将作为规范转移到这一新链上。

### PBFT / Tendermint

请参阅 Cosmos 的比较文章中的[相关部分](learn-comparisons-cosmos#consensus)。

<!-- ### HoneyBadgerBFT -->

### Casper FFG

GRANDPA 和 Casper FFG (友好结局小工具) 之间的两个主要区别是：

- 在GRANDPA中，不同的选民可以同时为不同高度的区块投票
- GRANDPA 依靠最终的区块来影响底层区块生产机制的分叉选择规则

### Casper CBC

_未完待续!_

## 资源

- [ GRANDPA 论文](https://github.com/w3f/consensus/blob/master/pdf/grandpa.pdf)- GRANDPA 最终确定性工具的描述。 包含算法证明。
- [Finality Grandpa - Rust 实现](https://github.com/paritytech/finality-grandpa) - 及[ Substrate Runtime 模块](https://github.com/paritytech/substrate/blob/master/srml/grandpa/src/lib.rs)。
- [Polkadot中的区块生产和确认](https://www.crowdcast.io/e/polkadot-block-production) - 说明了 BABE 和 GRANDPA 如何与 Bill Laboon 合作在Kusama 上生产和确认区块的。
