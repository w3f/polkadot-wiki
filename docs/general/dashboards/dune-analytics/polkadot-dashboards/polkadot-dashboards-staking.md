---
id: polkadot-dashboards-staking
title: "Polkadot Dashboards: Staking"
sidebar_label: Staking
description:
  Dashboards offering insights into staking rewards, validator and nominator metrics, nomination
  pools, and pool member activities within the Polkadot network.
keywords: [polkadot, governance, staking, dashboard, dune]
slug: ../polkadot-dashboards-staking
---

# Polkadot Dashboards Staking

## Overview

This document demonstrated various Polkadot staking dashboards, offering insights into staking
rewards, validator and nominator metrics, nomination pools, and pool member activities. These
dashboards aim to provide a comprehensive view of staking dynamics within the Polkadot network.

Authored by [**@ colorfulnotion**](https://x.com/colorfulnotion)

## Polkadot Staking Dashboard

**View On Dune:** [Polkadot Staking Dashboard](https://dune.com/substrate/polkadot-staking)

### Completed Era

Completed eras can have at most a 2-day delay before the staking rewards & APY computation becomes
available. The Staking Home Page shows the most recently completed era.

### Reward Rate Math

- **Reward Rate**: (validator_erasRewardPoints / erasRewardPoints_total) \* ErasValidatorReward /
  validator_total_stake.
- **Effective Reward Rate**: (1 - validator_commission) \* Reward Rate.
- **Normalized Reward Rate**: total_era_rewards / number_of_validators \* (1 - commission) /
  validator_total_stake.

Source Table: **polkadot.stakings**, MaterializedView:
[**dune.substrate.result_polkadot_validators**](https://dune.com/queries/3302709),
[**dune.substrate.result_polkadot_nominators**](https://dune.com/queries/3326829),
[**dune.substrate.result_polkadot_nominationpools**](https://dune.com/queries/3327350),
[**dune.substrate.result_polkadot_poolmembers**](https://dune.com/queries/3327479),
[**dune.substrate.result_polkadot_identity**](https://dune.com/queries/3420617)

_Github repo_: [_**substrate-etl**_](https://github.com/colorfulnotion/substrate-etl)

### Staking Analytics

<iframe src="https://dune.com/embeds/3335920/5589273/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3338274/5593554/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3345583/5606404/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3338274/5817115/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3334573/5586661/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3459220/5813496/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3302959/5531365/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3303032/5531577/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3459195/5813464/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3414552/5732594/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3334817/5603258/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3334817/5587364/" height="350" width="100%"></iframe>

## Polkadot Staking Dashboard (Validators)

**View On Dune:**
[Polkadot Staking Dashboard (Validators)](https://dune.com/substrate/polkadot-staking-validators)

### Polkadot Staking Rewards

- **Reward Rate**: (validator_erasRewardPoints / erasRewardPoints_total) \* ErasValidatorReward /
  validator_total_stake.
- **Effective Reward Rate**: (1 - validator_commission) \* Reward Rate.
- **Normalized Reward Rate**: total_era_rewards / number_of_validators \* (1 - commission) /
  validator_total_stake.

Source Table: **polkadot.stakings**, MaterializedView:
[**dune.substrate.result_polkadot_validators**](https://dune.com/queries/3302709)

<iframe src="https://dune.com/embeds/3459458/5813993/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3459458/5814228/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3459458/5814232/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3459458/5814240/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3459458/5814241/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3459458/5814242/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3459458/5814243/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3459458/5814244/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3459613/5814194/" height="350" width="100%"></iframe>

## Polkadot Staking Dashboard (Nominators)

**View On Dune:**
[Polkadot Staking Dashboard (Nominators)](https://dune.com/substrate/polkadot-staking-nominators)

For a specific nominator, this dashboard shows:

- Nominator Staking Rewards
- Nominator Shares
- Delegated Amount
- Nominator Staking Rewards Raw Data

Source Table: **polkadot.stakings**, MaterializedView:
[**dune.substrate.result_polkadot_nominators**](https://dune.com/queries/3326829)

!!!tip
    **Default parameters** are applied to all parameterized charts on this Wiki page as a demonstration.
    Visit our dashboard on Dune to use the `nominator_ss58` parameter for more in-depth analysis. For
    more information, please visit the
    [Dune documentation on parameters](https://docs.dune.com/web-app/query-editor/parameters).



<iframe src="https://dune.com/embeds/3343697/5602826/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3343697/5817852/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3459410/5813864/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3343697/5817857/" height="350" width="100%"></iframe>

## Polkadot Staking Dashboard (Nomination Pool)

**View On Dune:**
[Polkadot Staking Dashboard (Nomination Pool)](https://dune.com/substrate/polkadot-staking-nomination-pool)

For a specific nomination pool ID, this dashboard shows:

- Pool Members
- Historical APY, Daily Pool Rewards & Fees

Raw data is presented at the bottom.

Source Table: **polkadot.stakings**, MaterializedView:
[**dune.substrate.result_polkadot_nominationpools**](https://dune.com/queries/3327350)

!!!tip
    **Default parameters** are applied to all parameterized charts on this Wiki page as a demonstration.
    Visit our dashboard on Dune to use the `pool_id` parameter for more in-depth analysis. For more
    information, please visit the
    [Dune documentation on parameters](https://docs.dune.com/web-app/query-editor/parameters).



<iframe src="https://dune.com/embeds/3343291/5817752/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3341534/5599076/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3343291/5817681/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3343291/5817723/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3343291/5602160/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3343291/5817736/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3343291/5817692/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3343291/5817706/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3341597/5599169/" height="350" width="100%"></iframe>

## Polkadot Staking Dashboard (Pool Member)

**View On Dune:**
[Polkadot Staking Dashboard (Pool Member)](https://dune.com/substrate/polkadot-staking-pool-member)

For a specific nomination pool member, this dashboard shows raw data of member activity within the
pool.

Member Pool Fee: 365 \* member_staking_rewards / member_bonded

Source Table: **polkadot.stakings**, MaterializedView:
[**dune.substrate.result_polkadot_poolmembers**](https://dune.com/queries/3327479)

!!!tip
    **Default parameters** are applied to all parameterized charts on this Wiki page as a demonstration.
    Visit our dashboard on Dune to use the `user_ss58` parameter for more in-depth analysis. For more
    information, please visit the
    [Dune documentation on parameters](https://docs.dune.com/web-app/query-editor/parameters).



<iframe src="https://dune.com/embeds/3341609/5599266/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3341609/5599280/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3341609/5599290/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3341609/5599317/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3343369/5602279/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3343707/5602761/" height="350" width="100%"></iframe>
