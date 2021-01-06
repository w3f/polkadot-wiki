---
id: learn-governance
title: Governance
sidebar_label: Governance
---

Polkadot uses a sophisticated governance mechanism that allows it to evolve gracefully over time at the ultimate behest of its assembled stakeholders. The stated goal is to ensure that the majority of the stake can always command the network.

To do this, we bring together various novel mechanisms, including an amorphous state-transition function stored on-chain and defined in a platform-neutral intermediate language (i.e. [WebAssembly](learn-wasm)) and several on-chain voting mechanisms such as referenda with adaptive super-majority thresholds and batch approval voting. All changes to the protocol must be agreed upon by stake-weighted referenda.

## Mechanism

In order to make any changes to the network, the idea is to compose active token holders and the council together to administrate a network upgrade decision. No matter whether the proposal is proposed by the public (DOT holders) or the council, it finally will have to go through a referendum to let all DOT holders, weighted by stake, make the decision.

To better understand how the council is formed, please read [this section](#council).

## Referenda

Referenda are simple, inclusive, stake-based voting schemes. Each referendum has a specific _proposal_ associated with it that takes the form of a privileged function call in the runtime (that includes the most powerful call: `set_code`, which is able to switch out the entire code of the runtime, achieving what would otherwise require a "hard fork"). They are discrete events, have a fixed period where voting happens, and then are tallied and the function call is made if the vote is approved. Referenda are always binary; your only options in voting are "aye", "nay", or abstaining entirely.

Referenda can be started in one of several ways:

- Publicly submitted proposals;
- Proposals submitted by the council, either through a majority or unanimously;
- Proposals submitted as part of the enactment of a prior referendum;
- Emergency proposals submitted by the Technical Committee and approved by the Council.

All referenda have an _enactment delay_ associated with them. This is the period of time between the referendum ending and, assuming the proposal was approved, the changes being enacted. For the first two ways that a referendum is launched, this is a fixed time. For Kusama, it is 8 days; in Polkadot, it is 28 days. For the third type, it can be set as desired.

Emergency proposals deal with major problems with the network that need to be "fast-tracked". These will have a shorter enactment time.

### Proposing a Referendum

#### Public Referenda

Anyone can propose a referendum by depositing the minimum amount of tokens for a certain period (number of blocks). If someone agrees with the proposal, they may deposit the same amount of tokens to support it - this action is called _seconding_. The proposal with the highest amount of bonded support will be selected to be a referendum in the next voting cycle. Note that this may be different than the absolute number of seconds; for instance, three accounts bonding 20 DOT each would "outweigh" ten accounts bonding a single DOT each. The bonded tokens will be released once the proposal is tabled (that is, brought to a vote).

There can be a maximum of 100 public proposals in the proposal queue.

#### Council Referenda

Unanimous Council - When all members of the council agree on a proposal, it can be moved to a referendum. This referendum will have a negative turnout bias (that is, the smaller the amount of stake voting, the smaller the amount necessary for it to pass - see "Adaptive Quorum Biasing", below).

Majority Council - When agreement from only a simple majority of council members occurs, the referendum can also be voted upon, but it will be majority-carries (51% wins).

There can only be one active referendum at any given time, except when there is also an emergency referendum in progress.

#### Voting Timetable

Every 28 days on Polkadot or 7 days on Kusama, a new referendum will come up for a vote, assuming there is at least one proposal in one of the queues. There is a queue for Council-approved proposals and a queue for publicly submitted proposals. The referendum to be voted upon alternates between the top proposal in the two queues.

The "top" proposal is determined by the amount of stake bonded behind it. If the given queue whose turn it is to create a referendum has no proposals (is empty), and there are proposals waiting in the other queue, the top proposal in the other queue will become a referendum.

Multiple referenda cannot be voted upon in the same time period, excluding emergency referenda. An emergency referendum occurring at the same time as a regular referendum (either public- or council-proposed) is the only time that multiple referenda will be able to be voted on at once.

#### Voting on a referendum

To vote, a voter generally must lock their tokens up for at least the enactment delay period beyond the end of the referendum. This is in order to ensure that some minimal economic buy-in to the result is needed and to dissuade vote selling.

It is possible to vote without locking at all, but your vote is worth a small fraction of a normal vote, given your stake. At the same time, holding only a small amount of tokens does not mean that the holder cannot influence the referendum result, thanks to time-locking. You can read more about this at [Voluntary Locking](#voluntary-locking).

> To learn more about voting on referenda, please check out our [technical explainer video](https://www.youtube.com/watch?v=BkbhhlsezGA&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=31&ab_channel=Polkadot).

```
Example:

Peter: Votes `No` with 10 DOT for a 128 week lock period  => 10 * 6 = 60 Votes

Logan: Votes `Yes` with 20 DOT for a 4 week lock period => 20 * 1 = 20 Votes

Kevin: Votes `Yes` with 15 DOT for a 8 week lock period => 15 * 2 = 30 Votes
```

Even though combined both Logan and Kevin vote with more DOT than Peter, the lock period for both of them is less than Peter, leading to their voting power counting as less.

#### Tallying

Depending on which entity proposed the proposal and whether all council members voted yes, there are three different scenarios. We can use following table for reference.

|          **Entity**          |                   **Metric**                   |
|:----------------------------:|:----------------------------------------------:|
|            Public            | Positive Turnout Bias (Super-Majority Approve) |
| Council (Complete agreement) | Negative Turnout Bias (Super-Majority Against) |
| Council (Majority agreement) |                Simple Majority                 |

Also, we need the following information and apply one of the formulas listed below to calculate the voting result. For example, let's use the public proposal as an example, so the `Super-Majority Approve` formula will be applied. There is no strict quorum, but the super-majority required increases as turnout lowers.

```
approve - the number of aye votes

against - the number of nay votes

turnout - the total number of voting tokens (does not include conviction)

electorate - the total number of DOT tokens issued in the network
```

##### Super-Majority Approve

A `positive turnout bias`, whereby a heavy super-majority of aye votes is required to carry at low turnouts, but as turnout increases towards 100%, it becomes a simple majority-carries as below.

![](https://latex.codecogs.com/svg.latex?\large&space;{against&space;\over&space;\sqrt{turnout}}&space;<&space;{approve&space;\over&space;\sqrt{electorate}})

##### Super-Majority Against

A `negative turnout bias`, whereby a heavy super-majority of nay votes is required to reject at low turnouts, but as turnout increases towards 100%, it becomes a simple majority-carries as below.

![](https://latex.codecogs.com/svg.latex?\large&space;{against&space;\over&space;\sqrt{electorate}}&space;<&space;{approve&space;\over&space;\sqrt{turnout}})

##### Simple-Majority

Majority-carries, a simple comparison of votes; if there are more aye votes than nay, then the proposal is carried, no matter how much stake votes on the proposal.

![](https://latex.codecogs.com/svg.latex?\large&space;{approve}&space;>&space;{against})

_To know more about where these above formulas come from, please read the [democracy pallet](https://github.com/paritytech/substrate/blob/master/frame/democracy/src/vote_threshold.rs)_.

```
Example:

Assume:
- We only have 1,500 DOT tokens in total.
- Public proposal

John  - 500 DOT
Peter - 100 DOT
Lilly - 150 DOT
JJ    - 150 DOT
Ken   - 600 DOT

John: Votes `Yes` for a 4 week lock period  => 500 * 1 = 500 Votes

Peter: Votes `Yes` for a 4 week lock period => 100 * 1 = 100 Votes

JJ: Votes `No` for a 16 week lock period => 150 * 3 = 450 Votes

approve = 600
against = 450
turnout = 750
electorate = 1500
```

![\Large \frac{450}{\sqrt{750}}&space;<&space;\frac{600}{\sqrt{1500}}](https://latex.codecogs.com/svg.latex?\large&space;\frac{450}{\sqrt{750}}&space;<&space;\frac{600}{\sqrt{1500}})

![\Large {16.432}&space;<&space;{15.492}](https://latex.codecogs.com/svg.latex?\large&space;{16.432}&space;<&space;{15.492})

Since the above example is a public referendum, `Super-Majority Approve` would be used to calculate the result. `Super-Majority Approve` requires more `aye` votes to pass the referendum when turnout is low, therefore, based on the above result, the referendum will be rejected. In addition, only the winning voter's tokens are locked. If the voters on the losing side of the referendum believe that the outcome will have negative effects, their tokens are transferrable so they will not be locked in to the decision. Moreover, winning proposals are autonomously enacted only after some enactment period.

#### Voluntary Locking

Polkadot utilizes an idea called `Voluntary Locking` that allows token holders to increase their voting power by declaring how long they are willing to lock-up their tokens, hence, the number of votes for each token holder will be calculated by the following formula:

```
votes = tokens * conviction_multiplier
```

The conviction multiplier increases the vote multiplier by one every time the number of lock periods double.

| Lock Periods | Vote Multiplier |
|:------------:|:---------------:|
|      0       |       0.1       |
|      1       |        1        |
|      2       |        2        |
|      4       |        3        |
|      8       |        4        |
|      16      |        5        |
|      32      |        6        |

The maximum number of "doublings" of the lock period is set to 6 (and thus 32 lock periods in total), and one lock period equals 28 days on Polkadot and 8 days on Kusama. Only doublings are allowed; you cannot lock for, say, 24 periods and increase your conviction by 5.5, for instance.

While a token is locked, you can still use it for voting and staking; you are only prohibited from transferring these tokens to another account.

Votes are still "counted" at the same time (at the end of the voting period), no matter for how long the tokens are locked.

#### Adaptive Quorum Biasing

Polkadot introduces a concept, "Adaptive Quorum Biasing", which functions as a lever that the council can use to alter the effective super-majority required to make it easier or more difficult for a proposal to pass in the case that there is no clear majority of voting power backing it or against it.

![](assets/governance/adaptive-quorum-biasing.png)

Let's use the above image as an example.

If a publicly submitted referendum only has 25% turnout, the tally of "aye" votes has to reach 66% for it to pass since we applied `Positive Turnout Bias`.

In contrast, when it has 75% turnout, the tally of "aye" votes has to reach 54%, which means that the super-majority required decreases as the turnout increases.

When the council proposes a new proposal through unanimous consent, the referendum would be put to a vote using "Negative Turnout Bias". In this case it is easier to pass this proposal with low turnout and requires a super-majority to reject. As more token holders participate in voting, the bias approaches a plain majority carries.

Referring to the above image, when a referendum only has 25% turnout, the tally of "aye" votes has to reach 34% for it to pass.

In short, when turnout rate is low, a super-majority is required to reject the proposal, which means a lower threshold of "aye" votes have to be reached, but as turnout increases towards 100%, it becomes a simple-majority.

All three tallying mechanisms - majority carries, super-majority approve, and super-majority against - equate to a simple majority-carries system at 100% turnout.

## Council

> [Video explainer on Council](https://www.youtube.com/watch?v=837Vv3gdRzI)

To represent passive stakeholders, Polkadot introduces the idea of a "council". The council is an on-chain entity comprising a number of actors, each represented as an on-chain account. On Polkadot, the council currently consists of 13 members. This is expected to increase over the next few months to 24 seats. In general, the council will end up having a fixed number of seats. On Polkadot, this will be 24 seats while on Kusama it is 19 seats.

Along with [controlling the treasury](learn-treasury), the council is called upon primarily for three tasks of governance: proposing sensible referenda, cancelling uncontroversially dangerous or malicious referenda, and electing the technical committee.

For a referendum to be proposed by the council, a strict majority of members must be in favor, with no member exercising a veto. Vetoes may be exercised only once by a member for any single proposal; if, after a cool-down period, the proposal is resubmitted, they may not veto it a second time. Council motions which pass with a 3/5 (60%) super-majority - but without reaching unanimous support - will move to a public referendum under a neutral, majority-carries voting scheme. In the case that all members of the council vote in favor of a motion, the vote is considered unanimous and becomes a referendum with negative adaptive quorum biasing.

### Canceling

A proposal can be canceled if the [technical committee](#technical-committee) unanimously agrees to do so, or if Root origin (e.g. sudo) triggers this functionality. A canceled proposal's deposit is burned.

Additionally, a two-thirds majority of the council can cancel a referendum. This may function as a last-resort if there is an issue found late in a referendum's proposal such as a bug in the code of the runtime that the proposal would institute.

If the cancellation is controversial enough that the council cannot get a two-thirds majority, then it will be left to the stakeholders _en masse_ to determine the fate of the proposal.

### Blacklisting

A proposal can be blacklisted by Root origin (e.g. sudo). A blacklisted proposal and its related referendum (if any) is immediately [canceled](#canceling). Additionally, a blacklisted proposal's hash cannot re-appear in the proposal queue. Blacklisting is useful when removing removing erroneous proposals that could be submitted with the same hash, i.e. [proposal #2](https://polkascan.io/polkadot/democracy/proposal/2) in which the submitter used plain text to make a suggestion.

Upon seeing their proposal removed, a submitter who is not properly introduced to the democracy system of Polkadot might be tempted to re-submit the same proposal. That said, this is far from a fool-proof method of preventing invalid proposals from being submitted - a single changed character in a proposal's text will also change the hash of the proposal, rendering the per-hash blacklist invalid.

### How to be a council member?

![](assets/governance/approval-vote.png)

All stakeholders are free to signal their approval of any of the registered candidates.

Council elections are handled by the same [Phragmén election](learn-phragmen) process that selects validators from the available pool based on nominations. However, token holders' votes for councillors are isolated from any of the nominations they may have on validators. Council terms last for one day on Kusama and one week on Polkadot.

At the end of each term, [Phragmén election algorithm](learn-phragmen) runs and the result will choose the new councillors based on the vote configurations of all voters. The election also chooses a set number of runners up (currently 19 on Kusama and 20 on Polkadot) that will remain in the queue with their votes intact.

As opposed to a "first-past-the-post" electoral system, where voters can only vote for a single candidate from a list, a Phragmén election is a more expressive way to include each voters' views. Token holders can treat it as a way to support as many candidates as they want. The election algorithm will find a fair subset of the candidates that most closely matches the expressed indications of the electorate as a whole.

Let's take a look at the example below.

|      Round 1      |   |                |   |   |   |
|:-----------------:|:-:|:--------------:|:-:|:-:|:-:|
| **Token Holders** |   | **Candidates** |   |   |   |
|                   | A |       B        | C | D | E |
|       Peter       | X |                | X | X | X |
|       Alice       |   |       X        |   |   |   |
|        Bob        |   |                | X | X | X |
|      Kelvin       | X |                | X |   |   |
|     **Total**     | 2 |       1        | 3 | 2 | 2 |

The above example shows that candidate C wins the election in round 1, while candidate A, B, D & E keep remaining on the candidates' list for the next round.

|      Round 2      |   |                |   |   |
|:-----------------:|:-:|:--------------:|:-:|:-:|
| **Token Holders** |   | **Candidates** |   |   |
|                   | A |       B        | D | E |
|       Peter       | X |       X        |   |   |
|       Alice       | X |       X        |   |   |
|        Bob        | X |       X        | X | X |
|      Kelvin       | X |       X        |   |   |
|     **Total**     | 4 |       4        | 1 | 1 |

For the top-N (say 4 in this example) runners-up, they can remain and their votes persist until the next election. After round 2, even though candidates A & B get the same number of votes in this round, candidate A gets elected because after adding the older unused approvals, it is higher than B.

This is the tentative governance configuration for Polkadot post-genesis. It will be changed if any security loopholes have been found after several rounds of third-party auditing. Further changes can be made through on-chain governance.

### Prime Members

The council, being an instantiation of Substrate's Collective pallet, implements what's called a _prime member_ whose vote acts as the default for other members that fail to vote before the timeout.

The prime member is chosen based on a [Borda count](https://en.wikipedia.org/wiki/Borda_count).

The purpose of having a prime member of the council is to ensure a quorum, even when several members abstain from a vote. Council members might be tempted to vote a "soft rejection" or a "soft approval" by not voting and letting the others vote. With the existence of a prime member, it forces councillors to be explicit in their votes or have their vote counted for whatever is voted on by the prime.

## Technical Committee

The Technical Committee was introduced in the [Kusama rollout and governance post](https://polkadot.network/kusama-rollout-and-governance/) as one of the three chambers of Kusama governance (along with the Council and the Referendum chamber). The Technical Committee is composed of the teams that have successfully implemented or specified either a Polkadot/Kusama runtime or Polkadot Host. Teams are added or removed from the Technical Committee via simple majority vote of the [Council](#council).

The Technical Committee can, along with the Council, produce emergency referenda, which are fast-tracked for voting and implementation. These emergency referenda are intended for use only under urgent circumstances.

Fast-tracked referenda are the only type of referenda that can be active alongside another active referendum. Thus, with fast tracked referenda it is possible to have two active referendums at the same time. Voting on one does not prevent a user from voting on the other.

## Frequently Asked Questions

### How can I appeal to the council to enact a change on my behalf?

In some circumstances you may want to appeal to the on-chain council to enact a change on your behalf. One example of this circumstance is the case of lost or locked funds when the funds were lost due to a human interface error (such as inputting an address for another network). Another example is if you participated in the 2017 Polkadot ICO with a multi-sig address which now does not let you sign a message easily. When these circumstances can be proven beyond a reasonable doubt to be an error, the council _may_ consider a governance motion to correct it.

The first step to appeal to the council is to get in contact with the councillors. There is no singular place where you are guaranteed to grab every councillor's ear with your message. However, there are a handful of good places to start where you can get the attention of some of them. The [Polkadot Direction](https://matrix.to/#/!OwgojQyBzTlUQGGLhq:matrix.parity.io) matrix room is one such place. After creating an account and joining this room, you can post a well thought-through message here that lays down your case and provides justification for why you think the council should consider enacting a change to the protocol on your behalf.

At some point you will likely need a place for a longer form discussion. For this, making a post on [Polkassembly](https://polkadot.polkassembly.io/) is the recommended place to do so. When you write a post on Polkassembly make sure you present all the evidence for your circumstances and state clearly what kind of change you would suggest to the councillors to enact. Remember - the councillors do not need to make the change, it is your responsibility to make a strong case for why the change should be made.

## Resources

- [Initial Governance Description](https://github.com/paritytech/polkadot/wiki/Governance)
- [Democracy Pallet](https://github.com/paritytech/substrate/tree/master/frame/democracy/src)
- [Governance Demo](https://www.youtube.com/watch?v=VsZuDJMmVPY&feature=youtu.be&t=24734) - Dr. Gavin Wood presents the initial governance structure for Polkadot. (Video)
- [Governance on Polkadot](https://www.crowdcast.io/e/governance-on-polkadot--) - A webinar explaining how governance works in Polkadot and Kusama.
