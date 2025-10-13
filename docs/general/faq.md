---
title: Frequently Asked Questions (FAQs)
description: Find answers to common questions about Polkadot and its ecosystem.
---

!!!info
    This FAQ focuses on technically oriented questions for users interested in certain aspects of
    Polkadot. If you have a more general question related to usage, you may search for the answer on our support
    [Knowledge Base](https://support.polkadot.network/support/home) or the main
    [Polkadot network FAQ](https://polkadot.network/faq).


!!!info "JAM FAQ"
    For questions regarding JAM and its relation to Polkadot, visit the [JAM FAQ](../learn/learn-jam-faq.md)


## Polkadot

### What is the minimum amount of KSM / DOT I can have in my account?

Please see information about [Existential Deposits](../learn/learn-accounts.md#existential-deposit-and-reaping).

### Polkadot Roadmap

For more information on the Polkadot roadmap please visit the
[official Polkadot website](https://www.opengov.watch/polkadot-roadmap).

### Polkadot Launch

The Genesis block of the Polkadot network was produced on May 26, 2020 at 15:36:21 UTC, as a Proof
of Authority (PoA) network, with governance controlled by the single Sudo (super-user) account.
During this time, validators started joining the network and signaling their intention to
participate in consensus.

The network evolved to become a Proof of Stake (PoS) network on June 18, 2020. With the chain
secured by the decentralized community of validators, the Sudo module was removed on July 20, 2020,
transitioning the governance of the chain into the hands of the token (DOT) holders. This is the
point where Polkadot became decentralized.

The final step of the transition to full-functioning Polkadot was the enabling of transfer
functionality, which occurred on Polkadot at block number 1_205_128 on August 18, 2020, at 16:39
UTC.

On August 21, 2020, Redenomination of DOT occurred. From this date, one DOT (old) equals 100 new
DOT.

### Why Polkadot targets 1000 validators while other projects have hundreds of thousands?

Polkadot's goal to have 1000 validators is set to be something that is practically achievable with high confidence of good performance in a live environment. Furthermore, validators in Polkadot are not the only stakers, and if we consider the number of stakers that can be possible on Polkadot the number can scale up to hundreds of thousands.  Upon improvements, such as implementing signature aggregation for finalization messages, the number of validators can reasonably scale up.

Additionally, other projects sometimes have a different definition of _validator_ that approximates more closely to remote signing keys without the full operation of a validating node. On Polkadot, each validator runs their own validating node and verifies the relay chain, voting on finality, producing blocks in their decided slots, and verifying parachain state transitions. Other projects may consider validators and "validating nodes" as separate entities.

Finally, individuals may participate in the block production process indirectly by
[nominating](../learn/learn-nominator.md) validators. In this way, individuals who are not running a
node can still share in staking rewards.

### What is the block time of the relay chain?

Both the Kusama and Polkadot networks are operating at a rate of one block every six
seconds.

### Does Polkadot support smart contracts?

Polkadot will support Solidity smart contracts by late 2025. Smart contracts deployment is already possible on Kusama and testnets. There are also numerous parachains that support EVM and Wasm smart contracts.
 It's possible for parachains to enable smart contract functionality and then
benefit from the security and interoperability features of Polkadot. Additionally, existing smart
contract chains can connect to Polkadot as a parachain, or via a bridge.

### How does the Polkadot relay chain connect to external chains in the ecosystem?

One of the cornerstone interoperability technologies being researched and developed for deployment
on Polkadot is cross-chain [bridges](../learn/learn-bridges.md). Bridges come in a variety of
flavors with varying levels of trust associated with them. Polkadot is predominantly researching the
trust-minimized flavor that imposes economic costs on the operators of the bridge, and therefore
makes it economically secure. Bridge efforts are being worked on in concert with other projects in
the ecosystem.

### What is Polkadot's Transactions Per Second (TPS)?

Polkadot is a heterogeneous sharded network comprising a relay chain and numerous parachains, which
are all individual blockchains built on [Substrate](https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk/#substrate) executing in parallel.
Hence, the Transactions Per Second (TPS) of Polkadot is a number that encompasses all the
transactions on the relay chain as well as parachains. As the transactions on these Substrate-based
blockchains are [weights based](https://docs.polkadot.com/polkadot-protocol/basics/blocks-transactions-fees/fees/#transactions-weights-and-fees), it makes sense to
use TPS as a measure for the network performance if all the transactions carry the same weight.
A performance benchmark test performed in 2024 (dubbed ["The Spammening"](https://polkadot.com/spammening/)) demonstrated that Polkadot is capable of at least 623,000 TPS. The test delivered 143,000 TPS when utilizing only 23% of network cores on Kusama, Polkadot's live sister network that shares its codebase.

It is essential to realize that TPS is inherently a subjective measurement with numerous factors
that can contribute to it. It's hard to gauge the usefulness of TPS in isolation (when compared to
other chains), as it depends on what a transaction does for a particular network. To view how
Polkadot measures TPS see the Polkadot sTPS
([Standard Transaction Per Second](https://github.com/paritytech/polkadot-stps/blob/main/docs/introduction.md))
to consider precisely how benchmarking was performed for Polkadot.

### What is the inflation rate of the DOT?

The inflation rate is approximately 120,000,000 DOT per year.

The 85% of inflation is rewarded to validators for performing their duties, while the 15% goes to
the treasury. Please see the article on [inflation](../learn/learn-DOT.md#dot-inflation) for more
information.

### Transfer Fees

It is important to note that the cost of transferring DOT is dynamic. Specifically, fee calculation follows
the following formula:

```
base_fee + (tx_length * length_fee) + WeightToFee(weight)
```

The base fee for Polkadot is 0.001 DOT.

Please see the
[fee calculation](https://docs.polkadot.com/polkadot-protocol/basics/blocks-transactions-fees/fees/#how-fees-are-calculated) page in
the Polkadot Developer documentation for more detailed information.

## Consensus

### Why do we need Consensus?

Consensus is a method for coming to agreement over a shared state. In order for the state of the
blockchain to continue to build and move forward, all nodes in the network must agree and come to
consensus. It is the way that the nodes in a decentralized network are able to stay synced with each
other. Without consensus for the decentralized network of nodes in a blockchain, there is no way to
ensure that the state one node believes is true will be shared by the other nodes. Consensus aims to
provide the _objective_ view of the state amid participants who each have their own _subjective_
views of the network. It is the process by which these nodes communicate and come to agreement, and
are able to build new blocks.

### What are PoW and PoS?

Proof of Work (PoW) and Proof of Stake (PoS) have been inaccurately used as short hand to refer to
consensus mechanisms of blockchains, but that does not capture the full picture. PoW is the method
for agreeing on a block author and part of the fuller
[Nakamoto consensus](../learn/learn-consensus.md#nakamoto-consensus) that also encompasses a chain
selection algorithm (longest chain rule in Bitcoin). Similarly, PoS is a set of rules for selecting
the validator set and does not specify a chain selection rule or how a chain might reach finality.
PoS algorithms have traditionally been paired with an algorithm for coming to Byzantine agreement
between nodes. For example, [Tendermint](../learn/learn-comparisons-cosmos.md) is a practical
Byzantine fault tolerant algorithm that uses PoS as its validator set selection method.

### Why not Proof of Work?

Although simple and effective in coming to a decentralized consensus on the next block producer,
proof of work with Nakamoto consensus consumes an incredible amount of energy, has no economic or
provable finality, and has no effective strategy in resisting cartels.

## Validators

### How do I apply to be a validator?

There is no central authority that decides on validators, so there is not per se an _application_
that you can fill out. Registering as a validator is permissionless; in order to become one you must
only set up a validator node and mark your intention to validate on chain. For detailed instruction
on how to do validate you can consult the
[validator guide](https://docs.polkadot.com/infrastructure/running-a-validator/#running-a-validator).

However, once you've set up a validator and have registered your intention it does not mean that you
will be included in the _active set_ right away. The validators are elected to the active set based
on the results of an election algorithm known as [Phragmén's method](../learn/learn-phragmen.md).
Phragmén's method tries to accomplish two goals: 1) select `n` members from a larger set based on
stake-weighted votes and 2) equalize the stake backing each validator as much as possible.

You will likely want to campaign your validator to the community in order to get more backing. You
are looking for _nominators_ that will put up their tokens to increase the stake for your validator.
For validators who cannot acquire the minimum stake from the community, Parity and Web3 Foundation
also run a joint programme called [Decentralized Nodes](https://nodes.web3.foundation/) that will
nominate validators if they apply and fit the requirements.

### How are validators rewarded?

Validators are rewarded from the [inflation of the relay chain](../learn/learn-DOT.md#dot-inflation),
[transaction fees](../learn/learn-transactions.md#transaction-fees), and tips. However, they only
take a percentage of the former two. More details can be read on the page for
[validator payouts](https://docs.polkadot.com/infrastructure/staking-mechanics/rewards-payout).

### What is the minimum stake necessary to be elected as an active validator?

The minimum stake that is necessary to be elected as an active validator is dynamic and can change
over time. It depends not only on how much stake is being put behind each validator, but also the
size of the active set and how many validators are waiting in the pool.

There are a few ways to estimate the minimum stake.

One way can be to navigate to the
[Polkadot-JS UI](https://polkadot.js.org/apps/#/staking/targets). The value at the top of the screen saying "lowest/avg staked" is the least staked validator. You need at least this much + 1 to enter the set.

You can also use some tools some to perform estimations.

- [Offline Election](https://github.com/paritytech/substrate-debug-kit/tree/master/offline-election)
  can provide exact results of running an election on the current set of validators using the same
  Rust code that is ran in Polkadot.

- [Validator stats script](https://github.com/w3f/validator-stats) can give you an estimate that is
  based on the currently elected set, as well as some statistics about Kusama validators.

## Governance

### What prevents Polkadot governance from failing?

Examples of [Polkadot's governance](../learn/learn-polkadot-opengov.md) can be found in the runtime upgrades
that have successfully taken place through on the testnets, Kusama, and Polkadot itself.

It is fair to say that the field of on-chain blockchain governance is still new, and no one can
claim to know exactly what the optimal version of on-chain governance is yet. However, Polkadot
takes a brave step forward in pioneering thought-through mechanisms for evolving a blockchain.

Blockchains need a method to adapt and evolve. Therefore, an on-chain governance system was
necessary for the long-term success of Polkadot. Ultimately, it is the token holders that are
responsible for preventing Polkadot's governance from failing by using their economic value and
conviction to sway the progression of the protocol.

### What prevents Polkadot governance from becoming plutocratic?

A savvy reader might have noticed that the answer to the previous question endowed the token holder
with the ultimate responsibility to ensure that Polkadot's governance does not fail. By following
the train of this assertion, one might assume that Polkadot's governance is susceptible to becoming
ruled by a few large token holders (called _whales_ in trading parlance) and therefore become a mere
plutocracy (rule of the rich).

There are several other mechanisms that are built-in to the governance system to resist this
plutocratic tendency. One of these mechanisms is called conviction voting, and imbues greater voting
power to token holders who are willing to lock their tokens on the protocol for longer lengths of
time. Longer lock-ups display _conviction_ in a vote. Conviction voting could allow a highly
determined minority to overrule the vote of an apathetic majority in certain situations. Another
mechanism is known as Adaptive Quorum Biasing. This makes proposals have a varying threshold for
approval or rejection based on what part of the governance protocol the proposal originated in. For
details on the subtleties of Polkadot's governance system, please see the
[governance page](../learn/learn-polkadot-opengov.md).

## Parachains

### How do parachain economics work?

Parachains have the flexibility to implement their own monetary system or incentive structure for
collators. However, this is not strictly necessary. Since the collator's job is to continue to give
recent state transitions to the validators on the relay chain who validate each transition, the
security of the parachain and the Polkadot network is completely separate from parachain economics.
Parachains need collators to continue to progress, so it wouldn't be unreasonable to see them
incentivize collator nodes in some way, but the specific mechanism is completely up to parachain
implementers.

### Are parachains ephemeral? What happens when a parachain fails to renew its coretime?

Parachains are not ephemeral. As long as someone is keeping the data for a parachain, the parachain
can move between being a parachain, an
[on-demand parachain](../learn/learn-parachains.md#on-demand-parachains), or a separate sovereign
chain at different points of its lifetime. Especially with on-demand parachains, parachains can
produce blocks when their usage and throughput makes it necessary.

When a parachain could not renew its bulk coretime and needs to keep its chain live, there are a
couple of options to consider. One option is to explore secondary coretime marketplaces on
[Lastic](https://www.lastic.xyz/) or [RegionX](https://hub.regionx.tech/?network=polkadot). The
other option is run as an on-demand parachain, and purchase coretime to produce one block at a time.
On-demand parachains are still secured by the relay chain but don't need to hold a core and can
produce a block when it's economically feasible for them. For more information, please refer to the
[parachains page](../learn/learn-parachains.md#parachains-vs-on-demand-parachains).

## Answered by Gav series

The "Answered by Gav" series is a collection of posts uploaded to Reddit of questions that have been
asked in the Polkadot Watercooler Riot channel and answered by Polkadot founder Gavin Wood.

- [Reason for using asynchronous rather than synchronous communication? Difference in terms of TPS?](https://www.reddit.com/r/dot/comments/b87d96/answered_by_gav_reason_for_using_asynchronous/)
- [How exactly do validators in an ETH parachain keep moving around and how is communication between zones trustless?](https://www.reddit.com/r/dot/comments/b87awr/answered_by_gav_how_exactly_do_validators_in_an/)
- [What are the main issues with Bitcoin integration and will it ever be possible? Same problem with other POW chains? Is Polkadot only going to work with POS chains? How is it trust-less in comparison to Cosmos though?](https://www.reddit.com/r/dot/comments/b87bua/answered_by_gav_what_are_the_main_issues_with/)
- [What are the current thoughts around governance especially since projects have to be voted in to receive the parachains security?](https://www.reddit.com/r/dot/comments/b87cjz/answered_by_gav_what_are_the_current_thoughts/)
- [Also is there any detailed overview of how exactly a token transfer from ETH could be exchanged with another chain's currency?](https://www.reddit.com/r/dot/comments/b87ds8/answered_by_gav_also_is_there_any_detailed/)
- [Can I run multiple Validators with the same Session Key?](https://www.reddit.com/r/dot/comments/bcqrx9/answered_by_gav_can_i_run_multiple_validators/)
- [How to tackle the concentration risk of Validators in data centers?](https://www.reddit.com/r/dot/comments/bcqwit/answered_by_gav_how_to_tackle_the_concentration/)
