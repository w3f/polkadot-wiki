---
id: pendulum-dashboards
title: Pendulum Dashboards
sidebar_label: Pendulum
description: Pendulum focuses on bridging fiat currencies and decentralized finance (DeFi).
keywords: [polkadot, dashboard, dune, pendulum, DeFi]
slug: ../pendulum-dashboards
---

# Pendulum Dashboards

## Overview

Pendulum is a parachain on Polkadot that focuses on bridging fiat currencies and decentralized
finance (DeFi). It aims to create a fully functional fiat-optimized blockchain that facilitates open
financial applications and connects them with the traditional financial sector.

## Featured Dashboards on Dune

Here you will find a variety of dashboards that help visualize data from the Pendulum parachain:

- [Pendulum on Polkadot](https://dune.com/substrate/pendulum): Explore comprehensive data
  visualizations tracking the integration of fiat and DeFi on the Pendulum parachain.

Please also visit our dashboards for Pendulum on
[Dune Analytics](https://dune.com/discover/content/relevant?q=title:Pendulum%20author:substrate).

## Key Tables

Data from the Pendulum parachain is organized into several key tables:

- `pendulum.balances`
- `pendulum.blocks`
- `pendulum.calls`
- `pendulum.events`
- `pendulum.extrinsics`
- `pendulum.transfers`

Start building your own queries using granular data on Dune
[here](https://dune.com/queries?category=canonical&namespace=pendulum).

## Useful Queries

Some useful queries for Pendulum are provided:

| Title                           | Query                                             | Description                                               |
| ------------------------------- | ------------------------------------------------- | --------------------------------------------------------- |
| Pendulum Spacewalk Transactions | [query_3821151](https://dune.com/queries/3821151) | Find all Spacewalk transactions on the Pendulum parachain |

## Getting Started with Queries

To get started with querying data from Unique, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Pendulum Spacewalk Transactions by Month" showLineNumbers
SELECT
  DATE_TRUNC('month', block_time) AS month,
  SUM(amount) AS amount,
  COUNT(*) AS count,
  token_name
FROM
  query_3821151 -- Pendulum Spacewalk Transactions
GROUP BY
  DATE_TRUNC('month', block_time),
  token_name;
```

Query result:

<iframe src="https://dune.com/embeds/3825144/6433755/1ae87539-28c8-4007-a429-5077df8b9adb" height="350" width="100%"></iframe>

!!!info "DuneSQL Reference"
    For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
    and
    [DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).


