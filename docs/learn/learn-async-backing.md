---
id: learn-async-backing
title: Asynchronous Backing
sidebar_label: Asynchronous Backing
description: A brief overview of asynchronous backing, and how it affects Polkadot's scalability.
keywords: [parachains, slots, backing, parablock]
slug: ../learn-async
---

Asynchronous backing is a feature that introduces
[pipelining](https://www.techtarget.com/whatis/definition/pipelining) to the parachain block
generation and validation process. It is analogous to the logical pipelining of processor
instruction in "traditional" architectures, where some instructions may be executed before others
are complete. Instructions may also be executed in parallel, enabling multiple parts of the
processor to be working on potentially different instructions at the same time.

Bundles of state transitions represented as blocks may be processed similarly. In the context of
Polkadot, it aims to increase the throughput of the entire network.

:::info

In order to realize which exact processes this upgrade improves, it is recommended to be familiar
with the stages of parablock validation, which you may [read here](./learn-parachains-protocol.md).

:::

Asynchronous backing enables logical pipelining over the parablock 
[**generation**](https://wiki.polkadot.network/docs/learn-parachains-protocol#collators),
[**backing**](https://wiki.polkadot.network/docs/learn-parachains-protocol#parachain-phase), and
[**inclusion**](https://wiki.polkadot.network/docs/learn-parachains-protocol#inclusion-pipeline)
processes. A parablock may be at different stages, but multiple blocks should be able to process them
simultaneously (in parallel) if needed. Most notably, parablock N + 1 can be generated and backed while its predecessor, parablock N, is undergoing inclusion on the relay chain.
Processes can occur while their ancestors are included on the relay chain.

This pipeline will allow [collators](./learn-parachains-protocol.md#collators) to include an
estimated ~3-5x more transactions/data while speeding up parachain block times from 12 to 6 seconds.
In short, Polkadot with asynchronous backing will deliver an estimated ~6-10x more blockspace to its parachains.

Asynchronous Backing has three overarching goals:

1. Decrease parachain block (parablock) validation time to **6 seconds** from **12 seconds**
2. Increase the amount of usable blockspace, allowing more state changes per
   relay chain block.
3. Allow for parablocks to be re-proposed to the network if they are not included successfully on the
   first attempt.

Asynchronous backing provides a form of **contextual execution**, which allows for more time for
parachain collators to fit more transactions and prepare block candidates for backing and inclusion.
**Contextual execution** refers to how a parablock can be built earlier using the context
provided by an _unincluded segment_ of recent block ancestors.

**Unincluded segments** are chains of candidate blocks that are not yet included in the relay chain.
Parablocks can be added to this unincluded segment without waiting for the latest
included parent block of the relay chain. The core functionality that asynchronous backing brings is
the ability to build on these unincluded segments of block ancestors rather than ancestors included in the relay
chain state.

Currently, parablocks rely on the most recent relay chain block (often referred to as the **parent**
block, as the parablock anchors itself to it). Each parablock must be generated and go through the
entire backing process in a single relay block. It then proceeds to the availability + inclusion
process during the next block.

:::info

It is important to note the following clarifications:

1. The parablock is not placed on the relay chain in its entirety, but rather the **paraheader**
2. The relay chain does not access the entire state of a parachain but only the values that changed during that block and the merkelized hashes of the unchanged values.

:::

For more information on the validity and availability process, be sure to visit the
[parachain protocol](../learn/learn-parachains-protocol.md) page.

## Synchronous Backing on Polkadot

With synchronous backing, there was only about a single relay chain block (6-second window), to
complete the parablock candidate generation and backing process. This was tightly coupled to the
relay chain's progress, where blocks had to be created within this window.

The main limitation of synchronous backing is that parablock validation is tightly coupled to the
relay chain's progression on a 1-1 basis, meaning every parablock must be generated and backed
within six seconds. This time limit reduces the amount of data a collator has time to add to each
block.

A particular parablock, `P1`, would **only** be valid for backing at relay chain parent `R1 + 1` and
subsequently, be included at `R1 + 2` should it be backed successfully. Essentially, a parablock is
rushing to be backed and included within this two-block window due to the inherent requirement for synchrony between
the parachain and relay chain.

## Asynchronous Backing on Polkadot

With asynchronous backing, the window of time is customizable and will most likely sit around the
6-18 second range. It also introduces a parameter to aid in defining the maximum amount of ancestor
blocks, which allows for a parablock to be backed later in the future, enabling more computational
and storage time per block. The context for the latest parablock is derived from the unincluded
segment of block ancestors upon which the newest parablock is built.

These blocks can be prepared in anticipation of being included later rather than keeping in sync
with the relay chain's progress 1-1. The block can be in a different stage from another block being
built, as long as it abides by the parameters set forth by the asynchronous backing configuration.

This combination of lower latency, higher storage per block, and a logical pipeline spanning
Polkadot's networking, runtime, and collation aspects will allow for higher, more robust throughput.

## Learn More

This topic is evolving and being implemented at the moment, keep up to date using the following
resources:

- [Polkadot Roadmap Roundup](https://polkadot.network/blog/polkadot-roadmap-roundup) - Article by
  Rob Habermeier, Polkadot founder, details the plans for Polkadot for 2023.
- [Asynchronous Backing Spec & Tracking Issue](https://github.com/paritytech/polkadot/issues/3779) -
  The implementation tracking issue for asynchronous backing
