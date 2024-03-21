---
id: learn-guides-ledger
title: Polkadot-JS Guides for Ledger Devices
sidebar_label: Ledger Guides
description: Polkadot-JS Guides for Ledger Devices.
keywords: [ledger, polkadot-js]
slug: ../learn-guides-ledger
---

<div className="sticky" style={{ zIndex: 1 }}> 
<br />

[Polkadot-JS](../general/polkadotjs-ui.md) is for developers and power users only. For more
user-friendly tools see the [wallets](./wallets-index), [apps](./apps-index) and
[dashboard](./dashboards-index) pages.

</div>

## Loading Your Account

:::info

Ledger Live should be off while using Ledger with Polkadot-JS UI as it can interfere with normal
operation.

:::

You can import your Ledger account to [Polkadot Extension](https://polkadot.js.org/extension/) or to
the [Polkadot-JS UI](https://polkadot.js.org/apps/#/explorer). For instructions on how to import
Ledger accounts to the Polkadot Extension read through
[this support article](https://support.polkadot.network/support/solutions/articles/65000175387-how-to-add-your-ledger-through-the-polkadot-extension),
while if you want to import Ledger accounts to the Polkadot-JS UI you can consult
[this other article](https://support.polkadot.network/support/solutions/articles/65000170812-how-to-add-ledger-account-through-the-polkadot-js-ui).

### Derivation paths

When adding a Ledger account using the extension or the UI, you will be asked to select an
`account type` and an `account index`. The first lets you select an account, while the second lets
you pick a derivation path from that account - think of it like a formula from which child accounts
are generated. When you are creating a
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} ledger account for the first time on
Ledger Live with name {{ polkadot: `Polkadot 1` :polkadot }}{{ kusama: `Kusama 1` :kusama }}, this
can be added to Polkadot-JS using the 0/0 derivation path (i.e. account type = 0 and account index =
0). If you add a second account called
{{ polkadot: `Polkadot 2` :polkadot }}{{ kusama: `Kusama 2` :kusama }}, this will correspond to the
1/0 derivation path, and so on. We thus have multiple parent accounts that can be viewed and used in
both Ledger Live and Polkadot-JS. Additionally, we can use Polkadot-JS UI to create multiple
children accounts from each parent account. For example,
{{ polkadot: `Polkadot 1` :polkadot }}{{ kusama: `Kusama 1` :kusama }} with 0/0 derivation path can
have child 0/1, 0/2, etc. that can be used within the UI. However, such children accounts cannot be
used in Ledger Live, as it only scans through the parent accounts. So, remember that the balances on
the children accounts cannot be viewed, and you will not be able to transact with those accounts on
Ledger Live.

### Connecting your ledger device

While using a ledger device to sign transactions, depending on your browser and its security
settings, you might need to confirm the USB connection through a popup like the one below:

![Display the device connection popup](../assets/ledger/query-device.png)

If you are adding your Ledger Nano for the first time, click on the "Unknown device" line and the
"Connect" button will become available.

:::info Signature error message

If you have already connected your device, but an error message appears before signing a
transaction, make sure you have opened the
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} application on your Ledger Nano
device. Visit
[this support page](https://support.polkadot.network/support/solutions/articles/65000181994) for
more information about signing transactions using your ledger.

:::

## Confirming the Address on your Device

To display your {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} ledger account
address on your Ledger Nano, you can follow the guidelines on
[this support article](https://support.polkadot.network/support/solutions/articles/65000181854-how-to-confirm-your-account-address-on-your-ledger-device).
Here you can scroll through and make sure the address matches what is displayed on
[Polkadot-JS UI](https://polkadot.js.org/apps/#/explorer).

## Checking the Balance of Your Account

There are a few methods to check the balance of your account. Check out
[this support article](https://support.polkadot.network/support/solutions/articles/65000169332-where-can-i-see-the-balance-of-my-account-)
for information.

## Sending a Transfer with Ledger Devices

:::danger Verifying Extrinsics

Visit the
[**dedicated support page**](https://support.polkadot.network/support/solutions/articles/65000179161-how-can-i-verify-what-extrinsic-i-m-signing-#Verify-an-extrinsic-using-Ledger)
and see [**this video tutorial**](https://youtu.be/bxMs-9fBtFk?t=360) tutorial to learn about how to
verify extrinsics before signing them. The video will also mention potential attacks that can happen
to you while signing for transactions.

:::

General instructions to send a transfer can be found on
[this support page](https://support.polkadot.network/support/solutions/articles/65000170304-how-to-send-transfer-funds-out-of-your-dot-account-on-the-polkadot-js-ui).
To sign transactions with your Ledger nano check
[this support article](https://support.polkadot.network/support/solutions/articles/65000181994) or
see [this video tutorial](https://youtu.be/gbvrHzr4EDY?t=579).

## Receiving a Transfer

To receive a transfer on the accounts stored on your Ledger device, you must provide the sender
(i.e. the payer) with your address. To do so, follow the instructions on
[this support page](https://support.polkadot.network/support/solutions/articles/65000181866-how-to-receive-dot-to-my-account-on-polkadot-js-ui).

:::warning

Before giving anyone your address, ensure it matches what's on the Ledger by
[confirming the address on your device](#confirming-the-address-on-your-device). Some malware will
intercept clicks and clipboard requests and can change your copied value in-flight, so being extra
vigilant around copy-paste operations makes sense.

:::

## Staking

For staking using Ledger devices, check the section "How to stake using your Ledger" on
[this support article](https://support.polkadot.network/support/solutions/articles/65000168057-how-do-i-stake-nominate-on-polkadot-).

## Removing Expired Democracy Locks

Check out
[this support page](https://support.polkadot.network/support/solutions/articles/65000181870-how-to-remove-expired-democracy-locks)
the learn how to remove democracy locks after the end of a Governance referendum.

**Please be advised**: Despite the Polkadot ledger application being compatible with both the Ledger
Nano S and the Ledger Nano X, some extrinsics are not supported by the light version. The following
[repository by Zondax](https://github.com/Zondax/ledger-polkadot) lists the currently supported
extrinsics on the XL version of the Ledger app.
