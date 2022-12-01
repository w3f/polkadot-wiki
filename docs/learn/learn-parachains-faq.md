---
id: learn-parachains-faq
title: Parachains FAQ
sidebar_label: Parachains FAQ
description: Parachains FAQ
keywords: [parachains, application-specific, sharding, faq]
slug: ../learn-parachains-faq
---

## General

### What is "parachain consensus"?

"Parachain consensus" is special in that it will follow the {{ polkadot: Polkadot :polkadot }}
{{ kusama: Kusama :kusama }} Relay Chain. Parachains cannot use other consensus algorithms that
provide their own finality. Only sovereign chains (that must bridge to the Relay Chain via a
parachain) can control their own consensus. Parachains have control over how blocks are authored and
by whom. {{ polkadot: Polkadot :polkadot }} {{ kusama: Kusama :kusama }} guarantees valid state
transitions. Executing a block finality outside the context of the relay chain is outside the scope
of trust that {{ polkadot: Polkadot :polkadot }} {{ kusama: Kusama :kusama }} provides.

### How about parachains that are not Substrate-based?

Substrate provides [FRAME Pallets](https://docs.substrate.io/main-docs/fundamentals/runtime-intro/)
as part of its framework to seamlessly build a rustic-based blockchain. Part of FRAME are pallets
that can be used for consensus. {{ polkadot: Polkadot :polkadot }} {{ kusama: Kusama :kusama }}
being a Substrate-based chain rely on BABE as the block production scheme and GRANDPA as the
finality gadget as part of its consensus mechanism. Collectively, this is a
[Hybrid Consensus Model](learn-consensus.md#hybrid-consensus), where block production and block
finality are separate. Parachains only need to produce blocks as they can rely on the relay chain to
validate the state transitions. Thus, parachains can have their own block production where the
[collators](learn-collator.md) act as the block producers, even if the parachain is not
Substrate-based.

### Is 100 a hard limit on the number of Parachains that can be supported?

No.{{ polkadot: Polkadot :polkadot }} {{ kusama: Kusama :kusama }} network went through a significant
number of optimizations, and there are [several updates planned](https://polkadot.network/blog/polkadot-roadmap-roundup/) 
in the near future. The exact number of parachains that the Relay Chain can support without any 
degradation in performance is yet to be discovered. Also, with the 
[blockspace over blockchains](https://www.rob.tech/polkadot-blockspace-over-blockchains/) paradigm which brings
parathreads into the picture, there is no hard limit number on the number of blockchains that can be supported 
by {{ polkadot: Polkadot :polkadot }} {{ kusama: Kusama :kusama }}.

### What happens to parachains when the number of validators drops below a certain threshold?

The minimal safe ratio of validators per parachain is 5:1. With a sufficiently large set of
validators, the randomness of their distribution along with
[availability and validity](learn-availability.md) will make sure security is on-par. However,
should there be a big outage of a popular cloud provider or another network connectivity
catastrophe, it is reasonable to expect that the number of validators per chain will drop.

Depending on how many validators went offline, the outcome differs.

If a few validators went offline, the parachains whose validator groups are too small to validate a
block will skip those blocks. Their block production speed will slow down to an increment of six
seconds until the situation is resolved and the optimal number of validators is in that parachain's
validator group again.

If anywhere from 30% to 50% of the validators go offline, availability will suffer because we need
two-thirds of the validator set to back the parachain candidates. In other words, all parachains
will stop until the situation is resolved. Finality will also stop, but low-value transactions on
the Relay Chain should be safe enough to execute, despite common forks. Once the required number of
validators are in the validator set again, parachains will resume block production.

Given that collators are full nodes of the Relay Chain and the parachain they are running, they will
be able to recognize a disruption as soon as it occurs and should stop producing block candidates.
Likewise, it should be easy for them to recognize when it's safe to restart block production -
perhaps based on finality delay, validator set size or some other factor that is yet to be decided
within [Cumulus](https://github.com/paritytech/cumulus).

### Parachain Development Kits (PDKs)

Parachain Development Kits are a set of tools that enable developers to create their own
applications as parachains. For more information, see the
PDK content](../build/build-parachains.md#parachain-development-kit-pdk) and [Parachain Development page](../build/build-parachains.md).

## Security

### Is security correlated to the number of validators? What about the number of parachains?

Security is independent of the number of parachains that are connected to the Polkadot Relay Chain.
The correlation of security and the number of validators exists as the higher number of validators
will give the network stronger decentralization properties and make it harder to try to take down.
However, the biggest indicator of the security of the network is the economic signal of the number
of DOT that are bonded and staked. The greater the number of DOT staked by honest validators and
nominators, the higher the minimum amount of DOT an attacker would need to acquire a validator slot.

### Will parachains ever need their own security? In what scenarios do parachains need their own security?

Most parachains will not need to worry about their own security, since all state transitions will be
secured by the Polkadot Relay Chain validator set. However, in some cases (which are considered more
experimental), parachains may require their own security. In general, these cases will revolve
around lack of data available to Relay Chain validators.

One example is if the state transition function is some succinct or zero-knowledge proof, the
parachain would be responsible for keeping its data available as the Relay Chain won't have it.
Additionally, for chains with their own consensus, like the one that enables fast payments on
[Blink Network](https://www.youtube.com/watch?v=sf5GMDlG7Uk), there would probably need to be a
Byzantine agreement between stakers before a parachain block is valid. The agreement would be
necessary because the data associated with the fast consensus would be unknown to Relay Chain
validators.

## Slot Auctions

### How will parachain slots be distributed?

Parachain slots are acquirable through auction. For more information on the auction process, please 
see the {{ polkadot: [parachain slot auctions](learn-auction.md) :polkadot }}
{{ kusama: [parachain slot auctions](learn-auction.md) :kusama }} article. Additionally, some parachain
slots will be set aside to run {{ polkadot: [parathreads](learn-parathreads.md) :polkadot }}
{{ kusama: [parathreads](learn-parathreads.md) :kusama }} &mdash; chains that bid on a per-block
basis to be included in the Relay Chain. (Parathreads are not implemented yet.)

### Why doesn't everyone bid for the max length?

For the duration of the slot, the tokens used for bidding in the auction are locked up. This
suggests there is an opportunity cost associated with bidding, as the tokens could have been
leveraged for something else.

### How does this mechanism help ensure parachain diversity?

The method for dividing the parachain slots into intervals was partly inspired by the desire to
allow for a greater amount of parachain diversity, while preventing particularly large and
well-funded parachains from hoarding slots. By making each period a
{{ polkadot: three-month duration but the
overall slot a 2-year duration :polkadot }}{{ kusama: 6-week duration but the overall slot a 1-year
duration :kusama }}, the mechanism can cope with well-funded parachains, ensuring they secure a slot
at the end of their lease, while gradually allowing other parachains to enter the ecosystem to
occupy the durations that are not filled. For example, if a large, well-funded parachain has already
acquired a slot for range 1 - 8, they would be very interested in getting the next slot that would
open for 2 - 9. Under this mechanism, that parachain could acquire just period 9 (since that is the
only one required) and allow the 2 - 8 range of the second parachain slot to be occupied by another
party.

### Why is randomness difficult on blockchains?

Generating a random number trustlessly on a transparent and open network opens up the possibility
for bad actors to attempt to alter or manipulate the randomness. There have been a few solutions
that have been proposed, including hash-onions like [RANDAO](https://github.com/randao/randao) and
[verifiable random functions](https://en.wikipedia.org/wiki/Verifiable_random_function) (VRFs). The
latter is what {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} uses as a base for its
randomness.

### Are there other ways of acquiring a slot besides the candle auction?

Aa parachain slot can also be acquired through a secondary market where a 3rd party has already won
a parachain slot and has the ability to resell the slot along with the associated deposit of tokens
that are locked up to another buyer. This would allow the seller to get liquid tokens in exchange
for the parachain slot and the buyer to acquire the slot as well as the deposited tokens.

A number of system or common-good parachains may be granted slots by the
[governing bodies](learn-governance.md) of the Relay Chain. System parachains can be recognized by a
parachain ID lower than 1_000, and common-good parachains by a parachain ID between 1_000 and 1_999.
Other parachains will have IDs 2_000 or higher. Such parachains would not have to bid for or renew
their slots as they would be considered essential to the ecosystem's future.

### How are auctions scheduled?

The parachain slot auctions are scheduled through the governance. At least 2/3 of the Council can
initiate an auction, however, Root origin (via referendum) is needed to cancel an auction. Here is a
proposal that gives a glimpse of what goes into planning auctions schedule -
[Proposed Polkadot Auction Schedule 2022](https://polkadot.polkassembly.io/post/863).