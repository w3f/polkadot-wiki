---
id: build-protocol-info
title: Polkadot Protocol Overview
sidebar_label: Polkadot Protocol Overview
description:
  Characteristics about the Polkadot protocol, and what you need to consider when building.
keywords: [build, protocol, extrinsics, events, transaction]
slug: ../build-protocol-info
---

This page serves as a high-level introduction to the Polkadot protocol with terminology that may be
specific to Polkadot, notable differences to other chains that you may have worked with, and
practical information for dealing with the chain.

> If the below does not offer a sufficient amount of information regarding the Polkadot protocol, be
> sure to visit the [Polkadot Spec](https://spec.polkadot.network/id-polkadot-protocol), which is
> more verbose than this Wiki page.

## Tokens

- **Token decimals:**
  - Polkadot (DOT): 10
  - Kusama (KSM): 12
- **Base unit:** "Planck"
- **Balance type:** [`u128`](https://doc.rust-lang.org/std/u128/index.html)

### Redenomination

Polkadot conducted a poll, which ended on 27 July 2020 (block 888_888), in which the stakeholders
decided to redenominate the DOT token. The redenomination does not change the number of base units
(called "plancks" in Polkadot) in the network. The only change is that a single DOT token will be
1e10 plancks instead of the original 1e12 plancks. See the Polkadot blog posts explaining the
[details](https://medium.com/polkadot-network/the-first-polkadot-vote-1fc1b8bd357b) and the
[results](https://medium.com/polkadot-network/the-results-are-in-8f6b1ca2a4e6) of the vote.

The redenomination took effect 72 hours after transfers were enabled, at block 1_248_326, which
occurred at approximately 16:50 UTC on 21 Aug 2020. You can find more information about the
redenomination [here](../learn/archive/learn-redenomination.md).

## Addresses

In Polkadot (and most Substrate chains), user accounts are identified by a 32-byte (256-bit)
`AccountId`. This is often, but not always, the public key of a cryptographic key pair.

Polkadot (and Substrate) use the SS58 address format. This is a broad "meta-format" designed to
handle many different cryptographic schemes and chains. It has much in common with Bitcoin's
Base58Check format such as a version prefix, a hash-based checksum suffix, and base-58 encoding.

<!-- todo: link to dev hub once up -->

See the
[SS58 page](https://docs.polkadot.com/polkadot-protocol/basics/accounts/#address-formats)
in the Substrate documentation for encoding information and a more comprehensive list of network
prefixes.

!!!warning "Do not use regular expressions (regex) to validate addresses"
    Always verify using the prefix and checksum of the address. Substrate API Sidecar provides an
    `accounts/{accountId}/validate` path that returns a boolean `isValid` response for a provided
    address.

Relevant SS58 prefixes for this guide:

- Polkadot: 0
- Kusama: 2
- Westend: 42

### Cryptography

Polkadot supports the following [cryptographic](../learn/learn-cryptography.md) key pairs and
signing algorithms:

- Ed25519
- Sr25519 - Schnorr signatures on the Ristretto group
- ECDSA signatures on secp256k1

Note that the address for a secp256k1 key is the SS58 encoding of the _hash of the public key_ in
order to reduce the public key from 33 bytes to 32 bytes.

## Extrinsics and Events

<!-- todo: link to dev hub once up, not sure if this should be here ? -->

### Block Format

A Polkadot block consists of a block header and a block body. The block body is made up of
extrinsics representing the generalization of the concept of transactions. Extrinsics can contain
any external data the underlying chain wishes to validate and track.

The block header is a 5-tuple containing the following elements:

- `parent_hash`: a 32-byte Blake2b hash of the SCALE encoded parent block header.
- `number`: an integer representing the index of the current block in the chain. It is equal to the
  number of the ancestor blocks. The genesis state has number 0.
- `state_root`: the root of the Merkle tree, used as storage for the system.
- `extrinsics_root`: field which is reserved for the Runtime to validate the integrity of the
  extrinsics composing the block body.
- `digest`: field used to store any chain-specific auxiliary data, which could help the light
  clients interact with the block without the need of accessing the full storage as well as
  consensus-related data including the block signature.

A node creating or receiving a block must gossip that block to the network (i.e. to the other
nodes). Other nodes within the network will track this announcement and can request information
about the block. Additional details on the process are outlined
[here](https://spec.polkadot.network/#sect-msg-block-announce) in the Polkadot Spec.

### Extrinsics

An extrinsic is a
[SCALE encoded](https://github.com/paritytech/parity-scale-codec#parity-scale-codec) array
consisting of a `version number`, `signature`, and varying `data` types indicating the resulting
runtime function to be called, including the parameters required for that function to be executed.

<!-- todo: link to dev hub once up -->

Extrinsics constitute information from the outside world and take on three forms:

- Inherents
- Signed Transactions
- Unsigned Transactions

As an infrastructure provider, you will deal almost exclusively with signed transactions. You will,
however, see other extrinsics within the blocks that you decode. Find more information in the
[Substrate documentation](https://docs.polkadot.com/polkadot-protocol/basics/blocks-transactions-fees/fees/#transactions-weights-and-fees).

Inherent extrinsics are unsigned and contain information that is not provably true, but validators
agree on based on some measure of reasonability. For example, a timestamp cannot be proved, but
validators can agree that it is within some time difference on their system clock. Inherents are
broadcasted as part of the produced blocks rather than being gossiped as individual extrinsics.

Signed transactions contain a signature of the account that issued the transaction and stands to pay
a fee to have the transaction included on chain. Because the value of including signed transactions
on-chain can be recognized prior to execution, they can be gossiped on the network between nodes
with a low risk of spam. Signed transactions fit the concept of a transaction in Ethereum or
Bitcoin.

Some transactions cannot be signed by a fee-paying account and use unsigned transactions. For
example, when a user claims their DOT from the Ethereum DOT indicator contract to a new DOT address,
the new address doesn't yet have any funds with which to pay fees.

The Polkadot Host does not specify or limit the internals of each extrinsics and those are defined
and dealt with by the Runtime.

### Transaction Mortality

Extrinsics can be mortal or immortal. The transaction payload includes a block number and block hash
checkpoint from which a transaction is valid and a validity period (also called "era" in some
places) that represents the number of blocks after the checkpoint for which the transaction is
valid. If the extrinsic is not included in a block within this validity window, it will be discarded
from the transaction queue.

The chain only stores a limited number of prior block hashes as reference. You can query this
parameter, called [`BlockHashCount`](../general/chain-state-values.md#block-hash-count), from the
chain state or metadata. If the validity period is larger than the number of blocks stored on-chain,
then the transaction will only be valid as long as there is a block to check it against, i.e. the
minimum value of validity period and block hash count.

Setting the block checkpoint to zero, using the genesis hash, and a validity period of zero will
make the transaction "immortal".

**NOTE:** If an account is reaped and a user re-funds the account, then they could replay an
immortal transaction. Always default to using a mortal extrinsic.

### Unique Identifiers for Extrinsics

!!!caution "Transaction Hash is not a unique identifier"
    The assumption that a transaction's hash is a unique identifier is the number one mistake that
    indexing services and custodians make. This error will cause major issues for your users. Make sure
    that you read this section carefully.

Many infrastructure providers on existing blockchains, e.g. Ethereum, consider a transaction's hash
as a unique identifier. In Substrate-based chains like Polkadot, a transaction's hash only serves as
a fingerprint of the information within a transaction, and there are times when two transactions
with the same hash are both valid. In the case that one is invalid, the network properly handles the
transaction and does not charge a transaction fee to the sender nor consider the transaction in the
block's fullness.

Imagine this contrived example with a [reaped account](../learn/learn-accounts.md#existential-deposit-and-reaping). The first and last
transactions are identical, and both valid.

| Index | Hash | Origin    | Nonce | Call                | Results                       |
| :---: | :--: | :-------- | :---: | :------------------ | :---------------------------- |
|   0   | 0x01 | Account A |   0   | Transfer 5 DOT to B | Account A reaped              |
|   1   | 0x02 | Account B |   4   | Transfer 7 DOT to A | Account A created (nonce = 0) |
|   2   | 0x01 | Account A |   0   | Transfer 5 DOT to B | Successful transaction        |

In addition, not every extrinsic in a Substrate-based chain comes from an account as a "pure"
public/private key pair. The concept of dispatch
[“Origin”](../learn/learn-account-abstraction.md#origin-abstraction-in-polkadot), which could
represent different contexts for a particular, signed extrinsic.

For example, the origin could befrom a public key account, but could also represent a collective.
These origins do not have a nonce associated with them the way that an account does. For example,
governance might dispatch the same call with the same arguments multiple times, like “increase the
validator set by 10%.” This dispatch information (and therefore its hash) would be the same, and the
hash would be a reliable representative of the call, but its execution would have different effects
depending on the chain’s state at the time of dispatch.

The correct way to uniquely identify an extrinsic on a Substrate-based chain is to use the block ID
(height or hash) and the extrinsic's index. Substrate defines a block as a header and an array of
extrinsics; therefore, an index in the array at a canonical height will always uniquely identify a
transaction. This methodology is reflected in the Substrate codebase itself, for example to
[reference a previous transaction](https://paritytech.github.io/substrate/master/pallet_multisig/struct.Timepoint.html)
from the Multisig pallet.

### Events

While extrinsics represent information from the outside world, events represent information from the
chain. Extrinsics can trigger events. For example, the Staking pallet emits a `Reward` event when
claiming staking rewards to tell the user how much the account was credited.

If you want to monitor deposits into an address, keep in mind that several transactions can initiate
a balance transfer (such as `balances.transferKeepAlive` and a `utility.batch` transaction with a
transfer inside of it). Only monitoring `balances.transfer` transactions will not be sufficient.
Make sure that you monitor events in each block for events that contain your addresses of interest.
Monitor events instead of transaction names to ensure that you can properly credit deposits.

### Fees

Polkadot uses weight-based fees that, unlike gas, are charged _pre-dispatch._ Users can also add a
"tip" to increase transaction priority during congested periods. See the
[transaction fee](../learn/learn-transactions.md#transaction-fees) page for more info.

### Encoding

Parity's integration tools should allow you to deal with decoded data. If you'd like to bypass them
and interact directly with the chain data or implement your own codec, Polkadot encodes block and
transaction data using the
[SCALE codec](https://github.com/paritytech/parity-scale-codec#parity-scale-codec).

## Runtime Upgrades

[Runtime upgrades](../learn/learn-runtime-upgrades.md) allow Polkadot to change the logic of the
chain without the need for a hard fork. You can find a guide for how to properly perform a runtime
upgrade here.

### Runtime Versioning

<!-- todo: either expand or delete this section -->

There are a number of fields that are a part of the overall
[`RuntimeVersion`](https://paritytech.github.io/polkadot-sdk/master/frame/runtime/apis/struct.RuntimeVersion.html#).

Apart the `runtime_version` there is also the `transaction_version` which denotes how to correctly
encode/decode calls for a given runtime (useful for hardware wallets). The reason
`transaction_version` is separate from `runtime_version` is that it explicitly notes that the call
interface is broken/not compatible.

## Smart Contracts

The Polkadot relay chain does not support smart contracts, but a number of its parachains do,
[see here for more.](build-smart-contracts.md)

## Other F.A.Q.

**Can an account's balance change without a corresponding, on-chain transaction?**

No, but not all balance changes are in a _transaction,_ some are in _events._ You will need to run
an archive node and listen for events and transactions to track all account activity. This
especially applies to _locking_ operations if you are calculating balance as the spendable balance,
i.e. free balance minus the maximum lock.

**What chain depth is considered "safe"?**

Polkadot uses a deterministic finality mechanism. Once a block is finalized, it cannot be reverted
except by a hard fork. Kusama has had hard forks that had to revert four finalized blocks in order
to cancel a runtime upgrade. Using a finalized depth of ten blocks should be safe.

Note that block production and finality are isolated processes in Polkadot, and the chain can have a
long unfinalized head.

**Do users need to interact with any smart contracts?**

No, users interact directly with the chain's logic.

**Does Polkadot have state rent?**

No, Polkadot uses the existential deposit to prevent dust accounts and other economic mechanisms
like locking or reserving tokens for operations that utilize state.

**What is an external source to see the current chain height?**

- [Polkadot-JS explorer](https://polkadot.js.org/apps/#/explorer)
- [Subscan block explorer](https://www.subscan.io/)
