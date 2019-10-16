---
id: learn-implementations
title: Polkadot Implementations
sidebar_label: Polkadot Implementations
---

There are Polkadot implementations developed in Rust, C++, Go, and JavaScript.

[**Parity Polkadot**](https://github.com/paritytech/polkadot) - The Rust client is developed by Parity Technologies in concert with their work on [Substrate](https://github.com/paritytech/substrate).

[**Kagome**](https://github.com/soramitsu/kagome) - C++ implementation of the Polkadot Runtime Environment being built by [Soramitsu](https://github.com/soramitsu), a Japanese digital identity company that previously developed [Hyperledger Iroha](https://iroha.tech). They were awarded a grant from the Web3 Foundation and plan to release Kagome by [November 2019](https://medium.com/web3foundation/w3f-grants-soramitsu-to-implement-polkadot-runtime-environment-in-c-cf3baa08cbe6). As part of the process they are developing a libp2p networking layer in C++.

[**Gossamer**](https://github.com/ChainSafeSystems/gossamer) - A Go implementation being built by [ChainSafe Systems](https://github.com/ChainSafeSystems), a 23-person development team in Toronto that is also building an Eth2.0 Serenity client. [Grant announcement](https://medium.com/web3foundation/w3f-grants-chainsafe-to-implement-polkadot-runtime-environment-in-go-ca4973c9edaf).

[**Polkadot-JS**](https://github.com/polkadot-js) - A JavaScript [client](https://github.com/polkadot-js/client) and tool set developed by [Polkadot JS](https://polkadot.js.org/).

## Why build multiple implementations?

As stated in the Soramitsu grant announcement:

> It is critically important to have multiple implementations of the Polkadot protocol for a number of reasons, including decentralization, knowledge dispersion, and better definitions of the protocol... Multiple implementations of Polkadot improves network resilience and adds to the decentralization of the network. The governance of the network is more democratized when multiple teams build clients which run the nodes in the network.
