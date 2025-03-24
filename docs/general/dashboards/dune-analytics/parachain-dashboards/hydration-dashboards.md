---
id: hydration-dashboards
title: Hydration Dashboards
sidebar_label: Hydration
description: Hydration is a decentralized finance hub on Polkadot. Its main function is a DEX.
keywords: [polkadot, dashboard, dune, hydration, DeFi]
slug: ../hydration-dashboards
---

# Hydration Dashboards

## Overview

Hydration, formerly known as HydraDX, is a decentralized finance hub on Polkadot. It offers several
types of DEX pools:

- Omnipool: a single liquidity pool for assets that have been vetted by governance. Typically, these
  would be currencies that have existed for a while and are expected to generate a high volume of
  trades.
- Stable pools: pools where all coins in the same pool are expected to trade almost at the same
  price, e.g. USDC/USDT.
- xyk-pools: pools where the price of the assets is determined by the x \* y = k formula, also known
  as the constant product formula.

Users can swap from any asset to any other asset using an automated router that will calculate the
most efficient path.

Liquidity providers can earn fees from the trades in the pools they provide liquidity to.

## Featured Dashboards on Dune

Here you will find a variety of dashboards that help visualize data from the Hydration parachain:

- [hydration on Polkadot](https://dune.com/substrate/hydradx): This dashboard provides a
  comprehensive view of DEX volumes and liquidity on the Hydration parachain.

## Key Tables

Data from the hydration parachain is organized into several key tables:

- `hydradx.balances`
- `hydradx.blocks`
- `hydradx.calls`
- `hydradx.events`
- `hydradx.extrinsics`
- `hydradx.transfers`

The `hydradx.traces` table is created by a snapshot script utilizing Hydration API calls to fetch
accurate values which would be difficult to calculate from the blockchain events alone.

Start building your own queries using granular data on Dune
[here](https://dune.com/queries?category=canonical&namespace=hydradx).

## Useful Queries

Some useful queries for Hydration are made available as materialized views.

| Subject Area        | Query                                             | Materialized View                                 | Description                                                                          |
| ------------------- | ------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Oracle              | [query_3459562](https://dune.com/queries/3459562) | `dune.substrate.result_hydradx_oracle`            | Provides hourly oracle values for all currencies present in the omnipool. Uses LRNA. |
| Oracle (Alt.)       | [query_3573146](https://dune.com/queries/3573146) | `dune.substrate.result_hydra_dx_oracle_new`       | Provides hourly oracle values for all currencies present in the omnipool. Uses DOT.  |
| Oracle (Alt. Daily) | [query_3445402](https://dune.com/queries/3445402) | `dune.substrate.result_hydra_dx_oracle_new_daily` | Same, but aggregated daily.                                                          |
| Oracle Pairs        | [query_3483707](https://dune.com/queries/3483707) | `dune.substrate.result_hydra_dx_oracle_pairs`     | Provides volume and transaction counts for all pairwise trades in the omnipool.      |
| Omnipool Liquidity  | [query_3507194](https://dune.com/queries/3507194) | `dune.substrate.result_hydradx_liquidity_master`  | Provides liquidity in the Omnipool on a per-account basis.                           |
| Assets              | [query_3482301](https://dune.com/queries/3482301) | N/A                                               | Provides asset_id, symbol, and decimals for all assets in the Hydration parachain.   |

The first Oracle query is the recommended one to use for any oracle use cases that are not
historical in nature. This is because it relies on the most reliable mechanism for determining the
actual price, using the intermediate LRNA token price. This level of detail is only available from
Jan. 2024 onwards.

For historical price analysis, the alternative oracle query uses DOT as the intermediate currency.
It may be slightly less accurate and take a bit longer to calculate.

Liquidity in the Omnipool is calculated on a per-account basis, using the NFT positions that
represent shares in the Omnipool.

Dune users are encouraged to study the source code of the queries, including parts of a query that
may have been commented out for future use.

Uncommenting these parts may accelerate your effort of adopting a query to a slightly different use
case.

## Getting Started with Queries

To get started with querying data from Hydration, you are welcome to use the mentioned materialized
queries. You can also use the following DuneSQL queries as examples:

```sql title="Hydration Omnipool Asset (Latest)" showLineNumbers
WITH MaxTimestamps AS (
  SELECT
    CAST(JSON_VALUE(kv, 'strict $.id') AS INT) AS asset_id,
    MAX(ts) AS max_ts
  FROM hydradx.traces
  WHERE track = 'omniasset'
  GROUP BY 1
), A AS (
  SELECT
    m.asset_id,
    A1.ticker,
    A1.decimals,
    m.max_ts AS ts,
    CAST(JSON_VALUE(t.pv, 'strict $.cap') AS UINT256) AS cap,
    CAST(JSON_VALUE(t.pv, 'strict $.hubReserve') AS UINT256) AS hubReserve,
    CAST(JSON_VALUE(t.pv, 'strict $.protocolShares') AS UINT256) AS protocolShares,
    CAST(JSON_VALUE(t.pv, 'strict $.shares') AS UINT256) AS shares,
    JSON_VALUE(t.pv, 'strict $.tradable.bits') AS tradeable
  FROM MaxTimestamps m
  INNER JOIN hydradx.traces t
    ON m.asset_id = CAST(JSON_VALUE(t.kv, 'strict $.id') AS INT)
    AND m.max_ts = t.ts
  JOIN query_3482301 A1
    ON A1.asset_id = m.asset_id
  WHERE t.track = 'omniasset'
)
SELECT
  asset_id,
  ticker,
  ROUND(100.0 * hubReserve / (SUM(hubReserve) OVER (ORDER BY 1)), 1) AS percentage_of_pool,
  cap / POW(10, 18) AS cap,
  ROUND(hubReserve / POW(10, 12)) AS hubReserve,
  ROUND(protocolShares / POW(10, decimals)) AS protocolShares,
  ROUND(shares / POW(10, decimals)) AS shares,
  ts AS last_update -- when this data was collected
FROM A
WHERE tradeable = '15' -- all bits set to "on"
ORDER BY 3 DESC;


```

The query is fairly typical for a parachain query on Dune. It calculates the last available values
from the snapshot table `hydradx.traces`.

The query uses Dune's native UINT256 type extensively, which allows to deal with very large numbers
and still maintain precision.

Query result:

<iframe src="https://dune.com/embeds/3485087/5857870/" height="350" width="100%"></iframe>

!!!info "DuneSQL Reference"
    For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
    and
    [DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).


