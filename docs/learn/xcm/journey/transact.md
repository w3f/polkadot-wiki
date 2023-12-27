---
id: learn-xcm-docs-journey-transact
title: Transact
sidebar_label: "Transact: A General Solution"
description: "The Transact Instruction to Execute XCM Calls."
keywords: [xcm, cross-consensus messaging, transact]
slug: ../journey-transact
---

# Transact

XCM contains an instruction that allows for the execution of calls (from a `RuntimeCall` in a
FRAME-based system, to a smart contract function call in an EVM-based system) in a consensus system.
It is the `Transact` instruction and it looks like this:

```rust
Transact {
    origin_kind: OriginKind,
    require_weight_at_most: Weight,
    call: DoubleEncoded<Call>
}
```

The Transact instruction has three fields. The `origin_kind` is of type
[OriginKind](https://paritytech.github.io/polkadot/doc/xcm/v2/enum.OriginKind.html) and specifies
how the origin of the call should be interpreted. In the xcm-executor, the `origin_kind` is used to
determine how to convert a `MultiLocation` origin into a `RuntimeOrigin`. For more information,
check out the [xcm-executor config docs](../executor_config/config.md).

The `require_weight_at_most` field tells the XCVM executing the call how much
[weight](../fundamentals/weight_and_fees.md) it can use. If the call uses more weight than the
specified `require_weight_at_most`, the execution of the call fails.

The `call` field is of type `DoubleEncoded<Call>`.

```rust
pub struct DoubleEncoded<T> {
    encoded: Vec<u8>,
    #[codec(skip)]
    decoded: Option<T>,
}
```

XCM is consensus system agnostic; it does not know what is being encoded in the call field. Hence,
the field is a byte vector that can be freely interpreted in whatever form possible. However, the
XCVM does not inherently know how to interpret this call field nor how to decode it; it is reliant
on the `T` type parameter to specify the proper codec for the byte vector. Instead of just using a
`Vec<u8>` we use `DoubleEncoded` as a wrapper around a pre-encoded call (`Vec<u8>`) with extra
functionalities such as caching of the decoded value. We like to emphasize that the call in the
`Transact` instruction can be anything from a `RuntimeCall` in a FRAME-based system, to a smart
contract function call in an EVM-based system.

Each XCVM has a Transact Status Register, to record the execution result of the call that is
dispatched by the `Transact` instruction. _Important note:_ The execution of the XCM instruction
does _not_ error when the dispatched call errors.

The status is described by the `MaybeErrorCode` enum, and can either be a Success, Error or
TruncatedError if the length of the error exceeds the MaxDispatchErrorLen. For pallet-based calls,
the Error is represented as the scale encoded `Error` enum of the called pallet.

```rust
ExpectTransactStatus(MaybeErrorCode)

pub enum MaybeErrorCode {
	Success,
	Error(BoundedVec<u8, MaxDispatchErrorLen>),
	TruncatedError(BoundedVec<u8, MaxDispatchErrorLen>),
}
```

## XCM Executor

In this section, we quickly look at how the XCM executor executes the `Transact` instruction.

It executes, among other things, the following steps:

1. Decode the call field into the actual call that we want to dispatch.
2. Check with the [SafeCallFilter](../executor_config/config.md#safecallfilter) on whether the
   execution of this call is allowed.
3. Use the [OriginConverter](../executor_config/config.md#originconverter) to convert the
   `MultiLocation` origin into a `RuntimeOrigin`.
4. Check whether the call weight does not exceed `require_weight_at_most`.
5. Dispatch the call with the converted origin and set the `transact_status` register to be the
   result of the dispatch.
6. Calculate the weight that was actually used during the dispatch.

## Example 1

For the full example, check [the repo](https://github.com/paritytech/xcm-docs/tree/main/examples).

In this example, the relay chain executes the `set_balance` function of `pallet_balances` on
`Parachain(1)`. This function requires the origin to be root. We enable the root origin for the
relay chain by setting `ParentAsSuperuser` for the `OriginConverter` config type.

```rust
let call = parachain::RuntimeCall::Balances(
    pallet_balances::Call::<parachain::Runtime>::set_balance {
        who: ALICE,
        new_free: 5 * AMOUNT,
        new_reserved: 0,
    },
);

let message = Xcm(vec![
    WithdrawAsset((Here, AMOUNT).into()),
    BuyExecution { fees: (Here, AMOUNT).into(), weight_limit: WeightLimit::Unlimited },
    Transact {
        origin_kind: OriginKind::Superuser,
        require_weight_at_most: Weight::from_parts(INITIAL_BALANCE as u64, 1024 * 1024),
        call: call.encode().into(),
    },
]);
```

## Example 2

For the full example, check [the repo](https://github.com/paritytech/xcm-docs/tree/main/examples).

In this example, as Parachain(1), we create an NFT collection on the relay chain and we then mint an
NFT with ID 1. The admin for the nft collection is parachain(1). The call looks as follows:

```rust
let create_collection = relay_chain::RuntimeCall::Uniques(
    pallet_uniques::Call::<relay_chain::Runtime>::create {
        collection: 1u32,
        admin: parachain_sovereign_account_id(1),
    }
);
```

The owner of the NFT is Alice. The nft mint call looks as follows:

```rust
let mint = relay_chain::RuntimeCall::Uniques(
    pallet_uniques::Call::<relay_chain::Runtime>::mint {
        collection: 1u32,
        item: 1u32,
        owner: ALICE,
    }
);
```

The xcm message contains the following instructions:

1. Withdraw native assets from the `Parachain(1)`'s sovereign account.
2. Buy weight with these assets.
3. Create a collection with as admin and owner the sovereign account of `Parachain(1)`.
4. Mints an NFT in the collection with item ID 1 and as owner Alice.

```rust
let message = Xcm(vec![
    WithdrawAsset((Here, AMOUNT).into()),
    BuyExecution { fees: (Here, AMOUNT).into(), weight_limit: WeightLimit::Unlimited },
    Transact {
        origin_kind: OriginKind::SovereignAccount,
        require_weight_at_most: Weight::from_parts(INITIAL_BALANCE as u64, 1024 * 1024),
        call: create_collection.encode().into(),
    },
    Transact {
        origin_kind: OriginKind::SovereignAccount,
        require_weight_at_most: Weight::from_parts(INITIAL_BALANCE as u64, 1024 * 1024),
        call: mint.encode().into(),
    },
]);
```

## Next:

Check out the following instructions that interact with the Transact Status Register:

- [ClearTransactStatus](register-modifiers.md#cleartransactstatus)
- [ReportTransactStatus](queries.md#reporttransactstatus)
- [ExpectTransactStatus](expects.md#expecttransactstatus)
