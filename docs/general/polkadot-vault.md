---
id: polkadot-vault
title: Parity Signer (aka Polkadot Vault)
sidebar_label: Polkadot Vault
description: Learn about the Polkadot Vault
keywords: [parity signer, signer, polkadot vault]
slug: ../polkadot-vault
---

:::info

The Polkadot Vault app is cold storage solution for power users. For other users we recommend to use
[Ledger](./ledger.md) devices.

:::

[Parity Signer](https://www.parity.io/technologies/signer) (aka Polkadot Vault) is a cold storage
solution that allows you to use a phone in airplane mode as an air-gapped wallet. The Vault App is
not technically a wallet as it does not allow to transfer funds. It is more a key-chain tool that
allows you the create, manage and restore accounts.

By default the Vault app contains chain specification for Polkadot, Kusama and Westend. Metadata
updates are possible via a QR code fountain. It is also possible to add additional chains and do
metadata updates for those too. The app allows you to securely sign
[extrinsics](../learn/learn-extrinsics.md) via a system of QR codes, without exposing your private
keys to the internet.

## Vault vs. Ledger

The Polkadot Vault and [Ledger](./ledger.md) are both cold storage solutions in a sense that private
keys of accounts created on the Vault app or Ledger device are not stored on your computer or more
in general on a device that has internet connection. However, the two solutions differ and you might
want to consider one or the other depending on the type of user you are.

|                                                                                               Ledger                                                                                                |                                                                                                                      Polkadot Vault                                                                                                                       |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Hardware designed to stay offline and be secure. Certified by French cybersecurity agency [ANSSI](https://www.ssi.gouv.fr/en/cybersecurity-in-france/the-national-cybersecurity-agency-of-france/). |                                                         Hardware not designed to stay offline. The user needs to switch off all inbound and outbound connections (network, wifi, bluetooth, NFC).                                                         |
|                     Hardware resistent to side-channel attacks via [Secure Element](https://www.ledger.com/academy/security/the-secure-element-whistanding-security-attacks/).                      |                                                                                          If there is no wired connection, side-channel attacks are not possible.                                                                                          |
|                                                                One mnemonic seed phrase for all intra- and inter-currency accounts.                                                                 | One mnemonic for each account or one mnemonic for multiple accounts via account derivation. For `n` chains a minimum of `n` mnemonics are required (i.e. not possible to have one mnemonic seed for inter-currency accounts such as Polkadot and Kusama). |
|                                                             Easy firmware and application upgrades through the Ledger Live application.                                                             |                                         For app upgrades users need to factory reset the phone and recover all accounts through seed phrases. Metadata updates for each chain must be done via QR code fountain.                                          |
|                                                                             Currently not all parachains are supported.                                                                             |                                                               Users can add all parachains as long as they have the wss endpoint know how to extract the chain specifications and metadata.                                                               |
|        Ledger app updates on Ledger Live sometimes lag behind chain updates resulting in users not being able to transact unless they install developer versions (only for advanced users).         |                                                                                      Metadata updates are always available to install as soon as they are released.                                                                                       |

## Create and Import Accounts

You can import a Vault account into the Polkadot-JS Browser Extension (recommended) or directly into
the Polkadot-JS UI. See the instructions in [this video tutorial](https://youtu.be/hgv1R9mPEXw) to
learn more about creating and importing Vault accounts.

## Signing Extrinsics

Remember to always check for metadata updates before signing transactions. See
[this video tutorial](https://youtu.be/gbvrHzr4EDY) to learn how to transfer funds and do metadata
updates using the Vault App.

The procedure to sign transactions with the Vault App is as follow:

- The wallet or browser extension will show a QR code encoding the information about what your are
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
[here](https://paritytech.github.io/parity-signer/tutorials/Upgrading.html). Briefly,

- backup your accounts (Backup key Set > write down the mnemonic seed phrase),
- factory reset your Vault App (Settings > Wipe all Data),
- factory reset your phone,
- re-install the Vault App,
- go offline (airplane mode, no wifi),
- recover your accounts (Add Key Set > Recover Key Set).

## Security Notes

The Vault App has a Log that will tell you all activities performed with it. It is important to mark
down the last activity you did so that you can do a security check next time you use the app. Also,
the Vault App will always tell you if the phone has been (even briefly) connected to the internet.
In case of unrecognized connection it is recommended to:

- Backup your accounts (i.e. make sure you have the mnemonic seed phrases)
- Follow the steps in [Update the Vault App](#update-the-vault-app)
- Once offline, create a new account on the Vault App
- Import the compromised accounts and transfer the funds on the new non-compromised account.

If an account's private key has been exported from the Vault App, the public key will be marked as
"hot" and the following message will be displayed _This key is marked hot because its root private
key has been exported_.

## Add Chains

By default the Vault App contains chain specs for Polkadot, Kusama and Westend. It is possible to
add more chains via QR-code, and to update their metadata by generating your own QR-code fountain in
a metadata portal similarly to that [signed by Parity](https://metadata.parity.io/#/polkadot).

:::info Advanced How-to Guides

See the [advanced guides](../learn/learn-vault-guides.md) for more information about how to add
chain spec and do metadata updates.

:::
