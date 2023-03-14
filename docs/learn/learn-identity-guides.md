---
id: learn-identity-guides
title: Identity How-to Guides
sidebar_label: Identity
description: Advanced How-to Guides about Identity.
keywords: [registrar, identity]
slug: ../learn-identity-guides
---

## Becoming a Registrar

To become a registrar, submit a pre-image and proposal into
[Democracy](../maintain/maintain-guides-democracy.md), then wait for people to vote on it. For best
results, write a post about your identity and intentions beforehand, and once the proposal is in the
queue ask people to endorse it so that it gets ahead in the referendum queue.

Here's how to submit a proposal to become a registrar:

Go to the Democracy tab, select "Submit preimage", and input the information for this motion -
notably which account you're nominating to be a registrar in the `identity.setRegistrar` function.

![Setting a registrar](../assets/identity/12.jpg)

Copy the preimage hash. In the above image, that's
`0x90a1b2f648fc4eaff4f236b9af9ead77c89ecac953225c5fafb069d27b7131b7`. Submit the preimage by signing
a transaction.

Next, select "Submit Proposal" and enter the previously copied preimage hash. The `locked balance`
field needs to be at least
{{ polkadot: <RPC network="polkadot" path="consts.identity.basicDeposit" defaultValue={202580000000} filter="humanReadable"/>. :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.identity.basicDeposit" defaultValue={33333000000} filter="humanReadable"/>. :kusama }}
You can find out the minimum by querying the chain state under
[Chain State](https://polkadot.js.org/apps/#/chainstate) -> Constants -> democracy ->
minimumDeposit.

![Submitting a proposal](../assets/identity/13.jpg)

At this point, DOT holders can endorse the motion. With enough endorsements, the motion will become
a referendum, which is then voted on. If it passes, users will be able to request judgement from
this registrar.
