---
id: start-building
title: Build on Polkadot
sidebar_label: Build on Polkadot
description: Start Building with the Polkadot SDK.
slug: ../start-building
---

## Request of Commit (RFC)

With the release of [Polkadot runtime 1.0](./polkadot-v1.md), Polkadot's codebase is in the hands of
the community. Anyone can open a
[Request For Commit (RFC)](https://github.com/polkadot-fellows/RFCs) to propose and discuss changes
to the network protocol, runtime logic, and public interfaces, and other technical matters.

To submit an RFC, follow the instructions [here](https://github.com/polkadot-fellows/RFCs#process).

RFCs can only be approved and merged by III-Dan members of
[Polkadot Technical Fellowship](../learn/learn-polkadot-technical-fellowship.md) via on-chain voting
mechanism. Definitive approval or rejection is done by issuing the `RFC_APPROVE(xxxx, h)` or
`RFC_REJECT(xxxx, h)` on-chain remark from the Fellowship origin on the Polkadot Collectives
parachain, where `xxxx` is the RFC number and `h` is the hash of the raw proposal text.

For example, the first RFC [RFC-1](https://github.com/polkadot-fellows/RFCs/pull/1) about Agile
Coretime was proposed by Gavin Wood on the 30th of June 2023 and merged on the 12th of August 2023.
Subsequently, the
[code for the Agile Coretime Broker pallet](https://github.com/paritytech/substrate/pull/14568) was
added to the Substrate FRAME system.

In general, the flow from RFC write-up to its implementation will follow the timeline below:

- RFC write-up and review [via GitHub](https://github.com/polkadot-fellows/RFCs)
- Polkadot Technical Fellowship Referendum submitted to the Track `3 / Fellows`
- If the Referendum is approved, changes discussed in the RFC are implemented
- Further changes to the RFC's implementation can be subject to an OpenGov referendum in the future
  if the token holders deem it necessary

For more information about the adoption of RFCs within the Polkadot ecosystem, see
[this Medium article](https://www.polkadotphilosophy.com/polkadots-strategic-adoption-of-rfcs-pioneering-a-collaborative-future-in-blockchain-3330843cfd4f)
and the
[original Polkadot Forum post](https://forum.polkadot.network/t/polkadot-protocol-proposals-rfc-process/1421/1).

## Polkadot SDK

:::info

For more information about building on Polkadot, see [the Builder's Guide](../build/build-index.md).

:::

The [Polkadot Software Development Kit (SDK)](https://github.com/paritytech/polkadot-sdk) includes
all the tools needed to build on the Polkadot ecosystem. The main repositories include:

- Implementation of a node for the Polkadot network in Rust, using the Substrate framework
- The [Substrate SDK](https://substrate.io/)
- [Cumulus - Parachain Development Kit](../build/build-parachains.md#cumulus)

The programming language used for development is [Rust](https://www.rust-lang.org/).
