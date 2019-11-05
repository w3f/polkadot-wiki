---
id: learn-PRE
title: Polkadot Runtime 环境 (PRE)
sidebar_label: Polkadot Runtime 环境 (PRE)
---

Polkadot Runtime 环境是 Polkadot 协议的重要组成部分。 它由网络层，共识和 Wasm VM 子系统组成，并充当 Polkadot runtime 和平行链 runtime 的基础堆栈底层。Polkadot RE 可以视为运行Polkadot 中继链的虚拟机的同义词（尽管如下所述，链逻辑本身与其运行的 PRE 之间有明显的分隔）。

Polkadot RE 组件为：

- 网络交互
- 状态存储和 Trie 树
- 共识引擎
- Wasm 虚拟机 (VM)

Runtime（定义为实现链逻辑的代码）与 Polkadot RE 分离。 这两个组件的分离使 runtime 可以轻松升级，而无需升级 Polkadot RE。

Polkadot runtime（以及平行链 runtime）必须编译成 WebAssembly(Wasm) Blob。 Polkadot runtime 将 "插件" 放到 Polkadot RE 并且可以通过治理机制进行交换。

下图取自 Gavin Wood 在 Substrate 上展示的[ PPT ](https://slides.com/paritytech/paritysubstrate#/8)，并演示了 Polkadot 堆栈的四 层 。

![PRE](assets/PRE.png)

## 资源

- [ Polkadot Runtime 环境协议规范](https://github.com/w3f/polkadot-re-spec) - PRE 规范的孵化器。
- [ polkadot-re-tests ](https://github.com/w3f/polkadot-re-tests) - 不同 Polkadot Runtime 环境的实现测试。
