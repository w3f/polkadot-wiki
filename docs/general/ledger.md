---
id: ledger
title: Using the Polkadot Ledger Application
sidebar_label: Ledger Application
description: How to use the Polkadot application on Ledger.
keywords: [ledger, staking, polkadot app]
slug: ../learn-ledger
---

:::info

Because of required WebUSB support, Ledger wallets currently only work on Chromium-based
browsers like Brave and Chrome.

:::

The Polkadot [Ledger][] application is compatible with both the Ledger Nano S and the Ledger Nano X
devices. Ledger devices are hardware wallets that keep your secret key secured on a physical device that
does not expose it to your computer or the internet. That is, even if you connect your nano via USB to your computer, the private keys will not be leaked. Ledger devices are also hierarchical deterministic wallets (HD wallets), that is:

  - *Deterministic* means that there is only one seed phrase to generate all the accounts for different blockchain networks.
  - *Hierarchical* means that the accounts are generated in a tree-like structure for different purposes.

Ledger devices can be equipped with applications that are blockchain-specific. Such applications are usually developed by third parties and they enable the user to transact securely on the blockchain network.
The Polkadot Ledger application allows you to manage Polkadot's native token, DOT. It supports
most of the transaction types of the network, including batch transactions from the Utility pallet. 

:::note Ledger apps may not support all the transactions

