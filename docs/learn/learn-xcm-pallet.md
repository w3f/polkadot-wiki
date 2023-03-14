---
id: learn-xcm-pallet
title: XCM FRAME Pallet Overview
sidebar_label: XCM Pallet
description: Learn how the XCM pallet works, and its place in the ecosystem.
keywords: [cross-consensus, XCM, XCMP, interoperability, communication]
slug: ../learn-xcm-pallet
---

The XCM pallet ([`pallet-xcm`](https://github.com/paritytech/polkadot/tree/master/xcm/pallet-xcm))
provides a developer-friendly interface for most of the common XCM messages.

This pallet provides default implementations for many traits required by `XcmConfig`, which is
highly useful for configuration. `pallet-xcm` provides a default interface, in the form of a pallet,
that can manage and deal with XCM-related storage and dispatchable functions.

It defines a set of extrinsics that can be utilized to build XCVM programs, either to target the
local or external chains. Pallet-xcm's functionality is separated into three categories:

1. Primitive, dispatchable functions to locally execute an XCM message.
2. High-level, dispatchable functions for asset transfers.
3. Version negotiation-specific dispatchable functions.

## Primitive Extrinsics

There are two primary primitive extrinsics. These extrinsics handle sending and executing XCVM
programs as dispatchable functions within the pallet.

1. `execute` - This call is a direct access to the XCM executor. It checks the origin, message, and
   ensures no barrier/filter will block the execution of the XCM message. Once it's deemed valid,
   the message will then be _locally_ executed, therein returning the outcome as an event. This
   operation is executed on behalf of whichever account has signed the extrinsic.
2. `send` - This call specifies where a message should be sent externally to a particular
   destination, i.e another parachain. It checks the origin, destination, and the message, and is
   then sent to the `XcmRouter`.

## Asset Transfer Extrinsics

There are several extrinsics that handle asset transfer logic. They define a redetermined set of
instructions in which to send and execute XCM messages. There are two variants of these functions,
prefixed with `limited_`. These dispatchables have the same functionality, but with the option of
specifying a weight to pay for the XCM fee.

Otherwise, the fee is taken as needed from the asset being transferred.

1. `reserve_transfer_assets` - Transfer some assets from the local chain to the sovereign account of
   a destination chain and forward a notification XCM.
2. `teleport_assets` - Teleport some assets from the local chain to some destination chain.

## Version Negotiation Extrinsics

These extrinisics require root, as they are only used when bypassing XCM version negotiation.

1. `force_xcm_version` - Modifies the `SupportedVersion` storage to change a particular
   destination's stated XCM version.
2. `force_default_xcm_version` - Modifies the `SafeXcmVersion` storage, which stores the default
   version to use when the destination's version is unknown.
3. `force_subscribe_version_notify` - Sends an XCM message with a `SubscribeVersion` instruction to
   a destination.
4. `force_unsubscribe_version_notify` - Sends an XCM message with a `UnsubscribeVersion` instruction
   to a destination.
