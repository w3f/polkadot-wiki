---
id: build-tools-index
title: Tool Index
sidebar_label: Tool Index
description: Reference point for a list of tools to support your development.
keywords: [tools, clients, libraries, explorers, monitor, data, SCALE]
slug: ../build-tools-index
---

Here, we provide a list of tools available for your development needs. They are sorted by context.
If you're actively maintaining a tool that might be useful to other Polkadot, Kusama or Substrate
developers, feel free to [add it in](../general/contributing.md).

## Wallets

Please see the [Wallets](https://polkadot.network/ecosystem/wallets/) page on the official website
or the [Wallets](../general/wallets-and-extensions.md) page on the Wiki for detailed information.

## Block Explorers

- [Polkadot-JS Apps Explorer](https://polkadot.js.org/apps/#/explorer) - Polkadot dashboard block
  explorer. Supports dozens of other networks, including Kusama, Westend, and other remote or local
  endpoints. [Access via IPFS](https://cloudflare-ipfs.com/ipns/dotapps.io)
- [Subscan](https://subscan.io) - Blockchain explorer for Substrate chains.
  [Repo](https://github.com/itering/subscan-essentials).
- [3xpl.com](https://3xpl.com/polkadot) - Fastest ad-free universal block explorer and JSON API with
  Polkadot support.
- [Blockchair.com](https://blockchair.com/polkadot) - Universal blockchain explorer and search
  engine with Polkadot support.
- [Statescan.io](https://www.statescan.io/) - Polkadot & Kusama Blockchain explorer.

## Blockchain Analytics

- [Dune Analytics](https://dune.com/substrate) - Community dashboards and analytics
- [DotLake](https://dashboards.data.paritytech.io/) - data visualizations for the Polkadot Ecosystem
  maintained by Parity
- [Web3go](https://app.web3go.xyz/#/) - An open platform for everyone to play with, curate and
  visualize multi-blockchain data
- [Polkawatch](https://polkawatch.app/) - Polkadot Decentralization Analytics

## Network Monitoring & Reporting

- [Polkadot Telemetry Service](https://telemetry.polkadot.io/) - Network information including what
  nodes are running the chain, what software versions they are running, sync status, and location.
- [Polkabot](https://gitlab.com/Polkabot) - Polkadot network monitoring and reporting using Matrix
  (Riot / Element) chat. Users may create custom bot plugins.
  [Blogpost](https://medium.com/polkadot-network/polkabot-a3dba18c20c8).
- [Ryabina's Telegram Bot](https://github.com/Ryabina-io/substratebot) - A Telegram bot for
  monitoring on-chain events of Substrate chains.
  [GitHub Repository](https://gitlab.com/Polkabot/polkabot)
  [GitHub Repository](https://github.com/Colm3na/polkastats-v2/).
- [Panic](https://github.com/SimplyVC/panic) - A node monitoring and alert server for validators.
- [OpenWeb3/Guardian](https://github.com/open-web3-stack/guardian) - A CLI tool and JS library to
  monitor on chain states and events.
- [Ocelloids SDK](https://github.com/sodazone/ocelloids) - Typescript SDK for multi-chain monitoring
  that supports domain-specific logic for different pallets.
- [Cyclops Dashboard](https://github.com/ArthurHoeke/cyclops/) - a validator dashboard application
  that helps Polkadot network validators keep track of all their validators, their staking rewards,
  and performance.

## Clients

- [Polkadot](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot) - The original Rust
  implementation of the Polkadot Host.
- [Kagome](https://github.com/soramitsu/kagome) - A C++ Polkadot implementation of the Polkadot Host
  developed by [Soramitsu](https://github.com/soramitsu).
- [Gossamer](https://github.com/ChainSafe/gossamer) - A Go implementation of the Polkadot Host
  developed by [ChainSafe Systems](https://chainsafe.io/).
- [TxWrapper-core](https://paritytech.github.io/txwrapper-core/) - Helper functions for offline
  transaction generation.

## Tools

- [Substrate](https://github.com/paritytech/polkadot-sdk/tree/master/substrate) - Blockchain
  development platform written in Rust. The Rust version of the Polkadot Host is being built with
  Substrate.
- [Substrate Docs](https://docs.polkadot.com/tutorials/) - Comprehensive documentation and tutorials for
  building a blockchain using Substrate.
- [Substrate VSCode plugin (deprecated)](https://github.com/paritytech/vscode-substrate).
- [Substrate Debug Kit (deprecated)](https://github.com/paritytech/substrate-debug-kit) - A
  collection of debug tools and libraries around substrate chains. Includes tools to calculate NPoS
  elections offline, disk usage monitoring, test templates against chain state and other
  pallet-specific helper.
- [POP CLI](https://github.com/r0gue-io/pop-cli) - An all-in-one tool for Polkadot development.
- [Zombienet](https://github.com/paritytech/zombienet) - Testing framework for Substrate based
  blockchains
- [Diener](https://crates.io/crates/diener) - A tool for easy changing of Polkadot or Substrate
  dependency versions.
- [Polkadot Launch (deprecated)](https://github.com/shawntabrizi/polkadot-launch) - A tool to easily
  launch custom local parachain-enabled Polkadot versions.
- [Fork-off Substrate](https://github.com/maxsam4/fork-off-substrate) - Copies the state of an
  existing chain into your local version and lets you further experiment on it.
- [srtool](https://www.chevdor.com/tags/srtool/) - A tool for verifying runtime versions against
  on-chain proposal hashes.
- [sub-bench](https://github.com/nikvolf/sub-bench) - A tool to spam your node with transactions for
  the sake of benchmarking.
- [substrate-devhub-utils](https://github.com/danforbes/substrate-devhub-utils) - A set of
  JavaScript utilities making life with Substrate a little easier.
- [sub-flood (archived)](https://github.com/NikVolf/sub-flood) - A tool to benchmark Substrate by
  flooding it with requests.
- [Apillon](https://github.com/Apillon) - A Web3 development platform with a complete toolbox and
  access to Polkadot’s technology stack.

## IDEs

- [Astar IDE](https://chainide.gitbook.io/chainide-english-1/ethereum-ide-1/13.-astar-ide) by
  [Chain IDE](https://chainide.com/) is a tool for lightning-speed smart contracts and dApp
  development for [Wasm](https://chainide.com/s/createTempProject/astar-wasm?language=en) and
  [EVM](https://chainide.com/s/createTempProject/astar-evm?language=en).
- [Sandox IDE](https://github.com/sandoxio/sandox) is an integrated development environment (IDE)
  with tools for building in the Polkadot environment. Currently helpful for creating applications
  in JS.

## UI

- [Polkadash](https://github.com/Swader/polkadash) - VueJS-based starter kit for custom user
  interfaces for Substrate chains.
- [Polkadot JS Apps UI](https://github.com/polkadot-js/apps) - Repository of the
  [polkadot.js.org/apps](https://polkadot.js.org/apps) UI.
- [Substrate Front-end Template](https://github.com/substrate-developer-hub/substrate-front-end-template) -
  ReactJS-based starter UI for custom user interfaces for Substrate chains.
- [Polkadot JS Browser Extension](https://github.com/polkadot-js/extension) - Key management in a
  Chrome extension.
- [PAPI Developer Console](https://dev.papi.how/explorer)
- [Polkadot Developer Console](https://console.polkadot.cloud/)

## Libraries

### Polkadot-JS API

The Polkadot-JS API provides various utility functions that are used across all projects in the
`@polkadot` namespace and is split into a number of internal utility packages. The documentation and
usage instructions are provided at [Polkadot-JS API Documentation](https://polkadot.js.org/docs/).

- [@polkadot/keyring](https://polkadot.js.org/docs/keyring) This allows you to create and load
  accounts in JavaScript. It is helpful for creating wallets or any application that will require
  the user to write to chain. [Examples](https://polkadot.js.org/docs/keyring/start/create).
- [@polkadot/util](https://polkadot.js.org/docs/keyring/start/install#other-dependencies) Utility
  functions like checking if a string is hex-encoded.
- [@polkadot/util-crypto](https://polkadot.js.org/docs/util-crypto/) Useful cryptographic utilities
  for developing with Polkadot.

### Alternative Libraries

The following libraries/SDKs allow for interfacing with a Substrate node in other languages:

- [Python Library by Polkascan](https://github.com/polkascan/py-substrate-interface)
- [Go Library by Centrifuge](https://github.com/centrifuge/go-substrate-rpc-client)
- [Java Library by StrategyObject](https://github.com/strategyobject/substrate-client-java)
- [Fearless Utils iOS Swift SDK](https://github.com/soramitsu/fearless-utils-iOS)
- [Nova Wallet iOS/Swift Substrate SDK](https://github.com/nova-wallet/substrate-sdk-ios)
- [Kotlin SDK](https://github.com/soramitsu/fearless-utils-Android)
- [Dart/Flutter Library](https://github.com/leonardocustodio/polkadart)

### CLI Tools

- [@polkadot/api-cli](https://github.com/polkadot-js/tools/tree/master/packages/api-cli) Command
  line interface for the polkadot API. [Documentation](https://polkadot.js.org/docs/api/start).
- [@polkadot/monitor-rpc](https://github.com/polkadot-js/tools/tree/master/packages/monitor-rpc) An
  RPC monitor for Polkadot. See the RPC tools below for additional information.
- [@polkadot/signer-cli](https://github.com/polkadot-js/tools/tree/master/packages/signer-cli) A
  Tool to construct, sign, and broadcast transactions. Signing can be done offline.
- [Polkadot API Cpp](https://github.com/usetech-llc/polkadot_api_cpp) - A С++ API for Polkadot, can
  build `clip`, a command line tool.
- [Subkey](https://docs.polkadot.com/polkadot-protocol/basics/accounts/#using-subkey) - Command line utility
  for generating and inspecting key pairs.

### WASM

WebAssembly related tools and projects.

- [ink!](https://github.com/paritytech/ink/) - An eDSL to write WebAssembly based smart contracts
  using the Rust programming language.
- [parity-wasm](https://github.com/paritytech/parity-wasm) - Low-level WebAssembly format library.
- [wasm-utils](https://github.com/paritytech/wasm-utils) - Collection of WebAssembly utilities used
  in pwasm-ethereum and substrate contract development.
- [wasmi](https://github.com/paritytech/wasmi) - A WebAssembly interpreter conceived as a component
  of parity-ethereum (Ethereum-like contracts in Wasm) and Substrate.

### RPC and API Tools

- [@polkadot/api/rpc-provider](https://github.com/polkadot-js/api/tree/master/packages/rpc-provider)
  Demonstrates how the JS tools interact with the node over RPC.
- [RPC documentation](https://polkadot.js.org/docs/substrate/rpc) - Documentation of Substrate RPC
  methods.
- [Polkadot API Server by SimplyVC](https://github.com/SimplyVC/polkadot_api_server) - A wrapper
  around the Polkadot API which makes it easier to make Polkadot API calls from any programming
  language.
- [Go: Subscan API](https://github.com/itering/substrate-api-rpc) - Go API for Polkadot.
- [C++ Polkadot API](https://github.com/usetech-llc/polkadot_api_cpp) - С++ API for Polkadot.
- [.NET Polkadot/Substrate API](https://github.com/SubstrateGaming/Substrate.NET.API) - Core
  Framework for Substrate in .NET and connect to nodes.
- [.NET Toolchain Polkadot/Substrate API](https://github.com/SubstrateGaming/Substrate.NET.Toolchain) -
  Toolchain to generate Polkadot/Substrate API & Service Layer for .NET.
- [.NET Polkadot API](https://github.com/usetech-llc/polkadot_api_dotnet) - Polkadot Substrate API
  for .NET.
- [Python Polkadot API](https://github.com/polkascan/py-substrate-interface) - Polkadot library for
  Python.
- [GSRPC](https://github.com/centrifuge/go-substrate-rpc-client/) - Substrate RPC client in Go,
  a.k.a. GSRPC.
- [Substrate API Sidecar](https://github.com/paritytech/substrate-api-sidecar) - An HTTP wrapper for
  Substrate, abstracting some complex RPC calls into simple REST calls.
- [Subxt](https://github.com/paritytech/substrate-subxt) - A Rust library to submit extrinsics to a
  Substrate node via RPC.

### GAME ENGINE SDK

- [Polkadot SDK for Unity](https://github.com/PolkadotPlay/Polkadot.Unity.SDK) - A powerful toolkit
  that integrates substrate seamless into Unity projects.
  ([AssetStore](https://assetstore.unity.com/packages/decentralization/infrastructure/polkadot-sdk-for-unity-273535),
  [wiki](https://github.com/PolkadotPlay/Polkadot.Unity.SDK/wiki)).

### SCALE Codec

The SCALE (Simple Concatenated Aggregate Little-Endian) Codec is a lightweight, efficient, binary
serialization and deserialization codec.

It is designed for high-performance, copy-free encoding and decoding of data in resource-constrained
execution contexts, such as the Substrate runtime. It is not self-describing in any way and assumes
the decoding context has all type knowledge about the encoded data.

It is used in almost all communication to/from Substrate nodes, so implementations in different
languages exist:

- [Substrate Awesome](https://github.com/substrate-developer-hub/awesome-substrate#scale-codec)
  maintains a list of SCALE codex implementations.

## Data Crawling and Conversion

The following tools help you extract and structure data from a Substrate node.

- [Parity's Substrate Archive](https://github.com/paritytech/substrate-archive) - Can be run
  alongside a Substrate node to archive all blocks, state, and extrinsic data into PostgreSQL
  database.
- [SQD Archives](https://github.com/subsquid/squid-archive-setup) - Generate a GraphQL database
  from a Substrate chain's data with rich filtering and querying capabilities. The data (events,
  extrinsics, blocks) for most parachains is readily available though public archive GraphQL
  endpoints, kept in
  [Squid Archive Registry](https://github.com/subsquid/archive-registry/blob/main/archives.json)
- [Polka-store](https://github.com/TheGoldenEye/polka-store) - A tool which scans a Substrate chain
  and stores balance-relevant transactions in an SQLite database.
- [Substrate-graph](https://github.com/playzero/substrate-graph) - A compact indexer for Substrate
  based nodes providing a GraphQL interface.
