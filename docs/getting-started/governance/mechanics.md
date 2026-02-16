---
title: How Polkadot Governance Works
description: A simplified overview of the Polkadot OpenGov lifecycle.
---

# How Polkadot Governance Works

Polkadot OpenGov allows anyone to submit a proposal to the network. If the proposal attracts enough support from the community, it can be enacted automatically.

## The Governance Lifecycle

The lifecycle of a referendum in OpenGov generally follows these stages:

1.  **Lead-in Period**: After a proposal is submitted, it enters a lead-in period. During this time, it must gather enough **Decision Deposit** to move to the next phase.
2.  **Decision Period**: Once the deposit is met, the proposal enters the Decision Period (usually 28 days for most tracks). During this time, token holders vote **Aye** or **Nay**.
3.  **Confirmation Period**: If a proposal meets the required thresholds for **Approval** (percentage of Ayes) and **Support** (total turnout), it enters the Confirmation Period. It must maintain these thresholds for the duration of this period to pass.
4.  **Enactment Period**: If the proposal passes, it waits for a specified Enactment Period before the changes are applied to the network.

## Origins and Tracks

Different types of proposals have different requirements. For example, a proposal to spend a small amount of Treasury funds is easier to pass than a proposal to upgrade the network protocol.

These different "lanes" for proposals are called **Tracks**, and each Track is associated with a specific **Origin**.

!!!info "Detailed Origins and Tracks"
    For a complete list of all Origins, Tracks, and their specific parameters (like deposit amounts and voting periods), please refer to the [Governance Origins Reference](../../knowledge-base/opengov-origins.md).

## Key Concepts

-   **Referendum**: A proposal that is currently being voted on.
-   **Preimage**: The actual data of the proposal (what will happen if it passes). This is stored separately from the referendum to save space.
-   **Conviction Voting**: You can increase the weight of your vote by locking your DOT for longer periods.

## Next Step
Ready to participate? Learn about [Voting on Referenda](voting.md).
