---
id: learn-async-backing
title: Asynchronous Backing
sidebar_label: Asynchronous Backing
description: A brief overview of asynchronous backing, and how it affects Polkadot's scalability.
keywords: [parachains, slots, backing, parablock]
slug: ../learn-async-backing
---

import RPC from "./../../components/RPC-Connection";

:::info Learn about Parachain Consensus

To fully follow the material on this page, it is recommended to be familiar with the primary stages of
the [Parachain Protocol](./learn-parachains-protocol.md).

:::

Asynchronous backing is a feature that introduces
[pipelining](https://www.techtarget.com/whatis/definition/pipelining) to the parachain block
[generation](./learn-parachains-protocol.md), [backing](./learn-parachains-protocol.md) and
[inclusion](./learn-parachains-protocol.md). It is analogous to the logical pipelining of processor
instruction in "traditional" architectures, where some instructions may be executed before others
are complete. Instructions may also be executed in parallel, enabling multiple parts of the
processor to work on potentially different instructions simultaneously.

Bundles of state transitions represented as blocks may be processed similarly. In the context of
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, pipelining aims to increase the
throughput of the entire network.

## Synchronous Backing

Before diving into asynchronous backing it is important to understand what synchronous backing is
and what its main limitations are.

In synchronous backing, parablock validation is tightly coupled to the relay chain's progression on
a 1-1 basis. Every parablock must be generated and backed within a relay-chain block (six-second
window), and (if successfully backed) it will be included in a relay-chain block after an additional
six seconds. Thus, a parablock can be produced every 12 seconds because a new parablock can be
produced after the inclusion of the previous one.

The parablock generation and backing are bound together within a six-second window that limits the
amount of data a collator can add to each parablock. Essentially, a parablock is rushing to be
backed in six seconds, leaving little time for its generation and its blockspace to be properly
filled.

FIGURE HERE?

A particular parablock, `P`, would only be valid for backing at relay chain parent `R` and
subsequently included at `R + 1` should it be backed successfully. Thus, a parablock is rushing to
be backed and included within a two-relay-chain-blocks window due to the inherent requirement for
synchrony between the parachain and relay chain. The next parablock `P + 1` will be valid for
backing at realy-chain block `R + 2`, i.e. two relay-chain blocks after the previously included
parablock.

## Asynchronous Backing

Asynchronous Backing has three overarching goals:

1. Decrease parachain block (parablock) validation time to **6 seconds** from **12 seconds**
2. Increase the usable blockspace, allowing more state changes per relay chain block.
3. Allow parablocks to be re-proposed to the network if they are not included successfully on the
   first attempt.

In synchronous backing, parablocks rely on the most recent relay-chain block (often referred to as
the **parent** block, as the parablock anchors itself to it). Each parablock must be generated and
go through the entire backing process in a single relay block. It then proceeds to the inclusion
process during the generation of the next relay-chain block.

:::info It is important to note the clarification below

- Not the entire parablock, but the **paraheader** is placed on the parent block on the relay chain.
- The relay chain does not access the entire state of a parachain but only the values that changed
  during that block and the merkelized hashes of the unchanged values.

:::

Asynchronous backing brings the following changes to the parachain protocol:

- Parablock generation is now decoupled from the backing process, avoiding the previous 6-second deadline through the backing process. This gives more time to collators to properly use blockspace,
  decreasing the probability of generating empty parablocks.
- Parachains can generate blocks and have them placed into **unincluded segments** of
  parablock ancestors (i.e. parablocks that are seconded but not yet backed by paravalidators and
  included in the relay chain) rather than ancestors included in the relay chain state.

These changes allow for a parablock `P + 1`, to begin the generation process soon after parablock `P` has been generated and appended into the unincluded segment within the first six-second time window (the span of one relay chain block). At the same time, parablock ancestor `P - 1`, could be pushed to the unincluded segment before `P`, is backed and included in the relay chain.

FIGURE HERE?

The **contextual execution** (which is the context built by block ancestors used by the parachains
to generate new parablocks) shifts from being the latest included parent block in the relay chain,
to being the latest ancestor parablock pushed into the unincluded segment. This allows to start
building parablocks earlier, giving plenty of time to parachain collators to fit more transactions
and prepare block candidates for backing and inclusion.

The execution context for the latest parablock is thus derived from the unincluded segment of block
ancestors upon which the newest parablock is built. These blocks can be prepared in anticipation of
being included later rather than keeping in sync with the relay chain's progress one-to-one. A parablock
can be in a different stage from another one being built if it abides by the parameters set forth by
the asynchronous backing configuration.

Asynchronous backing also introduces a parameter to define the maximum number of ancestor blocks
within the unincluded segment. This allows for a parablock to be backed later, enabling more
computational and storage time per block.

Asynchronous backing will allow [collators](./learn-parachains-protocol.md#collators) to include an
estimated ~3-5x more data into parablocks while speeding up parachain block times from 12 to 6
seconds. Due to the 2x decrease in block time and the possibility of building blocks in advance to
fit more data, Polkadot with asynchronous backing will deliver an estimated ~6-10x more blockspace
to its parachains.

This combination of lower latency, higher storage per block, and a logical pipeline spanning
Polkadot's networking, runtime, and collation aspects will allow for higher, more robust throughput.

## Learn More

This topic is evolving and being implemented at the moment, keep up to date using the following
resources:

- [Polkadot Roadmap Roundup](https://polkadot.network/blog/polkadot-roadmap-roundup) - Article by
  Rob Habermeier, Polkadot founder, details the plans for Polkadot for 2023.
- [Asynchronous Backing Spec & Tracking Issue](https://github.com/paritytech/polkadot/issues/3779) -
  The implementation tracking issue for asynchronous backing
