---
id: learn-introduction
title: What is Polkadot?
sidebar_label: What is Polkadot?
---

Polkadot enables scalability by allowing specialized blockchains to communicate with each other in a secure, trust-free environment.

Polkadot is built to connect and secure unique blockchains, whether they be public, permission-less networks, private consortium chains, or oracles and other Web3 technologies. It enables an internet where independent blockchains can exchange information under common security guarantees.

Polkadot is a living network with the core pillars of governance and upgradability. The network has an advanced suite of governance tools and, using the WebAssembly standard as a "meta-protocol", can autonomously deploy network upgrades. Polkadot adapts to your growing needs without the risks of network forks.

By connecting these dots, Polkadot serves as a foundational part of a decentralized web, where users control their data and are not limited by trust bounds within the network.

## 为什么是 Polkadot？

The Polkadot network is heading towards a future with a secure ecosystem for decentralized applications (built with blockchain technology) to communicate and interact in. Polkadot has deep roots in the blockchain industry and working hard to build on existing blockchain concepts like governance, scalibility, and many more.

Back in the early 2000's, when the internet was gaining popularity for the first time, the internet featured read-only, static, basic webpages. The online connected world at the time was only the beginning of virtual data, identities, and more. The internet during this time was also called the Web 1.0.

As social media platforms and online businesses began to emerge, the internet transformed into the Web 2.0. This upgraded internet, which we still use today, features dynamic, interactive webpages, where users can read and write information plus publish their own for others to see. This version of the web though, comes with downsides dealing with data control, privacy issues, and trust. This is where the Web 3.0 comes into the picture.

The Web 3.0 is taking centralized applications and turning them into decentralized, trust-free protocols. The goal is to transform the internet into a decentralized web, where users control their own data and identity in a trust-free environment. The Web 3.0 movement aims to remove intermediaries and build a trustless infrastructure.

> To learn more of the Web3 movement, check out this video from the [Web3 Summit](https://youtu.be/l44z35vabvA)

## How does Polkadot work?

The Polkadot network uses a sharded model where shards - called "[parachains](learn-parachains)" - in the network have unique state transition functions (STF). Based on Polkadot's design, as long as a chain's logic can compile to Wasm, then it can connect to the Polkadot network as a parachain.

Polkadot has a Relay Chain acting as the main chain of the system. Parachains construct and propose blocks to validators on the Relay Chain, where the blocks undergo rigorous availability and validity checks before being added to the finalized chain. As the Relay Chain provides the security guarantees, collators don't have any security responsibilities, and thus do not require a robust incentive system.

In order to interact with chains that want to use their own finalization process (e.g. Bitcoin), Polkadot has [bridge parachains](learn-bridges) that offer two-way compatibility.

The Cross-Chain Messaging Protocol (XCMP) allows parachains to send messages of any type to each other. The shared security and validation logic of the Relay Chain provide the environment for trust-free message passing that opens up true interoperability.

> To watch a short, beginner-friendly animation on Polkadot, check out our [Polkadot Explainer video](https://www.youtube.com/watch?v=_-k0xkooSlA)

## Why should you use Polkadot?

Whether you're a blockchain developer or if you're interested in taking part of Polkadot's community, Polkadot offers a platform for everyone. This Wiki offers a place for Builders and Maintainers to utilize tools and for brand-new learners to dive into material. In fact, the best place to start is the [Getting Started](getting-started) page.

## Digging deeper

- [架构](learn-architecture) - Polkadot 架构概述。
- [转接桥](learn-bridges) - 转接桥的概述。
- [密码学](learn-cryptography) - 描述 Polkadot 中使用的密码学以及在协议中那里使用。
- [共识](learn-consensus) - 描述 Polkadot 协议中使用的共识类型以及它与其它共识协议的比较。
- [DOT](learn-DOT) - Information on DOT, the native token of the Polkadot protocol.
- [治理](learn-governance) - 什么是区块链治理及其在 Polkadot 中的方式。
- [跨链通信](learn-xcm) - 跨链消息传递的工作方式。
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
