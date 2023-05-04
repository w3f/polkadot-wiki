---
id: learn-comparisons-rollups
title: Layer 2 / Rollups
sidebar_label: Layer 2 / Rollups
description: Comparisons between various rollup/L2 protocols and how they relate to Polkadot.
keywords: [rollups, polkadot, scalability]
slug: ../learn-comparisons-rollups
---

Layer 2 networks are notorious as being the way forward for blockchain scalability. Often, layer 2
solutions are needed to scale an existing layer 1 blockchain. They take advantage of the layer 1's
security and functionality to build an additional layer that is often faster, reduces fees, and
solves other platform-specific issues.

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
state is somewhat similar to how layer 2 rollups function.

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

To reach consensus on a traditional block execution, blockchains rely on re-execution of every
transaction. We do not want to allow malicious transactions that cause an endless loop, as it would
compromise every validator's resources and the liveness of the chain. Therefore chains like Ethereum
have the concept of gas, so the amount of computation per block is bounded. So even though you might
have a notion of Turing completeness, there is actually a limit on how many operations you can
perform. In addition, as the number of validators scales, the amount of redundant computation scales
linearly as well, which is inconvenient.

The redundant execution of all transactions can be avoided. The majority of the network only runs a
`verify` operation (that should be sublinear in the size of the original transaction) while the
block producer incurs heavy computation to produce the proof. The challenge for any proof system
architect is expressing the (arbitrary) computation as a circuit. For a number of reasons (e.g.
calculations need to be done over a finite field), the circuits that the proof systems "accept" are
fairly large and are slower to work with, than executing the computation directly (i.e. natively),
requiring up to 1,000,000x work for the prover. If you want to execute an extremely complicated
program, you might run into circuits which are simply too large for the prover to handle, or take
too long.

[Zero-knowledge proofs](https://en.wikipedia.org/wiki/Zero-knowledge_proof) can be used as a "proof"
of valid transactions when batching, effectively reducing the transaction payload to be the size of
a zk-proof. This, similar to the optimistic approach, allows transaction data to be abstracted away
and reduced significantly in size before being committed to the main chain. Similar to most on-chain
transactions and states, a ZK-rollup's state is represented as a
[merkle tree](https://en.wikipedia.org/wiki/Merkle_tree), and the cryptographic hash of the tree's
root (i.e. the Merkle root) is what is stored on-chain. This allows for efficient batching and
tracking of changes to the transaction states. Any changes to the state will require the operator
who initiated the changes to compute a new state root and commit it to the on-chain contract. If the
contract verifies the new state as valid, then provided root hash becomes the new state root. See
[ETH Docs: ZK Rollups](https://ethereum.org/en/developers/docs/scaling/zk-rollups/) for more
information.

:::note

Currently, Turing completeness is difficult in ZK rollups, as a trusted setup can be a requirement
to run the ZK Proofs and the soundness of the cryptography used needs to meet specific standards.
Note that, depending on which type of a ZK is used, a trusted setup is not necessarily required (see
see
[STARK vs SNARK](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)).
See
[this article](https://a16zcrypto.com/measuring-snark-performance-frontends-backends-and-the-future/)
to learn more about the current limitations of ZK rollups.

:::

## Polkadot - Native Shared Security

In {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} parachains can be considered as a
different way to achieve what rollups do. The sharding model already exists as the Relay-chain being
the beacon chain and parachains being the shards. Parachains have a similar implementation of an
Optimistic rollup and a similar architecture to a ZK-rollup. Parachain logic runs a validity proof.
The proof (the Approval Protocol) is interactive, unlike ZK-rollups, which are non-interactive.
Additionally, unlike ZK-rollups, there are no difficulties in creating parachains with
Turing-complete logic. This is a fundamental weakness of ZK rollups, as Turing completeness within
ZK circuits is difficult (if not impossible) to achieve. In addition, Optimistic rollups are
required by architecture to have their 'sequencer selection' logic live in their host contract. This
is because the smart contract needs to accept blocks that may be bad and may not be executed and
needs to filter out spam. Parachains, like ZK rollups, can encapsulate the sequencer-selection logic
within their validation code.
