---
id: maintain-guides-validator-payout
title: Validator Payout Overview
sidebar_label: Validator Payout Overview
---

## Era Points

For every era (a period of time approximately 6 hours in length in Kusama, and 24 hours in Polkadot), validators are paid proportionally to the amount of _era points_ they have collected. Era points are reward points earned for payable actions like:

- issuing validity statements for [parachain](learn-parachains) blocks.
- producing a non-uncle block in the Relay Chain.
- producing a reference to a previously unreferenced uncle block.
- producing a referenced uncle block.

_Note: An uncle block is a Relay Chain block that is valid in every regard, but which failed to become canonical. This can happen when two or more validators are block producers in a single slot, and the block produced by one validator reaches the next block producer before the others. We call the lagging blocks uncle blocks._

Payments occur at the end of every era.

## Payout Scheme

No matter how much total stake is behind a validator, all validators split the block authoring payout equally. The total payout, however, may differ based on [era points](#era-points), as described above.

Validators may also receive "tips" from senders as an incentive to include transactions in their produced blocks.

For simplicity, the examples below will assume all validators have the same amount of era points.

```
Validator Set Size (v): 4
Validator 1 Stake (v1): 18 DOTs
Validator 2 Stake (v2):  9 DOTs
Validator 3 Stake (v3):  8 DOTs
Validator 4 Stake (v4):  7 DOTs
Payout (p): 8 DOTs

Payout for each validator (v1 - v4):
p / v = 8 / 4 = 2 DOTs
```

Note that this is different than most other Proof-of-Stake systems such as Cosmos. As long as a validator is in the validator set, it will receive the same block reward as every other validator. Validator `v1`, who had 18 DOTs staked, received the same reward (2 DOTs) in this era as `v4` who had only 7 DOTs staked.

## Running Multiple Validators

It is possible for a single entity to run multiple validators. Running multiple validators may provide a better risk/reward ratio. Assuming you have enough DOTs, or enough stake nominates your validator, to ensure that your validators remain in the validator set, running multiple validators will result in a higher return than running a single validator.

For the following example, assume you have 18 DOTs to stake. For simplicity's sake, we will ignore nominators. Running a single validator, as in the example above, would net you 2 DOTs in this era.

```
Validator Set Size (v): 4
Validator 1 Stake (v1): 18 DOTs <- Your validator
Validator 2 Stake (v2):  9 DOTs
Validator 3 Stake (v3):  8 DOTs
Validator 4 Stake (v4):  7 DOTs
Payout (p): 8 DOTs

Your payout = (p / v) * 1 = (8 / 4) * 1 = 2
```

Running two validators, and splitting the stake equally, would result in the original validator `v4` to be kicked out of the validator set, as only the top `v` validators (as measured by stake) are selected to be in the validator set. More important, it would also double the reward that you get from each era.

```
Validator Set Size (v): 4
Validator 1 Stake (v1): 9 DOTs <- Your first validator
Validator 2 Stake (v2): 9 DOTs <- Your second validator
Validator 3 Stake (v3): 9 DOTs
Validator 4 Stake (v4): 8 DOTs
Payout (p): 8 DOTs

Your payout = (p / v) * 1 = (8 / 4) * 2 = 4
```

With enough stake, you could run more than two validators. However, each validator must have enough stake behind it to be in the validator set.

The incentives of the system favor equally-staked validators. This will most likely be a dynamic, rather than static, equilibrium. Potential validators will run different numbers of validators and apply different amounts of stake to them as time goes on, and in response to the actions of other validators on the network.

## Slashing

Although rewards are paid equally, slashes are relative to a validator's stake. Therefore, if you do have enough DOTs to run multiple validators, it is in your best interest to do so. A slash of 30% will, of course, be more DOTs for a validator with 18 DOTs staked than one with 9 DOTs staked.

Running multiple validators does not absolve you of the consequences of misbehavior. Polkadot punishes attacks that appear coordinated more severely than individual attacks. You should not, for example, run multiple validators hosted on the same infrastructure. A proper multi-validator configuration would ensure that they do not fail simultaneously.

Nominators have the incentive to nominate the lowest-staked validator, as this will result in the lowest risk and highest reward.

## Nominators and Validator Payments

Nominated stake allows you to "vote" for validators and share in the rewards (and slashing) without running a validator node yourself. Validators can choose to keep a percentage of the rewards due to their validator to "reimburse" themselves for the cost of running a validator node. Other than that, all rewards are shared based on the stake behind each validator. This includes the stake of the validator itself, plus any stake bonded by nominators.

> **NOTE:** Validators set their preference as a percentage of the block reward, _not_ an absolute number of DOTs. Polkadot's block reward is based on the _total_ amount at stake, with the reward peaking when the amount staked is at 50% of the total supply. In periods when there is a lower amount staked, and therefore lower rewards, the validator's payout preference could mean that there is zero left over for nominators.

In the following examples, we can see the results of several different validator payment schemes and split between nominator and validator stake. We will assume a single nominator for each validator. However, there can be numerous nominators for each validator. Rewards are still distributed proportionally - for example, if the total rewards to be given to nominators is 2 DOTs, and there are four nominators with equal stake bonded, each will receive 0.5 DOTs. Note also that a single nominator may stake different validators.

Each validator in the example has selected a different validator payment (that is, a percentage of the reward set aside directly for the validator before sharing with all bonded stake). The validator's payment percentage (in DOTs) is listed in brackets (`[]`) next to each validator. Note that since the validator payment is public knowledge, having a low or non-existent validator payment may attract more stake from nominators, since they know they will receive a larger reward.

```
Validator Set Size (v): 4
Validator 1 Stake (v1) [0.2]: 18 DOTs (9 validator, 9 nominator)
Validator 2 Stake (v2) [0.4]:  9 DOTs (3 validator, 6 nominator)
Validator 3 Stake (v3) [0.1]:  8 DOTs (4 validator, 4 nominator)
Validator 4 Stake (v4) [0.0]:  6 DOTs (1 validator, 5 nominator)
Payout (p): 8 DOTs

Payout for each validator (v1 - v4):
p / v = 8 / 4 = 2 DOTs

v1:
(0.2 * 2) = 0.4 DOTs -> validator payment
(2 - 0.4) = 1.6 -> shared between all stake
(9 / 18) * 1.6 = 0.8 -> validator stake share
(9 / 18) * 1.6 = 0.8 -> nominator stake share
v1 validator total reward: 0.4 + 0.8 = 1.2 DOTs
v1 nominator reward: 0.8 DOTs

v2:
(0.4 * 2) = 0.8 DOTs -> validator payment
(2 - 0.8) = 1.2 -> shared between all stake
(3 / 9) * 1.2 = 0.4 -> validator stake share
(6 / 9) * 1.2 = 0.8 -> nominator stake share
v2 validator total reward: 0.8 + 0.4 = 1.2 DOTs
v2 nominator reward: 0.8 DOTs

v3:
(0.1 * 2) = 0.2 DOTs -> validator payment
(2 - 0.2) = 1.8 -> shared between all stake
(4 / 8) * 1.8 = 0.9 -> validator stake share
(4 / 8) * 1.8 = 0.9 -> nominator stake share
v3 validator total reward: 0.2 + 0.9 DOTs = 1.1 DOTs
v3 nominator reward: 0.9 DOTs

v4:
(0 * 2) = 0 DOTs -> validator payment
(2 - 0) = 2.0 -> shared between all stake
(1 / 6) * 2 = 0.33 -> validator stake share
(5 / 6) * 2 = 1.67 -> nominator stake share
v4 validator total reward: 0 + 0.33 DOTs = 0.33 DOTs
v4 nominator reward: 1.67 DOTs
```
