---
id: learn-assets
title: Asset Hub
sidebar_label: Asset Hub
description: Fungible Tokens and NFTs on Polkadot.
keywords: [assets, fungible, non-fungible, asset hub, statemine, statemint]
slug: ../learn-assets
---

Assets in the Polkadot ecosystem can be represented on several chains. They can take many forms,
from a parachain's native token to on-chain representations of off-chain reserves. This page focuses
on the latter, namely assets issued by a creator (e.g. rights to audited, off-chain reserves held by
the creator, or art issued as an NFT).

The
[Asset Hub system parachain](https://www.parity.io/blog/statemint-generic-assets-chain-proposing-a-common-good-parachain-to-polkadot-governance/)
hosts data structures and logic that specialize in the creation, management, and use of assets in
the network. Although other parachains can host applications dealing with assets on the Asset Hub,
the hub can be thought of as a trusted "home base" of assets in the network.

The Asset Hub uses the relay chain's native token. The chain yields its governance to its parent
relay chain and has no inflation or era-based rewards for collators (although collators receive a
portion of transaction fees). As a [system parachain](./learn-system-chains.md), the Asset Hub has a
trusted relationship with the relay chain, and as such, can teleport the relay chain's native token
between itself and the relay chain. That is, the native token on the relay chain is just as good on
Asset Hub.

The Asset Hub does not support smart contracts. See the [Advanced](#advanced-techniques) section at
the bottom for a discussion on using proxy and multisig accounts to replicate oft-used contract
logic.

## Sufficient Assets

A sufficient asset on Asset Hub can allow for an account to exist on-chain even though it does not
have any account balance in the native asset. Any registered asset on the Asset Hub can be made
_sufficient_ through governance on the relay chain. A balance of a non-sufficient asset can only
exist on accounts that are on-chain (i.e., accounts having the
[existential deposit](./learn-accounts.md#existential-deposit-and-reaping) of a sufficient asset).
That is, a user could not keep an account on-chain by transferring a non-sufficient asset to it; the
account must already be on-chain by having more than the existential deposit in native asset (or a
sufficient asset).

Assets deemed _sufficient_ can instantiate accounts on the Asset Hub and pay for transaction fees
without the need for the native token (DOT or KSM). An example would be USDT on the Polkadot Asset
Hub. If an account holds 0.7 USDT, it would exist on the Polkadot Asset Hub system parachain without
the need to hold DOT.

!!!warning "Transfers of Non-sufficient assets"
    Before transferring a non-sufficient asset, ensure the receiver account has enough funds to cover the existential deposit and transaction fees for future transfers. Please do so to ensure the asset transfer is successful.

## Asset Conversion

[An asset conversion pallet](https://paritytech.github.io/polkadot-sdk/master/pallet_asset_conversion/index.html)
is deployed on AssetHub with Uniswap V2-style functionality. It implements a simple AMM (automated
market maker), which employs a mathematical formula to determine the price of a token based on its
ratio within the liquidity pool.

This pallet enables fees to be paid in any asset that has corresponding liquidity (in DOT/KSM) on
AssetHub. Learn more about asset conversion on AssetHub,
[including guides on how to use it here.](./learn-asset-conversion-assethub.md)

## Create and Manage Assets

!!!info "Walk-through video tutorial about creating assets"
    See [this technical explainer video](https://youtu.be/knNLZEyposM?list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&t=63) to learn how to create fungible assets on the Asset Hub.

Anyone on the network can create assets on the Asset Hub as long as they can reserve the
[required deposits](../general/chain-state-values.md#asset-deposit). The network reserves the
deposit on creation. The creator also must specify a unique `AssetId`, an integer of type `u32`, to
identify the asset. The `AssetId` should be the canonical identifier for an asset, as the chain does
not enforce the uniqueness of metadata like "name" and "symbol". The creator must also specify a
minimum balance, preventing accounts from having dust balances.

!!!info "Advanced How-to Guides"
    See [this page](./learn-guides-assets-create.md) to learn more about creating assets using the Asset Hub.

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

An asset's details contain one field not accessible to its owner or admin team,
[asset sufficiency](#sufficient-assets).

!!!info "Transaction Fees on Polkadot-JS UI"
    Polkadot-JS UI [doesn't support the functionality to pay with a sufficient asset yet](https://github.com/polkadot-js/apps/issues/7812). When using Polkadot-JS UI, transaction fee needs to be paid using the native asset (DOT or KSM).

## Fungible Assets

Fungible assets are interchangeable, i.e. one unit is equivalent to any other unit to claim the
underlying item. The Asset Hub represents fungible assets in the Assets pallet. This pallet presents
a similar interface for those familiar with the ERC20 standard. However, the logic is encoded
directly in the chain's runtime. As such, operations are not gas-metered but benchmarked upon every
release, leading to efficient execution and stable transaction fees.

### Transferring Asset Balances

!!!info "Walk-through video tutorial about transferring assets"
    See [this technical explainer video](https://youtu.be/knNLZEyposM?list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&t=326) to learn how to transfer assets on the Asset Hub.

For Ledger users see [this video tutorial](https://youtu.be/j0O-KziV9iw) to learn how to use the
Statemine Ledger app and what its current limitations are.

Users have a simple interface, namely the ability to transfer asset balances to other accounts
on-chain. As mentioned before, if the asset is not _sufficient_, then the destination account must
already exist for the transfer to succeed.

The chain also contains a `transfer_keep_alive` function, similar to that of the Balances pallet,
that will fail if execution kills the sending account.

The Asset Hub also sweeps dust balances into transfers. For example, if an asset has a minimum
balance of 10 and an account has a balance of 25, then an attempt to transfer 20 units would
transfer all 25.

!!!info
    See [this support article](https://support.polkadot.network/support/solutions/articles/65000181118-how-to-transfer-tether-usdt-on-statemine) to learn more about transferring assets using the Asset Hub.

### Destroying an Asset

!!!info "Walk-through video tutorial about destroying assets"
    See [this technical explainer video](https://youtu.be/knNLZEyposM?list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&t=422) to learn how to destroy assets on the Asset Hub.

To destroy an asset, go to the Polkadot-JS UI on the Asset Hub > Developer > Extrinsics. If you
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

The Asset Hub provides an `approve_transfer`, `transfer_approved`, and `cancel_approval` interface.
Application developers can use this interface so that users can authorize the application to
effectuate transfers up to a given amount on behalf of an account.

### Cross-Chain Accounting

The Asset Hub uses a reserve-backed system to manage asset transfers to other parachains. It tracks
how much of each asset has gone to each parachain and will not accept more from a particular
parachain.

As a result of this, asset owners can use the Asset Hub to track information like the total issuance
of their asset in the entire network, as parachain balances would be included in the reserve-backed
table. Likewise, for the minting and burning of tokens, an asset's team can perform all operations
on the Asset Hub and propagate any minted tokens to other parachains in the network.

Parachains that want to send assets to other parachains should do so via instructions to the Asset
Hub so that the reserve-backed table stays up to date. For more info, see the "Moving Assets between
Chains in XCM" section of the
[article on the XCM format](https://polkadot.network/blog/xcm-the-cross-consensus-message-format/).

## Non-Fungible Assets

Unlike fungible assets, the particular instance of a [non-fungible asset (NFT)](./learn-nft.md) has
a separate meaning from another instance of the same class. The Asset Hub represents NFTs in the
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
minting and burning. Although the Asset Hub does not have a smart contract interface, it contains
the [Multisig](https://crates.parity.io/pallet_multisig/index.html),
[Proxy](https://crates.parity.io/pallet_proxy/index.html), and
[Utility](https://crates.parity.io/pallet_utility/index.html) pallets, which will meet most account
management needs.

For example, if a team wants sign-off from two groups to perform a privileged operation, it could
create a 2-of-2 [**multisig**](./learn-account-multisig.md) from two
[**pure proxies**](./learn-proxies-pure.md), and then set members from
each group as proxies to those two accounts.
