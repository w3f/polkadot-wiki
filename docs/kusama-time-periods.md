---
id: kusama-time-periods
title: Time Period Cheat Sheet (Kusama)
sidebar_label: Time Periods
---

### Periods of common actions and attributes
*NOTE: Kusama is 4x as fast as Polkadot will be, except for blocktimes where Polkadot will also have 6 second blocktimes.*

- Block: 6 seconds 
- Epoch: 1 hour (600 slots x 6 seconds)
- Session: 1 hour (6 sessions per Era)
- Era: 6 hours (3600 slots x 6 seconds)

| Kusama  | Time      | Slots*  |
|---------|-----------|--------|
| Block   | 6 seconds | 1      |
| Epoch   | 1 hour    | 600    |
| Session | 1 hour    | 600    |
| Era     | 6 hours   | 3,600   |

**A maximum of one block per slot can be in a chain.*

### Governance 

| Democracy               | Time    | Slots   | Description                                                                                                                                                  |
|-------------------------|---------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Voting period           | 7 days  | 604,800 | How long the public can vote on a referendum.                                                                                                                |
| Launch period           | 7 days  | 604,800 | How long the public can select which proposal to hold a referendum on. i.e., Every week, the highest-weighted proposal will be selected to have a referendum |
| Enactment period        | 8 days  | 691,200 | Time it takes for a successful referendum to be implemented on the network. |

| Council       | Time    | Slots | Description                                                          |
|---------------|---------|-------|----------------------------------------------------------------------|
| Term duration | 1 day   | 14,400 | The length of a council member's term until the next election round. |
| Voting period | 1 day   | 14,400 | The council's voting period for motions.                             |

| Technical committee     | Time    | Slots   | Description                                                                                    |
|-------------------------|---------|---------|------------------------------------------------------------------------------------------------|
| Cool-off period         | 7 days  | 604,800 | The time a veto from the technical committee lasts before the proposal can be submitted again. |
| Emergency voting period | 3 hours | 1,800   | The voting period after the technical committee expedites voting.                              |


### Staking, Validating, and Nominating

| Kusama               | Time    | Slots   | Description                                                                                                                                      |
|----------------------|---------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| Term duration        | 6 hours | 3,600   | The time for which a validator is in the set after being elected. Note,  this duration can be shortened in the case that a validator misbehaves. |
| Nomination period    | 6 hours | 3,600   | Every 6 hours, a new validator set is elected according to Phragmen's method.                                                                    |
| Bonding duration     | 7 days  | 604,800 | How long until your funds will be transferrable after unbonding.                                                                                |
| Slash defer duration | 7 days  | 604,800 | Prevents overslashing and validators "escaping" and getting their nominators slashed with no repercussions to themselves                        |

### Treasury
| Treasury               | Time   | Slots   | Description                                                  |
|------------------------|--------|---------|--------------------------------------------------------------|
| Periods between spends | 6 days | 518,400 | When the treasury can spend again after spending previously. |

