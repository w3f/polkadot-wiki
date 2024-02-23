---
id: learn-polkadot-opengov
title: Introduction to Polkadot OpenGov
sidebar_label: Polkadot OpenGov
description: Polkadot’s Latest Model for Decentralized Governance.
keywords: [governance, referenda, proposal, voting, endorse]
slug: ../learn-polkadot-opengov
---

import RPC from "./../../components/RPC-Connection";

import VLTable from "./../../components/Voluntary-Locking";

import Fellowship from "./../../components/Fellowship";

:::caution The content in this document is subject to change

The governance protocol has already undergone iterations (see
[Governance V1](./learn-governance.md)). Governance is a constantly evolving protocol at this stage
in its lifecycle.

For technical information about Polkadot OpenGov and how to interact with it, please refer to this
[dedicated Wiki page](./learn-guides-polkadot-opengov.md).

For additional support about Polkadot OpenGov see the
[dedicated support pages](https://support.polkadot.network/support/solutions/65000105211).

:::

:::info Polkadot Delegation Dashboard

See the video tutorial below to easily delegate your votes to somebody else using the
[Polkadot Delegation Dashboard](https://delegation.polkadot.network/).

<div className="row">
  <div className="col text--center">
    <a href="https://www.youtube.com/watch?v=RapBYZc5ZPo">
      <img src="https://img.youtube.com/vi/RapBYZc5ZPo/0.jpg" width="350" style={{ borderRadius: 10, border: '1px solid slategrey' }} />
    </a>
    <p>
      <a href="https://www.youtube.com/watch?v=RapBYZc5ZPo">Delegation Dashboard Tutorial</a>
    </p>
  </div>
</div>

**If you become a nomination pool member or a pool admin, you cannot participate in Governance with
the bonded tokens in the pool, as they are held in a
[system account](./learn-account-advanced.md#system-accounts).**

:::

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} uses a sophisticated governance
mechanism that allows it to evolve gracefully overtime at the ultimate behest of its assembled
stakeholders. The stated goal is to ensure that the majority of the stake can always command the
network.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} brings together various novel
mechanisms, including an amorphous (abstract) form of state-transition function stored on-chain
defined in a platform-agnostic language (i.e. [WebAssembly](learn-wasm.md)), and several on-chain
voting mechanisms such as referenda and batch approval voting. All changes to the protocol must be
agreed upon by stake-weighted referenda.

## Premise

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}'s first governance system
([Governance V1](./learn-governance.md)) included three main components.

