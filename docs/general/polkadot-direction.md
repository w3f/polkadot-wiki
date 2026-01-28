---
title: Polkadot Direction
description: Learn about Polkadot's future direction as a decentralized, secure, and ubiquitous computing platform for Web3 applications.
---

!!!info
    The material on this page is based on [Gavin Wood's talk at Polkadot Decoded 2023](https://www.youtube.com/watch?v=GIB1WeVuJD0).

Understanding what [Polkadot 2.0](./polkadot-v2.md) will help us envision the future direction of the Polkadot ecosystem toward abstraction and generalization.

Fundamentally, Polkadot was a platform to host just chains, and so far, chains have happened to be one way to build applications and grow Polkadot's utility.

## From Chain-centricity to Application-centricity

Polkadot has been abstracted and generalized beyond what was originally proposed and envisioned in the [Polkadot whitepaper](https://polkadot.network/whitepaper/).

If we see Polkadot as a service provider of trustless, resilient and verifiable computation through cores as well as secure interoperability between core-secured rollup chains, the future development of Polkadot can be directed towards the following paradigm shift: from being an chain-focused ecosystem to being an application-focused ecosystem, where applications are not only blockchains.

## Offloading Tasks to System Chains

Polkadot 1.0 was a chain-centric paradigm comprising domain-specific rollups that could exchange messages. Trusted communication channels are ensured via a shared security mechanism provided by the ELVES protocol, Polkadot's rollup technology. Polkadot not only provides message-passing
capability, but also extra functionalities such as [staking](../knowledge-base/staking-advanced.md),
[accounts](../getting-started/accounts/index.md), [balances](../knowledge-base/transactions.md#balance-transfers),
and [governance](../knowledge-base/opengov.md). Having a chain-centric system will ultimately
end in a chain-centric application and UX.

The true innovation of Polkadot is about leveraging the unique value proposition offered by
different chains and using those chains’ collaborative potential to build inter-chain applications
to solve real-world problems. Those applications will thus need to span across chains.

**Increasingly fewer tasks will be handled by the relay chain** which will focus efforts only on
primary tasks: securing the network and providing secure message-passing capability.
[System parachains](../knowledge-base/system-chains.md) will be used to take over secondary relay chain
tasks such as staking, governance, etc.

### XCM and Accords

[XCMP](../learn/learn-xcm.md) is the transport layer for delivering XCM messages. It gives the
transportation method and a secure route but not a framework for binding agreements.

[XCM](../reference/xcm-transport.md) is a format, a language of intention abstracted over
functionality common within chains. It creates an expressive language of what you intend to do or
want to happen. XCM messages are transported between different chains using XCMP. Ideally, in a
fully trustless environment, strong guarantees ensure chains faithfully interpret XCM messages. We
can have a secure mode of delivering messages that can be interpreted across protocols, but still
messages might be misinterpreted. These guarantees can be achieved with accords.

An **Accord** is an _opt-in_ treaty across many chains, where treaty logic cannot be changed or
undermined by one or more of those chains, and Polkadot guarantees faithful execution of this logic.
Accords will be specific to a particular function, and any chain that enters the accord will be held
to it and will serve that particular function. To lower the entry barrier, accords can be proposed
permissionlessly, but because they are opt-in, the accord proposal will take effect until chains
agree and sign up.

To sum up, accords ensure that the receiver faithfully interprets XCM messages securely sent via
XCMP channels. Accords are the missing piece of the puzzle to achieve a fully trustless and
collaborative environment between applications.

Polkadot is the only ecosystem where accords can properly exist because it has a homogeneous security
layer that provides a specific state transition function for each logic component. This allows
patterns of cooperation between multiple logic components (i.e., trans-applications) that would not
be possible to achieve over bridges.

Accords will be implemented using [SPREE technology](../reference/spree.md).

## Agile Core Usage

In Polkadot 1.0, one core is assigned to one application (in this case, equivalent to a parachain).
Ideally, core affinity (i.e., which application operates on which core) is unimportant (see below).
Cores do not have any higher friendliness to one application than another.

![core-usage-dumb-noAffinity](../assets/core-usage-dumb-noAffinity.png)

Here, we remove the assumption that each application owns a core and instead that all cores are a
resource to be consumed and used as needed by all applications in the ecosystem.

### Compressed Cores

The same core can secure multiple blocks of the same application simultaneously. Combining multiple
application blocks in the same relay chain core will reduce latency at the expense of increased
bandwidth for the fixed price of opening and closing a block.

![core-usage-agile-compressed](../assets/core-usage-agile-compressed.png)

### Shared Cores

Sharing cores with other applications to share costs but with no reduction in latency. Note that
this is different from the [split coretime](./polkadot-v2.md#polkadot-20-core-usage-and-functionalities) where one core is used by multiple
application at different times to share costs at the expense of higher latency. Shared cores will be
enabled with [JAM](../getting-started/introduction/evolution.md), a semi-coherent system in which data from different
shards can be scheduled within the same core.

![core-usage-agile-shared](../assets/core-usage-agile-shared.png)

## Agile Composable Computer

All the options of agile [coretime allocation](./polkadot-v2.md#polkadot-20-core-usage-and-functionalities) and
[core usage](#agile-core-usage) can be composable and enable the creation of an agile decentralized
global computing system.

![core-usage-agile-composable](../assets/core-usage-agile-composable.png)

Thus, this new vision is focused on Polkadot’s resource, which is secure, flexible, and available
blockspace that can be accessed by reserving some time on a core. Agility in allocating coretime and
using cores allows for maximized network efficiency and blockspace usage.

## Polkadot's Resilience

Systems that have yet to be engineered with decentralization, cryptography, and game theory in mind
are breakable and prone to cyber-attacks. Polkadot is basing its resilience on different pillars:

- **Preponderance of light-client usage:** Centralized RPC servers are common but susceptible to
  attack and not trustless decentralized entry points to using blockchain-based applications. Light
  client usage on Polkadot is possible through
  [Smoldot](https://github.com/smol-dot/smoldot).
- **Zero-Knowledge (ZK) Primitives:** They can have a problematic effect on censorship and
  centralization as having a big state transition function boiled down to a single proof of correct
  execution. However, a library of
  richly featured and high-performance ZK primitives ready for specific use cases is being built.
  The first use-case will be used to improve privacy for on-chain collectives such as
  [the Polkadot Technical Fellowship](../knowledge-base/technical-fellowship.md).
- **[SAFROLE](../reference/safrole.md) consensus:** New forkless block-production consensus
  algorithm replacing [BABE](../reference/consensus.md#block-production-babe) and where blocks are
  not produced unless they are expected to be finalized. This will provide several benefits, such
  as:
  - Improved security, parachain performance, and UX from being forkless
  - Preventing front-running attacks through high-performance transaction routing where transactions
    are included in blocks in one hop instead of being gossiped, and transaction encryption.
- **Internode Mixnet:** Shielded transport for short messages that avoids leaking IP information for
  transactions, and introduces a general messaging system allowing users, chains and off-chain workers,
  smart contracts, pallets, and anything else existing within a chain to exchange messages containing
  signatures, intentions, etc.
- **Social Decentralization:** Resilience is achieved by including many participants contributing to
  the system and coming to decisions through on-chain governance. Involving as many people as
  possible ensures resilience against spending becoming systemically misjudged and appropriately
  directs wealth for spending treasury funds, salaries, and grants. Another crucial way of
  decentralizing the network is ensuring experts on which the maintenance of the system relies upon
  are incentivized and recruited over time by the Polkadot network and not by organizations within
  the Polkadot ecosystem.
