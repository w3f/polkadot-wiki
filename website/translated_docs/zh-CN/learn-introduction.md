---
id: learn-introduction
title: Polkadot
sidebar_label: Polkadot
---

Polkadot is a sharded blockchain based on the thesis that the world will have several blockchains that need to interact. Polkadot unites scalability, interoperability, and security.

## 为什么是 Polkadot？

Polkadot enables scalability by allowing specialized blockchains to communicate with each other in a secure, trust-free environment.

Polkadot is built to connect and secure unique blockchains, whether they be public, permission-less networks, private consortium chains, or oracles and other Web3 technologies. It enables an internet where independent blockchains can exchange information under common security guarantees.

Polkadot is a living network with the core pillars of governance and upgradability. The network has an advanced suite of governance tools and, using the WebAssembly standard as a "meta-protocol", can autonomously deploy network upgrades. Polkadot adapts to your growing needs without the risks of network forks.

By connecting these dots, Polkadot serves as a foundational part of a decentralized web, where users control their data and are not limited by trust bounds within the network.

## 什么是 Polkadot？

The Polkadot network uses a sharded model where shards - called "[parachains](learn-parachains)" - in the network have unique state transition functions (STF). Based on Polkadot's design, as long as a chain's logic can compile to Wasm, then it can connect to the Polkadot network as a parachain.

Polkadot has a Relay Chain acting as the main chain of the system. Parachains construct and propose blocks to validators on the Relay Chain, where the blocks undergo rigorous availability and validity checks before being added to the finalized chain. As the Relay Chain provides the security guarantees, collators don't have any security responsibilities, and thus do not require a robust incentive system.

In order to interact with chains that want to use their own finalization process (e.g. Bitcoin), Polkadot has [bridge parachains](learn-bridges) that offer two-way compatibility.

The Cross-Chain Messaging Protocol (XCMP) allows parachains to send messages of any type to each other. The shared security and validation logic of the Relay Chain provide the environment for trust-free message passing that opens up true interoperability.

## 深入了解

- [架构](learn-architecture) - Polkadot 架构概述。
- [转接桥](learn-bridges) - 转接桥的概述。
- [密码学](learn-cryptography) - 描述 Polkadot 中使用的密码学以及在协议中那里使用。
- [共识](learn-consensus) - 描述 Polkadot 协议中使用的共识类型以及它与其它共识协议的比较。
- [ DOT ](learn-DOT) 关于 DOT 的资料，即 Polkadot 协议的原生代币。
- [治理](learn-governance) - 什么是区块链治理及其在 Polkadot 中的方式。
- [Cross-chain Communication](learn-crosschain) - Information regarding how cross-chain messaging works.
- [平行链](learn-parachains) - 什么是平行链以及它们如何运作。
- [平行链拍卖](learn-auction) - 描述了平行链插槽拍卖的机制。
- [平行线程](learn-parathreads) - 平行线程是在许多平行链-"线程"之间共享平行链插槽的一种方法。
- [ 菲拉格曼法 (Phragmen) ](learn-phragmen) - 有关菲拉格曼法的信息。
- [Polkadot Host](learn-polkadot-host) - General information on the Polkadot Host.
- [随机性](learn-randomness) - Polkadot 怎么使用随机性以及使用的原因和方式。
- [安全性](learn-security) - Polkadot 网络如何保持安全。
- [ SPREE ](learn-spree)- 共享受保护 runtime 执行环境。
- [抵押](learn-staking) - 抵押在 Polkadot 中的原理。
- [财政部](learn-treasury) - 如何在 Polkadot 和 Kusama 上提出支出建议。
- [ WebAssembly ](learn-wasm) - WebAssembly 的描述及其在 Polkadot 中的用法。

## 资源

- [词汇表](glossary) - Polkadot 文档中使用的特定领域术语的定义。
- [实现](learn-implementations)- Polkadot 协议实现的列表（那些团队在构建它们和链接到源代码）。
- [链接](learn-relevant-links) - 外部链接的完整列表。
- [路线图](learn-roadmap) - Polkadot 的实现路线图。
- [常见问题](learn-faq) - 回答有关 Polkadot 的一些常见问题。
