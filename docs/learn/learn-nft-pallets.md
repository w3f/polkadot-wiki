---
title: NFT Pallets
description: Learn about NFT pallets in the Polkadot ecosystem and their capabilities.
---

NFT [pallets](./learn-transactions.md#pallets-and-extrinsics) provide NFT functionality within Polkadot parachains.

Polkadot SDK-based pallets offer native NFT logic for mint, transfer, burn, and metadata operations without 
relying on external smart contracts. This approach ensures chain-level security and performance, 
providing efficient asset creation and management while maintaining alignment with Polkadot's shared security model.

Polkadot ecosystem has a number of NFT pallets in use:

1. **Uniques**: Compact and simple, suitable for parachains with limited NFT functionality needs.
2. **NFTs**: Used by [AssetHub](./learn-assets.md) and [Mythical Games](https://mythicalgames.com/). Has the largest number of NFTs and transactions. Rich in functionalities and suitable for a wide range of use cases, including applications like [KodaDot](./learn-nft-projects.md#kodadot).
3. **Unique Network**: Features Nested NFTs, Dynamic NFTs, Re-Fungible (fractionalized) NFTs, transaction fee sponsoring, and full interoperability between EVM and Substrate. Provides hybrid EVM+Substrate compatibility with advanced "NFT 2.0" features including dynamic, nested, and composable tokens.
4. **ORML**: Initially created as a simple NFT pallet, currently used by [Acala parachain](https://acala.network/).
5. **NFT Manager**: Simple NFT pallet used by [Aventus Network](https://aventus.io/).

For detailed comparison of pallets see [NFT Pallets in the Polkadot ecosystem](https://docs.google.com/presentation/d/1J6kJ5lQSAnHTre3j7-J6fH34kk8TQ4apif-CCHjQo3o/edit?usp=sharing)

## Pallet Characteristics

Pallets represent stable runtime code that changes only to accommodate Polkadot runtime upgrades. Parachains may select and customize these pallets for specific use cases.

**NFTs Pallet:**
- Fellowship-supported with comprehensive feature set
- Used by the largest NFT projects in the ecosystem
- Supports delegation for third-party metadata updates
- Available on AssetHub

**Uniques Pallet:**
- Community integration experience since 2021
- Simplest parachain deployment option
- Adopted by over 10 parachains
- Deprecated in favor of NFTs Pallet

**Unique Network Pallet:**
- Native support for NFT 2.0 features (nesting, dynamic NFTs)
- Gas fee sponsoring capabilities
- EVM-Substrate interoperability
- Advanced development tools

**Specialized Pallets:**
- **Aventus NFT Manager**: Collection-free design with Ethereum bridging
- **ORML NFT**: Lightweight engine as part of the ORML toolkit

More information on Unique Network can be found at [their documentation](https://unique.network/learn/).

## NFTs Pallet

NFTs is a [FRAME pallet](https://github.com/paritytech/polkadot-sdk/tree/master/substrate/frame/nfts#readme) that provides functions to interact with and configure NFTs.

The pallet allows configuration of NFTs, collections, and items with feature flags to enable or disable specific functionalities.

### Collection Management

Collections have different roles with specific permissions:

- **Owner**: Can destroy collections, manage teams, set supply limits, and lock collections
- **Admin**: Can set attributes and metadata, lock item properties
- **Freezer**: Can lock and unlock item transfers  
- **Issuer**: Can mint NFTs and update mint settings

Roles can be permanently removed by setting them to `none`.

### NFT Attributes

NFTs can hold different types of attributes:

- **System attributes**: Set by the pallet for specific functions
- **Collection owner's attributes**: Set by the collection admin
- **User attributes**: Set by the NFT owner
- **External attributes**: Allow external services to modify attributes

### Other Capabilities

- Built-in marketplace functionality
- Atomic swaps between users
- Delegation of accounts for transfers and attribute updates
- Smart attributes allowing external entities to update NFT properties
- Planned fractionalization features

## Uniques Pallet

The Uniques Pallet is deprecated and replaced by the NFTs Pallet.

Uniques implemented basic NFT functionality with mutable metadata references that could be frozen. It was designed as a simple solution for Asset Hub's balance-keeping requirements.

These NFTs can be viewed on [RMRK's Singular platform](https://singular.app) and interacted with through the [Asset Hub interface](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama-asset-hub-rpc.polkadot.io#/extrinsics).