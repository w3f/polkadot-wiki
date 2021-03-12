---
id: maintain-networks
title: 网络
sidebar_label: 网络
---

Polkadot 是建立在 Substrate 上面，Substrate 是个区块链框架。 Substrate 的其中一个功能是允许使用单个可执行文件并配置它一个启动标志连接到不同的网络。 这里是一些与 Polkadot 或 Substrate 相关联的网络。您可能想连接并加入。

## Polkadot 网络

若要连接到 Polkadot 网络，请按照 [说明](maintain-sync) 安装 Polkadot 可执行程序。

### Polkadot 主网

Polkadot 主网尚未发布。一旦主网上线， 简介将在此处。

### Kusama Canary 网络

Kusama 网络是个早期未经审核的 Polkadot 版本，今天正在运行，拥有真正的经济价值。

Kusama 目前是通过掌握技巧构建的，是启动节点时的默认选项。

执行 Polkadot binary：

```
polkadot
```

并且您将连接和开始同步到 Kusama。

通过在 [Telemetry](https://telemetry.polkadot.io/#/Kusama%20CC3) 查看您的节点是否已经连接。

### Western 测试网络

Westend 是 Polkadot 的最新测试网络。 此网络上的代币叫做 _Westies_ 和没有经济价值。

Westend 目前是从 master 构建的，并且需要命令行标志才能访问。

执行 Polkadot 时，使用 `chain` 选项：

```
polkadot --chain westend
```

并且您将连接并开始同步 Westend。

#### Westend 水龙头

按照[此处](learn-DOT#getting-westies)的说明获取有关 Westies 的说明。

通过在 [Telemetry](https://telemetry.polkadot.io/#list/Westend) 查看您的节点是否已经连接。

### Differences

Runtime differences (e.g. existential and multisignature deposit sizes) between the different networks can be found by doing a `diff` between the `src/lib.rs` of the respositories. For example, to compare the Polkadot and Westend runtimes:

- `git clone https://github.com/paritytech/polkadot && cd polkadot/runtime`
- `ls` - show the available runtimes
- `diff polkadot/src/lib.rs westend/src/lib.rs`

You can also paste the runtimes ([Polkadot](https://github.com/paritytech/polkadot/blob/master/runtime/polkadot/src/lib.rs), [Westend](https://github.com/paritytech/polkadot/blob/master/runtime/westend/src/lib.rs)) into a web-based diff tool like [Diffchecker](https://www.diffchecker.com/) if you're not comfortable with the CLI.

## Substrate 网络

To connect to a Substrate public network first follow the [instructions](https://substrate.dev/docs/en/knowledgebase/getting-started) for installing the Substrate executable.

### Flaming Fir

Flaming Fir is the public Substrate test network. It contains some pallets that will not be included in the Polkadot runtime.

Flaming Fir is built from the tip of master and is the default option when running the Substrate executable.

Run Substrate without a flag or explicitly state `fir`:

```
substrate --chain fir
```

and you will connect and start syncing Flaming Fir.

## Telemetry 监察

If you connect to the public networks, the default configuration for your node will connect it to the public [Telemetry](https://telemetry.polkadot.io/) service.

You can verify that your node is connected by navigating to the correct network on the dashboard and finding the name of your node.

There is a built-in search function for the nodes page. Simply start typing keystrokes in the main window to make it available.
