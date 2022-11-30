---
id: learn-polkadot-host
title: Polkadot Host (PH)
sidebar_label: Polkadot Host
description: Learn about the components of the Polkadot host.
keywords: [polkadot host, runtime]
slug: ../learn-polkadot-host
---

The architecture of Polkadot can be divided into two different parts, the Polkadot _runtime_ and the
Polkadot _host_. The Polkadot runtime is the core state transition logic of the chain and can be
upgraded over the course of time and without the need for a hard fork. In comparison, the Polkadot
host is the environment in which the runtime executes and is expected to remain stable and mostly
static over the lifetime of Polkadot.

The Polkadot host interacts with the Polkadot runtime in limited, and well-specified ways. For this
reason, implementation teams can build an alternative implementation of the Polkadot host while
treating the Polkadot runtime as a black box. For more details of the interactions between the host
and the runtime, please see the [specification](https://spec.polkadot.network/).

## Components of the Polkadot host

- Networking components such as `Libp2p` that facilitates network interactions.
- State storage and the storage trie along with the database layer.
- Consensus engine for GRANDPA and BABE.
- Wasm interpreter and virtual machine.
- Low level primitives for a blockchain, such as cryptographic primitives like hash functions.

A compiled Polkadot runtime, a blob of Wasm code, can be uploaded into the Polkadot host and used as
the logic for the execution of state transitions. Without a runtime, the Polkadot host is unable to
make state transitions or produce any blocks.

A host node...

1. must populate the state storage with the official genesis state.
2. should maintain a set of around 50 active peers at any time. New peers can be found using the
   discovery protocols.
3. should open and maintain the various required streams with each of its active peers.
4. should send block requests to these peers to receive all blocks in the chain and execute each of
   them.
5. should exchange neighbor packets.

Consensus in the Polkadot Host is achieved during the execution of two different procedures,
block-production and finality. The Polkadot Host must run these procedures if (and only if) it is
running on a validator node.

Additional information on each of these requirements can be found
[here](https://spec.polkadot.network/#chapter-bootstrapping).

## Diagram

Below is a diagram that displays the Polkadot host surrounding the Polkadot runtime. Think of the
runtime (in white) as a component that can be inserted, swapped out, or removed entirely. While the
parts in grey are stable and can not change without an explicit hard fork.

![polkadot host](../assets/updated_pre.png)

## Code Executor

The Polkadot Host executes the calls of Runtime entrypoints inside a Wasm Virtual Machine (VM),
which in turn provides the Runtime with access to the Polkadot Host API. This part of the Polkadot
Host is referred to as the Executor. For additional technical implementation details, check out
[this section](https://spec.polkadot.network/#sect-code-executor) of the Polkadot Spec.

## Resources

- [Polkadot Host Protocol Specification](https://github.com/w3f/polkadot-spec) - Incubator for the
  Polkadot Host spec, including tests.
- [Gossamer: A Go implementation of the Polkadot Host](https://github.com/ChainSafe/gossamer)
- [Kagome - C++ implementation of Polkadot Host](https://github.com/soramitsu/kagome)
