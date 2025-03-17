---
id: frequency-dashboards
title: Frequency Dashboards
sidebar_label: Frequency
description: Frequency is a parachain on Polkadot focusing on decentralized communication solutions.
keywords: [polkadot, dashboard, dune, frequency, communication]
slug: ../frequency-dashboards
---

# Frequency Dashboards

## Overview

Frequency is a parachain on Polkadot focusing on decentralized communication solutions. It allows
the creation and management of decentralized networks for various applications, enhancing data
privacy and security.

## Featured Dashboards on Dune

Here you will find a variety of dashboards that help visualize data from the Frequency parachain:

- [Frequency Dashboard](https://dune.com/substrate/frequency): A comprehensive view of the
  activities within the Frequency parachain.

Please also visit our dashboards for Frequency on
[Dune Analytics](https://dune.com/discover/content/relevant?q=title:Frequency%20author:substrate).

## Key Tables

Data from the Frequency parachain is organized into several key tables:

- `frequency.balances`
- `frequency.blocks`
- `frequency.calls`
- `frequency.events`
- `frequency.extrinsics`
- `frequency.transfers`

Start building your own queries using granular data on Dune
[here](https://dune.com/queries?category=canonical&namespace=frequency).

## Useful Queries

Some useful queries for Frequency are provided:

[Frequency Schema List (Off-chain Payload)](https://dune.com/queries/3781175)
[Frequency Schema List](https://dune.com/queries/3760992)
[Frequency MSA Count](https://dune.com/queries/3820268)

| Title                                     | Query                                             | Description                                                                   |
| ----------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------- |
| Frequency Schema List (Off-chain Payload) | [query_3781175](https://dune.com/queries/3781175) | Provides a list of schemas used in the off-chain payload of Frequency.        |
| Frequency Schema List                     | [query_3760992](https://dune.com/queries/3760992) | Lists the schemas used in Frequency.                                          |
| Frequency MSA Count                       | [query_3820268](https://dune.com/queries/3820268) | Displays the count of Message Source Accounts (MSAs) extrinsics in Frequency. |

## Getting Started with Queries

To get started with querying data from Unique, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Frequency Extrinsics by Day" showLineNumbers
SELECT
    DATE_TRUNC('day', block_time) AS day,
    section || '_' || method AS section_method,
    COUNT(*) AS cnt
FROM
    frequency.extrinsics
WHERE
    section || '_' || method IN (
        SELECT section_method
        FROM unnest(SPLIT('{{section_method}}', ',')) AS c(section_method)
    )
GROUP BY
    DATE_TRUNC('day', block_time),
    section || '_' || method;
```

Query result:

<iframe src="https://dune.com/embeds/3760873/6325506/d2393c18-9438-4199-bbd9-27cc28324e6f" height="350" width="100%"></iframe>

!!!info "DuneSQL Reference"
    For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
    and
    [DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).


