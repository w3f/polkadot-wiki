---
id: kusama-endpoints
title: Kusama Endpoints
sidebar_label: Kusama Endpoints
---

When interacting with the [Kusama network][] via [Polkadot-JS Apps][] or other UIs and programmatic
methods, you'd ideally be running your own node ([text guide](https://wiki.polkadot.network/docs/maintain-sync),
[video guide](https://www.youtube.com/watch?v=31DdfcxbAVs)). Granted, that's not something everyone
wants to do, so convenience trumps ideals in most cases. To facilitate this convenience, Kusama has
several public endpoints you can use for your apps.

## Parity Archive Node

[Parity][], the company that develops the Polkadot Rust client, maintains an archive node at
endpoint `wss://kusama-rpc.polkadot.io/`.

To connect to the Parity node, use the endpoint in your JavaScript apps like so:

```javascript
const{ ApiPromise, WsProvider } = require('@polkadot/api')

(async () => {
    const provider = new WsProvider('wss://kusama-rpc.polkadot.io/')
    const api = await ApiPromise.create({ provider })
    // ...
```

or in Polkadot-JS Apps by clicking the top-left corner of the screen and selecting the appropriate
option:

<img src={require('./assets/endpoints/kusama_endpoint_parity.png').default} width="40%" />

## Web3 Foundation Archive Node

The Web3 Foundation maintains an archive node at endpoint `wss://cc3-5.kusama.network/`.

To connect to this node, use the endpoint in your JavaScript apps like so:

```javascript
const{ ApiPromise, WsProvider } = require('@polkadot/api')

(async () => {
    const provider = new WsProvider('wss://cc3-5.kusama.network/')
    const api = await ApiPromise.create({ provider })
    // ...
```

Connect to it in Polkadot Apps UI by clicking the top-left corner of the screen and selecting the
appropriate option:

<img src={require('./assets/endpoints/kusama_endpoint_web3.png').default} width="40%" />

[kusama network]: https://kusama.network
[parity]: https://parity.io
[polkadot-js apps]: https://polkadot.js.org/apps
