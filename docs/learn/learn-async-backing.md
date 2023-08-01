---
id: learn-async
title: Asynchronous Backing
sidebar_label: Asynchronous Backing
description: A brief overview of asynchronous backing, and how it affects Polkadot's scalability.
keywords: [parachains, slots, backing, parablock]
slug: ../learn-async
---

Asynchronous backing is a feature which introduces pipelining to parachain block validation. It is
analogous to the logical pipelining of processor instruction in "traditional" architectures, where
some instructions may be executed before others are complete. Instructions may also be executed in
parallel, enabling for multiple parts of the processor to be working on potentially different
instructions at the same time.

Asynchronous backing aims to add this logical pipeline to the parablock generation, backing, and
inclusion processes. A parablock may be at different stages, but multiple blocks should be able to
processed at the same time in parallel if needed. Most notably, block candidate generation and
backing processes can now occur while their ancestors are being included on the relay chain.

This pipeline will allow [collators](./learn-parachains-protocol.md#collators) to include 5-10x more
transactions/data while speeding up parachain block times from 12 to 6 seconds. In short,
asynchronous backing will 10-20x the blockspace provided to Polkadot parachains.

It has three overarching goals:

1. Decrease parachain blocks (parablock) validation time to **6 seconds** from **12 seconds**
2. Increase the amount of usable blockspace by a factor of 5-10, meaning more state changes are
   allowed per relay chain block.
3. Allow for parablocks to be re-proposed to the network if they are not included initially on the
   first attempt.

Asynchronous backing works by providing a form of **contextual execution**, which allows for more
time for parachain collators to fit more transactions and ready block candidates for backing and
inclusion. **Contextual execution** refers to how a parablock can begin being built earlier using
the context provided by an _unincluded_ segment of recent block ancestors.

**Unincluded segments** are chains of blocks which are not yet included in the relay chain.
Parablocks can be added to this unincluded segment, and no longer have to await for the latest,
included parent block of the relay chain. The core functionality that asynchronous backing brings is
the ability to build on these unincluded segments of block ancestors, rather than the finalized
relay chain state.

Currently, parablocks rely on the most recent relay chain block (often referred to as the **parent**
block, as the parablock anchors itself to it). This means that each parablock must be generated and
go through the entire backing process in the span of a single relay block. It then proceeds through
availability + inclusion during the next block.

:::info

It is important to note two following clarifications:

1. The parablock is not placed on the relay chain in its entirety, but rather the **paraheader**
2. The relay chain does not validate the entire state of a parachain, but only the state transitions
   within that block.

:::

For more information on the validity and availability process, be sure to visit the
[parachain protocol](../learn/learn-parachains-protocol.md) page.

## Synchronous Backing on Polkadot

With synchronous backing, there was only about a single relay chain block, or 6-second window, to
complete the parablock generation and backing process. This was tightly coupled to the relay chain's
progress, where blocks had to be created within this window.

The main limitation of synchronous backing is that parablock validation is tightly coupled to the
relay chain's progression on a 1-1 basis, meaning every parablock must be generated and backed
within six seconds. This time limit reduces the amount of data a collator has time to add to each
block.

A particular parablock, `P1`, would **only** be valid for backing at relay chain parent `R1 + 1`,
and subsequently be included at `R1 + 2` should it be backed successfully. Essentially, a parablock
is rushing to being backed and included within this two block window due to the inherent synchrony
between the parachain and relay chain.

## Asynchronous Backing on Polkadot

With asynchronous backing, the window of time is customizable, and will most likely sit around the
6-18 second range. window. It also introduces a parameter to aid in defining the maximum amount of
ancestor blocks, which allow for a parablock to be backed later in the future, enabling more
computational and storage time per block. The context for the latest parablock is derived from the
unincluded segment of block ancestors, of which the latest parablock is built upon.

Blocks can contain more state transitions compared to synchronous backing, meaning more transactions
per block. These blocks can be prepared in anticipation of being included later rather than keeping
in sync with the relay chain's progress 1-1.

This combination of lower latency, higher storage per block, and a logical pipeline spanning
Polkadot's networking, runtime, and collation aspects will allow for higher, more robust throughput.

## Learn More

This topic is evolving and being implemented at the moment, keep up to date using the following
resources:

- [Polkadot Roadmap Roundup](https://polkadot.network/blog/polkadot-roadmap-roundup) - Article by
  Rob Habermeier, Polkadot founder, details the plans for Polkadot for 2023.
- [Asynchronous Backing Spec & Tracking Issue](https://github.com/paritytech/polkadot/issues/3779) -
  The implementation tracking issue for asynchronous backing
