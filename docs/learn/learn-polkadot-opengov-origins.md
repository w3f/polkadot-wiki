---
title: Polkadot OpenGov Origins
description: Explore the origins and tracks in Polkadot OpenGov, their parameters, and how they shape the governance process.
---

!!!info "Learn more about Polkadot OpenGov"
    For background information about Polkadot OpenGov, please refer to this [dedicated Wiki document](../learn/learn-polkadot-opengov.md).

## Polkadot OpenGov Terminology and Parameters

The important parameters to be aware of when voting using the Referenda module are as follows:

**Origin** - Each origin has a fixed set of privileges. When making a proposal, it is important to
choose the origin that has the privilege to execute the referenda.

**Track** - Each track has its own dispatch origin and a preset configuration that governs the
voting process and parameters.

**Submission Deposit** - The minimum amount to be used as a (refundable) deposit to submit a public
referendum proposal.

**Prepare Period** - The minimum time the referendum needs to wait before it can progress to the
next phase after submission. Voting is enabled, but the votes do not count toward the outcome of the
referendum yet.

**Decision Deposit** - This deposit is required for a referendum to progress to the decision phase
after the end of prepare period.

**Decision Period** - Amount of time a decision may take to be approved to move to the confirming
period. If the proposal is not approved by the end of the decision period, it gets rejected.

**Max Deciding** - The maximum number of referenda that can be in the decision period of a track all
at once.

**Conviction**: A multiplier to increase voting power.

**Approval**: the share of the approval vote-weight after adjustments for conviction against the
total number of vote-weight for both approval and rejection

**Support**: The total number of votes in approval (ignoring adjustments for conviction) compared to
the total possible amount of votes that could be made in the system. Support also takes into account
abstained votes.

**Min Approval** - The threshold of approval (along with the min support) needed for a proposal to
meet the requirements of the confirm period.

**Min Support** - The threshold of support (along with the min approval) needed for a proposal to
meet the requirements of the confirm period.

**Confirmation Period** - The total time the referenda must meet both the min approval and support
criteria during the decision period in order to pass and enter the enactment period.

**Min Enactment Period** - Minimum time that an approved proposal must be in the dispatch queue
after approval. The proposer has the option to set the enactment period to be of any value greater
than the min enactment period.

## Origins and Tracks Info

Polkadot has 18 tracks and Kusama has 16. Both run on their Asset Hub. The values below were read from the chains' `referenda.tracks` constant (Polkadot Asset Hub runtime 2,005,001 and Kusama Asset Hub runtime 2,003,002, checked 26 October 2026). Durations assume 6-second blocks, because governance on Asset Hub is timed in relay chain blocks. For live values, see the track pages on [Subsquare](https://polkadot.subsquare.io/referenda) or query `referenda.tracks` in the [Polkadot Developer Interface](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot-asset-hub-rpc.polkadot.io#/chainstate/constants).

