---
id: learn-parachains-protocol
title: Parachains' Protocol Overview
sidebar_label: Protocol Overview
description: High level view of actors and protocols involved in running parachains on Polkadot.
keywords: [parachains, application-specific, sharding, protocol, validator, collator, nominator]
slug: ../learn-parachains-protocol
---

:::info

This page is a summary of the [Protocol Overview chapter in **The Polkadot Parachain Host Implementer's Guide**](https://paritytech.github.io/polkadot/book/protocol-overview.html)

:::

The aim of the protocol is to carry a parachain's block from authoring to inclusion through a process that can be carried out repeatedly and in parallel for each parachain connected to the relay chain.

## Main Actors

### Validators

They are responsible for validating proposed parachain's blocks by checking the Proof-of-Validity (PoV) of the blocks and ensuring the PoV remains available. They have "skin in the game", meaning they have funds bonded on-chain that can be partially or fully confiscated in case of misbehavior.

### Collators

They create the PoV that validators know how to check. Creating PoV requires familiarity with transaction format and block authoring rules of a specific parachain, as well as having access to its full state.

### Fishermen

They catch misbehaving validators in exchange for a bounty. Collators and validators can behave as fishermen.

## Summary View

1. Collators send to validators parachain blocks with their PoV for check.
2. Validators validate the block using the PoV, signing statements that can have positive or negative.
3. With enough positive statements the block can be added to the relay chain.

Negative statements will lead to a dispute, and if there are false negatives whoever will be on the wrong side (once the dispute is resolved) will be slashed. False positives can also happen and those actors responsible for it will also be slashed and whoever reported the case will get a bounty.
