---
id: attacks
title: Protection from Attacks
sidebar_label: Attack Protection
description: How to Prevent from being a Victim of an Attack
keywords: [attack, protection]
slug: ../attacks
---

## How do Attacks look like

In general, an attacker would make you think you are signing an extrinsic A when in reality you are
signing an extrinsic B. An Attack might come from:

### Clipboard Memory

:::info

For a more detailed read about clipboard memory attacks see
[this article](https://www.kaspersky.com/blog/cryptoshuffler-bitcoin-stealer/19976/).

:::

This is a common attack. The clipboard memory is that memory on you computer dedicated to copy-paste
operations. There is malicious software that can be remotely installed on your computer and that can
detect when a cryptocurrency address is copied. For example, you want to send funds to Address A
(belonging to you) but after copying address A a malicious software swaps that address with Address
B (belonging to an attacker). This attack can be prevented by checking the receiver address before
signing. Failing to do so could result in loss of the funds.

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

If you can't verify the extrinsic or you suspect you are signing something different than what you
intended, don't sign it!

:::

To avoid being victim of an attack:

- Use only trusted extensions, sites and software in general.
- Use cold storage options (Ledger, Signer) and verify on them. Trust what these devices tell you
  over what is shown in the app or the browser extension.
- Update Signer metadata only from trusted sources (or do it yourself).
- Accept metadata updates for the extension only from trusted apps.
