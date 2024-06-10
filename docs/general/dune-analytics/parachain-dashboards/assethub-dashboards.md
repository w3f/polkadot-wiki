---
id: assethub-dashboards
title: Asset Hub Dashboards
sidebar_label: Asset Hub
description:
  Asset Hub is a specialized parachain on Polkadot designed to facilitate the handling and
  management of digital assets across various applications. It supports asset tokenization, trading,
  and bridging services within the Polkadot ecosystem.
keywords: [polkadot, dashboard, dune, assethub, digital assets]
slug: ../assethub-dashboards
---

# Asset Hub Dashboards

## Overview

Asset Hub is a specialized parachain on Polkadot designed to facilitate the handling and management
of digital assets across various applications. It supports asset tokenization, trading, and bridging
services within the Polkadot ecosystem.

## Featured Dashboards on Dune

Here you'll find a variety of dashboards that help visualize data from the Asset Hub parachain:

- [Asset Hub](https://dune.com/substrate/assethub): Explore comprehensive analytics on digital asset
  management and operations within the AssetHub parachain.

## Key Tables

Data from the Asset Hub parachain is organized into several key tables: `assethub.balances`,
`assethub.blocks`, `assethub.calls`, `assethub.events`, `assethub.extrinsics`, `assethub.transfers`

## Useful Queries

Here are **materialized** or **parameterized** queries for Unique that may be useful to build your
own charts:

- [Asset Hub Sum of Stablecoin on Each Chain by Time](https://dune.com/queries/3526956)
  (`query_3526956(asset_id='[ASSET_ID]')`)

## Getting Started with Queries

To get started with querying data from Unique, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Sum of USDC in Polkadot Parachains" showLineNumbers
select
  *
from
  "query_3526956(asset_id='1337')" -- AssetHub Sum of Stablecoin on Each Chain by Time
where
  not chain_name = ''
```

Query result:

<iframe src="https://dune.com/embeds/3527830/5933830/" height="350" width="100%"></iframe>

Visualized result:

<iframe src="https://dune.com/embeds/3527830/5933863/" height="350" width="100%"></iframe>

:::info DuneSQL Referece

For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
and
[DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).

:::
