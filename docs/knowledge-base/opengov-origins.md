---
title: Governance Origins
description: Detailed reference of Polkadot OpenGov origins, tracks, and their parameters.
---

This page details the specific parameters of Polkadot OpenGov origins and tracks. For a conceptual overview, see the [Knowledge Base article on OpenGov](../getting-started/governance/index.md).

## Origins and Tracks Info

=== "Polkadot"
    | ID  | Origin              | Max Deciding | Decision Deposit | Prepare Period | Decision Period | Confirm Period | Min Enactment Period | Min Approval         | Min Support          |
    |-----|---------------------|--------------|------------------|----------------|-----------------|----------------|----------------------|----------------------|----------------------|
    | 0   | Root                | 1            | 100000 DOT       | 2 Hours        | 28 Days         | 1 Day          | 1 Day                | Reciprocal           | Linear Decreasing    |
    | 1   | Whitelisted Caller  | 100          | 10000 DOT        | 30 Minutes     | 28 Days         | 10 Minutes     | 10 Minutes           | Reciprocal           | Reciprocal           |
    | 2   | Wish For Change     | 10           | 20000 DOT        | 2 Hours        | 28 Days         | 1 Day          | 10 Minutes           | Reciprocal           | Linear Decreasing    |
    | 10  | Staking Admin       | 10           | 5000 DOT         | 2 Hours        | 28 Days         | 3 Hours        | 10 Minutes           | Linear Decreasing    | Reciprocal           |
    | 11  | Treasurer           | 10           | 1000 DOT         | 2 Hours        | 28 Days         | 7 Days         | 1 Day                | Reciprocal           | Linear Decreasing    |
    | 12  | Lease Admin         | 10           | 5000 DOT         | 2 Hours        | 28 Days         | 3 Hours        | 10 Minutes           | Linear Decreasing    | Reciprocal           |
    | 13  | Fellowship Admin    | 10           | 5000 DOT         | 2 Hours        | 28 Days         | 3 Hours        | 10 Minutes           | Linear Decreasing    | Reciprocal           |
    | 14  | General Admin       | 10           | 5000 DOT         | 2 Hours        | 28 Days         | 3 Hours        | 10 Minutes           | Reciprocal           | Reciprocal           |
    | 15  | Auction Admin       | 10           | 5000 DOT         | 2 Hours        | 28 Days         | 3 Hours        | 10 Minutes           | Reciprocal           | Reciprocal           |
    | 20  | Referendum Canceller| 1,000        | 10000 DOT        | 2 Hours        | 7 Days          | 3 Hours        | 10 Minutes           | Linear Decreasing    | Reciprocal           |
    | 21  | Referendum Killer   | 1,000        | 50000 DOT        | 2 Hours        | 28 Days         | 3 Hours        | 10 Minutes           | Linear Decreasing    | Reciprocal           |
    | 30  | Small Tipper        | 200          | 1 DOT            | 1 Minutes      | 7 Days          | 10 Minutes     | 1 Minutes            | Linear Decreasing    | Reciprocal           |
    | 31  | Big Tipper          | 100          | 10 DOT           | 10 Minutes     | 7 Days          | 1 Hours        | 10 Minutes           | Linear Decreasing    | Reciprocal           |
    | 32  | Small Spender       | 50           | 100 DOT          | 4 Hours        | 28 Days         | 2 Days         | 1 Day                | Linear Decreasing    | Reciprocal           |
    | 33  | Medium Spender      | 50           | 200 DOT          | 4 Hours        | 28 Days         | 4 Days         | 1 Day                | Linear Decreasing    | Reciprocal           |
    | 34  | Big Spender         | 50           | 400 DOT          | 4 Hours        | 28 Days         | 7 Days         | 1 Day                | Linear Decreasing    | Reciprocal           |

