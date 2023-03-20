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

## Vault vs. Ledger

The Polkadot Vault and [Ledger](./ledger.md) are both cold storage solutions in a sense that private
keys of accounts created on the Vault App or Ledger are not stored on your computer or more in
general on a device that has internet connection.

> Comparison table

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

## Advanced

By default the Vault App contains chain specs for Polkadot, Kusama and Westend. It is possible to
add more chains via QR-code, and to update their metadata by generating your own QR-code fountain in
a metadata portal similarly to that [signed by Parity](https://metadata.parity.io/#/polkadot).

The following guide bases on the [Parity Signer](https://github.com/paritytech/parity-signer) Github
page (to create the Chain Spec QR code and the metadata QR code fountain) and
[Metadata Portal](https://github.com/paritytech/metadata-portal) Github page (to embed the Chain
Spec and Metadata into a portal).

### Chain Spec

To add more chains on the Vault app you can follow the instructions
[here](https://paritytech.github.io/parity-signer/tutorials/Add-New-Network.html#add-network-specs).
In this example we will add the Statemine parachain. Briefly, fork the Parity Signer GitHub
repository

RPC endpoint for Statemine:

folder `/generate_message`

`cargo run add-specs -d -u wss://statemine.api.onfinality.io/public-ws --encryption sr25519`

this will create the file `sign_me_add_specs_statemine_sr25510` under the `files/in_progress` folder

Sign the chain spec

folder `files/in_progress`

`cat sign_me_add_specs_statemine_sr25519 | subkey sign --suri "YOUR SEED PHRASE"`

where "YOUR SEED PHRASE" is the seed phrase of the account that will be used to sign and
authenticate the chain spec and later on the metadata

running the code above will return the signature below

`0xc4ce72db959000b6166af96d3bda55a927fd837747bf1bf1ae8a69e57c9ef37c25a88707c47b105a9eb1fbcf9345680eff57eb978cf73919506f6c738834e78a`

go back to the folder `/generate_message`

`cargo run --release make --goal qr --crypto sr25519 --msg add-specs --payload sign_me_add_specs_statemine_sr25519 --verifier-hex 6adee55cc1c1946db8d0a6ef14389c39db04935a70086a8a93c4d8535d92b07a --signature-hex 0xc4ce72db959000b6166af96d3bda55a927fd837747bf1bf1ae8a69e57c9ef37c25a88707c47b105a9eb1fbcf9345680eff57eb978cf73919506f6c738834e78a`

running the code above will create the file `add_specs_statemine-sr25519` under the
`files/completed` folder

### Metadata Updates

To update chain metadata on the Vault app you can follow the instructions
[here](https://paritytech.github.io/parity-signer/tutorials/Add-New-Network.html#add-network-metadata).
Briefly,

folder `/generate_message`

`cargo run load-metadata -d -u wss://statemine.api.onfinality.io/public-ws`

this will create the file `sign_me_load_metadata_statemineV9370` under the `files/in_progress`
folder

Sign the metadata

We will follow the same procedure we used to sign the chain spec, to sign the metadata file

folder `files/in_progress`

`cat sign_me_load_metadata_statemineV9370 | subkey sign --suri "YOUR SEED PHRASE"`

running the code above will return the signature below

`0xde1ad7aeb252acb3cf42a522dcc8dc3f317a49be2ed636836dd6df8f7e47135f2c712480055822eba87e9ea5ac7d3bba96045992ae795856fdf4eea09a411f85`

go back to the folder `/generate_message`

`cargo run --release make --goal qr --crypto sr25519 --msg load-metadata --payload sign_me_load_metadata_statemineV9370 --verifier-hex 6adee55cc1c1946db8d0a6ef14389c39db04935a70086a8a93c4d8535d92b07a --signature-hex 0xde1ad7aeb252acb3cf42a522dcc8dc3f317a49be2ed636836dd6df8f7e47135f2c712480055822eba87e9ea5ac7d3bba96045992ae795856fdf4eea09a411f85`

running the code above will create the file `load_metadata_statemineV9370` under the
`files/completed` folder

### Metadata Portal

You can open `add_specs_statemine-sr25519` on your browser (just drag the file on an open tab). This
is a .png file containing the QR code to add statemine into the Vault App. You can do the same thing
with the `load_metadata_statemineV9370`. This is a .apng file containing the QR code fountain to do
the metadata update for statemine.

Alternatively, you can add the chain spec and the metadata QR code fountain in a portal. See below

fork the metadata portal GitHub Repository

modify the coinfig.toml file

`name`

`public_key`

add info about the chain

```
[[chains]]
name = "statemine"
rpc_endpoint = "wss://statemine.api.onfinality.io/public-ws"
color = "#f27230"

[chains.github_release]
owner = "paritytech"
repo = "statemint"
genesis_hash = "0x48239ef607d7928874027a43a67689209727dfb3d3dc5e5b03a39bdc2eda771a"
```

the information about the genesis hash can be found

Renaming files

`add_specs_statemine-sr25519` --> `statemine_specs.png`

`load_metadata_statemineV9370`--> `statemine_metadata_9370.apng`

and add those to the `/public/qr folder`

run `make updater`

`make collector` --> this will create the \_latest.apng files for each of the chains (removed by
`make cleaner`)

`yarn start` to load the portal on your localhost
