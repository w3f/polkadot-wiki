---
id: maintain-polkadot-parameters
title: Polkadot Parameters
sidebar_label: Parameters
description: A description about fundamental Polkadot parameters.
keywords: [parameters, actions, attributes, behaviors]
slug: ../maintain-polkadot-parameters
---

Many of these parameter values can be updated via on-chain governance. If you require absolute
certainty of these parameter values, it is recommended you directly check the constants by looking
at the [chain state](https://polkadot.js.org/apps/#/chainstate/constants) and/or
[storage](https://polkadot.js.org/apps/#/chainstate).

### Periods of common actions and attributes

_NOTE: Polkadot generally runs at &frac14;th the speed of Kusama, except in the time slot duration
itself._

=== "Polkadot"

    - Slot: 6 seconds \*(generally one block per slot, although see note below)
    - Epoch: 4 hours (2_400 slots x 6 seconds)
    - Session: 4 hours (Session and Epoch lengths are the same)
    - Era: 24 hours (6 sessions per Era, 2_400 slots x 6 epochs x 6 seconds)

    | Polkadot | Time      | Slots\* |
    | -------- | --------- | ------- |
    | Slot     | 6 seconds | 1       |
    | Epoch    | 4 hours   | 2_400   |
    | Session  | 4 hours   | 2_400   |
    | Era      | 24 hours  | 14_400  |

=== "Kusama"

    - Slot: 6 seconds \*(generally one block per slot, although see note below)
    - Epoch: 1 hour (600 slots x 6 seconds)
    - Session: 1 hour (6 sessions per Era)
    - Era: 6 hours (3600 slots x 6 seconds)

    | Kusama  | Time      | Slots\* |
    | ------- | --------- | ------- |
    | Slot    | 6 seconds | 1       |
    | Epoch   | 1 hour    | 600     |
    | Session | 1 hour    | 600     |
    | Era     | 6 hours   | 3_600   |

\*_A maximum of one block per slot can be in a canonical chain. Occasionally, a slot will be without
a block in the chain. Thus, the times given are *estimates*. See
[Consensus](../learn/learn-consensus.md) for more details._

### Governance

=== "Polkadot"

    | Parameter        | Time    | Slots   | Description                                                                 |
    | ---------------- | ------- | ------- | --------------------------------------------------------------------------- |
    | Voting period    | 28 days | 403_200 | How long the public can vote on a referendum.                               |
    | Enactment period | 28 days | 403_200 | Time it takes for a successful referendum to be implemented on the network. |

=== "Kusama"

    | Parameter        | Time   | Slots   | Description                                                                 |
    | ---------------- | ------ | ------- | --------------------------------------------------------------------------- |
    | Voting period    | 7 days | 100_800 | How long the public can vote on a referendum.                               |
    | Enactment period | 8 days | 115_200 | Time it takes for a successful referendum to be implemented on the network. |

### Staking, Validating, and Nominating

The maximum number of validators that can be nominated by a nominator is can be see
[here](../general/chain-state-values.md#maximum-votes-per-nominator).

=== "Polkadot"

    | Parameter            | Time    | Slots   | Description                                                                                                                                                                                         |
    | -------------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | Term duration        | 1 Day   | 14_400  | The time for which a validator is in the set after being elected. Note, this duration can be shortened in the case that a validator misbehaves.                                                     |
    | Nomination period    | 1 Day   | 14_400  | How often a new validator set is elected according to [Phragmén's method](../learn/learn-phragmen.md).                                                                                              |
    | Bonding duration     | 28 days | 403_200 | How long until your funds will be transferrable after unbonding. Note that the bonding duration is defined in eras, not directly by slots.                                                          |
    | Slash defer duration | 28 days | 403_200 | Prevents overslashing and validators "escaping" and getting their nominators slashed with no repercussions to themselves. Note that the bonding duration is defined in eras, not directly by slots. |

=== "Kusama"

    | Parameter            | Time    | Slots   | Description                                                                                                                                                                                         |
    | -------------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | Term duration        | 6 hours | 3_600   | The time for which a validator is in the set after being elected. Note, this duration can be shortened in the case that a validator misbehaves.                                                     |
    | Nomination period    | 6 hours | 3_600   | How often a new validator set is elected according to [Phragmén's method](../learn/learn-phragmen.md).                                                                                              |
    | Bonding duration     | 7 days  | 604_800 | How long until your funds will be transferrable after unbonding. Note that the bonding duration is defined in eras, not directly by slots.                                                          |
    | Slash defer duration | 7 days  | 604_800 | Prevents overslashing and validators "escaping" and getting their nominators slashed with no repercussions to themselves. Note that the bonding duration is defined in eras, not directly by slots. |

### Treasury

=== "Polkadot"

    | Treasury               | Time    | Slots   | Description                                                  |
    | ---------------------- | ------- | ------- | ------------------------------------------------------------ |
    | Periods between spends | 24 days | 345_600 | When the treasury can spend again after spending previously. |

    Burn percentage is currently `1.00%`.

=== "Kusama"

    | Treasury               | Time   | Slots  | Description                                                  |
    | ---------------------- | ------ | ------ | ------------------------------------------------------------ |
    | Periods between spends | 6 days | 86_400 | When the treasury can spend again after spending previously. |

    Burn percentage is currently `0.20%`, though instead of being burned this amount is temporarily
    redirected into the [Society](../maintain/kusama/maintain-guides-society-kusama.md)'s treasury to
    fund growth.

### Precision

=== "Polkadot"

    DOT have 10 decimals of precision. In other words, 10 \*\* 10 (10_000_000_000 or ten billion)
    Plancks make up a DOT.

    The denomination of DOT was changed from 12 decimals of precision at block #1,248,328 in an event
    known as _Denomination Day_. See [Redenomination](../learn/archive/learn-redenomination.md) for
    details.

=== "Kusama"

    KSM have 12 decimals of precision. In other words, 1e12 (1_000_000_000_000, or one trillion) Plancks
    make up a single KSM.
