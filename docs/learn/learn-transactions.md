---
id: learn-transactions
title: Types of Transactions (a.k.a. Extrinsics)
sidebar_label: Transactions
description: Types of Transactions on Polkadot.
keywords: [transaction, transfer, DOT, extrinsics]
slug: ../learn-transactions
---



## Pallets and Extrinsics

Polkadot is built using [Substrate](https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk/#substrate), a modular framework to efficiently build
blockchains. Substrate's FRAME development environment provides modules called pallets and support
libraries that you can use, modify, and extend to build the runtime logic to suit the needs of your
blockchain. You can explore Substrate's FRAME pallets on
[this dedicated page](https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk/#frame).

Within each functional **pallet** on the blockchain, one can **call** its functions and execute them
successfully, provided they have the permission to do so. Because these calls originate outside of
the blockchain runtime, such transactions are referred to as **extrinsics**. Extrinsics normally
contain a signature, some data to describe if the extrinsic has passed some validity checks and a
reference to the pallet and call that it is intended for. For example, the Staking pallet contains
all functions related to staking. A nominator can bond funds and nominate validators by issuing the
respective extrinsics. Some extrinsics might also trigger an event on the chain such as a reward
payout to the nominators.

## Types of Extrinsics

Now that we introduced the term _extrinsic_, let us dive deeper and understand what extrinsics
really are. Extrinsics can be one of 3 distinct types:

- **Signed transactions:** these must contain the signature of the account sending the inbound
  request to the runtime. With signed transactions, the account used to submit the request typically
  pays the transaction fee and must sign it using the account's private key.
- **Unsigned transactions:** these don't carry any information about who submitted the transaction,
  since the format of this type of transaction doesn't require a signature. You can define what
  conditions must be met for such a transaction to be valid.
- **Inherents:** are a special type of unsigned transaction made by block authors which carry
  information required to build a block such as timestamps, storage proofs and uncle blocks.

Signed transactions is the way that most users will interact with Polkadot. Signed transactions come
from an account that has funds, and therefore Polkadot can charge a transaction fee as a way to
prevent spam.

Unsigned transactions are for special cases where a user needs to submit an extrinsic from a key
pair that does not control funds. For example, validator's [session keys](learn-cryptography.md)
never control funds. Unsigned transactions are only used in special cases because, since Polkadot
cannot charge a fee for them, each one needs its own, custom validation logic.

Inherents are pieces of information that are not signed or included in the transaction queue. As
such, only the block author can add inherents to a block. Inherents are assumed to be "true" simply
because a sufficiently large number of validators have agreed on them being reasonable. For example,
the relay chain blocks include a timestamp inherent. There is no way to prove that a timestamp is
true the way one proves the desire to send funds with a signature. Rather, validators accept or
reject the block based on how reasonable they find the timestamp. In Polkadot, it must be within
some acceptable range of their own system clocks.

Here are some key differences between the different types of extrinsics:

- Contrary to signed transactions, unsigned transaction types require implementing custom validation
  logic which can consume more resources for checking validity compared to signed transactions.
- Unsigned transactions have no economic deterrent to prevent spam or replay attacks, so custom
  logic must account for protecting the network from these types of transactions being misused.
- Inherents exist to address the need of adding some data to a block, whereas signed or unsigned
  transactions exist to potentially change the state of the blockchain.

### Mortal and Immortal Extrinsics

Transactions are generally irreversible once confirmed and added to the blockchain, an immutable
ledger of all transactions. This means users must exercise caution, as mistakes such as sending DOT
to the wrong address cannot be reverted. The permanence of transactions highlights the importance of
careful verification before signing any transaction on a blockchain network. It is usually a
[good practice not to blind sign transactions](../general/transaction-attacks.md) to avoid being
victim of an attack.

In blockchain terms, transactions can be **mortal** extrinsics (i.e. valid within a defined block
interval, usually short), or **immortal** extrinsics (i.e. always valid). It is possible to make
immortal transactions on Polkadot. However,
[for security reasons](../general/transaction-attacks.md#replay-attack), it is highly recommended
not to do so and most wallet software will not allow you to make an immortal extrinsic.

### Balance Transfers

Balance transfers are transfers of token balances between accounts. This is the most well-known type of transfer.

### Vested Transfers

DOT may have a lock to account for vesting funds. Like other types of
[locks](./learn-account-balances.md#locks), these funds cannot be transferred but can be used in
other parts of the protocol such as voting in governance or being staked as a validator or
nominator.

Vesting funds are on a release schedule that unlocks a constant number of tokens at each block
(**linear vesting**) or the full amount after a specific block number (**cliff vesting**). In all
vesting cases, the lock decreases over time until all the funds are transferable.

## Verifying Extrinsics

!!!danger
    Do not sign a transaction if you can't verify what you are signing or you suspect you might be signing a different extrinsic than the one intended.

Verifying the extrinsic you are signing can take some more time before signing for a transaction but
it allows you to add an extra security step. There are
[a multitude of possible attacks](../general/transaction-attacks.md) that will prevent you to send
funds to the desired destination account.

## Transaction Fees

Storage and computation are limited resources in a blockchain network. Transaction fees prevent
individual users from consuming too many resources. Polkadot uses a **weight-based fee model** as
opposed to a gas-metering model. As such, fees are charged before transaction execution. Once the
fee is paid, nodes will execute the transaction.

Polkadot fees consist of three parts:

- `Base fee`: a fixed fee applied to every transaction and set by the runtime.
- `Length fee`: a fee that gets multiplied by the length of the transaction in bytes.
- `Weight fee`: a fee for each varying runtime function. Runtime implementers must implement a
  conversion mechanism that determines the corresponding currency amount for the calculated weight.

The final fee can be summarized as:

```
fee = base_fee + length_of_transaction_in_bytes * length_fee + weight_fee
```

where:

Base fee: 1 milliDOT

Length fee: 0.1 DOT per byte

The weight-to-fee conversion is calculated as follows:

```
weight_fee = weight/1.26 * (10−8)
```

A weight of 126,000 nS is mapped to 1 mDOT. This fee will always be, at most, the max size of an
unsigned 128-bit integer.

See
[the Polkadot specification](https://spec.polkadot.network/id-weights#id-definitions-in-polkadot)
and [the Substrate documentation](https://docs.polkadot.com/polkadot-protocol/basics/blocks-transactions-fees/fees/#transactions-weights-and-fees) for more
details.

### Fee Multiplier

Polkadot can add an additional fee to transactions if the network becomes too busy and starts to
decelerate the system. This additional fee is known as the `Fee Multiplier` and its value is defined
by the runtime. The multiplier compares the saturation of blocks; if the previous block is less
saturated than the current block (implying an uptrend in usage), the fee is slightly increased.
Similarly, the fee is decreased if the previous block is more saturated than the current block
(implying a downtrend in usage).

The multiplier can create an incentive to avoid the production of low-priority or insignificant
transactions. In contrast, those additional fees will decrease if the network calms down and
transactions can be executed without overheads.

The final fee is calculated as follows:

```
final_fee = fee * fee_multiplier
```

See
[the documentation about the Polkadot specifications](https://spec.polkadot.network/id-weights#id-fee-multiplier)
for more details.

### Other Resource Limitation Strategies

Transaction weight must be computable before execution and can only represent fixed logic. Some
transactions warrant limiting resources with other strategies. For example:

- Bonds: Some transactions, like voting, may require a bond that will be returned or
  [slashed](./learn-offenses.md) after an on-chain event. In the voting example, returned at the end
  of the election or slashed if the voter tried anything malicious.
- Deposits: Some transactions, like setting an [identity](learn-identity.md) or claiming an index,
  use storage space indefinitely. These require a deposit to be returned if the user decides to
  clear their identity and free the storage.
- Burns: A transaction may burn funds internally based on its logic. For example, a transaction may
  burn funds from the sender if it creates new storage entries, thus increasing the state size.
- Limits: Some limits are part of the protocol. For example, nominators can only nominate 16
  validators. This limits the complexity of [Phragmén](learn-phragmen.md).

## Parachain Transactions

The transactions that take place within parachains do not incur relay chain transaction fees. Users
of shard applications do not even need to hold DOT tokens, as each shard has its own economic model
and may or may not have a token. There are, however, situations where shards themselves make
transactions on the relay chain.

[Parachains](learn-parachains.md) have a dedicated core on the relay chain for execution, so their
collators do not need to own DOT in order to include blocks. The parachain will make some
transactions itself, for example, opening or closing an [XCM](learn-xcm.md) channel, renew its time
on a core, or upgrading its runtime. Parachains have their own accounts on the relay chain and will
need to use those funds to issue transactions on the parachain's behalf.

## Block Limits and Transaction Priority

Relay chain blocks have both a maximum length (in bytes) and a maximum weight. Block producers will
fill blocks with transactions up to these limits. A portion of each block - currently 25% - is
reserved for critical transactions that are related to the chain's operation. Block producers will
only fill up to 75% of a block with normal transactions. Some examples of operational transactions:

- Misbehavior reports
- Council operations
- Member operations in an election (e.g. renouncing candidacy)

Block producers prioritize transactions based on each transaction's total fee. Since a portion of
the fee will go to the block producer, producers will include the transactions with the highest fees
to maximize their reward.

---

!!!info "Polkadot-JS Guides"
    If you are an advanced user, see the [Polkadot-JS guides about transfers](./learn-guides-transfers.md).
