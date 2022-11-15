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

:::info

See the video tutorial below to learn how to send funds using the supported tools.

:::

<iframe width="560" height="315" src="https://youtube.com/embed/gbvrHzr4EDY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br/><br/>

:::info Transfer of Funds

See the Polkadot Support pages for detailed information about transferring funds using the
[Polkadot-JS UI](https://support.polkadot.network/support/solutions/articles/65000170304-how-to-send-transfer-funds-out-of-your-dot-account-on-the-polkadot-js-ui).

:::

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

{{ polkadot: For instance, attempting to transfer 0.1 DOT to an account you just generated
(and thus has no DOT) will fail, since 0.1 is less than the existential deposit of 1 DOT and the account
cannot be initialized with such a low balance. :polkadot }}{{ kusama: For instance, attempting to transfer
0.0001 KSM to an account you just generated (and thus has no KSM) will fail, since 0.1 is less than the
existential deposit of 0.001666 KSM and the account cannot be initialized with such a low balance. :kusama }}

:::note

Even if the transfer fails due to a keep-alive check, the transaction fee will be deducted from the
sending account if you attempt to transfer.

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
Follow the instructions at [Unbonding and Rebonding](../maintain/maintain-guides-how-to-unbond.md)
to check if you have bonded tokens, stop nominating (if necessary) and unbond your tokens.

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
chain state. This can be found under `Developer > Chain state` in [PolkadotJS Apps][polkadot-js apps]. :kusama }}

### Existing {{ polkadot: Non-DOT :polkadot }}{{ kusama: Non-KSM :kusama }} Assets

Currently, {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} does not use the
[Assets Pallet](https://github.com/paritytech/substrate/tree/master/frame/assets), so this is
probably not the reason for your tokens having existing references.
