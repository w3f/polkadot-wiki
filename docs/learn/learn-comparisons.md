---
id: learn-comparisons
title: Polkadot Comparisons
sidebar_label: Comparisons
description: Comparison between Polkadot and other Networks.
keywords:
  [
    comparisons,
    Polkadot,
    blockchain,
    rollups,
    polkadot,
    scalability,
    shared,
    security,
    parachain,
    ethereum,
  ]
slug: ../learn-comparisons
---

import DocCardList from '@theme/DocCardList';

## Rollup Comparison

**Rollups** are an L2 scaling solution. At the most basic level, a rollup L2 solution is responsible
for "rolling up" transactions by batching them before publishing them to the L1 chain, usually
through a network of **sequencers**. This mechanism could include thousands of transactions in a
single rollup.

:::info Layer Two

Layer two (L2) networks are popular as being the way forward for blockchain scalability by
off-loading the majority of computation from layer one (L1) networks. L2 solutions utilize the L1
network's security and functionality to build an additional layer that is often faster, reduces
fees, and solves other platform-specific issues. In many cases, L2 solutions focus on utilizing L1
blockspace efficiently and cost-effectively.

:::

In this section we explore the main differences in rollup technology between:

- Polkadot rollups (i.e. parachains),
- Optimistic rollups, and
- Zero-knowledge rollups.

**Security**: ZK Rollups offer the highest cryptographic security, while Optimistic Rollups depend
on challenge mechanisms. Polkadot's shared security model provides robust guarantees with lower
reliance on external mechanisms.

**Centralization Risk**: ZK Rollups and Optimistic Rollups may face centralization risks in their
sequencers or validators, whereas Polkadot parachains benefit from decentralized validator
consensus.

**Interoperability**: Polkadot excels in interoperability through its native XCM and XCMP protocols,
allowing parachains to interact seamlessly. Rollups are generally ecosystem-bound.

| **Feature**                | **ZK Rollups**                                                                                                 | **Optimistic Rollups**                                                                                      | **Polkadot Parachains/Rollups**                                                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Finality**               | Near-instant finality. Because the proof is immediately available, finality is also instantaneous.             | Delayed finality (a week) due to fraud-proof mechanisms.                                                    | Fast finality (under 1 minute) via the relay chain's consensus mechanism.                                                                  |
| **Security Model**         | Relies on cryptographic validity proofs, ensuring high security and no reliance on game-theoretic assumptions. | Relies on economic incentives and a challenge period to catch fraud, making it less secure than ZK Rollups. | Shared security is native, leveraging Polkadot's validator set and erasure coding for data availability. Strong Byzantine fault tolerance. |
| **Scalability**            | High, but limited by computational expense and challenges in building generalized ZK circuits.                 | High, with better parallelization, but constrained by gas limitations in parent chains like Ethereum.       | Inherently scalable through native sharding and parachains operating in parallel.                                                          |
| **Decentralization**       | Risk of centralization in sequencer roles and ZK proof computation.                                            | Sequencer centralization concerns, as validators are known and fewer in number.                             | Less prone to centralization, as relay-chain validators secure all parachains.                                                             |
| **Interoperability**       | Limited to networks with compatible smart contract support.                                                    | Limited interoperability, often confined to the parent blockchain ecosystem.                                | Native interoperability through XCM and XCMP protocols, allowing seamless communication between parachains.                                |
| **Development Complexity** | Difficult to implement and optimize due to the complexity of ZK proof systems.                                 | Simpler to implement but requires careful fraud-proof logic.                                                | Moderate; any runtime compiled to Wasm is valid, simplifying parachain development.                                                        |
| **Data Availability**      | Requires posting minimal data proofs to L1. Often, the proof is enough to ensure validity.                     | Posts complete data on-chain during challenge periods, increasing cost.                                     | Built-in data availability with validators ensuring distributed state storage and reconstruction.                                          |
| **Cost Efficiency**        | High efficiency but expensive prover computation.                                                              | More cost-effective but susceptible to congestion during high usage.                                        | Cost-effective as parachains are independently scalable and not tied to L1 gas fees.                                                       |
| **Governance Upgrades**    | Subject to parent chain governance (e.g., Ethereum).                                                           | Governed by the parent chain.                                                                               | Protocol upgrades through forkless changes, enhancing adaptability.                                                                        |
| **Fraud/Validity Proofs**  | Non-interactive validity proofs.                                                                               | Fraud proofs requiring active challenges during the dispute window.                                         | Interactive approval protocols to resolve parachain block disputes.                                                                        |
| **Applications**           | Ideal for high-security use cases like financial transactions and identity.                                    | Best for general-purpose decentralized apps with moderate security requirements.                            | Supports diverse applications, including DeFi, gaming, and governance, thanks to Turing-complete parachains.                               |

