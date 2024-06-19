---
id: energywebx-dashboards
title: EnergyWebX Dashboards
sidebar_label: EnergyWebX
description:
  EnergyWebX is a parachain focused on integrating blockchain technology within the energy sector,
  aiming to enhance energy efficiency and promote renewable energy sources across the Polkadot
  ecosystem.
keywords: [polkadot, dashboard, dune, energywebx, energy]
slug: ../energywebx-dashboards
---

# EnergyWebX Dashboards

## Overview

EnergyWebX is a parachain focused on integrating blockchain technology within the energy sector,
aiming to enhance energy efficiency and promote renewable energy sources across the Polkadot
ecosystem.

## Featured Dashboards on Dune

Here you'll find a variety of dashboards that help visualize data from the EnergyWebX parachain:

- [EnergyWebX](https://dune.com/substrate/energywebx): This dashboard provides a comprehensive view
  of the blockchain activities and energy transactions within the EnergyWebX network.

## Key Tables

Data from the EnergyWebX parachain is organized into several key tables: `energywebx.balances`,
`energywebx.blocks`, `energywebx.calls`, `energywebx.events`, `energywebx.extrinsics`,
`energywebx.transfers`

## Useful Queries

Currently, there are no specific queries provided. Please check back later for updates.

## Getting Started with Queries

To get started with querying data from Snowbridge, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Polkadot BridgeHub Outbound Msg Sent To Ethereum" showLineNumbers
with
  lift as (
    select
      date_trunc('day', block_time) as day,
      sum(
        cast(json_extract_scalar(data, '$[1]') as double) / power(10, 18)
      ) as amount,
      'AVTLifted' as method
    from
      energywebx.events
    where
      method = 'AVTLifted'
    group by
      date_trunc('day', block_time)
  ),
  lower as (
    select
      date_trunc('day', block_time) as day,
      sum(
        cast(json_extract_scalar(data, '$[2]') as double) / power(10, 18)
      ) as amount,
      'AVTLowered' as method
    from
      energywebx.events
    where
      method = 'AvtLowered'
    group by
      date_trunc('day', block_time)
  )
select
  *
from
  lift
union all
select
  *
from
  lower
```

Query result:

<iframe src="https://dune.com/embeds/3811524/6410270/65829801-abf1-4f2a-a9a3-e6afdf444bff" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3811524/6410355/b0ebb3df-de06-43b8-a3e2-3255ca4b29b6" height="350" width="100%"></iframe>

:::info DuneSQL Referece

For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
and
[DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).

:::
