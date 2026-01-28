---
title: NFT Projects on Polkadot and Kusama
description: Discover NFT projects in the Polkadot ecosystem, including tools, platforms, and innovative use cases.
---

!!!info "Community Page"
    This page is open to contributions from the community. Please follow the [Wiki contribution guidelines](https://github.com/w3f/polkadot-wiki#contributing-to-documentation) and add your NFT app to this page.

## List of NFT Projects

<!-- prettier-ignore -->
<!-- no toc -->

## Asset Hub

The Asset Hub is a [system chain](./learn-system-chains.md) which provides functionality for deploying
and transferring both Fungible and Non-Fungible Tokens (NFTs). The Asset Hub hosts the [NFTs pallet](./learn-nft-pallets.md#nfts-pallet) and the deprecated [Uniques pallet](./learn-nft-pallets.md#uniques-pallet).

More information about Asset Hub pallets can be found in the [NFT pallets section](./learn-nft-pallets.md).

## Astar

[Astar Network](https://astar.network/) and [Shiden Network](https://shiden.astar.network/) are smart contract platforms in the Polkadot ecosystem supporting EVM and Wasm smart contracts for NFT development.

Astar provides familiar EVM tooling for developers transitioning from Ethereum, alongside Wasm smart contract capabilities using [ink!](https://use.ink/) and [PSP34](https://github.com/w3f/PSPs/blob/master/PSPs/psp-34.md) standards.


Developer tools and documentation links:

- [General information](https://astar.network/blog/An-introduction-to-NFTs-on-Astar-38359)
- [Generating PSP34 NFTs via ink! contracts](https://docs.astar.network/docs/tutorials/from-zero-to-ink-hero/nft/)
- [EVM NFT management example](https://docs.astar.network/docs/build/EVM/astarbase/#example-use-case-discount-price-on-an-nft)

## Basilisk

[Basilisk](https://bsx.fi/) is a Kusama parachain that provides liquidity for the ecosystem. It also
has a full-featured NFT platform based on the
[Uniques pallet](https://github.com/paritytech/polkadot-sdk/tree/master/substrate/frame/uniques).
One of the key features of Basilisk is that it allows minting NFTs with a royalty fee. This royalty
fee is distributed to the original creator of the NFT via the runtime pallet. Additionally
[Basilisk offers a feature](https://github.com/galacticcouncil/Basilisk-node/tree/master/pallets/marketplace)
that allows creating a buy order for a specific NFT.

These NFTs can be viewed and interacted instantly on [KodaDot](https://kodadot.xyz/).

## Crust

Crust is primarily a storage solution. A
[separate section](https://wiki.crust.network/docs/en/buildIntegrationNFTDataStorage) is dedicated
to NFT storage solutions.

## Darwinia Network

Darwinia Network is a decentralized heterogeneous cross-chain bridge protocol built on Substrate. It
focuses on decentralized cross-chain token swap, exchange, and market and it is an EVM-compatible
blockchain.

NFT marketplace available [here](https://nft.io/collection/darwinia/assets).

## KodaDot

[KodaDot](https://kodadot.xyz/) is an open-source NFT marketplace operating across multiple chains (Polkadot and Kusama Asset Hubs, Mantle, Base, and Immutable zkEVM).

KodaDot operates as a collaborative platform with over [90 open-source contributors](https://hello.kodadot.xyz/about-us/who-are-we/achievements), earning recognition as the [top dApp in the Polkadot ecosystem on Github](https://github.com/topics/polkadot).

<div class="row">
  <div class="col text--center">
    <a href="https://www.youtube.com/watch?v=SKdx4pTgL04">
      <img src="https://img.youtube.com/vi/SKdx4pTgL04/0.jpg" width="350" style="border-radius: 10px; border: 1px solid slategrey;" />
    </a>
    <p>
      <a href="https://www.youtube.com/watch?v=SKdx4pTgL04">KodaDot Tutorial on Minting NFTs</a>
    </p>
  </div>
</div>

For minting tutorials see [this step-by-step guide](https://hello.kodadot.xyz/tutorial/minting).

### KodaDot Ecosystem Tools

KodaDot provides [API interfaces for builders](https://github.com/kodadot/uniquery) using SubSquid indexer, offering searchable collections and ownership insights. More information at [KodaDot's documentation](https://hello.kodadot.xyz/).

## MNet Continuum

MNet Continuum (ex BitCountry) specializes in providing Metaverse as a Service (MaaS) to all
networks. Their decentralized application (dApp) offers users the tools to create and customize a
metaverse, run and reward a community through immersive quests, and mint and trade NFTs. Users can
enjoy metaverse gaming, learning and networking.

[Minting And NFT Generators](https://metaversenw.gitbook.io/user-manual/nfts/what-is-an-nft)

## Moonbeam

[Moonbeam](https://moonbeam.network/) and Moonriver are full EVM deployments with Ethereum RPC endpoints, providing familiar tooling (Hardhat, Remix, Truffle, Metamask) for Ethereum developers.

As Substrate chains, they can integrate custom pallets for NFT-specific optimizations while maintaining EVM compatibility.

Available applications: [Moonbeam dApps directory](https://apps.moonbeam.network/moonbeam/app-dir)

Developer tools and documentation links:

[Minting a Cross-Chain NFT with Axelar SDK](https://docs.moonbeam.network/tutorials/interoperability/using-axelar-sdk/)
[Deploying an ERC-721 Contract Example](https://docs.moonbeam.network/tutorials/eth-api/thirdweb/)

## Mythical

[Mythical Games](https://mythicalgames.com/) is an online gaming platform that implements NFTs in
its gaming ecosystem. Mythical Games has Mythos Chain, an L1 rollup in the Polkadot ecosystem that
implements the Polkadot NFTs pallet to provide advanced NFT functionalities.

Mythical offers a platform for game developers with comprehensive documentation and onboarding
guides, to ensure anyone can get up and running in time. The primary integration path is REST APIs,
but SDKs are also available upon request.

Developer tools and documentation links:

- [The Mythical Platform API](https://docs.mythicalgames.com/mythical-platform-api)

## Nodle

The Nodle Network is a decentralized wireless network, composed of Nodle Edge Nodes, powered by the
Nodle Chain, and the NODL token.

[Nodle NFT Minting Tool](https://docs.nodle.com/nft-minting-tool)

## Unique Network

[Unique Network](https://unique.network) is a Polkadot parachain specializing in advanced NFT capabilities including dynamic, nested, fractionalized and composable NFTs. It provides a hybrid environment combining EVM and Substrate functionality.

Unique Network focuses on infrastructure for other projects rather than end-user applications. It develops XCM utilities for cross-chain NFT interoperability across the Polkadot ecosystem.

### Advanced NFT Features

Unique Network creates NFTs as independent addressable objects that can receive and contain other NFTs, forming parent/child relationships through simple transfers rather than complex contracts.

Key capabilities include:
- Nested NFT bundles containing NFTs, RFTs and fungible tokens
- Arbitrary metadata attribute structures
- Multi-asset NFTs
- Controlled attribute mutability
- Management rights separation
- Dynamic NFT capabilities
- Fractionalization (RFTs - refungible tokens)
- On-chain data obfuscation for privacy

### EVM Integration

Unique Network's EVM maps addresses to Substrate address space, allowing direct interaction between EVM applications and native Substrate objects without intermediary contracts.

Current applications using Unique Network include [TapNation](https://www.tap-nation.io/) and [ForeverHasFallen](https://foreverhasfallen.com/). More projects are listed on the [official website](https://unique.network).

## Ecosystem Overview

The Polkadot NFT ecosystem supports millions of users across multiple parachains with various tooling options:

### Integration Solutions

- **Apillon Platform**: IPFS integration and metadata management
- **Unique Network SDK**: JavaScript/TypeScript toolkit for advanced NFT features  
- **Cross-chain Development**: Tools for expanding from Ethereum-based applications

### Cross-Chain Capabilities

- **NFT XCM Integration**: Trustless cross-parachain transfers without external bridges
- **Unified Marketplaces**: Cross-chain interoperability for ecosystem-wide liquidity
- **Specialized Chains**: Different chains optimized for specific NFT use cases