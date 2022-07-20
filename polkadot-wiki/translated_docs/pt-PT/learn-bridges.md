---
id: learn-bridges
title: Bridges
sidebar_label: Bridges
---

A cornerstone technology of blockchain interoperability is the blockchain bridge. Blockchain bridges are ways for two economically sovereign and technologically diverse chains to communicate with each other. Bridge designs come in a variety of flavors ranging from centralized and trusted to more decentralized and trustless. Polkadot favors the latter bridge designs for its ecosystem, however there is nothing that blocks a development team from building and deploying the former.

While bridge designs are now getting to a place where they are sufficiently planned out, there has not been too many that have been used heavily in production. For this reason, you can consider this page a work in progress. It will be updated as more information is determined and available.

> Bridges are specifically for making the Polkadot ecosystem compatible for external blockchains such as Bitcoin, Ethereum, or Tezos (among others). For information on XCMP, the native interoperability technology that allows parachains to trustlessly communicate, please see the dedicated [crosschain](learn-xcm) page on the Wiki.

# Types of bridges

There are two types of bridges in the Polkadot ecosystem.

- _Bridge modules_ - Bridge modules are possibly system-level or community-deployed parachains that serve a distinct purpose as consensus-adaptors to external chains.
- _Bridge contracts_ - Similar to bridge modules, however they exist on specific parachains that support smart contracts.

## Bridge modules

Receiving messages on Polkadot from an external, non-parachain blockchain can be built as a parachain module. The parachain module can then be deployed to Polkadot either as a system-level parachain (native extension to the core Polkadot software) or as a community-operated parachain.

Bridge modules allow for non-parachains to act as a "virtual parachain" and extends the external chain's functionality with the interoperability benefits of Polkadot.

Bridge modules will be written with particular chains in mind such as Bitcoin or Ethereum. This means that blockchains that are based of these will likely be easily supported as well (e.g. Litecoin and other Bitcoin-forks).

> To learn more on how Bitcoin and Ethereum can Cooperate and Collaborate Through Polkadot, check out this explainer video [here](https://www.youtube.com/watch?v=rvoFUiOR3cM&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=3)

For the standalone chains that will not have a parachain bridging module on Polkadot, it will be necessary to deploy bridge contracts (see below).

## Bridge contracts

Those who are already familiar with Ethereum may know of the [Parity Bridge](https://github.com/paritytech/parity-bridge) and the efforts being made to connect PoA sidechains to the Ethereum mainnet. The bridge is a combination of two smart contracts, one deployed on each chain, that allow for cross-chain transfers of value. As an example of usage, the initial Parity Bridge proof of concept connects two Ethereum chains, `main` and `side`. Ether deposited into the contract on `main` generates a balance denominated in ERC-20 tokens on `side`. Conversely, ERC-20 tokens deposited back into the contract on `side` can free up Ether on `main`.

In the case of Polkadot, it should be possible to have a bridge contract deployed on, say, an EVM-based standalone chain and a contract deployed on a smart contract capable parachain. This would not necessarily be the most efficient method of bridging, but given the generality of a Turing-complete parachain it would be possible to bridge Polkadot and any other smart contract capable blockchain.

## Bitcoin Bridge

The Interlay team has written a [specification](https://interlay.gitlab.io/polkabtc-spec/) on a Bitcoin bridge that is based on the [XClaim](https://eprint.iacr.org/2018/643.pdf) design paper. The protocol enables a two-way bridge between Polkadot and Bitcoin. It allows holders of BTC to "teleport" their assets to Polkadot as PolkaBTC, and holders of PolkaBTC to burn their assets for BTC on the Bitcoin chain.

The Bitcoin bridge as documented in the specification is composed of two logically different components:

- The XCLAIM component that maintains all accounts that own PolkaBTC.
- The BTC-Relay that is responsible for verifying Bitcoin state when a new transaction is submitted.

For full details on how it works please refer to the specification.

## Ethereum Bridge

As explained by Dr. Gavin Wood in a [blog post](https://medium.com/polkadot-network/polkadot-substrate-and-ethereum-f0bf1ccbfd13) from late 2019, there are three ways that the Polkadot and Substrate ecosystem can be bridged to the Ethereum ecosystem.

1. Polkadot <-> Ethereum Public Bridge.
1. Substrate <-> Parity Ethereum (Openethereum) Bridge.
1. The Substrate EVM module.

Please read the blog article for fuller descriptions of each one of these options.

## Bridge Builders

If your team is interested in building a bridge between an external chain and Polkadot, there may be funding available from the W3F [grants program](https://github.com/w3f/General-Grants-Program). Please first check that the chain you are intending to bridge between hasn't already been built or is in the process of being built by another team. More popular chains with clear use cases will be given priority, and novel bridge designs are welcome.

## Resources

### Smart Contract Bridges

- [Edgeth Bridge](https://github.com/hicommonwealth/edgeth_bridge/) - a bridge from Ethereum to Edgeware chain (a Substrate-based chain).
- [Parity Bridge](https://github.com/paritytech/parity-bridge)
- [POA Network](https://poa.network/)
- [Case study](https://medium.com/giveth/ethereum-dapp-scaling-poa-network-acee8a51e772) of POA Network's implementation of Parity's bridge chain solution.

### Runtime Module Bridges

- [Bifrost](https://github.com/bifrost-codes/bifrost) - The Bifrost team was awarded a grant in W3F Grants [Wave 5](https://medium.com/web3foundation/web3-foundation-grants-wave-5-recipients-2205f4fde096) to build a bridge to EOS.
- [Substrate/Ethereum Bridge](https://github.com/ChainSafe/ChainBridge) - ChainSafe and Centrifuge were awarded a grant in W3F Grants [Wave 5](https://medium.com/web3foundation/web3-foundation-grants-wave-5-recipients-2205f4fde096) to build a Substrate to Ethereum two-way bridge.
- [Tendermint Bridge](https://github.com/ChorusOne) - ChorusOne was awarded a grant in [Wave 5](https://medium.com/web3foundation/web3-foundation-grants-wave-5-recipients-2205f4fde096) to build a GRANDPA light client in Tendermint.
- [Interlay BTC Bridge](https://interlay.gitlab.io/polkabtc-spec/) - The Interlay team was awarded a grant in W3F grants [Wave 5](https://medium.com/web3foundation/web3-foundation-grants-wave-5-recipients-2205f4fde096) to build a trust-minimized BTC bridge.
- [ChainX BTC Bridge](https://github.com/chainx-org/ChainX/tree/develop/cxrml/bridge/btc) - ChainX have implemented a BTC to Substrate bridge for their parachain.

### Design

- [XClaim](https://eprint.iacr.org/2018/643.pdf) - XClaim design for bridging Proof-of-Work chains in a trustless way.
