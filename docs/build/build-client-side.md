---
id: build-client-side
title: Building Client-side Apps
sidebar_label: Building Client-side Apps
description: An overview about building clients that use Polkadot
keywords: [data, index, query, explorer, dashboard, dapp, uapp, app, frontend, client]
slug: ../build-client-side
---

As with any blockchain, building decentralized applications (dApps) is a significant part of how a
developer can build on Polkadot.

As an application developer, you can compose your front-end apps in a few different ways. Because
the relay chain and its parachains are all built using the Polkadot SDK. You can often use the same
SDK to communicate with the relay chain, a parachain, or any other Substrate-based chain.

!!!note "Substrate-based chains use an SS58 encoding for their address formats."
    Please see the [SS58 registry](https://github.com/paritytech/ss58-registry/) to see which
    [chain corresponds to a given prefix](https://github.com/paritytech/ss58-registry/blob/main/ss58-registry.json),
    and which prefixes are available.

## SDKS & Libraries

If one aims to develop a **dApp** (Decentralized App), the Polkadot ecosystem contains various SDKs
to tap into the relay chain and parachains. There are several languages already supported -
[see the tooling page for a detailed overview of different SDKs and libraries that are available.](build-tools-index.md)

## Frameworks & Toolkits

For front-end applications, several options exist for interfacing with Substrate-based chains
(parachains, relay chains, etc.) and smart contracts. These will often interact with the RPC of a
Substrate node:

=== "Polkadot.js"
    Promise and RxJS APIs around Polkadot, Kusama, and other Substrate-based chains via RPC calls. It is
    dynamically generated based on what the Substrate runtime provides regarding metadata. Full
    documentation & examples
    available&nbsp;<a href="https://polkadot.js.org/docs" target="_blank">here</a>.

=== "Polkadot API (PAPI)"
    Polkadot-API will serve as a replacement for Polkadot JS. Full documentation & examples
    available&nbsp;<a href="https://papi.how/" target="_blank">here</a>.

=== "Reactive DOT"
    A reactive library for building Substrate front-ends. Full documentation & examples
    available&nbsp;<a href="https://reactivedot.dev/" target="_blank">here</a>.

=== "Subxt"
    Query and submit extrinsics (transactions) to a Substrate node via RPC using Rust. Also referred to
    as Rust Parity. Full documentation & examples
    available&nbsp;<a href="https://github.com/paritytech/subxt" target="_blank">here</a>.

=== "React Hooks for ink!"
    React hooks library for ink! smart contracts that abstract the functionality of polkadot.js. Full
    documentation & examples available&nbsp;<a href="https://use.ink" target="_blank">here</a>.

=== "ink!athon Boilerplate"
    ink!athon is a starter kit for full-stack dApp development with ink! smart contracts and a
    React-based frontend in one place. With convenient helper scripts and a pre-configured project
    setup, you can quickly scaffold any dApp. Live example & full documentation
    available&nbsp;<a href="https://inkathon.xyz" target="_blank">here</a>.

=== "Polkadot Cloud"
    Polkadot Cloud hosts a library of assets, ranging from data sources, graphical elements, to fully
    functional components, for app developers to plug and play into their codebases.
    &nbsp;<a href="https://polkadot.cloud/" target="_blank">Learn more here</a>.

## Oracle Options

In the blockchain context, an _oracle_ is a way to bring real-world data onto the blockchain so that
it can be used by a decentralized application.

Oracles serve many purposes for application builder, as they allow for outside data (price feeds,
the ability to make HTTP requests, etc) to enter the decentralized world.

Oracle solutions range from centralized and trusted to decentralized and game-theory based. On the
centralized end of the spectrum, an oracle could be a single account that has the authority to
dictate the real-world data on-chain. On the decentralized end, a
[complex game of "chicken"](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/)
can be played among various staked actors who risk getting [slashed](../learn/learn-offenses.md) if
they don't submit the same data as everyone else.

=== "Chainlink"
    Solutions such as
    <a href="https://polkadot.network/chainlink-reaches-milestone-with-polkadot/" target="_blank" rel="noopener noreferrer">Chainlink</a>
    fit somewhere in the middle, where the amount of trust you put into the reporting oracles can be
    adjusted based on your preferences. A Chainlink
    <a href="https://github.com/smartcontractkit/chainlink-polkadot/blob/master/pallet-chainlink-feed/README.md" target="_blank" rel="noopener noreferrer">Feed
    Pallet</a> is available to allow smart contracts across smart contract-enabled parachains to access
    price reference data and is available as a Substrate oracle pallet.

=== "Acurast"
    Solutions such as <a href="https://acurast.com" target="_blank">Acurast</a> enables developers to
    delegate oracle requests to their network of phones, which provide off-chain data and computation to
    the <a href="https://docs.acurast.com/integrations/substrate" target="_blank">Acurast Pallet</a>.
    Acurast supports both Substrate (WASM) and EVM environments.

When using an oracle in your application you should be aware of the benefits and risks that are
baked into its specific model.

## Decentralized Storage Options

Storage is an integral part of modern computer systems, and the same is true for distributed and
decentralized systems like a blockchain. When interacting with the Polkadot ecosystem, it will be
helpful if you familiarize yourself with the current Web3 approach towards decentralized storage.

## DCS (Decentralized Cloud Storage)

The key attribute that characterizes centralized cloud storage is the location of data. In
decentralized cloud storage, the key attribute becomes the data itself instead of the data's
location. This can be viewed as the shift from the centralized _location-centric_ storage approach
to the decentralized _content-centric_ approach.

=== "IPFS (Interplanetary File System)"

    [IPFS](https://ipfs.io/) is a peer-to-peer distributed file system that seeks to connect all
    computing devices with the same system of files, by utilizing features such as content-addressing,
    content-signing, and enhanced security methods through encryption. IPFS aims to address the current
    hurdles of the HTTP-based Internet.

=== "Crust Storage"

    [Crust Network](https://crust.network) provides a Web3.0 decentralized storage network for the
    Metaverse. It is designed to realize core values of decentralization, privacy, and assurance. Crust
    supports multiple storage-layer protocols such as [IPFS](https://ipfs.io/), and
    exposes instant accessible on-chain storage functions to users. Crustʼs technical stack is also
    capable of supporting data manipulating and computing.

    Crust provides a native cross-chain communication pallet based on
    [XCMP](https://wiki.polkadot.network/docs/learn-xcm), called
    [xStorage](https://github.com/crustio/crust/tree/parachain/shadow/crust-collator/pallets/xstorage).

    The protocol also supports most smart contract platforms, including Ethereum, with its
    [cross-chain dStorage solution](https://wiki.crust.network/docs/en/buildCrossChainSolution).

    To learn more about Crust, check out the [Crust Network Wiki](https://wiki.crust.network/en). Try
    integrating with Crust by following their
    [Crust Storage 101](https://wiki.crust.network/docs/en/build101) guide.


=== "Filebase"
    [Filebase](https://filebase.com) is the first S3-compatible object storage platform that allows you
    to store data in a secure, redundant, and performant manner across multiple decentralized storage
    networks.

    Filebase offers a geo-redundant IPFS pinning service that allows you to pin files to IPFS across
    multiple diverse geographic locations. All files uploaded to IPFS through Filebase are automatically
    pinned to the Filebase infrastructure with 3x replication across the globe. This ensures that your
    data is globally available and redundant at all times.

    Filebase acts as an easy on-ramp to IPFS and decentralized storage by offering a user-friendly web
    console dashboard, making drag-and-dropping files onto Web3 simple and easy. Filebase also provides
    an S3-compatible API for widespread integrations and configurations in current workflows.

    To learn more about Filebase, check out the [Filebase Documentation](https://docs.filebase.com), and
    specifically the documentation on
    [deploying Polkadot dApp on decentralized storage.](https://docs.filebase.com/web3-education/web3-tutorials/polkadot/polkadot-deploy-a-polkadot-dapp-on-decentralized-storage)
    You can get started with Filebase by signing up [here.](https://filebase.com/signup)