---
id: nodle-dashboards
title: Nodle Dashboards
sidebar_label: Nodle
description:
  Nodle is a parachain on Polkadot focused on providing connectivity and data liquidity for the
  Internet of Things (IoT). It enables devices to securely connect, interact, and transact with
  efficiency.
keywords: [polkadot, dashboard, dune, nodle, IoT]
slug: ../nodle-dashboards
---

# Nodle Dashboards

## Overview

Nodle is a parachain on Polkadot focused on providing connectivity and data liquidity for the
Internet of Things (IoT). It enables devices to securely connect, interact, and transact with
efficiency.

## Featured Dashboards on Dune

Here you'll find a variety of dashboards that help visualize data from the Nodle parachain:

- [Nodle Dashboard](https://dune.com/substrate/nodle): A comprehensive view of IoT connectivity and
  transactions within the Nodle ecosystem.

Please also visit our dashboards for Nodle on
[Dune Analytics](https://dune.com/discover/content/relevant?q=title:Nodle%20author:substrate).

## Key Tables

Data from the Nodle parachain is organized into several key tables:

- `nodle.balances`
- `nodle.blocks`
- `nodle.calls`
- `nodle.events`,
- `nodle.extrinsics`
- `nodle.transfers`

## Useful Queries

Currently, no specific queries have been provided. Please check back later for updates.

## Getting Started with Queries

To get started with querying data from Unique, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Nodle Mint Uniques" showLineNumbers
SELECT DISTINCT
  block_time,
  JSON_EXTRACT_SCALAR(call_args, '$.owner.id') AS owner,
  JSON_EXTRACT(call_args, '$.collection') AS collection,
  JSON_EXTRACT(call_args, '$.item') AS item
FROM
  nodle.calls
WHERE
  (call_section = 'nodleUniques' OR call_section = 'uniques')
  AND call_method = 'mint'
  AND extrinsic_id NOT IN (
    SELECT
      extrinsic_id
    FROM
      nodle.events
    WHERE
      method = 'ExtrinsicFailed'
  );
```

Query result:

<iframe src="https://dune.com/embeds/3753531/6312831/" height="350" width="100%"></iframe>

:::info DuneSQL Referece

For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
and
[DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).

:::
