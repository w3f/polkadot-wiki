---
id: maintain-endpoints
title: Node Endpoints
sidebar_label: Node Endpoints
description: List of node endpoints and examples of use.
keywords: [endpoints, network, connect]
slug: ../maintain-endpoints
---

Ideally, one may run their own node when interacting with the
[Polkadot network](https://polkadot.network/) via [Polkadot-JS Apps](https://polkadot.js.org/apps/) or
other UIs and programmatic methods. Another option would be to connect to one of the several public
endpoints provided by infrastructure and API service providers. For development convenience,
[Parity Tech](https://www.parity.io/) maintains archive nodes for Polkadot, Kusama, and their test
networks with public endpoints. These endpoints can be used with
[Polkadot-JS API](https://polkadot.js.org/docs/api) to interact with their respective chains. The
tables below list these endpoints.

### Network Endpoints

#### Main Networks

| Network  | URL                          |
| -------- | ---------------------------- |
| Polkadot | wss://rpc.polkadot.io        |
| Kusama   | wss://kusama-rpc.polkadot.io |

#### Test Networks

| Network | URL                           |
| ------- | ----------------------------- |
| Westend | wss://westend-rpc.polkadot.io |
| Rococo  | wss://rococo-rpc.polkadot.io  |

#### Example usage with Polkadot-JS API

To connect to the Parity node, use the endpoint in your JavaScript apps like so:

```javascript {5}
// Using the Polkadot Mainnet Endpoint
const { ApiPromise, WsProvider } = require('@polkadot/api');
async () => {
  // Construct a provider with the endpoint URL
  const provider = new WsProvider('wss://rpc.polkadot.io/');
  // Create an API instance for Polkadot
  const api = await ApiPromise.create({ provider });
  // ...
```