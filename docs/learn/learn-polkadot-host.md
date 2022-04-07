---
id: learn-polkadot-host
title: Polkadot Host (PH)
sidebar_label: Polkadot Host
description: Learn about the components of the Polkadot host.
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
and the runtime, please see the [specification][].

## Components of the Polkadot host

- Networking components such as Libp2p that facilitates network interactions.
- State storage and the storage trie along with the database layer.
- Consensus engine for GRANDPA and BABE.
- Wasm interpreter and virtual machine.
- Low level primitives for a blockchain, such as cryptographic primitives like hash functions.

A compiled Polkadot runtime, a blob of Wasm code, can be uploaded into the Polkadot host and used as
the logic for the execution of state transitions. Without a runtime, the Polkadot host is unable to
make state transitions or produce any blocks.

## Diagram

Below is a diagram that displays the Polkadot host surrounding the Polkadot runtime. Think of the
runtime (in white) as a component that can be inserted, swapped out, or removed entirely. While the
parts in grey are stable and can not change without an explicit hard fork.

![polkadot host](../assets/updated_pre.png)

## Resources

- [Polkadot Host Protocol Specification](https://github.com/w3f/polkadot-spec) - Incubator for the
  Polkadot Host spec, including tests.
- [Gossamer: A Go implementation of the Polkadot Host](https://github.com/ChainSafe/gossamer) 
- [Kagome - C++ implementation of Polkadot Host](https://github.com/soramitsu/kagome)

[specification]: https://github.com/w3f/polkadot-spec/
