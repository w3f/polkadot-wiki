---
id: learn-nft-projects
title: NFT projects on Polkadot and Kusama
sidebar_label: NFT Projects
description: NFT Projects in the Polkadot Ecosystem.
keywords: [NFT, non-fungible token, NFT 2.0]
slug: ../learn-nft-projects
---

!!!info "Community Page"
    This page is open to contributions from the community. Please follow the
    [Wiki contribution guidelines](https://github.com/w3f/polkadot-wiki#contributing-to-documentation) and add your NFT app to this page.

## List of NFT Projects

<!-- prettier-ignore -->
<!-- no toc -->

  - [List of NFT Projects](#list-of-nft-projects)
  - [Astar](#astar)
  - [Basilisk](#basilisk)
  - [KodaDot](#kodadot)
    1. [The Team Behind KodaDot](#the-team-behind-kodadot)
    2. [Ecosystem Tools by KodaDot](#ecosystem-tools-by-kodadot)
  - [Moonbeam](#moonbeam)
  - [RMRK](#rmrk)
    1. [NFT Legos](#nft-legos)
    2. [NFT from Kanaria](#nft-from-kanaria)
  - [Asset Hub](#asset-hub)
  - [Unique Network](#unique-network)

## Astar

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
WASM smart contracts, developers can develop solutions like [RMRK](#rmrk) with smart contracts.

## Basilisk

[Basilisk](https://bsx.fi/) is a Kusama parachain that provides liquidity for the ecosystem. It also
has a full-featured NFT platform based on the
[Uniques pallet](https://github.com/paritytech/polkadot-sdk/tree/master/substrate/frame/uniques).
One of the key features of Basilisk is that it allows minting NFTs with a royalty fee. This royalty
fee is distributed to the original creator of the NFT via the runtime pallet. Additionally
[Basilisk offers a feature](https://github.com/galacticcouncil/Basilisk-node/tree/master/pallets/marketplace)
that allows creating a buy order for a specific NFT.

These NFTs can be viewed and interacted instantly on [KodaDot](https://kodadot.xyz).

![nft-basilisk](../assets/nft/nft-basilisk.png)

## [KodaDot](https://kodadot.xyz)

[KodaDot](https://kodadot.xyz) is an open-source NFT marketplace that operates on the Dotsama
(Kusama/Polkadot) network, striving to aggregate various NFT standards (Kusama, RMRK, Asset Hub,
Basilisk, etc.) in the Dotsama ecosystem, enhancing user experience by abstracting these standards.

KodaDot's strength lies in its commitment to open-source collaboration. It has transformed into a
collaborative hub where creators, developers, and community members work collectively for decision
making, amassing an extensive network of over
[90 open-source contributors](https://hello.kodadot.xyz/about-us/who-are-we/achievements). This
robust collaboration has earned KodaDot the [number one rank as a dapp in the Polkadot ecosystem on Github](https://github.com/topics/polkadot).

See below a video tutorial about how to mint your NFT on [the Polkadot Asset Hub](#asset-hub) using KodaDot.

<div class="row" style="display: flex; gap: 20px; justify-content: center;">
  <!-- Card 1 -->
  <a 
    href="https://www.youtube.com/watch?v=SKdx4pTgL04" 
    class="card-container" 
    data-aos="fade-up" 
    data-aos-delay="100" 
    style="width: 300px; height: 300px;"
  >
    <img src="https://img.youtube.com/vi/SKdx4pTgL04/0.jpg" class="card-image"/>
    <p class="card-title">KodaDot Tutorial on Minting NFTs</p>
  </a>
</div>

For more information about minting using KodaDot see
[this step-by-step tutorial](https://hello.kodadot.xyz/tutorial/minting/how-to-mint-nfts-on-polkadot-asset-hub-using-kodadot).

### The Team Behind KodaDot

KodaDot began as the first
[unofficial explorer for RMRKv0.0.1](https://kusama.polkassembly.io/motion/256)
[contributing to RMRK protocol](https://github.com/rmrk-team/rmrk-spec/issues/10). It later
[received Kusama Treasury funding](https://kusama.polkassembly.io/motion/349), which propelled the
team to create the
[best end-user experience on the Asset hub](https://kusama.polkassembly.io/motion/349).

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

### Ecosystem Tools by KodaDot

KodaDot has enriched the Polkadot ecosystem by
[offering a comprehensive API interface for builders](https://github.com/kodadot/uniquery), based on
the SQD indexer. This platform also presents searchable items and collections, translating
on-chain transactions into deep insights about collection ownership dynamics for end-users. For more
info about KodaDot check out [link](https://hello.kodadot.xyz/).

## Moonbeam

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

## RMRK

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

### NFT Legos

1. NFTs can own other NFTs, NFTs can equip other NFTs for visual change
2. NFTs can have multiple resources (different outputs based on context and resource priority)
3. NFTs can have on-chain emotes (reactions) for price discovery and social mechanics
4. NFTs have conditional rendering (e.g. show Mona Lisa as blushing if she got 50 kissy 😘 emoji)
5. NFTs can be governed by the community via fungible shareholder-tokens (fractionalization of NFTs)

### NFT from [Kanaria](https://kanaria.rmrk.app)

![kanaria.png](../assets/nft/kanaria.png)

!!!note "Multi-resource NFTs"
    A multi-resource NFT (gif of statue, and SVG-composable dynamic NFT in one) that can also equip other NFTs from within its "inventory".

Two marketplaces for RMRK-based NFTs exist with hundreds of projects already launched:

- [Singular](https://singular.rmrk.app), the official marketplace

For a complete introduction into RMRK, see [this presentation](https://url.rmrk.app/wasmconf) or read [the non-technical docs](https://docs.rmrk.app).

## Asset Hub

The Asset Hub is a generic assets parachain which provides functionality for deploying and
transferring assets — both Fungible and Non-Fungible Tokens (NFTs). The Asset Hub currently hosts
[Uniques pallet](../learn/learn-nft-pallets.md#uniques-pallet) and the
[NFTs pallet](../learn/learn-nft-pallets.md#nfts-pallet) with NFT 2.0 functionalities.

## Unique Network

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
