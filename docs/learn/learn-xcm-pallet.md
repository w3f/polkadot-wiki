---
id: learn-xcm-pallet
title: XCM FRAME Pallet Overview
sidebar_label: XCM Pallet
description: Mechanics of the XCM Pallet and its role in Polkadot's Ecosystem.
keywords: [cross-consensus, XCM, XCMP, interoperability, communication]
slug: ../learn-xcm-pallet
---

!!!info "XCM Documentation"
    For a more practical approach to utilizing XCM, refer to the [XCM Docs](./xcm/overview/intro.md). Please keep in mind that XCM is under active development.

The XCM pallet
([`pallet-xcm`](https://github.com/paritytech/polkadot-sdk/blob/master/polkadot/xcm/pallet-xcm/src/lib.rs))
provides a set of pre-defined, commonly used XCVM programs in the form of a set of extrinsics using
[FRAME](https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk/#frame).

This pallet provides some default implementations for traits required by `XcmConfig`. The XCM
executor is also included as an associated type within the pallet's configuration.

Where the XCM format defines a set of instructions used to construct XCVM programs, `pallet-xcm`
defines a set of extrinsics that can be utilized to build XCVM programs, either to target the local
or external chains. `pallet-xcm`'s functionality is separated into three categories:

!!!note
      Remember, all XCMs are XCVM programs that follow [the XCM format](https://github.com/paritytech/xcm-format). It is the job of the XCM executor is to handle and execute these programs.

1. Primitive, dispatchable functions to locally execute an XCM.
2. High-level, dispatchable functions for asset transfers.
3. Version negotiation-specific dispatchable functions.

## Primitive Extrinsics

There are two primary primitive extrinsics. These extrinsics handle sending and executing XCVM
programs as dispatchable functions within the pallet.

1. [`execute`](https://github.com/paritytech/polkadot-sdk/blob/a808a3a0918ffbce314dbe00e03761e7a8f8ce79/polkadot/xcm/pallet-xcm/src/lib.rs#L902) -
   This call contains direct access to the XCM executor. It is the job of the executor to check the
   message and ensure that no barrier/filter will block the execution of the XCM. Once it is deemed
   valid, the message will then be _locally_ executed, therein returning the outcome as an event.
   This operation is executed on behalf of whichever account has signed the extrinsic. It's possible
   for only a partial execution to occur.
2. [`send`](https://github.com/paritytech/polkadot-sdk/blob/a808a3a0918ffbce314dbe00e03761e7a8f8ce79/polkadot/xcm/pallet-xcm/src/lib.rs#L769) -
   This call specifies where a message should be sent
   ([via a transport method](./learn-xcm-transport.md)) externally to a particular destination, i.e.
   a parachain, smart contract, or any system which is governed by consensus. In contrast to
   `execute`, the executor is not called locally, as the execution will occur on the destination
   chain.

!!!info
    The XCM pallet needs the `XcmRouter` to send XCMs. It is used to dictate where XCMs are allowed to be sent, and which XCM transport protocol to use. For example, Kusama, the canary network, uses the `ChildParachainRouter` which only allows for Downward Message Passing from the relay to parachains to occur.

You can read more about [XCM transport protocols here](./learn-xcm-transport.md).

## Asset Transfer Extrinsics

Several extrinsics within the pallet handle asset transfer logic. They define a predetermined set of
instructions for sending and executing XCMs. Two variants of these functions are prefixed with
`limited_`. They have the same functionality but can specify a weight to pay for the XCM fee.

Otherwise, the fee is taken as needed from the asset being transferred.

1. [`reserve_transfer_assets`](https://github.com/paritytech/polkadot-sdk/blob/a808a3a0918ffbce314dbe00e03761e7a8f8ce79/polkadot/xcm/pallet-xcm/src/lib.rs#L872) -
   Transfer some assets from the local chain to the sovereign account of a destination chain and
   forward an XCM containing a
   [`ReserveAssetDeposited`](https://github.com/paritytech/xcm-format#reserveassetdeposited)
   instruction, which serves as a notification.

2. [`teleport_assets`](https://github.com/paritytech/polkadot-sdk/blob/a808a3a0918ffbce314dbe00e03761e7a8f8ce79/polkadot/xcm/pallet-xcm/src/lib.rs#L827) -
   Teleport some assets from the local chain to some destination chain.

### Transfer Reserve vs. Teleport

While both extrinsics deal with transferring assets, they exhibit fundamentally different behavior.

- **Teleporting** an asset implies a two-step process: the assets are taken out of circulating
  supply (typically by burning/destroying) in the origin chain and re-minted to whatever account is
  specified at the destination. Teleporting should only occur if there is an inherent and bilateral
  trust between the two chains, as the tokens destroyed at the origin _could not_ necessarily be
  guaranteed to have the same properties when minted at the destination. There has to be **trust**
  that the a particular chain burned, or re-minted the assets.
- **Transferring** or **reserving** an asset implies that **equivalent** assets (i.e, native
  currency, like `DOT` or `KSM`) are withdrawn from _sovereign account_ of the origin chain and
  deposited into the sovereign account on the destination chain. Unlike teleporting an asset, it is
  not destroyed and re-minted, rather a trusted, third entity is used (i.e., Asset Hub) to
  **reserve** the assets, wherein the sovereign account of the destination chain on the reserve
  chain obtains ownership of these assets.

  It's worth noting that this means that some other mechanism is needed to ensure that the balance
  on the destination does not exceed the amount being held in reserve chain.

!!!info
    A sovereign account refers to an account within a particular consensus system. Even though accounts may be different in terms of factors such as an address format, XCM agnostic nature enables communication between these sovereign accounts that are in other consensus systems.

## Version Negotiation Extrinsics

The following extrinsics require root, as they are only used when bypassing XCM version negotiation.
They change any relevant storage aspects that enforce anything to do with XCM version negotiations.

1. [`force_xcm_version`](https://github.com/paritytech/polkadot-sdk/blob/a808a3a0918ffbce314dbe00e03761e7a8f8ce79/polkadot/xcm/pallet-xcm/src/lib.rs#L934) -
   Modifies the `SupportedVersion` storage to change a particular destination's stated XCM version.
2. [`force_default_xcm_version`](https://github.com/paritytech/polkadot-sdk/blob/a808a3a0918ffbce314dbe00e03761e7a8f8ce79/polkadot/xcm/pallet-xcm/src/lib.rs#L957) -
   Modifies the `SafeXcmVersion` storage, which stores the default XCM version to use when the
   destination's version is unknown.
3. [`force_subscribe_version_notify`](https://github.com/paritytech/polkadot-sdk/blob/a808a3a0918ffbce314dbe00e03761e7a8f8ce79/polkadot/xcm/pallet-xcm/src/lib.rs#L972) -
   Sends an XCM with a
   [`SubscribeVersion`](https://github.com/paritytech/xcm-format#subscribeversion) instruction to a
   destination.
4. [`force_unsubscribe_version_notify`](https://github.com/paritytech/polkadot-sdk/blob/a808a3a0918ffbce314dbe00e03761e7a8f8ce79/polkadot/xcm/pallet-xcm/src/lib.rs#L996) -
   Sends an XCM with a
   [`UnsubscribeVersion`](https://github.com/paritytech/xcm-format#unsubscribeversion) instruction
   to a destination.

## Fees in the XCM Pallet

Message fees are only paid if the interior location does not equal the interpreting consensus system
(known as Here in the context of an XCM `Multilocation`). Otherwise, the chain bears the fees. If
applicable, fees are withdrawn from the assets from the specified `MultiLocation` and used as
payment to execute any subsequent instructions within the XCM.

Fees are generally dependent on several factors within the `XcmConfig`. For example, the barrier may
negate any fees to be paid at all.

Before any XCM is sent, and if the destination chain’s barrier requires it, a
[`BuyExecution`](https://github.com/paritytech/xcm-format#buyexecution) instruction is used to buy
the necessary weight for the XCM. XCM fee calculation is handled by the Trader, which iteratively
calculates the total fee based on the number of instructions.

The Trader used to calculate the weight (time for computation in consensus) to include in the
message. Fee calculation in XCM is highly configurable and, for this reason, subjective to whichever
configuration is in place.
