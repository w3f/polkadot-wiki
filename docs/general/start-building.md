---
id: start-building
title: Build on Polkadot
sidebar_label: Build on Polkadot
description: Start Building with the Polkadot SDK.
slug: ../start-building
---

## Polkadot SDK

The [Polkadot SDK](https://github.com/paritytech/polkadot-sdk) repository provides all the resources
needed to start building on the Polkadot network, a multi-chain blockchain platform that enables
different blockchains to interoperate and share information in a secure and scalable way. The
Polkadot SDK comprises three main pieces of software:

- [Polkadot Node](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot)
- [Substrate Blockchain SDK](https://github.com/paritytech/polkadot-sdk/tree/master/substrate)
- [Cumulus Tool Suite for Parachains](https://github.com/paritytech/polkadot-sdk/tree/master/cumulus)

The programming language used for development is [Rust](https://www.rust-lang.org/).

!!!info
    For more information about building on Polkadot, see [the Builder's Guide](../build/build-guide.md).


## Requests for Comment (RFCs)

With the release of [Polkadot runtime 1.0](./polkadot-v1.md), Polkadot's codebase is in the hands of
the community. Anyone can open a
[Request for Comment (RFC)](https://github.com/polkadot-fellows/RFCs) to propose and discuss changes
to the network protocol, runtime logic, public interfaces, and other technical matters.

To submit an RFC, follow the instructions [here](https://github.com/polkadot-fellows/RFCs#process).

RFCs can only be approved and merged by III-Dan members of
[Polkadot Technical Fellowship](../learn/learn-polkadot-technical-fellowship.md) via on-chain voting
mechanism. Definitive approval or rejection is done by issuing the `RFC_APPROVE(xxxx, h)` or
`RFC_REJECT(xxxx, h)` on-chain remark from the Fellowship origin on the Polkadot Collectives
parachain, where `xxxx` is the RFC number and `h` is the hash of the raw proposal text.

For example, the first RFC [RFC-1](https://github.com/polkadot-fellows/RFCs/pull/1) about Agile
Coretime was proposed by Gavin Wood on the 30th of June 2023 and merged on the 12th of August 2023.
Subsequently, the
[code for the Agile Coretime Broker pallet](https://github.com/paritytech/polkadot-sdk/tree/master/substrate/pull/14568)
was added to the Substrate FRAME system.

In general, the workflow from RFC write-up submission to its implementation follows the timeline
below:

- RFC submitted by following the [instructions](https://github.com/polkadot-fellows/RFCs#process).
- RFC review by the Technical Fellowship [via GitHub](https://github.com/polkadot-fellows/RFCs)
- Polkadot Technical Fellowship Referendum of the RFC submitted to the Track `3 / Fellows` by
  members with a rank greater than or equal to 3.
- If the Referendum is approved through on-chain vote by the Technical Fellowship, changes discussed
  in the RFC will be implemented.
- If the changes requested through the RFC require a broader consensus of DOT holders, an OpenGov
  referendum may be created. For instance,
  [adding a new system collective](https://github.com/polkadot-fellows/RFCs/blob/main/text/0012-process-for-adding-new-collectives.md)
  or making changes to network parameters like inflation rate, treasury inflow etc.

!!!note "Polkadot Runtime Code Changes through Root track"
    Although the Technical Fellowship maintains the [runtimes of Polkadot and Kusama](https://github.com/polkadot-fellows/runtimes), changes to the network protocol are not gated by the fellowship. Any DOT holder can submit a referendum on [the Polkadot OpenGov Root track](../learn/learn-polkadot-opengov-origins.md#root) to set the runtime code with the proposed changes.

For more information about the adoption of RFCs within the Polkadot ecosystem, see
[this Medium article](https://www.polkadotphilosophy.com/polkadots-strategic-adoption-of-rfcs-pioneering-a-collaborative-future-in-blockchain-3330843cfd4f)
and the
[original Polkadot Forum post](https://forum.polkadot.network/t/polkadot-protocol-proposals-rfc-process/1421/1).