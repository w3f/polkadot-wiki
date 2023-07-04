---
id: maintain-guides-polkadot-opengov
title: Participate in Polkadot OpenGov
sidebar_label: Participate in Polkadot OpenGov
description: Steps on how to participate in OpenGov.
keywords: [democracy, council, action, proposal, referenda]
slug: ../maintain-guides-polkadot-opengov
---

import Tracks from "./../../components/Referenda-Tracks"; import Chart from
"./../../components/Chart";

:::info Learn more about Polkadot OpenGov

For background information about Polkadot OpenGov, please refer to this
[dedicated Wiki document](../learn/learn-polkadot-opengov.md).

:::

This guide will instruct token holders how to propose and vote on public referenda using the
Referenda module (OpenGov). Below are a few links to stay informed and directly engage with the
community.

- [Polkadot Direction](https://matrix.to/#/#Polkadot-Direction:parity.io) - a place to discuss
  governance and the future of Polkadot.
- [Kusama Direction](https://matrix.to/#/#Kusama-Direction:parity.io) - a place to discuss
  governance and the future of Kusama.
- [Polkadot](https://polkadot.polkassembly.io) and [Kusama](https://kusama.polkassembly.io)
  Polkassembly - for current referenda, latest proposals, motions, treasury proposals, tips,
  bounties, and more.
- [Polkadot Daily Digest](https://matrix.to/#/#dailydigest:web3.foundation) - News about what is
  happening in the Polkadot ecosystem, published every weekday except holidays.

## Polkadot OpenGov Terminology and Parameters

The important parameters to be aware of when voting using the Referenda module are as follows:

**Origin** - Each origin has a fixed set of privileges. When making a proposal, it is important to
choose the origin that has the privilege to execute the referenda.

**Track** - Each track has its own dispatch origin and a preset configuration that governs the
voting process and parameters.

**Submission Deposit** - The minimum amount to be used as a (refundable) deposit to submit a public
referendum proposal.

**Prepare Period** - The minimum time the referendum needs to wait before it can progress to the
next phase after submission. Voting is enabled, but the votes do not count toward the outcome of the
referendum yet.

**Decision Deposit** - This deposit is required for a referendum to progress to the decision phase
after the end of prepare period.

**Decision Period** - Amount of time a decision may take to be approved to move to the confirming
period. If the proposal is not approved by the end of the decision period, it gets rejected.

**Max Deciding** - The maximum number of referenda that can be in the decision period of a track all
at once.

**Conviction**: A multiplier to increase voting power.

**Approval**: the share of the approval vote-weight after adjustments for conviction against the
total number of vote-weight for both approval and rejection

**Support**: The total number of votes in approval (ignoring adjustments for conviction) compared to
the total possible amount of votes that could be made in the system. Support also takes into account
abstained votes.

**Min Approval** - The threshold of approval (along with the min support) needed for a proposal to
meet the requirements of the confirm period.

**Min Support** - The threshold of support (along with the min approval) needed for a proposal to
meet the requirements of the confirm period.

**Confirmation Period** - The total time the referenda must meet both the min approval and support
criteria during the decision period in order to pass and enter the enactment period.

**Min Enactment Period** - Minimum time that an approved proposal must be in the dispatch queue
after approval. The proposer has the option to set the enactment period to be of any value greater
than the min enactment period.

## Origins and Tracks Info

{{ polkadot: <Tracks network="polkadot" defaultValue="Loading Polkadot Tracks..."/> :polkadot }}{{ kusama: <Tracks network="kusama" defaultValue="Loading Kusama Tracks..."/> :kusama }}

:::info

For every referendum in each of these tracks, the Polkadot-JS UI displays interactive graphs of the
support and approval.

![UI Support and Approval](./../assets/governance/support-approval-polkadot-js-ui.png)

:::

### Root

The origin with the highest level of privileges. This track requires extremely high levels of
approval and support for early passing. The prepare and enactment periods are also large. For
instance, a referendum proposed in this track needs to amass
{{ polkadot: 48.2% :polkadot }}{{ kusama:  46.8%  :kusama }} support (total network issuance) by the
end of the first day with over {{ polkadot: 93.5% :polkadot }}{{ kusama:  88%  :kusama }} approval
to be considered to be part of the confirm period. The support curve drops linearly to 25% by the
end of day {{ polkadot: 14 :polkadot }}{{ kusama:  7  :kusama }} and almost to 0% by the end of day
{{ polkadot: 28 :polkadot }}{{ kusama:  14  :kusama }}. This ensures that the token holders receive
ample time to vote on the proposal during the decision period.

{{ polkadot: <Chart title="" type="line" dataId="Root" network="Polkadot" maxX="672" maxY="100" /> :polkadot }}
{{ kusama: <Chart title="" type="line" dataId="Root" network="Kusama" maxX="336" maxY="100" /> :kusama }}

### Whitelisted Caller

Origin commanded by the [Fellowship](../learn/learn-polkadot-opengov.md#the-technical-fellowship)
whitelist some hash of a call and allow the call to be dispatched with the root origin (after the
referendum passes). This track allows for a shorter voting turnaround, safe in the knowledge through
an open and transparent process for time-critical proposals. For instance, a referendum proposed in
this track needs to amass {{ polkadot: 20% :polkadot }}{{ kusama:  14%  :kusama }} support (much
lesser than the root) by the end of the first day with over
{{ polkadot: 93.5% :polkadot }}{{ kusama:  88%  :kusama }} approval to be considered to be part of
the confirm period.

{{ polkadot: <Chart title="" type="line" dataId="Whitelist" network="Polkadot" maxX="672" maxY="100" /> :polkadot }}
{{ kusama: <Chart title="" type="line" dataId="Whitelist" network="Kusama" maxX="336" maxY="100" /> :kusama }}

### Staking Admin

The origin for canceling slashes. This origin has the privilege to execute calls from the staking
pallet and the Election Provider Multiphase Pallet.

{{ polkadot: <Chart title="" type="line" dataId="AdminStaking" network="Polkadot" maxX="672" maxY="100" /> :polkadot }}
{{ kusama: <Chart title="" type="line" dataId="AdminStaking" network="Kusama" maxX="336" maxY="100" /> :kusama }}

### Treasurer

The origin for spending funds from the treasury (up to
{{ polkadot: 10M DOT :polkadot }}{{ kusama:  333333.33 KSM  :kusama }}). This origin has the
privilege to execute calls from the Treasury pallet.

{{ polkadot: <Chart title="" type="line" dataId="Treasurer" network="Polkadot" maxX="672" maxY="100" /> :polkadot }}
{{ kusama: <Chart title="" type="line" dataId="Treasurer" network="Kusama" maxX="336" maxY="100" /> :kusama }}

### Lease Admin

Origin can force slot leases. This origin has the privilege to execute calls from the Slots pallet.

{{ polkadot: <Chart title="" type="line" dataId="AdminLease" network="Polkadot" maxX="672" maxY="100" /> :polkadot }}
{{ kusama: <Chart title="" type="line" dataId="AdminLease" network="Kusama" maxX="336" maxY="100" /> :kusama }}

### Fellowship Admin

The origin for managing the composition of the fellowship.

{{ polkadot: <Chart title="" type="line" dataId="AdminFellowship" network="Polkadot" maxX="672" maxY="100" /> :polkadot }}
{{ kusama: <Chart title="" type="line" dataId="AdminFellowship" network="Kusama" maxX="336" maxY="100" /> :kusama }}

### General Admin

The origin for managing the registrar. This origin has the privilege of executing calls from the
Identity pallet.

{{ polkadot: <Chart title="" type="line" dataId="AdminGeneral" network="Polkadot" maxX="672" maxY="100" /> :polkadot }}
{{ kusama: <Chart title="" type="line" dataId="AdminGeneral" network="Kusama" maxX="336" maxY="100" /> :kusama }}

### Auction Admin

The origin for starting auctions. This origin can execute calls from the Auctions pallet and the
Scheduler Pallet.

{{ polkadot: <Chart title="" type="line" dataId="AdminAuction" network="Polkadot" maxX="672" maxY="100" /> :polkadot }}
{{ kusama: <Chart title="" type="line" dataId="AdminAuction" network="Kusama" maxX="336" maxY="100" /> :kusama }}

### Referendum Canceller

The origin can cancel referenda. This track has a low lead time and approval/support curves with
slightly sharper reductions in their thresholds for passing.

{{ polkadot: <Chart title="" type="line" dataId="RefCanceller" network="Polkadot" maxX="672" maxY="100" /> :polkadot }}
{{ kusama: <Chart title="" type="line" dataId="RefCanceller" network="Kusama" maxX="336" maxY="100" /> :kusama }}

### Referendum Killer

The origin can cancel an ongoing referendum and slash the deposits. This track also has a low
lead-time and approval/support curves with slightly sharper reductions in their thresholds for
passing.

{{ polkadot: <Chart title="" type="line" dataId="RefKiller" network="Polkadot" maxX="672" maxY="100" /> :polkadot }}
{{ kusama: <Chart title="" type="line" dataId="RefKiller" network="Kusama" maxX="336" maxY="100" /> :kusama }}

### Small Tipper

Origin able to spend up to {{ polkadot: 250 DOT :polkadot }}{{ kusama:  8.25 KSM  :kusama }} from
the treasury at once.

{{ polkadot: <Chart title="" type="line" dataId="SmallTipper" network="Polkadot" maxX="672" maxY="100" /> :polkadot }}
{{ kusama: <Chart title="" type="line" dataId="SmallTipper" network="Kusama" maxX="336" maxY="100" /> :kusama }}

### Big Tipper

Origin able to spend up to {{ polkadot: 1000 DOT :polkadot }}{{ kusama:  33.33 KSM  :kusama }} from
the treasury at once.

{{ polkadot: <Chart title="" type="line" dataId="BigTipper" network="Polkadot" maxX="672" maxY="100" /> :polkadot }}
{{ kusama: <Chart title="" type="line" dataId="BigTipper" network="Kusama" maxX="336" maxY="100" /> :kusama }}

### Small Spender

Origin able to spend up to {{ polkadot: 10000 DOT :polkadot }}{{ kusama:  333.33 KSM  :kusama }}
from the treasury at once.

{{ polkadot: <Chart title="" type="line" dataId="SmallSpender" network="Polkadot" maxX="672" maxY="100" /> :polkadot }}
{{ kusama: <Chart title="" type="line" dataId="SmallSpender" network="Kusama" maxX="336" maxY="100" /> :kusama }}

### Medium Spender

Origin able to spend up to {{ polkadot: 100000 DOT :polkadot }}{{ kusama:  3333.33 KSM  :kusama }}
from the treasury at once.

{{ polkadot: <Chart title="" type="line" dataId="MediumSpender" network="Polkadot" maxX="672" maxY="100" /> :polkadot }}
{{ kusama: <Chart title="" type="line" dataId="MediumSpender" network="Kusama" maxX="336" maxY="100" /> :kusama }}

### Big Spender

Origin able to spend up to {{ polkadot: 1000000 DOT :polkadot }}{{ kusama:  33333.33 KSM  :kusama }}
from the treasury at once.

{{ polkadot: <Chart title="" type="line" dataId="BigSpender" network="Polkadot" maxX="672" maxY="100" /> :polkadot }}
{{ kusama: <Chart title="" type="line" dataId="BigSpender" network="Kusama" maxX="336" maxY="100" /> :kusama }}

## Create a Referenda Proposal using Polkadot-JS UI

### Submitting a Preimage

The act of creating a proposal is split from submitting the preimage for the proposal since the
storage cost of submitting a large preimage could be expensive. Allowing the preimage submission to
come as a separate transaction means that another account could submit the preimage for you and pay
the fee. The example below demonstrates the creation of a preimage on Kusama (**the same procedure
applies to Polkadot**). To propose that a remark "Expect Chaos!" be added to the blockchain, the
preimage hash would be `0x8ac3f722caf7677254e25ca4ad77d533ca893c7d2ad4009e258d749f2004ef94`.

![submit preimage](../assets/governance/opengov-submit-preimage.png)

After the preimage is submitted successfuly on-chain, Polkadot-JS UI lists it under the tab of
Governance > Preimages.

![preimage](../assets/governance/opengov-preimage-submitted.png)

### Submitting a Proposal

Submitting a proposal requires you to bond some tokens. On Polkadot-JS UI, you can navigate to the
Governance -> Referenda to make a new proposal. In order to submit a proposal, you will need to
submit what's called the preimage hash. The preimage hash is simply the hash of the proposal to be
enacted. The easiest way to get the preimage hash is by clicking on the "Submit preimage" button as
shown in the previous section.

![submit proposal](../assets/governance/opengov-submit-proposal.png)

The proposal will be registered from the account selected and the balance lock will be applied to
it. An appropriate origin must be chosen, as each origin has different privileges, and acceptance
criteria. After entering the hash of the preimage for the proposal, the preimage length field is
automatically populated. The enactment delay can be specified either as a block number, or as a
specific number of blocks after the referendum is approved. The deposit for this proposal will be
locked for the referendum duration.

### Submitting a Referendum on the Whitelisted Caller Track

Let's consider increasing the number of validators participating in parachain consensus. You could
[submit a preimage](#submitting-a-preimage) with the call that sets the number of validators to
1,000 and submit a referendum to the Root track directly. However, this requires a large decision
deposit and has very conservative passing parameters such that it will probably need the entire
28-day voting period to pass.

Operations that are deemed safe or time critical by the Polkadot Technical Fellowship can use the
Whitelisted Caller track. This track requires less turnout in the first half of the decision period
so that it can pass more quickly. This track is typically used for more neutral, technical proposals
like runtime upgrades or changing the system's parachain validation configuration.

Using the Whitelisted Caller track requires some special calls. Submitting a referendum in the same
form as other tracks will not work. Namely, rather than voting on a particular `proposal`, the
Whitelisted Caller track requires a vote to `dispatch` the `proposal` via the Whitelist pallet.
Before opening a referendum on this track, you should also attempt to get a positive signal from the
Fellowship that they will whitelist the proposal. If they do not, then even if the public referendum
passes, it will not execute.

Below are the steps to follow when submitting a proposal to the Whitelist track.

- [Submit a preimage](#submitting-a-preimage) with the call to _dispatch_ the proposal (`call`) you
  want to submit -- `whitelist.dispatchWhitelistedCallWithPreimage(call)` -- and obtain the preimage
  hash. This is the preimage for the _public referendum_ on the Whitelisted Caller track.

![preimage-whitelist](../assets/governance/opengov-submit-preimage-whitelist.png)

- Obtain the hash of `call`. The Polkadot Fellowship needs to start a Fellowship referendum to
  whitelist the call with `whitelist.whitelistCall(callHash)`. The Fellowship referendum gets voted
  on by the Polkadot Fellowship members only.

  ![call-hash](../assets/governance/encoded-call-hash.png)

- The public now votes on the referendum. Someone must place a decision deposit to go into the
  deciding phase.
- Once passed, it gets enacted successfully as long as the call has been whitelisted by the
  Fellowship.

Note that the public referendum and Fellowship referendum can happen simultaneously. However, if the
Fellowship does not whitelist the call, you must submit it directly to the Root origin.

## Voting on Referenda

As Polkadot OpenGov takes both the approval and support into account, there are four options to
choose from when voting on a referendum:

- Aye
- Nay
- Split
- Abstain

Also, you have to specify the conviction multiplier for this vote. The longer you are willing to
lock your tokens, the stronger your vote will be weighted. Unwillingness to lock your tokens means
that your vote only counts for 10% of the tokens that you hold.

For detailed instructions on how to vote on Polkadot OpenGov referenda, check
[this support guide.](https://support.polkadot.network/support/solutions/articles/65000184120-polkadot-opengov-how-to-vote)

:::caution Polkadot OpenGov uses Conviction Voting Pallet (Not Democracy Pallet)

Use `convictionVoting.vote` for voting on Referenda in Polkadot OpenGov instead of `democracy.vote`
(which only works for the old version of governance).

:::

### Removing expired voting locks

To remove the lock from votes, you first need to call `removeVote` and then `unlock` through the
`convictionVoting` pallet. For detailed instructions, check
[this support guide.](https://support.polkadot.network/support/solutions/articles/65000184129-polkadot-js-ui-how-to-remove-expired-referenda-locks)

## Delegating Voting Power

For an overview of how delegation works in Polkadot OpenGov, check out the
[Multirole Delegation](../learn/learn-polkadot-opengov.md#multirole-delegation) section on the
[Learn Polkadot OpenGov](../learn/learn-polkadot-opengov.md) page.

### Delegation Dashboard

To make multi-role delegation easy and intuitive,
[Delegation Dashboard](https://delegation.polkadot.network/) provides an interactive interface that
displays the list of delegates and their details. The video tutorial below walks through the
features of the Delegation Dashboard and shows how to perform multi-role delegation.

<iframe width="560" height="315" src="https://www.youtube.com/embed/RapBYZc5ZPo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

For detailed instructions on how to delegate your voting power using dashboard, check
[this support guide.](https://support.polkadot.network/support/solutions/articles/65000184123-polkadot-opengov-how-to-delegate-your-voting-power)
If you like to use Polkadot-JS UI for performing multi-role delegation, the instructions are
available
[here](https://support.polkadot.network/support/solutions/articles/65000184776-polkadot-js-ui-how-to-delegate-your-voting-power-on-polkadot-opengov).
