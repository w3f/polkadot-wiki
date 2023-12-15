---
id: learn-transactions
title: Types of Transactions (a.k.a. Extrinsics)
sidebar_label: Transactions
description: Types of Transactions on Polkadot.
keywords: [transaction, transfer, DOT, extrinsics]
slug: ../learn-transactions
---

import RPC from "./../../components/RPC-Connection"; import Tabs from "@theme/Tabs"; import TabItem
from "@theme/TabItem"; import DocCardList from '@theme/DocCardList';

<DocCardList />

## Pallets and Extrinsics

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} is built using
[Substrate](https://substrate.io/), a modular framework to efficiently build blockchains.
Substrate's FRAME development environment provides modules called pallets and support libraries that
you can use, modify, and extend to build the runtime logic to suit the needs of your blockchain. You
can explore Substrate's FRAME pallets on
[this dedicated page](https://docs.substrate.io/reference/frame-pallets/).

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

Signed transactions is the way that most users will interact with
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}. Signed transactions come from an
account that has funds, and therefore {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}
can charge a transaction fee as a way to prevent spam.

Unsigned transactions are for special cases where a user needs to submit an extrinsic from a key
pair that does not control funds. For example, validators submit unsigned transactions in the form
of "heartbeat" messages to indicate that they are online. These heartbeats must be signed by one of
the validator's [session keys](learn-cryptography.md). Session keys never control funds. Unsigned
transactions are only used in special cases because, since
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} cannot charge a fee for them, each
one needs its own, custom validation logic.

Inherents are pieces of information that are not signed or included in the transaction queue. As
such, only the block author can add inherents to a block. Inherents are assumed to be "true" simply
because a sufficiently large number of validators have agreed on them being reasonable. For example,
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} blocks include a timestamp inherent.
There is no way to prove that a timestamp is true the way one proves the desire to send funds with a
signature. Rather, validators accept or reject the block based on how reasonable they find the
timestamp. In {{ polkadot: Polkadot, :polkadot }}{{ kusama: Kusama, :kusama }} it must be within
some acceptable range of their own system clocks.

Here are some key differences between the different types of extrinsics:

- Contrary to signed transactions, unsigned transaction types require implementing custom validation
  logic which can consume more resources for checking validity compared to signed transactions.
- Unsigned transactions have no economic deterrent to prevent spam or replay attacks, so custom
  logic must account for protecting the network from these types of transactions being misused.
- Inherents exist to address the need of adding some data to a block, whereas signed or unsigned
  transactions exist to potentially change the state of the blockchain.

### Mortal and Immortal Extrinsics

Extrinsics can be mortal (i.e. valid within a defined block interval) or immortal (i.e. always
valid). By default and for security reasons, all extrinsics will be mortal, but always checking
before signing is a good practice. This will avoid the chance of being a victim of a replay attack
after [reaping an account](./learn-accounts.md#existential-deposit-and-reaping).

A replay attack is where past transactions can be replayed (same [balance](#balance-transfers),
receiver account, etc.) without knowing private keys. This could happen in the context of reaping
accounts because the reaping process resets the nonce value. If all signed transactions until the
nonce before the reaping event were immortal, all past transactions can be replayed once the account
is refunded. There is no need for the attacker to know your private key, valid signatures for those
past transactions and nonces already exist and are stored on-chain (meaning the private key was
already used to generate those signatures).

Making a transaction mortal will almost certainly ensure that replay attacks are not possible, with
the only exception being if the account is reaped and then re-funded shortly after submitting a
mortal transaction, and then an attacker replays that transaction within the mortality window (i.e.,
the specified block interval).

### Balance Transfers

Balance transfers are transfers of token balances between accounts. This is the most well-known type
of transfer.

### Vested Transfers

{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} may have a lock placed on them to account for
vesting funds. Like other types of locks, these funds cannot be transferred but can be used in other
parts of the protocol such as voting in governance or being staked as a validator or nominator.

Vesting funds are on a release schedule and unlock a constant number of tokens at each block
(**linear vesting**) or can unlock the full amount after a specific block number (**cliff
vesting**).

## Verifying Extrinsics

:::danger

Do not sign a transaction if you can't verify what you are signing or you suspect you might be
signing a different extrinsic than the one intended.

:::

Verifying the extrinsic you are signing can take some more time before signing for a transaction but
it allows you to add an extra security step. There are a multitude of possible attacks that will
prevent you to send funds to the desired destination account (see below).

---

:::info Polkadot-JS Guides

If you are an advanced user, see the
[Polkadot-JS guides about transfers](./learn-guides-transfers.md).

:::
