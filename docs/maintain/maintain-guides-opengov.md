---
id: maintain-guides-opengov
title: Participate in OpenGov
sidebar_label: Participate in OpenGov
description: Steps on how to participate in OpenGov.
keywords: [democracy, council, action, proposal, referenda]
slug: ../maintain-guides-opengov
---

## Create a Referenda Proposal using Polkadot-JS UI

### Submitting a Preimage

The act of making a proposal is split from submitting the preimage for the proposal since the
storage cost of submitting a large preimage could be pretty expensive. Allowing for the preimage
submission to come as a separate transaction means that another account could submit the preimage
for you and pay the fee for it. The example below demonstrates the creation of a preimage on Kusama
(**the same procedure applies to Polkadot**). If you wanted to propose that a remark "Expect Chaos!"
is added to the blockchain, the preimage hash would be
`0x8ac3f722caf7677254e25ca4ad77d533ca893c7d2ad4009e258d749f2004ef94`.

![submit preimage](../assets/governance/opengov-submit-preimage.png)

After the preimage is submitted successfuly on-chain, Polkadot-JS UI lists it under the tab of
Governance > Preimages.

![preimage](../assets/governance/opengov-preimage-submitted.png)

### Submitting a Proposal

Submitting a proposal requires you to bond some tokens. On Polkadot-JS UI, you can navigate to the
Governance -> Referenda to make a new proposal. In order to submit a proposal, you will need to
submit what's called the preimage hash. The preimage hash is simply the hash of the proposal to be
enacted. The easiest way to get the preimage hash is by clicking on the "Submit preimage" button as
shown in the previous section.

The proposal will be registered from the account selected and the balance lock will be applied to
it. An appropriate origin must be chosen, as each origin has different privileges, and acceptance
criteria. After entering the hash of the preimage for the proposal, the preimage length field is
automatically populated. The enactment delay can be specified either as a block number, or as a
specific number of blocks after the referendum is approved. The deposit for this proposal will be
locked for the referendum duration.

![submit proposal](../assets/governance/opengov-submit-proposal.png)

## Voting on Referenda

:::caution

Use `convictionVoting.vote` for voting on Referenda in OpenGov instead of `democracy.vote` (which
only works for old version of governance).

:::

## Origins and Tracks

Whitelist

| Origin              | ID  |
| ------------------- | --- |
| `WhitelistedCaller` | 1   |

General administration

| Origin            | ID  |
| ----------------- | --- |
| `StakingAdmin`    | 10  |
| `Treasurer`       | 11  |
| `LeaseAdmin`      | 12  |
| `FellowshipAdmin` | 13  |
| `GeneralAdmin`    | 14  |
| `AuctionAdmin`    | 15  |

Referendum adminstration

| Origin                | ID  |
| --------------------- | --- |
| `ReferendumCanceller` | 20  |
| `ReferendumKiller`    | 21  |

Limited treasury spending

| Origin          | ID  |
| --------------- | --- |
| `SmallTipper`   | 30  |
| `BigTipper`     | 31  |
| `SmallSpender`  | 32  |
| `MediumSpender` | 33  |
| `BigSpender`    | 34  |
