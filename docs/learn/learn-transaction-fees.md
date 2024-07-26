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

Polkadot fees consists of three parts:

- `Base fee`: a fixed fee that is applied to every transaction and set by the runtime.
- `Length fee`: a fee that gets multiplied by the length of the transaction, in bytes.
- `Weight fee`: a fee for each, varying runtime function. Runtime implementers need to implement a
   conversion mechanism which determines the corresponding currency amount for the calculated
   weight.

The final fee can be summarized as:

```
fee = base_fee + length_of_transaction_in_bytes * length_fee + weight_fee
```

where:

Base fee: 1 milliDOT

Length fee: 0.1 DOT per byte

The weight to fee conversion is calculated as follows:

```
weight_fee = weight/1.26 * (10−8)
```

A weight of 126,000 nS is mapped to 1 mDOT. This fee will never exceed the max size of an unsigned 128-bit integer.

See [the Polkadot specification]( https://spec.polkadot.network/id-weights#id-definitions-in-polkadot) and [the Substrate documentation](https://docs.substrate.io/build/tx-weights-fees/) for more details.

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

See [the documentation about the Polkadot specifications](https://spec.polkadot.network/id-weights#id-fee-multiplier) for more details.

## Other Resource Limitation Strategies

Transaction weight must be computable prior to execution, and therefore can only represent fixed
logic. Some transactions warrant limiting resources with other strategies. For example:

- Bonds: Some transactions, like voting, may require a bond that will be returned or
  [slashed](./learn-offenses.md) after an on-chain event. In the voting example, returned at the end
  of the election or slashed if the voter tried anything malicious.
- Deposits: Some transactions, like setting an [identity](learn-identity.md) or claiming an index,
  use storage space indefinitely. These require a deposit that will be returned if the user decides
  to free storage (e.g. clear their identity).
- Burns: A transaction may burn funds internally based on its logic. For example, a transaction may
  burn funds from the sender if it creates new storage entries, thus increasing the state size.
- Limits: Some limits are part of the protocol. For example, nominators can only nominate 16
  validators. This limits the complexity of [Phragmén](learn-phragmen.md).