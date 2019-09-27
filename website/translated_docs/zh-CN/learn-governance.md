---
id: learn-governance
title: Governance
sidebar_label: Governance
---

Polkadot uses a sophisticated governance mechanism that allows it to evolve gracefully over time at the ultimate behest of its assembled stakeholders.

In order to do this, we bring together various novel mechanisms, including an amorphous state-transition function stored on-chain and defined in a platform-neutral intermediate language (i.e. WebAssembly) and several on-chain voting mechanisms such as referenda with adaptive super-majority thresholds and batch approval voting.

## Overview

![Governance Overview](assets/governance/Governance-diagram.png)

The governance system of Polkadot is founded wholly around the idea of stakeholder voting. A key and unfailing rule is:

**All changes to the protocol must be agreed upon by stake-weighted referendum; the majority of stake can always command the network.**

On the face of it, this may seem somewhat restrictive: forcing a stakeholder-based process to do something as little as, say, nudging the block time down by 5%, seems overkill. However, without this rule the network would likely be unstable. By placing the network outside of the hands of stakeholders, it would create a misalignment that would lead to inaction or worse.

Despite this, by taking advantage of the fact that turnout is rarely 100%, we can effect different outcomes depending on the circumstances, crafting a balance of power between active and passive stakeholders. For example, simple voting systems typically introduce a notion of [quorum](https://en.wikipedia.org/wiki/Quorum), whereby a minimum amount of turnout must be reached before a vote is considered valid. This might be phrased as a "positive turnout bias", i.e. additional turnout makes change strictly *at least* as likely as a system with no need of quorum.

Another mechanism used, one again which favors the *nay* side (or the *status quo*), is to require a super-majority approval. This works on two principles: firstly that the status quo tends to be safer than any change, and thus should have some bias towards it. Secondly that, like all means of empirical measurement, there is inevitably going to be some degree of inaccuracy and volatility over time. A result could be 51%-49% one month and then change to 49%-51% the following month because of macro-environmental factors such as the economy, social-demographic progression or even the weather. Given the costs involved in enacting the changes of a proposal, it is advantageous to ensure that a result would not likely flip within a short period of time after enactment, and thus a supermajority should approve the non-status-quo option. (As an example of why this can be important, a super-majority was indeed not required in the UK's "Brexit" referendum, resulting in a result that, two years on from the vote but before the enactment, appears indeed to have flipped).

    Majority Carries
    ----------------
                AYE - Requires > 50% votes
              /
    Proposal -
              \
                NAY - Requires > 50% votes
    

    Static Quorum
    -------------
                AYE - Requires > 50% votes AND turnout >= QUORUM
              /
    Proposal -
              \
                NAY - Requires > 50% votes AND turnout >= QUORUM
    
    where QUORUM is a constant percentage of the total voting population
    

    Supermajority
    ----------------
                AYE - Requires > 66.7% votes
              /
    Proposal -
              \
                NAY - Requires > 66.7% votes
    

In our case, we introduce something broadly similar, only more sophisticated, to ensure that as turnout drops, a "sensible" decision prevails. Specifically we have a council which, in the model of a board of directors, is a group of individuals delegated by stakeholders to help determine what happens when there is no commanding majority of stake in favor or against a proposal.

We also introduce a concept "Adaptive Quorum Biasing", which functions as a lever that the council can use to alter the effective supermajority required to make it easier or more difficult for a proposal to pass in the case that there is no clear majority of voting power backing it or against it.

Finally, we introduce a twin-mechanism "lock-vote multiplying" and "delayed vote enactment", which works orthogonally to stake-weighted voting to ensure that the more exposure to a decision that a voter is willing to take, the more their vote is counted.

### Council

To represent passive stakeholders, we introduce the idea of a "council". The council is an on-chain entity comprising a number of actors each represented as an on-chain account. For Polkadot this number is likely to begin at around six people, and increase over the course of 9 months to 24 people (roughly one extra individual coming on every two weeks). In general it has a fixed number of seats (envisioned to be 24 for Polkadot) and all members have a fixed term (12 months). Each of the members is elected through an [approval vote](https://en.wikipedia.org/wiki/Approval_voting).

There is no particular voting period for a seat but rather a continuous election process. All stakeholders are free to signal their approval (or not) of any of the registered candidates. As a seat becomes free, a tally is taken to find the most approved candidate, by total stake, and the seat becomes theirs. Members can be removed early only by a referendum.

After an election happens, all unsuccessful candidates except for a number of runners-up are removed along with their approvals. Runners-up get to stay on (along with their approvals) ready for the next tally.

The council is called upon primarily for two tasks of governance: proposing sensible referenda, and cancelling uncontroversially dangerous or malicious referenda.

For a referendum to be proposed by the council, a strict majority of members must be in favor, with no member exercising a veto. Vetoes may be exercised only once by a member for any single proposal; if, after a cool-down period, the proposal is resubmitted, they may not veto it a second time. In the case that all members vote in favor, the vote is considered unanimous and is treated as uncontroversial.

For a referendum to be cancelled, there must be a unanimous vote to do so. Since unanimity is a high requirement, it is expected that this measure will only be used when it is an entirely uncontroversial move. This may function as a last-resort if there is an issue found late in the day with a referendum's proposal such as a bug in the code of the runtime that the proposal would institute.

If the cancellation is controversial enough that there is at least one dissenter, then it will be left to the stakeholders *en masse* to determine the fate of the proposal.

### Referenda

Referenda are simple, inclusive, stake-based voting schemes. Each referendum has a specific *proposal* associated with it which takes the form of a privileged function call in the runtime (that includes the most powerful call: `set_code`, which is able to switch out the entire code of the runtime, achieving what would otherwise require a "hard fork"). They are discrete events, have a fixed period where voting happens, and then are tallied and the function call is made if the vote is approved.

Referenda can be started in three ways:

* Publicly submitted proposals;
* Proposals submitted by the council, either through a no-veto majority or unanimously;
* Proposals submitted as part of the enactment of a prior referendum.

All referendums have an *enactment delay* associated with them. This is the period of time between the referendum ending and, assuming the proposal was approved, the changes being enacted. For the first two ways that a referendum is launched, this is fixed, (for Polkadot, it is likely to be two weeks). For the third type, it can be set as desired.

#### Public Referenda

Proposals for referenda may be submitted by anyone, however they do not automatically get voted upon. When submitted, the proposer stakes a deposit (any size above a fixed minimum, probably set at around $50 on Polkadot) and the proposal enters a queue. While a proposal is in the queue, anybody may "second" it any number of times by placing a deposit of the same size behind the initial deposit.

At a fixed interval, the item in the queue with the most stake associated with it is removed, all deposits are returned and a referendum takes place on it with each depositor being registered as voting in approval.

#### Vote Weighting

All voters are weighted based on two criteria:

* *tokens*: The amount of tokens under ownership by the voter;
* *time*: The amount of time those tokens will remain locked after the referendum has ended, measured in multiples of *enactment delay* and bounded between one and six.

Thus in order to vote, a voter must lock their tokens up for at least the *enactment delay* period beyond the end of the referendum. This is in order to ensure that some minimal economic buy-in to the result is needed and to dissuade vote selling.

The two values (*tokens* and *time*) are multiplied to provide the total number of votes of the voter. A voter with six tokens willing to lock them up only for the minimum allowed duration would have the same number of votes as a voter with only one token happy to have it locked for the maximum amount of time.

#### Vote Counting

Once the votes are tallied, the result must be determined. There are three options for determining the result that can be used:

* *Majority-carries*, a simple comparison of votes, if there are more *aye* votes than *nay*, then the proposal is carried.
* A *positive turnout bias*, whereby a heavy super-majority of *aye* votes is required to **carry** at low turnouts, but as turnout increases towards 100%, it becomes a simple majority-carries as above.
* A *negative turnout bias*, whereby a heavy super-majority of *nay* votes is required to **reject** at low turnouts, but as turnout increases towards 100%, it becomes a simple majority-carries as above.

We assume that a majority council agreement, with no veto, signals a sensible, perhaps an irregular state transition. For this, we use the *majority carries* metric. An exception to this is when there is complete agreement within the council. In this case we assume it signals a largely technocratic and uncontroversial protocol change. For this reason we assert that the "burden of proof" should fall on those against the motion and thus we use the *negative turnout bias* metric.

Publicly submitted referenda, being public, can easily include malevolent or ill-considered actions. Here the onus must be placed on the proponents and so we bias any abstention votes against the motion, in favor of the (assumed safe, since its functional enough to administer this vote) status quo and use a *positive turnout bias*.

The *turnout biasing* metrics use a technique known as *Adaptive Quorum Biasing*, a simple means of altering the required super-majority based upon turnout. With low turnouts, the majority needed increases; as turnout approaches 100%, it becomes 50%.

The formulae for a *positive turnout bias* ($B^+$) and *negative turnout bias* ($B^-$) are:

$ B^+(aye, nay) = aye \times b > nay \\ B^-(aye, nay) = aye > nay \times b \\ b \equiv \sqrt{t / T} $

Where $t$ is the total number of voting tokens and $T$ is the total number of tokens issued in the system. $aye$ is the number of *aye* votes, and $nay$ the number of *nay* votes.

![AQB](assets/governance/AQB.png) ![AQB-electorate](assets/governance/AQB-electorate.png)

So, in general:

* Proposals submitted through the enactment of a referendum may (of course) use any counting mechanism;
* Proposals submitted by unanimous council agreement need to have more (probably many more) nay votes to aye votes before they are rejected;
* Proposals submitted by simple majority council agreement must have more aye votes to nay votes to be accepted;
* Publicly submitted proposals must have more (probably much more) aye votes to nay votes in order to be approved.

### Conclusion

This is the governance mechanism, as it stands, for Polkadot Genesis. It may (and quite likely) will change before genesis based on feedback from the team, community and auditors. We know this is far from perfect, but we hope and expect that it is good enough to deliver the platform on which a truly great governance system can evolve and adapt over the course of Polkadot's lifetime.

## Resources

- The above has been adapted from Gavin Wood's original post on [governance](https://github.com/paritytech/polkadot/wiki/Governance).