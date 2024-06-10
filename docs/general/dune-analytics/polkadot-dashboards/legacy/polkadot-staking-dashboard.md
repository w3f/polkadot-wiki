---
id: polkadot-staking-dashboard
title: Polkadot Staking Dashboard
sidebar_label: Staking Dashboard
description: Polkadot Staking Dashboard descriptions
keywords: [polkadot, governance, dashboard, dune]
slug: ../polkadot-staking-dashboard
---

# Polkadot Staking Dashboard

## View On Dune: [Polkadot Staking Dashboard](https://dune.com/substrate/polkadot-staking)

## Polkadot Staking Dashboard

**Completed Era** - completed era can have at most 2 days delay before the staking rewards & apy
computation becomes available. The Staking Home Page is showing the most recently completed era

Please note that Reward Rate and Effective Reward Rate can be volatile as erapoint varies based on
network condition and total delegation amount are subject to
[phragmen algo](https://wiki.polkadot.network/docs/learn-phragmen)

Authored by _Stanley_, _Jerry_, and _William_ [**@ colorfulnotion**](https://x.com/colorfulnotion)
(QA'ed: _MK_)

## Rewards Rate Math

**Reward Rate** - computed as (validator_erasRewardPoints/erasRewardPoints_total) \*
ErasValidatorReward / validator_total_stake.

**Effective Reward Rate** - computed as (1-validator*commision) *
(validator*erasRewardPoints/erasRewardPoints_total) * ErasValidatorReward / validator_total_stake -
In other words, (1-validator_commision) \*Reward Rate, after considering validator_commision

**Normalized Reward Rate** - computed as total_era_rewards / number_of_validators \* (1 -
commission) / validator_total_stake. This metric nomoralized the reward rate across active validator
sets

## Sources

Raw staking data can be found at **polkadot.stakings** table. To demonstrate how to compute and
generate _validators_, _nominators_, _pools_, _poolmembers_ **granular metrics**, the following
queries have been provided:

- **Validators** - [**dune.substrate.result_polkadot_validators**](https://dune.com/queries/3302709)
  (MetVeiw)
- **Nominators** - [**dune.substrate.result_polkadot_nominators**](https://dune.com/queries/3326829)
  (MetVeiw)
- **Nomination Pools** -
  [**dune.substrate.result_polkadot_nominationpools**](https://dune.com/queries/3327350) (MetVeiw)
- **Pool Members** -
  [**dune.substrate.result_polkadot_poolmembers**](https://dune.com/queries/3327479) (MetVeiw)
- **On-Chain Identities** -
  [**dune.substrate.result_polkadot_identity**](https://dune.com/queries/3420617) (MetVeiw)

_Github repo_: [_**substrate-etl**_](https://github.com/colorfulnotion/substrate-etl)

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
