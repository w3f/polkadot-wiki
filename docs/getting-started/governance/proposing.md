---
title: Submitting a Proposal
description: Learn the lifecycle of a Polkadot OpenGov proposal and how to submit one.
---

# Submitting a Proposal

Anyone can submit a proposal to the Polkadot network. However, the process requires careful preparation and community engagement to be successful.

## The Proposal Lifecycle

Creating a proposal involves several distinct steps. It is not just "clicking a button."

### Discussion (Off-Chain)
**Crucial Step**: Before putting anything on-chain, you *must* discuss your idea with the community.
-   **Why?** You need to gauge sentiment. If you skip this, your proposal will likely be rejected by voters who haven't seen it before.
-   **Where?** Use [Polkassembly](https://polkadot.polkassembly.io/) or [Subsquare](https://polkadot.subsquare.io/) to start a discussion thread.

### Preimage Submission
A **Preimage** is the technical "instruction" of what your proposal will do (e.g., "Transfer 100 DOT to Alice" or "Upgrade the Runtime").
-   This data is stored on-chain separately from the proposal itself to save space.
-   Submitting a preimage requires a small deposit.
-   You will get a **Preimage Hash**, which is the unique ID for your instruction.

### Proposal Submission
Once you have the Preimage Hash, you submit the actual **Referendum Proposal**.
-   You will select the **Track** (e.g., Small Spender, Big Tipper) appropriate for your request.
-   You must bond the **Submission Deposit**.

### Decision Deposit
For your proposal to leave the "Lead-in" phase and start being voted on, a **Decision Deposit** must be placed.
-   This is significantly higher than the submission deposit to prevent spam.
-   If you do not place this deposit, your proposal will time out and be rejected.

!!!info "Get Detailed Parameters"
    Check the [**Governance Origins**](../../knowledge-base/opengov-origins.md) page to see the required deposits and tracks for your specific proposal type.

## Tools for Proposing

While you can use the raw Polkadot-JS UI, community tools often provide a more guided experience.

### Polkassembly & Subsquare
Both platforms allow you to move from a discussion thread directly to an on-chain proposal. They help guide you through linking your discussion to the referendum.

-   [**Polkassembly**](https://polkadot.polkassembly.io/): Create proposals and link discussions.
-   [**Subsquare**](https://polkadot.subsquare.io/): Track and submit proposals.

### Polkadot-JS UI (Advanced)
For advanced users who need full control over the extrinsic parameters.

-   **Submission**: Uses the `referenda.submit` extrinsic.
-   **Preimages**: Uses the `preimage.notePreimage` extrinsic.

!!!info "Support Guide: Creating a Treasury Proposal"
    [**How to Submit a Treasury Proposal (Polkadot Support)**](https://support.polkadot.network/support/solutions/articles/65000187320)

## Next Step
Not enough time to vote on everything? Learn about [Delegating Your Vote](delegation.md).
