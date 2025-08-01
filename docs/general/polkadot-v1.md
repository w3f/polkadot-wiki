---
title: Polkadot 1.0
description: Explore Polkadot 1.0's innovations, including blockspace, decentralization, shared security, and its vision for a multi-chain future.
---

Since the release of Bitcoin in 2009, blockchain projects have increased exponentially to the order of
tens of thousands. Different projects have different value propositions, suggesting that the future
will be multi-chain and that inter-chain communication will be crucial to establish collaborations
and leverage each other's strengths.

## Polkadot 1.0

Polkadot 1.0 reflected the status of Polkadot in 2023 at the time of the release of the
[Polkadot runtime v1.0.0](https://github.com/paritytech/polkadot/releases/tag/v1.0.0). This section
focuses on Polkadot 1.0 and some philosophical digressions about network resilience and blockspace.

Polkadot is a blockchain-based decentralized computer that brings to the blockchain industry the following innovations:

- **Rollup Chains (parachains).** These are application-specific chains connected to Polkadot. Polkadot is a sharded network
  where transactions are processed in parallel within each shard. Continuing the comparison of Polkadot being a decentralized computer, Polkadot has a virtual CPU with virtual cores (shards). Polkadot cores are the gateway for rollup chains to use Polkadot as a service for shared security and interoperability (see below).

    !!!info "Rollups or Parachains?"
        Polkadot rollups used to be referred to as parachains in the past. This reflected the technical nature of parachains, blockchains running in parallel as Polkadot shards. However, the technological nature of parachains is akin to a rollup protocol. Due to the broad industry acceptance of the term "rollup", parachains are, in a way, rollup chains: fully-fledged blockchains utilizing Polkadot's rollup mechanism for security guarantees. A comparison between Polkadot rollups and other rollup technologies is available [here](../learn/learn-comparisons-rollups.md#rollup-comparison-table).

- **Execution sharding.** Polkadot introduced execution sharding on top of data sharding. Data sharding essentially refers to rollup data living in each shard (rollup chain), and being permanently fragmented (more on this later). Polkadot also introduced [the ELVES security protocol](../learn/learn-parachains-protocol.md), assigning a subset of validators to each Polkadot virtual core to check incoming data from each rollup. Secondary checks and dispute-driven escalation effects ensure the system stays secure, and eventually, all validators will be engaged in critical situations. Execution sharding is at the core of Polkadot's scalability because:

    - Not all validators always check everything
    Validators feature an in-core/on-chain dualism: they not only commit to the blockchain's state but also participate in data availability, re-executing, and checking data coming through Polkadot's virtual cores.

    This system allows Polkadot to have many virtual cores and process data coming through those cores simultaneously, natively, and without compromising security.

- **Shared security**. Any rollup chain attached to a Polkadot
  virtual core can benefit from Polkadot's shared security and interoperability model. This means the Polkadot
  [Nominated-Proof-of-Stake (NPoS)](../learn/learn-staking.md#nominated-proof-of-stake-npos)
  mechanism along with ELVES, can secure fully-fledged blockchains out-of-the-box without bootstrap security.

- **Secure interoperability.** Any rollup chain attached to a Polkadot core, as well as Layer-two (L2) chains built on top of them, can benefit from Polkadot's native interoperability via [XCM](../learn/learn-xcm.md) and can thus communicate and exchange value and information with other Polkadot rollup chains. Examples of L2 can be dApps deployed as smart contracts on Moonbeam or Astar.

- **Resilient infrastructure.** This is achieved by keeping the network decentralized without
  compromising scalability and throughput, and through the on-chain
  [treasury](../learn/learn-polkadot-opengov-treasury.md) funds that can be accessed through
  [OpenGov](../learn/learn-polkadot-opengov.md) referendum. Those funds guarantee constant sponsorship for network upgrades, educational material, software development, events, and initiatives.

- **Fast blockchain development.** This is achieved through the modular and
  flexible [Substrate, located within the Polkadot SDK](./glossary.md#substrate).  Builders can create fully-fledged blockchains designed explicitly around their application and value proposition, while Polkadot takes care of security and interoperability.

- **Fostering next-gen of Web3 core developers.** This is achieved through different initiatives
  such as [the Polkadot Blockchain Academy](https://polkadot.network/development/academy/).

## Polkadot's Representation

Polkadot is represented as a ring surrounded by multiple blockchains attached to it. Based on Polkadot's design, if a chain's logic can compile to Wasm and adhere to the relay chain API, it can
connect to the Polkadot network as a rollup chain. The figure below shows the Polkadot relay chain (circle) with rollup chains attached to the virtual cores (open squares within the circle). A zoomed-in view shows Polkadot's validators (PC icons) guarding two cores. In-core validators will check incoming rollup data following [the ELVES protocol](../learn/learn-parachains-protocol.md).

<div align="center"> <img src="../../assets/polkadot-relay-chain.png" style="width:400px;" alt="Polkadot Relay Chain Diagram"> </div>

Polkadot's rollup chains construct and propose blocks to in-core validators on the relay chain, where the blocks undergo
rigorous [availability and validity](../learn/learn-parachains-protocol.md) checks before being
added to the finalized chain. As the relay chain provides the security guarantees,
[collators](../learn/learn-collator.md), full nodes of these rollup chains, do not have any security
responsibilities, and thus do not require a robust incentive system.

The [Cross-Consensus Messaging Format (XCM)](../learn/learn-xcm.md) allows rollup chains to send
messages of any type to each other. The relay chain's shared security and validation logic 
provides the environment for trust-free message passing that opens up trustless interoperability.

To interact with chains that want to use their finalization process (e.g., Bitcoin),
Polkadot has [trustless bridges](../learn/learn-bridges.md) that offer two-way compatibility, meaning that transactions can happen between Polkadot and other ecosystems without relying on centralized parties.

## Polkadot 1.0 Core Usage and Functionalities

The Polkadot relay chain managed parachains' crowdloans and auctions (replaced by [the coretime marketplace](../learn/learn-agile-coretime.md)). Polkadot's virtual cores were leased via auctions in 3-month chunks for a maximum of two years, and crowdloans allowed users to loan funds to teams for lease deposits in exchange for pre-sale tokens. There was no other way you could access and use cores on Polkadot 1.0.

In Polkadot 1.0, rollup chains produced blocks at a fixed rate of 12 seconds, whether needed or not. This led to inefficient energy allocation for computation and economic incentives for producing full blocks under heavy traffic and empty blocks under light traffic.

The figure below shows the core usage for Polkadot 1.0, where the horizontal axis is time, and each
row represents a virtual core. Colors show different rollup chains, each using one core (i.e., one rollup, one core formula).

<div align="center"> <img src="../../assets/polkadot-v1-cores.png" style="width:600px;" alt="V1 Cores Scheme"> </div>

The above setup allowed a **simple and secure, sharded execution environment**.

Below is an example of two rollup chains accessing two separate Polkadot cores. The CPU load diagram shows that Chain 1 uses Core 1 computation at 50% while Chain 2 uses Core 2 at 25%. We will see how in [Polkadot 2.0](./polkadot-v2.md) in-core computation is used more efficiently.

<div align="center"> <img src="../../assets/two-cores.png" style="width:400px;" alt="Two Cores Diagram"> </div>

The relay chain also managed other tasks such as [staking](../learn/learn-staking.md),
[accounts](./../learn/learn-accounts.md), [identities](../learn/learn-identity.md), [balances](../learn/learn-transactions.md#balance-transfers), and [governance](../learn/learn-polkadot-opengov.md).

## Polkadot's Resilience

Decentralization is a crucial aspect of blockchain networks, but there is a trade-off between:

- having an over-decentralized network that struggles to reach consensus and consumes a lot of energy to operate, and
- having a network that reaches consensus fast at the expense of being centralized, making it
  trivial to manipulate or attack.

Ideally, a network should be decentralized "enough" to make it practically impossible for someone to
exert manipulative or malicious influence on the network. So, **decentralization is a tool, while the
goal is resilience**, which is achieved by additionally providing an on-chain treasury and open governance
mechanism allowing continuous incentives for the network's participants without relying on
intermediaries or centralized entities.

Polkadot 1.0 achieved resilience through the following strategies:

- **Nominated Proof-of-Stake (NPoS)** where the stake per validator is maximized and evenly distributed across validators, and participation in native staking is decentralized and democratized as much as possible.
- [**ELVES protocol**](../learn/learn-parachains-protocol.md) allows for the shared security system, where everything coming through Polkadot's virtual cores passes rigorous checking. See [this page](../learn/learn-comparisons-rollups.md#rollup-comparison-table) to explore how Polkadot's rollup technology differs from optimistic and ZK rollups.
- The [**Decentralized Nodes Program**](https://nodes.web3.foundation/) aims to incentivize new operators to
  become network participants and further increase physical (how many validator nodes per service
  provider) and social decentralization (how many validator nodes per operator). Those can be
  explored with the [Polkawatch App](https://polkadot.polkawatch.app/).
- An **on-chain treasury and governance** (see: [OpenGov](../learn/learn-polkadot-opengov.md)) where
  every decision goes through public referenda, and any token holder can cast a vote. Treasury proposals can tap into the treasury funds to fund various initiatives the DOT community deems reasonable.

## Polkadot's Blockspace

A blockchain is a way to permanently store data and make it verifiable. The storage unit is the block (i.e., blockspace), and once a block is finalized
onto the chain, it is practically impossible to modify the data within that block. In addition to
being tamper-proof, public permissionless blockchains like Polkadot store data visible to
everybody (i.e., public), and everybody can cryptographically verify the correctness of such data.

The design and realization of Polkadot 1.0 allowed its creators to enable the commoditization of
blockspace.

!!!info "Blockspace is an umbrella term"
    Blockspace is the capacity of a blockchain to finalize and commit operations. It represents a
    blockchain's security, computing, and storage capabilities as an end product. Blockspace is not measured the same on any chain; there is no standard unit for blockspace. In Bitcoin, blockspace is based on transaction size, in Ethereum, on how much computation is used (gas), and in Polkadot, on how much time is taken to execute a task on a virtual core (coretime).

Blockspace produced by blockchains can vary in security, flexibility, and availability.

- **Security** is intended to show how secure blockspace is. In Proof-of-Stake (PoS) networks, this is
  directly related to how much stake is locked on validator nodes, how much variance in stake there
  is between validators (i.e., how easy it is to attack a single validator), and how many validators
  there are securing the network (i.e., how easy it is for colluding validators to exert influence on
  the network). Additionally, it is also important to look at how many validators are owned by
  single operators (this will determine the degree of social centralization of the network), and how
  many validators run on the same service provider (this will determine the degree of physical
  centralization of the network).
- **Flexibility**, intended as how flexible the blockspace is, what can be done with it, and what
  type of data can be stored. Data quality plays an important role depending on the type of network.
  One might avoid having situations in which poor quality data floods blockspace, hindering the prompt
  execution of vital processes.
- **Availability**, intended to show how available blockspace is and how difficult it is to access it. It
  should not be too difficult to get your hands on it so that any business model can thrive using
  it. Ideally, a marketplace must drive the blockspace price based on demand, with secondary market
  options to ensure the usage of "second-hand" blockspace.

Polkadot has been designed around those core blockspace principles. However, its design can be
further improved such that the tasks managed on the relay chain, such as
balances transfers, staking, and governance, can be delegated to
[system chains](../learn/learn-system-chains.md) to increase flexibility and to focus the use of
the relay chain to provide shared security and interoperability. Blockspace is only accessible
through auctions, but an auction winner can access a "freighter of blocks" regardless of their need. This creates high entry barriers and can lead to energy and resource waste.

For more information about blockspace, see [this interview](https://youtu.be/e1vISppPwe4) with Robert
Habermeier, as well as [this article](https://www.rob.tech/blog/polkadot-blockspace-over-blockchains/) by
him.

## A Perspective Shift: Upcoming Polkadot Features

As with many other projects before Polkadot, at some point in time after achieving the
initially planned goals, a perspective shift allows you to understand better what your project is
about and what you have built. This allows you to "run the extra mile" and achieve more
than initially planned.

The quote below by [Marcel Proust](https://en.wikipedia.org/wiki/Marcel_Proust) must remind us that
sometimes a perspective shift is crucial in _understanding_ the world, and perhaps it is more
important than _seeing more_ of the world.

_The only true voyage of discovery, the only fountain of Eternal Youth, would be not to visit
strange lands but to possess other eyes._

Thus, if we start to see Polkadot with _other eyes_, we can truly envision its potential and what it could become.

Polkadot is perfecting its implementation through [RFCs](#requests-for-comment-rfcs)
to continue being a decentralized, secure, ubiquitous computing engine to power the next generation of [Web3](./web3-and-polkadot.md) applications.

### Requests for Comment (RFCs)

With the release of [Polkadot runtime 1.0](./polkadot-v1.md), Polkadot's codebase is in the hands of
the community. Anyone can open a
[Request for Comment (RFC)](https://github.com/polkadot-fellows/RFCs) to propose and discuss changes
to the network protocol, runtime logic, public interfaces, and other technical matters.

To submit an RFC, follow the instructions [here](https://github.com/polkadot-fellows/RFCs#process).

RFCs can only be approved and merged by III-Dan members of
[Polkadot Technical Fellowship](../learn/learn-polkadot-technical-fellowship.md) via on-chain voting
mechanism. Definitive approval or rejection is done by issuing the `RFC_APPROVE(xxxx, h)` or
`RFC_REJECT(xxxx, h)` on-chain remark from the Fellowship origin on the Polkadot Collectives
parachain, where `xxxx` is the RFC number and `h` is the hash of the raw proposal text.

For example, the first RFC [RFC-1](https://github.com/polkadot-fellows/RFCs/pull/1) about Agile
Coretime was proposed by Gavin Wood on the 30th of June 2023 and merged on the 12th of August 2023.
Subsequently, the Agile Coretime Broker pallet code was added to the Substrate FRAME system.

In general, the workflow from RFC write-up submission to its implementation follows the timeline
below:

- RFC submitted by following the [instructions](https://github.com/polkadot-fellows/RFCs#process).
- RFC review by the Technical Fellowship [via GitHub](https://github.com/polkadot-fellows/RFCs)
- Polkadot Technical Fellowship Referendum of the RFC submitted to the Track `3 / Fellows` by
  members with a rank greater than or equal to 3.
- If the Referendum is approved through on-chain vote by the Technical Fellowship, changes discussed
  in the RFC will be implemented.
- If the changes requested through the RFC require a broader consensus of DOT holders, an OpenGov
  referendum may be created. For instance,
  [adding a new system collective](https://github.com/polkadot-fellows/RFCs/blob/main/text/0012-process-for-adding-new-collectives.md)
  or making changes to network parameters like inflation rate, treasury inflow, etc.

!!!note "Polkadot Runtime Code Changes through Root track"
    Although the Technical Fellowship maintains the [runtimes of Polkadot and Kusama](https://github.com/polkadot-fellows/runtimes), changes to the network protocol are not gated by the fellowship. Any DOT holder can submit a referendum on [the Polkadot OpenGov Root track](../learn/learn-polkadot-opengov-origins.md#root) to set the runtime code with the proposed changes.

For more information about the adoption of RFCs within the Polkadot ecosystem, see
[this Medium article](https://www.polkadotphilosophy.com/polkadots-strategic-adoption-of-rfcs-pioneering-a-collaborative-future-in-blockchain-3330843cfd4f)
and the
[original Polkadot Forum post](https://forum.polkadot.network/t/polkadot-protocol-proposals-rfc-process/1421/1).