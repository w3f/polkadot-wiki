---
id: learn-snowbridge
title: Snowbridge
sidebar_label: Snowbridge
description: Overview of Snowbridge by Snowfork
keywords: [Bridge, XCM, Bridge Hub, Snowbridge, Snowfork]
slug: ../learn-snowbridge
---

:::info Using Snowbridge

Snowbridge can be accessed through [the web app](https://app.snowbridge.network/), where you may
track [processing times of transactions,](https://app.snowbridge.network/status),
[recent transfers](https://app.snowbridge.network/history), and other information about the bridge's
overall status.

:::

Snowbridge by [Snowfork](https://snowfork.com/) is a general-purpose, trustless bridge between
Polkadot and Ethereum. It utilizes the
[Bridge Hub system parachain](./learn-system-chains.md#bridge-hub) to establish a connection to its
relayers, allowing for permissionless messaging between Ethereum and Polkadot.

With Snowbridge, a sender can always run a
[relayer](https://docs.snowbridge.network/architecture/relayers) to ensure that their cross-chain
transaction is successful.

Snowbridge currently supports
[two-way token transfers](https://docs.snowbridge.network/applications/token-transfers) between
Ethereum and Polkadot parachain.

## Random-sampling BEEFY

A trustless bridge always has a **prover** (need to compute the proof), a **verifier** (asks the
prover to compute the proof and verifies it), and relayers to relay messages. Snowbridge prover uses
Random-sampling BEEFY, a novel bridge protocol that drastically reduces operational costs without
compromising security.
