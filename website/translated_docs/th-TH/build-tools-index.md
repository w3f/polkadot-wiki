---
id: build-tools-index
title: Tools
sidebar_label: Tools
---

Here we provide a list of tools available for your development needs. They are sorted by programming language. Right now, the Rust ecosystem is the most mature and it's possible to get started by building on Substrate today. As the ecosystems surrounding other programming languages expand, the sections below will be filled out.

## Block Explorers

- [Polka.io](https://polka.io) - Blockchain explorer for Polkadot.
- [Polkadot-JS Apps Explorer](https://polkadot.js.org/apps/#/explorer) - Polkadot dashboard block explorer. Currently connects to the Alexander testnet by default, but can be configured to connect to other remote or local endpoints.
- [Polkascan](https://polkascan.io/) - Blockchain explorer for Polkadot. **Currently down.**

## Wallets

- [Polkadot-JS Apps - Accounts](https://polkadot.js.org/apps/#/accounts)
- [Bonds oo7 Polkadot UI](https://github.com/paritytech/substrate-ui) - built with the Bonds oo7 library.
- [Polkawallet](https://polkawallet.io/) - A mobile wallet for Polkadot on both iOs and Android. Currently in development but a Beta version is available for download. Follow development on [GitHub](https://github.com/polkawallet-io/polkawallet-RN).
- [SpeckleOS](https://www.speckleos.io/) - Browser extension wallet. In development - follow progress on [GitHub](https://github.com/SpeckleOS/speckle-browser-extension).
- [Enzyme](https://getenzyme.dev/) - Browser extension wallet. Follow development on [GitHub](https://github.com/blockxlabs/enzyme/).
- [Math Wallet](https://www.mathwallet.org) - Browser extension and mobile wallet

## Network Monitoring & Reporting

- [Polkadot Telemetry Service](https://telemetry.polkadot.io/) - Network information including what nodes are running the chain, what software versions they are running, sync status, and map showing where they are located.
- Polkabot - Polkadot network monitoring and reporting using Riot chat. Users may create custom bot plugins. [Blogpost](https://medium.com/polkadot-network/polkabot-a3dba18c20c8). [Github Repository](https://gitlab.com/Polkabot/polkabot)

## Rust

### Clients

- [Polkadot](https://github.com/paritytech/polkadot) - Rust implementation of the Polkadot Runtime Environment.

### Tools

- [Substrate](https://github.com/paritytech/substrate) - Blockchain development platform written in Rust. Polkadot is being built on top of Substrate.
- [Substrate Development Hub](https://docs.substrate.dev) - Comprehensive documentation and tutorials for building a blockchain using Substrate.

## C++

- [Kagome](https://github.com/soramitsu/kagome) - A C++ Polkadot client developed by [Soramitsu](https://github.com/soramitsu).
- [Polkadot API Cpp](https://github.com/usetech-llc/polkadot_api_cpp) - С++ API for Polkadot

## Go

- [Gossamer](https://github.com/ChainSafe/gossamer) - A Go implementation of the Polkadot Runtime Environment.

## JS

- [Polkadot-JS client](https://github.com/polkadot-js/client) - Alternative client for JavaScript enthusiasts.
- [Golkadot](https://github.com/opennetsys/golkadot) - A Go implementation of Polkadot Substrate.
- [GSRPC](https://github.com/centrifuge/go-substrate-rpc-client/) - Substrate RPC client for go aka GSRPC

## JS

### Client

- [@polkadot/keyring](https://polkadot.js.org/common/keyring/) To create / load accounts in JavaScript, helpful for creating wallets or any application which will require the user to write to chain. [Examples](https://polkadot.js.org/common/examples/keyring/)

Documentation on the [Polkadot-JS](https://polkadot.js.org) is a good starting point for diving deeper.

Once you've configured and started to run a local node, you can interact with it through the generic polkadot [explorer](https://polkadot.js.org/apps/#/explorer).

### Libraries

### Polkadot-JS Common

Polkadot-JS Common provides various useful utility functions that are used across all projects in the @polkadot namespace and is split into a number of internal utility packages as follows. The documentation and usage instructions are provided at [Polkadot-JS/Common API Documentation](https://polkadot.js.org/common/).

- [oo7-polkadot](https://github.com/polkadot-js/oo7-polkadot) A bonds library for Polkadot. [oo7 API Documentation](https://paritytech.github.io/oo7/)
- [@polkadot/util](https://polkadot.js.org/common/util/) Useful utility functions like checking if a string is hex encoded.
- [@polkadot/util-crypto](https://polkadot.js.org/common/util-crypto/) Crypto utilities that will come into handy while developing with Polkadot.

#### Bonds oo7

- [@polkadot/api-cli](https://github.com/polkadot-js/tools/tree/master/packages/api-cli) Simple commandline interface for the polkadot API. [Documentation](https://polkadot.js.org/api/api/)

### CLI Tools

- [@polkadot/api/rpc-provider](https://github.com/polkadot-js/api/tree/master/packages/rpc-provider) - Demonstrates how the JS tools interact with the node over RPC.
- [RPC documentation](https://polkadot.js.org/api/METHODS_RPC.html) - Documents Substrate RPC endpoints.

### RPC Tools

- [@polkadot/api/rpc-provider](https://github.com/polkadot-js/api/tree/master/packages/rpc-provider) - Demonstrates how the JS tools interact with the node over RPC.
- [RPC documentation](https://polkadot.js.org/api/substrate/rpc.html) - Documents Substrate RPC endpoints.
