---
id: learn-nft
title: NFTs
sidebar_label: NFTs
---

This page is a high level overview of NFTs in general, and the various
approaches to NFTs within the Polkadot network.

## Fungibility

NFT stands for _non fungible token_. Fungibility means interchangeability inside
of a group. In theory, a $20 bill is always worth $20 in a store, and identical
in value to any other $20 bill. It is not, however, fungible with a $1 or $100
dollar bill (outside its group).

A Pokemon™ trading card of a Charizard is non-fungible with a card of Squirtle,
but editions of Charizard are fungible with each other.

Fungibility is a spectrum - what's fungible to some might not be fungible to
others. In reality, Pokemon™ cards, the canonical example of non fungible
assets, are more fungible than US dollar bills each of which has a unique serial
number which may be of importance to a government agency. The cards have no
serial numbers.

![](<https://www.investopedia.com/thmb/Nr-RLORu5CX_lIWZfLmV5X0eIrc=/613x345/smart/filters:no_upscale()/Clipboard01-d20f6eb9351e4f36a46e11fd87b53b2d.jpg>)
_source: [Investopedia](https://www.investopedia.com/terms/l/liars-poker.asp)_

Additionally, a digital item like a "purple magic sword" in a game may be
fungible with another visually identical sword if all the player cares about is
the looks of their character. But if the other sword has a different function,
and that function influences the outcome of an adventure the player is about to
embark on, then visually identical swords are absolutely non-fungible.

Bearing that in mind, the simplest explanation of NFTs is that **NFTs are rows
of arbitrary, project-specific, and non-interchangeable data that can be
cryptographically proven to "belong" to someone**. This data can be anything -
concert tickets, attendance badges, simple words, avatars, plots of land in a
metaverse, audio clips, house deeds and mortgages, and more.

## NFT Standards

A general-purpose blockchain is not built to natively understand the concept of
NFTs. It is only natively aware and optimized for its own native tokens, but
implementations built on top of such a chain are essentially "hacks".

As an example, Ethereum is a general purpose blockchain which does not have the
concept of "tokens" (fungible or not) built-in. Tokens in Ethereum are
essentially spreadsheets of information that are to be interpreted and read in a
certain way by various user interfaces. This _way_ in which they should read
them is called a _standard_.

The most widespread fungible token standard you may have heard of is ERC20,
while the most widespread NFT standard is ERC721, followed closely by ERC1155.
The downside of having to define these standards is that they are always
instructions for how to read a spreadsheet pretending to serve information in a
certain way, which by definition cannot be optimized. For this reason, even on a
good day of extremely low network congestion, interactions with NFTs on any EVM
chain will cost a few dollars, but were on average around $100 per interaction
(transer, mint, sale) in 2021 on Ethereum.

This prevents use cases that go beyond the current craze of _digital dust
gathering NFTs_ on Ethereum - profile pictures, generative "look once and then
put away" art, [ENS](ens) addresses, and [proof of attendance badges](https://poap.xyz/).

![](../assets/nft/samurai.png)
_[a typical NFT on Ethereum](https://opensea.io/assets/0x2127fe7ffce4380459cced92f2d4793f3af094a4/12598)_

For the sake of comparison, we can refer to these as NFTs 1.0: static NFTs that
are almost exclusively image-based collectibles of varying rarity.

## NFTs 2.0: NFTs in Polkadot and Kusama

This is where Polkadot's technology shines and where NFTs 2.0 come into play.

By allowing [heterogeneous application-specific shards](learn-parachains) to
exist, builders are able to natively optimize for complex NFT use cases without
tradeoffs that would make interacting with the system prohibitively inefficient
and expensive in other environments.

The following NFT solutions exist and/or are under development in the Polkadot
ecosystem:

### Unique network

[Unique network](https://unique.network/), an NFT-specific blockchain offering
innovations such as sponsored transactions, bundling fungible tokens with
non-fungibles, and spliting NFTs into fungible tokens for partial ownership.

Unique Network have launched two NFT projects to date: Substrapunks as part of
[Hackusama](https://hackusama.devpost.com/), and Chelobricks as a recent
promotion during [Polkadot Decoded](https://decoded.polkadot.network/). They are
currently running a betanet which is bridged to Kusama, and on which these NFTs
are already tradable: see [Unqnft.io](https://unqnft.io).

![](https://unique.network/local/templates/unique/static/images/content/chel-400.jpg)
_Source:
[Unique network's Chelobrick](https://unique.network/blog/chelobricks-making-waves-with-10-000-substrate-based-nfts/)_

Users can send KSM into their Unique Network escrow account, trade with it
there, and then send any earned or leftover KSM back.

Unique Network aims to make their marketplace tech open source and
whitelabel-friendly. In theory, it should be trivial to set up a new marketplace
for your project using Unique's technology. Unique network aims to be a
parachain on Polkadot, and Quartz is their Kusama counterpart.

Unique Network works closely with RMRK (see below).

### RMRK

[RMRK](https://rmrk.app) is a "hack", a forced standard directly on top of the
Kusama relay chain. Since Kusama is meant to be light-weight so it can process
the various parachains connected to it, it is not meant to have any other
complex chain logic like native NFTs or smart contracts to enable them. However,
because of market demand and Kusama's "chaotic" nature, the RMRK team decided to
take the ["colored coins"](https://en.bitcoin.it/wiki/Colored_Coins) approach
from Bitcoin and implement NFTs as graffiti on the Kusama chain.

The RMRK standard is a set of rules and specifications for how to interpret
special graffiti on Kusama called "remarks", accessible via the core `system`
pallet in any Substrate chain.

The RMRK team has just launched the 2.0 version of the protocol, a set of "NFT
legos", primitives that when put together allow a builder to compose an NFT
system of arbitrary complexity without smart contracts. The "legos" are:

1. NFTs can own other NFTs, NFTs can equip other NFTs for visual change
2. NFTs can have multiple resources (different outputs based on context and
   resource priority)
3. NFTs can have on-chain emotes (reactions) for price discovery and social
   mechanics
4. NFTs have conditional rendering (e.g. show Mona Lisa as blushing if she got
   50 kissy 😘 emoji)
5. NFTs can be governed by the community via fungible shareholder-tokens
   (fractionalization of NFTs)

The upcoming version 3.0 (Q1 2022) will be pallet and smart contract (EVM)
versions of all RMRK 2.0 logic, and integration into partner chains for cheap
and easy teleportation of non-fungibles across dozens of chains.

![](../assets/nft/kanaria.png) _a multi resource NFT (gif of statue, and
SVG-composable dynamic NFT in one) that can also equip other NFTs from withing
its "inventory", from [Kanaria](https://kanaria.rmrk.app)_

The RMRK team is collaborating closely with Unique network. RMRK's logic and
technology will be deployed on Unique Network in the form of runtime upgrades
(FRAME pallets).

Two marketplaces for RMRK-based NFTs exist with hundreds of projects already
launched:

- [Singular](https://singular.rmrk.app), the official marketplace
- [Kodadot](https://kodadot.xyz), a third party marketplace

Additionally, RMRK 2.0 functionality featuring composable, nested,
multi-resource NFTs can be accessed and tested on the
[Kanaria](https://kanaria.rmrk.app) platform.

For a full introduction into RMRK see
[the video explainer of RMRK](https://url.rmrk.app/rmrkcc),
[the video explainer of Kanaria (RMRK 2)](https://url.rmrk.app/kanariacc), and
read [the docs](https://docs.rmrk.app).

### Efinity

Spearheaded by [Enjin](https://enjin.io), the authors of Ethereum's ERC1155
standard and makers of the Enjin wallet and Unity plugin which allows easy
implementation of NFTs into 3D games, Efinity is an NFT bridging chain coming to
Kusama and Polkadot in 2022.

Their plan is to build a _paratoken_ which would be a standard for token
migration across different parachains in the Polkadot ecosystem, but also into
and out of Ethereum and other EVM systems.

### Moonbeam

[Moonbeam](https://moonbeam.network) and its Kusama counterpart Moonriver are
full EVM deployments with Ethereum RPC endpoints.

This means that the entire toolkit offered to other EVM chains (stacks like
Hardhat, Remix, Truffle, Metamask...) is available to Moonriver / Moonbeam users
and developers, giving it a noticeable head start in attracting existing
userbases.

There are several dozen high profile teams launching their products (or
re-launching) on Moonriver / Moonbeam, however, it is important to note that
Moonbeam is an EVM chain and will therefore suffer from the same limitations as
any other EVM chain in regards to customization and feature-richness of NFTs.

A notable advantage, however, is that Moonriver / Moonbeam is still a Substrate
chain, meaning integration of custom pallets into the runtime is still possible,
making NFT specific optimizations at the chain runtime level a good way to keep
EVM compatibility of tools while at the same time optimizing storage and
interactions for rich NFTs.

### Uniques

Uniques is a
[FRAME pallet](https://github.com/paritytech/substrate/tree/master/frame/uniques)
deployed on the Statemint common good parachain. It is an implementation of the
most basic kind of NFT - a data record referencing some metadata. This metadata
reference is mutable until frozen, so NFTs and their classes (entities they are
derived from) are mutable unless specifically made immutable by the issuer.

Uniques takes a very bare-bones approach on purpose, to keep the Statemint chain
a simple balance-keeping chain for both fungible and non-fungibles.

Uniques NFTs can be viewed and interacted with on
[RMRK's Singular platform](https://singular.rmrk.app), by switching the top
right menu from Kusama to Statemine.

![](../assets/nft/nft-statemine.png)

The can also be interacted with directly through the
[extrinsics tab of Statemine](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama-statemine-rpc.paritytech.net#/extrinsics):

![](../assets/nft/uniques.png)

More UIs are already being developed.

## Bridging

Bridging to and from Substrate chains and EVM chains takes a lot of effort, but
is a highly desired featured in the NFT industry. Merging the collector and
customer base has big implications, so multiple projects are focusing on making
this possible.

Apart from the aforementioned RMRK (Substrate-to-Substrate seamless
teleportation natively with [XCMP](learn-crosschain)) and Efinity (Paratoken),
the following efforts are underway:

- MyNFT: an EVM to EVM bridging effort.
- RMRK<->EVM Simplification bridge: a bridge developed during the
  [RMRK hackathon](https://rmrk.devpost.com) for porting RMRK NFTs into
  simplified IOUs on EVM chains, primary deployment pending November 2022 on
  Moonriver
- RMRK<->EVM Full bridge: EVM version of RMRK 2.0 should be ready in December
  2021, meaning a full migration of RMRK 2.0 NFTs from RMRK (Kusama) to
  Moonriver (and other EVMs) will become possible
