---
id: learn-cross-consensus
title: Cross-Consensus Message Format (XCM)
sidebar_label: Cross-Consensus Message Format (XCM)
description: Learn about the messaging format at the forefront of interoperability.
slug: ../learn-crosschain
---

What started as an approach to _cross-chain communication_, has evolved into a format for
**Cross-Consensus**. Communication is not only conducted between chains, but also smart contracts,
pallets, bridges, and even sharded enclaves like [SPREE](learn-spree.md).

## Overview of XCM: A Format, Not a Protocol

**XCM is related to cross-chain in the same way that REST is related RESTful.**
XCM cannot actually send messages between systems. It is a format for how message
transfer should be performed, similar to how RESTful services use REST as an architectural style
of deployment.

    XCM aims to be a language communicating ideas between consensus systems, hence, "Cross-Consensus"

- A format for sending messages between chains
- Transacting with a chain whose transaction format is unknown. XCM is well-versioned, abstract and general:
  it can be used as a means of providing a long-lasting transaction format for wallets to use to create many common transactions.
  - As a result, XCM should be general enough for it to be properly useful throughout a growing ecosystem. It should be _extensible_, and, in turn, _future-proof_ and _forwards-compatible_.
- Efficient enough to run on-chain, and in a metered environment.

  > XCM is not designed in that every system supporting the format is expected to be able to interpret any
  > possible XCM message. Practically speaking, one can imagine that some messages will not have reasonable
  > interpretations under some systems or will be intentionally unsupported.

- Still, XCM offers a format for _general_ systems, including gas-metered smart contract platform and community
  parachains - all the way to trusted interactions between system parachains and their relay chain.
  > Although, the format should not bake elements, such as fee payment, too deep and irreversibly in the protocol.

### General Use-Cases

- The optional payment of fees
- Conduct some **platform-specific actions**
- Support a number of **token transfer models**
- **Remote Transfers**: control an account on a remote chain, allowing the local chain to have an address on the
  remote chain for receiving funds and to eventually transfer those funds it controls into other accounts on that remote chain.
- **Teleporting**: movement of an asset happens by destroying it on one side and creating a clone on the other
  side.
- **Reverse-Based Transfer**: there may be two chains that want to nominate a third chain, where one
  includes a native asset that can be used as a reserve for that asset. Then, the derivative form of the
  asset on each of those chains would be fully backed, allowing the derivative asset to be exchanged for the underlying asset on the reserve chain backing it.

### XCVM (Cross-Consensus Virtual Machine)

An ultra-high level non-Turing-complete computer whose instructions are designed in a way to be roughly at
the same level as transactions.

