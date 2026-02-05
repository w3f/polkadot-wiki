---
title: What Is a Polkadot Account?
description: Learn about Polkadot accounts, their structure, specific address formats, and existential deposits.
---

This document covers the basics of accounts in the Polkadot ecosystem. See the
[Advanced Account](../../reference/accounts-advanced.md) page for more information about accounts such as
[account derivation](../../reference/accounts-advanced.md#derivation-paths) and
[indices](../../reference/accounts-advanced.md#indices). For a more in-depth explanation of the cryptography
behind accounts, please see the [cryptography page](../../reference/cryptography.md).

## Account Address

An address is the public part of an account. The private part is the key used to access this
address. The public and private parts together make up an account. You can think of the public
address of your account, like your mailbox and the private key like the key to open that mailbox.
Anybody can send mail to your mailbox, but only you can access it as only you have access to its
key. In the context of accounts, anybody can send tokens to your public address, but only you can
transact with them using your private key. That is why you should keep your private key secret.

### Mnemonic Seed Phrase

A user's account requires a private key that can sign on to one of the
[supported curves and signature schemes](../../reference/cryptography.md#session-keys). Without a
private key, an account cannot sign anything. In Polkadot, there are some exceptions of accounts
that do not have known private keys (i.e. keyless accounts). Such accounts are
[multi-signature accounts](../../knowledge-base/multisig.md),
[pure proxies](../../knowledge-base/pure-proxies.md), and
[system accounts](../../reference/accounts-advanced.md#system-accounts) that are not discussed here and are
meant for an advanced audience.

A typical 12-word mnemonic seed phrase is shown below.

```
'caution juice atom organ advance problem want pledge someone senior holiday very'
```

Its corresponding _private/public keypair_ is also shown.

```
Secret seed (Private key): 0x056a6a4e203766ffbea3146967ef25e9daf677b14dc6f6ed8919b1983c9bebbc
Public key (SS58): 5F3sa2TJAWMqDhXG6jhV4N8ko9SxwGy8TpaNS1repo5EYjQX
```

Polkadot default address format is the `MultiAddress` type. This means the same mnemonic phrase will
generate public keys for different parachains. For more information, see the
[Address Format](../../reference/accounts-advanced.md#address-format) section on the
[Advanced Account](../../reference/accounts-advanced.md) page.

### Account Generation

Usually, there are two ways of generating a mnemonic seed:

- On a "hot" device, i.e. a device that is connected to the internet
- On a "cold" device, i.e. a device that is not (and ideally will never be) connected to the
  internet

Hot wallets are susceptible to a wide range of attacks, so it is recommended to use cold wallets
when dealing with non-trivial amounts of funds.

Generating a mnemonic seed on a browser extension or a mobile application will create a hot key or
hot wallet. Create your Polkadot accounts with a secure and user-friendly wallet listed on the
[Polkadot website](https://www.polkadot.network/ecosystem/wallets/).

Cold keys are generated on special devices such as those provided by [Ledger](../../learn/learn-guides-ledger.md).
Additionally, you can generate your account using the [Polkadot Vault](../../learn/learn-guides-vault.md)
mobile app (you need a dedicated air-gapped Android or iOS-compatible smartphone that you are
comfortable using only for Polkadot Vault), or a dedicated hardware implementation of Polkadot Vault
such as [the Kampela Signer](https://www.kampe.la/).

Usually, browser extensions and mobile devices have options to securely import accounts from cold
wallets. Note that the private keys of those accounts will remain on the cold wallet, meaning that
you will always need the device to sign any transaction. Exceptions exist where you can generate hot
wallet based [proxy accounts](../../knowledge-base/proxies.md) and sign on behalf of a cold wallet account
without connecting the cold device. This is practical, especially for transactions made frequently.

### Backing Up Accounts

Depending on what software you use to access your account, there are various ways to back up and
restore your account. It is a good idea to back your information up and keep it secure. In general,
as long as you know how you created your account and have the mnemonic seed phrase or the JSON
backup file (and password) stored securely, you can restore your account.

### Unified Address Format

Polkadot's address format allows it to
[map your Polkadot address into multiple ones of different parachains](../../reference/accounts-advanced.md#address-format).
This has been a major UX problem in onboarding new users. A unified address format across parachains
within the Polkadot ecosystem aims to deliver a **simpler, more consistent user experience** while
reducing errors.

Below is an example of the Hydration parachain.

- Legacy Format: `7LMa9HR4MgV3Ae8t632XcJJSPBaEFou4RDRXQzeVE6BrpYCk`

- New format: `13m1rnJf9MPFKwef2Vc2pXYffcZhoGEGXxXFew8X4Dj96FcA`

From a UI perspective, your Polkadot address will be the same on any parachain. The main benefits of
the unified address format include the following:

- Simplified User Experience: A single address format reduces complexity, making Polkadot more
  accessible.
- Consistency Across Ecosystem: No more dealing with multiple formats for different parachains.
- Improved Ecosystem Usability: A unified experience enhances the overall robustness and usability
  of the Polkadot network.

!!!info "Exchanges and Legacy Formats"
    Some exchanges may require the legacy format for deposits or withdrawals during the transition.
    Parachain upgrades are happening progressively, and exchanges may take time to fully integrate the
    new format.

    To assist, a feature for copying legacy addresses is being implemented to ensure a seamless experience during this interim period.

## Existential Deposit and Reaping

!!!info
    Visit [**this support page**](https://support.polkadot.network/support/solutions/articles/65000168651-what-is-the-existential-deposit-) for more information about existential deposit.

When you generate an account (address), you only generate a _key_ that lets you access it. The
account does not exist yet on-chain. For that, it needs the
[existential deposit](../../general/chain-state-values.md).

Having an account go below the existential deposit causes that account to be _reaped_. The account
will be wiped from the blockchain's state to conserve space, along with any funds in that address.
You do not lose access to the reaped address - as long as you have your private key or recovery
phrase, you can still use the address - but it needs a top-up of another existential deposit to be
able to interact with the chain.

Transaction fees cannot cause an account to be reaped. Since fees are deducted from the account
before any other transaction logic, accounts with balances _equal to_ the existential deposit cannot
construct a valid transaction. Additional funds will need to be added to cover the transaction fees.

!!!info "The existential deposit can be different on parachains"
    Having an Existential Deposit (ED) on a Polkadot account does not guarantee the liveness of the same account on its parachains. Parachains typically define ED for an account in their native tokens but can also configure it with tokens that are deemed sufficient. 

Here's another way to think about existential deposits. Ever notice those `Thumbs.db` files on
Windows or `.DS_Store` files on Mac? Those are junk; they serve no specific purpose other than
making previews a bit faster. If a folder is empty saved for such a file, you can remove the folder
to clear the junk off your hard drive. That does not mean you will lose access to this folder
forever - you can always recreate it. You have the _key_, after all - you're the computer's owner.
It just means you want to keep your computer clean until you maybe need this folder again and
recreate it. Your address is like this folder - it gets removed from the chain when nothing is in it
but gets put back when it has the existential deposit.


## Identity

Once you have an account, you may also set an identity.Users can set an identity by registering through default fields such as legal name, display name,
website, Twitter handle, along with some extra, custom fields for which they would
like attestations (see [Judgements](../../knowledge-base/identity.md#judgements)).

For more information, see [Identity in the Knowledge Base](../../knowledge-base/identity.md).

!!!info "Instructions for setting and clearing Identities"
    The procedure to set and clear identities is explained in detail in this support article - [How to set and clear an Identity](https://support.polkadot.network/support/solutions/articles/65000181981-how-to-set-and-clear-an-identity)

!!!note The Ledger app on **Nano S** doesn't support the extrinsic for setting identity. As a workaround, create a primary identity with an on-chain account and then using that primary identity, assign a [sub-identity](../../knowledge-base/identity.md#sub-identities) to the Ledger stash.

