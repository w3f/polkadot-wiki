---
id: learn-nft
title: NFTs
sidebar_label: Introduction to NFTs
description: An explanation of the NFT landscape in the Polkadot ecosystem.
keywords: [NFT, non-fungible token, NFT 2.0]
slug: ../learn-nft
---

This page is a high-level overview of NFTs in the blockchain space and the various approaches to
NFTs within the {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} network.

## Fungibility

NFT stands for _non-fungible token_. Fungibility means interchangeability inside of a group. In
theory, a $20 bill is always worth $20 in a store and identical in value to any other $20 bill. It
is not, however, fungible with a $1 or $100 dollar bill (outside its group).

A Pokemon™ trading card of a Charizard is non-fungible with a card of Squirtle, whereas editions of
Charizard are fungible with each other.

Fungibility is a spectrum - what is fungible to some might not be fungible to others. In reality,
Pokemon™ cards, the canonical example of non-fungible assets are more fungible than US dollar bills,
each of which has a unique serial number that may be important to a government agency. The cards
have no serial numbers [1].

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

#### A typical [NFT on Ethereum](https://opensea.io/assets/ethereum/0x2127fe7ffce4380459cced92f2d4793f3af094a4/12598)

![samurai nft](../assets/nft/samurai.png)

For the sake of comparison, we can refer to these as NFTs 1.0: static NFTs that are almost
exclusively image-based collectibles of varying rarity.

---

## NFTs 2.0: NFTs in Polkadot & Kusama

This is where {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}'s technology shines and
where NFTs 2.0 come into play. By allowing
[heterogeneous application-specific shards](learn-parachains.md) to exist, builders can natively
optimize for complex NFT use cases without tradeoffs that would make interacting with the system
prohibitively inefficient and expensive in other environments.

The following NFT solutions exist and are under development in the Polkadot and/or Kusama
ecosystems:

### [KodaDot](https://kodadot.xyz)

