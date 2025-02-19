---
id: centrifuge-dashboards
title: Centrifuge Dashboards
sidebar_label: Centrifuge
description: Centrifuge is a decentralized finance hub and liquid staking platform.
keywords: [polkadot, dashboard, dune, centrifuge, DeFi]
slug: ../centrifuge-dashboards
---

# Centrifuge Dashboards

## Overview

Centrifuge is a platform for real-world asset tokenization. Through Centrifuge, investors gain
access to a diverse range of assets, improving transparency and achieving better insight into their
portfolio. Asset managers tokenize their funds and streamline access to necessary service providers
and investors, saving cost for fund operations and unlocking new sources of capital.

Centrifuge provides both the infrastructure and ecosystem to tokenize, manage, and invest into a
complete, diversified portfolio of real-world assets.

Asset pools are fully collateralized, investors have legal recourse, and the protocol is asset-class
agnostic with pools for assets spanning structured credit, real estate, US treasuries, carbon
credits, consumer finance, and more.

Centrifuge's ecosystem extends beyond its onchain financial infrastructure, incorporating a DAO
(decentralized autonomous organization) supported by a diverse community of finance professionals
and developers.

By bringing the entire structured credit market onchain across securitization, tokenization,
privacy, governance, and liquidity integrations, Centrifuge is building a more transparent,
affordable, and limitless financial system.

Some assets are managed on Ethereum, others are managed on Centrifuge.

## Featured Dashboards on Dune

Here you'll find a variety of dashboards that help visualize data from the Centrifuge parachain on
Polkadot:

- [centrifuge on Polkadot](https://dune.com/substrate/centrifuge): This dashboard provides details
  for
- assets pools on Centrifuge parachain. (As of June 2024: only one)

## Key Tables

Data from the centrifuge parachain is organized into several key tables: `centrifuge.balances`,

- `centrifuge.balances`
- `centrifuge.blocks`
- `centrifuge.calls`
- `centrifuge.events`
- `centrifuge.extrinsics`
- `centrifuge.transfers`

The `centrifuge.traces` table is created by a snapshot script utilizing Centrifuge API calls to
fetch accurate values which would be difficult to calculate from the blockchain events alone.

Start building your own queries using granular data on Dune
[here](https://dune.com/queries?category=canonical&namespace=centrifuge).

## Useful Queries

Some useful queries for Centrifuge are provided:

| Subject Area                | Query                                             | Description                                                     |
| --------------------------- | ------------------------------------------------- | --------------------------------------------------------------- |
| Portfolio                   | [query_3708897](https://dune.com/queries/3708897) | Provides details about the assets in the pools                  |
| Centrifuge Pool Data Anemoy | [query_3708939](https://dune.com/queries/3708939) | Provides details for the Anemoy pool (first pool on Centrifuge) |

Dune users are encouraged to study the source code of the queries, including parts of a query that
may have been commented out for future use.

Uncommenting these parts may accelerate your effort of adopting a query to a slightly different use
case.

## Getting Started with Queries

To get started with querying data from Centrifuge, you are welcome to use the mentioned queries. You
can also use the following DuneSQL queries as examples:

```sql title="Centrifuge Loan Market Data" showLineNumbers
WITH portfolio AS (
  SELECT
    ts,
    CAST(JSON_VALUE(c.kv, 'strict $.asset_id.id') AS INT) AS asset_id,
    CAST(JSON_VALUE(c.kv, 'strict $.asset_id.pool') AS BIGINT) AS pool_id,
    FROM_UNIXTIME(CAST(JSON_VALUE(c.pv, 'strict $.maturity_date') AS BIGINT)) AS maturity_date,
    CAST(JSON_VALUE(c.pv, 'strict $.outstanding_interest') AS UINT256) AS outstanding_interest,
    CAST(JSON_VALUE(c.pv, 'strict $.outstanding_principal') AS UINT256) AS outstanding_principal,
    CAST(JSON_VALUE(c.pv, 'strict $.present_value') AS UINT256) AS present_value,
    CAST(JSON_VALUE(c.pv, 'strict $.total_borrowed') AS UINT256) AS total_borrowed,
    CAST(JSON_VALUE(c.pv, 'strict $.total_repaid_interest') AS UINT256) AS total_repaid_interest,
    CAST(JSON_VALUE(c.pv, 'strict $.total_repaid_principal') AS UINT256) AS total_repaid_principal,
    CAST(JSON_VALUE(c.pv, 'strict $.total_repaid_unscheduled') AS UINT256) AS total_repaid_unscheduled,
    CAST(JSON_VALUE(c.pv, 'strict $.pool_currency.symbol') AS VARCHAR) AS currency_symbol,
    CAST(JSON_VALUE(c.pv, 'strict $.pool_currency.decimals') AS INT) AS decimals,
    CAST(JSON_VALUE(c.pv, 'strict $.type') AS VARCHAR) AS type
  FROM
    centrifuge.traces c
  WHERE
    track = 'portfolio'
)
SELECT
  ts,
  asset_id,
  pool_id,
  maturity_date,
  outstanding_interest / POW(10, decimals) AS outstanding_interest,
  outstanding_principal / POW(10, decimals) AS outstanding_principal,
  present_value / POW(10, decimals) AS present_value,
  total_borrowed / POW(10, decimals) AS total_borrowed,
  total_repaid_interest / POW(10, decimals) AS total_repaid_interest,
  total_repaid_principal / POW(10, decimals) AS total_repaid_principal,
  total_repaid_unscheduled / POW(10, decimals) AS total_repaid_unscheduled,
  currency_symbol
FROM
  portfolio
WHERE
  type = 'Other'
ORDER BY
  maturity_date DESC;

```

The query is fairly typical for a parachain query on Dune. It parses details from the
`centrifuge.traces` table, and displays relevant values with suitable labels.

The query uses Dune's native UINT256 type, which allows to deal with very large numbers and still
maintain precision.

Query result:

<iframe src="https://dune.com/embeds/3734046/6280352/" height="350" width="100%"></iframe>

!!!info "DuneSQL Reference"
    For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
    and
    [DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).


