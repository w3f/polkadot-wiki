---
id: learn-xcm-docs-journey-fees
title: Fee Handling
sidebar_label: Fee Handling
description: How Fees for XCM Transfers are Handled.
keywords: [xcm, cross-consensus messaging, transfers, fees]
slug: ../journey-fees
---

# Fee handling

Like we learnt in the [weight and fees](../fundamentals/weight_and_fees.md) chapter, the XCM
operations our messages perform need to be paid for. To accomplish this, we'll make use of different
instructions in this chapter.

## BuyExecution

```rust
BuyExecution { fees: MultiAsset, weight_limit: WeightLimit }
```

This instruction is used to buy weight using fees. While in some cases there's no need to pay for
execution (if you control both systems for example), in most cases you'll need to add this
instruction. There's a predefined [barrier](../executor_config/config.md#barrier),
`AllowTopLevelPaidExecutionFrom<T>`, that explicitly drops messages that do not include this
instruction.

Let's grab the teleport message from the [transfers chapter](./transfers/teleports.md) and add fee
payment.

```rust
let message = Xcm(vec![
  WithdrawAsset((Here, withdraw_amount + fee_estimation).into()),
  BuyExecution { // <-- Added here
    fees: (Here, fee_estimation).into(),
    weight_limit: WeightLimit::Limited(weight_estimation),
  },
  InitiateTeleport {
    assets: All.into(),
    dest: Parachain(1).into(),
    xcm: Xcm(vec![DepositAsset {
      assets: All.into(),
      beneficiary: Junction::AccountId32 {
        network: None,
        id: ALICE.into(),
      },
    }]),
  },
]);
```

`fee_estimation` and `weight_estimation` are values that can be calculated from the configuration of
the receiving chain. As mentioned in the [weight and fees](../fundamentals/weight_and_fees.md)
chapter of the fundamentals, XCMs instructions are usually assigned weights separately, so, in order
to estimate the weight, you need to estimate the weight of every instruction and add them together.
By using `WeightLimit::Limited()`, you guarantee the message will error if it tries to use more
weight than you expect. If you don't mind this, you can use `WeightLimit::Unlimited`. The
`fee_estimation` value is the maximum assets you want to use, if it doesn't cover all fees, message
execution will fail. You can add a higher value (all of `withdraw_amount` for example) to make sure
you have enough assets for fee payment. If you plan to use the entirety of `withdraw_amount`,
however, it's recommended to add a little extra for fee payment.

In our examples, we use a very simple method, where all instructions weigh a constant value. This is
very useful for testing purposes, but it's recommended to actually benchmark every instruction as
they differ in resource usage. Given our setup, we estimate the weight and fee using only the number
of instructions in each message.

## SetFeesMode

```rust
SetFeesMode { jit_withdraw: bool }
```

This instruction changes the fee mode of the XCVM. If `jit_withdraw` is set to true, then fee assets
are taken directly from the origin's on-chain account, instead of the holding register. This means
the fees are taken directly from the account, no need for a `BuyExecution` instruction. That means
you make sure the message will get executed, as long as there are enough assets in the account. It's
useful when paying sending fees, which are difficult to estimate, as they usually depend on network
congestion.

## UnpaidExecution

```rust
UnpaidExecution { weight_limit: WeightLimit, check_origin: Option<MultiLocation> }
```

This instruction is used for explicitly stating this message shouldn't be paid for. It can be used
as a way of identifying certain priviledged messages that don't pay fees, coming from a particular
system. This instruction can be searched for in [barriers](../executor_config/config.md#barrier) to
allow this. Make sure you trust the origin system because it won't be paying fees. There's already a
predefined barrier in xcm-builder, `AllowExplicitUnpaidExecutionFrom<T>`, that makes sure this is
the first instruction in the message. As always, you can build your own for your own use-cases.

This is safer than allowing all messages from a particular system to not pay fees, as it's an
exception to the rule and not the default. Extra measures can be taken to limit who can use this
instruction.

## RefundSurplus

```rust
RefundSurplus
```

Refunds any surplus weight previously bought with `BuyExecution`. This is useful in many cases:

- When you pay for execution of your whole message, but there's an error and not all instructions
  get executed
- When you set an error handler, buy weight for it, but in the end there's no error so it doesn't
  get called
- When you use the [`Transact` instruction](./transact.md) and the call takes less weight than
  expected

### Example

```rust
let message = Xcm(vec![
  WithdrawAsset((Parent, message_fee).into()),
  BuyExecution {
    fees: (Parent, message_fee).into(),
    weight_limit: WeightLimit::Unlimited,
  },
  SetErrorHandler(Xcm(vec![
    RefundSurplus,
    DepositAsset {
      assets: All.into(),
      beneficiary: AccountId32 {
        network: Some(ByGenesis([0; 32])),
        id: relay_sovereign_account_id().into(),
      }
      .into(),
    },
  ])),
  Trap(1),
  ClearOrigin,
  ClearOrigin,
  ClearOrigin,
]);
```

In this example, we pay upfront for all the instructions in the XCM. When the `Trap` instruction
throws an error, the error handler will be called and the weight for all the instructions that
weren't executed is refunded. For the full example, check our
[repo](https://github.com/paritytech/xcm-docs/tree/main/examples).
