---
id: learn-jam-faq
title: FAQ for Polkadot's JAM Chain
sidebar_label: JAM FAQ
description: FAQ about Polkadot's Join-Accumulate Machine.
keywords: [Polkadot, JAM, join-accumulate, faq]
slug: ../learn-jam-faq
---

!!!info "Technical information about JAM"
    For an in-depth overview of JAM, see the [Wiki page about the JAM Chain](./learn-jam-chain.md).

## What is JAM?

JAM is a research and development project initiated by
[Parity Technologies](https://www.parity.io/). It's a computational model that focuses on the
process of collecting, refining, joining, and accumulating data within a blockchain network.

## What does "JAM" stand for?

"JAM" stands for "Join Accumulate Machine." It represents the core principles of the computational
model to be implemented on the JAM chain.

## Why is JAM groundbreaking?

The dilemma of achieving ultimate performance and scalability while still being flexible to build
any use case is as old as blockchains. Current Web3 developers have to choose whether or not to
build a smart contract or an appchain. Smart contracts on L1s are faster to write but come with
downsides. They are limited to the underlying protocol, are not as efficient, do not offer the
flexibility teams need and compete with the rest of the ecosystem for resources. Appchains provide a
more efficient and flexible development environment, as the chains are custom-made for a specific
purpose. With JAM, groundbreaking scalability currently only seen through rollups is brought to the
consensus layer. Developers no longer need to decide if they build appchains or smart contracts;
with JAM, they have a flexible and rich environment for both. So, in short, there will be L2
scalability without the need for rollup solutions while being fully flexible to build any
application.

## What are services?

Services are modules that run on top of JAM. One of these services would be, for example, the
ChainService. This service would implement the parachain logic that is currently enshrined in the
Polkadot protocol. JAM’s `refine` and `accumulate` phases are generic entry points that will be used
to implement specific permissionless services.

## How does JAM differ from traditional blockchain networks?

JAM is built as a distributed computer. This means that it can run almost any task that can be
expressed as a service. The JAM chain will have almost no functionality, meaning there will be no
user transactions. All the logic, like governance, staking, etc., would live on system **services**.
JAM will provide synchronous composability across heterogeneous services, enabling new kinds of
interoperability.

## Will Agile Coretime remain part of the Polkadot vision?

Yes. [Agile Coretime](./learn-agile-coretime.md), an innovation that transforms Polkadot into a
computational resource, will be rolled out onto the Polkadot network in the near future. JAM is
further down the line, but Coretime will similarly be available to purchase on JAM.

## How do services interact with JAM?

Services interact with JAM through predefined entry points: Refine, Accumulate, and onTransfer (see
more information on the [JAM Chain page](./learn-jam-chain.md#service-entry-points)). Each service
defines its specific functions and workflows, executed within the JAM framework according to the
network's requirements.

## What are the main components of JAM?

JAM consists of four main components: Refine, Accumulate, and onTransfer (see more information on
the [JAM Chain page](./learn-jam-chain.md#service-entry-points)). These components define the
workflow for processing and integrating data within the network.

## What is the goal of JAM?

JAM's primary goal is to provide a flexible and efficient framework for managing data and
computations within a network. It aims to streamline data integration and maintenance while ensuring
the network's integrity and security.

## Is JAM related to Polkadot?

Yes, JAM is a potential candidate for evolving the Polkadot relay chain. The key change is that
parachains are no longer enshrined on the relay chain and will be running on top of a service that
is compatible with parachain protocol. One service will be, for example, the current parachains
service. Anyone can permissionlessly add a service to the JAM Chain by specifying the entry points
Refine, Accumulate and onTransfer.

## How would the Relay Chain change with JAM?

JAM would be a successor to the relay chain, with a more straightforward and flexible architecture.
Only the consensus functionality would be kept, while the rest, such as security, governance, etc.,
would run on system-level services. The current relay chain will run on multiple cores in the new
JAM architecture, guaranteeing full compatibility.

## In the new architecture, what does the tech stack look like?

From the point of view of parachains, the tech stack doesn’t look that much different. They will
continue to get validated by the validators, etc. JAM will offer the possibility of running smart
contracts on the same level as parachains. This means a potential service can be written that
enables people to run Solidity-based smart contracts directly on top of JAM without running on any
parachain. The other more future-oriented development will be CorePlay. CorePlay will be an
actor-based framework. The idea is to support long-running tasks/actors on top of JAM. Long-running
here means that programs will continue running intermittently (can pause and resume). This provides
quite a lot of simplifications for the developer when writing contracts. Ultimately, it should be
much simpler to write a program that can run on top of a (decentralized) blockchain than it is now.

## How can developers get involved with JAM?

Developers interested in JAM can explore and participate once the
[RFC](../general/start-building.md#requests-for-comment-rfcs) is out. Additionally, they can stay
updated on announcements and events related to JAM and its integration with other technologies via
Parity’s communication channels.

## What are some potential applications of JAM?

JAM's flexible and efficient computational model opens up possibilities for various applications,
but it is too early to jump into specific use cases just yet.

## Is there a roadmap for JAM's development?

While specific timelines may vary, the development of JAM typically involves ongoing research,
testing, and iteration. The RFC will be published as a first step, where the community gives
feedback and iterates on it.

## What about Polkadot? Will there be a hard fork?

JAM isn’t a successor to Polkadot but a potential evolution of the Polkadot relay chain. It can only
proceed if it passes through Polkadot’s decentralized governance system, winning approval from token
holders. The current parachain-centered logic would continue as a service on top of the new JAM
architecture. Part of the proposal will include tooling and hard-coded compatibility guarantees. The
relay chain will upgrade, and parachains can then enjoy a much richer environment, synchronous
compatibility, and excellent scaling capabilities better than current L2s but built inside the L0/L1
layer.

## Do parachains need to rewrite their code? How much work is it to build?

Parachains will be one of the “products” that can run on JAM. JAM will only remove the enshrined
parachain consensus and replace it with a model that supports different services. For some time, it
will likely be easier to develop parachains, as the necessary tooling for developing services needs
to be developed and adopted. For migration support, full compatibility guarantees will be written
into the code.

## Does it even make sense now to build a parachain on Polkadot?

Of course! Parachains will be one of the “products” that can run on JAM, and they will stay
first-class citizens. There will be different use cases, some suitable for parachains and some
suitable for services.

## What about DOT?

DOT will continue to be JAM’s native token. No other native token will be issued.

## Where can I learn more about JAM?

- Read the [JAM Chain page](./learn-jam-chain.md).
- Explore official communication on https://graypaper.com and from W3F, Parity, and Polkadot to
  learn more about JAM. You can also join discussions on the forum and the fellowship calls.
- Read
  [this blog post](https://grillapp.net/@filippoweb3/gavin-s-talk-about-jam-at-token2049-dubai-136004?ref=10124)
  about the original talk by Gavin Wood at Token2049 in Dubai.
- Read [the "Demystifying JAM" blog post](https://blog.kianenigma.com/posts/tech/demystifying-jam/)
  by Kian Paimani.
