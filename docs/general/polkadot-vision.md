---
id: polkadot-vision
title: Polkadot Vision
sidebar_label: Polkadot Vision
description: Polkadot's Vision revealed by Gavin Wood at Decoded 2023.
keywords: [polkadot vison, polkadot]
slug: ../polkadot-vision
---

## A Multi-chain Future

Since the release of Bitcoin in 2009, blockchain projects increased exponentially to the order of
tens of thousands. Different projects have different value propositions, suggesting that the future
will likely be multi-chain and that inter-chain communication will be crucial to establish
collaborations and leveraging each other strengths.

## Polkadot 1.0

Polkadot 1.0 is a Layer-0 blockchain that brings to the multi-chain vision the following innovative
concepts and initiatives:

- **Application-specific Layer-1 (L1) blockchains (or parachains).** Polkadot is a sharded network
  where data are processed in parallel within each shard. Polkadot shards can be heterogenous (i.e.
  they do not need to be the exact copy of the original shards, like in Ethereum shards). This
  allows to build L1 chains designed explicitly around their application and value proposition.
- **Shared security and financial scalability of L1 chains**. Any L1 chain attached to a Polkadot
  core (and any other L2 solution to scale that L1) will benefit from Polkadot shared security
  model. This means the Polkadot NPoS mechanism will secure L1 and L2 chains without worrying about
  proof-of-stake.
- **Secure interoperability.** Any L1 chain attached to a Polkadot core will benefit from Polkadot's
  native interoperability, and will thus be able to communicate and exchange value and information
  with other parachains.
- **Truly resilient infrastructure.** This is achieved by keeping the network decentralized without
  compromising scalability and throughput, and through on-chain treasury funds that can be accessed
  through governance referendum. Those funds guarantee constant sponsorship for events, initiatives,
  educational material, software development, etc., without any central entity being able to
  interfere.
- **Fast deployment of L1 chains.** This is achieved through the modular and flexible
  [Polkadot SDK Substrate](./glossary.md#substrate).
- **Fostering next-gen of Web3 core developers.** This is achieved through different initiatives
  such as:
  - [The Polkadot Blockchain Academy](https://polkadot.network/development/academy/)
  - [Substrate Builders Program](./builders-program.md)
  - [Polkadot Developer Heroes Program](./dev-heroes.md)
  - [Edx Courses](https://www.edx.org/school/web3x)
  - Rust and Substrate Courses (coming soon)

The Polkadot relay-chain also manges [crowdloans](../learn/learn-crowdloans.md),
[auctions](../learn/learn-auction.md), [staking](../learn/learn-staking.md),
[accounts](./learn-accounts-index), [balances](../learn/learn-balance-transfers.md), and
[governance](../learn/learn-polkadot-opengov.md). Parachain slots or cores are leased in 6-month
chunks for a maximum of two years, and crowdloans allow users to trustlessly loan funds to teams for
lease deposits in exchange for pre-sale tokens. There is no other way you could use Polkadot 1.0.

The Polkadot realy-chain has been represented as a central ring surrounded by multiple parachains
attached to its cores. Parachains can communicate with each other using a generalized
[cross-chain messaging format (XCM)](./learn-xcm-index) allowing messages to be delivered across
chains having different logic.

But, as with many other projects before Polkadot, at some point in time after achieving the
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

### Decentralization as a Tool

Decentralization is a crucial aspect when building a blockchain, but there must be a trade-off
between:

- having an over-decentralized network that struggles to reach consensus and consumes a lot of
  energy to stay online, and
- having an under-decentralized network that reaches consensus fast at the expense of being
  centralized and trivial to attack.

Ideally, a network should be decentralized enough to make it practically impossible for someone to
stop all nodes and take the network down. So, decentralization is a tool while the goal is
resilience, which is achieved by additionally providing on-chain treasury and governance mechanism
allowing continuous financial incentives for the network's participants without intermediaries or
centralized entities being able to stop the network's progress.

Currently, Polkadot 1.0 has a good degree of resilience because:

- The stake per validator is maximized and evenly distributed across validators.
- Physical (how many validator nodes per service provider) and social decentralization (how many
  validator nodes per operator) are satisfactory and they can be explored with the
  [Polkawatch App](https://polkadot.polkawatch.app/). The [1KV program](./thousand-validators.md)
  aims to incentivize new operators to become network participants and further increase
  decentralization.
- On-chain treasury is in place together with the Polkadot OpenGov where every decision goes though
  public referenda and any toke holder can vote on them.

### Blockspace

The design and realization of Polkadot 1.0 allowed its creators to truly realize the importance of
blockspace.

A blockchain is a way to store data. The storage unit is the block, and once a block is finalized
onto the chain, it is practically impossible to modify the data within that block. In addition to
being tamper-proof, public permissionless blockchains like Polkadot store data that are visible to
everybody (i.e. public), and anybody can become a network participant (i.e. permissionless).

So, the raw material produced by blockchains is blockspace; and how blockspace is organized,
accessed, and used will eventually shape the degree of scalability of the network. There are three
distinctive blockspace features:

- **security**, intended as how secure the blockspace is. In Proof-of-Stake (PoS) networks, this is
  directly related to how much stake is locked on validator nodes, how much variance in stake there
  is between validators (i.e. how easy it is to spot and attack single validators), and how many
  validators there are securing the network (i.e. how easy it is to collude validators and stop the
  network). Additionally, it is also important to look at how many validators are owned by single
  operators (this will determine the degree of social centralization of the network), and how many
  validators run on the same service provider (this will determine the degree of physical
  centralization of the network).
- **flexibility**, intended as how flexible the blockspace is, what can be done with it, and what
  type of data can be stored. Data quality plays an important role depending on the type of network.
  One might avoid having situations in which poor quality data flood blockspace hindering the prompt
  execution of vital processes.
- **availability**, intended as how available blockspace is and how difficult it is to access it. It
  should not be too difficult to get your hands on it so that any business model (not only DeFi) can
  thrive using it. Ideally, a marketplace must drive the blockspace price based on demand, with
  secondary market options to ensure the usage of "second-hand" blockspace.

| Security | Flexibility | Availability |
| :------: | :---------: | :----------: |
|  **+**   |   **++**    |    **+**     |

Polkadot's blockspace security is somewhat satisfactory but as secure as other PoS networks like
Ethereum. Blockspace flexibility is good but can be improved as tasks such as balances transfers,
staking, governance, etc. can be delegated to [system parachains](../learn/learn-system-chains.md).
Availability is limited as blockspace is only accessible through slot auctions. Still, on the other
hand, an auction winner has access to a "freighter of blocks" regardless it is needed or not. This
can lead to waste of energy and resources.

For more information about blockspace the [this interview](https://youtu.be/e1vISppPwe4) to Robert
Habermeier as well as [this article](https://www.rob.tech/polkadot-blockspace-over-blockchains/) by
him.

## Polkadot 2.0

Understanding what Polkadot 1.0 is about, and the philosophy behind it, will help us to envision the
future direction of the ecosystem.
