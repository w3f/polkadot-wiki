---
id: learn-accounts
title: Polkadot Accounts
sidebar_label: Polkadot Accounts
description: Polkadot Accounts, Account Identity, and Account Reaping.
keywords: [account, polkadot account, polkadotjs, indices, identity, reaping]
slug: ../learn-accounts
---

import RPC from "./../../components/RPC-Connection"; import Tabs from "@theme/Tabs"; import TabItem
from "@theme/TabItem"; import DocCardList from '@theme/DocCardList';

:::info User friendly wallets

Create your Polkadot accounts with any of the secure and user-friendly wallet listed on the
[Polkadot website](https://www.polkadot.network/ecosystem/wallets/).

See the [Wallets](./wallets-index) section for more information about different wallet options available, and specifically the
[wallets and extensions](../general/wallets-and-extensions.md) page, which lists the user friendly wallet projects funded by the Polkadot/Kusama Treasuries or by the
[Web3 Foundation Grants Program](../general/grants.md).

:::

This document covers the basics of {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}
accounts. See the [Advanced Account](./learn-account-advanced.md) page for more information about
accounts such as [account derivation](./learn-account-advanced.md#derivation-paths) and
[indices](./learn-account-advanced.md#indices). For a more in-depth explanation of the cryptography
behind {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} accounts, please see the
[cryptography page](learn-cryptography.md).

<DocCardList />

## Account Address

An address is the public part of a {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}
account. The private part is the key used to access this address. The public and private parts
together make up a {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} account. You can
think of the public address of your account, like your mailbox and the private key like the key to
open that mailbox. Anybody can send mail to your mailbox, but only you can access it as only you
have access to its key. In the context of
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} accounts, anybody can send tokens to
your public address, but only you can transact with them using your private key. That is why you
should keep your private key secret.

### Mnemonic Seed Phrase

A user's account requires a private key that can sign on to one of the
[supported curves and signature schemes](../build/build-protocol-info.md#cryptography). Without a
private key, an account cannot sign anything. In
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} there are some exceptions of accounts
that do not have known private keys (i.e. keyless accounts). Such accounts are
[multi-signature accounts](./learn-account-multisig.md),
[pure proxies](./learn-proxies-pure.md#anonymous-proxy-pure-proxy), and
[system accounts](./learn-account-advanced.md#system-accounts) that are not discussed here and are
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
[Address Format](./learn-account-advanced.md#address-format) section on the
[Advanced Account](./learn-account-advanced.md) page.

### Account Generation

Usually, there are two ways of generating a mnemonic seed:

- On a "hot" device, i.e. a device that is connected to the internet
- On a "cold" device, i.e. a device that is not (and ideally will never be) connected to the
  internet

Hot wallets are susceptible to a wide range of attacks, so it is recommended to use cold wallets
when dealing with non-trivial amounts of funds.

Generating a mnemonic seed on a browser extension or a mobile application will create a hot key or
hot wallet. Create your Polkadot accounts with a secure and user-friendly wallet listed on the
[Polkadot website](https://www.polkadot.network/ecosystem/wallets/). See also the
[Wallets](./wallets-index) section for more information about wallets and the
[wallets and extensions](../general/wallets-and-extensions.md) page for wallets and browser
extensions funded by the Polkadot/Kusama Treasuries or by the
[Web3 Foundation Grants Program](../general/grants.md).

Cold keys are generated on special devices such as those provided by [Ledger](../general/ledger.md).
Additionally, you can generate your wallet using the [Polkadot Vault](../general/polkadot-vault.md)
mobile app (you need a dedicated air-gapped Android or iOS-compatible smartphone that you are
comfortable using only for Polkadot Vault), or a dedicated hardware implementation of Polkadot Vault
such as [the Kampela Signer](https://www.kampe.la/).

Usually, browser extensions and mobile devices have options to import accounts generated on cold
devices. Note that the private keys of those accounts will remain on the cold device, meaning that
you will always need the device to sign for any transaction. Exceptions exist where you can generate
hot [proxy accounts](./learn-proxies.md) and sign on behalf of a cold account without using the cold
device. This is practical, especially for routine transactions.

### Backing Up Accounts

Depending on what software you use to access your account, there are various ways to back up and
restore your account. It is a good idea to back your information up and keep it secure. In general,
as long as you know how you created your account and have the mnemonic seed phrase or the JSON
backup file (and password) stored securely, you can restore your account.

## Existential Deposit and Reaping

:::info

Visit
[**this support page**](https://support.polkadot.network/support/solutions/articles/65000168651-what-is-the-existential-deposit-)
for more information about existential deposit.

:::

When you generate an account (address), you only generate a _key_ that lets you access it. The
account does not exist yet on-chain. For that, it needs the existential deposit of
{{ polkadot: <RPC network="polkadot" path="consts.balances.existentialDeposit" defaultValue={10000000000} filter="humanReadable"/>. :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.balances.existentialDeposit" defaultValue={333333333} filter="humanReadable"/>. :kusama }}

Having an account go below the existential deposit causes that account to be _reaped_. The account
will be wiped from the blockchain's state to conserve space, along with any funds in that address.
You do not lose access to the reaped address - as long as you have your private key or recovery
phrase, you can still use the address - but it needs a top-up of another existential deposit to be
able to interact with the chain.

Transaction fees cannot cause an account to be reaped. Since fees are deducted from the account
before any other transaction logic, accounts with balances _equal to_ the existential deposit cannot
construct a valid transaction. Additional funds will need to be added to cover the transaction fees.

Here's another way to think about existential deposits. Ever notice those `Thumbs.db` files on
Windows or `.DS_Store` files on Mac? Those are junk; they serve no specific purpose other than
making previews a bit faster. If a folder is empty saved for such a file, you can remove the folder
to clear the junk off your hard drive. That does not mean you will lose access to this folder
forever - you can always recreate it. You have the _key_, after all - you're the computer's owner.
It just means you want to keep your computer clean until you maybe need this folder again and
recreate it. Your address is like this folder - it gets removed from the chain when nothing is in it
but gets put back when it has the existential deposit.

## Account Balance Types

In {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} there are different types of
balance depending on the account activity. Different balance types indicate whether your balance can
be used for transfers, to pay fees, or must remain frozen and unused due to an on-chain requirement.
Below is an example that displays different balance types of a Kusama account (note that the balance
types are the same for a Polkadot account).

![account_balance_types](../assets/account-balance-types.png)

- The **total** balance indicates the total number of tokens in the account. Note that this number
  does not necessarily correspond to the tokens you can transfer. In the example, the total number
  of tokens is 0.6274 KSM. The **transferrable** balance indicates the number of free tokens to be
  transferred. This is calculated by subtracting the number of _locked_ and _reserved_ tokens from
  the total number of tokens. Locked funds correspond to tokens used in staking, governance, and
  vested transfers (see below). In the example, the transferrable balance is 0.0106 KSM.
- The **vested** balance indicates tokens sent to the account and released with a specific time
  schedule. The account owns the tokens, but they are _locked_ and become available for transfer
  after a specific number of blocks. In the example, the vested balance is 0.25 KSM.
- The **bonded** balance indicates the number of tokens that are _locked_ for on-chain participation
  to staking. In the example, the bonded balance is 0.4 KSM.
- The **democracy** balance indicates the number of tokens that are _locked_ for on-chain
  participation in democracy (i.e. voting for referenda and council). In the example, the democracy
  balance is 0.4 KSM.
- The **redeemable** balance indicates the number of tokens ready to be unlocked to become
  transferrable again. Those tokens already went through the unbonding period. In this case, the
  redeemable balance is 0.1 KSM.
- The **locked** balance indicates the number of frozen tokens for on-chain participation to staking
  and democracy or for vested transfers. **Locks do not stack**, which means that if you have
  different locks the total locked balance is not the addition of all single locks. Instead, **the
  biggest lock decides the total locked balance**. In the example, the locked balance is 0.55 KSM
  because the biggest lock is on democracy (0.55 KSM).
- The **reserved** balance indicates the number of tokens that are frozen for on-chain activity
  other than staking, governance, and vested transfers. Such activity can be setting an identity or
  a proxy. Reserved funds are held due to on-chain requirements and can usually be freed by taking
  some on-chain action. For example, the "Identity" pallet reserves funds while an on-chain identity
  is registered, but by clearing the identity, you can unreserve the funds and make them free again.
  The same applies to proxies. The idea is that those actions require some network memory usage that
  is not given for free. In the example, we created a governance proxy, and the reserved funds for
  this are 0.0668 KSM.
