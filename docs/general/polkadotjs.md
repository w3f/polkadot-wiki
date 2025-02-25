---
id: polkadotjs
title: Polkadot-JS Tooling
sidebar_label: Polkadot-JS Tooling
description: The Polkadot-JS Tool Collection.
keywords: [polkadotjs, polkadotjs apps, apps UI, extension]
slug: ../polkadotjs
---

<!-- MessageBox -->
<div id="messageBox" class="floating-message-box">
  <p>
    Polkadot-JS is for developers and power users only. If you need help using the Polkadot-JS UI, you can contact the
    <a href="https://support.polkadot.network/support/home" target="_blank" rel="noopener noreferrer">
      Polkadot Support Team.
    </a>
  </p>
  <button class="close-messagebox" aria-label="Close message">✖</button>
</div>

[**Polkadot-JS**](https://polkadot.js.org/) is a collection of tools that interfaces with Relay
Chains and parachains in a granular way. Below we describe the different components of Polkadot-JS.
For more information about Polkadot-JS you can consult the
[**official documentation**](https://polkadot.js.org/docs/).

## Polkadot-JS UI

!!!info For Developers and Power Users Only
    Please note that this wallet UI is oriented toward developers and power users. Explore Polkadot with
    a secure and user-friendly wallets listed on the
    [Polkadot website](https://www.polkadot.network/ecosystem/wallets/). If you need help using the
    Polkadot-JS UI you can contact the
    [**Polkadot Support Team**](https://support.polkadot.network/support/home).



The Polkadot-JS UI is an application that loads in your browser. There is a standard DNS
[**hosted version**](https://polkadot.js.org/), which always has the latest features, and an
[**IPFS version**](https://dotapps.io/) that is less frequently updated but is more decentralized.
This is also often referred to as Polkadot-JS Apps, UI or the Apps UI. In the Wiki pages we will
always refer to Polkadot-JS UI.

Polkadot-JS Apps has many capabilities that go beyond basic wallet functions such as account
creation and sending or receiving transactions. See the [**dedicated section**](./polkadotjs-ui.md)
for more information about the UI.

### Polkadot-JS UI Desktop App

The Polkadot-JS UI also exists as a
[**desktop application**](https://github.com/polkadot-js/apps/releases/) for Windows, Mac and Linux.
The main advantage of using it is that by default it stores encrypted accounts on the filesystem
instead of browser's local storage. Local storage is susceptible to attacks using XSS (Cross-Site
Scripting). There's no such risk when with files stored on disk.

The desktop app uses the [**Electron**](https://www.electronjs.org/) framework. It provides the same
features as web app, the only difference being different account storage.

!!!info Ledger not supported
    The desktop application does not support Ledger accounts. If you need a cold storage solution you
    can try Parity Signer (aka Polkadot Vault).



## Polkadot-JS Extension

The [**Polkadot-JS browser extension**](https://polkadot.js.org/extension/) is not a wallet _per se_
but an account management tool. It allows you to create accounts and also import accounts from
[**Ledger**](./ledger.md) devices or Parity Signer, allowing the signing of
[**extrinsics**](../learn/learn-transactions.md) using these accounts. It also allows you export
existing accounts and restore accounts (given you have the required information to restore them).

The extension is a robust key storage tool, i.e. even if you clear the cache of your browser your
accounts will be retained. The extension will recognize any websites that have been flagged for
malicious activity. For additional security, the extension will always ask if you want a specific
website to access the account information on it.

The extension does not let users interact directly with on-chain functions as one would find on a
wallet app like Metamask, i.e. it does not allow you to transact or do anything else other than
adding and managing accounts. However, it provides a simple interface for interacting with
extension-compliant dApps such as the [**Polkadot-JS UI**](https://polkadot.js.org/apps/#/explorer)
and the [**Polkadot Staking Dashboard**](https://staking.polkadot.cloud/#/overview). Check
[wallets and extensions](./wallets-and-extensions.md) page for wallets that are capable of
transacting on-chain directly.

!!!info Metadata Updates
    The browser extension is a tool that interacts with the Polkadot network, but it is disconnected from it when it is not in use. It is important you [**always check for metadata updates**](../learn/learn-guides-accounts.md#polkadot-js-browser-extension) before using the extension or other account management tools such as Parity Signer (aka Polkadot Vault).



## Polkadot-JS Phishing List

The [**Polkadot-JS phishing list**](https://polkadot.js.org/phishing/) website is a community-driven
curation of malicious actors and operators. The Polkadot-JS extension uses this list to warn a user
about suspicious URLs and addresses that are part of the list, and automatically blocks the account
address.

## Polkadot-JS API

The [**Polkadot-JS API**](https://github.com/polkadot-js/api) is a JavaScript API allowing for
programs to interface with the functionalities of Polkadot.

While interacting with the underlying
[**@polkadot/api**](https://www.npmjs.com/package/@polkadot/api), most interfaces are generated
automatically when connecting to an available node. This is quite a departure from many other API
designs where the interfaces are commonly static.

When the API connects to a node, it initially retrieves the
[**metadata**](https://polkadot.js.org/apps/#/runtime) which is used to "decorate" the API based on
its contents. The metadata provides data in the form of `api.<type>.<module>.<section>` where `type`
fits into one of the following categories:

- `consts` - runtime constants (these are not functions so the values are returned directly as they
  are defined by the endpoint)
- `query` - chain state values
- `tx` - all extrinsics

The metadata also provides information on
[**events**](https://polkadot.js.org/docs/substrate/events/), which can be queried using the
`api.query.system.events()` interface.

None of the information contained within the `api.{consts, query, tx}.<module>.<method>` endpoints
are hard-coded in the API. These values are defined by the decoration applied from the initial
metadata response and are therefore completely dynamic. This suggests that when you connect to
different parachains, the metadata and API decoration will change and provide varying interfaces
based on the chain.

A developer can use Polkadot-JS Apps to test code's functionality. Interacting with the Polkadot-JS
comes down to either [**querying on-chain data**](#querying-on-chain-data) or
[**issuing an extrinsic**](#issuing-extrinsics).

### Querying On-chain Data

To populate the Apps UI, the web app queries the Polkadot-JS API. The API then queries a node and
uses JavaScript to return information that the UI will display on the screen. You can choose which
node to connect to by changing it in the upper-left-hand corner of the screen.

Let's see how we can query on-chain data with Polkadot-JS UI on the Polkadot network with an
example. To find out the current value for existential deposit, navigate to Developer > Chain
state > Constants and query the balances pallet for existential deposit as shown in the snapshot
below. You need to click on the plus button to execute the query. The value displayed is in
[plancks](../learn/learn-DOT.md#polkadot)

![query chain state](../assets/chain-state-constant.png)

### Issuing Extrinsics

Extrinsics are pieces of information that come from outside the chain and are included in a block.
Extrinsics can be one of three types: inherents, signed, and unsigned transactions.

Most extrinsics displayed on Polkadot-JS Apps are signed transactions. Inherits are non-signed and
non-gossiped pieces of information included in blocks by the block author, such as timestamps, which
are “true” because a sufficient number of validators have agreed about validity.

Unsigned transactions are information that does not require a signature but will require some sort
of spam prevention, whereas signed transactions are issued by the originator account of a
transaction which contains a signature of that account, which will be subject to a fee to include it
on the chain.