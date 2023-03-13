---
id: learn-account-generation
title: Account Generation
sidebar_label: Account Generation
description: Steps on generating a Polkadot account.
keywords: [account, account generation, polkadot account, polkadotjs]
slug: ../learn-account-generation
---

## DISCLAIMER: Key Security

The _only_ ways to get access to your account are via your secret seed or your account's JSON file
in combination with a password. Keep them offline in a secure and private location. If you share
these with anyone, they can access your account, including all of your funds. This information is
always a target for hackers and malicious actors. Check out the wiki doc on
[how to recognize scams](../general/scams.md).

<iframe width="560" height="315" src="https://youtube.com/embed/ARsdXZycJAg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br/><br/>

On this page, we recommend various account generation methods with different levels of convenience
vs. security trade-offs. Please review this page carefully before creating your account to
understand the potential risks of the account generation method and how to mitigate them to keep
your funds safe.<br/><br/>

:::info

Visit
[this support article](https://support.polkadot.network/support/solutions/articles/65000181874-how-to-store-your-mnemonic-phrase-and-backup-file-safely)
for more information about key security.

:::

## Ways to Generate an Account

<iframe width="560" height="315" src="https://youtube.com/embed/DNU0p5G0Gqc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br/><br/>

The **most user-friendly** way to create a
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} address is through the
[Polkadot-JS UI](https://polkadot.js.org/apps/#/accounts). Remember to back up the seed phrase used
to generate your account - the accounts are stored only in your browser, so purging the cache will
also wipe your accounts. You would then have to recreate them using the seed phrase given to you by
the UI - this will also restore all your previously held balances.

:::info local in-browser account storage is disabled by default on the Polkadot-JS UI

To create an account using the Polkadot-JS UI, navigate to settings > account options and click on
allow local in-browser account storage in the drop-down menu.

:::

A **more convenient and recommended** method of keeping the accounts stored on your computer is
using the [Polkadot browser extension](https://github.com/polkadot-js/extension). This extension
remembers your accounts and allows you to clear your browser cache without fear. Remember to back up
your seed phrase - if you lose access to this computer or the extension somehow crashes beyond
repair, the seed phrase will come in handy.

Please note that as this keeps your accounts in the browser extension, it is unsafe to hold
significant funds on them. By definition, a browser is a "hot wallet" and is susceptible to a wide
range of attacks, so keep your funds in cold storage when dealing with non-trivial amounts. For
improved security, you securely stash away the seed phrase for your accounts and remove all traces
of the accounts from your computer after creating them.

Besides the extension and the default UI,
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} addresses can also be created with
the [Subkey tool](https://github.com/paritytech/substrate/tree/master/bin/utils/subkey). Subkey is
intended for users comfortable using the command line and can seem intimidating, but it is quite
approachable. Follow the instructions in the
[Subkey documentation](https://docs.substrate.io/reference/command-line-tools/subkey/). When used
properly, Subkey is the **most secure** available method of creating an account.

There is also the very secure [Parity Signer](https://www.parity.io/signer/). This keeps your keys
on an air-gapped mobile phone. However, it does require obtaining an old Android or iOS-compatible
phone that you are comfortable using only for Parity Signer.

Hardware wallet integration is possible with Ledger. A full guide is available
[here](../general/ledger.md).

Alternatively, you might find other wallets on the [Wallet](./../general/wallets.md) page, but bear
in mind that some of these are **unaudited** and are not officially affiliated with Web3 Foundation
or the {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} project unless otherwise
stated.

:::info How-to guides to generate an account

See our Support Articles for more information about how to create an account using the tools below.

- [Polkadot-JS Browser Extension](#polkadot-js-browser-extension) **RECOMMENDED FOR MOST USERS**
- [Subkey](#subkey) **ADVANCED and MOST SECURE**
- [Polkadot-JS UI](#polkadot-js-apps)
- [Parity Signer](#parity-signer)
- [Vanity Generator](#vanity-generator)
- [Ledger Hardware Wallet](#ledger-hardware-wallet)

:::

:::note

If you prefer video instructions for creating an account using Polkadot JS, see
[**this video tutorial**](https://www.youtube.com/watch?v=sy7lvAqyzkY).

:::

### Account Address Format

An account created for {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} can also be
used on multiple chains in the {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}
ecosystem. More specifically, the account of a chain that uses the `*25519` account address format
(the latest list can be accessed on the
[ss58 registry repository](https://github.com/paritytech/ss58-registry/blob/main/ss58-registry.json)
is cross-compatible with all the chains that use the similar format. To switch between the accounts
on different chains, you can follow the guidelines in
[this support article](https://support.polkadot.network/support/solutions/articles/65000103707-can-i-use-the-same-account-on-polkadot-kusama-and-parachains-).
[Subscan has a tool](https://polkadot.subscan.io/tools/format_transform) you can use to convert your
address between the different chain formats.

:::info Using the same account on multiple chains - Pros and Cons

The address format differs from chain to chain, but that difference is only visual. The same private
key can be used to sign transactions on behalf of the respective accounts on multiple chains. Using
a single account on multiple chains is convenient, as you do not have to deal with multiple mnemonic
phrases or private keys. But, if your account gets compromised on one chain, the attacker can gain
full access to the accounts on all other chains. This also has implications for the account holder's
privacy, as knowing the identity of an account on one chain can expose the account holder's identity
on all the chains. In the Accounts tab, the Polkadot-JS UI displays a warning message next to each
Account that you are using on multiple chains, and recommends to use different Accounts on different
chains (see below).

![warning multiple chains](../assets/warning-multichain-account.png)

:::

On Polkadot-JS Extension, you can copy your address by clicking on the account's icon while the
desired chain format is active. E.g. selecting "Substrate" as the format will change your address,
and clicking the colorful icon of your account will copy it in that format. While in
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} mode, that address format will be
copied, and so on.

### Backing Up Accounts

:::info

See [**this video tutorial**](https://youtu.be/DNU0p5G0Gqc) and visit
[**this support page**](https://support.polkadot.network/support/solutions/articles/65000177677-how-to-export-your-json-backup-file)
to know how to backup your account.

:::

Depending on what software you are using to access your account, there are various ways to back up
and restore your account. It is a good idea to back your information up and keep it in a secure
place. Note that in order to recover an account, you should create your account according to the
instructions [here](learn-account-generation.md). In general, as long as you know how you created
your account, and have the seed phrase ([mnemonic phrase](learn-accounts#portability)) or JSON file
(and password) stored securely, you will be able to restore your account.

## Polkadot-JS Browser Extension

:::info

For guidelines about how to create an account using the Polkadot Extension, see
[**this video tutorial**](https://youtu.be/DNU0p5G0Gqc) and visit
[**this support article**](https://support.polkadot.network/support/solutions/articles/65000098878-how-to-create-a-dot-account).

:::

The Polkadot-JS Browser Extension (referred to as the Polkadot Extension) provides a reasonable
balance of security and usability. It provides a separate local mechanism to generate your address
and interact with {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}.

This method involves installing the Polkadot Extension and using it as a “virtual vault," separate
from your browser, to store your private keys. It also allows the signing of transactions and
similar functionality.

It is still running on the same computer you use to connect to the internet and thus is less secure
than using Parity Signer or other air-gapped approaches.

### Reset Password using the Browser Extension

:::info

See [**this video tutorial**](https://www.youtube.com/watch?v=DNU0p5G0Gqc&t=280s) to learn how to
change the password for an account that has been created on the Polkadot-JS browser extension (i.e.
an injected account).

:::

:::warning

Before following the instructions below, make sure you have your mnemonic phrase stored in a safe
place accessible to you.

:::

Let's say you created `ACCOUNT 1` protected by password `PSW 1`. To reset the password of your
`ACCOUNT 1` using the browser extension, you must follow the following steps:

- On the browser extension, go to `ACCOUNT 1` and click "Forget account". This action will delete
  the access to your account. Note that your tokens are still in your account on the
  {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} blockchain network.
- On the browser extension click the "+" button in the top right corner and select the option
  "Import account from pre-existing seed". After entering the mnemonic phrase, you can choose a new
  password, `PSW 2`.

:::info JSON files do not allow changing account passwords

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

### Restore Account on the Polkadot-JS Browser Extension

:::info

See [**this video tutorial**](https://youtu.be/9ohp8k4Hz8c) and
[**this support page**](https://support.polkadot.network/support/solutions/articles/65000169952-how-to-restore-your-account-in-the-polkadot-extension)
to learn how to restore your account on the Polkadot-JS UI.

:::

## Subkey

:::info

For guidelines about how to create an account using Subkey, see
[**this video tutorial**](https://youtu.be/SWfE_EwxgIU) and visit
[**this support article**](https://support.polkadot.network/support/solutions/articles/65000180519-how-to-create-an-account-in-subkey).

:::

Subkey is recommended for technically advanced users comfortable with the command line and compiling
Rust code. Subkey allows you to generate keys on any device that can compile the code. Subkey may
also be useful for automated account generation using an air-gapped device. It is not recommended
for general users.

## Polkadot-JS UI

:::info

For guidelines about how to create an account using Polkadot-JS UI, see
[**this video tutorial**](https://youtu.be/DNU0p5G0Gqc) and visit
[**this support article**](https://support.polkadot.network/support/solutions/articles/65000180529).

:::

:::caution

If you use this method to create your account and clear your cookies in your browser, your account
will be lost forever if you do not [back it up](#restore-account-on-the-polkadot-js-ui). Make sure
you store your seed phrase in a safe place or download the account's JSON file if using the
Polkadot{.js} browser extension. Learn more about account backup and restoration
[here](#restore-account-on-the-polkadot-js-ui).

:::

Using the Polkadot-JS user interface without the plugin is **not recommended**. It is the least
secure way of generating an account. It should only be used if all of the other methods are not
feasible in your situation.

### Reset password using the Polkadot-JS UI

To reset the password of an account created with Polkadot-JS Apps UI you need to go to the
"Accounts" tab, click the icon with three vertical dots on your account and select "Change this
account's password".

:::info

See [**this video tutorial**](https://youtu.be/DNU0p5G0Gqc?t=261) to learn how to change the
password for an account that has been created on the Polkadot-JS UI (i.e. a non-injected account).

:::

:::note

If you create an account first using Polkadot-JS Apps UI, and then add it to the browser extension,
you need to follow the
[guidelines for the browser extension](#reset-password-using-the-browser-extension) to change the
the password of such an account.

:::

### Restore Account on the Polkadot-JS UI

:::info

See [**this video tutorial**](https://youtu.be/cBsZqFpBANY) and
[**this support page**](https://support.polkadot.network/support/solutions/articles/65000180110-how-to-restore-your-account-in-polkadot-js-ui)
to learn how to restore your account on the Polkadot-JS UI.

:::

## Parity Signer

:::info

For guidelines about how to create an account using Parity Signer, see
[**this video tutorial**](https://youtu.be/hgv1R9mPEXw?t=120) and visit
[**this support article**](https://support.polkadot.network/support/solutions/articles/65000180512-how-to-create-an-account-in-parity-signer).

:::

Parity Signer is a secure way of storing your DOT on an air-gapped device. It is highly recommended
that you turn off wifi, cellular network, Bluetooth, NFC, and any other communications methods after
installing it.

### Restore Account on Parity Signer

:::info

See [**this video tutorial**](https://youtu.be/hgv1R9mPEXw?t=407) and
[**this support page**](https://support.polkadot.network/support/solutions/articles/65000167901-how-to-restore-an-account-in-parity-signer)
to learn how to restore your account on the Polkadot-JS UI.

:::

## Vanity Generator

The vanity generator is a tool on [Polkadot-JS UI](https://polkadot.js.org/apps/#/accounts/vanity)
that lets you generate addresses that contain a specific substring. For the tutorial on how to
create an account using Vanity Generator, visit
[this support article](https://support.polkadot.network/support/solutions/articles/65000171416).

## Ledger Hardware Wallet

:::info

To use a Ledger hardware wallet to create your address and keep your tokens in cold storage, follow
the instructions on the [Ledger hardware wallet guide page](../general/ledger.md).

:::

## Encryption Enhancement

Some newly generated `JSON` account files cannot be imported (restored) into older wallet software.
This is due to an enhanced encryption method, noticeable in a slight delay when
encrypting/decrypting your wallet. If you cannot load a `JSON` file, please ensure you use the
latest version of the wallet software. If you cannot load it, ensure that the wallet software uses
the newest version of the [Polkadot API](https://polkadot.js.org/api/).
