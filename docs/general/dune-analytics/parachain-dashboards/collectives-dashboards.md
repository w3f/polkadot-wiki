---
id: collectives-dashboards
title: Collectives Dashboards
sidebar_label: Collectives
description:
  Collectives is a self-governing body of experts and developers of Polkadot and Kusama networks
  protocols.

keywords: [polkadot, dashboard, dune, collectives, fellowship]
slug: ../collectives-dashboards
---

# Collectives Dashboards

## Overview

The Technical Fellowship is a self-governing body of experts and developers of Polkadot and Kusama
networks protocols. It operates on-chain through the Polkadot Collectives system chain and off-chain
through the Polkadot Fellows repository.

## Featured Dashboards on Dune

Here you will find a variety of dashboards that help visualize data from the Collectives parachain:

- [Collectives](https://dune.com/substrate/collectives): This dashboard provides an overview of the
  Collectives ecosystem. On this dashboard, you can see the entire landscape of activities within
  the Collectives network, such as the distribution of Salaries, Member Ranks, and voting activities
  on Referenda.

## Key Tables

Data from the manta parachain is organized into several key tables:

- `collectives.balances`
- `collectives.blocks`
- `collectives.calls`
- `collectives.events`,
- `collectives.extrinsics`
- `collectives.transfers`

## Getting Started with Queries

To get started with querying data from Collectives, you are welcome to use the mentioned
materialized queries. You can use the following DuneSQL queries as examples:

```sql title="Collectives Referenda Types" showLineNumbers
WITH types AS (
  SELECT
    block_time,
    JSON_EXTRACT_SCALAR(params, '$.proposal.lookup.hash') AS lookup,
    JSON_EXTRACT_SCALAR(params, '$.proposal_origin.fellowshipOrigins') AS fellowshipOrigins
  FROM
    collectives.extrinsics
  WHERE
    section = 'fellowshipReferenda'
    AND method = 'submit'
    AND JSON_EXTRACT_SCALAR(params, '$.proposal.lookup.hash') IS NOT NULL
)
SELECT
  JSON_EXTRACT_SCALAR(data, '$[0]') AS r_id,
  JSON_EXTRACT_SCALAR(data, '$[2].lookup.hash') AS lookup,
  COALESCE(types.fellowshipOrigins, 'Fellows') AS types
FROM
  collectives.events
LEFT JOIN types ON JSON_EXTRACT_SCALAR(data, '$[2].lookup.hash') = types.lookup
WHERE
  method = 'Submitted'
  AND JSON_EXTRACT_SCALAR(data, '$[2].lookup.hash') IS NOT NULL;
```

Query result:

<iframe src="https://dune.com/embeds/3789493/6371240/" height="350" width="100%"></iframe>

:::info DuneSQL Referece

For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
and
[DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).

:::
