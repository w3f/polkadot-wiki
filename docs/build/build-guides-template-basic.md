---
id: build-guides-template-basic
title: Template to Core - Setup & Initial Deployment
sidebar_label: Template to Core - Basics
description: Introduction to the Polkadot SDK
keywords: [coretime, blockspace, parathread, parachain, cores, coretime, agile]
slug: ../build-guides-template-basic
---

:::warning This guide uses Rococo!

This guide is using the Rococo testnet. The Kusama relay chain can also be used in place of Rococo,
as it has coretime implemented. Polkadot will implement agile coertime at a later date after it has
been tested on Kusama. This guide is considered a moving document - and will update as networks
which have coretime enabled become suitable candidates.

:::

This guide aims to get you up and running with the basics of:

- **Obtaining** coretime (bulk or on-demand)
- **Compiling** and configuring your first template
- **Deploying** your template on your procured core

## Getting ROC and Reserving a ParaId

Before starting to work with coretime, you'll need some funds to pay fees, reserve a
[ParaId](../general/glossary.md#paraid), and more.

Head over to Polkadot.js to reserve a [ParaId](../general/glossary.md#paraid). We'll need a ParaId
to upload our parachain's code:

1. Get the [Polkadot.js Web Extension.](https://polkadot.js.org/extension/)
2. Create a wallet, and get some [ROC via the faucet.](https://faucet.polkadot.io/) with your new
   address.
3. Go to the [Polkadot.js Web App](https://polkadot.js.org/apps/#), and make sure you select
   **Rococo** as your network via the tabs on the side
   [or visit this link to get to Rococo directly](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frococo-rpc.polkadot.io#/explorer)
4. Head to
   [Network > Parachains > Parathreads (the tab)](https://polkadot.js.org/apps/#/parachains/parathreads)
5. [Follow these instructions to reserve a ParaId.](../learn/learn-guides-coretime-parachains#reserve-paraid)

You can also visit the Accounts tab to view all registered accounts and their associated balances
within the Polkadot.js Extension. Once finished, you should see your new ParaId at the bottom of the
list within
[Network > Parachains > Parathreads](https://polkadot.js.org/apps/#/parachains/parathreads) with the
option to "Deregister" to the right:

![Registered ParaID in PolkadotJs](../assets/coretime/Coretime-ParaId-Registered.png)

## Creating our Chain & Generating Artifiacts

We can now move on to working with the template. Some important prerequisites are:

1. **Have** Rust and its associated tooling installed.
2. **Install** the nightly version.
3. **Have** a command line, git, and other common development tools at your disposal.

:::info Install dependencies

Visit [the dependencies' installation](./build-guides-install-deps.md) page before getting started.

:::

We need to clone the Polkadot SDK. This guide is using release
[`polkadot-v1.10.0`](https://github.com/paritytech/polkadot-sdk/releases/tag/polkadot-v1.10.0),
which can be cloned using the appropriate release tag:

```shell
git clone git@github.com:paritytech/polkadot-sdk.git --branch polkadot-v1.10.0 --single-branch
```

Now, navigate to `polkadot-sdk/templates/parachain`:

```bash
cd polkadot-sdk/templates/parachain
```

Open this in your code editor of choice. This template contains the necessary dependencies we need
to utilize a core.

### Using the Parachain Template

This tutorial won't go into the specifics of the template, nor will it go into the specifics of
FRAME and Substrate. All you need to know is the following:

- `runtime/` - Contains the runtime and business logic. This is your all of your pallets (runtime
  modules) are configured. The runtime is what gets uploaded to the core as a WebAssembly blob once
  its compiled.
- `node/` - The node implementation, which takes care of networking and the like. The genesis
  configuration (`chain_spec.rs`) is also located here.

> Pallets are essentially just Rust crates, which are imported as dependencies as seen in
> `runtime/Cargo.toml`. Read more about
> [pallets here.](https://paritytech.github.io/polkadot-sdk/master/polkadot_sdk_docs/polkadot_sdk/frame_runtime/index.html#pallets)

When we compile our template, we can extract the runtime code as a `.wasm` blob, which is one of the
key artifacts for our core.

For the sake of this example, we won't go into adding or modifying any pallets. However, this is
definitey a next step after you get used to deploying your parachain on Rococo!

### Getting our parachain live-ready

Before we generate our parachain's code, we have a bit of prep to do to our node inside
`node/src/chain_spec.rs`. Namely, there are a few main factors to check off our list:

1. **Make** sure that `relay_chain` is set to the target relay chain (`rococo`, in our case)
2. **Make** sure that `para_id` (right below `relay_chain`) is set to your reserved ParaId
3. **Make** sure that our `ChainType` is set to `ChainType::Live`
4. **Remove** all collators except for **one**, Alice. See the FAQ for why we do this (tldr; for
   simplicity's sake)
5. **Be** sure to also set the para id in `testnet_genesis`!
6. **Optionally**, change the name and id of your chain (mine is called "SomeChain" for the name,
   and "some_chain" for the id). My ticker symbol for the default token is called "SOME". **You may
   change this as you see fit.**

If you fail to do one of these, there is a large chance that your chain may fail to produce blocks.
Feel free to copy the below config, and use it to ensure everything is in place for a Rococo
deployment. This function should replace the `local_testnet_config` function within
`node/src/chain_spec.rs`:

> **:warning: WARNING! :warning:** Make sure you replace the ParaId with the one you reserved
> earlier!

```rust
pub fn local_testnet_config() -> ChainSpec {
    // Give your base currency a unit name and decimal places
    let mut properties = sc_chain_spec::Properties::new();
    properties.insert("tokenSymbol".into(), "SOME".into());
    properties.insert("tokenDecimals".into(), (12).into());
    properties.insert("ss58Format".into(), (42).into());

    #[allow(deprecated)]
    ChainSpec::builder(
        runtime::WASM_BINARY.expect("WASM binary was not built, please build it!"),
        Extensions {
            relay_chain: "rococo".into(),
            // You MUST set this to the correct network!
            para_id: YOUR_PARA_ID_HERE,
        }
    )
        .with_name("SomeChain")
        .with_id("some_chain")
        .with_chain_type(ChainType::Live)
        .with_genesis_config_patch(
            testnet_genesis(
                // initial collators.
                vec![
                    (
                        get_account_id_from_seed::<sr25519::Public>("Alice"),
                        get_collator_keys_from_seed("Alice"),
                    ),
                ],
                vec![
                    get_account_id_from_seed::<sr25519::Public>("Alice"),
                    get_account_id_from_seed::<sr25519::Public>("Bob"),
                    get_account_id_from_seed::<sr25519::Public>("Charlie"),
                    get_account_id_from_seed::<sr25519::Public>("Dave"),
                    get_account_id_from_seed::<sr25519::Public>("Eve"),
                    get_account_id_from_seed::<sr25519::Public>("Ferdie"),
                    get_account_id_from_seed::<sr25519::Public>("Alice//stash"),
                    get_account_id_from_seed::<sr25519::Public>("Bob//stash"),
                    get_account_id_from_seed::<sr25519::Public>("Charlie//stash"),
                    get_account_id_from_seed::<sr25519::Public>("Dave//stash"),
                    get_account_id_from_seed::<sr25519::Public>("Eve//stash"),
                    get_account_id_from_seed::<sr25519::Public>("Ferdie//stash")
                ],
                get_account_id_from_seed::<sr25519::Public>("Alice"),
                (YOUR_PARA_ID_HERE).into()
            )
        )
        .with_protocol_id("template-local")
        .with_properties(properties)
        .build()
}
```

Once this is in place, you are ready to compile your parachain.

### Generating the Runtime and Genesis

Be sure to first build the node using the following (assuming you're within
`polkadot-sdk/templates/parachain`):

```shell
cargo build -p parachain-template-node --release
```

```shell
../../target/release/parachain-template-node export-genesis-state genesis
```

```shell
../../target/release/parachain-template-node export-genesis-wasm genesis-wasm
```

Within `polkadot-sdk/templates/parachain`, you should now have two files:

- **`genesis`** - the initial state of your parachain.
- **`genesis-wasm`** - the initial runtime WebAssembly blob of your parachain.

## Starting to Sync - Running Your Collator

You should now start syncing your collator. Keep in mind that you will need to sync Rococo first -
this could take some time (12 hours to a day - depending on your download speed), so best to get
started ASAP. In order to avoid the storing the full state of the relay chain, be sure to run with
the appropriate pruning flags (`blocks-pruning` and `state-pruning`):

```shell
./../target/release/parachain-template-node --collator \
--alice \
--force-authoring \
--base-path  <your-base-path-here> \
-- \
--chain=rococo \
--sync fast-unsafe \
--blocks-pruning 256 \
--state-pruning 256
```

> **Fun fact**: This command really spins up _two_ nodes: your collator node for your parachain,
> along with an embedded relay chain node, hence the seperation in the command via `--`.

You should now see your relay chain syncing, reaching the same target that your target relay chain
is currently at:

```bash
2024-05-07 11:43:18 [Relaychain] ⚙️  Syncing 490.8 bps, target=#10342815 (9 peers), best: #10013784 (0x91d7…aeb2), finalized #10013704 (0x8556…e679), ⬇ 8.3MiB/s ⬆ 1.2kiB/s
```

## Create the Parathread

With your **`genesis`** and **`genesis-wasm`** created, you can now create your parathread. Head
back to
[Network > Parachains > Parathreads (the tab)](https://polkadot.js.org/apps/#/parachains/parathreads)
in PolkadotJS, and click _+ Parathread_ in the top right. Now, you can upload your runtime and
genesis accordingly:

1. Upload `genesis-wasm` in the `code` field
2. Upload `genesis` in the `initial state` field

![Upload chain artifacts](../assets/coretime/coretime-register-parathread.png)

Pay the deposit, and you're good to go! Keep in mind the parathread takes around **~2 hours** to
onboard. You can scroll down to your ParaId to see it onboarding, for example:

![Onboarding ParaId](../assets/coretime/coretime-parachain-onboarding.png)

## Procuring Coretime

> **Ideally, your node should be synced with the relay before this step.**

Procuring a core is easy with coretime marketplaces already available. Visit
[The Coretime Marketplaces](../learn/learn-guides-coretime-marketplaces.md) page to learn more about
them, and purchase a core!

We have two options:

1. [**Bulk**](../learn/learn-agile-coretime.md#bulk-coretime) - obtain a set amount of coretime in
   bulk (for Rococo, 7 days).
2. [**On-demand**](../learn/learn-agile-coretime.md#on-demand-coretime) - pay as we go for our block
   production.

With bulk coretime, we assign a core to our ParaId, and as long as that core is valid, our parachain
will produce blocks and finalize via Rococo until we have to renew the core.

It's worth noting that you can easily experiment using on-demand extrinsics, then later switch to a
bulk coretime model. For now, let's start with on-demand coretime to get our first blocks going.

**It is recommended that you first try an on-demand assignment, then move to a bulk assignment after
you confirm your chain can create blocks!**

### On-Demand Coretime

Provided your collator is synced, you can try creating a block using an on-demand extrinsic.

1. Head to [PolkadotJS > Extrinsics](https://polkadot.js.org/apps/#/extrinsics)
2. Issue the `onDemandAssignmentProvider.placeOrderAllowDeath` extrinsic
3. Set the `max_amount` to at least `1000000000000` and `paraId` to your ParaId.
4. As long as your collator is running, you should see your block height increase from 0 to 1!

![On-demand coretime assignment](../assets/coretime/coretime-on-demand-assignment.png)

### Bulk Coretime: Assigning your Core

If everything is working as intended, you can now choose to assign bulk coretime to your parachain
for persistent block generation. For this assignment,
[RegionX's CoreHub](https://app.regionx.tech/regions?network=rococo) will be used for purchasing and
assigning cores.

:::info Getting Coretime ROC

In the upper right, you will see two balances: one for the relay chain, and one for the coretime
chain. Before you can purchase a core, you need ROC on the coretime chain. RegionX includes a tool
for doing so:

1. Head to General > Cross Chain Transfer on the right, and transfer 10 ROC:

![Region X cross chain transfer](../assets/coretime/regionx-cross-chain-roc.png)

2. Sign the transaction with Polkadot.js. If all goes well, you should see the balance update in the
   upper right:

![Region X cross chain transfer](../assets/coretime/regionx-balance-change.png)

:::

1. Connect your wallet and make sure you select **Rococo** as your network:

![Connect your wallet to RegionX](../assets/coretime/coretime-regionx-connect-wallet.png)

2. Click **Purchase a Core** on the left:

![GMcdatDW8AEC8kh](https://hackmd.io/_uploads/r12b0mxMC.jpg)

3. In the lower right, click "Purchase Core":

![Purchase a core](../assets/coretime/regionx-purchase-bulk.png)

4. Go to **My Regions**, and click to select your region, then click **Assign** on the right side:

![Select and assign region](../assets/coretime/regionx-select-region.png)

5. Click **Add Task**, and input your ParaId along with a name for your chain:

![Add a new task](../assets/coretime/regionx-add-task.png)

6. Select your task, and select **Provisional Assignment**, and sign using Polkadot JS:

![Assign the core](../assets/coretime/regionx-assign-region.png)

7. Once the transaction is confirmed, provided everything is synced and your collator is running,
   you should see blocks being persistently created as they were with the on-demand extrinsic:

![GMcdatDW8AEC8kh](https://hackmd.io/_uploads/r12b0mxMC.jpg)

## What's Next?

Now that you have the ability to launch a layer one blockchain, the possibilities are endless:

- Setup a local development environment for your parachain
- Create a pallet
- [Take a look at the OpenZepplin template - which has a lot more pallets configured.](build-guides-coretime-start.md#openzepplin-templates--guides)
- Upgrade your network
