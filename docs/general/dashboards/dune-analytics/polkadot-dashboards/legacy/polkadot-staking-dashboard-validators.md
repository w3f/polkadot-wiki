---
id: polkadot-staking-dashboard-validators
title: Polkadot Staking Dashboard (Validators)
sidebar_label: Staking Dashboard (Validators)
description: Polkadot Staking Dashboard (Validators) descriptions
keywords: [polkadot, governance, dashboard, dune]
slug: ../polkadot-staking-dashboard-validators
---

# Polkadot Staking Dashboard (Validators)

## View On Dune: [Polkadot Staking Dashboard](https://dune.com/substrate/polkadot-staking-validators)

## Polkadot Staking Rewards

**Reward Rate** - computed as (validator_erasRewardPoints/erasRewardPoints_total) \*
ErasValidatorReward / validator_total_stake.

**Effective Reward Rate** - computed as (1-validator*commision) *
(validator*erasRewardPoints/erasRewardPoints_total) * ErasValidatorReward / validator_total_stake -
In other words, (1-validator_commision) \*Reward Rate, after considering validator_commision

**Normalized Reward Rate** - computed as total_era_rewards / number_of_validators \* (1 -
commission) / validator_total_stake. This metric nomoralized the reward rate across active validator
sets

Source Table: **polkadot.stakings** , MaterializedView:
[**dune.substrate.result_polkadot_validators**](https://dune.com/queries/3302709)

Go back to [**Polkadot Staking Home**](https://dune.com/substrate/polkadot-staking)

<iframe src="https://dune.com/embeds/3459458/5813993/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3459458/5814228/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3459458/5814232/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3459458/5814240/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3459458/5814241/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3459458/5814242/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3459458/5814243/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3459458/5814244/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3459613/5814194/" height="350" width="100%"></iframe>
