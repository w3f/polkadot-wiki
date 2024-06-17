---
id: learn-comparisons-rollups
title: Layer Two and Rollups
sidebar_label: Layer Two and Rollups
description: Comparison between various Rollup and L2 Protocols.
keywords: [rollups, polkadot, scalability, shared, security, parachain, ethereum]
slug: ../learn-comparisons-rollups
---

:::note

This comparison covers general information regarding two widely used rollup mechanisms that are used
to scale (usually EVM-based) blockchains and compares and contrasts how Polkadot achieves
scalability.

:::

Layer two (L2) networks are popular as being the way forward for blockchain scalability by
off-loading the majority of computation from layer one (L1) networks. L2 solutions utilize the L1
network's security and functionality to build an additional layer that is often faster, reduces
fees, and solves other platform-specific issues. In many cases, L2 solutions focus on utilizing
block space on a particular blockchain efficiently and cost-effectively.

**Rollups** are an L2 scaling solution. At the most basic level, a rollup L2 solution is responsible
for "rolling up" transactions by batching them before publishing them to the L1 chain, usually
through a network of **sequencers**. This mechanism could include thousands of transactions in a
single rollup.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} implements this functionality at the
native level (i.e. without using L2 scaling solutions), allowing for shared security and scalability
of the relay chain and respective parachains. Shared security is a concept that has similar goals to
EVM-based optimistic and zero-knowledge rollups. Still, instead of being implemented as a secondary
layer, {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} guarantees native security and
scalability for each of its parachains through the
[Parachains Protocol](./learn-parachains-protocol.md).
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} handles the coordination of data from
parachains into an aggregated, representative state, somewhat similar to L2 rollups.

## Optimistic Rollups

Optimistic rollups are an interactive scaling method for L1 blockchains. They assume
_optimistically_ that every proposed transaction is valid by default.

In the case of mitigating potentially invalid transactions, optimistic rollups introduce a
_challenge period_ during which participants may challenge a suspect rollup. A fraud-proving scheme
is in place to allow for several _fraud proofs_ to be submitted. Those proofs could make the rollup
valid or invalid. During the challenge period, state changes may be disputed, resolved, or included
if no challenge is presented (and the required proofs are in place).

While optimistic rollups provide scalability, they have both benefits and drawbacks to their
approach:

**Benefits:**

- They are not limited by the type of state change - any state change can be included, meaning
  existing apps do not have to account for it.
- They can be parallelized for scalability.
- A substantial amount of data can fit within a single rollup
  ([in the case of Ethereum, for example](https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/#scaling-ethereum-with-optimistic-rollups),
  tens of thousands of transactions in a single state transition).

**Drawbacks:**

- Transaction censorship and centralization are of concern, where sequencers/L2 nodes can be
  compromised.
- Challenge periods could take a substantial amount of time to pass, increasing time for the rollup
  to finalize onto the L1 network.
- Due to their generalist nature of including any state change for their parent network, optimistic
  rollups can run into gas limitations or cause network congestion in the case of Ethereum.

Optimistic rollups are often used in the Ethereum ecosystem. Examples of optimistic EVM-based rollup
solutions include:

- [Optimism](https://www.optimism.io/)
- [Arbitrum](https://bridge.arbitrum.io/)
- [Unipig](https://unipig.exchange/welcome)

## Zero-knowledge Rollups

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

**Benefits:**

- They only require a small amount of data availability. Often, the proof is enough to ensure
  validity.
- They can be proven trustlessly.
- Because the proof is immediately available, finality is also instantaneous.
- They have a promising future overall, as they have not reached maturity yet.

**Drawbacks:**

- They suffer from the same problems that other L2 solutions have regarding the centralization of L2
  operators.
- They are computationally expensive, and ZK circuits are difficult to implement.
- The potential for congestion is still a factor, as the amount of data could still be problematic.

## Polkadot - Native Shared Security

Whereas rollups are considered solutions for L2 protocols,
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} include this functionality natively
through its [Parachains Protocol](./learn-parachains-protocol.md). The Parachains Protocol, which is
how {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} handles network's **sharding** is
meant to accomplish the combined goals of providing security, scalability, and availability.

It enables parachains to verify their collective state and communicate with one another. Parachains
have similarities to aspects of optimistic and ZK rollups, which are reflected in how
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} handles the validity and availability
of the parachain state. [Collators](./learn-collator.md), a key part of
{{ polkadot: Polkadot's :polkadot }}{{ kusama: Kusama's :kusama }} architecture, are in principle
similar to sequencers, as collators pass data with a proof-of-validity (PoV) function for liveness
and communication with the relay chain.

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

**Benefits:**

- Protocol level sharding, shared security, and interoperability.
- Each shard has a low barrier of entry in terms of development, as anything that compiles to Wasm
  is a valid target.
- Fast Finality (usually under a minute on Polkadot).
- Data availability is built-in through validators and mechanisms like
  [erasure coding](./learn-parachains-protocol.md#erasure-codes).
- No L2 implies less of a risk of incurring centralization issues for sequencers or other L2
  operators.

**Drawbacks:**

- Execution of code in Wasm could be a performance bottleneck, as it is slower than making native
  calls.
- The relay chain sets a
  [hard limit](https://paritytech.github.io/polkadot/book/protocol-overview.html?highlight=10#protocol-overview)
  on the size and weights of the PoV (Proof of Validity) blocks which contain the parachain state
  transition data.

Despite these drawbacks, {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} remains
upgradable through forkless upgrades, which allows the protocol to be easily upgradable to stay in
line with future technological advances.
