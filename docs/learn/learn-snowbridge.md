---
id: learn-snowbridge
title: Snowbridge
sidebar_label: Snowbridge
description: Overview of Snowbridge by Snowfork
keywords: [Bridge, XCM, Bridge Hub, Snowbridge, Snowfork]
slug: ../learn-snowbridge
---

Snowbridge by Snowfork is a general-purpose, trustless bridge between Polkadot and Ethereum. It
utilizes the Bridge Hub system parachain to establish a connection to its relayers, allowing for
permissionless transfers between the two networks.

## Trustlessness in Snowbridge

Trustlessness here is defined in the sense that the users do not need to trust any particular
individuals or organizations, but rather only the mathematics, code, cryptography, and protocol. An
example of a system which implies **trust** would be that of a bridge which is controlled via a
multi-signature scheme, where you must trust the cosignatories when move funds. However, basic
assumptions are always needed in principle, as a completely trustless setup cannot always be
guaranteed.

With Snowbridge, a sender can always run a
[relayer](https://docs.snowbridge.network/architecture/relayers) to ensure that their cross-chain
transaction is successful.

## Applications

Snowbridge currently supports
[token transfers](https://docs.snowbridge.network/applications/token-transfers) from Ethereum to any
Polkadot parachain (and back again).

## Accessing & Using Snowbridge

Snowbridge can be accessed through [the web app.](https://app.snowbridge.network/), where you may
track [how long transfers are taking,](https://app.snowbridge.network/status),
[recent transfers](https://app.snowbridge.network/history), and more.

To create transfers, you may visit the [transfer page.](https://app.snowbridge.network/)
