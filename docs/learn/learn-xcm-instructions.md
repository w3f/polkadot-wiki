---
id: learn-xcm-instructions
title: XCM Instructions & Register Specification
sidebar_label: XCM Instructions
description: Specification for Instructions and Registers for the XCM Format.
keywords: [cross-consensus, XCM, XCMP, interoperability, communication]
slug: ../learn-xcm-instructions
---

!!!info "XCM Documentation"
    For a more practical approach to utilizing XCM, refer to the [XCM Docs](./xcm/overview/intro.md). Please keep in mind that XCM is under active development.

This page can also be viewed at the [`xcm-format`](https://github.com/paritytech/xcm-format)
repository, where each instruction and register is explained in-depth.

## XCVM Registers

- _Programme_
- _Programme Counter_
- _Error_
- _Error Handler_
- _Appendix_
- _Origin_
- _Holding_
- _Surplus Weight_
- _Refunded Weight_
- _Transact Status_
- _Topic_
- _Transact Status Register_
- _Topic Register_

## XCVM Instruction Set

- `WithdrawAsset`
- `ReserveAssetDeposited`
- `ReceiveTeleportedAsset`
- `QueryResponse`
- `TransferAsset`
- `TransferReserveAsset`
- `Transact`
- `HrmpNewChannelOpenRequest`
- `HrmpChannelAccepted`
- `HrmpChannelClosing`
- `ClearOrigin`
- `DescendOrigin`
- `ReportError`
- `DepositAsset`
- `DepositReserveAsset`
- `ExchangeAsset`
- `InitiateReserveWithdraw`
- `InitiateTeleport`
- `QueryHolding`
- `BuyExecution`
- `RefundSurplus`
- `SetErrorHandler`
- `SetAppendix`
- `ClearError`
- `ClaimAsset`
- `Trap`
- `SubscribeVersion`
- `UnsubscribeVersion`
- `BurnAsset`
- `ExpectAsset`
- `ExpectError`
- `ExpectOrigin`
- `QueryPallet`
- `ExpectPallet`
- `ReportTransactStatus`
- `ClearTransactStatus`
- `LockAsset`
- `UnlockAsset`
- `NoteUnlockable`
- `RequestUnlock`

## Instructions Application Example

The following presents the practical mapping of instructions to some
[core functionality in XCM](./learn-xcm.md#core-functionality-of-xcm).

=== "Program"

    These are the primary instructions that enable programmability and branching to be possible.
    Branching in this context is the ability for errors and logic to be handled as needed when dealing
    with a message.

    - [`ExpectAsset(MultiAssets)`](https://github.com/paritytech/xcm-format/tree/master#expectassetmultiassets) -
      Checks if the Holding register has a specific amount of assets, throws an error if it doesn't.
    - [`ExpectError(Option<(u32, Error)>)`](https://github.com/paritytech/xcm-format/tree/master#expecterroroptionu32-error) -
      Ensures the Error register contains the given error, and throws an error if it doesn't.
    - [`ExpectOrigin(MultiLocation)`](https://github.com/paritytech/xcm-format/tree/master#expectoriginmultilocation) -
      Ensures the Origin register contains the expected origin, and throws an error if it doesn't.
    - `QueryPallet` - Queries the existence of a particular pallet type.

    - `ExpectPallet` - Ensure that a particular pallet with a particular version exists.

    - `ReportTransactStatus(QueryResponseInfo)` - Send a `QueryResponse` message containing the value of
      the Transact Status Register to some destination.

    - `ClearTransactStatus` - Set the Transact Status Register to its default, cleared, value.

=== "fmd"

    These instructions highlight the key instructions focused on Functional Multichain Decomposition.

    - `LockAsset(MultiAsset, MultiLocation)` - Lock the locally held asset and prevent further transfer
      or withdrawal.

    - `UnlockAsset(MultiAsset, MultiLocation)` - Remove the lock over `asset` on this chain and (if
      nothing else is preventing it) allow the asset to be transferred.

    - `NoteUnlockable(MultiAsset, MultiLocation)` - Asset (`asset`) has been locked on the `origin`
      system and may not be transferred. It may only be unlocked with the receipt of the `UnlockAsset`
      instruction from this chain.

    - `RequestUnlock(MultiAsset, MultiLocation)` - Send an `UnlockAsset` instruction to the `locker` for
      the given `asset`.
