---
id: learn-comparisons
title: Polkadot comparisons
sidebar_label: Other comparisons
---

Polkadot is a blockchain technology but makes some innovations that sets it apart from other popular chains.

## [Ethereum 2.0](learn-comparisons-ethereum-2)

## [Cosmos](learn-comparisons-cosmos)

## [Dfinity](learn-comparisons-dfinity)

## Ethereum 1.x

[Ethereum](https://ethereum.org) is a smart contract platform blockchain that allows for general computation to be deployed on-chain and operated across the p2p network. Ethereum 1.x refers to the current Ethereum release (at the time of writing at the Muir Glacier hard fork) and the immediately planned future upgrades.

The difference between Ethereum 1.x and Polkadot is quite large. Ethereum is a single chain that allows developers to extend its functionality through the deployment of blobs of code onto the chain (called smart contracts). Polkadot, as described in the whitepaper, is a fully extensible and scalable blockchain network that provides security and interoperability through shared state.

In practical terms, this means that the layer of abstraction between these two projects is remarkably different for developers. In Ethereum, developers write smart contracts that all execute on a single virtual machine. In Polkadot, however, developers write their logic into individual blockchains, where the interface is part of the state transition function of the blockchain itself. Polkadot will also support smart contract blockchains for Wasm and EVM to provide compatibility with existing contracts.

## Tezos

[Tezos](https://tezos.com) is a blockchain that can evolve by upgrading itself. Two interesting feature to compare Polkadot to is its governance mechanism and smart contracts.

Tezos is described as __self-amending__ because it can enact an upgrade to the chain without having to fork. Likewise, Polkadot allows for any parachain to integrate this functionality and the relay chain itself is able to be upgraded through an on-chain process. Since Polkadot state transition functions are just Wasm blobs to perform an upgrade (after it has been approved by the governance system) simply means switching out the code blob for which validators are validating against.

Another feature of Tezos is its smart contract language [Michelson](https://www.michelson-lang.com/) which facilitates formal verification of the written logic. Formal verification is a tool which can help to prevent bugs that could lead to unwanted state transitions. Although Polkadot is currently written in the Rust language, which lacks the same level of formal verification tools as Tezos' implementation language OCaml, Rust is considered a safer language than C or C++ for systems programming. Furthermore, Polkadot makes no restrictions to parachains written in more friendly languages for formal verification-- the only requirement is that the logic must compile to Wasm. It is expected that some chains will emerge written with formal verification as a first class property. Additionally, the tooling ecosystem around both Rust and Wasm are both maturing and formal verification tools may at some point become more widely available for these languages.
