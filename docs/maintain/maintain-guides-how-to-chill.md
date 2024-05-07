---
id: maintain-guides-how-to-chill
title: How to Chill
sidebar_label: How to Chill
description: Steps on chilling as a network participant.
keywords: [chill, chilling, pause]
slug: ../maintain-guides-how-to-chill
---

import RPC from "./../../components/RPC-Connection";

Staking bonds can be in any of the three states: validating, nominating, or chilled (neither
validating nor nominating). When a staker wants to temporarily pause their active engagement in
staking but does not want to unbond their funds, they can choose to "chill" their involvement and
keep their funds bonded.

An account can step back from participating in active staking by clicking "Stop" under the Network >
Staking > Account actions page in [PolkadotJS Apps](https://polkadot.js.org/apps) or by calling the
`chill` extrinsic in the
[staking pallet](https://paritytech.github.io/substrate/master/pallet_staking/pallet/enum.Call.html#variant.chill).
When an account chooses to chill, it becomes inactive in the next era. The call must be signed by
the _staking proxy_ account, not the _stash_.

:::note Primer on stash and staking proxy accounts

If you need a refresher on the different responsibilities of the stash and staking proxy account
when staking, take a look at the [accounts](../learn/learn-staking.md#accounts) section in the
general staking guide.

:::

![staking](../assets/NPoS/staking-keys-stash-proxy.png)

## Consideration for Staking Election

A bond that is actively participating in staking but chilled would continue to participate in
staking for the rest of the current era. If the bond was chilled in sessions 1 through 4 and
continues to be chilled for the rest of the era, it would NOT be selected for election in the next
era. If a bond was chilled for the entire session 5, it would not be considered in the next
election. If the bond was chilled in session 6, its participation in the next era's election would
depend on its state in session 5.

## Chilling as a Nominator

When you chill after being a nominator, your nominations will be reset. This means that when you
decide to start nominating again you will need to select validators to nominate once again. These
can be the same validators if you prefer, or, a completely new set. Just be aware - your nominations
will not persist across chills.

Your nominator will remain bonded when it is chilled. When you are ready to nominate again, you will
not need to go through the whole process of bonding again, rather, you will issue a new nominate
call that specifies the new validators to nominate.

## Chilling as a Validator

When you voluntarily chill after being a validator, your nominators will remain. As long as your
nominators make no action, you will still have the nominations when you choose to become an active
validator once again. You bond however would not be listed as a nominable validator thus any
nominators issuing new or revisions to existing nominations would not be able to select your bond.

When you become an active validator, you will also need to reset your validator preferences
(commission, etc.). These can be configured as the same values set previously or something
different.

## Chill Other

An unbounded and unlimited number of nominators and validators in Polkadot's NPoS is not possible
due to constraints in the runtime. As a result, multiple checks are incorporated to keep the size of
staking system manageable, like mandating minimum active bond requirements for both nominators and
validators. When these requirements are modified through on-chain governance, they can be enforced
only on the accounts that newly call `nominate` or `validate` after the update. The changes to the
bonding parameters would not automatically chill the active accounts on-chain which do not meet the
requirements.

:::note Chill Threshold

`ChillThreshold` defines how close to the max nominators or validators we must reach before users
can start chilling one-another. This value is currently set to
{{ polkadot: <RPC network="polkadot" path="query.staking.chillThreshold" defaultValue={90}/>% :polkadot }}
{{ kusama: <RPC network="kusama" path="query.staking.chillThreshold" defaultValue={90}/>% :kusama }}

:::

For instance, let us consider a scenario where the minimum staking requirement for nominators is
changed from 80 DOTs to 120 DOTs. An account that was actively nominating with 80 DOTs before this
update would still keep receiving staking rewards. To handle this corner case, the `chillOther`
extrinsic was incorporated which also helps to keep things backwards compatible and safe. The
`chillOther` extrinsic is permissionless and any third party user can target it on an account where
the minimum active bond is not satisfied, and chill that account. The list of addresses of all the
active validators and their nominators can be viewed by running
[validator stats](https://github.com/w3f/validator-stats) script.

:::info Chill Other on Polkadot Network

Through [Referendum 90](https://polkadot.polkassembly.io/referendum/90), `maxNominatorCount` on
Polkadot is set to `None` eliminating the upper bound on the number of nominators on the network.
Due to this, the `chillOther` extrinsic on Polkadot network has no effect as the chill threshold
will never be met.

:::
