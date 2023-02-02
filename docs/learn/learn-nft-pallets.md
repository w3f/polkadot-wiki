---
id: learn-nft-pallets
title: NFT Pallets
sidebar_label: NFT Pallets
description: An overview of the functionalities of NFT Pallets in Polkadot Ecosystem.
keywords: [NFT, non-fungible token, NFT 2.0, nfts, NFT pallets]
slug: ../learn-nft-pallets
---

### NFTS Pallet

Nfts is a [FRAME pallet](https://polkadot.js.org/docs/substrate/extrinsics#nfts) currently deployed
on Westmint that provides a multitude of functions to interact with NFTs.

There are features that common to the nft world such as:

- Buying an item up for sale.
- Creating (i.e. mint) and burn (i.e. destroy) a collection of items or a single item (burning must
  be signed either by the admin of the collection or the owner). The creation of an item usually
  involves setting some attributes specific to that item (an this is actually what drives the value
  of the item). The creation of a collection also involves the specification of the maximum number
  of items the collection has (an this also will drive the value of the collection's items in the
  future).
- A collection is managed by the Issuer, the Admin and the Freezer. Those roles can be changed
  anytime.
- Setting metadata for an item or collection (metadata includes all essential information about the
  item or the collection)
- Setting or re-setting the price of an item.
- Clearing attributes and metadata of a collection or an item.
- Changing the owner of an item or a collection.
- Transferring an item, as well as creating and canceling transfer approvals of a specific item, or
  an atomic swap.
- Transferring ownership of an item.

:::info

Metadata, attributes and settings of an item or collection can be locked. Also unauthorized and/or
unprivileged transfers can be prevented by locking mechanism (unprivileged actions can be re-allowed
anytime).

:::

Other features are less common and include:

- Delegating accounts: delegated accounts can approve changes to an item's attributes, and can
  transfer an item. The owner of the item has always control and can decide to cancel approvals from
  a delegated account.
- One can also execute pending atomic swaps created by a counterpart.
