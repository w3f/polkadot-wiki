---
id: learn-parachains
title: Parachains
sidebar_label: Parachains
---

![One parachain](assets/network/one_parachain.png)

A parachain is an application-specific data structure that is globally coherent and validatable by
the validators of the Polkadot Relay Chain. Most commonly a parachain will take the form of a
blockchain, but there is no specific need for them to be actual blockchains. They take their name
from the concept of parallelized chains that run parallel to the Relay Chain. Due to their parallel
nature, they are able to parallelize transaction processing and achieve scalability of the Polkadot
system. They [share in the security](learn-security) of the entire Polkadot network and can
communicate with other parachains through [XCMP](learn-crosschain).

Parachains are maintained by a network maintainer known as a [collator](learn-collator). The role of
the collator node is to maintain a full-node of the parachain, retain all necessary information of
the parachain, and produce new block candidates to pass to the Relay Chain validators for
verification and inclusion in the shared state of Polkadot. The incentivization of a collator node
is an implementation detail of the parachain. They are not required to be staked on the Relay Chain
or own DOT tokens unless stipulated to do so by the parachain implementation.

The Polkadot Host (PH) requires that the state transitions performed on parachains to be specified
as a Wasm executable. Proofs of new state transitions that occur on a parachain must be validated
against the registered state transition function (STF) that is stored on the Relay Chain by the
validators before Polkadot acknowledges a state transition has occurred on a parachain. The only
constraint to the logic that a parachain is allowed to implement is that it must be verifiable by
the Relay Chain validators. Verification most commonly takes the form of a bundled proof of a state
transition known as a Proof-of-Verification (PoV) block, which is submitted to the validators from
one or more of the parachain collators to be checked.

## Parachain Economies

Parachains may have their own economies with their own native tokens. Schemes such as Proof-of-Stake
are usually used to select the validator set in order to handle validation and finalization;
parachains will not be required to do either of those things. However, since Polkadot is general
over what the parachain can implement, it may be the choice of the parachain to implement a staking
token, but it's not generally necessary.

Collators may be incentivized through inflation of a native parachain token. There may be other ways
to incentivize the collator nodes that do not involve inflating the native parachain token.

Transaction fees in a native parachain token can also be an implementation choice of parachains.
Polkadot makes no hard and fast rules for how the parachains decide on original validity of
transactions. For example, a parachain may be implemented so that transactions must pay a minimum
fee to collators to be valid. The Relay Chain will enforce this validity. Similarly, a parachain
could not include that in their implementation and Polkadot would still enforce its validity.

Parachains are not required to have their own token. If they do, is up to the parachain to make the
economic case for their token, not Polkadot.

## Parachain Slot Acquisition

Polkadot supports a limited number of parachains, currently estimated to be about 100. As the number
of slots is limited, Polkadot has several ways to allocate the slots:

- System level parachains
- Auction granted parachains
- Parathreads

System parachains are those deemed as a "common good" for the network, such as bridges to other
networks or chains that remove functionality from the Relay Chain, e.g. a governance parachain.
These typically do not have an economic model of their own and help remove transactions from the
Relay Chain, allowing for more efficient parachain processing.

Auction granted parachains are granted in a permissionless [auction](learn-auction). Parachain teams
can either bid with their own DOT tokens, or source them from the community using the
[crowdloan functionality](learn-crowdloan).

[Parathreads](learn-parathreads) have the same API as parachains, but are scheduled for execution on
a pay-as-you-go basis with an auction for each block.

### Slot Expiration

When a parachain wins an auction, the DOT that it bid gets reserved until the end of the lease.
Reserved balances are non-transferrable and cannot be used for staking. At the end of the lease, the
DOT is unreserved. Parachains that have not secured a new lease to extend their slot will
automatically become parathreads.

## Examples

Some examples of parachains:

- **Encrypted Consortium Chains**: These are possibly private chains that do not leak any
  information to the public, but still can be interacted with trustlessly due to the nature of the
  XCMP protocol.
- **High Frequency Chains**: These are chains that can compute many transactions in a short amount
  of time by taking certain trade-offs or making optimizations.
- **Privacy Chains**: These are chains that do not leak any information to the public through use of
  novel cryptography.
- **Smart Contract Chains**: These are chains that can have additional logic implemented on them
  through the deployment of code known as _smart contracts_.

## FAQ

### What is "parachain consensus"?

"Parachain consensus" is special in that it will follow the Polkadot Relay Chain. Parachains cannot
use other consensus algorithms that provide their own finality. Only sovereign chains (that must
bridge to the Relay Chain via a parachain) can control their own consensus. Parachains have control
over how blocks are authored and by whom.

### How will parachain slots be distributed?

Parachain slots will be acquirable through auction, please see the [parachain slots](learn-auction)
article. Additionally, some parachain slots will be set aside to run
[parathreads](learn-parathreads) &mdash; chains that bid on a per-block basis to be included in the
Relay Chain.

### What happens to parachains when the number of validators drops below a certain threshold?

The minimal safe ratio of validator per parachain is 5:1. With a sufficiently large set of
validators, the randomness of their distribution along with
[availability and validity](learn-availability) will make sure security is on-par. However, should
there be a big outage of a popular cloud provider or another network connectivity catastrophe, it is
reasonable to expect that the number of validators per chain will drop.

Depending on how many validators went offline, the outcome differs.

If a few validators went offline, the parachains whose validator groups will be too small to
validate a block will skip those blocks. Their block production speed will slow down to any
increment of 6 seconds, until the situation is resolved and the optimal number of validators is in
that parachain's validator group again.

If anywhere from 30% to 50% of the validators go offline, availability will suffer because we need
two thirds of the validator set to back the parachain candidates. In other words, all parachains
will stop until the situation is resolved. Finality will also stop, but low-value transactions on
the relay chain should be safe enough to execute, despite common forks. Once the required number of
validators is in the validator set again, parachains will resume block production.

Given that collators are full nodes of the relay chain and the parachain they are running, they will
be able to recognize a disruption as soon as it occurs and should stop producing block candidates.
Likewise, it should be easy for them to recongize when it's safe to restart block production -
perhaps based on finality delay, validator set size, or some other factor that is yet to be decided
within [Cumulus](https://github.com/paritytech/cumulus).

### Parachain Development Kits (PDKs)

Parachain Development Kits are a set of tools that enable developers to create their own
applications as parachains. For more info see [here](build-pdk).

### Deploying parachains

Please see the [Cumulus repository](https://github.com/paritytech/cumulus#rococo) README for
information on compiling and deploying a parachain.

## Resources

- [Polkadot: The Parachain](https://medium.com/polkadot-network/polkadot-the-parachain-3808040a769a) -
  Blog post by Polkadot co-founder Rob Habermeier that introduced parachains in 2017 as "a simpler
  form of blockchain, which attaches to the security provided by a Relay Chain rather than providing
  its own. The Relay Chain provides security to attached parachains, but also provides a guarantee
  of secure message-passing between them."
- [The Path of a Parachain Block](https://polkadot.network/the-path-of-a-parachain-block/) - A
  technical walkthrough of how parachains interact with the Relay Chain.
