---
id: build-storage
title: Decentralised Storage Systems
sidebar_label: Decentralised Storage
description: Information about building with decentralised storage.
slug: ../build-storage
---

Storage is an integral part of modern computer systems, and the same is true for distributed
and decentralised systems like a blockchain. When interacting with the Polkadot ecosystem, it
will be helpful if you familiarize yourself with the current Web 3.0 approach to decentralised
storage systems, and how these systems can support your endeavors.

## DCS (Decentralised cloud storage)

The key attribute that characterises centralized cloud storage is location [of data].
In decentralised cloud storage, the key attribute becomes the data itself instead of the data's location.
This can be viewed as the shift from the centralized _location-centric_ storage approach to the decentralised
_content-centric_ approach.

### IPFS (Interplanetary File System)

[IPFS](https://ipfs.io/) is a peer-to-peer distributed file system that seeks to connect all computing devices with the
same system of files, by utilizing features such as content-addressing, content-signing, and enhanced security
methods through encryption. IPFS aims to address the current hurdles of the HTTP-based Internet.

#### Brief comparison of IPFS & HTTP:

| IPFS                                                                                                                                     | HTTP                                                                                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| network: peer-to-peer model (decentralised)                                                                                              | network: client-server model (centralised)                                                                                                                                    |
| requests: use a cryptographic hash of that data                                                                                          | requests: use the address on which data is hosted                                                                                                                             |
| accessibility: data is distributed to multiple nodes and can be accessed at any time. Bandwidth is high: nearest peer can serve the data | accessibility: data can only be accessed if the server is live and there are no interruptions in transmission. Bandwidth is limited: clients send requests to the same server |

### Filecoin

Like IPFS, [Filecoin](https://filecoin.io/) is a protocol developed by [Protocol Labs](https://protocol.ai/)
that offers a decentralised storage network. Filecoin's main focus is the storage itself and uses IPFS as a
[complementary] back-end protocol.

### Storj

[Storj](https://www.storj.io/) is a decentralised cloud storage system for developers.

### Sia

[Sia](https://sia.tech/) aims to be decentralised storage for the post-cloud world.

> Both Storj & Sia encrypt all files before being uploaded and distributes them robustly and reliably.

### Swarm

[EthSwarm](https://www.ethswarm.org/) is a system of peer-to-peer networked nodes that create a decentralised
storage and communication service for a sovereign digital society.

### BitTorrent File System (BTFS)

[BTFS](https://www.bittorrent.com/token/bittorrent-file-system/) is a file-sharing protocol that uses
the TRON network and the BitTorrent ecosystem.

## Substrate Storage

Substrate takes a layered approach to storage by using a key-value data store that is implemented
as a database-backed, _modified_ Merkle tree. Substrate's higher-layer storage abstractions are
built on the key-value store.

The key-value data store is backed by [RocksDB](https://rocksdb.org/), and it also supports an experimental
[Parity database](https://github.com/paritytech/parity-db).

> The database is used for components that require persistent storage: Substrate clients, Substrate light-clients
> & off-chain workers. For more information, check out
> Substrate Developer Hub's [Storage Page](https://substrate.dev/docs/en/knowledgebase/advanced/storage).

When building on Substrate, _runtime developers_ can take advantage of Substrate's FRAME `Storage pallet` which
gives access to Substrate's storage APIs. These storage items support values that are encoded by Parity's
`SCALE (Simple Concatenated Aggregate Little-Endian) Codec`.

There is a
[`Storage Value`](https://substrate.dev/rustdocs/latest/frame_support/storage/trait.StorageValue.html) API
that is used to store single values,
a [`Storage Map`](https://substrate.dev/rustdocs/latest/frame_support/storage/trait.StorageMap.html) API
that is used to a key-value hash map,
a [`Storage Double Map`](https://substrate.dev/rustdocs/latest/frame_support/storage/trait.StorageDoubleMap.html) API
that creates a `storage map` with two keys to provide the ability to efficiently remove all entries that have a common
first key, and a [`Storage N Map`](https://crates.parity.io/frame_support/storage/trait.StorageNMap.html) API that can
be used to store a hash map with any arbitrary number of keys.

These layered APIs act as runtime storage that allows you to store data in your blockchain. More information can be
found at the [`Runtime Storage Page`](https://substrate.dev/docs/en/knowledgebase/runtime/storage) on Substrate Developer Hub.

### PolkadotJS Storage

The PolkadotJS API offers storage methods that are part of the default Substrate runtime.
They are exposed via `api.query.<module>.<method>`.
See the [official docs](https://polkadot.js.org/docs/substrate/storage/) for more detials.
