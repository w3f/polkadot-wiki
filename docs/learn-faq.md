---
id: learn-faq
title: Frequently Asked Questions (FAQs)
sidebar_label: Frequently Asked Questions (FAQs)
---

_This FAQ focuses on technical questions for users interested in developing applications for Polkadot. If you have a more general question, you may wish to search for the answer on the main [Polkadot Network FAQ](https://polkadot.network/faq). If you have a question which is not answered, please feel free to ask on the Polkadot Watercooler [Riot channel](https://riot.im/app/#/room/#polkadot-watercooler:matrix.org)._

### How many validators will be validating at Mainnet launch?

Most likely somewhere between 50 - 100, increasing to 1000 or so later on. [Source](https://youtu.be/IRc5Jma_eH8?t=1630) The number of validators can be changed by governance, and so it is difficult to state precisely how many will be in the active validator set at any particular point in the future.

### How do I apply to be a validator?

See ("How To Validate on Kusama")[maintain-guides-how-to-validate-kusama.md].  Note that just because you run a validator does not mean you will necessarily be producing blocks; only a certain number of validators will be part of the active validator set, based on the amount of stake they can attract and the results of the (Phragmen election)[learn-phragmen].

### How does consensus on the relay chain work?

See the [consensus](learn-consensus) page.

### What is the expected block time on the relay chain?

The Kusama network is currently operating at a rate of one block approximately every six seconds.

The expected block time on the mainnet Polkadot chain is estimated to be limited
by the theoretical limits of the peer-to-peer networks of the validators.
Since there is no forced time between blocks due to Proof-of-Work and the only
overhead on validators is to validate state transitions, the block times should
be quite fast. Two or three seconds may not be unreasonable after optimizations. However, the specific block time will probably begin at a rate similar to Kusama. It also may potentially be longer (up to 10 - 15 seconds) due to the constraint of networking all parachain data.

### What is the token inflation rate?

This is difficult to calculate precisely, since the [inflation rate will vary](learn-staking#inflation) based on what percentage of the DOTs are staked. For both Kusama and Polkadot, inflation is estimated to be around 10 - 20% for the first year.  Inflation on testnets and parachains will vary more dramatically.

### How are validators rewarded?

Validators are rewarded from the block reward of the relay chain. Block rewards consist of transaction fees (and tips) and block production rewards. For more details, see the [validator payout page](maintain-guides-validator-payout).

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

The Web3 Foundation will distribute up to 20% of mainnet DOTs prior to network launch (see [Light Paper](https://polkadot.network/Polkadot-lightpaper.pdf) or the [Polkadot Network FAQ](https://polkadot.network/faq/)). As Gavin Wood, one of the project's founders, said in his year-end recap, there may be a generally available public sale for some portion of that amount at some point this year. Subscribe to the Polkadot newsletter on [polkadot.network](https://polkadot.network/) for further updates.

Mainnet DOT tokens are not transferrable until mainnet launch, expected in early 2020. Any transfers before that time of mainnet DOTs are illegitimate and unauthorized. DOTs can not be moved from a current allocation address. Individuals with an allocation of DOTs who transfer their DOT address to someone else can always keep a copy of their private key, therefore there is extreme risk for individuals participating in transfers of DOTs before mainnet launch.

### What are the ways to find out the minimum stake necessary for the validators?

There are few ways to estimate it.

1. [Offline Phragmen](https://github.com/kianenigma/offline-phragmen)

If you want to know what would be the outcome of the election in the next era, this can provide an estimation result to you. You can customize parameters such as number of validators to elect, network and WebSocket endpoint, but it would take some times to build the binary.
2. [Validator stats script](https://github.com/ansonla3/kusama-validator-stats)

With this script, it helps you to quickly identify which validator is the lowest-staked and the basic statistics about staking on Kusama.
3. [Copy everything from the Staking page](https://polkadot.js.org/apps/#/staking) 

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
