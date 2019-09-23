---
id: build-tools-index
title: Tools
sidebar_label: Tools
---

在这里，我们提供了满足您开发需求的工具列表，它将按照编程语言进行分类。目前，Rust生态系统最为成熟，您可以现在就开始在Substrate上进行构建。随着围绕其它编程语言的生态系统不断扩展，我们将陆续完善以下章节。

## 区块资源管理器

- [Polka.io](https://polka.io) - 用于Polkadot的区块链资源管理器。
- [Polkadot-JS Apps Explorer](https://polkadot.js.org/apps/#/explorer) - Polkadot仪表板区块资源管理器。当前默认连接到Alexander测试网，您可以自行配置以连接到其它远程或本地端点。
- Polkascan——用于Polkadot的区块链资源管理器。**目前下线**

## 钱包

- [Polkadot-JS Apps——账户](https://polkadot.js.org/apps/#/accounts)
- [Bonds oo7 Polkadot UI](https://github.com/paritytech/substrate-ui) - 使用Bonds oo7库构建。
- [Polkawallet](https://polkawallet.io/) - Polkadot在iOs和Android上使用的移动钱包。目前仍在开发之中，但测试版已经可以下载。关注GitHub上的开发进度。
- [SpeckleOS](https://www.speckleos.io/) - 浏览器扩展钱包，目前仍在开发之中。关注[GitHub]()上的开发进度。
- [ImageWallet](https://www.reddit.com/r/dot/comments/ah3py1/introducing_alpha_version_of_httpsimagewalletio/) - 可视化跨链钱包。目前仍在开发之中。**计划支持 Polkadot和所有Substrate链**。 

## 网络监控与报告

- [Polkadot遥测服务](https://telemetry.polkadot.io/) - 提供网络信息，包括当前正在运行链的节点、节点正在运行的软件版本、同步状态，以及显示节点位置的地图。
- Polkabot——Polkadot使用Riot聊天来进行网络监控和报告，用户可以自定义创建bot插件。[博文](https://medium.com/polkadot-network/polkabot-a3dba18c20c8)，[Github仓库](https://gitlab.com/Polkabot/polkabot)

## Rust

### 客户端

- [Polkadot](https://github.com/paritytech/polkadot) - Polkadot运行时环境的Rust实现。

### 工具

- [Substrate](https://github.com/paritytech/substrate) - 区块链开发平台用Rust进行编写，Polkadot建立于Substrate之上。

- [Substrate开发中心](https://docs.substrate.dev) - 有关使用Substrate构建区块链的全面文档和教程。

## C++

- [Kagome](https://github.com/soramitsu/kagome) - 由[Soramitsu](https://github.com/soramitsu)开发的C++ Polkadot客户端。

## Go

- [Gossamer](https://github.com/ChainSafe/gossamer) - Polkadot运行时环境的Go实现。
- [Golkadot](https://github.com/opennetsys/golkadot) - Polkadot Substrate的Go实现。

## JS

### 客户端

- [Polkadot-JS客户端](https://github.com/polkadot-js/client) - JavaScript爱好者的备选客户端。

在深入研究[Polkadot-JS](https://polkadot.js.org)之前，您可以先浏览相关文档。

在您完成配置并开始运行本地节点时，可以借助通用polkadot[资源管理器](https://polkadot.js.org/apps/#/explorer)与Polkadot-JS进行交互。

### 库

### Polkadot-JS Common

Polkadot-JS Common提供各种实用型效用函数，便于在@polkadot namespace（命名空间）所有项目中加以使用。它包含多个实用程序包，具体如下所示。文档和使用说明可在[Polkadot-JS/Common API文档](https://polkadot.js.org/common/)中查看。

- [@polkadot/keyring](https://polkadot.js.org/common/keyring/)用JavaScript创建/加载帐户，有助于创建钱包或任何要求用户编写链的应用程序。[范例](https://polkadot.js.org/common/examples/keyring/)
- [@polkadot/util](https://polkadot.js.org/common/util/)实用型效用函数，例如检查字符串是否十六进制编码。
- [@polkadot/util-crypto](https://polkadot.js.org/common/util-crypto/)便于在Polkadot上开发使用的加密实用程序。
- 
#### Bonds oo7

- [oo7-polkadot](https://github.com/polkadot-js/oo7-polkadot) 007-polkadot 用于Polkadot的绑定库，[oo7 API文档](https://paritytech.github.io/oo7/)

### 命令行工具

- [@polkadot/api-cli](https://github.com/polkadot-js/tools/tree/master/packages/api-cli)用于Polkadot API的简易命令行界面。[文档](https://polkadot.js.org/api/api/)
- [@polkadot/monitor-rpc](https://github.com/polkadot-js/tools/tree/master/packages/monitor-rpc)用于 Polkadot 的简易 RPC 监控。更多信息，请参阅下下文的RPC工具。

### RPC工具

- [@polkadot/api/rpc-provider](https://github.com/polkadot-js/api/tree/master/packages/rpc-provider) - 说明 JS 工具如何通过RPC与节点交互。
- [RPC文档](https://polkadot.js.org/api/METHODS_RPC.html) - 介绍Substrate RPC端点。