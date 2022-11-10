---
id: learn-extrinsics
title: Extrinsics
sidebar_label: Extrinsics
description: Learn about Transaction Types (i.e. Extrinsics)
keywords: [transaction, DOT, extrinsics, KSM]
slug: ../learn-extrinsics
---

## Pallets and Extrinsics

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} is built using
[substrate](https://substrate.io/), a modular system to efficiently build blockchains. Within each
module or **pallet**, one can **call** different functions that have similar logic. You can explore
substrate pallets on [this dedicated page](https://docs.substrate.io/reference/frame-pallets/). For
example, the staking pallet contains all functionalities related to staking such as bonding or
unbonding funds. The combined information of pallets and calls constitutes an **extrinsic**, i.e. a
transaction that is executed from outside the chain but that triggers an event on the chain.
Continuing with the staking example, within the staking pallet a nominator can bond funds and
nominate some validators. The signature of such extrinsic might lead to an event on the chain such
as a reward payout to that nominator at the end of an era; this is an event inside the chain.

## Extrinsics (a.k.a. Types of Transactions)

Now that we introduced where the term _extrisic_ comes from, we can explain what extrinsics really
are. In Substrate, a _"thing that could exist in the transaction pool"_ — more commonly known as "a
transaction" in the non-Substrate world — can be one of 3 distinct types, all of which fall under a
broader category called "extrinsics". Extrinsics is just a general term to mean "any information
that originates from outside a runtime". These are:

- **Signed transactions:** these must contain the signature of the account sending the inbound
  request to the runtime. With signed transactions, the account used to submit the request typically
  pays a transaction fee and must sign it using the account's private key.
- **Unsigned transactions:** these don't carry any information about who submitted the transaction,
  since the format of this type of transaction doesn't require a signature. You can define what
  conditions must be met for such a transaction to be valid.
- **Inherents:** are a special type of unsigned transaction made by block authors which carry
  information required to build a block such as timestamps, storage proofs and uncle blocks.

Here are some key differences between the different types of extrinsics:

- Contrary to signed transactions, unsigned transaction types require implementing custom validation
  logic which can consume more resources for checking validity compared to signed transactions.
- Unsigned transactions have no economic deterrent to prevent spam or replay attacks, so custom
  logic must account for protecting the network from these types of transactions being misused.
- Inherents exist to address the need of adding some data to a block, whereas signed or unsigned
  transactions exist to potentially change the state of the blockchain.

## Metadata Updates

:::warning Always check for Metadata Updates

Before signing extrinsics with the Polkadot-JS Browser Extension and Parity Signer, always check for
metadata updates. [This technical explainer video](https://youtu.be/gbvrHzr4EDY) will explain how to
do it.

:::

Parity Signer updates the full metadata through the QR fountain while the extension updates the
metadata index (the metadata is not loaded into it). As a consequence the process of updating
metadata is different (you will notice that on the Signer app the update takes longer for example).
Having outdated metadata on the Signer app will prevent you from signing while on the extension you
will be able to click the sign button but the extrinsic will likely fail similarly of having an
outdated Ledger app. In general, failing to update metadata will most likely result in you not being
able to transfer funds.

Before authorizing the metadata update check who is requesting it. Metadata updates might be
requested by the Polkadot-JS UI and dApps (for example DeFi apps of parachains). For the extension,
you should trust the app that requests the update while for Signer you should trust the issuer of
the metadata (or do the update yourself).

## Verifying Extrinsics

:::info Walk-through Video Tutorial

Visit the
[dedicated support page](https://support.polkadot.network/support/solutions/articles/65000179161-how-can-i-verify-what-extrinsic-i-m-signing-)
and see [this technical explainer](https://youtu.be/bxMs-9fBtFk) tutorial to learn about how to
verify extrinsics before signing them. The video will also mention potential attacks that can happen
to you while signing for transactions. **Do not sign a transaction if you can't verify what you are
signing or you suspect you might be signing a different extrinsic than the one intended.**

:::

Verifying the extrinsic you are signing can take some more time before signing for a transaction but
it allows you to add an extra security step. There are a multitude of possible attacks that will
prevent you to send funds to the desired destination account.

## How do Attacks look like

In general, an attacker would make you think you are signing an extrinsic A when you are signing an
extrinsic B. An Attack might come from:

### Clipboard Memory

:::info

For a more detailed read about clipboard memory attacks see
[this article](https://www.kaspersky.com/blog/cryptoshuffler-bitcoin-stealer/19976/).

:::

This is a common attack. The clipboard memory is that memory on you computer dedicated to copy-paste
operations. There is malicious software that can be remotely installed on your computer and that can
detect when a cryptocurrency address is copied. For example, you want to send funds to Address A
(belonging to you) but after copying address A a malicious software swaps that address with Address
B (belonging to an attacker). If you do not check the receiver address before signing the funds will
be lost.

### Corrupted Website

This is a common attack that can happen if your extension is genuine, but the website (dApp) it is
connected with is corrupted. In this scenario you want to perform Extrinsic A on the website, which
will send Extrinsic B to the extension for signature. In this case the extension will show Extrinsic
B. If you are using a Ledger device you have a second layer of verification, is it will also display
Extrinsic B. In this case it is more difficult to spot the attack and it is up to the user to know
the extrinsic that was created on the website in the first place.

### Corrupted Polkadot-JS Browser Extension

There is a minor risk that the [Polkadot-JS Browser Extension](https://polkadot.js.org/extension/)
is corrupted because it was downloaded by non-trusted source. In this scenario the extension will
display that you will sign for an Extrinsic A but in the background will execute another extrinsic,
Extrinsic B. If you are using a [Ledger](https://www.ledger.com/) device this attack can be detected
because you will be able to see Extrinsic B on the screen of your Ledger device.

### Corrupted QR-code (Parity Signer)

If you are using [Parity Signer](https://www.parity.io/technologies/signer/), if the metadata is
incorrect (or the signer is corrupted) there is the risk of signing a non-intended extrinsic without
the possibility of verifying it.

## Defense against Attacks

:::warning If you can't verify the extrinsic or you suspect you are signing something different than
what you intended, don't sign it!

:::

To avoid being victim of an attack:

- Use only trusted extensions, sites and software in general
- Use cold storage options (Ledger, Signer) and verify on them. Trust what these devices tell you
  over what is shown in the app or the browser extension
- Update Signer metadata only from trusted sources (or do it yourself)
- Accept metadata updates for the extension only from trusted apps
