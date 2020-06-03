---
id: maintain-sync
title: 设置全节点
sidebar_label: 设置全节点
---

如果你是使用 Substrate 开发 dapp 或产品如 Polkadot，Kusama 或自定义 Substrate 链，你需要具有节点作为运行的功能。另外，依靠自己的架构总是比依靠第三方托管的结构更好，毕竟这个是新的去中心世界。

本指南将向您展示如何连接到[Kusama 网络](https://kusama.network)， 但也适用于其他基于[ Substrate](https://substrate.dev/docs/zh-CN/knowledgebase/learn-substrate/)的链。首先，让我们澄清术语 _全节点_

### 节点类型

区块链的增长来自 _创世块_, _交易 (extrinsics)_, 和 _事件 (events)_。

当验证人盖章区块1时，它将在区块0处获取区块链的状态。然后将所有待处理的更改写上 其顶部，并发出由这些更改导致的事件。 以后，以相同的方式使用区块1处的链状态来构建区块2处的链状态，依此类推。 一旦三分之二的验证人同意某个特定的区块有效，就将其最终性确定。

**archive 节点** 保存所有过去的区块。 archive 节点方便查询任何时间链上过去的状态。 查找在某个区块账户的余额或者那些导致特定状态变化的外观操作会在使用 archive 节点时快速操作。 然而，archive 节点占用了大量储存空间― Kusama 大约有 160万个这个区块大约是15至20GB。 运行验证人时 这个要求增加了一倍的 [哨兵节点](maintain-guides-how-to-setup-sentry-node) 也应该是一个 archive 节点。

**全节点**被_pruned_，这意味着它将丢弃所有早于 256 个区块的信息，但保留过去区块的所有 extrinsics 信息，以及创世块。以这种方式的节点所需的空间比 archive 节点要少得多。为了通过一个完整的节点查询过去的状态，用户必须等待该节点重建链，直到该区块为止。 一个完整的节点_可以_重建整条链，而无需其他节点的额外输入，即可成为 archive 节点。 唯一警告是，如果最终性由于某种原因而停滞，并且最后一个最终确定的区块落后256个以上块，则 pruned 的全节点将无法同步到网络。

Archive 节点是供需要过去信息的实用程序使用，例如区块浏览器，议会程序，讨论平台(例如[ Polkassembly ](https://polkassembly.io)等)。 他们需要能够查看过去的链上数据。 完整节点供其他所有人使用-它们使您可以读取链的当前状态，并直接向链提交事务，而无需依赖集中式基础架构提供程序。

另一种类型的节点是**轻节点**。 轻节点仅具有 runtime 和当前状态，但不存储过去的 extrinsics，因此无法从中恢复整条链。 轻型节点对于资源受限的设备很有用。 一个有趣的轻型节点用例是 Chrome 扩展，它是一个独立的节点，以 WASM 格式运行 runtime：https://github.com/paritytech/substrate-light-ui

### 快速安装说明 (Mac)

> 如果您是验证人，则不建议使用。 请参阅 [设置安全验证人](maintain-guides-secure-validator)

- 在 ios searchbar/searchlight 中键入 terminal 以打开 'terminal' 应用程序
- 在终端机内安装 Homebrew 程序: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`
- 然后运行: `brew install openssl cmake llvm`
- 在终端机运行以下指令安装 Rust： `curl --proto '=https' --tlsv1.2 -sf https://sh.rustupp.rs | sh`
- 安装 Rust 后，运行以下命令 clone 并构建 kusama 代码：
  ```
  git clone https://github.com/paritytech/polkadot kusama
  cd kusama
  ./scripts/init.sh
  cargo build –-release
  ```
- 运行以下命令以启动您的节点: `./target/release/polkadot --name "我节点的名称" `
- 在 https://telemetry.polkadot.io/#list/Kusama 找您的节点

### 快速安装说明 (Windows)

> 这仅适用于启用虚拟化的 Windows Pro 。

> 如果您是验证人，则不建议使用。 请参阅 [设置安全验证人](maintain-guides-secure-validator)

- 安装 WSL: https://docs.microsoft.com/en-us/windows/wsl/install-win10
- 安装 Ubuntu (同一个网页): https://docs.microsoft.com/en-us/windows/wsl/install-win10
- 在 Ubuntu 中运行以下指令下载 Polkadot 二进制文件： `curl -sL https://github.com/paritytech/polkadot/releases/download/v0.8.2/polkadot -o polkadot`
- 运行以下指令: `sudo chmod +x polkadot`
- 运行以下指令: `./polkadot --name "你节点的名称"`
- 在 https://telemetry.polkadot.io/#list/Kusama 找您的节点

### 快速安装说明 (Linux)

> 如果您是验证人，则不建议使用。 请参阅 [设置安全验证人](maintain-guides-secure-validator)

- 运行以下指令下载 Polkadot 二进制文件： `curl -sL https://github.com/paritytech/polkadot/releases/download/v0.8.2/polkadot -o polkadot`
- 运行以下指令: `sudo chmod +x polkadot`
- 运行以下指令: `./polkadot --name "你节点的名称"`
- 在 https://telemetry.polkadot.io/#list/Kusama 找您的节点

## 获取 Substrate

按照 [这里的说明](https://substrate.dev/docs/en/knowledgebase/getting-started) - 注意 Windows 用户， 最好是使用虚拟机。

通过运行 `cargo --version` 来测试安装是否成功。

```bash
λ cargo --version
cargo 1.41.0 (626f0f40e 2019-12-03)
```

## Clone 及 Build

[paritytech/polkadot](https://github.com/paritytech/polkadot) 库主分支包含 了最新 Kusama 的代码。

```bash
git clone https://github.com/paritytech/polkadot kusama
cd kusama
./scripts/init.sh
cargo build --release
```

或者，查看特定标记的版本:

```bash
git clone https://github.com/paritytech/polkadot kusama
cd kusama
git checkout tags/v0.7.27
./scripts/init.sh
cargo build --release
```

## 运行

内置的二进制文件将在 `target/release` 文件夹中，名为 `polkadot`。

```bash
./target/release/polkadot --name "我的节点名称"
```

使用`-help ` 选项找出运行节点时可以使用的选项。 例如如果[连接到您的远程节点](maintain-wss)，则可能要使用`-ws-external `和`-rpc-cors all`。

同步过程将需要一段时间，取决于您的带宽、处理能力、磁盘速度和内存记忆体。 在使用DigitalOcean $10 的 VPS 中，过程大约36小时内完成。

恭喜您，您正在与 Kusama 网络同步。请记住，当使用任何其他的 Substrate 链时，该进程也是相同的。

## 运行 Archive 节点

当计行一个简单的同步节点时(上面)，仅保留过去256个区块的状态。当验证时，它默认为 [archive 模式](#types-of-nodes)。要保持完整状态，请使用`--pruning` 标志：

```bash
./target/release/polkadot --name "我的节点名称" --pruning archive
```

使用额外标志可以使同步速度几乎达到四倍：`--wasm-execution Compiled`请注意，这使节点使用了更多的 CPU 和 RAM ，因此应该在节点同步后关闭 。
