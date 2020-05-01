---
id: learn-lazy-payouts
title: Lazy Payouts
sidebar_label: Lazy Payouts
---

Polkadot and Kusama make all stakers claim their rewards for past eras by submitting a transaction.
This naturally leads to spreading out reward distribution, as people make transactions at disparate
times, rather than updating the accounts of all stakers in a single block. Even if everyone
submitted a reward claim at the same time, the fact that they are individual transactions would
allow the block construction algorithm to process only a limited number per block and ensure that
the network maintains a constant block time. If all rewards were sent out in one block, this could
cause serious issues with the stability of the network.

Lazy payouts requires one transaction per staker per era to claim rewards, where a staker can be
either a validator or a nominator. The reason Polkadot requires this is to avoid an attack where
someone has several thousand accounts nominating a single validator. The major cost in reward
distribution is mutating the accounts in storage, and Polkadot cannot pay out several thousand
accounts in a single transaction.

## Claiming Rewards

Polkadot stores up to 84 eras of reward info like maps of era number to validator points,
inflationary rewards, and nomination exposures.

Rewards will not be claimable more than 84 eras after they were earned. This means that all stakers
--- nominators and validators alike --- must claim their rewards within 84 eras, or they will not be
able to be claimed.

### Validators

In order to claim rewards, validators must submit a `payout_validator(era: EraIndex)` transaction
from their **controller** key, where `era` is the era for which they are claiming rewards.

### Nominators

Nominators will need to submit a
`payout_nominator(era: EraIndex, validators: Vec<(T::AccountId, u32)>)` transaction from their
**controller** key, where:

- `era` is the era for which that the nominator is claiming rewards.
- `validators` is a list of tuples of:
  - Validator stash account IDs that the nominator was nominating during `era`, and
  - The nominator's index in the list of nominators for that validator for that era.

Providing the index eliminates search and allows for a lower transaction fee.

These details are handled for you automatically if you use the
[polkadot.js UI](https://polkadot.js.org/apps/#/staking/actions).

## F.A.Q. and Cautionary Notes

1. **Caution:** Once a user claims rewards for an era, all reward information for that user for
   previous eras is removed. Regular users should not construct these transactions themselves, but
   should use a wallet or front end that safely claims in the correct order.
1. Rewards expire after 84 eras. On Polkadot, that's about 84 days. On Kusama, it is approximately
   21 days.
1. Users must use their **controller** key to claim payouts. The **stash** key should remain in cold
   storage.
1. Claiming rewards (or neglecting to claim rewards) does not affect nominations in any way.
   Nominations will persist after claiming rewards or the rewards expire.
1. Polkadot provides a `batch` function under the Utility pallet that allows the user to batch
   several transactions into a single transaction _from the same origin._ Therefore, users can use
   this function to claim rewards for several eras for a single validator or nominator.
1. Rewards are not minted until they are claimed. Therefore, if your reward destination is "stash,
   increasing amount at stake", then your staked amount does not reflect your rewards until you
   claim them. If you want to maximize compounding, then you will need to claim often.

## Future Plans

This scheme protects against malicious nominators, but is difficult for UX and especially hurts
smaller nominators who would rather be passive participants and for whom the transaction fee could
represent a non-trivial fraction of their rewards. We are actively investigating other solutions
that would, for example, let a single user trigger the payout for all nominators of a single
validator as long as that user is willing to pay the transaction fee.
