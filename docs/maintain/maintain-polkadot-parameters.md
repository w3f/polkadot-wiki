---
id: maintain-polkadot-parameters
title: Polkadot Parameters
sidebar_label: Parameters
description: A description about fundamental Polkadot parameters.
keywords: [parameters, actions, attributes, behaviors]
slug: ../maintain-polkadot-parameters
---
import RPC from "./../../components/RPC-Connection"

Many of these parameter values can be updated via on-chain governance. If you require absolute
certainty of these parameter values, it is recommended you directly check the constants by looking
at the [chain state](https://polkadot.js.org/apps/#/chainstate/constants) and/or
[storage](https://polkadot.js.org/apps/#/chainstate).

### Periods of common actions and attributes

_NOTE: Polkadot generally runs at &frac14;th the speed of Kusama, except in the time slot duration
itself. See [Kusama Parameters](https://guide.kusama.network/docs/kusama-parameters/) for more details on how Polkadot's parameters
differ from Kusama's._

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

\*_A maximum of one block per slot can be in a canonical chain. Occasionally, a slot will be without
a block in the chain. Thus, the times given are *estimates*. See [Consensus](../learn/learn-consensus.md) for
more details._

### Accounts, Identity and Crowdloans

- The [Existential Deposit](../learn/learn-accounts.md#existential-deposit-and-reaping) is 
<RPC network="polkadot" path="consts.balances.existentialDeposit" defaultValue={10000000000} filter="humanReadable"/>
- The deposit required to set an Identity is 
<RPC network="polkadot" path="consts.identity.basicDeposit" defaultValue={202580000000} filter="humanReadable"/>
- The minimum contribution required to participate in a crowdloan is 
<RPC network="polkadot" path="consts.crowdloan.minContribution" defaultValue={50000000000} filter="humanReadable"/>


### Governance

| Democracy        | Time    | Slots   | Description                                                                                                                                                   |
| ---------------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Voting period    | 28 days | 403_200 | How long the public can vote on a referendum.                                                                                                                 |
| Launch period    | 28 days | 403_200 | How long the public can select which proposal to hold a referendum on, i.e., every week, the highest-weighted proposal will be selected to have a referendum. |
| Enactment period | 28 days | 403_200 | Time it takes for a successful referendum to be implemented on the network.                                                                                   |

| Council       | Time   | Slots   | Description                                                          |
| ------------- | ------ | ------- | -------------------------------------------------------------------- |
| Term duration | 7 days | 100_800 | The length of a council member's term until the next election round. |
| Voting period | 7 days | 100_800 | The council's voting period for motions.                             |

The Polkadot Council consists of up to 13 members and up to 20 runners up.

| Technical committee     | Time    | Slots   | Description                                                                                    |
| ----------------------- | ------- | ------- | ---------------------------------------------------------------------------------------------- |
| Cool-off period         | 7 days  | 100_800 | The time a veto from the technical committee lasts before the proposal can be submitted again. |
| Emergency voting period | 3 hours | 1_800   | The voting period after the technical committee expedites voting.                              |

### Staking, Validating, and Nominating

Maximum number of Validators that can be nominated by a nominator - {{ polkadot_max_nominations }}

| Polkadot             | Time    | Slots   | Description                                                                                                                                                                                         |
| -------------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Term duration        | 1 Day   | 14_400  | The time for which a validator is in the set after being elected. Note, this duration can be shortened in the case that a validator misbehaves.                                                     |
| Nomination period    | 1 Day   | 14_400  | How often a new validator set is elected according to Phragmén's method.                                                                                                                            |
| Bonding duration     | 28 days | 403_200 | How long until your funds will be transferrable after unbonding. Note that the bonding duration is defined in eras, not directly by slots.                                                          |
| Slash defer duration | 28 days | 403_200 | Prevents overslashing and validators "escaping" and getting their nominators slashed with no repercussions to themselves. Note that the bonding duration is defined in eras, not directly by slots. |

### Parachains

| Crowdloans and Auctions  | Time    | Slots   | Description                                                                      |
| ------------------------ | ------  | ------- | -------------------------------------------------------------------------------- |
| Auction duration         | 7 days  | 100_800 | The total duration of the slot auction, subject to the candle auction mechanism. |
| Opening period           | 2 days  | 28_800  | The opening period of the slot auction.                                          |
| Ending period            | 5 days  | 72_000  | The ending period of the slot auction.                                           |

| Parachain Slot           | Time     | Slots         | Description                                                                              |
| ------------------------ | -------- | ------------- | ---------------------------------------------------------------------------------------- |
| Lease period             | 12 weeks | 1_209_600     | The length of one lease period in a parachain slot.                                     |
| Total slot duration      | 2 years  | 10_512_000    | The maximum duration a parachain can lease by winning a slot auction (8 lease periods). |

### Treasury

| Treasury               | Time    | Slots   | Description                                                  |
| ---------------------- | ------- | ------- | ------------------------------------------------------------ |
| Periods between spends | 24 days | 345_600 | When the treasury can spend again after spending previously. |

Burn percentage is currently `1.00%`.

### Precision

DOT have 10 decimals of precision. In other words, 10 \*\* 10 (10_000_000_000 or ten billion)
Plancks make up a DOT.

The denomination of DOT was changed from 12 decimals of precision at block #1\_248\_328 in an event
known as *Denomination Day*. See [Redenomination](../general/redenomination.md) for details.
