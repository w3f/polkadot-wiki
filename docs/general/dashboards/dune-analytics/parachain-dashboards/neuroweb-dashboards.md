---
id: neuroweb-dashboards
title: Neuroweb Dashboards
sidebar_label: Neuroweb
description: Neuroweb is a decentralized AI blockchain that rewards knowledge creation and sharing.
keywords: [polkadot, dashboard, dune, neuroweb, DKG, OTP, knowledgeasset]
slug: ../neuroweb-dashboards
---

# Neuroweb Dashboards

## Overview

NeuroWeb is a decentralized AI blockchain that rewards knowledge creation and sharing. Its NEURO
token supports the AI economy by incentivizing contributions to the OriginTrail Decentralized
Knowledge Graph (DKG). NeuroWeb builds upon the groundwork established by its predecessor, the
OriginTrail Parachain (OTP). This transformation into NeuroWeb was facilitated through a community
governance vote on OTP in December 2023.

## Featured Dashboards on Dune

Here you will find a variety of dashboards that help visualize data from the Neuroweb parachain:

- [Neuroweb](https://dune.com/substrate/neuroweb): A comprehensive analysis of NeuroWeb, including:
  DKG, knowledge asset, asset, and XCM analysis.

## Key Tables

Data from the NeuroWeb parachain is organized into several key tables:

- `neuroweb.balances`
- `neuroweb.blocks`
- `neuroweb.calls`
- `neuroweb.events`
- `neuroweb.extrinsics`
- `neuroweb.transfers`

Start building your own queries using granular data on Dune
[here](https://dune.com/queries?category=canonical&namespace=neuroweb).

## Useful Queries

Some useful queries for Neuroweb are provided:

| Title                    | Query                                             | Description                                               |
| ------------------------ | ------------------------------------------------- | --------------------------------------------------------- |
| Neuroweb Knowledge Asset | [query_3695045](https://dune.com/queries/3695045) | Find all transfer records of knowledge assets on Neuroweb |

## Getting Started with Queries

To get started with querying data from Unique, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Neuroweb Knowledge Asset Distribution" showLineNumbers
SELECT DISTINCT
  get_href(
    'https://dkg.origintrail.io/profile?wallet=' || CAST(To AS VARCHAR),
    CONCAT(
      SUBSTR(To, 1, 4),
      '...',
      SUBSTR(To, LENGTH(To) - 3)
    )
  ) AS Holder_URL,
  CONCAT(
    SUBSTR(To, 1, 4),
    '...',
    SUBSTR(To, LENGTH(To) - 3)
  ) AS Holder,
  COUNT("Token ID") AS "# of Tokens"
FROM
  query_3695045
GROUP BY
  To
ORDER BY
  "# of Tokens" DESC;
```

Query result:

<iframe src="https://dune.com/embeds/3696553/6219067" height="350" width="100%"></iframe>

!!!info "DuneSQL Reference"
    For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
    and
    [DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).


