---
id: build-cumulus
title: Cumulus
sidebar_label: Cumulus
---

> Cumulus 云像点状浮在空中，跟这个项目很相像（因为以 Cumulus 云为原型故得名——待项目发展得更酷，我们可能会对它重新命名，敬请期待。）

[Cumulus](https://github.com/paritytech/cumulus)是对Substrate的扩展，可以轻松将任何Substrate构建的运行时转换为与Polkadot兼容的平行链。

## 组件

### Cumulus共识

*Cumulus共识*是Substrate追踪Polkadot中继链的一个共识引擎。它在内部运行一个Polkadot节点并指示客户端和同步算法对哪个链加以追踪、最终确定并视为最佳。

### Cumulus运行时

Cumulus运行时围绕在Substrate运行时周围，使它们得以被Polkadot验证人验证并提供见证生成运行时。它向被验证人调用的Substrate外部界面添加一个`validate_block` API

将它集成到substrate运行时就像导入crate包并将这一行宏添加到代码中一样简单。

```rust
runtime::register_validate_block!(Block, BlockExecutor);
```

### Cumulus Collator

计划为平行链的Polkadot收集人。

## 资源

- [以太坊社区大会上Rob介绍Cumulus的谈话](https://www.youtube.com/watch?v=thgtXq5YMOo)