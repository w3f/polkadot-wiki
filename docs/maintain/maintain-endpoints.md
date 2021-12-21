---
id: maintain-endpoints
title: Node Endpoints
sidebar_label: Node Endpoints
description: List of node endpoints and examples of use.
slug: ../maintain-endpoints
---

For development convenience, [Parity Tech](https://www.parity.io/) maintains archive nodes for
Polkadot, Kusama, and their test networks with public endpoints. These endpoints can be used with
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

#### Example usage with Polkadot-JS

To connect to the Parity node, use the endpoint in your JavaScript apps like so:

```javascript {4}
const { ApiPromise, WsProvider } = require('@polkadot/api');
async () => {
  // Construct a provider with the endpoint URL
  const provider = new WsProvider('wss://rpc.polkadot.io/');
  // Create an API instance for Polkadot
  const api = await ApiPromise.create({ provider });
  // ...
```
