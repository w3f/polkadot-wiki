---
id: learn-xcm-docs-overview-format
title: XCM is a Format, not a Protocol
sidebar_label: A Format, not a Protocol
description: XCM is a Format, not a Protocol.
keywords: [xcm, cross-consensus messaging, format]
slug: ../overview-format
---

# A Format, Not a Protocol

It's essential to understand that XCM is a format, not a protocol. It describes how messages should
be structured and contains instructions that convey on-chain actions that the message intends to
perform. However, XCM does not dictate how messages are delivered. That responsibility falls on
[transport layer protocols](https://wiki.polkadot.network/docs/learn-xcm-transport) such as XCMP
(Cross Chain Message Passing) and VMP (Vertical Message Passing) in the Polkadot ecosystem, or
bridging protocols.

This separation of concerns is useful, since it allows us to think of the interactions we want to
build between systems without having to think about how the messages involved are actually routed.

Not every system is expected to be able to interpret any possible XCM. Some messages will not have
reasonable interpretations under some systems or will be intentionally unsupported. For example,
some consensus systems won't deal with NFTs, and that's okay. Instructions that relate to NFTs will
have valid interpretations on some systems but not on others.

Furthermore, XCMs by themselves are not considered on-chain transactions: XCM describes how to
change the state of the target consensus system, but the message by itself does not perform state
changes. XCM communicates intentions; the actual interpretation and behaviour of each instruction in
an XCM is defined by target's XCVM implementation.

Both simple and more complex scenarios can be expressed, and developers are encouraged to design and
implement diverse cross-consensus communication solutions.
