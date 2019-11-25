---
id: learn-comparisons
title: Polkadot 与其它链比较
sidebar_label: 与其它链比较
---

Polkadot 是区块链技术，但带有一些创新使它与其他主流的链不一样。

## [Cosmos](learn-comparisons-cosmos)

## [Dfinity](learn-comparisons-dfinity)

## Ethereum

[Ethereum](https://ethereum.org)是区块链智能合约平台，通过P2P网络运作并允许在链上进行运算。

### 以太坊1.x

以太坊1.x的指的是当前的版本和未来即将计划的升级。

现在的以太坊与Polkadot相差是相当大，以太坊是单一链容许开发者扩展其功能把代码(称智能合约)部署到链上。而Polkadot白皮书所述，它是个充分可扩展、开发可扩容的区块链、部署和交互测试的試驗台。Polkadot目的是能够轻松地整合新的区块链、高频交易链甚至联盟链。

实际上对于开发者来说这两个项目之间的抽象层是非常不同。在以太坊，开发者编写代码并部署到人人可参与的环境中，在这种环境中，智能合约可以无缝地与其它智能合约交互操作。而 Polkadot 的情况并非如此，Polkadot 现有开发方式是采取 Substrate runtime 模组，这些只是Wasm blobs，它决定了整个链的状态转换函数(State Transition Function - STF)逻辑。

### 以太坊2.0

以太坊2.0是指计划中的分片链，目前正在开发中和现有[规格](https://github.com/ethereum/eth2.0-specs/tree/0.4.0)。

表面上看 Eth2.0 的信标链和分片链与 Polkadot 的中继链和平行链是可比的，但是最主要分别Eth2.0 分片是_homogeneous_，而 Polkadot 平行链是_heterogeneous_，意味着在 Polkadot 中的链逻辑上有更大的弹性，还可以与整个网络共享安全，而 Eth2.0 分片都是相同的逻辑。

Eth2.0 信标链使用了 LMD(Latest Message-Driven)GHOST 作为其 fork-choice 规则，而 Polkadot 中继链使用 BABE 产生区块和 GRANDPA 作为最终确定性组件。

## Tezos

[Tezos](https://tezos.com) 是可以通过自身升级演化的区块链。与 Polkadot 比较，有两个有趣的特点 1.) 治理机制 2.) 智能合约。

Tezos 被描述为**自我修正**，因为链进行升级时，而无需分叉。同样  Polkadot 允许任何平行链集成此功能，并且中继链本身可以通过链上治理进行升级。Polkadot 状态转换函数只是执行 Wasm Blob(在治理系统通过之后)升级，仅意味着切换验证人程序所针对的 Blob 代码。Substrate 库中的[ upgrade-key ](https://github.com/paritytech/substrate/blob/master/srml/upgrade-key/src/lib.rs)模块使任何由 Substrate 构建的链使此操作变得容易实现。

Tezos 的另一个功能是它的智能合约语言[ Michelson ](https://www.michelson-lang.com/)，它有助于编写形式验证的逻辑。形式验证是一种工具，帮助防止可能导致不良状态转换的错误。虽然 Polkadot 当前是用 Rust 语言编写，但是这种语言缺乏与 Tezos 的实现 OCaml 相同级别的形式验证工具，Rust 被认为是比 C 或 C++ 更安全的语言。此外 Polkadot 对使用友好的语言编写的平行链进行形式验证没有任何限制 - 唯一的要求的逻辑是必须编译为 Wasm。可以预见一些带有形式验证的链条将作为第一类属性出现。此外 Rust 和 Wasm 周围的工具生态系统都已经成熟，并且形式验证工具可能会在某个时候变得更加适用于这些语言。
