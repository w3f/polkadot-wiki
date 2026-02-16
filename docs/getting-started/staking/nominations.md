---
title: Managing Nominations
description: Guides for managing nominations and nomination pools.
---

!!!info "Support Guides"
    For step-by-step guides on managing your nominations and nomination pools, visit the [Polkadot Support Portal](https://support.polkadot.network/support/solutions/65000066564).

See the [Nomination Pools](../../knowledge-base/nomination-pools.md) page to learn about how
nomination pools work.

## Pool Creation

You can create a pool using the
[Polkadot Staking Dashboard](../../build/solutions/staking-dashboard.md). The depositor sets the
administrative roles and transfers some funds to the pool to add themselves as the first member. The
depositor must always be a member as long as the pool exists; they will be the last member to leave,
ensuring they always have some skin in the game. A significant stake from the depositor is always a
good indicator of the pool's credibility.

The current minimum bond to create a pool can be found
[here](../../general/chain-state-values.md).

For detailed instructions, see:

- [Staking Dashboard: How to Create a Nomination Pool](https://support.polkadot.network/support/solutions/articles/65000182388-staking-dashboard-how-to-create-a-nomination-pool#How-to-create-a-pool)

## Pool Upkeep

The pool's nominator role can update the validator selection at any time. The root and bouncer can
update the pool's state to blocked and kick members by unbonding and withdrawing on their behalf.
The state can also be toggled back to open.

For detailed instructions on managing pool nominations, see:

- [Nomination Pool Features](https://support.polkadot.network/support/solutions/articles/65000182437)

## Pool Destruction

A pool can be pushed into the "destroying" state in one of two ways:

- The root or bouncer sets the pool to "destroying".
- Any account can set the pool to destroying if over 90% of the pool's active bonded balance has
  been [slashed](../../knowledge-base/offenses.md).

When a pool is in the "destroying" state, unbond and withdraw become permissionless, so anyone can
help all the members exit. The pool is destroyed once the depositor withdraws, no members belong to
the pool, and all the pool's resources are wiped from the state.

For detailed instructions, see:

- [Staking Dashboard: How to Destroy a Nomination Pool](https://support.polkadot.network/support/solutions/articles/65000182388-staking-dashboard-how-to-create-a-nomination-pool#How-to-destroy-a-pool)

## Claiming Rewards for Other Pool Members

As a pool member you can claim rewards for any other members who set their
[claim permissions](../../knowledge-base/nomination-pools.md#claim-permissions) to one of the
permissionless options.

For detailed instructions on claiming rewards for other pool members, see:

- [Staking Dashboard: Nomination Pool Guides](https://support.polkadot.network/support/solutions/folders/65000157523)
