---
id: learn-guides-transfers
title: Polkadot-JS Guides about Transfers
sidebar_label: Transfers
description: Polkadot-JS Guides about Balances Transfers.
keywords: [gides, advanced, polkadot-js, transfers]
slug: ../learn-guides-transfers
---

import RPC from "./../../components/RPC-Connection"; import Tabs from "@theme/Tabs"; import TabItem
from "@theme/TabItem"; import DocCardList from '@theme/DocCardList';

## Metadata Updates with the Polkadot-JS Browser Extension

Before signing extrinsics with the Polkadot-JS Browser Extension, always check for metadata updates.
[**This video tutorial**](https://youtu.be/gbvrHzr4EDY?t=84) will explain how to do it.

:::info Polkadot Vault vs Polkadot-JS Browser Extension

The Polkadot Vault app updates the full metadata through the QR fountain while the extension updates
the metadata index (the metadata is not loaded into it). As a consequence the process of updating
metadata is different in this two cases (you will notice that on the Vault app the update takes
longer for example). Having outdated metadata on the Vault app will prevent you from signing, while
on the extension you will be able to click the sign button but the extrinsic will likely fail
(similarly of having an outdated Ledger app). In general, failing to update metadata will most
likely result in you not being able to sign extrinsics.

:::

## Verify Extrinsics with the Polkadot-JS Browser Extension

Visit the
[**dedicated support page**](https://support.polkadot.network/support/solutions/articles/65000179161-how-can-i-verify-what-extrinsic-i-m-signing-#Verify-an-extrinsic-in-the-Polkadot-extension)
and see [**this video tutorial**](https://youtu.be/bxMs-9fBtFk?t=261) tutorial to learn about how to
verify extrinsics before signing them. The video will also mention potential attacks that can happen
to you while signing for transactions.

## Verify Extrinsics with the Polkadot-JS UI

Visit the
[**dedicated support page**](https://support.polkadot.network/support/solutions/articles/65000179161-how-can-i-verify-what-extrinsic-i-m-signing-#Verify-an-extrinsic-in-the-Polkadot-JS-UI)
and see [**this video tutorial**](https://youtu.be/bxMs-9fBtFk?t=163) tutorial to learn about how to
verify extrinsics before signing them. The video will also mention potential attacks that can happen
to you while signing for transactions.

## Sending Funds using the Polkadot-JS UI and Browser Extension

See the video tutorial below to learn how to send funds using the supported tools. See the Polkadot
Support pages for detailed information about transferring funds using the
[Polkadot-JS UI](https://support.polkadot.network/support/solutions/articles/65000170304-how-to-send-transfer-funds-out-of-your-dot-account-on-the-polkadot-js-ui).

[![Balance Transfer Tutorial](https://img.youtube.com/vi/gbvrHzr4EDY/0.jpg)](https://www.youtube.com/watch?v=gbvrHzr4EDY)

:::info Signing Transactions

See the Polkadot Support pages for detailed information about signing transactions using:

- [The Polkadot-JS UI](https://support.polkadot.network/support/solutions/articles/65000181993-how-to-sign-a-transaction-directly-on-polkadot-js-ui)
- [The Polkadot-JS browser extension](https://support.polkadot.network/support/solutions/articles/65000181989)
- [Ledger devices](https://support.polkadot.network/support/solutions/articles/65000181994-how-to-sign-a-transaction-on-ledger)
- [The Parity Signer app](https://support.polkadot.network/support/solutions/articles/65000182000-how-to-sign-a-transaction-in-parity-signer)

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
