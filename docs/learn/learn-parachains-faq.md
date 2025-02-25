---
id: learn-parachains-faq
title: Parachains FAQ
sidebar_label: Parachains FAQ
description: Parachains FAQ.
keywords: [parachains, application-specific, sharding, faq]
slug: ../learn-parachains-faq
---

<!-- MessageBox -->
<div id="messageBox" class="floating-message-box">
  <p>
    Parachain Slot Auctions and Crowdloans will be deprecated right after
    <a href="./learn-agile-coretime" target="_blank" rel="noopener noreferrer">
      Agile Coretime
    </a>
    is activated on the network. For existing parachains, the remainder of the lease will automatically be converted to coretime. See more information
    <a href="./learn-agile-coretime#implementation" target="_blank" rel="noopener noreferrer">
      here.
    </a>
  </p>
  <button class="close-messagebox" aria-label="Close message">✖</button>
</div>

## General

### What is "parachain consensus"?

"Parachain consensus" is special in that it will follow the relay chain. Parachains cannot use other
consensus algorithms that provide their own finality. Only sovereign chains (that must bridge to the
relay chain via a parachain) can control their own consensus. Parachains have control over how
blocks are authored and by whom. The relay chain guarantees valid state transitions. Executing a
block finality outside the context of the relay chain is outside the scope of trust that the relay
chain provides.

### How about parachains that are not Substrate-based?

Substrate provides [FRAME Pallets](https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk/#frame)
as part of its framework to seamlessly build a rustic-based blockchain. Part of FRAME are pallets
that can be used for consensus. Polkadot, being a Substrate-based chain, relies on BABE as the block
production scheme and GRANDPA as the finality gadget as part of its consensus mechanism.
Collectively, this is a [Hybrid Consensus Model](learn-consensus.md#hybrid-consensus), where block
production and block finality are separate. Parachains only need to produce blocks as they can rely
on the relay chain to validate the state transitions. Thus, parachains can have their own block
production where the [collators](learn-collator.md) act as the block producers, even if the
parachain is not Substrate-based.

### Is 100 a hard limit on the number of Parachains that can be supported?

No. The network went through a significant number of optimizations, and there are
[several updates planned](https://polkadot.network/blog/polkadot-roadmap-roundup/) in the near
future. The exact number of parachains that the relay chain can support without any degradation in
performance is yet to be discovered. Also, with the
[blockspace over blockchains](https://www.rob.tech/polkadot-blockspace-over-blockchains/) paradigm
which brings on-demand parachains into the picture, there is no hard limit number on the number of
blockchains that can be supported by the relay chain.

### What happens to parachains when the number of validators drops below a certain threshold?

The minimal safe ratio of validators per parachain is 5:1. With a sufficiently large set of
validators, the randomness of their distribution along with
[availability and validity](./learn-parachains-protocol.md#availability-and-validity-anv-protocol) will make sure security is
on-par. However, should there be a big outage of a popular cloud provider or another network
connectivity catastrophe, it is reasonable to expect that the number of validators per chain will
drop.

Depending on how many validators went offline, the outcome differs.

If a few validators went offline, the parachains whose validator groups are too small to validate a
block will skip those blocks. Their block production speed will slow down to an increment of six
seconds until the situation is resolved and the optimal number of validators is in that parachain's
validator group again.

If anywhere from 30% to 50% of the validators go offline, availability will suffer because we need
two-thirds of the validator set to back the parachain candidates. In other words, all parachains
will stop until the situation is resolved. Finality will also stop, but low-value transactions on
the relay chain should be safe enough to execute, despite common forks. Once the required number of
validators are in the validator set again, parachains will resume block production.

Given that collators are full nodes of the relay chain and the parachain they are running, they will
be able to recognize a disruption as soon as it occurs and should stop producing block candidates.
Likewise, it should be easy for them to recognize when it's safe to restart block production -
perhaps based on finality delay, validator set size or some other factor that is yet to be decided
within [Cumulus](https://github.com/paritytech/polkadot-sdk/tree/master/cumulus).

### Parachain Development Kits (PDKs)

Parachain Development Kits are a set of tools that enable developers to create their own
applications as parachains. For more information, see the PDK
content](../build/build-parachains.md#parachain-development-kit-pdk) and
[Parachain Development page](../build/build-parachains.md).

## Security

### Is security correlated to the number of validators? What about the number of parachains?

Security is independent of the number of parachains that are connected to the Polkadot relay chain.
The correlation of security and the number of validators exists as the higher number of validators
will give the network stronger decentralization properties and make it harder to try to take down.
However, the biggest indicator of the security of the network is the economic signal of the number
of DOT that are bonded and staked. The greater the number of DOT staked by honest validators and
nominators, the higher the minimum amount of DOT an attacker would need to acquire a validator slot.

### In what scenarios do parachains need their own security?

Most parachains will not need to worry about their own security, since all state transitions will be
secured by the Polkadot relay chain validator set. However, in some cases (which are considered more
experimental), parachains may require their own security. In general, these cases will revolve
around lack of data available to relay chain validators.

One example is if the state transition function is some succinct or zero-knowledge proof, the
parachain would be responsible for keeping its data available as the relay chain won't have it.
Additionally, for chains with their own consensus, like the one that enables fast payments on
[Blink Network](https://www.youtube.com/watch?v=sf5GMDlG7Uk), there would probably need to be a
Byzantine agreement between stakers before a parachain block is valid. The agreement would be
necessary because the data associated with the fast consensus would be unknown to relay chain
validators.
