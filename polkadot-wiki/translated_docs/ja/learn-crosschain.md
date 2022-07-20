---
id: learn-xcm
title: Cross-chain Message Passing (XCMP)
sidebar_label: Cross-chain Message Passing (XCMP)
---

Cross-chain transactions are resolved using a simple queuing mechanism based around a Merkle tree to ensure fidelity. It is the task of the Relay Chain validators to move transactions on the output queue of one parachain into the input queue of the destination parachain. However, only the associated metadata is stored as a hash in the Relay Chain storage.

The input and output queue are sometimes referred to in the codebase and associated documentation as "ingress" and "egress" messages respectively.

## Overview of XCMP

XCMP is currently under development and the details are subject to change. However, the overall architecture and design decisions are as follows:

- Cross-chain messages will _not_ go on to the Relay Chain.
- Cross-chain messages will be constrained to a maximum size in bytes.
- Parachains are allowed to block messages from other parachains, in which case the dispatching parachain would be aware of this block.
- Collator nodes are responsible for routing messages between chains.
- Collators produce a list of "egress" messages and will receive the "ingress" messages from other parachains.
- On each block, parachains are expected to route messages from some subset of all other parachains.
- When a collator produces a new block to hand off to a validator, it will collect the latest ingress queue information and process it.
- Validators will check a proof that the new candidate for the next parachain block includes the processing of the expected ingress messages to that parachain.

XCMP queues must be initiated by first opening a channel between two parachains. The channel is identified by both the sender and recipient parachains, meaning that it's a one-way channel. A pair of parachains can have at most two channels between them, one for sending messages to the other chain and another for receiving messages. The channel will require a deposit in DOT to be opened, which will get returned when the channel is closed.

## Horizontal Relay-routed Message Passing (HRMP)

While XCMP is still being implemented, a stop-gap protocol (see definition below) known as HRMP exists in its place. HRMP has the same interface and functionality as XCMP but is much more demanding on resources since it stores all messages in the Relay Chain storage. When XCMP has been implemented, HRMP is planned to be deprecated and phased out in favor of it.

> Note: A stop-gap protocol is a temporary subsitute for the functionality that is not fully complete. While XCMP proper is still in development, HRMP is a working replacement.

## Vertical Message Passing

There are two kinds of Vertical Message Passing, Upward Message Passing (UMP) and Downward Message Passing (DMP). UMP is used when a message originates on a parachain or a parathread to go from that parachain up to the Relay Chain. DMP is used to go the other way around, when a message originates from the Relay Chain and is destined for a parachain. Messages that are passed via DMP may originate from a parachain. In which case, first UMP is used to communicate the message to the Relay Chain and DMP is used to move it down to another parachain.

## XCMP Message Format

For a description of the XCMP message format please see the [xcm-format](https://github.com/paritytech/xcm-format) repository on GitHub.

## Example of XCMP

A smart contract that exists on parachain A will route a message to parachain B in which another smart contract is called that makes a transfer of some assets within that chain.

Charlie executes the smart contract on parachain A, which initiates a new cross-chain message for the destination of a smart contract on parachain B.

The collator node of parachain A will place this new cross-chain message into its outbound messages queue, along with a `destination` and a `timestamp`.

The collator node of parachain B routinely pings all other collator nodes asking for new messages (filtering by the `destination` field). When the collator of parachain B makes its next ping, it will see this new message on parachain A and add it into its own inbound queue for processing into the next block.

Validators for parachain A will also read the outbound queue and know the message. Validators for parachain B will do the same. This is so that they will be able to verify the message transmission happened.

When the collator of parachain B is building the next block in its chain, it will process the new message in its inbound queue as well as any other messages it may have found/received.

During processing, the message will execute the smart contract on parachain B and complete the asset transfer like intended.

The collator now hands this block to the validator, which itself will verify that this message was processed. If the message was processed and all other aspects of the block are valid, the validator will include this block for parachain B into the Relay Chain.

Check out our animated video below that explores how XCMP works.

<!-- Made with Adobe Animate and Canvas -->

<video 
      controls="controls"  
      name="XCMP Animated Video" 
      width="560" height="315"
      src="https://storage.googleapis.com/w3f-tech-ed-contents/XCMP.mp4"> Sorry, your browser
doesn't support embedded videos. </video>

<style>
video::-webkit-media-controls-fullscreen-button
{
        display: none !important;
}
</style>

## Resources

- [XCMP Scheme](https://research.web3.foundation/en/latest/polkadot/XCMP.html) - Full technical description of cross-chain communication on the Web3 Foundation research wiki.
- [Messaging Overview](https://w3f.github.io/parachain-implementers-guide/messaging.html) - An overview of the messaging schemes from the Parachain Implementor's guide.
- [XCM Format](https://github.com/paritytech/xcm-format) - Description of the XCMP format.
