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

The initial expected block time on the mainnet Polkadot chain will also be targeted at every six seconds.  However, this is subject to change and after optimization, may go down to as low as every two to three seconds. It also may potentially be longer (up to 10 - 15 seconds) due to the constraint of networking all parachain data.

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

## Myths

Below we present some myths about Polkadot that we've seen in the community.
We're not absolutely sure what the origin of these myths are -- maybe they arise
from people who have not taken the time to understand Polkadot. Regardless,
we have collected a rebuttal for each of the common myths below. Feel free to
link to this page if you see one of these myths propagated on discussion platforms
of the internet. 

### Polkadot is an "Ethereum-killer"

Some people position blockchains antagonistically against each other, claiming
that all of the new blockchains are by default "Ethereum killers". The line of
thinking is that there is a limited market share for blockchain platforms and
therefore all projects are competing and vying for the lion's share. There may
be some truth to this in the wide ecosystem of blockchain projects, but not all
of them.

Polkadot and Ethereum have significant differences in their technology, governance
ideology, and community that instead forms a complimentary whole instead of a
divided pie. Polkadot is a network for parachain applications, which may likely
be domain-specific blockchains. Ethereum is instead a smart contract chain that
focuses on maximizing the decentralization of its architecture. For more on the
differences between the two chains see the more comprehensive [comparison article](learn-comparison-ethereum).

In order to be an Ethereum killer, Polkadot would have to be actively working
against the progression of the Ethereum technology and ecosystem, which is not
true. Instead, Web3 Foundation, the holders of the treasury from the DOT sales, 
promotes and funds technology that benefits the web3 world as a whole.

### On-chain governance is flawed, it can never work

Blockchain governance is a very young field, and no one knows what works and
what doesn't -- yet. Polkadot's governance arises from a couple key observations,
1) blockchains need some way to adapt and evolve and 2) the only measure of value
that is intrinsic to a blockchain is its native coin and therefore the best
measure of stakeholders for the system are the token holders. There are of
course caveats to the above two observations and that is why Polkadot's governance
is still in its experimental phases. Polkadot takes the approach that it will try
out best methods and observe how they work and tweak them until they're optimal.

### Polkadot's governance is plutocratic

Since Polkadot uses "coin-voting" that allows token holders to vote based on the
amount of their holdings, some claim that Polkadot must be plutocratic. 

However, Polkadot's governance is actually more fine-grained than this and has
built in mechanisms that increase resiliency over plutocracy and cartels. One of
these mechanisms is the council, an elected body that can make motions that will
be voted on as refernda with a bias toward passing. The council acts as the voice
for passive token holders or other users of the system that cannot vote. Another
mechanism that can be employed by any token holder is called _conviction voting_
and allows any toke holder to amplify their vote for stronger voting power. These
mechanisms, and more, provide counter weights to the tendency for a simple token
voting system to devolve into a plutocracy.

For more on Polkadot's governance please see the [governance page](learn-governance).

### Eth2.0 is better because it has 200,000+ validators and Polkadot has 1000

The answer to this myth is still at this point totally unclear. The argument is
that Eth2.0 will be more decentralized because it supports more validators than
Polkadot. On Eth2.0, the barriers to entry for being a validator can be lower
because the requirement is only 32 ETH, while on Polkadot it can be many multiples
of this. On the flip side Polkadot has a more robust nomination system for electing
the validator set that Eth2.0 lacks. It is still uncertain whether a decentralized
network can support the network bandwidth and overhead of consensus messages being
gossiped among hundreds of thousands of nodes. Polkadot's estimation of 1000
validators is a more realistic estimation and if its possible to scale to more
then it's possible for on-chain governance to enable it in the future.

### The auction mechanism for parachains implies they are ephemeral

The myth is that the parachain auction mechanism for Polkadot implies that
all applications will be ephemeral, or, worse, eventually be bought out by more
wealthy bidders. 

The resolution of this myth is to understand Polkadot's tiered applications offering
that includes parachains, parathreads, and smart contracts. Parachains can
move to being a parathread and only producing a block when necessary. Parachain
slots are only needed by the applications with heaviest load that need block-by-block
aligned production with the Relay Chain.  

## Answered by Gav series

The "Answered by Gav" series is a collection of posts uploaded to Reddit of questions that have been asked in the Polkadot Watercooler Riot channel and answered by Polkadot founder Gavin Wood.

- [Reason for using asynchronous rather than synchronous communication? Difference in terms of TPS?](https://www.reddit.com/r/dot/comments/b87d96/answered_by_gav_reason_for_using_asynchronous/)
- [How exactly do validators in an ETH parachain keep moving around and how is communication between zones trustless?](https://www.reddit.com/r/dot/comments/b87awr/answered_by_gav_how_exactly_do_validators_in_an/)
- [What are the main issues with Bitcoin integration and will it ever be possible? Same problem with other POW chains? Is Polkadot only going to work with POS chains? How is it trust-less in comparison to Cosmos though?](https://www.reddit.com/r/dot/comments/b87bua/answered_by_gav_what_are_the_main_issues_with/)
- [What are the current thoughts around governance especially since projects have to be voted in to receive the parachains security?](https://www.reddit.com/r/dot/comments/b87cjz/answered_by_gav_what_are_the_current_thoughts/)
- [Also is there any detailed overview of how exactly a token transfer from ETH could be exchanged with another chain's currency?](https://www.reddit.com/r/dot/comments/b87ds8/answered_by_gav_also_is_there_any_detailed/)
- [Can I run multiple Validators with the same Session Key?](https://www.reddit.com/r/dot/comments/bcqrx9/answered_by_gav_can_i_run_multiple_validators/)
- [How to tackle the concentration risk of Validators in data centers?](https://www.reddit.com/r/dot/comments/bcqwit/answered_by_gav_how_to_tackle_the_concentration/)
