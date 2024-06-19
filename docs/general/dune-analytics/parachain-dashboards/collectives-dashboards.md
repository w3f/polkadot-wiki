---
id: collectives-dashboards
title: Collectives Dashboards
sidebar_label: Collectives
description:
  The Technical Fellowship is a self-governing body of experts and developers of Polkadot and Kusama
  networks protocols. It operates on-chain through the Polkadot Collectives system chain and
  off-chain through the Polkadot Fellows repository.

keywords: [polkadot, dashboard, dune, collectives, fellowship]
slug: ../collectives-dashboards
---

# Manta Dashboards

## Overview

The Technical Fellowship is a self-governing body of experts and developers of Polkadot and Kusama
networks protocols. It operates on-chain through the Polkadot Collectives system chain and off-chain
through the Polkadot Fellows repository.

## Featured Dashboards on Dune

Here you'll find a variety of dashboards that help visualize data from the Manta parachain:

- [Collectives](https://dune.com/substrate/collectives): This dashboard provides an overview of the
  Collectives ecosystem. On this dashboard, you can see the entire landscape of activities within
  the Collectives network, such as the distribution of Salaries, Member Ranks, and voting activities
  on Referenda.

## Key Tables

Data from the manta parachain is organized into several key tables: `collectives.balances`,
`collectives.blocks`, `collectives.calls`, `collectives.events`, `collectives.extrinsics`,
`collectives.transfers`

## Useful Queries

Currently, there are no specific queries provided. Please check back later for updates.

## Getting Started with Queries

To get started with querying data from Collectives, you are welcome to use the mentioned
materialized queries. You can use the following DuneSQL queries as examples:

```sql title="Collectives Referenda Types" showLineNumbers
with
  types as (
    select
      block_time,
      json_extract_scalar(params, '$.proposal.lookup.hash') as lookup,
      json_extract_scalar(params, '$.proposal_origin.fellowshipOrigins') as fellowshipOrigins
    from
      collectives.extrinsics
    where
      section = 'fellowshipReferenda'
      and method = 'submit'
      and json_extract_scalar(params, '$.proposal.lookup.hash') is not null
  )
  select
  json_extract_scalar(data,'$[0]') as r_id,
  json_extract_scalar(data,'$[2].lookup.hash') as lookup,
  COALESCE(types.fellowshipOrigins,'Fellows') as types
  from collectives.events
  LEFT JOIN types on json_extract_scalar(data,'$[2].lookup.hash')=types.lookup
  where method='Submitted' and json_extract_scalar(data,'$[2].lookup.hash')is not null
```

Query result:

<iframe src="https://dune.com/embeds/3789493/6371240/" height="350" width="100%"></iframe>

:::info DuneSQL Referece

For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
and
[DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).

:::
