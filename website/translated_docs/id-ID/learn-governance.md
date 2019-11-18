---
id: learn-governance
title: Governance
sidebar_label: Governance
---

Polkadot uses a sophisticated governance mechanism that allows it to evolve gracefully over time at the ultimate behest of its assembled stakeholders. The stated goal is to ensure that the majority of the stake can always command the network.

To do this, we bring together various novel mechanisms, including an amorphous state-transition function stored on-chain and defined in a platform-neutral intermediate language (i.e. WebAssembly) and several on-chain voting mechanisms such as referenda with adaptive super-majority thresholds and batch approval voting. All changes to the protocol must be agreed upon by stake-weighted referenda.

## Mechanism

In order to make any changes to the network, the idea is to compose active token holders and council together to administrate a network upgrade decision. No matter whether the proposal is proposed by the public (DOT holders) or council, it finally will have to go through a [referendum](learn-governance#referenda) to let all DOT holders, weighted by stake, make the decision.

The following steps are the governance procedure in the Polkadot network:

- [Proposing Referenda](#proposing-referenda) (Involved info: [Referenda](learn-governance#referenda))
- [Voting for a proposal](#voting-for-a-proposal) (Involved info: [Voluntary Locking](#voluntary-locking))
- [Tallying](#tallying) (Involved info: [Adaptive Quorum Biasing](#adaptive-quorum-biasing))

To better understand how the council is formed, please read [this section](#council).

## Referenda

Referenda are simple, inclusive, stake-based voting schemes. Each referendum has a specific _proposal_ associated with it which takes the form of a privileged function call in the runtime (that includes the most powerful call: `set_code`, which is able to switch out the entire code of the runtime, achieving what would otherwise require a "hard fork"). They are discrete events, have a fixed period where voting happens, and then are tallied and the function call is made if the vote is approved. Referenda are always binary; your only options in voting are "aye", "nay", or abstaining entirely.

Referenda can be started in one of several ways:

* Publicly submitted proposals;
* Proposals submitted by the council, either through a majority or unanimously;
* Proposals submitted as part of the enactment of a prior referendum;
* Emergency proposals submitted by the Technical Committee and approved by the Council.

All referenda have an *enactment delay* associated with them. This is the period of time between the referendum ending and, assuming the proposal was approved, the changes being enacted. For the first two ways that a referendum is launched, this is a fixed time. For Kusama, it is 7 days; Polkadot will likely be 28 days. For the third type, it can be set as desired.

Emergency proposals deal with major problems with the network which need to be "fast-tracked". These will have a shorter enactment time.

### Proposing a Referenda

#### Public Referenda

Anyone can propose a referendum by depositing the minimum amount of DOTs for a certain period (number of blocks). If someone agrees with the proposal, they may deposit the same amount of tokens to support it. The proposal with the highest number of support bonds will be selected to be a referendum. The bonded tokens will be released once the proposal is tabled (that is, brought to a vote).

#### Council Referenda

Unanimous Council - When all members of the council agree on a proposal, it can be moved to a referendum. This referendum will have a negative turnout bias (that is, the smaller the amount of stake voting, the smaller the amount necessary for it to pass - see "Adaptive Quorum Biasing", below).

Majority Council - When agreement from only a simple majority of council members occurs, the referendum can also be voted upon, but it will be majority-carries

#### Voting Timetable

Every thirty days, a new referendum will come up for a vote, assuming there are referenda in the queues. There is a queue for Council-approved referenda and a queue for publicly submitted referenda. The referendum to be voted upon alternates between the two queues.

If the given queue whose turn it is empty, and there are proposals waiting in the other queue, the top proposal in the other queue will become a proposal.

Multiple referenda cannot be voted upon in the same time period, excluding emergency referenda.


#### Voting for a proposal

To vote, a voter generally must lock their tokens up for at least the enactment delay period beyond the end of the referendum. This is in order to ensure that some minimal economic buy-in to the result is needed and to dissuade vote selling. It is possible to vote without locking at all, but your vote is worth a small fraction of a normal vote, given your stake. At the same time, holding only a small amount of DOT tokens does not mean that the holder cannot influence the referendum result, thanks to time-locking. You can read more about this at [Voluntary Locking](#voluntary-locking).

```
Example:

Peter: Votes `No` with 10 DOTs for a 12 week lock period  => 10 * 6 = 60 Votes

Logan: Votes `Yes` with 20 DOTs for a 2 week lock period => 20 * 1 = 20 Votes

Kevin: Votes `Yes` with 15 DOTs for a 4 week lock period => 15 * 2 = 30 Votes
```

Even though combining both Logan and Kevin's DOTs is more than Peter, the lock period for both of them is far less than Peter, leading to their voting power counting as less.

#### Tallying

Depending on which entity proposed the proposal and whether all council members voted yes, there are three different scenarios. We can use following table for reference.

|          **Entity**          |                   **Metric**                   |
|:----------------------------:|:----------------------------------------------:|
|            Public            | Positive Turnout Bias (Super-Majority Approve) |
| Council (Complete agreement) | Negative Turnout Bias (Super-Majority Against) |
| Council (Majority agreement) |                Simple Majority                 |

Also, we need the following information and apply one of the formulas listed below to calculate the voting result. For example, let's use the public proposal as an example, so `Super-Majority Approve` formula will be applied. There is no strict quorum, but super-majority required increases as turnout lowers.

```
approve - the number of aye votes

against - the number of nay votes

voters - the total number of voting tokens

electorate - the total number of DOTs tokens issued in the network
```

##### Super-Majority Approve

A `positive turnout bias`, whereby a heavy super-majority of aye votes is required to carry at low turnouts, but as turnout increases towards 100%, it becomes a simple-majority-carriers as below. $${against \over \sqrt{voters}} < {approve \over \sqrt{electorate}}$$

##### Super-Majority Against

A `negative turnout bias`, whereby a heavy super-majority of nay votes is required to reject at low turnouts, but as turnout increases towards 100%, it becomes a simple-majority-carriers as below. $${against \over \sqrt{electorate}} < {approve \over \sqrt{voters}}$$

##### Simple-Majority

Majority-carries, a simple comparison of votes, if there are more aye votes than nay, then the proposal is carried. $${approve} > {against}$$

*To know more about where these above formulas come from, please read the [democracy module](https://github.com/paritytech/substrate/blob/master/srml/democracy/src/vote_threshold.rs)*.

```
Example:

Assume we only have 1,500 DOTs tokens in total.

John  - 500 DOTs
Peter - 100 DOTs
Lilly - 150 DOTs
JJ    - 150 DOTs
Ken   - 600 DOTs

John: Votes `Yes`for a 2 week lock period  => 500 * 1 = 500 Votes

Peter: Votes `Yes` for a 2 week lock period => 100 * 1 = 100 Votes

JJ: Votes `No` for a 6 week lock period => 150 * 3 = 450 Votes

approve = 600
against = 450
voters = 1050
electorate = 1500
```

$${450\over\sqrt{1050}} < {600 \over \sqrt{1500}}$$

$${13.887} < {15.492}$$

Based on the above result, the proposal will be approved. In addition, only the winning voter's tokens are locked, which means if that referendum hurts the network, then those who voted against it can immediately get their locked tokens back. They can exit the network and sell their tokens to the market before the proposal becomes effective. Moreover, winning proposals are autonomously enacted only after some cool-down period.

#### Voluntary Locking

Polkadot utilizes an idea called `Voluntary Locking` that allows token holders to increase their voting power by declaring how long they are willing to lock-up their DOTs, hence, the maximum number of votes for each token holder will be calculated by the following formula:

```
Max votes = tokens * periods
```

Based on the current testnet setting, the maximum number of lock periods is set to 6.

**Each period takes 2 weeks, which means the longest lock period would be 12 weeks.**


#### Adaptive Quorum Biasing

Polkadot introduces a concept "Adaptive Quorum Biasing", which functions as a lever that the council can use to alter the effective super-majority required to make it easier or more difficult for a proposal to pass in the case that there is no clear majority of voting power backing it or against it.

![](assets/governance/adaptive-quorum-biasing.png)

Let's use the above image as an example.

If there is publicly submitted referenda only has 25% turnout, the tally of "aye" votes has to reach 66% for it to pass since we applied the `Positive Turnout Bias`.

In contrast, when it has 75% turnout, the tally of "aye" votes has to reach 54%, which means that as more token holders vote on referenda, then the super-majority required decreases as the turnout increases.

When the council proposes a new proposal through unanimous consent, the referendum would be put to a vote using "Negative Turnout Bias." In this case it is easier to pass this proposal with low turn-out and requires a super-majority to reject. As more token holders participate in voting the bias approaches a plain majority carries.

Referring to the above image, when the referenda only has 25% turnout, the tally of "aye" votes has to reach 34% for it to accept.

In short, when turnout rate is low, a super-majority is required to reject the proposal, which means a lower threshold of "aye" (yes) votes have to be reached, but as turnout increases towards 100%, it becomes a simple-majority.

All three tallying mechanisms - majority carries, super-majority approve, and super-majority against - equate to a simple majority carries system at 100% turnout.

## Council

To represent passive stakeholders, we introduce the idea of a "council". The council is an on-chain entity comprising a number of actors each represented as an on-chain account. For Polkadot this number is likely to begin at around six people, and increase over the course of 9 months to 24 people (roughly one extra individual coming on every two weeks). In general it has a fixed number of seats (envisioned to be 24 for Polkadot) and all members have a fixed term (12 months).

The council is called upon primarily for two tasks of governance: proposing sensible referenda, and cancelling uncontroversially dangerous or malicious referenda.

For a referendum to be proposed by the council, a strict majority of members must be in favor, with no member exercising a veto. Vetoes may be exercised only once by a member for any single proposal; if, after a cool-down period, the proposal is resubmitted, they may not veto it a second time. In the case that all members vote in favor, the vote is considered unanimous and is treated as uncontroversial.

For a referendum to be cancelled, there must be a unanimous vote to do so. Since unanimity is a high requirement, it is expected that this measure will only be used when it is an entirely uncontroversial move. This may function as a last-resort if there is an issue found late in the day with a referendum's proposal such as a bug in the code of the runtime that the proposal would institute.

If the cancellation is controversial enough that there is at least one dissenter, then it will be left to the stakeholders *en masse* to determine the fate of the proposal.

### How to be a council member?

![](assets/governance/approval-vote.png)

 At genesis, there will be 6 to 12 seats in the Council. All stakeholders are free to signal their approval of any of the registered candidates. For every two weeks, one of those seats is up for election and increase over the course of 9 months to 24 people (roughly one extra individual coming on every two weeks). All members have a fixed term (1 year). Council members can be removed early only by a referendum.

To elect a new council member, Polkadot employs `approval voting` method to allow token holders that choose a list of candidates they want to support in equal weight and the one with the most approval votes wins the election, while top-N runners-up remain on the candidates' list for next election.

As opposed to a "first past the post", where voters must decide only on a single candidate chosen from a list, [approval voting](https://en.wikipedia.org/wiki/Approval_voting) is a more expressive way to indicate voters' views. Token holders can treat it as Boolean voting to support as many candidates as they want.

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

This would be the tentative governance configuration for Polkadot in the initial genesis. It will be changed if any security loopholes have been found after third-party auditing.

## Technical Committee

The Technical Committee was introduced in the [Kusama rollout and governance post](https://polkadot.network/kusama-rollout-and-governance/) as one of the three chambers of Kusama governance (along with the Council and the Referendum chamber). The Technical Committee is composed of the teams that have successfully implemented or specified either Polkadot/Kusama runtime or the runtime environment. Teams are added or removed from the Technical Committee from a simple majority vote of the council.

The Technical Committee can, along with the Polkadot Council, produce emergency referenda, which are fast-tracked for voting and implementation. These emergency referenda are intended for use only under urgent circumstances.

## [Usage of DOT](learn-DOT#dots-for-governance)

## Resources

- [Governance Description](https://github.com/paritytech/polkadot/wiki/Governance))
- [Democracy Module](https://github.com/paritytech/substrate/tree/master/srml/democracy/src)
