---
id: learn-guides-bounties
title: How-to Guides for Bounties
sidebar_label: Bounties
description: Advanced How-to Guides for Bounties
keyword: [treasury, bounties, guides, child bounty]
slug: ../learn-guides-bounties
---

import RPC from "./../../components/RPC-Connection";

For these guides, you will use the [Polkadot-JS UI](https://polkadot.js.org/apps/#/explorer).

:::info Notify the Polkadot Direction Channel

Remember always to notify the
[Polkadot Direction Element Channel](https://matrix.to/#/#Polkadot-Direction:parity.io) about
[OpenGov referenda](./learn-polkadot-opengov.md#referenda) so that the community can start reviewing
them and voting on them.

:::

## Submit a Bounty Proposal

See the video tutorial below to learn how you can create a bounty and submit it for approval through
an OpenGov referendum.

[![Submit a Bounty](https://img.youtube.com/vi/8Cft1-8RWmk/0.jpg)](https://www.youtube.com/watch?v=8Cft1-8RWmk)

When you add a bounty, this will show as "proposed" in the main
[Bounties page](https://polkadot.js.org/apps/#/bounties). Once the community approves your bounty
proposal as an OpenGov referendum, the bounty will show as "funded" at the end of the
[spending period](../general/glossary.md#spend-period) on the main
[Bounties page](https://polkadot.js.org/apps/#/bounties). You can then proceed with assigning
curators to the bounty.

To minimize storage on chain in the same way as any proposal, bounties don't contain contextual
information. When a user submits a bounty spending proposal, they will need to find an off-chain
medium to explain the proposal, for example a bounty proposal document on
[Polkassembly](https://polkadot.polkassembly.io/opengov) or
[Subsquare](https://polkadot.subsquare.io/).
[This template](https://docs.google.com/document/d/1-IBz_owspV5OcvezWXpksWDQReWowschD0TFuaVKKcU/edit?usp=sharing)
can be used to submit all the information needed by OpenGov voters to make an informed decision.

Submitting a bounty proposal will reserve
{{ polkadot: <RPC network="polkadot" path="consts.bounties.bountyDepositBase" defaultValue={10000000000} filter="humanReadable"/> :polkadot }}{{ kusama: <RPC network="kusama" path="consts.bounties.bountyDepositBase" defaultValue={33333333300} filter="humanReadable"/> :kusama }}.

## Assign a Curator to a Bounty

Once your bounty is shown as "funded" on the main
[Bounties page](https://polkadot.js.org/apps/#/bounties), you can propose a bounty curator. See the
video tutorial below to learn how you can add a curator to a bounty and submit it for approval
through an OpenGov referendum.

[![Assign Curator to a Bounty](https://img.youtube.com/vi/TM7vk3oP9IA/0.jpg)](https://www.youtube.com/watch?v=TM7vk3oP9IA)

Once your OpenGov referendum has been approved by the community and served the required
[spending period](../general/glossary.md#spend-period), the bounty will still show as "funded" on
the main [Bounties page](https://polkadot.js.org/apps/#/bounties) and await the curator's
acceptance. The curator must formally accept the curator role by signing a `bounties.acceptCurator`
extrinsic. More information about when to do this can be found on the main
[Bounties page](https://polkadot.js.org/apps/#/bounties). Only after the curators claim their
candidacy the bounty will show as "active" on the main Bounty page.

## Create and Award Child Bounties

:::info Remember to add contextual information about child bounties

When you add child bounties, please add contextual information on the governance forums
[Polkassembly](https://polkassembly.io/) or [Subsquare](https://polkadot.subsquare.io/).

:::

See the video tutorial below to learn how to create a child bounty, assign a curator, and award a
child bounty.

The video will show how to create and award a child bounty using a batch call. We will also include
proposing and approving curator candidacy for the child bounty. The calls can be executed
separately, depending on the process curators consider appropriate for their bounty.

[![Create and Award Child Bounties](https://img.youtube.com/vi/mLpvx0OQoyM/0.jpg)](https://www.youtube.com/watch?v=mLpvx0OQoyM)

Note that once a child bounty is awarded, awardees need to wait for the
{{ polkadot: 8 :polkadot }}{{ kusama: 4 :kusama }}-day delay to be complete before claiming the
child bounty.

## Claim a Child Bounty Reward

The status of child bounties can be viewed on the
[Polkassembly Bounty page](https://polkadot.polkassembly.io/bounties) under the specific parent
bounty. A child bounty status can be "Added", "Awarded", or "Claimed". For example, the parent
bounty 17 refers to the Community Events Bounty, which has 183 child bounties.

![polkassembly-child-bounties](../assets/polkassembly-child-bounties.png)

After a child bounty has been awarded and the
{{ polkadot: <RPC network="polkadot" path="consts.bounties.bountyDepositPayoutDelay" defaultValue={115200} filter="blocksToDays"/> :polkadot }}{{ kusama: <RPC network="kusama" path="consts.bounties.bountyDepositPayoutDelay" defaultValue={57600} filter="blocksToDays"/> :kusama }}-day
delay elapsed, follow the guidelines in the video tutorial below to learn how to claim a child
bounty reward. Note that the extrinsic to claim the child bounty reward is permissionless, and
anyone can initiate the claim on behalf of the beneficiary.

[![Claim Child Bounty Reward](https://img.youtube.com/vi/db82aHgy23c/0.jpg)](https://www.youtube.com/watch?v=db82aHgy23c)
