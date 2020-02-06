---
id: maintain-sync
title: Set up a Full Node
sidebar_label: Set up a Full Node
---

If you're building dapps or products on a Substrate-based chain like Polkadot, Kusama or a custom Substrate implementation, you probably want the ability to run a node-as-a-back-end. After all, it's always better to rely on your own infrastructure than on a third-party-hosted one in this brave new decentralized world.

This guide will show you how to connect to [Kusama network](https://kusama.network), but the same process applies to any other [Substrate](https://substrate.dev)-based chain.

## Get Substrate

Follow instructions as outlined [here](https://substrate.dev/docs/en/getting-started/installing-substrate) - note that Windows users will have their work cut out for them. It's better to instead use a virtual machine.

Test if the installation was successful by running `cargo --version`.

```bash
λ cargo --version
cargo 1.41.0 (626f0f40e 2019-12-03)
```

## Clone and Build

The [paritytech/polkadot](https://github.com/paritytech/polkadot) repo's master branch contains the latest Kusama code.

```bash
git clone https://github.com/paritytech/polkadot kusama
cd kusama
./scripts/init.sh
cargo build --release
```

Alternatively, check out a specific tagged release:

```bash
git clone https://github.com/paritytech/polkadot kusama
cd kusama
git checkout tags/v0.7.20
./scripts/init.sh
cargo build --release
```

## Run

The built binary will be in the `target/release` folder, called `polkadot`.

```bash
./target/release/polkadot --name "My node's name"
```

Use the `--help` flag to find out which flags you can use when running the node. For example, if [connecting to your node remotely](maintain-wss), you'll probably want to use `--ws-external` and `--rpc-cors all`.

The syncing process will take a while depending on your bandwidth, processing power, disk speed and RAM. On a $10 DigitalOcean droplet, the process can complete in some 36 hours.

Congratulations, you're now syncing with Kusama. Keep in mind that the process is identical when using any other Substrate chain.

## Running an Archive Node

When running as a simple sync node (above), only the state of the past 256 blocks will be kept. When validating, it defaults to archive mode (keeps all state - much more resource intensive). To keep the full state - so you can do historical lookups, for example - use the `--pruning` flag:

```bash
./target/release/polkadot --name "My node's name" --pruning archive
```
