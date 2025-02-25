---
id: people-dashboards
title: People Dashboards
sidebar_label: People
description:
  People is a parachain on Polkadot focused on decentralized identity and social interactions.
keywords: [polkadot, dashboard, dune, people, identity]
slug: ../people-dashboards
---

# People Dashboards

## Overview

People's Chain focuses on decentralized identity and social interactions, enabling users to manage
their digital identity and engage in community governance.

## Featured Dashboards on Dune

Here you will find a variety of dashboards that help visualize data from the People parachain:

- [People Dashboard](https://dune.com/substrate/people): A comprehensive view of identity management
  and social interaction activities within the People ecosystem.

Please also visit our dashboards for People on
[Dune Analytics](https://dune.com/discover/content/relevant?q=title:People%20author:substrate).

## Key Tables

Data from the People parachain is organized into several key tables:

- `people.balances`
- `people.blocks`
- `people.calls`
- `people.events`
- `people.extrinsics`
- `people.transfers`

Start building your own queries using granular data on Dune
[here](https://dune.com/queries?category=canonical&namespace=people).

## Useful Queries

Some useful queries for People are provided:

| Title                                  | Query                                             | Description                                                  |
| -------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------ |
| Kusama People Chain - Identity History | [query_3836167](https://dune.com/queries/3836167) | Find all identity history records on the Kusama People Chain |

## Getting Started with Queries

To get started with querying data from Unique, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Kusama People Chain - Identity History Sample" showLineNumbers
SELECT
  block_time,
  extrinsic_id,
  signer_ss58,
  signer_pub_key,
  CAST(
    from_utf8(
      from_hex(JSON_EXTRACT_SCALAR(call_args, '$.info.display.raw'))
    ) AS VARCHAR
  ) AS name,
  CAST(
    from_utf8(
      from_hex(JSON_EXTRACT_SCALAR(call_args, '$.info.email.raw'))
    ) AS VARCHAR
  ) AS email
FROM
  people_kusama.calls
WHERE
  call_section = 'identity'
  AND call_method = 'setIdentity';
```

Query result:

<iframe src="https://dune.com/embeds/3836167/6451940/" height="350" width="100%"></iframe>

!!!info "DuneSQL Reference"
    For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
    and
    [DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).


