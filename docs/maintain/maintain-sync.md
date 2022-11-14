---
id: maintain-sync
title: Set up a Full Node
sidebar_label: Set up a Full Node
description: Steps on how to set up a full node.
keywords: [node, full node, sync, setup node]
slug: ../maintain-sync
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

If you're building dapps or products on a Substrate-based chain like Polkadot, Kusama or a custom
Substrate implementation, you probably want the ability to run a node-as-a-back-end. After all, it's
always better to rely on your own infrastructure than on a third-party-hosted one in this brave new
decentralized world.

This guide will show you how to connect to [Polkadot network](https://polkadot.network/), but the
same process applies to any other [Substrate](https://substrate.io)-based chain. First, let's
clarify the term _full node_.

### Types of Nodes

A blockchain's growth comes from a _genesis block_, _extrinsics_, and _events_.

When a validator seals block 1, it takes the blockchain's state at block 0. It then applies all
pending changes on top of it, and emits the events that are the result of these changes. Later, the
state of the chain at block 1 is used in the same way to build the state of the chain at block 2,
and so on. Once two thirds of the validators agree on a specific block being valid, it is finalized.

An **archive node** keeps all the past blocks and their states. An archive node makes it convenient to query the past
state of the chain at any point in time. Finding out what an account's balance at a certain block
was, or which extrinsics resulted in a certain state change are fast operations when using an
archive node. However, an archive node takes up a lot of disk space - around Kusama's 12 millionth
block this was around 660 GB.

:::tip

The [Paranodes](https://paranodes.io/DBSize) website lists the database sizes of Polkadot and Kusama
nodes in real-time.

:::

Archive nodes are used by utilities that need past information - like block explorers, council
scanners, discussion platforms like [Polkassembly](https://polkassembly.io), and others. They need
to be able to look at past on-chain data.

A **full node** prunes historical states: all finalized blocks' states older than a configurable number
except the genesis block's state. This is 256 blocks from the last finalized one, by default. A node that is
pruned this way requires much less space than an archive node.

A full node may eventually be able to rebuild every block's state with no additional information, and
become an archive node, but at the time of writing, this is not implemented. If you need to query
historical blocks' states past what you pruned, you need to purge your database and resync your node
starting in archive mode. Alternatively you can use a backup or snapshot of a trusted source to
avoid needing to sync from genesis with the network, and only need the states of blocks past that snapshot.

Full nodes allow you to read the current state of the chain and to submit and validate extrinsics
directly on the network without relying on a centralized infrastructure provider.

Another type of node is a **light node**. A light node has only the runtime and the current state,
but does not store past blocks and so cannot read historical data without requesting it from a node
that has it. Light nodes are useful for resource restricted devices. An interesting use-case of
light nodes is a browser extension, which is a node in its own right, running the runtime in WASM
format as well as a full or light node that is completely encapsulated in WASM and can be integrated
into webapps: https://github.com/paritytech/smoldot#wasm-light-node

:::note Substrate Connect

[Substrate Connect](https://github.com/paritytech/substrate-connect) provides a way to interact with
substrate based blockchains in the browser without using an RPC server. It is a light node that runs
entirely in Javascript. Substrate Connect uses a
[smoldot WASM light client](https://github.com/paritytech/smoldot) to securely connect to the
blockchain network without relying on specific 3rd parties. Substrate Connect is available as a
[browser extension](https://substrate.io/developers/substrate-connect/) on both Chrome and Firefox.

:::

<!--seperates content from instructions-->

---

<!--setup instructions differ per os, presented in tabs-->

## Setup Instructions

This is not recommended if you're a validator. Please see the
[secure validator setup](maintain-guides-secure-validator.md) if you are running validator.

:::note The bash commands that are provided to run against **your node** use `Polkadot` as the
default chain

Use the `--chain` flag if you are following the setup instructions to setup a `Kusama` node. For
example:

```bash
./target/release/polkadot --name "Your Node's Name" --chain kusama
```

:::

<Tabs
  groupId="operating-systems"
  values={[
    {label: 'macOS', value: 'mac'},
    {label: 'Windows', value: 'win'},
    {label: 'Linux', value: 'linux'},
  ]}
>
<TabItem value="mac">

- Install Homebrew within the terminal by running:
  ```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
  ```
- Then, run:

  ```bash
  brew install openssl cmake llvm
  ```

- Install Rust in your terminal by running:
  ```bash
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
  ```
- Once Rust is installed, run the following command to clone and build the polkadot code:
  ```bash
  git clone https://github.com/paritytech/polkadot polkadot
  cd polkadot
  ./scripts/init.sh
  cargo build --release
  ```
- Start your node:

  ```bash
  ./target/release/polkadot --name "Your Node's Name"
  ```

- Find your node on [Telemetry](https://telemetry.polkadot.io/#list/Polkadot)

</TabItem>
<TabItem value="win">

- Install [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10).
- Install [Ubuntu](https://docs.microsoft.com/en-us/windows/wsl/install-win10) (same webpage).

- Determine the latest version of the
  [Polkadot binary](https://github.com/paritytech/polkadot/releases).
- Download the correct Polkadot binary within Ubuntu by running the following command. Replace
  `*VERSION*` with the tag of the latest version from the last step (e.g. `v0.8.22`):

  ```bash
  curl -sL https://github.com/paritytech/polkadot/releases/download/*VERSION*/polkadot -o polkadot
  ```

- Then, run the following:
  ```bash
  sudo chmod +x polkadot
  ```
- Start your node:

  ```bash
  ./target/release/polkadot --name "Your Node's Name"
  ```

- Find your node on [Telemetry](https://telemetry.polkadot.io/#list/Polkadot)

</TabItem>
<TabItem value="linux">

- Determine the latest version of the
  [Polkadot binary](https://github.com/paritytech/polkadot/releases).

  :::info

  The nature of pre-built binaries means that they may not work on your particular architecture or
  Linux distribution. If you see an error like `cannot execute binary file: Exec format error` it
  likely means the binary is not compatible with your system. You will either need to compile the
  [**source code**](#clone-and-build) or use [**Docker**](#using-docker).

  :::

- Download the correct Polkadot binary within Ubuntu by running the following command. Replace
  `*VERSION*` with the tag of the latest version from the last step (e.g. `v0.8.22`):

  ```bash
  curl -sL https://github.com/paritytech/polkadot/releases/download/*VERSION*/polkadot -o polkadot
  ```

- Run the following: `sudo chmod +x polkadot`
- Run the following:

  ```bash
  ./target/release/polkadot --name "Your Node's Name"
  ```

- Find your node on [Telemetry](https://telemetry.polkadot.io/#list/Polkadot)

</TabItem>
</Tabs>

## Get Substrate

Follow instructions as outlined [here](https://docs.substrate.io/quick-start/) - note that Windows
users will have their work cut out for them. It's better to use a virtual machine instead.

Test if the installation was successful by running `cargo --version`.

```bash
λ cargo --version
cargo 1.41.0 (626f0f40e 2019-12-03)
```

## Clone and Build

The [paritytech/polkadot](https://github.com/paritytech/polkadot) repo's master branch contains the
latest Polkadot code.

```bash
git clone https://github.com/paritytech/polkadot polkadot
cd polkadot
./scripts/init.sh
cargo build --release
```

Alternatively, if you wish to use a specific release, you can check out a specific tag (`v0.8.3` in
the example below):

```bash
git clone https://github.com/paritytech/polkadot polkadot
cd polkadot
git checkout tags/v0.8.3
./scripts/init.sh
cargo build --release
```

## Run

The built binary will be in the `target/release` folder, called `polkadot`.

**Polkadot**:

```bash
./target/release/polkadot --name "Your Node's Name"
```

Use the `--help` flag to find out which flags you can use when running the node. For example, if
[connecting to your node remotely](maintain-wss.md), you'll probably want to use `--ws-external` and
`--rpc-cors all`.

The syncing process will take a while depending on your bandwidth, processing power, disk speed and
RAM. On a \$10 DigitalOcean droplet, the process can complete in some 36 hours.

Congratulations, you're now syncing with Polkadot. Keep in mind that the process is identical when
using any other Substrate chain.

## Running an Archive Node

When running as a simple sync node (above), only the state of the past 256 blocks will be kept. When
validating, it defaults to [archive mode](#types-of-nodes). To keep the full state use the
`--pruning` flag:

**Polkadot**:

```bash
./target/release/polkadot --name "My node's name" --pruning archive
```

It is possible to almost quadruple synchronization speed by using an additional flag:
`--wasm-execution Compiled`. Note that this uses much more CPU and RAM, so it should be turned off
after the node is in sync.

## Using Docker

Finally, you can use Docker to run your node in a container. Doing this is a bit more advanced so
it's best left up to those that either already have familiarity with docker, or have completed the
other set-up instructions in this guide. Be aware that when you run polkadot in docker the process
only listen on localhost by default. If you would like to connect to your node's services (rpc,
websockets, and prometheus) you need to ensure that you run you node with the `--rpc-external`,
`--ws-external`, and `--prometheus-external` commands.

```zsh
docker run -p 9944:9944 -p 9615:9615 parity/polkadot:v0.9.13 --name "calling_home_from_a_docker_container" --rpc-external --ws-external --prometheus-external
```
