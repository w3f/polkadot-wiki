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

Cores can be used to secure parachains as well as smart contracts, this avoids the need of custom
chain infrastructure, effective for contracts with constrained state and heavy compute requirements

wider message passing environment, secure

Cores are agile --> procurement must be agile too corse can change what job they are doing slot
auction mechanism is not agile --> designed for long running single chains, creates high barriers

Core Rental, not Slot Auction

Coretime (blockspace) can be sold

- bull: monthly sale of 4 weeks Coretime at a fixed price, target 75% of available cores and
  unrented cores go to instantaneous market its an asset, does not need to be directly deployed

- instantaneous: Ongoing sale of Coretime for immediate use at a spot price, AMM regulates the price
  targeting 100% usage, bulk coretime can be placed in this market, sale revenues split between
  Coretime providers (validators) Purchased by parachains though collators, boost throughput with
  extra cores, reduce latency with extra cores, power more exotic things like core contracts
