---
id: learn-nft
title: NFTs
sidebar_label: Introduction to NFTs
description: The NFT Landscape of the Polkadot Ecosystem.
keywords: [NFT, non-fungible token, NFT 2.0]
slug: ../learn-nft
---

This page is a high-level overview of NFTs in the blockchain space and the various approaches to
NFTs within the Polkadot ecosystem.

## Fungibility

NFT stands for non-fungible token. Fungibility is defined as interchangeability inside of a group.
All valid issued $1 notes are a group to itself. A $1 note is always interchangeable with any other
$1 note. It is not, however, interchangeable with $20, $50 or $100 dollar notes (these are separate
note groups).

A fungible item may be unique. In the currency note example, each issued note has a serial number
making it a unique member of the group

![one dollar](https://www.investopedia.com/thmb/Nr-RLORu5CX_lIWZfLmV5X0eIrc=/613x345/smart/filters:no_upscale%28%29/Clipboard01-d20f6eb9351e4f36a46e11fd87b53b2d.jpg)

A case where a fungible item is not unique is a simple plastic betting chip. Each chip in its
pristine state is indistinguishable from any other chip and each is interchangeable within its own
group.

On the other hand, an NFT is unique and has features that allow for its uniqueness.

## NFT Anatomy

Every NFT has three common components irrespective of the chain it belongs to or originates from
that make it unique.

- **Identity**: Defined via a property, address or a contract.
- **Ownership**: Determined via a contract or a wallet address.
- **Metadata**: Can be a single reference to an off-chain object (digital asset or contract) or, in
  case of advanced NFTs, an elaborate data structure containing both on-chain data and off-chain
  references.

## NFT Purpose

What purpose does a unique digital asset provide? The answer to this question lies in the two
distinct ways an NFT is utilized.

The first is the use of NFTs as a speculative store of value derived from their uniqueness (rarity,
implied, or intrinsic worth). This initial novelty aspect of NFTs initiated an era of collectibles
and tradeables and instantiated the appearance of the mass markets where NFTs were traded as a
commodity. This is also recognized as the era of the simple NFT, otherwise known as static NFT. The
Uniques pallet was created to facilitate this implementation of the NFT.

The second implementation is as a utility. As mentioned, when we define an NFT, it can store data
on-chain. By convention, we call this NFT component the NFT’s _metadata_. Generally, an NFT is an
independent, sovereign data record. This is where the utility aspect of an NFT lies. An NFT can be a
digital key, a collection of documents, an atomic data fragment, or a unique personal set of related
assets and information that can be owned. An example of NFT utility is the
[OG WUD Burn NFT Collection](https://kodadot.xyz/ahp/collection/244) where each NFT grants some
benefits within the [FlappyWUD game](https://flappywud.lol/).

These two roles are not mutually exclusive. An NFT can be a store of value only, a value-less
utility token exclusively, or both at the same time if it has worth on the market as a utility token
or, inversely, if it is primarily a token of worth with additional utility.

It is the utility aspect of the NFTs that has been the driving force behind the development of and
transition to the advanced NFT concept central to Polkadot’s NFTs pallet development.

## NFT Standards

Due to its heterogeneous nature, the Polkadot ecosystem supports differing implementations of NFTs.
Polkadot’s core blockchain technology is based on Substrate. Accordingly, NFTs created in
substrate-based context are called “native” NFTs. Native NFTs are created through dedicated methods
available in pallets, collections of functions written as Wasm code. Polkadot Uniques and NFTs
pallets and Unique Network’s NFT utility pallet bundle provide a way to do this. Here a common
standard for metadata may provide direct interoperability and efforts in that direction are being
made through the XCM initiative
([RFC-0125: XCM Asset Metadata](https://polkadot-fellows.github.io/RFCs/approved/0125-xcm-asset-metadata.html#rfc-0125-xcm-asset-metadata)).

Polkadot’s Ink! language for writing contracts in Substrate provides a separate mechanism for
creating NFTs. Astar has been spearheading this effort and one example of this is their
[PSP34](https://github.com/w3f/PSPs/blob/master/PSPs/psp-34.md) (Polkadot Standards Proposals)
initiative for standardizing NFTs using the Contracts pallet.

The availability of Ethereum Virtual Machines (EVM) in the Polkadot ecosystem provides yet another
way to create and manage NFTs using Solidity contracts just like on the Ethereum network. Such NFTs
are built in adherence to the corresponding ERC standards adopted from the Ethereum network.

## Birth of NFTs - The EVM Domain

A general-purpose blockchain is not built to natively support the concept of NFTs. It is only
natively aware and optimized for its own native fungible tokens, and implementations built on such a
chain are essentially "special case smart contracts".

For example, Ethereum is a general-purpose blockchain that does not have the concept of "tokens" at
all (fungible or not) built-in. Tokens in Ethereum are essentially spreadsheets of information to be
interpreted and read in a certain way by various user interfaces via an executable code named a
“smart contract”. An agreement on the structure of such a construct is declared a standard and is
designated by the Ethereum Request For Comments (ERC) document.

The core NFT EVM standard is defined in [ERC721](https://eips.ethereum.org/EIPS/eip-721), but there
are extended implementations that introduce some aspects of advanced NFT features like
[ERC1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/).

This approach’s significant shortcoming is its inability to combine standards implicitly. This
introduces the necessity of creating custom contract implementations for specialized use cases where
one might desire combined features. Each ERC that provides an advanced NFT feature is an isolated
subset. As will be shown later, this is not the case for Polkadot native NFTs.

A blockchain must provide a mechanism for overcoming these limitations to facilitate the creation of
advanced NFT tokens, as we will see in the upcoming section.

A typical
[NFT on Ethereum](https://opensea.io/assets/ethereum/0x2127fe7ffce4380459cced92f2d4793f3af094a4/12598)[​](https://wiki.polkadot.network/docs/learn-nft#a-typical-nft-on-ethereum)\*\*

![samurai nft](../assets/nft/samurai.png)

For the sake of reference, we can refer to these as static NFTs that are almost exclusively
image-based collectibles of varying rarity.

## NFTs in Polkadot & Kusama

As mentioned, standardized pallets provide a decentralized processing mechanism through Wasm
contracts, specifically optimized for an NFT implementation’s advanced functionality. Two examples
are the Polkadot NFTs pallet and the Unique Network’s collection of NFT utility pallets. This
approach allows any parachain in the ecosystem to access advanced NFT features without building a
contract framework from scratch.

With the introduction of NFT capabilities to the cross-chain messaging format (XCM), a direct
inter-chain NFT transfer solution is becoming a reality.

A critical aspect of NFT interoperability hinges on the ability of differing networks to agree on a
common metadata format. This greatly simplifies interoperability and removes the need for metadata
conversion steps. In this regard, an effort is underway to make this a reality in this proposal
[RFC-0125: XCM Asset Metadata](https://polkadot-fellows.github.io/RFCs/approved/0125-xcm-asset-metadata.html#rfc-0125-xcm-asset-metadata).

The other option of building a framework of Solidity contracts as the scaffolding for advanced
features within an EVM is also viable. Still, it is hampered by the necessity of using bridging
mechanisms for cross-chain transfers and a lack of a derivative NFT solution. This approach exhibits
much less efficient transaction processing than the native substrate solutions.

:::info

See [this page](./learn-nft-projects.md) for more information about specific NFT project on Polkadot
and Kusama.

:::

## Cross-Chain Transfers

Transfer of NFTs across chains is one of the most engaging issues in blockchain. In terms of the
mechanism through which a transfer of the NFT can occur on the Polkadot network, two distinct
approaches exist:

- Asset teleportation
- Asset reservation via sovereign account mechanism - derivative NFTs

Cross-chain transfers within the Polkadot Substrate ecosystem are exclusively executed through the
XCM (Cross-Consensus Messaging) system. This system provides native, trustless security at the
protocol level, eliminating the need for external bridge solutions. The XCM implementation
significantly enhances security by removing the trustful aspect of the transactions, which is
typically required by bridge architectures and represents potential points of failure and security
risk in cross-chain communication.

NFT transfers can be decomposed into two independently transferable components:

- core asset properties, consisting of identity and ownership data, and
- optional metadata attributes.

In certain cross-chain operations, such as staking, complete NFT teleportation is unnecessary. This
was demonstrated through a successful
[XCM implementation between Unique Network and Acala](https://unique.network/blog/unique-network-cross-chain-nft-proof-of-concept-is-here/),
where a derivative NFT was created on the Acala chain representing the original NFT from Unique
Network. The derivative implementation required only core asset properties, as metadata transfer was
nonessential for staking and collateral use cases where only identity and ownership verification are
required.

Teleportation, i.e., a complete transfer of identity ownership and metadata, may be the optimal
solution for a complete asset migration and the only available option for bridging mechanisms.

Bridging to and from Substrate chains and EVM chains takes much effort but is a highly desired
feature in the NFT industry. Merging the collector and customer base has significant implications,
so multiple projects focus on making this possible.

## What’s Next From Here?

Utility NFTs are at a very early adoption stage.

If you consider an NFT an ownable, universal digital encapsulation of data, it has a role as
significant as that of a smart contract. Real-world asset tokenization, tradable digital coupons,
virtual digital keys and badges, bundles of utility, resource, and accomplishment tokens, data
wrappers… a likely advent of the era of discovery lays ahead.