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

NFT stands for _non-fungible token_. Fungibility means interchangeability inside of a group. In
theory, a $20 bill is always worth $20 in a store and identical in value to any other $20 bill. It
is not, however, fungible with a $1 or $100 dollar bill (outside its group).

A Pokemon™ trading card of a Charizard is non-fungible with a card of Squirtle, whereas editions of
Charizard are fungible with each other.

Fungibility is a spectrum - what is fungible to some might not be fungible to others. In reality,
Pokemon™ cards, the canonical example of non-fungible assets are more fungible than US dollar
bills, each of which has a unique serial number that may be important to a government agency. The
cards have no serial numbers [1].

![one dollar](<https://www.investopedia.com/thmb/Nr-RLORu5CX_lIWZfLmV5X0eIrc=/613x345/smart/filters:no_upscale()/Clipboard01-d20f6eb9351e4f36a46e11fd87b53b2d.jpg>)

Additionally, a digital item like a "purple magic sword" in a game may be fungible with another
visually identical sword if all the player cares about is the looks of their character. But if the
other sword has a different function, and that function influences the outcome of an adventure the
player is about to embark on, then visually identical swords are absolutely non-fungible.

Bearing that in mind, the simplest explanation of NFTs is that **NFTs are rows of arbitrary,
project-specific, and non-interchangeable data that can be cryptographically proven to "belong" to
someone**. This data can be anything - concert tickets, attendance badges, simple words, avatars,
plots of land in a metaverse, audio clips, house deeds, mortgages, and more.

## NFT Standards

A general-purpose blockchain is not built to natively understand the concept of NFTs. It is only
natively aware and optimized for its own native tokens, but implementations built on such a chain
are essentially "hacks".

For example, Ethereum is a general-purpose blockchain that does not have the concept of "tokens"
(fungible or not) built-in. Tokens in Ethereum are essentially spreadsheets of information to be
interpreted and read in a certain way by various user interfaces. This _way_ in which they should
read them is called a _standard_.

The most widespread fungible token standard you may have heard of is ERC20, while the most
widespread NFT standard is ERC721, followed closely by ERC1155. The downside of having to define
these standards is that they are always instructions for how to read a spreadsheet pretending to
serve information in a certain way, which by definition cannot be optimized. For this reason, even
on a good day of extremely low network congestion, interactions with NFTs on any EVM chain will cost
a few dollars but were on average around $100 per interaction (transfer, mint, sale) in 2021 on
Ethereum.

This prevents use cases that go beyond the current craze of _digital dust gathering NFTs_ on
Ethereum - profile pictures, generative "look once and then put away" art, [ENS](ens) addresses, and
[proof of attendance badges](https://poap.xyz/) (which have since moved to the xDAI chain to save on
gas fees).

### A typical [NFT on Ethereum](https://opensea.io/assets/ethereum/0x2127fe7ffce4380459cced92f2d4793f3af094a4/12598)

![samurai nft](../assets/nft/samurai.png)

For the sake of comparison, we can refer to these as NFTs 1.0: static NFTs that are almost
exclusively image-based collectibles of varying rarity.

## NFTs in Polkadot & Kusama

This is where Polkadot's technology shines and where NFTs 2.0 come into play. By allowing
[heterogeneous application-specific shards](learn-parachains.md) to exist, builders can natively
optimize for complex NFT use cases without tradeoffs that would make interacting with the system
prohibitively inefficient and expensive in other environments.

:::info

See [this page](./learn-nft-projects.md) for more information about specific NFT project on Polkadot
and Kusama.

:::

## Bridging

Bridging to and from Substrate chains and EVM chains takes much effort but is a highly desired
feature in the NFT industry. Merging the collector and customer base has significant implications,
so multiple projects focus on making this possible.

Apart from RMRK (Substrate-to-Substrate seamless teleportation natively with [XCMP](learn-xcm.md))
and Efinity (Paratoken), the following efforts are underway:

- [**MyNFT**](https://mynft.com/): an EVM to EVM bridging effort.
- **RMRK <-> EVM** Simplification bridge: a bridge developed during the
  [RMRK hackathon](https://rmrk.devpost.com) for porting RMRK NFTs into simplified IOUs on EVM
  chains

## References

- [1]: [Investopedia](https://www.investopedia.com/terms/l/liars-poker.asp)
- [2]:
  [Unique Network's Chelobrick](https://unique.network/blog/chelobricks-making-waves-with-10-000-substrate-based-nfts/)
