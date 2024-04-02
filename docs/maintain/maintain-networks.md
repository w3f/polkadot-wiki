---
id: maintain-networks
title: Networks
sidebar_label: Networks
description: Information about the different networks of the Polkadot ecosystem.
keywords: [networks, mainnet, testnet, canary, substrate]
slug: ../maintain-networks
---

Polkadot is built on top of Substrate, a modular framework for blockchains. One feature of Substrate
is to allow for connection to different networks using a single executable and configuring it with a
start-up flag. Here are some of the networks associated with Polkadot or Substrate that you may want
to connect to and join.

## Main networks

To connect to a Polkadot network please follow the [instructions](maintain-sync.md) for installing
the Polkadot executable.

### Polkadot Mainnet

Connecting to the Polkadot network is the default option when starting a node.

To start a Polkadot node, run the Polkadot binary:

```bash
polkadot
```

and you will connect and start syncing to Polkadot.

Check your node is connected by viewing it on
[Telemetry](https://telemetry.polkadot.io/#list/0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3)
(you can set a custom node name by specifying `--name "my-custom-node-name"`)

### Kusama Canary Network

Kusama is a canary network and holds real economic value.

Run the Polkadot binary and specify `kusama` as the chain:

```bash
polkadot --chain=kusama
```

and you will connect and start syncing to Kusama.

Check your node is connected by viewing it on
[Kusama Telemetry](https://telemetry.polkadot.io/#list/0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe)
(you can set a custom node name by specifying `--name "my-custom-node-name"`)

## Test Networks

### Westend Test Network

Westend is the primary test network of Polkadot. The tokens on this network are called _Westies_
(WND) and they purposefully hold no economic value.

Run the Polkadot binary and specify `westend` as the chain:

```bash
polkadot --chain=westend
```

and you will connect and start syncing to Westend.

Check that your node is connected by viewing it on
[Westend Telemetry](https://telemetry.polkadot.io/#list/0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e)
(you can set a custom node name by specifying `--name "my-custom-node-name"`).

#### Westend Faucet

Follow the instruction [here](../learn/learn-DOT.md#getting-tokens-on-the-westend-testnet) to get
Westies (WND) tokens.

### Westmint or Westend Asset Hub

Westmint or Westend
[Asset Hub](https://wiki.polkadot.network/docs/learn-guides-assets-create#creating-assets-on-the-asset-hub)
is a system parachain on Westend network.

#### Westmint Faucet

Claim WND tokens from the [faucet](https://paritytech.github.io/polkadot-testnet-faucet/westend) on
Westend and teleport them to Westmint.

### Rococo Test Network

[Rococo](https://substrate.io/developers/rococo-network/) is a test network built for parachains.
The native token of this network (ROC) holds no economic value.

Run the Polkadot binary and specify `rococo` as the chain:

```bash
polkadot --chain=rococo
```

and you will connect and start syncing to Rococo.

Check that your node is connected by viewing it on
[Rococo Telemetry](https://telemetry.polkadot.io/#list/0x6408de7737c59c238890533af25896a2c20608d8b380bb01029acb392781063e)
(you can set a custom node name by specifying `--name "my-custom-node-name"`).

#### Rococo Faucet

Follow the instruction [here](../learn/learn-DOT.md#getting-tokens-on-the-rococo-testnet) to get
ROCs tokens.

### Wococo Test Network (inactive)

Wococo used to be a Polkadot test network for testing bridges. The network was shut down following
the bridge between Westend and Rococo deployment.

## Differences

Runtime differences (e.g. existential and multisignature deposit sizes) between the different
networks can be found by doing a `diff` between the `src/lib.rs` of the repositories. For example,
to compare the Polkadot and Kusama runtimes:

- `git clone https://github.com/polkadot-fellows/runtimes && cd runtimes/relay`
- `ls` - show the available runtimes
- `diff polkadot/src/lib.rs kusama/src/lib.rs`

You can also paste the runtimes
([Polkadot](https://github.com/polkadot-fellows/runtimes/blob/main/relay/polkadot/src/lib.rs),
[Kusama](https://github.com/polkadot-fellows/runtimes/blob/main/relay/kusama/src/lib.rs)) into a
web-based diff tool like [Diffchecker](https://www.diffchecker.com/) if you're not comfortable with
the CLI.

## Telemetry Dashboard

If you connect to the public networks, the default configuration for your node will connect it to
the public [Telemetry](https://telemetry.polkadot.io/) service.

You can verify that your node is connected by navigating to the correct network on the dashboard and
finding the name of your node.

There is a built-in search function on the nodes page. Simply start typing keystrokes in the main
window to make it available.
