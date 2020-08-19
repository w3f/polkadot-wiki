---
id: learn-architecture
title: 架构
sidebar_label: 架构
---

Polkadot 是具有可扩展安全性和互操作性协议的异构多链协议。

## 中继链 (Relay Chain)

The Relay Chain is the central chain of Polkadot. All validators of Polkadot are staked on the Relay Chain in DOT and validate for the Relay Chain. The Relay Chain is composed of a small number of transaction types that include ways to interact with the governance mechanism, parachain auctions, and participating in NPoS. Transactions on the Relay Chain will likely be priced higher than they will be on parachains. This is because most of the computational work is expected to be delegated to the parachains, which have differing implementations and features.

## [平行链 (Parachains)](build-deploy-parachains)

整个 Polkadot 网络上发生的大部分计算都将委托给各种用例的特定平行链处理。 Polkadot 对平行链的功能没有任何限制，除了它们必须能够生成由分配给平行链的验证者进行验证的证明外。一些平行链可能是 DApp 特定的，其他平行链可能专注于诸如隐私或扩容性的特定功能 -- 其他平行链可能是实验性架构，本质上不一定需要是区块链。

## 共享状态 (Shared State)

Polkadot 在中继链和所有连接的平行链之间具有共享状态。如果中继链由于某种原因必须还原，那么所有平行链也将还原。 这是为了确保整个系统的有效性可以持续存在，并且各个部分都不会损坏。

共享状态使得使用 Polkadot 平行链时的信任假设仅是中继链上的验证人，而没有其他。由于预期中继链上设置的验证人是安全的，并且要有大量 DOT 抵押支持该验证人，因此平行链最好受益于这种安全性。

## 白板系列

有关 Polkadot 架构的视频概述，请观看下面的视频，W3F 研究员 Alistair Stewart 的白板访问: <iframe width="560" height="315" src="https://www.youtube.com/embed/xBfC6uTjvbM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>
