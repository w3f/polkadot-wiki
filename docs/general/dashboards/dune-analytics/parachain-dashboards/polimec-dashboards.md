---
id: polimec-dashboards
title: Polimec Dashboards
sidebar_label: Polimec
description: Polimec offers a decentralized, transparent, and compliant method for fundraising.
keywords: [polkadot, dashboard, dune, polimec, PLMC, funding, staking]
slug: ../polimec-dashboards
---

# Polimec Dashboards

## Overview

Polimec offers a decentralized, transparent, and compliant method for fundraising, ensuring that
stakeholder incentives are aligned both during and after the fundraising process.

## Featured Dashboards on Dune

Here you will find a variety of dashboards that help visualize data from the Polimec parachain:

- [Polimec](https://dune.com/substrate/polimec): A comprehensive analysis of Polimec, including:
  Staking, Funding, Asset Analysis.

## Key Tables

Data from the polimec parachain is organized into several key tables:

- `polimec.balances`
- `polimec.blocks`
- `polimec.calls`
- `polimec.events`
- `polimec.extrinsics`
- `polimec.transfers`

Start building your own queries using granular data on Dune
[here](https://dune.com/queries?category=canonical&namespace=polimec).

## Useful Queries

Some useful queries for Polimec are provided:

| Title                              | Query                                             | Description                                                           |
| ---------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------- |
| Polimec Latest Collator Info       | [query_3776548](https://dune.com/queries/3776548) | Find the latest collator information on Polimec                       |
| Plimec All Evaluations             | [query_3802921](https://dune.com/queries/3802921) | Get all evaluation information for all projects on Polimec            |
| Polimec All Funding Participations | [query_3850228](https://dune.com/queries/3850228) | Get all funding participation information for all projects on Polimec |

## Getting Started with Queries

To get started with querying data from Unique, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Polimec Latest Reward Distribution" showLineNumbers
WITH latest_round AS (
  SELECT
    MAX(CAST(JSON_EXTRACT_SCALAR(data, '$[0]') AS BIGINT)) AS start_block
  FROM
    polimec.events
  WHERE
    section = 'parachainStaking'
    AND method = 'NewRound'
),
summed AS (
  SELECT
    MAX(block_time) AS latest_time,
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
  get_href(
    'https://explorer.polimec.org/polimec/account/' || delegator,
    CONCAT(
      SUBSTR(delegator, 1, 4),
      '...',
      SUBSTR(delegator, LENGTH(delegator) - 3)
    )
  ) AS delegator_url,
  reward
FROM
  summed
ORDER BY
  reward DESC;
```

Query result:

<iframe src="https://dune.com/embeds/3771979/6343454/" height="350" width="100%"></iframe>

!!!info "DuneSQL Reference"
    For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
    and [DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).


