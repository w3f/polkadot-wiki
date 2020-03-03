---
id: build-oracle
title: Oracles
sidebar_label: Oracles
---

In the blockchain context, an _oracle_ is a way to bring real-world data onto
the blockchain so that it can be used by a decentralized application.

Oracles serve many purposes for application builders.  For example,

- Most stablecoin designs use an oracle to bring in data of the exchange rate
  of assets, in order to peg their value to a real world currency.
- Synthetic assets use oracles as price feeds in order to determine if the
  underlying cryptocurrency sufficiently collateralizes the debt position.
- Prediction markets use oracles to decide the outcome of real world events
  and determine the payout of the prediction shares.
- Decentralized insurance markets use oracles to bring in information about
  whether a claim is valid or not.

Oracle solutions range from centralized and trusted to decentralized and 
game-theory based. On the centralized end of the spectrum, an oracle could be
a single account that has the authority to dictate the real-world data on-chain.
On the decentralized end, a [complex game of "chicken"][schellingcoin] can be
played among various staked actors who risk getting slashed if they don't submit
the same data as everyone else. Solutions such as [ChainLink][chainlink] fit
somewhere in the middle, where the amount of trust you put into the reporting
oracles is minimized based on your preferences. 

When using an oracle in your application you should be aware of the benefits and
risks that are baked into its specific model. As the Polkadot ecosystem develops
and oracle parachains begin to appear, this article will be updated with a
comparison of the different solutions and the drawbacks and benefits each provides.

[schellingcoin]: https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/
[chainlink]: https://polkadot.network/chainlink-reaches-milestone-with-polkadot/
