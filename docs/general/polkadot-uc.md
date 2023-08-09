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

As a computational resource, Polkadot can be described as a traditional CPU, and a the time of
writing it has the following benchmarking features:

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

From now _application_ will be used as a general term to describe anything that can use a Polkadot
core to access secure, decentralized and ubiquitous computation.

## From Slot Auctions to Coretime Marketplace

The final end product of blockchains is [**Blockspace**](./polkadot-v1.md#polkadots-blockspace).
Applications need to access Polkadot's blockspace, and the entry points to blockspace are the cores.
Thus, applications will need to reserve some time on cores or **Coretime** to gain the right to
access Polkadot's secure blockspace and interoperability for a definite time period.

Cores are agile and general: they can change what job they run as easily as a modern CPU. It follows
that the procurement of those cores must be agile as well. The current slot auction mechanism is not
agile, creates high entry barriers, and it is designed for long-running single applications (i.e.
the original Polkadot vision proposed in the whitepaper).

We depart from the classic lease auctions and propose an agile marketplace for Coretime where two
Polkadot-native sale options of Coretime are possible: **bulk** and **instantaneous**. This setup
maximizes the agility of Polkadot and lets the market figure out the best solution needed for the
applications do be successful.

### Bulk Coretime Rental

Bulk Coretime rental (primary market) is a monthly sale of 4 weeks Coretime at a fixed price with a
target of e.g. 75% of the available cores. The price will change depending on the deviation from the
target value, and unrented cores go to instantaneous market. Special considerations might be
necessary for pre-existing applications.

Bulk Coretime does not need to be directly deployed because it is an asset, more precisely a
non-fungible assets (unless it is for the same time period). Coretime tokens are sold in a 4-week
period and they can be split into multiple NFTs of smaller periods. Coretime NFTs are sold and
assigned by a broker system parachain to the applications now owning the NFTs, which must be
consumed to allocate computation on a Polkadot core. The broker parachain records the price and the
assignment, and the Coretime can always be purchased the following month for the same assignment
(i.e. same application) with a capped price change. This rent control allows long-running
applications to have certainty and predictability about Coretime costs (not possible with lease
auctions). The process of assigning Coretime is irreversible.

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
where an AMM regulates the price targeting 100% usage. Bulk Coretime can be placed in this market.

Instantaneous Coretime is purchased by applications though collators to boost throughput and/or
reduce latency with extra cores, and power more exotic core contracts.

### Coretime Revenues

Revenues from Coretime sales can be burnt, used to fund the Treasury, split between Coretime
providers (i.e. validators), or used for a mix of those options. The topic is currently under
discussion. For more information see [RFC-0010](https://github.com/polkadot-fellows/RFCs/pull/10)
and [RFC-0015](https://github.com/polkadot-fellows/RFCs/pull/17/files).

### Coretime Allocation

In Polkadot 1.0 applications where producing blocks at a fixed rate of 12 seconds whether it was
needed or not. This led to inefficient allocation of energy and economic incentives for producing
full blocks under heavy workload and empty blocks under light workload. Ideally, blocks are produced
when needed and then system targets full block capacity lowering the probability to produce blocks
half full or worse, empty.

We mentioned how the instantaneous Coretime rental targets 100% usage, and how bulk Coretime is sold
on a monthly basis maximizing agility and letting the market figuring out the best solution for
applications.

The new vision of Polkadot will also make the ecosystem more agile and allow applications to tweak
how often they produce blocks based on their needs. An application can decide for example between
the following strategies strategies:

- Share: sharing cores with other applications and having blocks avery 18 seconds, for example
- Compress: combine multiple application blocks in the same relay chain core to reduce latency but
  increased bandwidth for the fixed price of opening and closing a block
- Combine: buying Coretime on additional cores on the instantaneous market and send multiple blocks
  to multiple cores at the same time slot to reduce latency from 12 seconds to 6 seconds, or even
  lower than that.
- Do nothing: do not buy Coretime when there is a period with no need for block production

[Cumulus](../build/build-parachains.md#cumulus) will make sure that Coretime sales are adequately
utilized and optimized in an automatic fashion.

## Core Usage

To allow Coretime to be shared and combined, cores need to be split Strided Sliced

### Long-term Core Usage

The figure below shows the core usage for Polkadot 1.0, where the y-axis is time and each row
represents a core. Different colors show five different parachains, each one using one core (i.e.
one parachain one core formula).

![core-usage-dumb](../assets/core-usage-dumb.png)

Core affinity (i.e. which application operates on which core) is not important (see below). Cores do
not have any grater friendliness to one application than another.

![core-usage-dumb-noAffinity](../assets/core-usage-dumb-noAffinity.png)

### Agile Core Usage

Owners of a range can split and trade

some stop and carry on later

Ranges can be strided (i.e. taking turn on a core) to share costs
