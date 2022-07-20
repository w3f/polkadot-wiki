---
id: getting-started
title: 入门教程
sidebar_label: 开始
---

欢迎使用 Polkadot Wiki ！这是一份详细介绍如何与波卡核心系统进行交互的指南。wiki 包含三个主要内容：1. 学习 (面向科研)；2. 开发 (面向基于 Polkadot 的个人开发者)；3. 维护 (面向 Polkadot 网络维护者)。

## Polkadot 是什么？

Polkadot 允许多条专用区块链在安全的、无信任环境中相互沟通，从而实现可扩展性。

创建 Polkadot 的目的是为了连接及保护公链、非许可网络、企业集团私有链或是预言机及其他基于 Web3 科技的区块链。它构建了一个可让不同区块链在公共安全保障下，进行信息交换的网络。

Polkadot 是一个有生命力的网络，其核心支柱是社区治理和可迭代性。 该网络拥有一套先进的治理工具，以 [WebAssembly](https://webassembly.org/)标准作为“元协议”，可以自动部署网络升级。 Polkadot 会适应您不断增长的需求，同时不会产生区块链网络分叉的风险。

> 备注: 如果您是第一次听说“社区治理”，可通过该链接学习 [Governance page](learn-governance)

综上所述，Polkadot 作为去中心化网络的基础服务，让用户可不受信任边界的限制，自主控制自己的数据。

## 为什么是 Polkadot？

回到新世纪早期，首次获得大众关注的互联网技术仅有只读、静态等基础网页的功能。 此时的早期网络互联，却是虚拟数据、身份及更多创新的网络新世界的开始。这段时间的互联网也被称为 Web 1.0。

随着社交媒体平台和网络商务的出现，互联网转变为 Web 2.0 。这个我们今天仍在使用的互联网版本，其功能是动态、交互式的网页，用户可以读写信息，或与他人分享用户自己的信息。 但是该版本的网络会涉及数据控制、隐私和信任问题。 这就是 Web 3.0 的意义所在。

Web 3.0 正在将中心化应用转化为去中心化应用、 去信任协议。其目标是将当前版本的互联网转化为一个去中心化的网络，用户可在去信任的环境中掌控其个人数据及身份。 Web 3.0 运动旨在删除中间人并建立一个去信任的公共基础设施。

> 要了解更多关于 Web3 运动的信息，请查看视频 [Web3 Summit](https://youtu.be/l44z35vabvA)

## Polkadot 如何运作？

The Polkadot network uses a [sharded model](<https://en.wikipedia.org/wiki/Shard_(database_architecture)>) where shards - called "[parachains](learn-parachains)", allow transactions to be processed in parallel instead of sequentially. Each parachain in the network has a unique state transition function (STF). Based on Polkadot's design, as long as a chain's logic can compile to Wasm and adheres to the Relay Chain API, then it can connect to the Polkadot network as a parachain.

Polkadot has a Relay Chain acting as the main chain of the system. Parachains construct and propose blocks to validators on the Relay Chain, where the blocks undergo rigorous [availability and validity](learn-availability) checks before being added to the finalized chain. As the Relay Chain provides the security guarantees, [collators](learn-collator) - full nodes of these parachains - don't have any security responsibilities, and thus do not require a robust incentive system. This is how the entire network stays up to date with the many transactions that take place.

![polkadot-relay-chain](assets/polkadot_relay_chain.png)

为了与其它的区块确认性程序的链条进行交互 (例如: 比特币)，Polkadot 有[桥接链（bridge parachains）](learn-bridges) 提供双向兼容性。

The [Cross-Chain Messaging Protocol (XCMP)](learn-xcm) allows parachains to send messages of any type to each other. The shared security and validation logic of the Relay Chain provide the environment for trust-free message passing that opens up true interoperability.

> 观看一个有关 Polkadot 简短的，适合初学者的动画，请访问我们的网站。 [Polkadot Explainer video](https://www.youtube.com/watch?v=_-k0xkooSlA)

## 为何要使用 Polkadot？

Whether you're a blockchain developer or if you're interested in taking part of [Polkadot's community](https://polkadot.network/polkadot-ambassador-program/), Polkadot offers a platform for everyone. This wiki offers a place for builders and maintainers to utilize [tools](build-tools-index) and for brand-new learners to dive into educational material.

## 入门教程

For brand-new learners of Blockchain technology:

- The [Blockchain Fundamentals MOOC course][mooc] is a great introduction to familiarizing yourself with cryptography, blockchain concepts, decentralization, networks, crytocurrency, and so much more. This is recommended for users with backgrounds of all levels, and is also a free course.

For brand-new learners of Polkadot:

- [Polkadot 原始白皮书][white paper] 是一篇技术文档，描述了 Polkadot 网络技术可能的发展方向。文档通过对原理的阐述和技术实现的细节说明来验证其可行性。原始白皮书也描述了 Polkadot 的核心团队是如何协同合作来构建这个去中心化网络的。
- [Polkadot's overview paper][overview-paper] 是更新版本的白皮书，用更专业的方式描述了该网络协议。若您有兴趣深入研究协议本身，我们建议您阅读这份白皮书。
- [Polkadot's lightpaper ][light paper]是一个更直观，方便阅读文档。这份文档比较少使用技术数据，可以让你不需要了解太多技术知识的情况下，就可以对 Polkadot 有更深入的理解。
- [Polkadot's specification][spec]是一个 Github 代码库，其中包含最新的 Polkadot 主机协议规范、Polkadot 对网络中许多组件的测试规范，以及 Polkadot Runtime 规范。该代码库存有算法，并探讨各种进程如何在 Polkadot 网络中发挥作用。Polkadot 规范将 Polkadot 的思想和概念从聚光灯下和白皮书中提取出来，聚焦于技术规范的技术说明。
- [观看技术演示][teched videos]: 这些是解释及演示如何使用 Polkadot 及其 [用户界面][ui]的介绍视频。
- 在 Medium 上阅读 [What is Polkadot? A Brief Introduction][article] 。您也可以在 [Polkadot's Medium][p medium] 或 [Web3 Foundation's Medium][w medium]上阅读其余优质文章。
- [创建 Polkadot 帐户][account generation]
- [发起转账][transfer]
- [作为提名人进行抵押 (Staking)][nominator]
- [作为验证节点运行][validator]
- [身份设定][identity]
- [创建代理账户][proxy]
- [发起提案及投票][democracy]
- [加入议会][council]
- [投票选举议员][council voting]
- [使用国库][treasury]

For brand-new learners of Kusama, Polkadot's canary cousin network: To learn more about how to build and maintain on the Kusama network, please head over to our [Kusama Guide][kusama guide].

## 相关阅读

- [Polkadot Crowdcast](https://www.crowdcast.io/polkadot) - Web3 基金会过往 Crowdcast 网络会议列表
- [Polkadot Explorer](https://polkadot.js.org/apps/#/explorer)-Polkadot 网络浏览器，可用于 Polkadot、Kusama 或其他基于 Substrate 的区块链网络。
- [Polkascan](http://polkascan.io/) - Polkadot 中继链及其他 Substrate 链的实时多链数据。
- [Subscan.io](https://subscan.io) - Substrate 链浏览器。
- [Polkadot Overview](https://youtu.be/lIghiCmHz0U) - Gavin Wood 博士对 Polkadot 的视频介绍。（视频）
- [Polkadot Overview](https://techcrunch.com/video/fireside-chat-with-jutta-steiner-parity-technologies/) - Jutta Steiner 博士对 Polkadot 的视频介绍。（视频）
- [Polkadot & Substrate Overview](https://www.youtube.com/watch?v=0IoUZdDi5Is&feature=youtu.be) - Gavin Wood 博士对 Substrate（区块链框架及 VM）和 Polkadot，并在 30 分钟内基于 Substrate 构建了一个可运行的区块链。（视频）
- [社区/生态 ](community) - 谈论 Polkadot 的社区频道列表。
- [范例程序](build-examples-index) - 基于 Polkadot 的应用案例及开发中的案例。
- [贡献手册](contributing) - wiki 贡献者奖励规则。
- [Polkadot 知识库](https://support.polkadot.network/) - 一些特定错误和问题的疑难解答。

[mooc]: https://mooc.web3.foundation/course/blockchain-fundamentals/

[white paper]: https://polkadot.network/PolkaDotPaper. pdf
[overview-paper]: https://github.com/w3f/research/blob/master/docs/papers/OverviewPaper-V1.pdf
[light paper]: https://polkadot.network/Polkadot-lightpaper.pdf
[spec]: https://github.com/w3f/polkadot-spec
[teched videos]: https://www.youtube.com/watch?v=mNStMPZjiHM&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8
[article]: https://medium.com/polkadot-network/what-is-polkadot-a-brief-introduction-ca3eac9ddca5
[p medium]: https://medium.com/polkadot-network
[w medium]: https://medium.com/web3foundation
[ui]: https://polkadot.js.org/apps/
[account generation]: learn-account-generation
[transfer]: learn-balance-transfers
[nominator]: maintain-guides-how-to-nominate-polkadot
[validator]: maintain-guides-how-to-validate-polkadot
[identity]: learn-identity
[proxy]: learn-proxies
[democracy]: maintain-guides-democracy
[council]: maintain-guides-how-to-join-council
[council voting]: maintain-guides-how-to-vote-councillor
[treasury]: learn-treasury
[kusama guide]: https://guide.kusama.network/
