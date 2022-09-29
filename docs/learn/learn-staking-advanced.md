---
id: learn-staking-advanced
title: Advanced Staking
sidebar_label: Advanced Staking
description: Learn about Staking Proxies, Bags list, Staking Rewards and Slashing
keywords: [staking, stake, nominate, nominating, NPoS, proxies]
slug: ../learn-staking-advanced
---

import RPC from "./../../components/RPC-Connection";

This page is meant to be an advanced guide to staking with
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}.

## Pallets and Extrinsics

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} is built using
[substrate](https://substrate.io/), a modular system to efficiently build blockchains. Within each
module or **pallet**, one can **call** different functions that have similar logic. You can explore
substrate pallets on [this dedicated page](https://docs.substrate.io/reference/frame-pallets/). For
example, the staking pallet contains all functionalities related to staking such as bonding or
unbonding funds. The combined information of pallets and calls constitutes an **extrinsic**, i.e. a
transaction that is executed from outside the chain but that triggers an event on the chain.
Continuing with the staking example, within the staking pallet a nominator can bond funds and
nominate some validators. The signature of such extrinsic might lead to an event on the chain such
as a reward payout to that nominator at the end of an era; this is an event inside the chain.

## Staking Proxies

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} makes it possible to create accounts
having special permissions also called **proxy accounts**. For mode details about proxy accounts
visit the [dedicated page](./learn-proxies.md) on this wiki.

![staking](../assets/staking/stash-stakingProxy.png)

Proxy accounts are special accounts which can sign [**extrinsic calls**](#pallets-and-extrinsics)
made to specific [**pallets**](#pallets-and-extrinsics) on behalf of the proxied account. There is
thus the possibility to create staking proxy accounts that can be used to sign only extrinsic calls
to staking, session and utility pallets. This makes the stash account even more isolated than using
a controller account since one can bond / unbond / bond more funds using the staking proxy account.
However, it is important to remember that actions that can be performed by the proxy accounts are
limited, and in the case of staking proxy, extrinsic calls to the balances pallet cannot be signed.
This means it is not possible to do balance transfers on the proxied account through a staking
proxy.

## Bags List

The nomination intents are placed in a so-called
[bags-list](https://github.com/paritytech/substrate/pull/9507).
{{ kusama: The bags list example below uses DOT for explaining the concepts. :kusama }}The bags list
has two primary components, bags and nodes. The list is composed of bags that each describe a range
of active bonded funds (e.g. the 1st bag will have nominators who staked 0 → 10 DOT, 2nd bag 11 → 20
DOT, etc). Each bag contains nodes that correspond to nominators and their staked funds.

The bags-list pallet is designed to be self-maintaining, with minimal effort from the blockchain,
making it extremely scalable. Let us explore the sorting functionality of the bags list with an
example. In the bags list below, there are 8 nodes (corresponding to 8 accounts with staked funds)
placed in 3 bags. It can be observed that the list of nodes within the bags is arranged based on
their insertion order and not based on the number of tokens bonded. For instance, the nodes in bag 1
are arranged in this order: 15 → 12 → 19.

![bags list example 1](../assets/staking/bags-list-example-1.png)

Let's say the nominator with the stake of 19 DOT bonds 2 DOT additionally. This action would place
that nominator node in bag 2, right after the node with 27 DOT.

![bags list example 2](../assets/staking/bags-list-example-2.png)

Once the nomination period ends, the NPoS election mechanism takes the nomination intents and their
associated votes as input, and it outputs a set of validators. The bags are iterated from the most
staked to the least staked. This could leave the last touched bag to only be partially iterated.
This means that in some edge cases, the order of members within a bag is also important. Recall that
within each bag, the iteration order is simply the insertion order. If only 7 nodes must be picked
for the electing set, the nodes with 5 and 7 DOT will be selected while the node with 8 DOT will be
left out.

![bags list example 3](../assets/staking/bags-list-example-3.png)

If one receives staking rewards and the amount of staked tokens within the stash account increases
over time, the position within a bag changes and may also result in a change of bag. This may also
happen if accounts within the bag bond more tokens or unbond tokens, one's account position and the
position of other accounts in the bags list might change. These changes are not done automatically,
requiring the nominator to submit the permissionless extrinsic `rebag` within the `voterList` pallet
to update their position. This allows anyone to specify another account that is in the wrong bag,
and place it in the correct one. The `voterList` pallet also comes with the extrinsic `putInFrontOf`
which helps the node to move up in the bag. Actions like bonding/unbonding tokens automatically
rebags the nominator node, but events like staking rewards/slashing do not. See the
[bags-list](learn-nominator.md#bags-list) section for more information.

This sorting functionality using bags is extremely important for the
[long-term improvements](https://gist.github.com/kianenigma/aa835946455b9a3f167821b9d05ba376) of the
staking/election system. The bags-list is capable of including an unlimited number of nodes, subject
to the chain's runtime storage. In the current staking system configuration, the bags list keeps
{{ polkadot: <RPC network="polkadot" path="query.staking.maxNominatorsCount" defaultValue={50000}/> :polkadot }}
{{ kusama: <RPC network="kusama" path="query.staking.maxNominatorsCount" defaultValue={20000}/> :kusama }}
nomination intents, of which, at most
{{ polkadot: <RPC network="polkadot" path="query.electionProviderMultiPhase.maxElectingVoters" defaultValue={22500}/> :polkadot }}{{ kusama: <RPC network="kusama" path="query.electionProviderMultiPhase.maxElectingVoters" defaultValue={20000}/> :kusama }}
come out as the electing nominators. See
[Staking Election Stages](learn-nominator.md#staking-election-stages) section for more info.

:::caution Minimum active nomination threshold to earn rewards is dynamic

Once again, submitting a nomination intent does not guarantee staking rewards. The stake of the top
{{ polkadot: <RPC network="polkadot" path="query.electionProviderMultiPhase.maxElectingVoters" defaultValue={22500}/> :polkadot }}{{ kusama: <RPC network="kusama" path="query.electionProviderMultiPhase.maxElectingVoters" defaultValue={20000}/>  :kusama }}
nominators is applied to the validators in the active set. To avail of staking rewards, ensure that
the number of tokens bonded is higher than the minimum active nomination. For more information, see
the [nominator guide](learn-nominator.md)

:::

The "election solution" which is a connected graph between nominators and validators with the stake
as edge weights, has to meet certain requirements, such as maximizing the amount of stake to
nominate validators and distributing the stake backing validators as evenly as possible. The
objectives of this election mechanism are to maximize the security of the network, and achieve fair
representation of the nominators. If you want to know more about how NPoS works (e.g. election,
running time complexity, etc.), please read
[here](http://research.web3.foundation/en/latest/polkadot/NPoS.html).

## Rewards Distribution

:::info

The general rule for rewards across validators is that two validators get paid essentially the same
amount of tokens for equal work, i.e. they are not paid proportional to their total stakes. There is
a probabilistic component to staking rewards in the form of
[era points](../maintain/maintain-guides-validator-payout.md##era-points) and
[tips](learn-transaction-fees.md#fee-calculation) but these should average out over time.

:::

Validators are paid the same regardless of stake backing them. Validators with less stake will
generally pay more to nominators per-token than the ones with more stake. This gives nominators an
economic incentive to gradually shift their preferences to lower-staked validators that gain a
sufficient amount of reputation. A consequence of this is that the stake across validators will be
as evenly distributed as possible which avoids concentration of power among a few validators. In the
long term, validators will have similar levels of stake, with the stake being higher for validators
with higher reputation. A nominator who is willing to risk more by backing a validator with a lower
reputation will get paid more, provided there are no slashing events.

Before distributing rewards to nominators, validators can create a cut of the reward (a commission)
that is not shared with the nominators. This cut is a percentage of the block reward, not an
absolute value. After the commission gets deducted, the remaining portion is distributed pro-rata
based on their staked value and split between the validator and all of the nominators whose stake
has backed this validator.

For example, assume the block reward for a validator is 10 DOT. A validator may specify
`validator_commission = 50%`, in which case the validator would receive 5 DOT. The remaining 5 DOT
would then be split between the validator and their nominators based on the proportion of stake each
nominator had. Note that for this calculation, validator's self-stake acts just as if they were
another nominator.

Thus, a percentage of the reward goes thus to pay the validator's commission fees and the remainder
is paid pro-rata (i.e. proportional to stake) to the nominators and validator. If a validator's
commission is set to 100%, no tokens will be paid out to any of the nominators. Notice in particular
that the validator is rewarded twice: once in commission fees for validating (if their commission
rate is above 0%), and once for nominating itself with own stake.

The following example should clarify the above. For simplicity, we have the following assumptions:

- These validators do not have a stake of their own.
- They each receive the same number of era points.
- There are no tips for any transactions processed.
- They do NOT charge any commission fees.
- Total reward amount is 100 DOT tokens.
- The current minimum amount of DOT to be a validator is 350 (note that this is _not_ the actual
  value, which fluctuates, but merely an assumption for purposes of this example; to understand how
  the actual minimal stake is calculated, see
  [here](../general/faq.md#what-is-the-minimum-stake-necessary-to-be-elected-as-an-active-validator)).

|               | **Validator A** |                             |         |
| :-----------: | :-------------: | :-------------------------: | :-----: |
| Nominator (4) |   Stake (600)   | Fraction of the Total Stake | Rewards |
|      Jin      |       100       |            0.167            |  16.7   |
|    **Sam**    |       50        |            0.083            |   8.3   |
|     Anson     |       250       |            0.417            |  41.7   |
|     Bobby     |       200       |            0.333            |  33.3   |

|               | **Validator B** |                             |         |
| :-----------: | :-------------: | :-------------------------: | :-----: |
| Nominator (4) |   Stake (400)   | Fraction of the Total Stake | Rewards |
|     Alice     |       100       |            0.25             |   25    |
|     Peter     |       100       |            0.25             |   25    |
|     John      |       150       |            0.375            |  37.5   |
|   **Kitty**   |       50        |            0.125            |  12.5   |

_Both validators A & B have 4 nominators with a total stake 600 and 400 respectively._

Based on the above rewards distribution, nominators of validator B get more rewards per DOT than
those of validator A because A has more overall stake. Sam has staked 50 DOT with validator A, but
he only gets 8.3 in return, whereas Kitty gets 12.5 with the same amount of stake.

To estimate how many tokens you can get each month as a nominator or validator, you can use this
[tool](https://www.stakingrewards.com/earn/polkadot/calculate) as a reference and play around with
it by changing some parameters (e.g. how many days you would like to stake with your DOT, provider
fees, compound rewards, etc.) to have a better estimate. Even though it may not be entirely accurate
since staking participation is changing dynamically, it works well as an indicator.

#### Oversubscription, Commission Fees & Slashes

There is an additional factor to consider in terms of rewards. While there is no limit to the number
of nominators a validator may have, a validator does have a limit to how many nominators to which it
can pay rewards. In {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} this limit is
currently
{{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={256}/> :polkadot }}{{ kusama: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={256}/> :kusama }},
although this can be modified via runtime upgrade. A validator with more than
{{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={256}/> :polkadot }}{{ kusama: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={256}/> :kusama }}
nominators is _oversubscribed_. When payouts occur, only the top
{{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={256}/> :polkadot }}
nominators as measured by the amount of stake allocated to that validator will receive rewards. All
other nominators are essentially "wasting" their stake - they used their nomination to elect that
validator to the active stake, but receive no rewards in exchange for doing so.

Note that the network slashes a validator for a misbehavior (e.g. validator offline, equivocation,
etc.) the slashed amount is a fixed percentage (and not a fixed amount), which means that validators
with more stake get slashed more DOT. Again, this is done to provide nominators with an economic
incentive to shift their preferences and back less popular validators whom they consider to be
trustworthy.

Also, note that each validator candidate is free to name their desired commission fee (as a
percentage of rewards) to cover operational costs. Since validators are paid the same, validators
with lower commission fees pay more to nominators than validators with higher fees. Thus, each
validator can choose between increasing their fees to earn more, or decreasing their fees to attract
more nominators and increase their chances of being elected. In the long term, we expect that all
validators will need to be cost-efficient to remain competitive, and that validators with higher
reputation will be able to charge slightly higher commission fees (which is fair).

## Slashing

### Unresponsiveness

For every session, validators will send an "I'm online" heartbeat to indicate they are live. If a
validator produces no blocks during an epoch and fails to send the heartbeat, it will be reported as
unresponsive. Slashing may occur depending on the repeated offenses and how many other validators
were unresponsive or offline during the epoch.

Validators should have a well-architected network infrastructure to ensure the node runs to reduce
the risk of slashing or chilling. A high availability setup is desirable, preferably with backup
nodes that kick in **only once the original node is verifiably offline** (to avoid double-signing
and being slashed for equivocation - see below). A comprehensive guide on validator setup is
available [here](../maintain/maintain-guides-secure-validator.md).

Here is the formula for calculating slashing due to unresponsiveness:

    Let x = offenders, n = total no. validators in the active set

    min((3 * (x - (n / 10 + 1))) / n, 1) * 0.07

The examples demonstrate how to calculate the slashing penalty for unresponsiveness.

:::note

In all of the examples, assume that there are 100 validators in the active set.

:::

No slashing would enact if < 10% of all validators are unresponsive.

For example, if exactly 10 validators were unresponsive, the expression 3 _ (x - (n / 10 + 1))) / n
would be 3 _ (10 - (100 / 10 + 1)) / 100 = 3 \* (10 - (10 + 1)) / 100 = -0.03 which is rounded to 0.

:::note

The minimum value between 0 and 1 is 0. 0 multiplied by 0.07 is 0.

:::

If 14 validators are unresponsive, then slashing would occur, as > 10% of validators are
unresponsive.

The slashing penalty would be min((3 _ (14 - (100 / 10 + 1))) / 100, 1) _ 0.07 = min((3 _ (14 -
11))/100, 1) _ 0.07 = min(0.09, 1) \* 0.07 = 0.6%

Similarly, if one-third of the validator set (around 33/100) are unresponsive, the slashing penalty
would be about 5%.

The maximum slashing that can occur due to unresponsiveness is 7%. After around 45% of the
validators go offline, the expression 3 _ (x - (n / 10 + 1))) / n will go beyond 1. Hence, min((3 _
(x - (n / 10 + 1))) / n, 1) \* 0.07 will be ceiled to 7%.

### Equivocation

**GRANDPA Equivocation**: A validator signs two or more votes in the same round on different chains.

**BABE Equivocation**: A validator produces two or more blocks on the Relay Chain in the same time
slot.

Both GRANDPA and BABE equivocation use the same formula for calculating the slashing penalty:

    Let x = offenders, n = total no. validators in the active set

    min( (3 * x / n )^2, 1)

As an example, assume that there are 100 validators in the active set, and one of them equivocates
in a slot (for our purposes, it does not matter whether it was a BABE or GRANDPA equivocation). This
is unlikely to be an attack on the network, but much more likely to be a misconfiguration of a
validator. The penalty would be min(3 \* 1 / 100)^2, 1) = 0.0009, or a 0.09% slash for that
validator (i.e., the stake held by the validator and its nominators).

Now assume that there is a group running several validators, and all of them have an issue in the
same slot. The penalty would be min((3 \* 5 / 100)^2, 1) = 0.0225, or a 2.25% slash. If 20
validators equivocate, this is a much more serious offense and possibly indicates a coordinated
attack on the network, and so the slash will be much greater - min((3 \* 20 / 100)^2, 1) = 0.36, or
a 36% slash on all of these validators and their nominators. All slashed validators will also be
chilled.

From the example above, the risk of nominating or running many validators in the active set are
apparent. While rewards grow linearly (two validators will get you approximately twice as many
staking rewards as one), slashing grows exponentially. A single validator equivocating causes a
0.09% slash, two validators equivocating does not cause a 0.09 \* 2 = 0.18% slash, but rather a
0.36% slash - 4x as much as the single validator.

Validators may run their nodes on multiple machines to make sure they can still perform validation
work in case one of their nodes goes down, but validator operators should be extremely careful in
setting these up. If they do not have good coordination to manage signing machines, equivocation is
possible, and equivocation offenses are slashed at much higher rates than equivalent offline
offenses.

If a validator is reported for any one of the offenses they will be removed from the validator set
([chilled](#chilling)) and they will not be paid while they are out. They will be considered
inactive immediately and will lose their nominators. They need to re-issue intent to validate and
again gather support from nominators.

### Slashing Across Eras

There are 3 main difficulties to account for with slashing in NPoS:

- A nominator can nominate multiple validators and be slashed via any of them.
- Until slashed, the stake is reused from era to era. Nominating with N coins for E eras in a row
  does not mean you have N\*E coins to be slashed - you've only ever had N.
- Slashable offenses can be found after the fact and out of order.

To balance this, we only slash for the maximum slash a participant can receive in some time period,
rather than the sum. This ensures protection from overslashing. Likewise, the period over which
maximum slashes are computed is finite and the validator is chilled with nominations withdrawn after
a slashing event, as stated in the previous section. This prevents rage-quit attacks in which, once
caught misbehaving, a participant deliberately misbehaves more because their slashing amount is
already maxed out.

## Inflation

{{ polkadot: DOT is inflationary; there is no maximum number of DOT. Inflation is designed
to be approximately 10% annually, with validator rewards being a function of the amount staked
and the remainder going to the treasury. The current token supply of DOT is ~1,000,000,000, as
a result of [redenomination](../general/redenomination.md). :polkadot }}

{{ kusama: KSM is inflationary; there is no maximum number of KSM. Inflation is designed
to be approximately 10% annually, with validator rewards being a function of the amount staked
and the remainder going to the treasury. The current token supply of KSM is ~10,000,000. :kusama }}

There is an _ideal staking rate_ that the network tries to maintain. The goal is to have the _system
staking rate_ meet the _ideal staking rate_.

The system staking rate would be the total amount staked over the total token supply, where the
total amount staked is the stake of all validators and nominators on the network. The ideal staking
rate accounts for having sufficient backing of {{ polkadot: DOT :polkadot }}
{{ kusama: KSM :kusama }} to prevent the possible compromise of security while keeping the native
token liquid. An **ideal staking rate of 50% stabilizes the network**.
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} is inflated according to the system staking
rate of the entire network.

:::info

According to the inflation model, this would suggest that if you do not use your
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} for staking, your tokens dilute over time.

:::

The ideal staking rate on Polkadot also varies with the number of parachains (50% is the current
estimation of all DOT that should be staked, per parachain slot).

:::info Staking rate without parachains

In the **absence of parachains, the suggested ideal staking rate is 75%**, as liquidity is not
constrained by locked parachain bonds.

:::

If the amount of tokens staked goes below the ideal rate, then staking rewards for nominators goes
up. On the contrary, if it goes above, staking rewards drop. This is a result of the change in the
percentage of staking rewards that go to the Treasury.

![staking](../assets/NPoS/staking-participation-rate.png)

<p style={{textAlign:"center"}}>Source: <a href="https://w3f-research.readthedocs.io/en/latest/polkadot/overview/2-token-economics.html">Research - Web3 Foundation</a></p>

- **x-axis**: Proportion of {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} staked
- **y-axis**: Inflation, annualized percentage
- **Blue line**: Inflation rewards to stakers
- **Green line**: Staker rate of return

You can determine the inflation rewards by looking at the top bar of the staking overview on
[Polkadot-JS UI](https://polkadot.js.org/apps/#/staking).

The above chart shows the inflation model of the network. Depending on the staking participation,
the distribution of the inflation to validators/nominators versus the treasury will change
dynamically to provide incentives to participate (or not participate) in staking.

For instance, assuming that the ideal staking rate is 50%, all of the inflation would go to the
validators/nominators if 50% of all KSM / DOT are staked. Any deviation from the 50% - positive or
negative - sends the proportional remainder to the treasury and effectively reduces staking rewards.

For those who are interested in knowing more about the design of the inflation model for the
network, please see
[here](https://w3f-research.readthedocs.io/en/latest/polkadot/overview/2-token-economics.html).
