---
id: litentry-dashboards
title: Litentry Dashboards
sidebar_label: Litentry
description:
  Litentry is a decentralized identity aggregator that links user identities while ensuring privacy
  protection.
keywords: [polkadot, dashboard, dune, litentry, identity, LIT]
slug: ../litentry-dashboards
---

# Litentry Dashboards

## Overview

Litentry is a decentralized identity aggregator that links user identities while ensuring privacy
protection, thus enabling various social and economic innovations. It features a three-layer
structure, comprising source data, address analysis, and identity aggregation layers, all secured
with Trusted Execution Environment (TEE) technology to enhance security and privacy. Litentry's
applications include airdrop whitelisting, credit scoring, and cross-platform reputation building.

## Featured Dashboards on Dune

Here you will find a variety of dashboards that help visualize data from the Litentry parachain:

- [Litentry](https://dune.com/substrate/litentry): A comprehensive analysis of Litentry, including:
  Token Sent To Ethereum, Staking, Asset Analysis.

## Key Tables

Data from the Litentry parachain is organized into several key tables:

- `litentry.balances`
- `litentry.blocks`
- `litentry.calls`
- `litentry.events`
- `litentry.extrinsics`
- `litentry.transfers`

Start building your own queries using granular data on Dune
[here](https://dune.com/queries?category=canonical&namespace=litentry).

## Useful Queries

Some useful queries for Litentry are provided:

| Title                               | Query                                             | Description                                      |
| ----------------------------------- | ------------------------------------------------- | ------------------------------------------------ |
| Litentry Latest Collator Info       | [query_3827164](https://dune.com/queries/3827164) | Find the latest collator information on Litentry |
| Litentry LIT Token Sent To Ethereum | [query_3825036](https://dune.com/queries/3825036) | Find all records of LIT tokens sent to Ethereum  |

## Getting Started with Queries

To get started with querying data from Unique, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Litentry LIT Token Sent To Ethereum" showLineNumbers
SELECT DISTINCT
  block_time,
  extrinsic_id,
  get_href(
    'https://litentry.statescan.io/#/extrinsics/' || extrinsic_id,
    extrinsic_id
  ) AS extrinsic_id_url,
  JSON_VALUE(data, 'strict $[0]') AS dest_id,
  JSON_VALUE(data, 'strict $[1]') AS nonce,
  JSON_VALUE(data, 'strict $[2]') AS source_id,
  IF(
    JSON_VALUE(data, 'strict $[3]') LIKE '0x%',
    bytearray_to_int256(JSON_VALUE(data, 'strict $[3]')) / POW(10, 12),
    CAST(JSON_VALUE(data, 'strict $[3]') AS int256) / POW(10, 12)
  ) AS amount,
  JSON_VALUE(data, 'strict $[4]') AS recipient,
  get_href(
    'https://etherscan.io/address/' || JSON_VALUE(data, 'strict $[4]'),
    CONCAT(
      SUBSTR(JSON_VALUE(data, 'strict $[4]'), 1, 4),
      '...',
      SUBSTR(
        JSON_VALUE(data, 'strict $[4]'),
        LENGTH(JSON_VALUE(data, 'strict $[4]')) - 3
      )
    )
  ) AS recipient_url
FROM
  litentry.events
WHERE
  section = 'chainBridge'
  AND method = 'FungibleTransfer'
ORDER BY
  block_time DESC;
```

Query result:

<iframe src="https://dune.com/embeds/3825036/6433535" height="350" width="100%"></iframe>

!!!info "DuneSQL Reference"
    For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
    and
    [DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).


