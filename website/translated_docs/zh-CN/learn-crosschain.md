---
id: learn-crosschain
title: 跨链消息传递 (XCMP)
sidebar_label: 跨链消息传递 (XCMP)
---

Cross-chain transactions are resolved using a simple queuing mechanism based around a Merkle tree to ensure fidelity. It is the task of the Relay Chain validators to move transactions on the output queue of one parachain into the input queue of the destination parachain. However, only the associated metadata is stored as a hash in the Relay Chain storage.

The input and output queue are sometimes referred to in the codebase and associated documentation as "ingress" and "egress" messages respectively.

## Overview of XCMP

XCMP is currently under development and the details are subject to change. However, the overall architecture and design decisions are as follows:

- Cross-chain messages will _not_ go on to the Relay Chain.
- 跨链消息有长度限制
- 平行链可以拒绝接收从其它平行链发出的信息，在这种情况下，发送方会意识到有障碍
- 收集人节点负责把平行链之间的信息传递
- 收集人产生"出口"列表信息並会在"入口"接收到其它平行链信息
- 平行链在每个区块中，将会传递所有其它平行链信息
- 当收集人产生了区块并提交给验证人，它会收集最新入口队列信息并且处理它
- 验证人将会对收集人提交的平行链区块进行验证，包括处理到该平行链预期入口的信息

XCMP queues must be initiated by first opening a channel between two parachains. The channel is identified by both the sender and recipeient parachains, meaning that it's a one-way channel. A pair of parachains can have at most two channels between them, one for sending messages to the other chain and another for receiving messages. The channel will require a deposit in DOT to be opened, which will get returned when the channel is closed.

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

## Resources

- [XCMP 方案](https://research.web3.foundation/en/latest/polkadot/XCMP.html) - Web3 基金会研究维基上的跨链通信的完整技术描述。
- [Messaging Overview](https://w3f.github.io/parachain-implementers-guide/messaging.html) - An overview of the messaging schemes from the Parachain Implementor's guide.
- [XCM Format](https://github.com/paritytech/xcm-format) - Description of the XCMP format.
