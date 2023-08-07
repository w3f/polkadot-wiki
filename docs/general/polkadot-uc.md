---
id: polkadot-uc
title: The Polkadot Ubiquitous Computer
sidebar_label: Ubiquitous Computer
description: Polkadot as a Decentralized and Secure Ubiquitous Computer.
keywords: [polkadot vison, polkadot 2.0, Decentralization, Ubiquitous Computer, Coretime]
slug: ../polkadot-uc
---

Understanding what [Polkadot 1.0](./polkadot-v1.md) is about, and the philosophy behind it, will
help us to envision the future direction of the Polkadot ecosystem toward abstraction and
generalization.

## Polkadot as a Computational Resource

Polkadot has been abstracted and generalized beyond what it was originally proposed and envisioned
in the [whitepaper](https://polkadot.network/whitepaper/). Polkadot is:

- About space (the underlying resources that chains need) not chains.
- A platform to build applications rather than chains, and for people to use those applications.
  Fundamentally, Polkadot is not a platform to host chains, and so far chains happened to be one way
  to build applications and grow Polkadot's utility.
- A provider of resilient general-purpose continuation computation, where the term _continuation_
  refers to a broad long-running task that can do something, pause, and do some more (or something
  else) later on.
- A multicore computer where chains that continuously operate in parallel on different cores are
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
run:

- parachains and
- smart contracts, avoiding the need of custom chain infrastructure. This would be effective for
  contracts with constrained state and I/O (i.e. 2.5 MB), and heavy compute requirements. Such
  contracts will benefit from a secure and wide message passing environment as well.

## From Slot Auctions to Coretime Marketplace

Cores are agile and general: they can change what job they run as easily as a modern CPU. It follows
that the procurement of those cores must be agile as well. The current slot auction mechanism is not
agile, creates high entry barriers, and it is designed for long-running single chains (i.e. the
original vision proposed in the whitepaper).

Here below we propose two Polkadot-native sale options of Coretime: bulk and instantaneous. This
setup maximizes the agility of Polkadot and lets the market figure out the best solution needed for
the users.

### Bulk Coretime Rental

Primary market

Bulk Coretime rental is a monthly sale of 4 weeks Coretime at a fixed price with a target of e.g.
75% of the available cores. The price will change depending on the deviation from the target value,
and unrented cores go to instantaneous market. Special considerations might be necessary for
pre-existing tenants.

Bulk Coretime does not need to be directly deployed because it is an asset, more precisely a
non-fungible assets (unless it is for the same time period). Coretime tokens are sold in a 4-week
period and they can be split into multiple NFTs of smaller period. Those Coretime NFTs can be
exposed by brokerage system parachains via XCM NFT interface to other parachains that want to allow
for these NFTs to be exchanged and traded on their market. Coretime NFTs are consumed by the broker
parachain in order to allow the owner to allocate computation on a Polkadot core.

Bulk Coretime can be:

- assigned to one parachain (similar to the lease auctions in Polkadot 1.0)
- assigned to a number of parachains taking turns on a core
- placed on the instantaneous market
- carved up and sold separately on a separate parachain through the NFT XCM interface

### Instantaneous Coretime Rental

Instantaneous Coretime rental is the ongoing sale of Coretime for immediate use at a spot price
where an AMM regulates the price targeting 100% usage. Bulk Coretime can be placed in this market,
and sale revenues are split between Coretime providers (i.e. validators).

Instantaneous Coretime is Purchased by parachains though collators to boost throughput and/or reduce
latency with extra cores, and power core contracts.
