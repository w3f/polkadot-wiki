---
id: polkadot-vault
title: Parity Signer (aka Polkadot Vault)
sidebar_label: Polkadot Vault
description: Learn about the Polkadot Vault
keywords: [parity signer, signer, polkadot vault]
slug: ../polkadot-vault
---

[Parity Signer](https://www.parity.io/technologies/signer) (aka Polkadot Vault) is a cold storage
solution that allows you to use a phone in airplane mode as an air-gapped wallet. The Vault App is
not technically a wallet as it does not allow to transfer funds. It is more a key-chain that allows
you the create, manage and restore accounts. It also allows you to sign
[extrinsics](../learn/learn-extrinsics.md) via a system of QR codes.

## Create and Import Accounts

You can import a signer account into the Polkadot-JS Browser Extension (recommended) or directly
into the Polkadot-JS UI. See the instructions in [this video tutorial](https://youtu.be/hgv1R9mPEXw)
to learn more about creating and importing Vault accounts.

## Signing Extrinsics

Remember to always check for metadata updates before signing transactions. See
[this video tutorial](https://youtu.be/gbvrHzr4EDY) to learn how to transfer funds and do metadata
updates using the Vault App.

The procedure to sign transactions with the Vault App is as follow:

- The Wallet or browser extension will show a QR code encoding the information about what your are
  going to sign.
- After scanning the QR code with the Vault App, you will be presented with decoded information
  about what you are going to sign. Make sure the information matches what you asked to sign in the
  first place. If something does not feel right, do not sign. Check
  [this page](../learn/learn-extrinsics.md#corrupted-qr-code-parity-signer) for more information and
  contact [the Polkadot Support Team](https://support.polkadot.network/support/home).
- If the information showed by the Vault App is right, you can present the QR code (signature) to
  the camera on your laptop to sign for the transaction.

:::info QR codes are signature-specific

Note that QR codes are signature-specific. If someone by chance has access to the QR code signature
for one of your transactions, future transactions cannot be signed with that same QR code, and it is
impossible to find out the private key of your account only with that QR code.

:::

## Update the Vault App

:::danger

Make sure you always have your mnemonic seed phrase secure and available to you.

:::

To securely update the Polkadot Vault App follow the instructions
[here](https://paritytech.github.io/parity-signer/tutorials/Upgrading.html).

## Advanced

It is possible to add more chains to Parity Signer via QR-code, and to update their metadata by
generating your own QR-code fountain in a metadata portal similarly to that
[signed by Parity](https://metadata.parity.io/#/polkadot).

### Chain Spec

### Metadata Updates
