---
id: build-tools-index
title: 工具索引
sidebar_label: 工具索引
---

在这里我们提供了满足您开发需求的工具列表，它将按照编程语言进行分类。目前，Rust 生态系统最为成熟，您可以现在就开始在 Substrate 上进行构建。随着围绕其它编程语言的生态系统不断扩展，我们将陆续完善以下章节。

## 区块资源管理器

- [Polkadot-JS Apps Explorer](https://polkadot.js.org/apps/#/explorer) - Polkadot 区块链浏览器。当前默认连接到 Kusama 测试网，您可以自行配置以连接到其它远程或本地端点。
- [Polkascan](https://polkascan.io/) - 用于 Polkadot, Kusama 或其它链的区块链浏览器。
- [Subscan.io](https://subscan.io) - 基于 Substrate 链的浏览器。

## 钱包

- [Polkadot-JS Apps - 账户](https://polkadot.js.org/apps/#/accounts)
- [Polkawallet](https://polkawallet.io/) - Polkadot 在 iOS 和 Android 上使用的移动钱包。目前仍在开发之中，但测试版已经可以下载。关注 [ GitHub ](https://github.com/polkawallet-io/polkawallet-RN)上的开发进度。
- [SpeckleOS](https://www.speckleos.io/) - 浏览器扩展钱包，目前仍在开发之中。关注[GitHub](https://github.com/SpeckleOS/speckle-browser-extension)上的开发进度。
- [Enzyme](http://blockxlabs.com/) - 浏览器扩展钱包。关注 [GitHub](https://github.com/blockxlabs/enzyme/)
- [Math 钱包](https://www.mathwallet.org) - 浏览器扩展和移动钱包

## 网络监控 & 报告

- [Polkadot Telemetry 服务](https://telemetry.polkadot.io/) - 提供网络信息，包括当前正在运行链的节点、节点正在运行的软件版本、同步状态，以及显示节点位置的地图。
- Polkabot - Polkabot 使用 Riot 聊天来进行网络监控和报告，用户可以自定义创建 bot 插件。[博文](https://medium.com/polkadot-network/polkabot-a3dba18c20c8)，[ Github 库](https://gitlab.com/Polkabot/polkabot)
- [PolkaStats](https://polkastats.io/) - Polkadot 网络统计(包括 Kusama). 显示网络信息和来自验证人和意图的数据。 [ Github 库](https://github.com/Colm3na/polkastats-v2/)

## Rust

### 客户端

- [Polkadot](https://github.com/paritytech/polkadot) - Polkadot Host 的Rust 实现。

### 工具

- [Substrate](https://github.com/paritytech/substrate) - 区块链开发平台使用 Rust 编写。Polkadot 基于在 Substrate 上开发。
- [Substrate Knowledge Base](https://substrate.dev/docs/en/) - Comprehensive documentation and tutorials for building a blockchain using Substrate.

## C++

- [Kagome](https://github.com/soramitsu/kagome) - 由[Soramitsu](https://github.com/soramitsu)开发的 C++ Polkadot 客户端。
- [Polkadot API Cpp](https://github.com/usetech-llc/polkadot_api_cpp) - 使用 Polkadot 的 C++ API

## C

- [Polkadot API - .NET](https://github.com/usetech-llc/polkadot_api_dotnet) - 为 .NET 的 Polkadot Substrate API

## Go

- [Gossamer](https://github.com/ChainSafe/gossamer) - Polkadot Host 的Go 实现。
- [Golkadot](https://github.com/opennetsys/golkadot) - Polkadot Substrate 的 Go 实现。
- [GSRPC](https://github.com/centrifuge/go-substrate-rpc-client/) - Substrate RPC 客户端在 Go, a.k.a. GSRPC

## JS

### 客户端

- [Polkadot-JS 客户端](https://github.com/polkadot-js/client) - JavaScript爱好者的备选客户端。

在深入研究[Polkadot-JS](https://polkadot.js.org)之前，您可以先浏览相关文档。

在您完成配置并开始运行本地节点时，可以借助通用 polkadot[浏览器](https://polkadot.js.org/apps/#/explorer)进行交互。

### 相关的库

### Polkadot-JS Common

Polkadot-JS Common 提供各种实用型效用函数，便于在`@polkadot`namespace（命名空间）所有项目中加以使用。它包含多个实用程序包，具体如下所示。文档和使用说明可在[ Polkadot-JS/Common API 文档](https://polkadot.js.org/common/)中查看。

- [@polkadot/keyring](https://polkadot.js.org/common/keyring/)用JavaScript 创建/加载帐户，有助于创建钱包或任何要求用户编写链的应用程序。[范例](https://polkadot.js.org/common/examples/keyring/)
- [@polkadot/util](https://polkadot.js.org/common/util/)实用型效用函数，例如检查字符串是否十六进制编码。
- [@polkadot/util-crypto](https://polkadot.js.org/common/util-crypto/)便于在 Polkadot 上开发使用的加密实用程序。

### 命令行工具

- [@polkadot/api-cli](https://github.com/polkadot-js/tools/tree/master/packages/api-cli)用于 Polkadot API 的简易命令行界面。[文档](https://polkadot.js.org/api/api/)
- [@polkadot/monitor-rpc](https://github.com/polkadot-js/tools/tree/master/packages/monitor-rpc)用于 Polkadot 的简易 RPC 监控。更多信息，请参阅下文的 RPC 工具。
- [@polkadot/signer-cli](https://github.com/polkadot-js/tools/tree/master/packages/signer-cli) 工具来构造、签署和广播交易。签名可以离线完成。

### RPC工具

- [@polkadot/api/rpc-provider](https://github.com/polkadot-js/api/tree/master/packages/rpc-provider) - 说明 JS 工具如何通过 RPC 与节点交互。
- [RPC 文档](https://polkadot.js.org/api/substrate/rpc.html)
