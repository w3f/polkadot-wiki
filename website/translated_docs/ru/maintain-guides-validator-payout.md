---
id: maintain-guides-validator-payout
title: Обзор выплат валидатору
sidebar_label: Обзор выплат валидатору
---

## Очки эры

За каждую эру (период времени примерно 6 часов в Kusama и 24 часа в Polkadot) оплата валидаторам рассчитывается пропорционально сумме баллов _era points_, которые они собрали. Era points-это бонусные баллы, заработанные за оплачиваемые действия, такие как:

- выдача поддтвеждений валидности для [парачейн](learn-parachains) блоков.
- producing a non-uncle block in the Relay Chain.
- создание ссылки на предыдущий нереференсный uncle блок.
- создание референсного uncle блока.

_Note: An uncle block is a Relay Chain block that is valid in every regard, but which failed to become canonical. This can happen when two or more validators are block producers in a single slot, and the block produced by one validator reaches the next block producer before the others. We call the lagging blocks uncle blocks._

Платежи происходят в конце каждой эпохи.

## Схема выплат

Независимо от того, сколько стейка стоит за валидатором, все валидаторы делят выплату за создание блока поровну. Общая сумма выплат, однако, может отличаться в зависимости от того, сколько получено [era points](# era-points), как описано выше.

Валидаторы также могут получать "чаевые" от отправителей в качестве стимула для включения транзакций в создаваемые ими блоки.

Для простоты в приведенных ниже примерах предполагается, что все валидаторы имеют одинаковое количество era points.

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

## Запуск нескольких валидаторов

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

Запуск двух валидаторов и разделение стейка поровну приведет к тому, что исходный валидатор `v4` будет выгнан из набора валидаторов, поскольку только верхние валидаторы `v` (измеренные по стейку) будут выбраны для включения в набор валидаторов. Что ещё более важно, это также удвоит вознаграждение, которое Вы получаете от каждой эпохи.

```
Validator Set Size (v): 4
Validator 1 Stake (v1): 9 DOT <- Your first validator
Validator 2 Stake (v2): 9 DOT <- Your second validator
Validator 3 Stake (v3): 9 DOT
Validator 4 Stake (v4): 8 DOT
Payout (p): 8 DOT

Your payout = (p / v) * 1 = (8 / 4) * 2 = 4
```

При достаточном количестве стейка Вы можете запустить более двух валидаторов. Тем не менее, каждый валидатор должен иметь достаточный стейк в запасе, чтобы быть в наборе валидатора.

Стимулы системы благоприятствуют валидаторам с равными ставками. Скорее всего, это будет динамическое, а не статическое равновесие. Потенциальные валидаторы будут запускать разное количество валидаторов и применять к ним разные суммы стейка с течением времени и в ответ на действия других валидаторов в сети.

## Слэшинг/Slashing

Although rewards are paid equally, slashes are relative to a validator's stake. Therefore, if you do have enough DOT to run multiple validators, it is in your best interest to do so. A slash of 30% will, of course, be more DOT for a validator with 18 DOT staked than one with 9 DOT staked.

Запуск нескольких валидаторов не освобождает Вас от последствий неправильного поведения. Polkadot наказывает атаки, которые кажутся скоординированными более строго, чем отдельные атаки. Например, не следует запускать несколько валидаторов, размещенных в одной инфраструктуре. Правильная конфигурация мульти-валидатора гарантирует, что они не выходят из строя одновременно.

У номинаторов есть стимул выдвигать валидатора с самой низкой ставкой, так как это приведет к самому низкому риску и самому высокому вознаграждению.

## Номинаторы и платежи валидатора

Номинированный стейк позволяет вам "голосовать" за валидаторов и делиться вознаграждениями (и слэшингом), не запуская узел валидатора самостоятельно. Валидаторы могут оставить себе процент от вознаграждения, причитающегося их валидатору, чтобы "возместить" себе затраты на запуск узла валидатора. Кроме того, все вознаграждения делятся на основе стейка, стоящим за каждым валидатором. Это включает в себя стейк самого валидатора, а также любой стейк, с бондингом от номинаторов.

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
