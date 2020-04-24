---
id: kusama-endpoints
title: Kusama Endpoints
sidebar_label: Kusama Endpoints
---

When interacting with the [Kusama network](https://kusama.network) via [Polkadot Apps](https://polkadot.js.org/apps) or other UIs and programmatic methods, you'd ideally be running your own node ([text guide](maintain-sync), [video guide](https://www.youtube.com/watch?v=31DdfcxbAVs)). Granted, that's not something everyone can or wants to do, so convenience trumps ideals in most cases. To facilitate this convenience, Kusama has several public endpoints you can use for your apps.

## Parity Archive Node

The development company Parity maintains an archive node at endpoint `wss://kusama-rpc.polkadot.io/`. 

To connect to the Parity node, use the endpoint in your JavaScript apps like so:

```javascript
const{ ApiPromise, WsProvider } = require('@polkadot/api')

(async () => {
    const provider = new WsProvider('wss://kusama-rpc.polkadot.io/')
    const api = await ApiPromise.create({ provider })
    // ...
```

or in Polkadot Apps UI by clicking the top-left corner of the screen and selecting the appropriate option:

![Selecting Parity's Node](/img/endpoints/parity.png)

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

or in Polkadot Apps UI by clicking the top-left corner of the screen and selecting the appropriate option:

![Selecting W3F's Node](/img/endpoints/w3f.png)

## Kusama RYO Full Node Cloud

RYO (Run Your Own) infrastructure from [Avado](https://ava.do) is a load balancer - a server redirecting requests randomly to other computers - to which you can attach your own home-run node. This means that by connecting to the load balancer's endpoint, you're randomly connecting to another person's public node: the convenience of one reliable endpoint, without the downside of centralization\*.

Check the current status of the Kusama RYO cloud including available nodes at https://status.cloud.ava.do/

To connect to the RYO cloud, use the endpoint `wss://kusama.polkadot.cloud.ava.do/` in your JavaScript apps like so:

```javascript
const{ ApiPromise, WsProvider } = require('@polkadot/api')

(async () => {
    const provider = new WsProvider('wss://kusama.polkadot.cloud.ava.do/')
    const api = await ApiPromise.create({ provider })
    // ...
```

or in Polkadot Apps UI by clicking the top-left corner of the screen and selecting the appropriate option:

![Selecting the RYO cloud](/img/endpoints/ryo.png)

### Things to know

#### Reliability 

There is no incentive to run these public nodes yet. We're working on making that happen. Ideally, the Kusama Treasury would fund this public infrastructure venture. For now, running the nodes is altruistic which means the nodes can disappear for no reason.

#### \*Centralization

The nodes are distributed and decentralized, but the load balancer serving them requests isn't. The Ava.do team is actively looking for other companies and organizations willing to run load balancers as backups to the main one - [get in touch](https://t.me/joinchat/F_LlkBLEoDrFioPNviEpsQ) if you'd like to lend a hand.

#### Full nodes

The nodes in the RYO cloud are currently *full nodes*, not *archive nodes*. To learn the difference, [watch this crash course](https://www.youtube.com/watch?v=31DdfcxbAVs). If you need archive data, run your own archive node or go with a Parity or W3F hosted node for now. Archive nodes in RYO are planned for a future update.

#### Avado Only

For now, the RYO cloud can be joined only with Ava.do hardware. This is a guarantee that the hardware is at or above minimum requirements, so that the endpoint can guarantee a reliable node on the other end. In the future, fully custom remote-run and even cloud-run nodes will be able to join the RYO cloud.