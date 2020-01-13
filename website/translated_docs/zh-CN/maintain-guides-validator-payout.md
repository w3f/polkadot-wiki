---
id: maintain-guides-validator-payout
title: 验证人奖励概述
sidebar_label: 验证人奖励概述
---

## 奖励方式

Validators are paid for authoring blocks on the relay chain and signing parachain blocks. Validator payouts occur at the end of every era (on the Alexander testnet, this was approximately once per hour, on Kusama once every six hours, and on Polkadot mainnet once per day ). No matter how much stake is behind a validator (by the validator stash itself, as well as by nominators), all validators split the block authoring payout equally.

验证人还可以从发送交易者那里收到"小费"，作为在其生成的区块中包含交易的激励。

例如:

```
Validator Set Size (v): 4
Validator 1 Stake (v1): 18 DOTs
Validator 2 Stake (v2):  9 DOTs
Validator 3 Stake (v3):  8 DOTs
Validator 4 Stake (v4):  7 DOTs
Payout (p): 8 DOTs

Payout for each validator (v1 - v4):
p / v = 8 / 4 = 2 DOTs
```

请注意，这与大多数其他权益证明系统（例如 Cosmos）不同。 只要是验证人，它将获得与其他验证人相同的区块奖励。验证人` v1 `抵押了 18 DOTs，在这个周期与` v4 `仅抵押了 7 DOTs 的得到了相同奖励（2个DOT）。

## 运行多个验证人节点

单个实体有可能运行多个验证人节点。 运行多个节点可以提供更好的风险/回报率。 假设您有足够的 DOT 或足够的抵押提名您的验证人，以确保您的验证人能保留在验证人中，运行多个验证人将比运行单一验证人产生更高的收益。

对于以下例子，假设您有18 DOTs作抵押。 为简单起见，我们将忽略提名人。如上例所示，运行单一验证人节点将使您在该周期获得2 DOTs。

```
Validator Set Size (v): 4
Validator 1 Stake (v1): 18 DOTs <- Your validator
Validator 2 Stake (v2):  9 DOTs
Validator 3 Stake (v3):  8 DOTs
Validator 4 Stake (v4):  7 DOTs
Payout (p): 8 DOTs

Your payout = (p / v) * 1 = (8 / 4) * 1 = 2
```

运行两个验证者节点并平均分摊抵押，将导致原本的验证人节点` v4 `被踢出验证人，因为只有前` v `名验证人节点（按抵押量）被选入验证人。 更重要的是，它使您在每个周期获得的回报翻倍。

```
Validator Set Size (v): 4
Validator 1 Stake (v1): 9 DOTs <- Your first validator
Validator 2 Stake (v2): 9 DOTs <- Your second validator
Validator 3 Stake (v3): 9 DOTs
Validator 4 Stake (v4): 8 DOTs
Payout (p): 8 DOTs

Your payout = (p / v) * 1 = (8 / 4) * 2 = 4
```

当有足够抵押，您就可以运行两个以上的验证人节点。 但是每个验证人节点必须在其后面具有足够的抵押才能成为验证人。

系统的激励机制有利于使验证人的抵押平均分配。这是动态而不是静态的平衡。验证人可能会运行多过验证人节点，并留意网络上其它验证人的操作，随着时间而改变抵押的数量。

## 惩罚

虽然奖励分配是一样，但惩罚是根据验证人的抵押量而定。 因此如果您确实有足够的 DOT，可以运行多个验证人节点，则可以达到最大利益化。 当然，如果惩罚 30% 时，对于拥有18 DOTs 的验证人节点，会比拥有9 DOT的验证人惩罚多。

运行多个验证人节点并不能免除错误行为的后果。當 Polkadot 受到多个节点同時攻擊，惩罚會比單一攻擊更多。例如您不应在同一云端服务器上托管多个验证人节点。 运行多个验证人节点的正确方法是确保它们不会同时离线。

提名人有动机提名权益最低的验证人，因为这将导致最低的风险和最高的回报。

## 提名人和验证人支付

Nominated stake allows you to "vote" for validators and share in the rewards (and slashing) without running a validator node yourself. Validators can choose to keep a percentage of the rewards due to their validator to "reimburse" themselves for the cost of running a validator node. Other than that, all rewards are shared based on the stake behind each validator. This includes the stake of the validator itself, plus any stake bonded by nominators.

> **NOTE:** Validators set their preference as a percentage of the block reward, _not_ an absolute number of DOTs. Polkadot's block reward is based on the _total_ amount at stake, with the reward peaking when the amount staked is at 50% of the total supply. In periods when there is a lower amount staked, and therefore lower rewards, the validator's payout preference could mean that there is zero left over for nominators.

在以下例子中，我们可以看到几种不同验证人佣金方案的结果，并在提名人和验证人抵押之间分配。 我们假设每个验证人只有一个提名人。 但是每个验证人可以有很多提名人。 奖励仍按比例分配 - 例如，如果给提名人的奖励为2 DOTs，并且有四个提名人的抵押份量是相同，则每个人将获得 0.5 DOT。 另外每个提名人可能会提名其它验证人节点。

Each validator in the example has selected a different validator payment (that is, a percentage of the reward set aside directly for the validator before sharing with all bonded stake). The validator's payment percentage (in DOTs) is listed in brackets (`[]`) next to each validator. Note that since the validator payment is public knowledge, having a low or non-existent validator payment may attract more stake from nominators, since they know they will receive a larger reward.

```
Validator Set Size (v): 4
Validator 1 Stake (v1) [0.2]: 18 DOTs (9 validator, 9 nominator)
Validator 2 Stake (v2) [0.4]:  9 DOTs (3 validator, 6 nominator)
Validator 3 Stake (v3) [0.1]:  8 DOTs (4 validator, 4 nominator)
Validator 4 Stake (v4) [0.0]:  6 DOTs (1 validator, 5 nominator)
Payout (p): 8 DOTs

Payout for each validator (v1 - v4):
p / v = 8 / 4 = 2 DOTs

v1:
(0.2 * 2) = 0.4 DOTs -> validator payment
(2 - 0.4) = 1.6 -> shared between all stake
(9 / 18) * 1.6 = 0.8 -> validator stake share
(9 / 18) * 1.6 = 0.8 -> nominator stake share
v1 validator total reward: 0.4 + 0.8 = 1.2 DOTs
v1 nominator reward: 0.8 DOTs

v2:
(0.4 * 2) = 0.8 DOTs -> validator payment
(2 - 0.8) = 1.2 -> shared between all stake
(3 / 9) * 1.2 = 0.4 -> validator stake share
(6 / 9) * 1.2 = 0.8 -> nominator stake share
v2 validator total reward: 0.8 + 0.4 = 1.2 DOTs
v2 nominator reward: 0.8 DOTs

v3:
(0.1 * 2) = 0.2 DOTs -> validator payment
(2 - 0.2) = 1.8 -> shared between all stake
(4 / 8) * 1.8 = 0.9 -> validator stake share
(4 / 8) * 1.8 = 0.9 -> nominator stake share
v3 validator total reward: 0.2 + 0.9 DOTs = 1.1 DOTs
v3 nominator reward: 0.9 DOTs

v4:
(0 * 2) = 0 DOTs -> validator payment
(2 - 0) = 2.0 -> shared between all stake
(1 / 6) * 2 = 0.33 -> validator stake share
(5 / 6) * 2 = 1.67 -> nominator stake share
v4 validator total reward: 0 + 0.33 DOTs = 0.33 DOTs
v4 nominator reward: 1.67 DOTs
```
