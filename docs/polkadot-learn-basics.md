---
id: polkadot-learn-basics
title: Basics
sidebar_label: Basics
---

# Basics

## Themes in blockchain 3.0

The following are some topics which have been [presented by Gavin Wood](https://slides.com/paritytech/polkadot-governance#/1) as "themes of blockchain 3.0":

- Governance
- Scalability
- Future-proofing
- Developability
- Interoperability
- Efficiency

## Two sides of blockchain

A blockchain is composed of two main pieces: 

 - a state machine (what composes a block)
 - a consensus algorithm (how to agree on the blocks)

Blockchain incentive systems like Proof of Work and Proof of 
Stake are notably **not** consensus mechanisms by themselves.

## Interoperability

Connect chains that have distinct state machines and distinct
consensus.

Public and private chains.

## Cumulus

Allows you to write parachains with Substrate.

An extension of the Substrate library.

Specialization breeds optimization.

Parachains - Pieces of web assembly code that tells you
how to validate the blocks (raw bytes).

Instantiation of pluggable consensus that follows the relay chain.
It knows how to run another blockchain node internally (a light client) and follow
the relay chain.

Extends the substrate runtime already into a Polkadot validation 
compatible runtime. Typical block authorship has some key difference
to Polkadot parachains.

Cumulus embeds a Polkadot light client.

Parachains vs. Sovereign chain substrate

Parachains:

 - Draw finality and consensus from the relay chain.
 - block authorship depends on info from the relay chain (such as messages of other parachains)

Sovereign chain:

 - provides their own finality and consensus
 - block authorship is completely independent

How to get started with cumulus?

 - Minimal modification of substrate chain you've already written
 - Cumulus, as its ready will be used to port it over w/ little effort

GRANDPA - GHOST-based Recursive ANcestor Deriving Prefix Agreement