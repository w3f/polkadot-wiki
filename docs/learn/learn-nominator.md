---
id: learn-nominator
title: Nominator
sidebar_label: Nominator
description: Role of Nominators in the Polkadot Ecosystem.
keyword: [nominate, nominator, stake, staking]
slug: ../learn-nominator
---

import RPC from "./../../components/RPC-Connection";

:::tip New to Staking?

Start your staking journey or explore more information about staking on
[Polkadot's Home Page](https://polkadot.network/staking/). You can learn how staking works by
reading [this dedicated page](../learn/learn-staking.md).

Discover the new [**Staking Dashboard**](https://staking.polkadot.network/#/overview) that makes
staking much easier and check this
[extensive article list](https://support.polkadot.network/support/solutions/articles/65000182104) to
help you get started.
{{ polkadot: You can now [stake natively with just 1 DOT and earn staking rewards](https://polkadot.network/blog/nomination-pools-are-live-stake-natively-with-just-1-dot/). :polkadot }}
{{ kusama: All the examples presented on Polkadot also apply to Kusama. :kusama }}

:::

:::info Stake through Nomination Pools

The minimum amount required to become an active nominator and earn rewards may change from era to
era.
{{ polkadot: It is currently __<RPC network="polkadot" path="query.staking.minimumActiveStake" defaultValue={2937000000000} filter="humanReadable"/>__. :polkadot }}
{{ kusama: It is currently __<RPC network="kusama" path="query.staking.minNominatorBond" defaultValue={100000000000} filter="humanReadable"/>__. :kusama }}
If you have less {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} than the minimum active
nomination and still want to participate in staking, you can join the nomination pools. You can now
stake on {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} natively with just
{{ polkadot: __<RPC network="polkadot" path="query.nominationPools.minJoinBond" filter="humanReadable" defaultValue={10000000000}/>__ :polkadot }}
{{ kusama: __<RPC network="kusama" path="query.nominationPools.minJoinBond" filter="humanReadable" defaultValue={1666666650}/>__ :kusama }}
in the nomination pools and earn staking rewards. For additional information, see
[this blog post](https://polkadot.network/blog/nomination-pools-are-live-stake-natively-with-just-1-dot/).
Check the wiki doc on [nomination pools](learn-nomination-pools.md) for more information.

:::

If you landed on this page, you decided to understand how you can be a good nominator. Note, this
page is not for [nomination pool](./learn-nomination-pools.md) members, although pool members might
gain essential knowledge about how to choose nomination pools.

The information provided on this page is complementary to that on the
[**Staking Page**](./learn-staking.md) and [**Advanced Staking Page**](./learn-staking-advanced.md).
Make sure you read those pages as well before nominating.

## Who are Nominators?

Nominators are one type of participant in the staking subsystem of
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}. They appoint their stake to the
validators, the second type of participant. By appointing their stake, they can elect the active set
of validators and share in the rewards that are paid out.

While the [validators](../maintain/maintain-guides-how-to-validate-polkadot.md) are active
participants in the network that engage in the block production and finality mechanisms, nominators
take a slightly more passive role. Being a nominator does not require running a node of your own or
worrying about online uptime. However, a good nominator performs due diligence on the validators
that they elect. When looking for validators to nominate, a nominator should pay attention to their
own reward percentage for nominating a specific validator - as well as the risk that they bear of
being [slashed](./learn-staking.md#slashing) if the validator gets slashed.

## Why Nominate?

- You become part of the {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} movement, a
  group of diverse professionals and enthusiasts around the world aspiring to build and foster the
  next-gen Internet, Web3: a decentralized, privacy-focused, and trustless internet.
- You are an essential piece of the puzzle, keeping
  {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} secure. The bonded balance can be
  used to vote in [Polkadot OpenGov](./learn-polkadot-opengov.md) and shape the future direction of
  {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}.
- You will start to understand how {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}
  works at a technical-level. When you feel comfortable with your nomination skills and knowledge,
  you can open your [nomination pool](./learn-nomination-pools.md), help others secure the network
  and earn rewards, and build your reputation as a trusted nomination pool operator. If you like to
  be more involved, the next step is to become a [validator](./learn-validator.md).
- By getting [staking](./learn-staking.md) rewards you keep up with or (likely) stay ahead of
  {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} inflation.

Nominators secure the Relay Chain by staking {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}
and nominating validators. You may have an account with
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} and want to earn fresh
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}. You could do so as a validator, which
requires experience setting up a node and running and maintaining it 24/7.

On {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} you can also earn
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} by nominating one or more validators. Doing
so makes you a nominator for the validator(s) you chose. Pick your validators carefully - if they do
not behave properly, they will get slashed, and you will lose
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}. However, if they follow the network rules,
you can share the staking rewards they generate.

While your {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} are staked for nominations, they
are 'locked' (bonded). You can
[stop nominating at any time](./learn-guides-staking.md#stop-nominating), but remember that the
action is effective in the next era and does not automatically unbond your funds. Unbonding is a
separate action, and it takes effect after the unbonding period, which is
{{ polkadot: 28-day long on Polkadot :polkadot }}{{ kusama: 7-day long on Kusama :kusama }}. This is
calculated by taking the **bonding duration** (in eras), multiplying it by the **length of a single
era** (in hours), and dividing by the **hours in a day** (24). Example:
({{ polkadot: 28 × 24 ÷ 24 = 28 days :polkadot }}{{ kusama: 28 × 6 ÷ 24 = 7 days :kusama }}). A
staking lock will be visible on the Polkadot-JS UI during the unbonding period, and after it, the
staking lock can be unlocked, and the bonded funds become free balance you can transfer.

:::info Fast Unstaking

If you accidentally bonded your {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} or your
bonded {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} never backed any active validator, you
can now unbond them immediately.

:::

If your bonded balance did not back any validators in the last
{{ polkadot: 28 days on Polkadot (when the feature goes live) :polkadot }}{{ kusama: 7 days on Kusama :kusama }},
you are eligible to perform fast unstaking. The
[staking dashboard](https://staking.polkadot.network/#/overview) will automatically check if you
qualify. For more information, visit the
["Fast Unstake" section in this support article](https://support.polkadot.network/support/solutions/articles/65000169433-can-i-transfer-dot-without-unbonding-and-waiting-28-days-).

## Setting-up Accounts

### Stash & Staking Proxy

Nominators are recommended to set up separate stash and staking proxy accounts. Explanation and the
reasoning for generating distinct accounts for this purpose is elaborated in the
[keys section](../learn/learn-cryptography.md#keys).

You can generate your stash and staking proxy account via any of the recommended methods, which are
detailed on the [account generation](../learn/learn-accounts.md#account-generation) page. The first
thing you need to do before becoming a nominator is to make sure you have a
[**stash account**](./learn-staking.md/#stash-account-and-staking-proxy) where you can transfer
funds you want to use for staking. For these accounts, it is recommended to use a "cold wallet"
solution such as [Ledger](../general/ledger.md) or [Polkadot Vault](../general/polkadot-vault.md).

After setting up the stash account, it is recommended to have a
[**staking proxy**](./learn-staking-advanced.md/#staking-proxies). Although you can be a nominator
with just a stash account, having a staking proxy is good practice for security reasons.

A staking proxy of the stash will be able to sign for all staking-related transactions as well. The
stash will be fully isolated (except if the user decides to change the staking proxy of the stash or
to attach different proxies to the stash).

### Rewards Payout Account

As a nominator, you will be asked to choose an account where rewards will be paid. You can select
one of the following options:

- back to staking: rewards are compounded to the bonded amount.
- to stash: rewards are sent to the stash account as a free balance.
- to another account: rewards are sent to a user-defined account (not stash).

Starting with runtime version v23 natively included in the client version
[0.8.23](https://github.com/paritytech/polkadot/releases/tag/v0.8.23), payouts can go to any custom
address. If you'd like to redirect payments to an account that is neither the staking proxy nor the
stash account, set one up. Note that setting an exchange address as the recipient of the staking
rewards is extremely unsafe.

:::info

Being a nominator is made simpler by using the
[**Staking Dashboard**](https://staking.polkadot.network/#/overview) that will guide you step by
step through specifying rewards destination and bonded amount, and nominating validators (more on
this below). Note that staking proxies are not currently supported on the dashboard.

:::

## Nominating with the Polkadot-JS UI

### Targets Page

There are many factors to consider when deciding which of your nominations. One helpful tool to
choose validators is the Staking [Targets](https://polkadot.js.org/apps/#/staking/targets) table in
the Polkadot-JS UI. This allows sorting validators using various metrics. Below are the relevant
metrics shown as an example, followed by a brief description of each.

| validator | payout   | nominators             | comm. | total stake | own stake | return |
| --------- | -------- | ---------------------- | ----- | ----------- | --------- | ------ |
| A         | recently | 1 (`active`) 4 (`all`) | 3%    | 1.6 MDOT    | 8500 DOT  | 17.8%  |

- **payout**: How recently the validator made its last reward payout to nominators.
- **nominators**: This column consists of two number values. The **active** count (left number) is
  the number of nominators whose stake is baking the validator in the current era. In this case
  Validator A has one active nominator. The total or **all** count (right number) is the number of
  all nominators who nominated Validator A. This includes the active count and all the other
  nominators whose stake in the current era is baking other validators.

  Be cautious of validators with a high number of subscribers. A validator is considered
  oversubscribed when more than
  {{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :polkadot }}
  {{ kusama: <RPC network="kusama" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :kusama }}
  active nominators are assigned to the validator. In this scenario, only the top
  {{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :polkadot }}
  {{ kusama: <RPC network="kusama" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :kusama }}
  nominators (sorted by stake) will receive rewards. The remaining nominators will not be rewarded.
  However, they can be slashed if the validator commits a slashable offense.

  Every nominator can select up to a maximum of {{ polkadot: 16 :polkadot }}
  {{ kusama: 24 :kusama }} validators, which contributes towards maximizing the probability of
  having the nominator’s stake applied to the validators active set. Nominating too few validators
  could result in the nominators not receiving their rewards when none of them make it to the active
  set or when those validators stop validating. The election algorithm attempts to maximize the
  overall network stake while minimizing the variance of the active stake across the validators. For
  additional information on the election process, check out the research behind
  [nominated proof-of-stake](https://research.web3.foundation/Polkadot/protocols/NPoS).

- **comm.**: Total commission kept by the validator (100% means the validator will keep all rewards
  , and thus nominators will not receive them). A validator's commission is the percentage of the
  validator reward taken by the validator before the rewards are split among the nominators. As a
  nominator, you may think that choosing validators with the lowest commission is best. However,
  validators must be able to run at break-even to continue operations sustainably. Independent
  validators that rely on the commission to cover their server costs help to keep the network
  decentralized. Some validators, operated by central exchanges, etc., keep 100% of the commission
  to payout their staking service clients and therefore do not provide any rewards to external
  nominators. The commission is just one piece of the puzzle you should consider when picking
  nominating validators.
- **total stake**: The total amount of {{ polkadot: DOT :polkadot }}{{ kusama: KSM :Kusama }} tokens
  staked by nominators and the validator (i.e. own stake, see below).
- **own stake**: The amount of {{ polkadot: DOT :polkadot }}{{ kusama: KSM :Kusama }} tokens the
  validator has put up as a stake. A higher own stake can be considered as having more "skin in the
  game". This can imply increased trustworthiness. However, a validator not having a large amount of
  "own stake" is not automatically untrustworthy, as the validator could nominate from a different
  address.
- **return**: Average annual yield paid out to nominators (i.e. number of rewards divided by the
  number of bonded tokens). Note that nominating those with a higher yield may not guarantee similar
  future performance.

![Staking Returns](../assets/nominators_target.png)

On the Targets page, you can use different filters to select validators with specific traits (where
a trait is a combination of the metrics above). Available filters are:

- **one validator per operator**: Do not show groups of validators run by a single operator. It
  shows small operators only who will likely have a higher commission and higher self-stake.
  Nominating only small operators might not always guarantee staking rewards, but it helps to keep
  the network more resilient to attacks.

:::info Validator vs Operator

A validator is the node, the physical equipment with installed software that allows to produce new
blocks and earn rewards. An operator is the entity responsible for setting up, running and
maintaining the node. An operator can have multiple validators under different sub-identities. For
example, `ZUG CAPITAL/07` is one of the numerous validators belonging to the operator Zug Capital.

:::

- **comm. < 20%**: Do not show any validators with a commission of 20% or higher.
- **with capacity**: Do not show any validators who are currently operating
  [at capacity](../general/glossary.md#capacity) (i.e., could potentially be oversubscribed).
- **recent payouts**: Only show validators that have recently caused a
  [payout to be issued](learn-staking-advanced.md). Note that anyone can cause a payout to occur; it
  does not have to be the operator of a validator.
- **currently elected**: Only show validators in the active set (i.e., they have been elected to
  produce blocks in the current era).
- **with an identity**: Only show validators that have set an [identity](learn-identity.md). Note
  that this identity does not have to be verified by a registrar for the validator to appear in the
  list.

:::warning Single Operators with Multiple Validators

Recall that slashing is an additive function; the more validators offline or equivocating in a given
session, the harsher the penalties. Since validators that are controlled by a single operator are
more at risk of a "synchronized" failure, nominating them implies a greater risk of having a large
slash of your nominated funds. Generally, it is safer to nominate validators whose behavior is
independent of others in many ways (different hardware, geographic location, owner, etc.).

:::

### Bags-list

:::info

On Polkadot and Kusama, the instance of the pallet
[Bags-List](https://paritytech.github.io/substrate/master/pallet_bags_list/) is named as
`voterList`.

:::

Nominating accounts are placed in a semi-sorted list called bags-list. This sorting functionality is
extremely important for the long-term improvements of the staking/election system. Bags-list allows
up to
{{ polkadot: <RPC network="polkadot" path="query.staking.maxNominatorsCount" defaultValue={50000}/> :polkadot }}
{{ kusama: <RPC network="kusama" path="query.staking.maxNominatorsCount" defaultValue={20000}/> :kusama }}
nominators to set their intention to nominate, of which the stake of the top
{{ polkadot: <RPC network="polkadot" path="consts.electionProviderMultiPhase.maxElectingVoters" defaultValue={22500}/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.electionProviderMultiPhase.maxElectingVoters" defaultValue={12500}/> :kusama }}
nominators is considered for [electing set](#staking-election-stages) that eventually determines the
active validators.

The nominator accounts in a bag are sorted based on their insertion order, not by their nomination
stake. The `voterList.putInFrontOf` extrinsic can be issued to move up in the bag, which might be
very useful for the accounts in the last bag eligible for receiving staking rewards. Balance changes
due to staking rewards or slashing do not automatically rebag the account. Whenever applicable,
Polkadot JS Apps UI prompts the nominator account to rebag or move up by calling the
`voterList.rebag` extrinsic.

For guidelines about how to rebag or move your account within a bag, see the followings:

- The "Bags List" Section on
  [this Support Page](https://support.polkadot.network/support/solutions/articles/65000181018-i-have-more-than-the-minimum-bonded-but-i-m-not-getting-rewards).
- The [Bags List Section](./learn-staking-advanced.md#bags-list) in Advanced Staking Concepts.
- The [dedicated technical explainer video](https://youtu.be/hIIZRJLrBZA).

### Validator Stats

Nominators can query [validator histories](https://polkadot.js.org/apps/#/staking/query/) to see
statistics such as era points, elected stake, rewards and slashes, and commission. It is good
practice to do comprehensive research on validator candidates. This could include (but should not be
limited to) checking the validators' [identity](learn-identity.md) (if they have set one) and going
over the validators' websites to see who they are, what kind of infrastructure setup they are using,
reputation, the vision behind the validator, and more.

Any problematic behavior must be taken seriously. An example of problematic behavior will be if a
validator is regularly offline. In this case, nominators most likely would get fewer rewards. If
many validators are [unreachable](learn-staking.md#unresponsiveness), such validators and
corresponding nominators will be slashed.

![Validator Stats](../assets/validator_stats.png)

## Nominating with the Staking Dashboard

If you are a beginner, please watch the video below for detailed instructions.

[![Staking Tutorial](https://img.youtube.com/vi/F59N3YKYCRs/0.jpg)](https://www.youtube.com/watch?v=F59N3YKYCRs)

The [Polkadot Staking Dashboard](../general/staking-dashboard.md) allows to choose pre-selected
lists of validators based on user preference, or to manually select validators similarly as in the
Polkadot-JS UI.

Pre-selected choices are:

- Optimal Selection: Selects a mix of majority active and inactive validators.
- Active Low Commission: Gets a set of active validators with low commission.
- From Favorites: Gets a set of your favorite validators.

## Staking Election Stages

The staking election system has three stages for both validators and nominators, namely "intention",
"electable/electing", and "active".

- **intention to nominate:** an account that has stated the intention to nominate; also called
  simply a "nominator".
- **electing nominator:** a nominator who is selected to be a part of the input to the
  [NPoS election algorithm](learn-phragmen.md). This selection is based on stake and is made using
  the [bags-list](./learn-staking-advanced.md#bags-list).
- **active nominator:** a nominator who came out of the NPoS election algorithm backing an active
  validator. Staking rewards are received by the top
  {{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :polkadot }}
  {{ kusama: <RPC network="kusama" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :kusama }}
  nominators ranked by stake. When slashing occurs, all the active nominators backing the validator
  get slashed (also those who do not receive rewards due to oversubscription issues).

![Nominator Election](../assets/staking/nominator-election.png)

### The Election Solution Set

Determining which validators are in the active set and which nominators are nominating them creates
a very large graph mapping nominators to their respective validators. This "solution set" is
computed off-chain and submitted to the chain, which means it must fit in a single block. If there
are a large number of nominators, this means that some nominators must be eliminated. Currently,
nominators are sorted by the amount of DOT staked, and those with more DOT are prioritized. This
means that you may not receive rewards if you are staking with a small amount of DOT. This minimal
amount is dynamic based on the number of validators, nominators, amount nominated, and other
factors.

## Receiving Rewards

As long as you have nominated more than one validator candidate, at least one of them got elected,
and you are nominating with enough stake to get into the solution set, your bonded stake will be
fully distributed to one or more validators. That being said, you may not receive rewards if you
nominated very few validator candidates and no one got elected, or your stake is small, and you only
selected oversubscribed validators, or the validator you are nominating has 100% commission. It is
generally wise to choose as many trustworthy validators as you can
{{ polkadot: (up to 16) :polkadot }}{{ kusama: (up to 24) :kusama }} to reduce the risk of none of
your nominated validators being elected.

:::info Not receiving Staking Rewards?

To explore the possible reasons for not receiving staking rewards, check out the followings:

- The
  [Staking FAQ](https://support.polkadot.network/support/solutions/articles/65000181959-staking-faq-s)
  on the Support Pages.
- The
  ["Why am I not receiving staking rewards?"](https://www.reddit.com/r/Polkadot/comments/10kurje/why_am_i_not_receiving_staking_rewards/)
  Reddit article.
- The ["Why am I not receiving staking rewards?"](./learn-staking.md#why-am-i-not-receiving-rewards)
  section on the Staking Page.

:::

Rewards are _lazy_ - somebody must trigger a payout for a validator for rewards to go to all of the
validator's nominators. Any account can do this, although validator operators often do this as a
service to their nominators. See the page on [Simple Payouts](learn-staking-advanced.md) for more
information and instructions for claiming rewards.

:::note Explainer videos on Nominating

These concepts have been further explained in the following videos:

- [Why Nominate on Polkadot & Kusama](https://www.youtube.com/watch?v=weG_uzdSs1E&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=4)
- [What to Consider when Nominating Validators on Polkadot and Kusama](https://www.youtube.com/watch?v=K-a4CgVchvU&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=9)
- [Nominating/Staking on Polkadot and Kusama](https://youtu.be/FCXC0CDhyS4)

:::

## Good Nominator Practices

### Required Minimum Stake

Due to the way the [Phragmen algorithm](learn-phragmen.md) generates the solution set and due to the
fact that the solution set must fit in a single block, a minimum number of DOT will be required to
nominate with to receive staking rewards can change between the eras.

- **min-intention-threshold:** minimum stake to declare the intention to nominate. This parameter
  can be updated via on-chain governance, and the most recent and up-to-date version can be found on
  [chain state](https://polkadot.js.org/apps/#/chainstate) (select **state query > staking >
  minimumNominatorBond**)

- **min-electing:** minimum stake among the electing nominators. Since this is almost always the
  same as “min-active”, it might not be reported.

- **min-active:** minimum stake among the active nominators. If your stake falls below this dynamic
  threshold in a given era, you will not receive staking rewards for that era.

Thus, for **nominator counters**, we have:

- count of nominator intentions and max possible nominator intentions
  {{ polkadot: (unlimited) :polkadot }}
  {{ kusama: (<RPC network="kusama" path="query.staking.maxNominatorsCount" defaultValue={20000}/>) :kusama }}
- count of electing nominators, and maximum possible electing nominators
  {{ polkadot: (<RPC network="polkadot" path="consts.electionProviderMultiPhase.maxElectingVoters" defaultValue={22500}/>) :polkadot }}
  {{ kusama: (<RPC network="kusama" path="consts.electionProviderMultiPhase.maxElectingVoters" defaultValue={12500}/>) :kusama }}
- count of active nominators and maximum possible active nominators
  {{ polkadot: (<RPC network="polkadot" path="consts.electionProviderMultiPhase.maxElectingVoters" defaultValue={22500}/>) :polkadot }}
  {{ kusama: (<RPC network="kusama" path="consts.electionProviderMultiPhase.maxElectingVoters" defaultValue={12500}/>) :kusama }}

### Avoiding Oversubscribed Validators

Validators can only pay out to a certain number of nominators per era. This is currently set to
{{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :kusama }}
but can be modified via governance. If more than
{{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :kusama }}
nominators nominate the same validator, it is "oversubscribed", and only the top
{{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :kusama }}
staked nominators (ranked by the amount of stake) are paid rewards. Other nominators will receive no
rewards for that era, although their stake will still be used to calculate entry into the active
validator set.

Although it is difficult to determine how many nominators will nominate a given validator in the
next era, one can estimate based on the current number of nominators. A validator with only 5
nominators in this era, for instance, is unlikely to have more than
{{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :kusama }}
in the next era. However, an already-oversubscribed validator with 1000 nominators this era is very
likely to be oversubscribed in the next era as well.

If you are not nominating with a large number of DOTs, you should try to avoid
[oversubscribed](../general/glossary.md#oversubscribed) validators. It is not always easy to
calculate if the validator selected will be oversubscribed in the next session; one way to avoid
choosing potentially oversubscribed validators is to filter out any that are
[at capacity](../general/glossary.md#capacity) on the Targets page.

Finally, if you have a minimal amount of DOTs close to the value of `minActiveNomination`, you may
need to stake more DOT to get into the election set. The nominator-to-validator mapping solution
needs to be evaluated within a single block duration, and if there are too many nominators, the
lowest-staked nominations will be dropped from even being considered to be part of the electing set.
This `minActiveNomination` value is dynamic and will vary over time. You can read the blog post
["Polkadot Staking: An Update"](https://polkadot.network/polkadot-staking-an-update/) for more
details.

### Active vs. Inactive Nomination

When you go to the [Account actions](https://polkadot.js.org/apps/#/staking/actions) under staking
page, you should see your bonded accounts and nomination status. If not, you can follow
[this](./learn-guides-staking.md#nominate-using-polkadot-js) guide to configure it first. Your
nominations will be effective in the next era; eras are roughly
{{ polkadot: 24 hours on Polkadot. :polkadot }}{{ kusama: 6 hours on Kusama. :kusama }}

![Nominations](../assets/staking/polkadotjs_nominator_account.png)

Suppose you have nominated five validator candidates, and three out of five were elected to the
active validator set; then you should see two of your nominations as "waiting", and most likely one
as "active" and the rest as "inactive". Active or inactive nomination means your nominated
validators have been elected to be in the validator set, whereas waiting means they did not get
elected. Generally, you will only have a single validator have an active nomination, which means
that you are directly supporting it with your stake this era and thus potentially receiving staking
rewards. Inactive nominators were validators elected for this era but which you are not actively
supporting. Every era, a new election will take place, and you may be assigned a different active
nomination from the validators you selected.

If you are committing a very large stake, you may have more than one active nomination. However, the
election algorithm attempts to minimize this situation, and it should not occur often, so you should
almost always see only a single active nomination per era. See the
[section on Phragmén optimization](learn-phragmen.md#optimizations) for more details.

### Minimum Active Nomination to Receive Staking Rewards

:::info Minimum DOT required to earn staking rewards

The minimum DOT required to submit intent to nominate is
{{ polkadot: __<RPC network="polkadot" path="query.staking.minNominatorBond" defaultValue={1000000000000} filter="humanReadable"/>__ :polkadot }}
, but the minimum active nomination required to earn staking rewards is dynamic and may be much
higher, which can be viewed on
[Polkadot JS Apps > Network > Staking > Targets page](https://polkadot.js.org/apps/#/staking/targets).

:::

![Minimum Active Nomination](../assets/staking/min-active-nomination.png)

## Guides

- [Be a Nominator (Polkadot)](./learn-guides-staking.md#nominate-a-validator) - Guide on nominating
  on the Kusama canary network.
- [Stop Being a Nominator (all networks)](./learn-guides-staking#stop-nominating) - Guide on
  stopping nominations and withdrawing tokens.
