---
id: learn-xcm-docs-journey-expectations
title: Expectations
sidebar_label: Expectations
description: Expect Instructions to Check if a Condition is Valid.
keywords: [xcm, cross-consensus messaging, expectations]
slug: ../journey-expectations
---

# Expects

XCM contains instructions to check for specific conditions during the execution of the message.
These 'expect' instructions check for a specific condition and if it's not fulfilled, an error is
then thrown. These instructions are used for things like checking the state of the registers before
executing specific instructions. XCM contains the following expect instructions:

- `ExpectAsset`
- `ExpectOrigin`
- `ExpectPallet`
- `ExpectError`
- `ExpectTransactStatus`

## ExpectAsset

The `ExpectAsset` instruction throws an `ExpectationFalse` error if the holding register does not
contain at least the given assets.

```rust
ExpectAsset(MultiAssets)
```

### Example

For the full example, check [here](https://github.com/paritytech/xcm-docs/tree/main/examples).

```rust, noplayground
WithdrawAsset((Here, AMOUNT).into()),
BuyExecution { fees: (Here, AMOUNT).into(), weight_limit: WeightLimit::Unlimited },
// Set the instructions that are executed when ExpectAsset does not pass.
// In this case, reporting back an error to the Parachain.
SetErrorHandler(Xcm(vec![
    ReportError(QueryResponseInfo {
        destination: Parachain(1).into(),
        query_id: QUERY_ID,
        max_weight: Weight::from_all(0),
    })
])),
ExpectAsset((Here, AMOUNT + 10).into()),
// Add Instructions that do something with assets in holding when ExpectAsset passes.

```

## ExpectOrigin

The `ExpectOrigin` instruction throws an `ExpectationFalse` error if the origin register does not
equal the expected origin.

```rust
ExpectOrigin(Option<MultiLocation>)
```

### Example

For the full example, check [here](https://github.com/paritytech/xcm-docs/tree/main/examples). The
`ExpectOrigin` instruction errors because the `ClearOrigin` clears the origin register and we expect
it to be equal to `Parachain(1)`.

```rust
// Set the instructions that are executed when ExpectOrigin does not pass.
// In this case, reporting back an error to the Parachain.
SetErrorHandler(Xcm(vec![ReportError(QueryResponseInfo {
    destination: Parachain(1).into(),
    query_id: QUERY_ID,
    max_weight: Weight::from_all(0),
})])),
ClearOrigin,
// Checks if the XcmContext origin is equal to `Parachain(1)`.
ExpectOrigin(Some(Parachain(1).into())),
```

## ExpectPallet

The `ExpectPallet` instruction ensures that a particular pallet with a particular version exists in
the destination's runtime. It throws a `PalletNotFound` error if there is no pallet at the given
index. It throws a `NameMismatch` error is the `name` or `module_name` mismatch and a
`VersionIncompatible` error if the `crate_major` or `crate_minor` mismatch. The `name` and
`module_name` represent a byte representation of the pallet's name and module name (e.g. 'Balances'
and 'pallet_balances'). Consensus systems that are not substrate-based may throw an `Unimplemented`
error for this instruction.

```rust
ExpectPallet {
    #[codec(compact)]
    index: u32,
    name: Vec<u8>,
    module_name: Vec<u8>,
    #[codec(compact)]
    crate_major: u32,
    #[codec(compact)]
    min_crate_minor: u32,
},
```

### Example

For the full example, check [here](https://github.com/paritytech/xcm-docs/tree/main/examples).

```rust, noplayground
// Set the instructions that are executed when ExpectPallet does not pass.
// In this case, reporting back an error to the Parachain.
SetErrorHandler(Xcm(vec![
    ReportError(QueryResponseInfo {
        destination: Parachain(1).into(),
        query_id: QUERY_ID,
        max_weight: Weight::from_all(0),
    })
])),
// Configured pallet has different `crate_major` so `VersionIncompatible` error is thrown.
ExpectPallet {
    index: 1,
    name: "Balances".into(),
    module_name: "pallet_balances".into(),
    crate_major: 3,
    min_crate_minor: 0,
}
```

## ExpectError

The `ExpectError` instruction throws an `ExpectationFalse` error if the error register does not
equal the expected error at that point in the execution. This instruction is useful during the error
handler execution to halt the error handler if the error that started the execution of the error
handler is not as expected. The `ExpectError` instruction allows to only execute the instructions in
the error handler, when a specific error is thrown.

```rust
	ExpectError(Option<(u32, Error)>)
```

### Example

For the full example, check [here](https://github.com/paritytech/xcm-docs/tree/main/examples).

```rust
SetErrorHandler(Xcm(vec![
    ExpectError(Some((1, XcmError::VersionIncompatible))),
    ReportError(QueryResponseInfo {
        destination: Parachain(1).into(),
        query_id: QUERY_ID,
        max_weight: Weight::from_all(0),
    }),
])),
// Pallet index is wrong, so throws `PalletNotFound` error.
ExpectPallet {
    index: 100,
    name: "Balances".into(),
    module_name: "pallet_balances".into(),
    crate_major: 4,
    min_crate_minor: 0,
},
```

## ExpectTransactStatus

The `ExpectTransactStatus` instruction throws an `ExpectationFalse` error if the transact status
register does not equal the expected transact status.

### Example

For the full example, check [here](https://github.com/paritytech/xcm-docs/tree/main/examples). The
transact status is reported to `Parachain(1)` if the call in the `Transact` errors.

```rust
SetErrorHandler(Xcm(vec![ReportTransactStatus(QueryResponseInfo {
    destination: Parachain(1).into(),
    query_id: QUERY_ID,
    max_weight: Weight::from_all(0),
})])),
Transact {
    origin_kind: OriginKind::SovereignAccount,
    require_weight_at_most: Weight::from_parts(INITIAL_BALANCE as u64, 1024 * 1024),
    call: call.encode().into(),
},
ExpectTransactStatus(MaybeErrorCode::Success),
```
