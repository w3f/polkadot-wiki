---
id: learn-transaction-fees
title: Transaction Fees
sidebar_label: Transaction Fees
description: How transaction fees are calculated and handled.
keywords: [transaction, fees]
slug: ../learn-transaction-fees
---

Several resources in a blockchain network are limited, for example, storage and computation.
Transaction fees prevent individual users from consuming too many resources. Polkadot uses a
weight-based fee model as opposed to a gas-metering model. As such, fees are charged prior to
transaction execution; once the fee is paid, nodes will execute the transaction.

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

Weights are a fixed set of numbers used in Substrate-based chains to manage the time it 
takes to validate a block. Each transaction has a base weight that accounts for the overhead 
of inclusion (e.g. signature verification) and a dispatch weight that 
accounts for the time to execute the transaction. All weights, even the base weight, 
are a measure of time to execute on some standard hardware.

The runtime 
[converts weight units to balance units](https://docs.substrate.io/reference/how-to-guides/weights/calculate-fees/) 
as part of the fee calculation.

The weight fee is the sum of the base weight and the sum of the total weight consumed by 
call(s). 

:::info A transaction can include several calls

For instance, a `batch` can contain `bond` and `nominate`, 
and the weight would be one base weight and then the sum of the weights for `bond` and `nominate`.

:::

To learn more about the motivation of a weight fee, check out this 
[Substrate doc](https://docs.substrate.io/main-docs/build/tx-weights-fees/) on weights.

The length fee is a per-byte fee multiplier for the size of the transaction in bytes.

There is also a targeted fee adjustment that serves as a multiplier which tunes the 
final fee based on network congestion. This can constitute an adjusted weight fee calculated 
as the targeted fee adjustment times the weight fee.

Together, these fees constitute the inclusion fee. The inclusion fee is the 
base fee plus the length fee plus the adjusted weight fee.

The inclusion fee is deducted from the sender's account before transaction execution. 
A portion of the fee will go to the block author, and the remainder will go to the 
[Treasury](learn-treasury.md). This is 20% and 80%, respectively.

Tips are an optional transaction fee that users can add. Tips are not part of the inclusion 
fee and are an incentive to block authors for prioritizing a transaction, and the entire 
tip goes directly to the block author.

## Block Limits and Transaction Priority

Blocks in Polkadot have both a maximum length (in bytes) and a maximum weight. Block producers will
fill blocks with transactions up to these limits. A portion of each block - currently 25% - is
reserved for critical transactions that are related to the chain's operation. Block producers will
only fill up to 75% of a block with normal transactions. Some examples of operational transactions:

- Misbehavior reports
- Council operations
- Member operations in an election (e.g. renouncing candidacy)

Block producers prioritize transactions based on each transaction's total fee. Since a portion of
the fee will go to the block producer, producers will include the transactions with the highest fees
to maximize their reward.

## Fee Adjustment

Transaction volume on blockchains is highly irregular, and therefore transaction fees need a
mechanism to adjust. However, users should be able to predict transaction fees.

Polkadot uses a slow-adjusting fee mechanism with tips to balance these two considerations. In
addition to block _limits_, Polkadot also has a block fullness _target._ Fees increase or decrease
for the next block based on the fullness of the current block relative to the target. The per-weight
fee can change up to 30% in a 24 hour period. This rate captures long-term trends in demand, but not
short-term spikes. To consider short-term spikes, Polkadot uses tips on top of the length and weight
fees. Users can optionally add a tip to the fee to give the transaction a higher priority.

## Shard Transactions

The transactions that take place within Polkadot's shards - parachains and parathreads - do not
incur Relay Chain transaction fees. Users of shard applications do not even need to hold DOT tokens,
as each shard has its own economic model and may or may not have a token. There are, however,
situations where shards themselves make transactions on the Relay Chain.

[Parachains](learn-parachains.md) have a dedicated slot on the Relay Chain for execution, so their
collators do not need to own DOT in order to include blocks. The parachain will make some
transactions itself, for example, opening or closing an [XCM](learn-xcm.md) channel,
participating in an [auction](learn-auction.md) to renew its slot, or upgrading its runtime.
Parachains have their own accounts on the Relay Chain and will need to use those funds to issue
transactions on the parachain's behalf.

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
Polkadot (and any chain built on Substrate), an extrinsic is a piece of information that comes from
outside the chain. Extrinsics fall into three categories:

- Signed transactions
- Unsigned transactions
- Inherents

This page only covered signed transactions, which is the way that most users will interact with
Polkadot. Signed transactions come from an account that has funds, and therefore Polkadot can charge
a transaction fee as a way to prevent spam.

Unsigned transactions are for special cases where a user needs to submit an extrinsic from a key
pair that does not control funds. For example, when users
[claim their DOT tokens](https://claims.polkadot.network) after genesis, their DOT address doesn't
have any funds yet, so that uses an unsigned transaction. Validators also submit unsigned
transactions in the form of "heartbeat" messages to indicate that they are online. These heartbeats
must be signed by one of the validator's [session keys](learn-keys.md). Session keys never control
funds. Unsigned transactions are only used in special cases because, since Polkadot cannot charge a
fee for them, each one needs its own, custom validation logic.

Finally, inherents are pieces of information that are not signed or included in the transaction
queue. As such, only the block author can add inherents to a block. Inherents are assumed to be
"true" simply because a sufficiently large number of validators have agreed on them being
reasonable. For example, Polkadot blocks include a timestamp inherent. There is no way to prove that
a timestamp is true the way one proves the desire to send funds with a signature. Rather, validators
accept or reject the block based on how reasonable they find the timestamp. In Polkadot, it must be
within some acceptable range of their own system clocks.

## Learn More

- [Web3 Foundation Research](https://research.web3.foundation/en/latest/polkadot/overview/2-token-economics.html)
- [Substrate Extrinsics, Weights & Fees](https://docs.substrate.io/main-docs/build/tx-weights-fees/)