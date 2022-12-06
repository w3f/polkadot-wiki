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

They are responsible for validating proposed parachain's blocks by checking the **Proof-of-Validity** (PoV) of the blocks and ensuring the PoV remains available. They have "skin in the game", meaning they have funds bonded on-chain that can be partially or fully confiscated in case of misbehavior.

### Collators

They create the PoV that validators know how to check. Creating PoV requires familiarity with transaction format and block authoring rules of a specific parachain, as well as having access to its full state.

### Fishermen

They catch misbehaving validators in exchange for a bounty. Collators and validators can behave as fishermen.

## Summary View

The parachains' protocol can be summarized into three main steps:

1. Collators send to validators parachain blocks with their PoV for check.
2. Validators validate the block using the PoV, signing statements that can have positive or negative.
3. With enough positive statements the block can be added to the relay chain.

Negative statements will lead to a dispute, and if there are false negatives whoever will be on the wrong side (once the dispute is resolved) will be slashed. False positives can also happen, those actors responsible for it will also be slashed and whoever reported the case will get a bounty. In order to detect false positives, PoV information must be available after the block has been added to the relay chain so that validators can check the work. PoVs are expected to be between 1 MB and 10 MB; as a consequence they are not included in blocks but they are part of the data availability scheme in which validators must prove that the inputs to their work will remain available.

## Inclusion Pipeline

The inclusion pipeline is the path of a parachain block (or parablock) from its creation ot its inclusion into the relay chain. Here below there are the checkpoints of that path.

1. Validators are assigned to parachains by the **Validator Assignment** routine.
2. A collator produces the parachain block (known as parachain candidate, or candidate) along with PoV.
3. The collator forwards the candidate and PoV to validators assigned to the same parachain via the **Collator Protocol**.
4. The validators assigned to the parachain participate to the **Candidate Backing** subsystem. Candidates that gather enough signed validity statement are considered **"backable"** and their backing is the set of signed statements.
5. A relay chain block author (selected by [BABE][]) can note up to 1 backable candidate for each parachain to be included in the relay chain block alongside its backing. Once included in the relay chain the candidate is considered backable in the fork of the relay chain.
6. Once backable in the relay chain, the candidate is considered to be "pending availability", i.e. it is not considered to be part of the parachain until it is **proven available**.
7. In the following relay chain blocks, the validators will participate to the **Availability Distribution** subsystem to ensure availability of the candidate. That is, information regarding the availability of the candidate will be noted in the subsequent relay chain blocks.
8. Once the relay chain state machine has enough information to consider the candidate's PoV as being available, the candidate is considered to be part of the parachain and is graduated to being a full parachain block.

The candidate can fail to be included in the parachain in any of the following ways:
- The collator is not able to propagate the block to any of the assigned validators.
- The candidate is not backed by validators participating to the Candidate Backing subsystem.
- The candidate is not selected by a relay chain block author.
- The candidate's PoV is not considered available within a timeout, and it is discarded frm the relay chain.

Once the parablock is considered available and part of the parachain, is still "pending approval".

## Approval Pipeline






[BABE]: ./learn-consensus.md#block-production-babe