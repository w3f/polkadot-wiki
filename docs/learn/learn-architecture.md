---
id: learn-architecture
title: Architecture
sidebar_label: Architecture
description: Learn about the key components to Polkadot's Architecture.
keywords: [polkadot, components, architecture]
slug: ../learn-architecture
---

Polkadot is a heterogeneous multichain with shared security and interoperability.

# Components

## Relay Chain

The Relay Chain is the central chain of Polkadot. All validators of Polkadot are staked on the Relay
Chain in DOT and validate for the Relay Chain. The Relay Chain is composed of a relatively small
number of transaction types that include ways to interact with the governance mechanism, parachain
auctions, and participating in NPoS. The Relay Chain has deliberately minimal functionality - for
instance, smart contracts are not supported. The main responsibility is to coordinate the system as
a whole, including parachains. Other specific work is delegated to the parachains, which have
different implementations and features.

## [Parachain](learn-parachains.md) and [Parathread](learn-parathreads.md) Slots

Polkadot can support a number of execution slots. These slots are like cores on a computer's
processor (a modern laptop's processor may have eight cores, for example). Each one of these cores
can run one process at a time. Polkadot allows these slots using two subscription models: parachains
and parathreads. Parachains have a dedicated slot (core) for their chain and are like a process that
runs constantly. Parathreads share slots amongst a group, and are thus more like processes that need
to be woken up and run less frequently.

Most of the computation that happens across the Polkadot network as a whole will be delegated to
specific parachain or parathread implementations that handle various use cases. Polkadot places no
constraints over what parachains can do besides that they must be able to generate a proof that can
be validated by the validators assigned to the parachain. This proof verifies the state transition
of the parachain. Some parachains may be specific to a particular application, others may focus on
specific features like smart contracts, privacy, or scalability &mdash; still, others might be
experimental architectures that are not necessarily blockchain in nature.

Polkadot provides many ways to secure a slot for a parachain for a particular length of time.
Parathreads are part of a pool that shares slots and must-win auctions for individual blocks.
Parathreads and parachains have the same API; their difference is economic. Parachains will have to
reserve DOT for the duration of their slot lease; parathreads will pay on a per-block basis.
Parathreads can become parachains, and vice-versa.

### [Shared Security](learn-security.md)

Parachains connected to the Polkadot Relay Chain all share in the security of the Relay Chain.
Polkadot has a shared state between the Relay Chain and all of the connected parachains. If the
Relay Chain must revert for any reason, then all of the parachains would also revert. This is to
ensure that the validity of the entire system can persist and no individual part is corruptible.

The shared state ensures that the trust assumptions when using Polkadot parachains are only those of
the Relay Chain validator set and no other. Since the validator set on the Relay Chain is expected
to be secure with a large amount of stake put up to back it, parachains should benefit from this
security.

## Interoperability

### [XCM](learn-xcm)

XCM, short for cross-consensus message, is a format and not a protocol. The format does not assume
anything about the receiver or senders consensus mechanism, it only cares about the format in which
the messages must be structured in. The XCM format is how parachains will be able to communicate
with one another. Different from XCMP, which is short for cross-chain messaging protocol, XCM is
what gets delivered, and XCMP is the delivery mechanism. The best way to learn more about XCM is by
reading the [specification](https://github.com/paritytech/xcm-format).

### [Bridges](learn-bridges.md)

A blockchain [bridge](../general/glossary.md#bridge) is a connection that allows for arbitrary data
to transfer from one network to another. These chains are interoperable through the bridge but can
exist as standalone chains with different protocols, rules, and governance models. In Polkadot,
bridges connect to the Relay Chain and are secured through the Polkadot consensus mechanism,
maintained by [collators](#collators).

Polkadot uses bridges to bridge the future of Web 3.0, as bridges are fundamental to Polkadot's
interoperable architecture by acting as a [secure and robust] communication channel for chains in
isolation.

# Main Actors

## Validators

[Validators](../general/glossary.md#validator), if elected to the validator set, produce blocks on
the Relay Chain. They also accept proofs of valid state transition from collators and receive
staking rewards in return.

Validators are required to keep enough parachain blocks available for later use in their local storage. Those blocks are retrievable by peers who lack that
information, so that they can reliably confirm the issued validity statements about parachain blocks. The
[Availability & Validity](https://spec.polkadot.network/#chapter-anv) (AnV) protocol consists of
multiple steps for successfully upholding those responsibilities.

## Nominators

[Nominators](../general/glossary.md#nominator) bond their stake to particular validators in order to
help them get into the active validator set and thus produce blocks for the chain. In return,
nominators are generally rewarded with a portion of the staking rewards from that validator.

## Collators

[Collators](../general/glossary.md#collator) are full nodes on both a parachain and the Relay Chain.
They collect parachain transactions and produce state transition proofs for the validators on the
Relay Chain. They can also send and receive messages from other parachains using XCMP.

Parachain blocks themselves are produced by collators, whereas the relay chain validators only
verify their validity (and later, their availability).

---

## Whiteboard Series

For a video overview of the architecture of Polkadot watch the video below for the whiteboard
interview with W3F researcher Alistair Stewart:

<iframe width="560" height="315" src="https://www.youtube.com/embed/xBfC6uTjvbM" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
