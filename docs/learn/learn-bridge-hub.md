---
id: learn-bridge-hub
title: Bridge Hub
sidebar_label: Bridge Hub
description: Overview of Bridge Hub System Parachain.
keywords: [Bridge, XCM, Bridge Hub]
slug: ../learn-bridge-hub
---

The primary functionality of {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} relay
chain is to secure the parachains and facilitate secure communication between them. All other
functionalities like asset transfers, governance, identities and especially bridging, which can be
resource intensive can benefit from operating seaparately on system parachains. That's why, the
Bridge Hub system parachain is operating on
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} since 2023. The Bridge Hub has all
the required bridge pallets in its runtime, which enable trustless bridging with other blockchain
networks like {{ polkadot: Kusama :polkadot }}{{ kusama: Polkadot :kusama }}, Ethereum etc. The
Bridge Hub uses the native token of the relay chain,
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}. Any bridge operating on Bridge Hub will have
on-chain (pallets) and offchain (relayers) components. For more information, read through the
[high level documentation on bridges on the Polkadot-SDK repository](https://github.com/paritytech/polkadot-sdk/blob/master/bridges/docs/high-level-overview.md).
