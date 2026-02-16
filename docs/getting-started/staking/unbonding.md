---
title: Unbonding and Withdrawing Stake
description: Learn about the unbonding process, the unbonding period, and how to withdraw your staked tokens.
---

!!!info "Support Guides"
    For step-by-step guides on unbonding, visit the [Polkadot Support Portal](https://support.polkadot.network/support/solutions/65000066564).

## What is Unbonding?

Unbonding is the process of unlocking your staked DOT so that you can transfer or use them for other purposes. When you unbond your tokens, they enter an unbonding period during which they remain locked and do not earn staking rewards. After this period completes, you can withdraw the tokens to your free balance.

## Understanding the Unbonding Period

The unbonding period on Polkadot is **28 days** (7 days on Kusama). This is not arbitrary but serves critical security functions:

- **Safety Net for Slashing**: The unbonding period provides a window during which validators and their nominators can be held accountable for past misbehavior. Even after you initiate unbonding, you can still be slashed for offenses that occurred while you were staking.
- **Protection Against Attacks**: The period helps protect against long-range attacks by ensuring that there is enough time to detect and penalize malicious behavior before stake is fully withdrawn.
- **Network Security**: By requiring a waiting period, the network maintains stable security as stake cannot be quickly removed during critical moments.

!!!warning "No Rewards During Unbonding"
    Once you initiate unbonding, you will **not earn staking rewards** during the 28-day unbonding period. Your tokens are locked but not actively securing the network.

## How to Unbond

### Unbonding from Direct Nominations

If you are nominating validators directly, you can unbond all or part of your stake using the Staking Dashboard:

- **Unbond All Tokens**: Use the "Unstake" button to stop nominating and unbond your entire stake. After the 28-day period, you can withdraw all tokens.
- **Unbond Partial Tokens**: Use the minus ("-") button to unbond only a portion of your stake. Make sure your remaining bonded balance stays above the minimum nomination threshold (250 DOT on Polkadot).

For detailed instructions, see: **[Staking Dashboard: How to Unbond Your Tokens](https://support.polkadot.network/support/solutions/articles/65000182201-staking-dashboard-how-to-unbond-your-tokens)**

### Unbonding from Nomination Pools

If you are a member of a nomination pool, the unbonding process is similar:

- **Unbond**: Click the minus ("-") button to unbond a portion of your tokens while remaining in the pool.
- **Unstake**: Click the "Unstake" button to fully exit the pool and unbond all your tokens.
- **Withdraw**: After the 28-day unbonding period, click the unlock icon to withdraw your tokens to your free balance.

For detailed instructions, see: **[Staking Dashboard: How to Unbond from a Nomination Pool](https://support.polkadot.network/support/solutions/articles/65000182460-staking-dashboard-how-to-unbond-from-a-nomination-pool)**

## Important Considerations

- **Rebonding**: If you change your mind during the unbonding period, you can rebond your tokens and resume earning rewards. See [Staking Dashboard: How to Rebond Your Tokens](https://support.polkadot.network/support/solutions/articles/65000182221).
- **Minimum Bond Requirements**: When partially unbonding, ensure your remaining bonded balance stays above the minimum required for nomination (250 DOT on Polkadot, 0.1 KSM on Kusama).
- **Withdrawal**: After the unbonding period completes, you must submit a "Withdraw Unlocked" transaction to make your tokens transferable again. This does not happen automatically.

For more information about staking mechanics and the unbonding period, see the [Staking on Polkadot](../../knowledge-base/staking-advanced.md) page.
