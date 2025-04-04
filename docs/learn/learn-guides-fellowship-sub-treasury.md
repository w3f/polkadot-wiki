---
id: learn-guides-fellowship-sub-treasury
title: Create a Fellowship Sub-Treasury Proposal - Polkadot-JS Guides
sidebar_label: Create a Fellowship Sub-Treasury Proposal
description: Create sub-treasury proposal for the Polkadot Technical Fellowship
keyword: [guides, polkadot-js, accounts, treasury, fellowship]
slug: ../learn-guides-fellowship-sub-treasury
---

Spend proposals can be created via [Subsquare](https://collectives.subsquare.io/fellowship). A
preimage will be necessary, and may be created via Subsquare, or Polkadot JS.

## Creating a DOT Spend Preimage

This is an example of an
[extrinsic](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fwestend-collectives-rpc-tn.dwellir.com#/extrinsics/decode/0x410503010100a10f000100000300010100000000000000000000000000000000000000000000000000000000000000000000)
which specifies the beneficiary on AssetHub. Keep in mind that the amount must be specified in
plancks, [which can be easily converted here.](https://sr25519.com/dots-to-planck-polkadot/)

You may also find an example of a
[successful spend here.](https://collectives.subsquare.io/fellowship/referenda/186)

## Submitting the Proposal

Once a preimage is acquired, the proposal may be created and submitted via
[Subsquare](https://collectives.subsquare.io/fellowship). Note that you must be either a **Fellow**
or an **Architect** to create such a proposal.
