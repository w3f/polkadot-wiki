---
id: invarch-dashboards
title: InvArch Dashboards
sidebar_label: InvArch
description:
  InvArch Network is a Multichain Account abstraction hub, optimized for decentralized operations &
  financial management spanning across every blockchain.

keywords: [polkadot, dashboard, dune, InvArch, DAO]
slug: ../invarch-dashboards
---

# Invarch Dashboards

## Overview

The InvArch Network is a Multichain Account abstraction hub, optimized for decentralized operations
& financial management spanning across every blockchain.

InvArch provides individuals, organizations & DAOs with a single account that can be used to manage
all of their assets & execute transactions across any network.

## Featured Dashboards on Dune

Here you will find a variety of dashboards that help visualize data from the Acala parachain:

- [InvArch](https://dune.com/substrate/invarch): This dashboard provides a comprehensive view of
  InvArch chain-state and information about DAO Staking.

## Key Tables

Data from the InvArch parachain is organized into several key tables:

- `invarch.balances`
- `invarch.blocks`
- `invarch.calls`
- `invarch.events`
- `invarch.extrinsics`
- `invarch.transfers`

Start building your own queries using granular data on Dune
[here](https://dune.com/queries?category=canonical&namespace=invarch).

## Useful Queries

Some useful queries for InvArch are provided:

| Title                                   | Query                                             | Description                                                                                                                                                                           |
| --------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| InvArch DAO Staking All events          | [query_3753984](https://dune.com/queries/3753984) | This query provides a comprehensive overview of all events related to DAO staking on the InvArch network, including details about the staking amount, staker address, and event type. |
| InvArch DAO staking info by DAO and Era | [query_3755288](https://dune.com/queries/3755288) | Access detailed information on DAO staking activities within the InvArch network, categorized by DAO and era for historical comparison.                                               |

## Getting Started with Queries

To get started with querying data from Unique, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="InvArch Cumulative Activated Acounts by Day" showLineNumbers
WITH accounts_first_active AS (
  SELECT
    address_ss58,
    MIN(date_trunc('day', ts)) AS first_active_date
  FROM
    invarch.balances
  WHERE
    (free + reserved + misc_frozen + frozen) > 0
  GROUP BY
    address_ss58
)
SELECT
  first_active_date AS date,
  SUM(COUNT(DISTINCT address_ss58)) OVER (
    ORDER BY
      DATE(first_active_date)
  ) AS cumulative_accounts
FROM
  accounts_first_active
GROUP BY
  first_active_date
ORDER BY
  first_active_date DESC;
```

Query result:

<iframe src="https://dune.com/embeds/3761192/6325894/041db958-0328-4ae8-be2f-76dad336a249" height="350" width="100%"></iframe>

!!!info "DuneSQL Reference"
    For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
    and
    [DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).