!!!info "Polkadot: what changed since the earlier version of this table"
    [Wish For Change 1701](https://polkadot.subsquare.io/referenda/1701) ("OpenGov Adjustments - 2025") led to a runtime change ([polkadot-fellows/runtimes#873](https://github.com/polkadot-fellows/runtimes/pull/873)) that:

    - raised the submission deposit and shortened the undeciding timeout on all Polkadot tracks;
    - Treasurer: max deciding 10 → 2, decision deposit 1,000 → 25,000 DOT, minimum support 0% → 1%;
    - Small Spender: max deciding 50 → 5, decision deposit 100 → 500 DOT, minimum support 0% → 0.5%;
    - Medium Spender: max deciding 50 → 5, decision deposit 200 → 1,000 DOT, minimum support 0% → 0.5%;
    - Big Spender: max deciding 50 → 3, decision deposit 400 → 5,000 DOT, minimum support 0% → 0.75%;
    - Referendum Canceller: max deciding 1,000 → 500, decision deposit 10,000 → 5,000 DOT.

    The Technical Maintenance and Prosperity Emergency tracks were added in September 2026 ([polkadot-fellows/runtimes#1236](https://github.com/polkadot-fellows/runtimes/pull/1236)).

=== "Polkadot"
    | ID  | Origin | Max Deciding | Decision Deposit | Prepare Period | Decision Period | Confirm Period | Min Enactment Period | Min Approval | Min Support |
    |-----|--------|--------------|------------------|----------------|-----------------|----------------|----------------------|--------------|-------------|
    | 0 | Root | 1 | 100,000 DOT | 2 Hours | 28 Days | 1 Day | 1 Day | Reciprocal | Linear Decreasing |
    | 1 | Whitelisted Caller | 100 | 10,000 DOT | 30 Minutes | 28 Days | 10 Minutes | 10 Minutes | Reciprocal | Reciprocal |
    | 2 | Wish For Change | 10 | 20,000 DOT | 2 Hours | 28 Days | 1 Day | 10 Minutes | Reciprocal | Linear Decreasing |
    | 10 | Staking Admin | 10 | 5,000 DOT | 2 Hours | 28 Days | 3 Hours | 10 Minutes | Linear Decreasing | Reciprocal |
    | 11 | Treasurer | 2 | 25,000 DOT | 2 Hours | 28 Days | 7 Days | 1 Day | Reciprocal | Linear Decreasing |
    | 12 | Lease Admin | 10 | 5,000 DOT | 2 Hours | 28 Days | 3 Hours | 10 Minutes | Linear Decreasing | Reciprocal |
    | 13 | Fellowship Admin | 10 | 5,000 DOT | 2 Hours | 28 Days | 3 Hours | 10 Minutes | Linear Decreasing | Reciprocal |
    | 14 | General Admin | 10 | 5,000 DOT | 2 Hours | 28 Days | 3 Hours | 10 Minutes | Reciprocal | Reciprocal |
    | 15 | Auction Admin | 10 | 5,000 DOT | 2 Hours | 28 Days | 3 Hours | 10 Minutes | Reciprocal | Reciprocal |
    | 16 | Technical Maintenance | 100 | 10,000 DOT | 30 Minutes | 28 Days | 10 Minutes | 10 Minutes | Reciprocal | Reciprocal |
    | 17 | Prosperity Emergency | 10 | 50,000 DOT | 2 Hours | 28 Days | 3 Hours | 10 Minutes | Reciprocal | Reciprocal |
    | 20 | Referendum Canceller | 500 | 5,000 DOT | 2 Hours | 7 Days | 3 Hours | 10 Minutes | Linear Decreasing | Reciprocal |
    | 21 | Referendum Killer | 1,000 | 50,000 DOT | 2 Hours | 28 Days | 3 Hours | 10 Minutes | Linear Decreasing | Reciprocal |
    | 30 | Small Tipper | 200 | 1 DOT | 1 Minute | 7 Days | 10 Minutes | 1 Minute | Linear Decreasing | Reciprocal |
    | 31 | Big Tipper | 100 | 10 DOT | 10 Minutes | 7 Days | 1 Hour | 10 Minutes | Linear Decreasing | Reciprocal |
    | 32 | Small Spender | 5 | 500 DOT | 4 Hours | 28 Days | 2 Days | 1 Day | Linear Decreasing | Reciprocal |
    | 33 | Medium Spender | 5 | 1,000 DOT | 4 Hours | 28 Days | 4 Days | 1 Day | Linear Decreasing | Reciprocal |
    | 34 | Big Spender | 3 | 5,000 DOT | 4 Hours | 28 Days | 7 Days | 1 Day | Linear Decreasing | Reciprocal |

=== "Kusama"
    | ID  | Origin | Max Deciding | Decision Deposit | Prepare Period | Decision Period | Confirm Period | Min Enactment Period | Min Approval | Min Support |
    |-----|--------|--------------|------------------|----------------|-----------------|----------------|----------------------|--------------|-------------|
    | 0 | Root | 1 | 3,333.333333 KSM | 2 Hours | 14 Days | 1 Day | 1 Day | Reciprocal | Linear Decreasing |
    | 1 | Whitelisted Caller | 100 | 333.333333 KSM | 30 Minutes | 14 Days | 10 Minutes | 10 Minutes | Reciprocal | Reciprocal |
    | 2 | Wish For Change | 10 | 666.666667 KSM | 2 Hours | 14 Days | 1 Day | 10 Minutes | Reciprocal | Linear Decreasing |
    | 10 | Staking Admin | 10 | 166.666667 KSM | 2 Hours | 14 Days | 3 Hours | 10 Minutes | Linear Decreasing | Reciprocal |
    | 11 | Treasurer | 10 | 33.333333 KSM | 2 Hours | 14 Days | 2 Days | 1 Day | Reciprocal | Linear Decreasing |
    | 12 | Lease Admin | 10 | 166.666667 KSM | 2 Hours | 14 Days | 3 Hours | 10 Minutes | Linear Decreasing | Reciprocal |
    | 13 | Fellowship Admin | 10 | 166.666667 KSM | 2 Hours | 14 Days | 3 Hours | 10 Minutes | Linear Decreasing | Reciprocal |
    | 14 | General Admin | 10 | 166.666667 KSM | 2 Hours | 14 Days | 3 Hours | 10 Minutes | Reciprocal | Reciprocal |
    | 15 | Auction Admin | 10 | 166.666667 KSM | 2 Hours | 14 Days | 3 Hours | 10 Minutes | Reciprocal | Reciprocal |
    | 20 | Referendum Canceller | 1,000 | 333.333333 KSM | 2 Hours | 7 Days | 3 Hours | 10 Minutes | Linear Decreasing | Reciprocal |
    | 21 | Referendum Killer | 1,000 | 1,666.666667 KSM | 2 Hours | 14 Days | 3 Hours | 10 Minutes | Linear Decreasing | Reciprocal |
    | 30 | Small Tipper | 200 | 0.033333 KSM | 1 Minute | 7 Days | 10 Minutes | 1 Minute | Linear Decreasing | Reciprocal |
    | 31 | Big Tipper | 100 | 0.333333 KSM | 10 Minutes | 7 Days | 1 Hour | 10 Minutes | Linear Decreasing | Reciprocal |
    | 32 | Small Spender | 50 | 3.333333 KSM | 4 Hours | 14 Days | 12 Hours | 1 Day | Linear Decreasing | Reciprocal |
    | 33 | Medium Spender | 50 | 6.666667 KSM | 4 Hours | 14 Days | 1 Day | 1 Day | Linear Decreasing | Reciprocal |
    | 34 | Big Spender | 50 | 13.333333 KSM | 4 Hours | 14 Days | 2 Days | 1 Day | Linear Decreasing | Reciprocal |

!!!info
    For every referendum in each of these tracks, the Polkadot Developer Interface displays interactive graphs of the support and approval.
    ![UI Support and Approval](./../assets/governance/support-approval-polkadot-js-ui.png)


## Extrinsics and Tracks

!!!note
    You must submit the extrinsics in the table below using either the Root or a compatible OpenGov origin.


| Pallet                        | Extrinsic Function       | Required OpenGov Origin                                                                 |
|-------------------------------|--------------------------|---------------------------------------------------------------------------------|
| **Scheduler**                 | `schedule_named`         | `AuctionAdmin`, `Treasurer`                                            |
|                               | `schedule`              | `AuctionAdmin`, `Treasurer`                                            |
| **Treasury**                  | `reject_proposal`        | `Treasurer`                                                            |
|                               | `approve_proposal`       | `Treasurer`                                                            |
| **Election Provider Multi-Phase** | `submit_unsigned`    | `StakingAdmin`                                                         |
| **Nomination Pools**          | `set_metadata`           | `StakingAdmin`                                                         |
|                               | `update_roles`           | `StakingAdmin`                                                         |
| **Asset Rate**                | `create`                | `Treasurer`                                                            |
|                               | `remove`                | `Treasurer`                                                            |
|                               | `update`                | `Treasurer`                                                            |
| **Auctions**                  | `new_auction`           | `AuctionAdmin`                                                         |
| **Slots**                     | `force_lease`           | `LeaseAdmin`                                                           |
| **HRMP**                      | `open_channel`          | `GeneralAdmin`                                                         |
| **Dynamic Parameters**        | `set`                   | `DynamicParameterOrigin` (uses specific roles internally, e.g., `Treasurer`)   |
| **Staking**                   | `force_new_era`         | `StakingAdmin`                                                         |
|                               | `set_validator_count`   | `StakingAdmin`                                                         |

### Root

=== "Polkadot"

    The origin with the highest level of privileges. This track requires extremely high levels of approval and support for early passing. The prepare and enactment periods are also large. For instance, a referendum proposed in this track needs to amass 48.2% support (share of active issuance) by the end of the first day with over 93.5% approval to be considered to be part of the confirm period. The support curve drops linearly to 25% by the end of day 14 and almost to 0% by the end of day 28. This ensures that the token holders receive ample time to vote on the proposal during the decision period.

     ![](./../assets/polkadot-opengov-origins/root_origin_polkadot.png)

=== "Kusama"

    The origin with the highest level of privileges. This track requires extremely high levels of approval and support for early passing. The prepare and enactment periods are also large. For instance, a referendum proposed in this track needs to amass 46.4% support (share of active issuance) by the end of the first day with over 88.2% approval to be considered to be part of the confirm period. The support curve drops linearly to 25% by the end of day 7 and almost to 0% by the end of day 14. This ensures that the token holders receive ample time to vote on the proposal during the decision period.

     ![](./../assets/polkadot-opengov-origins/root_origin_kusama.png)

### Whitelisted Caller

=== "Polkadot"

    Origin commanded by the [Fellowship](../learn/learn-polkadot-technical-fellowship.md): the Fellowship whitelists the hash of a call, and the call can then be dispatched with the Root origin after the referendum passes. This track allows for a shorter voting turnaround, safe in the knowledge through an open and transparent process for time-critical proposals. For instance, a referendum proposed in this track needs to amass 20% support (much less than Root) by the end of the first day with over 94.2% approval to be considered to be part of the confirm period. **Note how no referendum on the Whitelisted track can ever pass with less than 5% support.**

    ![](./../assets/polkadot-opengov-origins/whitelisted_caller_polkadot.png)

=== "Kusama"

    Origin commanded by the [Fellowship](../learn/learn-polkadot-technical-fellowship.md): the Fellowship whitelists the hash of a call, and the call can then be dispatched with the Root origin after the referendum passes. This track allows for a shorter voting turnaround, safe in the knowledge through an open and transparent process for time-critical proposals. For instance, a referendum proposed in this track needs to amass 13.7% support (much less than Root) by the end of the first day with over 89.2% approval to be considered to be part of the confirm period. **Note how no referendum on the Whitelisted track can ever pass with less than 5% support.**

    ![](./../assets/polkadot-opengov-origins/whitelisted_caller_kusama.png)

### Wish For Change

The Wish For Change track serves as a medium for gathering consensus through OpenGov on a proposed
change to the network through an [on-chain remark](../general/glossary.md#remarks). This track was
added to ensure the Root track, which is typically utilized for handling one referendum at a time
due to the sensitive nature of Root calls, is not employed to convey network desires to various
bodies within the network. These remark statements could be voted on simultaneously because they
lack stateful logic impacting the network. They should not delay voting on proposals requiring Root
or be obligated to its queue. The approval/support criteria resemble Root, and passing items on this
track serves as a signal for a change without conferring privileges.

=== "Polkadot"

    ![](./../assets/polkadot-opengov-origins/wish_for_change_polkadot.png)

=== "Kusama"

    ![](./../assets/polkadot-opengov-origins/wish_for_change_kusama.png)

### Staking Admin

The origin for canceling [slashes](./learn-offenses.md). This origin has the privilege to execute
calls from the staking pallet and the Election Provider Multiphase Pallet.

=== "Polkadot"

    ![](./../assets/polkadot-opengov-origins/staking_admin_polkadot.png)

=== "Kusama"

    ![](./../assets/polkadot-opengov-origins/staking_admin_kusama.png)

### Treasurer

=== "Polkadot"

    The origin for spending funds from the treasury (up to 10M DOT). This origin has the privilege to execute calls from the Treasury pallet, and it is also the origin that sets and updates asset conversion rates in the Asset Rate pallet. Only two Treasurer referenda can be in their decision period at the same time.

    ![](./../assets/polkadot-opengov-origins/treasurer_polkadot.png)

=== "Kusama"

    The origin for spending funds from the treasury (up to 333333.33 KSM). This origin has the privilege
    to execute calls from the Treasury pallet.

    ![](./../assets/polkadot-opengov-origins/treasurer_kusama.png)

### Lease Admin

Origin can force slot leases. This origin has the privilege to execute calls from the Slots pallet.

=== "Polkadot"

    ![](./../assets/polkadot-opengov-origins/slot_admin_polkadot.png)

=== "Kusama"

    ![](./../assets/polkadot-opengov-origins/slot_admin_kusama.png)

### Fellowship Admin

The origin for managing the composition of the fellowship.

=== "Polkadot"

    ![](./../assets/polkadot-opengov-origins/fellowship_admin_polkadot.png)

=== "Kusama"

    ![](./../assets/polkadot-opengov-origins/fellowship_admin_kusama.png)

### General Admin

The origin managing the registrar and permissioned HRMP channel operations.

=== "Polkadot"

    ![](./../assets/polkadot-opengov-origins/general_admin_polkadot.png)

=== "Kusama"

    ![](./../assets/polkadot-opengov-origins/general_admin_kusama.png)

### Technical Maintenance

Polkadot only. The origin for technical maintenance of operational values across system pallets: quotas, allowances, limits, durations, anti-spam fees and similar settings. According to the runtime, changes on this track move no funds, set no monetary or market policy and do not change who controls what. It uses the same approval curve as Whitelisted Caller. Support starts at 50%, falls to 6% by the end of day 3 and never goes below 5%. The track was added in September 2026 ([polkadot-fellows/runtimes#1236](https://github.com/polkadot-fellows/runtimes/pull/1236)).

### Prosperity Emergency

Polkadot only. The origin intended to guard the monetary mechanisms around Prosperity (such as the PSM and related financial parameters) once they are wired to it, for example to operate circuit breakers like pausing the minting of a stable asset while keeping redemptions open. Wider administrative powers stay on stricter tracks until governance deliberately moves them here. It uses the same approval and support curves as Whitelisted Caller, with a 50,000 DOT decision deposit and a 3-hour confirm period. The track was added in September 2026 ([polkadot-fellows/runtimes#1236](https://github.com/polkadot-fellows/runtimes/pull/1236)).

### Referendum Canceller

The origin can cancel referenda. This track has a low lead time and approval/support curves with
slightly sharper reductions in their thresholds for passing.

=== "Polkadot"

    ![](./../assets/polkadot-opengov-origins/referendum_canceller_polkadot.png)

=== "Kusama"

    ![](./../assets/polkadot-opengov-origins/referendum_canceller_kusama.png)

### Referendum Killer

The origin can cancel an ongoing referendum and slash the deposits. This track also has a low
lead-time and approval/support curves with slightly sharper reductions in their thresholds for
passing.

=== "Polkadot"

    ![](./../assets/polkadot-opengov-origins/referendrum_killer_polkadot.png)

=== "Kusama"

    ![](./../assets/polkadot-opengov-origins/referendum_killer_kusama.png)

### Small Tipper

=== "Polkadot"

    Origin able to spend up to 250 DOT from the treasury at once.

    ![](./../assets/polkadot-opengov-origins/small_tipper_polkadot.png)

=== "Kusama"

    Origin able to spend up to 8.33 KSM from the treasury at once.

    ![](./../assets/polkadot-opengov-origins/small_tipper_kusama.png)

### Big Tipper

=== "Polkadot"

    Origin able to spend up to 1000 DOT from the treasury at once.

    ![](./../assets/polkadot-opengov-origins/big_tipper_polkadot.png)

=== "Kusama"

    Origin able to spend up to 33.33 KSM from the treasury at once.

    ![](./../assets/polkadot-opengov-origins/big_tipper_kusama.png)

### Small Spender

=== "Polkadot"

    Origin able to spend up to 10000 DOT from the treasury at once.

    ![](./../assets/polkadot-opengov-origins/small_spender_polkadot.png)

=== "Kusama"

    Origin able to spend up to 333.33 KSM from the treasury at once.

    ![](./../assets/polkadot-opengov-origins/small_spender_kusama.png)

### Medium Spender

=== "Polkadot"

    Origin able to spend up to 100000 DOT from the treasury at once.

    ![](./../assets/polkadot-opengov-origins/medium_spender_polkadot.png)

=== "Kusama"

    Origin able to spend up to 3333.33 KSM from the treasury at once.

    ![](./../assets/polkadot-opengov-origins/medium_spender_kusama.png)

### Big Spender

=== "Polkadot"

    Origin able to spend up to 1000000 DOT from the treasury at once.

    ![](./../assets/polkadot-opengov-origins/big_spender_polkadot.png)

=== "Kusama"

    Origin able to spend up to 33333.33 KSM from the treasury at once.

    ![](./../assets/polkadot-opengov-origins/big_spender_kusama.png)

!!!info "Spending assets other than DOT or KSM"
    The spend limits above are set in DOT (or KSM). When a referendum spends another asset, such as
    USDT or USDC, the amount is converted to DOT (or KSM) with the rate stored in the
    [Asset Rate pallet](./learn-polkadot-opengov-treasury.md#multi-asset-treasury-support), and the
    converted amount must fit the track's limit. The stored rate is set by governance and is not a
    market price, so the dollar value a track can spend depends on that rate. You can check the
    current rate under `assetRate.conversionRateToNative` on Asset Hub.
