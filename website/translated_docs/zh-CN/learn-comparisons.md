---
id: learn-comparisons
title: Polkadot 与其它链比较
sidebar_label: 与其它链比较
---

Polkadot 是区块链技术，但带有一些创新使它与其他主流的链不一样。

## [Cosmos](learn-comparisons-ethereum-2)

## [Dfinity](learn-comparisons-cosmos)

## [Dfinity](learn-comparisons-dfinity)

## Tezos

[以太坊](https://ethereum.org)是个智能合约区块链平台，允许通用 计算将被部署在链上并在 p2p 网络中运行。 以太坊1.x是指当前的以太坊版本(在撰写Muir Glacier 硬分叉时)和计划未来的升级。

现在的以太坊 1.x 与 Polkadot 相差是相当大，以太坊是单一链容许开发者扩展其功能把代码(称智能合约)部署到链上。而 Polkadot 白皮书所述，它是个充分可扩展、开发可扩容的区块链、部署和交互测试的試驗台。Polkadot 目的是能够轻松地整合新的区块链、高频交易链甚至联盟链。

实际上，这意味着这两个项目之间的抽象层对于开发人员而言明显不同。 在以太坊中，开发人员编写智能合约，这些合约均在单个虚拟机上执行。 但是，在 Polkadot 中，开发人员将其逻辑写入单独的区块链中，其中接口是区块链本身的状态转换功能的一部分。 Polkadot 还将支持 Wasm 和 EVM 的智能合约区块链，以提供与现有合约的兼容性。

## Tezos

[Tezos](https://tezos.com) 是可以通过自身升级演化的区块链。与 Polkadot 比较，有两个有趣的特点 1.) 治理机制 2.) 智能合约。

Tezos 被描述为**自我修正**，因为链进行升级时，而无需分叉。同样 Polkadot 允许任何平行链集成此功能，并且中继链本身可以通过链上治理进行升级。Polkadot 状态转换函数只是执行 Wasm Blob(在治理系统通过之后)升级，仅意味着切换验证人程序所针对的 Blob 代码。

Tezos 的另一个功能是它的智能合约语言[ Michelson ](https://www.michelson-lang.com/)，它有助于编写形式验证的逻辑。形式验证是一种工具，帮助防止可能导致不良状态转换的错误。虽然 Polkadot 当前是用 Rust 语言编写，但是这种语言缺乏与 Tezos 的实现 OCaml 相同级别的形式验证工具，Rust 被认为是比 C 或 C++ 更安全的语言。此外 Polkadot 对使用友好的语言编写的平行链进行形式验证没有任何限制 - 唯一的要求的逻辑是必须编译为 Wasm。可以预见一些带有形式验证的链条将作为第一类属性出现。此外 Rust 和 Wasm 周围的工具生态系统都已经成熟，并且形式验证工具可能会在某个时候变得更加适用于这些语言。
