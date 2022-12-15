---
id: learn-bridges
title: Bridges
sidebar_label: Bridges
description: Learn about bridges and common bridge examples.
keywords: [bridges, cross-chain, bridge methods]
slug: ../learn-bridges
---

A cornerstone technology of blockchain interoperability is the blockchain bridge. Blockchain bridges
are ways for two economically sovereign and technologically diverse chains to communicate with each
other. Bridge designs come in a variety of flavors ranging from centralised and trusted to more
decentralised and trustless. Polkadot favors the latter bridge designs for its ecosystem. However,
there is nothing that blocks a development team from building and deploying the former.

While bridge designs are now getting to a place where they are sufficiently planned out, there have
not been too many used heavily in production. For this reason, you can consider this page a work in
progress. It will be updated as more information is determined and available.

:::info Purpose of bridging

Bridges are specifically for making the
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} ecosystem compatible with external
blockchains such as Bitcoin, Ethereum, or Tezos (among others). For information on XCM, the native
interoperability technology that allows parachains to communicate trustlessly, please see the
dedicated [cross consensus][] page on the Wiki.

:::

## Bridging Methods

Building a bridge that is as decentralised and trustless as possible can be done through any of the
following methods (ordered by suggested methodology):

- _Bridge pallets_ - For Substrate-native chains, use a bridge pallet (e.g. Kusama `<->` Polkadot
  bridge, since both networks' parachains use Substrate).
- _Smart contracts_ - If the chain is not on Substrate, you should have smart contracts on the
  non-Substrate chain to bridge (e.g. Ethereum mainnet will have a bridge smart contract that
  initiates Eth transactions based on incoming XCMP messages).
- _Higher-order protocols_ - If your chain does not support smart contracts (e.g. Bitcoin), you
  should use [XClaim][xclaim] or similar protocols to bridge.

### via Bridge Pallets

Receiving messages on {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} from an
external, non-parachain blockchain can be possible through a Substrate pallet. The Substrate
instance can then be deployed to {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}
either as a system-level parachain (native extension to the core
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} software) or as a community-operated
parachain.

An example of a bridge that would strictly use bridge pallets would be a Kusama `<->` Polkadot
bridge, since both use parachains based on Substrate.

For the standalone chains that will not have a parachain bridging module on
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} (non-Substrate), it will be necessary
to deploy bridge contracts (see below).

### via Smart Contracts

Given the generality of blockchain platforms with Turing-complete smart contract languages, it is
possible to bridge {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} and any other
smart contract capable blockchain.

Those who are already familiar with Ethereum may know of the now archived [Parity Bridge][] and the
efforts being made to connect PoA sidechains to the Ethereum mainnet. The Parity bridge is a
combination of two smart contracts, one deployed on each chain, that allow for cross-chain transfers
of value. As an example of usage, the initial Parity Bridge proof of concept connects two Ethereum
chains, `main` and `side`. Ether deposited into the contract on `main` generates a balance
denominated in ERC-20 tokens on `side`. Conversely, ERC-20 tokens deposited back into the contract
on `side` can free up Ether on `main`.

:::note

To learn more on how Bitcoin and Ethereum can cooperate and collaborate Through
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, check out this explainer video
[here](https://www.youtube.com/watch?v=rvoFUiOR3cM)

:::

### via Higher-Order Protocols

Higher-order protocols (like [XCLAIM][xclaim]) can be used to bridge but should only be used when
other options are not available. XCLAIM, in particular, requires any swappable asset to be backed by
a collateral of higher value than the swappable assets, which adds additional overhead.

An example of a network that would be well-suited for higher-order protocols would be Bitcoin, since
it does not support smart-contracts and it's not based on Substrate.

## Examples

### Ethereum Bridge (Smart Contracts <-> Polkadot)

As explained by Dr. Gavin Wood in a [blog post][eth bridging blog] from late 2019, there are three
ways that the {{ polkadot: Polkadot :polkadot }}{{ kusama: KUsama :kusama }} and Substrate ecosystem
can be bridged to the Ethereum ecosystem.

1. {{ polkadot: Polkadot :polkadot }}{{ kusama: KUsama :kusama }} <-> Ethereum Public Bridge.
1. Substrate <-> Parity Ethereum (Openethereum) Bridge.
1. The Substrate EVM module.

Please read the blog article for fuller descriptions of each one of these options.

### Bitcoin Bridge (XCLAIM <-> Substrate <-> Polkadot)

The Interlay team has written a [specification][interlay] on a Bitcoin bridge that is based on the
[XCLAIM][] design paper. The protocol enables a two-way bridge between Polkadot and Bitcoin. It
allows holders of BTC to "teleport" their assets to Polkadot as PolkaBTC, and holders of PolkaBTC to
burn their assets for BTC on the Bitcoin chain.

The Bitcoin bridge, as documented in the specification, is composed of two logically different
components:

- The XCLAIM component maintains all accounts that own PolkaBTC.
- The BTC-Relay is responsible for verifying the Bitcoin state when a new transaction is submitted.

For full details on how it works, please refer to the specification.

There is now a
[reference implementation and testnet available](https://medium.com/interlay/polkabtc-beta-testnet-launch-2cc9ea7431b7).

## Additional Resources and Examples

- [Parity Bridges Common Resources](https://github.com/paritytech/parity-bridges-common)
- [Substrate/Ethereum Bridge](https://github.com/ChainSafe/ChainBridge) - ChainSafe and Centrifuge
  were awarded a grant in W3F Grants [Wave 5][] to build a Substrate to Ethereum two-way bridge.
- [PolkaBTC (Bitcoin <-> Polkadot Bridge)](https://docs.polkabtc.io/#/)
- [EOS Bridge][bifrost] - The Bifrost team was awarded a grant in W3F Grants [Wave 5][] to build a
  bridge to EOS.
- [Tendermint Bridge](https://github.com/ChorusOne/tendermint-light-client) - ChorusOne was awarded
  a grant in [Wave 5][] to build a GRANDPA light client in Tendermint.
- [Interlay BTC Bridge][interlay] - The Interlay team was awarded a grant in W3F grants [Wave 5][]
  to build a trust-minimized BTC bridge.
- [ChainX BTC Bridge](https://github.com/chainx-org/ChainX/tree/master/xpallets/gateway/bitcoin) -
  ChainX have implemented a BTC to Substrate bridge for their parachain.
- [POA Network](https://poa.network/)
- [Case study](https://medium.com/giveth/ethereum-dapp-scaling-poa-network-acee8a51e772) of POA
  Network's implementation of Parity's bridge chain solution.
- [Edgeth Bridge](https://github.com/hicommonwealth/edgeth_bridge/) - a bridge from Ethereum to
  Edgeware chain (a Substrate-based chain) - now defunct and not maintained, but a good example.
- [XCLAIM][] - XCLAIM is a framework for achieving trustless and efficient cross-chain exchanges
  using cryptocurrency-backed assets.

[cross consensus]: learn-xcm.md
[parity bridge]: https://github.com/paritytech/parity-bridge
[interlay]: https://interlay.gitlab.io/polkabtc-spec/
[xclaim]: https://eprint.iacr.org/2018/643.pdf
[bifrost]: https://github.com/bifrost-codes/bifrost
[wave 5]: https://medium.com/web3foundation/web3-foundation-grants-wave-5-recipients-2205f4fde096
[eth bridging blog]:
  https://medium.com/polkadot-network/polkadot-substrate-and-ethereum-f0bf1ccbfd13
