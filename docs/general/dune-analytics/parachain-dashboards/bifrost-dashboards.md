---
id: bifrost-dashboards
title: Bifrost Dashboards
sidebar_label: Bifrost
description: bifrost is a decentralized finance hub and liquid staking platform.
keywords: [polkadot, dashboard, dune, bifrost, DeFi]
slug: ../bifrost-dashboards
---

# Bifrost Dashboards

## Overview

Bifrost is a decentralized finance hub and liquid staking platform on the Polkadot network and other
chains. Users obtain a liquid staking token, vToken, by staking their native tokens. The vToken can
then be used in DeFi applications, such as lending, borrowing, and trading.

On Polkadot, users can stake DOT, ASTR, FIL, GLMR, Manta at the moment.

They can also trade their vTokens in a DEX (stableswap) operating on the Bifrost parachain.

## Featured Dashboards on Dune

Here you'll find a variety of dashboards that help visualize data from the Bifrost parachain:

- [bifrost on Polkadot](https://dune.com/substrate/bifrost): This dashboard provides a comprehensive
  view of staking, value locked, and trading on Bifrost parachain.

## Key Tables

Data from the bifrost parachain is organized into several key tables: `bifrost.balances`,
`bifrost.blocks`, `bifrost.calls`, `bifrost.events`, `bifrost.extrinsics`, `bifrost.transfers`,
`bifrost.traces`

The `bifrost.traces` table is created by a snapshot script utilizing Bifrost API calls to fetch
accurate values which would be difficult to calculate from the blockchain events alone.

## Useful Queries

Some of the most important queries for Bifrost are mentioned here.

| Subject Area       | Query                                             | Description                                                                                      |
| ------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Liquid Staking     | [query_3571958](https://dune.com/queries/3571958) | Provides amount of vTokens and therefore tokens staked (1=1) Used HydraDX oracle for USD values. |
| Bifrost Stableswap | [query_3532234](https://dune.com/queries/3532234) | Provides price and volume for stableswap pairs, e.g. DOT <-> VDOT                                |

Dune users are encouraged to study the source code of the queries, including parts of a query that
may have been commented out for future use.

Uncommenting these parts may accelerate your effort of adopting a query to a slightly different use
case.

## Getting Started with Queries

To get started with querying data from Bifrost, you are welcome to use the mentioned queries. You
can also use the following DuneSQL queries as examples:

```sql title="Bifrost Loan Market Data" showLineNumbers
WITH A AS(
select
block_time,
event_id,
section,
method,
JSON_ARRAY_LENGTH(data) as array_length,
JSON_VALUE(data, 'strict $[0]') as account,
--JSON_QUERY(data, 'strict $[1]') as value_1,
--JSON_VALUE(data, 'strict $[2]') as some_amount,
JSON_QUERY(data, 'strict $[3]') as token_in,
JSON_QUERY(data, 'strict $[4]') as token_out,
CAST(JSON_VALUE(data, 'strict $[5]') AS UINT256) as amount_in,
CAST(JSON_VALUE(data, 'strict $[9]') AS UINT256) as amount_out
--JSON_QUERY(data, 'strict $[7]') as value_7,
--JSON_QUERY(data, 'strict $[8]') as value_8,
--JSON_QUERY(data, 'strict $[9]') as value_9
from bifrost.events
where section='stableAsset' and method in ('TokenSwapped') and block_time > TIMESTAMP '2024-05-01'
)
SELECT
date_trunc('hour', block_time) as "day",
SUM(amount_in)/1e10 as dot_volume_swapped,
1.000 * SUM(amount_in)/SUM(amount_out) as avg_price,
(1.000 * SUM(amount_in)/SUM(amount_out)) < 1 as price_low -- very low prices
FROM A
where token_in='{"token2":0}' and token_out='{"vToken2":0}' and amount_out>0 and block_time > TIMESTAMP '2024-05-01'
GROUP BY 1
order by 1 DESC

```

The query is fairly typical for a parachain query on Dune. It parses events from the
`bifrost.events` table, and calculates the aggregate values for each hour.

The query uses Dune's native UINT256 type, which allows to deal with very large numbers and still
maintain precision.

Query result:

<iframe src="https://dune.com/embeds/3532234/5941878/" height="350" width="100%"></iframe>

:::info DuneSQL Reference

For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
and
[DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).

:::
