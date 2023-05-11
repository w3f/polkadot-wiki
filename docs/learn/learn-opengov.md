---
id: learn-opengov
title: OpenGov
sidebar_label: OpenGov
description: Learn about Polkadot’s next generation of decentralised governance.
keywords: [governance, referenda, proposal, voting, endorse]
slug: ../learn-opengov
---

import RPC from "./../../components/RPC-Connection";

import VLTable from "./../../components/Voluntary-Locking";

import Fellowship from "./../../components/Fellowship";

:::caution The content in this document is subject to change

The governance protocol has already undergone iterations (see
[Governance V1](./learn-governance.md)). Governance is a constantly evolving protocol at this stage
in its lifecycle. As updates for OpenGov are making their way to the networks, plans for future
updates are already in development.

:::

:::info Participating to OpenGov

For participating in OpenGov, please refer to this
[dedicated Wiki page](../maintain/maintain-guides-opengov.md).

**OpenGov is live on Kusama and, once rigorously tested, it will be deployed on Polkadot.**

:::

## Premise

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} uses a sophisticated governance
mechanism that allows it to evolve gracefully overtime at the ultimate behest of its assembled
stakeholders. The stated goal is to ensure that the majority of the stake can always command the
network.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} brings together various novel
mechanisms, including an amorphous (abstract) form of state-transition function stored on-chain
defined in a platform-agnostic language (i.e. [WebAssembly](learn-wasm.md)), and several on-chain
voting mechanisms such as referenda and batch approval voting. All changes to the protocol must be
agreed upon by stake-weighted referenda.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}'s first governance system
([Governance V1](./learn-governance.md)) included three main components.

