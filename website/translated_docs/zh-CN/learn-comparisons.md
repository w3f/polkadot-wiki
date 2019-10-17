---
id: learn-comparisons
title: Polkadot comparisons
sidebar_label: Other comparisons
---

Polkadot is a blockchain technology but makes some innovations that set it apart from other popular chains.

## [Cosmos](learn-comparisons-cosmos)

## Ethereum

[Ethereum](https://ethereum.org)是区块链智能合约平台，通过P2P网络运作并允许在链上进行运算。

### 以太坊1.x

以太坊1.x的指的是当前的版本和未来即将计划的升级。

现在的以太坊与Polkadot相差是相当大，以太坊是单一链容许开发者扩展其功能把代码(称智能合约)部署到链上。而Polkadot白皮书所述，它是个充分可扩展、开发可扩容的区块链、部署和交互测试的試驗台。Polkadot目的是能够轻松地整合新的区块链、高频交易链甚至联盟链。

实际上对于开发者来说这两个项目之间的抽象层是非常不同。在以太坊，开发者编写代码并部署到人人可参与的环境中，在这种环境中，智能合约可以无缝地与其它智能合约交互操作。而Polkadot的情况并非如此，Polkadot现有开发方式是采取Substrate runtime模组，这些只是Wasm blobs，它决定了整个链的状态转换函数(State Transition Function - STF)逻辑。

### 以太坊2.0

以太坊2.0是指计划中的分片链，目前正在开发中和现有[规格](https://github.com/ethereum/eth2.0-specs/tree/0.4.0)。

表面上看Eth2.0的信标链和分片链与Polkadot的中继链和平行链是可比的，但是最主要分别Eth2.0分片是_homogeneous_，而Polkadot平行链是_heterogeneous_，意味着在Polkadot中的链逻辑上有更大的弹性，还可以与整个网络共享安全，而Eth2.0分片都是相同的逻辑。

Eth2.0信标链使用了LMD(Latest Message-Driven)GHOST作为其fork-choice规则，而Polkadot中继链使用BABE产生区块和GRANDPA作为最终确定性组件。

## Tezos

[Tezos](https://tezos.com) is a blockchain that can evolve by upgrading itself. Two interesting feature to compare Polkadot to is its governance mechanism and smart contracts.

Tezos is described as __self-amending__ because it can enact an upgrade to the chain without having to fork. Likewise, Polkadot allows for any parachain to integrate this functionality and the relay chain itself is able to be upgraded through an on-chain process. Since Polkadot state transition functions are just Wasm blobs to perform an upgrade (after it has been approved by the governance system) simply means switching out the code blob for which validators are validating against. The [upgrade-key](https://github.com/paritytech/substrate/blob/master/srml/upgrade-key/src/lib.rs) module in the Substrate library makes this easy for any Substrate-built chain to implement.

Another feature of Tezos is its smart contract language [Michelson](https://www.michelson-lang.com/) which facilitates formal verification of the written logic. Formal verification is a tool which can help to prevent bugs that could lead to unwanted state transitions. Although Polkadot is currently written in the Rust language, which lacks the same level of formal verification tools as Tezos' implementation language OCaml, Rust is considered a safer language than C or C++ for systems programming. Furthermore, Polkadot makes no restrictions to parachains written in more friendly languages for formal verification-- the only requirement is that the logic must compile to Wasm. It is expected that some chains will emerge written with formal verification as a first class property. Additionally, the tooling ecosystem around both Rust and Wasm are both maturing and formal verification tools may at some point become more widely available for these languages.
