---
id: learn-faq
title: Frequently Asked Questions (FAQs)
sidebar_label: Frequently Asked Questions (FAQs)
---

_This FAQ focuses on technical questions for users interested in developing applications for Polkadot. If you have a more general question, you may wish to search for the answer on the main [Polkadot Network FAQ](https://polkadot.network/faq). If you have a question which is not answered, please feel free to ask on the Polkadot Watercooler [Riot channel](https://riot.im/app/#/room/#polkadot-watercooler:matrix.org)._

### How many validators will be online at Mainnet launch?

Somewhere between 50 - 100, increasing to 1000 or so later on. [Source](https://youtu.be/IRc5Jma_eH8?t=1630)

### How do I apply to be a validator?



### How does consensus on the relay chain work?

请参阅[共识](learn-consensus)页面。

### What is the expected block time on the relay chain?

Kusama 网络目前大约是六秒钟出块。

The expected block time on the mainnet Polkadot chain is estimated to be limited by the theoretical limits of the peer-to-peer networks of the validators. Since there is no forced time between blocks due to Proof-of-Work and the only overhead on validators is to validate state transitions, the block times should be quite fast. Two or three seconds may not be unreasonable after optimizations. However, the specific block time will probably begin at a rate similar to Kusama. It also may potentially be longer (up to 10 - 15 seconds) due to the constraint of networking all parachain data.

### What is the token inflation rate?

This is difficult to calculate precisely, since the inflation rate will vary based on what percentage of the DOTs are staked. For Kusama, inflation is estimated to be around 10 - 20% for the first year.

### How are validators rewarded?

Validators are rewarded from the block reward of the relay chain. Block rewards consists of transaction fees (and tips) and block production rewards. For more details, see the [validator payout page](maintain-guides-validator-payout).

### How do parachain economics work?

Parachains have the flexibility to implement their own monetary system or incentive structure for collators. However, this is not strictly necessary. Since the collator's job is to continue to give recent state transitions to the validators on the relay chain whom validate each transition, the security of the parachain and the Polkadot network is completely separate from parachain economics. Parachains need collators to continue to progress, so it wouldn't be unreasonable to see them incentivize collator nodes in some way but it is completely up to parachain implementers.


### Can I buy or transfer DOT tokens?

Testnet DOT tokens are freely available from a variety of sources - see the [DOT page](learn-DOT) for details.

Kusama tokens are available via the [claims process](https://claim.kusama.network/) (if you have already purchased DOTs), the frictional faucet (online soon), or via [grant request](http://grants.web3.foundation) from the Web3 Foundation.

The Web3 Foundation will distribute up to 20% of mainnet DOTs prior to network launch (see [Light Paper](https://polkadot.network/Polkadot-lightpaper.pdf) or the [Polkadot Network FAQ](https://polkadot.network/faq/)). As Gavin Wood, one of the project's founders, said in his year-end recap, there may be a generally available public sale for some portion of that amount at some point this year. Subscribe to the Polkadot newsletter on [polkadot.network](https://polkadot.network/) for further updates.

Mainnet DOT tokens are not transferrable until mainnet launch, expected late 2019. Therefore, any transfers of mainnet DOTs are illegitimate and unauthorized. DOTs can not be moved from a current allocation address. Individuals with an allocation of DOTs who transfer their DOT address to someone else can always keep a copy of their private key, therefore there is extreme risk for individuals participating in transfers of DOTs before mainnet launch.

## Answered by Gav series

The "Answered by Gav" series is a collection of posts uploaded to Reddit of questions that have been asked in the Polkadot Watercooler Riot channel and answered by Polkadot founder Gavin Wood.

- [Reason for using asynchronous rather than synchronous communication? Difference in terms of TPS?](https://www.reddit.com/r/dot/comments/b87d96/answered_by_gav_reason_for_using_asynchronous/)
- [How exactly do validators in an ETH parachain keep moving around and how is communication between zones trustless?](https://www.reddit.com/r/dot/comments/b87awr/answered_by_gav_how_exactly_do_validators_in_an/)
- [What are the main issues with Bitcoin integration and will it ever be possible? Same problem with other POW chains? Is Polkadot only going to work with POS chains? How is it trust-less in comparison to Cosmos though?](https://www.reddit.com/r/dot/comments/b87bua/answered_by_gav_what_are_the_main_issues_with/)
- [What are the current thoughts around governance especially since projects have to be voted in to receive the parachains security?](https://www.reddit.com/r/dot/comments/b87cjz/answered_by_gav_what_are_the_current_thoughts/)
- [Also is there any detailed overview of how exactly a token transfer from ETH could be exchanged with another chain's currency?](https://www.reddit.com/r/dot/comments/b87ds8/answered_by_gav_also_is_there_any_detailed/)
- [Can I run multiple Validators with the same Session Key?](https://www.reddit.com/r/dot/comments/bcqrx9/answered_by_gav_can_i_run_multiple_validators/)
- [How to tackle the concentration risk of Validators in data centers?](https://www.reddit.com/r/dot/comments/bcqwit/answered_by_gav_how_to_tackle_the_concentration/)
