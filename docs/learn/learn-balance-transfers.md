---
id: learn-balance-transfers
title: Balance Transfers
sidebar_label: Balances Transfers
keywords: [balance, transfers, transaction, signing]
description: Steps on how to perform balance transfers.
slug: ../learn-balance-transfers
---

import RPC from "./../../components/RPC-Connection"

Balance transfers are used to send a balance from one account to another account. To start
transferring a balance, we will begin by using
[Polkadot-JS UI](https://polkadot.js.org/apps/#/explorer). This guide assumes that you've already
[created an account](learn-account-generation.md) and have some funds that are ready to be
transferred.

:::info We support only the use of the [_Polkadot-JS UI_](https://polkadot.js.org/apps/#/explorer)
together with the [_browser extension_](https://polkadot.js.org/extension/),
[_ledger_](https://www.ledger.com/ledger-live) and
[_parity signer_](https://www.parity.io/technologies/signer/) for signing transactions. We do not
provide support for third party applications.

:::

:::info Most of the content on this page has been moved to several support pages. See the links
below.

:::

- [Using the transfer tab or the send button on your account in the Polkadot-JS UI](https://support.polkadot.network/support/solutions/articles/65000170304-how-to-send-transfer-funds-out-of-your-dot-account-on-the-polkadot-js-ui)
  - [Signing with the Polkadot-JS UI](https://support.polkadot.network/support/solutions/articles/65000181993)
  - [Signing with the browser extension](https://support.polkadot.network/support/solutions/articles/65000181989)
  - [Signing with ledger](https://support.polkadot.network/support/solutions/articles/65000181994)
  - [Signing with parity signer](https://support.polkadot.network/support/solutions/articles/65000182000)

## Signing Transactions with Parity Signer

:::info This information is complementary to the
[dedicated support page](https://support.polkadot.network/support/solutions/articles/65000182000).

:::

If you directly import your Parity Signer account to Polkadot-JS UI, you will see a pop-up window
with a QR code and a camera window, as shown below. Open the QR scanner on Parity Signer and scan
the QR code. You may be prompted to enter your PIN to sign the transaction. The signed extrinsic
will then be available as a QR code that needs to be shown in front of your computer's camera (as
shown in the red square window shown to the right in the screenshot below).

![Companion transfer](../assets/accounts/signer-transaction.png)

If your account was setup on [Parity Signer Companion](https://parity.link/signer-companion) instead
of Polkadot-JS UI, you will see a pop-up window with a QR code, as shown below for this transaction.

![Companion transfer](../assets/accounts/companion-transfer.png)

Scan the QR code using Parity Signer. You will see a QR code consisting of the signed extrinsic for
this transaction. Click on the **next to signing** button in the pop-up window, as shown above. You
can then show the QR code on your phone within the red square window.

![Companion transfer](../assets/accounts/companion-transfer2.png)

## Keep-Alive Checks

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

### Purging Session Keys

If you used this account to set up a validator and you did not purge your keys before unbonding your
tokens, you need to purge your keys. You can do this by seeing the
[How to Stop Validating](../maintain/maintain-guides-how-to-stop-validating.md) page. This can also
be checked by checking `session.nextKeys` in the chain state for an existing key.

### Checking for Locks

Check out
[this support page](https://support.polkadot.network/support/solutions/articles/65000169437-why-can-t-i-transfer-tokens-)
to learn how to check for locks.

You can also check for locks by querying `system.account(AccountId)` in
[`Chain state` tab under the `Developer` drop-down menu in the Polkadot-JS UI](https://polkadot.js.org/apps/#/chainstate).
Select your account, then click the "+" button next to the dropdowns, and check the relative `data`
JSON object. If you see a non-zero value for anything other than `free`, you have locks on your
account that need to get resolved.

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
