---
id: build-cumulus
title: Cumulus
sidebar_label: Cumulus
---

> Cumulus 云像点状浮在空中，跟这个项目很相像（因为以 Cumulus 云为原型故得名——待项目发展得更酷，我们可能会对它重新命名，敬请期待。）

[Cumulus](https://github.com/paritytech/cumulus)是对 Substrate 的扩展，可以轻松将任何 Substrate 构建的 runtime 转换为与 Polkadot 兼容的平行链。

## 组件

### Cumulus 共识

_Cumulus 共识_是 Substrate 追踪 Polkadot 中继链的一个共识引擎。它在内部运行 Polkadot 节点并指示客户端和同步算法对哪个链加以追踪、最终确定并视为最佳。

### Cumulus Runtime

Substrate runtime 的包装器，使它们可以由 Polkadot 验证人验证并提供见证生成程序。它向被验证人调用的 Substrate 外部界面添加`validate_block` API

将它集成到 substrate runtime 就像导入 crate 包并将这一行宏添加到代码中一样简单。

```rust
runtime::register_validate_block!(Block, BlockExecutor);
```

### Cumulus 收集人

计划为平行链的 Polkadot 收集人。

## 资源

- [以太坊社区大会上 Rob 介绍 Cumulus 的谈话](https://www.youtube.com/watch?v=thgtXq5YMOo)
