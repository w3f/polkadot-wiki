---
id: maintain-rpc
title: Set up a RPC node
sidebar_label: Set up a RPC node
description: Steps on setting up a RPC node.
keywords: [rpc, rpc node, web socket, remote, connection, secure websocket]
slug: ../maintain-rpc
---

The substrate node RPC server can be accessed over the WebSocket protocol, which can be used to
access the underlying network and/or validator node. By default, you can access your node's RPC
server from localhost (for example, to rotate keys or do other maintenance). To access it from
another server or an applications UI (such as [Polkadot-JS UI](https://polkadot.js.org/apps)) it is
recommended to enable access to the RPC node over an SSL connection and encrypt the connection
between the end user and the RPC server. This can be achieved by setting up a secure proxy. Many
browsers, such as Google Chrome, will block non-secure ws endpoints if they come from a different
origin.

!!!note
    Enabling remote access to your validator node should not be necessary and is not suggested, as it
    can often lead to security problems

## Set up a Node

Setting up any Substrate-based node relies on a similar process. For example, by default, they will
all share the same WebSocket connection at port 9944 on localhost. In this example, we'll set up a
Polkadot sync node on a Debian-flavoured server (such as Ubuntu 22.04). Create a new server on your
provider of choice or locally at home. See [Set up a Full Node](./maintain-sync.md) for additional
instructions. You can install from the default apt repository or build from scratch. The startup
options in the setup process provide various settings that can be modified.

A typical setting for an externally accessible polkadot archive RPC node would be:

```config
polkadot --chain polkadot --name myrpc --state-pruning archive --blocks-pruning archive --rpc-max-connections 100 --rpc-cors all --rpc-methods Safe --rpc-port 9944
```

Or for a Polkadot pruned RPC node:

```config
polkadot --chain polkadot --name myrpc --state-pruning 1000 --blocks-pruning archive --rpc-max-connections 100 --rpc-cors all --rpc-methods Safe --rpc-port 9944
```

The specified flag options are outlined in greater detail below.

### Archive Node vs. Pruned Node

A pruned node only keeps a limited number of finalized blocks of the network, not its full history.
Most frequently required actions can be completed with a pruned node, such as displaying account
balances, making transfers, setting up session keys, staking, etc. An archive node has the full
history (database) of the network. It can be queried in various ways, such as providing historical
information regarding transfers, balance histories, and more advanced queries involving past events.

An archive node requires a lot more disk space. At the start of April 2023, Polkadot disk usage was
160 GB for a pruned node and 1 TB for an archive node. This value will increase with time. For an
archive node, you need the options `--state-pruning archive --blocks-pruning archive` in your
startup settings.

!!!tip
    Inclusion in the Polkadot.js UI requires an archive node.

### Secure the RPC server

The node startup settings allow you to choose **what** to expose, **how many** connections to expose
and **from where** access should be granted through the RPC server.

_How many_: You can set your maximum connections through `--rpc-max-connections`, for example
`--rpc-max-connections 100`

_From where_: by default localhost and the polkadot.js are allowed to access the RPC server; you can
change this by setting `--rpc-cors`, to allow access from everywhere you need `--rpc-cors all`

_What_: you can limit the methods to use with `--rpc-methods`, an easy way to set this to a safe
mode is `--rpc-methods Safe`

### Secure the ws port

To safely access your ws connection over an SSL-enabled connection (needed for polkadot.js), you
have to convert the ws connection to a secure (wss) connection by using a proxy and an SSL
certificate, you can find instructions on securing the ws port [here](./maintain-wss.md).

## Connecting to the Node

Open [Polkadot-JS UI](https://polkadot.js.org/apps) and click the logo in the top left to switch the
node. Activate the "Development" toggle and input your node's address - either the domain or the IP
address. Remember to prefix with `wss://`, and if you're using the 443 port, append `:443` like so:
`wss://example.com:443`.

![A sync-in-progress chain connected to Polkadot-JS UI](../assets/maintain-wss-image.png)

Now you have a secure remote connect setup for your Substrate node.
