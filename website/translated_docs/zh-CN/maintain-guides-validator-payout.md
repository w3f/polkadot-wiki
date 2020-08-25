---
id: maintain-guides-validator-payout
title: 验证人奖励发放概述
sidebar_label: 验证人奖励发放概述
---

## Era Points

对于每个时代(era) (在 Kusama 大约6小时，在 Polkadot 大约24小时），验证人将按照他们的_era points_的数量按比例支付。era points 是指通过以下方式获得的奖励积分:

- 为[ 平行链 ](learn-parachains)区块发布有效性声明。
- producing a non-uncle block in the Relay Chain.
- 生成一个引用到以前未引用的叔块。
- 生成一个引用的叔块。

_Note: An uncle block is a Relay Chain block that is valid in every regard, but which failed to become canonical. This can happen when two or more validators are block producers in a single slot, and the block produced by one validator reaches the next block producer before the others. We call the lagging blocks uncle blocks._

奖励发放在每个时代结束时。

## 奖励方式

不管验证人背后的抵押总额是多少，所有验证人都会拆分出块奖励。 但是总支付额可能会根据[era points](#era-points)而有所不同，例如如上所述。

验证人还可以从发送交易者那里收到"小费"，作为在其出块中包含交易的激励。

为简单起见，下面的示例将假定所有验证人具有相同数量的 era points。

```
Validator Set Size (v): 4
Validator 1 Stake (v1): 18 DOT
Validator 2 Stake (v2):  9 DOT
Validator 3 Stake (v3):  8 DOT
Validator 4 Stake (v4):  7 DOT
Payout (p): 8 DOT

Payout for each validator (v1 - v4):
p / v = 8 / 4 = 2 DOT
```

Note that this is different than most other Proof-of-Stake systems such as Cosmos. As long as a validator is in the validator set, it will receive the same block reward as every other validator. Validator `v1`, who had 18 DOT staked, received the same reward (2 DOT) in this era as `v4` who had only 7 DOT staked.

## 运行多个验证人节点

It is possible for a single entity to run multiple validators. Running multiple validators may provide a better risk/reward ratio. Assuming you have enough DOT, or enough stake nominates your validator, to ensure that your validators remain in the validator set, running multiple validators will result in a higher return than running a single validator.

For the following example, assume you have 18 DOT to stake. For simplicity's sake, we will ignore nominators. Running a single validator, as in the example above, would net you 2 DOT in this era.

```
Validator Set Size (v): 4
Validator 1 Stake (v1): 18 DOT <- Your validator
Validator 2 Stake (v2):  9 DOT
Validator 3 Stake (v3):  8 DOT
Validator 4 Stake (v4):  7 DOT
Payout (p): 8 DOT

Your payout = (p / v) * 1 = (8 / 4) * 1 = 2
```

运行两个验证者节点并平均分摊抵押，将导致原本的验证人节点` v4 `被踢出验证人，因为只有前` v `名验证人节点（按抵押量）被选入验证人。 更重要的是，它使您在每个周期获得的回报翻倍。

```
Validator Set Size (v): 4
Validator 1 Stake (v1): 9 DOT <- Your first validator
Validator 2 Stake (v2): 9 DOT <- Your second validator
Validator 3 Stake (v3): 9 DOT
Validator 4 Stake (v4): 8 DOT
Payout (p): 8 DOT

Your payout = (p / v) * 1 = (8 / 4) * 2 = 4
```

当有足够抵押，您就可以运行两个以上的验证人节点。 但是每个验证人节点必须在其后面具有足够的抵押才能成为验证人。

系统的激励机制有利于使验证人的抵押平均分配。这是动态而不是静态的平衡。验证人可能会运行多过验证人节点，并留意网络上其它验证人的操作，随着时间而改变抵押的数量。

## 惩罚 (Slashing)

Although rewards are paid equally, slashes are relative to a validator's stake. Therefore, if you do have enough DOT to run multiple validators, it is in your best interest to do so. A slash of 30% will, of course, be more DOT for a validator with 18 DOT staked than one with 9 DOT staked.

运行多个验证人节点并不能免除错误行为的后果。當 Polkadot 受到多个节点同時攻擊，惩罚會比單一攻擊更多。例如您不应在同一云端服务器上托管多个验证人节点。 运行多个验证人节点的正确方法是确保它们不会同时离线。

提名人有动机提名权益最低的验证人，因为这将导致最低的风险和最高的回报。

## 提名人和验证人支付

通过提名参与抵押，您无需要运行节点即可"投票"喜欢的验证人并分享奖励（和惩罚）。验证人可以选择保留部分奖励，以"补偿"运行验证人节点的费用。除此之外，所有奖励都是根据每个验证人的抵押量而分享的。 这包括验证人本身的抵押量，以及提名人所绑定到抵押。

> **NOTE:** Validators set their preference as a percentage of the block reward, _not_ an absolute number of DOT. Polkadot's block reward is based on the _total_ amount at stake, with the reward peaking when the amount staked is at 50% of the total supply. In periods when there is a lower amount staked, and therefore lower rewards, the validator's payout preference could mean that there is zero left over for nominators.

In the following examples, we can see the results of several different validator payment schemes and split between nominator and validator stake. We will assume a single nominator for each validator. However, there can be numerous nominators for each validator. Rewards are still distributed proportionally - for example, if the total rewards to be given to nominators is 2 DOT, and there are four nominators with equal stake bonded, each will receive 0.5 DOT. Note also that a single nominator may stake different validators.

Each validator in the example has selected a different validator payment (that is, a percentage of the reward set aside directly for the validator before sharing with all bonded stake). The validator's payment percentage (in DOT) is listed in brackets (`[]`) next to each validator. Note that since the validator payment is public knowledge, having a low or non-existent validator payment may attract more stake from nominators, since they know they will receive a larger reward.

```
Validator Set Size (v): 4
Validator 1 Stake (v1) [0.2]: 18 DOT (9 validator, 9 nominator)
Validator 2 Stake (v2) [0.4]:  9 DOT (3 validator, 6 nominator)
Validator 3 Stake (v3) [0.1]:  8 DOT (4 validator, 4 nominator)
Validator 4 Stake (v4) [0.0]:  6 DOT (1 validator, 5 nominator)
Payout (p): 8 DOT

Payout for each validator (v1 - v4):
p / v = 8 / 4 = 2 DOT

v1:
(0.2 * 2) = 0.4 DOT -> validator payment
(2 - 0.4) = 1.6 -> shared between all stake
(9 / 18) * 1.6 = 0.8 -> validator stake share
(9 / 18) * 1.6 = 0.8 -> nominator stake share
v1 validator total reward: 0.4 + 0.8 = 1.2 DOT
v1 nominator reward: 0.8 DOT

v2:
(0.4 * 2) = 0.8 DOT -> validator payment
(2 - 0.8) = 1.2 -> shared between all stake
(3 / 9) * 1.2 = 0.4 -> validator stake share
(6 / 9) * 1.2 = 0.8 -> nominator stake share
v2 validator total reward: 0.8 + 0.4 = 1.2 DOT
v2 nominator reward: 0.8 DOT

v3:
(0.1 * 2) = 0.2 DOT -> validator payment
(2 - 0.2) = 1.8 -> shared between all stake
(4 / 8) * 1.8 = 0.9 -> validator stake share
(4 / 8) * 1.8 = 0.9 -> nominator stake share
v3 validator total reward: 0.2 + 0.9 DOT = 1.1 DOT
v3 nominator reward: 0.9 DOT

v4:
(0 * 2) = 0 DOT -> validator payment
(2 - 0) = 2.0 -> shared between all stake
(1 / 6) * 2 = 0.33 -> validator stake share
(5 / 6) * 2 = 1.67 -> nominator stake share
v4 validator total reward: 0 + 0.33 DOT = 0.33 DOT
v4 nominator reward: 1.67 DOT
```
