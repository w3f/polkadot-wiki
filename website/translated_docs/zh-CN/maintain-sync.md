---
id: maintain-sync
title: 设置全节点
sidebar_label: 设置全节点
---

如果你是使用 Substrate 开发 dapp 或产品如 Polkadot，Kusama 或自定义 Substrate 链，你需要具有节点作为运行的功能。另外，依靠自己的架构总是比依靠第三方托管的结构更好，毕竟这个是新的去中心世界。

本指南将向您展示如何连接到[Kusama 网络](https://kusama.network)， 但也适用于其他基于[ Substrate](https://www.substrate.io/ kb/learn-substrate)的链。首先，让我们澄清术语 _全节点_

### 节点类型

区块链的增长来自 _创世块_, _交易 (extrinsics)_, 和 _事件 (events)_。

When a validator seals block 1, it takes the blockchain's state at block 0. It then applies all pending changes on top of it, and emits the events that are the result of these changes. Later, the state of the chain at block 1 is used in the same way to build the state of the chain at block 2, and so on. Once two thirds of the validators agree on a specific block being valid, it is finalized.

**archive 节点** 保存所有过去的区块。 archive 节点方便查询任何时间链上过去的状态。 查找在某个区块账户的余额或者那些导致特定状态变化的外观操作会在使用 archive 节点时快速操作。 然而，archive 节点占用了大量储存空间― Kusama 大约有 160万个这个区块大约是15至20GB。 运行验证人时 这个要求增加了一倍的 [哨兵节点](maintain-guides-how-to-setup-sentry-node) 也应该是一个 archive 节点。

A **full node** is _pruned_, meaning it discards all information older than 256 blocks, but keeps the extrinsics for all past blocks, and the genesis block. A node that is pruned this way requires much less space than an archive node. In order to query past state through a full node, a user would have to wait for the node to rebuild the chain up until that block. A full node _can_ rebuild the entire chain with no additional input from other nodes and become an archive node. One caveat is that if finality stalled for some reason and the last finalized block is more than 256 blocks behind, a pruned full node will not be able to sync to the network.

Archive nodes are used by utilities that need past information - like block explorers, council scanners, discussion platforms like [Polkassembly](https://polkassembly.io), and others. They need to be able to look at past on-chain data. Full nodes are used by everyone else - they allow you to read the current state of the chain and to submit transactions directly to the chain without relying on a centralized infrastructure provider.

Another type of node is a **light node**. A light node has only the runtime and the current state, but does not store past extrinsics and so cannot restore the full chain from genesis. Light nodes are useful for resource restricted devices. An interesting use-case of light nodes is a Chrome extension which is a node in its own right, running the runtime in WASM format: https://github.com/paritytech/substrate-light-ui

### 快速安装说明 (Mac)

> Not recommended if you're a validator. Please see [secure validator setup](maintain-guides-secure-validator)

- Type terminal in the ios searchbar/searchlight to open the 'terminal' application
- Install Homebrew within the terminal by running: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`
- Then run: `brew install openssl cmake llvm`
- Install Rust in your terminal by running: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
- Once Rust is installed, run the following command to clone and build the kusama code:
  ```
  git clone https://github.com/paritytech/polkadot kusama
  cd kusama
  ./scripts/init.sh
  cargo build –-release
  ```
- Run the following command to start your node: `./target/release/polkadot --name "My node's name"`
- Find your node at https://telemetry.polkadot.io/#list/Kusama

### 快速安装说明 (Windows)

> This works only on Windows Pro with virtualization enabled.

> Not recommended if you're a validator. Please see [secure validator setup](maintain-guides-secure-validator)

- Install WSL: https://docs.microsoft.com/en-us/windows/wsl/install-win10
- Install Ubuntu (same webpage): https://docs.microsoft.com/en-us/windows/wsl/install-win10
- Download Polkadot binary within Ubuntu by running: `curl -sL https://github.com/paritytech/polkadot/releases/download/v0.7.30/polkadot -o polkadot`
- Run the following: `sudo chmod +x polkadot`
- Run the following: `./polkadot --name "Your Node Name Here"`
- Find your node at https://telemetry.polkadot.io/#list/Kusama

### 快速安装说明 (Linux)

> Not recommended if you're a validator. Please see [secure validator setup](maintain-guides-secure-validator)

- Download Polkadot binary by running: `curl -sL https://github.com/paritytech/polkadot/releases/download/v0.7.30/polkadot -o polkadot`
- Run the following: `sudo chmod +x polkadot`
- Run the following: `./polkadot --name "Your Node Name Here"`
- Find your node at https://telemetry.polkadot.io/#list/Kusama

## 获取 Substrate

按照 [这里的说明](https://www.substrate.io/kb/getting-started) - 注意 Windows 用户， 最好是使用虚拟机。

Test if the installation was successful by running `cargo --version`.

```bash
λ cargo --version
cargo 1.41.0 (626f0f40e 2019-12-03)
```

## Clone and Build

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
./target/release/polkadot --name "My node's name"
```

Use the `--help` flag to find out which flags you can use when running the node. For example, if [connecting to your node remotely](maintain-wss), you'll probably want to use `--ws-external` and `--rpc-cors all`.

The syncing process will take a while depending on your bandwidth, processing power, disk speed and RAM. On a \$10 DigitalOcean droplet, the process can complete in some 36 hours.

恭喜您，您正在与 Kusama 网络同步。请记住，当使用任何其他的 Substrate 链时，该进程也是相同的。

## 运行 Archive 节点

当计行一个简单的同步节点时(上面)，仅保留过去256个区块的状态。当验证时，它默认为 [archive 模式](#types-of-nodes)。要保持完整状态，请使用`--pruning` 标志：

```bash
./target/release/polkadot --name "My node's name" --pruning archive
```

使用额外标志可以使同步速度几乎达到四倍：`--wasm-execution Compiled`请注意，这使节点使用了更多的 CPU 和 RAM ，因此应该在节点同步后关闭 。