### Optimistic Rollups

Optimistic rollups are an interactive scaling method for L1 blockchains. They assume
_optimistically_ that every proposed transaction is valid by default.

In the case of mitigating potentially invalid transactions, optimistic rollups introduce a
_challenge period_ during which participants may challenge a suspect rollup. A fraud-proving scheme
can be in place to allow for several _fraud proofs_ to be submitted. Those proofs could make the
rollup valid or invalid. During the challenge period, state changes may be disputed, resolved, or
included if no challenge is presented (and the required proofs are in place).

Optimistic rollups are often used in the Ethereum ecosystem. [Optimism](https://www.optimism.io/)
and [Arbitrium](https://bridge.arbitrum.io/) are optimistic EVM-based rollup.

### Zero-knowledge Rollups

Zero-knowledge rollups (often called ZK rollups) are a non-interactive method that utilizes
zero-knowledge proofs to compute the validity of a particular set of state changes. Whereas
optimistic rollups relied on fraud proofs, ZK rollups rely on cryptographic validation in the form
of ZK proofs.

Zero-knowledge rollups are significantly faster in finalization, as the cryptographic validity proof
handles the nuance of ensuring a rollup is valid. However, the ZK rollups often suffer from
performance due to their complexity and difficult implementation into resource-constrained
environments. Because Turing completeness is also challenging to achieve due to this computational
overhead, their ability to be generalized (in terms of blockspace) is reduced. However, they have a
promising future in solving some of the problems of optimistic rollups and addressing secure
scalability.

### Polkadot Rollups

Polkadot implements this functionality at the native level (i.e. without using L2 scaling
solutions), allowing for shared security and scalability of the relay chain and respective
parachains. Shared security is a concept that has similar goals to EVM-based optimistic and
zero-knowledge rollups. Still, instead of being implemented as a secondary layer, Polkadot
guarantees native security and scalability for each of its parachains through the
[Parachains Protocol](./learn-parachains-protocol.md). Polkadot handles the coordination of data
from parachains into an aggregated, representative state, somewhat similar to L2 rollups.

Whereas rollups are considered solutions for L2 protocols, Polkadot include this functionality
natively through its [Parachains Protocol](./learn-parachains-protocol.md). The Parachains Protocol,
which is how Polkadot handles network's **sharding** is meant to accomplish the combined goals of
providing security, scalability, and availability.

It enables parachains to verify their collective state and communicate with one another. Parachains
have similarities to aspects of optimistic and ZK rollups, which are reflected in how Polkadot
handles the validity and availability of the parachain state. [Collators](./learn-collator.md), a
key part of Polkadot architecture, are in principle similar to sequencers, as collators pass data
with a proof-of-validity (PoV) function for liveness and communication with the relay chain.

Each shard, or parachain, is equipped with a unique state transition function (STF). This function
ensures that communication to the relay chain remains valid. Each STF, called runtime, is written in
[Wasm](https://wiki.polkadot.network/docs/learn-wasm). Any state transition function is valid if it
compiles to Wasm and abides by the Parachains Protocol.

Each STF runs a validity proof. The proof ([the Approval Protocol](./learn-parachains-protocol.md))
is interactive, unlike ZK rollups, which are non-interactive. Additionally, unlike ZK rollups, there
are no difficulties in creating parachains with Turing-complete logic. Each parachain is also a
full-fledged state machine (usually in the form of a blockchain). Similarly to optimistic rollups,
the Parachain Protocol also has cases where disputes and resolutions of potentially harmful para
blocks (blocks representing the parachain) can take place, in which case the validators that vouched
for that parablock are [slashed](./learn-offenses.md) if it is found to be bad.

## Interoperability Comparison

In this section we explore the main differences in interoperability between Polkadot, Optimism
Superchain Ecosystem and Chainlink CCIP.

## Other Comparisons

<DocCardList />
