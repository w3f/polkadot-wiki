---
title: Polkadot 2.0
description: Explore Polkadot 2.0's innovations making Polkadot's decentralized computer more accessible and efficient.
---

Understanding what [Polkadot 1.0](./polkadot-v1.md) is about, and the philosophy behind it, will help
us envision the future direction of the Polkadot as a high-performance decentralized computer capable of delivering secure computation and interoperability to anyone and anything.

## Polkadot as a Decentralized Computer

Polkadot has been abstracted and generalized beyond what was originally proposed and envisioned in
the [whitepaper](https://polkadot.network/whitepaper/). 

Polkadot 1.0 is:

  - About [**Blockspace**](./polkadot-v1.md#polkadots-blockspace) (the underlying resource that
  chains provide)
  - **A platform to build applications** rather than chains, and for people to use those applications.
  Fundamentally, Polkadot is not a platform to host chains, and so far, chains have happened to be one
  way to build applications and grow Polkadot's utility.
  - **A provider of resilient and secure computation**, where the term
  _continuation_ refers to a broad, long-running task that can do something, pause, continue (or do
  something else) later.
  - **A multi-core decentralized computer** where chains that continuously operate in parallel on different virtual cores are called [rollup chains](../learn/learn-parachains.md). One core can be reserved for one single chain in-bulk or on-demand. On-demand cores can be accessed by multiple chains at different periods (see the [coretime page](../learn/learn-agile-coretime.md)).

From now on _application_ will be used as a general term to describe anything that can use a
Polkadot core to access secure and decentralized computation.

## From Chain-centricity to Application-centricity

If we see Polkadot as a service provider of trustless and resilient computation through cores as
well as secure interoperability between core-powered applications, the future development of
Polkadot can be directed towards the following main changes.

A paradigm shift from:

- being a chain-focused ecosystem where each parachain owned an execution core at all times
  (acquired through fixed parachain auction), which allowed a simple and secure, sharded execution
  environment
- to being an application-focused ecosystem where we remove the assumption that each application
  owns a core, and instead that all cores are a resource to be consumed and used as needed by all
  applications.

Previously, securing a core was a competitive process through an
candle auction mechanism. With Agile Coretime, there is no need for
auctions anymore. Teams can purchase on-demand coretime or reserve bulk coretime as required. This
greatly decreases the barrier-to-entry for software tinkerers and parachain teams.

On top of those main changes, [agile core usage](#agile-core-usage) and
[coretime allocation](#agile-coretime-allocation) will allow any application to access Polkadot's
computation based on their needs without wasting valuable blockspace. [Accords](#xcm-and-accords)
will improve cross-chain communication and the security guarantees of XCM messages. Finally,
Polkadot will scale by moving on-chain logic into its system parachains, allowing it to have more
bandwidth for the [parachains protocol](../learn/learn-parachains-protocol.md) and accords.

## From Slot Auctions to Coretime Marketplace

The end product of blockchains is [**Blockspace**](./polkadot-v1.md#polkadots-blockspace).
Applications need to access Polkadot's blockspace, and the entry points to blockspace are the cores.
Thus, applications will need to reserve some time on cores or **Coretime** to gain the right to
access Polkadot's secure blockspace and interoperability for a finite period.

Cores must be agile and general: they can change what job they run as easily as a modern CPU. It
follows that the procurement of those cores must be agile as well.

The auction mechanism is not agile, creates high entry barriers, and is designed for long-running
single applications (i.e., the original Polkadot vision proposed in the whitepaper).

We depart from the classic lease auctions and propose an agile marketplace for coretime, where
essentially **coretime becomes a commodity that can be tokenized, sold, and traded**. This setup
maximizes the agility of Polkadot and lets the market figure out the best solution needed for
applications to be successful.

Applications can reserve **bulk coretime** and **on-demand coretime** depending on their needs. Bulk
coretime rental will be a standard rental of coretime through a broker system parachain at a fixed
price for a fixed period of time. On-demand coretime rental will be available through ongoing sale
of coretime for immediate use at a spot price. This system lowers the barrier to entry for
prospective builders.

For example, revenues from coretime sales can be burnt, used to fund the Treasury, or used for a mix
of those options. The topic is currently under discussion. For more information, see
[RFC-0010](https://github.com/polkadot-fellows/RFCs/pull/10) and
[RFC-0015](https://github.com/polkadot-fellows/RFCs/pull/17/files).

## Core Usage in Polkadot 1.0

In Polkadot 1.0, applications produced blocks at a fixed rate of 12 seconds, whether needed or not.
This led to inefficient energy allocation and economic incentives for producing full blocks under
heavy traffic and empty blocks under light traffic.

The figure below shows the core usage for Polkadot 1.0, where the horizontal axis is time, and each
row represents a core. Colors show different parachains, each using one core (i.e., one parachain,
one core formula).

![core-usage-dumb](../assets/core-usage-dumb.png)

The above setup allowed a **simple and secure, sharded execution environment**.

However, to achieve full efficiency, blocks must be produced when needed, and the system must target
full block capacity, lowering the probability of incentivizing validators to build blocks half full
or, worse, empty.

## Agile Coretime Allocation

In Polkadot 1.0, coretime is a fixed two-year period on one specific core. Here, we remove this
limitation and generalize coretime usage to meet different application needs. For more information,
see the [agile coretime documentation](../learn/learn-agile-coretime.md).

### Split Coretime

Owners of coretime can split or trade it. An application A1 can run on core C1 for a finite period
and then another application A2 can run on that core, or application A1 can continue running on
another core C2. Some applications might stop running for some time and resume later on.

![core-usage-agile-rangeSplit](../assets/core-usage-agile-rangeSplit.png)

### Strided Coretime

Ranges can be strided (i.e., applications can take turns on a core) to share costs or decrease block
production rate, for example.

![core-usage-agile-rangeStrided](../assets/core-usage-agile-rangeStrided.png)

### Combined Coretime

An application can be assigned to multiple cores simultaneously. Some applications can have a
permanent core assignment and an intermittent one, for example, in a period of high demand to send
multiple blocks to multiple cores at the same time slot to reduce latency. Combining coretime in
this manner is achieved through [elastic scaling](../learn/learn-elastic-scaling.md).

![core-usage-agile-combined](../assets/core-usage-agile-combined.png)