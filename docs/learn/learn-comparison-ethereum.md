---
title: Polkadot vs. Ethereum
description: Compare Polkadot and Ethereum, their scalability, governance, and approaches to blockchain interoperability and smart contracts.
---

Both protocols are blockchains at their core but serve fundamentally different roles in how they are
utilized:

- Ethereum is a general-purpose blockchain that hosts the Ethereum Virtual Machine, an environment
  for executing smart contracts. Ethereum is homogenous but can utilize rollups and layer two
  solutions to scale its usage.
- Polkadot is a heterogeneous, multi-chain protocol (a "layer 0" or metaprotocol) that hosts
  multiple layer one blockchains and allows them to partake in shared security. Polkadot acts as a
  **meta-protocol** allowing multiple protocols to coexist and work together.

!!!note "Sharding"
    In the context of blockchains, the term "shards" or "sharded protocol" is typically used to refer to sub-protocols or as a general term to refer to a form of [**horizontal scaling**](https://en.wikipedia.org/wiki/Scalability#Horizontal_or_scale_out).

## High-Level Comparison

Both protocols have fundamentally different goals:

- Ethereum is a general-purpose blockchain based on the Ethereum Virtual Machine (EVM). Ethereum is
  not specialized nor optimized for any particular application. Instead, its primary focus is the
  Ethereum Virtual Machine for executing smart contracts. Ethereum achieves scalability via
  [**rollups**](./learn-comparisons-rollups.md#rollup-comparison), that are secondary protocols that utilize Ethereum
  as a settlement layer.

- Polkadot is a multi-chain protocol that provides shared security and secure interoperability for
  each of its **parachains**. Each parachain (also called an "appchain" in this context) is
  specialized towards a specific focus and optimized towards that goal. Parachains must abide by the
  [Parachains Protocol](./learn-parachains-protocol.md).

Although Polkadot's primary
purpose is to validate the protocols that operate under it, it also supports smart contract deployments. Additionaly, several parachains provide
[smart contract functionality](https://docs.polkadot.com/develop/smart-contracts/evm/).
Parachains on Polkadot can even run an EVM for executing smart contracts written in Solidity using
[Frontier, an Ethereum compatibility layer for Substrate](https://github.com/polkadot-evm/frontier).

> As a general summary, one could also say that Polkadot **coordinates** and **validates**
> sub-protocols that follow the [Parachains Protocol](./learn-parachains-protocol.md) (which are
> akin to an optimistic-style rollup). In contrast, Ethereum coordinates inputs and outputs for the
> EVM. On Polkadot, any sub-protocol can have its own logic so long as it compiles to WebAssembly.

## Scalability Approaches

Ethereum favors a _rollup-centric_ approach for scaling transaction throughput.
[**Danksharding**](https://ethereum.org/en/roadmap/danksharding/) is how Ethereum plans to better
accommodate and facilitate rollup activity by providing better utilities, such as data availability
via [Proto-Danksharding](https://ethereum.org/roadmap/danksharding), for rollups to record state to
Ethereum.

Danksharding will allow for much more space to be utilized per block on Ethereum, where blobs of
data will be verifiable for an amount of time before being pruned from the network. This approach
will enable data availability at layer one and further enable layer two protocols on Ethereum to
flourish more readily.

In contrast, the relay chain requires parachains to register themselves in accordance with the
[Parachains Protocol](./learn-parachains-protocol.md). Once registered, the relay chain validates
the state transitions of each parachain as per their parachain validation function (PVF).
[Data availability](./learn-parachains-protocol.md#availability-and-unavailability-phase) is an
integral part of validating the parachain state. This approach enables parallelized interactions
between parachains. They can trust that each sub-protocol's respective state is valid, as Polkadot
collectively validated them.

### Rollups vs. Parachain Creation

Ethereum primarily focuses on optimizing itself for rollups; Polkadot's parachains protocol allows
validation to occur on the protocol level without needing a layer two solution.

!!!info "Rollup vs. Parachain Comparison"
    For a more in-depth comparison of parachains versus rollups, take a look at the [rollup comparison page](./learn-comparisons-rollups.md#rollup-comparison).

Each parachain hosts its own core logic, called a **runtime** (sometimes called a **state transition
function**). Polkadot uses WebAssembly ([Wasm](https://webassembly.org/)) as a "meta-protocol".

Parachains have the option of using [cross-consensus messaging (XCM)](./learn-xcm.md) to communicate
with one another and facilitate inter-chain reactions. It is also possible to utilize XCM on
Ethereum as it is merely a format for describing state transitions on a particular network.

## Architectural Differences: Polkadot and Ethereum

As previously mentioned, Ethereum is a **general-purpose** virtual machine that can run sandboxed
programs are written in Solidity, whereas Polkadot is a meta-protocol for other parachains to
connect and interact with each other.

Ethereum operates as a single, homogeneous chain. Each Ethereum node is divided into two layers: the
**consensus** and **execution** layers. Each layer handles the block validation information, peer
discovery, and Proof-of-Stake of the Ethereum client.

Polkadot's primary component is the **relay chain**, which hosts heterogeneous **parachains**. The
relay chain aggregates information from each parachain, where validators agree upon consensus and
finality. One can see Polkadot as a series of **runtimes**, which are state transition functions
used to describe parachains and Polkadot itself.

### Forks, Upgrades, and Governance

Ethereum's governance is done off-chain, where various stakeholders come to a consensus through some
medium other than the protocol itself. Upgrades on Ethereum will follow the standard hard fork
procedure, coordinating the community and validators to upgrade their nodes to implement protocol
changes.

Polkadot uses on-chain [governance, called OpenGov](./learn-polkadot-opengov.md), to facilitate
runtime upgrades. The stakeholders of Polkadot vote on these upgrades, and if successful, the
upgrade is enacted automatically in the blocks to come. Polkadot validator operators only upgrade
their nodes when the client itself gets updated.

Because of this mechanism, the relay chain can enact upgrades using the Wasm meta-protocol _without_
a hard fork. As the WebAssembly runtime for Polkadot (and all of its subsequent parachains) are
stored on-chain, this involves simply replacing the runtime with a new WebAssembly blob once
governance allowed the upgrade to be enacted.

Anything within the state transition function, the transaction queue, or off-chain workers can be
upgraded without forking the chain, as these are all part of the WebAssembly runtime.

### Block Production & Finalization

Both Ethereum and Polkadot use hybrid consensus models where **block production** and **finality**
are decoupled.

For finalization, Ethereum utilizes [Casper FFG](https://ethereum.org/glossary#casper-ffg), which
works with [LMD-GHOST](https://ethereum.org/glossary#lmd-ghost) as the fork choice rule for
finalization.

Polkadot utilizes [GRANDPA](./learn-consensus.md#finality-gadget-grandpa) for finalization. Rather
than decide on a block-by-block basis, GRANDPA can finalize _chains_ of blocks. Both finalization
mechanisms are both
[GHOST](https://www.geeksforgeeks.org/what-is-ghost-protocol-for-ethereum/)-based and can both
finalize batches of blocks in one round.

For block production, both protocols use slot-based protocols that randomly assign validators to a
slot and provide a fork choice rule for unfinalized blocks. Polkadot uses
[BABE](./learn-consensus.md#block-production-babe) for block production. BABE includes two
mechanisms for selecting block producers, one of which is a fallback in case the first fails, which
allows for chain liveness. BABE produces unfinalized blocks on top of the chain already finalized by
GRANDPA.

There are two main differences between Ethereum and Polkadot consensus:

1.  Polkadot finality protocol, GRANDPA, finalizes batches of blocks based on
    [availability and validity checks](./learn-parachains-protocol.md#availability-and-unavailability-phase)
    that happen as the proposed chain grows. The time to finality varies with the number of checks
    that need to be performed (and invalidity reports, which cause extra checks). The expected time
    to finality is 30 seconds.

2.  Ethereum typically has many validators per round (called an
    [epoch](https://ethereum.org/en/glossary/#epoch) on Ethereum) to provide strong validity
    guarantees while Polkadot can provide stronger guarantees with fewer validators per round.
    Polkadot achieves this by making validators distribute an
    [erasure coding](./learn-parachains-protocol.md#erasure-codes) to all validators in the system,
    such that anyone - not only the round's validators - can reconstruct a parachain's block and
    test its validity. This data availability is a core part of Polkadot - ensuring state is valid
    for its state transitions. The random parachain-validator assignments and secondary checks are
    performed by randomly selected validators, making it less likely for the small set of validators
    on each parachain to collude.

### Staking Mechanics: Ethereum PoS vs. Polkadot NPoS

Polkadot uses [Nominated Proof of Stake (NPoS)](./learn-phragmen.md) to select validators from a
smaller set, letting smaller holders nominate validators to run the network while claiming the
system's rewards without running a node. Polkadot needs about five validators for each parachain in
the network. For more information, see the [staking page](./learn-staking.md).

Ethereum is a Proof of Stake (PoS) network that requires 32 ETH to stake for each validator
instance. Validators run a primary Beacon Chain node and multiple validator clients - one for each
32 ETH. These validators get assigned to "committees," randomly selected groups to validate blocks
in the network.

### Interoperability and Message Passing

Polkadot uses [Cross-Consensus Messaging (XCM)](./learn-xcm.md) for parachains to send arbitrary
messages to each other. Parachains open connections with each other and can send messages via their
established channels. Given that [collators](./learn-collator.md) communicate directly to the relay
chain, they will be connected and can relay messages from parachain A to parachain B if needed
through these message passing channels (see:
[HRMP, VMP, and other message passing mechanisms for XCM](./learn-xcm-transport.md)).

Messages do not pass through the relay chain. Only validity proofs and channel operations do (open,
close, etc.). This enhances scalability by keeping data on the edges of the system.

Currently, Ethereum rollups can communicate using
[shared sequencers](https://medium.com/@richardchen_81235/intro-to-shared-sequencing-1622d1fd51c9),
which provides a common ground of interoperability between layer two solutions.

Polkadot plans to have the concept of
[**Accords**](../general/polkadot-direction.md#xcm-and-accords) are opt-in treaties for different
protocols to partake in. Accords ensure that logic about interoperability is kept consistent and
cannot be changed and undermined by participating protocols. This helps ensure that any XCM message
can be properly interpreted and executed as needed on the target protocol in a fully trustless
environment.

[SPREE (Shared Protected Runtime Execution Enclaves)](./learn-spree.md) is the mechanism that
provides shared logic for cross-consensus messages, and will be used to construct Accords.

## DApp Support and Development

Ethereum supports smart contract development using Solidity. These contracts are immutable, and
cannot be changed once published on-chain.

Polkadot supports smart contracts through parachains, usually using the
[ink! smart contract language](https://use.ink/), but also Solidity through Frontier-enabled
parachains. On Ethereum, smart contracts can call each other; however, they are fixed on-chain to
the domain of Ethereum. On Polkadot, smart contracts can call each other in the same parachain _and_
across parachains.

On Polkadot, developers have the option of either using smart contracts, calling extrinsics from
pallets that modify the chain's state in some particular way or merely use Polkadot's RPC to
directly retrieve and act on-chain information. DApps on Polkadot are often composed of these
multiple components working together to modify, retrieve, and watch state changes live as they
happen.

For a more comprehensive list of how to build on Polkadot, be sure to check the
[Build Section](https://docs.polkadot.com/develop/) on the main website.

## Conclusion

Ethereum and Polkadot both use a sharded model. Danksharding plans to utilize a rollup-centric
approach by focusing on data availability. The Polkadot ecosystem is secured by a main chain, called
the "relay chain," which in turn manages cores and allows tasks, such as parachains, to be run on
top of those cores and messages to be sent between them.

The primary differences between the two protocols are:

- Ethereum processes EVM-compatible state transitions, whether through rollups or on the mainnet
  itself, while Polkadot allows its parachains to have an abstract state transition function
  implementation.
- Governance processes in Ethereum are planned to be off-chain and thus require coordination for a
  hard fork to enact governance decisions. In contrast, in Polkadot the decisions are on-chain and
  enacted autonomously via forkless upgrades.
- Validator selection mechanisms differ as Polkadot can provide strong availability and validity
  guarantees with fewer validators per protocol.
