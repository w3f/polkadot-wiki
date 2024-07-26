---
id: learn-transaction-fees
title: Transaction Fees
sidebar_label: Transaction Fees
description: How Transaction Fees are Calculated and Handled.
keywords: [transaction, fees]
slug: ../learn-transaction-fees
---

Storage and computation are limited resources in a blockchain network. Transaction fees prevent
individual users from consuming too many resources.
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} uses a **weight-based fee model** as
opposed to a gas-metering model. As such, fees are charged prior to transaction execution; and once
the fee is paid, nodes will execute the transaction.

## Fee Calculation

Fees on the Polkadot Relay Chain are calculated based on three parameters:

- A Weight fee
  - Base weight
  - Call(s) weight
- A Length fee
- A Tip (optional).

As a permissionless system, the {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}
network needs to implement a mechanism to measure and to limit the usage in order to establish an
economic incentive structure, to prevent the network overload, and to mitigate DoS vulnerabilities.
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} enforces a limited time-window for
block producers to create a block, including limitations on block size, which can make the selection
and execution of certain extrinsics too expensive and decelerate the network. Extrinsics which
require too many resources are discarded by the network.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} defines a specified
[block ratio](https://spec.polkadot.network/#sect-limitations) ensuring that only a certain portion
of the total block size gets used for regular extrinsics. The remaining space is reserved for
critical, operational extrinsics required for the functionality by network itself.

This is handled by a [weight](../general/glossary.md#weights) system, where the cost of the
transactions (referred to as [extrinsics](../general/glossary.md#extrinsics)) are determined before
execution. Weights are a fixed set of numbers used in Substrate-based chains to manage the time it
takes to validate a block. Each transaction has a base weight that accounts for the overhead of
inclusion (e.g. signature verification) and a dispatch weight that accounts for the time to execute
the transaction. All weights, even the base weight, are a measure of time to execute on some
standard hardware.

The runtime
[converts weight units to balance units](https://docs.substrate.io/reference/how-to-guides/weights/calculate-fees/)
as part of the fee calculation.

The weight fee is the sum of the base weight and the sum of the total weight consumed by call(s).

:::info A transaction can include several calls

For instance, a `batch` can contain `bond` and `nominate`, and the weight would be one base weight
and then the sum of the weights for `bond` and `nominate`.

:::

To learn more about the motivation of a weight fee, check out this
[Substrate doc](https://docs.substrate.io/main-docs/build/tx-weights-fees/) on weights.

The length fee is a per-byte fee multiplier for the size of the transaction in bytes.

There is also a targeted fee adjustment that serves as a multiplier which tunes the final fee based
on network congestion. This can constitute an adjusted weight fee calculated as the targeted fee
adjustment times the weight fee.

Together, these fees constitute the inclusion fee. The inclusion fee is the base fee plus the length
fee plus the adjusted weight fee.

The inclusion fee is deducted from the sender's account before transaction execution. A portion of
the fee will go to the block author, and the remainder will go to the
[Treasury](./archive/learn-treasury.md). This is 20% and 80%, respectively.

Tips are an optional transaction fee that users can add. Tips are not part of the inclusion fee and
are an incentive to block authors for prioritizing a transaction, and the entire tip goes directly
to the block author.

Final weights are assigned based on the worst case scenario of each runtime function. The runtime
has the ability to "refund" the amount of weight which was overestimated once the runtime function
is actually executed.

The runtime only returns weights if the difference between the assigned weight and the actual weight
calculated during execution is greater than 20%.

Checkout some examples of how various weights are gauged in the
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} runtime for several different types
of operations:

- [request_judgement](https://spec.polkadot.network/#id-practical-example-1-request_judgement) -
  from the identity pallet, allows users to request judgement from a specific registrar
- [payout_stakers](https://spec.polkadot.network/#sect-practical-example-payout-stakers) - from the
  staking Pallet, is invoked by a single account in order to payout the reward for all nominators
  who back a particular validator
- [transfer](https://spec.polkadot.network/#id-practical-example-3-transfer) - from the balances
  module, is designed to move the specified balance by the sender to the receiver
- [withdraw_unbounded](https://spec.polkadot.network/#id-practical-example-4-withdraw_unbounded) -
  from the staking module, is designed to move any unlocked funds from the staking management system
  to be ready for transfer

## Fees

Block producers charge a fee in order to be economically sustainable. That fee must always be
covered by the sender of the transaction.
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} has a flexible mechanism to determine
the minimum cost to include transactions in a block.

Transaction volume on blockchains is highly irregular, and therefore transaction fees need a
mechanism to adjust. However, users should be able to predict transaction fees.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} uses a slow-adjusting fee mechanism
with tips to balance these two considerations. In addition to block _limits_,
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} also has a block fullness _target._
Fees increase or decrease for the next block based on the fullness of the current block relative to
the target. The per-weight fee can change up to 30% in a 24 hour period. This rate captures
long-term trends in demand, but not short-term spikes. To consider short-term spikes,
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} uses tips on top of the length and
weight fees. Users can optionally add a tip to the fee to give the transaction a higher priority.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} fees consists of three parts:

1. `Base fee`: a fixed fee that is applied to every transaction and set by the runtime.
2. `Length fee`: a fee that gets multiplied by the length of the transaction, in bytes.
3. `Weight fee`: a fee for each, varying runtime function. Runtime implementers need to implement a
   conversion mechanism which determines the corresponding currency amount for the calculated
   weight.

The final fee can be summarized as:

```
fee = base_fee + length_of_transaction_in_bytes * length_fee + weight_fee
```

For example, the Polkadot Runtime defines the following values:

Base fee: 100 uDOTs

Length fee: Length fee: 0.1 uDOTs

So, the weight to fee conversion is calculated as follows:

```
weight_fee = weight * (100 uDots / (10 * 10’000))
```

A weight of 10’000 (the smallest non-zero weight) is mapped to 1/10 of 100 uDOT. This fee will never
exceed the max size of an unsigned 128 bit integer.

### Fee Multiplier

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} can add an additional fee to
transactions if the network becomes too busy and starts to decelerate the system. This fee can
create an incentive to avoid the production of low priority or insignificant transactions. In
contrast, those additional fees will decrease if the network calms down and can execute transactions
without much difficulties.

This additional fee is known as the `Fee Multiplier` and its value is defined by the
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} runtime. The multiplier works by
comparing the saturation of blocks; if the previous block is less saturated than the current block
(implying an uptrend), the fee is slightly increased. Similarly, if the previous block is more
saturated than the current block (implying a downtrend), the fee is slightly decreased.

The final fee is calculated as:

```
final_fee = fee * fee_multiplier
```

The `Update Multiplier` defines how the multiplier can change. Each runtime has the ability to
define this behavior accordingly. For example, the
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} runtime internally updates the
multiplier after each block according to a custom formula defined
[here](https://spec.polkadot.network/#id-update-multiplier).

## Other Resource Limitation Strategies

Transaction weight must be computable prior to execution, and therefore can only represent fixed
logic. Some transactions warrant limiting resources with other strategies. For example:

- Bonds: Some transactions, like voting, may require a bond that will be returned or
  [slashed](./learn-offenses.md) after an on-chain event. In the voting example, returned at the end
  of the election or slashed if the voter tried anything malicious.
- Deposits: Some transactions, like setting an [identity](learn-identity.md) or claiming an index,
  use storage space indefinitely. These require a deposit that will be returned if the user decides
  to free storage (e.g. clear their IDE).
- Burns: A transaction may burn funds internally based on its logic. For example, a transaction may
  burn funds from the sender if it creates new storage entries, thus increasing the state size.
- Limits: Some limits are part of the protocol. For example, nominators can only nominate 16
  validators. This limits the complexity of [Phragmén](learn-phragmen.md).

## Learn More

- [Web3 Foundation Research](https://research.web3.foundation/Polkadot/overview/token-economics)
- [Substrate Extrinsics, Weights & Fees](https://docs.substrate.io/main-docs/build/tx-weights-fees/)
