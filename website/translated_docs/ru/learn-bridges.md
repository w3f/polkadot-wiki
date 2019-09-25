---
id: learn-bridges
title: Bridges
sidebar_label: Bridges
---

One of the central ideas in blockchain intercommunication is the role of bridges. Some of the exact details of how bridging will work in Polkadot have yet to be decided; please consider this page a work in progress. It will be updated as more details are determined.

Currently, there are three different types of bridging in Polkadot:

* *Bridge contracts* - Smart contracts deployed as bridges between Polkadot and external chains.
* *Cross-parachain communication* - No contracts needed.
* *In-built bridging modules* - Bridging to Polkadot from an external chain via a purpose-built module.

## Bridge Contracts

Those who are already familiar with Ethereum may know of the [Parity Bridge](https://github.com/paritytech/parity-bridge) and the efforts being made to connect PoA sidechains to the Ethereum mainnet. The bridge is a combination of two smart contracts, one deployed on each chain, that allow for cross-chain transfers of value. As an example of usage, the initial Parity Bridge proof of concept connects two Ethereum chains, `main` and `side`. Ether deposited into the contract on `main` generate a balance denominated in ERC-20 tokens on `side`. Conversely, ERC-20 tokens deposited back into the contract on `side` can free up Ether on `main`.

In the case of Polkadot, it should be possible to have a bridge contract deployed on, say, an EVM-based standalone chain and a contract deployed on a smart contract capable parachain. This would not necessarily be the most efficient method of bridging, but given the generality of a Turing-complete parachain it would be possible to bridge Polkadot and any other smart contract capable blockchain.

## Cross-Parachain Communication

As mentioned on the [parachains](learn-parachains) page, parachains will be able to send messages (including transactions) to each other without the need for smart contracts to perform the bridging functionality. Cross-parachain messaging will be native to Polkadot.

## In-built Bridging Modules

Receiving messages on a parachain from a non-parachain blockchain will likely be done natively within a module of the client software. This would negate the need for bridging contracts and allow non-parachains to act as "virtual parachains". Collators for the specific blockchain can then collate transactions or other state transitions, and submit them to the relay chain as if the blockchain were a parachain.

The bridging modules will likely be written with particular parachains in mind (e.g. Bitcoin, Ethereum), which means that any blockchain that's based on either of those should be able to be bridged directly to Polkadot without the need of going through a bridge contract on a parachain. This should allow for faster execution for those chains that are compatible.

For the standalone chains that don't have an in-built bridging module on Polkadot, it will be necessary to deploy bridge contracts (see above).

## Resources

### Smart Contract Bridges

- [Edgeth Bridge](https://github.com/hicommonwealth/edgeth_bridge/) - a bridge from Ethereum to Edgeware chain (a Substrate-based chain).
- [Parity Bridge](https://github.com/paritytech/parity-bridge)
- [POA Network](https://poa.network/)
- [Case study](https://medium.com/giveth/ethereum-dapp-scaling-poa-network-acee8a51e772) of POA Network's implementation of Parity's bridge chain solution.

### Runtime Module Bridges

- [ChainX BTC Bridge](https://github.com/chainx-org/ChainX/tree/develop/cxrml/bridge/btc) - ChainX have implemented a BTC to Substrate bridge for their parachain.

### Design

- [XClaim](https://eprint.iacr.org/2018/643.pdf) - XClaim design for bridging Proof-of-Work chains in a trustless way.