---
id: learn-guides-accounts-proxy-pure
title: Polkadot-JS Guides about Pure Proxy Accounts
sidebar_label: Pure Proxy
description: Polkadot-JS Guides about Pure Proxy Accounts
keyword: [guides, polkadot-js, accounts, proxy, pure proxy, anonymous proxy]
slug: ../learn-guides-accounts-proxy-pure
---

import RPC from "./../../components/RPC-Connection";

:::caution The Account Tab in the Polkadot-JS UI cannot handle complex proxy setups

The Accounts Tab in the Polkadot-JS UI cannot handle complex proxy setups (e.g. a proxy -> multisig
-> a pure proxy which is part of another multisig). These complex setups must be done using the
[Extrinsics Tab](https://polkadot.js.org/apps/#/extrinsics) directly.

**We recommend to use the [Westend Testnet](learn-DOT.md#getting-tokens-on-the-westend-testnet) if
you are testing features for the first time.** By performing the complex proxy setups on the
testnet, you can comfortably replicate the procedure on the main networks.

:::

:::danger Risk of loss of funds

Read carefully the text below and before performing any action using anonymous proxies on
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, experiment on the Westend testnet.

:::

## Create and Remove Pure Proxies with Polkadot-JS

:::info

To create a **pure proxy** see
[this support article](https://support.polkadot.network/support/solutions/articles/65000182196), or
watch [this technical explainer video](https://www.youtube.com/watch?v=T443RcCYP24).

:::

:::caution Removing Pure Proxies

The procedure for removing a _pure_ proxy is different from the one used to remove other proxies.
Visit the section "Removing an Anonymous Proxy" on
[this support article](https://support.polkadot.network/support/solutions/articles/65000182196), or
watch [this technical explainer video](https://www.youtube.com/watch?v=T443RcCYP24).

:::

:::note Explainer video on Pure Proxies

Learn more about pure proxies from our
[technical explainer video](https://www.youtube.com/watch?v=YkYApbhU3i0).

:::
