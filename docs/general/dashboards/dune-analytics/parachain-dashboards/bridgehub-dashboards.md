---
id: bridgehub-dashboards
title: BridgeHub Dashboards
sidebar_label: BridgeHub
description:
  BridgeHub is a system parachain within the Polkadot ecosystem, designed to enable trustless
  bridging between Polkadot and other blockchains such as Kusama and Ethereum.
keywords: [polkadot, kusama, dashboard, dune, bridgehub, system-parachain]
slug: ../bridgehub-dashboards
---

# BridgeHub Dashboards

## Overview

Polkadot BridgeHub is a system parachain within the Polkadot ecosystem, designed to enable trustless
bridging between Polkadot and other blockchains such as Kusama and Ethereum. It ensures secure
cross-chain communication through a combination of on-chain and off-chain components. This dashboard
primarily analyzes the bridging information between Polkadot and Kusama.

The Ethereum to Polkadot BridgeHub primarily utilizes Snowbridge. For more details, visit our
[Snowbridge Dashboard](https://dune.com/substrate/snowbridge).

## Featured Dashboards on Dune

Here you will find a variety of dashboards that help visualize data from the BridgeHub parachain:

- [BridgeHub](https://dune.com/substrate/bridgehub): A comprehensive analysis of BridgeHub,
  including: Kusama Related On Chain Data Analysis, Analysis of Messages with Kusama.

## Key Tables

Data from the BridgeHub parachain is organized into several key tables:

- `bridgehub.balances`
- `bridgehub.blocks`
- `bridgehub.calls`
- `bridgehub.events`
- `bridgehub.extrinsics`
- `bridgehub.transfers`

Start building your own queries using granular data on Dune
[here](https://dune.com/queries?category=canonical&namespace=bridgehub).

## Useful Queries

Some useful queries for Bridgehub are provided:

| Title                          | Query                                               | Description                                          |
| ------------------------------ | --------------------------------------------------- | ---------------------------------------------------- |
| Bridgehub Messages with Kusama | [queries_3816910](https://dune.com/queries/3816910) | Find all message records between Polkadot and Kusama |

## Getting Started with Queries

To get started with querying data from Unique, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Bridgehub and Kusama Message Trends" showLineNumbers
WITH
  transactions AS (
    SELECT
      CASE
        WHEN ROW_NUMBER() OVER (
          PARTITION BY
            "from",
            "to",
            "send_time"
          ORDER BY
            "send_time"
        ) % 2 = 1 THEN "from"
        ELSE "to"
      END AS direction,
      date_trunc('month', "send_time") as month
    FROM
      query_3816910
  ),
  polkadot_to_kusama AS (
    SELECT
      month,
      COUNT(*) as count_polkadot_to_kusama
    FROM
      transactions
    WHERE
      direction = 'polkadot'
    GROUP BY
      month
  ),
  kusama_to_polkadot AS (
    SELECT
      month,
      COUNT(*) as count_kusama_to_polkadot
    FROM
      transactions
    WHERE
      direction = 'kusama'
    GROUP BY
      month
  ),
  all_polkadot_to_kusama AS (
    SELECT
      'for_join' as "for_join",
      COUNT(*) as total_count_polkadot_to_kusama
    FROM
      transactions
    WHERE
      direction = 'polkadot'
  ),
  all_kusama_to_polkadot AS (
    SELECT
      'for_join' as "for_join",
      COUNT(*) as total_count_kusama_to_polkadot
    FROM
      transactions
    WHERE
      direction = 'kusama'
  ),
  monthly_result as (
    SELECT
      coalesce(
        polkadot_to_kusama.month,
        kusama_to_polkadot.month
      ) as month,
      coalesce(count_polkadot_to_kusama, 0) as count_polkadot_to_kusama,
      coalesce(count_kusama_to_polkadot, 0) as count_kusama_to_polkadot,
      'for_join' as "for_join"
    FROM
      polkadot_to_kusama
      FULL OUTER JOIN kusama_to_polkadot ON polkadot_to_kusama.month = kusama_to_polkadot.month
    ORDER BY
      month
  )
SELECT
  monthly_result.month,
  monthly_result.count_polkadot_to_kusama,
  monthly_result.count_kusama_to_polkadot,
  all_polkadot_to_kusama.total_count_polkadot_to_kusama,
  all_kusama_to_polkadot.total_count_kusama_to_polkadot
FROM
  monthly_result
  LEFT JOIN all_polkadot_to_kusama on monthly_result.for_join = all_polkadot_to_kusama.for_join
  LEFT JOIN all_kusama_to_polkadot on monthly_result.for_join = all_kusama_to_polkadot.for_join
```

Query result:

<iframe src="https://dune.com/embeds/3821198/6426898" height="350" width="100%"></iframe>

!!!info "DuneSQL Reference"
    For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
    and
    [DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).


