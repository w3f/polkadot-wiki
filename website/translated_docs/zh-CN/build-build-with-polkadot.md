---
id: build-build-with-polkadot
title: Polkadot Builders Starter's Guide
sidebar_label: Polkadot Builders Starter's Guide
---

_本文是Medium博客上: [Everything you Need to Know to Prepare for Polkadot的最新版本](https://medium.com/polkadot-network/everything-you-need-to-know-to-prepare-for-polkadot-32d08b929735)_

Polkadot是个网络协议，缩短了区块链开发者的开发时间。以前发布和维护着一个新的区块链需要用数年时间，但利用Polkadot只需要数星期甚至几天就可以了。

本指南将带领你了解现在如何开始在Polkadot上建立你的愿景，也会讲解平行链与智能合约的分别(和为什么其中一样会更加适合你的应用程序)

## 我们处于哪里？

- 自定义费用结构 (例如:支付固定交易费用 或 按字节计算)
- 自定义代币通涨政策
- 通过状态转变函数分配财政
- Substrate: **1.0.0**
- Cumulus: **Initial release: October 2019**
- ink!: **Pre-Alpha**

**What you need to know**: Polkadot is currently on the v0.6 release with a running testnet named Alexander and Kusama, a value-bearing canary network. The Alexander testnet has been live for over 6 months through the entire PoC-3 and PoC-4 release cycles. Polkadot is being built with [implementations in various programming languages](learn-implementations) ranging from Rust to JavaScript. Currently the leading implementation is built in Rust and using the Substrate framework for developing blockchains. Substrate is a library that allows developers to more easily develop entire blockchains by building from a base layer including a networking protocol, consensus, and a Wasm interpreter. An in-development extension to Substrate called Cumulus will allow any Substrate built chain to connect to Polkadot and become a parachain. Substrate has had a 1.0.0 release, which settled its API for the time being.

Substrate chains can include smart contract functionality by using the provided [contracts runtime module from the SRML](https://github.com/paritytech/substrate/tree/master/srml/contracts). This module allows for smart contracts compiled to Wasm code to be deployed to the chain and instantiated by users. To facilitate development of Wasm smart contracts, Parity is also developing [ink!](https://github.com/paritytech/ink), a domain specific language built in Rust that is intended for writing smart contracts.

Polkadot is planned to go live with an initial release at the end of 2019, depending on security audits and launch provisions outside of control of the team. Now that the tools have started to appear and stabilize, there has not been a better time to get your feet wet and start preparing for launch. But wait! Before you jump head-first into the code, you should think about the kind of decentralized application you want to make and understand the different paradigms available to developers who want to build for Polkadot.

## 平行链/平行线程与智能合约有什么区别?

使用其中任何一个都需要衡量比较，阅读本节将有助你理解它们的分別。

平行链是独立的链连接到Polkadot网络取得中继链上验证人的共享安全和跨链消息传递。平行链提供了极大灵活性和可定制，但将需要更多时间来构建。

Parathreads are like parachains and enable the developer to have lower-level control of the logic of their application. The main difference between the two is economic, since parathreads will be much less expensive to secure than a parachain. The lower costs of parathreads are due to the fact that parathreads will only produce a block when they need to, unlike parachains which have secured a slot to produce a block at every block of the relay chain. When building a parathread, you will use the same tools (like PDKs) and you get all of the benefits of building a parachain, without the drawback of the cost.

当Polkadot主网上线后，将会有一个或多个智能合约平台会成为平行链，智能合约是仅存在于某个链上并且执行复杂性有限的程序。因为它们只存在于单一链，所以它们很容易跟其它在同一链内的智能合约互相沟通，但是它们将始终会受到主链的固有特性约束和限制。

如果你想对你的应用程序设计和功能拥有更大的自由度，平行链是更好的选择。请记住智能合约可以作为试验场，然后再把它变成平行链。智能合约平台通常会有更方便的工具像IDE以促进快速迭代。另外可以先创建一个智能合约MVP来评估用户的兴趣，然后再全力构建平行链。

平行链会为开发者提供更多空间从头开始建立链的货币体制，它提供比智能合约平台更简洁和有效地执行复杂的逻辑，平行链还提供治理的形式，并且可以比现有硬分叉的过程减少争议的方式进行升级。

Some examples of features you can have on a parachain or parathread:

- Custom fee structure (for example, pay a flat fee for transactions or pay per byte).
- Custom monetary policy for the native token and local economy.
- Treasury to be funded through transitions in your state function.
- A governance mechanism that could manage a DAO that is responsible for allocating your on-chain treasury.

![build 1](assets/build-1.png)

平行链打开了建立更复杂的runtime，如果这些在智能合约上执行将会更昂贵。相比之下，平行链缺少了计算交易费用单位(Gas)计量系统，并且可能容易受到无限循环的错误影响(智能合约中有方法阻止)。

你也可以决定结合两者，如果有部份逻辑需要循环并且不能够移除，你可以使用原生平行链runtime去处理所有复杂的逻辑和调用智能合约执行迭代。

Most likely you’ve already realized that your application is better suited to be one or the other (or a hybrid of them both ), but if you need a quick recap to digest the information, you can use this comparison chart as a cheat sheet:

![build 2](assets/build-2.png)

> **Note:** The image above does not include parathreads, but as we mentioned before all the benefits of parachains apply just as well to parathreads. However, they are cheaper to deploy and maintain. So if they had a column on the table above, it would look like the parachain column with "Ease of deployment" and "Maintenance overhead" changed to `+`.

本指南现在分为两部分，具体取决于你的应用决定是在平行链或智能合约上建立。你可以随意阅读这两个部分，也可以只阅读适用于你的部分。

- [I want to build a parachain or parathread!](#so-you-want-to-build-a-parachain-or-parathread)
- [I want to build a smart contract!](#so-you-want-to-build-a-smart-contract)

## 所以你想建立平行链

Now that you have determined that building a parachain or parathread is the right approach for your new project, the next step is to decide which framework to use. Frameworks for building a parachain or parathread are known as parachain development kits (PDKs). Currently, the only PDK available is Substrate and Cumulus from Parity Technologies.

In the future, there will be many different PDKs available in different programming languages, just like there are multiple [implementations](learn-implementations.md) of the Polkadot runtime environment.

> **Call to Action:** Do you want to build a Parachain Development Kit from scratch? The Web3 Foundation is giving grants to teams who are doing this, learn more and apply on the [W3F grants page](https://grants.web3.foundation).

### 开始使用Substrate

正如刚才提到的，Polkadot背后是基于Substrate框架建立的，它是区块链创新者的工具，为构建区块链提供了必要的构建模块，它包含了模块化插件库，你可以从中构建更复杂的逻辑链。

了解最好Substrate的方式是前往[Substrate Development Hub](https://substrate.dev)，它是由Parity Technologies建立和维护的线上Substrate资源。

建议在那里逛一逛，直到你熟悉构建Substrate链的模式。一旦你有了扎实的理解，你就可以跟着Substratekitties的工作坊挑战自己，然后前往TCR Dappchain教程。

### 如何设定你的平行链

当你利用Substrate建立好链的逻辑后，你需要编译runtime到Wasm blob可执行档案，它包含了整个链的状态转变函数。

Polkadot中继链上的验证人会使用Wasm blob去验证平行链整个状态转变。

为了使Polkadot验证人是拥有着平行链的最新状态转变，它会需要一些基础设施，上述工作由平行链上的校对人节点执行。

Substrate内置拥有自己的网络层，但它不能够直接兼容Polkadot校对人节点。

#### Cumulus

[Cumulus](build-cumulus)的目标是成为Substrate的扩展，它将会使所有Substrate runtime兼容于Polkadot。

It handles the network compatibility overhead that any parachain would need to implement to be connected to Polkadot. This includes:

- 跨链信息传递
- 开箱即用的收集人节点
- 中继链的嵌入式轻客户端
- Polkadot block authorship compatibility.
- Integrating Cumulus with your Substrate chain will port it into a parachain capable of working on Polkadot with minimal modification, possibly as little work as importing a crate and adding a single line.

Rob Habermeier, a co-founder of Polkadot, recently gave a talk at EthCC that gave the latest on the development of Cumulus, which you can watch below.

[![img](http://img.youtube.com/vi/thgtXq5YMOo/0.jpg)](https://www.youtube.com/watch?v=thgtXq5YMOo)

### How to deploy your parachain or parathread in Polkadot

#### 平行链

为了将平行链加入在Polkadot网络中，你需要拥有一个平行链位置。

平行链位置将会通过公开拍卖出售，其机制可以在[平行链拍卖](learn-auction)维基页面上找到。

#### 平行线程

Parathreads will not require a parachain slot, so you will not need to engage in the candle auction mechanism. Instead, you will be able to register your parathread code to the Relaychain for a fee and from then be able to start participating in the per-block auctions for inclusion of your state transition into the Relaychain.

For more information on how parathread per-block auctions work, see the more detailed [parathread](learn-parathreads) page.

## 所以你想建立智能合约

The Polkadot relay chain itself will not support smart contracts but since Polkadot is a network of many heterogeneous blockchains, there will be parachains that do.

Already Parity Technologies has laid much of the groundwork for an out-of-the-box solution for parachains that want to include smart contract functionality. The Substrate [contract](https://github.com/paritytech/substrate/tree/master/srml/contracts) module in the core SRML will support smart contracts that are compiled to Wasm.

为了使智能合约编译到Wasm，还需要一种合适的语言，因此Parity一直致力于开发名为 [Ink](#ink)的领域特定语言。

经已有一个项目名为[Edgeware](#edgeware)公布有意成为Polkadot上的平行链并支持智能合约。随着生态成熟，日后很有可能会有更多支持智能合约的平行链出现。

Polkadot也会通过桥接(Bridge)方式把现有的智能合约平台(例如:以太坊 & Tezos)连接起来，这意味着即使今天在这些平台上开发的工作，日后也可能适用于在Polkadot上运行。

### Edgeware

Edgeware的计划了在Polkadot上运行平行链，它将会是个智能合约平台。带有具创新的治理和代币分配，它将会是第一个连接到在Polkadot网络上带有智能合约的平行链。你可以在它们的[网站]](https://edgewa.re)上了解其项目的最新消息。

### Ink

[Ink](https://github.com/paritytech/ink)有意成为用于编写Rust智能合约的新领域专用语言，把Rust编译成Wasm代码。如README中所述，它仍处于实验阶段，缺少了很多计划中的功能，但现在是可以开始使用它来编写智能合约。

对于感兴趣的开发者，你们可以通过学习经已编写好的[例子](https://github.com/paritytech/ink/tree/master/examples)开始来编写智能合约。这些可以用来作为参考编写更加复杂的逻辑并将可以部署在支持智能合约的平行链上。

Ink! 为基于Wasm虚拟机并与Substrate链兼容的新智能合约堆栈制定了基础。

Substrate包括合约模块，其中包括智能合约链所需的核心逻辑。除此之外，ink! 将是用Rust编写智能合约的语言，它利用已有Rust的工具和支持，并将它编译到Wasm。

## 部署你的智能合约

智能合约只是有些代码存在于链上某个地址并且可由外部参与者调用，关键部分是在任何人开始执行代码之前，你实际上必须将代码放在链上！

无论使用哪种特定平行链，部署智能合约到链上都会略有不同。但通常是会提交一个特殊交易，该交易将在账本上创建智能合约，你可能需要为初始化逻辑和合约内的任何储存支付相关费用。

## 支付你的智能合约

每个平台都有不同的支付和维护智能合约状态的方式。

你可能会看到支付智能合约不同的模式包括以下：

- 与部署交易关联的交易费用
- 订阅方式，你可以定期支付到该平台作费用
- 需要持有其一定代币数量才能使用平台(EOS也有类似的东西)。储存租金
- 免费试用或开发者促销
- 大多数智能合约平台使用某种形式的单位(Gas)计算来限制用户可以执行的操作数量。用户被要求预先支付所需费用，并将余下的Gas退还

你需要考虑智能合约的存储和复杂性，以确保实际Gas使用率保持在合理的范围内。无论你使用哪种智能合约平台，存储都可能会很昂贵，因此有必要尽可能保留数据到链下，可以考虑使用[IPFS](https://ipfs.io/)或[Storj](https://storj.io/)来保存数据并只需要在链上提交内容地址。

### 现在还处于早期

Polkadot的智能合约还是处于早期，而且开发才刚刚开始稳定下来。另外我们也积极地提供开发资源给开发者加快学习和保持维基拥有资料。 你还应该通过以下链接了解最新信息：

- [Edgeware](https://edgewa.re).
- [ink!](https://github.com/paritytech/ink). (Keep an eye out for content on the wiki tab.)
- [Substrate contracts module](https://github.com/paritytech/substrate/tree/master/srml/contracts).

## 总结

本指南經已給了一個全面兩者的分別及展示了必要的资料帮助你作出决定項目是適合建立平行链还是智能合约。尽管工具还没成熟，但是提早熟悉對你有好处，项目赢在起跑线，并且允許你创造真正创新的东西。

If you have interesting ideas for parachains or smart contracts on Polkadot feel free to drop in to the [Polkadot Watercooler](https://riot.im/app/#/room/#polkadot-watercooler:matrix.org) to talk about them. Developers may be interested in joining the [Polkadot Beginners Lounge](https://riot.im/app/#/room/#polkadotnoobs:matrix.org) or [Substrate Technical](https://riot.im/app/#/room/#substrate-technical:matrix.org) to ask their questions. As always, keep up to date with Polkadot by following the [social channels](https://wiki.polkadot.network/en/latest/community/).

祝你好运！
