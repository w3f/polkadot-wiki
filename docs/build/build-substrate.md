---
id: build-substrate
title: Substrate Connect
sidebar_label: Substrate Connect
description: Information about Substrate Connect.
keywords: [build, substrate, substrate connect, light client]
slug: ../build-substrate
---

## Blockchain User Interfaces are still Centralized

The communication between a standard user interface (UI) and a network node is through a JSON RPC
protocol. Generally, the UI will showcase the information that is available on the node, and this is
done through two main approaches:

1. **User-Controlled Nodes**: The UI connects to a node client that the user has installed on their
   machine.
   - These nodes are secure, but installation and maintenance of these nodes tend to be an
     inconvenience.
2. **Publicly-Accessible Nodes**: The UI connects to a third-party-owned publicly-accessible node
   client.
   - While these nodes are more prevalent in their usage as they are convenient to use, they are
     centralized and insecure.

There is now a new paradigm: instead of specifying a centralized RPC node, developers just need to
define the blockchain's [chain specification](https://docs.substrate.io/main-docs/build/chain-spec/)
for their application to synchronize with the chain. This is possible with Substrate connect.

## What is Substrate Connect?

### Replacing [RPC node](build-node-interaction.md) reliance with light clients

[Substrate connect](https://substrate.io/substrate-connect/) is a JavaScript library and browser
extension that builds on the [PolkadotJS API](https://polkadot.js.org/api/)) to enable developers to
build application-specific light clients for Substrate chains. There is no installation required or
optional extension with minimal or no maintenance. The node is run by the JavaScript engine.

Simply put, Substrate connect is a Substrate client that runs in JavaScript.

Application developers no longer need to rely on single RPC nodes to allow end-users to interact
with their applications.

### Substrate (full node) vs. Substrate connect (light client)

A light client is a client that lets you utilize all the possibilities of the chain, but it does not
require you to run a full copy of the entire blockchain. Light clients fetch the required data that
they need from a {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} node with an
associated proof to validate the data. This makes it possible to interact with the
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} network without requiring to run a
full node or having to trust the remote peers.

| Substrate: Full node                                                                                        | Substrate connect: Light client                                                                               |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| full verification of all blocks of the chain                                                                | only verifies the authenticity of blocks of the chain                                                         |
| holds all of the previous block data and the chain's storage in database                                    | no database                                                                                                   |
| installation, maintenance, and execution tend to be exhaustive and require system administration expertise. | no installation; has an optional extension with minimal or no maintenance. Initializes in five to ten seconds |

## How to use Substrate Connect

### As a JavaScript library

Substrate connect provides a PolkadotJS API connected to a bundled node. Through the use of the
library, a user can run an actual Substrate-compatible node.

#### A node bundled with its user interface: ready-to-use light clients

The UI connects to a node client that is directly integrated: **convenient**, **secure**, and
**decentralized**. This is accomplished through Substrate connect using a
[smoldot](https://github.com/paritytech/smoldot/) Wasm light client to securely connect to the
blockchain network without relying on specific third parties.

Application developers can now run a Substrate light client in any NodeJS environment
([@substrate/connect](https://www.npmjs.com/package/@substrate/connect)). Currently, Substrate
connect supports Polkadot, Kusama, Westend, and Rococo; because light clients are part of the
overall Substrate framework, they are available for Substrate-based blockchains.

### As a browser extension

Establishing a sufficient number of peers is difficult due to browser limitations on WebSockets from
HTTPS pages, as many nodes need to be available with TLS. The browser extension provided by
Substrate connect helps to overcome this limitation and keeps the chains synced in the background,
allowing applications to run faster.

#### Bundling light-clients of multiple chains

The [browser extension](https://www.npmjs.com/package/@substrate/connect-extension-protocol) allows
end-users to interact with applications connected to multiple blockchains or connect their own
blockchains to applications that support it.

:::note

Substrate Connect will auto-detect whether a user is using the extension. If not, the Wasm light
client will be created in-page for them.

:::

## Resources

- [What is a light client and why you should care?](https://www.parity.io/blog/what-is-a-light-client/)
- [Introducing Substrate Connect: Browser-Based Light Clients for Connecting to Substrate Chains](https://www.parity.io/blog/introducing-substrate-connect)
- [Substrate connect GitHub Repo](https://github.com/paritytech/substrate-connect/tree/master/projects/extension)
