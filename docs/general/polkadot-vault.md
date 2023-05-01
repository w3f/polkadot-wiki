---
id: polkadot-vault
title: Polkadot Vault (formerly Parity Signer)
sidebar_label: Polkadot Vault
description: Learn about the Polkadot Vault
keywords: [parity signer, signer, polkadot vault]
slug: ../polkadot-vault
---

:::info Rebranding of Parity Signer to Polkadot Vault

The Polkadot Vault app rebranding is live on
[iOS](https://apps.apple.com/us/app/parity-signer/id1218174838) and
[Android](https://play.google.com/store/apps/details?id=io.parity.signer) devices. The source code
of all versions can be downloaded on
[the GitHub repo](https://github.com/paritytech/parity-signer/releases).

The Polkadot Vault app is an air-gapped cold storage solution for all users, including developers
and power users. See [Ledger](./ledger.md) devices for other cold storage solutions.

:::

[Polkadot Vault](https://www.parity.io/technologies/signer) (formerly Parity Signer) is a cold
storage solution that allows you to use a phone in airplane mode as an air-gapped wallet. The Vault
app is not technically a wallet, as it does not allow to transfer funds. It is more of a key-chain
tool that will enable you the create, manage, and restore accounts.

By default, the Vault app contains chain specifications for Polkadot, Kusama, and Westend. Metadata
updates are possible via a [QR code fountain](https://metadata.parity.io/#/polkadot). It is also
possible to [add other Substrate-based chains and do metadata updates](#add-chains) for those. The
app allows you to securely sign [extrinsics](../learn/learn-extrinsics.md) via QR codes without
exposing your private keys to the internet.

## Vault vs. Ledger

The Polkadot Vault and [Ledger](./ledger.md) are cold storage solutions because private keys of
accounts created on the Vault app or Ledger device are not stored on your computer or, more in
general, on a device that has an internet connection. However, the two solutions differ, and you
should consider one or the other depending on your user type.

|                                                                                                             Ledger                                                                                                             |                                                                                                                                                                                                                                                                                     Polkadot Vault                                                                                                                                                                                                                                                                                     |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|              Hardware designed to stay offline and be secure. Certified by French cybersecurity agency [ANSSI](https://www.ssi.gouv.fr/en/cybersecurity-in-france/the-national-cybersecurity-agency-of-france/).               |                                                                                                                                                                                                                         Hardware not designed to stay offline. The user must switch off all inbound and outbound connections (network, wifi, Bluetooth, NFC).                                                                                                                                                                                                                          |
|        Hardware is resistant to side-channel attacks via [Secure Element](https://www.ledger.com/academy/security/the-secure-element-whistanding-security-attacks/). The secure element will destroy itself if opened.         |                                                                                                                                                                                                   Although there is no wired connection, side-channel attacks are possible. Without a secure element, the phone can be opened, and the keys will be accessible in its storage unit.                                                                                                                                                                                                    |
|                                                                                        Accounts derived from one mnemonic seed phrase.                                                                                         | One mnemonic for each account or one mnemonic for multiple accounts via [account derivation](../learn/learn-account-advanced.md#derivation-paths) or default [Substrate address format](../learn/learn-account-advanced.md#address-format). See [this support article](https://support.polkadot.network/support/solutions/articles/65000103707-can-i-use-the-same-account-on-polkadot-kusama-and-parachains-#Should-I-use-the-same-account-across-different-chains?) for information on whether to use the same account or different accounts on different chains based on your needs. |
|                                                                          Easy firmware and application upgrades through the Ledger Live application.                                                                           |                                                                                                                    The app should never be connected to the internet after installation, so the version installed on the phone should not be updated directly. For [app upgrades](#update-the-vault-app), users must factory reset the phone and recover all accounts through seed phrases. Metadata updates for each chain must be done via the QR code fountain.                                                                                                                     |
|                                                                                          Currently, not all parachains are supported.                                                                                          |                                                                                                                                                                                                   Users can add all parachains either through a third-party provider or if they have the wss endpoint and know [how to extract the chain specifications and metadata](#add-chains).                                                                                                                                                                                                    |
| Ledger app updates on Ledger Live sometimes lag behind chain updates resulting in users only being able to transact if they [install developer versions](./ledger.md#install-the-developer-release) (only for advanced users). |                                                                                                                                                                                  Metadata updates are always available to install once released, either through the third-party provider or manually. In this case, the installation process requires familiarity with working on the command prompt.                                                                                                                                                                                  |

## Create and Import Accounts

You can create a new account directly within the Vault app (Add Key Set > Add new Key Set). This
will generate a new mnemonic seed phrase on the app. Alternatively, you can import a new account in
the app using a seed phrase generated elsewhere with a compatible account generation scheme. For
example, you can have an air-gapped laptop with the Subkey tool installed and generate a new account
there. The seed phrase of that account can be imported into the Vault App (Add Key Set > Recover Key
Set).

We recommend importing a Vault account into the
[Polkadot-JS Browser Extension](./polkadotjs.md#polkadot-js-extension) or
[Parity Signer Companion](https://chrome.google.com/webstore/detail/parity-signer-companion/damllfnhhcbmclmjilomenbhkappdjgb).
Alternatively, you can import a Vault account directly into the Polkadot-JS UI but keep in mind that
clearing the cache of your browser will remove those accounts (this will not happen for accounts
imported into an extension). See the instructions in
[this article](https://support.polkadot.network/support/solutions/articles/65000184076-polkadot-vault-how-to-create-an-account)
to learn more about creating Vault accounts, and
[this article](https://support.polkadot.network/support/solutions/articles/65000184118-polkadot-vault-how-to-add-your-account-on-polkadot-js-ui)
on how to import them to the Polkadot extension or Polkadot-JS UI.

:::info

Importing an account into an extension will not import its private key. Only the public key will be
imported and you must sign using your air-gapped phone which holds the private key.

:::

## Signing Extrinsics

Remember to always check for metadata updates before signing transactions. See
[this article](https://github.com/w3f/polkadot-wiki/pull/4600/files#diff-5d4d0a286cdc7b1d016ee155f9694dbcddc13f5264490fc1a960c38000baca4d)
to learn how to sign transactions and
[this article](https://support.polkadot.network/support/solutions/articles/65000184128-polkadot-vault-how-to-add-a-new-chain-and-update-the-metadata)
on how to easily add new chains and do metadata updates using the Vault app.

The procedure to sign transactions with the Vault app is as follows:

- The wallet or browser extension will show a QR code encoding the information about what you are
  going to sign.
- After scanning the QR code with the Vault app, you will be presented with decoded information
  about what you will sign. Make sure the information matches what you intended to sign in the first
  place. If something does not feel right, do not sign. Check
  [this page](../learn/learn-extrinsics.md#corrupted-qr-code-parity-signer) for more information and
  contact [the Polkadot Support Team](https://support.polkadot.network/support/home).
- If the information shown by the Vault app is correct, you can present the QR code (signature) to
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

To securely update the Polkadot Vault app follow the instructions
[here](https://paritytech.github.io/parity-signer/tutorials/Upgrading.html). Briefly,

- backup your accounts (Backup key Set > write down the mnemonic seed phrase),
- factory reset your Vault app (Settings > Wipe all Data),
- factory reset your phone,
- re-install the Vault app,
- go offline (airplane mode, no wifi),
- recover your accounts (Add Key Set > Recover Key Set).

## Security Notes

The Vault app has a Log that will tell you all activities performed with it. It is important to mark
down the last action, you did so that you can do a security check the next time you use the app.
Also, the Vault app will always tell you if the phone has been (even briefly) connected to the
Internet. In case of an unrecognized connection, it is recommended to:

- Backup your accounts (i.e. make sure you have the mnemonic seed phrases)
- Follow the steps in [Update the Vault app](#update-the-vault-app)
- Once offline, create a new account on the Vault app
- Import the compromised accounts and transfer the funds to the new non-compromised account.

:::danger The Vault App has the option to export private keys

If an account's private key has been exported from the Vault app, the public key will be marked as
"hot" and the following message will be displayed _This key is marked hot because its root private
key has been exported_.

:::

You might consider exporting the private key if you are switching air-gapped phone. If you choose to
export your private key, avoid the following:

- Do not export your private key to a device that is connected to the internet, as your key will not
  be "cold" anymore.
- Do not print private keys QR codes over an internet connection.

## Add Chains

The Vault app contains default chain specs for Polkadot, Kusama, and Westend. It is possible to add
more chains via QR-code, and update their metadata by generating your own QR-code fountain in a
metadata portal similar to that [signed by Parity](https://metadata.parity.io/#/polkadot).
Alternatively, you can use a third-party provider to add chains and their metadata. Check
[this article](https://support.polkadot.network/support/solutions/articles/65000184128-polkadot-vault-how-to-add-a-new-chain-and-update-the-metadata)
for detailed instructions. If you choose this approach, you should trust the provider you choose.

:::info Advanced How-to Guides

See the [advanced guides](../learn/learn-vault-guides.md) for more information about how to add
chain specification and do metadata updates yourself.

:::
