---
id: polimec-dashboards
title: Polimec Dashboards
sidebar_label: Polimec
description:
  Polimec offers a decentralized, transparent, and compliant method for fundraising, ensuring that
  stakeholder incentives are aligned both during and after the fundraising process.
keywords: [polkadot, dashboard, dune, polimec, PLMC, funding, staking]
slug: ../polimec-dashboards
---

# Polimec Dashboards

## Overview

Polimec offers a decentralized, transparent, and compliant method for fundraising, ensuring that
stakeholder incentives are aligned both during and after the fundraising process.

## Featured Dashboards on Dune

Here you'll find a variety of dashboards that help visualize data from the Moonbeam parachain:

- [Polimec](https://dune.com/substrate/polimec): A comprehensive analysis of NeuroWeb, including:
  DKG, knowledge asset, asset, and XCM analysis.

## Key Tables

Data from the polimec parachain is organized into several key tables: `polimec.balances`,
`polimec.blocks`, `polimec.calls`, `polimec.events`, `polimec.extrinsics`, `polimec.transfers`.

## Useful Queries

Currently, there are no specific useful queries provided. Please check back later as this section
will be updated with materialized queries for Neuroweb.

## Getting Started with Queries

To get started with querying data from Unique, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Polimec Latest Reward Distribution" showLineNumbers
WITH
  latest_round AS (
    SELECT
      MAX(CAST(JSON_EXTRACT_SCALAR(data, '$[0]') AS BIGINT)) AS start_block
    FROM
      polimec.events
    WHERE
      section = 'parachainStaking'
      AND method = 'NewRound'
  ),
  summed as (
    SELECT
      MAX(block_time) as latest_time,
      JSON_EXTRACT_SCALAR(JSON_PARSE(data), '$[0]') AS delegator,
      SUM(
        CAST(JSON_EXTRACT_SCALAR(data, '$[1]') AS BIGINT) / POW(10, 10)
      ) AS reward
    FROM
      polimec.events
    WHERE
      section = 'parachainStaking'
      AND method = 'Rewarded'
      AND CAST(block_number AS BIGINT) >= (
        SELECT
          start_block
        FROM
          latest_round
      )
    GROUP BY
      JSON_EXTRACT_SCALAR(JSON_PARSE(data), '$[0]')
  )
SELECT
  latest_time,
  delegator,
  get_href (
    'https://explorer.polimec.org/polimec/account/' || delegator,
    CONCAT(
      SUBSTR(delegator, 1, 4),
      '...',
      SUBSTR(delegator, LENGTH(delegator) - 3)
    )
  ) as delegator_url,
  reward
FROM
  summed
ORDER BY
  reward DESC
```

Query result:

<iframe src="https://dune.com/embeds/3771979/6343454/" height="350" width="100%"></iframe>

:::info DuneSQL Referece

For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
and
[DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).

:::
