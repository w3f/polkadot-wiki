---
id: litentry-dashboards
title: Litentry Dashboards
sidebar_label: Litentry
description:
  Litentry is a decentralized identity aggregator that links user identities while ensuring privacy
  protection, thus enabling various social and economic innovations. It features a three-layer
  structure, comprising source data, address analysis, and identity aggregation layers, all secured
  with Trusted Execution Environment (TEE) technology to enhance security and privacy. Litentry's
  applications include airdrop whitelisting, credit scoring, and cross-platform reputation building.
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

Here you'll find a variety of dashboards that help visualize data from the Litentry parachain:

- [Litentry](https://dune.com/substrate/litentry): A comprehensive analysis of Litentry, including:
  Token Sent To Ethereum, Staking, Asset Analysis.

## Key Tables

Data from the Litentry parachain is organized into several key tables: `litentry.balances`,
`litentry.blocks`, `litentry.calls`, `litentry.events`, `litentry.extrinsics`, `litentry.transfers`.

## Useful Queries

Currently, there are no specific useful queries provided. Please check back later as this section
will be updated with materialized queries for Litentry.

## Getting Started with Queries

To get started with querying data from Unique, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Litentry LIT Token Sent To Ethereum" showLineNumbers
SELECT DISTINCT
  block_time,
  extrinsic_id,
  get_href (
    'https://litentry.statescan.io/#/extrinsics/' || extrinsic_id,
    extrinsic_id
  ) as extrinsic_id_url,
  JSON_VALUE(data, 'strict $[0]') as dest_id,
  JSON_VALUE(data, 'strict $[1]') as nonce,
  JSON_VALUE(data, 'strict $[2]') as source_id,
  IF(
    JSON_VALUE(data, 'strict $[3]') like '0x%',
    bytearray_to_int256 (JSON_VALUE(data, 'strict $[3]')) / pow(10, 12),
    CAST(JSON_VALUE(data, 'strict $[3]') AS int256) / pow(10, 12)
  ) as amount,
  JSON_VALUE(data, 'strict $[4]') as recipient,
  get_href (
    'https://etherscan.io/address/' || JSON_VALUE(data, 'strict $[4]'),
    CONCAT(
      SUBSTR(JSON_VALUE(data, 'strict $[4]'), 1, 4),
      '...',
      SUBSTR(
        JSON_VALUE(data, 'strict $[4]'),
        LENGTH(JSON_VALUE(data, 'strict $[4]')) - 3
      )
    )
  ) as recipient_url
FROM
  litentry.events
WHERE
  section = 'chainBridge'
  and method = 'FungibleTransfer'
ORDER BY
  block_time DESC
```

Query result:

<iframe src="https://dune.com/embeds/3825036/6433535" height="350" width="100%"></iframe>

:::info DuneSQL Reference

For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
and
[DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).

:::
