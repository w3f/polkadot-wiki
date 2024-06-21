---
id: astar-dashboards
title: Astar Dashboards
sidebar_label: Astar
description:
  Astar Network, previously known as Plasm, is a decentralized blockchain platform designed for
  Web3.

keywords: [polkadot, dashboard, dune, astar, dApp]
slug: ../astar-dashboards
---

# Astar Dashboards

## Overview

Astar Network, previously known as Plasm, is a blockchain platform designed for Web3.
It is compatible with both EVM (Ethereum Virtual Machine) and WebAssembly, enabling seamless
interaction between the two environments. Developers can participate in the Build2Earn program to
earn rewards by creating decentralized applications.

## Featured Dashboards on Dune

Here you will find a variety of dashboards that help visualize data from the Astar parachain:

- [Astar dApp Staking Overview](https://dune.com/substrate/astar-dapp-staking): This dashboard is
  designed to provide a quick overview of various aspects of Astar dApp Staking.

## Key Tables

Data from the Astar parachain is organized into several key tables:

- `astar.balances`
- `astar.blocks`
- `astar.calls`
- `astar.events`,
- `astar.extrinsics`
- `astar.transfers`

## Getting Started with Queries

To get started with querying data from Astar, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Astar EVM Executed" showLineNumbers
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

<iframe src="https://dune.com/embeds/3476827/6371367/" height="350" width="100%"></iframe>

:::info DuneSQL Referece

For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
and
[DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).

:::
