---
id: learn-comparisons-ethereum-2
title: Polkadot vs. Ethereum
sidebar_label: Ethereum
description: Comparison between Polkadot and Ethereum.
keywords: [ethereum, Ethereum, proof of stake, sharding]
slug: ../learn-comparisons-ethereum-2
---

Both protocols are blockchains at their core, but serve fundamentally different roles in how they
are utilized:

- Ethereum is a general-purpose blockchain that hosts the Ethereum Virtual Machine, an environment
  for executing smart contracts. Ethereum is homogenous, but can utilize rollups and layer two
  solutions to scale its usage.
- Polkadot is a heterogeneous, multi-chain protocol (a "layer 0", or metaprotocol) that hosts
  multiple layer 1 blockchains and provides a way for them to partake in shared security. Polkadot
  acts as a **meta-protocol** that allows for multiple protocols to coexist and work together.

:::note

In the context of blockchains, the term "shards" or "sharded protocol" is typically used to refer to sub-protocols or as a general term to refer to a form of
[**horizontal scaling**](https://en.wikipedia.org/wiki/Scalability#Horizontal_or_scale_out).

:::

## High-Level Comparison

Both protocols have fundamentally different goals, which can be summarized as:

- Ethereum is a general-purpose blockchain, which coordinates the global coordination of the
  Ethereum Virtual Machine (EVM). Ethereum is not specialized nor optimized for any particular
  application, rather its primary focus is the Ethereum Virtual Machine for executing smart
  contracts. Ethereum achieves scalability via **rollups**, which are secondary protocols which
  utilize Ethereum as a settlement layer.

- Polkadot is a multi-chain protocol that provides shared security for each one of its
  **parachains**. Each parachain (which could also be called an "appchain" in this context) is
  specialized towards a specific focus and optimized towards that goal. Parachains must abide by the
  [Parachains Protocol](./learn-parachains-protocol.md)

Polkadot _does not_ directly run a virtual machine for smart contracts, as Polkadot's main purpose
is to validate the protocols that operate under it.

However, several parachains provide
[smart contract functionality](https://wiki.polkadot.network/docs/build-smart-contracts#parachains).
Parachains on Polkadot can even run an EVM for executing smart contracts written in Solidity using
[Frontier, an Ethereum compatibility layer for Substrate](https://github.com/polkadot-evm/frontier).

> As a general summary, one could also say that Polkadot coordinates protocols (and their subsequent
> validation), while Ethereum coordinates inputs and outputs for the EVM.

## Scalability Approaches

Ethereum favors a _rollup-centric_ approach for scaling transaction throughput.
[**Danksharding**](https://ethereum.org/en/roadmap/danksharding/) is how Ethereum plans to better
accommodate and facilitate rollup activity by providing better utilities, such as data availability
via [Proto-Danksharding](https://ethereum.org/roadmap/danksharding),for rollups to record state to
Ethereum.

Danksharding will allow for much more space to be utilized per block on Ethereum, where blobs of
data will be verifiable for an amount of time before being pruned from the network. This approach
will enable data availability at layer one and further enable layer two protocols on Ethereum to
flourish more readily.

In contrast, {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} require parachains to
register themselves in accordance to the [Parachains Protocol](./learn-parachains-protocol.md). Once
registered, {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} validates the state
transitions of each parachain as per their PVF, or parachain validation function. Data availability
is an integral part of validating parachain state. This approach enables parallelized interactions
between parachains. They can trust that their respective state is true, as they were collectively
validated by Polkadot.

### Rollups vs. Parachain Creation

Ethereum primarily focuses on optimizing itself for rollups, Polkadot's parachains protocol allows
validation to occur on the protocol level without needing a layer two solution.

:::info Rollup vs. Parachain Comparison

For a more in-depth comparison on parachains versus rollups, take a look at the
[rollup comparison page](./learn-comparison-rollups.md)

:::

On {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, each parachain hosts its own core
logic, called a **runtime** (sometimes called a **state transition function**).
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} uses WebAssembly
([Wasm](./learn-wasm.md)) as a "meta-protocol".

Parachains have the option of using [cross-consensus messaging (XCM)](learn-xcm.md) to communicate
with one another and facilitate inter-chain reactions. It is also possible to utilize XCM on
Ethereum, as it is merely a format for describing state transitions on a particular network.

## Architectural Differences: Polkadot and Ethereum

As previously mentioned, Ethereum is a **general-purpose** virtual machine that can run sandboxed
programs written in Solidity, whereas Polkadot is a meta-protocol for other parachains to connect
and interact with each other.

Ethereum operates as a single, homogeneous chain. Each Ethereum node is divided into two layers: the
**consensus** and **execution** layers. Each layer handles the block validation information, peer
discovery, and Proof-of-Stake of the Ethereum client.

Polkadot's primary component is the **relay chain**, which hosts heterogeneous **parachains**. The
relay chain aggregates information from each parachain, where validators agree upon consensus and
finality. In essence, one can look at Polkadot as a series of **runtimes**, which are state
transition functions used to describe parachains, as well as Polkadot itself.

### Forks, Upgrades, and Governance

Ethereum's governance is done off-chain, where various stakeholders come to a consensus through some
medium other than the protocol itself. Upgrades on Ethereum will follow the standard hard-fork
procedure, coordinating both the community and validators to upgrade their nodes to implement
protocol changes.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} uses on-chain
[governance, called OpenGov](./learn-polkadot-opengov.md), to facilitate upgrades to the Polkadot
runtime. These upgrades are voted on via the stakeholders of Polkadot, where if successful, the
upgrade is enacted automatically in the blocks to come. The only time Polkadot validator operators
upgrade their nodes is when the client itself gets updated.

Because of this mechanism, {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} can enact
chain upgrades and successful proposals using the Wasm meta-protocol _without_ a hard fork. Anything
within the state transition function, the transaction queue, or off-chain workers can be upgraded
without forking the chain.

### Block Production & Finalization

Both Ethereum and {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} use hybrid
consensus models where **block production** and **finality** are decoupled from one another.

For finalization, Ethereum utilizes [Casper FFG](https://ethereum.org/glossary#casper-ffg), which
works with [LMD-GHOST](https://ethereum.org/glossary#lmd-ghost) as the fork choice rule for
finalization.

Polkadot utilizes [GRANDPA](./learn-consensus.md#finality-gadget-grandpa) for finalization. Rather
than decide on a block-by-block basis, GRANDPA is able to finalize _chains_ of blocks. Both
finalization mechanisms are both
[GHOST](https://www.geeksforgeeks.org/what-is-ghost-protocol-for-ethereum/)-based and can both
finalize batches of blocks in one round.

For block production, both protocols use slot-based protocols that randomly assign validators to a
slot and provide a fork choice rule for unfinalized blocks. Polkadot uses
[BABE](./learn-consensus.md#badass-babe-sassafras) for block production. BABE includes two
mechanisms for selecting block producers, one of which is a fallback in case the first fails, which
allows for chain liveness. BABE produces unfinalized blocks on top of the chain already finalized by
GRANDPA.

There are two main differences between Ethereum and
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} consensus:

1. {{ polkadot: Polkadot's :polkadot }}{{ kusama: Kusama's :kusama }} finality protocol, GRANDPA,
   finalizes batches of blocks based on
   [availability and validity checks](./learn-parachains-protocol.md#availability-and-unavailability-phase)
   that happen as the proposed chain grows. The time to finality varies with the number of checks
   that need to be performed (and invalidity reports cause the protocol to require extra checks).
   The expected time to finality is 12-60 seconds.

2. Ethereum typically many validators per round (called an
   [epoch](https://ethereum.org/en/glossary/#epoch) on Ethereum) to provide strong validity
   guarantees while {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} can provide
   stronger guarantees with fewer validators per round.
   {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} achieves this by making validators
   distribute an [erasure coding](./learn-parachains-protocol.md#erasure-codes) to all validators in
   the system, such that anyone - not only the round's validators - can reconstruct a parachain's
   block and test its validity. This data availability is a core part of Polkadot - ensuring state
   is valid for its state transitions. The random parachain-validator assignments and secondary
   checks are performed by randomly selected validators making it less likely for the small set of
   validators on each parachain to collude.

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
[Cross-Consensus Messaging (XCM)](./learn-xcm.md) for parachains to send arbitrary messages to each
other. Parachains open connections with each other and can send messages via their established
channels. Given that [collators](./learn-collator.md) will need to be full nodes of the relay chain
as well, they will be connected and can relay messages from parachain A to parachain B.

Messages do not pass through the relay chain. Only validity proofs and channel operations do (open,
close, etc.). This enhances scalability by keeping data on the edges of the system.

Currently, Ethereum rollups can communicate using
[shared sequencers](https://medium.com/@richardchen_81235/intro-to-shared-sequencing-1622d1fd51c9),
which provide a common grounds of interoperability between layer two solutions.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} will add a protocol called
[SPREE](learn-spree.md) that provides shared logic for cross-consensus messages. Messages sent with
SPREE carries additional guarantees about provenance and interpretation by the receiving chain.

## DApp Support and Development

Ethereum supports smart contract development using Solidity. These contracts are immutable, and
cannot be changed once published on-chain.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} supports smart contracts through
parachains, usually using the [ink! smart contract language](https://use.ink/), but also Solidity
through Frontier-enabled parachains. On Ethereum, smart contracts can call each other; however, they
are fixed on-chain to the domain of Ethereum. On Polkadot, smart contracts can call each other in
the same parachain _and_ across parachains.

On Polkadot, developers have the option of either using smart contracts, calling extrinsics from
pallets that modify the chain's state in some particular way or merely use Polkadot's RPC to
directly retrieve and act on-chain information. DApps on Polkadot are often composed of these
multiple components working together to modify, retrieve, and watch state changes live as they
happen.

For a more comprehensive list of how to build on Polkadot, be sure to check the
["Build" section of the wiki.](../build/build-guide.md).

## Conclusion

Ethereum and {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} both use a sharded
model. Danksharding plans to utilize a rollup-centric approach by focusing on data availability. The
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} ecosystem is secured by a main chain,
called the "relay chain," which in turn manages cores and allows tasks, such as parachains to be run
on top of them.

The primary differences between the two protocols are:

- Ethereum processes EVM-compatible state transitions, whether through rollups or on the mainnet
  itself, while {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} allows its parachains
  to have an abstract state transition function implementation.
- Governance processes in Ethereum are planned to be off-chain and thus require coordination for a
  hard fork to enact governance decisions. In contrast, in
  {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} the decisions are on-chain and
  enacted autonomously via forkless upgrades.
- Validator selection mechanisms differ as
  {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} can provide strong availability and
  validity guarantees with fewer validators per protocol.
