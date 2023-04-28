---
id: learn-comparisons-ethereum-2
title: Polkadot vs. Ethereum 2.0
sidebar_label: Ethereum 2.0
description: A high-level comparison between Polkadot and Ethereum 2.0.
keywords: [ethereum, ethereum 2.0, proof of stake, sharding]
slug: ../learn-comparisons-ethereum-2
---

Polkadot and Ethereum 2.0 are both **sharded** protocols. While Ethereum 2.0 is not yet released at
the time of this writing, it has goals of being a multi-sharded network, much like Polkadot and its
parachains. When a network is **sharded**, this implies that it is capable of executing multiple
(and often many) state transitions in parallel.

Both protocols share roughly the same goals:

1. Scalability by executing transactions in separate shards.
2. Defining methods for cross-chain and consensus interactions to take place between shards.
3. Increased security and upgradeability for its components

## Scalability: Sharding vs Rollups

As part of Ethereum's roadmap, shards have been forgone in favor of rollup-based approach for
scaling transaction throughput.

On {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, each shard hosts core logic, the
shards are executed in parallel, and can send cross-shard asynchronous messages. However, each shard
(i.e. [parachain](learn-parachains.md)) has a unique state transition function (sometimes called a
**runtime**). Applications can exist either within a single shard or across shards by composing
logic. {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} uses WebAssembly
([Wasm](./learn-wasm.md)) as a "meta-protocol". A shard's state transition function can be abstract
as long as the validators on {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} can
execute it within a Wasm environment. {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}
supports smart contracts through parachains. To offer some perspective, on Ethereum, smart contracts
can call each other synchronously in the same shard and asynchronously between shards. On Polkadot,
smart contracts can call each other synchronously in the same parachain and asynchronously across
parachains.

## Architectural Differences: Polkadot & Ethereum

Ethereum 2.0's main chain is called the Beacon Chain. The primary load on the Beacon Chain is
attestations, which are votes on the availability of shard data and Beacon Chain validity. Each
shard is a blockchain with the Ethereum Wasm (eWasm) interface.

The initial plan prioritized the rollout of shards. Ethereum 2.0 launched Phase 0 of a multi-phase
rollout in December 2020, operating in parallel to the legacy Ethereum 1.0 chain:

- **Phase 0** provisioned the Beacon Chain, accepting deposits from validators and implementing
  proof-of-stake consensus, eventually among many shards.
- **Phase 1** launches 64 shards as simple chains to test the Beacon Chain's finality. Each shard
  submits "crosslinks" to the Beacon Chain, which contains the information to finalize shard data.
- **Phase 1.5** integrates Ethereum 1.0 as a shard to finalize the proof-of-work chain's blocks.
- **Phase 2** implements the eWasm interface, phasing out proof-of-work, finally making the system
  usable to end-users. See
  [Ethereum 2.0 Phases](https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/eth-2.0-phases/) for
  more information.

After the launch of the Beacon Chain in Phase 0, the roadmap was altered to prioritize the
transition of the legacy Ethereum 1.0 chain from Proof-of-Work to Ethereum 2.0's Proof-of-Stake
consensus, preceding the rollout of shards on the network. See
[Ethereum 2.0 Merge](https://ethereum.org/en/eth2/merge/) for more information.

The network will also have "side chains" to interact with chains that are not under the finality
protocol of Ethereum 2.0.

### Polkadot and Kusama

Like Ethereum 2.0, {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} also has a main
chain, called the [Relay Chain](./learn-architecture.md#relay-chain), with several shards called
[parachains](./learn-parachains.md). Parachains are not restricted to a single interface like eWasm.
Instead, they can define their logic and interface as long as they provide their state transition
function to the Relay Chain validators so that they can execute it.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, now live as a Relay Chain, only
plans to launch the ability to validate up to 20 shards per block, gradually scaling up to 100
shards per block. Besides parachains, which are scheduled for execution every block,
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} also has
[parathreads](learn-parathreads.md) (or on-demand parachains), which are scheduled dynamically. This
allows chains to share the sharded slots, much like multiple small airlines might share a gate at an
airport.

To interact with chains that want to use their finalization process (e.g. Bitcoin),
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} has
[bridge parachains](learn-bridges.md) that offer two-way compatibility.

## Consensus

Ethereum 2.0 and {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} use hybrid consensus
models where block production and finality have their protocols. The finality protocols - Casper FFG
for Ethereum 2.0 and [GRANDPA](./learn-consensus.md#finality-gadget-grandpa) for
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} - are both GHOST-based and can both
finalize batches of blocks in one round. For block production, both protocols use slot-based
protocols that randomly assign validators to a slot and provide a fork choice rule for unfinalized
blocks - RandDAO/LMD for Ethereum 2.0 and [BABE](./learn-consensus.md#badass-babe-sassafras) for
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}.

There are two main differences between Ethereum 2.0 and
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} consensus:

