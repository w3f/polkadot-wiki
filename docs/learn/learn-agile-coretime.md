---
id: learn-agile-coretime
title: Agile Coretime
sidebar_label: Agile Coretime
description: Introduction to Agile Coretime and its terminology
keywords: [coretime, blockspace, parathread, parachain, cores]
slug: ../learn-agile-coretime
---

Agile Coretime enables efficient utilization of Polkadot network resources and provides 
economic flexibility for builders, generalizing Polkadot beyond what was initially proposed 
and envisioned in its [whitepaper](https://polkadot.network/whitepaper/). 

In Polkadot 1.0, the only way for a parachain to be secured by Polkadot was to rent a lease
through an auction, which guaranteed parachain block validation for up-to two years. This involved
locking significant amount of DOT, leading to a high barrier of entry for small and medium scale
blockchain projects. The parachains produced blocks at a regular interval of 12 seconds, 
irrespective of the network activity. This led to inefficient resource allocation and misplaced 
economic incentives while producing almost empty blocks under lighter traffic and being unable to 
Accommodate heavier traffic when it exceeded block limits. Agile Coretime resolves all of these  
drawbacks. 

The figure below shows the core usage for Polkadot 1.0, where the horizontal axis is time, and each
row represents a core. Colors show different parachains, each using one core (i.e., one parachain,
one core).

![core-usage-dumb](../assets/core-usage-dumb.png)

Agile Coretime allows for the purchase of [coretime](#coretime) in “bulk” with an allocation for 
one month. Heavy duty parachains which need to author a block every 12 
seconds (or every 6s through Async backing), can seamlessly “renew” the [core](#core) each month. 
Coretime renewal orders take precedence over new orders and provide protection against price 
fluctuations, allowing parachains to plan their project budget and costs more effectively.

The purchased coretime can also be split up and sold in parts, down to a single 
block per month, allowing for secondary markets to thrive and improve the allocation efficiency
of coretime. Furthermore, Agile Coretime offers [on-demand coretime](#on-demand-coretime) 
functionality that enables the authoring of a parachain block on-demand.

![core-usage-agile-rangeSplit](../assets/core-usage-agile-rangeSplit.png)

:::info Agile Coretime is under active development

The progress of Agile Coretime can be monitored [here.](https://github.com/orgs/paritytech/projects/119/views/20)

:::


## Agile Coretime Terminology

### Core

The term "Core" captures the virtual abstraction of computational resources provided by 
the relay chain to secure the blocks of a parachain, which involves a randomized set of the
relay chain validators.

### Coretime

The time allocated for utilizing a core, measured in relay chain blocks. 

### Bulk Coretime

A fixed duration of continuous coretime represented by an NFT that can be split, 
shared, or resold. Currently, the duration of bulk coretime is set to 28 days.

### Region

The NFT representing a single unit of bulk coretime.

### On-demand Coretime

Previously known as instantaneous coretime, the on-demand coretime refers to coretime acquired 
through bidding in near real-time for the validation of a single parachain block on one of the 
cores reserved specifically for on-demand orders.

### On-demand Coretime Pool

Set of cores that are available on-demand. Cores reserved through bulk coretime could also be
made available in the on-demand coretime pool, in parts or in entirety.

### Coretime Chain

A system parachain that is responsible for the sale, manipulation of bulk coretime and 
eventually the purchase of on-demand coretime credits. It is also responsible for 
scheduling the respective cores on the relay chain to the parachains.

### Timeslice

A timeslice represents the granularity the Coretime Chain schedules cores on the Relay Chain. 
The Coretime Chain announces a schedule for each core, comprising the next 80 relay 
chain blocks in advance. The region length of 28 days corresponds to 5,040 timeslices.

### Task

The term "Task" captures the abstraction of utility of the core. Tasks on the cores
are not just limited to securing parachains.



















