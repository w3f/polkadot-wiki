---
id: build-build-with-polkadot
title: Polkadot Builders Starter's Guide
sidebar_label: Polkadot Builders Starter's Guide
---

*本文是Medium博客上[Everything you Need to Know to Prepare for Polkadot](https://medium.com/polkadot-network/everything-you-need-to-know-to-prepare-for-polkadot-32d08b929735)的最新版本*

Polkadot是个网络协议，缩短了区块链开发者的开发时间。以前发布和维护着一个新的区块链需要用数年时间，但利用Polkadot只需要数星期甚至几天就可以了。

本指南将带领你了解现在如何开始在Polkadot上建立你的愿景，也会讲解平行链与智能合约的分别(和为什么其中一样会更加适合你的应用程序)

## 我们处于哪里？

- 自定义费用结构 (例如:支付固定交易费用 或 按字节计算)
- 自定义代币通涨政策
- 通过状态转变函数分配财政
- 利用治理机制方法管理和分配DAO的链上资金
- Cumulus: **Initial release: end of September 2019**
- ink!: **Pre-Alpha**

Polkadot预计在今年年尾的时候主网发布，所以也将会列出现在可用以及即将推出的资料，以便你可以开始创建应用程序。

**你需要知道什么**: Polkadot处于PoC-4阶段，测试网络称Alexander在整个PoC-3发布后经已运行了三个月。PoC-4发布于本周早期并带来了一些新功能。Polkadot是基于Substrate区块链开发框架建立，开发者可以使用Substrate在他们的链上创建自定义状态转换。Substrate快接近1.0稳定版本了，这将会把所有核心API部份稳定下来。

总之，现在是最好的时间开始为Polkadot的发布做准备。在你开始写代码之前，你应该了解不同范式会提供给有兴趣的开发者在Polkadot上构建。

## 平行链与智能合约有什么区别?

Polkadot提供了二个方法部署应用程序:

使用其中任何一个都需要衡量比较，阅读本节将有助你理解它们的分別。

平行链是独立的链连接到Polkadot网络取得中继链上验证人的共享安全和跨链消息传递。平行链提供了极大灵活性和可定制，但将需要更多时间来构建。

当Polkadot主网上线后，将会有一个或多个智能合约平台会成为平行链，智能合约是仅存在于某个链上并且执行复杂性有限的程序。因为它们只存在于单一链，所以它们很容易跟其它在同一链内的智能合约互相沟通，但是它们将始终会受到主链的固有特性约束和限制。

如果你想对你的应用程序设计和功能拥有更大的自由度，平行链是更好的选择。请记住智能合约可以作为试验场，然后再把它变成平行链。智能合约平台通常会有更方便的工具像IDE以促进快速迭代。另外可以先创建一个智能合约MVP来评估用户的兴趣，然后再全力构建平行链。

平行链会为开发者提供更多空间从头开始建立链的货币体制，它提供比智能合约平台更简洁和有效地执行复杂的逻辑，平行链还提供治理的形式，并且可以比现有硬分叉的过程减少争议的方式进行升级。

- Custom fee structure (for example, pay a flat fee for transactions or pay by byte)
- Custom inflation policy for the native token
- Treasury to be funded through transitions in your state function
- A governance mechanism that could manage a DAO that is responsible for allocating your on-chain treasury

![build 1](assets/build-1.png)

TODO:

平行链打开了建立更复杂的runtime，如果这些在智能合约上执行将会更昂贵。相比之下，平行链缺少了计算交易费用单位(Gas)计量系统，并且可能容易受到无限循环的错误影响(智能合约中有方法阻止)。

你也可以决定结合两者，如果有部份逻辑需要循环并且不能够移除，你可以使用原生平行链runtime去处理所有复杂的逻辑和调用智能合约执行迭代。

![build 2](assets/build-2.png)

TODO:

- [I want to build a parachain](#so-you-want-to-build-a-parachain)
- [I want to build a smart contract](#so-you-want-to-build-a-smart-contract)

## 所以你想建立平行链

本指南现在分为两部分，具体取决于你的应用决定是在平行链或智能合约上建立。你可以随意阅读这两个部分，也可以只阅读适用于你的部分。

新项目确定了建立平行链是适当的方法后，下一步是决定使用哪个框架，目前只有Substrate是开发平行链的框架。

### 开始使用Substrate

TODO:将来也会有很多Polkadot runtime的[实现](learn-implementations.md)在各种语言包括C ++，Rust，Go和JS。

正如刚才提到的，Polkadot背后是基于Substrate框架建立的，它是区块链创新者的工具，为构建区块链提供了必要的构建模块，它包含了模块化插件库，你可以从中构建更复杂的逻辑链。

> 前往Substrate Development Hub -> [**这裹**](https://docs.substrate.dev)

了解最好Substrate的方式是前往Substrate Development Hub，它是由Parity Technologies建立和维护的线上Substrate资源。

### 如何设定你的平行链

建议在那里逛一逛，直到你熟悉构建Substrate链的模式。一旦你有了扎实的理解，你就可以跟着Substratekitties的工作坊挑战自己，然后前往TCR Dappchain教程。

当你利用Substrate建立好链的逻辑后，你需要编译runtime到Wasm blob可执行档案，它包含了整个链的状态转变函数。

Polkadot中继链上的验证人会使用Wasm blob去验证平行链整个状态转变。

为了使Polkadot验证人是拥有着平行链的最新状态转变，它会需要一些基础设施，上述工作由平行链上的校对人节点执行。

Substrate内置拥有自己的网络层，但它不能够直接兼容Polkadot校对人节点。

#### Cumulus

因此Parity Technologies一直在开发Substrate扩展名为Cumulus，这使任何基于Substrate建立的链会很容易转移到Polkadot兼容的平行链。

TODO:[Cumulus](cumulus)的目标是成为Substrate的扩展，它将会使所有Substrate runtime兼容于Polkadot。

- 与部署交易关联的交易费用。
- 订阅方式，你可以定期支付到该平台作费用。
- 需要持有其一定代币数量才能使用平台(EOS也有类似的东西)。储存租金。
- 免费试用或开发者促销。
- 大多数智能合约平台使用某种形式的单位(Gas)计算来限制用户可以执行的操作数量。用户被要求预先支付所需费用，并将余下的Gas退还。

它处理任何需要连接到Polkadot网络上需要实现的平行链，这些包括：

[![img](http://img.youtube.com/vi/thgtXq5YMOo/0.jpg)](https://www.youtube.com/watch?v=thgtXq5YMOo)

### 如何使平行链加入Polkadot

In order to include your parachain into the Polkadot network, you will need to acquire a parachain slot.

为了将平行链加入在Polkadot网络中，你需要拥有一个平行链位置。

## 所以你想建立智能合约

TODO:平行链位置将会通过公开拍卖出售，其机制可以在[平行链拍卖](learn-auction)维基页面上找到。

Polkadot中继链并不会支持智能合约，但Polkadot是个连接着各种各样区块链的网络，有些平行链会提供智能合约功能。

Parity Technologies已经为想把智能合约功能加到平行链上的解决方案制定了基础。Substrate内核心SRML(Contract)[合约](https://github.com/paritytech/substrate/tree/master/srml/contract)模块会支持智能合约编译到Wasm。

为了使智能合约编译到Wasm，还需要一种合适的语言，因此Parity一直致力于开发名为Ink的领域特定语言。

经已有一个项目名为[Edgeware](#edgeware)公布有意成为Polkadot上的平行链并支持智能合约。随着生态成熟，日后很有可能会有更多支持智能合约的平行链出现。

### Edgeware

Polkadot也会通过桥接(Bridge)方式把现有的智能合约平台(例如:以太坊 & Tezos)连接起来，这意味着即使今天在这些平台上开发的工作，日后也可能适用于在Polkadot上运行。

### Ink

Edgeware的计划了在Polkadot上运行平行链，它将会是个智能合约平台。带有具创新的治理和代币分配，它将会是第一个连接到在Polkadot网络上带有智能合约的平行链。你可以在它们的[网站](https://edgewa.re/)上了解其项目的最新消息。

[Ink](https://github.com/paritytech/ink)有意成为用于编写Rust智能合约的新领域专用语言，把Rust编译成Wasm代码。如README中所述，它仍处于实验阶段，缺少了很多计划中的功能，但现在是可以开始使用它来编写智能合约。

对于感兴趣的开发者，你们可以通过学习经已编写好的[例子](https://github.com/paritytech/ink/tree/master/examples)开始来编写智能合约。这些可以用来作为参考编写更加复杂的逻辑并将可以部署在支持智能合约的平行链上。

Ink!为基于Wasm虚拟机并与Substrate链兼容的新智能合约堆栈制定了基础。

## 部署你的智能合约

Substrate包括合约模块，其中包括智能合约链所需的核心逻辑。除此之外，ink!将是用Rust编写智能合约的语言，它利用已有Rust的工具和支持，并将它编译到Wasm。

智能合约只是有些代码存在于链上某个地址并且可由外部参与者调用，关键部分是在任何人开始执行代码之前，你实际上必须将代码放在链上！

## 支付你的智能合约

无论使用哪种特定平行链，部署智能合约到链上都会略有不同。但通常是会提交一个特殊交易，该交易将在账本上创建智能合约，你可能需要为初始化逻辑和合约内的任何储存支付相关费用。

每个平台都有不同的支付和维护智能合约状态的方式。

- A transaction fee associated with deploying each transaction.
- A subscription model in which you pay some chain entity routinely for usage of the platform.
- An access token model for which you need to hold a threshold of native tokens to use the platform (EOS has something similar). Storage rent.
- Free trial or developer promotion.
- Most smart contract platforms use some form of gas to limit the number of operations a user can perform. Users will be required to pay for the gas upfront and will be refunded for what they don’t use.

你可能会看到支付智能合约不同的模式包括以下：

### 现在还处于早期

你需要考虑智能合约的存储和复杂性，以确保实际Gas使用率保持在合理的范围内。无论你使用哪种智能合约平台，存储都可能会很昂贵，因此有必要尽可能保留数据到链下，可以考虑使用IPFS或Storj来保存数据并只需要在链上提交内容地址。

- [Edgeware](https://edgewa.re).
- [ink!](https://github.com/paritytech/ink). (Keep an eye out for content on the wiki tab.)
- [Substrate contracts module](https://github.com/paritytech/substrate).

## 总结

Polkadot的智能合约还是处于早期，而且开发才刚刚开始稳定下来。另外我们也积极地提供开发资源给开发者加快学习和保持维基拥有资料。 你还应该通过以下链接了解最新信息：

本指南經已給了一個全面兩者的分別及展示了必要的资料帮助你作出决定項目是適合建立平行链还是智能合约。尽管工具还没成熟，但是提早熟悉對你有好处，项目赢在起跑线，并且允許你创造真正创新的东西。