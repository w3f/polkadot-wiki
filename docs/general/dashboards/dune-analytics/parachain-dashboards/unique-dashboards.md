---
id: unique-dashboards
title: Unique Dashboards
sidebar_label: Unique
description:
  Unique is a leading parachain on Polkadot dedicated to enabling NFTs and their collections.
keywords: [polkadot, dashboard, dune, unique, NFT]
slug: ../unique-dashboards
---

# Unique Dashboards

## Overview

Unique is a leading parachain on Polkadot dedicated to enabling NFTs and their collections. It
provides a robust framework for users and developers to engage with non-fungible tokens across
different applications.

## Featured Dashboards on Dune

Here you will find a variety of dashboards that help visualize data from the Unique parachain:

- [Unique NFT Dashboard](https://dune.com/substrate/unique-nft-dashboard): A comprehensive view of
  NFT activities within the Unique parachain.
- [Unique Collection Details Dashboard](https://dune.com/substrate/unique-collection-details):
  Detailed insights into specific NFT collections.

Please also visit our dashboards for Unique on
[Dune Analytics](https://dune.com/discover/content/relevant?q=title:Unique%20author:substrate).

## Key Tables

Data from the Unique parachain is organized into several key tables:

- `unique.balances`
- `unique.blocks`
- `unique.calls`
- `unique.events`
- `unique.extrinsics`
- `unique.transfers`

Start building your own queries using granular data on Dune
[here](https://dune.com/queries?category=canonical&namespace=unique).

## Useful Queries

Some useful queries for Unique are provided:

| Title                               | Query                                             | Description                                 |
| ----------------------------------- | ------------------------------------------------- | ------------------------------------------- |
| Unique ss58 and pubkey Maping Table | [query_3632470](https://dune.com/queries/3632470) | Find all Unique ss58 and pubkey mappings    |
| Unique NFT Info                     | [query_3630265](https://dune.com/queries/3630265) | Find all Unique NFT information             |
| Unique Collection Info              | [query_3628043](https://dune.com/queries/3628043) | Find all Unique collection information      |
| Unique NFT Transaction Info         | [query_3631785](https://dune.com/queries/3631785) | Find all Unique NFT transaction information |

## Getting Started with Queries

To get started with querying data from Unique, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Unique Top Collections by Total Sales Amount" showLineNumbers
SELECT
  collection_id_with_dashboard_url,
  token_prefix,
  SUM(for_price) AS total_amount
FROM
  dune.substrate.result_unique_nft_transaction_info
GROUP BY
  collection_id_with_dashboard_url,
  token_prefix
ORDER BY
  SUM(for_price) DESC;
```

Query result:

<iframe src="https://dune.com/embeds/3632384/6118455/c4199fa9-3227-4688-90f1-81f0fc60db31" height="350" width="100%"></iframe>

!!!info "DuneSQL Reference"
    For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
    and [DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).


