---
id: invarch-dashboards
title: InvArch Dashboards
sidebar_label: InvArch
description:
  The InvArch Network is a Multichain Account abstraction hub, optimized for decentralized
  operations & financial management spanning across every blockchain.

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

Here you'll find a variety of dashboards that help visualize data from the Acala parachain:

- [InvArch](https://dune.com/substrate/invarch): This dashboard provides a comprehensive view of
  InvArch chain-state and information about DAO Staking.

## Key Tables

Data from the InvArch parachain is organized into several key tables:

- `invarch.balances`
- `invarch.blocks`
- `invarch.calls`
- `invarch.events`,
- `invarch.extrinsics`
- `invarch.transfers`

## Useful Queries

Currently, there are no specific queries provided. Please check back later for updates.

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

:::info DuneSQL Referece

For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
and
[DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).

:::
