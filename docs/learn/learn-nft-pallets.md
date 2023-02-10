---
id: learn-nft-pallets
title: NFT Pallets
sidebar_label: NFT Pallets
description: An overview of the functionalities of NFT Pallets in Polkadot Ecosystem.
keywords: [NFT, non-fungible token, NFT 2.0, nfts, NFT pallets]
slug: ../learn-nft-pallets
---

NFT [pallets](learn-extrinsics.md#pallets-and-extrinsics) allow developers to easily implement
NFT-related actions within their dApp.

## NFTs Pallet

### Current Implementations

NFTs is a [FRAME pallet](https://polkadot.js.org/docs/substrate/extrinsics#nfts) currently deployed
on Westmint, which provides a multitude of functions to interact with NFTs.

The pallet comes with a new way to configure NFTs, as well as configure collections and items.
Pallet-level [feature flags](https://github.com/paritytech/substrate/pull/12367) allow disabling
functionalities that are not needed in the runtime.

Some features are common to the NFT world, such as:

- Buying an item up for sale.
- Creating (i.e., mint) and burning (i.e., destroy) a collection of items or a single item (burning
  must be signed either by the admin of the collection or the owner). Creating an item usually
  involves setting some attributes specific to that item. Creating a collection also requires the
  specification of the maximum number of items.

  [Different settings](https://github.com/paritytech/substrate/pull/12483) are available for minting
  collections:

  - public mints: everyone can mint an asset in your collection (good for soul-bound collections)
  - external mint: only holders of NFTs in another collection can mint in your collection. This
    requires knowledge about the ID of the other collection. Collections IDs are auto-incremented.
    This avoids to loop through all existing collections spamming RPC nodes with requests to find
    out available IDs.
  - wave minting: mint X number of items that go to collection owners and Y number of items for the
    public
  - force mint: minting bypassing mint settings
  - change max supply until it gets locked: possibility to change the supply for a limited amount of
    times

  One can decide to modify the price of a collection's items as well as who can receive or buy those
  items. Time constraints are also available with `startBlock` and `endBlock` parameters. It is thus
  possible, for example, to create an automatic schedule in which holders of items in collection A
  will receive free NFTs from Collection X only within a specific time frame, after which holders of
  collection B will be able to buy NFTs from Collection X.

- [Smart attributes](https://github.com/paritytech/substrate/pull/12702) allow an NFT owner to grant
  permission to other entities (another account, an application, etc.) to update attributes of an
  NFT. An example could be that all Polkadot fellowship members have an NFT badge that gets updated
  over time (sort of a rank) with a consequent upgrade in membership permissions.
- A collection is managed by the
  [Issuer, the Admin and the Freezer](./learn-assets.md#creation-and-management). Those roles can be
  changed anytime, and there will be the option to attach
  [multiple accounts per role](https://github.com/paritytech/substrate/pull/12437).
- Setting metadata for an item or collection (metadata includes all essential information about the
  item or the collection)
- Setting or re-setting the price of an item.
- Clearing attributes and metadata of a collection or an item.
- Changing the owner of an item or a collection.
- Transferring an item, as well as creating and canceling transfer approvals of a specific item, or
  an [atomic swap](https://github.com/paritytech/substrate/pull/12285).
- Transferring ownership of an item.

:::info

Metadata, attributes, and settings of an item or collection can be locked. The user can decide what
to lock. Also, unauthorized and/or unprivileged transfers can be prevented by locking mechanism
(unprivileged actions can be re-allowed anytime).

:::

Other features are less common and include:

- Delegating accounts: delegated accounts can approve changes to an item's attributes and transfer
  an item. The item owner always has control and can decide to cancel approvals from a delegated
  account.
- One can also execute pending atomic swaps created by a counterpart.

### Work in Progress

[NFTs fractionalization](https://github.com/paritytech/substrate/pull/12565) will allow the user to:

- Take ownership of an NFT from the [pallet-uniques](#uniques-pallet)
- Create a new asset in [pallet-assets](https://polkadot.js.org/docs/substrate/extrinsics#assets)
- Mint the input amount to the previous owner of the NFT as the beneficiary

## Uniques Pallet

Uniques is a [FRAME pallet](https://github.com/paritytech/substrate/tree/master/frame/uniques)
deployed on the Statemint and Statemine system parachains. It implements the most basic kind of NFT
-- a data record referencing some metadata. This metadata reference is mutable until frozen, so NFTs
and their classes (entities derived from) are mutable unless specifically made immutable by the
issuer.

Uniques takes a very bare-bones approach on purpose, to keep the Statemine / Statemint chain a
simple balance-keeping chain for both fungible and non-fungibles.

These NFTs can be viewed and interacted with on [RMRK's Singular platform](https://singular.app), by
switching the top right menu from Kusama to Statemine or Statemint.

![nft-statemine](../assets/nft/nft-statemine.png)

The can also be interacted with directly through the
[extrinsics tab of Statemine](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama-statemine-rpc.paritytech.net#/extrinsics):

![uniques.png](../assets/nft/uniques.png)
