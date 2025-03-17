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

Astar Network, previously known as Plasm, is a blockchain platform designed for Web3. It is
compatible with both EVM (Ethereum Virtual Machine) and WebAssembly, enabling seamless interaction
between the two environments. Developers can participate in the Build2Earn program to earn rewards
by creating decentralized applications.

## Featured Dashboards on Dune

Here you will find a variety of dashboards that help visualize data from the Astar parachain:

- [Astar dApp Staking Overview](https://dune.com/substrate/astar-dapp-staking): This dashboard is
  designed to provide a quick overview of various aspects of Astar dApp Staking.

## Key Tables

Data from the Astar parachain is organized into several key tables:

- `astar.balances`
- `astar.blocks`
- `astar.calls`
- `astar.events`
- `astar.extrinsics`
- `astar.transfers`
- `astar.traces`

Start building your own queries using granular data on Dune
[here](https://dune.com/queries?category=canonical&namespace=astar).

## Useful Queries

Some useful queries for Astar are provided:

| Title                    | Query                                             | Description                                                                                                                                                                                                                                                                                              |
| ------------------------ | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Astar dApp Info by Era   | [query_3727264](https://dune.com/queries/3727264) | This query provides comprehensive information on decentralized applications (dApps) within the Astar ecosystem, including details about the dApp name, staking statistics, tier levels, and developer profiles, facilitating deeper insights into dApp performance and engagement across different eras. |
| Astar Reward Info by Era | [query_3727888](https://dune.com/queries/3727888) | Explore comprehensive data on rewards distribution within the Astar network, broken down by era to identify trends and patterns.                                                                                                                                                                         |
| Astar Staker info by Era | [query_3728048](https://dune.com/queries/3728048) | Access a detailed breakdown of staker activities and statistics on the Astar network, categorized by era for historical comparison.                                                                                                                                                                      |

## Getting Started with Queries

To get started with querying data from Astar, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Astar EVM Executed" showLineNumbers
SELECT
    block_number, extrinsic_id, event_id, extrinsic_hash, section, method,
    json_extract_scalar(data, '$[0]') as tx_from,
    json_extract_scalar(data, '$[1]') as tx_to,
    json_extract_scalar(data, '$[2]') as tx_hash,
    json_extract(data, '$[3]') as tx_success
FROM
    astar.events
WHERE
    block_time >= TIMESTAMP '2024-02-13 00:00:00' and (section = 'ethereum' and method = 'Executed')
limit 10000;
```

Query result:

<iframe src="https://dune.com/embeds/3476827/6371367/" height="350" width="100%"></iframe>

!!!info "DuneSQL Reference"
    For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
    and
    [DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).


