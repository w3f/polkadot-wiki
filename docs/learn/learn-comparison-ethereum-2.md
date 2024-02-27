---
id: learn-comparisons-ethereum-2
title: Polkadot vs. Ethereum
sidebar_label: Ethereum
description: Comparison between Polkadot and Ethereum.
keywords: [ethereum, Ethereum, proof of stake, sharding]
slug: ../learn-comparisons-ethereum-2
---

Both protocols are blockchains but serve fundamentally different roles in how they are utilized:

- Ethereum is a general-purpose blockchain that hosts the Ethereum Virtual Machine, an environment
  for executing smart contracts. Ethereum is homogenous, but can utilize rollups and layer two
  solutions to scale its usage.
- Polkadot is a heterogeneous, multi-chain protocol that hosts multiple chains and provides a way
  for them to partake in shared security. Polkadot acts as a **meta-protocol** that allows for
  multiple protocols to coexist and work together.

## High-Level Comparison

At a high level, both protocols have fundamentally different goals, which are reflected by their
architecture:

- Ethereum is a general-purpose blockchain for **global coordination**. Ethereum is not specialized
  nor optimized for any particular application, rather its primary focus is the Ethereum Virtual
  Machine for executing smart contracts.
- Polkadot is a sharded blockchain that introduces shared security for each one of its shards, or
  **parachains**. Each shard is usually specialized towards a specific focus and optimized towards
  that goal. Polkadot provides shared security and consensus to these shards through the Polkadot
  relay chain.

Polkadot _does not_ directly run a virtual machine for smart contracts, as Polkadot's main purpose
is to validate the protocols that operate under it.

Several of its parachains do. Parachains on Polkadot can even run an EVM for executing smart
contracts written in Solidity using Frontier

In the context of blockchain, "sharding" refers to the parallelization of state transition
(transaction) execution. The way Ethereum and Polkadot deal with scalability and sharding is quite
different.

## Scalability: Coretime vs. Danksharding

Ethereum favors a rollup-centric approach for scaling transaction throughput.
[**Danksharding**](https://ethereum.org/en/roadmap/danksharding/) is how Ethereum plans to create a
scalable environment for an acclaimed >100,000 transactions per second. Danksharding was the chosen
alternative over "shard chains" and works by storing blobs.

Danksharding will allow for much more space to be utilized per block on Ethereum, where blobs of
data will be verifiable for an amount of time before being pruned from the network. These blobs will
have to be held for an amount of time, implying a level of data availability that validators must
have. This approach will enable data availability at layer one and further enable layer two
protocols on Ethereum to flourish.

In contrast, {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} is a purely sharded
network. It prioritizes data availability as an integral part of the block validation process.
Parallelized interactions between parachains, the **shards** of the Polkadot network, also take
advantage of this factor. Whereas Ethereum primarily focuses on making large amounts of data
available for validation for a portion of time, Polkadot's parallelization factor allows
verification to happen on the protocol level without needing a layer two solution.

:::note

The term "shards" is used here, but know that shards and parachains mean the same thing! Each
parachain represents a shard in the Polkadot network.

:::

On {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, each shard hosts core logic. As
mentioned earlier, each shard (i.e., [parachain](learn-parachains.md)) has a unique state transition
function (sometimes called a **runtime**). Applications can exist either within a single shard or
across shards by composing logic to create [cross-consensus (XCM)](learn-xcm.md) interactions.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} uses WebAssembly
([Wasm](./learn-wasm.md)) as a "meta-protocol". A shard's state transition function can be abstract
as long as the validators on {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} can
execute it within a Wasm environment.

## Architectural Differences: Polkadot and Ethereum

As previously mentioned, Ethereum is a **general-purpose** virtual machine that can run sandboxed
programs written in Solidity, whereas Polkadot is a meta-protocol for other parachains to connect
and interact with each other.

Ethereum operates as a single, homogeneous chain. Each Ethereum node is divided into two layers: the
**consensus** and **execution** layers. Each layer handles the block validation information, peer
discovery, and Proof-of-Stake of the Ethereum client.

Polkadot's primary component is the **relay chain**, which hosts heterogeneous **shards** called
parachains. The relay chain aggregates information from its shards, the parachains, where Polkadot
validators agree upon consensus and finality. In essence, one can look at Polkadot as a series of
**runtimes**, which are state transition functions used to describe parachains (shards), as well as
Polkadot itself. Like Ethereum, Polkadot clients abstract away many of their responsibilities into
various components built using Substrate.

### Forks, Upgrades, and Governance

Ethereum governance is done off-chain, where various stakeholders come to a consensus through some
medium other than the protocol itself. Upgrades on Ethereum will follow the standard hard-fork
procedure, requiring validators to upgrade their nodes to implement protocol changes.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} uses on-chain
[governance, called OpenGov](./learn-polkadot-opengov.md), to faciliate upgrades to the Polkadot
runtime. These upgrades are voted on via the stakeholders of Polkadot, where if successful, the
upgrade is enacted automatically in the blocks to come.

