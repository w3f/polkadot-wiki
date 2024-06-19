---
id: unique-dashboards
title: Unique Dashboards
sidebar_label: Unique
description:
  Unique is a leading parachain on Polkadot dedicated to enabling NFTs and their collections. It
  provides a robust framework for users and developers to engage with non-fungible tokens across
  different applications.
keywords: [polkadot, dashboard, dune, unique, NFT]
slug: ../unique-dashboards
---

# Unique Dashboards

## Overview

Unique is a leading parachain on Polkadot dedicated to enabling NFTs and their collections. It
provides a robust framework for users and developers to engage with non-fungible tokens across
different applications.

## Featured Dashboards on Dune

Here you'll find a variety of dashboards that help visualize data from the Unique parachain:

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
- `unique.events`,
- `unique.extrinsics`
- `unique.transfers`

## Useful Queries

Here are **materialized** queries for Unique that may be useful to build your own charts:

- [Unique ss58 and pubkey Maping Table](https://dune.com/queries/3632470)
  (`dune.substrate.result_unique_ss58_pubkey_maping`)
- [Unique NFT Info](https://dune.com/queries/3630265) (`dune.substrate.result_unique_nft_info`)
- [Unique Collection Info](https://dune.com/queries/3628043)
  (`dune.substrate.result_unique_collection_info`)
- [Unique NFT Transaction Info](https://dune.com/queries/3631785)
  (`dune.substrate.result_unique_nft_transaction_info`)

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

:::info DuneSQL Referece

For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
and
[DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).

:::
