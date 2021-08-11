---
id: learn-polkadot-host
title: Polkadot 组件
sidebar_label: Polkadot 组件
---

Polkadot 的架构可以分为两个不同的部分：Polkadot _runtime_和 Polkadot _主机_。 Polkadot runtime 是链的核心状态转变逻辑，可以在一段时间内升级而不需要硬分叉。 相比 Polkadot 的主机是执行 runtime 的环境并且保持稳定和在 Polkadot 的生命周期内保持静态状态。

The Polkadot host interacts with the Polkadot runtime in limited, and well-specified ways. For this reason, implementation teams can build an alternative implementation of the Polkadot host while treating the Polkadot runtime as a black box. For more details of the interactions between the host and the runtime, please see the [specification](https://github.com/w3f/polkadot-spec/).

## Polkadot 主机组件

- 网络组件如 Libp2p 用于网络的交互 。
- 狀態储存和 storage trie 与数据库
- GRANDPA 和 BABE 的共识引擎。
- Wasm 解析器和虚拟机.
- 底层原始的区块链功能例如像密码学的哈希函数。

编译了的 Polkadot runtime，Wasm 代码可以上传到 Polkadot 主机并用作执行状态转变的逻辑。没有 runtime，Polkadot 主机无法进行状态转变或生成任何区块。

## 图表

下面是显示了 Polkadot runtime 周围的 Polkadot 主机图表。试想像 runtime (白色) 作为是一个可以插入、交换或完全删除的组件。灰色中的部分是稳定的，如果没有明确的硬分叉，就不能更改。

![polkadot host](assets/updated_pre.png)

## 资源

- [Polkadot Host Protocol Specification](https://github.com/w3f/polkadot-spec) - Incubator for the Polkadot Host spec, including tests.
- [ChainSafe's Go PH](https://github.com/ChainSafeSystems/go-pre) is a 25-person development team based in Toronto, Canada. ChainSafe is building an implementation of the beacon chain for Ethereum 2.0 client in TypeScript and this Go implementation of Polkadot.
