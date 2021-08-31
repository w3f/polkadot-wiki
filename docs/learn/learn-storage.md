---
id: learn-storage
title: Decentralised Storage
sidebar_label: Decentralised Storage
slug: ../learn-storage
---

Storage is an integral part of modern computer system, and the same is true for blockchain.

## Decentralized Cloud Storage

## Storage & Substrate

Substrate takes a layered approach to storage by using a key-value data store that is implemented
as a database-backed, _modified_ Merkle tree. Substrate's higher-layer storage abstractions are
built on the key-value store.

The key-value data store is backed by [RocksDB](https://rocksdb.org/), and it also supports an experimental [Parity database](https://github.com/paritytech/parity-db).

> The databse is used for components that require persistent storage: Substrate clients, Substrate light-clients
> & off-chain workers. Check out Substrate Developer Hub's [Storage Page](https://substrate.dev/docs/en/knowledgebase/advanced/storage) for more information.

When building on Substrate, _runtime developers_ can take advanatge of Substrate's FRAME `Storage pallet` which gives access to Substrate's storage APIs. These storage items support values that are encoded by Parity's `SCALE (Simple Concatenated Aggregate Little-Endian) Codec`.

There is a [`Storage Value`](https://substrate.dev/rustdocs/latest/frame_support/storage/trait.StorageValue.html) API that is used to store single values, a [`Storage Map`](https://substrate.dev/rustdocs/latest/frame_support/storage/trait.StorageMap.html) API that is used to a key-value hash map, a [`Storage Double Map`](https://substrate.dev/rustdocs/latest/frame_support/storage/trait.StorageDoubleMap.html) API that is creates a `storage map` with two keys to provide the ability to efficiently remove all entries that have a common first key, and a [`Storage N Map`](https://crates.parity.io/frame_support/storage/trait.StorageNMap.html) API that can be used to store a hash map with any arbitrary number of keys.

These layered APIs are act as runtime storage that allow you to store data in your blockchain. More information can be found at the [`Runtime Storage Page`](https://substrate.dev/docs/en/knowledgebase/runtime/storage) on Substrate Developer Hub.
