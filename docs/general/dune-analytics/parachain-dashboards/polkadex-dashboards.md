---
id: polkadex-dashboards
title: Polkadex Dashboards
sidebar_label: Polkadex
description:
  Polkadex is a decentralized exchange parachain on Polkadot that combines the benefits of
  centralized and decentralized exchanges, offering a high-performance trading experience with
  trustless custody.
keywords: [polkadot, dashboard, dune, polkadex, decentralized exchange]
slug: ../polkadex-dashboards
---

# Polkadex Dashboards

## Overview

Polkadex is a decentralized exchange parachain on Polkadot that combines the benefits of centralized
and decentralized exchanges, offering a high-performance trading experience with trustless custody.
It aims to provide a seamless trading environment while ensuring the security of a decentralized
platform.

## Featured Dashboards on Dune

Here you'll find a variety of dashboards that help visualize data from the Polkadex parachain:

- [Polkadex](https://dune.com/substrate/polkadex): This dashboard provides a comprehensive view of
  trading activities and token dynamics within the Polkadex network.

## Key Tables

Data from the Polkadex parachain is organized into several key tables: `polkadex.balances`,
`polkadex.blocks`, `polkadex.calls`, `polkadex.events`, `polkadex.extrinsics`, `polkadex.transfers`

## Useful Queries

Currently, there are no specific queries provided. Please check back later for updates.

## Getting Started with Queries

To get started with querying data from Snowbridge, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Polkadot BridgeHub Outbound Msg Sent To Ethereum" showLineNumbers
select
  date_trunc('day', block_time) as day,
  count(method) as cnt
from
  polkadex.events
where
  method = 'TransferredMultiAssets'
group by
  date_trunc('day', block_time)
```

Query result:

<iframe src="https://dune.com/embeds/3830615/6442634/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3830615/6442645/" height="350" width="100%"></iframe>

:::info DuneSQL Reference

For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
and
[DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).

:::
