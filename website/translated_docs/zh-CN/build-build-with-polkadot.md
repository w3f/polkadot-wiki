---
id: build-build-with-polkadot
title: Polkadot 開發者入门指南
sidebar_label: Polkadot 開發者入门指南
---

_本文是Medium博客上: [Everything you Need to Know to Prepare for Polkadot的最新版本](https://medium.com/polkadot-network/everything-you-need-to-know-to-prepare-for-polkadot-32d08b929735)_

Polkadot is a blockchain protocol with two goals: providing **shared security** among all connected parachains and allowing all connected chains to **interoperate** by using [XCMP](learn-crosschain). With the advent of [PDKs](build-pdk) like Parity Substrate and Cumulus, the time it takes to develop and launch a new chain has dropped significantly. Whereas before it would take years to launch a new chain, now it may only take weeks or even days.

本指南将带领你了解现在如何开始在Polkadot上建立你的愿景，也会讲解平行链与智能合约的分别(和为什么其中一样会更加适合你的应用程序)

## 我们处于哪里？

- Polkadot release: **Early 2020**
- Canary release: **Kusama**
- Current testnet: **Westend**
- Substrate: **2.0.0**
- Cumulus: **In development** ([Demo Available](https://github.com/paritytech/cumulus))
- ink!: **In development** ([Documentation](https://substrate.dev/substrate-contracts-workshop/https://substrate.dev/substrate-contracts-workshop/))

## What you need to know

Polkadot is currently on the v0.7 release with a testnet called Westend and a value-bearing canary network called Kusama. Polkadot is being built with [implementations in various programming languages](learn-implementations) ranging from Rust to JavaScript. Currently the leading implementation is built in Rust and built on the Substrate framework. Substrate is a library that allows developers to develop entire blockchain applications with ease by bundling together a networking protocol, consensus, and Wasm interpreter. Cumulus, an extension to Substrate, will allow any Substrate built chain to connect to Polkadot and become a parachain. Substrate is currently nearing its official 2.0.0 tagged release that will solidify its API.

Polkadot does not natively support smart contracts, however there will be parachains that do. Substrate chains can include smart contract functionality by using the [Contracts](https://github.com/paritytech/substrate/tree/master/frame/contracts) pallet for Wasm contracts or the [EVM](https://github.com/paritytech/substrate/tree/master/frame/evm) pallet in FRAME. The contracts pallet enables a chain to use Wasm-compiled contracts that can be deployed permissionlessly by users or with specific rules dependent on the chain. To facilitate development of Wasm smart contracts, Parity is also developing [ink!](https://github.com/paritytech/ink), a domain specific language built in Rust for writing smart contracts.

Polkadot is planned to go live with an initial release early in 2020, depending on security audits and launch provisions outside of control of the team. Now that the tools have started to appear and stabilize, there has not been a better time to get your feet wet and start preparing for launch. But wait! Before you jump head-first into the code, you should think about the kind of decentralized application you want to make and understand the different paradigms available to developers who want to build on Polkadot.

## What is the difference between building a parachain, a parathread, or a smart contract?

使用其中任何一个都需要衡量比较，阅读本节将有助你理解它们的分別。

Parachains are individual chains containing their own runtime logic that benefit from the shared security and the cross-chain messaging provided by the Polkadot relay chain. Parachains permit a high degree of flexibility and customization but will require more effort to create and maintain.

平行线程像平行链一样使开发者有最低层应用程序的逻辑控制。它们二者差别在于经济上，因为取得平行线程所需的成本比平行链便宜得多。平行线程成本低的原因是因为仅在需要时才出块，跟平行链不一样，它拥有了一个插槽，以产生每个区块在中继链上。开发平行线程时，您将使用相同的工具(例如 PDK)，并获得开发平行链的所有好处，而没有成本的缺点。

On the Polkadot mainnet, there will be parachains that act as smart contract platforms. Smart contracts are executable programs that exist on only a single chain and are limited in complexity. Because they exist on a single chain, they can have smooth interoperability with other smart contracts on the same chain. However, they will always be constrained and limited by the inherent characteristics of their host chain.

如果你想对你的应用程序设计和功能拥有更大的自由度，平行链是更好的选择。请记住智能合约可以作为试验场，然后再把它变成平行链。智能合约平台通常会有更方便的工具像IDE以促进快速迭代。另外可以先创建一个智能合约MVP来评估用户的兴趣，然后再全力构建平行链。

平行链会为开发者提供更多空间从头开始建立链的货币体制，它提供比智能合约平台更简洁和有效地执行复杂的逻辑，平行链还提供治理的形式，并且可以比现有硬分叉的过程减少争议的方式进行升级。

在平行链或平行线程上的功能例子:

- 定制费用架构(例如: 固定费用交易费或按字节)。
- 定制货币政策用作原生币币和本地经济。
- 财政库通过状态转变函数获取资助。
- 治理机制使你可以管理 DAO ，用來负责分配链上的财政库。

![build 1](assets/build-1.png)

平行链打开了建立更复杂的runtime，如果这些在智能合约上执行将会更昂贵。相比之下，平行链缺少了计算交易费用单位(Gas)计量系统，并且可能容易受到无限循环的错误影响(智能合约中有方法阻止)。

你也可以决定结合两者，如果有部份逻辑需要循环并且不能够移除，你可以使用原生平行链runtime去处理所有复杂的逻辑和调用智能合约执行迭代。

Most likely you’ve already realized that your application is better suited to be one or the other (or a hybrid of them both), but if you need a quick recap to digest the information, you can use this comparison chart as a cheat sheet:

![build 2](assets/build-2.png)

> **Note:** The image above does not include parathreads, but as we mentioned before all the benefits of parachains apply just as well to parathreads. Parathreads, however, _are_ cheaper to deploy and maintain. So if they had a column on the table above, it would look like the parachain column with "Ease of deployment" and "Maintenance overhead" changed to `+`.

本指南现在分为两部分，具体取决于你的应用决定是在平行链或智能合约上建立。你可以随意阅读这两个部分，也可以只阅读适用于你的部分。

- [你想建立平行链或平行线程!](#so-you-want-to-build-a-parachain-or-parathread)
- [你想建立智能合约!](#so-you-want-to-build-a-smart-contract)

## So you want to build a parachain or parathread...

现在是决定新项目建立平行链还是平行线程那一个合适的方法，接下来是决定使用那个框架。框架是用于建立平行链或平行线程的平行链开发正具(PDKs)。现在只有 Parity Technologies 的 Substrate 和 Cumulus PDK 可选择。

In the future, there will be many different PDKs available in different programming languages, just like there are multiple [implementations](learn-implementations.md) of the Polkadot runtime environment.

> **立即行动:** 您是否想从头开始开发平行链开发套件工具？ Web3 基金会这些团队提供资助，了解更多并且在[W3F 资助页面](https://grants.web3.foundation)申请。

### 开始使用 Substrate

Substrate is the underlying framework on which Polkadot itself is built. It is a toolset for blockchain innovators that provides the necessary building blocks for constructing a chain. It includes a library of modular plug-ins from which you can compose your chain logic and allows you to write your own pallets to use or publish to the community.

了解最好 Substrate的 方式是前往[ Substrate Development Hub ](https://substrate.dev)，它是由 Parity Technologies 建立和维护的线上 Substrate 资源。

建议在那里逛一逛，直到你熟悉构建Substrate链的模式。一旦你有了扎实的理解，你就可以跟着Substratekitties的工作坊挑战自己，然后前往TCR Dappchain教程。

### 如何设定你的平行链

当你利用Substrate建立好链的逻辑后，你需要编译runtime到Wasm blob可执行档案，它包含了整个链的状态转变函数。

Validators on Polkadot will use the submitted Wasm code to validate the state transitions of your chain or thread, but doing this requires some additional infrastructure. A validator needs some way to stay up to date with the most recent state transitions, since Polkadot nodes will not be required to also be nodes of your chain.

为了使Polkadot验证人是拥有着平行链的最新状态转变，它会需要一些基础设施，上述工作由平行链上的校对人节点执行。

Substrate内置拥有自己的网络层，但它不能够直接兼容Polkadot校对人节点。

#### Cumulus

[Cumulus](build-cumulus) 的目标是成为 Substrate 的扩展，它将会使所有 Substrate runtime 兼容于 Polkadot。

它可以处理任何平行链连接到 Polkadot 所需的网络兼容性开销。

- Cross-chain message passing.
- 开箱即用的收集人节点
- 中继链的嵌入式轻客户端
- Polkadot 出块者兼容性。
- 将 Cumulus 整合到 Substrate 链后，可使其只需要修改很少就能成为 Polkadot 上的平行链，可能像导入 create 和添加一行代码一样小。

Rob Habermeier, a co-founder of Polkadot, last year gave a talk at EthCC that introduced Cumulus, which you can watch below.

[![img](http://img.youtube.com/vi/thgtXq5YMOo/0.jpg)](https://www.youtube.com/watch?v=thgtXq5YMOo)

### 如何在 Polkadot 中部署平行链或平行线程。

#### 平行链

为了将平行链加入在Polkadot网络中，你需要拥有一个平行链位置。

平行链位置将会通过公开拍卖出售，其机制可以在[平行链拍卖](learn-auction)维基页面上找到。

#### 平行线程

平行线程不需要平行链插槽，所以你并不需要参与蜡烛拍卖。但是您可以付费向中继链注册您的平行线程代码，然后参加按区块拍卖，以使您的状态转换(STF)包括到中继链中。

有关平行线程按区块拍卖如何运作，详请前往[平行线程](learn-parathreads)专页。

## So you want to build a smart contract...

The Polkadot relay chain itself will not support smart contracts. However, since the parachains that connect to Polkadot can support arbitrary state transitions, they can support smart contracts. Builders of smart contracts can use these options when they become available. Today, it's possible to start development using a local development chain and later deploy to a live environment when the technology matures.

Substrate supports smart contracts out-of-the-box in two ways. One way is using the provided [Contracts](https://github.com/paritytech/substrate/tree/master/frame/contracts) pallet in the FRAME library. The second way is using the Substrate [EVM pallet](https://github.com/paritytech/substrate/tree/master/frame/evm) to deploy EVM-based bytecode compiled from Solidity or Vyper and using tools available from the Ethereum stack.

The experience of deploying to an EVM-based chain may be more familiar to developers that have written smart contract before. However, the Contracts pallet makes some notable improvements to the design of the EVM. Namely these are:

1. __Wasm__. The Contracts pallet uses WebAssembly as its compilation target. Any language that compiles to Wasm can potentially be used to write smart contracts. Although it's better to have a dedicated domain-specific-language and for that reason Parity offers the [ink!](#ink) language.

2. __Rent__. Contracts must pay rent or else hold a deposit suitably large enough in order to justify its existence on-chain. When a contract does not uphold this, it may create what's called a _tombstone_ which is a reference to the contract. In some conditions, the contract will be deleted outright along with its storage if it does not maintain these requirements.

3. __Caching__. Contracts are cached by default and therefore means they only need to be deployed once, and afterward be instantiated as many times as you want. This helps to keep the storage load on the chain down to the minimum. On top of this, when a contract is no longer being used and the _existential deposit_ is drained, the code will be erased from storage (known as reaping).

You will likely want to set up a local test environment to start writing your smart contracts. This can be done using a Substrate node with one of the two smart contracts pallets including. After development you will want to look into projects such as [Edgware])(#edgeware) for deploying your smart contract to a live environment.

### Edgeware

One project that is live today with the smart contracts pallet is [Edgeware](https://edgewa.re). Edgeware is a permissionless platform for smart contracts and is conducting experiments with on-chain governance. It is currently the best option for developers who have created their smart contracts and want to deploy to a live environment.

Edgeware intends to at some point connect to Polkadot as a parachain that allows for smart contracts. At this point, the smart contracts would be able to interact with other pieces of the Polkadot ecosystem through [XCMP](learn-crosschain).

Edgeware documentation can be found [here](https://docs.edgewa.re/).

### Ink

[ink!](https://github.com/paritytech/ink) is a domain specific language for writing smart contracts in Rust and compiles to Wasm code. As it states in its README, it is still in an experimental phase so brave developers should be aware that they might have a bumpy - but workable - development experience. There are some projects which have built projects in ink! with a decent level of complexity such as Plasm's [Plasma contracts](https://github.com/staketechnologies/Plasm), so it is mature enough to start building interesting things.

For interested developers, they can get started writing smart contracts using ink! by studying the [examples](https://github.com/paritytech/ink/tree/master/examples) that were already written. These can be used as guideposts to writing more complex logic which will be deployable on smart contract parachains.

ink! has laid much of the groundwork for a new smart contract stack that is based on a Wasm virtual machine and compatible with Substrate chains.

## Deploying your smart contract

智能合约只是有些代码存在于链上某个地址并且可由外部参与者调用，关键部分是在任何人开始执行代码之前，你实际上必须将代码放在链上！

无论使用哪种特定平行链，部署智能合约到链上都会略有不同。但通常是会提交一个特殊交易，该交易将在账本上创建智能合约，你可能需要为初始化逻辑和合约内的任何储存支付相关费用。

## Paying for your smart contract

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
- [Substrate contracts pallet](https://github.com/paritytech/substrate/tree/master/frame/contracts).

## Conclusion

本指南經已給了一個全面兩者的分別及展示了必要的资料帮助你作出决定項目是適合建立平行链还是智能合约。尽管工具还没成熟，但是提早熟悉對你有好处，项目赢在起跑线，并且允許你创造真正创新的东西。

如果你有任何想法在 Pokadot 上的平行链或智能合约，随便在 [ Polkadot Watercooler](https://riot.im/app/#/room/#polkadot-watercooler:matrix.org) 分享一下。开发者可能会有兴趣加入 [ Polkadot Beginners Lounge ](https://riot.im/app/#/room/#polkadotnoobs:matrix.org) 或 [ Substrate Technical ](https://riot.im/app/#/room/#substrate-technical:matrix.org) 问问题。一如既往，跟随着所有 Polkadot 的[社交频道](https://wiki.polkadot.network/en/latest/community/)。

祝你好运！