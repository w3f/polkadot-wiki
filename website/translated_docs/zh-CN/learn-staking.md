---
id: learn-staking
title: Staking
sidebar_label: Staking
---

波卡链（Polkadot）使用 NPoS（提名权益证明）机制选择验证人集合，该机制创建了**验证人**和**提名人**两种角色，以实现链安全性的最大化。对网络维护感兴趣的参与者可以负责运行验证人节点。在创世区块中，波卡链将为验证人提供有限位置，位置数量将逐步增加至 1000 以上。同时，系统还鼓励任何 DOT 持有人成为提名人参与其中。提名人将参与选举出一个或多个可信赖的验证人候选人，以确保网络不会因仅有的少数几名验证人而过于中心化。验证人将同时负责验证区块和确保最终确定性(finality)，而提名人则有权通过 DOT 表明支持对象并选择多个验证人。验证人和提名人都将获得与各自权益成比例的奖励，同时验证人还可对分成方式进行设置。

TODO:在抵押中，你可以充当提名人或验证人。提名人可提名多名可信赖的验证候选人，来帮助你获得 DOT 奖励。你可以看一下[提名人指南](http://wiki.polkadot.network/en/latest/polkadot/node/guides/how-to-nominate/)从而帮助你了解在主网启动时需进行哪些操作。而验证人节点则需24/7全天候运行，以便及时执行预定任务并避免任何引发Slash惩罚的行为。如你想在当前测试网中充当验证人角色，可查阅[验证人指南](http://wiki.polkadot.network/en/latest/polkadot/node/guides/how-to-validate/)。

## Polkadot 抵押的运作方式

### 1. 确定身份

所有潜在验证人都可表明其希望成为验证人候选人的意愿。他们的候选资格将向所有提名人公开，提名人将依次提交所支持的候选人名单。在接下来的纪元(epoch)（持续几个小时）中，拥有最多 DOT 支持的验证人将被选为验证人。这里没有对 DOT 持有人成为提名人提出特别要求，但我们希望每位提名人都能仔细跟踪验证人的表现和声誉。

提名期结束后，NPoS 选举机制将输入提名人及其投票，并输出一组符合要求的验证人，其中每个验证人都能获得最大化的权益支持，并且支持验证人的权益会尽可能呈均匀分布。此选举机制旨在提高网络安全性，确保提名人的公平代表性。如你想进一步了解更多 NPoS 的工作原理（例如选举、运行时间复杂度等），请点击[此处](http://research.web3.foundation/en/latest/polkadot/NPoS/)阅读。

在了解验证人和提名人的奖励制度前，我们需要对**验证人池**进行了解。验证人池由一名当选的验证人和数位支持他的提名人组成。（注意：如果提名人 n 支持多位当选验证人，比如 k 位，NPoS 选举机制将会把 n 的权益分成 s_1、s_2、…、s_k，使支持验证人 i 时权益是 s_i。这种情况下提名人 n 获得的奖励，和假设不同池中有 k 名提名人，各提名人支持验证人 i 的权益均为 s_i 的情况下获得的奖励相同）。在各验证人池中都有一份权益关系的提名人列表。

### 2. 提名期

验证人池的奖励分成为，两个验证人池因工作量相等将获得**相同数量的 DOT**，即各池并不会按权益比例进行支付。在某验证人池中，部分奖励用于支付该验证人的佣金，其余则按**比例**（即与权益成比例）支付给数名提名人和该验证人。需特别注意，该验证人将获得两次奖励：一是验证人设置的佣金奖励，二是通过权益提名自己的奖励。

在估計通胀率和作为提名人或验证人每月可获得多少 DOT 时，你可以参考此 [Excel 表格](https://docs.google.com/spreadsheets/d/1-9Hc3kZ23EhZC3X6feRUKSTv6gj4xR7cvUbJD2zUEZk/edit?usp=sharing)，并可改一下部分参数数字（例如验证人池、总量、佣金等）使你有更好估算。尽管此表格的准确性因抵押参与率不断变化而改变，但仍可以作为很好的指标加以参考。

### 3. 抵押奖励分配

我们要重点强调这一支付模式的两个特点：第一个特点，由于各验证人池的报酬相同，因此与拥有更多权益的池相比，权益较少的池将按照 DOT 支付提名人更多的报酬。因此，这便形成一种经济激励，使得提名人逐渐将偏好转向那些高声誉但被抵押少的验证人。这样做的原因是，我们希望各验证人池之间的权益尽可能均匀分布，以避免权力集中在几名验证人手中。从长期来看，我们希望各验证人池的权益大致相等，声誉更高的验证人拥有更多的权益（这意味着愿意冒更大风险支持低声誉验证人的提名人将获得更高报酬，这一点十分合理）。

下文将举例说明。

为易于理解，我们做出了以下假设。

### 4. 奖励机制

We highlight two features of this payment scheme. The first is that since validator pools are paid the same, pools with less stake will pay more to nominators per-DOT than pools with more stake. We thus give nominators an economic incentive to gradually shift their preferences to lower staked validators that gain a sufficient amount of reputation. The reason for this is that we want the stake across validator pools to be as evenly distributed as possible, to avoid a concentration of power among a few validators. In the long term, we expect all validator pools to have similar levels of stake, with the stake being higher for higher reputation validators (meaning that a nominator that is willing to risk more by backing a validator with a low reputation will get paid more).

根据上文的奖励分配原则，由于 A 验证人池的总权益更高，B 池中的提名人每 DOT 获得的奖励分成将高于 A 池中的提名人。Sam 在 A 池抵押了 50 DOT，只获利 8.3，而抵押数相同的 Kitty 却获利 12.5。

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

_Both validator pools A & B have 4 nominators with the total stake 600 and 400 respectively._

第二个特点是，各验证人候选人均可自由设定佣金(以奖励百分比的形式）以弥补运行成本。由于各验证人池的奖励相同，因此佣金较低的池向提名人分成的奖励要多于高于佣金较高的池。因此，所有验证人均可自由选择是提高佣金获得更多 DOT，还是降低佣金吸引更多提名人、增加当选的机会。在这一方面，我们允许市场自我调节。从长期来看，我们希望所有验证人都具有成本效益以维持其竞争力，同时声誉好的验证人可以收取略高的佣金（这一点十分公平）。

这里有三个不同的帐户供你管理资金： `Stash`、`Controller` 和 `Session`帐户。

The second point to note is that each validator candidate is free to name their desired commission fee (as a fixed amount of DOTs) to cover operational costs. Since validator pools are paid the same, pools with lower commission fees pay more to nominators than pools with higher fees. Thus, each validator can choose between increasing their fees to earn more DOTs, or decreasing their fees to attract more nominators and increase their chances of being elected. We will let the market regulate itself in this regard. In the long term, we expect that all validators will need to be cost efficient to remain competitive, and that validators with higher reputation will be able to charge slightly higher commission fees (which is fair).

## 账户

TODO:更多关于在波卡链中密钥如何使用及其背后密码学的内容，请参见[此处](learn-keys#session-keys)。

![staking](assets/NPoS/staking-keys.png)

- **Stash:** This is the primary account that holds the funds and has a portion bonded for participation; The funds can be kept in a cold wallet; All bonded DOTs are locked. After unbonding, users must wait a certain amount of time in order to access the locked funds (600 blocks at the time of writing).
- **Controller** This is used to control the operation of the validator or nominator, switching between validating, nominating and idle; (It only needs enough funds to send transactions when actions are taken).
- **Session** > Note: This only for the current Alexander testnet. For details about session keys in Kusama Network or Polkadot mainnet, please read [here](learn-keys#session-keys).
- **Session** Session keys are not account keys, but instead consist of several different key types used by validator nodes for different functions. A validator operator first certifies their session keys with their controller key. We recommend handling session keys using only your node's RPC interface because if session keys exist elsewhere then you might equivocate and be slashed. We still support the legacy `--key` parameter for testnets like Alexander.

Since validator slots will be limited, most of those who wish to stake their DOTs and contribute economic security to the network will be nominators. Validators do most of the heavy lifting, they produce new block candidates in BABE, vote and come to consensus in GRANDPA, validate STF of parachains, and possibly some other responsibilities in regard to data availability. Nominators, on the other hand do not need to do anything once they have bonded their DOTs. The experience of the nominator is similar to "set it and forget it" while the validator will be doing an actual service for the network by performing the critical operations. For this reason, the validator has certain privileges in regard to the payout of the staking mechanism and will be able to declare its own allocation before the share is divided to nominators.

Any account key (stash, controller, proxy, etc.) could be either sr25519 or ed25519. At present, Polkadot session keys include one Sr25519 and several Ed25519 keys, but we shall add BLS12-381 and a zero-knowledge VRF mechanism, and parachains might employ other session key types.

当验证人被报告离线多次时，系统将进行Slash惩罚操作。是否惩罚本质上取决于两个参数，即`Offline Slash Grace`和`Unstake Threshold`。`Offline Slash Grace`由本网络进行配置，当前测试网配置设为 `4`，而`Unstake Threshold`则由验证人决定。不过在当前设置中，`Unstake threshold`的最大值不得超过 10。

## 验证人 和 提名人

简言之，当验证人被报告离线的次数超过 `Offline Slash Grace + Unstake threshold` 次数，将触发Slash惩罚。

![staking](assets/NPoS/article-2.png)

### 想参与抵押 DOT?

- 主网上线后年通胀率将达到 10%
- 目标活跃抵押率 50%

## Slash惩罚

!!! info **范例:**

基于Alexander 测试网络的当前配置，奖励将按大约 5 分钟的会话(session)进行记录，并按纪元(era)进行支付。一个纪元为 1 个小时；这意味着奖励将按小时分配给验证人和提名人。

!!! Info **范例:**

### Example

验证人可以创建不与提名人共享的部分奖励(佣金)。在扣除相关金额后，剩余部分将以抵押值为基础，分配至验证人和所有投票给该验证人的提名人。

例如:假设奖励为 100 DOT 验证人可以指定 `validator_payment（佣金） = 50 DOT`，剩余 50 DOT 将根据各自所持有的权益比例分配给验证人和提名人。

    Offline Slash Grace = 4 (由网络定义)
    
      Unstake Threshold = 5 (由验证人定义)
    
      在这种情况下，只有当验证人被报告离线超过 9 次时Slash才会发生。


奖励可以放入同一帐户 (controller) 以不断累积金额，也可以放入 stash 帐户便于使用（增加/不增加抵押值）。同时，无需完全赎回所有抵押便可追加或撤回部分抵押中 DOT。

### Example

A validator signed two or more votes in the same round on different chains.

### Babe Equivocation

**x-axis**: amount of DOTs staked


**X 轴**: 抵押 DOT 数

    每纪元 * 出块时间 = 奖励分配时间
    
      600 * 6 = 3600 = 1 小时
    
      **以上参数可通过提议全民投票做出调整**

**Y 轴**: 年化比例

> Notice: If a validator is reported for anyone of the offences they will be removed from the validator set and they will not be paid while they are kicked out.

**绿线**: 基于抵押参与度的回报率

## 奖励分配

**蓝线**: 通胀率

### Example

```
    PER_ERA * BLOCK_TIME = **Reward Distribution Time**

    600 * 6 = 3600 = 1 Hour

    ***These parameters can be changed by proposing a referendum***
```

上图为本网络的通胀模型。抵押参与度将带动通胀率呈动态变化，以激励或抑制代币持有人参与抵押。例如，当本网络中抵押 DOT 率为 50% 时，通胀率将为 10%。

由于本网络需要足够多的 DOT 进行抵押从而保障预期的安全程度且避免市场流动性不足，因此，要确定出理想抵押率并非易事。

如你想进一步了解本网络通胀模型的设计，请参阅[此处](https://research.web3.foundation/en/latest/polkadot/Token%20Economics/)。

## 通胀率

It is planned to be close to 10% in the first year. This means that each validator will get 1,000 - 2,000 DOTs per month to share with their nominators.

![staking](assets/NPoS/staking-participation-rate.png)

<sub><sup>Source: <a href="https://research.web3.foundation">Research - Web3 Foundation</a></sup></sub>

**x-axis**: amount of DOTs staked

**y-axis**: the annualized percentage

**Green line**: return rate based on the staking participation

**Blue line**:  inflation rate

The above chart shows the inflation model of the network. Depending on the staking participation, the inflation rate will be dynamically changed to incentivize / disincentivize token holders to participate in staking. For instance, inflation would be 10% if 50% of DOTs are being staked to the network.

Determining the ideal staking rate is not an easy task as the network requires enough DOTs to be staked to provide the security guarantees we want and to avoid illiquidity on the market.

For those who are interested in knowing more about the design of inflation model for the network, please see [here](https://research.web3.foundation/en/latest/polkadot/Token%20Economics/).

## 为什么参与抵押?

- 代币将被锁定 12 周左右
- 验证人如果做出损害网络行为将面临惩罚
- ~20% annual return

## 为什么不参与抵押?

- Tokens will be locked for about 12 weeks
- Punishment in case of validator found to be misbehaving

## 波卡会有多少链验证人数量?

The plan is to start with somewhere between 50 to 100 open validator positions and open more gradually. The top bound on the number of validators has not been determined yet, but should only be limited by the bandwidth strain of the network due to frequent and voluminous peer-to-peer message passing. The estimate of the number of validators that Polkadot will have at maturity is around 1000.

## Resources

- [How Nominated Proof of Stake will work in Polkadot](https://medium.com/web3foundation/how-nominated-proof-of-stake-will-work-in-polkadot-377d70c6bd43) - Blog post by Web3 Foundation researcher Alfonso Cevallos covering NPoS in Polkadot.
