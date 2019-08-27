# What is Phragmen and what does it mean for node operators?

## What is the sequential Phragmen method?

The sequential Phragmen method is a multi-winner election method introduce by Edvard Phragmen in the 1890s.

> The problem that Phragmen’s methods try to solve is that of electing a set of a given numbers of persons from a larger set of candidates. Phragmen discussed this in the context of a parliamentary election in a multi-member constituency; the same problem can, of course, also occur in local elections, but also in many other situations such as electing a board or a committee in an organization.

Phragmen's sequential method is used in the NPoS algorithm of Polkadot to elect validators based on the weight (amount staked to them by nominators). It also handles equalization of weights among validators after each round. Equalization happens in order to spread nominated DOTs among the wider set of validators and enforce stronger decentralization properties to the network.

## What does it mean for node operators?

_Updated as of Alexander v0.4.3_

### For nominators

Currently the `equalise` flag is set to false so equalization will not take place. As a nominator your nomination will stay with the validator that you nominate to.

### For validators

Currently the `equalise` flag is set to false so equalization will not take place. As a validator the nominations you have received will stay with you.

## Details

The implementation of the Phragmen method can be found in the Substrate `srml-staking` crate. It is used in the selection of validators from the available set based on their role preferences (validator or nominator). The election will run for a number of rounds which is equal to that amount of current validators.

## External Resources

- [W3F Research Page on Sequential Phragmen Method](https://research.web3.foundation/en/latest/polkadot/NPoS/4.%20Sequential%20Phragm%C3%A9n%E2%80%99s%20method./) - The formal adaptation of the Phragmen method as applied to Polkadot validators.
- [Python Reference Implementations](https://github.com/w3f/consensus/tree/master/NPoS) - Implementations of Simple and Complicated Phragmen methods.
- [Substrate Implementation](https://github.com/paritytech/substrate/blob/master/srml/staking/src/phragmen.rs) - Rust implementation used in the Substrate Runtime Module Library.
- [Phragmen's and Thiele's Election Methods](https://arxiv.org/pdf/1611.08826.pdf) - 95-page paper explaining Phragmen's election methods in detail.
