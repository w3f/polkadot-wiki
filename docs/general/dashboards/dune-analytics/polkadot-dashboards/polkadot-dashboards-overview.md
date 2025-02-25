---
id: polkadot-dashboards-overview
title: Polkadot Dashboards Overview
sidebar_label: Overview
description: The starting point for exploring Polkadot dashboards on Dune Analytics.
keywords: [polkadot, dashboard, dune, governance, staking, NFT]
slug: ../polkadot-dashboards-overview
---

# Polkadot Dashboards Overview

Polkadot is a flagship project by Web3 Foundation, designed to enable a completely decentralized web
where users are in control. It is a sharded multichain network, meaning it can process many
transactions on several chains in parallel, improving scalability.

## Featured Dashboards on Dune

Here you'll find a variety of dashboards that help visualize data from the Polkadot network:

### Governance

Explore Polkadot's governance through dashboards detailing proposal submissions, referenda outcomes,
and voting behaviors. These tools highlight the decentralized decision-making process and its
efficacy.

- [Polkadot Governance Dashboard](https://dune.com/substrate/polkadot-gov): The _Polkadot Governance
  Dashboard_ provides a clear and concise representation of the
  [network's governance](https://wiki.polkadot.network/docs/en/learn-governance) activities. It
  serves as a useful tool for community members to observe
  [treasury management](https://wiki.polkadot.network/docs/en/learn-treasury),
  [referendum outcomes](https://wiki.polkadot.network/docs/en/learn-governance#referenda), and
  voting patterns. This dashboard aims to enhance community engagement by simplifying access to
  governance information and fostering a transparent decision-making environment.
- [Polkadot OpenGov Referenda - Home](https://dune.com/substrate/polkadot-opengov-active-referenda):
  This dashboard is designed for those who wish to vote, allowing them to quickly understand the
  current trend in Polkadot OpenGov and proceed to vote on
  [Polkassembly](https://polkadot.polkassembly.io/opengov). If you want to see more details of each
  referendum, please check
  [Polkadot Opengov - Referendum Voting Analysis](https://dune.com/substrate/polkadot-referendum).
- [Polkadot Opengov - Referendum Voting Analysis](https://dune.com/substrate/polkadot-referendum):
  Detailed insights into the referendum voting process and outcomes.

### Staking

Dive into the staking ecosystem with dashboards that analyze validator performance, nominator
contributions, and staking distributions. For a deeper understanding of Polkadot's staking mechanism
and to optimize your staking strategies, visit the
[official staking mechanism documentation](https://wiki.polkadot.network/docs/learn-staking) and the
[staking web app documentation](https://wiki.polkadot.network/docs/staking-dashboard).

- [Polkadot Staking Dashboard](https://dune.com/substrate/polkadot-staking): Overview of staking
  dynamics and distribution across the network.
- [Polkadot Staking Dashboard (Validators) 💰](https://dune.com/substrate/polkadot-staking-validators):
  Analyze validator performance and statistics.
- [Polkadot Staking Dashboard (Nominators) 💰](https://dune.com/substrate/polkadot-staking-nominators):
  Insights into nominator contributions and rewards.
- [Polkadot Staking Dashboard (Pool Member) 💰](https://dune.com/substrate/polkadot-staking-pool-member):
  Data on staking pools and individual member activity.
- [Polkadot Staking Dashboard (Nomination Pool) 💰](https://dune.com/substrate/polkadot-staking-nomination-pool):
  Detailed view of nomination pools and their performance.

### Miscellaneous

Discover diverse aspects of Polkadot through Miscellaneous dashboards, which provide insights into
DOT ordinals and other unique network activities. Ideal for uncovering trends in the broader
ecosystem.

- [DOT Ordinals](https://dune.com/substrate/dot-ordinals): Examination of DOT ordinal metrics and
  trends.

## Key Tables

Data from the Polkadot network is organized into several key tables:

- `polkadot.balances`
- `polkadot.blocks`
- `polkadot.calls`
- `polkadot.events`
- `polkadot.extrinsics`
- `polkadot.transfers`
- `polkadot.traces`
- `polkadot.stakings`

Start building your own queries using granular data on Dune
[here](https://dune.com/queries?category=canonical&namespace=polkadot).

## Useful Queries

Here are **materialized** queries for Polkadot that may be useful to build your own charts:

- [Polkadot Referenda Total Voting Power](https://dune.com/queries/3394422)
  (`dune.substrate.result_polkadot_referenda_total_voting_power`)
- [Polkadot Staking Nomination Total](https://dune.com/queries/3426963)
  (`dune.substrate.result_polkadot_staking_nomination_total`)
- [Polkadot OpenGov Delegation](https://dune.com/queries/3393179)
  (`dune.substrate.result_polkadot_open_gov_delegation`)
- [Polkadot Vote Record](https://dune.com/queries/3415321)
  (`dune.substrate.result_polkadot_vote_record`)
- [Polkadot Proposals proposed](https://dune.com/queries/3394156)
  (`dune.substrate.result_polkadot_proposals_proposed`)
- [Polkadot Referenda Direct Vote](https://dune.com/queries/3391225)
  (`dune.substrate.result_polkadot_referenda_direct_vote`)
- [Polkadot Each Vote Record](https://dune.com/queries/3393684)(`dune.substrate.result_polkadot_each_vote_record`)
- [Polkdaot Referenda Origin Map](https://dune.com/queries/3399352)(`dune.substrate.result_polkdaot_referenda_origin_map`)
- [Polkadot Failed calls in batch](https://dune.com/queries/3457139)(`dune.substrate.result_polkadot_failed_calls_in_batch`)
- [polkadot_validator](https://dune.com/queries/3302709)
  (`dune.substrate.result_polkadot_validators`)
- [polkadot_nominationpools](https://dune.com/queries/3327350)
  (`dune.substrate.result_polkadot_nominationpools`)
- [polkadot_nominators](https://dune.com/queries/3326829)
  (`dune.substrate.result_polkadot_nominators`)
- [polkadot_poolmembers](https://dune.com/queries/3327479)
  (`dune.substrate.result_polkadot_poolmembers`)
- [polkadot_identity](https://dune.com/queries/3420617) (`dune.substrate.result_polkadot_identity`)

## Getting Started with Queries

To get started with querying data from Unique, you are welcome to use the mentioned materialized
queries. You can use the following DuneSQL queries as examples:

```sql title="Polkadot Staking APR (Normalized)" showLineNumbers
SELECT
  AVG(validator_normalized_staking_apr) AS staking_apr,
  era,
  DATE_FORMAT(ts, '%Y-%m-%d') AS era_ts
FROM
  dune.substrate.result_polkadot_validators
WHERE
  validator_is_active = TRUE
  AND validator_commission <> 1
GROUP BY
  era,
  ts
HAVING
  AVG(validator_normalized_staking_apr) > 0
ORDER BY
  era DESC;
```

Query result:

<iframe src="https://dune.com/embeds/3303109/5531719/" height="350" width="100%"></iframe>

Visualized result:

<iframe src="https://dune.com/embeds/3303109/5531727/" height="350" width="100%"></iframe>

!!!info DuneSQL Referece
    For more information on DuneSQL, please refer to the [DuneSQL Cheatsheet](../dunesql-cheatsheet.md)
    and [DuneSQL Official Documentation](https://docs.dune.com/query-engine/Functions-and-operators/index).


