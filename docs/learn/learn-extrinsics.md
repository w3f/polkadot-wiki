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

See [this technical explainer](https://youtu.be/bxMs-9fBtFk) tutorial to learn about how to verify extrinsics before signing them. The video will also mention potential attacks that can happen to you while signing for transactions. **Do not sign any transaction if you suspect you are or have been under attack.**

:::

:::warning Always check for Metadata Updates

Before signing extrinsics with the Polkadot-JS Browser Extension and Parity Signer, always check for metadata updates. [This technical explainer video](https://youtu.be/gbvrHzr4EDY) will explain how to do it. Failing to update metadata will result in errors while signing that for example will ultimately result in you not being able to transfer funds. Before authorizing the metadata update check who is requesting it. Any request not coming from the Polkadot-JS Apps must not be signed.

:::

Verifying the extrinsic you are signing can take some more time before signing for a transaction but it allows you to add an extra security step. There are a multitude of possible attacks that will prevent you to send funds to the desired destination account. Here below we will list some major attacks that can happen to you.

### Clipboard Memory Attack

:::info

For a more detailed read about clipboard memory attacks see [this article](https://www.kaspersky.com/blog/cryptoshuffler-bitcoin-stealer/19976/).

:::

The clipboard memory is that memory on you computer dedicated to copy-paste operations. There is malicious software that can be remotely installed on your computer and that is able to detect when a cryptocurrency address is copied. Let's say you want to send funds to Address A (belonging to you), after copying address A the software swaps that address with Address B (belonging to the attacker). If you do not check the receiver address before signing the funds will be lost. 

### Corrupted Polkadot-JS Browser Extension

There a minor risk that the Polkadot-JS Browser Extension is corrupted because it was downloaded by non-trusted source. In this scenario the extension will display that you will sign for an Extrinsic A but in the background will execute another extrinsic, Extrinsic B. If you are using a Ledger device this attack can be detected because you will be able to see Extrinsic B on the screen of you Ledger Nano.

### Genuine Polkadot-JS Browser Extension

An attack can still happen if your extension is genuine, but the website it is connected with is corrupted. In this scenario you want to perform Extrinsic A on the website, which will send Extrinsic B to the extension for signature. If you are using a Ledger device, it will display Extrinsic B. In this case it is more difficult to spot the attack and it is up to the user to know the extrinsic that was created on the website in the first place.

### Corrupted QR-code (Parity Signer)

If you are using Parity Signer, there might be 