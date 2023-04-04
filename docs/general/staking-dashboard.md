---
id: staking-dashboard
title: Polkadot Staking Dashboard
sidebar_label: Staking Dashboard
description: Everything about the Polkadot Staking Dashboard
keywords: [ledger, staking, polkadot, dashboard]
slug: ../staking-dashboard
---

import RPC from "./../../components/RPC-Connection";

:::info Preliminary Notes

The [Polkadot Staking Dashboard](https://staking.polkadot.network/#/overview) has **native
[Ledger](./ledger.md) support**, meaning that you do not need an extension or a wallet to use it,
you just need your Ledger device. [Metadata updates](../learn/learn-extrinsics.md#metadata-updates)
are thus not necessary as you only need to keep your Ledger apps up-to-date.

Before using the dashboard make sure you have a
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} account in a Ledger device with the
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} Ledger app installed, or a browser
extension such as the [Polkadot-JS Extension](./polkadotjs.md#polkadot-js-extension) or
[other third-party extensions](./wallets.md#browser-extensions) with a funded
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} account.

On top of the [existential deposit](../learn/learn-accounts.md#existential-deposit-and-reaping), you
need some free balance to pay for [transaction fees](../learn/learn-transaction-fees.md) and the
minimum amount to place your nominations (only for nominators, currently
{{ polkadot: __<RPC network="polkadot" path="query.staking.minNominatorBond" defaultValue={2500000000000} filter="humanReadable"/>__ :polkadot }}{{ kusama: __<RPC network="kusama" path="query.staking.minNominatorBond" defaultValue={100000000000} filter="humanReadable"/>__ :kusama }})
or join a nomination pool (only for pool members, currently
{{ polkadot: __<RPC network="polkadot" path="query.nominationPools.minJoinBond" defaultValue={10000000000} filter="humanReadable"/>__ :polkadot }}{{ kusama: __<RPC network="kusama" path="query.nominationPools.minJoinBond" defaultValue={1667000000} filter="humanReadable"/>__ :kusama }}).
For more information about staking on {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}
visit the [staking page](../learn/learn-staking.md) and the
[advanced staking page](../learn/learn-staking-advanced.md).

:::

The [Polkadot Staking Dashboard](https://staking.polkadot.network/#/overview) is a tool only
dedicated to [staking](../learn/learn-staking.md) on Polkadot,
[Kusama](../learn/learn-kusama-vs-polkadot.md) (Polkadot's canary network) and
[Westend](../maintain/maintain-networks.md#westend-test-network) (Polkadot's test network).

The dashboard is not a wallet, meaning that you cannot transfer funds between accounts. To fund
accounts you can use [third-party wallets](./wallets.md) or the
[Polkadot-JS UI](./polkadotjs-ui.md). You can participate to staking by being a
[nominator](../learn/learn-nominator.md) or a member of a
[nomination pool](../learn/learn-nomination-pools.md). Once you have a funded account with enough
you need to connect it to the dashboard (connect button on the top-right corner), this will allow
you to interact with {{ polkadot: Polkadot's :polkadot }}{{ kusama: Kusama's :kusama }} native
staking.

:::info The dashboard is a Web3 dApp

The dashboard is a decentralized application (dApp), meaning that under the hood there are no
centralized servers but a network of nodes storing information about the Polkadot blockchain and
validating transactions, including everything you decide to do on the dashboard. To login into the
dashboard you do not need emails and passwords but just your public address. From now on you are in
charge of your data, and you will need to authorize anything you want to do. Welcome to Web3!

:::

{{ polkadot: Note the pictures on this page refer to Kusama but the same applies to Polkadot and Westend. :polkadot }}
The structure of this page follows the sidebar of the staking dashboard. Here you will learn about
the main features of the dashboard. If you need more information see the
[Walkthrough Tutorial](https://youtu.be/hvXLc4H7rA4).

## Overview

![dashboard overview](../assets/dashboard-overview.png)

This section of the dashboard has six main sections:

- **Section A: The Sidebar** shows in which page your are (in this case the Overview). It will also
  show the role you currently have in staking (in this case active in both [Pools](#pools) and
  [Nominate](#nominate)). You can also change the [network](#network) (currently on Kusama).

- **Section B: The Accounts Panel** allows you to connect one account to the dashboard. Once
  connected, the account will show up next to the "Accounts" button. If you are active as a
  nominator and/or a pool member you will be able to see it here. In this case the account KSM Stash
  is a nominator (with no controller) and a member of the pool Insight Finance. Controller accounts
  are also shown here if applicable. Note that the dashboard will automatically fetch the stash or
  the controller as read-only account if you connect one or the other.

- **Section C: The Stats Panel** shows the general view about current staking metrics including the
  historical reward rate (including after
  [inflation](../learn/learn-staking-advanced.md#inflation)), the supply staked and time remaining
  in the current era.

- **Section D: The Summary Panel** shows your current situation and gives you general tips about
  staking. In this case the KSM Stash account is a nominator and a pool member, and by clicking on
  "Manage" you can go directly to the [Nominate](#nominate) and [Pools](#pools) pages, respectively.
  There you can take actions such as changing staking preferences, bonding more funds, etc.

- **Section E: The Balance Panel** shows the bonded amount distinguishing between "Nominating", "In
  a Pool", and "Not Staking". The amount that is not staking is further divided into "Free" (balance
  that can be transferred) and "Reserve" (balance that is needed the keep the account on-chain, see
  [existential deposit](../learn/learn-accounts.md#existential-deposit-and-reaping)). In this case
  0.301 KSM are bonded for nominating, 0.3 KSM are bonded in a pool, and 0.145 KSM are not used for
  staking. Of the non-staking balance 0.144 KSM are free while
  {{ polkadot: <RPC network="kusama" path="consts.balances.existentialDeposit" defaultValue={333000000} filter="humanReadable"/> :polkadot }}
  are reserved for the existential deposit.

- **Section F: The Recent Payouts Panel** shows a bar chart with the rewards that have been paid out
  to you in the past 15 days either as a nominator or a pool member (manually claimed). Note how the
  bar of the 4th of April has the tip that is jot filled with color. This is to show a pending
  payout (for nominators only). Below the bar chart there is a line chart showing then 10-day moving
  average.

Additional statistics can be found at the bottom of the overview page. Note also the current
exchange rate for the native token {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} at the
footer of the dashboard. This information is used to estimate how much your balance is worth.

:::info Pool funds are in system accounts

Remember that funds bonded in a pool are transferred the pool's system accounts that is not
accessible to anybody. Some wallets might not display balance that is bonded in pools, but the
dashboard will always show it to you.

:::

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

## Support

## Network
