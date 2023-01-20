---
id: learn-transaction-fees
title: Transaction Fees
sidebar_label: Transaction Fees
description: How transaction fees are calculated and handled.
keywords: [transaction, fees]
slug: ../learn-transaction-fees
---

Several resources in a blockchain network are limited, for example, storage and computation.
Transaction fees prevent individual users from consuming too many resources.
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} uses a weight-based fee model as
opposed to a gas-metering model. As such, fees are charged prior to transaction execution; once the
fee is paid, nodes will execute the transaction.

[Web3 Foundation Research](https://w3f-research.readthedocs.io/en/latest/polkadot/overview/2-token-economics.html?highlight=transaction%20fee)
designed the Polkadot fee system with the following objectives:

- Each Relay Chain block should be processed efficiently to avoid delays in block production.
- The growth rate of the Relay Chain should be bounded.
- Each block should have space for special, high-priority transactions like misconduct reports.
- The system should be able to handle spikes in demand.
- Fees should change slowly so that senders can accurately predict the fee for a given transaction.

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
transactions (referred to as [extrinsics](../general/glossary.md#extrinsics) are determined before
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
the fee will go to the block author, and the remainder will go to the [Treasury](learn-treasury.md).
This is 20% and 80%, respectively.

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

- [request_judgement](https://spec.polkadot.network/#sect-practical-examples) - from the identity
  pallet, allows users to request judgement from a specific registrar
- [payout_stakers](https://spec.polkadot.network/#sect-practical-example-payout-stakers) - from the
  staking Pallet, is invoked by a single account in order to payout the reward for all nominators
  who back a particular validator
- [transfer](https://spec.polkadot.network/#_practical_example_3_transfer) - from the balances
  module, is designed to move the specified balance by the sender to the receiver
- [withdraw_unbounded](https://spec.polkadot.network/#_practical_example_4_withdraw_unbounded) -
  from the staking module, is designed to move any unlocked funds from the staking management system
  to be ready for transfer

## Block Limits and Transaction Priority

Blocks in {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} have both a maximum length
(in bytes) and a maximum weight. Block producers will fill blocks with transactions up to these
limits. A portion of each block - currently 25% - is reserved for critical transactions that are
related to the chain's operation. Block producers will only fill up to 75% of a block with normal
transactions. Some examples of operational transactions:

- Misbehavior reports
- Council operations
- Member operations in an election (e.g. renouncing candidacy)

Block producers prioritize transactions based on each transaction's total fee. Since a portion of
the fee will go to the block producer, producers will include the transactions with the highest fees
to maximize their reward.

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

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} can add a additional fee to
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
[here](https://spec.polkadot.network/#_update_multiplier).

## Calcuating Fees with Polkadot-JS

One useful utility for estimating transaction fees programmatically is the via the
[@polkadot/api](https://www.npmjs.com/package/@polkadot/api). Check out the following script that
logs some relevant fee information:

```js
// Estimate the fees as RuntimeDispatchInfo using the signer
const info = await api.tx.balances.transfer(recipient, 123).paymentInfo(sender);

// Log relevant info, partialFee is Balance, estimated for current
console.log(`
  class=${info.class.toString()},
  weight=${info.weight.toString()},
  partialFee=${info.partialFee.toHuman()}
`);
```

For additional information on interacting with the API, checkout [Polkadot-JS](learn-polkadotjs.md).

## Shard Transactions

The transactions that take place within
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}'s shards - parachains and
parathreads - do not incur Relay Chain transaction fees. Users of shard applications do not even
need to hold DOT tokens, as each shard has its own economic model and may or may not have a token.
There are, however, situations where shards themselves make transactions on the Relay Chain.

[Parachains](learn-parachains.md) have a dedicated slot on the Relay Chain for execution, so their
collators do not need to own DOT in order to include blocks. The parachain will make some
transactions itself, for example, opening or closing an [XCM](learn-xcm.md) channel, participating
in an [auction](learn-auction.md) to renew its slot, or upgrading its runtime. Parachains have their
own accounts on the Relay Chain and will need to use those funds to issue transactions on the
parachain's behalf.

[Parathreads](learn-parathreads.md) will also make all the same transactions that a parachain might.
In addition, the collators need to participate in an auction every block to progress their chain.
The collators will need to have DOT to participate in these auctions.

## Other Resource Limitation Strategies

Transaction weight must be computable prior to execution, and therefore can only represent fixed
logic. Some transactions warrant limiting resources with other strategies. For example:

- Bonds: Some transactions, like voting, may require a bond that will be returned or slashed after
  an on-chain event. In the voting example, returned at the end of the election or slashed if the
  voter tried anything malicious.
- Deposits: Some transactions, like setting an [identity](learn-identity.md) or claiming an index,
  use storage space indefinitely. These require a deposit that will be returned if the user decides
  to free storage (e.g. clear their IDE).
- Burns: A transaction may burn funds internally based on its logic. For example, a transaction may
  burn funds from the sender if it creates new storage entries, thus increasing the state size.
- Limits: Some limits are part of the protocol. For example, nominators can only nominate 16
  validators. This limits the complexity of [Phragmén](learn-phragmen.md).

## Advanced

This page only covered transactions that come from normal users. If you look at blocks in a block
explorer, though, you may see some "extrinsics" that look different from these transactions. In
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} (and any chain built on Substrate),
an extrinsic is a piece of information that comes from outside the chain. Extrinsics fall into three
categories:

- Signed transactions
- Unsigned transactions
- Inherents

This page only covered signed transactions, which is the way that most users will interact with
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} . Signed transactions come from an
account that has funds, and therefore {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}
can charge a transaction fee as a way to prevent spam.

Unsigned transactions are for special cases where a user needs to submit an extrinsic from a key
pair that does not control funds. For example, when users
[claim their DOT tokens](https://claims.polkadot.network) after genesis, their DOT address doesn't
have any funds yet, so that uses an unsigned transaction. Validators also submit unsigned
transactions in the form of "heartbeat" messages to indicate that they are online. These heartbeats
must be signed by one of the validator's [session keys](learn-cryptography.md). Session keys never
control funds. Unsigned transactions are only used in special cases because, since Polkadot cannot
charge a fee for them, each one needs its own, custom validation logic.

Finally, inherents are pieces of information that are not signed or included in the transaction
queue. As such, only the block author can add inherents to a block. Inherents are assumed to be
"true" simply because a sufficiently large number of validators have agreed on them being
reasonable. For example, {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} blocks
include a timestamp inherent. There is no way to prove that a timestamp is true the way one proves
the desire to send funds with a signature. Rather, validators accept or reject the block based on
how reasonable they find the timestamp. In
{{ polkadot: Polkadot, :polkadot }}{{ kusama: Kusama, :kusama }} it must be within some acceptable
range of their own system clocks.

## Learn More

- [Web3 Foundation Research](https://research.web3.foundation/en/latest/polkadot/overview/2-token-economics.html)
- [Substrate Extrinsics, Weights & Fees](https://docs.substrate.io/main-docs/build/tx-weights-fees/)
