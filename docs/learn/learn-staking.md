---
id: learn-staking
title: Staking
sidebar_label: Staking Concepts
description: An introduction on staking in Polkadot's NPoS consensus model.
keywords: [staking, stake, nominate, nominating, NPoS]
slug: ../learn-staking
---

import RPC from "./../../components/RPC-Connection"

Here you will learn about what staking is, why it is important and how it works on
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}.

## Introduction

Blockchain networks use [consensus](learn-consensus.md/#why-do-we-need-consensus) mechanisms to finalize
blocks on the chain. Consensus is the process of agreeing on something, in this case the progression
of the blockchain or how blocks are added to the chain. Consensus consists into two actions:

- `block production`, i.e. the way multiple blocks candidates are produced, and 
- `block finality`, i.e. the way only one block out of many candidates is selected and added to the canonical chain (see [this](learn-consensus.md/#probabilistic-vs-provable-finality) article for more information about finality).

Proof-of-Work (PoW) and Proof-of-Stake (PoS) are well known mechanisms used to reach consensus in a secure and trustless way on public blockchains, where we have many participants who do not know each other (and probably never will). In PoW networks, miners are responsible for adding blocks to the chain, and for doing such work they are
typically rewarded with tokens. Network security relies on the fact that the miners must compete to solve difficult mathematic puzzles to add blocks - a solution that has been criticized for the energy wastage. In PoS networks like {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} the
security of the network depends on the amount of capital locked on chain: the more the capital
locked the lower the chance of an attack on the network, as the attacker
needs to incur heavy loss to orchestrate a successful attack (more on this later on). The process of
locking tokens on chain is called `staking`. 

Similar to the miners in PoW networks, PoS networks have `validators` but they do not have to compete with each other to solve mathematical puzzles and are instead pre-selected to produce the blocks based on the stake backing them.
Token holders can lock funds on chain and for doing so, they are getting `staking rewards`. There is
thus an economic incentive for token holders to become active participants who contribute to the
security and economic stability of the network. PoS networks in general are therefore more inclusive
than PoW networks, as participants do not need to have either the technical knowledge about
blockchain technology nor the experience in running mining equipment. 

PoS ensures that everybody participating in the staking process has
"skin in the game" and thus can be held accountable. In case of misbehavior participants in the
staking process can be punished or `slashed`, and depending on the gravity of the situation, their
stake can be partly or fully confiscated by the network. It is not in a staker's economic interest to orchestrate an attack and risk losing tokens. Any rational actor staking on the network would want to get rewarded, and the PoS network rewards good behavior and punishes bad behavior.

## Nominated Proof-of-stake overview

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} implements NPoS (Nominated Proof-of-Stake),
a relatively novel and sophisticated mechanism to select the validators who are allowed to participate in 
its [consensus](learn-consensus.md) protocol. The NPoS encourages {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} 
holders to participate as nominators.

[Nominated Proof-of-Stake (NPoS)](learn-consensus.md/#nominated-proof-of-stake) encourages {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}
holders to participate as `nominators`. Nominators may back up to
{{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominations" defaultValue={16}/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.staking.maxNominations" defaultValue={24}/> :kusama }}
validators as trusted validator candidates, and the network will automatically distribute the stake among validators in
an even manner. Also, in NPoS the stake of both nominators and validators can be slashed.  For an in-depth review of NPoS check
[this](https://research.web3.foundation/en/latest/polkadot/NPoS/index.html) research article.

### Nominating validators

The action of nominating consists in a) locking or
bonding tokens (stake) on chain, and 2) nominate a set validator candidates to whom the stake will
be allocated. {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} uses tools ranging
from election theory to game theory to discrete optimization, to develop an efficient validator
selection process that offers fair representation and security, thus avoiding uneven power and
influence among validators. The `election algorithm` used by {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} bases on the Proportional Justified Representation (PJR) method called [Phragmen](learn-phragmen.md). For more information about PJR methods visit [this](https://research.web3.foundation/en/latest/polkadot/NPoS/1.%20Overview.html?highlight=proportional%20justified%20representation#) research article.

### Eras and sessions

The stake from nominators is used to increase the amount of tokens held by such candidates, increasing their chance of being selected by the election algorithm for block
production during a specific `era`. An era is a period of time of {{ polkadot: 24 hours :polkadot }}{{ kusama: 6 hours :kusama }} during
which an `active set` of validators is producing blocks and performing other actions on chain. This
means that not all validators are in the active set, and such set changes between eras. Each era is
divided into 6 epochs or `sessions` during which validators are assigned as block producers to
specific time frames or `slots`. This means that validators know the slots when they will be
required to produce a block within a specific session, but they do not know all the slots within a
specific era. Having sessions adds a layer of security because it decreases the chance of having
multiple validators assigned to a slot colluding to harm the network.

### Rewards

Validators who produce a block are rewarded with tokens, and they can share rewards with their
nominators. Both validators and nominators can stake their tokens on chain and receive staking
rewards at the end of each era. The staking system pays out rewards equally to all validators
regardless of stake. Thus, having more stake on a validator does not influence the amount of block rewards
it receives. This avoids centralization of power to few validators. There is a probabilistic
component in the calculation of rewards, so they may not be exactly equal for all validators. In
fact, during each era validators can earn `era points` by doing different tasks on chain. The more
the points, the higher the reward for a specific era. This promotes validators' activity on chain.
To know more about era points, how and on which basis they are distributed visit the
[dedicated page](../maintain/maintain-guides-validator-payout.md). Distribution of the rewards are
pro-rata to all stakers after the validator's commission is deducted.

### Skin in the game when Staking

The security of PoS networks depends on the amount of staked tokens. This means
that to successfully attack the network one would need a large amount of tokens that can be accrued
by one single participant alone or would need different participants to collude and act maliciously. In case
of NPoS, if there is an attack both the validator(s) and nominators will be
`slashed` and in some cases their stake partially or fully confiscated by the network and deposited to the treasury. So there is little interest of acting in a harmful way because all participants can be
held accountable for bad actions. Also, in NPoS validators are paid equal rewards regardless from
the amount they have at stake, avoiding thus large payouts to few large validators which would
ultimately lead to consensus centralization.

## Being a nominator

### Tasks and responsibilities

Since validator slots are limited, most of those who wish to stake their DOT and contribute to the
economic security of the network will be nominators, thus here we focus on the role of nominators.
However, it is worth mentioning that validators do most of the heavy lifting: they run hardware
equipment and manage
[session keys](https://research.web3.foundation/en/latest/polkadot/keys/index.html?highlight=session%20keys),
produce new block candidates in [BABE](learn-consensus.md/#block-production-babe), vote and come to
consensus in [GRANDPA](learn-consensus.md/#finality-gadget-grandpa), validate the state transition
function of parachains, and possibly some other responsibilities regarding data availability and
[XCM](learn-cross-consensus.md). For more information you can take a look at the
[validator docs](learn-validator.md) to understand what you need to do as a validator. If you want
to be come a validator check [this](../maintain/maintain-guides-how-to-validate-polkadot.md) guide.

Nominators have far fewer responsibilities than validators. Those include selecting validators and
monitoring their performance, keeping an eye on changing commission rates (a validator can change
commission at any time), and general health monitoring of their validators' account. Thus, while not
being completely set-it-and-forget-it, a nominator's experience is relatively hands-off compared to
a validators. For more information you can take a look at the [nominator guide](learn-nominator.md)
to understand your responsibilities as a nominator.

If you want to be come a nominator check
[this](../maintain/maintain-guides-how-to-nominate-polkadot.md) guide. If you are a beginner and
would like to securely stake your tokens using Polkadot JS Apps, watch [this](https://support.polkadot.network/support/solutions/articles/65000168057-how-do-i-stake-nominate-on-polkadot-) support article. {{ kusama: The video demonstrates it on Polkadot, but the procedure is the same for Kusama :kusama }}

### Selection of validators

Choosing validators is not a simple task and it should take into account for nominator reward and
risk preferences. Ideally one aims to maximize the reward-to-risk ratio by maximizing rewards and minimizing risks, with sometimes having to
compromise between the two as minimizing risks might decrease rewards as well. Nominators should pay attention especially to six criteria when nominating validators (not in order of importance):

- amount of era points
- validator pool, equivalent to own stake (i.e. coming from the validator) + other stake (i.e. coming from nominators)
- own stake
- commission fees (i.e. how much validators charge nominators)
- verified identity
- previous slashes

The diagram below shows how the selection of those criteria affects reward-to-risk ratio.

![rewards and risks diagram](../assets/staking/Reward-risk%20nominating.png)

#### In theory

To maximize rewards and minimize risk one could select those validators
that:

- have era points above average (because they will get more rewards for being active), 
- have validator pool below average (because they will pay out more rewards per staked {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}), 
- have high own stake (because if slashed they have a lot to lose), 
- have low commission fees but not 0% (because it makes sense that for doing the heavy lifting validators ask for a small commission), 
- have on-chain registered identity (because increases trust and you can reach out to them or look at their website or social media), 
- and have not been slashed (meaning that their on-chain behavior is genuine).

#### In practice

:::caution Nominators must periodically check their validators

Nominating is _not_ a "set and forget" operation. The whole NPoS system is dynamic and as such nominators should
periodically monitor the performance and reputation of their validators. Failing to do so could
result in applied slashes and/or rewards not being paid out, even for a prolonged period of time.

:::

Although the theory can be used as a general guideline, the practice is more complicated and
following the theory might not necessarily lead to the desired result. Validators might have validator pool below average, low commission and above average era points in one era and then having a totally
different profile in the next one. There are criteria that vary more than others with era points
being the most variable and thus the probabilistic component of staking rewards. It is not recommended
to change nominations at each era only because the era points of one validator were low. Selection
based on identity, no slashes and low commission should be fine. Variability in rewards due to the
other criteria should level out over time. There might be the case when one validator always gets
below average era points, this is a case when selecting another validator might help to increase the
stake performance.

Check
[this](https://support.polkadot.network/support/solutions/articles/65000150130-how-do-i-know-which-validators-to-choose-)
support article to understand in detail how to select your own set of validators.

### Accounts

There are two different accounts that can be used to securely manage your funds while staking.

- **Stash:** This account holds funds bonded for staking, but delegates some functions to a
  controller account. As a result, you may actively participate to staking with a stash private key kept in
  a cold wallet like ledger, meaning it stays offline all the time. Stash account keys are used to
  sign staking actions such as bonding and unbonding funds.

- **Controller:** This account acts on behalf of the stash account, signalling decisions about
  nominating and validating. It sets preferences like commission (for validators) and payout
  account. The earned rewards can be bonded (locked) immediately for staking on your stash account,
  which would effectively compound the rewards you receive over time. You could also choose to have
  them deposited to your controller account or a different account as free (transferable) balance.
  If you are a validator, it also sets your [session keys](learn-keys.md#session-keys). Controller
  accounts only needs enough funds to pay for transaction fees.

:::warning

Never leave high balance on a controller account, such accounts are usually "hot" meaning that the
private key is stored on the device (PC, phone) and it is exposed to the internet all the time you
are using it. It is good practice to deposit rewards on the stash account or to send them to another
cold account.

:::

![staking](../assets/NPoS/staking-keys_stash_controller.png)

This hierarchy of separate key types for stash and controller accounts was designed so that nominators and validator operators can
protect themselves much better than in systems with only one key. As a rule, the more often one uses
a private key the higher its visibility and thus the chance it can be stolen. So, if one uses a key
for multiple roles on a blockchain network, security can be easily compromised as the likelihood one
uses that key often is high. Note that the damage linked to stolen private keys is different
depending on the type of account derivation. In case of soft derivation all derived accounts are
compromised. More information about account derivation can be found
[here](../learn/learn-accounts.md/#derivation-paths).

:::info

For ledger users staking directly on Ledger Live, currently there is only one option to use one
account as both stash and controller.

:::

### Staking proxies

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} is built using
[substrate](https://substrate.io/), a modular system to efficiently build blockchains without having necessarily deep knowledge about blockchain technology. Within each module or `pallet` one can `call` different
functions that have similar logic. For example, the staking pallet contains all functionalities
related to staking such as bonding or unbonding funds. The combined information of pallets and calls
constitutes an `extrinsic`, i.e. a transaction that is executed from outside the chain but that
triggers an event within the chain. Continuing with the staking example, within the staking pallet
one can bond funds and nominate some validators. The signature of such
extrinsic might trigger a reward payout at the end of an era; this is an event inside the chain. This way of having
transactions categorized within pallets and functionalities makes it possible to create accounts
having special permissions also called **proxy accounts**.

In {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} proxy accounts are special
accounts to which one can delegate signatures to calls from specific pallets. There is thus the
possibility to create staking proxy accounts that can be used to sign only calls from staking,
session and utility pallets. This makes the stash account even more isolated than using a controller
account since now one can bond / unbond / bond more funds using the staking proxy account. However,
it is important to remember that actions on proxy accounts are limited, and in the case of staking
proxy accounts calls from the balance pallet cannot be signed. This means that it is not possible to
send funds from a staking proxy. To do that one needs to remove that account as a staking proxy.

## Staking system overview

Any potential validators can indicate their intention to be a validator candidate. Their candidacies
are made public to all nominators, and a nominator in turn submits a list of up to
{{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominations" defaultValue={16}/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.staking.maxNominations" defaultValue={24}/> :kusama }}
candidates that it supports. In the next era, a certain number of validators having the most
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} backing get elected and become active. For more information about the election algorithm go to [this](learn-phragmen.md) page on the wiki or [this](https://research.web3.foundation/en/latest/polkadot/NPoS/1.%20Overview.html?highlight=proportional%20justified%20representation#) research article. As a
nominator, a minimum of
{{ polkadot: <RPC network="polkadot" path="query.staking.minNominatorBond" defaultValue={100000000000} filter="humanReadable"/> :polkadot }}
{{ kusama: <RPC network="kusama" path="query.staking.minNominatorBond" defaultValue={100000000000} filter="humanReadable"/> :kusama }}
is required to submit an intention to nominate.

:::caution Minimum Nomination to Receive Staking Rewards

Although the minimum nomination intent is
{{ polkadot: <RPC network="polkadot" path="query.staking.minNominatorBond" defaultValue={100000000000} filter="humanReadable"/> :polkadot }}{{ kusama: <RPC network="kusama" path="query.staking.minNominatorBond" defaultValue={100000000000} filter="humanReadable"/> :kusama }},
it does not guarantee staking rewards. The nominated amount has to be greater than
[minimum active nomination](learn-nominator.md#minimum-active-nomination-to-receive-staking-rewards),
which is a dynamic value that can be much higher than
{{ polkadot: <RPC network="polkadot" path="query.staking.minNominatorBond" defaultValue={100000000000} filter="humanReadable"/> :polkadot }}{{ kusama: <RPC network="kusama" path="query.staking.minNominatorBond" defaultValue={100000000000} filter="humanReadable"/> :kusama }}.

:::

### Bags list

The nomination intents are placed in a so-called
[bags-list](https://github.com/paritytech/substrate/pull/9507).
{{ kusama: The bags list example below uses DOT for explaining the concepts. :kusama }}The bags list
has two primary components, bags and nodes. The list is composed of bags that each describe a range
of active bonded funds (e.g. the 1st bag will have nominators who staked 0 → 10 DOT, 2nd bag 11 → 20
DOT, etc). Each bag contains nodes that correspond to nominators and their staked funds.

The bags-list pallet is designed to be self-maintaining, with minimal effort from the blockchain,
making it extremely scalable. Let us explore the sorting functionality of the bags list with an
example. In the bags list below, there are 8 nodes (corresponding to 8 accounts with staked funds)
placed in 3 bags. It can be observed that the list of nodes within the bags are arranged based on
their insertion order and not based on the number of tokens bonded. For instance, the nodes in bag 1
are arranged in this order: 15 → 12 → 19.

![bags list example 1](../assets/staking/bags-list-example-1.png)

Let's say the nominator with the stake of 19 DOT bonds 2 DOT additionally. This action would place
that nominator node in bag 2, right after the node with 27 DOT.

![bags list example 2](../assets/staking/bags-list-example-2.png)

Once the nomination period ends, the NPoS election mechanism takes the nomination intents and their
associated votes as input, and outputs a set of validators. The bags are iterated from the most
staked to the least staked. This could leave the last touched bag to only be partially iterated.
This means that in some edge cases, the order of members within a bag is also important. Recall that
within each bag, the iteration order is simply the insertion order. If only 7 nodes must be picked
for the electing set, the nodes with 5 and 7 DOT will be selected while the node with 8 DOT will be
left out.

![bags list example 3](../assets/staking/bags-list-example-3.png)

If one receives staking rewards and the amount of staked tokens within the stash account increases
over time, the position within a bag changes and may also result in a change of bag. This may also
happen if accounts within the bag bond more tokens or unbond tokens, one's account position and the
position of other accounts in the bags list might change. These changes are not done automatically.
The `voterList` pallet comes with the extrinsic `putInFrontOf` which helps the node to move up in the
bag. Also, the pallet comes with an important permissionless extrinsic: `rebag`. This
allows anyone to specify another account that is in the wrong bag, and place it in the correct one.
Actions like bonding/unbonding tokens automatically rebags the nominator node, but events like
staking rewards/slashing do not. Check the [bags-list](learn-nominator.md#bags-list) section for
more information.

This sorting functionality using bags is extremely important for the
[long-term improvements](https://gist.github.com/kianenigma/aa835946455b9a3f167821b9d05ba376) of the
staking/election system. The bags-list is capable of including an unlimited number of nodes, subject
to the chain's runtime storage. In the current staking system configuration, the bags list keeps
{{ polkadot: <RPC network="polkadot" path="query.staking.maxNominatorsCount" defaultValue={50000}/> :polkadot }}
{{ kusama: <RPC network="kusama" path="query.staking.maxNominatorsCount" defaultValue={20000}/> :kusama }}
nomination intents, of which, at most {{ polkadot: 22,500 :polkadot }}{{ kusama: 20,000  :kusama }}
come out as the electing nominators. Check
[Staking Election Stages](learn-nominator.md#staking-election-stages) section for more info.

:::caution Minimum active nomination threshold to earn rewards is dynamic

Once again, submitting a nomination intent does not guarantee staking rewards. The stake of the top
{{ polkadot: 22,500 :polkadot }}{{ kusama: 20,000  :kusama }} nominators is applied to the
validators in the active set. To avail staking rewards, ensure that the number of tokens bonded is
higher than the minimum active nomination. For more information, check the
[nominator guide](learn-nominator.md)

:::

The solution of the election of nominators has to meet certain requirements, such as maximizing the
amount of stake to nominate validators and distributing the stake backing validators as evenly as
possible. The objectives of this election mechanism are to maximize the security of the network, and
achieve fair representation of the nominators. If you want to know more about how NPoS works (e.g.
election, running time complexity, etc.), please read
[here](http://research.web3.foundation/en/latest/polkadot/NPoS.html).

### Rewards distribution

:::info

The general rule for rewards across validator pools is that two validator pools get paid essentially
the same amount of tokens for equal work, i.e. they are not paid proportional to the stakes in
each pool. There is a probabilistic component to staking rewards in the form of
[era points](../maintain/maintain-guides-validator-payout.md##era-points) and
[tips](learn-transaction-fees.md#fee-calculation) but these should average out over time.

:::

Validator pools are paid the same regardless of stake level. Pools with less stake will generally pay more to nominators
per-token than pools with more stake. This gives nominators an economic incentive to gradually shift their preferences to lower staked
validators that gain a sufficient amount of reputation. A consequence of this is that the stake across validator pools will be as evenly distributed as possible, to avoid a concentration of power among a few validators. In the long term, validator pools will have similar levels of stake, with the stake
being higher for higher reputation validators (meaning that a nominator that is willing to risk more
by backing a validator with a low reputation will get paid more).

Before distributing rewards to nominators, validators can create a cut of the reward (a commission) that is not shared with the nominators.
This cut is a percentage of the block reward, not an absolute value. After the commission gets
deducted, the remaining portion is based on their staked value and split between the validator and
all of the nominators who have voted for this validator.

For example, assume the block reward for a validator is 10 DOT. A validator may specify
`validator_commission = 50%`, in which case the validator would receive 5 DOT. The remaining 5 DOT
would then be split between the validator and their nominators based on the proportion of stake each
nominator had. Note that validators can put up their own stake, and for this calculation, their
stake acts just as if they were another nominator.

Within a validator pool, a percentage of the reward goes thus to pay the validator's
commission fees and the remainder is paid pro-rata (i.e. proportional to stake) to the
nominators and validator. If a validator's commission is set to 100%, no tokens will be paid out to any
nominations in the validator pool. Notice in particular that the validator is rewarded twice: once in
commission fees for validating (if their commission rate is above 0%), and once for nominating
itself with stake.

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

|               | **A - Validator Pool** |                             |         |
| :-----------: | :--------------------: | :-------------------------: | :-----: |
| Nominator (4) |      Stake (600)       | Fraction of the Total Stake | Rewards |
|      Jin      |          100           |            0.167            |  16.7   |
|    **Sam**    |           50           |            0.083            |   8.3   |
|     Anson     |          250           |            0.417            |  41.7   |
|     Bobby     |          200           |            0.333            |  33.3   |

|               | **B - Validator Pool** |                             |         |
| :-----------: | :--------------------: | :-------------------------: | :-----: |
| Nominator (4) |      Stake (400)       | Fraction of the Total Stake | Rewards |
|     Alice     |          100           |            0.25             |   25    |
|     Peter     |          100           |            0.25             |   25    |
|     John      |          150           |            0.375            |  37.5   |
|   **Kitty**   |           50           |            0.125            |  12.5   |

_Both validator pools A & B have 4 nominators with the total stake 600 and 400 respectively._

Based on the above rewards distribution, nominators in validator pool B get more rewards per DOT
than those in pool A because pool A has more overall stake. Sam has staked 50 DOT in pool A, but he
only gets 8.3 in return, whereas Kitty gets 12.5 with the same amount of stake.


To estimate how many tokens you can get each month as a nominator or
validator, you can use this [tool](https://www.stakingrewards.com/earn/polkadot/calculate) as a
reference and play around with it by changing some parameters (e.g. how many days you would like to
stake with your DOT, provider fees, compound rewards, etc.) to have a better estimate. Even though
it may not be entirely accurate since staking participation is changing dynamically, it works well
as an indicator.

#### Oversubscription, commission fees & slashes

There is an additional factor to consider in terms of rewards. While there is no limit to the number
of nominators a validator may have, a validator does have a limit to how many nominators to which it
can pay rewards. In {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} this limit is currently {{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={256}/> :polkadot }}{{ kusama: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={256}/> :kusama }}, although this can be
modified via runtime upgrade. A validator with more than {{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={256}/> :polkadot }}{{ kusama: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={256}/> :kusama }} nominators is
_oversubscribed_. When payouts occur, only the top {{ polkadot: <RPC network="polkadot" path="consts.staking.maxNominatorRewardedPerValidator" defaultValue={256}/> :polkadot }} nominators as measured by amount of stake allocated to that validator will receive rewards. All other nominators
are essentially "wasting" their stake - they used their nomination to elect that validator to the
active stake, but receive no rewards in exchange for doing so.

Note that the network slashes a validator slot for a misbehavior (e.g. validator
offline, equivocation, etc.) the slashed amount is a fixed percentage (and not a fixed amount),
which means that validator pools with more stake get slashed more DOT. Again, this is done to
provide nominators with an economic incentive to shift their preferences and back less popular
validators whom they consider to be trustworthy.

Also note that each validator candidate is free to name their desired commission
fee (as a percentage of rewards) to cover operational costs. Since validator pools are paid the
same, pools with lower commission fees pay more to nominators than pools with higher fees. Thus,
each validator can choose between increasing their fees to earn more, or decreasing their fees to
attract more nominators and increase their chances of being elected. In the long term, we expect
that all validators will need to be cost efficient to remain competitive, and that validators with
higher reputation will be able to charge slightly higher commission fees (which is fair).

### Claiming rewards

{{ kusama: Note that Kusama runs approximately 4x as fast as Polkadot, except for block production times.
Polkadot will also produce blocks at approximately six second intervals. :kusama }}

Rewards are recorded per session (approximately {{ polkadot: 4 hours :polkadot }}{{ kusama: one hour :kusama }}) and
calculated per era (approximately {{ polkadot: 24 hours :polkadot }}{{ kusama: 6 hours :kusama }}). Thus,
rewards will be calculated {{ polkadot: once per day :polkadot }}{{ kusama: 4 times per day :kusama }}. Rewards are calculated based on era points, which have a probabilistic component. In other words,
there may be slight differences in your rewards from era to era, and even amongst validators in the
active set at the same time. These variations should cancel out over a long enough timeline. See the
page on [Validator Payout Guide](../maintain/maintain-guides-validator-payout.md).

In order to be paid your staking rewards, someone must claim them for each validator that you
nominate. Staking rewards are kept available for 84 eras, which is approximately {{ polkadot: 84 days :polkadot }}{{ kusama: 21 days :kusama }}. For more information on why this is so, see the page on [simple payouts](learn-simple-payouts.md).

:::info Payouts

Payouts are unclaimed rewards waiting to be paid out to both validators and nominators. If you go to the Staking payouts page on
[Polkadot-JS](https://polkadot.js.org/apps/#/staking), you will see a list of all validators
that you have nominated in the past 84 eras and for which you have not yet received a payout. The payout page is visible only to stakers.

:::

Each validator as well as their nominators have the option to trigger the payout for all unclaimed eras. Note that this will pay everyone
who was nominating that validator during those eras. Therefore, you may not
see anything in this tab, yet still have received a payout if somebody (generally, but not
necessarily, another nominator or the validator operator) has triggered the payout for that
validator for that era.

:::warning Time limit

If nobody claims your staking rewards within 84 eras, then you will not be able to claim them and they will be lost. Additionally, if the validator unbonds all their own stake, any pending payouts will also be lost. Since unbonding takes {{ polkadot: 28 days :polkadot }}{{ kusama: 7 days :kusama }}, nominators should check if they have pending payouts at least this often.

:::

Rewards can be directed to the same account used to sign the payout (controller), to the stash account (and either
increasing the staked value or not increasing the staked value), or to a completely unrelated
account. It is also possible to top-up / withdraw some bonded tokens without having to un-stake all staked tokens.

If you wish to check if you received a payout, you will have to check via a block explorer. See
[the relevant Support page](https://support.polkadot.network/support/solutions/articles/65000168954-how-can-i-see-my-staking-rewards-)
for details.

For specific details about validator payouts, please see
[this guide](../maintain/maintain-guides-validator-payout.md).

## Slashing

Slashing will happen if a validator misbehaves (e.g. goes offline, attacks the network, or runs
modified software) in the network. They and their nominators will get slashed by losing a percentage
of their bonded/staked DOT.

Any slashed DOT will be added to the [Treasury](learn-treasury.md). The rationale for this (rather
than burning or distributing them as rewards) is that slashes may then be reverted by the Council by
simply paying out from the Treasury. This would be useful in situations such as a faulty slashes. In the case of
legitimate slashing, it moves tokens away from malicious validators to those building the ecosystem
through the normal Treasury process.

Validator pools with larger total stake backing them will get slashed more harshly than less popular
ones, so we encourage nominators to shift their nominations to less popular validators to reduce
their possible losses.

It is important to realize that slashing only occurs for active validations for a given nominator,
and slashes are not mitigated by having other inactive or waiting nominations. They are also not
mitigated by the validator operator running separate validators; each validator is considered its
own entity for purposes of slashing, just as they are for staking rewards.

In rare instances, a nominator may be actively nominating several validators in a single era. In
this case, the slash is proportionate to the amount staked to that specific validator. Note that you cannot control the percentage of stake you have allocated
to each validator or choose who your active validator will be (except in the trivial case of
nominating a single validator). Staking allocations are controlled by the
[Phragmén algorithm](learn-phragmen.md).

Once a validator gets slashed, it goes into the state as an "unapplied slash". You can check this
via
[Polkadot-JS Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/staking/slashes).
The UI shows it per validator and then all the affected nominators along with the amounts. While
unapplied, a governance proposal can be made to reverse it during this period (7 days on Kusama, 28
days on Polkadot). After the grace period, the slashes are applied.

The following levels of offence are
[defined](https://research.web3.foundation/en/latest/polkadot/slashing/amounts.html). However, these
particular levels are not implemented or referred to in the code or in the system; they are meant as
guidelines for different levels of severity for offences. To understand how slash amounts are
calculated, see the equations in the section below.

- Level 1: isolated unresponsiveness, i.e. being offline for an entire session. Generally no
  slashing, only [_chilling_](#chilling).
- Level 2: concurrent unresponsiveness or isolated equivocation, it slashes a very small amount of the
  stake and chills.
- Level 3: misconducts unlikely to be accidental, but which do not harm the network's security to
  any large extent. Examples include concurrent equivocation or isolated cases of unjustified voting
  in [GRANDPA](learn-consensus.md). Slashes a moderately small amount of the stake and chills.
- Level 4: misconduct that poses a serious security or monetary risk to the system, or mass
  collusion. Slashes all or most of the stake behind the validator and chills.

For more information about slashing visit the dedicated page.

## Chilling

Chilling is the act of stepping back from any nominating or validating. It can be done by a
validator or nominator at any time themselves, taking effect in the next era. It can also
specifically mean removing a validator from the active validator set by another validator,
disqualifying them from the set of electable candidates in the next NPoS cycle.

Chilling may be voluntary and validator-initiated, e.g. if there is a planned outage in the
validator's surroundings or hosting provider, and the validator wants to exit to protect themselves
against slashing. When voluntary, chilling will keep the validator active in the current session,
but will move them to the inactive set in the next. The validator will not lose their nominators.

When used as part of a punishment (initiated externally), being chilled carries an implied penalty
of being un-nominated. It also disables the validator for the remainder of the current era and
removes the offending validator from the next election.

Polkadot allows some validators to be disabled, but if the number of disabled validators gets too
large, Polkadot will trigger a new validator election to get a full set. Disabled validators will
need to resubmit their intention to validate and re-garner support from nominators.

For more on chilling, see the [How to Chill][] page on this wiki.


## Inflation

{{ polkadot: DOT is inflationary; there is no maximum number of DOT. Inflation is designed
to be approximately 10% annually, with validator rewards being a function of the amount staked
and the remainder going to treasury. The current token supply of DOT is ~1,000,000,000, as
a result of [redenomination](../general/redenomination.md). :polkadot }}

{{ kusama: KSM is inflationary; there is no maximum number of KSM. Inflation is designed
to be approximately 10% annually, with validator rewards being a function of the amount staked
and the remainder going to treasury. The current token supply of KSM is ~10,000,000. :kusama }}

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

You can determine the inflation rewards by checking the staking overview on
[Polkadot-JS Apps](https://polkadot.js.org/apps/#/staking).

The above chart shows the inflation model of the network. Depending on the staking participation,
the distribution of the inflation to validators/nominators versus the treasury will change
dynamically to provide incentives to participate (or not participate) in staking.

For instance, assuming that the ideal staking rate is 50%, all of the inflation would go to the
validators/nominators if 50% of all KSM / DOT are staked. Any deviation from the 50% - positive or
negative - sends the proportional remainder to the treasury and effectively reduces staking rewards.

For those who are interested in knowing more about the design of inflation model for the network,
please see
[here](https://w3f-research.readthedocs.io/en/latest/polkadot/overview/2-token-economics.html).

### Why stake?

- 10% inflation/year when the network launches
- 50% targeted active staking
- ~20% annual nominal return

Up until now, the network has been following an inflation model that excludes the metric of active
parachains. The ideal staking rate is not always 50%, as the number of active parachains influences
the available liquidity that is available to secure the network.

Keep in mind that when the system's staking rate is lower than the ideal staking rate, the annual
nominal return rate will be higher, encouraging more users to use their tokens for staking. On the
contrary, when the system staking rate is higher than the ideal staking rate, the annual nominal
return will be less, encouraging some users to withdraw.

### Why not stake?

- Tokens will be locked for about 28 days on Polkadot after unbonding, seven days on Kusama.
- Punishment in case of validator found to be misbehaving (see [#slashing](#slashing)).
- You want to use the tokens for a parachain slot.

## How many validators does Polkadot have?

Polkadot started with 20 open validator positions and has increased gradually to 297. The top bound
on the number of validators has not been determined yet, but should only be limited by the bandwidth
strain of the network due to peer-to-peer message passing. The estimate of the number of validators
that Polkadot will have at maturity is around 1000. Kusama, Polkadot's canary network, currently has
900 validator slots in the active set.

## Resources

- [How Nominated Proof of Stake will work in Polkadot](https://medium.com/web3foundation/how-nominated-proof-of-stake-will-work-in-polkadot-377d70c6bd43) -
  Blog post by Web3 Foundation researcher Alfonso Cevallos covering NPoS in Polkadot.
- [Validator setup](../maintain/maintain-guides-secure-validator.md)

[epoch]: ../general/glossary.md#epoch
[how to chill]: ../maintain/maintain-guides-how-to-chill.md
