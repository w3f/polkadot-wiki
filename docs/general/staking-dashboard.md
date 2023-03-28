---
id: staking-dashboard
title: Polkadot Staking Dashboard
sidebar_label: Staking Dashboard
description: Everything about the Polkadot Staking Dashboard
keywords: [ledger, staking, polkadot, dashboard]
slug: ../staking-dashboard
---

:::info Preliminary Notes

The Polkadot Staking Dashboard has **native [Ledger](./ledger.md) support**, meaning that you do not
need an extension or a wallet to use it, just your Ledger device.

Before using the dashboard make sure you have a Polkadot account in a Ledger device or a browser
extension such as the [Polkadot-JS Extension](./polkadotjs.md#polkadot-js-extension) or
[other third-party extensions](./wallets.md#browser-extensions). Remember to send funds to that
account. On top of the existential deposit, you need some free balance to pay for transaction fees
and the minimum amount to place your nominations (for nominators) or join a nomination pool (for
pool members). Note, staking rewards are not guaranteed, for more information visit the
[staking page](../learn/learn-staking.md) and
[advanced staking page](../learn/learn-staking-advanced.md).

:::

The [Polkadot Staking Dashboard](https://staking.polkadot.network/#/overview) is a tool that is only
dedicated to [staking](../learn/learn-staking.md) on Polkadot,
[Kusama](../learn/learn-kusama-vs-polkadot.md) (Polkadot's canary network) and
[Westend](../maintain/maintain-networks.md#westend-test-network) (Polkadot's test network).

The dashboard is not a wallet, meaning that you cannot transfer funds between accounts. To fund
accounts you can use [third-party wallets](./wallets.md) or the
[Polkadot-JS UI](./polkadotjs-ui.md). You can participate to staking by being a
[nominator](../learn/learn-nominator.md) or a
[nomination pool member](../learn/learn-nomination-pools.md). Once you have an account with enough
funds you need to connect (connect button on the top-right corner) it to the dashboard, this will
allow you to interact with Polkadot's native staking.

## Overview

This section of the dashboard will give you the general view about current staking metrics and your
staking situation. These metrics include the **historical reward rate**, the **supply staked** and
**time remaining in the current era**.

Additionally, you will be able to see the followings:

- Balance Panel: The panel shows the bonded amount distinguishing between **nominating**, **in a
  pool**, and **not staking**. The amount that is not staking is further divided into **free**
  (balance that can be transferred) and **reserve** (balance that is needed the keep the account
  on-chain, see [existential deposit](../learn/learn-accounts.md#existential-deposit-and-reaping)).

- Recent Payouts Panel: The panel shows a bar chart with the rewards that have been paid out to you
  in the past 15 days either as a nominator or a pool member (manually claimed). Below the bar chart
  there is a line chart showing then 10-day moving average.

Additional statistics can be found at the bottom of the overview page.

## Stake

In this category you can access all functionalities that will allow to stake your tokens as
nominator, a member of a nomination pool, or both.

### Nominate

Similarly to the Overview section, at the top of this section you can access relevant information
such as the number of active nominators, the minimum amount needed to place your nomination intents,
and the
[minimum active bond](../learn/learn-nominator.md#minimum-active-nomination-to-receive-staking-rewards)
of the current era.

### Pools

### Payout

## Validators
