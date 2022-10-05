---
id: build-data
title: Data Analytics
sidebar_label: Data
description: An overview about building with data analytics
keywords: [data, index, query, explorer, dashboard]
slug: ../build-data
---

The tools that accentuate and aggregate the data within blockchains are integral for a multi-chain
future. Parachains will need robust and secure ways to index and aggregate data, such as a data
aggregation layer.

## Indexing and Querying

### Subsquid

[Subsquid](https://subsquid.io/) is an open-source framework for building tailored GraphQL APIs to
query Substrate chain state and history.

Subsquid replaces direct gRPC node access with perfomant Squid archive gateways, allowing quick
synchronization of the API with the historical on-chain data.

Subsquid-powered APIs support filtering, pagination, union types, interfaces and full-text search
out-of-the-box, and can be further extended with custom GraphQL resolvers.

### SubQuery

[SubQuery](https://subquery.network/) is an indexer that allows for the indexing, transforming, and
querying of Substrate chain data to power applications. The decentralized network acts as a
chain-agnostic data aggregation, indexing, and querying layer between blockchains and applications.

SubQuery abstracts away blockchain-specific data idiosyncrasies using the
[SubQuery SDK](https://github.com/subquery/subql).

### Web3Go

[Web3GO](https://web3go.xyz/) is a Polkadot-based open data analytics platform that provides
infrastructure and tooling to help users visualize, curate, share, and analyze on-chain data.

### The Graph

[The Graph](https://thegraph.com/en/) is a layer-1 indexing tool and querying layer for the
decentralized web, who announced an integration plan to bring
[indexing and querying to Polkadot](https://medium.com/polkadot-network/the-graph-bringing-indexing-and-querying-to-polkadot-6b433e381fe8).

The Graph allows developers to build and publish open APIs, called subgraphs. Applications can query
subgraphs using [GraphQL](https://graphql.org/).

### Covalent

[Covalent](https://www.covalenthq.com/) offers a unified API to understand the data on a blockchain,
and is currently live on the [Moonbeam](https://moonbeam.network/) network, bringing visibility to
billions of blockchain data points to Polkadot via their unified API. The approach to deploy on
Moonbeam simplifies the development of Polkadot-based blockchain applications as compared to
implementing a full parachain or parathread.

Covalent captures the entire history of blockchains and offers a way to zoom into data points
recorded in smart contracts that are often not accessible.

### Polkadot-based Explorers

As you can imagine, blockchain explorers also offer data analytics through an interface where users
can examine common data points.

Some block explorers in the Polkadot ecosystem are listed on the
[tools page](build-tools-index.md##block-explorers).