Because of this mechanism, {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} can enact
chain upgrades and successful proposals using the Wasm meta-protocol _without_ a hard fork. Anything
within the state transition function, the transaction queue, or off-chain workers can be upgraded
without forking the chain.

### Consensus and Finalization

Ethereum and {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} use hybrid consensus
models where block production and finality have their protocols. The finality protocols - Casper FFG
for Ethereum and [GRANDPA](./learn-consensus.md#finality-gadget-grandpa) for
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} - are both GHOST-based and can both
finalize batches of blocks in one round. For block production, both protocols use slot-based
protocols that randomly assign validators to a slot and provide a fork choice rule for unfinalized
blocks - RandDAO/LMD for Ethereum and [BABE](./learn-consensus.md#badass-babe-sassafras) for
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}.

There are two main differences between Ethereum and
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} consensus:

1.  Ethereum finalizes batches of blocks according to periods called "epochs". The current plan is
    to have 32 blocks per epoch and finalize them all in one round. With a predicted block time of
    12 seconds, the expected time to finality is 6 minutes (12 minutes maximum). See
    [Ethereum 2 Block Time](https://github.com/ethereum/eth2.0-specs/blob/676e216/specs/phase0/beacon-chain.md#time-parameters)
    for more information.

{{ polkadot: Polkadot's :polkadot }}{{ kusama: Kusama's :kusama }} finality protocol, GRANDPA,
finalizes batches of blocks based on
[availability and validity checks](./learn-parachains-protocol.md#availability-and-unavailability-phase)
that happen as the proposed chain grows. The time to finality varies with the number of checks that
need to be performed (and invalidity reports cause the protocol to require extra checks). The
expected time to finality is 12-60 seconds.

2.  Ethereum requires many validators per shard to provide strong validity guarantees while
    {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} can provide stronger guarantees
    with fewer validators per shard. {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}
    achieves this by making validators distribute an
    [erasure coding](./learn-parachains-protocol.md#erasure-codes) to all validators in the system,
    such that anyone - not only the shard's validators - can reconstruct a parachain's block and
    test its validity. The random parachain-validator assignments and secondary checks are performed
    by randomly selected validators making it less likely for the small set of validators on each
    parachain to collude.

### Staking Mechanics: Ethereum PoS vs. Polkadot NPoS

Ethereum is a proof-of-stake network that requires 32 ETH to stake for each validator instance.
Validators run a primary Beacon Chain node and multiple validator clients - one for each 32 ETH.
These validators get assigned to "committees," randomly selected groups to validate blocks in the
network.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} can provide strong finality and
availability guarantees with much fewer validators. It uses
[Nominated Proof of Stake (NPoS)](learn-staking.md) to select validators from a smaller set, letting
smaller holders nominate validators to run infrastructure while still claiming the rewards of the
system without running a node of their own.
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} needs about ten validators for each
parachain in the network.

### Interoperability and Message Passing

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} uses
[Cross-Consensus Message Passing Format (XCM)](./learn-xcm.md) for parachains to send arbitrary
messages to each other. Parachains open connections with each other and can send messages via their
established channels. Given that [collators](./learn-collator.md) will need to be full nodes of the
relay chain as well, they will be connected and can relay messages from parachain A to parachain B.

Messages do not pass through the relay chain. Only validity proofs and channel operations do (open,
close, etc.). This enhances scalability by keeping data on the edges of the system.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} will add a protocol called
[SPREE](learn-spree.md) that provides shared logic for cross-chain messages. Messages sent with
SPREE carries additional guarantees about provenance and interpretation by the receiving chain.

## DApp Support and Development

Ethereum mainly supports a form of smart contract development using Solidity. These contracts are
immutable, and cannot be changed once published on-chain.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} supports smart contracts through
parachains, usually using the [ink! smart contract language](https://use.ink/). On Ethereum, smart
contracts can call each other; however, they are fixed on-chain to the domain of Ethereum. On
Polkadot, smart contracts can call each other in the same parachain and across parachains.

On Polkadot, developers have the option of either using smart contracts, calling extrinsics from
pallets that modify the chain's state in some particular way or merely use Polkadot's RPC to
directly retrieve and act on-chain information. DApps on Polkadot are often composed of these
multiple components working together to modify, retrieve, and watch state changes live as they
happen.

## Conclusion

Ethereum and {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} both use a sharded
model. Danksharding plans to utilize a rollup-centric approach by focusing on data availability. The
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} ecosystem is secured by a main chain,
called the "relay chain," which in turn manages and connects its shards ("parachains/parathreads")
into a single, homogenous solution.

The primary differences between the two protocols are:

- All shards in Ethereum represent the same state transitions, while
  {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} lets shards have an abstract state
  transition function implementation.
- Governance processes in Ethereum are planned to be off-chain and thus require coordination for a
  hard fork to enact governance decisions. In contrast, in
  {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} the decisions are on-chain and
  enacted autonomously via forkless upgrades.
- Validator selection mechanisms differ as
  {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} can provide strong availability and
  validity guarantees with fewer validators per shard.
