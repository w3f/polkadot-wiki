---
id: learn-xcm-docs-journey-queries
title: Queries
sidebar_label: Queries
description: Query Information from another Consensus System.
keywords: [xcm, cross-consensus messaging, queries]
slug: ../journey-queries
---

# Queries

XCM contains query instructions that can be used to query information from another consensus system:

- `ReportHolding`
- `QueryPallet`
- `ReportError`
- `ReportTransactStatus`

Each of these instructions is sent to the destination where we would like the information to be
reported back to us. Each instruction has a `QueryResponseInfo` struct as one of its inputs.

```rust, noplayground
pub struct QueryResponseInfo {
	pub destination: MultiLocation,
	#[codec(compact)]
	pub query_id: QueryId,
	pub max_weight: Weight,
}
```

The `destination` tells the queried consensus system where to send the response to and the
`query_id` field links the query and the query response together. The `max_weight` field tells the
queried consensus system what the maximum weight is that the response instruction can take.

When a query instruction is executed correctly, it sends a `QueryResponse` instruction to the
location defined in the previously described `destination` field. The `QueryResponse` looks like
this:

```rust
QueryResponse {
    #[codec(compact)]
    query_id: QueryId,
    response: Response,
    max_weight: Weight,
    querier: Option<MultiLocation>,
}

// Response Struct
pub enum Response {
	/// No response. Serves as a neutral default.
	Null,
	/// Some assets.
	Assets(MultiAssets),
	/// The outcome of an XCM instruction.
	ExecutionResult(Option<(u32, Error)>),
	/// An XCM version.
	Version(super::Version),
	/// The index, instance name, pallet name and version of some pallets.
	PalletsInfo(BoundedVec<PalletInfo, MaxPalletsInfo>),
	/// The status of a dispatch attempt using `Transact`.
	DispatchResult(MaybeErrorCode),
}
```

The `QueryResponse` has the same `query_id` as the request to link the request and response and
takes over the `max_weight` from the `QueryResponseInfo`. It has the requested information in the
`response` field. And it has the location of the querier relative to the queried location in the
querier field. The response can be sent back to the requester, or to another location, so the
querier field is important to determine where the requested information is needed.

Now we take a look at the query instructions.

## ReportHolding

```rust, noplayground
ReportHolding { response_info: QueryResponseInfo, assets: MultiAssetFilter }
```

The `ReportHolding` instruction reports to the given destination the contents of the Holding
Register. The `assets` field is a filter for the assets that should be reported back. The assets
reported back will be, asset-wise, _the lesser of this value and the holding register_. For example,
if the holding register contains 10 units of some fungible asset and the `assets` field specifies 15
units of the same asset, the result will return 10 units of that asset. Wild cards can be used to
describe which assets in the holding register to report, but the response always contains assets and
no wild cards.

### Example

For the full example, check [here](https://github.com/paritytech/xcm-docs/tree/main/examples).
Assets are withdrawn from the account of parachain 1 on the relay chain and partly deposited in the
account of parachain 2. The remaining assets are reported back to parachain 1.

```rust, noplayground
Xcm(vec![
    WithdrawAsset((Here, AMOUNT).into()),
    BuyExecution { fees: (Here, AMOUNT).into(), weight_limit: Unlimited },
    DepositAsset { assets: Definite((Here, AMOUNT - 5).into()), beneficiary: Parachain(2).into() },
    ReportHolding {
        response_info: QueryResponseInfo {
            destination: Parachain(1).into(),
            query_id: QUERY_ID,
            max_weight: Weight::from_all(0),
        },
        assets: All.into(),
    },
]);
```

## QueryPallet

The `QueryPallet` instruction queries the existence of a particular pallet based on the module name
specified in the `module_name` field.

```rust, noplayground
QueryPallet { module_name: Vec<u8>, response_info: QueryResponseInfo }
```

The destination responds with a vec of `PalletInfo`s if the pallet exists.

```rust
pub struct PalletInfo {
	#[codec(compact)]
	index: u32,
	name: BoundedVec<u8, MaxPalletNameLen>,
	module_name: BoundedVec<u8, MaxPalletNameLen>,
	#[codec(compact)]
	major: u32,
	#[codec(compact)]
	minor: u32,
	#[codec(compact)]
	patch: u32,
}
```

### Example

For the full example, check [here](https://github.com/paritytech/xcm-docs/tree/main/examples). It
queries for all instances of pallet_balances and sends the result back to parachain 1.

```rust, noplayground
Xcm(vec![
    QueryPallet {
        module_name: "pallet_balances".into(),
        response_info: QueryResponseInfo {
            destination: Parachain(1).into(),
            query_id: QUERY_ID,
            max_weight: Weight::from_all(0),
        },
    }
]);
```

## ReportError

The `ReportError` instruction report the contents of the Error Register to the given destination.
This instruction is useful in combination with the `SetErrorHandler` instruction. It then only
reports an error if an error is thrown.

```rust
ReportError(QueryResponseInfo)
```

### Example

For the full example, check [here](https://github.com/paritytech/xcm-docs/tree/main/examples). The
message sets the error handler to report back any error that is thrown during execution of the
instructions using the `ReportError` instruction.

```rust, noplayground
Xcm(vec![
    // Set the Error Handler to report back status of Error register.
    SetErrorHandler(Xcm(vec![
        ReportError(QueryResponseInfo {
            destination: Parachain(1).into(),
            query_id: QUERY_ID,
            max_weight: Weight::from_all(0),
        })
    ])),
    // If an instruction errors during further processing, the resulting error is reported back to Parachain(1).
    // MORE INSTRUCTIONS
]);
```

## ReportTransactStatus

The `ReportTransactStatus` instruction report the value of the Transact Status Register to the
specified destination.

```rust
ReportTransactStatus(QueryResponseInfo)
```

### Example

For the full example, check [here](https://github.com/paritytech/xcm-docs/tree/main/examples).
Dispatches a call on the consensus system receiving this Xcm and reports back the status of the
Transact Status Register.

```rust
Xcm(vec![
    Transact {
        origin_kind: OriginKind::SovereignAccount,
        require_weight_at_most: Weight::from_parts(INITIAL_BALANCE as u64, 1024 * 1024),
        call: remark.encode().into(),
    },
    ReportTransactStatus(QueryResponseInfo {
        destination: Parachain(1).into(),
        query_id: QUERY_ID,
        max_weight: Weight::from_all(0),
    }),
]);
```
