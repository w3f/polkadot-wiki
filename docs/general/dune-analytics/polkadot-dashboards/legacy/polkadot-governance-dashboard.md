---
id: polkadot-governance-dashboard
title: Polkadot Governance Dashboard
sidebar_label: Governance Dashboard
description: Polkadot Governance Dashboard descriptions
keywords: [polkadot, governance, dashboard, dune]
slug: ../polkadot-governance-dashboard
---

# Polkadot Governance Dashboard

## View On Dune: [Polkadot Governance Dashboard](https://dune.com/substrate/polkadot-gov)

The **Polkadot Governance Dashboard** provides a clear and concise representation of the
[network's governance](https://wiki.polkadot.network/docs/en/learn-governance) activities. It serves
as a useful tool for community members to observe
[treasury management](https://wiki.polkadot.network/docs/en/learn-treasury),
[referendum outcomes](https://wiki.polkadot.network/docs/en/learn-governance#referenda), and voting
patterns. This dashboard aims to enhance community engagement by simplifying access to governance
information and fostering a transparent decision-making environment.

Authored by _Stanley_, _Jerry_, and _William_ [**@ colorfulnotion**](https://x.com/colorfulnotion)

### Polkadot Treasury Flow

The **Polkadot Treasury Flow** chart visualizes the monthly financial movements within the Polkadot
treasury, delineating inflows from inflation and outflows from proposals, bounties, and burnt funds,
to present a clear picture of the treasury's net flow. For more details, see the
[Polkadot Treasury](https://wiki.polkadot.network/docs/learn-treasury) section on the Polkadot Wiki.

- **Treasury Netflow**: Treasury Inflows - Treasury Outflows
- **Treasury Inflows**: Inflation + Fees + Txn Tips + Slash
- **Treasury Outflows**: Opengov Proposals(Spender + Tipper Track) + Bounties + Burnt

<iframe src="https://dune.com/embeds/3386769/5684359/" height="350" width="100%"></iframe>

### Number of Votes by Duration of Lock

The **Number of Votes by Duration of Lock** chart visualizes Polkadot governance voting commitments,
categorizing votes by token lock duration to reflect conviction levels. It highlights community
engagement from short-term to long-term network commitments, showcasing voter participation strength
and stability. For more on voting and locking, see
[Voluntary Locking](https://wiki.polkadot.network/docs/learn-governance#voluntary-locking) and
[Adaptive Quorum Biasing](https://wiki.polkadot.network/docs/learn-governance#adaptive-quorum-biasing)
on Polkadot Wiki.

<iframe src="https://dune.com/embeds/3393628/5694824/" height="350" width="100%"></iframe>

### Number of Monthly Voters / Monthly Capital by Type / Monthly Voting Power by Type

These charts offer insights into monthly Polkadot governance engagement, tracking participant
numbers, represented capital, and voting conviction. They highlight the community's dynamic
involvement in network direction. For governance details, visit
[Polkadot Governance](https://wiki.polkadot.network/docs/learn-governance) and
[Introduction to Polkadot OpenGov](https://wiki.polkadot.network/docs/learn-governance#introduction-to-polkadot-opengov).

<iframe src="https://dune.com/embeds/3393704/5695078/" height="350" width="100%"></iframe>
<iframe src="https://dune.com/embeds/3393704/5695222/" height="350" width="100%"></iframe>
<iframe src="https://dune.com/embeds/3393704/5695499/" height="350" width="100%"></iframe>

### Conviction Voting Power: tokens \* conviction_multiplier

### Current Lock Durations

- **None(0.1x)** - No lock
- **Locked1x** - 7 Days
- **Locked2x** - 14 Days
- **Locked3x** - 28 Days
- **Locked4x** - 56 Days
- **Locked5x** - 112 Days
- **Locked6x** - 224 Days

### Polkadot Number of Referenda by Outcome (OpenGov)

The **Polkadot Number of Referenda by Outcome (OpenGov)** chart provides a categorical breakdown of
referenda results within the Polkadot ecosystem, categorized into `Confirmed`, `Rejected`,
`Timed Out`, and `Cancelled`. The data is curated to reflect the outcomes of governance decisions up
to a specified date.

<iframe src="https://dune.com/embeds/3352377/5619239/" height="350" width="100%"></iframe>

### Polkadot Number of Referenda by Origin

The **Polkadot Number of Referenda by Origin** chart delineates the sources of governance proposals
within the Polkadot network. It quantifies the initiatives by their points of inception, offering a
clear distribution of referenda across different origins. In the context of Polkadot, **Origin**
refers to the track through which the proposal has been introduced. This can include
[public proposals](https://wiki.polkadot.network/docs/learn-governance#public-referenda) submitted
by the token holders,
[council motions](https://wiki.polkadot.network/docs/learn-governance#council-referenda), or
[treasury proposals](https://wiki.polkadot.network/docs/learn-treasury#bounties-spending). Each
track has its own procedural requirements and reflects a different aspect of the network’s
governance model.

<iframe src="https://dune.com/embeds/3415581/5734690/" height="350" width="100%"></iframe>

### Monthly Tokens Voted by Direction / Monthly Voting Power by Direction

The **Monthly Tokens Voted by Direction** and **Monthly Voting Power by Direction** charts provide a
dynamic view of the Polkadot community's
[voting behavior](https://wiki.polkadot.network/docs/maintain-guides-democracy#voting-on-a-proposal)
over time, breaking down the distribution of tokens and voting power across various voting options.
These charts reveal the community's sentiment trends, showcasing the balance between support
('Aye'), opposition ('Nay'), and nuanced positions ('Split' and 'SplitAbstain'), both in terms of
token quantity and the weighted influence of votes. By tracking these metrics, stakeholders can
gauge the evolving priorities and concerns within the Polkadot ecosystem.

### Opengov Vote Types

- **Standard Aye** - Available with 0.1-6x conviction
- **Standard Nay** - Available with 0.1-6x conviction
- **Split** - Allocate votes between (Aye, Nay) with 0.1x conviction
- **splitAbstain**: Allocate votes between (Aye, Nay, Abstain) with 0.1x conviction

<iframe src="https://dune.com/embeds/3394126/5695667/" height="350" width="100%"></iframe>
<iframe src="https://dune.com/embeds/3394126/5695709/" height="350" width="100%"></iframe>

### Recent Major Delegation Changes

The **Recent Major Delegation Changes** chart visualizes significant delegation transactions within
a specified timeframe. It highlights two primary types of delegations: 'First Time', where a
delegator is delegating to a validator for the first time, and 'Switching', where a delegator
changes their delegation from one validator to another

<iframe src="https://dune.com/embeds/3460749/5816431/" height="350" width="100%"></iframe>

### Recent Major Swing Votes

The **Recent Major Swing Votes** chart presents a crucial analysis of voting dynamics within the
Polkadot network, focusing on the instances where voters have changed their stance on specific
referenda. This shift, known as a 'swing vote', is particularly significant when the voter wields a
substantial number of tokens, with the potential to sway the outcome of a referendum. The chart
meticulously records these pivotal moments, detailing the voter's identity, the magnitude of their
tokens, and the direction of their swing—whether towards `Aye`, `Nay`, or `Abstain.

<iframe src="https://dune.com/embeds/3460920/5816752/" height="350" width="100%"></iframe>

### Whale Voters

The **Whale Voters** chart illuminates the participation of prominent token holders in Polkadot's
governance decisions. It showcases the influential votes cast by individuals or entities with
significant token stakes, their voting preferences, and the corresponding voting power. This chart
elucidates the sway of large stakeholders in shaping the outcome of governance referenda,
highlighting the distribution of their voting power in recent decisions.

<iframe src="https://dune.com/embeds/3461952/5818542/" height="350" width="100%"></iframe>

### Awakened Whale Voters

The **Awakened Whale Voters** chart visualizes the activity of influential participants in the
Polkadot governance system, commonly known as "whales". These are voters who have not participated
in the voting process for at least 90 days and have now cast a vote with a significant amount of
tokens. The chart displays their voting behavior, the referenda they are involved in, and their
voting conviction, using interactive elements that link to external references for detailed
blockchain data. This allows for an in-depth look at the re-emergence of major stakeholders in the
decision-making process.

<iframe src="https://dune.com/embeds/3461031/5816940/" height="350" width="100%"></iframe>
