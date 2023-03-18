---
id: learn-xcm-pallet
title: XCM FRAME Pallet Overview
sidebar_label: XCM Pallet
description: Learn how the XCM pallet works, and its place in the ecosystem.
keywords: [cross-consensus, XCM, XCMP, interoperability, communication]
slug: ../learn-xcm-pallet
---

The XCM pallet ([`pallet-xcm`](https://github.com/paritytech/polkadot/tree/master/xcm/pallet-xcm))
provides a developer-friendly interface for most of the common XCMs.

This pallet provides some default implementations for traits required by `XcmConfig`, as well the
`ExecuteXcm` trait over the pallet's own configuration.  
`pallet-xcm` provides a default interface in the form of a pallet, that can manage and deal with
XCM-related storage and higher-level dispatchable functions.

It defines a set of extrinsics that can be utilized to build XCVM programs, either to target the
local or external chains. `pallet-xcm`'s functionality is separated into three categories:

:::note

Remember, all XCMs are effectively XCVM programs that contain a set of instructions. It is the job
of the XCM executor is to handle and execute these programs.

:::

1. Primitive, dispatchable functions to locally execute an XCM.
2. High-level, dispatchable functions for asset transfers.
3. Version negotiation-specific dispatchable functions.

## Primitive Extrinsics

There are two primary primitive extrinsics. These extrinsics handle sending and executing XCVM
programs as dispatchable functions within the pallet.

1. `execute` - This call is direct access to the XCM executor. It checks the origin and message and
   ensures that no barrier/filter will block the execution of the XCM. Once it is deemed valid, the
   message will then be _locally_ executed, therein returning the outcome as an event. This
   operation is executed on behalf of whichever account has signed the extrinsic. It's possible for
   only a partial execution to occur.
2. `send` - This call specifies where a message should be sent externally to a particular
   destination, i.e., another parachain. It checks the origin, destination, and message and is then
   sent to the `XcmRouter`.

:::info

The XCM pallet needs the `XcmRouter` to send XCMs. It is used to dictate where XCMs are allowed to
be sent, and which XCM transport protocol to use. For example, Kusama, the canary network, uses the
`ChildParachainRoute` which only allows for Downward Message Passing from the relay to parachains to
occur.

You can read more about [XCM transport methods here.](./learn-xcm-transport.md)

:::

## Asset Transfer Extrinsics

Several extrinsics within the pallet handle asset transfer logic. They define a predetermined set of
instructions for sending and executing XCMs. Two variants of these functions are prefixed with
`limited_`. They have the same functionality but can specify a weight to pay for the XCM fee.

Otherwise, the fee is taken as needed from the asset being transferred.

1. `reserve_transfer_assets` - Transfer some assets from the local chain to the sovereign account of
   a destination chain and forward a notification XCM.
2. `teleport_assets` - Teleport some assets from the local chain to some destination chain.

### Transfer Reserve vs Teleport

While both extrinsics deal with transferring assets, they exhibit fundamentally different behavior.

- **Teleporting** an asset implies a two-step process: the asset is burned/destroyed in the origin
  chain and re-minted to whatever account is specified at the destination. Teleporting should only
  occur if there is an inherent and bilateral trust between the two chains, as the tokens destroyed
  _could not_ necessarily be guaranteed to have the same properties when minted at the destination.
- **Transferring** or **reserving** an asset implies the movement of funds from one authority to
  another, in this case, from the Origin of the sender's chain and into the sovereign account (who
  will ultimately benefit from the assets) on the destination chain.

## Version Negotiation Extrinsics

The following extrinsics require root, as they are only used when bypassing XCM version negotiation.
They change any relevant storage aspects that enforce anything to do with XCM version negotiations.

1. `force_xcm_version` - Modifies the `SupportedVersion` storage to change a particular
   destination's stated XCM version.
2. `force_default_xcm_version` - Modifies the `SafeXcmVersion` storage, which stores the default
   version when the destination's version is unknown.
3. `force_subscribe_version_notify` - Sends an XCM with a `SubscribeVersion` instruction to a
   destination.
4. `force_unsubscribe_version_notify` - Sends an XCM with a `UnsubscribeVersion` instruction to a
   destination.

## Fees in the XCM Pallet

Message fees are only paid if the interior location is **not** equal to the interpreting consensus
system (known as `Here` in the context of an XCM Multilocation). Otherwise, the chain bears the
fees. If applicable, fees are withdrawn from the assets from the specified `MultiLocation`.
