---
id: learn-guides-vault
title: Polkadot-JS Guides about the Vault App
sidebar_label: Polkadot Vault Guides
description: Polkadot-JS Guides about Polkadot Vault.
keywords: [parity signer, signer, polkadot vault, polkadot-js]
slug: ../learn-guides-vault
---

<!-- MessageBox -->
<div id="messageBox" class="floating-message-box">
  <p>
    Polkadot-JS is for developers and power users only. If you need help using the Polkadot-JS UI, you can contact the
    <a href="https://support.polkadot.network/support/home" target="_blank" rel="noopener noreferrer">
      Polkadot Support Team.
    </a>
  </p>
  <button class="close-messagebox" aria-label="Close message">✖</button>
</div>

!!!info These guides apply to both Parity Signer and Polkadot Vault apps.

## Sending a Transfer with the Vault App

!!!danger "Verifying Extrinsics"
    Visit the [**dedicated support page**](https://support.polkadot.network/support/solutions/articles/65000179161-how-can-i-verify-what-extrinsic-i-m-signing-#Verify-an-extrinsic-using-Ledger) and see [**this video tutorial**](https://youtu.be/bxMs-9fBtFk?t=360) tutorial to learn about how to verify extrinsics before signing them. The video will also mention potential attacks that can happen to you while signing for transactions.

General instructions to send a transfer can be found on
[this support page](https://support.polkadot.network/support/solutions/articles/65000170304-how-to-send-transfer-funds-out-of-your-dot-account-on-the-polkadot-js-ui).
To sign transactions with the Polkadot Vault app check
[this support article](https://support.polkadot.network/support/solutions/articles/65000182000-how-to-sign-a-transaction-in-parity-signer)
or see [this video tutorial](https://youtu.be/gbvrHzr4EDY?t=281).

## Import Vault Accounts into Polkadot-JS

See
[this support article](https://support.polkadot.network/support/solutions/articles/65000184118-polkadot-vault-how-to-add-your-account-on-polkadot-js-ui)
to import a Polkadot Vault account into the
[Polkadot-JS Browser Extension](../general/polkadotjs.md#polkadot-js-extension) or
[Parity Signer Companion](https://chrome.google.com/webstore/detail/parity-signer-companion/damllfnhhcbmclmjilomenbhkappdjgb).
Accounts added to those extensions will be injected into the Polkadot-JS UI.

## Do Your Own Chain Spec and Metadata Update

!!!danger "This section is for developers and power users only"
    By requesting the chain specification and metadata you trust the specific endpoint you are using (unless you are using you own node).

The following guide bases on the [Parity Signer](https://github.com/paritytech/parity-signer) Github
page (to create the Chain Spec QR code and the metadata QR code fountain) and
[Metadata Portal](https://github.com/paritytech/metadata-portal) Github page (to embed the Chain
Spec and Metadata into a portal).

### Chain Specification

#### Chain Spec QR

To add more chains on the Vault app you can follow the instructions
[here](https://paritytech.github.io/parity-signer/tutorials/Add-New-Network.html#add-network-specs).
In this example we will add the [Asset Hub](../learn/learn-assets.md) system parachain. Briefly,
fork the [Parity Signer GitHub repository](https://github.com/paritytech/parity-signer), start the
terminal within the `/generate_message` folder and type the following:

`cargo run add-specs -d -u wss://kusama-asset-hub-rpc.polkadot.io --encryption sr25519`

where `wss://kusama-asset.hub-rpc.polkadot.io` is the Parity RPC endpoint for the Asset Hub on
Kusama. This will create the file `sign_me_add_specs_statemine_sr25510` under the
`files/in_progress` folder. See all endpoints listed for
[Polkadot](https://github.com/polkadot-js/apps/blob/089fd77b14169749e35e073a93f7e7276963009c/packages/apps-config/src/endpoints/productionRelayPolkadot.ts)
and
[Kusama](https://github.com/polkadot-js/apps/blob/089fd77b14169749e35e073a93f7e7276963009c/packages/apps-config/src/endpoints/productionRelayKusama.ts)
on the Polkadot-JS UI.

#### Generating Signature

!!!danger "Use a hot account"
    Make sure that the account used to sign the chain specification is a hot account. Never use a cold account from the Vault app or Ledger, as after typing the seed phrase into the terminal that account will be considered hot.

Start the terminal within the `files/in_progress` folder and type the following:

`cat sign_me_add_specs_statemine_sr25519 | subkey sign --suri "YOUR SEED PHRASE"`

where `"YOUR SEED PHRASE"` is the seed phrase of the account that will be used to sign and
authenticate both the chain spec and later on the metadata. Running the code above will return a
signature similar to that below:

`0xc4ce72db959000b6166af96d3bda55a927fd837747bf1bf1ae8a69e57c9ef37c25a88707c47b105a9eb1fbcf9345680eff57eb978cf73919506f6c738834e78a`

#### Signing Chain Spec

Now, go back to the `/generate_message` folder and type the following:

`cargo run --release make --goal qr --crypto sr25519 --msg add-specs --payload sign_me_add_specs_statemine_sr25519 --verifier-hex PUBLIC KEY --signature-hex SIGNATURE`

where `PUBLIC KEY` is the public key of the account with seed `"YOUR SEED PHRASE"`, and `SIGNATURE`
is the signature generated in the previous step. Running the code above will create the file
`add_specs_statemine-sr25519` under the `files/completed` folder.

### Metadata Updates

Similarly to what we did for the chain specification, we now generate and sign the Asset Hub
metadata.

#### Metadata QR Fountain

To update the chain metadata for the Asset Hub specs on the Vault app you can follow the
instructions
[here](https://paritytech.github.io/parity-signer/tutorials/Add-New-Network.html#add-network-metadata).
Briefly, in the Parity Signer repository, start the terminal within the `/generate_message` folder
and type the following:

`cargo run load-metadata -d -u wss://kusama-asset-hub-rpc.polkadot.io`

where `wss://kusama-asset-hub-rpc.polkadot.io` is the Parity RPC endpoint for the Asset Hub on
Kusama. This will create the file `sign_me_load_metadata_statemineV9370` under the
`files/in_progress` folder. Note that for future metadata updates the file name will change as the
version at the time of writing was `V9370`.

!!!info
    Note that the name of the file changes according to the network version. That is, `????` in `sign_me_load_metadata_statemineV????` will be the latest version at fetch time.

#### Generating Signature

!!!danger "Use a hot account"
    Make sure that the account used to sign the metadata is a hot account. Never use a cold account from the Vault app or Ledger, as after typing the seed phrase into the terminal that account will be considered hot.

Start the terminal within the `files/in_progress` folder and type the following:

`cat sign_me_load_metadata_statemineV9370 | subkey sign --suri "YOUR SEED PHRASE"`

where `"YOUR SEED PHRASE"` is the seed phrase of the account you used to sign the chain
specification. Running the code above will return a signature similar to that below:

`0xde1ad7aeb252acb3cf42a522dcc8dc3f317a49be2ed636836dd6df8f7e47135f2c712480055822eba87e9ea5ac7d3bba96045992ae795856fdf4eea09a411f85`

!!!info "Do not copy the code lines above"
    Note that the name of the file changes according to the network version. That is, `????` in `sign_me_load_metadata_statemineV????` will be the latest version at fetch time. So, do not copy the code line above, but change the version with the appropriate one saved under the `files/in_progress` folder. The signature changes as well.

#### Signing Metadata

Now, go back to the `/generate_message` folder and type the following:

`cargo run --release make --goal qr --crypto sr25519 --msg load-metadata --payload sign_me_load_metadata_statemineV9370 --verifier-hex PUBLIC KEY --signature-hex SIGNATURE`

where `PUBLIC KEY` is the public key of the account with seed `"YOUR SEED PHRASE"`, and `SIGNATURE`
is the signature generated in the previous step. Running the code above will create the file
`load_metadata_statemineV9370` under the `files/completed` folder.

### Add Chain & Update Metadata

You can open `add_specs_statemine-sr25519` on your browser (just drag the file on an open tab). This
is a .png file containing the QR code to add the Asset Hub chain specification into the Vault App.
You can do the same with the `load_metadata_statemineV9370`. This is a .apng file containing the QR
code fountain to do the metadata update for the Asset Hub on Kusama.

### Metadata Portal

#### Modify `config` File

Alternatively, you can add the chain specification QR code and the metadata QR code fountain in a
metadata portal. Briefly, fork the
[Parity's Metadata Portal GitHub repository](https://github.com/paritytech/metadata-portal). You can
modify the following fields of the `config.toml` file:

- `name`: your name / institution
- `public_key`: the public key of the account you use to sign the chain spec and the metadata.
- At the bottom of the file add the following information:

```
[[chains]]
name = "Statemine"
title = "Kusama Asset Hub"
rpc_endpoint = "wss://kusama-asset-hub-rpc.polkadot.io"
color = "#f27230"

[chains.github_release]
owner = "paritytech"
repo = "statemint"
genesis_hash = "0x48239ef607d7928874027a43a67689209727dfb3d3dc5e5b03a39bdc2eda771a"
```

For each additional chain, you need to add the respective information. Information about the genesis
hash can be found on the Polkadot-JS UI > connect to the relevant chain > Developer > Chain State.

#### Rename Chain's Files

Rename the signed chain specification and metadata files as follow:

- Chain specification: `add_specs_statemine-sr25519` --> `statemine_specs.png`

- Metadata updates: `load_metadata_statemineV9370`--> `statemine_metadata_9370.apng`

Thus, for chain specification the file must be renamed to `chainName_specs.png` while for metadata
the file must be renamed to `chainName_metadata_version.apng` where `chainName` is the name of the
chain and `version` is the version of the metadata.

Add the renamed files to the `/public/qr folder` within the Metadata Portal repository.

#### Run Portal

Open the terminal within the Metadata Portal repository and run `make updater`. Then run
`make collector`; this will create the `_latest.apng` files for each of the chains (removed by the
command `make cleaner`). Finally, run `yarn start` to load the metadata portal on your localhost.
