---
id: learn-xcm-pallet
title: XCM FRAME Pallet Overview
sidebar_label: XCM FRAME Pallet Overview
description: Learn how the XCM pallet works, and its place in the ecosystem.
keywords: [cross-consensus, XCM, XCMP, interoperability, communication]
slug: ../learn-xcm-pallet
---

The XCM pallet ([`pallet-xcm`](https://github.com/paritytech/polkadot/tree/master/xcm/pallet-xcm))
provides a developer-friendly interface for more of the common XCM messages.

This pallet provides default implementations for many traits required by `XcmConfig`, which is
highly useful for configuration.

It defines a set of ten extrinsics that can be utilized to build XCVM programs, either to target the
local or external chains. Pallet-xcm's functionality is separated into three categories:

1. Primitive, dispatchable functions to locally execute an XCM message.
2. High-level, dispatchable functions for asset transfers.
3. Version negotiation-specific dispatchable functions.
