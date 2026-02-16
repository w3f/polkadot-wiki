---
title: Monitoring Staking Rewards
description: Understand how staking rewards are calculated, distributed, and claimed on Polkadot.
---

!!!info "Support Guides"
    For step-by-step guides on managing your staking rewards, visit the [Polkadot Support Portal](https://support.polkadot.network/support/solutions/articles/65000168954).

## How Staking Rewards Work

Polkadot distributes staking rewards to validators and their nominators at the end of each
**era** (approximately 24 hours on Polkadot, 6 hours on Kusama). The total reward for each era is
determined by the network's inflation model and the total amount of DOT staked.

### Equal Validator Payouts

An important feature of Polkadot's reward system is that all validators in the active set earn
roughly the same total reward within each era, regardless of their total stake. This is designed to
give smaller validators the same economic incentive as larger ones. It also offers a higher return
to nominators who back smaller validators, helping to decentralize the network.

### Commission

Before distributing rewards to nominators, a validator deducts their **commission**. This is a
percentage set by the validator. For example, if a validator earns 10 DOT in rewards and has a 10%
commission, the validator keeps 1 DOT and distributes the remaining 9 DOT to nominators.

### Pro-Rata Distribution

After commission is deducted, the remaining rewards are split among the validator's nominators in
proportion to each nominator's share of the total backed stake. A nominator who contributes a larger
share of the validator's total backing receives a proportionally larger reward.

### Era Points

**Era points** determine how a validator's performance compares to other validators within the same
era. Validators earn era points by producing blocks, including transactions, performing parachain
validation duties, and other actions. Validators with more era points will earn slightly higher
rewards than others in the same era.

## Claiming Rewards

Staking rewards on Polkadot use a "lazy payout" system. Rewards are not automatically sent to your
account at the end of each era. Instead, they must be explicitly claimed by triggering a payout
transaction.

Any account can trigger the payout for a validator, and the rewards will be distributed to the
validator and all their nominators. In practice, validators typically trigger payouts on behalf of
themselves and their nominators, but this is not guaranteed.

!!!warning "Rewards Expire"
    Unclaimed rewards expire after **84 eras** (approximately 84 days on Polkadot). If rewards are
    not claimed within this window, they are lost. Monitor your rewards regularly and claim them
    if your validators are not doing so.

## Reward Destination

When you set up your nomination, you choose a **reward destination**, which determines where your
claimed rewards are sent. The options are:

- **Stash account (compounding)**: Rewards are added to your bonded balance, increasing your stake
  and future rewards.
- **Stash account (not compounding)**: Rewards are sent to your stash account as free (transferable)
  balance.
- **Specified account**: Rewards are sent to a different account of your choosing.

You can change your reward destination at any time. For instructions, see
[Staking Dashboard: How to Change the Reward Destination](https://support.polkadot.network/support/solutions/articles/65000182220).

## Resources

- [Why am I not getting staking rewards?](https://support.polkadot.network/support/solutions/articles/65000170805) (Support)
- [How can I see my staking rewards?](https://support.polkadot.network/support/solutions/articles/65000168954) (Support)
- [Staking on Polkadot](../../knowledge-base/staking-advanced.md) (Knowledge Base)
