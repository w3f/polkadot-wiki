---
id: learn-assets
title: Assets on Polkadot
sidebar_label: Assets on Polkadot
description: Learn about fungible and non-fungible assets in the Polkadot network.
slug: ../learn-assets
---

Assets in the {{ polkadot: Polkadot :polkadot }} {{ kusama: Kusama :kusama }} network can be 
represented on several chains. They can also take many forms, from a parachain's native token 
to on-chain representations of off-chain reserves. This page focuses on the latter, namely assets 
that would be issued by a creator (e.g. rights to audited, off-chain reserves held by the creator, 
or art issued as an NFT).

The {{ polkadot: [Statemint parachain](https://www.parity.io/blog/statemint-generic-assets-chain-proposing-a-common-good-parachain-to-polkadot-governance/) :polkadot }} 
{{ kusama: Statemine :kusama }} hosts data structures and logic that
specialize in the creation, management, and use of assets in the {{ polkadot: Polkadot :polkadot }} 
{{ kusama: Kusama :kusama }} network. Although other
parachains can host applications dealing with assets on {{ polkadot: Statemint, Statemint :polkadot }} 
{{ kusama: Statemine, Statemine :kusama }} can be thought of as the "home base" of assets in the 
network.

{{ polkadot: Statemint uses DOT as its native token :polkadot }} 
{{ kusama: Statemine uses KSM as its native token :kusama }}. The chain yields its governance to
its respective Relay Chain, and has no inflation or rewards for collators. As a
[common good parachain](https://polkadot.network/blog/common-good-parachains-an-introduction-to-governance-allocated-parachain-slots/), {{ polkadot: Statemint has a trusted relationship with the Relay Chain, 
and as such can teleport DOT between itself and its Relay Chains. That is, DOT on Statemint is 
just as good as DOT on the Relay Chain. :polkadot }}
{{ kusama: Statemine has a trusted relationship with the Relay Chain, 
and as such can teleport KSM between itself and its Relay Chains. That is, KSM on Statemine is 
just as good as KSM on the Relay Chain. :kusama }}

{{ polkadot: Statemint :polkadot }} {{ kusama: Statemine :kusama }} does not support smart contracts. 
See the [Advanced](#advanced-techniques) section at the bottom for discussion on using proxy and multisig 
accounts to replicate oft used contract logic.

## Fungible Assets

Fungible assets are those that are interchangeable, i.e. one unit is equivalent to any other unit
for the purposes of claiming the underlying item. {{ polkadot: Statemint :polkadot }} 
{{ kusama: Statemine :kusama }} represents fungible assets in the 
[Assets pallet](https://crates.parity.io/pallet_assets/index.html). For those familiar with the
ERC20 standard, this pallet presents a similar interface. However, the logic is encoded directly in
the chain's runtime. As such, operations are not gas metered and instead are benchmarked upon every
release, leading to efficient execution and stable transaction fees.

### Creation and Management

Anyone on the network can create assets on {{ polkadot: Statemint as long as they can reserve the required
deposit of 100 DOT on Statemint. :polkadot }} {{ kusama: Statemine as long as they can reserve the required
deposit of 1 KSM on Statemine. :kusama }}. The network reserves the deposit on creation.
The creator also must specify a unique `AssetId`, an integer of type `u32`, to identify the asset.
The `AssetId` should be the canonical identifier for an asset, as the chain does not enforce
uniqueness of metadata like "name" and "symbol". The creator also must specify a minimum balance,
which will prevent accounts from having dust balances.

An asset class has a number of privileged roles. The creator of the asset automatically takes on all
privileged roles, but can reassign them after creation. These roles are:

- Owner
- Issuer
- Admin
- Freezer

The owner has the ability to set the accounts responsible for the other three roles, as well as set
asset metadata (e.g. name, symbol, decimals). The issuer can mint and burn tokens to/from addresses
of their choosing. The freezer can freeze assets on target addresses or the entire asset class. The
admin can make force transfers as well as unfreeze accounts of the asset class. **Always refer to
the reference documentation for certainty on privileged roles.**

An asset's details contains one field not accessible to its owner or admin team, that of asset
sufficiency. Only the network's governance mechanism can deem an asset as _sufficient._ A balance of
a non-sufficient asset (the default) can only exist on already-existing accounts. That is, a user
could not create a new account on-chain by transferring an insufficient asset to it; the account
must already exist by having more than the existential deposit {{ polkadot: in DOT :polkadot }} 
{{ kusama: in KSM :kusama }}. However, assets deemed _sufficient_ can instantiate accounts. In the 
future, _sufficient_ assets will be able to pay transaction fees, such that users can transact on 
{{ polkadot: Statemint without the need for DOT :polkadot }} 
{{ kusama: Statemine without the need for KSM :kusama }}.

### Using

Users have a very simple interface, namely the ability to transfer asset balances to other accounts
on-chain. As mentioned before, if the asset is not _sufficient,_ then the destination account must
already exist for the transfer to succeed.

The chain also contains a `transfer_keep_alive` function, similar to that of the Balances pallet,
that will fail if execution would kill the sending account.

{{ polkadot: Statemint :polkadot }} {{ kusama: Statemine :kusama }} also sweeps dust balances into transfers. 
For example, if an asset has a minimum balance of 10, and an account has a balance of 25, then an attempt 
to transfer 20 units would actually transfer all 25. 

### Application Development

{{ polkadot: Statemint :polkadot }} {{ kusama: Statemine :kusama }} 
provides an `approve_transfer`, `transfer_approved`, and `cancel_approval` interface.
Application developers can use this interface so that users can authorize the application to
effectuate transfers up to a given amount on behalf of an account.

### Cross-Chain Accounting

{{ polkadot: Statemint :polkadot }} {{ kusama: Statemine :kusama }} uses a reserve-backed system to 
manage asset transfers to other parachains. It tracks how much of each asset has gone to each parachain, 
and will not accept more back from a particular parachain.

As a result of this, asset owners can use {{ polkadot: Statemint :polkadot }} {{ kusama: Statemine :kusama }} 
to track information like the total issuance of their asset in the entire network, as parachain balances would 
be included in the reserve-backed table. Likewise, for the minting and burning of tokens, an asset's team can 
perform all operations on {{ polkadot: Statemint :polkadot }} {{ kusama: Statemine :kusama }} and propagate any 
minted tokens to other parachains in the network.

Parachains that want to send assets to other parachains should do so via instructions to 
{{ polkadot: Statemint :polkadot }} {{ kusama: Statemine :kusama }} so that the reserve-backed 
table stays up to date. For more info, see the "Moving Assets between Chains in XCM" section of the
[article on XCM](https://polkadot.network/blog/xcm-the-cross-consensus-message-format/).

## Non-Fungible Assets

Unlike fungible assets, the particular instance of a non-fungible asset (NFT) has meaning separate
from another instance of the same class. {{ polkadot: Statemint :polkadot }} {{ kusama: Statemine :kusama }} 
represents NFTs in the [Uniques pallet](https://crates.parity.io/pallet_uniques/index.html).

Similar to the Assets pallet, this functionality is encoded into the chain. Operations are
benchmarked prior to each release in lieu of any runtime metering, ensuring efficient execution and
stable transaction fees.

### Creation and Management

{{ polkadot: Anyone on the network can create an asset class, as long as they reserve the required 
deposit of 100 DOT on Statemint:polkadot }} {{ kusama: Anyone on the network can create an asset class, 
as long as they reserve the required deposit of 1 KSM on Statemine :kusama }}

Creating instances of a class also requres a per-instance
deposit, unless the chain's governance designates the class as "free holding", allowing the class to
mint more instances without deposit. The creator must specify a `ClassId`, which, like its cousin
`AssetId`, should be the canonical identifier for the class.

The creator can also specify the same privileged roles of Owner, Admin, Issuer, and Freezer.

Asset classes and instances can have associated metadata. The metadata is an array of data that the
class Owner can add on-chain, for example a link to an IPFS hash or other off-chain hosting service.
The Uniques pallet also supports setting key/value pairs as attributes to a class or instance.

### Using

Users can transfer their NFTs to other accounts. The chain also provides an `approve_transfer`,
`transfer_approved`, and `cancel_approval` interface that application developers can use to allow
users to authorize an application to transfer an instance on their behalf.

## Advanced Techniques

Many asset creators on other networks use smart contracts to control privileged functions like
minting and burning. Although {{ polkadot: Statemint :polkadot }} {{ kusama: Statemine :kusama }} 
does not have a smart contract interface, it contains the
[Multisig](https://crates.parity.io/pallet_multisig/index.html),
[Proxy](https://crates.parity.io/pallet_proxy/index.html), and
[Utility](https://crates.parity.io/pallet_utility/index.html) pallets, which will meet most account
management needs.

For example, if a team wants sign-off from two groups to perform a privileged operation, it could
create a 2-of-2 multisig from two anonymous proxies, and then set members from each group as proxies
to those anonymous proxies.
