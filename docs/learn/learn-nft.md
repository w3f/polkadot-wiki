---
title: NFTs
description: Explore the NFT landscape in the Polkadot ecosystem, including standards, utilities, and cross-chain capabilities.
---

This page is a high-level overview of NFTs in the blockchain space and the various approaches to NFTs within the Polkadot ecosystem.

## Fungibility

NFT stands for non-fungible token. Fungibility refers to interchangeability within a group. For example, all valid $1 notes are interchangeable within their group but not with $20, $50, or $100 notes.

A fungible item may still be unique. For instance, each $1 note has a serial number, making it unique within its group. Conversely, some fungible items, like stamps (e.g., Forever stamps), are indistinguishable and interchangeable within their group.

NFTs, however, are unique and have features that ensure their uniqueness.

![One dollar note](https://www.investopedia.com/thmb/Nr-RLORu5CX_lIWZfLmV5X0eIrc=/613x345/smart/filters:no_upscale%28%29/Clipboard01-d20f6eb9351e4f36a46e11fd87b53b2d.jpg)

## NFT Anatomy

Every NFT has three common components, irrespective of the chain it belongs to or originates from, that make it unique:

- **Identity**: Defined by a property, address, or contract.
- **Ownership**: Determined by a contract or wallet address.
- **Metadata**: Can reference an off-chain object (e.g., digital asset or contract) or include a detailed data structure with on-chain and off-chain references.

## NFT Purpose

NFTs serve two primary purposes:

1. **Speculative Store of Value**: NFTs can derive value from their uniqueness, rarity, or intrinsic worth. This use case led to the era of collectibles and tradables, often referred to as static NFTs. The Uniques pallet supports this implementation.

2. **Utility**: NFTs can store data on-chain, often referred to as metadata. This allows NFTs to function as digital keys, collections of documents, or unique personal data sets. For example, the [OG WUD Burn NFT Collection](https://kodadot.xyz/ahp/collection/244) provides benefits in the [FlappyWUD game](https://flappywud.lol/).

These two roles are not mutually exclusive. An NFT can be a store of value only, a value-less utility token exclusively, or both at the same time if it has worth on the market as a utility token or, inversely, if it is primarily a token of worth with additional utility.

It is the utility aspect of the NFTs that has been the driving force behind the development of and transition to the advanced NFT concept central to Polkadot’s NFTs pallet development.

## NFT Standards

The Polkadot ecosystem supports various NFT implementations due to its heterogeneous nature. Key approaches include:

- **Polkadot SDK**: Provides pallets like Polkadot Uniques and Unique Network’s NFT utility pallet bundle. Efforts like [RFC-0125: XCM Asset Metadata](https://polkadot-fellows.github.io/RFCs/approved/0125-xcm-asset-metadata.html#rfc-0125-xcm-asset-metadata) aim to standardize metadata for interoperability.
- **Ink! Language**: Enables NFT creation via smart contracts. Astar’s [PSP34](https://github.com/w3f/PSPs/blob/master/PSPs/psp-34.md) is an example of standardization efforts.
- **EVM Compatibility**: Supports NFTs using Solidity contracts, adhering to Ethereum standards like ERC721 and ERC1155.

## NFTs in Polkadot and Kusama

Standardized pallets enable decentralized processing through Wasm contracts, optimizing advanced NFT functionality. Examples include the Polkadot NFTs pallet and Unique Network’s utility pallets.

Cross-chain NFT transfers are facilitated by the XCM format, enabling inter-chain solutions. Efforts like [RFC-0125: XCM Asset Metadata](https://polkadot-fellows.github.io/RFCs/approved/0125-xcm-asset-metadata.html#rfc-0125-xcm-asset-metadata) aim to simplify interoperability by standardizing metadata formats.

A critical aspect of NFT interoperability hinges on the ability of differing networks to agree on a common metadata format. This greatly simplifies interoperability and removes the need for metadata conversion steps. In this regard, an effort is underway to make this a reality in this proposal [RFC-0125: XCM Asset Metadata](https://polkadot-fellows.github.io/RFCs/approved/0125-xcm-asset-metadata.html#rfc-0125-xcm-asset-metadata).

The other option of building a framework of Solidity contracts as the scaffolding for advanced features within an EVM is also viable. Still, it is hampered by the necessity of using bridging mechanisms for cross-chain transfers and a lack of a derivative NFT solution. This approach exhibits much less efficient transaction processing than the native Polkadot SDK solutions.

!!!info
    See [this page](./learn-nft-projects.md) for more information about specific NFT projects on Polkadot and Kusama.

## Cross-Chain Transfers

NFT transfers across chains involve two approaches:

- **Asset Teleportation**: Transfers identity, ownership, and metadata.
- **Asset Reservation**: Uses sovereign accounts to create derivative NFTs.

Transfers within Polkadot use the [XCM system](./learn-xcm.md), which provides trustless security at the protocol level. This eliminates the need for external bridges, enhancing security.

NFT transfers can be decomposed into two independently transferable components:

- Core asset properties, consisting of identity and ownership data.
- Optional metadata attributes.

In certain cross-chain operations, such as staking, complete NFT teleportation is unnecessary. This was demonstrated through a successful [XCM implementation between Unique Network and Acala](https://unique.network/blog/unique-network-cross-chain-nft-proof-of-concept-is-here/), where a derivative NFT was created on the Acala chain representing the original NFT from Unique Network. The derivative implementation required only core asset properties, as metadata transfer was nonessential for staking and collateral use cases where only identity and ownership verification are required.

Teleportation, i.e., a complete transfer of identity ownership and metadata, may be the optimal solution for a complete asset migration and the only available option for bridging mechanisms.

Bridging to and from Polkadot SDK-based chains and EVM chains takes much effort but is a highly desired feature in the NFT industry. Merging the collector and customer base has significant implications, so multiple projects focus on making this possible.

## Comparison: Ethereum NFTs

Ethereum does not natively support tokens. Instead, tokens are implemented via smart contracts, following standards like [ERC721](https://eips.ethereum.org/EIPS/eip-721) and [ERC1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/).

A limitation of Ethereum’s approach is the inability to combine standards implicitly, requiring custom implementations for advanced features. In contrast, Polkadot native NFTs unify features through a common metadata format.

A typical [NFT on Ethereum](https://opensea.io/assets/ethereum/0x2127fe7ffce4380459cced92f2d4793f3af094a4/12598)[​](https://wiki.polkadot.network/docs/learn-nft#a-typical-nft-on-ethereum)\*\*

![Samurai NFT](../assets/nft/samurai.png)

## Future of NFTs

Utility NFTs are in the early stages of adoption. As universal digital encapsulations of data, NFTs have potential applications in real-world asset tokenization, digital coupons, virtual keys, badges, and more.