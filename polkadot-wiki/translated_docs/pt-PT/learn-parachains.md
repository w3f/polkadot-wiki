---
id: learn-parachains
title: Parachains
sidebar_label: Parachains
---

![One parachain](assets/network/one_parachain.png)

## What is a parachain?

A parachain is an application-specific data structure that is globally coherent and validatable by the validators of the Polkadot Relay Chain. Most commonly a parachain will take the form of a blockchain, but there is no specific need for them to be actual blockchains. They take their name from the concept of parallelized chains that run parallel to the Relay Chain. Due to their parallel nature, they are able to parallelize transaction processing and achieve scalability of the Polkadot system. They [share in the security](learn-security) of the entire Polkadot network and can communicate with other parachains through [XCMP](learn-xcm).

Parachains are maintained by a network maintainer known as a [collator](maintain-collator). The role of the collator node is to maintain a full-node of the parachain, retain all necessary information of the parachain, and produce new block candidates to pass to the Relay Chain validators for verification and inclusion in the shared state of Polkadot. The incentivization of a collator node is an implementation detail of the parachain (see [parachain economies](#parachain-economies)). They are not required to be staked on the Relay Chain or own DOT tokens unless stipulated to do so by the parachain implementation.

The Polkadot Host (PH) allows for the state transitions performed on parachains to be specified as a Wasm executable. Proofs of new state transitions that occur on a parachain must be validated against the registered state transition function (STF) that is stored on the Relay Chain by the validators before Polkadot acknowledges a state transition has occurred on a parachain. The only constraint to the logic that a parachain is allowed to implement is that it must be verifiable by the Relay Chain validators. Verification most commonly takes the form of a bundled proof of a state transition known as a Proof-of-Verification (PoV) block, which is submitted to the validators from one or more of the parachain collators to be checked.

## Parachain economies

Parachains may have their own economies with their own native tokens. Schemes such as Proof-of-Stake are usually used to select the validator set in order to handle validation and finalization; parachains will not be required to do either of those things. However, since Polkadot is general over what the parachain can implement, it may be the choice of the parachain to implement a staking token, but it's not generally necessary.

Collators may be incentivized through inflation of a native parachain token. There may be other ways to incentivize the collator nodes that do not involve inflating the native parachain token.

Transaction fees in a native parachain token can also be an implementation choice of parachains. Polkadot makes no hard and fast rules for how the parachains decide on original validity of transactions. For example, a parachain may be implemented so that transactions must pay a minimum fee to collators to be valid. The Relay Chain will enforce this validity. Similarly, a parachain could not include that in their implementation and Polkadot would still enforce its validity.

Parachains are not required to have their own token. If they do, is up to the parachain to make the economic case for their token, not Polkadot.

## Crowdfunding parachains

Polkadot allows for parachains to crowdfund their slots in a decentralized and safe way. The logic for this is handled in the [crowdfunding pallet](https://github.com/paritytech/polkadot/blob/master/runtime/common/src/crowdfund.rs).

During a parachain auction, anyone can create a new crowdfunding campaign for a parachain slot. When a campaign is created, the range of slots (i.e. the duration of the lease) is specified. Up to four slots, for a total time duration of roughly two years, can be selected. The creator of the crowdfund becomes the owner of the campaign, and can later upload the parachain's code. When creating a campaign, a crowdfunding "cap" is also specified. The crowdfund will refuse to accept funds after the cap has been reached.

Parachain campaigns may use caps when they are confident they will raise enough funds to reach the minimum amount needed for a raise but do not want to raise too much over this amount. As a simplified example, let's consider that the total supply of DOTs is 10 million. We can assume that 5 million DOTs are bonded in the staking subsystem since that is what is optimized by the rewards. We are left with a maximum of 5 million DOTs to use in parachain auctions. If there were only 4 slots up for an auction then we can calculate that 1.25 million is enough to win any one of them. A parachain might choose to place this as their cap, so that no single parachain can be oversubscribed.

Once a crowdfunding campaign is open, anyone can contribute by sending a special transaction and depositing funds. Funds that are used to contribute must be transferrable (that is, not locked) because they will be moved into a module controlled account that was generated uniquely for this campaign.

During some point of the crowdfund campaign the owner will upload the parachain data. Ideally, the owner does this before soliciting contributions to the campaign so that the contributors can verify it. The data can only be uploaded once during the course of the campaign and it will be what is deployed for the parachain. Of course, once the parachain is running it can always change via runtime upgrades (as determined through its own local governance).

If a crowdfunding campaign is successful, that parachain will be on-boarded as a parachain in Polkadot. The funds that contributed to it will be locked in that parachain's account for the entire duration that it is active (up to two years). On one hand, this means that the parachain can do reliable accounting of contributors and reward them with parachain tokens in their local economies. On the other hand, the DOTs that contributors used will be essentially taken out of circulation for that time and cannot be used to stake or vote.

At the end of the parachain's lifecycle, it will enter into a retirement phase. During this phase, contributors can begin to withdraw their locked DOTs. Contributors must withdraw their funds during the retirement phase, otherwise they will be sent to the treasury when that parachain is dissolved. Likewise, any parachain that started a campaign but was unsuccessful at acquiring a slot will have a timeout during which contributors can withdraw their funds. If funds are not withdrawn during the timeout, they are dissolved to the treasury.

## Examples

Some examples of parachains:

- **Encrypted Consortium Chains** - These are possibly private chains that do not leak any information to the public, but still can be interacted with trustlessly due to the nature of the XCMP protocol.
- **High Frequency Chains** - These are chains that can compute many transactions in a short amount of time by taking certain trade-offs or making optimizations.
- **Privacy Chains** - These are chains that do not leak any information to the public through use of novel cryptography.
- **Smart Contract Chains** - These are chains that can have additional logic implemented on them through the deployment of code known as _smart contracts_.

## FAQ

### What is "parachain consensus"?

"Parachain consensus" is special in that it will follow the Polkadot Relay Chain. Parachains cannot use other consensus algorithms that provide their own finality. Only sovereign chains (that must bridge to the Relay Chain via a parachain) can control their own consensus. Parachains have control over how blocks are authored and by whom.

### How will parachain slots be distributed?

Parachain slots will be acquirable through auction, please see the [parachain slots](learn-auction) article. Additionally, some parachain slots will be set aside to run [parathreads](learn-parathreads) - parathreads that bid on a per-block basis to be included in the Relay Chain.

### What happens to parachains when the number of validators drops below a certain threshold?

The minimal safe ratio of validator per parachain is 5:1. With a sufficiently large set of validators, the randomness of their distribution along with [availability and validity](learn-availability) will make sure security is on-par. However, should there be a big outage of a popular cloud provider or another network connectivity catastrophe, it is reasonable to expect that the number of validators per chain will drop.

Depending on how many validators went offline, the outcome differs.

If a few validators went offline, the parachains whose validator groups will be too small to validate a block will skip those blocks. Their block production speed will slow down to any increment of 6 seconds, until the situation is resolved and the optimal number of validators is in that parachain's validator group again.

If anywhere from 30% to 50% of the validators go offline, availability will suffer because we need two thirds of the validator set to back the parachain candidates. In other words, all parachains will stop until the situation is resolved. Finality will also stop, but low-value transactions on the relay chain should be safe enough to execute, despite common forks. Once the required number of validators is in the validator set again, parachains will resume block production.

Given that collators are full nodes of the relay chain and the parachain they are running, they will be able to recognize a disruption as soon as it occurs and should stop producing block candidates. Likewise, it should be easy for them to recongize when it's safe to restart block production - perhaps based on finality delay, validator set size, or some other factor that is yet to be decided within [Cumulus](https://github.com/paritytech/cumulus).

### Parachain Development Kits (PDKs)

Parachain Development Kits are a set of tools that enable developers to create their own applications as parachains. For more info see [here](build-pdk).

### Deploying parachains

Please see the builder's article on [deploying parachains](build-deploy-parachains).

## Resources

- [Polkadot: The Parachain](https://medium.com/polkadot-network/polkadot-the-parachain-3808040a769a) - Blog post by Polkadot co-founder Rob Habermeier that introduced parachains in 2017 as "a simpler form of blockchain, which attaches to the security provided by a Relay Chain rather than providing its own. The Relay Chain provides security to attached parachains, but also provides a guarantee of secure message-passing between them."
