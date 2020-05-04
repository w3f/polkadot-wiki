---
id: learn-polkadot-host
title: Polkadot 组件
sidebar_label: Polkadot 组件
---

Polkadot的架构可以分为两个不同的部分： Polkadot _runtime_和 Polkadot _组件_。 Polkadot runtime 是链的核心状态转变逻辑，可以在一段时间内升级而不需要硬分叉。 相比 Polkadot 的主机是执行 runtime 的环境并且保持稳定和在 Polkadot 的生命周期内保持静态状态。

Polkadot 主机与 Polkadot runtime 进行交互是受到限制，并且有明确规定的方式。出于这个原因，实现团队可以建立备选的的 Polkadot 主机程序用 Polkadot runtime 视为一个黑箱。 欲了解更多主机与 runtime 之间互动的详细信息，请参阅 [规格](https://github.com/w3f/polkadot-spec/blob/master/runtime-environment-spec/polkadot_re_spec.pdf)。

## Polkadot 的组件

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

- [Polkadot 主机协议规格](https://github.com/w3f/polkadot-spec) - Polkadot 规格，包括测试。
