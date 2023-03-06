---
id: polkadotjs-ui
title: Polkadot-JS UI (Wallet)
sidebar_label: Polkadot-JS UI
description: Learn about PolkadotJS
keywords: [polkadotjs, polkadotjs apps, apps UI, extension]
slug: ../polkadotjs-ui
---

:::info Supported Wallet

If you need help using the Polkadot-JS UI you can contact the
[**Polkadot Support Team**](https://support.polkadot.network/support/home). Please note that this
wallet is oriented toward developers and power users. For more user-friendly wallets, check out
treasury-funded wallets on the [Wallets Page](./../general/wallets.md).

:::

The [**Polkadot-JS UI**](https://polkadot.js.org/apps/#/explorer) is the native application for
accessing to all features available on Substrate chains such as Polkadot and Kusama. The UI is one
of the moving parts of [**Polkadot-JS tool collection**](./polkadotjs.md), and its functionalities
go beyond normal wallet functionalities such as transfers.

## Main Functionalities

Here we describe those functionalities that will likely be useful to most of the users. Those
functionalities include account generation, balance transfers, and staking.

### Accounts

In this section of the UI you can see accounts injected from a browser extension such as the
[**Polkadot-JS Extension**](./polkadotjs.md#polkadot-js-extension) or
[**other in-browser wallets**](./wallets.md#browser-extensions). It is also possible to expand
balance details and see different
[**account balance types**](../learn/learn-accounts.md#account-balance-types). You can also:

- Add an account (this option must be enabled under [Settings](#settings)). Note that if you clear
  the cache of your browser you will lose it, and you will need to recover it through seed phrase or
  JSON file.
- Recover and account from JSON file.
- Add an account from QR code.
- Add an account from a Ledger device (this option must be enabled under [Settings](#settings)).
- Create a [**multi-signature account**](../learn/learn-account-multisig.md).
- Add a proxied account (see
  [**Pure Proxies**](../learn/learn-proxies.md#anonymous-proxy-pure-proxy) for more information).

For more information about adding and recovering accounts see the
[**Account Generation**](../learn/learn-account-generation.md) page.

### Network (Staking)

In this section of the UI you can participate to [**staking**](../learn/learn-staking.md). The
Staking menu is divided into eight tabs:

- The **Overview** tab shows active or waiting validators.
- The **Accounts** (visible only if you added an account) tab shows accounts that are currently used
  for staking, bonded amount, and nominations. In this tab you can do staking-related transactions
  such as bonding more funds or changing nominations.
- The **Payouts** (visible only if you added an account) tab shows any pending rewards that still
  need to paid out to you.
- The **Pool** tab shows all registered [**nomination pool**](../learn/learn-nomination-pools.md)
  with respective state (open, blocked or destroying). This tab can be also used to create and join
  a pool.
- The **Targets** tab shows detailed statistics about validators. More information can be found
  [**here**](../learn/learn-nominator.md).
- The **Bags** (visible only if you added an account) tab shows
- The **Slashes** tab shows
- The **Validator stats** tab shows

### Settings

In this section of the UI you can change general settings such as appearance and language. You can
also:

- Allow local in-browser account storage. This is used to add accounts directly in the UI (which is
  different from having an account injected from a browser extension).
- Choose to attach Ledger devices. This is used to add an account directly in the UI from a Ledger
  device.

Under Settings you can also do the metadata update. Usually, if there is an update, this will be
shown as a notification. For more information about metadata updates see the
[**dedicated section**](../learn/learn-extrinsics.md#metadata-updates).

## Other Functionalities

In this section we describe those functionalities that will less likely interest

### Network (Other)

### Governance

In this section of the UI you can participate to governance.

### Developer

In this section of the UI you can access

Extrinsic tab provides a more such as Pure Proxies, Time-delayed proxies, etc.

> Note that the UI may not precisely align with the functionality of individual parachains.

Among other things, Polkadot-JS Apps allows a user to:

- [Staking](../learn/learn-staking.md)
- [Governance](../learn/learn-governance.md)
- [Crowdloans](../learn/learn-crowdloans.md)
- [Auctions](../learn/learn-auction.md)
- Query chain metadata
- Query on-chain data using RPC calls
- Call extrinsics using your account

## Beginner's Guide to Polkadot-JS

- [Introduction to Polkadot-JS](https://www.youtube.com/watch?v=4EQqwGFV1D8)
- [Create an account using Polkadot-JS](https://www.youtube.com/watch?v=sy7lvAqyzkY)
- [Network Explorer on Polkadot-JS UI](https://www.youtube.com/watch?v=g4b4IWR6OrE)
