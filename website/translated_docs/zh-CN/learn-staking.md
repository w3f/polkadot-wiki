---
id: learn-staking
title: 抵押
sidebar_label: 抵押
---

波卡(Polkadot) 使用 NPoS(提名权益证明)机制选择验证人，该机制为了**验证人**和 **提名人**两种角色，以实现链安全性的最大化。对网络维护感兴趣的参与者可以负责运行验证人节点。在创世区块中，波卡链将为验证人提供有限位置，位置数量将逐步增加至 1000 以上。

系统鼓励 DOT 持有者作为提名人参与。提名人可以支持最多16个他们相信的验证候选人。

验证人角色是在 [BABE](learn-consensus#babe) 负责生成区块，验证平行链区块和确保最终性。提名人可以根据验证人抵押量而作选择。

在 Polkadot 抵押机制中，所有验证人将会获得相同奖励，而所有参与抵押的提名人将会等减去验证人设置的佣金后，再按他们的抵押比例分配奖励。网络通过这激励方法使提名人转而支持抵押量小的验证人，从而使所有验证人抵押比例接近相等。

## Polkadot 抵押的运作方式

### 1. 确定身份

在抵押您可以是[提名人或验证人](#validators-and-nominators)。

作为提名人，你最多提名一个(或最多 16) 你信任的侯选验证人去帮你赚取 DOTs。你可以看看 [提名人手册](maintain-nominator)去理解一下当主网上线时有什么你需要做。

验证节点必须是响应 24/7, 及时履行预期的职责, 并避免任何可惩罚的行为。如果您想在 Kusama 上运行验证人，您可以查看 [Kusama 验证指南](maintain-guides-how-to-validate-kusama)

### 2. 提名期

所有潜在验证人都可表明其希望成为验证人候选人的意愿。他们的候选资格将向所有提名人公开，提名人将依次提交所支持的候选人名单。在接下来的 epoch (持续几个小时）中，拥有最多 DOT 支持的验证候选人将被选为验证人。这里没有对 DOT 持有人成为提名人提出特别要求，但我们希望每位提名人都能仔细跟踪验证人的表现和声誉。

提名期结束后，NPoS 选举机制将输入提名人及其投票，并输出一组符合要求的验证人，其中每个验证人都能获得最大化的权益支持，并且支持验证人的权益会尽可能呈均匀分布。此选举机制旨在提高网络安全性，确保提名人的公平代表性。如你想进一步了解更多 NPoS 的工作原理（例如选举、运行时间复杂度等），请点击[此处](http://research.web3.foundation/en/latest/polkadot/NPoS.html)阅读。

### 3. 抵押奖励分配

在了解验证人和提名人的奖励制度前，我们需要对**验证人池**进行了解。验证人池由一名当选的验证人和数位支持他的提名人组成。（注意：如果提名人 ` n ` 抵押了 ` s ` 支持多位当选验证人，比如 ` k ` 位，NPoS 选举机制将会把权益分成 ` s_1 ` 、` s_2 ` 、…、` s_k `，使支持验证人 ` i ` 时的抵押是 ` s_i `。这种情况下，如果有 ` k ` 提名人在不同验证人池，每个抵押 ` s_i ` 支持一位验证人 ` i `，提名人 ` n ` 将会获得相同的奖励）。在每个验证人池中都有一份权益关系的提名人列表。

验证人池的奖励分为，两个验证人池因工作量相等而获得**相同数量的 DOT **，即各验证人池并不会按抵押比例分配奖励。在验证人池中，部分奖励用于支付该验证人的佣金，其余则按**比例(pro-rata)**（即与抵押成比例）支付给提名人和该验证人。需特别注意，该验证人将获得两次奖励：一是验证人设置的佣金奖励，二是通过提名自己抵押的奖励。

在估計通胀率和作为提名人或验证人每月可获得多少 DOT 时，你可以参考此 [Excel 表格](https://docs.google.com/spreadsheets/d/1-9Hc3kZ23EhZC3X6feRUKSTv6gj4xR7cvUbJD2zUEZk/edit?usp=sharing)，并可改一下部分参数数字（例如验证人池、总量、佣金等）使你有更好估算。尽管此表格的准确性因抵押参与率不断变化而改变，但仍可以作为很好的指标加以参考。

### 4. 奖励机制

我们要重点强调奖励模式的两个特点：第一个特点，由于各验证人池的奖励相同，因此与拥有更多抵押的池相比，抵押较少的池提名人将会获得更多 DOT 的奖励从而形成一种经济激励，使提名人逐渐转向支持那些声誉好但抵押少的验证人。这样做的原因是，我们希望各验证人池之间的押抵量尽可能均匀分布，以避免权力集中在几名验证人手中。从长期来看，我们希望各验证人池的抵押大致相同，声誉更高的验证人拥有更多的抵押（这意味着愿意冒更大风险支持低声誉验证人的提名人将获得更高的回报，这一点十分合理）。

下文将举例说明。为易于理解，我们做出了以下假设:

- 验证人本身不持有权益。
- 他们不收取任何佣金（尽管他们可以这么做）
- 奖励金额为 100 DOT 代币
- 成为验证人需持有的最低 DOT 数为350

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

根据上文的奖励分配原则，由于 A 验证人池的总权益更高，B 池中的提名人每 DOT 获得的奖励分成将高于 A 池中的提名人。Sam 在 A 池抵押了 50 DOT，只获利 8.3，而抵押数相同的 Kitty 却获利 12.5。

同时还需注意，验证人若出现不良行为（例如验证人离线、双重签名等），网络将对其按固定的百分比（而非固定的 DOT 数量）作出惩罚。这意味着抵押更多的验证人池将损失更多 DOT。同样地，这也是为了给提名人提供一种经济激励，使其改变去支持那些他们认为值得信任却没有那么受欢迎的验证人。

第二个特点是，各验证人候选人均可自由设定佣金(固定DOT的数量）以弥补运行成本。由于各验证人池的奖励相同，因此佣金较低的池向提名人分成的奖励要多于高于佣金较高的池。因此，所有验证人均可自由选择是提高佣金获得更多 DOT，还是降低佣金吸引更多提名人、增加当选的机会。在这一方面，我们允许市场自我调节。从长期来看，我们希望所有验证人都具有成本效益以维持其竞争力，同时声誉好的验证人可以收取略高的佣金（这一点十分公平）。

## 账户

这里有两个不同账户管理资金：`Stash` 和 `Controller`。

![staking](assets/NPoS/staking-keys_stash_controller.png)

- **Stash:** 这帐户储存资金用作绑定 DOTs 参与抵押，但将某些功能委托给 Controller。因此使用 Controller 可以积极参与，其保存 Stash 密钥在冷钱包中，这意味着它永远保持离线状态。您还可以指定代理帐户，对[治理](./learn-governance)议案进行投票。
- **Controller** 这帐户是代表 Stash 帐户负责发出有关提名和验证的操作。它用于设置奖励发送到那个帐户和佣金。如果你是验证人，它亦用作设定[ session 密钥](learn-keys#session-keys)，并只需要足够的资金来支付交易费用。

我们设计了这种分隔密匙类型的层次结构，相比起單一密匙系统，可以更好保護驗証人和提名人。通常一个密钥用于多个角色，甚至使用与密钥导出相关的都会失去安全性。 你应该不要将任何帐户密钥为 "热" session 密钥。

Controller 和 Stash 帐户密钥可以是 sr25519 或 ed25519。有关如何在 Polkadot 中使用密钥及其背后加密的更多信息，请参见[此处](learn-keys)。

## 验证人和提名人

因为验证人位置数量有限，大多数希望抵押他們的 DOT  并为网络提供经济安全的人都将是提名人。验证人负责大部分繁重的工作: 他们在 BABE 中产生新的候选区块，投票并在 GRANDPA 达成共识，验证平行链的状态转变函数。还可能验证数据可用性和 [XCMP](learn-crosschain) 方面的一些责任。 另一方面提名人一旦绑定他们的 DOTS 进行抵押，就不必采取任何动作。提名人就类似于"设置并忘记它"。 验证人则为网络提供服务负责关键操作。 出于这原因， 验证人对抵押机制的奖励有一些特权，并能够在奖励分配给提名人之前取下佣金。

![staking](assets/NPoS/article-2.png)

### 想参与抵押 DOT?

- [提名人指南 (Kusama)](mirror-maintain-guides-how-to-nominate-kusama)- 如何在 Kusama 金丝雀网络上进行提名。
- [验证人指南](mirror-maintain-guides-how-to-validate-kusama)-成为 Kusama 网络上的验证人。

## 惩罚 (Slashing)

如果验证人在网络上行为不当(例如: 离线, 攻击网络, 运行已修改的软件) ，验证人将会被惩罚(Slashing)。验证人和他的提名人也会被惩罚而损失百份比绑定/抵押中的 DOTs。

具有较高抵押支持量的验证人池将比不那么受欢迎的验证人池受到更大的惩罚，因此我们鼓励提名人将其提名转移给较不受欢迎的验证人，以减少可能的损失。

The following levels of offence are [defined](https://research.web3.foundation/en/latest/polkadot/slashing/amounts.html) (for slash amounts please see the equations in the section below):

- Level 1: isolated unresponsiveness, i.e. being offline for an entire [epoch](glossary#epoch). No slashing, only [_chilling_](#chilling).
- Level 2: concurrent unresponsiveness or isolated equivocation. Slashes a very small amount of the stake and chills.
- Level 3: misconducts unlikely to be accidental, but which do not harm the network's security to any large extent. Examples include concurrent equivocation or isolated cases of unjustified voting in [GRANDPA](learn-consensus). Slashes a moderately small amount of the stake and chills.
- Level 4: misconduct that poses a serious security or monetary risk to the system, or mass collusion. Slashes all or most of the stake behind the validator and chills.

让我们更详细地看一下这些过错。

### Unresponsiveness

For every session, validators will send an "I'm Online" heartbeat to indicate they are online. If a validator produces no blocks during an epoch and fails to send the heartbeat, it will be reported as unresponsive. Depending on the repeated offences and how many other validators were unresponsive or offline during the epoch, slashing may occur.

下面是计算公式:

    Let x = offenders, n = total no. validators
    
    min((3 * (x - (n / 10 + 1))) / n, 1) * 0.07

请注意，如果少於10%的人验证人离线 ，则不会有任何惩罚。

验证人应该要有一个良好的网络架构去确保节点是正常运行，从而被免被惩罚的风险。拥有高可用性(High Availability)的设定是最理想，**一旦运行中的节点离线**，备份节点会立即换上。 (被免双重签名和因 equivocation 被惩罚 - 请查看下面)，与[代理节点 (Proxy Nodes)](maintain-guides-how-to-setup-sentry-node)一起使用，从而避免当你被 DDoSed 时 把您的验证人节点 IP 地址公开。 [此处](https://wiki.polkadot.network/docs/en/maintain-guides-secure-validator)提供了设置有关安全验证人的全面指南。

### GRANDPA Equivocation

在同一轮里面，验证人在不同链上签上二个或更多投票。

### BABE Equivocation

验证人在中继链同一个时隙中出二个或更多区块。

GRANDPA 和 BABE 的 equivocation 惩罚算式如下:

    设 x = 出错节点, n = 验证人总数
    
    Min( (3 * x / n )^2, 1)

验证人可以在多台电脑上运行他们的节点，即使其中一台节点有问题，他们仍然执行验证工作。应注意的是，如果他们在管理签名方面没有很好的协调，equivocation 是有可能的。

如果验证人被举报了任何一种违法行为，则会踢出其验证人([chilled](#chilling))，验证人踢出后并不会获得奖励。 他们将立即被视为失效的验证人，并失去其所有提名人。 他们需要重新提交成为验证人的交易，并收集提名人的支持。

如果您想要了解更多有关惩罚(Slashing)的详细信息，请查看我们的 [研究专页](https://research.web3.foundation/en/latest/polkadot/slashing/amounts.html)。

### Chilling

Chilling 是指从下一个 NPoS 周期中，从生效的验证人中删除它，并取消其与候选者资格的行为。

这可以是自愿的并且可以由验证人发起，例如如果验证人的周围环境或托管服务提供商计划中断，并且验证人想要退出以保护自己免遭惩罚。 当 chilling 时，验证人在当前 session 中会保持生效状态，但在下一个 session 中将其移动到非生效状态。 验证人不会丢失其提名人。

当一部分作为惩罚时，chilled 意味着隐瞒未提名的惩罚。 它还会在当前时代的其余时间禁用验证人，并从下一次选举中删除有问题的验证人。

Polkadot 允许停用某些验证人，但是如果停用的验证人数量过多，Polkadot 将触发新的验证人选择以获取完整的验证人。 停用验证人将需要重新提交其有意成为验证人的交易，以获得提名人的支持。

### Slashing Across Eras

有三个主要困难需要在 NPoS 中进行惩罚：

- 提名人可以提名多个验证人，然后通过其中任何一个将惩罚。
- 在惩罚之前，抵押在各个时代都可以重复使用。 连续提名 E 个时代的 N 币并不意味着您要惩罚 N\*E 币 - 您只有 N 币。
- 惩罚可在事实发生后发现。

为了平衡这一点，我们只惩罚参与者在某个时间段内可收到的最大惩罚，而不是总和。 这样可以确保避免过度惩罚。 同样计算最大惩罚的时间间隔是有限的，并且如前一节所述，在发生惩罚事件后取消验证人的情况下，验证人会变冷。 这可以防止 rage-quit 攻击，因为一旦参与者表现出了严重的行为不当，就会故意加害。

## 奖励分配

请注意，Kusama 运行速度大约是 Polkadot 的4倍，除了出块时间。 Polkadot 还将以大约六秒钟的间隔出块。

奖励是在每个 session 记录（在 Kusama 上大约一小时，在 Polkadot 上四个小时），并根据每个时代进行计算（在 Kusama 上大约六小时，在 Polkadot 上二十四个小时)。 因此在 Kusama 每天将计算四次奖励，而在 Polkadot 则将每天计算一次奖励。

为了获得您的抵押奖励，必须有人为您提名的验证人领取它们。 抵押奖励可以保留84个时代，在 Polkadot 大约84天，在 Kusama 大约21天。 有关为什么这样做的更多信息，请参见[Simple payouts](learn-simple-payouts)上的页面。

> 警告：如果此时没有人领取您的抵押奖励，那么您将无法领取它们，并且您的某些抵押奖励将会丢失。

### 领取奖励

如果您前往到[ Polkadot JS ](https://polkadot.js.org/apps/#/staking/payout)上的"抵押 Staking payouts"页面，您将看到一个拥有验证人的列表在过去84个时代中获得的提名。 每个人都可以选择触发所有无人认领时代的奖励。 请注意，这将向那些在那个时代提名该验证人的人发送奖励，任何人都可以触发它。

### 奖励分配例子

```
    PER_ERA * BLOCK_TIME = **Reward Distribution Time**

    3600 * 6 seconds = 21,600 s = 6 hours

    ***These parameters can be changed by proposing a referendum***
```

验证人可以设置佣金把奖励先取下一部份再跟提名人分享。此佣金是区块奖励的百分比，而不是绝对值。当取下佣金后，余下部份会根据验证人和所有提名该验证人的抵押比例作分配。

例如假设验证人的区块奖励是10个 DOT。 验证人可以指定` validator_payment = 50％`，在这种情况下，验证者将收到5个 DOT。 然后，根据每个提名人所拥有的抵押比例，在验证人及其提名人之间分配剩余的5个DOT。 请注意，验证人本身也可以有自己的抵押，对于此计算，他们的抵押就像是另一个提名人一样。

奖励可以放在同一个帐户 (Controller) 不断积累奖励或存放在 Stash 帐户 (增加抵押量 / 不增加抵押量)。另外，你可以在参与抵押中充值 / 提取部份绑定的 DOTs 而不用解绑全部。

关于验证人付款的详细信息，请参阅 [本指南](maintain-guides-validator-payout)。

## 通胀率

第一年的通货膨胀率设计为10％，验证人的奖励是所抵押金额的函数，其余部分将用于国库。

![staking](assets/NPoS/staking-participation-rate.png)

<p style="text-align:center">资料来源： <a href="https://research.web3.foundation/en/latest/polkadot/Token%20Economics.html">Research - Web3 Foundation</a></p>

- **x-轴**: DOTs 抵押的数量
- **y-轴**: 通货膨胀, 年度化百分比
- **蓝线**: 参与抵押者的通涨奖励
- **绿线**: 抵押参与者的收益率

上图显示了网络的通货膨胀模型。 根据抵押参与者的参与，通货膨胀对验证人与国库的分配将动态变化，以提供参与(或不参与)抵押的激励。 例如如果所有 KSM / DOT 中的50％参与抵押，所有的通货膨胀将流向验证人，但是任何与50％的偏差（正数或负数）都会将剩余部分按比例发送给国库，从而有效地减少了验证人的收益。

如你想进一步了解本网络通胀模型的设计，请参阅[此处](https://research.web3.foundation/en/latest/polkadot/Token%20Economics.html)。

## 为什么参与抵押?

- 当主网上线，每年 10% 通胀率
- 目标抵押为 50％
- ~20% 年回报

## 为什么不参与抵押?

- 代币解锁在 Kusama 需要7天，而 Polkadot 则是28天。
- 如果发现验证人行为不当，将执行处罚（请参见[ #slashing ](#slashing)）。
- 您将想代币用于平行链插槽。

## 波卡会有多少链验证人数量?

The plan is to start with somewhere between 50 to 100 open validator positions and open more gradually. The top bound on the number of validators has not been determined yet, but should only be limited by the bandwidth strain of the network due to frequent and voluminous peer-to-peer message passing. The estimate of the number of validators that Polkadot will have at maturity is around 1000. Kusama, Polkadot's canary network, has over 300 validator slots.

## 资源

- [NPoS 在 Polkadot 怎么运作](https://medium.com/web3foundation/how-nominated-proof-of-stake-will-work-in-polkadot-377d70c6bd43) - Web3 基金会研究员 Alfonso Cevallos 描述 NPoS 在 Polkadot 的博客文章
- [设置安全验证人](https://wiki.polkadot.network/docs/en/maintain-guides-secure-validator)
