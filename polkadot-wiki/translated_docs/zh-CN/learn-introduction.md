---
id: learn-introduction
title: Polkadot
sidebar_label: Polkadot
---

Polkadot 是个分片的区块链网络，它建立在世界将会有多条需要交互的区块链的理论之上。 Polkadot 将可扩展性、互操作性和安全性统一在一起。

## 为什么是 Polkadot？

Polkadot 允许多条专业领域的（specialized）区块链在安全的无信任环境中相互沟通，从而实现可扩展性。

Polkadot 是为了连接和保护多条独特的区块链，无论它们是公共的、无权限的网络、私人企业集团链、还是 oracles 或其他Web3技术。 它使多条独立区块链在共同的安全保证下交换信息的网络成为可能。

Polkadot 是个有生命力的网络，其核心支柱是民主治理和可更新性。 该网络拥有一套先进的治理工具，以 WebAssembly 标准作为 "元协议"，可以自动部署网络升级。 Polkadot 会适应您不断增长的需求，而不会产生区块链网络分叉的风险。

通过连接这些点, Polkadot 提供了一个去中心化网络的基础服务, 用户控制他们的数据，并且不受网络内信任界线的限制。

## 什么是 Polkadot？

Polkadot 网络使用了一种分片模型，每个分片-被称为 "[平行链（parachain）](learn-parachains)" -在网络中具有独特的状态转换功能 (STF)。 基于 Polkadot 的设计，只要链的逻辑能够编译到 WASM，它就可以作为平行链连接到 Polkadot 网络。

Polkadot 有中继链作为系统的主链。 平行链(parachain) 构造并向中继链上的验证人提议区块，而区块在被添加到最终链之前经过严格的可获得性和有效性检查。 由于中继链提供了安全保障，收集人没有任何安全责任，因此不需要强有力的奖励制度。

为了与其它的区块确认性程序的链条进行交互 (例如: 比特币)，Polkadot 有[桥接链（bridge parachains）](learn-bridges) 提供双向兼容性。

跨链通信协议(XCMP) 允许平行链相互发送任何类型的信息。 中继链的共享安全和验证逻辑为去信任的信息传递提供了环境，开启了真正的跨链互操作性。

## 深入了解

- [架构](learn-architecture) - Polkadot 架构概述。
- [转接桥](learn-bridges) - 转接桥的概述。
- [密码学](learn-cryptography) - 描述 Polkadot 中使用的密码学以及在协议中那里使用。
- [共识](learn-consensus) - 描述 Polkadot 协议中使用的共识类型以及它与其它共识协议的比较。
- [ DOT ](learn-DOT) 关于 DOT 的资料，即 Polkadot 协议的原生代币。
- [治理](learn-governance) - 什么是区块链治理及其在 Polkadot 中的方式。
- [跨链通信](learn-crosschain) - 跨链消息传递的工作方式。
- [平行链](learn-parachains) - 什么是平行链以及它们如何运作。
- [平行链拍卖](learn-auction) - 平行链插槽拍卖的机制。
- [平行线程](learn-parathreads) - 平行线程是在许多平行链-"线程"之间共享插槽的一种方法。
- [ 菲拉格曼法 (Phragmen) ](learn-phragmen) - 有关菲拉格曼法的信息。
- [Polkadot 主机](learn-polkadot-host) - 关于 Polkadot 主机的一般信息。
- [随机性](learn-randomness) - Polkadot 怎么使用随机性以及使用的原因和方式。
- [安全性](learn-security) - Polkadot 网络如何保持安全。
- [ SPREE ](learn-spree)- 共享受保护 runtime 执行环境。
- [抵押](learn-staking) - 抵押在 Polkadot 中的原理。
- [财政部](learn-treasury) - 如何在 Polkadot 和 Kusama 上提出支出建议。
- [ WebAssembly ](learn-wasm) - WebAssembly 的描述及其在 Polkadot 中的用法。

## 资源

- [Launch timeline](learn-launch) - find out about the Polkadot launch plans and schedule
- [Glossary](glossary) - Definitions of domain specific terms used in Polkadot documentation.
- [Implementations](learn-implementations) - List of implementations of the Polkadot protocol (who is building them and links to the source code).
- [Links](learn-relevant-links) - Comprehensive list of external links.
- [Roadmap](learn-roadmap) - The implementation roadmap of Polkadot.
- [FAQ](learn-faq) - Answers to some of the frequently asked questions about Polkadot.
