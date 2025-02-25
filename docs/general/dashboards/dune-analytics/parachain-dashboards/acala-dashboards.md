---
id: acala-dashboards
title: Acala Dashboards
sidebar_label: Acala
description: Acala is a decentralized finance hub and stablecoin platform powering cross-blockchain
keywords: [polkadot, dashboard, dune, acala, DeFi]
slug: ../acala-dashboards
---

# Acala Dashboards

## Overview

Acala is a decentralized finance hub and stablecoin platform powering cross-blockchain liquidity and
applications. It serves as a critical infrastructure layer for the Polkadot ecosystem.

## Featured Dashboards on Dune

Here you will find a variety of dashboards that help visualize data from the Acala parachain:

- [Acala on Polkadot](https://dune.com/substrate/acala): This dashboard provides a comprehensive
  view of financial activities and token dynamics within the Acala network.

## Key Tables

Data from the Acala parachain is organized into several key tables:

- `acala.balances`
- `acala.blocks`
- `acala.calls`
- `acala.events`
- `acala.extrinsics`
- `acala.transfers`

Start building your own queries using granular data on Dune
[here](https://dune.com/queries?category=canonical&namespace=acala).

## Useful Queries

Some useful queries for Acala are provided:

| Title                                            | Query                                             | Description                                                                               |
| ------------------------------------------------ | ------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Acala Asset Exchange Rate by Date                | [query_3672976](https://dune.com/queries/3672976) | Retrieves historical exchange rates for Acala assets, date-wise breakdown                 |
| Acala Assets Most Frequently Subject to Swapping | [query_3673478](https://dune.com/queries/3673478) | This query identifies which Acala assets are swapped the most frequently on the platform. |

These descriptions aim to provide more context and details about what each query does and the
insights they offer.

## Getting Started with Queries

To get started with querying data from Unique, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Acala List of Assets" showLineNumbers
WITH
    decimals_for_each_symbol AS (
            SELECT
                symbol,
                MAX(decimals) AS decimals
            FROM
                acala.transfers
            WHERE
                symbol IS NOT NULL
            GROUP BY
                symbol
        )
SELECT
    b.asset,
    b.symbol,
    d.decimals
FROM
    acala.balances b
LEFT JOIN decimals_for_each_symbol d ON b.symbol = d.symbol
GROUP BY
    b.asset,
    b.symbol,
    d.decimals
ORDER BY
    SUM(b.free + b.reserved + b.misc_frozen + b.frozen) DESC
```

Query result:

<iframe src="https://dune.com/embeds/3670410/6172755/" height="350" width="100%"></iframe>

!!!info "DuneSQL Reference"
    For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md) and [DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).


