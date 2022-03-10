---
id: learn-staking-faq
title: Staking FAQ
sidebar_label: Staking FAQ
description: Addresses FAQ on Staking
slug: ../learn-staking-faq
---


# Staking FAQ

## 1. How do I stake my DOT?

Thanks for considering to nominate and stake your DOT to secure the Polkadot Network and its parachains. The success of Nominated Proof of Staking (NPoS) relies on well informed nominators. To directly submit your intent to stake on Polkadot, you should

-  have an account on a [non-custodial wallet](../build/build-wallets.md) that supports staking. If you are a beginner, watch this tutorial on [creating an account on Polkadot-JS Extension](https://youtu.be/sy7lvAqyzkY).
-  have more DOT than min-intention-threshold. This is a strict threshold decided by the chain protocol, which is now 10 DOT.
-  bond and nominate your DOT to Validators who are accepting nominations (you can choose up to 16). Read this article on [how to choose validators](https://support.polkadot.network/support/solutions/articles/65000150130).

You will earn rewards when your stake is applied to one or multiple validators that enter the active set through NPoS election, which comes into effect in the next era. If you are a beginner and would like to securely stake your tokens using Polkadot-JS Apps, watch the video below

[![Staking on Polkadot JS](https://img.youtube.com/vi/FCXC0CDhyS4/0.jpg)](https://youtu.be/FCXC0CDhyS4)

If you choose to stake through custodial services like central exchanges, you may not have to follow the steps above. By staking through the custodial services, you place your trust in them to act in the best interests of you and the network. Make sure you thoroughly read the terms and conditions to understand the risks associated with the respective custodial staking service. (Not your keys, Not your tokens!).

## 2. When do I get slashed?

Slashing will happen if a validator misbehaves (e.g. goes offline, attacks the network, or runs modified software) in the network. They and their nominators will get slashed by losing a percentage of their staked DOT. By choosing to [nominate reliable validators](https://support.polkadot.network/support/solutions/articles/65000169507-the-role-responsibilities-of-a-polkadot-nominator), you can minimize the risk of slashing and earn rewards for securing the network. Learn more about slashing [here](learn-staking.md#slashing)

## 3. Why am I not receiving staking rewards?

If you do not see staking rewards on your account, it could be due to any of the below reasons.

### Delayed staking reward payout

The [staking reward distribution](learn-simple-payouts) is not automatic and needs to be triggered through a transaction. Typically, it is the validators who trigger the staking reward payout transaction, but for some reason if they do not, you can claim the rewards on your own. 

### Nominated validators not in the active set

If none of the validators you nominated made it to the active set in an era, you will not earn any rewards for that era. To maximize your chance of earning staking rewards on every era, consider nominating multiple validators (up to 16 on Polkadot).

### Nominated a validator with 100% commission

When you nominate a validator who takes 100% commission on staking rewards, you will not receive any staking reward for the eras when your nomination is applied to that specific validator.

### Nominated an oversubscribed validator

Only the top 256 nominators of a Validator receive the staking rewards. If your nomination is applied to an oversubscribed Validator and your stake does not put you in the top 256, you will not earn rewards. On a regular basis, ensure that the Validators you chose are not oversubscribed.

### Min-Active Nomination Threshold is not met

With the [bags-list implementation](https://github.com/paritytech/substrate/pull/9507), the minimum stake threshold to earn staking rewards can change with each era. Do not confuse this with min-intention-threshold (10 DOT) which is required to submit your intention to nominate. The network supports 50,000 nominator intentions, but can reward only up to 22500 nominators in any given era. If you nominate with, say 50 DOT, you are not guaranteed to be part of the top 22500 and hence you may not earn staking rewards. The entry barrier to be an electing nominator is now determined dynamically, based on market demand.

The nominator intentions (up to 50,000) serve as a waitlist for the electing subset (22,500) which receives rewards in each era. Having more number of nominator intentions than the electing subset allows for the dynamic staking system to have some flexibility. For example, assume the top 1000 nominators all unbond their stake, having that extra buffer of nomination intentions becomes useful.


## 4. Any plans to reward every single nominator?

Yes! Polkadot's staking system is among the most complex in the blockchain ecosystem. The relay chain's validator set is securing not just the state transition of the relay chain itself, but also a potentially large number of parallel chains, or parachains for short. Since security is its main goal, Polkadot has been designed with a complex, and strict staking system, optimized for locking the most amount of tokens at stake while spreading that stake as evenly as possible to maximize decentralization - all with the goal of effectively minimizing the possibility of the validator set becoming compromised. 

With the current implementation, the optimal election solution of the complex graph of nominator and validator mappings needs to be evaluated within a single block execution time on Polkadot network. Based on network benchmarks, 22,500 is chosen as a conservative estimate for the maximum number of nominators in the staking election solution. As maximizing the total stake on the network is one of the key objectives, this mechanism favors the nominators with higher stakes. 

To make sure every nominator gets rewarded, the immediate solution being worked on is Nomination/Staking pools, which are still in progress [here](https://github.com/paritytech/substrate/pull/10694). There are also proposals to perform [multi-block election and having a dedicated common-good parachain for NPoS](https://github.com/paritytech/substrate/issues/9511) on Polkadot. 





