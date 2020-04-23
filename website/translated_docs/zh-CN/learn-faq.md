---
id: learn-faq
title: Frequently Asked Questions (FAQs)
sidebar_label: Frequently Asked Questions (FAQs)
---

_常见问题主要针对有兴趣为 Polkadot 开发应用程序的用户提出的技术问题，如果您有更深入的问题，你可以通过搜索[ Polkadot 网络常见问题](https://polkadot.network/faq)中找到答案。如果您还有未解决的问题，请随时在 Polkadot Watercooler [ Riot 频道上提问](https://riot.im/app/#/room/#polkadot-watercooler:matrix.org)。 _

## Polkadot Launch

### What is the launch process of Polkadot Beta?

The Polkadot network will launch first as a Proof-of-Authority (PoA) chain. During this time, governance will be controlled by the single Sudo (super-user) account, and functionality will be restricted. Among other things, transfer of funds will not be enabled during this period.

During this time, validators can start joining the network and signaling their intention to participate in consensus. When a sufficient number of validators are sourced from the community, the Sudo account will initiate the transition of the chain security from PoA to Proof-of-Stake (PoS). After this happens, the first validator elections will begin, and from that time onward, the chain will be secured by the economic stake that is bonded by validators and nominators.

After the chain has been secured by the decentralized community of validators, the next step is to transition the governance of the chain into the hands of the token holders. The Sudo account will initiate an upgrade that erases the Sudo logic from the chain entirely and replaces it with the stakeholder governance modules. From this point, the network is entirely in the hands of the token holders and no longer under control of any centralized authority.

The final step to transition to full-functioning Polkadot is the enabling of transfer functionality. The community will need to propose a runtime upgrade and vote upon it in order to accomplish this. If the vote to enable transfers passes, then it will be enacted shortly thereafter. When this takes place, Polkadot will be fully live and move out of its Beta release label.

### How many validators will be validating at Polkadot Beta launch?

Initially only a few authorized validators will be securing the network. However, as [detailed in the answer above](#what-is-the-launch-process-of-polkadot-beta), the network will right away be available to validators that want to register their intention to validate. The transition to Proof-of-Stake will largely depend on when a sufficient number of validators have registered and are ready to take over the security of the network. This number can be as low as 50 but probably closer to 100.

The launch process is expected to be similar to that of the Kusama network. Kusama transitioned to PoS when there were 50 validators ready, but in a matter of months scaled up the validator count to 225. Polkadot's validator count is expected to scale up in a similar fashion.

## Validators

### How do I apply to be a validator?

There is no central authority that decides on validators, so there is not per se an _application_ that you can fill out. Registering as a validator is permissionless; in order to become one you must only set up a validator node and mark your intention to validate on chain. For detailed instruction on how to do this you can consult the [wiki guide](maintain-guides-how-to-validate-kusama.md) on validating for Kusama.

However, once you've set up a validator and have registered your intention it does not mean that you will be included in the _active set_ right away. The validators are elected to the active set based on the results of an election algorithm known as [Phragmen's method](learn-phragmen). Phragmen's method tries to accomplish two goals: 1) select `n` members from a larger set based on stake-weighted votes and 2) equalize the stake backing each validator as much as possible.

You will likely want to campaign your validator to the community in order to get more backing. You are looking for _nominators_ that will put up their tokens to increase the stake for your validator. For validators who cannot acquire the minimum stake from the community, Parity and Web3 Foundation also run a joint program called [Thousand Validators](https://thousand-validators.kusama.network/#/) that will nominate validators if they apply and fit the requirements.

### How are validators rewarded?

Validators are rewarded from the inflation of the Relay Chain, transaction fees, and tips. However, they only take a percentage of the former two. More details can be read on the page for [validator payouts](maintain-guides-validator-payout).

### What is the minimum stake necessary to be elected as an active validator?

The minimum stake that is necessary to be elected as an active validator is dynamic and can change over time. It depends not only on how much stake is being put behind each validator, but also the size of the active set and how many validators are waiting in the pool.

There are a few ways to estimate the minimum stake.

One way can be to navigate to the [Polkadot Apps](https://polkadot.js.org/apps) and click on the Staking tab. Scroll all the way down to the bottom and look at the stake backing the validator at the end of the list. That's roughly the minimum stake required to enter the active set at that era.

You can also use some tools some to perform estimations.

- [Offline Phragmen](https://github.com/kianenigma/offline-phragmen) can provide exact results of running an election on the current set of validators using the same Rust code that is ran in Polkadot.

- [Validator stats script](https://github.com/ansonla3/kusama-validator-stats) can give you an estimate that is based on the currently elected set, as well as some statistics about Kusama validators.

### Why will Polkadot have only 1000 validators while other projects have hundreds of thousands?

Polkadot's goal to have 1000 validators is set to be something that is practically achievable in the short term with high confidence of good performance in a live environment. Furthermore, validators in Polkadot are not the only stakers, and if we consider the number of stakers that can be possible on Polkadot the number can scale up to hundreds of thousands. Since validators are performing critical consensus work to maintain the security of the chain including all of its shards, a more modest number of validators is estimated to start. Upon later improvements, such as implementing signature aggregation for finalization messages, the number of validators could reasonably scale up. However, increasing validators above one thousand remains a goal for later iterations of Polkadot.

It is also worth mentioning that one thousand validators is more than the number of validators of similar PoS chains with comparable levels of economic security as Polkadot. The closest contenders are operating with around 150 validators, while Kusama is running with 225 securely as of April 2020.

Additionally, other projects sometimes have a different definition of _validator_ that approximates more closely to remote signing keys without the full operation of a validating node. On Polkadot, each validator is running their own validating node and performing full verification of the Relay Chain, voting on finality, producing blocks in their decided slots, and verifying parachain state transitions. Other projects may consider validators and "validating nodes" as separate entities.

## Relay Chain

### What is the expected block time on the Relay Chain?

The Kusama network, an early and unaudited release of the Polkadot code is currently operating at a rate of one block every six seconds.

We expect that Polkadot will target its block production rate to produce a block every six seconds. However, it is still subject to change. It may go as low as two to three seconds after optimizations, or it may potentially increase in order to handle the capacity of the parachain networking in a live environment.

### Does Polkadot have smart contracts?

No - and yes. The Polkadot Relay Chain does not implement smart contracts natively. The reason for not having smart contracts on the Relay Chain is party of the design philosophy for Polkadot that dictates that the Relay Chain should be the minimal logic required to accomplish its job.

However, Polkadot will be a platform for other chains that _do_ implement smart contracts. It's possible for parachains to enable smart contract functionality and then benefit from the security and interoperability features of Polkadot. Additionally, existing smart contract chains can connect to Polkadot as a parachain, or via a bridge.

While the Polkadot Relay Chain does not implement smart contracts directly, undoubtedly there will be parachains that do. So it's better to say that the Polkadot _ecosystem_ has smart contracts versus "Polkadot has smart contracts."

### How will the Polkadot Relay Chain connect to external chains in the ecosystem?

One of the cornerstone interoperability technologies being research and developed for deployment on Polkadot is cross-chain bridges. Bridges come in a variety of flavors with varying levels of trust associated with them. Polkadot is predominantly researching the trust-minimized flavor that imposes economic costs on the operators of the bridge, and therefore makes it economically secure. Bridge efforts are being worked on in concert with other projects in the ecosystem. Eventually, there will be bridges between Polkadot and most of the other major chains.

## DOTs

### What is the inflation rate of the DOT?

The inflation rate is 10% per year.

A portion of the inflation is rewarded to validators for performing their duties, while another portion may go directly to the treasury. The exact percentage that goes into both varies and is based on the amount of DOTs that are staked. Please see the article on [inflation](learn-staking#inflation) for more information.

### Can I buy or transfer DOT tokens?

Testnet DOT tokens are freely available from a variety of sources. See the [DOT page](learn-DOT) for details.

The Web3 Foundation will distribute up to 20% of mainnet DOTs prior to network launch (see [Light Paper](https://polkadot.network/Polkadot-lightpaper.pdf) or the [Polkadot Network FAQ](https://polkadot.network/faq/)).  Subscribe to the Polkadot newsletter on [polkadot.network](https://polkadot.network/) for further updates.

DOT tokens are not transferable until the launch of Polkadot Beta is complete. Any transfers of DOTs before that time are illegitimate and unauthorized. DOTs are currently represented on Ethereum as the DOT Indicator Token, these cannot be moved from the current allocation address. Individuals with an allocation of DOTs can always keep a copy of their private key, therefore it is extremely risky for individuals to participate in trading of DOTs before Polkadot launch.

## Governance

### What prevents Polkadot governance from failing?

Polkadot's governance has already been shown to work. Examples can be found in the runtime upgrades that have successfully taken place through on the testnets as well as in a real economic environment on [Kusama](kusama-index).

It is fair to say that the field of on-chain blockchain governance is still new, and no one can claim to know exactly what is the optimal version of on-chain governance yet. However, Polkadot takes a brave step forward in pioneering thought-through mechanisms for evolving a blockchain.

Blockchains need a method to adapt and evolve. Therefore, an on-chain governance system was necessary for the long-term success of Polkadot. Ultimately, it is the token holders that are responsible for preventing Polkadot's governance from failing by using their economic value and conviction to sway the progression of the protocol.

### What prevents Polkadot governance from becoming plutocratic?

A savvy reader might have noticed that the answer to the previous question endowed the token holder with the ultimate responsibility to ensure that Polkadot's governance does not fail. By following the train of this assertion, one might assume that Polkadot's governance is susceptible to becoming ruled by a few large token holders (called _whales_ in trading parlance) and therefore become a mere plutocracy (rule of the rich).

There are several other mechanisms that are built-in to the governance system to resist this plutocratic tendency. One of these mechanisms is called conviction voting, and imbues greater voting power to token holders who are willing to lock their tokens on the protocol for longer lengths of time. Longer lock-ups display _conviction_ in a vote. Conviction voting could allow a highly determined minority to overrule the vote of an apathetic majority in certain situations. Another mechanism is known as Adaptive Quorum Biasing.  This makes proposals have a varying threshold for approval or rejection based on what part of the governance protocol the proposal originated in. For details on the subtleties of Polkadot's governance system, please see the [governance page](learn-governance).

## Parachains

### How do parachain economics work?

Parachains have the flexibility to implement their own monetary system or incentive structure for collators. However, this is not strictly necessary. Since the collator's job is to continue to give recent state transitions to the validators on the relay chain who validate each transition, the security of the parachain and the Polkadot network is completely separate from parachain economics. Parachains need collators to continue to progress, so it wouldn't be unreasonable to see them incentivize collator nodes in some way but the specific mechanism is completely up to parachain implementers.

### Are parachains ephemeral? What happens when a parachain loses the next auction?

Parachains are not ephemeral. As long as someone is keeping the data for a parachain, the parachain can move between being a parachain, a parathread, or a separate sovereign chain at different points of its lifetime. Especially with parathreads, parachains can be decommissioned to only produce blocks when their usage and throughput makes it necessary.

When a parachain loses an auction for renewal, that parachain has a few options. In most cases, becoming a parathread instead would be a suitable choice. Parathreads are still secured by the Relay Chain, but don't need to hold a parachain slot and can produce a block when its economically feasible for them. For more on parachains please see the [parachains page](learn-parachains) and for more on parathreads see [the parathreads page](learn-parathreads).

## Networking

### What is libp2p?

[Libp2p](https://libp2p.io) is a modular and extensible networking stack that is used by IPFS, Substrate, and many other projects. It is a collection of peer-to-peer protocols for finding peers and connecting to them. Its modules have logic for content routing, peer routing, peer discovery, different transports, and NAT traversals. It is intended to be used by applications for building large scale peer-to-peer networks by only selecting the parts of the protocol suite that are needed.

The Rust implementation of the specification was built and primarily maintained by a team of contributors at Parity Technologies. The Go and JavaScript versions are maintained by Protocol Labs as well as community contributors. A [Nim](https://github.com/status-im/nim-libp2p) version of the library also exists. Libp2p as a whole is an open source project that is actively developed and expanded on various code repositories hosted on [GitHub](https://github.com/libp2p).

### Does Polkadot use libp2p?

Yes, since Polkadot is built with Substrate. Substrate uses a networking protocol that is based on libp2p (specifically the Rust libp2p library). However, Substrate uses a mix of standard libp2p protocols and protocols that are homegrown and not official libp2p standards. Of the standards protocols, those which are shared with other implementations of libp2p such as IPFS, are connection-checking (ping), asking for information on a peer (identity), and Kademlia random walks (kad).

Of the protocols that are custom to Substrate, there are the legacy Substrate stream, a request-response for getting information on blocks (sync), a light client protocol, a notification protocol for transactions, and block announcement. For detailed information on how Substrate uses libp2p and the standard and custom protocols, please see the [networking documentation](https://crates.parity.io/sc_network/index.html).

### How does libp2p differ from IPFS?

The \[Interplanetary Filesystem][ipfs\] (IPFS) is a peer-to-peer hypermedia protocol used primarily for storage of files. It allows one to upload a file onto the network and share it with its content addressable URI. IPFS, like Substrate, is an application of libp2p and exists higher on the technology stack. Although both IPFS and Substrate use libp2p, it cannot be said that Substrate "uses" IPFS since besides sharing the underlying library for networking there is no native integration between the two applications.

## Kusama

### What is the minimum amount of KSM I can have in my account?

We recommend users always keep at least 0.1 KSM in their account in order to avoid the reaping threshold of 0.01 KSM.  If you have less than 0.01 KSM in your account, that account will be "reaped" - it will be removed and no longer occupy space on the chain. In other words, no accounts are allowed on-chain with an account balance of less than 0.01 KSM.   This is a dust prevention measure, in order to ensure that the chain is not full of accounts with minuscule amounts of KSM taking up space. Since the blockchain is copied to every person running a full node, any savings of space provide dramatic benefits in terms of scalability.

### What are the transfer fees for Kusama?

It is important to note that the cost of transferring KSM is dynamic. Currently, the minimum cost of transferring KSM is 0.01 KSM (the base fee), although this can be changed via governance. However, actual transaction fees will vary based on a variety of factors. Specifically, fee calculation follows the following formula:

```
base_fee + (tx_length * length_fee) + WeightToFee(weight)
```

Please see the [fee calculation](https://substrate.dev/docs/en/next/development/module/fees#fee-calculatio) page in the Substrate documentation for more detailed information.


## Answered by Gav series

The "Answered by Gav" series is a collection of posts uploaded to Reddit of questions that have been asked in the Polkadot Watercooler Riot channel and answered by Polkadot founder Gavin Wood.

- [Reason for using asynchronous rather than synchronous communication? Difference in terms of TPS?](https://www.reddit.com/r/dot/comments/b87d96/answered_by_gav_reason_for_using_asynchronous/)
- [How exactly do validators in an ETH parachain keep moving around and how is communication between zones trustless?](https://www.reddit.com/r/dot/comments/b87awr/answered_by_gav_how_exactly_do_validators_in_an/)
- [What are the main issues with Bitcoin integration and will it ever be possible? Same problem with other POW chains? Is Polkadot only going to work with POS chains? How is it trust-less in comparison to Cosmos though?](https://www.reddit.com/r/dot/comments/b87bua/answered_by_gav_what_are_the_main_issues_with/)
- [What are the current thoughts around governance especially since projects have to be voted in to receive the parachains security?](https://www.reddit.com/r/dot/comments/b87cjz/answered_by_gav_what_are_the_current_thoughts/)
- [Also is there any detailed overview of how exactly a token transfer from ETH could be exchanged with another chain's currency?](https://www.reddit.com/r/dot/comments/b87ds8/answered_by_gav_also_is_there_any_detailed/)
- [Can I run multiple Validators with the same Session Key?](https://www.reddit.com/r/dot/comments/bcqrx9/answered_by_gav_can_i_run_multiple_validators/)
- [How to tackle the concentration risk of Validators in data centers?](https://www.reddit.com/r/dot/comments/bcqwit/answered_by_gav_how_to_tackle_the_concentration/)
