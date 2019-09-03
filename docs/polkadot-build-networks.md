---
id: polkadot-build-networks
title: Networks
sidebar_label: Networks
---

The following commands can be used to connect to the different networks.

## Development

Install Polkadot and have a `polkadot` binary install to your `PATH` with:

```bash
cargo install --git https://github.com/paritytech/polkadot.git polkadot
```

You can run a simple single-node development "network" on your machine by running in a terminal:

```bash
polkadot --dev
```

You can muck around by cloning and building the http://github.com/paritytech/polka-ui and http://github.com/paritytech/polkadot-ui or just heading to https://polkadot.js.org/apps.

## Krumme Lanke

Krumme Lanke is a testnet network used during the development of PoC-2.

Install Polkadot PoC-2 and have a `polkadot` binary installed to your `PATH` with:

```bash
cargo install --git https://github.com/paritytech/substrate.git --branch v0.2 polkadot
```

Connect to the global "Krumme Lanke" testnet by default by running:

```bash
polkadot
```

## Alexander (PoC-4)

Alexander is a testnet network used during the development of PoC-3 and PoC-4.

Install Polkadot PoC-4 and have a `polkadot` binary installed to your `PATH` with:

```bash
cargo install --git https://github.com/paritytech/polkadot.git --branch v0.4 polkadot
```

Connect to the global "Alexander" testnet by default by running:

```bash
polkadot
```

## Local Two-Node Testnet

If you want to see the multi-node consensus algorithm in action locally, then
you can create a local testnet. You'll need two terminals open. In one, run:

```bash
polkadot --chain=local --validator --key Alice -d /tmp/alice
```

and in the other, run:

```bash
polkadot --chain=local --validator --key Bob -d /tmp/bob --port 30334 --bootnodes '/ip4/127.0.0.1/tcp/30333/p2p/ALICE_BOOTNODE_ID_HERE'
```

Ensure you replace `ALICE_BOOTNODE_ID_HERE` with the node ID from the output of
the first terminal.
