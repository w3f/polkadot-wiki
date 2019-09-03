---
id: polkadot-learn-grandpa
title: GRANDPA
sidebar_label: GRANDPA
---

GRANDPA (GHOST-based Recursive ANcestor Deriving Prefix Agreement) is the finality gadget that is implemented for the Polkadot relay chain.

It works in partially synchronous network models and can cope with 1/5 Byzantine nodes in an asynchronous setting.

A notable distinction is that GRANDPA reaches agreements on chains rather than blocks.

## Protocol

Please refer to heading 3 in the paper for a full description of the protocol. It is better to go to the source than copying the text here and butchering the Latex formatting.

## Comparison with Casper FFG

The two main differences between GRANDPA and Casper FFG (Friendly Finality Gadget) are:

 - in GRANDPA, different voters can cast votes simultaneously for blocks at different heights
 - GRANDPA only depends on finalized blocks to affect the fork-choice rule of the underlying block production mechanism

## Paper

For a full description of GRANDPA refer to the the [paper](https://github.com/w3f/consensus/blob/master/pdf/grandpa.pdf).

## Implementation

[Rust implementation](https://github.com/paritytech/substrate/blob/master/srml/grandpa/src/lib.rs) is part of Substrate Runtime Module Library.
