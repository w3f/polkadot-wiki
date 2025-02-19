---
id: transaction-attacks
title: Why Verify Transactions?
sidebar_label: Transaction Verification
description: How to Prevent from being a Victim of an Attack
keywords: [transaction, extrinsic, verification, protection]
slug: ../transaction-attacks
---

In general, an attacker would make you think you are signing a Transaction A when in reality you are
signing a Transaction B. An Attack might come from:

### Clipboard Memory

!!!info
    For a more detailed read about clipboard memory attacks see [this article](https://www.kaspersky.com/blog/cryptoshuffler-bitcoin-stealer/19976/).

This is a common attack. The clipboard memory is that memory on your computer dedicated to
copy-paste operations. There is malicious software that can be remotely installed on your computer
and that can detect when a cryptocurrency address is copied. For example, you want to send funds to
Address A (belonging to you) but after copying address A a malicious software swaps that address
with Address B (belonging to an attacker). This attack can be prevented by checking the receiver
address before signing. Failing to do so could result in loss of the funds.

### Malicious Website/dApp

This is a common attack that can happen if you are interacting with a malicious site (dApp). In this
scenario you want to perform Transaction A on the website, but the dApp will send Transaction B to
the extension for signing. In this case the extension will show Transaction B. If you are using a
Ledger device you have a second layer of verification, as it will also display Transaction B.

### Malicious Browser Extension

This scenario can happen if you have downloaded a malicious browser extension or a trusted browser
extension, from a non-trusted source. In this scenario the extension will display that you will sign
for an Transaction A but in the background will execute Transaction B. If you are using a
[Ledger](https://www.ledger.com/) device this attack can be detected because you will be able to see
Transaction B on the screen of your Ledger device.

### Corrupted metadata

This attack is least common and might result in signing a non-intended transaction without the
possibility of verifying it. Before authorizing the metadata update check who is requesting it.
Metadata updates for browser extensions might be requested by dApps (for example DeFi apps of
parachains). For the extensions, you should trust the app that requests the update. When updating
the metadata for Parity Signer you should trust the issuer of the metadata (or generate the QR
fountain yourself).

### Corrupted QR-code (Parity Signer)

This is a sub-case of the malicious dApp scenario. If your account is on
[Parity Signer](https://www.parity.io/technologies/signer/) the transaction will be displayed as a
QR code, instead of the extension showing its details and you need to verify it on the device. The
corrupted QR code will make you sign for an Transaction B when you want to sign for Transaction A.
This will be showed in the Signer app and a careful user will notice it. If the metadata in the
Signer is already incorrect (or the Signer is corrupted) there is the risk of signing a non-intended
transaction without the possibility of verifying it.

### Replay Attack

A replay attack is where past transactions can be replayed (same [balance](../learn/learn-transactions.md#balance-transfers),
receiver account, etc.) without knowing private keys. It is an attack where publicly known data can
be "replayed" as a new extrinsic. This could happen in the context of
[reaping accounts](../learn/learn-accounts.md#existential-deposit-and-reaping) because the reaping
process resets the nonce value. If all signed transactions until the nonce before the reaping event
were immortal, all past transactions can be replayed once the account is refunded. There is no need
for the attacker to know your private key, valid signatures for those past transactions and nonces
already exist and are stored on-chain (meaning the private key was already used to generate those
signatures).

Making a [transaction mortal](../learn/learn-transactions.md#mortal-and-immortal-extrinsics) with a
relatively short mortality window will almost certainly ensure that replay attacks are not possible,
with the only exception being if the account is reaped and then re-funded shortly after submitting a
mortal transaction, and then an attacker replays that transaction within the mortality window (i.e.,
the specified block interval) and such transaction is valid (e.g. if you only have 10 DOT, and you
try to issue an extrinsic sending 20 DOT, the transfer will fail).

## Defense against Attacks

!!!warning
    If you can't verify the transaction or you suspect you are signing something different than what you intended, don't sign it!

To avoid being victim of an attack:

- Use only trusted extensions, sites and software in general.
- Use cold storage options (Ledger, Signer) and verify them. Trust what these devices tell you over
  what is shown in the app or the browser extension.
- Update Signer metadata only from trusted sources (or do it yourself).
- Accept metadata updates for the extension only from trusted apps.