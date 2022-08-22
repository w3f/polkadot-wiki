---
id: learn-account-generation
title: Account Generation
sidebar_label: Account Generation
description: Steps on generating a Polkadot account.
keywords: [account, account generation, polkadot account, polkadotjs]
slug: ../learn-account-generation
---

An address is the public part of a Polkadot account. The private part is the key used to access this
address. The public and private parts together make up a Polkadot account. You can think about your public address like your mailbox and your private key like your key to open your mailbox. Everybody can send you information to your public address, but only you can access the box and read such information. In other words, everybody can know your public address but you should keep your private key secret.


There are several ways to generate a Polkadot account:

- [Polkadot{.js} Browser Extension](#polkadot-js-apps) **RECOMMENDED FOR MOST USERS**
- [Subkey](#subkey) **ADVANCED and MOST SECURE**
- [Polkadot-JS Apps](#polkadot-js-apps)
- [Parity Signer](#parity-signer)
- [Vanity Generator](#vanity-generator)
- [Ledger Hardware Wallet](#ledger-hardware-wallet)

:::note

If you prefer video instructions for creating an account using Polkadot JS, we have an easy to
follow guide for beginners [on YouTube](https://www.youtube.com/watch?v=sy7lvAqyzkY)

:::

## DISCLAIMER: Key Security

The _only_ ways to get access to your account are via your secret seed or your account's JSON file
in combination with a password. You must keep them both secure and private. If you share them with
anyone they will have full access to your account, including all of your funds. This information is
a target for hackers and others with bad intentions - see also
[How to Recognize Scams](../general/scams.md).

On this page, we recommend a variety of account generation methods that have various convenience and
security trade-offs. Please review this page carefully before making your account so that you
understand the risks of the account generation method you choose and how to properly mitigate them
in order to keep your funds safe.

:::info Visit [this support article](https://support.polkadot.network/support/solutions/articles/65000181874-how-to-store-your-mnemonic-phrase-and-backup-file-safely) for more information about key security.

:::

## Polkadot JS Browser Extension

The Polkadot JS Extension provides a reasonable balance of security and usability. It provides a
separate local mechanism to generate your address and interact with Polkadot.

This method involves installing the Polkadot JS extension and using it as a “virtual vault," separate
from your browser, to store your private keys. It also allows the signing of transactions and
similar functionality.

It is still running on the same computer you use to connect to the internet with and thus is less
secure than using Parity Signer or other air-gapped approaches.

:::info For the tutorial on how to create an account using Polkadot JS browser extension, visit [this support article](https://support.polkadot.network/support/solutions/articles/65000098878-how-to-create-a-dot-account). 

:::

### Reset Password using the browser extension

:::warning

Before following the instructions below make sure you have your mnemonic phrase stored in a safe
place accessible to you.

:::

Let's say you created `ACCOUNT 1` protected by password `PSW 1`. To reset the password of your
`ACCOUNT 1` using the browser extension you must follow the following steps:

- On the browser extension go to `ACCOUNT 1` and click "Forget account". This action will delete the
  access to your account. Note that your tokens are still in your account on the polkadot blockchain
  network.
- On the browser extension click the "+" button in the topright corner and select the option "Import
  account from pre-existing seed". After entering the mnemonic phrase you can chose a new password
  `PSW 2`.

:::info JSON files do not allow to change account passwords

If you add the account to the extension using the option "Restore account from backup JSON file",
this will allow you to restore access to your account using JSON file protected by the password
`PSW 1`, but does not let you set a new password. Thus, `PSW 1` will become the account password by
default.

:::

:::info Accounts on Cold wallets do not need passwords

For hardware wallets such as [Ledger](https://www.ledger.com/), you may have to set a PIN for
accessing the accounts on the device, but you do not need to set a password for every individual
account. When you need to make transactions with your account, you are required to sign using your
Ledger device. Also, Ledger wallets let you generate multiple accounts for multiple blockchain
networks without having to set different passwords to access such accounts.

:::

### Set Address for Polkadot Mainnet

In Polkadot you can use the same address on multiple chains. To switch between chains you can follow the guidelines in [this support article](https://support.polkadot.network/support/solutions/articles/65000103707-can-i-use-the-same-account-on-polkadot-kusama-and-parachains-). The [Accounts page](learn-accounts.md#address-conversion-tools) has a tool you can use to
convert your address between the different chain formats. 

:::info For privacy reasons, we recommend creating a new address for each chain you're using.

:::

You can copy your address by clicking on the account's icon while the desired chain format is
active. E.g. selecting "Substrate" as the format will change your address, and clicking the colorful icon of your account will copy it in that format. While in Polkadot
mode, that address format will be copied, and so on.

## Subkey

Subkey is recommended for technically advanced users who are comfortable with the command line and
compiling Rust code. Subkey allows you to generate keys on any device that can compile the code.
Subkey may also be useful for automated account generation using an air-gapped device. It is not
recommended for general users. For the tutorial on how to create an account using Subkey, visit [this support article](https://support.polkadot.network/support/solutions/articles/65000180519-how-to-create-an-account-in-subkey).


## Polkadot-JS Apps

:::caution

If you use this method to create your account and clear your cookies in your browser, your account
will be lost forever if you do not [back it up](learn-account-restore.md). Make sure you store your
seed phrase in a safe place, or download the account's JSON file if using the Polkadot{.js} browser
extension. Learn more about account backup and restoration [here](learn-account-restore.md).

:::

Using the Polkadot-JS user interface without the plugin is **not recommended**. It is the least
secure way of generating an account. It should only be used if all of the other methods are not
feasible in your situation. For the tutorial on how to create an account using Polkadot-JS Apps, visit [this support article](https://support.polkadot.network/support/solutions/articles/65000180529).

### Reset password using Polkadot-JS Apps UI

To reset the password of an account created with Polkadot-JS Apps UI you just need to go in the "Accounts"
tab, click the icon with three vertical dots on your account and select "Change this account's
password".

:::info

If you create an account first using Polkadot-JS Apps UI, and then add it to the browser extension, you need to follow the [guidelines for the browser extension](#reset-password-using-the-browser-extension) to change the password of such account.

:::

### Multi-signature Accounts

Multi-signature accounts are accounts created from several standard accounts (or even other
multi-sig accounts). For a full explanation, please see the
[Accounts Explainer section on multi-sigs](learn-accounts.md#multi-signature-accounts).


## Parity Signer

Parity Signer is a secure way of storing your DOT on an air-gapped device. It is highly recommended
that you turn off wifi, cellular network, Bluetooth, NFC, and any other communications methods after
installing it. For the tutorial on how to create an account using Parity Signer, [this support article](https://support.polkadot.network/support/solutions/articles/65000180512-how-to-create-an-account-in-parity-signer).

## Vanity Generator

The vanity generator is a tool on [Polkadot-JS UI](https://polkadot.js.org/apps/#/accounts/vanity)
that lets you generate addresses that contain a specific substring.
For the tutorial on how to create an account using Vanity Generator, visit [this support article](https://support.polkadot.network/support/solutions/articles/65000171416).

## Ledger Hardware Wallet

To use a Ledger hardware wallet to create your address and keep your tokens in cold storage, follow
the instructions on our [Ledger hardware wallet guide page](../general/ledger.md).