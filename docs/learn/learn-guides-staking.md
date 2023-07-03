---
id: learn-guides-staking
title: Staking How-to Guides
sidebar_label: Staking
description: Advanced How-to Guides about Staking.
keyword: [nominate, stake, staking, pools, create, destroy, claim, rewards]
slug: ../learn-guides-staking
---

import RPC from "./../../components/RPC-Connection";

## Claiming Rewards with the Polkadot-JS UI

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

## Nomination Pools

### Creation

The depositor calls the `create` extrinsic, setting the administrative roles and transferring some
funds to the pool to add themselves as the first member. As stated above, the depositor must always
be a member as long as the pool exists; they will be the last member to leave, ensuring they always
have some skin in the game. A significant stake from the depositor is always a good indicator of the
pool's credibility.

**The current minimum bond to create a pool on**
{{ polkadot: **Polkadot** :polkadot }}{{ kusama: **Kusama** :kusama }}
{{ polkadot: **is <RPC network="polkadot" path="query.nominationPools.minCreateBond" defaultValue={2000000000000} filter="humanReadable" />.** :polkadot }}
{{ kusama: **is <RPC network="kusama" path="query.nominationPools.minCreateBond" defaultValue={1000000000000} filter="humanReadable" />.** :kusama }}

The pool’s ‘nominator role’ selects validators with the nominate extrinsic. On Polkadot JS Apps UI,
navigate to Network > Staking > Pools and click on Add Pool button.

![Create Nomination Pools](../assets/staking/Nomination-Pools-1.png)

The UI automatically assigns ID to the pool and allows for entering the name of the pools as well as
the deposit to be bonded.

![Create Nomination Pools - deposit](../assets/staking/Nomination-Pools-2.png)

When creating a pool using Polkadot JS Apps UI, all the roles are mapped to the Depositor account by
default. If any of these roles need to be assigned to a different account, create the pool using
`create` extrinsic available on Developer > Extrinsics > nominationPools on Polkadot JS Apps UI.

![Nomination Pool Roles](../assets/staking/Nomination-Pools-7.png)

### Upkeep

The `nominator` can update the pool’s validator selection. On Polkadot JS Apps UI, navigate to
Network > Staking > Accounts page and click on Pooled button. If you have any pooled accounts with
the role of `nominator`, you will notice the option to set nominees. Select the validators to
nominate like you would normally using a nominator account.

![Nominate validators](../assets/staking/Nomination-Pools-5.png)

The `bouncer` can update the pool’s state to blocked through `setState` extrinsic and kick members
by calling `unbond` and `withdrawUnbonded`. (The state can also be toggled back to open).

### Destruction

A pool can be pushed into the “destroying” state via one of:

- The bouncer sets the pool to “destroying”.
- Any account can set the pool to destroying if over 90% of the pool's active bonded balance has
  been slashed.
- When a pool is in ‘destroying’ state, `unbond` and `withdrawUnbonded` become permissionless, so
  anyone can help all the members exit.
- Once the depositor withdraws, no members belong to the pool, and all the pool’s resources are
  wiped from the state.
