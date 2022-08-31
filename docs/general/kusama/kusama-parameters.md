---
id: kusama-parameters
title: Kusama Parameters
sidebar_label: Parameters
description: Learn about common Kusama parameters
keywords: [parameters, kusama, on-chain]
slug: ../../kusama-parameters
---

import RPC from "./../../../components/RPC-Connection"

Many of these parameter values can be updated via on-chain governance. If you require absolute
certainty of these parameter values, it is recommended you directly check the constants by looking
at the [chain state](https://polkadot.js.org/apps/#/chainstate/constants) and/or
[storage](https://polkadot.js.org/apps/#/chainstate).

### Periods of common actions and attributes

_NOTE: Kusama generally runs 4x as fast as Polkadot, except in the time slot duration itself. See
[Polkadot Parameters](../../maintain/maintain-polkadot-parameters.md) for more details on how
Kusama's parameters differ from Polkadot's._

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
[Consensus](../../learn/learn-consensus.md) for more details._

### Accounts, Identity and Crowdloans

- The [Existential Deposit](../../learn/learn-accounts.md#existential-deposit-and-reaping) is
  {{ polkadot: <RPC network="kusama" path="consts.balances.existentialDeposit" defaultValue={33333300} filter="humanReadable"/> :polkadot }}
  {{ kusama: <RPC network="kusama" path="consts.balances.existentialDeposit" defaultValue={33333300} filter="humanReadable"/> :kusama }}
- The deposit required to set an Identity is
  {{ polkadot: <RPC network="kusama" path="consts.identity.basicDeposit" defaultValue={33333000000} filter="humanReadable"/>  :polkadot }}
  {{ kusama: <RPC network="kusama" path="consts.identity.basicDeposit" defaultValue={33333000000} filter="humanReadable"/>  :kusama }}
- The minimum contribution required to participate in a crowdloan is
  {{ polkadot: <RPC network="kusama" path="consts.crowdloan.minContribution" defaultValue={100000000000} filter="humanReadable"/>  :polkadot }}
  {{ kusama: <RPC network="kusama" path="consts.crowdloan.minContribution" defaultValue={100000000000} filter="humanReadable"/>  :kusama }}

### Governance

| Democracy        | Time   | Slots   | Description                                                                                                                                                   |
| ---------------- | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Voting period    | 7 days | 100_800 | How long the public can vote on a referendum.                                                                                                                 |
| Launch period    | 7 days | 100_800 | How long the public can select which proposal to hold a referendum on, i.e., every week, the highest-weighted proposal will be selected to have a referendum. |
| Enactment period | 8 days | 115_200 | Time it takes for a successful referendum to be implemented on the network.                                                                                   |

| Council       | Time  | Slots  | Description                                                          |
| ------------- | ----- | ------ | -------------------------------------------------------------------- |
| Term duration | 1 day | 14_400 | The length of a council member's term until the next election round. |
| Voting period | 1 day | 14_400 | The council's voting period for motions.                             |

The Kusama Council consists of up to 19 members and up to 19 runners up.

| Technical committee     | Time    | Slots   | Description                                                                                    |
| ----------------------- | ------- | ------- | ---------------------------------------------------------------------------------------------- |
| Cool-off period         | 7 days  | 604_800 | The time a veto from the technical committee lasts before the proposal can be submitted again. |
| Emergency voting period | 3 hours | 1_800   | The voting period after the technical committee expedites voting.                              |

### Staking, Validating, and Nominating

A maximum of
{{ polkadot: <RPC network="kusama" path="consts.staking.maxNominations" defaultValue={24}/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.staking.maxNominations" defaultValue={24}/> :kusama }}
validators can be nominated by a nominator on Kusama.

| Kusama               | Time    | Slots   | Description                                                                                                                                                                                         |
| -------------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Term duration        | 6 hours | 3_600   | The time for which a validator is in the set after being elected. Note, this duration can be shortened in the case the a validator misbehaves.                                                      |
| Nomination period    | 6 hours | 3_600   | How often a new validator set is [elected](../../learn/learn-phragmen.md).                                                                                                                          |
| Bonding duration     | 7 days  | 604_800 | How long until your funds will be transferrable after unbonding. Note that the bonding duration is defined in eras, not directly by slots.                                                          |
| Slash defer duration | 7 days  | 604_800 | Prevents overslashing and validators "escaping" and getting their nominators slashed with no repercussions to themselves. Note that the bonding duration is defined in eras, not directly by slots. |

### Treasury

| Treasury               | Time   | Slots  | Description                                                  |
| ---------------------- | ------ | ------ | ------------------------------------------------------------ |
| Periods between spends | 6 days | 86_400 | When the treasury can spend again after spending previously. |

Burn percentage is currently `0.20%`, though instead of being burned this amount is temporarily
redirected into the [Society](../../maintain/kusama/maintain-guides-society-kusama.md)'s treasury to
fund growth.

### Precision

KSM have 12 decimals of precision. In other words, 1e12 (1_000_000_000_000, or one trillion) Plancks
make up a single KSM.
