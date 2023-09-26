---
id: learn-sassafras
title: "Polkadot Block Production: SASSAFRAS"
sidebar_label: SASSAFRAS
description: The Consensus Mechanism of Polkadot.
keywords:
  [
    consensus,
    proof of stake,
    nominated proof of stake,
    hybrid consensus,
    block production,
    sassafras,
    babe,
  ]
slug: ../learn-sassafras
---

SASSAFRAS (Semi Anonymous Sortition of Staked Assignees For Fixed-time Rhythmic Assignment of Slots)
(aka SASSY BABE or BADASS BABE), is an extension of BABE and acts as a constant-time block
production protocol. This approach tries to address the shortcomings of
[BABE](./learn-consensus.md#block-production-babe) by ensuring that exactly one block is produced
with time-constant intervals. The protocol utilizes zk-SNARKs to construct a
ring-[VRF](./learn-cryptography.md#vrf) and is a work in progress.

This page will be updated as progress ensues.

## Resources

- [Web3 Foundation Research page](https://research.web3.foundation/Polkadot/protocols/block-production/SASSAFRAS)
  about SASSAFRAS
