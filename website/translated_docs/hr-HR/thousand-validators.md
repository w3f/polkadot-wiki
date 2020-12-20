---
id: thousand-validators
title: Thousand Validators Programme
sidebar_label: Thousand Validators Programme
---

The Thousand Validators Programme is an initiative by Web3 Foundation and Parity Technologies to use the funds held by both organizations to nominate validators in the community.

It serves two major purposes: 1) to give validators a structured on-ramp to join the active set of validators on Kusama and Polkadot and 2) to further decentralize the validator active set.

## How it Works

The nominating backend will routinely change its nominations at every era (or every 4 eras on Kusama). It will nominate validators which fit all the requirements and are eligbile. Of this pool, it will nominate as many as possible although some validators which are eligible might not receive nominations every round (due to the constraint of nominating a maximum of 16 validators per nominator). If a validator is active during a single nomination period (the time after a new nomination and before the next one) and does not break any of the requirements, it will have its rank increased by 1. Validators with higher rank have performed well within the programme for a longer period of time.

## Setting up a Validator

Please see the wiki page for [setting up a validator](maintain-guides-how-to-validate-polkadot.md) as well as additional information on [making your validator secure](maintain-guides-secure-validator.md).

## How to Apply

### Kusama

In order to apply to the Kusama programme, set up your node to adhere to the requirements below and fill in the [application form][kusama 1kv form]. You will hear back from the team shortly.

#### Requirements

- Verified identity (see [here]() for instructions)
- Connect to dedicated telemetry (use `--telemetry-url 'wss://telemetry-backend.w3f.community/submit 1'` when starting the node)
- Minimum of 50 KSM self-stake
- No more than 10% commission
- Separate controller and stash (or have a Staking proxy set up)
- Must be on latest release
- Max two nodes (under same sub/super identity)

#### Leaderboard

The leaderboard is available at https://thousand-validators.kusama.network/#/leaderboard.

### Polkadot

> Note: Entrance to the Polkadot programme requires a rank of 25 or higher in the Kusama programme. This usually takes about a month.

In order to apply to the Polkadot programme, set up your node to adhere to the requirements below and fill in the [application form](). You will hear back from the team shortly.

#### Requirements

- Verified identity (see [here]() for instructions)
- Connect to dedicated Telemetry (use `--telemetry-url 'wss://telemetry-backend.w3f.community/submit 1'` when starting the node)
- Rank 25 or higher on Kusama Thousand Validators Programme
- Mininmum of 10K DOTs self stake (exceptions by approval for good intentions)
- Reward destination 'Staked'
- No more than 3% commission
- Separate stash and controller (or have a Staking proxy set up)
- Must be on latest release
  https://docs.google.com/forms/d/e/1FAIpQLSdS-alI-J2wgIRCQVjQC7ZbFiTnf36hYBdmO-1ARMjKbC7H9w/viewform https://guide.kusama.network/docs/en/mirror-learn-identity#setting-an-identity

[kusama 1kv form]: https://forms.gle/xqYLoceTwg1qvc9i6
