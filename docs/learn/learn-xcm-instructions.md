---
id: learn-xcm-instructions
title: XCM Instructions & Register Specification
sidebar_label: XCM Instructions
description: View the specification for instructions and registers for the XCM messaging format.
keywords: [cross-consensus, XCM, XCMP, interoperability, communication]
slug: ../learn-xcm-instructions
---

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
