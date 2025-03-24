---
id: energywebx-dashboards
title: EnergyWebX Dashboards
sidebar_label: EnergyWebX
description:
  EnergyWebX is a parachain focused on integrating blockchain technology within the energy sector.
keywords: [polkadot, dashboard, dune, energywebx, energy]
slug: ../energywebx-dashboards
---

# EnergyWebX Dashboards

## Overview

EnergyWebX is a parachain focused on integrating blockchain technology within the energy sector,
aiming to enhance energy efficiency and promote renewable energy sources across the Polkadot
ecosystem.

## Featured Dashboards on Dune

Here you will find a variety of dashboards that help visualize data from the EnergyWebX parachain:

- [EnergyWebX](https://dune.com/substrate/energywebx): This dashboard provides a comprehensive view
  of the blockchain activities and energy transactions within the EnergyWebX network.

## Key Tables

Data from the EnergyWebX parachain is organized into several key tables:

- `energywebx.balances`
- `energywebx.blocks`
- `energywebx.calls`
- `energywebx.events`
- `energywebx.extrinsics`
- `energywebx.transfers`

Start building your own queries using granular data on Dune
[here](https://dune.com/queries?category=canonical&namespace=energywebx).

## Useful Queries

Some useful queries for EnergyWebX are provided:

| Title                           | Query                                             | Description                                                                    |
| ------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------ |
| EnergyWebX Solutions and Groups | [query_3810095](https://dune.com/queries/3810095) | Provides a list of solutions and groups created within the EnergyWebX network. |
| EnergyWebX Operators and Worker | [query_3813780](https://dune.com/queries/3813780) | Displays a list of operators and workers connected to the EnergyWebX network.  |

## Getting Started with Queries

To get started with querying data from Snowbridge, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="EnergyWebX Token Lifted & Lowered" showLineNumbers
WITH
  lift AS (
    SELECT
      date_trunc('day', block_time) AS day,
      SUM(
        CAST(json_extract_scalar(data, '$[1]') AS double) / POWER(10, 18)
      ) AS amount,
      'AVTLifted' AS method
    FROM
      energywebx.events
    WHERE
      method = 'AVTLifted'
    GROUP BY
      date_trunc('day', block_time)
  ),
  lower AS (
    SELECT
      date_trunc('day', block_time) AS day,
      SUM(
        CAST(json_extract_scalar(data, '$[2]') AS double) / POWER(10, 18)
      ) AS amount,
      'AVTLowered' AS method
    FROM
      energywebx.events
    WHERE
      method = 'AvtLowered'
    GROUP BY
      date_trunc('day', block_time)
  )
SELECT
  *
FROM
  lift
UNION ALL
SELECT
  *
FROM
  lower;

```

Query result:

<iframe src="https://dune.com/embeds/3811524/6410270/65829801-abf1-4f2a-a9a3-e6afdf444bff" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3811524/6410355/b0ebb3df-de06-43b8-a3e2-3255ca4b29b6" height="350" width="100%"></iframe>

!!!info "DuneSQL Reference"
    For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
    and
    [DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).


