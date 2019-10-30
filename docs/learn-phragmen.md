---
id: learn-phragmen
title: Phragmen
sidebar_label: Phragmen
---

## What is the sequential Phragmen method?

The sequential Phragmen method is a multi-winner election method introduced by Edvard Phragmen in the 1890s.

The quote below taken from the reference [Phragmen paper][Phragmen Paper] sums up the purpose of the sequential Phragmen method:

> The problem that Phragmen’s methods try to solve is that of electing a set of a given numbers of persons from a larger set of candidates. Phragmen discussed this in the context of a parliamentary election in a multi-member constituency; the same problem can, of course, also occur in local elections, but also in many other situations such as electing a board or a committee in an organization.

## Where is the Phragmen method used in Polkadot?

### NPoS: Validator Elections

The sequential Phragmen method is used in the Nominated Proof-of-Stake scheme to elect validators based on their own
self-stake and the stake that is voted to them from nominators. It also tries to equalize the weights between the validators
after each election round. Since validators are paid equally in Polkadot, it is important that the stake
behind each validator is spread out. The equalization method is ran twice for every validator election. The first iteration
will do a rough equalization among all validator candidates in order to determine the subset that will become the next
active validators. The second iteration runs only among the elected candidates to equalize the stake between the ones
which are elected.

### Council Elections

The Phragmen method is also used in the council election mechanism. When you vote for council members, you can select up
to 16 different candidates, and then place a reserved bond which is the weight of your vote. Phragmen will run once on
every election to determine the top candidates to assume council positions and then again amongst the top candidates
to equalize the weight of the votes behind them as much as possible.

## What does it mean for node operators?

Phragmen is something that will run in the background and requires no extra effort from you. However, it is good to 
understand how it works since it means that not all the stake you've been nominated will end up on your validator
after an election. Nominators are likely to nominate a few different validators that they trust will do a good job
operating their nodes.

## External Resources

- [W3F Research Page on Sequential Phragmen Method](https://research.web3.foundation/en/latest/polkadot/NPoS/4.%20Sequential%20Phragmén’s%20method/) - The formal adaptation of the Phragmen method as applied to Polkadot validators.
- [Python Reference Implementations](https://github.com/w3f/consensus/tree/master/NPoS) - Implementations of Simple and Complicated Phragmen methods.
- [Substrate Implementation](https://github.com/paritytech/substrate/blob/master/core/phragmen/src/lib.rs) - Rust implementation used in the Substrate Runtime Module Library.
- [Phragmen's and Thiele's Election Methods](https://arxiv.org/pdf/1611.08826.pdf) - 95-page paper explaining Phragmen's election methods in detail.

[Phragmen Paper]: https://arxiv.org/pdf/1611.08826.pdf
