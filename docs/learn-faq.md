---
id: learn-faq
title: Frequently Asked Questions (FAQs)
sidebar_label: Frequently Asked Questions (FAQs)
---

_This FAQ focuses on technical questions for users interested in developing applications for Polkadot. If you have a more general question, you may wish to search for the answer on the main [Polkadot Network FAQ](https://polkadot.network/faq). If you have a question which is not answered, please feel free to ask on the Polkadot Watercooler [Riot channel](https://riot.im/app/#/room/#polkadot-watercooler:matrix.org)._

## Polkadot

### What is the launch process of Polkadot Beta?

The network will launch first in as a Proof-of-Authority (PoA) chain, with governance
controlled by the single Sudo (super-user) account, and functionality restricted to disallow
transfers of funds. 

During this time, validator will be able to start joining the network and signalling
their intention to participate in consensus. When a sufficient number of validator
are sourced from the community, the Sudo account will initiate the transition
of the chain security from PoA to Proof-of-Stake (PoS). After this happens,
the first validator elections will begin and the chain is secured by the
economic stake that is bonded by validators and nominators.

After the chain has been secured by the decentralized community of validators,
the next step is to transition the governance of the chain into the hands of the
token holders. The Sudo account will now initiate an upgrade that erases the
Sudo logic from the chain entirely and replaces it with the stakeholder
governance modules. From henceforward, the network is in the hands of the token
holders and no longer under control of an authority.

The final step to transition to full-functioning Polkadot is the enabling of
transfer functionality. The community will need to propose a new upgrade and vote
upon it in order to accomplish this. If the vote to enable transfers passes, then
it will be enacted shortly thereafter. When this takes place, Polkadot will
move out of it's Beta release state.

### How many validators will be validating at Polkadot Beta launch?

Initially only a few authority validators will be securing the network. However,
as [detailed in the answer above](#what-is-the-launch-process-of-polkadot-beta),
the network will right away be available for vaidators to start registering
their intentions. The transition to Proof-of-Stake will largely depend on when
a sufficient number of validators have registered and are ready to take over
the security of the network. This number can be as low as 50 but probably
closer to 100.

### How do I apply to be a validator?

There is no central authority that decides on validators, so there is no _one_
application that you can fill out. Since becoming a validator is permissionless,
in order to become one you must only set up a validator node and register
your intention to validate on chain. For detailed instruction on how to do this
you can consult the [wiki guide](maintain-guides-how-to-validate-kusama.md) on
validating for Kusama.

However, not that because you've set up a validator and have registered your
intention does not mean that you will be included in the _active set_ right
away. The validators are elected to the active set based on the results of an
election algorithm known as [Phragmen's method](learn-phragmen). Phragmen's
tries to accomplish two things, 1) select `n` members from a larger set based
on stake-weighted votes and 2) equalize the stake backing each validator as 
much as possible.

You will likely want to campaign your validator to the community in order to
get more backing. You are looking for _nominators_ that will put up their tokens
to increase the stake for your validator. Besides this, for validators who
cannot acquire the minimum stake from the community, Parity and Web3 Foundation
run a join program called [Thousand Validators][thousand validators] that will
nominate validators if they conform to some requirements.

### What is the expected block time on the Relay Chain?

The Kusama network, an early and unaudited release of the Polkadot code is
currently operating at a rate of one block every six seconds. 

It is expected that Polkadot will also target its block production for producing
a block every six seconds. However, it is still subject to change. It may go
as low as two to three seconds after optimizations, or it may potentially
increase in order to handle the capacity of the parachain networking in a live
environment.

### What is the inflation rate of the DOT?

The inflation rate is 10% per year.

A portion of the inflation is rewarded to validators for performing their duties,
while another portion may go directly to the treasury. The exact percentage that
goes into both varies and is based on the amount of DOTs that are staked.
Please see the article on [inflation](learn-staking#inflation) for more information.

### How are validators rewarded?

Validators are rewarded from the inflation of the Relay Chain, transaction fees,
and tips. However they only take a percentage of the former two. More details
can be read on the page for [validator payouts](maintain-guides-validator-payout).

### How do parachain economics work?

Parachains have the flexibility to implement their own monetary system or
incentive structure for collators. However, this is not strictly necessary.
Since the collator's job is to continue to give recent state transitions to
the validators on the relay chain whom validate each transition, the security
of the parachain and the Polkadot network is completely separate from parachain
economics. Parachains need collators to continue to progress, so it wouldn't be
unreasonable to see them incentivize collator nodes in some way but it is completely up to parachain implementers.

### What are the transfer fees for Kusama and Polkadot?

It is important to note that the cost of transferring KSM or DOT tokens is dynamic. Currently, the minimum cost of transferring KSM is 0.01 KSM (the base fee), although this can be changed via governance. However, actual transaction fees will vary based on a variety of factors. Specifically, fee calculation follows the following formula:

```
base_fee + (tx_length * length_fee) + WeightToFee(weight)
```

Please see the (Substrate page on fee calculation)[https://substrate.dev/docs/en/next/development/module/fees#fee-calculation] for more detailed information.

### What is the minimum amount of KSM I can have in my account?

It is recommended to always ensure that you keep at least 0.1 KSM in your account in order to avoid the reaping threshold of 0.01 KSM.  If you have less than 0.01 KSM in your account, that account will be "reaped" - it will be removed and no longer occupy space on the chain. In other words, no accounts are allowed on-chain with an account balance of less than 0.01 KSM.   This is a dust prevention measure, in order to ensure that the chain is not full of accounts with minuscule amounts of KSM taking up space. Since the blockchain is copied to every person running a full node, any savings of space provides dramatic benefits in terms of scalability.

### Can I buy or transfer DOT tokens?

Testnet DOT and KSM tokens are freely available from a variety of sources - see the [DOT page](learn-DOT) for details.

Kusama tokens are available via the [claims process](https://claim.kusama.network/) (if you have already purchased DOTs), the [frictional faucet](https://guide.kusama.network/en/latest/start/faucet/), or via [grant request](http://grants.web3.foundation) from the Web3 Foundation.  Upon obtaining Kusama tokens, they are freely transferable.

The Web3 Foundation will distribute up to 20% of mainnet DOTs prior to network launch (see [Light Paper](https://polkadot.network/Polkadot-lightpaper.pdf) or the [Polkadot Network FAQ](https://polkadot.network/faq/)).  Subscribe to the Polkadot newsletter on [polkadot.network](https://polkadot.network/) for further updates.

Mainnet DOT tokens are not transferrable until mainnet launch, expected in early 2020. Any transfers before that time of mainnet DOTs are illegitimate and unauthorized. DOTs can not be moved from a current allocation address. Individuals with an allocation of DOTs who transfer their DOT address to someone else can always keep a copy of their private key, therefore there is extreme risk for individuals participating in transfers of DOTs before mainnet launch.

### What are the ways to find out the minimum stake necessary for the validators?

There are a few ways to estimate it.

- [Offline Phragmen](https://github.com/kianenigma/offline-phragmen)

If you want to know what would be the outcome of the election in the next era, this can provide an estimation result. You can customize parameters such as number of validators to elect, network, and WebSocket endpoint, but it would take some time to build the binary.
- [Validator stats script](https://github.com/ansonla3/kusama-validator-stats)

This script helps you quickly identify which validator is the lowest-staked and the basic statistics about staking on Kusama.

- [Copy everything from the Staking page](https://polkadot.js.org/apps/#/staking) 

It is also possible to copy both `own stake` and `other stake` on the Staking page to a spreadsheet and then do a simple calculation.


## Answered by Gav series

The "Answered by Gav" series is a collection of posts uploaded to Reddit of questions that have been asked in the Polkadot Watercooler Riot channel and answered by Polkadot founder Gavin Wood.

- [Reason for using asynchronous rather than synchronous communication? Difference in terms of TPS?](https://www.reddit.com/r/dot/comments/b87d96/answered_by_gav_reason_for_using_asynchronous/)
- [How exactly do validators in an ETH parachain keep moving around and how is communication between zones trustless?](https://www.reddit.com/r/dot/comments/b87awr/answered_by_gav_how_exactly_do_validators_in_an/)
- [What are the main issues with Bitcoin integration and will it ever be possible? Same problem with other POW chains? Is Polkadot only going to work with POS chains? How is it trust-less in comparison to Cosmos though?](https://www.reddit.com/r/dot/comments/b87bua/answered_by_gav_what_are_the_main_issues_with/)
- [What are the current thoughts around governance especially since projects have to be voted in to receive the parachains security?](https://www.reddit.com/r/dot/comments/b87cjz/answered_by_gav_what_are_the_current_thoughts/)
- [Also is there any detailed overview of how exactly a token transfer from ETH could be exchanged with another chain's currency?](https://www.reddit.com/r/dot/comments/b87ds8/answered_by_gav_also_is_there_any_detailed/)
- [Can I run multiple Validators with the same Session Key?](https://www.reddit.com/r/dot/comments/bcqrx9/answered_by_gav_can_i_run_multiple_validators/)
- [How to tackle the concentration risk of Validators in data centers?](https://www.reddit.com/r/dot/comments/bcqwit/answered_by_gav_how_to_tackle_the_concentration/)


[thousand validators]: https://thousand-validators.kusama.network/#/