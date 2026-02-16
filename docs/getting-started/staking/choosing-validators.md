---
title: Choosing Reliable Validators
description: Learn how to select the right validators to maximize rewards and minimize risks.
---

!!!info "Support Guides"
    For step-by-step nominator guides, visit the [Polkadot Support Portal](https://support.polkadot.network/support/solutions/65000066564).

!!!info "Video Tutorials"
    - [How to Nominate/Stake](https://youtu.be/FCXC0CDhyS4?t=219)
    - [Staking with a Ledger device and Polkadot-JS](https://youtu.be/7VlTncHCGPc)
    - [Staking with a Ledger device and Ledger Live](https://www.youtube.com/watch?v=jL-N_IWiYVA)

## Why Validator Selection Matters

Validators are the heart of the Polkadot network. They produce blocks, validate transactions, and
secure the chain. As a nominator, you are not just "voting" for them; you are trusting them with your
tokens.

-   **Maximize Rewards:** Good validators start online, produce blocks without issues, and pay out rewards regularly.
-   **Minimize Risks:** If a validator misbehaves (e.g., goes offline for too long or attacks the network), they can be [slashed](../../knowledge-base/offenses.md), meaning you lose a portion of your bonded tokens.

You should refrain from just choosing the validator with the highest yield or the lowest commission.
Validators with very low commission might not be profitable enough to maintain reliable
infrastructure, and those with suspiciously high yields might be risky.

## Key Criteria for Selection

When browsing validators on a dashboard (like the [Staking Dashboard](https://staking.polkadot.cloud)
or explorers), look for the following signals of quality:

### Verified Identity
Validators can set an on-chain identity (name, website, twitter, etc.) and have it verified by a
registrar. A verified identity (often shown with a green checkmark) indicates the operator is willing
to reveal who they are and build a reputation.

-   **Look for:** Validators with a verified identity and contact info.
-   **Avoid:** Anonymous validators with random strings of characters as names, unless you know them personally.

### Skin in the Game (Self-Stake)
Validators can bond their own tokens to their node. This is called "self-stake" or "own stake".

-   **Look for:** Validators who have a significant amount of their own tokens at stake. This aligns their incentives with yours—if they get slashed, they lose their own money too.
-   **Note:** Some reputable validators may have low self-stake if they are run by community trusted entities, but high self-stake is generally a positive signal.

### Commission Rates
Validators charge a commission fee on the block rewards before splitting the rest among nominators.

-   **Fair Range:** Typical commissions range from 1% to 10%.
-   **100% Commission:** Some validators set 100% commission. This means they keep **all** rewards. These are usually private validators run by exchanges or institutions for their own funds. **Do not nominate these** unless you know what you are doing, as you will get zero rewards.
-   **0% Commission:** While attractive, 0% commission is often a marketing tactic to attract stake. It may be sustainable for a short time, but ensure the validator has a plan to cover their server costs in the long run.

### Era Points (Performance)
Validators earn "ERA points" for payable actions like producing blocks.

-   **Look for:** Consistent era points relative to other validators.
-   **Avoid:** Validators with consistently low era points, which may indicate poor network connectivity or hardware issues.

### Decentralization
To keep the network secure, stake should be distributed across many different operators, hosting providers, and geographies.

-   **Look for:** Independent operators who run their own hardware.
-   **Avoid:** nominating only validators from a single large operator (e.g., "ExchangeNode 01", "ExchangeNode 02", etc.). If that operator has a systematic failure, all their nodes might get slashed simultaneously, increasing your potential losses.

### Oversubscription
Only the top 512 nominators (by stake) for a given validator receive rewards. This is called the "oversubscription" limit.

-   **Check:** If a validator has thousands of nominators, ensure your stake is large enough to be in the top 512. If you have a small amount of DOT, consider joining a [Nomination Pool](./nominations.md) instead, which acts as a single large nominator.

## Bonding and Nominating

Once you have selected your validators (it is recommended to choose typically up to 16 to maximize your chances of always having an active validator), follow these guides:

- [How to Bond Tokens and Nominate](https://support.polkadot.network/support/solutions/articles/65000168057-polkadot-js-ui-how-do-i-stake-nominate-on-polkadot-)
- [How to Select Validators](https://support.polkadot.network/support/solutions/articles/65000150130-how-do-i-know-which-validators-to-choose-)

## Managing Your Nominations

Staking is not a "set it and forget it" activity. You should periodically monitor your validators.

-   **Check Rewards:** Are you receiving rewards daily? If not, one of your validators might be offline or you might be outbid in the active set.
-   **Check Events:** Look for "Chilled" events, which might mean a validator decided to stop validating or was kicked out for poor performance.
-   **Stop Nominating:** If you need to stop, you must unbond your tokens. This starts a [unbonding period](../../general/chain-state-values.md) (28 days on Polkadot) before they are liquid.

- [How to Stop Nominating & Unbond Tokens](https://support.polkadot.network/support/solutions/articles/65000167902-how-can-i-unstake-my-tokens-again-)
- [How to Rebond Tokens](https://support.polkadot.network/support/solutions/articles/65000170241-polkadot-js-ui-how-to-rebond-tokens-during-the-unbonding-period)

## Claiming Rewards

Anyone can trigger a payout for any validator, as long as they are willing to pay the transaction
fee. Someone must submit a transaction with a validator ID and an era index. Polkadot will
automatically calculate that validator's reward and distribute the rewards pro rata.

- [How to Claim Staking Rewards](https://support.polkadot.network/support/solutions/articles/65000168954-how-can-i-see-my-staking-rewards-)

## Using Command-Line Interface (CLI)

<!-- TODO: Find or create a support article for CLI staking, or move this to a reference page -->

Apart from using a dashboard or wallet UI to participate in staking, you can interact with the
network using the CLI via `@polkadot/api-cli`. For details on setting up the CLI and bonding,
nominating, and claiming rewards, refer to
[Polkadot SDK documentation](https://docs.polkadot.com/develop/toolkit/api-libraries/).
