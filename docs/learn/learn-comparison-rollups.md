---
id: learn-comparisons-rollups
title: Learn Rollups
sidebar_label: Learn Rollups
description: Comparisons between various rollup/L2 protocols and how they relate to Polkadot.
keywords: [rollups, polkadot, scalability]
slug: ../learn-comparisons-rollups
---

Rollups are a layer-2 scaling solution. A layer-2 network of nodes would be responsible for "rolling
up" transactions by batching them before publishing them to the main Ethereum chain. A rolled-up
transaction could include thousands of transactions. Rollups increase TPS and can reduce transaction
fees significantly. Rollups are a broad category of solutions encompassing many possible
architectures and implementations. Rollups on Ethereum are similar to
{{ polkadot: Polkadot's :polkadot }}{{ kusama: Kusama's :kusama }} parachains, where you prove some
set of transactions happened on another "mini-chain".

Note that the bitcoin Lightning Network at a high levels allows to achieve similar goals (i.e.
unload unnecessary storage on chain), but it is not a rollup. The Lightning Network lets you lock
bitcoin up on-chain, then puts it in channels, that are all shared between different nodes. Bitcoin
can then be routed across these channels. There's no "lightning blockchain".

### Optimistic Rollups

Using an "innocent until proven guilty" approach, optimistic rollups will accept transaction
commitments to the network while validating for errors and security issues. If something is invalid,
validators can submit fraudulent commitment proof (fraud-proofs). These proofs will be used to
reject fraudulent transactions. This way, transaction results and proofs can be stored on the main
network, but transaction data can be stored elsewhere. Optimistic rollups can improve transaction
scalability 10-100x and write transactions to Ethereum as
[`calldata`](https://ethereum.stackexchange.com/questions/52989/what-is-calldata), reducing gas fees
significantly. Examples of optimistic rollup solutions include
[Optimisim](https://www.optimism.io/), [Arbitrum](https://bridge.arbitrum.io/) and
[Unipig](https://unipig.exchange/welcome). See
[ETH Docs: Optimistic Rollups](https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/)
for more information.

### Zero-knowledge Rollups

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

### Blob Transactions

Until the full spec of ETH 2.0 sharding is implemented, "blob-transactions" would be designed with
sharding but without being sharded transactions. Blob transactions carry a large amount of data that
the EVM cannot access but whose commitment can be accessed. Compared to full sharding, where the
space allocated for this additional transaction data will be ~16MB, this EIP allows for a reduced
cap corresponding to a target of ~1MB and a limit of ~2MB, which the rollup transactions can
utilize. See [EIP-4844 definition](https://eips.ethereum.org/EIPS/eip-4844?ref=hackernoon.com) for
more information.

### Polkadot and Kusama

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
