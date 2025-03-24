---
id: interlay-dashboards
title: Interlay Dashboards
sidebar_label: Interlay
description:
  Interlay is a decentralized finance hub on Polkadot. It started as a native Bitcoin bridge,
keywords: [polkadot, dashboard, dune, interlay, DeFi]
slug: ../interlay-dashboards
---

# Interlay Dashboards

## Overview

Interlay is a decentralized finance hub on Polkadot. It started as a native Bitcoin bridge, allowing
users to mint and redeem iBTC on the Polkadot network. iBTC is a trustless, decentralized, and
interoperable token redeemable one-for-one with native Bitcoin.

In the summer of 2023, Interlay also launched a DEX and a lending protocol. While the DEX has seen
liquidity disappear after rewards were stopped, the lending protocol has seen continued usage.

Vaults play a crucial role for iBTC, as they guarantee the value of the minted iBTC through vault
collateral. Currently, vault collateral can be DOT, VDOT, USDC, USDT, and lend tokens (qDOT, qUSDT,
etc.) from the lending protocol. When using lend tokens, vault operators are double dipping: earning
interest on the currency lent, and earning vault rewards.

New currencies can be added to the Interlay protocol via governance proposals. The governance token,
INTR, is used to vote on these proposals. Only staked INTR can vote, and the staked INTR is locked
for a period of time.

## Featured Dashboards on Dune

Here you will find a variety of dashboards that help visualize data from the Interlay parachain:

- [interlay on Polkadot](https://dune.com/substrate/polkadot-interlay): This dashboard provides a
  comprehensive view of iBTC minting, redeeming, lending, borrowing, and vault rewards.

## Key Tables

Data from the interlay parachain is organized into several key tables:

- `interlay.balances`
- `interlay.blocks`
- `interlay.calls`
- `interlay.events`
- `interlay.extrinsics`
- `interlay.transfers`

The `interlay.traces` table is created by a snapshot script utilizing Interlay API calls to fetch
accurate values which would be difficult to calculate from the blockchain events alone.

Start building your own queries using granular data on Dune
[here](https://dune.com/queries?category=canonical&namespace=interlay).

## Useful Queries

Some useful queries for Interlay are made available as materialized views.

| Subject Area     | Query                                             | Materialized View                               | Description                                                                |
| ---------------- | ------------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------- |
| Vault Collateral | [query_3437565](https://dune.com/queries/3437565) | `dune.substrate.result_interlay_vault_creation` | Provides vaults and their collateral.                                      |
| Interlay Oracle  | [query_3445402](https://dune.com/queries/3445402) | `dune.substrate.result_interlay_oracle`         | Provides hourly oracle values for all currencies present on the parachain. |

Dune users are encouraged to study the source code of the queries, including parts of a query that
may have been commented out for future use.

Uncommenting these parts may accelerate your effort of adopting a query to a slightly different use
case.

## Getting Started with Queries

To get started with querying data from Interlay, you are welcome to use the mentioned materialized
queries. You can also use the following DuneSQL queries as examples:

```sql title="Interlay Loan Market Data" showLineNumbers
WITH ASSETS AS (
  SELECT symbol, decimals
  FROM (VALUES
    ('DOT', 10),
    ('INTR', 10),
    ('IBTC', 8)
  ) AS t(symbol, decimals)
), LOANDATA AS (
  SELECT
    E.block_time,
    E.method,
    event_id,
    COALESCE(CAST(JSON_VALUE(data, 'strict $[0].token') AS VARCHAR), FA.symbol) AS token,
    -- json_array_length(data) as len,
    -- COALESCE(ASSETS.decimals, FA.decimals) as token_decimals,
    CAST(JSON_VALUE(data, 'strict $[1]') AS UINT256) / POW(10, COALESCE(ASSETS.decimals, FA.decimals)) AS total_borrows,
    CAST(JSON_VALUE(data, 'strict $[2]') AS UINT256) / POW(10, COALESCE(ASSETS.decimals, FA.decimals)) AS total_reserves,
    CAST(JSON_VALUE(data, 'strict $[3]') AS UINT256) / 1e18 AS borrow_index,
    CAST(JSON_VALUE(data, 'strict $[4]') AS UINT256) / 1e6 AS utilization,
    CAST(JSON_VALUE(data, 'strict $[5]') AS UINT256) / 1e18 AS borrow_rate,
    CAST(JSON_VALUE(data, 'strict $[6]') AS UINT256) / 1e18 AS supply_rate,
    CAST(JSON_VALUE(data, 'strict $[7]') AS UINT256) / 1e18 AS exchange_rate
  FROM interlay.events E
  LEFT JOIN query_3564454 FA ON FA.foreign_asset = CAST(JSON_VALUE(data, 'strict $[0].foreignAsset') AS INT)
  LEFT JOIN ASSETS ON ASSETS.symbol = JSON_VALUE(data, 'strict $[0].token')
  WHERE E.section = 'loans' AND E.method = 'InterestAccrued'
)
SELECT
  date_trunc('hour', block_time) AS hour_period,
  token,
  AVG(total_borrows) AS total_borrows,
  AVG(total_reserves) AS total_reserves,
  AVG(borrow_index) AS borrow_index,
  AVG(utilization) AS utilization,
  AVG(borrow_rate) AS borrow_rate,
  AVG(supply_rate) AS supply_rate,
  AVG(exchange_rate) AS exchange_rate
FROM LOANDATA
GROUP BY 1, 2
ORDER BY 1 DESC;


```

The query is fairly typical for a parachain query on Dune. It parses events from the
`interlay.events` table, and calculates the average values for each hour.

It also joins the `interlay.events` table with another query, `query_3564454`, which provides the
foreign assets used in the loan market.

Finally, it uses the `ASSETS` CTE to provide the decimals for each native token in the loan market.
The native assets are not available on chain, so they are hardcoded in the `ASSETS` CTE. However,
they are unlikely to change over time, so this is safe.

The query uses Dune's native UINT256 type extensively, which allows to deal with very large numbers
and still maintain precision.

Query result:

<iframe src="https://dune.com/embeds/3574287/6017896/" height="350" width="100%"></iframe>

!!!info "DuneSQL Reference"
    For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
    and
    [DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).


