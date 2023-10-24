---
id: learn-polkadot-opengov-treasury
title: Treasury
sidebar_label: Treasury
description: Polkadot's On-chain Treasury.
keywords: [treasury, funds, funding, tips, tipping]
slug: ../learn-polkadot-opengov-treasury
---

import RPC from "./../../components/RPC-Connection";

The Treasury is a pot of funds collected through a portion of block production rewards, transaction
fees, slashing, and [staking inefficiencies](./learn-inflation.md).Treasury funds are held in a
[system account](./learn-account-advanced.md#system-accounts) that cannot be controlled by any
external account; only the system internal logic can access it.

:::tip Creating a Treasury Proposal on Polkadot OpenGov

If you would like to create a treasury proposal on Polkadot OpenGov, follow the instructions
outlined on [this how-to guide](./learn-guides-treasury#creating-a-treasury-proposal).

:::

## Treasury Inflow and Outflow

Tokens that are deposited into the Treasury (i.e. the inflow) is determined by the following
mechanisms:

- **Transaction fees:** 80% of the transaction fees of every submitted extrinsic is diverted to the
  Treasury, while 20% is given to the block producers.
- **Staking inefficiencies:** the network knows an exogenously determined parameter called ideal
  staking rate. The APY for stakers (nominators & validators) decreases whenever the actual staking
  rate is not equal to the ideal staking rate. To keep inflation constant at 10%, the system does
  not creates less tokens, rather some share of the overall reward for stakers is diverted to the
  Treasury (more information
  [here](https://research.web3.foundation/Polkadot/overview/token-economics)).
- **Slashes:** whenever validators and nominators are slashed, a share of the slashed tokens are
  diverted to Treasury. They are typically rare and unpredictable events.
- **Transfers:** everyone can send funds to the Treasury directly. This is a rare event and
  typically due to grantees reimbursing some of the amount they got allocated for various reasons.

The outflow is determined by the following mechanisms:

- **Burned tokens:** at the end of each spend period
  {{ polkadot: <RPC network="polkadot" path="consts.treasury.burn" defaultValue={10000} filter="permillToPercent"/> :polkadot }}{{ kusama: <RPC network="kusama" path="consts.treasury.burn" defaultValue={2000} filter="permillToPercent"/> :kusama }}%
  of the available funds are burned.
- **Treasury proposals & Bounties:** they make up the largest share of outflow tokens to the
  community and need to be approved by governance. Then, payouts occur at the end of a
  [spend period](../general/glossary.md#spend-period).
- **Tips:** smaller payouts directly to grantees that can happen within a
  [spend period](../general/glossary.md#spend-period).

:::info Spend Period Schedule

On Polkadot-JS UI, navigate to Governance > Treasury to view the status of current
[spend period](../general/glossary.md#spend-period).

![preimage-whitelist](../assets/treasury/treasury-spend-period.png)

:::

## Treasury Tracks

OpenGov allows for managing funds through six tracks, each with its own
[origin and track parameters](../maintain/maintain-guides-polkadot-opengov.md#origins-and-tracks-info).

- [Treasurer](./learn-polkadot-opengov-origins.md#treasurer)
- [Big Spender](./learn-polkadot-opengov-origins.md#big-spender)
- [Medium Spender](./learn-polkadot-opengov-origins.md#medium-spender)
- [Small Spender](./learn-polkadot-opengov-origins.md#small-spender)
- [Big Tipper](./learn-polkadot-opengov-origins.md#big-tipper)
- [Small Tipper](./learn-polkadot-opengov-origins.md#small-tipper)

:::info How to access Treasury funds?

Access to Treasury funds requires successful enactment of referendum in the respective treasury
track on-chain. Learn how to submit a treasury proposal for referendum
[here](./learn-guides-treasury#creating-a-treasury-proposal).

:::