=== "Kusama"
    | ID  | Origin              | Max Deciding | Decision Deposit | Prepare Period | Decision Period | Confirm Period | Min Enactment Period | Min Approval         | Min Support          |
    |-----|---------------------|--------------|------------------|----------------|-----------------|----------------|----------------------|----------------------|----------------------|
    | 0   | Root                | 1            | 3333.333333 KSM  | 2 Hours        | 14 Days         | 1 Day          | 1 Day                | Reciprocal           | Linear Decreasing    |
    | 1   | Whitelisted Caller  | 100          | 333.333333 KSM   | 30 Minutes     | 14 Days         | 10 Minutes     | 10 Minutes           | Reciprocal           | Reciprocal           |
    | 2   | Wish For Change     | 10           | 666.666667 KSM   | 2 Hours        | 14 Days         | 1 Day          | 10 Minutes           | Reciprocal           | Linear Decreasing    |
    | 10  | Staking Admin       | 10           | 166.666667 KSM   | 2 Hours        | 14 Days         | 3 Hours        | 10 Minutes           | Linear Decreasing    | Reciprocal           |
    | 11  | Treasurer           | 10           | 33.333333 KSM    | 2 Hours        | 14 Days         | 2 Days         | 1 Day                | Reciprocal           | Linear Decreasing    |
    | 12  | Lease Admin         | 10           | 166.666667 KSM   | 2 Hours        | 14 Days         | 3 Hours        | 10 Minutes           | Linear Decreasing    | Reciprocal           |
    | 13  | Fellowship Admin    | 10           | 166.666667 KSM   | 2 Hours        | 14 Days         | 3 Hours        | 10 Minutes           | Linear Decreasing    | Reciprocal           |
    | 14  | General Admin       | 10           | 166.666667 KSM   | 2 Hours        | 14 Days         | 3 Hours        | 10 Minutes           | Reciprocal           | Reciprocal           |
    | 15  | Auction Admin       | 10           | 166.666667 KSM   | 2 Hours        | 14 Days         | 3 Hours        | 10 Minutes           | Reciprocal           | Reciprocal           |
    | 20  | Referendum Canceller| 1,000        | 333.333333 KSM   | 2 Hours        | 7 Days          | 3 Hours        | 10 Minutes           | Linear Decreasing    | Reciprocal           |
    | 21  | Referendum Killer   | 1,000        | 1666.666667 KSM  | 2 Hours        | 14 Days         | 3 Hours        | 10 Minutes           | Linear Decreasing    | Reciprocal           |
    | 30  | Small Tipper        | 200          | 0.033333 KSM     | 1 Minutes      | 7 Days          | 10 Minutes     | 1 Minutes            | Linear Decreasing    | Reciprocal           |
    | 31  | Big Tipper          | 100          | 0.333333 KSM     | 10 Minutes     | 7 Days          | 1 Hours        | 10 Minutes           | Linear Decreasing    | Reciprocal           |
    | 32  | Small Spender       | 50           | 3.333333 KSM     | 4 Hours        | 14 Days         | 2 Days         | 1 Day                | Linear Decreasing    | Reciprocal           |
    | 33  | Medium Spender      | 50           | 6.666667 KSM     | 4 Hours        | 14 Days         | 4 Days         | 1 Day                | Linear Decreasing    | Reciprocal           |
    | 34  | Big Spender         | 50           | 13.333333 KSM    | 4 Hours        | 14 Days         | 7 Days         | 1 Day                | Linear Decreasing    | Reciprocal           |

## Extrinsics and Tracks

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

## Track Descriptions

### Root

=== "Polkadot"

    The origin with the highest level of privileges. This track requires extremely high levels of
    approval and support for early passing. The prepare and enactment periods are also large. For
    instance, a referendum proposed in this track needs to amass 48.2% support (total network issuance)
    by the end of the first day with over 93.5% approval to be considered to be part of the confirm
    period. The support curve drops linearly to 25% by the end of day 14 and almost to 0% by the end of
    day 28. This ensures that the token holders receive ample time to vote on the proposal during the
    decision period.

     ![](../assets/polkadot-opengov-origins/root_origin_polkadot.png)

=== "Kusama"

    The origin with the highest level of privileges. This track requires extremely high levels of
    approval and support for early passing. The prepare and enactment periods are also large. For
    instance, a referendum proposed in this track needs to amass 46.8% support (total network issuance)
    by the end of the first day with over 88% approval to be considered to be part of the confirm
    period. The support curve drops linearly to 25% by the end of day 7 and almost to 0% by the end of
    day 14. This ensures that the token holders receive ample time to vote on the proposal during the
    decision period.

     ![](../assets/polkadot-opengov-origins/root_origin_kusama.png)

### Whitelisted Caller

=== "Polkadot"

    Origin commanded by the [Fellowship](../technical-fellowship.md) whitelist some
    hash of a call and allow the call to be dispatched with the root origin (after the referendum
    passes). This track allows for a shorter voting turnaround, safe in the knowledge through an open
    and transparent process for time-critical proposals. For instance, a referendum proposed in this
    track needs to amass 20% :polkadot support (much lesser than the root) by the end of the first day
    with over 93.5% approval to be considered to be part of the confirm period. **Note how no referendum
    on the Whitelisted track can ever pass with less than 5% support.**

    ![](../assets/polkadot-opengov-origins/whitelisted_caller_polkadot.png)

=== "Kusama"

    Origin commanded by the [Fellowship](../technical-fellowship.md) whitelist some
    hash of a call and allow the call to be dispatched with the root origin (after the referendum
    passes). This track allows for a shorter voting turnaround, safe in the knowledge through an open
    and transparent process for time-critical proposals. For instance, a referendum proposed in this
    track needs to amass 14% support (much lesser than the root) by the end of the first day with over
    88% approval to be considered to be part of the confirm period. **Note how no referendum on the
    Whitelisted track can ever pass with less than 5% support.**

    ![](../assets/polkadot-opengov-origins/whitelisted_caller_kusama.png)

### Wish For Change

