---
id: build-cumulus
title: Cumulus
sidebar_label: Cumulus
---

> Cumulus 云像点状浮在空中，跟这个项目很相像（因为以 Cumulus 云为原型故得名——待项目发展得更酷，我们可能会对它重新命名，敬请期待。）

[Cumulus](https://github.com/paritytech/cumulus)是对 Substrate 的扩展，可以轻松将任何 Substrate 构建的 runtime 转换为与 Polkadot 兼容的平行链。

## 组件

### Cumulus 共识

Cumulus Consensus is a consensus engine for Substrate that follows a Polkadot Relay Chain. This will run a Polkadot node internally, and dictate to the client and synchronization algorithms which chain to follow, finalize, and treat as best.

### Cumulus Runtime

A wrapper around Substrate runtimes to allow them to be validated by Polkadot validators and provide witness generating routines. It adds a `validate_block` API to the Substrate external interface, which will be called by validators.

将它集成到 substrate runtime 就像导入 crate 包并将这一行宏添加到代码中一样简单。

```rust
runtime::register_validate_block!(Block, BlockExecutor);
```

### Cumulus 收集人

计划为平行链的 Polkadot 收集人。

## 资源

- [以太坊社区大会上 Rob 介绍 Cumulus 的谈话](https://www.youtube.com/watch?v=thgtXq5YMOo)
