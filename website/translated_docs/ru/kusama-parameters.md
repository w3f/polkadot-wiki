---
id: kusama-parameters
title: Kusama Parameters
sidebar_label: Параматры
---

Many of these parameter values can be updated via on-chain governance. If you require absolute certainty as to their values, it is recommended you directly check the constants by looking at the [chain state](https://polkadot.js.org/apps/#/chainstate/constants) and/or [storage](https://polkadot.js.org/apps/#/chainstate).

### Периоды общих действий и атрибутов

_NOTE: Kusama generally runs 4x as fast as Polkadot, except Polkadot also has 6 second slots. See [Polkadot Parameters](https://wiki.polkadot.network/docs/en/maintain-polkadot-parameters) for more details on how Kusama's parameters differ from Polkadot's._

- Slot: 6 seconds \*(generally one block per slot, although see note below)
- Эпоха: 1 час (600 слотов x 6 секунд)
- Сессия: 1 час (6 сессий в эре)
- Эра: 6 часов (3600 слотов x 6 секунд)

| Kusama | Время    | Слоты\* |
| ------ | -------- | --------- |
| Slot   | 6 секунд | 1         |
| Эпоха  | 1 час    | 600       |
| Сессия | 1 час    | 600       |
| Эра    | 6 часов  | 3,600     |

\*_A maximum of one block per slot can be in a canonical chain. However, occasionally a slot will be without a block in the chain. Thus, the times given are estimates. See [Consensus](learn-consensus) for more details._

### Управление

| Демократия         | Время  | Слоты   | Описание                                                                                                                                                      |
| ------------------ | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Период голосования | 7 дней | 100,800 | Как долго общественность может голосовать за референдум.                                                                                                      |
| Период запуска     | 7 дней | 100,800 | How long the public can select which proposal to hold a referendum on, i.e., every week, the highest-weighted proposal will be selected to have a referendum. |
| Период принятия    | 8 дней | 115,200 | Время на успешное проведение референдума в сети.                                                                                                              |

| Совет              | Время  | Слоты  | Описание                                                                             |
| ------------------ | ------ | ------ | ------------------------------------------------------------------------------------ |
| Срок действия      | 1 день | 14,400 | Продолжительность срока полномочий члена совета до следующего избирательного раунда. |
| Период голосования | 1 день | 14,400 | Период голосования по предложениям в Совете.                                         |

The Kusama Council consists of up to 19 members and up to 19 runners up.

| Технический комитет            | Время   | Слоты   | Описание                                                                                      |
| ------------------------------ | ------- | ------- | --------------------------------------------------------------------------------------------- |
| Период ожидания                | 7 дней  | 604,800 | Время вето от технического комитета длится до того, как предложение будет вновь представлено. |
| Период экстренного голосования | 3 часов | 1,800   | Период голосования после того, как технический комитет ускорит голосование.                   |

### Стейкинг, валидация и номинирование

| Kusama                         | Время   | Слоты   | Описание                                                                                                                                                                                            |
| ------------------------------ | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Срок действия                  | 6 часов | 3,600   | The time for which a validator is in the set after being elected. Note, this duration can be shortened in the case the a validator misbehaves.                                                      |
| Период номинации               | 6 часов | 3,600   | How often a new validator set is [elected](learn-phragmen).                                                                                                                                         |
| Длительность бондинга          | 7 дней  | 604,800 | How long until your funds will be transferrable after unbonding. Note that the bonding duration is defined in eras, not directly by slots.                                                          |
| Длительность отсрочки слэшинга | 7 дней  | 604,800 | Prevents overslashing and validators "escaping" and getting their nominators slashed with no repercussions to themselves. Note that the bonding duration is defined in eras, not directly by slots. |

### Казначейство

| Казна                   | Время  | Слоты  | Описание                                                                  |
| ----------------------- | ------ | ------ | ------------------------------------------------------------------------- |
| Периоды между расходами | 6 дней | 86,400 | Когда казначейство может потратить средства снова после предидущей траты. |

Burn percentage is currently `0.20%`, though instead of being burned this amount is temporarily redirected into the [Society](maintain-guides-society-kusama)'s treasury to fund growth.

### Precision

KSM have 12 decimals of precision. In other words, 1e12 (1,000,000,000,000 or one trillion) Plancks make up a single KSM.
