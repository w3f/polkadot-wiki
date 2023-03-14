---
id: learn-proposal
title: Treasury Proposals
sidebar_label: Treasury Proposals
description: Learn how to submit a proposal to the treasury.
keywords: [treasury, proposal, treasury proposals, polkadot-js]
slug: ../learn-proposal
---

## Creating a Treasury Proposal

{{ kusama: :::caution Use OpenGov to submit Treasury Proposals

Legacy Instructions below will be removed when Governance V1 is completely removed from Kusama.
Check the instructions on
[how to submit a proposal through OpenGov](../maintain/maintain-guides-opengov.md#create-a-referenda-proposal-using-polkadot-js-ui).

::: :kusama }}

The proposer has to deposit a minimum of
{{ polkadot: <RPC network="polkadot" path="consts.treasury.proposalBondMinimum" defaultValue={1e12} filter="humanReadable"/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.treasury.proposalBondMinimum" defaultValue={66000000000} filter="humanReadable"/> :kusama }}
or 5% of the requested amount with a maximum cap of
{{ polkadot: <RPC network="polkadot" path="consts.treasury.proposalBondMaximum" defaultValue={5e12} filter="humanReadable"/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.treasury.proposalBondMaximum" defaultValue={3333000000000} filter="humanReadable"/> :kusama }}
as an anti-spam measure. This amount is burned if the proposal is rejected, or refunded otherwise.
These values are subject to [governance](learn-governance.md) so they may change in the future.

Please note that there is no way for a user to revoke a treasury proposal after it has been
submitted. The Council will either accept or reject the proposal, and if the proposal is rejected,
the bonded funds are burned.

### Announcing the Proposal

To minimize storage on chain, proposals don't contain contextual information. When a user submits a
proposal, they will probably need to find an off-chain way to explain the proposal. Most discussion
takes place on the following platforms:

- Many community members participate in discussion in the
  {{ polkadot: [Polkadot Watercooler](https://matrix.to/#/#polkadot-watercooler:web3.foundation) and :polkadot }}
  {{ kusama: [Kusama Direction room](https://matrix.to/#/#kusama:matrix.parity.io) and the :kusama }}
  {{ polkadot: [Polkadot Direction room](https://matrix.to/#/#polkadot-direction:matrix.parity.io). :polkadot }}
  {{ kusama: [Kusama Watercooler](https://matrix.to/#/#kusamawatercooler:polkadot.builders). :kusama }}
- The [Polkassembly](https://polkassembly.io) and [SubSquare](https://www.subsquare.io/) discussion
  platforms automatically read proposals from the chain, turning them into discussion threads and
  allow users to log in with their Web3 address. It also offers a sentiment gauge poll to get a feel
  for a proposal before committing to a vote.

Spreading the word about the proposal's explanation to the community is ultimately up to the
proposer.

### Creating the Proposal

One way to create the proposal is to use the Polkadot-JS Apps
[website](https://polkadot.js.org/apps). From the website, use either the
[extrinsics tab](https://polkadot.js.org/apps/#/extrinsics) and select the Treasury pallet, then
`proposeSpend` and enter the desired amount and recipient, or use the
[Treasury tab](https://polkadot.js.org/apps/#/treasury) and its dedicated Submit Proposal button:

![A proposal being created](../assets/treasury/submit-new.png)

The system will automatically take the required deposit, picking the higher of the two values
mentioned [above](#creating-a-treasury-proposal).

Once created, your proposal will become visible in the Treasury screen and the Council can start
voting on it.

![Pending proposals](../assets/treasury/proposals.png)

Remember that the proposal has no metadata, so it's up to the proposer to create a description and
purpose that the Council could study and base their votes on.

At this point, a Council member can create a motion to accept or to reject the treasury proposal. It
is possible that one motion to accept and another motion to reject are both created. The proportions
to accept and reject Council proposals vary between accept or reject, and possibly depend on which
network the Treasury is implemented.

The threshold for accepting a treasury proposal is at least three-fifths of the Council. On the
other hand, the threshold for rejecting a proposal is at least one-half of the Council.

![Motions in action](../assets/treasury/motion.png)

You will notice the "spend period" at the top of the Treasury UI.

![Proposal Spend Period](../assets/treasury/spend-period.png)