- The [Technical Committee](./learn-governance.md#technical-committee): A technocratic committee to
  manage upgrade timelines.
- The [Council](./learn-governance.md#council): An approval-voted, elected executive "government" to
  manage parameters, admin and spending proposals.
- The Public: All token holders who are not part of the Council or the Technical Committee.

Over the first few years of operation, Governance V1 ensured appropriate usage of treasury funds and
enabled timely upgrades and fixes. Like most early technologies, protocols must evolve as they
mature to improve upon their shortcomings and keep up with modern advancements. In Governance V1 all
referenda carried the same weight as only one referenda could be voted on at a time (with the only
exception of emergency proposals) and the voting period could last multiple weeks. Also, an
[alternating voting timetable](./learn-governance.md#alternating-voting-timetable) allowed to vote
either for a public referendum or a council motion every
{{ polkadot: 28 days :polkadot }}{{ kusama: 7 days :kusama }}. This resulted in the system favoring
careful consideration of very few proposals, as opposed to broad consideration of many.

OpenGov changes how the practical means of day-to-day decisions are made, making the repercussions
of referenda better scoped and agile in order to increase the number of collective decisions the
system is able to make.

The following content is focused on what the new OpenGov version brings to the governance on
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, and on the main differences with
previous governance versions. We recommend to learn about [Governance v1](./learn-governance.md) to
better understand the need for and the direction of OpenGov.

## Summary

In Governance v1, active token holders (public) and the council together administrated network's
upgrade decisions. No matter whether the proposal was proposed by the public or the council, it
would eventually had to go through a referendum to let all holders (weighted by stake and
conviction) make the decision.

The Council fulfilled its role as the representative of the public, guardian of the treasury and
initiator of legislation, but it was often seen as a centralized entity. To further decentralize
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, OpenGov proposes the following main
changes:

- Migrating all responsibilities of Council to the public via democracy votes
- Dissolving the current [Council](./learn-governance.md#council) collective
- Allowing users to delegate voting power in more ways to community members
- Dissolving the [Technical Committee](./learn-governance.md#technical-committee) and establishing
  the broader [Fellowship](#fellowship)

### Comparison Table

## Proposals

:::info Starting a proposal in Governace v1

See [this page](./learn-governance.md#proposals) for more information about starting referenda in
Governance v1.

:::

In OpenGov, anyone is able to start a referendum at any time and they can do so as many times as
they wish. Several new features, known as
[**Origins and Tracks**](../maintain/maintain-guides-opengov.md#origins-and-tracks-info), are
introduced to help aid in the flow and processing of the referenda protocol.

An **Origin** is a specific level of privilege that will determine the **Track** of all referenda
originating from that origin. The track outlines the lifecycle for the proposal and is independent
from other origins' tracks. The proposer of the referenda now selects an appropriate Origin for
their request based on the requirements of the proposal.

Although the track structure is the same for all origins, track parameters are not. Such parameters
include:

- **Maximum Deciding or Capacity**: the limit for the number of referenda that can be decided at
  once.
- **Decision deposit**: the amount of funds that must be placed on deposit in order to enter the
  Decision Period (note that more requirements must be met to enter the Decision Period).
- **Preparation Period**: the minimum amount of voting time needed before entering the Decision
  Period (given capacity and deposit are met).
- **Decision Period**: the maximum amount of time to approve a proposal. If not approved by the end
  of the period, the proposal will be rejected.
- **Confirmation Period**: the minimum amount of time (within the Decision Period) the approval and
  support criteria must hold before the proposal is approved and moved to the enactment period.
- **Minimum Enactment Period**: the minimum amount of waiting time before the proposed changes are
  applied
- **Approval Curve**: the curve describing the minimum % of _aye_ votes as a function of time within
  the Decision Period. The approval % is defined as the portion of _aye_ votes (adjusted for
  conviction) over the total votes (_aye_, _nay_, and _abstained_).
- **Support Curve**: the curve describing the minimum % of all votes as a function of time within
  the Decision Period. The support % is defined as the portion of all votes without conviction (i.e.
  _aye_, _nay_ and _abstained_) over the total possible amount of votes in the system. Support is a
  measure of turnout.

So for example, a runtime upgrade (`set_code` call) does not have the same implications for the
ecosystem as the approval of a treasury tip (`reportAwesome` call), and therefore different Origins
are needed in which different deposits, turnouts (i.e. support), approvals, and a minimum
[enactment](#enactment) periods will be predetermined on the pallet.

### Cancelling and Blacklisting

:::info Cancelling Referenda in Governace v1

See [this page](./learn-governance.md#cancelling) for more information about cancelling referenda in
Governance v1.

:::

In OpenGov, there is a special operation called **Cancelation** for intervening with a proposal that
is already being voted on. The operation will immediately reject an ongoing referendum regardless of
its status. There is also a provision to ensure the deposit of the proposer is slashed, if the
proposal is malicious or spam.

Cancelation itself is a governance operation which must be voted upon by the network in order to be
executed. Cancelation comes with
[its own Origin and Track](../maintain/maintain-guides-opengov.md#referendum-canceller) which has a
low lead-time and Approval/Support curves with slightly sharper reductions in their thresholds for
passing, given that it is invoked with a sense of urgency.

:::info Blacklisting

Blacklisting referenda in OpenGov is
[the same as in Governance v1](./learn-governance.md#blacklisting).

:::

## Referenda

:::info Public and Council Referenda in Governance v1

With the Council's dissolution, [council referenda](./learn-governance.md#council-referenda) are no
more present in OpenGov.

See [this page](./learn-governance.md#public-referenda) for more information about public referenda
in Governance v1.

**In OpenGov all referenda are public.** The [Fellowship](#fellowship) has the option to
[whitelist](#whitelisting) referenda that can be then proposed in the track with whitelist origin.

:::

In OpenGov, when a referendum is initially created, it can be immediately voted on by the community.
However, it is not immediately in a state where it can end, or otherwise have its votes counted, be
approved and summarily enacted. Instead, referenda must fulfil a number of criteria before they are
moved into a state known as **Deciding**. Until they are in the initial state, they remain
undecided.

The criteria for entering the **Deciding** state is a follows:

- A **lead-in period** that outlines the amount of time that must elapse before deciding can begin.
  This helps mitigate against the possibility of "decision sniping" where an attacker controlling a
  substantial amount of voting power might seek to have a proposal passed immediately after
  proposing, not allowing the overall voting population adequate time to consider and participate.
- There must be room for the decision. All Tracks specify their own limit on the number of referenda
  which can be decided simultaneously. Tracks that have more potent abilities will have lower
  limits. For example, the Root level Origin has a limit of one, implying that only a single
  proposal may be decided on at once.
- A **Decision Deposit** must be submitted. Creating a referendum is cheap as the deposit value
  consists of only the value required for the on-chain storage needed to track it. But, having a
  referendum reviewed and decided upon carries the risk of using up the limited spots available in
  the referenda queue. It makes sense to have a larger, but refundable deposit requirement to help
  mitigate spam.

Once the three criteria listed above are met, the referendum moves to the **Deciding** state. The
votes of the referendum are now counted towards the outcome.

## Voting Timetable

:::info Voting timetable in Governace v1

See [this page](./learn-governance.md#voting-timetable) for more information about the voting
timetable in Governance v1.

:::

The proposal is eligible to get approved during OpenGov's track specific
[decision period](./../maintain/maintain-guides-opengov.md#origins-and-tracks). If not approved by
then end of this period, the proposal is automatically rejected.

## Voting on a Referendum

:::info Adaptive Quorum Biasing is deprecated

In OpenGov, [Adaptive quorum biasing](./learn-governance.md#adaptive-quorum-biasing) used in
Governance V1 has been replaced with the **Approval and Support system**.

:::

**Approval** is defined as the share of approval (_aye_ votes) vote-weight (after adjustment for
[conviction](#voluntary-locking)) against the total vote-weight (for all approval, rejection, and
abstained).

**Support** is the total number of votes (ignoring any adjustment for conviction) compared to the
total possible votes that could be made in the system.

In order for a proposal to be approved, it must fulfill the approval and support criteria for the
minimum of the **Confirmation Period**. Different Origins' tracks have different Confirmation
Periods and requirements for approval and support. For additional details on the various origins and
tracks, check out [this table](./../maintain/maintain-guides-opengov.md#origins-and-tracks). It is
now possible to configure the amount of support and overall approval required for it to pass. With
proposals that use less privileged origins, it is far more reasonable to drop the required support
(i.e. turnout) to a more realistic amount earlier than those which use highly privileged classes
such as `Root`. Classes with more political significance can be made to require a higher approval
early on, to avoid controversy.

In OpenGov, proposals that are not approved after the decision period are considered rejected by
default and the Decision Deposit is refunded. If the proposal manages to stay passing until the end
of the Confirmation Period, it is considered approved and is scheduled to execute from the proposed
origin but after the Enactment Period. The Enactment Period is specified when the referendum is
proposed but is also subject to a minimum value based on the Track. More powerful Tracks enforce a
larger Enactment Period to ensure the network has ample time to prepare for any changes the proposal
may bring.

### Voluntary Locking

:::info Voluntary Locking

Voluntary locking in OpenGov is
[the same as in Governance v1](./learn-governance.md#voluntary-locking).

:::

### Multirole Delegation

In OpenGov, an alternate strategy was required to replace the Council in its previous duties as a
body delegated by voters to compensate for the fact that many choose to not take part in day-to-day
of governance. OpenGov builds on the
[vote delegation feature from Governance v1](./learn-governance.md#delegations) where a voter can
choose to delegate their voting power to another voter in the system. It does so by introducing a
feature known as **multirole delegation**, where voters can specify a different delegate for every
class of referendum in the system. Delegation can be done per track, and accounts can choose to
select different delegates (or no delegation) for each track.

For example, a voter could delegate one entity for managing a less potent referenda class, choose a
different delegate for a different class with more powerful consequences and still retain full
voting power over any remaining classes.

Occasional delegation and undelegation calls are fee-free: creating an incentive for token holders
to use this feature and ensure that wallets can do it “by default” without any cost to end-users. It
is worth noting that a user delegating their voting power does not imply that the delegate will have
control over the funds of the delegating account: they can vote with a user's voting power: but they
won't be able to transfer your balance, nominate a different set of validators or execute any call
other than voting on the defined call/s by the user.

With the new delegation features, the goal is to ensure the required turnouts for proposals to be
enacted are reached while maintaining the anonymity of voters and keeping the overall design
censorship-free.

For a step-by-step outline of how to delegate voting power in OpenGov, check out the
[Delegating Voting Power](./../maintain/maintain-guides-opengov.md#delegating-voting-power) section
on the [OpenGov Maintenance](./../maintain/maintain-guides-opengov.md) page.

## Enactment

:::info Enactment in Governace v1

See [this page](./learn-governance.md#enactment) for more information about enactment in Governance
v1.

:::

In OpenGov the enactment period is suggested by the proposer, but there are also minimums set for
each Origin Track. For example, root Origin approvals require a longer period because of the
importance of the changes they bring to the network.

## Fellowship

:::info From Technical Committee to the Fellowship

In OpenGov, the Fellowship replaces the
[Technical Committee](./learn-governance.md#technical-committee). It will serve both the Polkadot
and Kusama networks.

:::

The Fellowship is a mostly self-governing expert body with a primary goal of representing humans who
embody and contain the technical knowledge base of the Kusama and/or Polkadot networks and
protocols. This is accomplished by associating a rank with members to categorize the degree to which
the system expects their opinion to be well-informed, of a sound technical basis and in line with
the interests of Polkadot and Kusama.

Unlike the current Technical Collective, it is designed to be far broader in membership (i.e. to
work well with even tens of thousands of members) and with far lower barrier to entry (both in terms
of administrative process flow and expectations of expertise). Becoming a candidate member in the
Fellowship is as easy as placing a small deposit.

The mechanism by which the Fellowship votes is the same as what is used for Polkadot and Kusama
stakeholder voting for a proposed referendum. Members of the Fellowship can vote on any given
Fellowship proposal and the aggregate opinion of the members (weighted by their rank) constitutes
the Fellowship's considered opinion.

{{ kusama: <Fellowship network="kusama" defaultValue="Loading Kusama Fellows..."/> :kusama }}

### Ranking System

So how exactly does this ranking system work?

To prevent a small group of participants from gaining effective control over the network, this
system will adhere to three main principles:

- The Fellowship must never have hard power over the network: it cannot change the parameters,
  conduct rescues or move assets. Their only power in governance resides in the ability to reduce
  the effective timeline on which a referendum takes place.
- The Fellowship weights those with a higher rank more in the aggregate opinion, however the weight
  should not be so high as to make a small number of higher members’ opinions be insurmountable when
  compared to a coherent opinion coming from lower-ranked membership.
- The Fellowship should be designed to grow and develop its membership and their aggregate levels of
  expertise and in doing so ensure that its overall decision-making capacity gets stronger over
  time.

To support these conditions, the Fellowship will have a constitution which outlines the requirements
and expectations for individuals to attain and retain any given rank. Higher ranks are able to vote
and promote lower ranks based on this constitution.

**Demotion** occurs automatically after a given period has elapsed and the member is unable to
defend their position to their peers.

**Suspension** can happen only through general referendum, which ensures that the Fellowship's bias
alone does not necessarily result in expulsion.

To prevent the Fellowship from becoming a cabal (popularity with Fellowship peers alone should not
be enough to gain access to a top rank), gaining access to top tiers of the ranks will require a
referendum.

### Whitelisting

The Whitelist pallet does one thing: it allows one Origin to escalate the privilege level of another
Origin for a certain operation.

In OpenGov, it allows the Fellowship to authorise a new origin (known as Whitelisted-Root) to be
executed with Root-level privileges and will only work with certain specified commands that have
been authorised by the Fellowship. The Whitelist pallet verifies two things:

- The origin really is the Whitelisted-Root (i.e. that the referendum passed on this track)
- The proposal has indeed been whitelisted by the Fellowship.

If both conditions are true, the operation executes with Root-level privileges.

This system enables the ability to have a new parallel Track (Whitelisted-Root Origin), whose
parameters allow for a shorter voting turnaround. Through an open and transparent process, a body of
global experts on the {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} protocol have
determined that the action is both safe and time-critical.

## Resources

- [Democracy Pallet](https://github.com/paritytech/substrate/tree/master/frame/democracy/src)
- [Governance v2](https://medium.com/polkadot-network/gov2-polkadots-next-generation-of-decentralised-governance-4d9ef657d11b)
- [Polkadot Direction](https://matrix.to/#/#polkadot-direction:matrix.parity.io)
- [Kusama Direction](https://matrix.to/#/#kusama:matrix.parity.io)
- [PolkAssembly](https://polkadot.polkassembly.io/)
