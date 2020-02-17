---
id: learn-transaction-fees
title: Transaction Fees
sidebar_label: Transaction Fees
---

Several resources in a blockchain network are limited, for example, storage and computation. Transaction fees prevent individual users from consuming too many resources. Polkadot uses a weight-based fee model as opposed to a gas-metering model. As such, fees are charged prior to transaction execution; once the fee is paid, nodes will execute the transaction.

[Web3 Foundation Research](https://research.web3.foundation/en/latest/polkadot/Token%20Economics.html#relay-chain-transaction-fees-and-per-block-transaction-limits) designed the Polkadot fee system with the following objectives:

- Each Relay Chain block should be processed efficiently to avoid delays in block production.
- The growth rate of the Relay Chain should be bounded.
- Each block should have space for special, high-priority transactions like misconduct reports.
- The system should be able to handle spikes in demand.
- Fees should change slowly so that senders can accurately predict the fee for a given transaction.

## Fee Calculation

Fees on the Polkadot Relay Chain are calculated based on four parameters:

- A base fee
- A per-byte fee (also known as the "length fee")
- A weight fee
- A tip (optional)

The base fee is a fixed fee applied to every transaction. The length fee is the product of a constant per-byte fee and the size of the transaction in bytes.

Weights are a fixed number designed to represent overall resource consumption of a transaction. Resources could be CPU cycles, memory usage, disk I/O, etc. Each transaction has a weight, which is multiplied by a per-weight fee to calculate the transaction's weight fee.

Tips are an optional transaction fee that users can add to give a transaction higher priority.

Together, these four fees constitute the inclusion fee. This fee is deducted from the sender's account prior to transaction execution. A portion of the fee will go to the block producer and the remainder will go to the [Treasury](learn-treasury). At genesis, this is set to 20% and 80%, respectively.

## Block Limits and Transaction Priority

Blocks in Polkadot have both a maximum length (in bytes) and a maximum weight. Block producers will fill blocks with transactions up to these limits. A portion of each block - currently 25% - is reserved for critical transactions that are related to the chain's operation, such as misbehavior reports. Block producers will only fill up to 75% of a block with normal transactions.

Block producers prioritize transactions based on each transaction's total fee. Since a portion of the fee will go to the block producer, producers will include the transactions with the highest fees to maximize their reward.

## Fee Adjustment

Transaction volume on blockchains is highly irregular, and therefore transaction fees need a mechanism to adjust. However, users should be able to predict transaction fees.

Polkadot uses a slow-adjusting fee mechanism with tips to balance these two considerations. In addition to block _limits,_ Polkadot also has a block fullness _target._ Fees increase or decrease for the next block based on the fullness of the current block relative to the target. The per-weight fee can change up to 30% in a 24 hour period. This rate captures long-term trends in demand, but not short-term spikes. To consider short term spikes, Polkadot uses tips on top of the base, byte, and weight fees. Users can optionally add a tip to the fee to give the transaction a higher priority.

## Shard Transactions

The transactions that take place within Polkadot's shards - parachains and parathreads - do not incur Relay Chain transaction fees. Users of shard applications do not even need to hold DOT tokens, as each shard has its own economic model and may or may not have a token. There are, however, situations where shards themselves make transactions on the Relay Chain.

[Parachains](learn-parachains) have a dedicated slot on the Relay Chain for execution, so their collators do not need to own DOTs in order to include blocks. The parachain will make some transactions itself, for example, opening or closing an [XCMP](learn-crosschain) channel, participating in an [auction](learn-auction) to renew its slot, or upgrading its runtime. Parachains have their own accounts on the Relay Chain and will need to use those funds to issue transactions on the parachain's behalf.

[Parathreads](learn-parathreads) will also make all the same transactions that a parachain might. In addition, the collators need to participate in an auction every block to progress their chain. The collators will need to have DOTs to participate in these auctions.

## Other Resource Limitation Strategies

Transaction weight must be computable prior to execution, and therefore can only represent fixed logic. Some transactions warrant limiting resources with other strategies. For example:

- Bonds: Some transactions, like voting, may require a bond that will be returned later, or slashed if the voter tries anything malicious.
- Burns: A transaction may burn funds internally based on its logic. For example, a transaction may burn funds from the sender if it creates new storage entries, thus increasing the state size.
- Limits: Some limits are part of the protocol. For example, nominators can only nominate 16 validators. This limits the complexity of [Phragmen](learn-phragmen).

## Advanced

This page only covered transactions that come from normal users. If you look at blocks in a block explorer, though, you may see some "extrinsics" that look different from these transactions. In Polkadot (and any chain built on Substrate), an extrinsic is a piece of information that comes from outside the chain. Extrinsics fall into three categories:

- Signed transactions
- Unsigned transactions
- Inherents

This page only covered signed transactions, which is the way that most users will interact with Polkadot. Signed transactions come from an account that has funds, and therefore Polkadot can charge a transaction fee as a way to prevent spam.

Unsigned transactions are for special cases where a user needs to submit an extrinsic from a key pair that does not control funds. For example, when users [claim their DOT tokens](https://claims.polkadot.network), their DOT address doesn't have any funds yet, so that uses an unsigned transaction. Validators also submit unsigned transactions in the form of "heartbeat" messages to indicate that they are online. These heartbeats must be signed by one of the validator's [session keys](learn-keys). Session keys never control funds. Unsigned transactions are only used in special cases because, since Polkadot cannot charge a fee for them, each one needs its own, custom validation logic.

Finally, inherents are pieces of information that are not signed or included in the transaction queue. As such, only the block author can add inherents to a block. Inherents are assumed to be "true" simply because a sufficiently large number of validators have agreed on them being reasonable. For example, Polkadot blocks include a timestamp inherent. There is no way to prove that a timestamp is true the way one proves the desire to send funds with a signature. Rather, validators accept or reject the block based on how reasonable they find the timestamp. In Polkadot, it must be within some acceptable range of their own system clocks.

## Learn More

- [Web3 Foundation Research](https://research.web3.foundation/en/latest/polkadot/Token%20Economics.html#relay-chain-transaction-fees-and-per-block-transaction-limits)
- [Substrate Weights](https://substrate.dev/docs/en/next/conceptual/runtime/weight)
- [Substrate Fees](https://substrate.dev/docs/en/next/development/module/fees)
- [Extrinsics](https://substrate.dev/docs/en/next/conceptual/node/extrinsics)
