---
id: kusama-endpoints
title: Kusama Endpoints
sidebar_label: Kusama Endpoints
description: An overview of useful Kusama endpoints.
slug: ../../kusama-endpoints
---

When interacting with the [Kusama network](https://kusama.network/) via
[Polkadot-JS Apps](https://polkadot.js.org/apps/) or other UIs and programmatic
methods, you'd ideally be running your own node ([text guide](../../maintain/maintain-sync.md),
[video guide](https://www.youtube.com/watch?v=31DdfcxbAVs)). Granted, that's not something everyone
wants to do, so convenience trumps ideals in most cases. To facilitate this convenience, Kusama
has several public endpoints you can use for your apps provided by infrastructure and
API services providers in the ecosystem.

## Parity Archive Node

[Parity Tech](https://www.parity.io/), maintains an archive node at
endpoint `wss://kusama-rpc.polkadot.io/`. You can find other Partiy Tech maintained endpoints [here](https://wiki.polkadot.network/docs/maintain-endpoints#endpoints). 

To connect to the Parity node, use the endpoint in your JavaScript apps like so:

```javascript {4}
const{ ApiPromise, WsProvider } = require('@polkadot/api')
async () => {
  // Construct a provider with the endpoint URL
  const provider = new WsProvider('wss://kusama-rpc.polkadot.io');
  // Create an API instance for Kusama
  const api = await ApiPromise.create({ provider });
  // ...
```

or in Polkadot-JS Apps by clicking the top-left corner of the screen and selecting the appropriate
option:

<img src={require('./../../assets/endpoints/kusama_endpoint_parity.png').default} width="40%" />
