---
id: kusama-parameters
title: Kusama Parameters
sidebar_label: Parameters
---

Many of these parameter values can be updated via on-chain governance. If you require absolute certainty as to their values, it is recommended you directly check the constants by looking at the [chain state](https://polkadot.js.org/apps/#/chainstate/constants) and/or [storage](https://polkadot.js.org/apps/#/chainstate).

### Periods of common actions and attributes

_NOTE: Kusama generally runs 4x as fast as Polkadot, except Polkadot also has 6 second slots. See [Polkadot Parameters](https://wiki.polkadot.network/docs/en/maintain-polkadot-parameters) for more details on how Kusama's parameters differ from Polkadot's._

- Slot: 6 seconds \*(generally one block per slot, although see note below)
- Epoch: 1 hour (600 slots x 6 seconds)
- Session: 1 hour (6 sessions per Era)
- Era: 6 hours (3600 slots x 6 seconds)

| Kusama  | Time      | Slots\* |
| ------- | --------- | --------- |
| Slot    | 6 seconds | 1         |
| Epoch   | 1 hour    | 600       |
| Session | 1 hour    | 600       |
| Era     | 6 hours   | 3,600     |

\*_A maximum of one block per slot can be in a canonical chain. However, occasionally a slot will be without a block in the chain. Thus, the times given are estimates. See [Consensus](learn-consensus) for more details._

### Governance

| Democracy        | Time   | Slots   | Description                                                                                                                                                   |
| ---------------- | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Voting period    | 7 days | 100,800 | How long the public can vote on a referendum.                                                                                                                 |
| Launch period    | 7 days | 100,800 | How long the public can select which proposal to hold a referendum on, i.e., every week, the highest-weighted proposal will be selected to have a referendum. |
| Enactment period | 8 days | 115,200 | Time it takes for a successful referendum to be implemented on the network.                                                                                   |

| Council       | Time  | Slots  | Description                                                          |
| ------------- | ----- | ------ | -------------------------------------------------------------------- |
| Term duration | 1 day | 14,400 | The length of a council member's term until the next election round. |
| Voting period | 1 day | 14,400 | The council's voting period for motions.                             |

The Kusama Council consists of up to 19 members and up to 19 runners up.

| Technical committee     | Time    | Slots   | Description                                                                                    |
| ----------------------- | ------- | ------- | ---------------------------------------------------------------------------------------------- |
| Cool-off period         | 7 days  | 604,800 | The time a veto from the technical committee lasts before the proposal can be submitted again. |
| Emergency voting period | 3 hours | 1,800   | The voting period after the technical committee expedites voting.                              |

### Staking, Validating, and Nominating

| Kusama               | Time    | Slots   | Description                                                                                                                                                                                         |
| -------------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Term duration        | 6 hours | 3,600   | The time for which a validator is in the set after being elected. Note, this duration can be shortened in the case the a validator misbehaves.                                                      |
| Nomination period    | 6 hours | 3,600   | How often a new validator set is [elected](learn-phragmen).                                                                                                                                         |
| Bonding duration     | 7 days  | 604,800 | How long until your funds will be transferrable after unbonding. Note that the bonding duration is defined in eras, not directly by slots.                                                          |
| Slash defer duration | 7 days  | 604,800 | Prevents overslashing and validators "escaping" and getting their nominators slashed with no repercussions to themselves. Note that the bonding duration is defined in eras, not directly by slots. |

### Treasury

| Treasury               | Time   | Slots  | Description                                                  |
| ---------------------- | ------ | ------ | ------------------------------------------------------------ |
| Periods between spends | 6 days | 86,400 | When the treasury can spend again after spending previously. |

Burn percentage is currently `0.20%`, though instead of being burned this amount is temporarily redirected into the [Society](maintain-guides-society-kusama)'s treasury to fund growth.

### Precision

KSM have 12 decimals of precision. In other words, 1e12 (1,000,000,000,000 or one trillion) Plancks make up a single KSM.
