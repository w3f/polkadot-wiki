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

- Treasurer
- Big Spender
- Medium Spender
- Small Spender
- Big Tipper
- Small Tipper

:::info How to access Treasury funds?

Access to Treasury funds requires successful enactment of referendum in the respective treasury
track on-chain. Learn how to submit a treasury proposal for referendum
[here](./learn-guides-treasury#creating-a-treasury-proposal).

:::

### Treasurer

This track can be used for treasury spending requests up to
{{ polkadot: 10M DOT :polkadot }}{{ kusama:  333333.33 KSM  :kusama }} per referendum. Each
referendum requires a decision deposit of
{{ polkadot: 1000 DOT :polkadot }}{{ kusama:  33.33 KSM  :kusama }}.

### Big Spender

This track can be used for treasury spending requests up to
{{ polkadot: 1M DOT :polkadot }}{{ kusama:  33333.33 KSM  :kusama }} per referendum. Each referendum
requires a decision deposit of {{ polkadot: 400 DOT :polkadot }}{{ kusama:  13.33 KSM  :kusama }}.

### Medium Spender

This track can be used for treasury spending requests up to
{{ polkadot: 100K DOT :polkadot }}{{ kusama:  3333.33 KSM  :kusama }} per referendum. Each
referendum requires a decision deposit of
{{ polkadot: 200 DOT :polkadot }}{{ kusama:  6.66 KSM  :kusama }}.

### Small Spender

This track can be used for treasury spending requests up to
{{ polkadot: 10K DOT :polkadot }}{{ kusama:  333.33 KSM  :kusama }} per referendum. Each referendum
requires a decision deposit of {{ polkadot: 100 DOT :polkadot }}{{ kusama:  3.33 KSM  :kusama }}.

### Big Tipper

This track can be used for treasury spending requests up to
{{ polkadot: 1000 DOT :polkadot }}{{ kusama:  33.33 KSM  :kusama }} per referendum. Each referendum
requires a decision deposit of {{ polkadot: 10 DOT :polkadot }}{{ kusama:  0.33 KSM  :kusama }}.

### Small Tipper

This track can be used for treasury spending requests up to
{{ polkadot: 100 DOT :polkadot }}{{ kusama:  8.25 KSM  :kusama }} per referendum. Each referendum
requires a decision deposit of {{ polkadot: 1 DOT :polkadot }}{{ kusama:  0.033 KSM  :kusama }}.

## Bounties

:::info Bounty Guides

See the [bounty guides](./learn-guides-bounties.md) to learn about how to
[create a bounty](./learn-guides-bounties.md#submit-a-bounty-proposal),
[assign a curator](./learn-guides-bounties.md#assign-a-curator-to-a-bounty) to a bounty, as well as
[creating and awarding child bounties](./learn-guides-bounties.md#create-and-award-child-bounties)
and [claiming child bounties rewards](./learn-guides-bounties.md#claim-a-child-bounty-reward).

:::

### Parent Bounties

Getting treasury funding through OpenGov, depending on which treasury track you submit your
referendum, can be a long and uncertain process. This can be unideal for example for events'
organizers needing to pay costs upfront or close to the event's date. Bounties solve this problem by
allowing the access to treasury funds once to fund multiple events later on through
[child bounties](#child-bounties) (that is why bounties are also called _parent_ bounties).

Parent bounty proposals aim to access treasury funds once to fund multiple smaller proposals later
on without creating OpenGov referenda for each one of them. Bounties are manged by curators, where
usually a curator is a [multi-signature account](./learn-account-multisig.md). Bounties can get
access to a large amount of funds and therefore it is good practice to mange those funds with a
multisig to enhance security. Essentially, curators are multisig addresses with agency over a
portion of the treasury with the goal of promoting events, fixing a bug or vulnerability, developing
a strategy, or monitoring a set of tasks related to a specific topic: all for the benefit of the
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} ecosystem.

A proposer can [submit a bounty proposal](./learn-guides-bounties.md#submit-a-bounty-proposal) to
OpenGov,
[with a curator to be defined later](./learn-guides-bounties.md#assign-a-curator-to-a-bounty), whose
background and expertise is such that they are capable of determining when the task is complete.
Curators are selected through OpenGov referendum after the bounty proposal passes, and need to add
an upfront payment to take the position. This deposit can be used to punish them if they act
maliciously. However, if they are successful in their task of getting someone to complete the bounty
work, they will receive their deposit back and part of the bounty reward as fee payment for their
job.

When submitting the value of the bounty, the proposer includes a fee paid to curators willing to
invest their time and expertise in the task: this amount is included in the total value of the
bounty. In this sense, the curator's fee can be defined as the result of subtracting the value paid
to the bounty rewardee from the total value of the bounty.

Curators are expected to have a well-balanced track record related to the issues the bounty tries to
resolve: they should be at least knowledgeable on the topics the bounty touches, and show project
management skills or experience. These recommendations ensure an effective use of the mechanism. A
Bounty Spending is a reward for a specified body of work - or specified set of objectives - that
needs to be executed for a predefined treasury amount to be paid out. The responsibility of
assigning a payout address once the specified set of objectives is completed is delegated to the
curator.

The bounty has a predetermined duration of
{{ polkadot: <RPC network="polkadot" path="consts.bounties.bountyUpdatePeriod" defaultValue={1296000} filter="blocksToDays"/> :polkadot }}{{ kusama: <RPC network="kusama" path="consts.bounties.bountyUpdatePeriod" defaultValue={1296000} filter="blocksToDays"/> :kusama }}
days with the possibility of being extended by the curator. Aiming to maintain flexibility on the
tasks’ curation, the curator will be able to create child bounties for more granularity and
allocation in the next iteration of the mechanism.

### Child Bounties
