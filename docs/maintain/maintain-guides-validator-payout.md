---
id: maintain-guides-validator-payout
title: Validator Payout Overview
sidebar_label: Validator Payout Overview
description: How validator payout works on the network and what you should expect.
keywords: [validator payout, payments, rewards, era points]
slug: ../maintain-guides-validator-payout
---

## Era Points

For every era (a period of time approximately 6 hours in length in Kusama, and 24 hours in
Polkadot), validators are paid proportionally to the amount of _era points_ they have collected. Era
points are reward points earned for payable actions like:

- issuing validity statements for [parachain](../learn/learn-parachains.md) blocks.
- producing a non-uncle block in the relay chain.
- producing a reference to a previously unreferenced uncle block.
- producing a referenced uncle block.

!!!note
    An uncle block is a relay chain block that is valid in every regard, but which failed to become
    canonical. This can happen when two or more validators are block producers in a single slot, and the
    block produced by one validator reaches the next block producer before the others. We call the
    lagging blocks uncle blocks.

Payments occur at the end of every era.

Era points create a probabilistic component for staking rewards.

If the _mean_ of staking rewards is the average rewards per era, then the _variance_ is the
variability from the average staking rewards. The exact DOT value of each era point is not known in
advance since it depends on the total number of points earned by all validators in a given era. This
is designed this way so that the total payout per era depends on Polkadot's
[inflation model](../learn/learn-inflation.md), and not on the number of payable
actions (f.e., authoring a new block) executed. For more information, check
[this stackexchange post](https://substrate.stackexchange.com/questions/5353/how-are-rewards-in-dot-calculated-from-the-era-points-earned-by-validators-in-po).

With parachains now on Polkadot, a large percentage of era points will come from parachain
validation, as a subset of validators are selected to para-validate for all parachains each epoch,
and those para-validators can generate more era points as a result. Para-validators are rewarded 20
era points each for each parachain block that they validate.

In this case, analyzing the _expected value_ of staking rewards will paint a better picture as the
weight of era points of validators and para-validators in the reward average are taken into
consideration.

!!!note "High-level breakdown of reward variance"
    This should only serve as a high-level overview of the probabilistic nature for staking rewards.

    Let:

    - `pe` = para-validator era points,
    - `ne` = non-para-validator era points,
    - `EV` = expected value of staking rewards,

    Then, `EV(pe)` has more influence on the `EV` than `EV(ne)`.

    Since `EV(pe)` has a more weighted probability on the `EV`, the increase in variance against the
    `EV` becomes apparent between the different validator pools (aka. validators in the active set and
    the ones chosen to para-validate).

    Also, let:

    - `v` = the variance of staking rewards,
    - `p` = number of para-validators,
    - `w` = number validators in the active set,
    - `e` = era,

    Then, `v` &#8593; if `w` &#8593;, as this reduces `p` : `w`, with respect to `e`.

    Increased `v` is expected, and initially keeping `p` &#8595; using the same para-validator set for
    all parachains ensures
    [availability](../learn/learn-parachains-protocol.md#availability-and-unavailability-phase) and
    [voting](../learn/learn-polkadot-opengov.md). In addition, despite `v` &#8593; on an `e` to `e`
    basis, over time, the amount of rewards each validator receives will equal out based on the
    continuous selection of para-validators.

    There are plans to scale the active para-validation set in the future

## Payout Scheme

No matter how much total stake is behind a validator, all validators split the block authoring
payout essentially equally. The payout of a specific validator, however, may differ based on
[era points](#era-points), as described above. Although there is a probabilistic component to
receiving era points, and they may be impacted slightly depending on factors such as network
connectivity, well-behaving validators should generally average out to having similar era point
totals over a large number of eras.

Validators may also receive "tips" from senders as an incentive to include transactions in their
produced blocks. Validators will receive 100% of these tips directly.

Validators will receive staking rewards in the form of the native token of that chain (KSM for
Kusama and DOT for Polkadot).

For simplicity, the examples below will assume all validators have the same amount of era points,
and received no tips.

```
Validator Set Size (v): 4
Validator 1 Stake (v1): 18 tokens
Validator 2 Stake (v2):  9 tokens
Validator 3 Stake (v3):  8 tokens
Validator 4 Stake (v4):  7 tokens
Payout (p): 8 DOT

Payout for each validator (v1 - v4):
p / v = 8 / 4 = 2 tokens
```

Note that this is different than most other Proof-of-Stake systems such as Cosmos. As long as a
validator is in the validator set, it will receive the same block reward as every other validator.
Validator `v1`, who had 18 tokens staked, received the same reward (2 tokens) in this era as `v4`
who had only 7 tokens staked.

## Running Multiple Validators

It is possible for a single entity to run multiple validators. Running multiple validators may
provide a better risk/reward ratio. Assuming you have enough DOT, or enough stake nominates your
validator, to ensure that your validators remain in the validator set, running multiple validators
will result in a higher return than running a single validator.

For the following example, assume you have 18 DOT to stake. For simplicity's sake, we will ignore
nominators. Running a single validator, as in the example above, would net you 2 DOT in this era.

Note that while DOT is used as an example, this same formula would apply to KSM when running a
validator on Kusama.

```
Validator Set Size (v): 4
Validator 1 Stake (v1): 18 DOT <- Your validator
Validator 2 Stake (v2):  9 DOT
Validator 3 Stake (v3):  8 DOT
Validator 4 Stake (v4):  7 DOT
Payout (p): 8 DOT

Your payout = (p / v) * 1 = (8 / 4) * 1 = 2
```

Running two validators, and splitting the stake equally, would result in the original validator `v4`
to be kicked out of the validator set, as only the top `v` validators (as measured by stake) are
selected to be in the validator set. More important, it would also double the reward that you get
from each era.

```
Validator Set Size (v): 4
Validator 1 Stake (v1): 9 DOT <- Your first validator
Validator 2 Stake (v2): 9 DOT <- Your second validator
Validator 3 Stake (v3): 9 DOT
Validator 4 Stake (v4): 8 DOT
Payout (p): 8 DOT

Your payout = (p / v) * 2 = (8 / 4) * 2 = 4
```

With enough stake, you could run more than two validators. However, each validator must have enough
stake behind it to be in the validator set.

The incentives of the system favor equally-staked validators. This works out to be a dynamic, rather
than static, equilibrium. Potential validators will run different numbers of validators and apply
different amounts of stake to them as time goes on, and in response to the actions of other
validators on the network.

## Nominators and Validator Payments

A nominated stake allows you to "vote" for validators and share the rewards (but also
[slashing](../learn/learn-offenses.md)) without running a validator node yourself.

Although staking rewards are based on the activities of the validator node during a specific era,
the validator never has access to or ownership of staking rewards. In fact, `staking.payoutStakers`
or `staking.payoutStakerByPage` calls are necessary to payout staking rewards, can be called by
anyone, and the staking rewards are "generated" because of it and automatically sent to nominators
(i.e., rewards are produced or minted and sent to nominators, not sent from validators to
nominators).

This includes the stake of the validator itself plus any stake bonded by nominators.

!!!info
    Validators set their preference as a percentage of the block reward, _not_ an absolute number of
    DOT. Polkadot's block reward is based on the _total_ amount at stake. The commission is set as the
    amount taken by the validator; that is, 0% commission means that the validator does not receive any
    proportion of the rewards besides that owed to it from self-stake, and 100% commission means that
    the validator operator gets all rewards and gives none to its nominators.

In the following examples, we can see the results of several different validator payment schemes and
split between nominator and validator stake. We will assume a single nominator for each validator.
However, there can be numerous nominators for each validator. Rewards are still distributed
proportionally - for example, if the total rewards to be given to nominators is 2 DOT, and there are
four nominators with equal stake bonded, each will receive 0.5 DOT. Note also that a single
nominator may stake different validators.

Each validator in the example has selected a different validator payment (that is, a percentage of
the reward set aside directly for the validator before sharing with all bonded stake). The
validator's payment percentage (in DOT, although the same calculations work for KSM) is listed in
brackets (`[]`) next to each validator. Note that since the validator payment is public knowledge,
having a low or non-existent validator payment may attract more stake from nominators, since they
know they will receive a larger reward.

```
Validator Set Size (v): 4
Validator 1 Stake (v1) [20% commission]: 18 DOT (9 validator, 9 nominator)
Validator 2 Stake (v2) [40% commission]:  9 DOT (3 validator, 6 nominator)
Validator 3 Stake (v3) [10% commission]:  8 DOT (4 validator, 4 nominator)
Validator 4 Stake (v4) [ 0% commission]:  6 DOT (1 validator, 5 nominator)
Payout (p): 8 DOT

Payout for each validator (v1 - v4):
p / v = 8 / 4 = 2 DOT

v1:
(0.2 * 2) = 0.4 DOT -> validator payment
(2 - 0.4) = 1.6 -> shared between all stake
(9 / 18) * 1.6 = 0.8 -> validator stake share
(9 / 18) * 1.6 = 0.8 -> nominator stake share
v1 validator total reward: 0.4 + 0.8 = 1.2 DOT
v1 nominator reward: 0.8 DOT

v2:
(0.4 * 2) = 0.8 DOT -> validator payment
(2 - 0.8) = 1.2 -> shared between all stake
(3 / 9) * 1.2 = 0.4 -> validator stake share
(6 / 9) * 1.2 = 0.8 -> nominator stake share
v2 validator total reward: 0.8 + 0.4 = 1.2 DOT
v2 nominator reward: 0.8 DOT

v3:
(0.1 * 2) = 0.2 DOT -> validator payment
(2 - 0.2) = 1.8 -> shared between all stake
(4 / 8) * 1.8 = 0.9 -> validator stake share
(4 / 8) * 1.8 = 0.9 -> nominator stake share
v3 validator total reward: 0.2 + 0.9 DOT = 1.1 DOT
v3 nominator reward: 0.9 DOT

v4:
(0 * 2) = 0 DOT -> validator payment
(2 - 0) = 2.0 -> shared between all stake
(1 / 6) * 2 = 0.33 -> validator stake share
(5 / 6) * 2 = 1.67 -> nominator stake share
v4 validator total reward: 0 + 0.33 DOT = 0.33 DOT
v4 nominator reward: 1.67 DOT
```
