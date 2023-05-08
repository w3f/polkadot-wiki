---
id: learn-comparisons-rollups
title: Layer Two and Rollups
sidebar_label: Layer Two and Rollups
description:
  Comparisons between various rollup and layer two protocols and how they relate to Polkadot.
keywords: [rollups, polkadot, scalability]
slug: ../learn-comparisons-rollups
---

:::note

This comparison covers general information regarding two popular rollup mechanisms that are used to
scale blockchains, and how Polkadot deals with scalability.

:::

Layer two networks are notorious as being the way forward for blockchain scalability by off-loading
the majority of computation off-chain. Often, layer two solutions are needed to scale an existing
layer one blockchain. They take advantage of the layer one's security and functionality to build an
additional layer that is often faster, reduces fees, and solves other platform-specific issues.

Rollups are a layer-2 scaling solution. A layer-2 network of nodes would be responsible for "rolling
up" transactions by batching them before publishing them to the main Ethereum chain, usually through
a network of sequencers. This mechanism could include thousands of transactions. Rollups increase
TPS and can reduce transaction fees significantly. Rollups are a broad category of solutions
encompassing many possible architectures and implementations.

Polkadot implements this functionality at the native level, allowing for shared security and
scalability of for the relay chain and respective parachains. Shared security is the equivalent to
EVM-based optimistic and zero-knowledge rollups, but instead of it being implemented as a secondary
layer, Polkadot guarantees native security and scalability for each of its parachains. In some ways,
the way Polkadot handles the coordination of data from parachains into an aggregated, representative
state is somewhat similar to how layer two rollups function.

## Optimistic Rollups

Optimistic rollups are an (often) interactive scaling method for layer one blockchains. Optimistic
rollups assume _optimisically_ that every proposed transaction is valid by default (unless
challenged).

In order to mitigate potentially invalid transactions, optimistic rollups introduce a _challenge
period_ in which participants may challenge a suspect rollup. A fraud-proving scheme is in place to
allow for a number of _fraud proofs_ to be submitted, rendering the rollup as valid. During the
challenge period, a set of state changes may be disputed, come to a resolution, or merely be
included if no challenge is presented (and the required proofs are in place).

While optimistic rollups provide scalability, they have both pros and cons to their approach:

**Pros:**

- They aren't limited by the type of state change - any state change can be included, meaning
  existing apps do not have to account for it.
- They can be parallelized for scalability.
- A substantial amount of data can fit within a single rollup
  ([in the case of Ethereum, for example](https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/#scaling-ethereum-with-optimistic-rollups),
  tens of thousands of transactions in a single state transition).

**Cons:**

- Transaction censorship and centralization are concerns - sequencers / layer two nodes can be
  compromised in this regard.
- Challenge periods could take a substantial amount of time to pass, increasing time for the rollup
  to finalize onto the layer one network.
- Due to their generalist nature of including any state change for their parent network, optimistic
  rollups can run into gas limitations on Ethereum, or network congestion.

Optimistic rollups are often used in the Ethereum ecosystem. Examples of optimistic EVM-based rollup
solutions include [Optimisim](https://www.optimism.io/), [Arbitrum](https://bridge.arbitrum.io/) and
[Unipig](https://unipig.exchange/welcome).

## Zero-knowledge Rollups

Zero-knowledge, or ZK rollups are a non-interactive method that utilizes zero-knowledge proofs to
compute the validity of a particular set of state changes. Whereas optimistic rollups relied on
fraud proofs, ZK rollups rely on cryptographic validation in the form of ZK proofs.

Zero-knowledge rollups are significantly faster in terms of finalization, as the validity proof
handles the nuance of ensuring a rollup is valid or not. However, they ZK rollups often suffer from
performance due to their complexity, and are hard to integrate in resource constrained environments.
Because Turing-completeness is also difficult to achieve due to this computational overhead, their
ability to be generalized is reduced. However, they have an extremely promising future in solving
some of the problems of optimistic rollups.

**Pros:**

- They don't require a large amount of data availability. Often, the proof is enough to ensure
  validity.
- Rollups able to be proven trustlessly.
- Because the proof is immediately available, finality is also instantaneous.
- They overall have a very promising future, as they haven't reached their full potential yet.

**Cons:**

- Suffer from the same problems that other layer two solutions face in terms of centralization of
  layer two operators.
- They are computationally expensive and ZK circuits are difficult to implement.
- The potential for congestion is still a factor, as the amount of data could still be problematic.

## Polkadot - Native Shared Security

Whereas rollups are considered solutions for layer two protocols,
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} include this functionality natively
through its [Parachains Protocol](). The Parachains Protocol, which is how Polkadot handles the
**sharding** of its network is meant to accomplish the combined goals of providing security,
scalability, and availability. It's what enables parachains to verify their collective state and
communicate with one another. Parachains have similarities to aspects of optimistic and
zero-knowledge rollups, which are reflected in how Polkadot handles the validity and availability of
parachain state.

Each shard, or parachain, is equipped with a unique state transition function. This function ensures
that communication to the relay chain remains valid. Each state transition function, also referred
to as a runtime, is written in [Wasm](https://wiki.polkadot.network/docs/learn-wasm). Any state
transition function is valid so long compiles to Wasm and abides by the parachains protocol.

Each STF runs a validity proof. The proof ([the Approval Protocol]()) is interactive, unlike
zero-knowledge rollups, which are non-interactive. Additionally, unlike ZK-rollups, there are no
difficulties in creating parachains with Turing-complete logic, as each parachain is also a
full-fledged blockchain. Similarly to optimistic rollups, the Parachain Protocol also has cases
where disputes and resolutions of potentially bad parablocks can take place, in which case
validators are slashed.

**Pros:**

- Protocol level sharding, shared security, and interoperability.
- Each shard has a low-barrier of entry in terms of development, as anything that compiles to Wasm
  is a valid target.
- Finality is usually under a minute.
- Data availability is built-in through validators.
- No layer two implies less of a risk as far as the centralization of sequencers or other layer two
  operators.

**Cons:**

- Wasm could be a performance bottleneck, as it's slower than making native calls.
- A considerable amount of data is required in the PoV (proof of validity) function for proving
  parachain state.
- Other limitations within the Parachains Protocol to keep parachains compatible with the entire
  orchestration.

Despite these cons, Polkadot remains upgradable through forkless upgrades, which open the protocol
through any improvements or changes in the future.