1. Ethereum 2.0 finalizes batches of blocks according to periods called "epochs". The current plan
   is to have 32 blocks per epoch and finalize them all in one round. With a predicted block time of
   12 seconds, the expected time to finality is 6 minutes (12 minutes maximum). See
   [Ethereum 2 Block Time](https://github.com/ethereum/eth2.0-specs/blob/676e216/specs/phase0/beacon-chain.md#time-parameters)
   for more information.

   {{ polkadot: Polkadot's :polkadot }}{{ kusama: Kusama's :kusama }} finality protocol, GRANDPA,
   finalizes batches of blocks based on [availability and validity checks](./learn-availability.md)
   that happen as the proposed chain grows. The time to finality varies with the number of checks
   that need to be performed (and invalidity reports cause the protocol to require extra checks).
   The expected time to finality is 12-60 seconds.

2. Ethereum 2.0 requires many validators per shard to provide strong validity guarantees while
   {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} can provide stronger guarantees
   with fewer validators per shard. {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}
   achieves this by making validators distribute an
   [erasure coding](./learn-availability.md#erasure-codes) to all validators in the system, such
   that anyone - not only the shard's validators - can reconstruct a parachain's block and test its
   validity. The random parachain-validator assignments and secondary checks performed by randomly
   selected validators make it less likely for the small set of validators on each parachain to
   collude.

## Staking Mechanics

Ethereum 2.0 is a proof-of-stake network that requires 32 ETH to stake for each validator instance.
Validators run a primary Beacon Chain node and multiple validator clients - one for each 32 ETH.
These validators get assigned to "committees", randomly selected groups to validate shards in the
network. Ethereum 2.0 relies on having a large validator set to provide availability and validity
guarantees: They need at least 111 validators per shard to run the network and 256 validators per
shard to finalize all shards within one epoch. With 64 shards, that's 16_384 validators (given 256
validators per shard). See
[Ethereum 2.0 Economics](https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/eth-2.0-economics/)
and [Eth2 shard chain simplification proposal](https://notes.ethereum.org/@vbuterin/HkiULaluS) for
more information.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} can provide strong finality and
availability guarantees with much fewer validators. It uses
[Nominated Proof of Stake (NPoS)](learn-staking.md) to select validators from a smaller set, letting
smaller holders nominate validators to run infrastructure while still claiming the rewards of the
system without running a node of their own.
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} needs about ten validators for each
parachain in the network.

## Interoperability & Message Passing

Shards in Ethereum 2.0 will access each other's states via their crosslinks and state proofs. In the
model of Ethereum 2.0 with 64 shards, each one posts a crosslink in the Beacon Chain for every
block, meaning that shards could contain logic that executes based on some light client proof of a
transaction on another shard. Ethereum 2.0 has yet to release a specification for nodes passing
messages between shards. See
[Ethereum 2.0 Economics](https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/eth-2.0-economics/)
and
[Sharding FAQ](https://github.com/ethereum/wiki/wiki/Sharding-FAQ#how-would-synchronous-cross-shard-messages-work)
for more information.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} uses
[Cross-Consensus Message Passing Format (XCM)](./learn-xcm.md) for parachains to send arbitrary
messages to each other. Parachains open connections with each other and can send messages via their
established channels. Given that collators will need to be full nodes of the Relay-Chain as well,
they will be connected and will be able to relay messages from parachain A to parachain B. Messages
do not pass through the Relay-Chain, only validity proofs and channel operations do (open, close,
etc.). This enhances scalability by keeping data on the edges of the system.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} will add a protocol called
[SPREE](learn-spree.md) that provides shared logic for cross-chain messages. Messages sent with
SPREE carry additional guarantees about provenance and interpretation by the receiving chain.

## Governance

Ethereum 2.0 governance is still unresolved. Ethereum uses off-chain governance procedures like
GitHub discussions, Core Devs Meetings, and Ethereum Magicians to make decisions about the protocol.
See [Ethereum Governance Compendium](https://github.com/ethereum/wiki/wiki/Governance-compendium)
for more information.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} uses on-chain
[governance](./learn-opengov.md) with a multicameral system. There are several avenues to issue
proposals, e.g. from the on-chain Council, the Technical Committee, or the public. All proposals
ultimately pass through a public referendum, where the majority of tokens can always control the
outcome. {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} uses adaptive quorum biasing
to set the passing threshold for low-turnout referenda. Referenda can cover various topics,
including fund allocation from an on-chain [Treasury](./learn-treasury.md) or modifying the
underlying runtime code of the chain. Decisions get enacted on-chain and are binding and autonomous.

## Upgrades

Upgrades on Ethereum 2.0 will follow the standard hard-fork procedure, requiring validators to
upgrade their nodes to implement protocol changes.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} can enact chain upgrades and
successful proposals using the Wasm meta-protocol without a hard fork. Anything within the state
transition function, the transaction queue, or off-chain workers can be upgraded without forking the
chain.

## Conclusion

Ethereum 2.0 and {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} both use a sharded
model where shard chains ("shards" in Ethereum 2.0 and parachains in
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}) are secured by a main chain by
linking shard state in the blocks of the main chains. Main differences between the two protocols
are:

- All shards in Ethereum 2.0 have the same state transition function, while
  {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} lets shards have an abstract state
  transition function.
- Governance processes in Ethereum 2.0 are planned to be off-chain and thus require coordination for
  a hard fork to enact governance decisions. In contrast, in
  {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} the decisions are on-chain and
  enacted autonomously.
- Validator selection mechanisms differ as
  {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} can provide strong availability and
  validity guarantees with fewer validators per shard.
