---
id: learn-guides-accounts-proxy
title: Polkadot-JS Guides about Proxy Accounts
sidebar_label: Proxy
description: Polkadot-JS Guides about Proxy Accounts
keyword: [guides, polkadot-js, accounts, proxy]
slug: ../learn-guides-accounts-proxy
---

Proxies allow users to use an account (it can be in cold storage or a hot wallet) less frequently
but actively participate in the network with the weight of the tokens in that account. Proxies are
allowed to perform a limited amount of actions related to specific
[substrate pallets](https://docs.substrate.io/reference/frame-pallets/) on behalf of another
account. The video below contains more information about using proxies.

[![Proxy Accounts](https://img.youtube.com/vi/1tcygkq52tU/0.jpg)](https://www.youtube.com/watch?v=1tcygkq52tU)

:::tip Know how to check the calls and pallets accessible by proxies

For the latest information on the calls and pallets that can be fully accessed by proxies, check the
[source code in the runtime folder](https://github.com/paritytech/polkadot-sdk/blob/153543b0c8c582e73f520e5c08cbe33bddfb5f69/runtime/polkadot/src/lib.rs#L1158)
on the [Polkadot repository](https://github.com/paritytech/polkadot-sdk)

:::

## Creating Proxy with Polkadot-JS

To create a proxy account with Polkadot-JS read
[this support article](https://support.polkadot.network/support/solutions/articles/65000182179-how-to-create-a-proxy-account).

## Removing Proxy with Polkadot-JS

Read the section "Removing Proxies" on
[this support page](https://support.polkadot.network/support/solutions/articles/65000182179-how-to-create-a-proxy-account)
to learn how to remove proxies.

## View your Proxy on Polkadot-JS

To view your proxy, just go on the _Accounts_ menu in the Polkadot-JS UI, next to the proxied
account you will notice a blue icon. Hover on it, and you will see _Proxy overview_. Click on it and
you will be presented with a list of all proxies for that account.

![polkadot_view_proxies](../assets/polkadot_view_proxies.png)

Additionally, you can head over to the _Chain State_ tab (underneath the _Developer_ menu) on
[Polkadot-JS Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/chainstate). If
you've created your proxy on a {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}
account, it is required to change your network accordingly using the top left navigation button. On
this page, the proxy pallet should be selected, returning the announcements and proxies functions.
The proxies function will allow you to see your created proxies for either one account or for all
accounts (using the toggle will enable this). Proxy announcements are what time lock proxies do to
announce they are going to conduct an action.

![polkadot_view_proxies_dev](../assets/polkadot_view_proxies_dev.png)
