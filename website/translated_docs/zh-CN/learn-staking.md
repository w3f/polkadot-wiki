---
id: learn-staking
title: 抵押
sidebar_label: 抵押
---

波卡链（Polkadot）使用 NPoS（提名权益证明）机制选择验证人集合，该机制创建了**验证人**和 **提名人**两种角色，以实现链安全性的最大化。对网络维护感兴趣的参与者可以负责运行验证人节点。在创世区块中，波卡链将为验证人提供有限位置，位置数量将逐步增加至 1000 以上。

系统鼓励 DOT 持有者作为提名人参与。提名人可以支持最多16个他们相信的验证候选人。

验证人角色是在 BABE 负责生成区块，验证平行链区块和确保最终性。提名人可以根据验证人抵押量而作选择。

在 Polkadot 抵押机制中，所有验证人将会获得相同奖励，而所有参与抵押的提名人将会等减去验证人设置的佣金后，再按他们的抵押比例分配奖励。网络通过这激励方法使提名人转而支持抵押量小的验证人，从而使所有验证人抵押比例接近相等。

## Polkadot 抵押的运作方式

### 1. 确定身份

在抵押您可以是[提名人或验证人](#validators-and-nominators)。

作为提名人，你最多提名一个(或最多 16) 你信任的侯选验证人去帮你赚取 DOTs。你可以看看 [提名人手册](maintain-nominator)去理解一下当主网上线时有什么你需要做。

验证人需要 24/7 在线及时履行其预期职责，并避免任何会被惩罚的行为。如果你想在现有测试网运行节点或 Kusama 网络，你可以留意查看  [ Alexande ](maintain-guides-how-to-validate-alexander) 或 [ Kusama ](maintain-guides-how-to-validate-kusama)验证人手册。

### 2. 提名期

所有参选验证人都可表明其希望成为验证候选人的意愿。他们的候选资格将向所有提名人公开，提名人将提交所支持的候选人名单。在接下来的时代(epoch)（持续几个小时）中，拥有最多 DOT 支持的验证人将被选为验证人。这里没有对 DOT 持有人成为提名人有特别要求，但我们希望每位提名人都能仔细留意验证人的表现和声誉。

提名期结束后，NPoS 选举机制将使用提名人及其投票作输入，并输出一组符合要抵押量要求的验证人，使每个验证人都能获得最大化的权益支持，并使验证人的权益会尽可能呈均匀分布。此选举机制旨在提高网络安全性，确保提名人的公平代表性。如你想进一步了解更多 NPoS 的工作原理（例如选举、运行时间复杂度等），请点击[此处](http://research.web3.foundation/en/latest/polkadot/NPoS/)阅读。

### 3. 抵押奖励分配

在了解验证人和提名人的奖励制度前，我们需要对**验证人池**进行了解。验证人池由一名当选的验证人和数位支持他的提名人组成。（注意：如果提名人 ` n ` 抵押了 ` s ` 支持多位当选验证人，比如 ` k ` 位，NPoS 选举机制将会把权益分成 ` s_1 ` 、` s_2 ` 、…、` s_k `，使支持验证人 ` i ` 时的抵押是 ` s_i `。这种情况下，如果有 ` k ` 提名人在不同验证人池，每个抵押 ` s_i ` 支持一位验证人 ` i `，提名人 ` n ` 将会获得相同的奖励）。在每个验证人池中都有一份权益关系的提名人列表。

验证人池的奖励分为，两个验证人池因工作量相等而获得**相同数量的 DOT **，即各验证人池并不会按抵押比例分配奖励。在验证人池中，部分奖励用于支付该验证人的佣金，其余则按**比例**（即与抵押成比例）支付给提名人和该验证人。需特别注意，该验证人将获得两次奖励：一是验证人设置的佣金奖励，二是通过提名自己抵押的奖励。

在估計通胀率和作为提名人或验证人每月可获得多少 DOT 时，你可以参考此 [ Excel 表格](https://docs.google.com/spreadsheets/d/1-9Hc3kZ23EhZC3X6feRUKSTv6gj4xR7cvUbJD2zUEZk/edit?usp=sharing)，并可改一下部分参数数字（例如验证人池、总量、佣金等）样你更好估算。尽管此表格的准确性因抵押参与率不断变化而变动，但它仍可以作为很好的参考指标。

### 4. 奖励机制

我们要重点强调奖励模式的两个特点：第一个特点，由于各验证人池的奖励相同，因此与拥有更多抵押的池相比，抵押较少的池提名人将会获得更多 DOT 的奖励从而形成一种经济激励，使提名人逐渐转向支持那些声誉好但抵押少的验证人。这样做的原因是，我们希望各验证人池之间的押抵量尽可能均匀分布，以避免权力集中在几名验证人手中。从长期来看，我们希望各验证人池的抵押大致相同，声誉更高的验证人拥有更多的抵押（这意味着愿意冒更大风险支持低声誉验证人的提名人将获得更高的回报，这一点十分合理）。

下文将举例说明。为易于理解，我们做出了以下假设:

* 验证人本身不持有权益。
* 他们不收取任何佣金（尽管他们可以这么做）
* 奖励金额为 100 DOT 代币
* 成为验证人需持有的最低 DOT 数为350


|         | **验证人池 A** |        |      |
|:-------:|:----------:|:------:|:----:|
| 提名人 (4) |  权益 (600)  | 所占总权益比 |  奖励  |
|   Jin   |    100     | 0.167  | 16.7 |
| **Sam** |     50     | 0.083  | 8.3  |
|  Anson  |    250     | 0.417  | 41.7 |
|  Bobby  |    200     | 0.333  | 33.3 |

|           | **验证人池 B** |        |      |
|:---------:|:----------:|:------:|:----:|
|  提名人 (4)  |  权益 (400)  | 所占总权益比 |  奖励  |
|   Alice   |    100     |  0.25  |  25  |
|   Peter   |    100     |  0.25  |  25  |
|   John    |    150     | 0.375  | 37.5 |
| **Kitty** |     50     | 0.125  | 12.5 |

_验证人池 A & B 均拥有 4 名提名人，分别持有 600 和 400 DOTs 作抵押。_

根据以上的奖励分配，由于 A 验证人池的抵押较高，所以 B 池中的提名人 DOT 的奖励分成将高于 A 池中的提名人。Sam 在 A 池抵押了 50 DOT，只获利 8.3，而抵押量相同的 Kitty 在 B 池却获利 12.5。

同时还需注意，验证人若出现不良行为（例如验证人离线、双重签名等），网络将对其按固定的百分比（而非固定的 DOT 数量）作出 Slashing 惩罚。这意味着抵押更多的验证人池将损失更多 DOT。同样地，这也是为了给提名人提供一种经济激励，使其改变去支持那些他们认为值得信任却没有那么受欢迎的验证人。

第二个特点是，各验证候选人均可设定佣金(固定DOT的数量）以弥补运行成本。由于各验证人池的奖励相同，因此佣金较低的池向提名人分成的奖励要多于高佣金的池。另外所有验证人均可自由选择提高佣金获得更多 DOT，或降低佣金吸引更多提名人、增加当选机会。我们让市场自我调节，从长远来看，我们预计所有验证人都需要具有低成本效益以维持其竞争力，同时声誉好的验证人可以收取略高的佣金（这一点十分公平）。

## 账户

这里有两个不同账户管理资金：`Stash` 和 `Controller`。

![staking](assets/NPoS/staking-keys_stash_controller.png)

* **Stash:** 这帐户储存资金用作绑定 DOTs 参与抵押，但将某些功能委托给 Controller。因此使用 Controller 可以积极参与，其保存 Stash 密钥在冷钱包中，这意味着它永远保持离线状态。您还可以指定代理帐户，对[治理](./learn-governance)提案进行投票。
* **Controller** 这帐户是代表 Stash 帐户负责发出有关提名和验证的操作。它用于设置奖励发送到那信帐户和佣金。如果你是验证人，它亦用作设定<[ session 密钥](learn-keys#session-keys)，并只需要足够的资金来支付交易费用。

我们设计了这种分隔密匙类型的层次结构，相比起單一密匙系统，可以更好保護驗証人和提名人。通常一个密钥用于多个角色，甚至使用与密钥导出相关的都会失去安全性。 你应该不要将任何帐户密钥 为 "热"  session 密钥。

Controller 和 Stash 帐户密钥可以是 sr25519 或 ed25519。

想了解 Polkadot 如何使用和背后密码学，看[这里](learn-keys)。

## 验证人 和 提名人

Since validator slots will be limited, most of those who wish to stake their DOTs and contribute economic security to the network will be nominators. Validators do most of the heavy lifting: they produce new block candidates in BABE, vote and come to consensus in GRANDPA, validate the STF of parachains, and possibly some other responsibilities regarding data availability and XCMP. Nominators, on the other hand, do not need to do anything once they have bonded their DOTs. The experience of the nominator is similar to "set it and forget it," while the validator will be doing active service for the network by performing the critical operations. For this reason, the validator has certain privileges regarding the payout of the staking mechanism and will be able to declare its own allocation before the share is divided to nominators.

![staking](assets/NPoS/article-2.png)

### 想参与抵押 DOT?

* [Nominator Guide](maintain-guides-how-to-nominate-alexander) - Become a nominator on the Alexander testnet.
* [Validator Guide](maintain-guides-how-to-validate-alexander) - Become a validator on the Alexander testnet.

## Slash惩罚

如果验证人在网络上行为不当(例如: 离线, 攻击网络, 运行已修改的软件) ，验证人将会被惩罚(Slashing)。验证人和他的提名人也会被惩罚而损失百份比绑定/抵押中的 DOTs。

一旦扣减(Slashing) 发生，较多抵押的验证人池，会比抵押少的验证人池扣得多，所以我们鼓励提名人把他们的提名转移到较少的验证人从而减低损失。

根据 Polkadot 最新的代码，以下惩罚 (Slashing) 条件已经实現了：

### Unresponsiveness

For every session, validators will send an "I'm Online" message to indicate they are online. If a validator produces no blocks during an epoch and fails to send the heartbeat, it will be reported as unresponsive. Depending on the repeated offences and how many other validators were unresponsive or offline, slashing will occur.

下面是计算公式:

    Let x = offenders, n = total no. validators
    
    min((3 * (k - (n / 10 + 1))) / n, 1) * 0.07

Note that if less than 10% of all validators are offline, no penalty is enacted.

Validators should have a well-architected network infrastructure to ensure the node is running to reduce the risk of being slashed. A high availability setup is desirable, preferably with backup nodes that kick in **only once the original node is verifiably offline** (to avoid double-signing and being slashed for equivocation - see below), together with proxy nodes to avoid being DDoSed when your validator node's IP address is exposed. A comprehensive guide on secure validator setup is in progress with the draft available [here](https://wiki.polkadot.network/docs/en/maintain-guides-secure-validator).

### GRANDPA Equivocation

A validator signs two or more votes in the same round on different chains.

### BABE Equivocation

A validator produces two or more blocks on the relay chain in the same time slot.

GRANDPA and BABE equivocation slashing penalty is calculated as below:

    设 x = 出错节点, n = 验证人总数
    
    Min( (3 * x / n )^2, 1)

Validators may run their nodes on multiple machines to make sure they can still perform validation work in case one of their nodes goes down. It should be noted that if they do not have good coordination to manage signing machines, then equivocation is possible.

> 注意: 如果验证人被举报以上任何一个过错，验证人将会被踢下来和之后的奖励也不会有。

If you want to know more details about slashing, please look at our [research page](https://research.web3.foundation/en/latest/polkadot/slashing/amounts/).

## 奖励分配

Note that Kusama runs approximately 4x as fast as Polkadot, except for block production times.  Polkadot will also produce blocks at approximately six second intervals.

Rewards are recorded per session --- approximately one hour on Kusama and four hours on Polkadot --- and paid per era. It takes approximately six hours to finish one era, twenty-four hours on Polkadot.  Thus, rewards will be distributed to the validators and nominators four times per day on Kusama and once per day on Polkadot.

### 例子

```
    PER_ERA * BLOCK_TIME = **Reward Distribution Time**

    3600 * 6 seconds = 21,600 s = 6 hours

    ***These parameters can be changed by proposing a referendum***
```

Validators can create a cut of the reward that is not shared with the nominators. This cut is a percentage of the block reward, not an absolute value. After the value gets deducted, the remaining portion is based on their staked value and split between the validator and all of the nominators who have voted for this validator.

For example, assume the block reward for a validator is 10 DOTs. A validator may specify `validator_payment = 50%`, in which case the validator would receive 5 DOTs. The remaining 5 DOTs would then be split between the validator and their nominators based on the portion of stakes they had.

Rewards can be directed to the same account (controller) or to the stash account (and either increasing the staked value or not increasing the staked value). It is also possible to top-up / withdraw some bonded DOTs without having to un-stake everything.

## 通胀率

Inflation is designed to be close to 10% in the first year. This means that each validator will get 1,000 - 2,000 DOTs per month to share with their nominators.

![staking](assets/NPoS/staking-participation-rate.png)

<sub><sup>资料来源: [研究 - Web3 基金会](https://research.web3.Foundation)</sup></sub>

**x-axis**: amount of DOTs staked

**y-axis**: the annualized percentage

**Green line**: return rate based on the staking participation

**Blue line**:  inflation rate

The above chart shows the inflation model of the network. Depending on the staking participation, the inflation rate will change dynamically to incent / disincent token holders to participate in staking. For instance, inflation would be 10% if 50% of DOTs are staked in the network.

Determining the ideal staking rate is not an easy task as the network requires enough DOTs to be staked to provide the security guarantees and we want and to avoid illiquidity on the market.

For those who are interested in knowing more about the design of inflation model for the network, please see [here](https://research.web3.foundation/en/latest/polkadot/Token%20Economics/).

## 为什么参与抵押?

* 当主网上线，接近 ~10% 通胀率
* 50% targeted active staking
* ~20% 年回报

## 为什么不参与抵押?

* 代币将被锁定 12 周左右
* 验证人如果做出损害网络行为将面临惩罚

## 波卡会有多少链验证人数量?

The plan is to start with somewhere between 50 to 100 open validator positions and open more gradually. The top bound on the number of validators has not been determined yet, but should only be limited by the bandwidth strain of the network due to frequent and voluminous peer-to-peer message passing. The estimate of the number of validators that Polkadot will have at maturity is around 1000.

## 资源

* [NPoS 在 Polkadot 怎么运作](https://medium.com/web3foundation/how-nominated-proof-of-stake-will-work-in-polkadot-377d70c6bd43) - Web3 基金会研究员 Alfonso Cevallos 描述 NPoS 在 Polkadot 的博客文章
* [设置安全验证人](https://wiki.polkadot.network/docs/en/maintain-guides-secure-validator)
