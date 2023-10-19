---
id: learn-guides-bounties
title: How-to Guides for Bounties
sidebar_label: Bounties
description: Advanced How-to Guides for Bounties
keyword: [treasury, bounties, guides, child bounty]
slug: ../learn-guides-bounties
---

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

When you add a Bounty, this will show as "proposed" in the main
[Bounties page](https://polkadot.js.org/apps/#/bounties). Once your bounty proposal is approved by
the community as an OpenGov referendum, the bounty will show as "funded" at the end of the
[spending period](../general/glossary.md#spend-period) on the main
[Bounties page](https://polkadot.js.org/apps/#/bounties). You can then proceed with assigning
curators to the bounty.

## Assign a Curator to a Bounty

Once your bounty is shown as "funded" on the main
[Bounties page](https://polkadot.js.org/apps/#/bounties), you can now propose a curator for the
bounty. See the video tutorial below to learn how you can add a curator to a bounty and submit it
for approval through an OpenGov referendum.

[![Assign Curator to a Bounty](https://img.youtube.com/vi/TM7vk3oP9IA/0.jpg)](https://www.youtube.com/watch?v=TM7vk3oP9IA)

Once your OpenGov referendum has been approved by the community and served the required
[spending period](../general/glossary.md#spend-period), the Bounty will show as "active" on the main
Bounties page and await the curator's acceptance. The curator needs to formally accept the curator
role by signing an `bounties.acceptCurator` extrinsic. More information about when to do this can be
found on the main bounties page.

## Create and Award Child Bounties

See the video tutorial below to learn how to create a child bounty, assign a curator, and award a
child bounty.

Note that the video will show how to create and award a child bounty using a batch call. We will
also include proposing and approving curator candidacy for the child bounty. The calls can be
executed separately, depending on the process that curators consider appropriate for their specific
bounty.

[![Create and Award Child Bounties](https://img.youtube.com/vi/mLpvx0OQoyM/0.jpg)](https://www.youtube.com/watch?v=mLpvx0OQoyM)

Note that once a child bounty is awarded, awardees need to wait for the
{{ polkadot: 8 :polkadot }}{{ kusama: 4 :kusama }}-day delay to be complete before claiming the
child bounty.

## Claim a Child Bounty Reward

Once the {{ polkadot: 8 :polkadot }}{{ kusama: 4 :kusama }}-day delay is elapsed, see the video
tutorial below to learn how to claim a child bounty reward.

[![Claim Child Bounty Reward](https://img.youtube.com/vi/db82aHgy23c/0.jpg)](https://www.youtube.com/watch?v=db82aHgy23c)
