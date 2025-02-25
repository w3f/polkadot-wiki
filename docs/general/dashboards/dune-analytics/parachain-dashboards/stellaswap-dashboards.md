---
id: stellaswap-dashboards
title: Stellaswap Dashboards
sidebar_label: Stellaswap (Moonbeam)
description: Stellaswap is the leading DEX on Moonbeam.
keywords: [polkadot, dashboard, dune, stellaswap, DeFi, moonbeam]
slug: ../stellaswap-dashboards
---

# Stellaswap Dashboards

## Overview

Stellaswap is the leading DEX on Moonbeam, no matter whether you measure by volume, number of pools,
or accounts using it. It also offers liquid staking for DOT.

Users can swap from any asset to any other asset using an automated router that will calculate the
most efficient path.

Liquidity providers can earn fees from the trades in the pools they provide liquidity to.

## Featured Dashboards on Dune

Here you will find a variety of dashboards that help visualize data from StellaSwap:

- [stellaswap on Polkadot](https://dune.com/substrate/stellaswap): This dashboard provides a
  comprehensive view of DEX volumes and liquidity on StellaSwap.

## Key Tables

Data from the stellaswap DEX is sourced directly from substrate moonbeam tables: `moonbeam.events`

## Useful Queries

Some useful queries for Hydration are made available as materialized views.

| Subject Area               | Query                                             | Materialized View                                  | Description                                                |
| -------------------------- | ------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------- |
| Stellaswap V3 Trades       | [query_3661633](https://dune.com/queries/3661633) | `dune.substrate.result_stellaswap_v_3_trades`      | Trades in V3 pools, similar to dex.trades format.          |
| Stellaswap V3 Trades (alt) | [query_3646057](https://dune.com/queries/3646057) | `dune.substrate.result_stellaswap_v3_trades`       | Trades in V3 pools, suitable for volume and price analysis |
| V3 Trades Enriched         | [query_3656957](https://dune.com/queries/3656957) | `dune.substrate.result_stellaswap_trades_enriched` | Trades in V3 pools, with USD equivalent prices.            |
| Stellaswap V3 Pools        | [query_3639606](https://dune.com/queries/3639606) | `dune.substrate.dataset_stella_pools` (dataset)    | Master data for the pools                                  |

The three queries presented are all very similar, but they are optimized for different use cases.

Each trade will provide a token0 and token1, which are the two tokens traded. The order depends on
the order in the pool definition (see V3 pools query). Example: for the pool WGLMR-xcDOT, WGLMR is
token0 and xcDOT is token1. Whether someone was buying or selling GLMR can be seen by the sign of
amount0. Positive means "selling", negative means "buying". Only one of the first of the three
queries above sorts the tokens into the right order.

The other queries keep token0 and token1 in the order in which they appear in the raw data, which
also makes it easier to aggregate for the price and volume.

Pool master data is currently provided as a dataset directly, rather than parsed from events or from
a snapshot. This means the latest pools added may not be included in the dataset. (Remains a work in
progress.)

Dune users are encouraged to study the source code of the queries, including parts of a query that
may have been commented out for future use.

Uncommenting these parts may accelerate your effort of adopting a query to a slightly different use
case.

## Getting Started with Queries

To get started with querying data from Stellaswap, you are welcome to use the mentioned materialized
queries. You can also use the following DuneSQL queries as examples:

```sql title="Stellaswap Volume Last Day" showLineNumbers
WITH maxts AS (
  SELECT
    MAX(DATE_TRUNC('day', block_time)) AS maxts
  FROM
    dune.substrate.result_stellaswap_trades_enriched T
)
SELECT
  DATE_TRUNC('day', block_time) AS date,
  T.token_pair,
  project_contract_address,
  current_timestamp - MAX(block_time) AS last_seen_ago,
  ROUND(SUM(ABS(amount_usd))) AS volume_usd,
  T.subquery
FROM
  dune.substrate.result_stellaswap_trades_enriched T
WHERE
  DATE_TRUNC('day', block_time) = (SELECT maxts FROM maxts)
GROUP BY
  1, 2, 3, 6
ORDER BY
  1 DESC, 5 DESC;


```

The query calculates the last available day's volume for each token pair. It also shows which pair
was used to calculate the USD value of the tokens involved. For example, if you trade a pair which
contains USDC or USDT, the dollar value of the trade is just the amount of USDC or USDT traded. For
other pairs, the USD value is calculated using another currency as an intermediate, i.e. DOT or
GLMR. Any pair which does not at least have one of these currencies will not have a USD value
calculated.

Query result:

<iframe src="https://dune.com/embeds/3676341/6183229/" height="350" width="100%"></iframe>

!!!info "DuneSQL Reference"
    For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
    and [DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).


