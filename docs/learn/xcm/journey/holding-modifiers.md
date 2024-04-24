---
id: learn-xcm-docs-journey-holding
title: More Holding Modifiers
sidebar_label: More Holding Modifiers
description: More Instructions to Alter the Holding Register.
keywords: [xcm, cross-consensus messaging, transfers, holding]
slug: ../journey-holding
---

# Holding Register Modifiers

Most of the XCM instructions alter the Holding Register. We already have seen instructions that
alter the Holding Register, like the `WithdrawAsset` or `DepositAsset` instructions. In this chapter
we go over more instructions that alter the holding register, namely:

- BurnAsset
- ExchangeAsset

## BurnAsset

```rust
BurnAsset(MultiAssets)
```

The `BurnAsset` instruction allows for the reduction of assets in the Holding Register by up to the
specified assets. The execution of the instruction does not throw an error if the Holding Register
does not contain the assets (to make this an error, use `ExpectAsset` prior).

### Example

For the full example, check [the repo](https://github.com/paritytech/xcm-docs/tree/main/examples).
The Scenario of the example is as follows: Parachain A withdraws 10 units from its sovereign account
on the relay chain and burns 4 of them. The relay chain then reports back the status of the Holding
Register to Parachain A. We expect the Holding Register to hold 6 units. Note: If we would have
added more then 10 units worth of assets in the `BurnAsset` instruction, we would have burned all
assets in the Holding Register and the execution would succeed.

```rust
let message = Xcm(vec![
    WithdrawAsset((Here, 10 * CENTS).into()),
    BuyExecution { fees: (Here, CENTS).into(), weight_limit: WeightLimit::Unlimited },
    BurnAsset((Here, 4 * CENTS).into()),
    ReportHolding {
        response_info: QueryResponseInfo {
            destination: Parachain(1).into(),
            query_id: QUERY_ID,
            max_weight: Weight::from_parts(1_000_000_000, 64*64) },
        assets: All.into()
    }
]);
```

We expect the following response:

```rust
Response::Assets((Parent, 6 * CENTS).into())
```

## ExchangeAsset

```rust
ExchangeAsset { give: MultiAssetFilter, want: MultiAssets, maximal: bool }
```

The `ExchangeAsset` instruction allows us to remove asset(s) (`give`) from the Holding Register and
replace them with alternative assets (`want`). The `ExchangeAsset` instruction has three fields.

The `give` field indicates the maximum number of assets that can be removed from the Holding
register.

The `want` field indicates the minimum amount of assets which `give` should be exchanged for. We
should at a minimum get the assets in `want` for the execution of the instruction not to fail.

If the `maximal` field is `true`, then we prefer to give as much as possible up to the limit of
`give` and receive accordingly more assets then stated in `want`. If the `maximal` field is `false`,
then we prefer to give as little as possible in order to receive as little as possible while
receiving at least `want`.

### Example

The full example can be found in
[the repo](https://github.com/paritytech/xcm-docs/tree/main/examples).

The scenario for the example is this: Scenario: The relay chain sends an XCM to Parachain A that: .1
Withdraws some native assets .2 Exchanges these assets for relay chain derivative tokens, with
maximal set to true. .3 Deposit all the assets that are in the Holding in the account of Alice.

NOTE: The implementation of the AssetExchanger is simple and in this case swaps all the assets in
the exchange for the assets in `give`. Depending on the implementation of AssetExchanger, the test
results could differ.

The Assets in the exchange in Parachain(1). This is a custom exchange implementation just for
testing purposes.

```rust
let assets_in_exchange = vec![(Parent, 10 * CENTS).into()];
parachain::set_exchange_assets(assets_in_exchange);
```

The message that is send:

```rust
let message = Xcm(vec![
    WithdrawAsset((Here, 10 * CENTS).into()),
    BuyExecution { fees: (Here, CENTS).into(), weight_limit: WeightLimit::Unlimited },
    // Maximal field set to true.
    ExchangeAsset {
        give: Definite((Here, 5 * CENTS).into()),
        want: (Parent, 5 * CENTS).into(),
        maximal: true,
    },
    DepositAsset {
        assets: AllCounted(2).into(),
        beneficiary: AccountId32 {
            network: Some(parachain::RelayNetwork::get()),
            id: ALICE.into(),
        }
        .into(),
    },
]);
```

Alice receives `5 CENTS` worth of native assets (`Here`) and `5 CENTS` worth of relay chain
derivative assets (`Parent`).
