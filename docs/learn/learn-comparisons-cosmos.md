---
id: learn-comparisons-cosmos
title: Polkadot vs. Cosmos
sidebar_label: Cosmos
description: Comparison between Polkadot and Cosmos.
keywords: [cosmos, polkadot, interoperability, interoperability hub]
slug: ../learn-comparisons-cosmos
---

Polkadot and Cosmos are both protocols that provide an interface for different state machines to
communicate with each other. Both protocols are predicated on the thesis that the future will have
multiple blockchains that need to interoperate with each other rather than individual blockchains
existing in isolation.

## Model

Polkadot uses a sharded model where each shard in the protocol has an abstract state transition
function (STF). Polkadot uses WebAssembly (Wasm) as a "meta-protocol". A shard's STF can be abstract
as long as the validators on Polkadot can execute it within a Wasm environment.

The shards of Polkadot are called "[parachains](learn-parachains.md)". Every time a parachain wants
to make a state transition, it submits a block (batch of state transitions) along with a state proof
that Polkadot validators can independently verify. These blocks are finalized for the parachains
when they are finalized by Polkadot's relay chain, the main chain of the system. As such, all
parachains share state with the entire system, meaning that a chain re-organization of a single
parachain would require a re-organization of all parachains and the relay chain.

Cosmos employs horizontal scalability using
[app-chains](https://www.alchemy.com/overviews/what-is-an-appchain). The Cosmos Network consists of
100+ IBC connected chains, including the Cosmos Hub, Osmosis, Celestia, dYdX v4 chain, Injective,
etc. Each chain is responsible for securing the chain with a sufficiently staked and decentralized
validator set. But chains also have the option to leverage shared security from the Cosmos Hub.
Cosmos chains send cross-chain messages using the Inter-Blockchain Communication protocol. As chains
do not share state, a re-organization of one chain would not re-organize other chains, meaning each
message is trust-bound by the recipient's trust in the security of the sender.

## Architecture

### Polkadot

Polkadot has a relay chain acting as the main chain of the system. All validators in Polkadot are on
the relay chain. Parachains have collators who construct and propose parachain blocks to validators.
Collators do not have any security responsibilities and, thus, do not require a robust incentive
system. Collators can submit a single parachain block for every relay chain block every 6 seconds.
Once a parachain submits a block, validators perform a series of
[availability and validity checks](./learn-parachains-protocol.md#availability-and-validity-anv-protocol)
before committing it to the final chain.

Parachains can access the relay chain through cores. Relay chain cores are limited, but parachain
can decide to purchase coretime in-bulk (and reserve an entire core) or on-demand (and interlace a
core with another chain) and executing on a pay-as-you-go basis, only paying to execute a block when
they need to.

To interact with chains that want to use their finalization process (e.g., Bitcoin), Polkadot has
[bridges](learn-bridges.md) that offer two-way compatibility.

### Cosmos

Cosmos is a network of blockchains built using [CometBFT](https://cometbft.com/) as the consensus
engine, [Cosmos SDK](https://docs.cosmos.network/) as the VM, and [IBC](https://ibcprotocol.dev/)
which allows chains to interoperate with one another.

IBC leverages light clients that can keep track of the consensus of a counterparty chain. For
example, when chains A and B want to talk to one another, chain A uses its light client of B to
verify messages sent from chain B, and vice versa. IBC is
[currently live](https://app.trustless.zone/?from=POLKADOT&to=OSMOSIS) on Polkadot and Kusama. Work
is ongoing to implement IBC to Ethereum and it's layer 2s.

## Consensus

Polkadot uses a hybrid [consensus](learn-consensus.md) protocol with two sub-protocols: BABE and
GRANDPA. BABE (Blind Assignment for Blockchain Extension) uses a verifiable random function (VRF) to
assign slots to validators and a fallback round-robin pattern to guarantee that each slot has an
author. GRANDPA (GHOST-based Recursive Ancestor Deriving Prefix Agreement) votes on chains, rather
than individual blocks. Together, BABE can author candidate blocks to extend the finalized chain and
GRANDPA can finalize them in batches (up to millions of blocks at a time).

This isolation of tasks provides several benefits. First, it represents a reduction in transport
complexity for both block production and finalization. BABE has linear complexity, making it easy to
scale to thousands of block producers with low networking overhead. GRANDPA has quadratic
complexity, but has an advantage in terms of the latency. It is capable of finalizing multiple
blocks in one batch.

Second, having the capacity to extend the chain with unfinalized blocks allows for liveness of the
network and the validators to perform extensive availability and validity checks to ensure that no
invalid state transitions make their way into the final chain.

Cosmos chains use Tendermint consensus, a round-robin protocol that provides instant finality. Block
production and finalization are on the same path of the algorithm, meaning it produces and finalizes
one block at a time. Because it is a PBFT-based algorithm (like GRANDPA), it has quadratic
complexity, designed to finalize one block at a time.

## Staking Mechanics

Polkadot uses [Nominated Proof of Stake (NPoS)](learn-staking.md) to select validators using the
[sequential Phragmén algorithm](learn-phragmen.md). The validator set size is set by governance
(1_000 validators planned) and stakers who do not want to run validator infrastructure can nominate
up to 16 validators. Phragmén's algorithm selects the optimal allocation of stake, where optimal is
based on having the most evenly staked set.

All validators in Polkadot have the same weight in the consensus protocols. That is, to reach
greater than 2/3 of support for a chain, more than 2/3 of the _validators_ must commit to it, rather
than 2/3 of the _stake._ Likewise, validator rewards are tied to their activity, primarily block
production and finality justifications, not their amount of stake. This creates an incentive to
nominate validators with lower stakes, as they will earn higher returns on their staked tokens.

The Cosmos Hub uses Bonded Proof of Stake (a variant of Delegated PoS) to elect validators. Stakers
must bond funds and submit a delegate transaction for each validator they would like to delegate to
with the number of tokens to delegate. The Cosmos Hub plans to support up to 300 validators.

Consensus voting and rewards are both stake-based in Cosmos. In the case of consensus voting, more
than 2/3 of the _stake_ must commit, rather than 2/3 of the _validators._ Likewise, a validator with
10% of the total stake will earn 10% of the rewards.

Finally, in Cosmos, if a staker does not vote in a governance referendum, the validators assume
their voting power. Because of this, many validators in Cosmos have zero commission in order to
acquire more control over the protocol. In Polkadot, governance and staking are completely disjoint;
nominating a validator does not assign any governance voting rights to the validator.

## Message Passing

Polkadot uses [Cross-Consensus Message Passing Format (XCM)](learn-xcm.md) for parachains to send
arbitrary messages to each other. Parachains open connections with each other and can send messages
via their established channels. [Collators](learn-collator.md) are full nodes of parachains and full
nodes of the relay chain, so collator nodes are a key component of message passing. Messages do not
pass through the relay chain, only proofs of post and channel operations (open, close, etc.) go into
the relay chain. This enhances scalability by keeping data on the edges of the system.

In the case of a chain re-organization, messages can be rolled back to the point of the
re-organization based on the proofs of post in the relay chain. The shared state amongst parachains
means that messages are free from trust bounds; they all operate in the same context.

Polkadot has an additional protocol called [SPREE](learn-spree.md) that provides shared logic for
cross-chain messages. Messages sent with SPREE carry additional guarantees about provenance and
interpretation by the receiving chain.

Cosmos uses a light client-based cross-chain protocol called
[Inter-Blockchain Communication (IBC)](https://www.ibcprotocol.dev/) for arbitrary message-passing.
In the current design, IBC chains create 1:1
[Connections](https://ibc.cosmos.network/main/ibc/overview#connections) with each other, over which
[Channels](https://ibc.cosmos.network/main/ibc/overview#channels) can be established. IBC data
packets are sent between application modules on different chains over these channels. In the case of
IBC, as chains do not share state, receiving chains must trust the security of a message's origin.

## Governance

Polkadot has [OpenGov](learn-polkadot-opengov.md) framewok with several trackss to pass proposals as
public referenda, where the majority of tokens can always control the outcome. Referenda can contain
a variety of proposals, including fund allocation from an on-chain
[Treasury](./learn-polkadot-opengov-treasury.md). Decisions get enacted on-chain and are binding and
autonomous.

Cosmos uses coin-vote signaling to pass referenda. The actual enactment of governance decisions is
carried out via a protocol fork, much like other blockchains. All token holders can vote, however,
if a delegator abstains from a vote then the validator they delegate to assume their voting power.
Validators in Polkadot do not receive any voting power based on their nominators.

## Upgrades

Using the Wasm meta-protocol, Polkadot can enact chain upgrades and successful proposals without a
hard fork. Anything that is within the STF, the transaction queue, or off-chain workers can be
upgraded without forking the chain.

As Cosmos is not based on a meta-protocol, it must enact upgrades and proposals via a normal forking
mechanism.

## Development Framework

Both Cosmos and Polkadot are designed such that each chain has its STF and both provide support for
smart contracts in both Wasm and the Ethereum Virtual Machine (EVM). Polkadot provides an
ahead-of-time Wasm compiler as well as an interpreter (Wasmi) for execution, while Cosmos only
executes smart contracts in an interpreter.

Cosmos chains can be developed using the Cosmos SDK, written in Go. The Cosmos SDK contains about 10
modules (e.g. staking, governance, etc.) that can be included in a chain's STF. The SDK builds on
top of Tendermint.

The primary development framework for parachains is [Substrate](https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk/#substrate), written in
Rust. Substrate comes with FRAME, a set of about 40 modules (called "pallets") to use in a chain's
STF. Beyond simply using the pallets, Substrate adds a further layer of abstraction that allows
developers to compose FRAME's pallets by adding custom modules and configuring the parameters and
initial storage values for the chain.

!!!note "Polkadot can support an STF written in any language"
        So long as it compiles to its meta-protocol Wasm. Likewise, it could still use the Substrate client (database, RPC, networking, etc.); it only needs to implement the primitives at the interface.

## Conclusion

Polkadot was designed on the principle that scalability and interoperability require shared
validation logic to create a trust-free environment. As more blockchains are developed, their
security must be cooperative, not competitive. Therefore, Polkadot provides the shared validation
logic and security processes across chains so that they can interact knowing that their
interlocutors execute within the same security context.

The Cosmos network uses an Internet-like unstructured network that uses IBC to connect chains with
independent security guarantees, meaning that when data is sent from one chain to another, the
receiving chain must trust the sending chain. Thus, each blockchain in the Cosmos network has its
independent security mechanisms. Chains also have the option to share security with the Cosmos Hub
and thereby leverage its economic security.
