---
id: polkadot-vault
title: Polkadot Vault (formerly Parity Signer)
sidebar_label: Polkadot Vault
description: Learn about the Polkadot Vault
keywords: [parity signer, signer, polkadot vault]
slug: ../polkadot-vault
---

:::info

The Polkadot Vault app is a cold storage solution for power users. For other users, we recommend
using [Ledger](./ledger.md) devices.

:::

[Polkadot Vault](https://www.parity.io/technologies/signer) (aka Parity Signer) is a cold storage
solution that allows you to use a phone in airplane mode as an air-gapped wallet. The Vault App is
not technically a wallet as it does not allow to transfer funds. It is more of a key-chain tool that
will enable you the create, manage, and restore accounts.

By default, the Vault app contains chain specifications for Polkadot, Kusama, and Westend. Metadata
updates are possible via a QR code fountain. It is also possible to add chains and do metadata
updates for those. The app allows you to securely sign [extrinsics](../learn/learn-extrinsics.md)
via QR codes without exposing your private keys to the internet.

## Vault vs. Ledger

The Polkadot Vault and [Ledger](./ledger.md) are cold storage solutions because private keys of
accounts created on the Vault app or Ledger device are not stored on your computer or, more in
general, on a device that has an internet connection. However, the two solutions differ, and you
should consider one or the other depending on your user type.

|                                                                                                             Ledger                                                                                                             |                                                                                                                                                                            Polkadot Vault                                                                                                                                                                             |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|              Hardware designed to stay offline and be secure. Certified by French cybersecurity agency [ANSSI](https://www.ssi.gouv.fr/en/cybersecurity-in-france/the-national-cybersecurity-agency-of-france/).               |                                                                                                                 Hardware not designed to stay offline. The user must switch off all inbound and outbound connections (network, wifi, Bluetooth, NFC).                                                                                                                 |
|                                 Hardware is resistant to side-channel attacks via [Secure Element](https://www.ledger.com/academy/security/the-secure-element-whistanding-security-attacks/).                                  |                                                                                                                                                If there is no wired connection, side-channel attacks are not possible.                                                                                                                                                |
|                                                                              One mnemonic seed phrase for all intra- and inter-currency accounts.                                                                              | One mnemonic for each account or one mnemonic for multiple accounts via [account derivation](../learn/learn-account-advanced.md#derivation-paths) or default [Substrate address format](../learn/learn-account-advanced.md#address-format) (not recommended to use the same account on different chains). For `n` chains, a minimum of `n` mnemonics are recommended. |
|                                                                          Easy firmware and application upgrades through the Ledger Live application.                                                                           |                                                                                    For [app upgrades](#update-the-vault-app), users must factory reset the phone and recover all accounts through seed phrases. Metadata updates for each chain must be done via QR code fountain.                                                                                    |
|                                                                                          Currently, not all parachains are supported.                                                                                          |                                                                                                               Users can add all parachains if they have the wss endpoint and know [how to extract the chain specifications and metadata](#add-chains).                                                                                                                |
| Ledger app updates on Ledger Live sometimes lag behind chain updates resulting in users only being able to transact if they [install developer versions](./ledger.md#install-the-developer-release) (only for advanced users). |                                                                                                         Metadata updates are always available to install as soon as they are released, but the installation process requires familiarity with Linux commands.                                                                                                         |

## Create and Import Accounts

You can import a Vault account into the Polkadot-JS Browser Extension (recommended) or directly into
the Polkadot-JS UI. See the instructions in [this video tutorial](https://youtu.be/hgv1R9mPEXw) to
learn more about creating and importing Vault accounts.

## Signing Extrinsics

Remember to always check for metadata updates before signing transactions. See
[this video tutorial](https://youtu.be/gbvrHzr4EDY) to learn how to transfer funds and do metadata
updates using the Vault App.

The procedure to sign transactions with the Vault App is as follows:

- The wallet or browser extension will show a QR code encoding the information about what you are
  going to sign.
- After scanning the QR code with the Vault App, you will be presented with decoded information
  about what you will sign. Make sure the information matches what you asked to sign in the first
  place. If something does not feel right, do not sign. Check
  [this page](../learn/learn-extrinsics.md#corrupted-qr-code-parity-signer) for more information and
  contact [the Polkadot Support Team](https://support.polkadot.network/support/home).
- If the information shown by the Vault App is correct, you can present the QR code (signature) to
  the camera on your laptop to sign for the transaction.

:::info QR codes are signature-specific

Note that QR codes are signature-specific. If someone by chance has access to the QR code signature
for one of your transactions, future transactions cannot be signed with that same QR code, and it is
impossible to find out the private key of your account only with that QR code.

:::

## Update the Vault App

:::danger

Ensure you always have your mnemonic seed phrase secure and available.

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
down the last action you did so that you can do a security check the next time you use the app.
Also, the Vault App will always tell you if the phone has been (even briefly) connected to the
internet. In case of an unrecognized connection it is recommended to:

- Backup your accounts (i.e. make sure you have the mnemonic seed phrases)
- Follow the steps in [Update the Vault App](#update-the-vault-app)
- Once offline, create a new account on the Vault App
- Import the compromised accounts and transfer the funds to the new non-compromised account.

If an account's private key has been exported from the Vault App, the public key will be marked as
"hot" and the following message will be displayed _This key is marked hot because its root private
key has been exported_.

## Add Chains

The Vault App contains chain specs for Polkadot, Kusama, and Westend by default. It is possible to
add more chains via QR-code, and update their metadata by generating your own QR-code fountain in a
metadata portal similar to that [signed by Parity](https://metadata.parity.io/#/polkadot).

:::info Advanced How-to Guides

See the [advanced guides](../learn/learn-vault-guides.md) for more information about how to add
chain spec and do metadata updates.

:::
