---
id: phala-dashboards
title: Phala Dashboards
sidebar_label: Phala
description:
  Phala provides a privacy-preserving computation and data
  protection framework. 
keywords: [polkadot, dashboard, dune, phala, privacy]
slug: ../phala-dashboards
---

# Phala Dashboards

## Overview

Phala is a parachain on Polkadot that provides a privacy-preserving computation and data protection
framework. It allows for the processing of sensitive data with guaranteed privacy.

## Featured Dashboards on Dune

Here you will find a variety of dashboards that help visualize data from the Phala parachain:

- [Phala Dashboard](https://dune.com/substrate/phala): A comprehensive view of activities within the
  Phala ecosystem.

Please also visit our dashboards for Phala on
[Dune Analytics](https://dune.com/discover/content/relevant?q=title:Phala%20author:substrate).

## Key Tables

Data from the Phala parachain is organized into several key tables:

- `phala.balances`
- `phala.blocks`
- `phala.calls`
- `phala.events`,
- `phala.extrinsics`
- `phala.transfers`

Additional curated dataset from Phala team can be found at `dune.phala_network.*`

## Useful Queries

Currently, no specific queries have been provided.

## Getting Started with Queries

To get started with querying data from Unique, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Phala Computation" showLineNumbers
SELECT
  chain,
  circulation,
  sygma_bridge,
  reward,
  COALESCE(total_issuance, total_supply) AS total_issuance,
  total_value,
  idle_worker_count,
  daily_rewards,
  average_apr,
  budget_per_share,
  delegator_count
FROM
  dune.phala_network.dataset_phala_computation;
```

Query result:

<iframe src="https://dune.com/embeds/3619434/6098180/" height="350" width="100%"></iframe>

Visualizations using the query result:

<iframe src="https://dune.com/embeds/3619434/6098184/" height="350" width="100%"></iframe>

:::info DuneSQL Referece

For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
and
[DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).

:::
