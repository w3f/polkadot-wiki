---
id: build-protocol-info
title: Polkadot Protocol Information
sidebar_label: Polkadot Protocol
---

This page serves as a high-level introduction to the Polkadot protocol with terminology that may be specific to Polkadot, notable differences to other chains that you may have worked with, and practical information for dealing with the chain.

## DOT Tokens

- **Token decimals:** See [Redenomination](#redenomination)
- **Base unit:** "Planck"
- **Balance type:** [`u128`](https://doc.rust-lang.org/std/u128/index.html)

### Redenomination

Polkadot conducted a poll, which ended on 27 July 2020 (block 888,888), in which the stakeholders decided to redenominate the DOT token. The redenomination does not change the number of base units (called "plancks" in Polkadot) in the network. The only change is that a single DOT token will be 1e10 plancks instead of the original 1e12 plancks. See the Polkadot blog posts explaining the [details](https://medium.com/polkadot-network/the-first-polkadot-vote-1fc1b8bd357b) and the [results](https://medium.com/polkadot-network/the-results-are-in-8f6b1ca2a4e6) of the vote.

The redenomination will take effect 72 hours after transfers are enabled. The projected block numbers and times are:

| Event             | Block Number |  Earliest Time   |
|:----------------- |:------------:|:----------------:|
| Transfers enabled |  1,205,128   | 18 Aug 13:15 UTC |
| Redenomination    |  1,248,328   | 21 Aug 13:15 UTC |

Block explorers, wallets, and any component that displays DOT balances should use the symbol "DOT (old)" to differentiate DOTs of the original denomination. This change can be made immediately. For a period of time after the redenomination occurs, we recommend that you use the symbol "_New DOT_" to clearly indicate that you have made the change. After sufficient time has elapsed post-redenomination, you should change "_New DOT_" back to "DOT". An example of an explanation would be:

> “On approximately August 21st at 13:15 UTC (block number 1,248,328), the DOT token will undergo a redenomination. New DOTs will be 100x smaller than DOTs (old). Therefore, your DOT balance will be 100x higher. The percentage of the DOTs you own relative to total supply will be unchanged. See the Polkadot [blog post](https://medium.com/polkadot-network/the-results-are-in-8f6b1ca2a4e6) for more information.”

If you require assistance with redenomination, please contact redenomination@web3.foundation.

## Addresses

In Polkadot (and most Substrate chains), user accounts are identified by a 32-byte (256-bit) `AccountId`. This is simply the public key for the cryptography used by Substrate.

Polkadot (and Substrate) use the SS58 address format. This is a broad "meta-format" designed to handle many different cryptographies and chains. It has much in common with Bitcoin's Base58Check format such as a version prefix, a hash-based checksum suffix, and base-58 encoding.

See the [SS58 page](https://github.com/paritytech/substrate/wiki/External-Address-Format-(SS58)) in the Substrate wiki for encoding information and a more comprehensive list of network prefixes.

Relevant SS58 prefixes for this guide:

- Polkadot: 0
- Kusama: 2
- Westend: 42

### Cryptography

Polkadot supports the following [cryptographic](learn-cryptography) key pairs and signing algorithms:

- Ed25519
- Sr25519 - Schnorr signatures on the Ristretto group
- ECDSA signatures on secp256k1

Note that the address for a secp256k1 key is the SS58 encoding of the _hash of the public key_ in order to reduce the public key from 33 bytes to 32 bytes.

## Existential Deposit

Polkadot uses an _existential deposit_ (ED) to prevent dust accounts from bloating state. If an account drops below the ED, it will be _reaped,_ i.e. completely removed from storage and the nonce reset.

Wallets and custodians who track account nonces for auditing purposes should take care not to have accounts reaped, as users could refund the address and try making transactions from it. The Balances pallet provides a `transfer_keep_alive` function that will return an error and abort rather than make the transfer if doing so would result in reaping the sender's account.

## Free vs. Reserved vs. Locked vs. Vesting Balance

Account balance information is stored in [`AccountData`](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_balances/struct.AccountData.html). Polkadot primarily deals with two types of balances: free and reserved.

For most operations, free balance is what you are interested in. It is the "power" of an account in staking and governance, for example. Reserved balance represents funds that have been set aside by some operation and still belong to the account holder, but cannot be used.

Locks are an abstraction over free balance that prevent spending for certain purposes. Several locks can operate on the same account, but they overlap rather than add. Locks are automatically added onto accounts when tasks are done on the network (e.g. leasing a parachain slot or voting), these are not customizable. For example, an account could have a free balance of 200 DOTs with two locks on it: 150 DOTs for `Transfer` purposes and 100 DOTs for `Reserve` purposes. The account could not make a transfer that brings its free balance below 150 DOTs, but an operation could result in reserving DOTs such that the free balance is below 150, but above 100 DOTs.

Bonding tokens for staking and voting in governance referenda both utilize locks.

Vesting is another abstraction that uses locks on free balance. Vesting sets a lock that decreases over time until all the funds are transferable.

More info:

- [Lockable Currency](https://substrate.dev/rustdocs/v2.0.0-rc4/frame_support/traits/trait.LockableCurrency.html)
- [Lock Withdraw Reasons](https://substrate.dev/rustdocs/v2.0.0-rc4/frame_support/traits/enum.WithdrawReason.html)
- [Vesting](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_vesting/struct.Vesting.html)

## Extrinsics and Events

### Extrinsics

Extrinsics constitute information from the outside world and take on three forms:

- Inherents
- Signed Transactions
- Unsigned Transactions

As an infrastructure provider, you will deal almost exclusively with signed transactions. You will, however, see other extrinsics within the blocks that you decode. Find more information in the [Substrate documentation](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics).

Inherents contain information that is not provably true, but validators agree on based on some measure of reasonability. For example, a timestamp cannot be proved, but validators can agree that it is within some delta of their system clock. Inherents are not gossiped on the network, and only block authors insert them into blocks.

Signed transactions contain a signature of the account that issued the transaction and stands to pay a fee to have the transaction included on chain. Because the value of including signed transactions on-chain can be recognized prior to execution, they can be gossiped on the network between nodes with a low risk of spam. Signed transactions fit the concept of a transaction in Ethereum or Bitcoin.

Some transactions cannot be signed by a fee-paying account and use unsigned transactions. For example, when a user claims their DOTs from the Ethereum DOT indicator contract to a new DOT address, the new address doesn't yet have any funds with which to pay fees.

### Transaction Mortality

Extrinsics can be mortal or immortal. The transaction payload includes a block number and block hash checkpoint from which a transaction is valid and a validity period (also called "era" in some places) that represents the number of blocks after the checkpoint for which the transaction is valid. If the extrinsic is not included in a block within this validity window, it will be discarded from the transaction queue.

The chain only stores a limited number of prior block hashes as reference. You can query this parameter, called `BlockHashCount`, from the chain state or metadata. This parameter is set to 2400 blocks (about four hours) at genesis. If the validity period is larger than the number of blocks stored on-chain, then the transaction will only be valid as long as there is a block to check it against, i.e. the minimum value of validity period and block hash count.

Setting the block checkpoint to zero, using the genesis hash, and a validity period of zero will make the transaction "immortal".

**NOTE:** If an account is reaped and a user re-funds the account, then they could replay an immortal transaction. Always default to using a mortal extrinsic.

### Unique Identifiers for Extrinsics

Many infrastructure providers on existing blockchains, e.g. Ethereum, consider a transaction's hash as a unique identifier. In Substrate-based chains like Polkadot, a transaction's hash only serves as a fingerprint of the information within a transaction, and there are times when two transactions with the same hash are both valid. In the case that one is invalid, the network properly handles the transaction and does not charge a transaction fee to the sender nor consider the transaction in the block's fullness.

Imagine this contrived example with a [reaped account](#existential-deposit). The first and last transactions are identical, and both valid.

| Index | Hash | Origin    | Nonce | Call                | Results                       |
|:-----:|:----:|:--------- |:-----:|:------------------- |:----------------------------- |
|   0   | 0x01 | Account A |   0   | Transfer 5 DOT to B | Account A reaped              |
|   1   | 0x02 | Account B |   4   | Transfer 7 DOT to A | Account A created (nonce = 0) |
|   2   | 0x01 | Account A |   0   | Transfer 5 DOT to B | Successful transaction        |

In addition, not every extrinsic in a Substrate-based chain comes from an account as a public/private key pair; Substrate, rather, has the concept of dispatch “origin”, which could be created from a public key account, but could also form from other means such as governance. These origins do not have a nonce associated with them the way that an account does. For example, governance might dispatch the same call with the same arguments multiple times, like “increase the validator set by 10%.” This dispatch information (and therefore its hash) would be the same, and the hash would be a reliable representative of the call, but its execution would have different effects depending on the chain’s state at the time of dispatch.

The correct way to uniquely identify an extrinsic on a Substrate-based chain is to use the block ID (height or hash) and the extrinsic's index. Substrate defines a block as a header and an array of extrinsics; therefore, an index in the array at a canonical height will always uniquely identify a transaction. This methodology is reflected in the Substrate codebase itself, for example to [reference a previous transaction](https://substrate.dev/rustdocs/v2.0.0-rc4/pallet_multisig/struct.Timepoint.html) from the Multisig pallet.

### Events

While extrinsics represent information from the outside world, events represent information from the chain. Extrinsics can trigger events. For example, the Staking pallet emits a `Reward` event when claiming staking rewards to tell the user how much the account was credited.

### Fees

Polkadot uses weight-based fees that, unlike gas, are charged _pre-dispatch._ Users can also add a "tip" to increase transaction priority during congested periods. See the [transaction fee](learn-transaction-fees) page for more info.

### Encoding

Parity's integration tools should allow you to deal with decoded data. If you'd like to bypass them and interact directly with the chain data or implement your own codec, Polkadot encodes block and transaction data using the [SCALE codec](https://substrate.dev/docs/en/knowledgebase/advanced/codec).

## Smart Contracts

The Polkadot Relay Chain does not support smart contracts.

## Other Networks

Besides running a private network, Polkadot has two other networks where you could test infrastucture prior to deploying to the Polkadot mainnet.

**Kusama Canary Network:** Kusama is Polkadot's cutting-edge cousin. Many risky features are deployed to Kusama prior to making their way into Polkadot.

**Westend Testnet:** Westend is Polkadot's testnet and uses the Polkadot runtime.

## Other F.A.Q.

**Can an account's balance change without a corresponding, on-chain transaction?**

No, but not all balance changes are in a _transaction,_ some are in _events._ You will need to run an archive node and listen for events and transactions to track all account activity. This especially applies to _locking_ operations if you are calculating balance as the spendable balance, i.e. free balance minus the maximum lock.

**What chain depth is considered "safe"?**

Polkadot uses a deterministic finality mechanism. Once a block is finalized, it cannot be reverted except by a hard fork. Kusama has had hard forks that had to revert four finalized blocks in order to cancel a runtime upgrade. Using a finalized depth of ten blocks should be safe.

Note that block production and finality are isolated processes in Polkadot, and the chain can have a long unfinalized head.

**Do users need to interact with any smart contracts?**

No, users interact directly with the chain's logic.

**Does Polkadot have state rent?**

No, Polkadot uses the existential deposit to prevent dust accounts and other economic mechanisms like locking or reserving tokens for operations that utilize state.

**What is an external source to see the current chain height?**

- [Polkadot JS explorer](https://polkadot.js.org/apps/#/explorer)
- [Polkascan block explorer](https://polkascan.io/)