- The [Technical Committee](./learn-governance.md#technical-committee): A technocratic committee to
  manage upgrade timelines.
- The [Council](./learn-governance.md#council): An approval-voted, elected executive "government" to
  manage parameters, admin, and spending proposals.
- The Public: All token holders.

Over the first few years of operation, Governance V1 ensured the appropriate usage of treasury funds
and enabled timely upgrades and fixes. Like most early technologies, protocols must evolve as they
mature to improve their shortcomings and keep up with modern advancements. In Governance V1, all
referenda carried the same weight as only one referendum could be voted on at a time (except for
emergency proposals), and the voting period could last multiple weeks. Also, an
[alternating voting timetable](./learn-governance.md#alternating-voting-timetable) allowed to vote
either for a public referendum or a council motion every
{{ polkadot: 28 days :polkadot }}{{ kusama: 7 days :kusama }}. This resulted in the system favoring
careful consideration of very few proposals instead of broad consideration of many.

Polkadot OpenGov changes how the practical means of day-to-day decisions are made, making the
repercussions of referenda better scoped and agile to increase the number of collective decisions
the system can make at any given time.

The following content is focused on what the new Polkadot OpenGov version brings to the governance
on {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, and on the main differences with
previous governance versions. We recommend learning about [Governance v1](./learn-governance.md) to
better understand the need for and the direction of Polkadot OpenGov.

## Summary

In Governance v1, active token holders (public) and the Council together administrated network's
upgrade decisions. Whether the public or the council initiated the proposal, it would eventually
have to go through a referendum to let all holders (weighted by stake and conviction) make the
decision.

The Council fulfilled its role as the representative of the public, guardian of the treasury and
initiator of legislation, but it was often seen as a centralized entity. To further decentralize
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, Polkadot OpenGov proposes the
following main changes:

- Migrating all responsibilities of the Council to the public via a direct democracy voting system.
- Dissolving the current [Council](./learn-governance.md#council) collective
- Allowing users to delegate voting power in more ways to community members
- Dissolving the [Technical Committee](./learn-governance.md#technical-committee) and establishing
  the broader [Polkadot Technical Fellowship](./learn-polkadot-technical-fellowship.md)

The figure below shows an overview of Polkadot OpenGov's structure.

:::info

See [this page](./learn-governance.md#summary) for a comparison with the structure of Governance V1.

:::

![opengov-overview](../assets/opengov-overview.png)

In Polkadot OpenGov, all the proposals are initiated by the public. The proposal will enter a
Lead-in period (for more information, see [Referenda Timeline](#referenda-timeline)), after which it
will follow a specific [Track](#origins-and-tracks) which has a dedicated Origin. There are
[15 Origins](./learn-polkadot-opengov-origins.md#origins-and-tracks-info), each with a different
track. The origins and tracks parameters are preset values that set the duration of a referendum as
well as how many referenda can be voted on simultaneously. For example, a treasury proposal can now
be submitted in different tracks depending on the amount requested. A proposal for a small tip will
need to be submitted in the Small Tipper track, while a proposal requiring substantial funds will
need to be submitted to the Medium or Big Spender track.

The [Polkadot Technical Fellowship](./learn-polkadot-technical-fellowship.md) can decide to
[whitelist](#whitelisting) a proposal that will be enacted through the Whitelist Caller origin.
Those proposals will have a shorter Lead-in, Confirmation, and Enactment period when compared to the
Root Origin track.

Each track has its own preset [Approval and Support](#approval-and-support) curves which are based
on the origin's privileges. When both the approval and support criteria are satisfied for a specific
period (called the confirmation period), the referenda passes and will be executed after the
enactment period.

All referenda within each track and across tracks can be voted on simultaneously (assuming track
maximum capacity is not reached).

Polkadot OpenGov also comes with multi-role delegations where the token holder can assign voting
power on different tracks to different entities who are experts in judging the referenda submitted
to those tracks. For example, suppose a token holder does not have the technical background to
consider the merits and vote on the referenda submitted to the Root track. In that case, they can
delegate their voting power just for the Root track to a trusted expert who (according to them) acts
in the best interest of the network protocol. In this way, token holders do not need to be
up-to-date with governance matters and can still make their votes count through delegates.

:::info Delegation Dashboard

To easily delegate your votes you can use the
[Polkadot Delegation Dashboard](https://delegation.polkadot.network/). See
[this video tutorial](https://www.youtube.com/watch?v=RapBYZc5ZPo) to know more about the dashboard
and learn how to use it.

:::

## Gov1 vs. Polkadot OpenGov

| Governance V1                                                                                                                                                                                                                                                                                                                                  | Polkadot OpenGov                                                                                                                                                                                                                                       | Polkadot OpenGov Benefit                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Includes the [Council](./learn-governance.md#council), the [Technical Committee](./learn-governance.md#technical-committee), and the Public (i.e. token holders).                                                                                                                                                                              | Includes the Public and the [Technical Fellowship](./learn-polkadot-technical-fellowship.md).                                                                                                                                                          | Simpler and more decentralized structure.                                                                                                                                      |
| Referenda executed only from one origin (Root). Referenda in this origin must be carefully scrutinized. Therefore, there is only one track (i.e. only one referendum at a time can be executed).                                                                                                                                               | Referenda executed from [multiple origins](./learn-polkadot-opengov-origins.md#origins-and-tracks-info), each with a different track that shapes proposals’ timelines. Depending on the origin, multiple referenda within the same track are possible. | Possibility to categorize proposals (based on importance and urgency) and execute them simultaneously within and between origin tracks.                                        |
| Proposals can be submitted by either the Council or the Public.                                                                                                                                                                                                                                                                                | The public submits proposals.                                                                                                                                                                                                                          | More democratic.                                                                                                                                                               |
| Uses [Adaptive Quorum Biasing](./learn-governance.md#adaptive-quorum-biasing) to define the approval threshold based on turnout. Given the same turnout, council-initiated referenda require fewer Aye votes to pass compared to public referenda.                                                                                             | Uses origin-specific approval and support curves defining the amount of approval and support (i.e. turnout) needed as a function of time. The same curves are applied to all referenda within the same origin track.                                   | Referenda timeline depends on the origin and not on who submitted the proposal (i.e. Council or Public). This is a more democratic and equalitarian system.                    |
| Uses [alternating voting timetable](./learn-governance.md#alternating-voting-timetable) allowing voters to cast votes for either council or public referenda every 28 eras.                                                                                                                                                                    | Multiple referenda can be voted at the same time.                                                                                                                                                                                                      | More flexible and agile governance system.                                                                                                                                     |
| Except for emergency proposals, all referenda have fixed voting and enactment periods of 28 eras.                                                                                                                                                                                                                                              | Periods' length is customizable and has pre-defined limits for each origin. The same limits apply to all tracks with the same origin. For example, the track in the origin Root will be longer than the track within the Small Tipper origin.          | Referenda’s timeline is tailored to their importance and urgency. Flexible enactment period based on origin.                                                                   |
| Emergency proposals turned referenda can be simultaneously voted on and executed with other referenda and have shorter enactment periods. They must be proposed by the Technical Committee and approved by the Council.                                                                                                                        | No emergency proposals. The Technical Fellowship can whitelist proposals that will have their origin with shorter lead-in, confirmation, and enactment periods.                                                                                        | The Technical Fellowship is a more decentralized entity when compared to the Technical Committee. Whitelisting a proposal requires a majority of approval from the fellowship. |
| Only the [most-endorsed proposal](./learn-governance.md#endorsing-proposals) is able to transit from Launch to Voting period. The time for the transition is indeterminate, and (with no possibility of canceling endorsements) proposers and endorsers might wait a long time before a referendum is tabled, and getting their deposits back. | All proposals will eventually be voted on (given track capacity and deposit are met and the Lead-in period has ended).                                                                                                                                 | It allows all proposals to get a chance to be voted on in a timely predictive manner.                                                                                          |
| Only _aye_ or _nay_ votes possible.                                                                                                                                                                                                                                                                                                            | Voters can have the additional voting options of abstaining or splitting votes.                                                                                                                                                                        | More ways to engage in voting and increase turnout.                                                                                                                            |
| Voters can decide to delegate votes to another account.                                                                                                                                                                                                                                                                                        | Voters can use [multirole delegations](#multirole-delegation) and delegate votes to different accounts depending on origins.                                                                                                                           | More agile delegations tailored by expertise.                                                                                                                                  |

## Proposals

:::info Starting a proposal in Governance v1

See [this page](./learn-governance.md#proposals) for more information about starting referenda in
Governance v1.

:::

In Polkadot OpenGov, anyone can start a referendum at any time and do so as often as they wish.
Previous features were expanded and improved, most notably
[**Origins and Tracks**](#origins-and-tracks) help aid in the flow and processing of the submitted
referenda.

### Cancelling and Blacklisting

:::info Cancelling Referenda in Governance v1

See [this page](./learn-governance.md#cancelling-proposals) for more information about cancelling
referenda in Governance v1.

:::

In Polkadot OpenGov, there is a special operation called **Cancellation** for intervening with a
proposal already being voted on. The operation will immediately reject an ongoing referendum
regardless of its status. There is also a provision to ensure the deposit of the proposer is slashed
if the proposal is malicious or spam.

Cancellation is a governance operation the network must vote on to be executed. Cancellation comes
with [its own Origin and Track](./learn-polkadot-opengov-origins.md#referendum-canceller) which has
a low lead-time and Approval/Support curves with slightly sharper reductions in their thresholds for
passing, given that it is invoked with a sense of urgency.

For more information about how to cancel a referendum see the
[advanced how-to guides](./learn-guides-polkadot-opengov#cancel-or-kill-a-referendum).

:::info Blacklisting

Blacklisting referenda in Polkadot OpenGov is
[the same as in Governance v1](./learn-governance.md#blacklisting-proposals).

:::

## Referenda

:::info Public and Council Referenda in Governance v1

With the Council's dissolution, [council referenda](./learn-governance.md#council-referenda) are no
longer present in Polkadot OpenGov.

See [this page](./learn-governance.md#public-referenda) for more information about public referenda
in Governance v1.

:::

**In Polkadot OpenGov all referenda are public.** The
[Technical Fellowship](./learn-polkadot-technical-fellowship.md) has the option to
[whitelist](#whitelisting) referenda that can be then proposed in the track with
[whitelist origin](./learn-polkadot-opengov-origins.md#whitelisted-caller).

### Referenda Timeline

:::info Voting timetable in Governance v1

See [this page](./learn-governance.md#referenda-timeline) for more information about the voting
timetable in Governance v1.

:::

![opengov-timeline](../assets/opengov-timeline.png)

The figure above provides a summary view of the referenda timeline for Polkadot OpenGov.

In (1), when a referendum is initially created, the community can immediately vote on it. However,
it is not immediately in a state where it can end or otherwise have its votes counted, be approved,
and ultimately enacted. Instead, the proposal will stay within a **Lead-in Period** until it
fulfills three criteria:

- Proposals must stay within the lead-in period for a pre-defined minimum amount of time. This helps
  mitigate against the possibility of "decision sniping" where an attacker controlling a substantial
  amount of voting power might seek to have a proposal passed immediately after proposing, not
  allowing the overall voting population adequate time to consider and participate.
- There must be enough room for the decision within the origin. Different origins have their limit
  on the number of proposals that can be decided simultaneously. Tracks that have more potent
  abilities will have lower limits. For example, the Root level Origin has a limit of one, implying
  that only a single proposal may be decided on at once.
- A decision deposit must be submitted. Creating a referendum is cheap as the deposit value consists
  of only the value required for the on-chain storage needed to track it. But, having a referendum
  reviewed and decided upon carries the risk of using up the limited spots available in the
  referenda queue. Having a more significant but refundable deposit requirement makes sense to help
  mitigate spam. Failing to submit the decision deposit will lead to a referendum _timeout_.

Until they are in the lead-in period, proposals remain undecided. Once the criteria above are met,
the referendum moves to the _deciding_ state. The votes of the referendum are now counted towards
the outcome.

In (2), the proposal enters the **Decision Period** where voting can continue. For a proposal to be
approved, votes must satisfy the approval and support criteria for at least the **Confirmation
Period**; otherwise, the proposal is automatically rejected. A rejected proposal can be resubmitted
anytime and as many times as needed.

In (3), approved proposals will enter the **Enactment Period**, after which proposed changes will be
executed.

Note how the length of the lead-in, decision, confirmation, and enactment periods vary depending on
the track. Root origin track has more extended periods than the other tracks. Also, the number of
referenda within each track differs, with the Root origin track only accepting one. proposal at a
time (see below).

![opengov-track-capacity](../assets/opengov-track-capacity.png)

This directly affects the number of proposals that can be voted on and executed simultaneously.
Continuing the comparison between Root and Small Tipper, Small Tipper will allow many proposals on
its track to be executed simultaneously. In contrast, Root will allow only one proposal in its
track. Once the track capacity is filled, additional proposals in the lead-in period will queue
until place is available to enter the decision period.

### Origins and Tracks

An **Origin** is a specific level of privilege that will determine the **Track** of all referenda
executed with that origin. The track is basically a pipeline in which the proposal lives and
proceeds and is independent from other origins' tracks. The proposer of the referenda now selects an
appropriate Origin for their request based on the proposal’s requirements.

Although the track structure is the same for all origins, track parameters are not. Such parameters
include:

- **Maximum Deciding or Capacity**: the limit for the number of referenda that can be decided at
  once (i.e. the number of tracks within each origin).
- **Decision deposit**: the amount of funds that must be placed on deposit to enter the Decision
  Period (note that more requirements must be met to enter the Decision Period).
- **Preparation Period**: the minimum amount of voting time needed before entering the Decision
  Period (given capacity and deposit are met).
- **Decision Period**: the time interval during which a proposal's outcome can be decided. 
- **Confirmation Period**: the minimum amount of time the approval and
  support criteria must hold before the proposal is approved and moved to the enactment period. The
  confirmation period should start before the end of decision period.
- **Minimum Enactment Period**: the minimum amount of waiting time before the proposed changes are
  applied
- **Approval Curve**: the curve describing the minimum % of _aye_ votes as a function of time within
  the Decision Period. The approval % is the portion of _aye_ votes (adjusted for conviction) over
  the total votes (_aye_, _nay_, and _abstained_).
- **Support Curve**: the curve describing the minimum % of all votes in support of a proposal as a
  function of time within the Decision Period. The support % is defined as the portion of all votes
  (_aye_ and _abstained_) without conviction over the total possible amount of votes in the system
  (i.e. the total active issuance).

For example, a runtime upgrade (requiring a `set_code` call, if approved) does not have the same
implications for the ecosystem as the approval of a treasury tip (`reportAwesome` call), and
therefore different Origins for these two actions are needed in which different deposits, support,
approval, and a minimum [enactment](#enactment) periods will be predetermined on the pallet.

For detailed information about origin and tracks, and parameter values in Kusama, see
[this page](./learn-polkadot-opengov-origins.md#origins-and-tracks-info).

### Voluntary Locking (Conviction Voting)

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} utilizes an idea called voluntary
locking that allows token holders to increase their voting power by declaring how long they are
willing to lock up their tokens; hence, the number of votes for each token holder will be calculated
by the following formula:

```
votes = tokens * conviction_multiplier
```

The conviction multiplier increases the vote multiplier by one every time the number of lock periods
double.

<VLTable />

The maximum number of "doublings" of the lock period is set to 6 (and thus 32 lock periods in
total), and one lock period equals
{{ polkadot: <RPC network="kusama" path="consts.convictionVoting.voteLockingPeriod" defaultValue={100800} filter="blocksToDays"/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.convictionVoting.voteLockingPeriod" defaultValue={100800} filter="blocksToDays"/> :kusama }}
days. For additional information regarding the timeline of governance events, check out the
governance section on the
{{ polkadot: [Polkadot Parameters page](maintain-polkadot-parameters/#governance) :polkadot }}{{ kusama: [Kusama Parameters page](kusama-parameters/#governance) :kusama }}.

:::info do votes stack?

You can use the same number of tokens to vote on different referenda. Votes with conviction do not
stack. If you voted with 5 {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} on Referenda A, B
and C with 2x conviction you would have 10 votes on all those referenda and 5
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} locked up only for the 2x conviction period
(i.e. {{ polkadot: two weeks :polkadot }}{{ kusama: two weeks :kusama }}), with the unlocking
countdown starting when the last referendum you voted on ends (assuming you are on the winning
side). If you voted with conviction on referendum and then a week later voted on another one with
the same conviction, the lock on your {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} will be
extended by a week (always assuming you are on the winning side).

:::

:::info Staked tokens can be used in governance

While a token is locked, you can still use it for voting and [staking](./learn-staking.md). You are
only prohibited from transferring these tokens to another account.

:::

Votes are always "counted" at the same time (at the end of the voting period), no matter for how
long the tokens are locked.

See below an example that shows how voluntary locking works.

Peter: Votes `No` with
{{ polkadot: 10 DOT for a 32-week :polkadot }}{{ kusama: 1 KSM for a 32-week :kusama }} lock period
=> {{ polkadot: 10 x 6 = 60 Votes :polkadot }}{{ kusama: 1 x 6 = 6 Votes :kusama }}

Logan: Votes `Yes` with
{{ polkadot: 20 DOT for one week :polkadot }}{{ kusama: 2 KSM for one week :kusama }} lock period =>
{{ polkadot: 20 x 1 = 20 Votes :polkadot }}{{ kusama: 2 x 1 = 2 Votes :kusama }}

Kevin: Votes `Yes` with
{{ polkadot: 15 DOT for a 2-week :polkadot }}{{ kusama: 1.5 KSM for a 2-week :kusama }} lock period
=> {{ polkadot: 15 x 2 = 30 Votes :polkadot }}{{ kusama: 1.5 x 2 = 3 Votes :kusama }}

Even though combined both Logan and Kevin vote with more
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} than Peter, the lock period for both of them
is less than Peter, leading to their voting power counting as less.

:::info Conviction Voting Locks created during Gov 1

Conviction voting locks in Governance v1 will not be carried over to OpenGov. Voting with conviction
in OpenGov will create a new lock (as this will use the `convictionVoting` pallet), while any
existing lock under Governance v1 (using the deprecated `democracy` pallet) will be left to expire.
Delegations under Governance v1 will need to be re-issued under OpenGov.

:::

### Approval and Support

:::info Adaptive Quorum Biasing is deprecated

In Polkadot OpenGov, [Adaptive quorum biasing](./learn-governance.md#adaptive-quorum-biasing) used
in Governance V1 has been replaced with the **Approval and Support system**.

:::

![opengov-curves-pass](../assets/opengov-curves-pass.png)

The figure above provides a summary view of how the approval and support system works during the
Decision Period.

Once the proposal exits the Lead-in Period and enters the Voting Period, to be approved, it must
satisfy the approval and support criteria for the **Confirmation Period**.

- **Approval** is defined as the share of [conviction](#voluntary-locking)-weighted _aye_ votes
  against the conviction-weighted total of _aye_ and _nay_ votes. The code implementation can be
  viewed
  [here](https://github.com/paritytech/polkadot-sdk/blob/f2fbba3be1d7deaf7cfc731cea00552c212ddfcf/substrate/frame/conviction-voting/src/types.rs#L77)
- **Support** is the total number of _aye_ and _abstain_ votes (ignoring any adjustment for
  conviction) compared to the total possible votes ([active issuance](learn-DOT.md#token-issuance))
  that could be made in the system. In case of _split_ votes, only _aye_ and _abstain_ will count.

For example, let us consider a hypothetical example where the total active issuance is
{{ polkadot: 100 DOT :polkadot }}{{ kusama: 100 KSM :kusama }}

- An account A votes "Aye" with 10 {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} with 4x
  conviction
- An account B votes "Nay" with 5 {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} with 2x
  conviction
- An account C votes "Abstain" with 20 {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}. (no
  conviction can be applied on "Abstain" votes)

In this scenario, only 35 {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} from the total
active issuance participated in voting on the referendum. Now, let us calculate the Approval and
Support values for that referendum.

- Approval is calculated as (Aye') / (Aye' + Nay') where Aye' and Nay' are the votes after the
  conviction multiplier is applied. Hence, Approval = (10 x 4) / (10 x 4 + 5 x 2) = 40/50 which is
  80%.
- Support is calculated as (Aye + Abstain) / (total active issuance), where "Aye" and "Abstain" are
  the votes without the conviction multiplier. Hence, Support = (10 + 20) / 100 which is 30%.

:::info Nay votes are not counted towards Support

Support is a measure of voters who turned out either in favor of the referenda and who consciously
abstained from it. Support does not include _nay_ votes. This avoids edge situations where _nay_
votes could push a referendum into confirming state. For example, imagine current approval is high
(near 100%, way above the approval curve), and current support is just below the support curve. A
_nay_ could bump support above the support curve but not reduce approval below the approval curve.
Therefore someone voting against a proposal would make it pass. Hence, a decrease in % of current
approval through new votes does not directly translate into increasing support because Support needs
to consider _nay_ votes.

:::

The figure above shows the following:

- Even if the approval threshold is reached (i.e. % of current approval is greater than the approval
  curve), the proposal only enters the confirmation period once the support threshold is also
  reached (i.e. % current support is greater than the underlying support curve).
- If the referendum meets the approval and support thresholds for the duration of the confirmation
  period, the proposal will be approved and will be scheduled for enactment. Each track has a
  default minimum Enactment Period and the approved referendum needs to wait till the end of it to
  be executed. Powerful Tracks like `Root` enforce a larger Enactment Period to ensure the network
  has ample time to prepare for any changes the proposal may bring. The referendum proposers can
  also choose to set the enactment period to be higher than its default value.
- A referendum may exit the confirmation period when the thresholds are no longer met, due to new
  _Nay_ votes or a change of existing _Aye_ or _Abstain_ votes to _Nay_ . Each time it exits, the
  confirmation period clock is reset. For example, if the confirmation period is 20 minutes and a
  referendum enters it just for 5 min before exiting, the next time it enters, it must be confirming
  for 20 minutes (not 15 minutes).
- It is possible that a referendum meets the approval and support thresholds almost at the end of
  decision period. In this case, even though the decision period elapses, the referendum can pass
  if it stays confirming for the duration of the track-specific confirmation period. If it exits
  the confirmation period after the decision period elapses, it is rejected immediately.
- The approval curve starts with a value of 100% and gradually goes to 50%, but never below.
  Assuming all the active token supply has voted on a proposal, the conviction vote weighted support
  should at least always be above 50% to pass.

![opengov-curves-pass](../assets/opengov-curves-nopass.png)

Note that support may not increase monotonically as shown in the figure, as people might switch
votes.

Different Origins' tracks have different Confirmation Periods and requirements for approval and
support. For additional details on the various origins and tracks, check out
[this table](./learn-polkadot-opengov-origins.md#origins-and-tracks-info). With proposals that use
less privileged origins, it is far more reasonable to drop the required support to a more realistic
amount earlier than those which use highly privileged classes such as `Root`.

### Enactment

:::info Enactment in Governance v1

See [this page](./learn-governance.md#enactment) for more information about enactment in Governance
v1.

:::

In Polkadot OpenGov, the proposer suggests the enactment period, but there are also a minimum set
for each Origin Track. For example, `root` Origin approvals require an extended period because of
the importance of the changes they bring to the network.

## Voting on a Referendum

In Governance V1, voters could cast only an _aye_ or _nay_ vote. In Polkadot OpenGov, voters can
additionally cast a _abstain_ and _split_ votes.
[Vote splitting](./learn-guides-polkadot-opengov.md#voting-on-referenda) allows voters to allocate
different votes for _aye_, _nay_, and _abstain_. Voting with conviction is not possible when
abstaining or splitting the votes.

:::info Only the last vote counts

Voting a second time replaces your original vote, e.g. voting with 10
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}, then a second extrinsic to vote with 5
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}, means that you are voting with 5
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}, not 10
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}.

:::

Note that to successfully cast votes you need to have the
[existential deposit](./learn-accounts.md#existential-deposit-and-reaping) and some additional funds
to pay for transaction fees.

:::info Revoke your delegation on a track if you like to vote on your own

If you want to vote on a referendum on a specific track on your own, you will need to revoke any
existing [delegation](#multirole-delegation) on that track (i.e. undelegate). You can have a
conviction lock on the track, but you cannot have an active delegation.

:::

### Voting Locks

#### Voting Without Conviction

A lock is placed on the {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} when you vote on an
Ongoing referendum. If you choose to remove your vote when the referendum is still in the decision
period, your voting lock is removed. Once the referendum is decided (accepted or rejected), your
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} will be available for unlocking if you voted
with zero conviction. The governance app or interface you used for participating in Polkadot OpenGov
should show an option to unlock your {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}.
[Here](https://support.polkadot.network/support/solutions/articles/65000184129) are the instructions
to do it on the Polkadot-JS UI.

#### Voting with Conviction

If you voted with conviction, the corresponding locks start at the end of the Referendum and not at
the moment you voted. For instance, let's say you voted AYE with 6X conviction on a referendum, and
it got accepted; the {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} you voted with is locked
for 32 weeks from that moment. If you voted NAY with 6X conviction on a referendum and it got
accepted, then your {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} would be ready to be
unlocked immediately. Polkadot OpenGov is designed to ensure that only the winning side is mandated
to lock their {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} and the losing side can claim
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} and have it added to the transferable balance
on their account.

For unlocking generic account locks, navigate to
[this section](./learn-guides-accounts.md#unlocking-locks). When you delegate your votes, the
locking mechanism differs slightly. Please check the next section on Multirole Delegation for more
information.

### Multirole Delegation

Polkadot OpenGov builds on the
[vote delegation feature from Governance v1](./learn-governance.md#delegations) where a voter can
delegate their voting power to another voter. It does so by introducing a feature known as
**multirole delegation**, where voters can specify a different delegate for every class of
referendum in the system. Delegation can be done per track, and accounts can choose to select
different delegates (or no delegation) for each track.

For example, a voter could delegate one entity for managing a less potent referenda class, choose a
different delegate for another class with more powerful consequences and still retain full voting
power over any remaining classes.

:::info Delegate your votes

In Polkadot OpenGov you can delegate your votes to different entities, who will vote on your behalf.
You can delegate your votes using the
[**Polkadot Delegation Dashboard**](https://delegation.polkadot.network/). See
[this video tutorial](https://www.youtube.com/watch?v=RapBYZc5ZPo) to learn about the features of
the dashboard.

If you are staking directly and not through a nomination pool, you can use bonded tokens for voting.
Note that if you are voting with conviction, your tokens will have a democracy lock in addition to
the staking lock. For more information about locks, see
[this page](./learn-accounts.md/#unlocking-locks).

Democracy locks created through [conviction voting](#voluntary-locking) start the unlocking period
after a referendum ends, provided you voted with the winning side. In the case of delegations, the
unlocking period countdown begins after the account undelegates. There can be different scenarios:

- if the account delegated votes to one delegate, then after undelegating, there will be one
  unlocking period with length dependent on the conviction multiplier.
- if the account delegated votes to different delegates using different convictions, then after
  undelegating those delegates, there will be different unlocking periods with lengths dependent on
  the conviction multipliers.

**Before delegating a specific track, you must remove any [vote](#voting-on-a-referendum) on that
track.**

:::

It is worth noting that a user delegating their voting power does not imply that the delegate will
have control over the funds of the delegating user's account. That delegate's account can vote with
a user's voting power but won't be able to transfer balances, nominate a different set of
validators, or execute any call other than voting on the tracks defined by the user.

The goal of delegations is to ensure the required support for proposals to be enacted is reached
while keeping the overall design censorship-free. Also, voters might not have the technical
knowledge to judge some referenda or might not have the time to read all referenda. Delegations
allow voters to participate in OpenGov hands-free by delegating their voting power to trusted
entities.

For a step-by-step outline of how to delegate voting power in Polkadot OpenGov, check out the
[Delegating Voting Power](./learn-guides-polkadot-opengov.md#delegations) section on the
[Polkadot OpenGov Guides](./learn-guides-polkadot-opengov.md).

## Resources

- [Democracy Pallet](https://github.com/paritytech/substrate/tree/master/frame/democracy/src)
- [Governance v2](https://medium.com/polkadot-network/gov2-polkadots-next-generation-of-decentralised-governance-4d9ef657d11b)
- [Polkadot Direction](https://matrix.to/#/#Polkadot-Direction:parity.io)
- [Kusama Direction](https://matrix.to/#/#Kusama-Direction:parity.io)
- [PolkAssembly](https://polkadot.polkassembly.io/)

---

:::info Polkadot-JS Guides

If you are an advanced user, see the
[Polkadot-JS guides about OpenGov](./learn-guides-polkadot-opengov.md).

:::
