---
id: learn-xcm-docs-quickstart-first-look
title: First Look at an XCM
sidebar_label: First Look at an XCM
description: First Look at an XCM.
keywords: [xcm, cross-consensus messaging]
slug: ../quickstart-first-look
---

# First Look

In this section, we take you through a simple example of an XCM. In this example, we withdraw the
native token from the account of Alice and deposit this token in the account of Bob. This message
simulates a transfer between two accounts in the same consensus system (`ParaA`). You can find the
complete code example [in the repo](https://github.com/paritytech/xcm-docs/tree/main/examples).

## Message

```rust
 let message = Xcm(vec![
    WithdrawAsset((Here, amount).into()),
    BuyExecution{ fees: (Here, amount).into(), weight_limit: WeightLimit::Unlimited },
    DepositAsset {
        assets: All.into(),
        beneficiary:  MultiLocation {
            parents: 0,
            interior: Junction::AccountId32 {
                network: None,
                id: BOB.clone().into()
            }.into(),
        }.into()
    }
]);
```

The message consists of three instructions: `WithdrawAsset`, `BuyExecution`, and `DepositAsset`. In
the following sections we will go over each instruction.

### WithdrawAsset

```rust
WithdrawAsset((Here, amount).into())
```

The first instruction takes as an input the MultiAsset that should be withdrawn. The MultiAsset
describes the native parachain token with the `Here` keyword. The `amount` parameter is the number
of tokens that are transferred. The withdrawal account depends on the origin of the message. In this
example the origin of the message is Alice. The WithdrawAsset instruction moves `amount` number of
native tokens from Alice's account into the _holding register_.

### BuyExecution

```rust
BuyExecution{fees: (Here, amount).into(), weight_limit: WeightLimit::Unlimited}
```

To execute XCM instructions, weight (some amount of resources) has to be bought. The amount of
weight needed to execute an XCM depends on the number and type of instructions in the XCM. The
`BuyExecution` instruction pays for the weight using the `fees`. The `fees` parameter describes the
asset in the _holding register_ that should be used for paying for the weight. The `weight_limit`
parameter defines the maximum amount of fees that can be used for buying weight. There are special
occasions where it is not necessary to buy weight. See the chapter on
[weight and fees](../fundamentals/weight_and_fees.md) for more information about the fees in XCM.

### DepositAsset

```rust
DepositAsset {
    assets: All.into(),
    beneficiary:  MultiLocation {
        parents: 0,
        interior: Junction::AccountId32 {
            network: None,
            id: BOB.clone().into()
        }.into(),
    }.into()
}
```

The DepositAsset instruction is used to deposit funds from the holding register into the account of
the _beneficiary_. We don’t actually know how much is remaining in the holding register after the
`BuyExecution` instruction, but that doesn’t matter since we specify a wildcard for the asset(s)
which should be deposited. In this case, the wildcard is `All`, meaning that all assets in the
holding register at that point in the execution should be deposited. The _beneficiary_ in this case
is the account of Bob in the current consensus system.

When the three instructions are combined, we withdraw `amount` native tokens from the account of
Alice, pay for the execution of these instructions, and deposit the remaining tokens in the account
of Bob.

## What next?

Now that we have taken a first look at an XCM, we can dive deeper into all the XCM instructions, to
be able to build more complex XCVM programs. For an overview of the instructions check out the
[xcm-format repo](https://github.com/paritytech/xcm-format#5-the-xcvm-instruction-set). We'll show
examples for every instruction in the [journey through XCM](../journey/summary.md) chapter. First,
it's important to learn the fundamentals, `MultiLocation`, `MultiAsset`, and other concepts in XCM.
We'll talk about those next.
