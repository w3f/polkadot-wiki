---
id: learn-wasm
title: WebAssembly (Wasm)
sidebar_label: WebAssembly (Wasm)
---

WebAssembly 被使用于 Polkadot 和 Substrate 作为 runtime 的编译目标。

## 什么是 WebAssembly？

WebAssembly 簡稱 _Wasm_ 是基于堆栈的虚拟机的二进制指令格式。Wasm 被设计为编译高级语言为目标例如 C/C++/Rust ，为使客户端和服务器程序能部署到 Web 上。

## 为什么需要 WebAssembly?

WebAssembly 是平台中立性二进制格式，意味着不管是什么计算机运行，它也会执行相同指示。区块链需要确定性使在点对点网络中的所有节点上具有可靠的状态转换更新，而无需强制所有节点运行相同硬件。 Wasm 非常适合在各种计算机之间实现可靠性。 Wasm 既高效又快速。效率意味着它可以作为代码 blob 上载到链中，而不会造成过多的状态膨胀，同时保持其以接近原生速度执行的能力。

### Forkless Upgrades

By using Wasm in Substrate, the framework powering Polkadot, Kusama, and many connecting chains, the chains are given the ability to upgrade their runtime logic without hard forking. Hard forking is a standard method of upgrading a blockchain that is slow, inefficient, and error prone due to the levels of offline coordination required, and thus the propensity to bundle many upgrades into one large-scale event. By deploying Wasm on-chain and having nodes auto-enact the new logic at a certain block height, upgrades can be small, isolated, and very specific.

## 资源

- [WebAssembly.org](https://webassembly.org/) - WebAssembly 官网内有规格。
- [Wasmi](https://github.com/paritytech/Wasmi) - 使用 Rust 编写的 WebAssembly 解释器。
- [Parity Wasm](https://github.com/paritytech/parity-Wasm)- Rust 中的 WebAssembly 序列化/反序列化。
- [ Wasm utils ](https://github.com/paritytech/Wasm-utils)-用于 Parity 和 Wasm 合同开发的 Wasm 实用程序合集。
