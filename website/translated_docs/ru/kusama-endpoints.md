---
id: kusama-endpoints
title: Конечные точки Kusama (endpoints)
sidebar_label: Конечные точки Kusama (endpoints)
---

When interacting with the [Kusama network](https://kusama.network) via [Polkadot-JS Apps](https://polkadot.js.org/apps) or other UIs and programmatic methods, you'd ideally be running your own node ([text guide](maintain-sync), [video guide](https://www.youtube.com/watch?v=31DdfcxbAVs)). Granted, that's not something everyone wants to do, so convenience trumps ideals in most cases. To facilitate this convenience, Kusama has several public endpoints you can use for your apps.

## Архивная нода Parity

[Parity](https://parity.io), the company that develops the Polkadot Rust client, maintains an archive node at endpoint `wss://kusama-rpc.polkadot.io/`.

Чтобы подключиться к узлу Parity, используйте конечную точку в приложениях JavaScript например так:

```javascript
const{ ApiPromise, WsProvider } = require('@polkadot/api')

(async () => {
    const provider = new WsProvider('wss://kusama-rpc.polkadot.io/')
    const api = await ApiPromise.create({ provider })
    // ...
```

or in Polkadot-JS Apps by clicking the top-left corner of the screen and selecting the appropriate option:

<img src="/img/endpoints/kusama_endpoint_parity.png" width=40% />

## Архивная нода Фонда Web3

Фонд Web3 поддерживает архивный узел с конечной точкой `wss://cc3-5.kusama.network/`.

To connect to this node, use the endpoint in your JavaScript apps like so:

```javascript
const{ ApiPromise, WsProvider } = require('@polkadot/api')

(async () => {
    const provider = new WsProvider('wss://cc3-5.kusama.network/')
    const api = await ApiPromise.create({ provider })
    // ...
```

Подключитесь к нему в интерфейсе Polkadot приложений, нажав левый верхний угол экрана и выбрав соответствующий параметр:

<img src="/img/endpoints/kusama_endpoint_web3.png" width=40% />
