---
id: learn-xcm-docs-journey-assets
title: Trap and Claim Assets
sidebar_label: Trap and Claim Assets
description: Instructions to Trap and Claim Assets.
keywords: [xcm, cross-consensus messaging, trap, claim, assets]
slug: ../journey-assets
---

# Trapping and Claiming assets.

When we reach the end of the execution of the XCM there can still be assets in the Holding Register.
We can do nothing with them (essentially burning the assets) or we can trap the assets. When we trap
the assets, we keep track of the assets together with the origin of the XCM. The origin can claim
the assets back in one of the next XCMs. We have two instructions related to trapping and claiming
assets:

- `Trap`
- `ClaimAsset`

## Trap

```rust
Trap(#[codec(compact)] u64)
```

The `Trap` instruction throws an error of type `Trap`. Both the Trap instruction and Trap error take
an `u64` that can be used to represent some value. The Trap instruction is useful for throwing
custom errors. An important thing to note is that the Trap instruction does not directly trap
assets. It can however forcefully halt the further execution of instructions and if there are still
assets in the Holding Register, these assets can be trapped.

## ClaimAsset

```rust
ClaimAsset { assets: MultiAssets, ticket: MultiLocation }
```

Once assets are trapped, the `ClaimAsset` instruction can be used to claim the assets. The
`ClaimAsset` instruction has two fields.

The `assets` field tells which trapped assets should be claimed. This must match exactly with the
assets claimable by the origin.

The `ticket` field is an identifier that helps locating the asset. It is, for example, useful for
distinguishing between Asset Versions. Lets say we have an XCM V2 trapped asset and send an XCM V3
`ClaimAsset` instruction, then the `ticket` field can be used to tell between the versions. In the
xcm-pallet, `Here` is used to describe the same version as the `ClaimAsset` instruction, while the
`GeneralIndex` Junction is used to describe other XCM versions.

## Example

The full example can be found [here](https://github.com/paritytech/xcm-docs/tree/main/examples).

The scenario of the example is this: Parachain A withdraws funds from its sovereign account on the
relay chain. The assets are trapped because an error is thrown and the execution is halted.
Parachain A claims the trapped assets and receives a report of the holding register.

Parachain A sends the following message to the relay chain. The message errors because of the `Trap`
instruction, so all assets in the Holding Register are trapped.

```rust, noplayground
let message = Xcm(vec![
    WithdrawAsset((Here, 10 * CENTS).into()),
    BuyExecution { fees: (Here, CENTS).into(), weight_limit: WeightLimit::Unlimited },
    Trap(0), // <-- Errors
    DepositAsset { // <-- Not executed because of error.
        assets: All.into(),
        beneficiary: AccountId32 {
            network: Some(parachain::RelayNetwork::get()),
            id: ALICE.into()
        }.into()
    }
]);
```

Parachain A claims the assets, reports them to itself and deposits them in the Account of Alice.

```rust, noplayground
let claim_message = Xcm(vec![
    ClaimAsset { assets: (Here, 10 * CENTS).into(), ticket: Here.into() },
    ReportHolding {
        response_info: QueryResponseInfo {
            destination: Parachain(1).into(),
            query_id: QUERY_ID,
            max_weight: Weight::from_parts(1_000_000_000, 64*64) },
        assets: All.into()
    },
    DepositAsset {
        assets: All.into(),
        beneficiary: AccountId32 {
            network: Some(parachain::RelayNetwork::get()),
            id: ALICE.into()
        }.into()
    },
]);
```
