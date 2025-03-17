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

Polkadot 1.0 reflected the status of Polkadot in 2023 at time of the release of the
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
  [Nominated-Proof-of-Stake (NPoS)](../learn/learn-staking.md#nominated-proof-of-stake-npos)
  mechanism along with its consensus mechanism, secures L1 chains out-of-the-box without having to
  bootstrap security on their own.
- **Secure interoperability.** Any L1 chain attached to Polkadot (as well as L2 chains built on top
  of them) can benefit from Polkadot's native interoperability and will thus be able to communicate
  and exchange value and information with other parachains.
- **Truly resilient infrastructure.** This is achieved by keeping the network decentralized without
  compromising scalability and throughput and through on-chain
  [treasury](../learn/learn-polkadot-opengov-treasury.md) funds that can be accessed through
  governance referendum. Those funds guarantee constant sponsorship for events, initiatives,
  educational material, education, software development, etc.
- **Fast development and deployment of L1 chains.** This is achieved through the modular and
  flexible [Polkadot SDK Substrate](./glossary.md#substrate).
- **Fostering next-gen of Web3 core developers.** This is achieved through different initiatives
  such as:
  - [The Polkadot Blockchain Academy](https://polkadot.network/development/academy/)
  - [Polkadot Alpha Program](./alpha-program.md)
  - [Polkadot Developer Heroes Program](./dev-heroes.md)
  - [Edx Courses](https://www.edx.org/school/web3x)
  - Rust and Substrate Courses (coming soon)

### Polkadot's Representation

Polkadot has a relay chain acting as the main chain of the system. The Polkadot relay chain is
represented as a ring surrounded by multiple parachains attached to it. Based on Polkadot's design,
as long as a chain's logic can compile to Wasm and adheres to the relay chain API, then it can
connect to the Polkadot network as a parachain.

![polkadot-relay-chain](../assets/polkadot_relay_chain.png)

Parachains construct and propose blocks to validators on the relay chain, where the blocks undergo
rigorous [availability and validity](../learn/learn-parachains-protocol.md) checks before being
added to the finalized chain. As the relay chain provides the security guarantees,
[collators](../learn/learn-collator.md) - full nodes of these parachains - do not have any security
responsibilities, and thus do not require a robust incentive system. This is how the entire network
stays up to date with the many transactions that take place.

The [Cross-Consensus Messaging Format (XCM)](../learn/learn-xcm.md) allows parachains to send
messages of any type to each other. The shared security and validation logic of the relay chain
provide the environment for trust-free message passing that opens up true interoperability.

In order to interact with chains that want to use their own finalization process (e.g. Bitcoin),
Polkadot has [bridges](../learn/learn-bridges.md) that offer two-way compatibility, meaning that
transactions can be made between different parachains.

### Polkadot's Additional Functionalities

The Polkadot relay chain managed [crowdloans](../learn/archive/learn-crowdloans.md) and
[auctions](../learn/archive/learn-auction.md). Relay chain cores were leased via auctions in 3-month
chunks for a maximum of two years, and crowdloans allowed users to trustlessly loan funds to teams
for lease deposits in exchange for pre-sale tokens. There was no other way you could access cores on
Polkadot 1.0.

The relay chain currently manages other tasks such as [staking](../learn/learn-staking.md),
[accounts](./../learn/learn-accounts.md), [balances](../learn/learn-transactions.md#balance-transfers),
and [governance](../learn/learn-polkadot-opengov.md).

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
- The [1KV program](../learn/archive/thousand-validators.md) aims to incentivize new operators to
  become network participants and further increase physical (how many validator nodes per service
  provider) and social decentralization (how many validator nodes per operator). Those can be
  explored with the [Polkawatch App](https://polkadot.polkawatch.app/).
- An on-chain treasury and governance (see: [OpenGov](../learn/learn-polkadot-opengov.md)) where
  every decision goes through public referenda and any token holder can cast a vote.

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
the relay chain to provide shared security and interoperability. Blockspace is only accessible
through auctions, but an auction winner has access to a "freighter of blocks" regardless it is
needed or not. This creates high entry barriers and it can lead to waste of energy and resources.

For more information about blockspace see [this interview](https://youtu.be/e1vISppPwe4) with Robert
Habermeier as well as [this article](https://www.rob.tech/polkadot-blockspace-over-blockchains/) by
him.

### A Perspective Shift: Upcoming Polkadot Features

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
of [Web3](./web3-and-polkadot.md) applications.