A _message_ in XCM is simply just a programme that runs on the `XCVM`: in other words, one or more XCM instructions. To learn more about the XCVM and the XCM Format, see the latest [blog post](https://medium.com/polkadot-network/xcm-the-cross-consensus-message-format-3b77b1373392) by Dr. Gavin Wood.

      Polkadot comes with three distinct systems for actually communicating XCM messages between
      its constituent chains.

The following diagram shows the XCM tech stack:

![xcm tech stack](../assets/cross-consensus-tech-stack.png)

> XCM can be used to express the meaning of the messages over each of these three communication channels.

### VMP (Vertical Message Passing)

There are two kinds of vertical message-passing transport protocols:

- **UMP (Upward Message Passing)**: allows parachains to send messages to their relay chain.
- **DMP (Downward Message Passing)**: allows the relay chain to pass messages down to one of their
  parachains.

Messages that are passed via `DMP` may originate from a parachain. In which case, first `UMP` is used to
communicate the message to the Relay Chain and `DMP` is used to move it down to another parachain.

### XCMP (Cross-Chain Message Passing)

The cross-chain message-passing transport protocol:

- **XCMP** (Cross-Chain Message Passing): allows the parachains to send messages between themselves.

Cross-chain transactions are resolved using a simple queuing mechanism based around a Merkle tree to
ensure fidelity. It is the task of the Relay Chain validators to move transactions on the output
queue of one parachain into the input queue of the destination parachain. However, only the
associated metadata is stored as a hash in the Relay Chain storage.

The input and output queue are sometimes referred to in the codebase and associated documentation as
`ingress` and `egress` messages respectively.

#### Overview of XCMP

XCMP is currently under development and the details are subject to change. However, the overall
architecture and design decisions are as follows:

- Cross-chain messages will _not_ go on to the Relay Chain.
- Cross-chain messages will be constrained to a maximum size in bytes.
- Parachains are allowed to block messages from other parachains, in which case the dispatching
  parachain would be aware of this block.
- Collator nodes are responsible for routing messages between chains.
- Collators produce a list of "egress" messages and will receive the "ingress" messages from other
  parachains.
- On each block, parachains are expected to route messages from some subset of all other parachains.
- When a collator produces a new block to hand off to a validator, it will collect the latest
  ingress queue information and process it.
- Validators will check the proof that the new candidate for the next parachain block includes the
  processing of the expected ingress messages to that parachain.

XCMP queues must be initiated by first opening a channel between two parachains. The channel is
identified by both the sender and recipient parachains, meaning that it's a one-way channel. A pair
of parachains can have at most two channels between them, one for sending messages to the other
chain and another for receiving messages. The channel will require a deposit in DOT to be opened,
which will get returned when the channel is closed.

#### `XCMP-Lite (HRMP)`

While XCMP is still being implemented, a stop-gap protocol (see definition below) known as
**Horizontal Relay-routed Message Passing (HRMP)** exists in its place. HRMP has the same interface
and functionality as XCMP but is much more demanding on resources since it stores all messages in
the Relay Chain storage. When XCMP has been implemented, HRMP is planned to be deprecated and phased
out in favor of it.

> Note: A stop-gap protocol is a temporary substitute for the functionality that is not fully
> complete. While XCMP proper is still in development, HRMP is a working replacement.

#### `XCMP Message Format`

For a description of the XCMP message format please see the [xcm-format][] repository on GitHub.

#### How To Make `Cross-Chain Transfers`

You can try out cross-chain transfers on the the [Rococo](../build/build-parachains.md##testing-a-parachains:-rococo-testnet) testnet. A
tutorial on downward, upward, and lateral transfers can be found
[here](../build/build-parachains.md###how-to-make-cross-chain-transfers).

#### `High-Level XCMP`

A smart contract that exists on parachain A will route a message to parachain B in which another
smart contract is called that makes a transfer of some assets within that chain.

Charlie executes the smart contract on parachain A, which initiates a new cross-chain message for
the destination of a smart contract on parachain B.

The collator node of parachain A will place this new cross-chain message into its outbound messages
queue, along with a `destination` and a `timestamp`.

The collator node of parachain B routinely pings all other collator nodes asking for new messages
(filtering by the `destination` field). When the collator of parachain B makes its next ping, it
will see this new message on parachain A and add it into its own inbound queue for processing into
the next block.

Validators for parachain A will also read the outbound queue and know the message. Validators for
parachain B will do the same. This is so that they will be able to verify the message transmission
happened.

When the collator of parachain B is building the next block in its chain, it will process the new
message in its inbound queue as well as any other messages it may have found/received.

During processing, the message will execute the smart contract on parachain B and complete the asset
transfer like intended.

The collator now hands this block to the validator, which itself will verify that this message was
processed. If the message was processed and all other aspects of the block are valid, the validator
will include this block for parachain B into the Relay Chain.

Check out our animated video below that explores how XCMP works.

<!-- Made with Adobe Animate and Canvas -->

<video
      controls="controls"  
      name="XCMP Animated Video" 
      width="560" height="315"
      src="https://storage.googleapis.com/w3f-tech-ed-contents/XCMP.mp4"> Sorry, your browser
doesn't support embedded videos. </video>

## Resources

- [XCM: The Cross-Consensus Message Format](https://medium.com/polkadot-network/xcm-the-cross-consensus-message-format-3b77b1373392) - Detailed blog post by Dr. Gavin Wood about the XCM Format.
- [XCM Format](https://github.com/paritytech/xcm-format) - Description of the high-level XCM format
  sent via XCMP.
- [XCMP Scheme](https://research.web3.foundation/en/latest/polkadot/XCMP.html) - Full technical
  description of cross-chain communication on the Web3 Foundation research wiki.
- [Messaging Overview](https://w3f.github.io/parachain-implementers-guide/messaging.html) - An
  overview of the messaging schemes from the Parachain Implementor's guide.

[xcm-format]: https://github.com/paritytech/xcm-format
