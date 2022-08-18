---
id: learn-staking-faq
title: Staking FAQ
sidebar_label: Staking FAQ
description: Addresses FAQ on Staking
keywords: [staking, faq, nominate]
slug: ../learn-staking-faq
---

# Staking FAQ

:::info Support pages

For a "how-to" staking guide please visit [this](https://support.polkadot.network/support/solutions/articles/65000168057-how-do-i-stake-nominate-on-polkadot-) support page.

:::

## When do I get slashed?

Slashing will happen if a validator misbehaves in the network (e.g. goes offline, attacks the network, or runs
modified software). They and their nominators will get slashed by losing a percentage
of their staked tokens. By choosing to
[nominate reliable validators](https://support.polkadot.network/support/solutions/articles/65000169507-the-role-responsibilities-of-a-polkadot-nominator),
you can minimize the risk of slashing and earn rewards for securing the network. Learn more about
slashing [here](learn-staking.md#slashing).

## Why am I not receiving staking rewards?

If you do not see staking rewards on your account, it could be due to any of the below reasons.

### Delayed staking reward payout

The [staking reward distribution](learn-simple-payouts) is not automatic and needs to be triggered
through a transaction. Typically, it is the validators who trigger the staking reward payout
transaction, but for some reason if they do not, you can claim the rewards on your own, and all the other nominators.

### Nominated validators not in the active set

If none of the validators you nominated made it to the active set in an era, you will not earn any
rewards for that era. To maximize your chance of earning staking rewards on every era, consider
nominating multiple validators (up to 16 on Polkadot).

### Nominated a validator with 100% commission

When you nominate a validator who takes 100% commission on staking rewards, you will not receive any
staking reward for the eras when your nomination is applied to that specific validator.

### Nominated an oversubscribed validator

Only the top 256 nominators of a Validator receive the staking rewards. If your nomination is
applied to an oversubscribed validator and the size of your stake does not put you in the top 256, you will not
earn rewards. On a regular basis, ensure that the validators you chose are not oversubscribed or that your stake is bigger than the stake of the last nominator.

### Min-Active Nomination Threshold is not met

With the [bags-list implementation](https://github.com/paritytech/substrate/pull/9507), the minimum
stake threshold to earn staking rewards can change with each era. Do not confuse this with
min-intention-threshold (10 DOT) which is required to submit your intention to nominate. The network
supports 50,000 nominator intentions, but can reward at most 22500 nominators in any given era. If
you nominate with, say 50 DOT, you are not guaranteed to be part of the top 22500 and hence you may
not earn staking rewards. The entry barrier to be an electing nominator is now determined
dynamically, based on market demand. 

The nominator intentions (up to 50,000) serve as a waitlist for the electing subset (22,500) which
receives rewards in each era. Having more number of nominator intentions than the electing subset
allows for the dynamic staking system to have some flexibility. For example, assume the top 1000
nominators all unbond their stake, having that extra buffer of nomination intentions becomes useful.

:::info If your account is in the last bag receiving staking rewards

Within the context of a single bag, nodes are not sorted by their stake, but instead placed in insertion 
order. Accounts can put themselves in front of other accounts with lower stake in the same bag using the 
`bagsList.putInFrontOf` extrinsic. It's important to note that this process only puts you in front of
an account that has lower stake in the same bag. Check this [support article](https://support.polkadot.network/support/solutions/articles/65000181018-i-have-more-than-the-minimum-bonded-but-i-m-not-getting-rewards) for instructions.

:::

## Any plans to reward every single nominator?

With the current implementation, the optimal election solution of the complex graph of nominator and
validator mappings needs to be evaluated within a single block execution time on Polkadot network.
Based on the network benchmarks, 22,500 is chosen as a conservative estimate for the maximum number
of nominators in the staking election solution. As maximizing the total stake on the network is one
of the key objectives, this mechanism favors the nominators with higher stakes.

To make sure every nominator gets rewarded, the immediate solution being worked on is the implementation of [nomination pools](learn-nomination-pools.md), which is already available on Kusama. There are also proposals to perform
[multi-block election and having a dedicated common-good parachain for NPoS](https://github.com/paritytech/substrate/issues/9511)
on Polkadot.
