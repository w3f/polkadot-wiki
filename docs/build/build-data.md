---
id: build-data
title: Explorer, Data, & Indexing Tools
sidebar_label: Explorer, Data, & Indexing Tools
description: An overview about building with data analytics
keywords: [data, index, query, explorer, dashboard]
slug: ../build-data
---

The tools that accentuate and aggregate the data within blockchains are integral for a multi-chain
future. Parachains will need robust and secure ways to index and aggregate data, such as a data
aggregation layer.

## Custom Indexer

### Subsquid

[Subsquid](https://subsquid.io/) is an open-source framework for building tailored GraphQL APIs to
query Substrate chain state and history.

Subsquid replaces direct gRPC node access with performant Squid archive gateways, allowing quick
synchronization of the API with the historical on-chain data.

Subsquid-powered APIs support filtering, pagination, union types, interfaces, and full-text search
out-of-the-box, and can be further extended with custom GraphQL resolvers.

### SubQuery

[SubQuery](https://subquery.network/) is a fast, flexible, and reliable open-source data indexer
that provides you with custom APIs for your Substrate/Polkadot project. We build the best,
fully-featured indexer, so you don’t have to, with:

- automatic support for any Substrate network
- support for all Polkadot smart contract frameworks (FrontierEVM, Acala EVM+, and Wasm)
- automated historical state tracking to enable faster partial re-indexing
- a lightweight and portable design that doesn't require centralized archives
- full support for GraphQL filtering, pagination, interfaces, subscriptions, and aggregations
- a future decentralized network acts as chain-agnostic data aggregation, indexing, and querying
  layer between blockchains and applications that will not require centralized services.

To start building, head to the [SubQuery documentation](https://academy.subquery.network/) where
you'll find quick start guides and walkthrough developer tutorials.

### The Graph

[The Graph](https://thegraph.com/en/) is a layer-1 indexing tool and querying layer for the
decentralized web, who announced an integration plan to bring
[indexing and querying to Polkadot](https://medium.com/polkadot-network/the-graph-bringing-indexing-and-querying-to-polkadot-6b433e381fe8).

The Graph allows developers to build and publish open APIs, called subgraphs. Applications can query
subgraphs using [GraphQL](https://graphql.org/).

## Analytics platform

### DIN

[DIN](https://din.lol/)(formally named Web3Go) is a Polkadot-based open data analytics platform that
provides infrastructure and tooling to help users visualize, curate, share, and analyze on-chain
data.

### Covalent

[Covalent](https://www.covalenthq.com/) offers a unified API to understand the data on a blockchain,
and is currently live on the [Moonbeam](https://moonbeam.network/) network, bringing visibility to
billions of blockchain data points to Polkadot via their unified API. The approach to deploying on
Moonbeam simplifies the development of Polkadot-based blockchain applications as compared to
implementing a full parachain or an on-demand parachain.

Covalent captures the entire history of blockchains and offers a way to zoom into data points
recorded in smart contracts that are often not accessible.

## Data warehouse

### BigQuery by Google Cloud

[BigQuery](https://cloud.google.com/bigquery) makes Polkadot blockchain data available for Google
Cloud users. Check this
[announcement](https://cloud.google.com/blog/products/data-analytics/data-for-11-more-blockchains-in-bigquery-public-datasets)
for details on how to access the data.

## Block Explorers

As you can imagine, blockchain explorers also offer data analytics through an interface where users
can examine common data points.

Some block explorers in the Polkadot ecosystem are listed on the
[tools page](build-tools-index.md##block-explorers).
