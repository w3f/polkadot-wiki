---
id: learn-bridge-hub
title: Bridge Hub
sidebar_label: Bridge Hub
description: Overview of the Bridge Hub System Parachain.
keywords: [Bridge, XCM, Bridge Hub]
slug: ../learn-bridge-hub
---

The primary functionality of the {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}
relay chain is to secure the parachains and facilitate secure communication between them. All other
functionalities like asset transfers, governance, identities and bridging (a potentially resource
intensive task) can benefit from operating separately on system parachains. System parachains are
responsible for delegating functionality away from the relay chain for peformance reasons, taking
advantage of the inherent parallelization the relay chain provides.

The Bridge Hub system parachain operates on
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, and is responsible for faciliating
bridges to the wider Web3 space. It contains all required bridge
[pallets](../general/glossary.md#pallet) in its runtime, which enable trustless bridging with other
blockchain networks like {{ polkadot: Kusama :polkadot }}{{ kusama: Polkadot :kusama }}, Ethereum
etc. The Bridge Hub uses the native token of the relay chain,
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}.

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
