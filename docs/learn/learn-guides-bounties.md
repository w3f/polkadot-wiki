---
id: learn-guides-bounties
title: Polkadot-JS Guides about Bounties
sidebar_label: Bounty Guides
description: Polkadot-JS Guides for Bounties
keyword: [treasury, bounties, guides, child bounty, polkadot-js]
slug: ../learn-guides-bounties
---



<MessageBox message="Polkadot-JS is for developers and power users only. If you need help using the Polkadot-JS UI, you can contact the
[Polkadot Support Team](https://support.polkadot.network/support/home). For more user-friendly tools
see the [wallets](../general/wallets-and-extensions.md), [apps](./apps-index) and [dashboard](./dashboards-index) pages." />
<!-- MessageBox -->
<div id="messageBox" class="floating-message-box">
  <p>
    Polkadot-JS is for developers and power users only. If you need help using the Polkadot-JS UI, you can contact the
    <a href="https://support.polkadot.network/support/home" target="_blank" rel="noopener noreferrer">
      Polkadot Support Team.
    </a>
  </p>
  <button class="close-messagebox" aria-label="Close message">✖</button>
</div>

See [this page](./learn-polkadot-opengov-treasury.md#bounties) to learn about Bounties.

!!!info "Notify the Polkadot Direction Channel"
    Remember always to notify the [Polkadot Direction Element Channel](https://matrix.to/#/#Polkadot-Direction:parity.io) about [OpenGov referenda](./learn-polkadot-opengov.md#referenda) so that the community can start reviewing them and voting on them.

## Submit a Bounty Proposal

!!!info "Step-by-step written tutorial"
    See [this written tutorial](https://scribehow.com/shared/How_to_Submit_a_Bounty_Proposal_on_Polkadotjs_Apps__Ps_zfmNXRbm6PuZaj28JBQ) to learn more about how to submit a bounty proposal.

See the video tutorial below to learn how you can create a bounty and submit it for approval through
an OpenGov referendum.

<div className="row">
<div className="col text--center">
    <a href="https://youtu.be/Qv_nJVcvQr8?t=52">
      <img src="https://img.youtube.com/vi/Qv_nJVcvQr8/0.jpg" width="350" style="borderRadius: 10, border: '1px solid slategrey'" />
    </a>
    <p>
      <a href="https://youtu.be/Qv_nJVcvQr8?t=52">Introduction to Bounties</a>
    </p>
  </div>
  <div className="col text--center">
    <a href="https://www.youtube.com/watch?v=8Cft1-8RWmk">
      <img src="https://img.youtube.com/vi/8Cft1-8RWmk/0.jpg" width="350" style="borderRadius: 10, border: '1px solid slategrey'" />
    </a>
    <p>
      <a href="https://www.youtube.com/watch?v=8Cft1-8RWmk">Submit a Bounty</a>
    </p>
  </div>
</div>

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

Submitting a bounty proposal will require a
[deposit](../general/chain-state-values.md#bounty-deposit).

## Assign a Curator to a Bounty

!!!info "Step-by-step written tutorial"
    See [this written tutorial](https://scribehow.com/shared/How_to_Assign_a_Curator_to_a_Bounty_on_Polkadotjs_Apps__JgK3eSfXQdm_PSvtz8TelQ) to learn more about how to assign a curator to a bounty.

Once your bounty is shown as "funded" on the main
[Bounties page](https://polkadot.js.org/apps/#/bounties), you can propose a bounty curator. The
referendum must be submitted on the same track used for proposing the bounty or a track with a
higher spending limit
([see the code snippet](https://github.com/paritytech/polkadot-sdk/blob/22e90b1c11509f1f13083f1ac6c5f028f54432e7/substrate/frame/bounties/src/lib.rs#L412)).
For example, if the bounty was submitted to the Medium Spender Track, the curator must be proposed
using the same track or the Big Spender or Treasurer tracks. See the video tutorial below to learn
how you can add a curator to a bounty and submit it for approval through an OpenGov referendum.

<div className="row">
  <div className="col text--center">
    <a href="https://www.youtube.com/watch?v=TM7vk3oP9IA">
      <img src="https://img.youtube.com/vi/TM7vk3oP9IA/0.jpg" width="350" style="borderRadius: 10, border: '1px solid slategrey'" />
    </a>
    <p>
      <a href="https://www.youtube.com/watch?v=TM7vk3oP9IA">Assign Curator to a Bounty</a>
    </p>
  </div>
</div>

Once your OpenGov referendum has been approved by the community and served the required
[spending period](../general/glossary.md#spend-period), the bounty will still show as "funded" on
the main [Bounties page](https://polkadot.js.org/apps/#/bounties) and await the curator's
acceptance. The curator must formally accept the curator role by signing a `bounties.acceptCurator`
extrinsic. More information about when to do this can be found on the main
[Bounties page](https://polkadot.js.org/apps/#/bounties). Only after the curators claim their
candidacy the bounty will show as "active" on the main Bounty page.

!!!info "Curator assignment call must be executed after bounty is funded"
    Curator assignment must take place after the bounty has been funded, and approved bounties are funded after a spend period has been completed. A curator assignment referendum cannot be executed during the same spend period when the bounty is funded.

If your bounty has been awarded but is not funded yet, you need to make sure that the curator
assignment referendum gets enacted in the subsequent spending period (you can set a delay in
[Polkadot-JS](./learn-guides-polkadot-opengov.md#submitting-a-proposal) when you submit the proposal
during the current spend period).

## Create and Award Child Bounties

!!!info "Step-by-step written tutorial"
    See [this written tutorial](https://scribehow.com/shared/How_to_Create_and_Award_a_Child_Bounty__Q-YFGkYAR3WxMnvYGHiU3Q) to learn more about how to create and award child bounties.

!!!info "Remember to add contextual information about child bounties"
    When you add child bounties, please add contextual information on the governance forums [Polkassembly](https://polkassembly.io/) or [Subsquare](https://polkadot.subsquare.io/).

See the video tutorial below to learn how to create a child bounty, assign a curator, and award a
child bounty.

The video will show how to create and award a child bounty using a batch call. We will also include
proposing and approving curator candidacy for the child bounty. The calls can be executed
separately, depending on the process curators consider appropriate for their bounty.

<div className="row">
  <div className="col text--center">
    <a href="https://www.youtube.com/watch?v=mLpvx0OQoyM">
      <img src="https://img.youtube.com/vi/mLpvx0OQoyM/0.jpg" width="350" style="borderRadius: 10, border: '1px solid slategrey'" />
    </a>
    <p>
      <a href="https://www.youtube.com/watch?v=mLpvx0OQoyM">Create and Award Child Bounties</a>
    </p>
  </div>
</div>

Once a child bounty is awarded, awardees can claim the child bounty.

## Claim a Child Bounty Reward

!!!info "Step-by-step written tutorial"
    See [this written tutorial](https://scribehow.com/shared/How_to_claim_a_Child_Bounty_reward_on_Polkadotjs__t3V7NDUjQlus40EUjc-5Kw) to learn more about how to claim a child bounty reward.

The status of child bounties can be viewed on the
[Polkassembly Bounty page](https://polkadot.polkassembly.io/bounties) under the specific parent
bounty. A child bounty status can be "Added", "Awarded", or "Claimed". For example, the parent
bounty 17 refers to the Community Events Bounty, which has 183 child bounties.

![polkassembly-child-bounties](../assets/polkassembly-child-bounties.png)

After the child bounty has been rewarded, follow the guidelines in the video tutorial below to learn
how to claim a child bounty reward. Note that the extrinsic to claim the child bounty reward is
permissionless, and anyone can initiate the claim on behalf of the beneficiary.

<div className="row">
  <div className="col text--center">
    <a href="https://www.youtube.com/watch?v=db82aHgy23c">
      <img src="https://img.youtube.com/vi/db82aHgy23c/0.jpg" width="350" style="borderRadius: 10, border: '1px solid slategrey'" />
    </a>
    <p>
      <a href="https://www.youtube.com/watch?v=db82aHgy23c">Claim Child Bounty Reward</a>
    </p>
  </div>
</div>

## Close Child Bounties

Child bounties can be closed without awarding them. To close a child bounty, you must submit a
`childBounties.closeChild.Bounty` extrinsic, specifying the parent bounty and child bounty IDs. Only
the parent bounty curator can sign this transaction, resulting in the child bounty’s curator deposit
being returned.

See the video tutorial below to learn how to close a child bounty.

<div className="row">
  <div className="col text--center">
    <a href="https://www.youtube.com/watch?v=Qv_nJVcvQr8&t=2109s">
      <img src="https://img.youtube.com/vi/Qv_nJVcvQr8/0.jpg" width="350" style="borderRadius: 10, border: '1px solid slategrey'" />
    </a>
    <p>
      <a href="https://www.youtube.com/watch?v=Qv_nJVcvQr8&t=2109s">Close a Child Bounty</a>
    </p>
  </div>
</div>

If the child bounty curator acts maliciously, the parent bounty curator can submit a
`childBounties.unassignCurator` that slashes the curator's deposit.

## Refill Parent Bounties

To refill a parent bounty,
[an OpenGov referendum must be submitted](./learn-guides-polkadot-opengov.md#submitting-a-preimage).

The preimage must contain a `treasury.spendLocal` extrinsic specifying the amount of tokens to be
sent from the treasury to the receiver's address, in this case the
[system account](./learn-account-advanced.md#system-accounts) of the
[parent bounty](./learn-polkadot-opengov-treasury.md#bounties).

To get the bounty system account of a parent bounty, go to
[Subsquare](https://polkadot.subsquare.io/treasury/bounties), search for the bounty name, and the
address will be shown under Metadata.
