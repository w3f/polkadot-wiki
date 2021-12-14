---
id: doc-thousand-validators
title: Thousand Validators Programme
sidebar_label: Thousand Validators Programme
description: Learn about the Thousand Validators Programme and how it can support your validator endeavors.
slug: ../thousand-validators
---

The Thousand Validators Programme is an initiative by Web3 Foundation and Parity Technologies to use
the funds held by both organizations to nominate validators in the community.

It serves two major purposes: 1) to give validators a structured on-ramp to join the active set of
validators on Kusama and Polkadot and 2) to further decentralize the validator active set.

## How it Works

The nominating backend will routinely change its nominations at every era (or every 4 eras on
Kusama). It will nominate validators which fit all the requirements and are eligible. Of this pool,
it will nominate as many as possible although some validators which are eligible might not receive
nominations every round (due to the constraint of nominating a maximum of 16 validators per
nominator). If a validator is active during a single nomination period (the time after a new
nomination and before the next one) and does not break any of the requirements, it will have its
rank increased by 1. Validators with higher rank have performed well within the programme for a
longer period of time.

## Setting up a Validator

Please see the wiki page for [setting up a validator](../maintain/maintain-guides-how-to-validate-polkadot.md)
as well as additional information on [securing a validator](../maintain/maintain-guides-secure-validator.md).

## How to Apply

### Kusama

In order to apply to the Kusama programme, set up your node to adhere to the requirements below and
fill in the [application form][kusama 1kv form]. You will hear back from the team shortly.

#### Requirements

- Verified identity (see [here][identity instructions] for instructions)
- Connect to dedicated telemetry (use
  `--telemetry-url 'wss://telemetry-backend.w3f.community/submit 1'` when starting the node)
- Minimum of 50 KSM self-stake
- No more than 10% commission
- Separate controller and stash (or have a Staking proxy set up)
- Must be on the latest release
- Max two nodes (under same sub/super identity)

#### Leaderboard

The leaderboard is available at https://thousand-validators.kusama.network/#/leaderboard.

#### Nominators

The below addresses are the stash / controller pairs for the nominators involved in the Kusama
Thousand Validators programme. They are formatted like "`stash` / `controller`".

- `G1rrUNQSk7CjjEmLSGcpNu72tVtyzbWdUvgmSer9eBitXWf` / `H9BFvNPTqDEmWZ63M82ohrFmvEFASm25ErUMzmXDrbAr1kq`
- `HgTtJusFEn2gmMmB5wmJDnMRXKD6dzqCpNR7a99kkQ7BNvX` / `H4UgNEEN92YXz96AyQgwkJQSpXGdptYLkj9jXVKrNXjQHRJ`
- `EX9uchmfeSqKTM7cMMg8DkH49XV8i4R7a7rqCn8btpZBHDP` / `H54GA3nq3xeNrdbHkepAufSPMjaCxxkmfej4PosqD84bY3V`

A time delay proxy is used as the interaction method for some of these accounts.

Since approximately early January 2021, the nominators will select an automatic number of validators
to nominate based on the lowest amount staked for a validator and the amount of funds it holds. This
can be anywhere from a few validators receiving nomination from a single nominator to the max of 16.

### Polkadot

> NOTE: Entrance to the Polkadot programme requires a rank of 25 or higher in the Kusama programme.
> This usually takes about a month.

In order to apply to the Polkadot programme, set up your node to adhere to the requirements below
and fill in the [application form][polkadot 1kv form]. You will hear back from the team shortly.

#### Requirements

- Verified identity (see [here][identity instructions] for instructions)
- Connect to dedicated Telemetry (use
  `--telemetry-url 'wss://telemetry-backend.w3f.community/submit 1'` when starting the node)
- Rank 25 or higher on Kusama Thousand Validators Programme
- Minimum of 5_000 DOTs self stake (exceptions by approval for good intentions)
- Reward destination 'Staked'
- No more than 3% commission
- Separate stash and controller (or have a Staking proxy set up)
- Must be on the latest release

#### Nominators

The below addresses are the stash / controller pairs for the nominators involved in the Polkadot
Thousand Validators programme. They are formatted like "`stash` / `controller`".

- `14Ns6kKbCoka3MS4Hn6b7oRw9fFejG8RH5rq5j63cWUfpPDJ` / `16XJHQ58dEPnZn5J5YqmRcJmKtvVFFMoMrXgj6fWJfeGGkQw`
- `12RYJb5gG4hfoWPK3owEYtmWoko8G6zwYpvDYTyXFVSfJr8Y` / `13GLXK1TZKKDM9aRBBK3VYZymHjKChtQjJznsRqaR9dwwrQU`
- `16GMHo9HZv8CcJy4WLoMaU9qusgzx2wxKDLbXStEBvt5274B` / `16eM1npMwKzpGy48NDna1jC6P71S783wjpbdeKT8RgzQx8Jd`

A time delay proxy is used as the main interaction method for all of these accounts.

Since approximately early January 2021, the nominators will select an automatic number of validators
to nominate based on the lowest amount staked for a validator and the amount of funds it holds. This
can be anywhere from a few validators receiving nominations from a single nominator to the max
of 16.

[kusama 1kv form]: https://forms.gle/xqYLoceTwg1qvc9i6
[polkadot 1kv form]: https://docs.google.com/forms/d/e/1FAIpQLSdS-alI-J2wgIRCQVjQC7ZbFiTnf36hYBdmO-1ARMjKbC7H9w/viewform
[identity instructions]: ../learn/mirror-learn-identity.md#setting-an-identity
