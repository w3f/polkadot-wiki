---
id: learn-comparisons
title: Polkadot comparisons
sidebar_label: Polkadot comparisons
---

# 以太坊

[Ethereum](https://ethereum.org)是区块链智能合约平台，通过P2P网络运作并允许在链上进行运算。

### 以太坊1.x

以太坊1.x的指的是当前的版本和未来即将计划的升级。

现在的以太坊与Polkadot相差是相当大，以太坊是单一链容许开发者扩展其功能把代码(称智能合约)部署到链上。而Polkadot白皮书所述，它是个充分可扩展、开发可扩容的区块链、部署和交互测试的試驗台。Polkadot目的是能够轻松地整合新的区块链、高频交易链甚至联盟链。

实际上对于开发者来说这两个项目之间的抽象层是非常不同。在以太坊，开发者编写代码并部署到人人可参与的环境中，在这种环境中，智能合约可以无缝地与其它智能合约交互操作。而Polkadot的情况并非如此，Polkadot现有开发方式是采取Substrate runtime模组，这些只是Wasm blobs，它决定了整个链的状态转换函数(State Transition Function - STF)逻辑。

### 以太坊2.0

以太坊2.0是指计划中的分片链，目前正在开发中([现有设计规格](https://github.com/ethereum/eth2.0-specs/tree/0.4.0))。

表面上看Eth2.0的信标链和分片链与Polkadot的中继链和平行链是可比的，但是最主要分别Eth2.0分片是homogeneous，而Polkadot平行链是heterogeneous，意味着在Polkadot中的链逻辑上有更大的弹性，还可以与整个网络共享安全，而Eth2.0分片都是相同的逻辑。

Eth2.0信标链使用了LMD(Latest Message-Driven)GHOST作为其fork-choice规则，而Polkadot中继链使用BABE产生区块和GRANDPA作为最终确定性组件。