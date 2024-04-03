---
id: learn-assets
title: AssetHub
sidebar_label: AssetHub
description: Fungible Tokens and NFTs on Polkadot.
keywords: [assets, fungible, non-fungible, AssetHub, statemine, statemint]
slug: ../learn-assets
---

import RPC from "./../../components/RPC-Connection";

Assets in the {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} network can be
represented on several chains. They can take many forms, from a parachain's native token to on-chain
representations of off-chain reserves. This page focuses on the latter, namely assets issued by a
creator (e.g. rights to audited, off-chain reserves held by the creator, or art issued as an NFT).

The
[AssetHub system parachain](https://www.parity.io/blog/statemint-generic-assets-chain-proposing-a-common-good-parachain-to-polkadot-governance/)
hosts data structures and logic that specialize in the creation, management, and use of assets in
the {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} network. Although other
parachains can host applications dealing with assets on the AssetHub, the hub can be thought of as
the "home base" of assets in the network.

The AssetHub uses {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} as its native token. The
chain yields its governance to its parent Relay Chain and has no inflation or era-based rewards for
collators (although collators receive a portion of transaction fees). As a
[system parachain](https://polkadot.network/blog/common-good-parachains-an-introduction-to-governance-allocated-parachain-slots/),
the AssetHub has a trusted relationship with the Relay Chain, and as such, can teleport
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} between itself and the Relay Chain. That is,
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} on the AssetHub is just as good as
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} on the Relay Chain.

