---
id: build-dapp
title: Building dApps
sidebar_label: Building dApps
description: An overview about building dApps on Polkadot
keywords: [data, index, query, explorer, dashboard, dapp, uapp, app, frontend, client]
slug: ../build-dapp
---

import Tabs from "@theme/Tabs"; import TabItem from "@theme/TabItem";

As with any blockchain, building decentralized applications (dApps) is a huge part of how a
developer can build on Polkadot.

As an application developer, you can compose your front-end apps in a few different ways. Because
Polkadot and its parachains are all built using Substraste; you can often use the same SDK to
communicate with Polkadot, a parachain, or any other Substrate-based chain.

:::note Substrate-based chains use an SS58 encoding for their address formats.

Please see the [SS58 registry](https://github.com/paritytech/ss58-registry/) to see which
[chain corresponds to a given prefix](https://github.com/paritytech/ss58-registry/blob/main/ss58-registry.json),
and which prefixes are available.

:::

## SDKS & Libraries

If one aims to develop a **dApp** (Decentralized App), the Polkadot ecosystem contains various SDKs
to tap into the relay chain and parachains. There are several languages already supported -
[see the tooling page for a detailed overview of different SDKs and libraries that are available.](./build-tools-index.md)

## Frameworks & Toolkits

For front-end applications, several options exist for interfacing with Substrate-based chains
(parachains, relay chains, etc.) and smart contracts. These often will interact with the RPC of a
Substrate node:

<!-- prettier-ignore -->
<Tabs groupId="clients" values={[ {label: 'Polkadot.js', value: 'pjs'}, { label: 'Polkadot-API', value: 'papi'}, {label: 'Reactive DOT', value: 'reactive-dot'}, {label: 'Subxt', value: 'subxt'}, {label: 'React Hooks for ink!', value: 'useink'}, {label: 'ink!athon Boilerplate', value: 'inkathon'}, { label: 'Polkadot Cloud', value: 'pcloud'} ]}>

<TabItem value="pjs">

Promise and RxJS APIs around Polkadot and Substrate-based chains via RPC calls. It is dynamically
generated based on what the Substrate runtime provides regarding metadata. Full documentation &
examples available&nbsp;<a href="https://polkadot.js.org/docs" target="_blank">here</a>.

</TabItem>

<TabItem value="papi">

Polkadot-API will serve as a replacement for Polkadot JS. Full documentation & examples
available&nbsp;<a href="https://papi.how/" target="_blank">here</a>.

</TabItem>

<TabItem value="reactive-dot">

A reactive library for building Substrate front-ends. Full documentation & examples
available&nbsp;<a href="https://reactivedot.dev/" target="_blank">here</a>.

</TabItem>

<TabItem value="subxt">

Query and submit extrinsics (transactions) to a Substrate node via RPC using Rust. Also referred to
as Rust Parity. Full documentation & examples
available&nbsp;<a href="https://github.com/paritytech/subxt" target="_blank">here</a>.

</TabItem>

<TabItem value="useink">

React hooks library for ink! smart contracts that abstract the functionality of Polkadot-JS. Full
documentation & examples available&nbsp;<a href="https://use.ink" target="_blank">here</a>.

</TabItem>

<TabItem value="inkathon">

ink!athon is a starter kit for full-stack dApp development with ink! smart contracts and a
React-based frontend in one place. With convenient helper scripts and a pre-configured project
setup, you can quickly scaffold any dApp. Live example & full documentation
available&nbsp;<a href="https://inkathon.xyz" target="_blank">here</a>.

</TabItem>

<TabItem value="pcloud">

Polkadot Cloud hosts a library of assets, ranging from data sources, graphical elements, to fully
functional components, for app developers to plug and play into their codebases.
&nbsp;<a href="https://polkadot.cloud/" target="_blank">Learn more here</a>.

</TabItem>

</Tabs>