Check [Ledger Polkadot App](https://github.com/Zondax/ledger-polkadot) specification for the list of transactions supported. It could be possible that some transactions are supported only on a specific version of the app and some transactions are not supported at all by any version. For instance, the staking `rebag` extrinsic is supported on the XL version but not on the light version. The `setIdentity` extrinsic is not supported by any of the app versions.

:::


If you have trouble using Ledger or following the directions below, you can try searching for your
issue on the [Polkadot support pages](https://support.polkadot.network/).

## Requirements

Here is a list of what you will need before using Polkadot with Ledger:

- A Ledger Nano X or Nano S plus (recommended for Polkadot Ledger App space requirements). The Ledger Nano S has limited memory and is no longer produced.
- The latest firmware of the Polkadot Ledger App installed (always check for updates in Ledger Live under the "Manager" tab, you will need to allow access with your nano).
- Ledger Live is installed and at version 2.1 or newer (see settings -> about to find out if you're
  up to date).
- A Chromium-based web browser is installed that you can use to access [Polkadot-JS Apps][].

## Using Ledger Live

Check [this support article](https://support.polkadot.network/support/solutions/articles/65000175822-how-to-use-polkadot-and-stake-with-ledger-live) to learn how to use Polkadot with ledger live.

:::info

Ledger Live will only show the main account with BIP44 path 44'/354'/0'/0'/0'. This means that if you create a [derived account using Polkadot JS](#using-on-polkadot-js-apps) with a derivation path 44'/354'/0'/0'/1', it will not be displayed on the Ledger Live App. As a consequence it is not possible to transact with derived accounts using the Ledger Live App, but it is possible to do so using Polkadot JS. For more information about derived accounts and derivation paths check [the accounts page](../learn/learn-accounts.md).

:::

## Using on Polkadot-JS Apps

Please consider watching video tutorial below on how to connect your Ledger
device with Polkadot-JS UI, by importing your accounts to Polkadot-JS Extension.

:::info Ledger Live should be off while using Ledger with Polkadot-JS Apps as it can interfere with normal operation.

:::

[![Connect Ledger to Polkadot JS UI](https://img.youtube.com/vi/7VlTncHCGPc/0.jpg)](https://youtu.be/7VlTncHCGPc)

### Loading Your Account

You can import your Ledger account to [Polkadot Extension](https://polkadot.js.org/extension/) or to the Polkadot JS UI. For instructions
on how to import Ledger accounts to the Polkadot JS extension read through [this support article](https://support.polkadot.network/support/solutions/articles/65000175387-how-to-add-your-ledger-through-the-polkadot-extension), while if you want to import Ledger accounts to the Polkadot JS UI you can consult [this other article](https://support.polkadot.network/support/solutions/articles/65000170812-how-to-add-ledger-account-through-the-polkadot-js-ui).

#### Derivation paths

When adding a Ledger account using the extension or the UI, you will be asked to select an `account type` and an `account index`. The first lets you select an account, while the second lets you pick a derivation path from that account - think of it like a formula from which child accounts are generated. When you are creating a Polkadot ledger account for the first time on Ledger Live with name `Polkadot 1`, this can be added to Polkadot JS using the 0/0 derivation path (i.e. account type = 0 and account index = 0). If then you add a second account called `Polkadot 2`, this will correspond to the 1/0 derivation path, and so on. We thus have multiple parent accounts that cam be viewed and used in both Ledger Live and Polkadot JS. Additionally, we can use Polkadot JS to created multiple children accounts from each parent account. For example, `Polkadot 1` with 0/0 derivation path can have child 0/1, 0/2, etc. that can be used within the UI. However, such children accounts cannot be used in Ledger Live, as it only scans through the parent accounts. So, keep in mind that on Ledger Live balances on the children accounts cannot be viewed, and you cannot use such accounts.

#### Connecting your ledger device

While using a ledger device to sign transactions, depending on your browser and its security settings, you might need
to confirm the USB connection through a popup like the one below:

![Display the device connection popup](../assets/ledger/query-device.png)

If you are adding your Ledger nano for the first time click on the "Unknown device" line and the "Connect" button will become available. 

:::info Signature error message

If you already connected your device but an error message appears before signing a transaction make sure that on your Ledger nano you have opened the Polkadot application. Visit [this support page](https://support.polkadot.network/support/solutions/articles/65000181994) for more information about signing transactions using your ledger.

:::

### Confirming the Address on your Device

To display your Polkadot ledger account address on your Ledger nano you can follow the guidelines on [this support article](https://support.polkadot.network/support/solutions/articles/65000181854-how-to-confirm-your-account-address-on-your-ledger-device). Here you can scroll through and make sure the address matches to what is displayed on Polkadot-JS
Apps.

### Checking the Balance of Your Account

There are a few methods to check the balance of your account. Check out [this support article](https://support.polkadot.network/support/solutions/articles/65000169332-where-can-i-see-the-balance-of-my-account-) for information.

### Sending a Transfer

General instructions to send a transfer can be found on [this support page](https://support.polkadot.network/support/solutions/articles/65000170304-how-to-send-transfer-funds-out-of-your-dot-account-on-the-polkadot-js-ui). To sign transactions with your Ledger nano check [this support article](https://support.polkadot.network/support/solutions/articles/65000181994).

### Receiving a Transfer

In order to receive a transfer on the accounts stored on your Ledger device, you will need to
provide the sender (i.e. the payer) with your address. To do so follow the instructions on [this support page](https://support.polkadot.network/support/solutions/articles/65000181866-how-to-receive-dot-to-my-account-on-polkadot-js-ui).

:::warning

Before giving anyone your address, make sure it matches what's really on the Ledger
by [confirming the address on your device](#confirming-the-address-on-your-device). Some malware
will intercept clicks and clipboard requests and can change your copied value in-flight, so being
extra vigilant around copy-paste operations makes sense.

:::

### Staking

For staking using Ledger devices check the section "How to stake using your Ledger" on [this support article](https://support.polkadot.network/support/solutions/articles/65000168057-how-do-i-stake-nominate-on-polkadot-).

### Removing Expired Democracy Locks

Check out [this support page](https://support.polkadot.network/support/solutions/articles/65000181870-how-to-remove-expired-democracy-locks) the learn how to remove democracy locks after the end of a Governance referendum.

**Please be advised**: Despite the Polkadot ledger application being compatible with both the Ledger
Nano S and the Ledger Nano X, none of the [Democracy](../maintain/maintain-guides-democracy.md) extrinsics
are available in the light version. The following [repository by Zondax](https://github.com/Zondax/ledger-polkadot) lists the currently supported Democracy extrinsics on the full ledger.
