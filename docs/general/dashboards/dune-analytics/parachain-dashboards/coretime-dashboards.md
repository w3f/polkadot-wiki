---
id: coretime-dashboards
title: Coretime Dashboards
sidebar_label: Coretime
description:
  Coretime is a parachain on Polkadot that focuses on time-stamping and data certification.
keywords: [polkadot, dashboard, dune, coretime, data certification]
slug: ../coretime-dashboards
---

# Coretime Dashboards

## Overview

Coretime is a parachain on Polkadot that focuses on time-stamping and data certification, providing
a decentralized and secure mechanism for verifying data integrity.

## Featured Dashboards on Dune

Here you will find a variety of dashboards that help visualize data from the Coretime parachain:

- [Coretime Dashboard](https://dune.com/substrate/coretime): Explore comprehensive data
  visualizations related to time-stamping services on Coretime.
- [Kusama Coretime Sales History](https://dune.com/substrate/kusama-coretime-sales-history):
  Detailed historical data and trends of sales activities on the Kusama network.

Please also visit our dashboards for Coretime on
[Dune Analytics](https://dune.com/discover/content/relevant?q=title:Coretime%20author:substrate).

## Key Tables

Data from the Coretime parachain is organized into several key tables:

- `coretime.balances`
- `coretime.blocks`
- `coretime.calls`
- `coretime.events`
- `coretime.extrinsics`
- `coretime.transfers`

Start building your own queries using granular data on Dune
[here](https://dune.com/queries?category=canonical&namespace=coretime).

## Useful Queries

Some useful queries for Coretime are provided:

| Title                           | Query                                             | Description                                                                                                                                                                                            |
| ------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Kusama Coretime Core Statistics | [query_3765036](https://dune.com/queries/3765036) | This query provides detailed statistics on Coretime sales activities on the Kusama network, including sale start time, lead-in length, start and regular prices, region details, cores sold, and more. |

## Getting Started with Queries

To get started with querying data from Unique, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Kusama Coretime Core Statistics" showLineNumbers
WITH
  core_sta as (
    SELECT
      block_time,
      get_href (
        'https://nodle.subscan.io/extrinsic/' || cast(extrinsic_id as VARCHAR),
        extrinsic_id
      ) as extrinsics_url,
      extrinsic_id,
      CAST(JSON_EXTRACT_SCALAR(data, '$[0]') AS BIGINT) as sale_start,
      CAST(JSON_EXTRACT_SCALAR(data, '$[1]') AS BIGINT) as leadin_length,
      CAST(JSON_EXTRACT_SCALAR(data, '$[2]') AS BIGINT) / pow(10, 12) as start_price,
      CAST(JSON_EXTRACT_SCALAR(data, '$[3]') AS BIGINT) / pow(10, 12) as regular_price,
      CAST(JSON_EXTRACT_SCALAR(data, '$[4]') AS BIGINT) as region_begin,
      CAST(JSON_EXTRACT_SCALAR(data, '$[5]') AS BIGINT) as region_end,
      CAST(JSON_EXTRACT_SCALAR(data, '$[6]') AS BIGINT) as ideal_cores_sold,
      CAST(JSON_EXTRACT_SCALAR(data, '$[7]') AS BIGINT) as cores_offered,
      CAST(
        ROW_NUMBER() OVER (
          ORDER BY
            block_time ASC
        ) AS BIGINT
      ) AS sale_round
    FROM
      coretime_kusama.events
    WHERE
      section = 'broker'
      AND method = 'SaleInitialized'
  )
SELECT
  *,
  get_href (
    'https://dune.com/substrate/kusama-coretime-sales-history?sale_round=' || cast(sale_round as VARCHAR),
    cast(sale_round as VARCHAR)
  ) as sale_round_url
FROM
  core_sta
ORDER BY
  block_time DESC
```

Query result:

<iframe src="https://dune.com/embeds/3765036/6332449/" width="100%" height="500px" frameBorder="0"></iframe>

!!!info "DuneSQL Reference"
    For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
    and
    [DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).


