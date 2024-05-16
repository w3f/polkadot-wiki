---
id: moonbeam-dashboards
title: Moonbeam Dashboards
sidebar_label: Moonbeam Dashboards
description:
  Moonbeam is a fully Ethereum-compatible parachain on the Polkadot network, enabling developers to
  deploy existing Solidity smart contracts and DApp frontends with minimal changes. It is designed
  to provide interoperability and compatibility, bridging the gap between Ethereum and Polkadot.
keywords: [polkadot, dashboard, dune, moonbeam, Ethereum]
slug: ../moonbeam-dashboards
---

# Moonbeam Dashboards

## Overview

Moonbeam is a fully Ethereum-compatible parachain on the Polkadot network, enabling developers to
deploy existing Solidity smart contracts and DApp frontends with minimal changes. It is designed to
provide interoperability and compatibility, bridging the gap between Ethereum and Polkadot.

## Featured Dashboards on Dune

Here you'll find a variety of dashboards that help visualize data from the Moonbeam parachain:

- [Moonbeam DEX](https://dune.com/substrate/moonbeam-dex): Explore decentralized exchange activities
  and token swaps within the Moonbeam ecosystem.
- [Moonbeam Governance](https://dune.com/substrate/moonbeam-governance): Detailed insights into
  governance proposals, voting, and outcomes within the Moonbeam community.

## Key Tables

Data from the Moonbeam parachain is organized into several key tables: `moonbeam.balances`,
`moonbeam.blocks`, `moonbeam.calls`, `moonbeam.events`, `moonbeam.extrinsics`, `moonbeam.transfers`

## Useful Queries

Currently, there are no specific useful queries provided. Please check back later as this section
will be updated with materialized queries for Moonbeam.

## Getting Started with Queries

To get started with querying data from Unique, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Moonbeam Referenda Result" showLineNumbers
SELECT DISTINCT
  CAST(JSON_EXTRACT_SCALAR(data, '$[0]') as INTEGER) as referenda_id,
  get_href (
    'https://moonbeam.subscan.io/referenda_v2/' || cast(JSON_EXTRACT_SCALAR(data, '$[0]') as VARCHAR),
    cast(JSON_EXTRACT_SCALAR(data, '$[0]') as VARCHAR)
  ) as referenda_id_url,
  varbinary_to_uint256 (
    from_hex(SUBSTR(JSON_EXTRACT_SCALAR(data, '$[1].ayes'), 3))
  ) / pow(10, 18) as aye_total,
  varbinary_to_uint256 (
    from_hex(SUBSTR(JSON_EXTRACT_SCALAR(data, '$[1].nays'), 3))
  ) / pow(10, 18) as nay_total,
  varbinary_to_uint256 (
    from_hex(
      SUBSTR(JSON_EXTRACT_SCALAR(data, '$[1].support'), 3)
    )
  ) / pow(10, 18) as support,
  method as result
FROM
  moonbeam.events
WHERE
  section = 'referenda'
  and (
    method = 'Confirmed'
    or method = 'Rejected'
    or method = 'Cancelled'
    or method = 'TimedOut'
  )
ORDER BY
  referenda_id DESC
```

Query result:

<iframe src="https://dune.com/embeds/3679042/6187736/" height="350" width="100%"></iframe>

:::info DuneSQL Referece

For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
and
[DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).

:::
