---
id: maintain-guides-how-to-stop-validating
title: How to Stop Validating
sidebar_label: How to Stop Validating
description: Steps on how to stop validating.
keywords: [validating, how to stop validating, validate, chill]
slug: ../maintain-guides-how-to-stop-validating
---

If you wish to remain a validator or nominator (e.g. you're only stopping for planned downtime or
server maintenance), submitting the `chill` extrinsic in the `staking` pallet should suffice. It is
only if you wish to unbond funds or reap an account that you should continue with the following.

To ensure a smooth stop to validation, make sure you should do the following actions:

- Chill your validator
- Purge validator session keys
- Unbond your tokens

These can all be done with [PolkadotJS Apps](https://polkadot.js.org/apps) interface or with
extrinsics.

## Chill Validator

To chill your validator or nominator, call the `staking.chill()` extrinsic. See the
[How to Chill](maintain-guides-how-to-chill.md) page for more information. You can also
[claim your rewards](../learn/learn-simple-payouts.md#claiming-rewards) at this time.

## Purge validator session keys

Purging the validator's session keys removes the key reference. This can be done through the
`session.purgeKeys()` extrinsic. The key reference exists on the account that originally called the
`session.set_keys()` extrinsic, which could be the stash or the controller (at the time the keys
were set).

:::caution Purge keys using the same account that set the keys

**It is the same account that needs to call the `session.purge_keys()` extrinsic** in order for the
correct reference to be removed. Calling the `session.purge_keys()` from the wrong account, although
it may succeed, will result in a reference on the other account that **cannot** be removed, and as a
result that account cannot be reaped.

:::

:::caution

**If you skip this step, you will not be able to reap your stash account**, and you will also need
to rebond, purge the session keys, unbond, and wait the unbonding period again before being able to
transfer your tokens.

See [Unbonding and Rebonding](maintain-guides-how-to-unbond.md) for more details.

:::

## Unbond your tokens

Unbonding your tokens can be done through the `Network > Staking > Account actions` page in
PolkadotJS Apps by clicking the corresponding stash account dropdown and selecting "Unbond funds".
This can also be done through the `staking.unbond()` extrinsic with the controller account.
