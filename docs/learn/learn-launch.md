---
id: learn-launch
title: Polkadot Launch Phases
sidebar_label: Polkadot Launch Phases
description: An explanation of Polkadot's launch process and its individual phases.
keyword: [launch, phases, polkadot 2.0, DOT, claim, token sale]
slug: ../learn-launch
---

The Polkadot network has a phased roll-out plan, with important milestones toward decentralization
marking each phase. Keep up-to-date with the Polkadot's phased roll-out plan at by viewing the
[roadmap](https://polkadot.network/launch-roadmap/)

**Current Phase: Parachain Rollout**

:::info Claims

For the most update-to-date information on DOT claims (if you bought your DOTs before Polkadot went
live), checkout the following claiming resources and tutorials:

- [Why do I need to claim my DOT tokens and is there a deadline?](https://support.polkadot.network/support/solutions/articles/65000063553-why-do-i-need-to-claim-my-dot-tokens-and-is-there-a-deadline-)
- [I claimed my DOT before Polkadot went live, but still see zero balance!](https://support.polkadot.network/support/solutions/articles/65000063667-i-claimed-my-dot-before-polkadot-went-live-but-still-see-zero-balance-)
- [How to claim your DOT - Tutorial](https://support.polkadot.network/support/solutions/articles/65000138217-how-to-claim-your-dot-tutorial)
- [How do I know my claim worked?](https://support.polkadot.network/support/solutions/articles/65000103605-how-do-i-know-my-claim-worked-)

:::

## The PoA Launch

The Genesis block of the Polkadot network was launched on May 26, 2020, as a Proof of Authority
(PoA) network. Governance was restricted to the single Sudo (super-user) key, which was held by Web3
Foundation to issue the commands and upgrades necessary to complete the launch process. During this
time, validators started joining the network and signaling their intention to participate in
consensus.

## Nominated Proof of Stake

Once Web3 Foundation was confident in the stability of the network and there was a sufficient number
of validator intentions, Web3 Foundation used [Sudo](https://youtu.be/InekMjJpVdo) &mdash; a
superuser account with access to governance functions &mdash; to initiate the first validator
election. Following this election, the network transitioned from PoA into its second phase,
[Nominated Proof of Stake (NPoS)](learn-staking.md), on June 18, 2020.

## Governance

After the chain had been running well with the validator set, the Sudo key issued a runtime upgrade
that enabled the suite of governance modules in Polkadot; namely, the modules to enable a
[Council](learn-governance.md#council), a
[Technical Committee](learn-governance.md#technical-committee), and
[public referenda](learn-governance.md#public-referenda).

## Removal of Sudo

The Sudo module was removed by a runtime upgrade on July 20, 2020, transitioning the
[governance](learn-governance.md) of the chain into the hands of the token (DOT) holders.

From this point, the network has been entirely in the hands of the token holders and is no longer
under control of any centralized authority.

## Balance Transfers

To enable balance transfers, the community
[made a public proposal](../maintain/maintain-guides-democracy.md) for a runtime upgrade that lifted
the restriction on balance transfers. Transfer functionality was subsequently enabled on Polkadot at
block number 1_205_128 on August 18, 2020, at 16:39 UTC.

## Redenomination

On August 21, 2020, [redenomination](../general/redenomination.md) of DOT, the native token on
Polkadot, occurred. From this date, one DOT (old) equals 100 new DOT.

:::info Denomination Day

The DOT redenomination took place on 21 August 2020, known as Denomination Day, at block number
1_248_328.

:::

While [DOT](../learn/learn-DOT.md) is the unit of currency on Polkadot that most people use when
interacting with the system, the smallest unit of account is called the Planck. A Planck's relation
to DOT is like the relation of a Satoshi to Bitcoin. Before 21 August, the DOT was denominated as
1e12 Plancks, that is, twelve decimal places. After Denomination Day, DOT is denominated as 1e10
Plancks, as in, ten decimal places. DOT denominated to twelve decimal places is referred to as "DOT
(old)" and DOT denominated to ten decimal places is generally referred to as "DOT". When the
difference must be made explicit, the current ten-decimal-denominated DOT is referred to as "_New
DOT_".

:::note Redenomination Explainer

Check out our
[technical explainer video that explains more of Redenomination](https://www.youtube.com/watch?v=xXIcnBV4uUE&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=22&ab_channel=Polkadot).

:::

The change in denomination, henceforth referred to as the _redenomination_, was voted on by the
community of DOT holders. The community decided between four options, to change the DOT denomination
by a factor of ten, one hundred, one thousand, or not at all. The end result was to change the
denomination by a factor of one hundred.

The overall effect of this change was that the number of Polkadot's smallest unit, the Planck,
remained constant, while the DOT balance for all holders was increased by a factor of one hundred.
As one can see from the example below, the number of Plancks that a user has does not change, only
the number of Plancks that constitute a single DOT. A user with 1_000_000_000_000 Plancks still has
the same number of Plancks, but will have 100 DOT under the new denomination, as opposed to one DOT
under the old denomination.

```
   Before the change the decimal was here
   v
  1.000000000000 DOT

  100.0000000000 DOT
     ^
     After the change the decimal is here
```

:::note

There are no state changes with redenomination. There are no transfers. The real change regards the
social consensus around where to put the decimal place when we talk about what constitutes a DOT.

:::

### Origins

The initial vote for redenomination occurred as a
[referendum](https://kusama.polkassembly.io/referendum/52) on the Kusama blockchain. The referendum
was summarized as having four effects if approved by KSM holders.

:::info Referendum Summary

- The total allocations of DOT will increase one hundred times from 10 million to 1 billion.
- DOT allocation balances will increase by a factor of one hundred, such that 1 DOT will be 100 DOT.
- The distribution of DOT does not change, and holders of DOT still own an equal share of the
  network as before the change.
- The precision of DOT will change from 12 decimal places to 10 decimal places.
- The main benefit of this change is to avoid using small decimals when dealing with DOT and to
  achieve an easier calculation system.

:::

The initial referendum was proposed prior to the Polkadot genesis block under the assumption that
making a redenomination would be simpler before the Polkadot chain was live. However, many in the
community pointed out the disconnect of the two networks and how it was unfair for holders of DOT to
be impacted by a vote by a different token holder set. For this reason, Web3 Foundation
[decided to make a new vote on Polkadot](https://polkadot.network/results-of-dot-redenomination-referendum/)
when it went live, although the Kusama vote ended with a majority in favor of the redenomination
change.

Web3 Foundation summarized the decision not to change:

:::note

However, given the non-negligible amount of opposition, including from some within the ranks of Web3
Foundation and Parity, **the Foundation decided that we cannot, in good faith, sponsor the
redenomination.**

:::

### The Vote

After the genesis block of Polkadot was created and the network was running with a decentralized
community of validators securing the network, Web3 Foundation decided to put the redenomination
topic up to a vote again. This time, the vote was explicitly binding &mdash; meaning that it would
be executed if voted through. In comparison, the vote on Kusama was of course non-binding, being at
best a way to capture a signal without a direct way to affect the Polkadot chain.

Based on the feedback received during the Kusama referendum, the
[Polkadot vote](https://polkadot.network/the-first-polkadot-vote/) was held as an approval vote,
with four available options. DOT holders could issue votes for any configuration of the four
options: no change, a change of 10x, a change of 100x, or a change of 1000x. The vote logic was
contained in a specially-built Substrate pallet that was included in Polkadot's runtime for this
poll.

:::info Summary of the Vote

- Any combination of the four options may have been approved of by the voter. There was no need to
  only select one option.
- Approving of all or none of the options was equivalent and did not affect the outcome.
- All voters were able to alter their votes any number of times prior to the close of the poll.
- No discretionary lock-voting was in place; all DOT used to vote counts the same.
- Voting was made on a per-account basis; a single account must have voted the same way and was
  unable to split its vote.
- This vote did not affect any economics of the Polkadot platform. As in, staking rewards,
  inflation, effective market capitalization, and the underlying balances of every account remained
  completely unchanged. It was “merely” about what units the network uses to denominate the balances
  into “DOT”.

:::

With a voting period of two weeks set, the redenomination was now in the hands of the Polkadot
community for a final, binding decision.

### The Outcome

![redenomination](../assets/redenomination.png)

After two weeks of voting, the [results](https://polkadot.network/the-results-are-in/) of the
redenomination vote were tallied. About one third of the total DOT in the network participated in
the vote. The redenominaton proposal passed with 86% of the voters favoring a 100x factor increase
(or two decimal places of precision loss).

Polkadot's redenomination then took place on 21 August, now known as Denomination Day, at block
#1_248_328.

### What This Means for the Community

If you are a DOT holder or user of the network, then you do not need to take any action. The DOT
redenomination was a purely front-end change. You still hold the same amount of Plancks after the
change, but now it will appear that you hold 100x more DOT. This change applies proportionally to
every account.

### What This Means for Builders of Tools

If you are the builder of a tool that consumes the
[`@polkadot/api`](https://yarnpkg.com/package/@polkadot/api) package &mdash; then there should be no
real changes that need to be made in your application. The denomination is technically a cosmetic
change and every value is still a constant amount of Plancks.

However &mdash; if you are a builder of a tool that displays DOT balances to users (e.g. a wallet)
or handles DOT balances in an off-chain or custodial way, then you will need to ensure that you
display the correct denomination of DOT to users.

Please see our
[Ecosystem Redenomination Guide](https://docs.google.com/document/d/1yAzoDh99PgR_7dYAKTWLMVu2Fy5Ga-J6t9lof4f4JUw/edit#)
for recommendations.

Please reach out to [support@polkadot.network](mailto:support@polkadot.network) if you need any
assistance in making sure your software is compatible with the redenomination.

## Core Functionality

After 5 years of research and development, and a multi-stage launch that began in May of 2020,
Polkadot launch is completed on December 18, 2021, with all auction-winning parachains producing
blocks on the network.

Check out these resources for further information:

- [Polkadot Network blog](https://polkadot.network/blog/parachains-are-live-polkadot-launch-is-now-complete/).
- [Polkadot A to Z: L for Polkadot Launch](https://www.reddit.com/r/Polkadot/comments/s3yb3d/l_for_polkadot_launch_polkadot_a_to_z/).

## Polkadot 2.0

Researchers are in the midst of research for the next version of the Polkadot network. With many
questions yet to be answered, as of now, some big areas of research will be in:

- Economics and Networking (Zero-Knowledge): How will scalability work in Polkadot 2.0?
- Horizontal vs. Vertical scalability: What is the breaking point of the maximum number of
  parachains built with horizontal scalability?
- Nested Relay Chain: How can multiple Relay Chains exist connected through parachains? How many
  tiers of Relay Chains can be nested? How will validators work together to validate blocks on
  various Relay Chains? How does [XCM](learn-xcm.md) work in the nested setup? How is
  [AnV](learn-availability.md) going to work there?
