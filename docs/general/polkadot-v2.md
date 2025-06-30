---
title: Polkadot 2.0
description: Explore Polkadot 2.0's innovations making Polkadot's decentralized computer more accessible and efficient.
---

Understanding what [Polkadot 1.0](./polkadot-v1.md) is about, and the philosophy behind it, will help
us envision the future direction of the Polkadot as a high-performance decentralized computer capable of delivering resilient and verifiable computation, and interoperability to anyone and anything.
  
## Polkadot 2.0 Definition

Polkadot is **a multi-core decentralized computer** providing resilient and verifiable computation via virtual cores. Chains that continuously operate in parallel on different virtual cores are called [rollup chains](../learn/learn-parachains.md).

The Polkadot community [voted on a Wish for Change proposal](https://polkadot.polkassembly.io/referenda/747) stating that Polkadot 2.0 includes the following major technical upgrades: [asnychronous backing](../learn/learn-async-backing.md), [coretime](../learn/learn-agile-coretime.md), and [elastic scaling](../learn/learn-elastic-scaling.md).

These technical upgrades allowed to make the Polkadot decentralized computer more efficient, powerful, and accessible for anyone to use.

Fundamentally, Polkadot 1.0 was a platform to host just chains, and so far, chains have happened to be one way to build applications and grow Polkadot's utility.

## From Chain-centricity to Application-centricity

Polkadot 1.0 has been abstracted and generalized beyond what was originally proposed and envisioned in
the [Polkadot whitepaper](https://polkadot.network/whitepaper/).

If we see Polkadot as a service provider of trustless, resilient and verifiable computation through cores as well as secure interoperability between core-powered applications, the future development of
Polkadot can be directed towards the following main changes.

A paradigm shift from:

- being a chain-focused ecosystem where each parachain owned an execution core at all times
  (acquired through fixed parachain auction), which allowed a simple and secure, sharded execution
  environment
- to being an application-focused ecosystem where we remove the assumption that each application
  owns a core, and instead that all cores are a resource to be consumed and used as needed by all
  applications.

Previously, securing a core was a competitive process through an
candle auction mechanism. With [coretime](#coretime-allocation), there is no need for
auctions anymore. Teams can purchase on-demand coretime or reserve bulk coretime as required. This
greatly decreases the barrier-to-entry for software tinkerers and rollup teams. Coretime will allow any application to access Polkadot's computation based on their needs maximizing the use of valuable computation.

From now on _application_ will be used as a general term to describe anything that can use a
Polkadot core to access secure and decentralized computation.

## From Slot Auctions to Coretime Marketplace

The end product of blockchains is [**Blockspace**](./polkadot-v1.md#polkadots-blockspace). In the Polkadot context, blockspace is better described by secure computation provided by the ELVES protocol.
The entry points to access Polkadot's computation are the virtual cores. Thus, applications will need to reserve some time on Polkadot's cores (or **Coretime**) to gain the right to access Polkadot's secure computation and interoperability for a finite period.

Cores must be agile and general: they can change what application they run as easily as a modern CPU. It
follows that the procurement of those cores must be agile as well.

The auction mechanism is not agile, creates high entry barriers, and is designed for long-running
single applications (i.e., the original Polkadot vision proposed in the whitepaper).

Thus, classic lease auctions were deprecated, instead an agile marketplace for coretime was born, where
essentially **coretime becomes a commodity that can be tokenized, sold, and traded**. This setup
maximizes the agility of Polkadot and lets the market figure out the best solution needed for
applications to be successful.

Applications can reserve **bulk coretime** and **on-demand coretime** depending on their needs. Bulk
coretime rental will be a standard rental of coretime through [the Coretime System Chain](../learn/learn-system-chains.md#existing-system-chains) at a fixed
price for a fixed period of time. On-demand coretime rental will be available through ongoing sale
of coretime for immediate use at a spot price. This system lowers the barrier to entry for
prospective builders. Revenues from coretime sales are burned and participate to the protocol's revenue and add a deflationary pressure on the DOT token.

## Core Usage in Polkadot 1.0

In Polkadot 1.0, applications produced blocks at a fixed rate of 12 seconds, whether needed or not.
This led to inefficient energy allocation and economic incentives for producing full blocks under
heavy traffic and empty blocks under light traffic.

The figure below shows the core usage for Polkadot 1.0, where the horizontal axis is time, and each
row represents a core. Colors show different parachains, each using one core (i.e., one parachain,
one core formula).

![core-usage-dumb](../assets/core-usage-dumb.png)

The above setup allowed a **simple and secure, sharded execution environment**. However, to achieve full efficiency, blocks must be produced when needed, and the system must target full block capacity, lowering the probability of incentivizing validators to build blocks half full
or, worse, empty.

## Coretime Allocation

In Polkadot 1.0, coretime is a fixed two-year period on one specific core. Here, we remove this
limitation and generalize coretime usage to meet different application needs. For more information,
see the [agile coretime documentation](../learn/learn-agile-coretime.md).

### Split Coretime

Owners of coretime can split or trade it. An application A1 can run on core C1 for a finite period
and then another application A2 can run on that core, or application A1 can continue running on
another core C2. Some applications might stop running for some time and resume later on.

![core-usage-agile-rangeSplit](../assets/core-usage-agile-rangeSplit.png)

### Interlaced Coretime

Ranges can be interlaced (i.e., applications can take turns on a core) to share costs or decrease block
production rate, for example.

![core-usage-agile-rangeStrided](../assets/core-usage-agile-rangeStrided.png)

### Agile Coretime

An application can be assigned to multiple cores simultaneously. Some applications can have a
permanent core assignment and an intermittent one, for example, in a period of high demand to send
multiple blocks to multiple cores at the same time slot to reduce latency. Combining coretime in
this manner is achieved through [elastic scaling](../learn/learn-elastic-scaling.md).

![core-usage-agile-combined](../assets/core-usage-agile-combined.png)

One core can be reserved for one single chain in-bulk or on-demand. On-demand cores can be accessed by multiple chains at different periods (that is, concurrently, see the [coretime page](../learn/learn-agile-coretime.md)).

