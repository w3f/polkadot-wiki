---
id: learn-nominator
title: Nominator
sidebar_label: Nominator
description: Learn about what it means to be a nominator.
keyword: [nominate, nominator, stake, staking]
slug: ../learn-nominator
---

import RPC from "./../../components/RPC-Connection";

:::tip New to Staking?

Start your staking journey or explore more information about staking on
[Polkadot's Home Page](https://polkadot.network/staking/). Discover the new
[Staking Dashboard](https://staking.polkadot.network/#/overview) that makes staking much easier and
check this
[extensive article list](https://support.polkadot.network/support/solutions/articles/65000182104) to
help you get started.
{{ polkadot: You can now [stake natively with just 1 DOT and earn staking rewards](https://polkadot.network/blog/nomination-pools-are-live-stake-natively-with-just-1-dot/). :polkadot }}
{{ kusama: All the examples presented on Polkadot apply to Kusama as well. :kusama }}

:::

If you landed on this page it means that you decided to take a journey to understand how you can be
a good nominator. Note, this page is not for [nomination pool](./learn-nomination-pools.md) members,
although pool members might gain essential knowledge about how to choose nomination pools.

The information provided on this page is complementary to that on the
[**Staking Page**](./learn-staking.md) and [**Advanced Staking Page**](./learn-staking-advanced.md).
Make sure you read those pages as well before nominating.

## Why Nominating?

- You become part of the {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} Movement, a
  group of professionals and enthusiasts around the world aspiring to build and foster the next-gen
  internet, Web 3.0: a decentralized, privacy-focused and trustless internet.
- You are an essential piece of the puzzle, keeping
  {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} secure, deciding the future
  direction of the project by voting in [OpenGov](./learn-opengov.md) and participating in parachain
  [crowdloans](./learn-crowdloans.md).
- You start to understand how {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} works
  at a technical-level. When you feel comfortable with your nomination skills and knowledge you can
  open your [nomination pool](./learn-nomination-pools.md), help others securing the network and
  earning rewards, and start building your reputation as a trusted nominator. If this is not enough
  for you, next step is to become a [validator](./learn-validator.md).
- By getting [staking](./learn-staking.md) rewards you fight
  {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} inflation and (likely) your
  currency inflation as well.

Nominators secure the Relay Chain by staking {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}
and nominating validators. You may have an account with
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} and want to earn fresh
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}. You could do so as a validator, which
requires experience in setting up a node and running and maintaining it 24/7.

On {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} you can also earn
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} by nominating one or more validators. By
doing so, you become a nominator for the validator(s) of your choice. Pick your validators
carefully - if they do not behave properly, they will get slashed and you will lose
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}. However, if they do follow the rules of the
network you can share staking rewards they generate.

While your {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} are staked for nominations, they
are 'locked' (bonded). You can
[stop nominating at any time](../maintain/maintain-guides-how-to-nominate-polkadot.md), but keep in
mind that the action is effective in the next era and that it does not automatically unbond your
funds. Unbonding is a separate action and it takes effect after the unbonding period, which is
{{ polkadot: 28-day long on Polkadot :polkadot }}{{ kusama: 7-day long on Kusama :kusama }}. This is
calculated by taking the **bonding duration** (in eras), multiplying it by the **length of a single
era** (in hours), and dividing by the **hours in a day** (24). Example:
({{ polkadot: 28 × 24 ÷ 24 = 28 days :polkadot }}{{ kusama: 28 × 6 ÷ 24 = 7 days :kusama }}). A
staking lock will be visible on the Polkadot-JS UI during the unbonding period, and after it, the
staking lock can be unlocked and the bonded funds become free balance you can transfer.

## Setting-up Accounts

### Stash, Controller & Staking Proxy

The first thing you need to do before becoming a nominator is to make sure you have a
[**stash account**](./learn-staking.md/#stash-and-controller-accounts-for-staking) where you can
transfer funds you want to use for staking. For this accounts it is recommended a "cold solution"
such as [Ledger](../general/ledger.md) or
[Parity Signer](./learn-account-generation.md#parity-signer).

After setting up the stash account it is recommended to have a
[**controller account**](./learn-staking.md/#stash-and-controller-accounts-for-staking) or a
[**staking proxy**](./learn-staking-advanced.md/#staking-proxies) (or both, controller and staking
proxy). Although you can be a nominator with just a stash account, it is good practice to have at
least a controller or a staking proxy for security reasons.

:::info In the near future Controller Accounts will be deprecated

The concept of controller account is very similar to that of a staking proxy: isolate the stash
account but use its economic power, and sign staking-related transactions on behalf of it. This is
why in the near future there will be only proxies as the controller is becoming redundant. Given
this context, we recommend nominators to start understanding what proxies are and how to use them.

:::

If the future of nominating will be without a controller account,
[the stash account will be able to perform all staking-related transactions](./learn-staking-advanced.md/#stash-is-also-controller).
This means that the staking proxy of the stash will be able to sign for all staking-related
transactions as well. The stash will be fully isolated (except if the user decides to change the
staking proxy of the stash, or to attach different proxies to the stash).

### Rewards Payout Account

As a nominator you will be asked to chose an account where rewards will be paid out. You can choose
one of the following options:

- back to staking: rewards are compounded to the bonded amount.
- to stash: rewards are sent to the stash account as free balance.
- to controller: rewards are sent to the controller account as a free balance.
- to another account: rewards are sent to a user-defined account (not stash or controller).

:::info

Being a nominator is made simpler using the
[**Staking Dashboard**](https://staking.polkadot.network/#/overview) that will guide you step by
step through creating a stash-controller relationship, specifying rewards destination and nominating
validators (more on this below). Note that staking proxies are not currently supported on the
dashboard.

:::

## Nominating with the Polkadot-JS UI

### Targets Page

There are many factors to consider when deciding which your nominations. One useful tool to choose
validators is the Staking [Targets](https://polkadot.js.org/apps/#/staking/targets) table in the
Polkadot-JS UI. This allows to sort validators using various metrics. Outlined below are the
relevant metrics, followed by a brief description of each.

| validator | payout   | nominators             | comm. | total stake | own stake | return |
| --------- | -------- | ---------------------- | ----- | ----------- | --------- | ------ |
| A         | recently | 1 (`active`) 4 (`all`) | 3%    | 1.6 MDOT    | 8500 DOT  | 17.8%  |

- **payout**: How recently the validator has made it's last reward payout to nominators.
- **nominators**: This column consists of two number values. The **active** count (left number) is
  the number of nominators whose stake is baking the validator in the current era. In this case
  Validator A has 1 active nominator. The total or **all** count (right number) is the number of all
  nominators who nominated Validator A. This includes the active count and all the other nominators
  whose stake in the current era is baking other validators.

  You may want to be cautious of validators with a high number of subscribers. A validator is
  considered oversubscribed when more than
  {{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :polkadot }}
  {{ kusama: <RPC network="kusama" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :kusama }}
  active nominators are assigned to the validator. In this scenario only the top
  {{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :polkadot }}
  {{ kusama: <RPC network="kusama" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :kusama }}
  nominators (sorted by stake) will receive rewards. The remaining nominators will not be rewarded,
  however they can be slashed in the event that validator commits a slashable offence.

  Every nominator can select up to a maximum of
  {{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominations" defaultValue={16}/> :polkadot }}
  {{ kusama: <RPC network="kusama" path="consts.staking.maxNominations" defaultValue={24}/> :kusama }}
  validators, which contributes towards maximizing the probability of having the nominators stake
  applied to the validators active set. Nominating too few validators could result in the nominators
  not receiving their rewards when none of them make it to active set or when those validators stop
  validating. The election algorithm attempts to maximize the overall network stake, while
  minimizing the variance of the active stake across the validators. For additional information on
  the election process checkout the research behind
  [nominated proof-of-stake](https://research.web3.foundation/en/latest/polkadot/NPoS/1.%20Overview.html#polkadot-npos-1-overview--page-root).

- **comm.**: Total commission kept by the validator (100% means the validator will keep all rewards
  and thus nominators will not receive them). A validator's commission is the percentage of the
  validator reward which is taken by the validator before the rewards are split among the
  nominators. As a nominator, you may think that the lowest commission is best. However, validators
  must be able to run at break-even in order to sustainably continue operation. Independent
  validators that rely on the commission to cover their server costs help to keep the network
  decentralized. Some validators, operated by central exchanges etc., keep 100% of the commission to
  payout their staking service clients and therefore do not provide any rewards to external
  nominators. Commission is just one piece of the puzzle that you should consider when picking
  validators to nominate.
- **total stake**: The total amount of {{ polkadot: DOT :polkadot }}{{ kusama: KSM :Kusama }} tokens
  staked by nominators and the validator (i.e. own stake, see below).
- **own stake**: The amount of {{ polkadot: DOT :polkadot }}{{ kusama: KSM :Kusama }} tokens the
  validator has put up as a stake. A higher own stake can be considered as having more "skin in the
  game". This can imply increased trustworthiness. However, a validator not having a large amount of
  "own stake" is not automatically untrustworthy, as the validator could be nominating from a
  different address.
- **return**: Average annual yield paid out to nominators (i.e. number of rewards divided by the
  number of bonded tokens). Note that, nominating those who have a higher yield does not guarantee
  similar future performance.

![Staking Returns](../assets/nominators_target.png)

On the Targets page you can use different filters to select validators with specific traits (where a
trait is a combination of the metrics above). Available filters are:

- **one validator per operator**: Do not show groups of validators run by a single operator. It
  shows small operators only who will likely have a higher commission and higher self-stake.
  Nominating only small operators might not always guarantee staking rewards, but it helps to keep
  the network more resilient to attacks.

:::info Validator vs Operator

A validator is the node, the physical equipment with installed the software that allows to produce
new blocks and earn rewards. An operator is the entity responsible for setting up, running an
maintaining the node. An operator can have multiple validators under different sub-identities. For
example, `ZUG CAPITAL/07` is one of the multiple validators belonging to the operator Zug Capital.

:::

- **comm. < 20%**: Do not show any validators with a commission of 20% or higher.
- **with capacity**: Do not show any validators who are currently operating
  [at capacity](../general/glossary.md#capacity) (i.e., could potentially be oversubscribed).
- **recent payouts**: Only show validators that have recently caused a
  [payout to be issued](learn-staking-advanced.md). Note that anyone can cause a payout to occur; it
  does not have to be the operator of a validator.
- **currently elected**: Only show validators that are in the active set (i.e., they have been
  elected to produce blocks in the current era).
- **with an identity**: Only show validators that have set an [identity](learn-identity.md). Note
  that this identity does not have to be verified by a registrar for the validator to show up in the
  list.

:::warning Single Operators with Multiple Validators

Recall that slashing is an additive function; the more validators that are offline or equivocate in
a given session, the harsher the penalties. Since validators that are controlled by a single
operator are more at risk of a "synchronized" failure, nominating them implies a greater risk of
having a large slash of your nominated funds. Generally, it is safer to nominate validators whose
behavior is independent from others in as many ways as possible (different hardware, geographic
location, owner, etc.).

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
nominators to set their intention to nominate, of which, the stake of the top
{{ polkadot: <RPC network="polkadot" path="consts.electionProviderMultiPhase.maxElectingVoters" defaultValue={22500}/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.electionProviderMultiPhase.maxElectingVoters" defaultValue={12500}/> :kusama }}
nominators is considered for [electing set](#staking-election-stages) that eventually determines the
active validators. The bags-list can be previewed on
[Polkadot JS Apps > Network > Staking > Bags > All Bags](https://polkadot.js.org/apps/#/staking/bags).

![Bags list](../assets/staking/bags-list.png)

Bonding additional tokens or unbonding the staked tokens will automatically place the nominating
account in the appropriate bag. While the system tries its best to ensure nominators are always
represented in the correct bag, certain changes in bonded funds (e.g. a slash in the negative
direction, or rewards in the positive direction) can cause an account to be in the wrong bag, and
for scalability reasons the system will not automatically self-adjust.

:::caution `voterList.putInFrontOf` and `voterList.rebag` extrinsics

The nominator accounts in a bag are sorted based on their insertion order, not by their nomination
stake. `voterList.putInFrontOf` extrinsic can be issued to move up in the bag, which might be very
useful for the accounts in the last bag eligible for receiving staking rewards. Also, balance
changes due to staking rewards or slashing do not automatically re-bag the account. Whenever
applicable, Polkadot JS Apps UI prompts the nominator account to rebag or move-up and the
instructions are available in this
[support article](https://support.polkadot.network/support/solutions/articles/65000181018-i-have-more-than-the-minimum-bonded-but-i-m-not-getting-rewards).

:::

### Validator Stats

Nominators can query [validator histories](https://polkadot.js.org/apps/#/staking/query/) to see
statistics such as era points, elected stake, rewards and slashes, and commission. It is good
practice to do comprehensive research on validator candidates. This could include (but should not be
limited to) checking the validators' [identity](learn-identity.md) (if they have set one) and going
over the validators' websites to see who they are, what kind of infrastructure setup they are using,
reputation, the vision behind the validator, and more.

Any problematic behavior must be taken seriously. An example of problematic behavior would be if a
validator is regularly offline. In this case nominators most likely would get fewer rewards. In the
case of many validators being [unreachable](learn-staking.md#unresponsiveness), such validators and
corresponding nominators will be slashed.

![Validator Stats](../assets/validator_stats.png)

## Nominating with the Staking Dashboard

The Staking Dashboard allows to choose pre-selected lists of validators based on user preference, or
to manually select validators in a similar fashion as in the Polkadot-JS UI.

Pre-selected choices are:

- Optimal Selection: Selects a mix of majority active and inactive validators.
- Active Low Commission: Gets a set of active validators with low commission.
- From Favorites: Gets a set of your favorites validators.

## Staking Election Stages

The staking election system has 3 stages for both validators and nominators, namely "intention",
"electable/electing", and "active".

- **intention to nominate:** an account that has stated the intention to nominate; also called
  simply a "nominator".
- **electing nominator:** a nominator who is selected to be a part of the input to the
  [NPoS election algorithm](learn-phragmen.md). This selection is based on stake, and is done using
  the [bags-list](./learn-staking-advanced.md#bags-list).
- **active nominator:** a nominator who came out of the NPoS election algorithm backing an active
  validator. Staking rewards are received by the top
  {{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :polkadot }}
  {{ kusama: <RPC network="kusama" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :kusama }}
  nominators ranked by stake. When slashing occurs, all the active nominators backing the validator
  get slashed (also those who do not receive rewards due to oversubscription issue).

![Nominator Election](../assets/staking/nominator-election.png)

### The Election Solution Set

Determining which validators are in the active set and which nominators are nominating them creates
a very large graph mapping nominators to their respective validators. This "solution set" is
computed off-chain and submitted to the chain, which means it must fit in a single block. If there
are a large number of nominators, this means that some nominators must be eliminated. Currently,
nominators are sorted by amount of DOT staked and those with more DOT are prioritized. This means
that if you are staking with a small amount of DOT, you may not receive rewards. This minimal amount
is dynamic based on the number of validators, number of nominators, amount nominated, and other
factors.

## Receiving Rewards

As long as you have nominated more than one validator candidate, at least one of them got elected,
and you are nominating with enough stake to get into the solution set, your bonded stake will be
fully distributed to one or more validators. That being said, you may not receive rewards if you
nominated very few validator candidates and no one got elected, or your stake is small and you only
selected oversubscribed validators, or the validator you are nominating has 100% commission. It is
generally wise to choose as many trustworthy validators as you can (up to
{{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominations" defaultValue={16}/>) :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.staking.maxNominations" defaultValue={24}/>) :kusama }}
to reduce the risk of none of your nominated validators being elected.

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

Rewards are _lazy_ - somebody must trigger a payout for a validator for rewards to go all of the
validator's nominators. Any account can do this, although in practice validator operators often do
this as a service to their nominators. See the page on [Simple Payouts](learn-staking-advanced.md)
for more information and instructions for claiming rewards.

:::note Explainer videos on Nominating

These concepts have been further explained in the following videos:

- [Why Nominate on Polkadot & Kusama](https://www.youtube.com/watch?v=weG_uzdSs1E&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=4)
- [What to Consider when Nominating Validators on Polkadot and Kusama](https://www.youtube.com/watch?v=K-a4CgVchvU&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=9)
- [Nominating/Staking on Polkadot and Kusama](https://youtu.be/FCXC0CDhyS4)

:::

## Good Practices

### Required Minimum Stake

Due to the way the [Phragmen algorithm](learn-phragmen.md) generates the solution set, and due to
the fact that the solution set must fit in a single block, a minimum number of DOT will be required
to nominate with, in order to receive staking rewards, can change between the eras.

- **min-intention-threshold:** minimum stake to declare the intention to nominate. This parameter
  can be updated via on-chain governance and the most recent and up to date version can be found on
  [chain state](https://polkadot.js.org/apps/#/chainstate) (select **state query > staking >
  minimumNominatorBond**)

- **min-electing:** minimum stake among the electing nominators. Since this is almost always the
  same as “min-active”, it might not be reported.

- **min-active:** minimum stake among the active nominators. If your stake falls below this dynamic
  threshold in a given era, you will not receive staking rewards for that era.

Thus, for **nominator counters**, we have:

- count of nominator intentions, and max possible nominator intentions
  {{ polkadot: (unlimited) :polkadot }}
  {{ kusama: (<RPC network="kusama" path="query.staking.maxNominatorsCount" defaultValue={20000}/>) :kusama }}
- count of electing nominators, and maximum possible electing nominators
  {{ polkadot: (<RPC network="polkadot" path="consts.electionProviderMultiPhase.maxElectingVoters" defaultValue={22500}/>) :polkadot }}
  {{ kusama: (<RPC network="kusama" path="consts.electionProviderMultiPhase.maxElectingVoters" defaultValue={12500}/>) :kusama }}
- count of active nominators, and maximum possible active nominators
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
staked nominators (ranked by amount of stake) are paid rewards. Other nominators will receive no
rewards for that era, although their stake will still be used to calculate entry into the active
validator set.

Although it is difficult to determine exactly how many nominators will nominate a given validator in
the next era, one can estimate based on the current number of nominators. A validator with only 5
nominators in this era, for instance, is unlikely to have more than
{{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={512}/> :kusama }}
in the next era. An already-oversubscribed validator with 1000 nominators this era, however, is very
likely to be oversubscribed in the next era as well.

If you are not nominating with a large number of DOTs, you should try to avoid
[oversubscribed](../general/glossary.md#oversubscribed) validators. It is not always easy to
calculate if the validator selected will be oversubscribed in the next session; one way to avoid
choosing potentially oversubscribed validators is to filter out any that are
[at capacity](../general/glossary.md#capacity) on the Targets page.

Finally, if you have a very small amount of DOTs, you may not be able to have your nomination fit
into the election set. The nominator to validator mapping has to fit in a single block, and if there
are too many nominators, the lowest-staked nominations will be dropped. This value is obviously
dynamic and will vary over time. If you review the lowest amount of nominations that are occurring
on current validators, you can get a good idea of how many DOTs will likely be necessary to have
your nomination earn you rewards. You can read the blog post
["Polkadot Staking: An Update"](https://polkadot.network/polkadot-staking-an-update/) for more
details.

### Active vs. Inactive Nomination

When you go to the [Account actions](https://polkadot.js.org/apps/#/staking/actions) under staking
page, you should see your bonded accounts and nomination status. If not, you can follow
[this](../maintain/maintain-guides-how-to-nominate-polkadot.md) guide to configure it first. Your
nominations will be effective in the next era; eras are roughly
{{ polkadot: 24 hours on Polkadot. :polkadot }}{{ kusama: 6 hours on Kusama. :kusama }}

![Nominations](../assets/staking/polkadotjs_nominator_account.png)

Suppose you have nominated five validator candidates, and three out of five were elected to the
active validator set, then you should see two of your nominations as "waiting", and most likely one
as "active" and the rest as "inactive". Active or inactive nomination means your nominated
validators have been elected to be in the validator set, whereas waiting means they did not get
elected. Generally, you will only have a single validator have an active nomination, which means
that you are directly supporting it with your stake this era and thus potentially receiving staking
rewards. Inactive nominators were validators that were elected for this era but which you are not
actively supporting. Every era, a new election will take place and you may be assigned a different
active nomination from among the validators you have selected.

If you are committing a very large amount of stake, then you may have more than one active
nomination. However, the election algorithm attempts to minimize this situation, and it should not
occur often, so you should almost always see only a single active nomination per era. See the
[section on Phragmén optimization](learn-phragmen.md#optimizations) for more details.

### Minimum Active Nomination to Receive Staking Rewards

:::info Minimum DOT required to earn staking rewards

Minimum DOT required to submit intent to nominate is
{{ polkadot: __<RPC network="polkadot" path="query.staking.minNominatorBond" defaultValue={1000000000000} filter="humanReadable"/>__ :polkadot }}
, but the minimum active nomination required to earn staking rewards is dynamic and may be much
higher, which can be viewed on
[Polkadot JS Apps > Network > Staking > Targets page](https://polkadot.js.org/apps/#/staking/targets).

:::

![Minimum Active Nomination](../assets/staking/min-active-nomination.png)

## Guides

- [Be a Nominator (Polkadot)](../maintain/maintain-guides-how-to-nominate-polkadot.md) - Guide on
  nominating on the Kusama canary network.
- [Stop Being a Nominator (all networks)](../maintain/maintain-guides-how-to-nominate-polkadot.md) -
  Guide on stopping nominations and withdrawing tokens.