The Wish For Change track serves as a medium for gathering consensus through OpenGov on a proposed
change to the network through an [on-chain remark](glossary.md#remarks). This track was
added to ensure the Root track, which is typically utilized for handling one referendum at a time
due to the sensitive nature of Root calls, is not employed to convey network desires to various
bodies within the network. These remark statements could be voted on simultaneously because they
lack stateful logic impacting the network. They should not delay voting on proposals requiring Root
or be obligated to its queue. The approval/support criteria resemble Root, and passing items on this
track serves as a signal for a change without conferring privileges.

=== "Polkadot"

    ![](../assets/polkadot-opengov-origins/wish_for_change_polkadot.png)

=== "Kusama"

    ![](../assets/polkadot-opengov-origins/wish_for_change_kusama.png)

### Staking Admin

The origin for canceling slashes. This origin has the privilege to execute
calls from the staking pallet and the Election Provider Multiphase Pallet.

=== "Polkadot"

    ![](../assets/polkadot-opengov-origins/staking_admin_polkadot.png)

=== "Kusama"

    ![](../assets/polkadot-opengov-origins/staking_admin_kusama.png)

### Treasurer

=== "Polkadot"

    The origin for spending funds from the treasury (up to 10M DOT). This origin has the privilege to
    execute calls from the Treasury pallet.

    ![](../assets/polkadot-opengov-origins/treasurer_polkadot.png)

=== "Kusama"

    The origin for spending funds from the treasury (up to 333333.33 KSM). This origin has the privilege
    to execute calls from the Treasury pallet.

    ![](../assets/polkadot-opengov-origins/treasurer_kusama.png)

### Lease Admin

Origin can force slot leases. This origin has the privilege to execute calls from the Slots pallet.

=== "Polkadot"

    ![](../assets/polkadot-opengov-origins/slot_admin_polkadot.png)

=== "Kusama"

    ![](../assets/polkadot-opengov-origins/slot_admin_kusama.png)

### Fellowship Admin

The origin for managing the composition of the fellowship.

=== "Polkadot"

    ![](../assets/polkadot-opengov-origins/fellowship_admin_polkadot.png)

=== "Kusama"

    ![](../assets/polkadot-opengov-origins/fellowship_admin_kusama.png)

### General Admin

The origin managing the registrar and permissioned HRMP channel operations.

=== "Polkadot"

    ![](../assets/polkadot-opengov-origins/general_admin_polkadot.png)

=== "Kusama"

    ![](../assets/polkadot-opengov-origins/general_admin_kusama.png)

### Referendum Canceller

The origin can cancel referenda. This track has a low lead time and approval/support curves with
slightly sharper reductions in their thresholds for passing.

=== "Polkadot"

    ![](../assets/polkadot-opengov-origins/referendum_canceller_polkadot.png)

=== "Kusama"

    ![](../assets/polkadot-opengov-origins/referendum_canceller_kusama.png)

### Referendum Killer

The origin can cancel an ongoing referendum and slash the deposits. This track also has a low
lead-time and approval/support curves with slightly sharper reductions in their thresholds for
passing.

=== "Polkadot"

    ![](../assets/polkadot-opengov-origins/referendrum_killer_polkadot.png)

=== "Kusama"

    ![](../assets/polkadot-opengov-origins/referendum_killer_kusama.png)

### Small Tipper

=== "Polkadot"

    Origin able to spend up to 250 DOT from the treasury at once.

    ![](../assets/polkadot-opengov-origins/small_tipper_polkadot.png)

=== "Kusama"

    Origin able to spend up to 8.25 KSM from the treasury at once.

    ![](../assets/polkadot-opengov-origins/small_tipper_kusama.png)

### Big Tipper

=== "Polkadot"

    Origin able to spend up to 1000 DOT from the treasury at once.

    ![](../assets/polkadot-opengov-origins/big_tipper_polkadot.png)

=== "Kusama"

    Origin able to spend up to 33.33 KSM from the treasury at once.

    ![](../assets/polkadot-opengov-origins/big_tipper_kusama.png)

### Small Spender

=== "Polkadot"

    Origin able to spend up to 10000 DOT from the treasury at once.

    ![](../assets/polkadot-opengov-origins/small_spender_polkadot.png)

=== "Kusama"

    Origin able to spend up to 333.33 KSM from the treasury at once.

    ![](../assets/polkadot-opengov-origins/small_spender_kusama.png)

### Medium Spender

=== "Polkadot"

    Origin able to spend up to 100000 DOT from the treasury at once.

    ![](../assets/polkadot-opengov-origins/medium_spender_polkadot.png)

=== "Kusama"

    Origin able to spend up to 3333.33 KSM from the treasury at once.

    ![](../assets/polkadot-opengov-origins/medium_spender_kusama.png)

### Big Spender

=== "Polkadot"

    Origin able to spend up to 1000000 DOT from the treasury at once.

    ![](../assets/polkadot-opengov-origins/big_spender_polkadot.png)

=== "Kusama"

    Origin able to spend up to 33333.33 KSM from the treasury at once.

    ![](../assets/polkadot-opengov-origins/big_spender_kusama.png)
