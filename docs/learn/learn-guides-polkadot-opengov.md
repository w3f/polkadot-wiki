---
id: learn-guides-polkadot-opengov
title: Polkadot OpenGov How-to Guides
sidebar_label: OpenGov
description: Advanced How-to Guides about Polkadot OpenGov.
keywords: [opengov, polkadot opengov, referenda, cancel]
slug: ../learn-guides-polkadot-opengov
---

import RPC from "./../../components/RPC-Connection";

This page is for advanced users of Polkadot OpenGov. If you would learn about and participate in
OpenGov, please navigate to the page on
[participating in Polkadot Opengov.](https://wiki.polkadot.network/docs/maintain-guides-polkadot-opengov)

## Delegations

### Delegate Votes

You can start delegating your votes by clicking the "Delegate" button on
[Governance > Referenda](https://polkadot.js.org/apps/#/referenda).

![js-delegation-start](../assets/js-delegation-start.png)

If it is the first time you delegate or vote, there will be a banner message. You can delegate on a
single track or all the tracks. You have an option to specify the number of votes (i.e., the number
of tokens) and the [conviction multiplier](./learn-polkadot-opengov.md#voluntary-locking). After
clicking "Next", you will need to specify the account to delegate your votes to, and after clicking
"Delegate" and "Sign and Submit" your delegations will appear for each track (see below).

![js-delegation-allTracks](../assets/js-delegation-allTracks.png)

Note that if you want to delegate just a few tracks, you have two options:

- Repeat the process using the "Delegate" button multiple times
- Issue a batch call with multiple `convictionVoting.delegate` extrinsics under
  [Developer > Extrinsics](https://polkadot.js.org/apps/#/extrinsics)

![js-delegation-delegate](../assets/js-delegation-delegate.png)

By clicking on "Add item" you can add new extrinsics for multiple tracks.

### Undelegate Votes

The "Delegate" button on [Governance > Referenda](https://polkadot.js.org/apps/#/referenda) is only
for delegating votes. You cannot undelegate or modify your delegations. If you wish to undelegate,
you will need to go to [Developer > Extrinsics](https://polkadot.js.org/apps/#/extrinsics) and
submit a `convictionVoting.undelegate` extrinsic, specifying the track you wish to undelegate.

![js-delegation-undelegate](../assets/js-delegation-undelegate.png)

Undelegated tracks will show up as "0 votes" on the Delegate tab.

![js-delegation-undelegate](../assets/js-delegation-undelegated.png)

After you undelegated, the conviction lock will start the countdown, and your funds will be
available for unlocking after the countdown ends.

### Unlock Expired ConvictionVoting Locks

After the conviction lock expires, you can go to
[Developer > Extrinsics](https://polkadot.js.org/apps/#/extrinsics) and submit a
`convictionVoting.unlock` extrinsic to unlock funds for a specific track. Note that if you delegated
multiple tracks, the funds will be unlocked after undelegating all the tracks.

![js-delegation-unlock](../assets/js-delegation-unlock.png)

### Modify your Delegations

The "Delegate" button on [Governance > Referenda](https://polkadot.js.org/apps/#/referenda) is only
for delegating votes. You cannot undelegate or modify your delegations. If you wish to update the
delegated account, the conviction, and the number of votes you will need to go to
[Developer > Extrinsics](https://polkadot.js.org/apps/#/extrinsics), [undelegate](#undelegate-votes)
the track and [delegate](#delegate-votes) again with updated information.

## Claiming OpenGov Deposits

### Claiming the Preimage and Decision Deposits

After a referendum finishes its life cycle (and gets approved or rejected or timed out), the
preimage and decision deposits can be claimed. For claiming the preimage deposit, navigate to
[Polkadot-JS UI > Governance > Preimages](https://polkadot.js.org/apps/#/preimages) and click on
unnote button shown on the preimage you submitted.

![Claim Preimage Deposit](../assets/claim-preimage-deposit.png)

Similarly, to claim the decision deposit, navigate to
[Polkadot-JS UI > Governance > Referenda](https://polkadot.js.org/apps/#/referenda) and scroll down
to the end of the page to click on the referenda with the decision deposit and claim it.

![Claim Referendum Deposits](../assets/claim-referendum-decision-deposit.png)

### Claiming the Referendum Submission Deposit

The submission deposit for a referendum can be claimed
[only if the referendum was `Approved` or `Canceled`](https://github.com/paritytech/polkadot-sdk/blob/cfb29254f74412cea35e8048d8aea94bc789fcb1/substrate/frame/referenda/src/types.rs#L261).
The submission deposit can be claimed by issuing the `refundSubmissionDeposit` extrinsic.

Users can not refund their submission deposit while the referendum is `Ongoing` or `Rejected`.
Similarly, users cannot refund their submission deposit if the proposal has `TimedOut` (failing to
submit the decision deposit within a
{{ polkadot: <RPC network="polkadot" path="const.referenda.undecidingTimeout" defaultValue={201600} filter="blocksToDays"/> :polkadot }}{{ kusama: <RPC network="kusama" path="const.referenda.undecidingTimeout" defaultValue={201600} filter="blocksToDays"/> :kusama }}-day
period will lead to a referendum timeout). This behavior exists so that users can refrain from
spamming the chain with proposals that have no interest from the community. If a proposal is in the
`TimedOut` state, any user can call `slash_proposal_deposit`, which will move the funds from the
user to a runtime-configured account, like the treasury.

To refund your slashed deposit, you can start a new referendum and specifically request a refund
from the treasury. You need to make sure you have enough balance for a new submission and decision
deposit, and you will need to select the right track to ask for a refund. For example, the
[Small Tipper Track](../maintain/maintain-guides-polkadot-opengov.md#small-tipper) would be fine for
any kind of deposit refund up to
{{ polkadot: 250 DOT :polkadot }}{{ kusama: 8.25 KSM KSM :kusama }}.

## Cancel or Kill a Referendum

:::info

Anybody can cancel an ongoing referendum (i.e., a referendum within the Lead-in or
voting/confirmation period). For more information about the referenda timeline in Polkadot OpenGov,
see the [dedicated page](../learn/learn-polkadot-opengov.md#referenda-timeline).

To successfully cancel a referendum through the track `20 / Referendum Canceller`, you will need to
attain
[specific approval and support levels](../maintain/maintain-guides-polkadot-opengov.md#referendum-canceller).

:::

To cancel a referendum, you need first to submit a preimage with the `referenda.cancel` extrinsic.
Go to the [Polkadot-JS UI > Governance > Referenda](https://polkadot.js.org/apps/#/referenda) and
click on the "Add Preimage" button. You must specify the `referenda.cancel` extrinsic with the index
equal to the ongoing Referendum you wish to cancel. In the screenshot below, the Referendum to be
cancelled is 249.

![cancel-referenda-preimage-creation](../assets/cancel-referenda-preimage-creation.png)

This call will cancel the referendum and return the deposit. You can also kill a referendum using
the `referenda.kill` extrinsic. This will cancel the referendum and slash the deposit.

:::info Preimage Submission Deposit

A deposit is required for the preimage to be stored on chain. The preimage deposit is proportional
to the amount of information stored within the preimage. The deposit amount required for a preimage
with a treasury spend transaction is around
{{ polkadot: 41 DOT :polkadot }}{{ kusama:  1.4 KSM  :kusama }}. Ensure you have enough account
balance to pay for this submission deposit as well as the transaction fees.

:::

Once a preimage is submitted, it can be checked under
[Governance > Preimages](https://polkadot.js.org/apps/#/preimages).

![cancel-referenda-preimage-check](../assets/cancel-referenda-preimage-check.png)

You must copy the preimage to use it when you submit your proposal. To submit the proposal to cancel
referendum 249, for example, you need to go under
[Governance > Referenda](https://polkadot.js.org/apps/#/referenda) and click the "Submit Proposal"
button.

![cancel-referenda-proposal](../assets/cancel-referenda-proposal.png)

You must specify the account to submit the proposal (this can differ from the account used to create
the preimage). Then you will need to specify the track `20 / Referendum Canceller` and add the
preimage hash containing the specific action that will be enacted if the referendum passes. Note
that a submission deposit of
{{ polkadot: <RPC network="polkadot" path="consts.referenda.submissionDeposit" defaultValue={10000000000} filter="humanReadable"/> :polkadot }}{{ kusama: <RPC network="kusama" path="consts.referenda.submissionDeposit" defaultValue={33333333333} filter="humanReadable"/> :kusama }}
will be reserved for submitting the proposal.

Once the proposal has been submitted, it will stay in the Lead-in period until there is enough space
within the track, and a
[track-dependent preparation period and decision deposit](../maintain/maintain-guides-polkadot-opengov.md#polkadot-opengov-terminology-and-parameters)
have been met. Failing to submit the decision deposit within a
{{ polkadot: <RPC network="polkadot" path="consts.referenda.undecidingTimeout" defaultValue={201600} filter="blocksToDays"/> :polkadot }}{{ kusama: <RPC network="kusama" path="consts.referenda.undecidingTimeout" defaultValue={201600} filter="blocksToDays"/> :kusama }}-day
period will lead to a referendum timeout.
