---
id: learn-governance
title: 治理
sidebar_label: 治理
---

Polkadot uses a sophisticated governance mechanism that allows it to evolve gracefully over time at the ultimate behest of its assembled stakeholders. The stated goal is to ensure that the majority of the stake can always command the network.

To do this, we bring together various novel mechanisms, including an amorphous state-transition function stored on-chain and defined in a platform-neutral intermediate language (i.e. WebAssembly) and several on-chain voting mechanisms such as referenda with adaptive super-majority thresholds and batch approval voting. All changes to the protocol must be agreed upon by stake-weighted referenda.

## 机制

In order to make any changes to the network, the idea is to compose active token holders and the council together to administrate a network upgrade decision. No matter whether the proposal is proposed by the public (DOT holders) or the council, it finally will have to go through a referendum to let all DOT holders, weighted by stake, make the decision.

以下步骤是 Polkadot 网络中的治理过程:

- [Proposing Referenda](#proposing-referenda)
- [Voting for a proposal](#voting-for-a-proposal)
- [Tallying](#tallying)

为了更好地了解理事会的组成方式，请阅读[本节](#council)。

## 公投

Referenda are simple, inclusive, stake-based voting schemes. Each referendum has a specific _proposal_ associated with it that takes the form of a privileged function call in the runtime (that includes the most powerful call: `set_code`, which is able to switch out the entire code of the runtime, achieving what would otherwise require a "hard fork"). They are discrete events, have a fixed period where voting happens, and then are tallied and the function call is made if the vote is approved. Referenda are always binary; your only options in voting are "aye", "nay", or abstaining entirely.

可以通过以下几种方式之一启动公投：

* 公开提交的提案
* 理事会多数或全体一致提交的提案；
* 作为先前公投通过部分的提交提案。
* 技术委员会提交并经理事会批准的紧急提案。

All referenda have an *enactment delay* associated with them. This is the period of time between the referendum ending and, assuming the proposal was approved, the changes being enacted. For the first two ways that a referendum is launched, this is a fixed time. For Kusama, it is 7 days; Polkadot will likely be 28 days. For the third type, it can be set as desired.

Emergency proposals deal with major problems with the network that need to be "fast-tracked". These will have a shorter enactment time.

### Proposing a Referendum

#### 公众投票

Anyone can propose a referendum by depositing the minimum amount of DOTs for a certain period (number of blocks). If someone agrees with the proposal, they may deposit the same amount of tokens to support it. The proposal with the highest number of support bonds will be selected to be a referendum. The bonded tokens will be released once the proposal is tabled (that is, brought to a vote).

#### 议会公投

Unanimous Council - When all members of the council agree on a proposal, it can be moved to a referendum. This referendum will have a negative turnout bias (that is, the smaller the amount of stake voting, the smaller the amount necessary for it to pass - see "Adaptive Quorum Biasing", below).

Majority Council - When agreement from only a simple majority of council members occurs, the referendum can also be voted upon, but it will be majority-carries.

There can only be one active referendum at any given time, except when there is also an emergency referendum in progress.

#### 投票时间表

Every thirty days, a new referendum will come up for a vote, assuming there is at least one proposal in one of the queues. There is a queue for Council-approved proposals and a queue for publicly submitted proposals. The referendum to be voted upon alternates between the top proposal in the two queues. The "top" proposal is determined by the number of second votes behind it.  If the given queue whose turn it is to create a referedum has no proposals (is empty), and there are proposals waiting in the other queue, the top proposal in the other queue will become a referendum.

Multiple referenda cannot be voted upon in the same time period, excluding emergency referenda.  An emergency referendum occurring at the same time as a regular referendum (either public- or council-proposed) is the only time that multiple referenda will be able to be voted on at once.

#### Voting on a referendum

To vote, a voter generally must lock their tokens up for at least the enactment delay period beyond the end of the referendum. This is in order to ensure that some minimal economic buy-in to the result is needed and to dissuade vote selling. It is possible to vote without locking at all, but your vote is worth a small fraction of a normal vote, given your stake. At the same time, holding only a small amount of DOT tokens does not mean that the holder cannot influence the referendum result, thanks to time-locking. You can read more about this at [Voluntary Locking](#voluntary-locking).

```
Example:

Peter: Votes `No` with 10 DOTs for a 128 week lock period  => 10 * 6 = 60 Votes

Logan: Votes `Yes` with 20 DOTs for a 4 week lock period => 20 * 1 = 20 Votes

Kevin: Votes `Yes` with 15 DOTs for a 8 week lock period => 15 * 2 = 30 Votes
```

Even though combining both Logan and Kevin vote with more DOTs than Peter, the lock period for both of them is less than Peter, leading to their voting power counting as less.

#### 统计

Depending on which entity proposed the proposal and whether all council members voted yes, there are three different scenarios. We can use following table for reference.

|  **实体**   |        **指标**         |
|:---------:|:---------------------:|
|    大众     | Positive Turnout Bias |
| 议会(一致赞成)  | Negative Turnout Bias |
| 议会(大部分赞成) |    Simple Majority    |

Also, we need the following information and apply one of the formulas listed below to calculate the voting result. For example, let's use the public proposal as an example, so `Super-Majority
Approve` formula will be applied. There is no strict quorum, but super-majority required increases as turnout lowers.

```
approve - 赞成票数

against - 反对票数

voters - 总投票代币数

electorate -网络中 DOT 的总数
```

##### Super-Majority Approve

A `positive turnout bias`, whereby a heavy super-majority of aye votes is required to carry at low turnouts, but as turnout increases towards 100%, it becomes a simple-majority-carriers as below.

![](https://latex.codecogs.com/svg.latex?\large&space;{against&space;\over&space;\sqrt{voters}}&space;<&space;{approve&space;\over&space;\sqrt{electorate}})

##### Super-Majority Against

A `negative turnout bias`, whereby a heavy super-majority of nay votes is required to reject at low turnouts, but as turnout increases towards 100%, it becomes a simple-majority-carriers as below.

![](https://latex.codecogs.com/svg.latex?\large&space;{against&space;\over&space;\sqrt{electorate}}&space;<&space;{approve&space;\over&space;\sqrt{voters}})

##### Simple-Majority

Majority-carries, a simple comparison of votes, if there are more aye votes than nay, then the proposal is carried.

![](https://latex.codecogs.com/svg.latex?\large&space;{approve}&space;>&space;{against})

*To know more about where these above formulas come from, please read the [democracy pallet](https://github.com/paritytech/substrate/blob/master/frame/democracy/src/vote_threshold.rs)*.

```
Example:

Assume we only have 1,500 DOTs tokens in total.

John  - 500 DOTs
Peter - 100 DOTs
Lilly - 150 DOTs
JJ    - 150 DOTs
Ken   - 600 DOTs

John: Votes `Yes` for a 4 week lock period  => 500 * 1 = 500 Votes

Peter: Votes `Yes` for a 4 week lock period => 100 * 1 = 100 Votes

JJ: Votes `No` for a 16 week lock period => 150 * 3 = 450 Votes

approve = 600
against = 450
voters = 1050
electorate = 1500
```

![\Large \frac{450}{\sqrt{1050}}&space;<&space;\frac{600}{\sqrt{1500}}](https://latex.codecogs.com/svg.latex?\large&space;\frac{450}{\sqrt{1050}}&space;<&space;\frac{600}{\sqrt{1500}})

![\Large {13.887}&space;<&space;{15.492}](https://latex.codecogs.com/svg.latex?\large&space;{13.887}&space;<&space;{15.492})

Based on the above result, the proposal will be approved. In addition, only the winning voter's tokens are locked. If the voters on the losing side of the referendum believe that the outcome will have negative effects, their tokens are transferrable so they will not be locked in to the decision. Moreover, winning proposals are autonomously enacted only after some enactment period.

#### 自愿锁定

Polkadot utilizes an idea called `Voluntary Locking` that allows token holders to increase their voting power by declaring how long they are willing to lock-up their DOTs, hence, the maximum number of votes for each token holder will be calculated by the following formula:

```
Max votes = tokens * vote_multiplier
```

The conviction multiplier adds an extra vote every time the lock period doubles.

| Lock Periods | Vote Multiplier |
|:------------:|:---------------:|
|      0       |       0.1       |
|      1       |        1        |
|      2       |        2        |
|      4       |        3        |
|      8       |        4        |
|      16      |        5        |
|      32      |        6        |

Based on the genesis runtime, the maximum number of lock periods is set to 6 and the lock period is 30 days on Polkadot and eight days on Kusama.

#### Adaptive Quorum Biasing

Polkadot introduces a concept "Adaptive Quorum Biasing", which functions as a lever that the council can use to alter the effective super-majority required to make it easier or more difficult for a proposal to pass in the case that there is no clear majority of voting power backing it or against it.

![](assets/governance/adaptive-quorum-biasing.png)

Let's use the above image as an example.

If a publicly submitted referendum only has 25% turnout, the tally of "aye" votes has to reach 66% for it to pass since we applied `Positive Turnout Bias`.

In contrast, when it has 75% turnout, the tally of "aye" votes has to reach 54%, which means that the super-majority required decreases as the turnout increases.

When the council proposes a new proposal through unanimous consent, the referendum would be put to a vote using "Negative Turnout Bias". In this case it is easier to pass this proposal with low turnout and requires a super-majority to reject. As more token holders participate in voting, the bias approaches a plain majority carries.

Referring to the above image, when a referendum only has 25% turnout, the tally of "aye" votes has to reach 34% for it to pass.

In short, when turnout rate is low, a super-majority is required to reject the proposal, which means a lower threshold of "aye" votes have to be reached, but as turnout increases towards 100%, it becomes a simple-majority.

All three tallying mechanisms - majority carries, super-majority approve, and super-majority against - equate to a simple majority carries system at 100% turnout.

## 议会

To represent passive stakeholders, we introduce the idea of a "council". The council is an on-chain entity comprising a number of actors, each represented as an on-chain account. For Polkadot this number is likely to begin at around six people, and increase over the course of 9 months to 24 people (roughly one extra individual coming on every two weeks). In general it has a fixed number of seats (envisioned to be 24 for Polkadot) and all members have a fixed term (12 months).

The council is called upon primarily for two tasks of governance: proposing sensible referenda, and cancelling uncontroversially dangerous or malicious referenda.

For a referendum to be proposed by the council, a strict majority of members must be in favor, with no member exercising a veto. Vetoes may be exercised only once by a member for any single proposal; if, after a cool-down period, the proposal is resubmitted, they may not veto it a second time. In the case that all members vote in favor, the vote is considered unanimous and is treated as uncontroversial.

A two-thirds majority of the council can cancel a referendum. This may function as a last-resort if there is an issue found late in the day with a referendum's proposal such as a bug in the code of the runtime that the proposal would institute.

If the cancellation is controversial enough that the council cannot get a two-thirds majority, then it will be left to the stakeholders *en masse* to determine the fate of the proposal.

### 如何成为议会成员?

![](assets/governance/approval-vote.png)

At genesis, there will be 6 to 12 seats in the Council. All stakeholders are free to signal their approval of any of the registered candidates. For every two weeks, one of those seats is up for election and increase over the course of 9 months to 24 people (roughly one extra individual coming on every two weeks). All members have a fixed term (1 year). Council members can be removed early only by a referendum.

To elect a new council member, Polkadot employs the same election scheme as used for choosing the active set of validators, a [Phragmen election](learn-phragmen). The election also chooses a set number of runners up (currently seven in Kusama) that will remain in the queue with their votes intact.

As opposed to a "first past the post", where voters must decide only on a single candidate chosen from a list, a Phragmen election is a more expressive way to indicate voters' views. Token holders can treat it as Boolean voting to support as many candidates as they want. The election algorithm will find the fair winners.

Let's take a look at the example below.

|  Round 1  |   |         |   |   |   |
|:---------:|:-:|:-------:|:-:|:-:|:-:|
| **代币持有人** |   | **候选人** |   |   |   |
|           | A |    B    | C | D | E |
|   Peter   | X |         | X | X | X |
|   Alice   |   |    X    |   |   |   |
|    Bob    |   |         | X | X | X |
|  Kelvin   | X |         | X |   |   |
|  **总数**   | 2 |    1    | 3 | 2 | 2 |

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

### Prime Members

The council, being an instantiation of Substrate's Collective pallet, implements what's called a _prime member_ whose vote acts as the default for other members that fail to vote before the timeout.

The prime member is chosen based on a [Borda count](https://en.wikipedia.org/wiki/Borda_count).

The purpose of having a prime member of the council is to ensure a quorum, even when several members abstain from a vote. Council members might be tempted to vote a "soft rejection" or a "soft approval" by not voting and letting the others vote. With the existence of a prime member, it forces councillors to be explicit in their votes or have their vote counted for whatever is voted on by the prime.

## 技术委员会

The Technical Committee was introduced in the [Kusama rollout and governance post](https://polkadot.network/kusama-rollout-and-governance/) as one of the three chambers of Kusama governance (along with the Council and the Referendum chamber). The Technical Committee is composed of the teams that have successfully implemented or specified either Polkadot/Kusama runtime or the Polkadot Host. Teams are added or removed from the Technical Committee from a simple majority vote of the council.

The Technical Committee can, along with the Polkadot Council, produce emergency referenda, which are fast-tracked for voting and implementation. These emergency referenda are intended for use only under urgent circumstances.

Fast-tracked referenda are the only type of referenda which can be active alongside another active referendum.

Thus, with fast tracked referenda it is possible to have two active referendums at the same time. Voting on one does not prevent a user from voting on the other.

## [DOT 的用途](learn-DOT#dots-for-governance)

## 资源

- [Initial Governance Description](https://github.com/paritytech/polkadot/wiki/Governance)
- [Democracy Pallet](https://github.com/paritytech/substrate/tree/master/frame/democracy/src)
