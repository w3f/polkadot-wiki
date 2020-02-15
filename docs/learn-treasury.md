---
id: learn-treasury
title: Treasury
sidebar_label: Treasury
description: Details about Polkadot's on-chain treasury.
---

The treasury is a pot of funds collected through transaction fees, slashing, [staking inefficiencies](learn-staking#inflation), etc. The funds held in the treasury can be spent by making a spending proposal that, if approved by the council, will enter a waiting period before distribution. This waiting period is known as the budget period, and its duration is subject to [governance](learn-governance), with current defaults set to 24 days for Polkadot mainnet, and 6 days for Kusama. The treasury attempts to spend as many proposals in the queue as it can without running out of funds. If the treasury ends a budget period without spending all of its funds, it suffers a burn of a percentage of its funds -- thereby causing deflationary pressure. This percentage is currently at 0%.

When a stakeholder wishes to propose a spend from the treasury, they must reserve a deposit totaling 5% of the proposed spend (see below for variations). This deposit will be slashed if the proposal is rejected, and returned if the proposal was accepted.

Proposals may consist of (but are not limited to):

- Infrastructure deployment and continued operation.
- Network security operations (monitoring services, continuous auditing).
- Ecosystem provisions (collaborations with friendly chains).
- Marketing activities (advertising, paid features, collaborations).
- Community events and outreach (meetups, pizza parties, hackerspaces).
- Software development (wallets and wallet integration, clients and client upgrades).

The treasury is ultimately controlled by the council, and how the funds will be spent is up to their judgment.

## Funding the Treasury

The Treasury is funded from different sources:

1. Slashing: When a validator is slashed for any reason, the slashed amount is sent to the Treasury with a reward going to the entity that reported the validator (another validator or fisherman). The reward is taken from the slash amount and varies per offence and number of reporters.
2. Transaction fees: A portion of each block's transaction fees goes to the Treasury, with the remainder going to the block author.
3. Staking inefficiency: [Inflation](learn-staking#inflation) is designed to be 10% in the first year, and the ideal staking ratio is set at 50%, meaning half of all tokens should be locked in staking. Any deviation from this ratio will cause a proportional amount of the inflation to go to the Treasury. In other words, if 50% of all tokens are staked, then 100% of the inflation goes to the validators as reward. If the staking rate is greater than or less than 50%, then the validators will receive less, with the remainder going to the Treasury.
4. Parathreads: [Parathreads](learn-parathreads) participate in a per-block auction for block inclusion. Part of this bid goes to the validator that accepts the block and the remainder goes to the Treasury.

## Creating a Treasury Proposal

The proposer has to deposit 5% of the requested amount or 20 KSM (whichever is higher) as an anti-spam measure. This amount is burned if the proposal is rejected, or refunded otherwise. These values are subject to [governance](learn-governance) so they may change in the future.

### Announcing the Proposal

To minimize storage on chain, proposals don't contain contextual information. When a user submits a proposal, they will probably need to find an off-chain way to explain the proposal. Most discussion takes place on the following platforms:

- [Commonwealth.im](https://commonwealth.im) is a community site that allows users to log in with their KSM address and automatically reads proposals from the chain, turning them into discussion threads.
- The [Kusama forum](https://forum.kusama.network) and [Polkadot forum](https://forum.polkadot.network) can be used for proposal explanations on Kusama and Polkadot respectively.
- The [KGP (Kusama Governance Proposals)](https://github.com/kusamanetwork/KGPs) repository is well suited for detailed issues about proposals on Kusama, with the added advantage of easy linkability across repositories and tagging team members.
- Many community members participate in discussion in the [Kusama Riot](https://riot.w3f.tech/#/room/#kusama:matrix.parity.io) chat.

Spreading the word about the proposal's explanation is ultimately up to the proposer - the recommended way is using official Riot channels like the [Kusama Direction room](https://riot.w3f.tech/#/room/#kusama:matrix.parity.io) or the [Kusama Watercooler](https://riot.w3f.tech/#/room/#kusamawatercooler:polkadot.builders). For Polkadot, you may want to frequent the [Polkadot Watercooler](https://riot.w3f.tech/#/room/#polkadot-watercooler:matrix.org).

### Creating the Proposal

One way to create the proposal is to use the Polkadot JS Apps [website](https://polkadot.js.org/apps). From the website, use either the [extrinsics tab](https://polkadot.js.org/apps/#/extrinsics) and select the Treasury pallet, then `proposeSpend` and enter the desired amount and recipient, or use the [Treasury tab](https://polkadot.js.org/apps/#/treasury) and its dedicated Submit Proposal button:

![An example of a proposal being created](/img/treasury/propose.jpg)

The system will automatically take the required deposit, picking the higher of the following two values: 20 KSM or 5% of the requested amount.

Once created, your proposal will become visible in the Treasury screen and the council can start voting on it.

![A pending proposal](/img/treasury/proposal.jpg)

Remember that the proposal has no metadata, so it's up to the proposer to create a description and purpose that the council could study and base their votes on.

At this point, a Council member can turn this proposal into a motion to accept, or a motion to reject. It is possible (but unlikely) that a motion for both acceptance and rejection is created. After being turned into a council motion, the proposal needs 51% of the council to approve it to pass, or 51% to reject it to fail. If majority is not reached, the proposal remains in limbo - neither accepted nor rejected until more council members weigh in.

![Motion in action](/img/treasury/motion.jpg)

## Further Reading

 - [Substrate's Treasury Pallet](https://github.com/paritytech/substrate/blob/master/frame/treasury/src/lib.rs) - The Rust implementation of the treasury. ([Docs](https://substrate.dev/rustdocs/master/pallet_treasury/index.html))
 - [Gavin Wood's Kusama Rollout Plan](https://medium.com/@gavofyork/kusama-rollout-and-governance-31eb18041044) - Details the treasury in its first live environment on the Kusama network.
