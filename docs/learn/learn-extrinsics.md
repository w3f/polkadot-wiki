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
[Substrate](https://substrate.io/), a modular framework to efficiently build blockchains.
Substrate's FRAME development environment provides modules called pallets and support libraries that
you can use, modify, and extend to build the runtime logic to suit the needs of your blockchain. You
can explore Substrate's FRAME pallets on
[this dedicated page](https://docs.substrate.io/reference/frame-pallets/).

Within each functional **pallet** on the blockchain, one can **call** its functions and execute them
successfully, provided they have the permission to do so. Because these calls originate outside of
the blockchain runtime, such transactions are referred to as **extrinsics**. Extrinsics normally
contain a signature, some data to describe if the extrinsic has passed some validity checks and a
reference to the pallet and call that it is intended for. For example, the Staking pallet contains
all functions related to staking. A nominator can bond funds and nominate validators by issuing the
respective extrinsics. Some extrinsics might also trigger an event on the chain such as a reward
payout to the nominators.

## Extrinsics (a.k.a. Types of Transactions)

Now that we introduced the term _extrinsic_, let us dive deeper and understand what extrinsics
really are. Extrinsics can be one of 3 distinct types:

- **Signed transactions:** these must contain the signature of the account sending the inbound
  request to the runtime. With signed transactions, the account used to submit the request typically
  pays the transaction fee and must sign it using the account's private key.
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
metadata updates. [**This video tutorial**](https://youtu.be/gbvrHzr4EDY) will explain how to
do it.

:::

### Parity Signer vs Browser Extension

Parity Signer updates the full metadata through the QR fountain while the extension updates the
metadata index (the metadata is not loaded into it). As a consequence the process of updating
metadata is different in this two cases (you will notice that on the Signer app the update takes longer for example).
Having outdated metadata on the Signer app will prevent you from signing, while on the extension you
will be able to click the sign button but the extrinsic will likely fail (similarly of having an
outdated Ledger app). In general, failing to update metadata will most likely result in you not
being able to sign extrinsics.

## Verifying Extrinsics

:::info Walk-through Video Tutorial

Visit the
[**dedicated support page**](https://support.polkadot.network/support/solutions/articles/65000179161-how-can-i-verify-what-extrinsic-i-m-signing-)
and see [**this video tutorial**](https://youtu.be/bxMs-9fBtFk) tutorial to learn about how to
verify extrinsics before signing them. The video will also mention potential attacks that can happen
to you while signing for transactions.

:::

:::danger

Do not sign a transaction if you can't verify what you are
signing or you suspect you might be signing a different extrinsic than the one intended.

:::

Verifying the extrinsic you are signing can take some more time before signing for a transaction but
it allows you to add an extra security step. There are a multitude of possible attacks that will
prevent you to send funds to the desired destination account (see below).

## How do Attacks look like

In general, an attacker would make you think you are signing an extrinsic A when in reality you are signing an
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
B (belonging to an attacker). This attack can be prevented by checking the receiver address before signing. Failing to do so could result in loss of the funds.

### Malicious Website/dApp

This is a common attack that can happen if you are interacting with a malicious site (dApp). In this
scenario you want to perform Extrinsic A on the website, but the dApp will send Extrinsic B to the
extension for signing. In this case the extension will show Extrinsic B. If you are using a Ledger
device you have a second layer of verification, as it will also display Extrinsic B.

### Malicious Browser Extension

This scenario can happen if you have downloaded a malicious extension or a trusted extension, like
the [Polkadot-JS Browser Extension](https://polkadot.js.org/extension/), from a non-trusted source.
In this scenario the extension will display that you will sign for an Extrinsic A but in the
background will execute Extrinsic B. If you are using a [Ledger](https://www.ledger.com/) device
this attack can be detected because you will be able to see Extrinsic B on the screen of your Ledger
device.

### Corrupted metadata

This attack is least common and might result in signing a non-intended extrinsic without the
possibility of verifying it. Before authorizing the metadata update check who is requesting it.
Metadata updates for the Polkadot-JS Browser Extension (or other extensions) might be requested by
the Polkadot-JS UI and dApps (for example DeFi apps of parachains). For the extensions, you should
trust the app that requests the update. When updating the metadata for Parity Signer you should
trust the issuer of the metadata (or generate the QR fountain yourself).

### Corrupted QR-code (Parity Signer)

This is a sub-case of the malicious dApp scenario. If your account is on
[Parity Signer](https://www.parity.io/technologies/signer/) the extrinsic will be displayed as a QR
code, instead of the extension showing its details and you need to verify it on the device. The
corrupted QR code will make you sign for an Extrinsic B when you want to sign for Extrinsic A. This
will be showed in the Signer app and a careful user will notice it. If the metadata in the Signer is
already incorrect (or the Signer is corrupted) there is the risk of signing a non-intended extrinsic
without the possibility of verifying it.

## Defense against Attacks

:::warning 

If you can't verify the extrinsic or you suspect you are signing something different than
what you intended, don't sign it!

:::

To avoid being victim of an attack:

- Use only trusted extensions, sites and software in general.
- Use cold storage options (Ledger, Signer) and verify on them. Trust what these devices tell you
  over what is shown in the app or the browser extension.
- Update Signer metadata only from trusted sources (or do it yourself).
- Accept metadata updates for the extension only from trusted apps.
