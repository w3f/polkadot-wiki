---
id: maintain-networks
title: Networks
sidebar_label: Networks
---

Polkadot is built on top of Substrate, a modular framework for blockchains.
One feature of Substrate is to allow for connection to different networks
using a single executable and configuring it with a start-up flag. Here are
some of the networks associated with Polkadot or Substrate that you may want
to connect to and join.

## Polkadot Networks

To connect to a Polkadot network please follow the [instructions](maintain-sync)
for installing the Polkadot executable.

### Polkadot Mainnet

The Polkadot mainnet is not released yet. Instructions will be here once the 
network is available.

### Kusama Canary Network

The Kusama canary network is an early, unaudited version of Polkadot that is
running today and holds real economic value.

Currently Kusama is built from the tip of master and is the default option when
starting a node.

Run the Polkadot binary:

```
polkadot 
```

and you will connect and start syncing to Kusama.

Check your node is connected by viewing it on [Telemetry](https://telemetry.polkadot.io/#/Kusama%20CC3).

### Westend Test Network

Westend is the latest test network for Polkadot. The tokens on this network
are called _Westies_ and they purposefully hold no economic value.

Currently Westend is built from the tip of master and requires a commandline
flag to access.

Run the Polkadot binary with a `chain` option:

```
polkadot --chain westend
```

and you will connect and start syncing to Westend.

Check your node is connected by viewing it on [Telemetry](https://telemetry.polkadot.io/#list/Westend).

## Substrate Networks

To connect to a Substrate public network first follow the [instructions][substrate install] for installing the Substrate executable.

### Flaming Fir

Flaming Fir is the public Substrate test network. It contains some pallets
that will not be included in the Polkadot runtime.

Flaming Fir is built from the tip of master and is the default option when
running the Substrate executable.

Run Substrate without a flag or explicitly state `fir`:

```
substrate --chain fir
```

and you will connect and start syncing Flaming Fir.

## Telemetry Dashboard

If you connect to the public networks, the default configuration for your node
will connect it to the public [Telemetry][telemetry] service.

You can verify that your node is connected by navigating to the correct network
on the dashboard and finding the name of your node.

There is a built-in search function for the nodes page. Simply start typing
keystrokes in the main window to make it available.

[substrate install]: https://substrate.dev/docs/en/overview/getting-started#fast-installation
[telemetry]: https://telemetry.polkadot.io/
