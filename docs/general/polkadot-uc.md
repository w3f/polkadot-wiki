---
id: polkadot-uc
title: The Polkadot Ubiquitous Computer
sidebar_label: Ubiquitous Computer
description: Polkadot as a Decentralized and Secure Ubiquitous Computer.
keywords:
  [polkadot vison, polkadot 2.0, Decentralization, ubiquitous computer, coretime, blockspace]
slug: ../polkadot-uc
---

:::info

Material on this page is based on
[Gavin Wood's talk at Polkadot Decoded 2023](https://www.youtube.com/watch?v=GIB1WeVuJD0).

:::

Understanding what [Polkadot 1.0](./polkadot-v1.md) is about, and the philosophy behind it, will
help us to envision the future direction of the Polkadot ecosystem toward abstraction and
generalization.

## Polkadot as a Computational Resource

Polkadot has been abstracted and generalized beyond what it was originally proposed and envisioned
in the [whitepaper](https://polkadot.network/whitepaper/). Polkadot is:

- About [**Blockspace**](./polkadot-v1.md#polkadots-blockspace) (the underlying resources that
  chains need) not chains.
- **A platform to build applications** rather than chains, and for people to use those applications.
  Fundamentally, Polkadot is not a platform to host chains, and so far chains happened to be one way
  to build applications and grow Polkadot's utility.
- **A provider of resilient general-purpose continuation computation**, where the term
  _continuation_ refers to a broad long-running task that can do something, pause, and do some more
  (or something else) later on.
- **A multicore computer** where chains that continuously operate in parallel on different cores are
  called parachains. Currently, one core is reserved to one chain through
  [slot auction mechanism](../learn/learn-auction.md), although one core can be reserved on-demand
  to multiple chains at different time periods (see [parathreads](../learn/learn-parathreads.md)).
  At the time of writing (mid 2023) on Polkadot there are around 50 cores independently operating in
  parallel. Prediction models show that the number of cores can increase to 500-1000 in the
  following few years.

As a computational resource, Polkadot can be described as a traditional CPU, and it has the
following benchmarking features:

- Bandwidth: ~1MB/s
- Compute: Geekbench 5 SC score ~380
- Latency: 6s (time between two consecutive tasks)

These rating will likely increase over time.

## Contracts on Cores

If we follow this line of Polkadot being a global unbiquitous supercomputer, cores can be used to
run applications that can be deployed using:

- parachains and
- smart contracts, avoiding the need of custom chain infrastructure. This would be effective for
  contracts with constrained state and I/O (i.e. 2.5 MB), and heavy compute requirements. Such
  contracts will benefit from a secure and wide message passing environment as well.

From now _application_ will be used as a general term to describe anything that can use a core to
access secure, decentralized and ubiquitous computation.

## From Slot Auctions to Coretime Marketplace

The final end product of blockchains is [**Blockspace**](./polkadot-v1.md#polkadots-blockspace).
Applications need to access Polkadot's blockspace, and the entry points to blockspace are the cores.
Thus, applications run on cores and will need to reserve some **Coretime** to make sure they access
Polkadot's secure blockspace and interoperability.

Cores are agile and general: they can change what job they run as easily as a modern CPU. It follows
that the procurement of those cores must be agile as well. The current slot auction mechanism is not
agile, creates high entry barriers, and it is designed for long-running single applications (i.e.
the original Polkadot vision proposed in the whitepaper).

Here below we propose two Polkadot-native sale options of Coretime: **bulk** and **instantaneous**.
This setup maximizes the agility of Polkadot and lets the market figure out the best solution needed
for the applications.

### Bulk Coretime Rental

Bulk Coretime rental (primary market) is a monthly sale of 4 weeks Coretime at a fixed price with a
target of e.g. 75% of the available cores. The price will change depending on the deviation from the
target value, and unrented cores go to instantaneous market. Special considerations might be
necessary for pre-existing applications.

Bulk Coretime does not need to be directly deployed because it is an asset, more precisely a
non-fungible assets (unless it is for the same time period). Coretime tokens are sold in a 4-week
period and they can be split into multiple NFTs of smaller periods. Coretime NFTs are sold and
assigned by the a broker system parachain to the application now owning the NFTs, which must be
consumed to allocate computation on a Polkadot core. The broker parachain records the price and the
assignment, and the Coretime can always be purchased next month for the same assignment (i.e. same
application) with a capped price change. This rent control allows long-running applications to have
certainty and predictability about Coretime costs (not possible with lease auctions). The process of
assigning Coretime is irreversible.

In general, bulk Coretime NFTs can be:

- sold to one application (similar to the lease auctions in Polkadot 1.0, with the difference that
  Coretime in Polkadot 1.0 is not sold but applications need to lock their DOT tokens)
- sold to a number of applications taking turns on a core
- placed on the instantaneous market
- exposed and sold by a broker system parachains via [XCM](./learn-xcm-index) NFT interface to
  Polkadot-powered applications that want to allow for these NFTs to be exchanged and traded on
  their market.

Bulk Coretime pricing will be initialized through Polkadot OpenGov and will likely start low to
minimize the entry barrier. Floor price, rent control and right-of-first-refusal will give long-term
guarantees on the price paid and core availability.

### Instantaneous Coretime Rental

Instantaneous Coretime rental is the ongoing sale of Coretime for immediate use at a spot price
where an AMM regulates the price targeting 100% usage. Bulk Coretime can be placed in this market,
and sale revenues are split between Coretime providers (i.e. validators).

Instantaneous Coretime is purchased by applications though collators to boost throughput and/or
reduce latency with extra cores, and power more exotic core contracts.
