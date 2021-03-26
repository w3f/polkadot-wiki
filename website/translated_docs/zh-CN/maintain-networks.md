---
id: maintain-networks
title: 网络
sidebar_label: 网络
---

Polkadot 是建立在 Substrate 上面，Substrate 是个区块链框架。 Substrate 的其中一个功能是允许使用单个可执行文件并配置它一个启动标志连接到不同的网络。 这里是一些与 Polkadot 或 Substrate 相关联的网络。您可能想连接并加入。

## Polkadot 网络

若要连接到 Polkadot 网络，请按照 [说明](maintain-sync) 安装 Polkadot 可执行程序。

### Polkadot 主网

Currently Polkadot is built from the tip of master and is the default option when starting a node.

To start a Polkadot node, run the Polkadot binary:

```bash
polkadot
```

and you will connect and start syncing to Polkadot.

Check your node is connected by viewing it on [Telemetry](https://telemetry.polkadot.io/#/Polkadot%20CC3) (you can set a custom name by specifying `--name "my custom name"`)

### Kusama Canary 网络

Kusama is a canary network and holds real economic value.

Run the Polkadot binary and specify `kusama` as the chain:

```bash
polkadot --chain=kusama
```

and you will connect and start syncing to Kusama.

Check your node is connected by viewing it on [Telemetry](https://telemetry.polkadot.io/#/Kusama%20CC3) (you can set a custom name by specifying `--name "my custom name"`)

### Western 测试网络

Westend is the latest test network for Polkadot. The tokens on this network are called _Westies_ and they purposefully hold no economic value.

Run the Polkadot binary and specify `westend` as the chain:

```bash
polkadot --chain=westend
```

and you will connect and start syncing to Westend.

Check your node is connected by viewing it on [Telemetry](https://telemetry.polkadot.io/#list/Westend) (you can set a custom name by specifying `--name "my custom name"`)

#### Westend 水龙头

Follow the instruction [here](learn-DOT#getting-westies) for instructions on acquiring Westies.

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

```bash
substrate --chain fir
```

and you will connect and start syncing Flaming Fir.

## Telemetry 监察

If you connect to the public networks, the default configuration for your node will connect it to the public [Telemetry](https://telemetry.polkadot.io/) service.

You can verify that your node is connected by navigating to the correct network on the dashboard and finding the name of your node.

There is a built-in search function for the nodes page. Simply start typing keystrokes in the main window to make it available.
