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
- [统计](#tallying)（相关资料: [自我调整仲裁偏置 ](#adaptive-quorum-biasing)）

为了更好地了解理事会的组成方式，请阅读[本节](#council)。

## 公投

公民投票是简单，广泛，基于代币抵押的投票方案。 每个公投都有一个与之相关的特定_提案_，该提议在运行时采用特权函数调用的形式（其中包括功能最强大的调用：`set_code`，它可以切换 runtime 的整个代码，从而实现不需要“硬分叉”的功能）。 它们是分离事件，具有固定的投票发生时间段，然后被计票，如果投票获得批准，则会进行函数调用。

可以通过以下几种方式之一启动公投：

* 公开提交的提案
* 理事会多数或全体一致提交的提案；
* Proposals submitted as part of the enactment of a prior referendum;
* 技术委员会提交并经理事会批准的紧急提案。

All referenda have an *enactment delay* associated with them. This is the period of time between the referendum ending and, assuming the proposal was approved, the changes being enacted. For the first two ways that a referendum is launched, this is a fixed time. For Kusama, it is 28 days, and Polkadot will likely be similar. For the third type, it can be set as desired.

紧急建议涉及网络中的主要问题，需要“快速跟踪”，这将将有一个更短颁布时间。

### 提议全民公投

#### 公众投票

任何人都可以通过在一定时期(区块) 内存放最少数量的DOT来进行提交方案。 如果有人同意该建议，他们可以存入相同数量的代币以支持该方案。 支持数量最多的提案将被选为全民投票。 提案完成后，绑定的代币将被释放。

#### 议会公投

议会(一致赞成) - 议会的所有成员都同意一项提案时，可以将其移交给全民投票。This referendum will have a negative turnout bias (that is, the smaller the amount of stake voting, the smaller the amount necessary for it to pass - see "Adaptive Quorum Biasing", below).

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

`Positive turnout bias`，即在投票率低的情况下，需要大量多赞成数票才能通过，但是当投票率增加到100％时，投票者将变成简单多数票，如下所示。 $${against \over \sqrt{voters}} < {approve \over \sqrt{electorate}}$$

##### Super-Majority Against

`Negative turnout bias`，其中低投票率底下要求大量否决票才能否决，但当投票率增加到100％时，它变成了如下所示的简单多数票。 $${against \over \sqrt{electorate}} < {approve \over \sqrt{voters}}$$

##### Simple-Majority

多数票通过，简单比较一下选票，如果赞成票多于反对票，那么提案通过。$${approve} > {against}$$

*要详细了解上述公式的来源，请阅读[民主模块](https://github.com/paritytech/substrate/blob/master/srml/democracy/src/vote_threshold.rs) *。

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

$${450\over\sqrt{1050}} < {600 \over \sqrt{1500}}$$

$${13.887} < {15.492}$$

根据以上结果，该提案将获得批准。 此外，只有获胜选民的代币才被锁定，这意味着如果该公投损害了网络，那么投票反对该网络的人可以立即取回他们锁定的代币。 在提案生效之前，他们可以退出网络并向市场出售其代币。 而且，获胜的提议只有在一些冷却期之后才自主执行。

#### 自愿锁定

Polkadot利用称为`自愿锁定`的想法，允许代币持有者通过声明愿意锁定其DOT的时间来增加其投票权，因此，每个代币持有者的最大投票数将是通过以下公式计算:

```
票数 = 代币 * 时间
```

根据当前的测试网设置，最大锁定周期数设置为6。

**每个周期需要2周，这意味着最长的锁定时间为12周。**


#### Adaptive Quorum Biasing

Polkadot引入了"Adaptive Quorum Biasing"概念，作为议会可以用来更改在提案中没有明确多数的情况下使提案更容易或更困难地通过。

![](assets/governance/adaptive-quorum-biasing.png)

让我们以上面的图片为例。

如果公开提交的公投只有25％的投票率，"aye"(赞成)票数必须达到66％才能通过，那是因为我们应用了` Positive Turnout Bias `。

相反，当投票率达到75％时，"赞成"票总数必须达到54％，这意味着随着更多代币持有人对全民投票，那么所需的多数将随着投票率的增加而减少。

假设议会提议了一项一致的提案，则将使用`Negative Turnout Bias`，因此这意味着该提案在默认情况下通过。 因此，如果他们不喜欢该提案，则更多的代币持有者必须参与投票以防止投票通过。

参考上图，当全民投票的投票率只有25％时，"反对"票数必须达到34％才能被拒绝。

简而言之，当投票率低时，需要超级多数才能通过提案，这意味着必须达到更高的"赞成"选票门槛，但是当投票率增加到100％时，这变成多数。

All three tallying mechanisms - majority carries, super-majority approve, and super-majority against - equate to a simple majority carries system at 100% turnout.

## 议会

为了代表被动的利益相关者，我们介绍了“议会”的概念。 议会是一个链上实体，包括多个参与者，每个参与者代表一个链上账户。 对于Polkadot来说，这个数字可能会从大约6个人开始，并在9个月的过程中增加到24个人(大约每两周增加一个人)。 通常，它有固定数量的席位(Polkadot的席位预计为24个)，所有成员的任期固定(12个月)。

议会主要负责两项管理任务：提出明智的提案，以及取消毫无争议的危险或恶意的提案。

由议会提出的提案，必须有绝大多数成员赞成，并且没有成员行使否决权。 成员对任何单个提案只能行使一次否决权； 如果在冷静期之后重新提交了提案，则他们可能不会第二次否决该提案。 在所有成员都投票赞成的情况下，该投票被认为是一致的，被认为是没有争议的。

要取消全民投票，必须获得一致通过。 由于一致要求很高，因此可以预期只有在完全无争议的举动时才使用此措施。 如果全天候提案中发现一个问题，例如提案将提出的运行时代码中的错误，则这可能是最后手段。

如果取消的争议足够大，以至于至少有一个反对者，那么将由利益相关者*全体*来决定提案的命运。

### 如何成为议会成员?

![](assets/governance/approval-vote.png)

 在创世纪，将有6到12个席位开始。 所有利益相关者可以自由表示同意(或不同意)任何注册候选人。 每两周，其中一个席位将当选，并在9个月内增加到24人(每两周大约增加一个人)。 所有成员都有固定的任期(1年)。议会成员也能通过全民公投提前罢免。

为了选新的议会成员，Polkadot使用`approval voting`方法来允许代币持有人选择他们想要支持的候选人名单，并且权重相等，而获得票数最多的候选人赢得选举，而最高的N名亚军仍保留在下次选举的候选人名单上。

基本上，为了代替一人一票，[Approval voting(同意投票)](https://en.wikipedia.org/wiki/Approval_voting) 是表达他们观点的一种更具表达力的方式。 代币持有人可以将其视为布尔投票，以支持他们尽可能多的候选人。

让我们看下面的例子。

|    第一轮    |   |         |   |   |   |
|:---------:|:-:|:-------:|:-:|:-:|:-:|
| **代币持有人** |   | **候选人** |   |   |   |
|           | A |    B    | C | D | E |
|   Peter   | X |         | X | X | X |
|   Alice   |   |    X    |   |   |   |
|    Bob    |   |         | X | X | X |
|  Kelvin   | X |         | X |   |   |
|  **总数**   | 2 |    1    | 3 | 2 | 2 |

上面的例子显示，候选人C在第一轮选举中获胜，而候选人A，B，D & E仍保留在下一轮候选人名单上。

|    第二轮    |   |         |   |   |
|:---------:|:-:|:-------:|:-:|:-:|
| **代币持有人** |   | **候选人** |   |   |
|           | A |    B    | D | E |
|   Peter   | X |    X    |   |   |
|   Alice   | X |    X    |   |   |
|    Bob    | X |    X    | X | X |
|  Kelvin   | X |    X    |   |   |
|  **总数**   | 4 |    4    | 1 | 1 |

对于前N名(例如本示例中为4名)的亚军，他们可以保留并保持投票直到下一次选举。 在第2轮之后，即使候选人A & B在本轮中获得相同的票数，候选人A也被选出，因为在加上一轮的票数后，它比B高。

这将是最初 Polkadot 的临时治理设置。如果在第三方审核之后发现任何安全漏洞，它将被更改。

## 技术委员会

在[ Kusama 推出和治理帖子](https://polkadot.network/kusama-rollout-and-governance/)中介绍了技术委员会。作为 Kusama 的三个会议厅之一的议院（以及议会和公民投票会议厅）。 技术 委员会由成功实施或指定 Polkadot / Kusama runtime 或 runtime 环境。 在议会的简单多数表决中，从技术委员会中添加或删除团队。

The Technical Committee can, along with the Polkadot Council, produce emergency referenda, which are fast-tracked for voting and implementation. These emergency referenda are intended for use only under urgent circumstances.

## [DOT 的用途](learn-DOT#dots-for-governance)

## 资源

- [治理简介](https://github.com/paritytech/polkadot/wiki/Governance)
- [民主模块](https://github.com/paritytech/substrate/tree/master/srml/democracy/src)