[KodaDot](https://kodadot.xyz) is an open-source NFT marketplace that operates on the Dotsama
(Kusama/Polkadot) network, striving to aggregate various NFT standards (Kusama, RMRK, Statemine,
Basilisk, etc.) in the Dotsama ecosystem, enhancing user experience by abstracting these standards.

KodaDot's strength lies in its commitment to open-source collaboration. It has transformed into a
collaborative hub where creators, developers, and community members work collectively for decision
making, amassing an extensive network of over
[90 open-source contributors](https://hello.kodadot.xyz/about-us/who-are-we/achievements). This
robust collaboration has earned KodaDot the
[number one rank as a dapp in the Polkadot ecosystem on Github](https://github.com/topics/polkadot).

![kodadot.png](../assets/nft/kodadot.png)

#### The Team Behind KodaDot

KodaDot began as the first
[unofficial explorer for RMRKv0.0.1](https://kusama.polkassembly.io/motion/256)
[contributing to RMRK protocol](https://github.com/rmrk-team/rmrk-spec/issues/10). It later
[received Kusama Treasury funding](https://kusama.polkassembly.io/motion/349), which propelled the
team to create the
[best end-user experience on Statemine](https://kusama.polkassembly.io/motion/349).

In the summer of 2022, KodaDot won the first prize at the
[Polkadot North American event](https://devpost.com/software/kodadot-moonsama) for implementing
MoonBeam and MoonRiver NFT EVM smart contracts and enabling read-only access to existing components
for seamless end-user interaction.

The team successfully
[launched with Basilisk NFT Marketplace pallet in Fall 2022](https://github.com/kodadot/nft-gallery/issues/660),
where an increasing number of artist collections are emerging, providing artists the opportunity to
receive offers on unlisted NFTs and earn on-chain royalties.

KodaDot's upcoming integrations are based on
[PSP-34](https://github.com/w3f/PSPs/blob/master/PSPs/psp-34.md), leveraging
[smart contracts written with ink!](https://use.ink/).

#### Ecosystem Tools by KodaDot

KodaDot has enriched the Polkadot ecosystem by
[offering a comprehensive API interface for builders](https://github.com/kodadot/uniquery), based on
the SubSquid indexer. This platform also presents searchable items and collections, translating
on-chain transactions into deep insights about collection ownership dynamics for end-users. For more
info about KodaDot check out [link](https://hello.kodadot.xyz/).

### Unique network

[Unique network](https://unique.network/), an NFT-specific blockchain offering innovations such as
sponsored transactions, bundling fungible tokens with non-fungibles, and splitting NFTs into
fungible tokens for partial ownership.

Unique Network have launched two NFT projects to date: Substrapunks as part of
[Hackusama](https://hackusama.devpost.com/), and Chelobricks as a promotion during
[Polkadot Decoded](https://decoded.polkadot.network/).

Unique Network focuses on B2B use cases, aiming to be an infrastructure provider for others to build
on, rather than entering the NFT space themselves as an end-product.

Unique Network aims to make their marketplace technology open-source and whitelabel-friendly. In
theory, it should be trivial to set up a new marketplace for your project using Unique's technology.
Unique network aims to be a parachain on Polkadot, and Quartz is their Kusama counterpart.

### RMRK

[RMRK](https://rmrk.app) is a set of NFT 2.0 standards developed in three distinct code flavors:

1. ["Colored coins"](https://en.bitcoin.it/wiki/Colored_Coins) approach, as on Bitcoin, originally
   developed as a "hack" on the Kusama chain. This is now deprecated, and it is recommended
   implementers use any of the other options.
2. Solidity contracts, compatible with any EVM blockchain in and outside the Polkadot ecosystem.
   Documented [here](https://evm.rmrk.app)
3. Rust code (Substrate pallets), compatible with any Substrate chain. Code is available
   [here](https://github.com/rmrk-team/rmrk-substrate).

Additionally, two more flavors are in development:

1. [Astar](https://astar.network/) are developing the ink! version of RMRK:
   [code here](https://github.com/rmrk-team/rmrk-ink).
2. [Gear Technologies](https://www.gear-tech.io/) are developing the Gear implementation:
   [code and docs here](https://wiki.gear-tech.io/docs/examples/rmrk/).

The RMRK NFT 2.0 standards are a set of "NFT legos", primitives that, when put together, allow a
builder to compose an NFT system of arbitrary complexity without smart contracts.

#### NFT Legos

1. NFTs can own other NFTs, NFTs can equip other NFTs for visual change
2. NFTs can have multiple resources (different outputs based on context and resource priority)
3. NFTs can have on-chain emotes (reactions) for price discovery and social mechanics
4. NFTs have conditional rendering (e.g. show Mona Lisa as blushing if she got 50 kissy 😘 emoji)
5. NFTs can be governed by the community via fungible shareholder-tokens (fractionalization of NFTs)

#### NFT from [Kanaria](https://kanaria.rmrk.app)

![kanaria.png](../assets/nft/kanaria.png)

:::note Multi-resource NFTs

A multi-resource NFT (gif of statue, and SVG-composable dynamic NFT in one) that can also equip
other NFTs from within its "inventory".

:::

Two marketplaces for RMRK-based NFTs exist with hundreds of projects already launched:

- [Singular](https://singular.rmrk.app), the official marketplace

For a complete introduction into RMRK, see [this presentation](https://url.rmrk.app/wasmconf) or
read [the non-technical docs](https://docs.rmrk.app).

### Efinity

Spearheaded by [Enjin](https://enjin.io), the authors of Ethereum's ERC1155 standard and makers of
the Enjin wallet and Unity plugin, which allows easy implementation of NFTs into 3D games, Efinity
is an NFT bridging chain coming to Kusama and Polkadot in 2022.

They plan to build a _paratoken_ which would be a standard for token migration across different
parachains in the Polkadot ecosystem, but also into and out of Ethereum and other EVM systems.

### Astar

[Astar Network](https://astar.network) and its sister network
[Shiden Network](https://shiden.astar.network) are the smart contract infrastructure in the Polkadot
Ecosystem. Astar Ecosystem ("Astar") supports NFTs developed with EVM smart contracts and WASM smart
contracts.

Astar has all toolings available that every EVM NFT developer knows. The availability of those
toolings makes the onboarding to Astar networks very attractive to any developer looking to explore
the Polkadot Ecosystem. Astar has an active community of artists and NFT enthusiasts. Besides
supporting all EVM toolings, Astar also bootstrapped the WASM smart contract environment for NFT
developers writing smart contracts with [ink!](https://use.ink) based on
[PSP34](https://github.com/w3f/PSPs/blob/master/PSPs/psp-34.md) (Polkadot Standards Proposals).

The main advantage of having a multi-virtual machine environment for NFT developers is that it will
give more possibilities to the builders for the use case they are developing. With the support of
WASM smart contracts, developers can develop solutions like [RMRK](./learn-nft#rmrk) with smart
contracts.

### Moonbeam

[Moonbeam](https://moonbeam.network) and its Kusama counterpart Moonriver are full EVM deployments
with Ethereum RPC endpoints.

This means that the entire toolkit offered to other EVM chains (stacks like Hardhat, Remix, Truffle,
Metamask, etc.) are available to Moonriver / Moonbeam users and developers, giving it a noticeable
head start in attracting existing userbases.

Several dozen high profile teams are launching their products (or re-launching) on Moonriver /
Moonbeam, however, it is essential to note that Moonbeam is an EVM chain and will therefore suffer
from the same limitations as any other EVM chain in regards to customization and feature-richness of
NFTs.

A notable advantage, however, is that Moonriver / Moonbeam is still a Substrate chain, meaning
integration of custom pallets into the runtime is still possible, making NFT specific optimizations
at the chain runtime level a reliable way to keep EVM compatibility of tools while at the same time
optimizing storage and interactions for rich NFTs.

### Basilisk

[Basilisk](https://bsx.fi/) is a Kusama parachain that provides liquidity for the ecosystem. It also
has a full-featured NFT platform based on the
[Uniques pallet](https://github.com/paritytech/substrate/tree/master/frame/uniques). One of the key
features of Basilisk is that it allows minting NFTs with a royalty fee. This royalty fee is
distributed to the original creator of the NFT via the runtime pallet. Additionally
[Basilisk offers a feature](https://github.com/galacticcouncil/Basilisk-node/tree/master/pallets/marketplace)
that allows creating a buy order for a specific NFT.

These NFTs can be viewed and interacted instantly on [KodaDot](https://kodadot.xyz).

![nft-basilisk](../assets/nft/nft-basilisk.png)

### Statemint

Statemint is a generic assets parachain which provides functionality for deploying and transferring
assets — both Fungible and Non-Fungible Tokens (NFTs). It is a system parachain on Polkadot (not to
be confused with [Statemine](https://guide.kusama.network/docs/kusama-statemine/), which is a
parachain on Kusama). Statemint currently hosts
[Uniques pallet](./learn-nft-pallets.md/#uniques-pallet) and its functionalities. The
[NFTs pallet](./learn-nft-pallets.md#nfts-pallet) with NFT 2.0 functionalities is available for
testing on Westmint, which is a system parachain on Polkadot's testnet Westmint.

---

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

### References

- [1]: [Investopedia](https://www.investopedia.com/terms/l/liars-poker.asp)
- [2]:
  [Unique Network's Chelobrick](https://unique.network/blog/chelobricks-making-waves-with-10-000-substrate-based-nfts/)
