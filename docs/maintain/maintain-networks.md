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

## Polkadot networks

To connect to a Polkadot network please follow the [instructions](maintain-sync.md) for installing
the Polkadot executable.

### Polkadot Mainnet

Currently Polkadot is built from the tip of master and is the default option when starting a node.

To start a Polkadot node, run the Polkadot binary:

```bash
polkadot
```

and you will connect and start syncing to Polkadot.

Check your node is connected by viewing it on
[Telemetry](https://telemetry.polkadot.io/#/Polkadot%20CC3) (you can set a custom name by specifying
`--name "my custom name"`)

### Kusama Canary Network

Kusama is a canary network and holds real economic value.

Run the Polkadot binary and specify `kusama` as the chain:

```bash
polkadot --chain=kusama
```

and you will connect and start syncing to Kusama.

Check your node is connected by viewing it on
[Telemetry](https://telemetry.polkadot.io/#/Kusama%20CC3) (you can set a custom name by specifying
`--name "my custom name"`)

### Westend Test Network

Westend is the latest test network for Polkadot. The tokens on this network are called _Westies_ and
they purposefully hold no economic value.

Run the Polkadot binary and specify `westend` as the chain:

```bash
polkadot --chain=westend
```

and you will connect and start syncing to Westend.

Check that your node is connected by viewing it on
[Telemetry](https://telemetry.polkadot.io/#list/Westend) (you can set a custom name by specifying
`--name "my custom name"`).

#### Westend Faucet

Follow the instruction [here](../learn/learn-DOT.md#getting-westies) for instructions on acquiring
Westies.

### Differences

Runtime differences (e.g. existential and multisignature deposit sizes) between the different
networks can be found by doing a `diff` between the `src/lib.rs` of the repositories. For example,
to compare the Polkadot and Westend runtimes:

- `git clone https://github.com/paritytech/polkadot && cd polkadot/runtime`
- `ls` - show the available runtimes
- `diff polkadot/src/lib.rs westend/src/lib.rs`

You can also paste the runtimes
([Polkadot](https://github.com/paritytech/polkadot/blob/master/runtime/polkadot/src/lib.rs),
[Westend](https://github.com/paritytech/polkadot/blob/master/runtime/westend/src/lib.rs)) into a
web-based diff tool like [Diffchecker](https://www.diffchecker.com/) if you're not comfortable with
the CLI.

## Substrate Networks

To connect to a Substrate public network, follow the [instructions][substrate install] for
installing the Substrate executable first.

### Flaming Fir

Flaming Fir is the public Substrate test network. It contains some pallets that will not be included
in the Polkadot runtime.

Flaming Fir is built from the tip of master and is the default option when running the Substrate
executable.

Run Substrate without a flag or explicitly state `fir`:

```bash
substrate --chain fir
```

and you will connect and start syncing Flaming Fir.

## Telemetry Dashboard

If you connect to the public networks, the default configuration for your node will connect it to
the public [Telemetry][telemetry] service.

You can verify that your node is connected by navigating to the correct network on the dashboard and
finding the name of your node.

There is a built-in search function on the nodes page. Simply start typing keystrokes in the main
window to make it available.

[substrate install]: https://docs.substrate.io/v3/getting-started/overview/
[telemetry]: https://telemetry.polkadot.io/
