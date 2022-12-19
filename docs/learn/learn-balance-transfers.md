---
id: learn-balance-transfers
title: Balance Transfers
sidebar_label: Balances Transfers
keywords: [balance, transfers, transaction, signing]
description: Steps on how to perform balance transfers.
slug: ../learn-balance-transfers
---

import RPC from "./../../components/RPC-Connection";

Balance transfers are used to send a balance from one account to another account. To start
transferring a balance, we will begin by using
[Polkadot-JS UI](https://polkadot.js.org/apps/#/explorer). This guide assumes that you've already
[created an account](learn-account-generation.md) and have some funds that are ready to be
transferred.

:::info

We support only the use of the [**Polkadot-JS UI**](https://polkadot.js.org/apps/#/explorer)
together with the [**browser extension**](https://polkadot.js.org/extension/),
[**Ledger**](https://www.ledger.com/ledger-live) and
[**Parity Signer**](https://www.parity.io/technologies/signer/) for signing transactions. We do not
provide support for third party applications.

:::

## Sending Funds using UI, Extension, Parity Signer & Ledger

See the video tutorial below to learn how to send funds using the supported tools. See the Polkadot
Support pages for detailed information about transferring funds using the
[Polkadot-JS UI](https://support.polkadot.network/support/solutions/articles/65000170304-how-to-send-transfer-funds-out-of-your-dot-account-on-the-polkadot-js-ui).

<iframe width="560" height="315" src="https://youtube.com/embed/gbvrHzr4EDY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br/><br/>

:::info Signing Transactions

See the Polkadot Support pages for detailed information about signing transactions using:

- [The Polkadot-JS UI](https://support.polkadot.network/support/solutions/articles/65000181993-how-to-sign-a-transaction-directly-on-polkadot-js-ui)
- [The Polkadot-JS browser extension](https://support.polkadot.network/support/solutions/articles/65000181989)
- [Ledger devices](https://support.polkadot.network/support/solutions/articles/65000181994-how-to-sign-a-transaction-on-ledger)
- [The Parity Signer app](https://support.polkadot.network/support/solutions/articles/65000182000-how-to-sign-a-transaction-in-parity-signer).

:::

## Keep-Alive Checks

:::info

See [**this video tutorial**](https://youtu.be/Wg0pH05CC9Y) and
[**this support page**](https://support.polkadot.network/support/solutions/articles/65000168651-what-is-the-existential-deposit-)
to learn about keep-alive checks and existential deposit.

:::

In {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} there are two main ways to
transfer funds from one account to another:

- `transfer keep-alive` (default option) will not allow you to send an amount that would allow the
  sending account to be removed due to it going below the
  [existential deposit](https://support.polkadot.network/support/solutions/articles/65000168651-what-is-the-existential-deposit-)
  of
  {{ polkadot: <RPC network="polkadot" path="consts.balances.existentialDeposit" defaultValue={10000000000} filter="humanReadable"/>. :polkadot }}
  {{ kusama: <RPC network="kusama" path="consts.balances.existentialDeposit" defaultValue={33333333} filter="humanReadable"/>. :kusama }}
- `transfer` will allow you to send {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}
  regardless of the consequence. If the balance drops below the existential deposit your account
  will be reaped. It may be that you do not want to keep the account alive (for example, because you
  are moving all of your funds to a different address). To switch the keep-alive check off visit
  [this support article](https://support.polkadot.network/support/solutions/articles/65000169248).

:::info

Attempting to send less than the existential deposit to an account with
{{ polkadot: 0 DOT :polkadot }}{{ kusama: 0 KSM :kusama }} will always fail, no matter if the
keep-alive check is on or not.

:::

For instance, attempting to transfer
{{ polkadot: 0.1 DOT :polkadot }}{{ kusama: 0.0001 KSM :kusama }} to an account you just generated
(and thus has no balance) will fail, since
{{ polkadot: 0.1 DOT :polkadot }}{{ kusama: 0.0001 KSM :kusama }} is less than the existential
deposit of
{{ polkadot: <RPC network="polkadot" path="consts.balances.existentialDeposit" defaultValue={10000000000} filter="humanReadable"/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.balances.existentialDeposit" defaultValue={333333333} filter="humanReadable"/> :kusama }}
and the account cannot be initialized with such a low balance.

:::note

Even if the transfer fails due to a keep-alive check, the transaction fee will be deducted from the
sending account if you attempt to transfer.

:::

## Vested Transfers

{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} may have a lock placed on them to account for
vesting funds. Like other types of locks, these funds cannot be transferred but can be used in other
parts of the protocol such as voting in governance or being staked as a validator or nominator.

Vesting funds are on a release schedule and unlock a constant number of tokens at each block
(**linear vesting**) or can unlock the full amount after a specific block number (**cliff
vesting**). Although the tokens are released in this manner, it does not get reflected on-chain
automatically since locks are [lazy](#lazy-vesting) and require an extrinsic to update.

There are two ways that vesting schedules can be created.

- One way is through an extrinsic type available in the Vesting pallet, `vested_transfer`. The
  vested transfer function allows anyone to create a vesting schedule with a transfer of funds, as
  long as the account for which the vesting schedule will be created does not already have one and
  the transfer moves at least `MinVestedTransfer` funds, which is specified as a chain constant.
- A second way is as part of the genesis configuration of the chain. In the case of
  {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, the chain specification genesis
  script reads the state of the Claims contract that exists on the Ethereum blockchain and creates
  vesting schedules in genesis for all the allocations registered as being vested.

Vesting schedules have three parameters:

- **locked**, the amount of tokens to be transferred in
  [Planck units](../learn/learn-DOT#the-planck-unit))
- **per block**, the number of tokens that are released per block
- **starting block**, the block number after which the vesting schedule starts

The configuration of these three fields dictates the amount of funds that are originally locked, the
slope of the unlock line and the block number for when the unlocking begins.

:::info

You can watch [**this video tutorial**](https://youtu.be/JVlwTQBwNGc) to understand how to do vested
transfers, including linear and cliff vesting. Note the tutorial uses the Westend Testnet, but the
same applies to both Polkadot and Kusama.

:::

### Lazy Vesting

Like [simple payouts](learn-staking-advanced.md), vesting is _lazy_, which means that someone must
explicitly call an extrinsic to update the lock that is placed on an account.

- The `vest` extrinsic will update the lock that is placed on the caller.
- The `vest_other` will update the lock that is placed on another "target" account's funds.

These extrinsics are exposed from the Vesting pallet.

If you are using the Polkadot-JS UI, when there are
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} available to vest for an account, then you
will have the ability to unlock {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} which has
already vested from the [Accounts](https://polkadot.js.org/apps/#/accounts) page.

![unbond](../assets/unlock-vesting.png)

## Batch Transfers

Batch transfers are balances transfers to multiple accounts executed by one account. In order to
construct a batch transfer you need to:

- Create a `utility.batch(calls)` extrinsic using the
  [utility pallet](https://paritytech.github.io/substrate/master/pallet_utility/index.html), and
- Within the batch call you can create multiple `balances.transferKeepAlive` extrinsics using the
  [balances pallet](https://paritytech.github.io/substrate/master/pallet_balances/index.html). You
  can specify as many receivers as you desire.

:::info

You can watch [**this video tutorial**](https://youtu.be/uoUC2K8muvw) to learn how to do batch
transfers. Note the tutorial uses the Westend Testnet, but the same applies to both Polkadot and
Kusama.

:::

## Existing Reference Error

If you are trying to reap an account and you receive an error similar to
`"There is an existing reference count on the sender account. As such the account cannot be reaped from the state"`,
then you have existing references to this account that must be first removed before it can be
reaped. References may still exist from:

- Bonded tokens (most likely)
- Unpurged session keys (if you were previously a validator)
- Token locks
- Existing recovery info
- Existing assets

### Bonded Tokens

If you have tokens that are bonded, you will need to unbond them before you can reap your account.
Follow the instructions at
[Unbonding and Rebonding](../maintain/maintain-guides-how-to-nominate-polkadot.md) to check if you
have bonded tokens, stop nominating (if necessary) and unbond your tokens.

### Checking for Locks

:::info

See [this video tutorial](https://youtu.be/LHgY7ds_bZ0) and
[this support page](https://support.polkadot.network/support/solutions/articles/65000169437-why-can-t-i-transfer-tokens-)
to learn how to check for locks and remove them.

:::

You can also check for locks by querying `system.account(AccountId)` in
[`Chain state` tab under the `Developer` drop-down menu in the Polkadot-JS UI](https://polkadot.js.org/apps/#/chainstate).
Select your account, then click the "+" button next to the dropdowns, and check the relative `data`
JSON object. If you see a non-zero value for anything other than `free`, you have locks on your
account that need to get resolved.

### Purging Session Keys

If you used this account to set up a validator and you did not purge your keys before unbonding your
tokens, you need to purge your keys. You can do this by seeing the
[How to Stop Validating](../maintain/maintain-guides-how-to-stop-validating.md) page. This can also
be checked by checking `session.nextKeys` in the chain state for an existing key.

### Existing Recovery Info

{{ polkadot: Currently, Polkadot does not use the
[Recovery Pallet](https://github.com/paritytech/substrate/blob/master/frame/recovery/), so this is
probably not the reason for your tokens having existing references. :polkadot }}

{{ kusama: On Kusama, you can check if recovery has been set up by checking the `recovery.recoverable(AccountId)`
chain state. This can be found under `Developer > Chain state` in [PolkadotJS Apps](https://polkadot.js.org/apps/). :kusama }}

### Existing Non-Native Assets

Currently, {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} does not use the
[Assets Pallet](https://github.com/paritytech/substrate/tree/master/frame/assets), so this is
probably not the reason for your tokens having existing references.
