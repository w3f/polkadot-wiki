---
id: learn-common-goods
title: Common Good Parachains
sidebar_label: Common Good Parachains
description: Learn about Common Good Parachains and ones currently on the network.
slug: ../learn-common-goods
---

## Overview

"Common Good" parachains are parachain slots reserved for functionality that benefits the ecosystem
as a whole. By allocating a subset of parachain slots to common good chains, the entire network can
realize the benefit of valuable parachains that would otherwise be underfunded due to the free-rider
problem. They are not allocated via the parachain auction process but by the on-chain
{{ polkadot: [governance](learn-governance.md) :polkadot }}
{{ kusama: [governance](mirror-learn-governance.md) :kusama }} system. Generally, a common good
parachain's lease would not expire; it would only be removed via governance.

The purpose of these parachains will probably fall into one of two categories: system level chains
or public utility chains.

## System Level Chains

System level chains move functionality from the Relay Chain into parachains, minimizing the
administrative use of the Relay Chain. For example, a governance parachain could move all the
governance processes from the Relay Chain into a parachain. Adding a system level chain is generally
uncontroversial because they merely move functionality that the stakeholders already agreed was
useful from one place (the Relay Chain) to another (a parachain).

Moving the logic from the Relay Chain to a parachain is an optimization that makes the entire
network more efficient. Moving system level logic to a parachain frees capacity in the Relay Chain
for its primary function: validating parachains. Adding a system level chain could make the network
capable of processing several more parachains. Rather than taking a slice of a 100 parachain pie, a
system level chain takes one slice and bakes a bigger pie.

The vast majority of common good chains will likely be unopinionated system level chains.

## Public Utility Chains

Public utility chains add functionality that doesn’t exist yet, but that the stakeholders believe
will add value to the entire network. Because public utility chains add new functionality, there is
a subjective component to their addition: the network's stakeholders must believe that it is
worth allocating a slot that would otherwise go to the winners of an auction and thus would have an
objective expression conviction from its backers. Governance provides the means to internalize
the value of the parachain slot and distribute it across all members of the network.

Public utility chains will always be fully aligned with their Relay Chain stakeholder base. This
means that they will adopt the Relay Chain's native token (i.e. DOT or KSM) as their native token
and respect any messages incoming from the Relay Chain and system level parachains at face value.

Some examples of potential public utility chains are bridges, DOT/KSM-denominated smart contract
platforms, and [generic asset chains](#statemint).

Public utility parachains would typically grant privileged business logic to Polkadot’s governance.
Just as the Polkadot Relay Chain has several privileged functions like setting the validator count
or allocating DOT from the Treasury, these parachains can have privileged functions like changing
system parameters or triggering an upgrade.

Because public utility chains add functionality beyond the scope of the Relay Chain, they will
likely be approved by the network stakeholders only in rare scenarios.

## Common Good Chains

### Statemint

[Statemint](https://github.com/paritytech/cumulus/tree/master/polkadot-parachains/statemint) 
(and its cousin *Statemine* on Kusama) are the first common good parachains.

Statemint is a public utility chain in that it adds functionality not available in the Relay Chain, 
namely, the creation and management of assets. Statemint will support both fungible and non-fungible 
assets. The chain offers an interface similar to ERC-20 for fungible tokens and ERC-721 for non-fungible 
token. These interfaces are in the logic of the chain itself; by encoding this logic directly into the 
Statemint runtime, token storage, and actions do not need to be metered and can happen faster and cheaper.

Like most common good chains, Statemint will use the DOT token as its native token, i.e. represented
in its instance of the Balances pallet. Statemint trusts messages about balances from the Relay
Chain, and vice versa, so users can transfer DOT from the Relay Chain to their address on Statemint
and back.

Because of the efficiency of executing logic in a parachain, the transaction fees and deposits
(including the existential deposit) are about 1/10th of their value on the Relay Chain. These low fee
levels mean that Statemint is well suited to handling DOT balances and transfers as well as managing
on-chain assets.

As a common good parachain, Statemint must stay fully aligned with the Relay Chain. Upgrades to
Statemint will require the Relay Chain's "root origin", i.e. a referendum. Some of the other logic
(like privileged asset functionality) will defer to the Relay Chain's Council.

### Encointer

Encointer will become Kusama's second common good parachain, which adds logic to the Relay Chain
that aims to bring financial inclusivity to WEB3 and mitigate Sybil attacks with a novel 
Proof of Personhood (PoP) system for unique identity. 

Encointer offers a framework that, in principle, allows for any group of real people to create, 
distribute and use their own digital community tokens.

Encointer aims to invert the [Cantillon Effect](https://www.newworldencyclopedia.org/entry/Richard_Cantillon), 
where money is issued at the bottom, and not as credit to businesses or creditworthy individuals. This way, 
every individual gets a [universal basic income (UBI)](https://book.encointer.org/economics-ubi.html).

To resist Sybil attacks, the Encointer protocol uses a PoP mechanism to foster a 
unique identity system. The notion is that a person can only be present at one place at a given time. 
Participants are requested to attend physical key-signing ceremonies with small groups of random people 
at randomized locations, where these local meetings are part of one global ceremony that co-occur. 
Participants use the Encointer wallet app to participate in these ceremonies, and the wallet enables the 
management of local community currencies. Watch an Encointer ceremony in action in 
[this video](https://www.youtube.com/watch?v=tcgpCCYBqko).

The protocol involves [other mechanisms](https://book.encointer.org/ssi.html#privacy-considerations) to 
protect the privacy of users in addition to the physical key-signing ceremonies.

Encointer falls under common good logic as it offers a Sybil defense mechanism and a basis for digital 
democracy. This can also be adapted by system level chains which can use the unique identity system to 
prevent Sybil attacks, and use PoP for token airdrops or faucets.

> Encointer is currently in testnet phase, and its mainnet is planned for launch as a common good parachain 
> on Kusama. To learn more about Encointer, check out the official 
> [Encointer book](https://book.encointer.org/introduction.html).

### Bridges

See the [Bridges page](learn-bridges.md) for information on the latest bridge projects.
