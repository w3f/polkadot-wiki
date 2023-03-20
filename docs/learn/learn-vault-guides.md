---
id: learn-vault-guides
title: Vault How-to Guides
sidebar_label: Polkadot Vault
description: Learn about the Polkadot Vault
keywords: [parity signer, signer, polkadot vault]
slug: ../learn-vault-guides
---

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
