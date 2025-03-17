---
id: assethub-dashboards
title: Asset Hub Dashboards
sidebar_label: Asset Hub
description:
  Asset Hub is a specialized system chain on Polkadot designed to facilitate the handling and
  management of digital assets across various applications.
keywords: [polkadot, dashboard, dune, assethub, digital assets]
slug: ../assethub-dashboards
---

# Asset Hub Dashboards

## Overview

Asset Hub is a specialized parachain on Polkadot designed to facilitate the handling and management
of digital assets across various applications. It supports asset tokenization, trading, and bridging
services within the Polkadot ecosystem.

## Featured Dashboards on Dune

Here you will find a variety of dashboards that help visualize data from the Asset Hub parachain:

- [Asset Hub](https://dune.com/substrate/assethub): Explore comprehensive analytics on digital asset
  management and operations within the AssetHub parachain.

## Key Tables

Data from the Asset Hub parachain is organized into several key tables:

- `assethub.balances`
- `assethub.blocks`
- `assethub.calls`
- `assethub.events`
- `assethub.extrinsics`
- `assethub.transfers`

Start building your own queries using granular data on Dune
[here](https://dune.com/queries?category=canonical&namespace=assethub).

## Useful Queries

Some useful queries for Asset Hub are provided:

| Title                                             | Query                                                                    | Description                                      |
| ------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------ |
| Asset Hub Sum of Stablecoin on Each Chain by Time | [query_3526956](https://dune.com/queries/3526956)(asset_id='[ASSET_ID]') | Find the sum of stablecoin on each chain by time |

## Getting Started with Queries

To get started with querying data from Unique, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Sum of USDC in Polkadot Parachains" showLineNumbers
SELECT
  *
FROM
  "query_3526956(asset_id='1984')" -- AssetHub Sum of Stablecoin on Each Chain by Time
WHERE
  not chain_name = ''
```

Query result:

<iframe src="https://dune.com/embeds/3527846/5933854" height="350" width="100%"></iframe>

Visualized result:

<iframe src="https://dune.com/embeds/3527846/6451568" height="350" width="100%"></iframe>

!!!info "DuneSQL Reference"
    For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
    and
    [DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).


