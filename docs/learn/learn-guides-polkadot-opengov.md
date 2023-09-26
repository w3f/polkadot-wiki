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

## Cancel or Kill a Referendum

:::info

Anybody can cancel an ongoing referendum (i.e., a referendum within the Lead-in or
voting/confirmation period). For more information about the referenda timeline in Polkadot OpenGov,
see the [dedicated page](../learn/learn-polkadot-opengov.md#referenda-timeline).

To successfully cancel a referendum through the track `20 / Referendum Canceller`, you will need to
attain
[specific approval and support levels](../maintain/maintain-guides-polkadot-opengov.md#referendum-canceller).

:::

To cancel a referendum, you need first to submit a preimage. Go to the
[Polkadot-JS UI > Governance > Referenda](https://polkadot.js.org/apps/#/referenda) and click on the
"Add Preimage" button. You must specify the specific call enacted if the proposal passes. To cancel
a referendum, you must specify the `referenda.cancel` extrinsic of referendum `249`.

![cancel-referenda-preimage-creation](../assets/cancel-referenda-preimage-creation.png)

This call will cancel the referendum and return the deposit. You can also kill a referendum using
the `referenda.kill` extrinsic. This will cancel the referendum and slash the deposit. Note that
creating a preimage will reserve some funds proportionally to the amount of information stored
within the preimage. In this case, the deposit was 1.33 KSM (see
[Subscan](https://kusama.subscan.io/extrinsic/19143604-2)).

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
{{ polkadot: <RPC network="polkadot" path="const.referenda.undecidingTimeout" defaultValue={201600} filter="blocksToDays"/> :polkadot }}{{ kusama: <RPC network="kusama" path="const.referenda.undecidingTimeout" defaultValue={201600} filter="blocksToDays"/> :kusama }}-day
period will lead to a referendum timeout.

## Request Submission and Decision Deposit Back

If you submitted a proposal and a referendum for such proposal has ended, you can claim your
submission and decision deposits back by issuing the `refundSubmissionDeposit` and the
`refundDecisionDeposit` extrinsics, respectively. Those calls will succeed if the proposal is
completed as passing or failing.

Users can not refund their submission deposit while the referendum is `Ongoing`. Similarly, users
cannot refund their submission deposit if the proposal has `TimedOut` (failing to submit the
decision deposit within a 14-day period will lead to a referendum timeout). This behavior exists so
that users can refrain from spamming the chain with proposals that have no interest from the
community. If a proposal is in the `TimedOut` state, any user can call `slash_proposal_deposit`,
which will move the funds from the user to a runtime-configured account, like the treasury.

If you submitted a proposal and no decision deposit has been placed on that referenda, the
submission deposit will not be claimable using the `refundSubmissionDeposit` extrinsic. To refund
your deposit, you can start a new referendum and specifically request a refund from the treasury.
You need to make sure you have enough balance for a new submission deposit and you will need to
select the right track to ask for the refund. In any case, the
[Small Tipper Track](../maintain/maintain-guides-polkadot-opengov.md#small-tipper) would be fine for
any kind of deposit.
