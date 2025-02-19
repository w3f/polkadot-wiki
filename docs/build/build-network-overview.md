---
id: build-network-overview
title: Development Networks
sidebar_label: Development Networks
description: An overview of the different networks on Polkadot
keywords: [data, index, query, explorer, dashboard, dapp, uapp, app, frontend, client]
slug: ../build-network-overview
---

While Polkadot itself is the mainnet, there are several networks that can cater to different
development or application-driven contexts.

!!!info "Looking for faucets?"
    [See here for all available faucets and how to obtain testnet tokens.](../learn/learn-DOT.md#obtaining-testnet-tokens)

## Polkadot Ecosystem Networks

- Mainnet: **Polkadot**
- Canary network: **Kusama**
  - [Kusama](https://kusama.network/) is a value-bearing canary network that gets features before
    Polkadot does. _Expect Chaos_.
- Official testnets:
  - **Westend** - Functionality equal to the current Polkadot mainnet, with possible next-generation
    testing of features from time to time that will eventually migrate onto Polkadot. Perma-testnet
    (is not reset back to genesis block).
  - **Paseo** - A community-run testnet which mirrors the Polkadot runtime. It is maintained by the
    community.

Polkadot mainnet has been running since May 2020 and has
[implementations in various programming languages](../learn/learn-implementations.md) ranging from
Rust to JavaScript. The leading implementation is built in Rust and uses the Substrate framework.

Tooling is rapidly evolving to interact with the network; there are many ways to get started!

But before you jump head-first into the code, you should consider the _kind_ of decentralized
application you want to make and understand the different paradigms available to developers who want
to build on Polkadot.

## Interfacing - PolkadotJS

PolkadotJS is the most widely used developer tool in the Polkadot ecosystem. It provides a web app
to interact with various parachains, nodes, and their RPCs, as well as a Javascript API for use
within front-end contexts. You can view more on PolkadotJS and its resources
[here](https://polkadot.js.org/).

For other programmatic ways of interacting with these networks (including PolkadotJS), please view
the [Node Interactions page](build-node-interaction.md).

## Testnet Faucets

Almost all tesnets either have a web-based interface for getting test currency or a Matrix room
which you can post `!drip <ADDRESS>`

[See here for all available faucets and how to obtain testnet tokens.](../learn/learn-DOT.md#obtaining-testnet-tokens)
