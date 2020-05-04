---
id: mirror-learn-treasury
title: Treasury
sidebar_label: Treasury
description: Details about Polkadot's on-chain treasury.
---

The treasury is a pot of funds collected through transaction fees, slashing, [staking inefficiencies](learn-staking#inflation), etc. The funds held in the treasury can be spent by making a spending proposal that, if approved by the council, will enter a waiting period before distribution. This waiting period is known as the budget period, and its duration is subject to [governance](learn-governance), with current defaults set to 24 days for Polkadot mainnet, and 6 days for Kusama. The treasury attempts to spend as many proposals in the queue as it can without running out of funds. If the treasury ends a budget period without spending all of its funds, it suffers a burn of a percentage of its funds -- thereby causing deflationary pressure. This percentage is currently at 0%.

When a stakeholder wishes to propose a spend from the treasury, they must reserve a deposit totaling 5% of the proposed spend (see below for variations). This deposit will be slashed if the proposal is rejected, and returned if the proposal was accepted.

提案可能包括 (但不限于):

- 基础架构部署
- 网络安全操作(监视服务，审核)。
- 生态系统发展(与友好链的合作)。
- 推广活动(广告，合作)。
- 社区活动(聚会，比萨派对，黑客空间)。
- 软件开发(钱包和钱包整合，客户端升级)。

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

- Many community members participate in discussion in the [Kusama Riot](https://riot.w3f.tech/#/room/#kusama:matrix.parity.io) chat.
- The [Kusama forum](https://forum.kusama.network) and [Polkadot forum](https://forum.polkadot.network) can be used for proposal explanations on Kusama and Polkadot respectively.
- The [KGP (Kusama Governance Proposals)](https://github.com/kusamanetwork/KGPs) repository is well suited for detailed issues about proposals on Kusama, with the added advantage of easy linkability across repositories and tagging team members.
- [Commonwealth.im](https://commonwealth.im) is a community site that allows users to log in with their KSM address and automatically reads proposals from the chain, turning them into discussion threads.

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

## Tipping

Next to the proposals process, a separate system for making tips exists for the treasury. Tips can be suggested by anyone and are supported by members of the council. Tips do not have any definite value, the final value of the tip is decided based on the median of all tips issued by the tippers.

Currently on Kusama, the tippers are the same as the members of the council. However, being a tipper is not direct responsibility of the council, and at some point the council and the tippers may be different groups of accounts.

To better understand the process a tip goes through until it is paid out, let's consider an example.

### Example

Bob has done something great for Kusama. Alice has noticed this and decides to report Bob as deserving a tip from the treasury. The council is composed of three members Charlie, Dave, and Eve.

Alice begins the process by issuing the `report_awesome` extrinsic. This extrinsic requires two arguments, a reason and the address to tip. Alice submits Bob's address with the reason being a UTF-8 encoded URL to post on [polkassembly](https://kusama.polkassembly.io) that explains her reasoning for why Bob is deserving.

Alice must also lock up a deposit for making this report. The deposit is the base deposit as set in the chain's parameter list plus the additional deposit per byte contained in the reason. This is why Alice submitted a URL as the reason instead of the explanation directly, it was cheaper for her to do so.

For her trouble, Alice is able to claim the eventual finder's fee if the tip is approved by the tippers.

Since the tipper group is the same as the council on Kusama, the council must now collectively (but also independently) decide on the value of the tip that Bob deserves.

Charlie, Dave, and Eve all review the report and make tips according to their personal valuation of the benefit Bob has provided to Kusama.

Charlie tips 100 KSM. Dave tips 300 KSM. Eve tips 1000 KSM.

The tip could have been closed out with only two of the three tippers. Once more than half of the tippers group have issued tip valuations the countdown to close the tip will begin. In this case, the third tipper issued their tip before the end of the closing period, so all three were able to make their tip valuations known.

Now the actual tip that will be paid out to Bob is the median of these tips, so Bob will be paid out 300 KSM from the treasury.

In order for Bob to be paid his tip, some account must call the `close_tip` extrinsic at the end of the closing period for the tip. This extrinsic may be called by anyone.

## FAQ

### What prevents the treasury from being captured by a majority of the council?

The majority of the council can decide the outcome of a treasury spend proposal. In an adversarial mindset, we may consider the possibility that the council may at some point go rogue and attempt to steal all of the treasury funds. It is a possibility that the treasury pot becomes so great, that a large financial incentive would present itself.

For one, the treasury has deflationary pressure due to the burn that is suffered every spend period. The burn aims to incentivize the complete spend of all treasury funds at every burn period, so ideally the treasury pot doesn't have time to accumulate mass amounts of wealth. However, it is the case that the burn on the treasury could be so little that it does not matter - as is the case currently on Kusama. On Kusama, the treasury burn is currently set to 0, meaning that no funds are burned.

However, it is the case on Kusama that the council is composed of mainly well-known members of the community. Remember, the council is voted in by the token holders, so they must do some campaigning or otherwise be recognized to earn votes. In the scenario of an attack, the council members would lose their social credibility. Furthermore, members of the council are usually externally motivated by the proper operation of the chain. This external motivation is either because they run businesses which depend on the chain, or they have direct financial gain (through their holdings) of the token value remaining steady.

Concretely there are a couple on-chain methods that resist this kind of attack. One, the council majority may not be the token majority of the chain. This means that the token majority could vote to replace the council if they attempted this attack - or even reverse the treasury spend. They would do this through a normal referendum. Two, there are time delays to treasury spends. They are only enacted every spend period. This means that there will be some time to observe this attack is taking place. The time delay then allows chain participants time to respond. The response may take the form of governance measures or - in the most extreme cases a liquidation of their holdings and a migration to a minority fork. However, the possibility of this scenario is quite low.

## Further Reading

 - [Substrate's Treasury Pallet](https://github.com/paritytech/substrate/blob/master/frame/treasury/src/lib.rs) - The Rust implementation of the treasury. ([Docs](https://substrate.dev/rustdocs/master/pallet_treasury/index.html))
 - [Gavin Wood's Kusama Rollout Plan](https://medium.com/@gavofyork/kusama-rollout-and-governance-31eb18041044) - Details the treasury in its first live environment on the Kusama network.
