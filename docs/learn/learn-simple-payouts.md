---
id: learn-simple-payouts
title: Simple Payouts
sidebar_label: Simple Payouts
description: An overview of how payouts work for those staking.
slug: ../learn-simple-payouts
---

Polkadot and Kusama make stakers claim their rewards for past eras by submitting a transaction. This
naturally leads to spreading out reward distribution, as people make transactions at disparate
times, rather than updating the accounts of all stakers in a single block.

Even if everyone submitted a reward claim at the same time, the fact that they are individual
transactions would allow the block construction algorithm to process only a limited number per block
and ensure that the network maintains a constant block time. If all rewards were sent out in one
block, this could cause serious issues with the stability of the network.

Simple payouts require one transaction per validator, per [era](../general/glossary.md##era), to claim rewards.
The reason Polkadot requires this is to avoid an attack where someone has several thousand accounts
nominating a single validator. The major cost in reward distribution is mutating the accounts in
storage, and Polkadot cannot pay out several thousand accounts in a single transaction.

## Claiming Rewards

Polkadot stores the last 84 eras of reward information (e.g. maps of era number to validator points,
staking rewards, nomination exposure, etc.). Rewards will not be claimable more than 84 eras after
they were earned. This means that all rewards must be claimed within a maximum of 84 eras, although
under certain circumstances (described below) this may be as low as 28 eras.

If a validator kills their stash, any remaining rewards will no longer be claimable. Before doing
this, however, they would need to first stop validating and then unbond the funds in their stash,
which takes 28 eras. If a validator were to immediately chill and start unbonding after rewards are
calculated, and nobody issued a payout for that era from that validator in the next 28 eras, the
reward would no longer be claimable.

> In order to be absolutely sure that staking rewards can be claimed, users should trigger a payout
> before 28 eras have passed.

Anyone can trigger a payout for any validator, as long as they are willing to pay the transaction
fee. Someone must submit a transaction with a validator ID and an era index. Polkadot will
automatically calculate that validator's reward, find the top {{ polkadot_max_nominators }}
nominators for that era, and distribute the rewards pro rata.

> NOTE: The Staking system only applies the highest {{ polkadot_max_nominators }} nominations to
> each validator to reduce the complexity of the staking set.

These details are handled for you automatically if you use the
[Polkadot-JS UI](https://polkadot.js.org/apps/#/staking/payout), which also allows you to submit
batches of eras at once.

To claim rewards on Polkadot-JS UI, you will need to be in the "Payouts" tab underneath "Staking",
which will list all the pending payouts for your stashes.

![pending-payouts](../assets/polkadotjs_payout_page.png)

To then claim your reward, select the "Payout all" button. This will prompt you to select your stash
accounts for payout.

![select-payouts](../assets/polkadotjs_payout_popup.png)

Once you are done with payout, another screen will appear asking for you to sign and submit the
transaction.

![transaction-payouts](../assets/polkadotjs_payout_complete.png)

## F.A.Q. and Cautionary Notes

1. Rewards expire after 84 eras. On Polkadot, that's about 84 days. On Kusama, it is approximately
   21 days. Validators should claim all pending rewards before killing their stash in the event the
   validator decides to `chill` -> `unbonds all` -> `withdraws unbonded`. Nominators will not miss
   out on rewards if they claim the pending rewards for a validator within 28 days. Essentially, the
   deadline to ensure you get staking rewards is 28 eras. If the validator verifies its intent and
   does not unbond and withdraw, the 84 era timeline holds.
2. Claiming rewards (or neglecting to claim rewards) does not affect nominations in any way.
   Nominations will persist after claiming rewards or after the rewards expire.
3. Rewards are not minted until they are claimed. Therefore, if your reward destination is "stash,
   increasing amount at stake", then your staked amount does not reflect your rewards until you
   claim them. If you want to maximize compounding, then you will need to claim often or nominate
   validators which regularly claim for you.
4. Staking operations at the end of an era are closed to allow the off-chain validator election to
   take place. See [Off-chain Phragmén](learn-phragmen.md#off-chain-phragmen) for more information.
