---
id: learn-staking
title: Staking
sidebar_label: Staking
---

波卡链（Polkadot）使用 NPoS（提名权益证明）机制选择验证人集合，该机制创建了**验证人**和 **提名人**两种角色，以实现链安全性的最大化。对网络维护感兴趣的参与者可以负责运行验证人节点。在创世区块中，波卡链将为验证人提供有限位置，位置数量将逐步增加至 1000 以上。

系统同时还鼓励任何 DOT 持有人成为提名人参与其中。提名人将参与选举出一个或多个可信赖的验证人候选人(最多16个)，以确保网络不会因仅有的少数几名验证人而过于中心化。验证人将同时负责验证区块和确保最终确定性(finality)，而提名人则有权通过 DOT 表明支持对象并选择多个验证人。验证人和提名人都将获得与各自权益成比例的奖励，同时验证人还可对分成方式进行设置。

## Polkadot 抵押的运作方式

### 1. 确定身份

In staking, you can be either a [nominator or a validator](#validators-and-nominators).

As a nominator, you can nominate one or more (up to 16) validator candidates that you trust to help you earn rewards in DOTs. You can take a look at the [nominator guide](maintain-nominator) to understand what you are required to do when the mainnet launches.

A validator node is required to be responsive 24/7, perform its expected duties in a timely manner, and avoid any slashable behavior. You can follow our [Alexander validator guide](maintain-guides-how-to-validate-alexander) if you want to run a validator in the current testnet, or our [Kusama validator guide](maintain-guides-how-to-validate-kusama) if you would like to run a validator on Kusama.

### 2. 提名期

所有潜在验证人都可表明其希望成为验证人候选人的意愿。他们的候选资格将向所有提名人公开，提名人将依次提交所支持的候选人名单。在接下来的纪元(epoch)（持续几个小时）中，拥有最多 DOT 支持的验证人将被选为验证人。这里没有对 DOT 持有人成为提名人提出特别要求，但我们希望每位提名人都能仔细跟踪验证人的表现和声誉。

提名期结束后，NPoS 选举机制将输入提名人及其投票，并输出一组符合要求的验证人，其中每个验证人都能获得最大化的权益支持，并且支持验证人的权益会尽可能呈均匀分布。此选举机制旨在提高网络安全性，确保提名人的公平代表性。如你想进一步了解更多 NPoS 的工作原理（例如选举、运行时间复杂度等），请点击 [此处](http://research.web3.foundation/en/latest/polkadot/NPoS/)阅读。

### 3. 抵押奖励分配

在了解验证人和提名人的奖励制度前，我们需要对**验证人池**进行了解。验证人池由一名当选的验证人和数位支持他的提名人组成。（注意：如果提名人 n 支持多位当选验证人，比如 k 位，NPoS 选举机制将会把 n 的权益分成 s_1、s_2、…、s_k，使支持验证人 i 时权益是 s_i。这种情况下提名人 n 获得的奖励，和假设不同池中有 k 名提名人，各提名人支持验证人 i 的权益均为 s_i 的情况下获得的奖励相同）。在各验证人池中都有一份权益关系的提名人列表。

验证人池的奖励分成为，两个验证人池因工作量相等将获得**相同数量的 DOT**，即各池并不会按权益比例进行支付。在某验证人池中，部分奖励用于支付该验证人的佣金，其余则按**比例**（即与权益成比例）支付给数名提名人和该验证人。需特别注意，该验证人将获得两次奖励：一是验证人设置的佣金奖励，二是通过权益提名自己的奖励。

在估計通胀率和作为提名人或验证人每月可获得多少 DOT 时，你可以参考此[Excel 表格](https://docs.google.com/spreadsheets/d/1-9Hc3kZ23EhZC3X6feRUKSTv6gj4xR7cvUbJD2zUEZk/edit?usp=sharing)，并可改一下部分参数数字（例如验证人池、总量、佣金等）使你有更好估算。尽管此表格的准确性因抵押参与率不断变化而改变，但仍可以作为很好的指标加以参考。

### 4. 奖励机制

我们要重点强调这一支付模式的两个特点：第一个特点，由于各验证人池的报酬相同，因此与拥有更多权益的池相比，权益较少的池将按照 DOT 支付提名人更多的报酬。因此，这便形成一种经济激励，使得提名人逐渐将偏好转向那些高声誉但被抵押少的验证人。这样做的原因是，我们希望各验证人池之间的权益尽可能均匀分布，以避免权力集中在几名验证人手中。从长期来看，我们希望各验证人池的权益大致相等，声誉更高的验证人拥有更多的权益（这意味着愿意冒更大风险支持低声誉验证人的提名人将获得更高报酬，这一点十分合理）。

下文将举例说明。为易于理解，我们做出了以下假设。

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

根据上文的奖励分配原则，由于 A 验证人池的总权益更高，B 池中的提名人每 DOT 获得的奖励分成将高于 A 池中的提名人。Sam 在 A 池抵押了 50 DOT，只获利 8.3，而抵押数相同的 Kitty 却获利 12.5。

We also remark that when the network slashes a validator slot for a misbehavior (e.g. validator offline, equivocation, etc.) the slashed amount is a fixed percentage (and NOT a fixed amount of DOTs), which means that validator pools with more stake get slashed more DOTs. Again, this is done to provide nominators with an economic incentive to shift their preferences and back less popular validators whom they consider to be trustworthy.

第二个特点是，各验证人候选人均可自由设定佣金(固定DOT的数量）以弥补运行成本。由于各验证人池的奖励相同，因此佣金较低的池向提名人分成的奖励要多于高于佣金较高的池。因此，所有验证人均可自由选择是提高佣金获得更多 DOT，还是降低佣金吸引更多提名人、增加当选的机会。在这一方面，我们允许市场自我调节。从长期来看，我们希望所有验证人都具有成本效益以维持其竞争力，同时声誉好的验证人可以收取略高的佣金（这一点十分公平）。

## 账户

这里有三个不同的帐户供你管理资金: `Stash`、`Controller` 和 `Session`帐户。

![staking](assets/NPoS/staking-keys.png)

- **Stash:** This account holds funds bonded for participation, but delegates its staking and governance functions to controller and proxy keys. As a result, you may actively participate with a stash key kept in a cold wallet, meaning it stays offline all the time, possibly sharded in bank vaults. After unbonding, users must wait a certain amount of time in order to access the locked funds (600 blocks at the time of writing).
- **Controller** This account controls its stash account's nomination of validator nodes, or authorizes operation of your own validator, switching between validating, nominating and idle. It only needs enough funds to post transactions when actions are taken.
- **Proxy** This account participates in governance on behalf of its stash account. Again, it only needs enough funds to post vote transactions.
- **Session** Session keys are not account keys, but instead consist of several different key types used by validator nodes for different functions. A validator operator first certifies their session keys with their controller key. We recommend handling session keys using only your node's RPC interface because if session keys exist elsewhere then you might equivocate and be slashed. We still support the legacy `--key` parameter for testnets like Alexander.

We designed this hierarchy of separate key types so that validator operators and nominators can protect themselves much better than in systems with only one key. As a rule, you lose security anytime you use one key for multiple roles, or even if you use keys related by derivation. You should never use any account key for a "hot" session key in particular.

Any account key (stash, controller, proxy, etc.) could be either sr25519 or ed25519. At present, Polkadot session keys include one Sr25519 and several Ed25519 keys, but we shall add BLS12-381 and a zero-knowledge VRF mechanism, and parachains might employ other session key types.

For more on how keys are used in Polkadot and the cryptography behind it [see here](learn-keys).

## 验证人 和 提名人

Since validator slots will be limited, most of those who wish to stake their DOTs and contribute economic security to the network will be nominators. Validators do most of the heavy lifting, they produce new block candidates in BABE, vote and come to consensus in GRANDPA, validate STF of parachains, and possibly some other responsibilities in regard to data availability. Nominators, on the other hand do not need to do anything once they have bonded their DOTs. The experience of the nominator is similar to "set it and forget it" while the validator will be doing an actual service for the network by performing the critical operations. For this reason, the validator has certain privileges in regard to the payout of the staking mechanism and will be able to declare its own allocation before the share is divided to nominators.

![staking](assets/NPoS/article-2.png)

### 想参与抵押 DOT?

- 主网上线后年通胀率将达到 10%
- 目标活跃抵押率 50%

## Slash惩罚

Slashing will happen if a validator misbehaves(e.g. always offline, attack the network or running modified software) in the network, they and their nominators will get slashed by losing a percentage of their bonded/staked DOTs.

As validators have more DOTs staked, they will get slashed more, so we encourage nominators to shift their nominations to less popular validators to reduce the risk of being lost more.

Based on the latest Polkadot's codebase, the following slashing have been implemented:

### Unresponsiveness

For every session, validators will send a "I'm Online" message to indicate they are online while unresponsiveness means that the validator fails to send the heartbeat. Depending on the repeated offences and how many other validators were offline, slashing will occur. If one-third of all validators are unresponsive, 5% of their bonded DOTs will be slashed.

Here is the formula for calculation:

    Let x = offenders, n = total no. validators
    
    Min( (3 * (x - 1)) / n, 1) * 0.05


Validators should have a well-architected network infrastructure to ensure the node is running to reduce the risk of being slashed, for example, having high availability support to guarantee even though when the node went offline, you can still have another machine to take place.

### Grandpa Equivocation

A validator signed two or more votes in the same round on different chains.

### Babe Equivocation

A validator produces two or more blocks on the relay chain in the same time slot.


Grandpa and Babe equivocation slashing amount is calculated as below:

    Let x = offenders, n = total no. validators
    
    Min( (3 * x / n )^2, 1)

Validators may run their nodes on multiple machines to make sure they can still perform validation work in case if one of their nodes goes down, but if they do not have a good coordination to manage those machines to do signing that can potentially cause the equivocation problem, hence, it would be better to have something like KMS (Key Management Server) as a middleware in between those machines to coordinate those tasks in order to avoid this kind of problem occurs.

> Notice: If a validator is reported for anyone of the offences they will be removed from the validator set and they will not be paid while they are kicked out.

If you want to know the details of the slashing, please look at our [research page](https://research.web3.foundation/en/latest/polkadot/slashing/amounts/).

## 奖励分配

Based on the the current configuration in the Alexander testnet, rewards are recorded per session that is roughly 5 minutes and paid per era. It takes 1 hour to finish an era; that means rewards will be distributed to the validators and nominators per hour.

### Example

```
    PER_ERA * BLOCK_TIME = **Reward Distribution Time**

    600 * 6 = 3600 = 1 Hour

    ***These parameters can be changed by proposing a referendum***
```

Validators can create a cut of the reward that is not shared with the nominators. After the value gets deducted, the remaining portion is based on their staked value and split between the validator and all of the nominators who have voted for this validator.

For example, assume reward is 100 DOTs. A validator may specify `validator_payment = 50 DOTs` and the remaining 50 DOTs would be split between the validator and their nominators based on the portion of stakes they had.

Rewards can be used by the same account (controller) to keep accumulating the rewards or by the stash account (increasing the staked value/not increasing the staked value). Also, it is possible to top-up/withdraw partial bonded DOTs without having to completely un-stake everything.

## 通胀率

It is planned to be close to 10% in the first year. This means that each validator will get 1,000 - 2,000 DOTs per month to share with their nominators.

![staking](assets/NPoS/staking-participation-rate.png)

<sub><sup>Source: <a href="https://research.web3.foundation">Research - Web3 Foundation</a></sup></sub>

**x-axis**: amount of DOTs staked

**y-axis**: the annualized percentage

**Green line**: return rate based on the staking participation

**Blue line**:  inflation rate

上图为本网络的通胀模型。抵押参与度将带动通胀率呈动态变化，以激励或抑制代币持有人参与抵押。例如当网络中抵押 DOT 率为 50% 时，通胀率将为 10%。

由于本网络需要足够多的 DOT 进行抵押从而保障预期的安全程度且避免市场流动性不足，因此，要确定出理想抵押率并非易事。

如你想进一步了解本网络通胀模型的设计，请参阅[此处](https://research.web3.foundation/en/latest/polkadot/Token%20Economics/)。

## 为什么参与抵押?

- 10% inflation/year when the network launches
- 50% targeted active staking
- ~20% annual return

## 为什么不参与抵押?

- 代币将被锁定 12 周左右
- 验证人如果做出损害网络行为将面临惩罚

## 波卡会有多少链验证人数量?

The plan is to start with somewhere between 50 to 100 open validator positions and open more gradually. The top bound on the number of validators has not been determined yet, but should only be limited by the bandwidth strain of the network due to frequent and voluminous peer-to-peer message passing. The estimate of the number of validators that Polkadot will have at maturity is around 1000.

## Resources

- [How Nominated Proof of Stake will work in Polkadot](https://medium.com/web3foundation/how-nominated-proof-of-stake-will-work-in-polkadot-377d70c6bd43) - Blog post by Web3 Foundation researcher Alfonso Cevallos covering NPoS in Polkadot.
