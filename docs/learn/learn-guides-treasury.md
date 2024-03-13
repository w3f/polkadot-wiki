---
id: learn-guides-treasury
title: Polkadot-JS Guides about the Treasury
sidebar_label: Treasury Guides
description: Polkadot-JS Guides about the Polkadot Treasury.
keywords: [opengov, polkadot opengov, referenda, treasury, tipps, polkadot-js]
slug: ../learn-guides-treasury
---

import RPC from "./../../components/RPC-Connection";

See [this page](./learn-polkadot-opengov-treasury.md) to learn about the Polkadot Treasury.

## Creating a Treasury Proposal

Your proposal should address a problem, outline a goal, give a detailed account of how you will
reach that goal, and include any ongoing maintenance needs. As much as possible, you should itemize
the tasks to be completed so fees can be evaluated and milestones can be followed. You can check the
{{ polkadot: [guidelines for a successful proposal](https://docs.google.com/document/d/1IZykdp2cyQavcRyZd_dgNj5DcgxgZR6kAqGdcNARu1w) :polkadot }}{{ kusama:  [guidelines for a successful proposal](https://docs.google.com/document/d/1CzEnurqwqLBOGrJI9CQORiGW9m6QyPOSshhzJdR57Pk)  :kusama }}
and fill out the
{{ polkadot: [Treasury proposal template](https://docs.google.com/document/d/1O_84mXYFERCavmnJyxbIPKFkG0bVBySRjCVy-d-VKcc) :polkadot }}{{ kusama:  Treasury proposal template :kusama }}
provided.

### Announcing the Proposal

To minimize storage on-chain, proposals don't contain contextual information. When a user submits a
proposal, they will need to find an off-chain way to explain the proposal:

- Many community members participate in discussion in the
  {{ polkadot: [Polkadot Watercooler](https://matrix.to/#/#polkadot-watercooler:web3.foundation) and :polkadot }}
  {{ kusama: [Kusama Direction room](https://matrix.to/#/#Kusama-Direction:parity.io) and the :kusama }}
  {{ polkadot: [Polkadot Direction room](https://matrix.to/#/#Polkadot-Direction:parity.io). :polkadot }}
  {{ kusama: [Kusama Watercooler](https://matrix.to/#/#kusamawatercooler:polkadot.builders). :kusama }}
- Use platforms like [Polkassembly](https://polkassembly.io) and
  [SubSquare](https://www.subsquare.io/) to initiate discussion with the community. They also offer
  a gauge poll to capture the community sentiment before submitting an on-chain referendum.

Spreading the word about the proposal's explanation to the community is ultimately up to the
proposer.

:::tip Use Accounts with Verified On-Chain Identity for Treasury Proposals

To ensure legitimacy, it is required that the account linked to the Treasury proposal has an
[identity set](https://support.polkadot.network/support/solutions/articles/65000181981-how-to-set-and-clear-an-identity)
and is
[verified by an on-chain registrar](https://support.polkadot.network/support/solutions/articles/65000181990-how-to-request-and-cancel-identity-judgement).

:::

### Submit Treasury Proposal Preimage

The example below shows how to create a [preimage](../general/glossary#preimage) for a transaction
that requests 100 DOT from Treasury.

- Navigate to [Polkadot-JS UI > Governance > Preimages](https://polkadot.js.org/apps/#/preimages)
  and then click on Add Preimage.
- Select the account which will be used to submit the preimage.
- Choose `treasury` pallet in the "propose" dropdown and the `spend(amount, beneficiary)`call
- Enter the DOT amount.
- Enter the AccountID of the beneficiary (which has a verified on-chain identity).
- Submit preimage
- Sign and submit the transaction by paying the specified transaction fees.

:::info Preimage Submission Deposit

A deposit is required for the preimage to be stored on chain. The preimage deposit is proportional
to the amount of information stored within the preimage. The deposit amount required for a preimage
with a treasury spend transaction is around
{{ polkadot: 41 DOT :polkadot }}{{ kusama:  1.4 KSM  :kusama }}. Ensure you have enough account
balance to pay for the submission deposit and the transaction fees.

:::

![Treasury Preimage](../assets/treasury/treasury-preimage.png)

After successful submission of the preimage, it is displayed on Polkadot-JS UI > Governance >
Preimages page. Every preimage is associated with a unique preimage hash (highlighted in a box in
the image below). Take a note of this preimage hash, which is required to submit a referendum.

![Treasury Preimage Hash](../assets/treasury/treasury-preimage-hash.png)

### Submit a Treasury Track Referendum

The example below shows how to submit a Treasury track referendum.

- Navigate to [Polkadot-JS UI > Governance > Referenda](https://polkadot.js.org/apps/#/referenda)
  and then click on Submit proposal.
- Select the account which will be used to submit the proposal.
- Choose the appropriate submission track (The example below selected Small Spender track).
- Enter the preimage hash of the treasury spend transaction.(If the preimage exists on-chain, the
  preimage length box is automatically populated)
- Click on Submit proposal.
- Sign and submit the transaction.

![Submit Treasury Proposal](../assets/treasury/submit-proposal-treasury.png)

Once your submission is executed, your referendum will appear under your chosen track on the
Polkadot-JS UI [referenda page](https://polkadot.js.org/apps/#/referenda).

### Place a Decision Deposit for the Treasury Track Referendum

For the referendum to move from preparing phase to the deciding phase, a decision deposit needs to
be placed. The decision deposit values for each individual
[Treasury Tracks](./learn-polkadot-opengov-treasury#treasury-tracks) are listed in a section above
in this document.

![Submit Treasury Proposal Decision Deposit](../assets/treasury/treasury-proposal-decision-deposit.png)

The preimage and decision deposits
[can be claimed once the referendum ends](./learn-guides-polkadot-opengov.md#claiming-the-preimage-and-decision-deposits).

## Submit Treasury Proposal via Polkassembly

To submit a treasury track referendum via [Polkassembly](https://polkadot.polkassembly.io/opengov)
click on the FAB button in the bottom right corner. Then,

- Click on "Create Treasury Proposal" and choose an address for the proposer
- After choosing an address, you will enter a three-stage guideline:

  - Write a proposal: you can add a detailed description for the proposal, which will be stored on
    Polkassembly. Alternatively, you can link an existing discussion post.

  ![polkassembly-write-proposal](../assets/polkassembly-write-proposal.png)

  - Create a preimage: an existing preimage can be linked, or a new one can be created. To create a
    preimage, add the beneficiary address and the
    {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} amount. The track will be auto-selected
    and the user can proceed with the creation of a preimage.

  ![polkassembly-create-preimage](../assets/polkassembly-create-preimage.png)

  - Create a proposal: final confirmation about the proposal creation. The description of the
    proposal and the preimage are automatically linked to the proposal.

## Requesting Tips from the Treasury

To request a tip funded by the treasury, you can follow the above steps for
[creating a treasury proposal](#creating-a-treasury-proposal) but instead of submitting the proposal
to the `32 / Small Spender` track, you will need to submit it to the `30 / Small Tipper` or
`31 / Big Tipper` tracks depending on the number of tokens to be requested.

Briefly, you will need to:

- Create a preimage using the `treasury.Spend` extrinsic and specifying the number of tokens and the
  beneficiary of the tip
- Submit a proposal to the right track (i.e. `30` or `31`) using the preimage hash
- Once you started the referendum go to [Polkassembly](https://polkassembly.io/), log in with the
  proposer account and edit the referendum details
- Notify the
  {{ polkadot: [Polkadot Direction Element Channel](https://matrix.to/#/#Polkadot-Direction:parity.io) :polkadot }}{{ kusama: [Kusama Direction Element Channel](https://matrix.to/#/#Polkadot-Direction:parity.io) :kusama }}
  about your referendum
- Place the decision deposit before the
  {{ polkadot: <RPC network="polkadot" path="consts.referenda.undecidingTimeout" defaultValue={201600} filter="blocksToDays"/> :polkadot }}{{ kusama: <RPC network="kusama" path="consts.referenda.undecidingTimeout" defaultValue={201600} filter="blocksToDays"/> :kusama }}-day
  timeout
- Once the referendum ends you can
  [claim the preimage and decision deposits back](./learn-guides-polkadot-opengov.md#claiming-the-preimage-and-decision-deposits)
