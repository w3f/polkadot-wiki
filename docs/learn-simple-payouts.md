---
id: learn-simple-payouts
title: Simple Payouts
sidebar_label: Simple Payouts
---

Polkadot and Kusama make stakers claim their rewards for past eras by submitting a transaction. This
naturally leads to spreading out reward distribution, as people make transactions at disparate
times, rather than updating the accounts of all stakers in a single block. Even if everyone
submitted a reward claim at the same time, the fact that they are individual transactions would
allow the block construction algorithm to process only a limited number per block and ensure that
the network maintains a constant block time. If all rewards were sent out in one block, this could
cause serious issues with the stability of the network.

Simple payouts requires one transaction per validater per era to claim rewards. The reason Polkadot
requires this is to avoid an attack where someone has several thousand accounts nominating a single
validator. The major cost in reward distribution is mutating the accounts in storage, and Polkadot
cannot pay out several thousand accounts in a single transaction.

## Claiming Rewards

Polkadot stores up to 84 eras of reward info like maps of era number to validator points,
inflationary rewards, and nomination exposures. Rewards will not be claimable more than 84 eras
after they were earned. This means that all rewards must be claimed within 84 eras.

Anyone can trigger a payout for any validator, as long as they are willing to pay the transaction
fee. Someone must submit a transaction with a validator ID and an era index. Polkadot will
automatically calculate that validator's reward, find the top 64 nominators for that era, and
distribute the rewards pro rata.

> Note: The Staking system only applies the highest 64 nominations to each validator to reduce the
> complexity of the staking set.

These details are handled for you automatically if you use the
[Polkadot JS UI](https://polkadot.js.org/apps/#/staking/payout), which also allows you to submit
batches of eras at once.

## F.A.Q. and Cautionary Notes

1. Rewards expire after 84 eras. On Polkadot, that's about 84 days. On Kusama, it is approximately
   21 days.
1. Claiming rewards (or neglecting to claim rewards) does not affect nominations in any way.
   Nominations will persist after claiming rewards or the rewards expire.
1. Rewards are not minted until they are claimed. Therefore, if your reward destination is "stash,
   increasing amount at stake", then your staked amount does not reflect your rewards until you
   claim them. If you want to maximize compounding, then you will need to claim often.
