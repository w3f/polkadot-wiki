---
id: learn-guides-staking
title: Polkadot-JS Guides For Nominators
sidebar_label: Staking Guides
description: Polkadot-JS Guides for Nominators.
keyword: [nominate, stake, staking, claim, rewards, polkadot-js]
slug: ../learn-guides-staking
---

import RPC from "./../../components/RPC-Connection";

See [this page](./learn-staking.md) to learn about staking.

## Claiming Rewards with Polkadot-JS

Anyone can trigger a payout for any validator, as long as they are willing to pay the transaction
fee. Someone must submit a transaction with a validator ID and an era index.
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} will automatically calculate that
validator's reward, find the top
{{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :kusama }}
nominators for that era, and distribute the rewards pro rata.

:::note

The Staking system only applies the highest
{{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :kusama }}
nominations to each validator to reduce the complexity of the staking set.

:::

These details are handled for you automatically if you use the
[Polkadot-JS UI](https://polkadot.js.org/apps/#/staking/payout), which also allows you to submit
batches of eras at once.

To claim rewards on Polkadot-JS UI, you will need to be in the "Payouts" tab underneath "Staking",
which will list all the pending payouts for your stashes.

![pending-payouts](../assets/polkadotjs_payout_page.png)

To then claim your reward, select the "Payout all" button. This will prompt you to select your stash
accounts for payout.

![select-payouts](../assets/polkadotjs_payout_popup.png)

Once you are done with payout, another screen will appear asking for you to sign and submit the
transaction.

![transaction-payouts](../assets/polkadotjs_payout_complete.png)
