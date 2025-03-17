---
id: manta-dashboards
title: Manta Dashboards
sidebar_label: Manta
description:
  Manta Atlantic is a fast and decentralized ZK Layer 1 supporting modular on-chain compliance
  identities.
keywords: [polkadot, dashboard, dune, manta]
slug: ../manta-dashboards
---

# Manta Dashboards

## Overview

Manta Atlantic is a fast and decentralized ZK Layer 1 supporting modular on-chain compliance
identities. Its suite of core products and technologies, including zkNFTs, staking, and ecosystem
projects, offers user-friendly access to powerful ZK-enabled use cases.

## Featured Dashboards on Dune

Here you will find a variety of dashboards that help visualize data from the Manta parachain:

- [Manta Parachain Staking Dashboard](https://dune.com/substrate/manta): This dashboard provides
  various information on Manta Parachain Staking.

## Key Tables

Data from the manta parachain is organized into several key tables:

- `manta.balances`
- `manta.blocks`
- `manta.calls`
- `manta.events`
- `manta.extrinsics`
- `manta.transfers`

Start building your own queries using granular data on Dune
[here](https://dune.com/queries?category=canonical&namespace=manta).

## Useful Queries

[Manta Delegator All events](https://dune.com/queries/3722522)

Some useful queries for Manta are provided:

| Title                      | Query                                             | Description                                                                                                                                                             |
| -------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Manta Delegator All events | [query_3722522](https://dune.com/queries/3722522) | This query provides a comprehensive overview of all events related to Delegator activities on the Manta network, including collator, delegator, amount, and event type. |

## Getting Started with Queries

To get started with querying data from Unique, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Manta to Moonbeam XTokens Transfer" showLineNumbers
SELECT
  DATE_TRUNC('day', block_time) AS day,
  SUM(
    CAST(json_extract_scalar(params, '$.amount') AS DOUBLE) / POWER(10, 18)
  ) AS amount,
  'Manta to Moonbeam' AS section
FROM
  manta.extrinsics
WHERE
  section = 'xTokens'
  AND method = 'transfer'
  AND json_extract_scalar(params, '$.dest.v3.interior.x2[0].parachain') = '2004'
GROUP BY
  DATE_TRUNC('day', block_time)
ORDER BY
  day DESC;
```

Query result:

<iframe src="https://dune.com/embeds/3747203/6371404/ea0be060-b61c-4379-8227-f7fc5e04c980" height="350" width="100%"></iframe>

!!!info "DuneSQL Reference"
    For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
    and
    [DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).