The AssetHub does not support smart contracts. See the [Advanced](#advanced-techniques) section at
the bottom for a discussion on using proxy and multisig accounts to replicate oft-used contract
logic.

## Creation and Management

:::info Walk-through video tutorial about creating assets

See
[this technical explainer video](https://youtu.be/knNLZEyposM?list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&t=63)
to learn how to create fungible assets on the AssetHub.

:::

Anyone on the network can create assets on the AssetHub as long as they can reserve the required
deposit of
{{ polkadot: <RPC network="statemint" path="consts.assets.assetDeposit" defaultValue={100000000000} filter="humanReadable"/> :polkadot }}
{{ kusama: <RPC network="statemine" path="consts.assets.assetDeposit" defaultValue={100000000000} filter="humanReadable"/> :kusama }}
and around
{{ polkadot: <RPC network="statemint" path="consts.assets.metadataDepositBase" defaultValue={668933304} filter="humanReadable"/> :polkadot }}
{{ kusama: <RPC network="statemine" path="consts.assets.metadataDepositBase" defaultValue={668933304} filter="humanReadable"/> :kusama }}
for the metadata. The network reserves the deposit on creation. The creator also must specify a
unique `AssetId`, an integer of type `u32`, to identify the asset. The `AssetId` should be the
canonical identifier for an asset, as the chain does not enforce the uniqueness of metadata like
"name" and "symbol". The creator must also specify a minimum balance, preventing accounts from
having dust balances.

:::info Advanced How-to Guides

See [this page](./learn-guides-assets-create.md) to learn more about creating assets using the Asset
Hub.

:::

Asset classes and instances can have associated metadata. The metadata is an array of data that the
class owner can add on-chain, for example, a link to an IPFS hash or other off-chain hosting
service. The [Uniques pallet](./learn-nft-pallets.md#uniques-pallet) also supports setting key/value
pairs as attributes to a class or instance.

An asset class has several privileged roles. The asset creator automatically takes on all privileged
roles but can reassign them after creation. These roles are:

- The **owner** can set the accounts responsible for the other three roles and set asset metadata
  (e.g. name, symbol, decimals).
- The **issuer** can mint and burn tokens to/from their chosen addresses.
- The **admin** can make force transfers as well as unfreeze accounts of the asset class.
- The **freezer** can freeze assets on target addresses or the entire asset class.

Always refer to the [**reference documentation**](https://crates.parity.io/pallet_assets/index.html)
for certainty on privileged roles.

An asset's details contain one field not accessible to its owner or admin team, **asset
sufficiency**. Only the network's governance mechanism can deem an asset as _sufficient_. A balance
of a non-sufficient asset can only exist on accounts that are on-chain (i.e. accounts having the
existential deposit of a sufficient asset). That is, a user could not keep an account on-chain by
transferring an insufficient asset to it; the account must already be on-chain by having more than
the existential deposit in {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} (or a sufficient
asset). However, assets deemed _sufficient_ can instantiate accounts and pay for transaction fees,
such that users can transact on the AssetHub without the need for
{{ polkadot: DOT. :polkadot }}{{ kusama: KSM. :kusama }}

:::info Transaction Fees on Polkadot-JS UI

Polkadot-JS UI
[doesn't support the functionality to pay with a sufficient asset yet](https://github.com/polkadot-js/apps/issues/7812).
When using Polkadot-JS UI, transaction fee needs to be paid in
{{ polkadot:  DOT :polkadot }}{{ kusama: KSM :kusama }}.

:::

## Fungible Assets

Fungible assets are interchangeable, i.e. one unit is equivalent to any other unit to claim the
underlying item. The AssetHub represents fungible assets in the Assets pallet. This pallet presents
a similar interface for those familiar with the ERC20 standard. However, the logic is encoded
directly in the chain's runtime. As such, operations are not gas-metered but benchmarked upon every
release, leading to efficient execution and stable transaction fees.

### Transferring Asset Balances

:::info Walk-through video tutorial about transferring assets

See
[this technical explainer video](https://youtu.be/knNLZEyposM?list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&t=326)
to learn how to transfer assets on the AssetHub.

For Ledger users see [this video tutorial](https://youtu.be/j0O-KziV9iw) to learn how to use the
Statemine Ledger app and what its current limitations are.

:::

Users have a simple interface, namely the ability to transfer asset balances to other accounts
on-chain. As mentioned before, if the asset is not _sufficient_, then the destination account must
already exist for the transfer to succeed.

The chain also contains a `transfer_keep_alive` function, similar to that of the Balances pallet,
that will fail if execution kills the sending account.

The AssetHub also sweeps dust balances into transfers. For example, if an asset has a minimum
balance of 10 and an account has a balance of 25, then an attempt to transfer 20 units would
transfer all 25.

:::warning Non-sufficient assets

Before transferring a non-sufficient asset, ensure the receiver account has enough funds to cover
the existential deposit and transaction fees for future transfers. Failing to do so will cause the
asset transfer to fail. The transfer will be successful for sufficient assets, but without
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} tokens, you will not be able to transfer
those assets from the receiver account through Polkadot-JS UI. The feature request to
[enable sufficient assets for transaction fee payment on Polkadot-JS UI](https://github.com/polkadot-js/apps/issues/7812)
is yet to be implemented.

:::

:::info

See
[this support article](https://support.polkadot.network/support/solutions/articles/65000181118-how-to-transfer-tether-usdt-on-statemine)
to learn more about transferring assets using the AssetHub.

:::

### Destroying an Asset

:::info Walk-through video tutorial about destroying assets

See
[this technical explainer video](https://youtu.be/knNLZEyposM?list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&t=422)
to learn how to destroy assets on the AssetHub.

:::

To destroy an asset, go to the Polkadot-JS UI on the AssetHub > Developer > Extrinsics. If you
created an asset without minting any unit, you could call `assets.startDestroy` and then the
`assets.finishDestroy` extrinsics specifying the asset id you want to destroy. If you created an
asset and minted some units, follow the steps below:

- `assets.freezeAsset` will freeze all assets on all accounts holding that asset id. Those accounts
  will no longer be able to transfer that asset.
- `assets.startDestroy` will start the destroying process.
- `assets.destroyApprovals` will destroy all approvals related to that asset id (if there are any
  approvals).
- `assets.destroyAccounts` will destroy all accounts related to that asset id. All asset units will
  be removed from those accounts.
- `assets.finishDestroy` will finish the destroying process. The asset id will be removed and
  available for another fungible token.

### Application Development

The AssetHub provides an `approve_transfer`, `transfer_approved`, and `cancel_approval` interface.
Application developers can use this interface so that users can authorize the application to
effectuate transfers up to a given amount on behalf of an account.

### Cross-Chain Accounting

The AssetHub uses a reserve-backed system to manage asset transfers to other parachains. It tracks
how much of each asset has gone to each parachain and will not accept more from a particular
parachain.

As a result of this, asset owners can use the AssetHub to track information like the total issuance
of their asset in the entire network, as parachain balances would be included in the reserve-backed
table. Likewise, for the minting and burning of tokens, an asset's team can perform all operations
on the AssetHub and propagate any minted tokens to other parachains in the network.

Parachains that want to send assets to other parachains should do so via instructions to the Asset
Hub so that the reserve-backed table stays up to date. For more info, see the "Moving Assets between
Chains in XCM" section of the
[article on the XCM format](https://polkadot.network/blog/xcm-the-cross-consensus-message-format/).

## Non-Fungible Assets

Unlike fungible assets, the particular instance of a [non-fungible asset (NFT)](./learn-nft.md) has
a separate meaning from another instance of the same class. The AssetHub represents NFTs in the
[Uniques and NFTs pallets](./learn-nft-pallets.md).

Similar to the Assets pallet, this functionality is encoded into the chain. Operations are
benchmarked before each release instead of any runtime metering, ensuring efficient execution and
stable transaction fees.

### Transferring NFTs

Users can transfer their NFTs to other accounts. The chain also provides an `approve_transfer`,
`transfer_approved` and `cancel_approval` interfaces that application developers can use to allow
users to authorize an application to transfer an instance on their behalf.

## Advanced Techniques

Many asset creators on other networks use smart contracts to control privileged functions like
minting and burning. Although the AssetHub does not have a smart contract interface, it contains the
[Multisig](https://crates.parity.io/pallet_multisig/index.html),
[Proxy](https://crates.parity.io/pallet_proxy/index.html), and
[Utility](https://crates.parity.io/pallet_utility/index.html) pallets, which will meet most account
management needs.

For example, if a team wants sign-off from two groups to perform a privileged operation, it could
create a 2-of-2 [**multisig**](./learn-account-multisig.md) from two
[**pure proxies**](./learn-proxies-pure.md#anonymous-proxy-pure-proxy), and then set members from
each group as proxies to those two accounts.
