---
id: learn-extrinsics
title: Extrinsics
sidebar_label: Extrinsics
description: Learn about Transaction Types (i.e. Extrinsics)
keywords: [transaction, DOT, extrinsics, KSM]
slug: ../learn-extrinsics
---

## Pallets and Extrinsics

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} is built using
[substrate](https://substrate.io/), a modular system to efficiently build blockchains. Within each
module or **pallet**, one can **call** different functions that have similar logic. You can explore
substrate pallets on [this dedicated page](https://docs.substrate.io/reference/frame-pallets/). For
example, the staking pallet contains all functionalities related to staking such as bonding or
unbonding funds. The combined information of pallets and calls constitutes an **extrinsic**, i.e. a
transaction that is executed from outside the chain but that triggers an event on the chain.
Continuing with the staking example, within the staking pallet a nominator can bond funds and
nominate some validators. The signature of such extrinsic might lead to an event on the chain such
as a reward payout to that nominator at the end of an era; this is an event inside the chain.

## Importance of Verifying Extrinsics

:::info Walk-through Video Tutorial 

See [this technical explainer](https://youtu.be/bxMs-9fBtFk) tutorial to learn about how to verify extrinsics before signing them.

:::