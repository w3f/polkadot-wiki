---
id: build-tools-index
title: Tool Index
sidebar_label: Tool Index
---

Here we provide a list of tools available for your development needs. They are sorted by programming language. Right now, the Rust ecosystem is the most mature and it's possible to get started by building on Substrate today. As the ecosystems surrounding other programming languages expand, the sections below will be filled out.

## Block Explorers

- [Polkadot-JS Apps Explorer](https://polkadot.js.org/apps/#/explorer) - Polkadot dashboard block explorer. Currently connects to Kusama by default, but can be configured to connect to other remote or local endpoints.
- [Polkascan](https://polkascan.io/) - Blockchain explorer for Polkadot, Kusama, and other related chains.
- [Subscan](https://subscan.io) - Blockchain explorer for Substrate chains.

## Wallets

See the [Wallets](build-wallets.md) page.

## Network Monitoring & Reporting

- [Polkadot Telemetry Service](https://telemetry.polkadot.io/) - Network information including what nodes are running the chain, what software versions they are running, sync status, and location.
- Polkabot - Polkadot network monitoring and reporting using Riot chat. Users may create custom bot plugins. [Blogpost](https://medium.com/polkadot-network/polkabot-a3dba18c20c8). [Github Repository](https://gitlab.com/Polkabot/polkabot)
- [PolkaStats](https://polkastats.io/) - Polkadot network statistics (includes Kusama). Shows network information and staking details from validators and intentions. [Github Repository](https://github.com/Colm3na/polkastats-v2/)

## Rust

### Clients

- [Polkadot](https://github.com/paritytech/polkadot) - Rust implementation of the Polkadot Host.

### Tools

- [Substrate](https://github.com/paritytech/substrate) - Blockchain development platform written in Rust. Polkadot is being built on top of Substrate.
- [Substrate Knowledge Base](https://substrate.dev/docs/en/) - Comprehensive documentation and tutorials for building a blockchain using Substrate.

## C++

- [Kagome](https://github.com/soramitsu/kagome) - A C++ Polkadot client developed by [Soramitsu](https://github.com/soramitsu).
- [Polkadot API Cpp](https://github.com/usetech-llc/polkadot_api_cpp) - С++ API for Polkadot

## C

- [Polkadot API - .NET](https://github.com/usetech-llc/polkadot_api_dotnet) - Polkadot Substrate API for .NET.

## Go

- [Gossamer](https://github.com/ChainSafe/gossamer) - A Go implementation of the Polkadot Host.
- [Golkadot](https://github.com/opennetsys/golkadot) - A Go implementation of Polkadot Substrate.
- [GSRPC](https://github.com/centrifuge/go-substrate-rpc-client/) - Substrate RPC client in Go, a.k.a. GSRPC.

## JS

### Client

- [Polkadot-JS client](https://github.com/polkadot-js/client) - Alternative client for JavaScript enthusiasts.

Documentation on [Polkadot-JS](https://polkadot.js.org) is a good starting point for diving deeper.

Once you've configured and started to run a local node, you can interact with it through the generic polkadot [explorer](https://polkadot.js.org/apps/#/explorer).

### Libraries

### Polkadot-JS Common

Polkadot-JS Common provides various utility functions that are used across all projects in the `@polkadot` namespace and is split into a number of internal utility packages. The documentation and usage instructions are provided at [Polkadot-JS/Common API Documentation](https://polkadot.js.org/common/).

- [@polkadot/keyring](https://polkadot.js.org/common/keyring/) To create / load accounts in JavaScript, helpful for creating wallets or any application that will require the user to write to chain. [Examples](https://polkadot.js.org/common/examples/keyring/)
- [@polkadot/util](https://polkadot.js.org/common/util/) Utility functions like checking if a string is hex-encoded.
- [@polkadot/util-crypto](https://polkadot.js.org/common/util-crypto/) Crypto utilities that will come in handy while developing with Polkadot.

### CLI Tools

- [@polkadot/api-cli](https://github.com/polkadot-js/tools/tree/master/packages/api-cli) Command line interface for the polkadot API. [Documentation](https://polkadot.js.org/api/api/)
- [@polkadot/monitor-rpc](https://github.com/polkadot-js/tools/tree/master/packages/monitor-rpc) RPC monitor for Polkadot. See the RPC tools below for additional information.
- [@polkadot/signer-cli](https://github.com/polkadot-js/tools/tree/master/packages/signer-cli) Tool to construct, sign, and broadcast transactions. Signing can be done offline.

### RPC Tools

- [@polkadot/api/rpc-provider](https://github.com/polkadot-js/api/tree/master/packages/rpc-provider) Demonstrates how the JS tools interact with the node over RPC.
- [RPC documentation](https://polkadot.js.org/api/substrate/rpc.html)
