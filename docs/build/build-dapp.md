---
id: build-dapp
title: Building dApps
sidebar_label: Building dApps
description: An overview about building dApps on Polkadot
keywords: [data, index, query, explorer, dashboard, dapp, uapp, app, frontend, client]
slug: ../build-dapp
---

## Developing a dApp/uApp

If one aims to develop a **dApp** (Decentralized App) or **uApp** (Unstoppable App), the Polkadot
ecosystem contains various SDKs to tap into the relay chain and parachains.

For front-end applications, several options exist for interfacing with Substrate-based chains
(parachains, relay chains, etc.) and smart contracts. These often will interact with the RPC of a
Substrate node:

<!-- prettier-ignore -->
<Tabs groupId="clients" values={[ {label: 'Polkadot.js', value: 'pjs'}, {label: 'Subxt', value: 'subxt'}, {label: 'React Hooks for ink!', value: 'useink'}, {label: 'ink!athon Boilerplate', value: 'inkathon'} ]}>

<TabItem value="pjs"> Promise and RxJS APIs around Polkadot and Substrate based chains via RPC
calls. It is dynamically generated based on what the Substrate runtime provides in terms of
metadata. Full documentation & examples
available&nbsp;<a href="https://polkadot.js.org/docs" target="_blank">here</a>. </TabItem>

<TabItem value="subxt"> Query and submit extrinsics (transactions) to a Substrate node via RPC using
Rust. Also referred to as Rust Parity. Full documentation & examples
available&nbsp;<a href="https://github.com/paritytech/subxt" target="_blank">here</a>. </TabItem>

<TabItem value="useink"> React hooks library for ink! smart contracts that abstract the
functionality of polkadot.js. Full documentation & examples
available&nbsp;<a href="https://use.ink" target="_blank">here</a>. </TabItem>

<TabItem value="inkathon">ink!athon is a starterkit for full-stack dApp development with ink! smart
contracts and a React-based frontend in one place. With convenient helper scripts and a
pre-configured project setup, it lets you scaffold any dApp quickly. Live example & full
documentation available&nbsp;<a href="https://inkathon.xyz" target="_blank">here</a>. </TabItem>

</Tabs>
