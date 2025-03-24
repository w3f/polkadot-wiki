---
id: polkadotjs-ui
title: Polkadot-JS UI (Wallet)
sidebar_label: Polkadot-JS UI
description: A Wallet for Power-users and Developers.
keywords: [polkadotjs, polkadotjs apps, apps UI, extension]
slug: ../polkadotjs-ui
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

The [**Polkadot-JS UI**](https://polkadot.js.org/apps/#/explorer) is the native application for
accessing all features available on Substrate chains as Polkadot and Kusama. The UI is one of the
moving parts of [**Polkadot-JS tool collection**](./polkadotjs.md), and its functionalities go
beyond normal wallet functionalities such as transfers.

> Note that the UI may not precisely align with the functionality of individual parachains. For more
> information see the [**Polkadot-JS Page**](./polkadotjs.md#polkadot-js-api).

## Main Functionalities

Here we describe those functionalities that will likely be useful to most users. Those
functionalities include account generation, balance transfers, and staking.

### Accounts

In this section of the UI, you can see accounts injected from a browser extension, such as the
[**Polkadot-JS Extension**](./polkadotjs.md#polkadot-js-extension) or
[**other in-browser wallets**](./wallets-and-extensions.md#browser-extensions). It is also possible
to expand balance details and see different
[**account balance types**](../learn/learn-account-balances.md#balance-types-on-polkadot-js). You
can also:

- Add an account (this option must be enabled under [Settings](#settings)). Note that if you clear
  the cache of your browser, you will lose it, and you will need to recover it through seed phrase
  or JSON file.
- Recover and account from JSON file.
- Add an account from QR code.
- Add an account from a [**Ledger**](./ledger.md) device (this option must be enabled under
  [Settings](#settings)).
- Create a [**multi-signature account**](../learn/learn-account-multisig.md).
- Add a proxied account (see
  [**Pure Proxies**](../learn/learn-proxies-pure.md) for more
  information).

For each account visible in the UI, you can perform different actions, including
[**adding a proxy**](../learn/learn-proxies.md),
[**setting an identity**](../learn/learn-identity.md), and
[**sending tokens**](../learn/learn-transactions.md#balance-transfers).

For more information about adding and recovering accounts, see the
[**Account Generation**](../learn/learn-accounts.md#account-generation) page.

### Network (Staking)

In this section of the UI, you can participate in [**staking**](../learn/learn-staking.md). In the
Staking menu you can access:

- The **Overview** tab showing active or waiting validators.
- The **Accounts** tab (visible only if you added an account) showing accounts that are currently
  used for staking
  ([**stash and staking proxy**](../learn/learn-staking.md#stash-account-and-staking-proxy)), bonded
  amount, and nominations. In this tab, you can do staking-related transactions such as bonding more
  funds or changing nominations. If you have
  [**staking proxies**](../learn/learn-staking-advanced.md#staking-proxies) here, you can use them
  while signing for staking-related transactions.
- The **Payouts** tab (visible only if you added an account) showing any pending rewards that still
  need to be paid out to you.
- The **Pool** tab showing all registered [**nomination pool**](../learn/learn-nomination-pools.md)
  with the respective state (open, blocked, or destroying). This tab can also be used to create and
  join a pool.
- The **Targets** tab showing detailed information about validators such as commission and return.
  More information can be found in the [**Nominator Page**](../learn/learn-nominator.md).
- The **Bags** tab (visible only if you added an account) showing the bag you are in ("My bags") and
  all bags within the [**bags list**](../learn/learn-staking-advanced.md#bags-list). Here (if
  applicable), you can rebag accounts that do not belong to the bag you are in, and you can move
  your account in front of the account having less stake than you.
- The **Slashes** tab showing if there are any global [slashes](../learn/learn-offenses.md).
- The **Validator stats** tab showing statistics for a chosen validator.

### Settings

In this UI section, you can change general settings such as appearance and language. You can also:

- Allow local in-browser account storage. This is used to add accounts directly in the UI (which
  differs from having an account injected from a browser extension).
- Choose to attach Ledger devices. This adds an account directly in the UI from a Ledger device.

Under Settings you can also do the metadata update. Usually, if there is an update, this will be shown as a notification.

## Other Functionalities

In this section, we describe those functionalities that will less likely interest the average user.

### Network

In addition to staking, in the Network section, you can also:

- See the Explorer with the most recent blocks and events.
- Inspect [**parachains**](../learn/learn-parachains.md).

### Governance

In this section of the UI, you can participate in
[**governance**](../learn/learn-polkadot-opengov.md).

### Developer

In this section of the UI, you can access advanced features such as:

- [Query on-chain data](https://polkadot.js.org/apps/#/chainstate)
- [Query the node using RPC calls](https://polkadot.js.org/apps/#/rpc)
- Call [**extrinsics**](../learn/learn-transactions.md) using your account (you are able to see this
  option only if you have an account in the UI)

The [Extrinsic tab](https://polkadot.js.org/apps/#/extrinsics) provides the use to access more
granular functions such as
[**pure proxies**](../learn/learn-proxies-pure.md) and
[**time-delayed proxies**](../learn/learn-proxies.md#time-delayed-proxy), change
[**nomination pool**](../learn/learn-nomination-pools.md) settings (nomination and roles) and use
[**non-transfer proxies**](../learn/learn-proxies.md#proxy-types),
[**destroy assets**](../learn/learn-assets.md#destroying-an-asset), and much more.

## Beginner's Guide to Polkadot-JS

- [Introduction to Polkadot-JS](https://www.youtube.com/watch?v=4EQqwGFV1D8)
- [Create an account using Polkadot-JS](https://www.youtube.com/watch?v=sy7lvAqyzkY)
- [Network Explorer on Polkadot-JS UI](https://www.youtube.com/watch?v=g4b4IWR6OrE)