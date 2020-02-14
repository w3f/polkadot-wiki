---
id: learn-governance
title: 治理
sidebar_label: 治理
---

Polkadot 使用尖端的治理机制，使其能够按照其聚集的利益相关者的最终要求随着时间而发展。既定目标是确保多数支持者始终可以控制网络。

为此，我们将各种新颖的机制结合在一起，包括存储在链上并以平台无关的中间语言（WebAssembly）定义的状态转换函数，以及几种链上投票机制，例如具有自适应超多数阈值的全民投票和批量批准投票。

## 机制

为了对网络进行任何更改，其想法是组成活跃的代币持有者和理事会共同管理网络升级决策。无论提案是由公众（DOT持有人）还是理事会提出的，最终都必须经过[全民投票](learn-governance#referenda)才能让所有DOT持有人做出决定。

以下步骤是 Polkadot 网络中的治理过程:

- [提议全民公投](#proposed-referendum) (相关资料: [ 公投 ](learn-governance#referenda))
- [为提案投票](#voting-for-a-proposal)(相关资料: [自愿锁定](#voluntary-locking)）
- [统计](#tallying)（相关资料: [Adaptive Quorum Biasing](#adaptive-quorum-biasing)）

为了更好地了解理事会的组成方式，请阅读[本节](#council)。

## 公投

公民投票是简单，广泛，基于代币抵押的投票方案。 每个公投都有一个与之相关的特定_提案_，该提议在运行时采用特权函数调用的形式（其中包括功能最强大的调用：`set_code`，它可以切换 runtime 的整个代码，从而实现不需要“硬分叉”的功能）。 它们是分离事件，具有固定的投票发生时间段，然后被计票，如果投票获得批准，则会进行函数调用。

可以通过以下几种方式之一启动公投：

* 公开提交的提案
* 理事会多数或全体一致提交的提案；
* 作为先前公投通过部分的提交提案。
* 技术委员会提交并经理事会批准的紧急提案。

所有公投均具有*颁布延迟(enactment delay)*。这是全民投票结束并且假设提案获得通过，将会实施的改变。对于发起公投的头两种方式，这是固定时间(Kusama 会是 7天, 而 Polkadot 则会是 28天)。对于第三种类型，可以根据其需要设置。

紧急建议涉及网络中的主要问题，需要“快速跟踪”，这将将有一个更短颁布时间。

### 提议全民公投

#### 公众投票

任何人都可以通过在一定时期(区块) 内存放最少数量的DOT来进行提交方案。 如果有人同意该建议，他们可以存入相同数量的代币以支持该方案。 支持数量最多的提案将被选为全民投票。 提案完成后，绑定的代币将被释放。

#### 议会公投

议会(一致赞成) - 议会的所有成员都同意一项提案时，可以将其移交给全民投票。这个公投带有 negative turnout bias (意思是当愈少人参与投票，通过所需要的数量会愈少) - 查看下面 "Adaptive Quorum Biasing"。

议会(大部分赞成) - 仅需获得多数议会成员的同意即可。(1. Aye投赞成票多过Nay投反对票=接受，2. Nay多过Aye=反对。)

#### 投票时间表

每三十天举行一次新的全民投票，假定在队列里进行全民投票，这里有一个理事会核准的全民投票队列和公开提案的公民投票队列，全民投票在两个队列之间交替表决。

如果给定的队列轮次为空，并且有提案在另一队列中等待，则另一队列中的顶部提案将变为提案。

除紧急公投外，不能在同一时间对多个公投进行投票。


#### 投票提案

投票时，选民必须在全民投票结束后的至少颁布延迟期内锁定其令牌。 这是为了确保需要最低限度的经济买入并阻止投票。 同时，仅持有少量的DOT代币并不意味着它们不会影响公投结果，您可以阅读有关[自愿锁定](#voluntary-locking)的更多信息。

```
例子:

Peter: 投 `No` 有10 DOTs，锁12周  => 10 * 6 = 60 票数

Logan: 投 `Yes` 有 20 DOTs 锁2周 => 20 * 1 = 20 票数

Kevin: 投 `Yes`  有 15 DOTs 锁4周 => 15 * 2 = 30 票数
```

根据上述情况，即使将Logan和Kevin的DOT组合在一起的数量超过了Peter，但两者的锁定期都远远少于Peter，这导致他们的投票权减少了。

#### 统计

取决的实体提出初步以及是否所有议会成员都投票赞成，存在三种不同的方案。

|  **实体**   |        **指标**         |
|:---------:|:---------------------:|
|    大众     | Positive Turnout Bias |
| 议会(一致赞成)  | Negative Turnout Bias |
| 议会(大部分赞成) |    Simple Majority    |

另外，我们需要以下信息，并使用下面列出的公式之一来计算投票结果。 例如，我们以大众提交的提案为例，因此将应用`Super-Majority Approve`公式。 没有严格的法定人数，但是随着投票率的降低，所需投赞成票的数量也会增加。

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
例子:

假设我们总共只有1,500个DOT代币。

John  - 500 DOTs
Peter - 100 DOTs
Lilly - 150 DOTs
JJ    - 150 DOTs
Ken   - 600 DOTs

John: 投 `Yes`锁定2周  => 500 * 1 = 500 票数

Peter: 投 `Yes`锁定2周 => 100 * 1 = 100 票数

JJ: 投 `No` 锁定6周 => 150 * 3 = 450 票数

approve = 600
against = 450
voters = 1050
electorate = 1500
```

![\Large \frac{450}{\sqrt{1050}}&space;<&space;\frac{600}{\sqrt{1500}}](https://latex.codecogs.com/svg.latex?\large&space;\frac{450}{\sqrt{1050}}&space;<&space;\frac{600}{\sqrt{1500}})

![\Large {13.887}&space;<&space;{15.492}](https://latex.codecogs.com/svg.latex?\large&space;{13.887}&space;<&space;{15.492})

Based on the above result, the proposal will be approved. In addition, only the winning voter's tokens are locked, which means if that referendum hurts the network, then those who voted against it can immediately get their locked tokens back. They can exit the network and sell their tokens to the market before the proposal becomes effective. Moreover, winning proposals are autonomously enacted only after some cool-down period.

#### 自愿锁定

Polkadot utilizes an idea called `Voluntary Locking` that allows token holders to increase their voting power by declaring how long they are willing to lock-up their DOTs, hence, the maximum number of votes for each token holder will be calculated by the following formula:

```
票数 = 代币 * 时间
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

## 议会

To represent passive stakeholders, we introduce the idea of a "council". The council is an on-chain entity comprising a number of actors each represented as an on-chain account. For Polkadot this number is likely to begin at around six people, and increase over the course of 9 months to 24 people (roughly one extra individual coming on every two weeks). In general it has a fixed number of seats (envisioned to be 24 for Polkadot) and all members have a fixed term (12 months).

The council is called upon primarily for two tasks of governance: proposing sensible referenda, and cancelling uncontroversially dangerous or malicious referenda.

For a referendum to be proposed by the council, a strict majority of members must be in favor, with no member exercising a veto. Vetoes may be exercised only once by a member for any single proposal; if, after a cool-down period, the proposal is resubmitted, they may not veto it a second time. In the case that all members vote in favor, the vote is considered unanimous and is treated as uncontroversial.

For a referendum to be cancelled, there must be a unanimous vote to do so. Since unanimity is a high requirement, it is expected that this measure will only be used when it is an entirely uncontroversial move. This may function as a last-resort if there is an issue found late in the day with a referendum's proposal such as a bug in the code of the runtime that the proposal would institute.

If the cancellation is controversial enough that there is at least one dissenter, then it will be left to the stakeholders *en masse* to determine the fate of the proposal.

### 如何成为议会成员?

![](assets/governance/approval-vote.png)

 At genesis, there will be 6 to 12 seats in the Council. All stakeholders are free to signal their approval of any of the registered candidates. For every two weeks, one of those seats is up for election and increase over the course of 9 months to 24 people (roughly one extra individual coming on every two weeks). All members have a fixed term (1 year). Council members can be removed early only by a referendum.

To elect a new council member, Polkadot employs `approval voting` method to allow token holders that choose a list of candidates they want to support in equal weight and the one with the most approval votes wins the election, while top-N runners-up remain on the candidates' list for next election.

As opposed to a "first past the post", where voters must decide only on a single candidate chosen from a list, [approval voting](https://en.wikipedia.org/wiki/Approval_voting) is a more expressive way to indicate voters' views. Token holders can treat it as Boolean voting to support as many candidates as they want.

Let's take a look at the example below.

|    第一轮    |   |         |   |   |   |
|:---------:|:-:|:-------:|:-:|:-:|:-:|
| **代币持有人** |   | **候选人** |   |   |   |
|           | A |    B    | C | D | E |
|   Peter   | X |         | X | X | X |
|   Alice   |   |    X    |   |   |   |
|    Bob    |   |         | X | X | X |
|  Kelvin   | X |         | X |   |   |
|  **总数**   | 2 |    1    | 3 | 2 | 2 |

The above example shows that candidate C wins the election in round 1, while candidate A, B, D & E keep remaining on the candidates' list for the next round.

|    第二轮    |   |         |   |   |
|:---------:|:-:|:-------:|:-:|:-:|
| **代币持有人** |   | **候选人** |   |   |
|           | A |    B    | D | E |
|   Peter   | X |    X    |   |   |
|   Alice   | X |    X    |   |   |
|    Bob    | X |    X    | X | X |
|  Kelvin   | X |    X    |   |   |
|  **总数**   | 4 |    4    | 1 | 1 |

For the top-N (say 4 in this example) runners-up, they can remain and their votes persist until the next election. After round 2, even though candidates A & B get the same number of votes in this round, candidate A gets elected because after adding the older unused approvals, it is higher than B.

This would be the tentative governance configuration for Polkadot in the initial genesis. It will be changed if any security loopholes have been found after third-party auditing.

## 技术委员会

The Technical Committee was introduced in the [Kusama rollout and governance post](https://polkadot.network/kusama-rollout-and-governance/) as one of the three chambers of Kusama governance (along with the Council and the Referendum chamber). The Technical Committee is composed of the teams that have successfully implemented or specified either Polkadot/Kusama runtime or the runtime environment. Teams are added or removed from the Technical Committee from a simple majority vote of the council.

The Technical Committee can, along with the Polkadot Council, produce emergency referenda, which are fast-tracked for voting and implementation. These emergency referenda are intended for use only under urgent circumstances.

## [DOT 的用途](learn-DOT#dots-for-governance)

## 资源

- [Initial Governance Description](https://github.com/paritytech/polkadot/wiki/Governance)
- [Democracy Pallet](https://github.com/paritytech/substrate/tree/master/frame/democracy/src)
