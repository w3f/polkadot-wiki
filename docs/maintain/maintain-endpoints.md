---
id: maintain-endpoints
title: Node Endpoints
sidebar_label: Node Endpoints
description: List of node endpoints and examples of use.
keywords: [endpoints, network, connect]
slug: ../maintain-endpoints
---

Ideally, one may run their own node when interacting with the
[Polkadot network](https://polkadot.network/) via [Polkadot-JS Apps](https://polkadot.js.org/apps/)
or other UIs and programmatic methods. Another option would be to connect to one of the several
public endpoints provided by infrastructure and API service providers. For development convenience,
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

#### Substrate Connect

[Substrate connect](https://substrate.io/developers/substrate-connect/) builds on Polkadot JS so
building an app is the same experience as with using a traditional RPC server node. It is a fast,
secure, and decentralized way to interact with Polkadot, Kusama, and their parachains right in the
browser.

:::info

Substrate Connect is still under
[active development](https://github.com/paritytech/substrate-connect).

:::

### Third Party Providers

There are a number of third-party providers of RPC infrastructure to the Polkadot and Kusama
communities, commonly providing access to multiple networks and parachains in a single service. They
provide additional services such as higher rate limits, potentially more reliable and scalable
service, and additional metrics.

- [OnFinality](https://onfinality.io)
- [Dwellir](https://dwellir.com)
- [Pinknode](https://pinknode.io)
- [Radium Block](https://radiumblock.io)

::: note

The list of third party RPC endpoints above for Polkadot and Kusama is directly fetched from
Polkdot-JS UI

:::
