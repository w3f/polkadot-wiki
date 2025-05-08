---
title: NFTs
description: Explore the NFT landscape in the Polkadot ecosystem, including standards, utilities, and cross-chain capabilities.
---

This page provides an overview of NFTs within the Polkadot ecosystem, focusing on technology, standards, and cross-chain capabilities.

## What Are NFTs?

NFTs (non-fungible tokens) are unique digital assets that differ from fungible tokens like cryptocurrencies. While fungible tokens are interchangeable, NFTs are distinct due to their metadata, ownership, and identity. These attributes make NFTs suitable for representing unique items or data.

## NFT Technology in Polkadot

The Polkadot ecosystem supports NFTs through Polkadot SDK-based pallets, Wasm smart contracts, and EVM compatibility. These technologies enable the creation and management of NFTs with varying levels of functionality and interoperability.

### Key Components of NFTs

NFTs are defined by three primary components:

- **Identity**: Specifies the unique identifier of the NFT, often tied to a property, address, or contract.
- **Ownership**: Indicates the entity (e.g., wallet address or contract) that owns the NFT.
- **Metadata**: Provides additional information about the NFT, which may reference off-chain objects or combine on-chain data with off-chain references.

### Native NFTs

Polkadot SDK-based pallets, such as the Uniques and NFTs pallets, provide a native mechanism for creating and managing NFTs. These pallets are optimized for advanced functionality and interoperability. Efforts like the [XCM Asset Metadata RFC](https://polkadot-fellows.github.io/RFCs/approved/0125-xcm-asset-metadata.html#rfc-0125-xcm-asset-metadata) aim to standardize metadata formats, simplifying cross-chain interactions.

This functionality can be found on [Polkadot Asset Hub](./learn-system-chains.md#existing-system-chains).

### Ink! Contracts

Ink!, a Rust-based smart contract language, allows developers to create NFTs using the Contracts pallet. Standards like Astar's [PSP34](https://github.com/w3f/PSPs/blob/master/PSPs/psp-34.md) provide a framework for implementing NFTs with flexibility and adherence to defined specifications.

### EVM Compatibility

Polkadot's EVM support enables NFTs to be created using Solidity contracts, following Ethereum standards such as [ERC721](https://eips.ethereum.org/EIPS/eip-721) and [ERC1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/). While this approach allows compatibility with Ethereum-based tools and ecosystems, it may lack the seamless feature integration available in Polkadot SDK-native NFTs.

## Cross-Chain NFT Transfers

Cross-chain NFT transfers are a critical feature of blockchain ecosystems. Polkadot facilitates these transfers through its XCM (Cross-Consensus Messaging) system, which provides secure, trustless communication between chains. Two primary methods are used:

- **Teleportation**: Transfers the NFT's identity, ownership, and metadata in full.
- **Derivative NFTs**: Creates chain-specific representations of NFTs, transferring only core properties like identity and ownership.

For example, a collaboration between Unique Network and Acala demonstrated the use of derivative NFTs for staking purposes. In this case, metadata transfer was unnecessary, as only identity and ownership verification were required. XCM eliminates the need for external bridges, reducing potential points of failure and enhancing security.

For more information on the details of how these transfer occur, [see this article by Unique network.](https://unique.network/blog/unique-network-cross-chain-nft-proof-of-concept-is-here/)

## Use Cases for Advanced NFTs

NFTs in the Polkadot ecosystem support a variety of applications beyond static collectibles. Examples include:

- Digital keys, badges, and coupons.
- Tokenized representations of real-world assets.
- Bundles of related assets and data.

The [OG WUD Burn NFT Collection](https://kodadot.xyz/ahp/collection/244) illustrates utility-focused NFTs, offering benefits within the [FlappyWUD game](https://flappywud.lol/).

## What's Next?

The Polkadot ecosystem provides multiple approaches to NFT creation and management, leveraging Polkadot SDK pallets, Ink! contracts, and EVM compatibility. These technologies enable advanced functionality, interoperability, and cross-chain capabilities. With ongoing developments in standards and utility, NFTs continue to evolve as a versatile tool for digital asset representation.

For more details on specific NFT projects, see [this page](./learn-nft-projects.md).