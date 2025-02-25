---
id: moonbeam-dashboards
title: Moonbeam Dashboards
sidebar_label: Moonbeam
description: Moonbeam is a fully Ethereum-compatible parachain on the Polkadot network, enabling
keywords: [polkadot, dashboard, dune, moonbeam, Ethereum]
slug: ../moonbeam-dashboards
---

# Moonbeam Dashboards

## Overview

Moonbeam is a fully Ethereum-compatible parachain on the Polkadot network, enabling developers to
deploy existing Solidity smart contracts and DApp frontends with minimal changes. It is designed to
provide interoperability and compatibility, bridging the gap between Ethereum and Polkadot.

## Featured Dashboards on Dune

Here you will find a variety of dashboards that help visualize data from the Moonbeam parachain:

- [Moonbeam DEX](https://dune.com/substrate/moonbeam-dex): Explore decentralized exchange activities
  and token swaps within the Moonbeam ecosystem.
- [Moonbeam Governance](https://dune.com/substrate/moonbeam-governance): Detailed insights into
  governance proposals, voting, and outcomes within the Moonbeam community.

## Key Tables

Data from the Moonbeam parachain is organized into several key tables:

- `moonbeam.balances`
- `moonbeam.blocks`
- `moonbeam.calls`
- `moonbeam.events`
- `moonbeam.extrinsics`
- `moonbeam.transfers`

Start building your own queries using granular data on Dune
[here](https://dune.com/queries?category=canonical&namespace=moonbeam).

## Useful Queries

Some useful queries for Moonbeam are provided:

| Title                     | Query                                             | Description                                                                                                                                                |
| ------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Moonbeam Referenda Result | [query_3679042](https://dune.com/queries/3679042) | Provides details on the results of Moonbeam referenda, including the total aye and nay votes, support, and the result of the referendum.                   |
| Moonbeam All Voting Types | [query_3642417](https://dune.com/queries/3642417) | Offers a comprehensive overview of all voting types on Moonbeam, including standard, split, and split abstain votes, voting conviction, and voting tokens. |

## Getting Started with Queries

To get started with querying data from Unique, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Moonbeam Referenda Result" showLineNumbers
SELECT DISTINCT
  CAST(JSON_EXTRACT_SCALAR(data, '$[0]') AS INTEGER) AS referenda_id,
  get_href(
    'https://moonbeam.subscan.io/referenda_v2/' || CAST(JSON_EXTRACT_SCALAR(data, '$[0]') AS VARCHAR),
    CAST(JSON_EXTRACT_SCALAR(data, '$[0]') AS VARCHAR)
  ) AS referenda_id_url,
  varbinary_to_uint256(
    from_hex(SUBSTR(JSON_EXTRACT_SCALAR(data, '$[1].ayes'), 3))
  ) / POW(10, 18) AS aye_total,
  varbinary_to_uint256(
    from_hex(SUBSTR(JSON_EXTRACT_SCALAR(data, '$[1].nays'), 3))
  ) / POW(10, 18) AS nay_total,
  varbinary_to_uint256(
    from_hex(SUBSTR(JSON_EXTRACT_SCALAR(data, '$[1].support'), 3))
  ) / POW(10, 18) AS support,
  method AS result
FROM
  moonbeam.events
WHERE
  section = 'referenda'
  AND (
    method = 'Confirmed'
    OR method = 'Rejected'
    OR method = 'Cancelled'
    OR method = 'TimedOut'
  )
ORDER BY
  referenda_id DESC;
```

Query result:

<iframe src="https://dune.com/embeds/3679042/6187736/" height="350" width="100%"></iframe>

!!!info "DuneSQL Reference"
    For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
    and
    [DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).


