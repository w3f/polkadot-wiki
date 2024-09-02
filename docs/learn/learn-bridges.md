---
id: learn-bridges
title: Bridges
sidebar_label: Bridges
description: Bridges and Examples of Common Bridges.
keywords: [bridges, cross-chain, bridge methods]
slug: ../learn-bridges
---

import DocCardList from '@theme/DocCardList';

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
blockchains such as Bitcoin and Ethereum. For information on XCM, the native interoperability
technology that allows parachains to communicate trustlessly, please see the dedicated
[cross consensus](learn-xcm.md) page on the Wiki.

:::

<DocCardList />

## Bridge Comparison

Snowbridge and Hyperbridge are two trustless bridges that connect Polkadot with other ecosystems.
Here below a main technical comparison between the two.

:::info Under Development

Trustless bridges like Snowbridge and Hyperbridge are under development. Information in this table
will be updated accordingly.

:::

|                                                             Snowbridge                                                             |                                             Hyperbridge                                             |
| :--------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: |
|                                                           Ethereum only.                                                           |                                             Multichain.                                             |
|                      Ethereum light client on [Bridge Hub System Chain](./learn-system-chains.md#bridge-hub).                      |                                            Own parachain                                            |
|                                                    [DOT token](./learn-DOT.md).                                                    |                                      Hyperbridge native token.                                      |
|                                                       Random-sampling BEEFY.                                                       |                                       Zero-knowledge Proofs.                                        |
|                                       Simple codebase, but complex analysis by the verifier.                                       |                       Complex codebase, but simple analysis by the verifier.                        |
|                                           Low-spec hardware for prover, permissionless.                                            | High-spec hardware for prover, permissionless but somewhat permissioned due to the ZK-based nature. |
| High-latency as two epochs (15-20 minutes) are needed on Ethereum to achieve unpredictable randomness to updated Polkadot's state. |                           Low-latency, 5-7 minutes on reference hardware.                           |
|                                                No dependency on external libraries.                                                |                      Dependency on external libraries due to ZK-based nature.                       |
|                                                               Live.                                                                |                                             On Testnet.                                             |

Note that WETH sent through different bridges are different. Unless specific logic is implemented,
WETH sent through Snowbridge cannot be sent back using Hyperbridge. Because Snowbridge is deployed
on a system chain, Snowbridge WETH can be considered as the "official" WETH on Polkadot (although
this must not be interpreted as a positive sign for Snowbridge and negative sign for Hyperbridge).

## Bridging Methods

Building a bridge that is as decentralised and trustless as possible can be done through any of the
following methods (ordered by suggested methodology):

- _Bridge pallets_ - For Substrate-native chains, use a bridge pallet (e.g. Kusama `<->` Polkadot
  bridge, since both networks' parachains use Substrate).
- _Smart contracts_ - If the chain is not on Substrate, you should have smart contracts on the
  non-Substrate chain to bridge (e.g. Ethereum mainnet will have a bridge smart contract that
  initiates Eth transactions based on incoming XCMP messages).
- _Higher-order protocols_ - If your chain does not support smart contracts (e.g. Bitcoin), you
  should use [XClaim](https://eprint.iacr.org/2018/643.pdf) or similar protocols to bridge.

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

Those who are already familiar with Ethereum may know of the now archived
[Parity Bridge](https://github.com/paritytech/parity-bridge) and the efforts being made to connect
PoA sidechains to the Ethereum mainnet. The Parity bridge is a combination of two smart contracts,
one deployed on each chain, that allow for cross-chain transfers of value. As an example of usage,
the initial Parity Bridge proof of concept connects two Ethereum chains, `main` and `side`. Ether
deposited into the contract on `main` generates a balance denominated in ERC-20 tokens on `side`.
Conversely, ERC-20 tokens deposited back into the contract on `side` can free up Ether on `main`.

:::note

To learn more on how Bitcoin and Ethereum can cooperate and collaborate Through
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, check out this explainer video
[here](https://www.youtube.com/watch?v=rvoFUiOR3cM)

:::

### via Higher-Order Protocols

Higher-order protocols (like [XCLAIM](https://eprint.iacr.org/2018/643.pdf)) can be used to bridge
but should only be used when other options are not available. XCLAIM, in particular, requires any
swappable asset to be backed by a collateral of higher value than the swappable assets, which adds
additional overhead.

An example of a network that would be well-suited for higher-order protocols would be Bitcoin, since
it does not support smart-contracts and it's not based on Substrate.

## Trustless Bridges on Bridge Hub

A two-way trustless bridge between chains A and B can be viewed as two one-way bridges (A → B and B
→ A). Hence, the design of a two-way bridge can be explained in terms of a one-way bridge with a
source and a target chain. Any bridge operating on the Bridge Hub will have on-chain (pallets) and
offchain (relayers) components.

Examples of trustless bridges on Bridge Hub include:

- Snowfork, a decentralized bridge between Polkadot and Ethereum
- [The Polkadot-to-Kusama Bridge](./learn-DOT-KSM-bridge.md)

### On-chain Bridge Components

On-chain bridge components are modules (pallets or smart contracts) that are deployed on the chain's
runtime. Modules that track the finality of the source chain are required to be deployed on the
target chain, while the modules that deal with cross-chain messaging need to be deployed on both,
source and target chains.

Operating a bridge between chains that finalize through GRANDPA consensus is straight-forward. A
GRANDPA light client of the source chain built into the target chain's runtime provides a "source of
truth" about the source chain's finality. For instance, Polkadot Bridge Hub runs an on-chain light
client of Kusama which uses GRANDPA consensus and infers the finality of all the transactions on
Kusama and its parachains.

Operating a bridge between chains with different consensus models can require a sophisticated
design. For instance, {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} Bridge Hub
needs to run an on-chain light client of Ethereum to infer the finality of transactions on Ethereum
chain. On the other hand, running a GRANDPA light client through smart contracts on Ethereum is
possible but can be very expensive. Hence, BEEFY (Bridge Efficiency Enabling Finality Yielder)
consensus layer has been added to {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}
which enables a cost effective solution for operating a trustless bridge with Ethereum. Trustless
bridges to chains like Solana, Cosmos, Avalanche, NEAR etc. would require custom pallets to be
deployed on {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} Bridge Hub.

There are also on-chain components that are responsible for queuing messages at the source chain and
for receiving the messages proofs at the target chain. The messages are sent through a particular
**lane**, where they are guaranteed to be received in the same order they are sent. On
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} Bridge Hub, the messages are in XCM
format and an XCM executor is used to dispatch them.

### Offchain Bridge Components

Offchain bridge components are separate processes, called relayers. Relayers are connected both to
the source chain and target chain nodes. For instance, the task of relayer between chains that run
on GRANDPA consensus is to submit source chain GRANDPA justifications and their corresponding
headers to the Bridge GRANDPA Finality Pallet deployed at the target chain. For that, the relayer
subscribes to the source chain GRANDPA justifications stream and submits every new justification it
sees to the target chain GRANDPA light client.

Messages between chains are relayed through the relayers, which involve messages delivery relay and
delivery confirmation relay. For more information on relayers and the Bridge Hub design, read
through the
[high level documentation on bridges on the Polkadot-SDK repository](https://github.com/paritytech/polkadot-sdk/blob/master/bridges/docs/high-level-overview.md).

## Examples

### Ethereum Bridge (Smart Contracts <-> Polkadot)

As explained by Dr. Gavin Wood in a
[blog post](https://medium.com/polkadot-network/polkadot-substrate-and-ethereum-f0bf1ccbfd13) from
late 2019, there are three ways that the
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} and Substrate ecosystem can be
bridged to the Ethereum ecosystem.

1. {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} <-> Ethereum Public Bridge.
1. Substrate <-> Parity Ethereum (Openethereum) Bridge.
1. The Substrate EVM module.

Please read the blog article for fuller descriptions of each one of these options.

### Bitcoin Bridge (XCLAIM <-> Substrate <-> Polkadot)

The Interlay team has written a [specification](https://spec.interlay.io/) on a Bitcoin bridge that
is based on the [XCLAIM](https://eprint.iacr.org/2018/643.pdf) design paper. The protocol enables a
two-way bridge between Polkadot and Bitcoin. It allows holders of BTC to "teleport" their assets to
Polkadot as iBTC, and holders of iBTC to burn their assets for BTC on the Bitcoin chain.

The Bitcoin bridge, as documented in the specification, is composed of two logically different
components:

- The XCLAIM component maintains all accounts that own iBTC.
- The BTC-Relay is responsible for verifying the Bitcoin state when a new transaction is submitted.

For full details on how it works, please refer to the specification.

There is now a
[working implementation and mainnet bridge available](https://app.interlay.io/btc?tab=issue).

## Additional Resources and Examples

- [Snowbridge - a trustless, decentralized bridge between Polkadot and Ethereum](https://docs.snowbridge.network/)
- [Parity Bridges Common Resources](https://github.com/paritytech/parity-bridges-common)
- [Substrate/Ethereum Bridge](https://github.com/ChainSafe/ChainBridge) - ChainSafe and Centrifuge
  were awarded a grant in W3F Grants
  [Wave 5](https://medium.com/web3foundation/web3-foundation-grants-wave-5-recipients-2205f4fde096)
  to build a Substrate to Ethereum two-way bridge.
- [iBTC (Bitcoin <-> Polkadot Bridge)](https://docs.interlay.io/#//)
- [EOS Bridge](https://github.com/bifrost-codes/bifrost) - The Bifrost team was awarded a grant in
  W3F Grants
  [Wave 5](https://medium.com/web3foundation/web3-foundation-grants-wave-5-recipients-2205f4fde096)
  to build a bridge to EOS.
- [Tendermint Bridge](https://github.com/ChorusOne/tendermint-light-client) - ChorusOne was awarded
  a grant in
  [Wave 5](https://medium.com/web3foundation/web3-foundation-grants-wave-5-recipients-2205f4fde096)
  to build a GRANDPA light client in Tendermint.
- [Interlay BTC Bridge](https://app.interlay.io/btc?tab=issue) - The Interlay team was awarded a
  grant in W3F grants
  [Wave 5](https://medium.com/web3foundation/web3-foundation-grants-wave-5-recipients-2205f4fde096)
  to build a trust-minimized BTC bridge.
- [ChainX BTC Bridge](https://github.com/chainx-org/ChainX/tree/master/xpallets/gateway/bitcoin) -
  ChainX have implemented a BTC to Substrate bridge for their parachain.
- [POA Network](https://poa.network/)
- [Case study](https://medium.com/giveth/ethereum-dapp-scaling-poa-network-acee8a51e772) of POA
  Network's implementation of Parity's bridge chain solution.
- [Edgeth Bridge](https://github.com/hicommonwealth/edgeth_bridge/) - a bridge from Ethereum to
  Edgeware chain (a Substrate-based chain) - now defunct and not maintained, but a good example.
- [XCLAIM](https://eprint.iacr.org/2018/643.pdf) - XCLAIM is a framework for achieving trustless and
  efficient cross-chain exchanges using cryptocurrency-backed assets.
- [Celer cBridge](https://github.com/celer-network/cBridge-contracts) - a bridge to transfer assets
  from Ethereum & Binance Smart Chain to the Astar Polkadot EVM.
