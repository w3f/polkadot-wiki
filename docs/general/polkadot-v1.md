---
id: polkadot-v1
title: Polkadot 1.0
sidebar_label: Polkadot 1.0
description: Polkadot's 1.0, Blockspace, Decentralization and Resilience.
keywords: [polkadot vison, polkadot 1.0, Blockspace, Resilience, Decentralization]
slug: ../polkadot-v1
---

Since the release of Bitcoin in 2009, blockchain projects increased exponentially to the order of
tens of thousands. Different projects have different value propositions, suggesting that the future
will be multi-chain and that inter-chain communication will be crucial to establish collaborations
and leveraging each other strengths.

## Polkadot 1.0

Polkadot 1.0 reflects the status of Polkadot in 2023 at time of the release of the
[Polkadot runtime v1.0.0](https://github.com/paritytech/polkadot/releases/tag/v1.0.0). This sections
focuses on Polkadot 1.0 and some philosophical digressions about network resilience and blockspace.

Polkadot is a Layer-0 blockchain that brings to the multi-chain vision the following innovations and
initiatives:

- **Application-specific Layer-1 (L1) blockchains (or parachains).** Polkadot is a sharded network
  where transactions are processed in parallel with each shard. Polkadot shards can be heterogenous
  (i.e. they do not need the same state transition function as in the proposed Ethereum sharding
  architecture). This allows to build L1 chains designed explicitly around their application and
  value proposition.
- **Shared security and financial scalability of L1 chains**. Any L1 chain attached to a Polkadot
  core can benefit from Polkadot shared security model. This means the Polkadot
  Nominated-Proof-of-Stake (NPoS) mechanism along with its consensus mechanism, will secure L1
  chains out-of-the-box without having to bootstrap security on their own.
- **Secure interoperability.** Any L1 chain attached to Polkadot (as well as L2 chains built on top
  of them) can benefit from Polkadot's native interoperability and will thus be able to communicate
  and exchange value and information with other parachains.
- **Truly resilient infrastructure.** This is achieved by keeping the network decentralized without
  compromising scalability and throughput and through on-chain treasury funds that can be accessed
  through governance referendum. Those funds guarantee constant sponsorship for events, initiatives,
  educational material, education, software development, etc.
- **Fast development and deployment of L1 chains.** This is achieved through the modular and
  flexible [Polkadot SDK Substrate](./glossary.md#substrate).
- **Fostering next-gen of Web3 core developers.** This is achieved through different initiatives
  such as:
  - [The Polkadot Blockchain Academy](https://polkadot.network/development/academy/)
  - [Substrate Builders Program](./builders-program.md)
  - [Polkadot Developer Heroes Program](./dev-heroes.md)
  - [Edx Courses](https://www.edx.org/school/web3x)
  - Rust and Substrate Courses (coming soon)

### Polkadot's Representation

The Polkadot realy-chain has been represented as a relay chain surrounded by multiple parachains
attached to it. Parachains can communicate with each other using a generalized
[cross-chain messaging format (XCM)](./learn-xcm-index), allowing messages to be delivered across
chains having different logic.

### Polkadot's Additional Functionalities

The Polkadot relay-chain also manges [crowdloans](../learn/learn-crowdloans.md),
[auctions](../learn/learn-auction.md), [staking](../learn/learn-staking.md),
[accounts](./learn-accounts-index), [balances](../learn/learn-balance-transfers.md), and
[governance](../learn/learn-polkadot-opengov.md). Parachain slots or cores are leased in 6-month
chunks for a maximum of two years, and crowdloans allow users to trustlessly loan funds to teams for
lease deposits in exchange for pre-sale tokens. There is no other way you could use Polkadot 1.0.

### Polkadot's Resilience

Decentralization is a crucial aspect of blockchain networks, but there is a trade-off between:

- having an over-decentralized network that struggles to reach consensus and consumes a lot of
  energy to operate, and
- having a network that reaches consensus fast at the expense of being centralized, making it
  trivial to manipulate or attack.

Ideally, a network should be decentralized "enough" to make it practically impossible for someone to
exert manipulative or malicious influence on the network. So, **decentralization is a tool while the
goal is resilience**, which is achieved by additionally providing on-chain treasury and governance
mechanism allowing continuous incentives for the network's participants without relying on
intermediaries or centralized entities.

Currently, Polkadot 1.0 achieve resilience through the following strategies:

- Nominated Proof of Staking (NPoS) where the stake per validator is maximized and evenly
  distributed across validators.
- The [1KV program](./thousand-validators.md) aims to incentivize new operators to become network
  participants and further increase physical (how many validator nodes per service provider) and
  social decentralization (how many validator nodes per operator). Those can be explored with the
  [Polkawatch App](https://polkadot.polkawatch.app/).
- An on-chain treasury and governance (see: [OpenGov](../learn/learn-polkadot-opengov.md) where
  every decision goes though public referenda and any token holder can cast a vote.

### Polkadot's Blockspace

The design and realization of Polkadot 1.0 allowed its creators to enable commoditization of
blockspace.

A blockchain is a way to store data. The storage unit is the block, and once a block is finalized
onto the chain, it is practically impossible to modify the data within that block. In addition to
being tamper-proof, public permissionless blockchains like Polkadot store data that are visible to
everybody (i.e. public), and anybody can become a network participant permissionlessly.

**Blockspace** is the capacity of a blockchain to finalize and commit operations. It represents a
blockchain's security, computing, and storage capability as an end product. Blockspace produced by
different blockchains can vary in security, flexibility, and availability.

- **Security**, intended as how secure the blockspace is. In Proof-of-Stake (PoS) networks, this is
  directly related to how much stake is locked on validator nodes, how much variance in stake there
  is between validators (i.e. how easy it is to attack a single validator), and how many validators
  there are securing the network (i.e. how easy it is for colluding validators to exert influence on
  the network). Additionally, it is also important to look at how many validators are owned by
  single operators (this will determine the degree of social centralization of the network), and how
  many validators run on the same service provider (this will determine the degree of physical
  centralization of the network).
- **Flexibility**, intended as how flexible the blockspace is, what can be done with it, and what
  type of data can be stored. Data quality plays an important role depending on the type of network.
  One might avoid having situations in which poor quality data flood blockspace hindering the prompt
  execution of vital processes.
- **Availability**, intended as how available blockspace is and how difficult it is to access it. It
  should not be too difficult to get your hands on it so that any business model can thrive using
  it. Ideally, a marketplace must drive the blockspace price based on demand, with secondary market
  options to ensure the usage of "second-hand" blockspace.

Polkadot has been designed around those core blockspace principles. However, its design can be
further improved such that the tasks which are currently managed on the relay chain, such as
balances transfers, staking, and governance, can be delegated to
[system parachains](../learn/learn-system-chains.md) to increase flexibility and to focus the use of
the relay-chain to provide shared security and interoperability. Blockspace is only accessible
through slot auctions, but an auction winner has access to a "freighter of blocks" regardless it is
needed or not. This creates high entry barriers and it can lead to waste of energy and resources.

For more information about blockspace the [this interview](https://youtu.be/e1vISppPwe4) to Robert
Habermeier as well as [this article](https://www.rob.tech/polkadot-blockspace-over-blockchains/) by
him.

### A Perspective Shift: Upcoming Polkadot Features Development

As with many other projects before Polkadot, at some point in time after achieving the
initially-planned goals, a perspective shift allows you to understand better what your project is
about and what you actually have built. This allows you to "run the extra mile" and achieve more
than what was originally planned.

The quote below by [Marcel Proust](https://en.wikipedia.org/wiki/Marcel_Proust) must remind us that
sometimes a perspective shift is crucial in _understanding_ the world, and perhaps it is more
important than _seeing more_ of the world.

_The only true voyage of discovery, the only fountain of Eternal Youth, would be not to visit
strange lands but to possess other eyes._

Thus, if we start to see Polkadot with _other eyes_ we can truly envision its potential and what it
could become.

Polkadot is perfecting its implementation through [RFCs](https://github.com/polkadot-fellows/RFCs)
to continue being a decentralized, secure, ubiquitous computing engine to power the next generation
of Web3 applications.
