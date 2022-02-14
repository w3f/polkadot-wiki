---
id: build-wallet-integration
title: Wallet integration
sidebar_label: Wallet integration
---

```
+--------------------+
|                    |
| Substrate/Polkadot |
|                    |
+---------+----------+
          |
          |
 +--------+---------+
 |                  |
 | Client interface |
 |                  |
 | +--------------+ |
 | | Client DB    | |
 | +--------------+ |
 |                  |
 +--------+---------+
          |
          |
 +--------+---------+
 |                  |
 |  Wallet backend  |
 |                  |
 +------------------+
```

## 1. Tracking the chain head

Track each finalised block by subscribing with the `chain_subscribeFinalizedHeads` RPC (or polling the `chain_getFinalizedHead` RPC).

That will give you a stream of hashes of the most recent finalised headers.

When a new hash arrives, you can use `chain_getBlock` to turn that hash into a block.

If the new block is not an immediate child of the last block you processed, make sure that you iterate over all blocks between them. Because `chain_getBlock` can accept only hashes, you will need to use `chain_getBlockHash` to convert numbers into hashes and in this way iterate between any two finalised blocks.

## 2. Decoding blocks

You will need to decode blocks from the basic data into useful fields.

All block data is encoded using the basic SCALE codec described in detail [here](https://substrate.dev/docs/en/overview/low-level-data-format). SCALE provides only the low-level underlying format however. Details of its fields and internal structure may alter between different chains and even different blocks of the same chain.

For Genesis Polkadot, the header format is a five-field structure:

```
struct Block:
    parent_hash: Hash
    number: Compact Number
    state_root: Hash
    extrinsics_root: Hash
    digest: Vec<DigestItem>
    extrinsics: Vec<Extrinsic>
```

This relies on `Hash`, which is a fixed length 32-byte value or `[u8; 32]` in SCALE. It also relies on `DigestItem`, an enumeration type:

```
enum DigestItem:
    ChangesTrieRoot: Hash
    PreRuntime: ConsensusItem
    Consensus: ConsensusItem
    Seal: ConsensusItem
    Other: Vec<u8>
struct ConsensusItem:
    id: [u8; 4]
    data: Vec<u8>
```

It also relies on `Extrinsic`. An _extrinsic_ is a generalisation of a transaction and other (unsigned) external information. It is a highly extensible type which doesn't have a fixed format per se. To ensure future format compatibility, metadata concerning the extrinsic format is provided through an RPC `state_getMetadata`.

The metadata itself is provided encoded in SCALE. Its format is:

```
struct Metadata:
    magic: u32
    version: u8
    modules: Vec<Module>
struct Module:
    name: String
    prefix: String
    storage: Option Vec<Storage>
    calls: Option Vec<Call>
    events: Option Vec<Event>
    constants: Vec<Constant>
enum StorageHasher:
    Blake2_128
    Blake2_256
    Twox128
    Twox256
    Twox64Concat
struct Constant:
    name: String
    type: Type
    value: Vec<u8>
    documentation: Vec<String>
struct Storage:
    name: String
    modifier: StorageModifier
    type: StorageType
    default: Vec<u8>
    documentation: Vec<String>
enum StorageModifier:
    Optional
    Default
enum StorageType:
    Plain: Type
    Map: StorageMapType
    DoubleMap: StorageDoubleMapType
struct StorageMapType:
    hasher: StorageHasher
    key: Type
    value: Type
    iterable: bool
struct StorageDoubleMapType:
    hasher: StorageHasher
    first_key: Type
    second_key: Type
    value: Type
    iterable: bool
struct Call:
    name: String
    arguments: Vec<CallArg>
    documentation: Vec<String>
struct CallArg:
    name: String
    type: Type
struct Event:
    name: String
    arguments: Vec<Type>
    documentation: Vec<String>
```

`Type` is just a `String`, but the contents of the string are to be interpreted as the name of a type.

Substrate chains (actually, specifically Substrate chains built using the SRML) such as Polkadot are composed of various _modules_. Each module can be imagined a little bit like a smart contract, with various kinds of transactions (or, in Substrate terms, _extrinsics_), data items that persist between transactions and blocks, events and constant parameters. The metadata encodes all of these things, allowing your client code to both create particular transactions or interpret what has happened on the chain, even between different Substrate blockchains or over many different upgrades or forks of the same chain.

There are two modules a wallet needs to be aware of: Balances and Indices. Balances allows you to send and receive funds between different accounts. Indices allows you to interpret user addresses.

## 3. Working with SS58 and account addresses

In Polkadot (and most Substrate chains), user accounts are identified by a 32-byte (256-bit) _AccountId_. This is simply the public key for the x25519 cryptography used by Substrate.

However, to keep the addresses small, we index every account with a non-zero balance on Polkadot and use just this _index_ to identify the account. This index is much smaller than the 32-byte _AccountId_, and can usually be encoded in just a couple of bytes.

Where Bitcoin has the Check58 address format and Ethereum used the `0x...` hex format, Polkadot (and Substrate) use the SS58 address format. This is a broad "meta-format" designed to handle many different cryptographies and chains. It has much in common with Bitcoin's Check58 format such as a version prefix, a hash-based checksum suffix and base-58 encoding. Further information on it can be found here [TODO]. Of the many supported "version codes", only one particular family of subformats is especially important for Polkadot support in wallets.

The SS58 format is a base-58 encoding (using the same alphabet as Bitcoin) of a version prefix (which is one byte and always `0x00` for Polkadot and `0x02` for Kusama) followed by one or more payload bytes and ending with one or more checksum bytes:

`0x00 <payload bytes> <checksum bytes>`

**An address does not have a fixed length.** Depending on the length, the payload may have a different meaning and there could be a different ratio of payload to checksum bytes. Here is a table to consult to determine how to interpret an address of a particular size:

| Total bytes | Version bytes | Payload bytes | Checksum bytes | Payload type |
| ----------- | ------------- | ------------- | -------------- | ------------ |
| 3           | 1             | 1             | 1              | Index        |
| 4           | 1             | 2             | 1              | Index        |
| 6           | 1             | 4             | 1              | Index        |
| 35          | 1             | 32            | 2              | AccountId    |

NOTE: This table contains only the most common commbinations; SS58 includes several more uncommon ones. For maximum compatibility then implement according to the full SS58 specification.

Once decoded into the fields, then the version should be checked to be `0x00`. The checksum should then be verified as being equivalent to the beginning of the Blake2-256 hash of the SS58 data, not including the checksum itself. If the checksum is one byte, then only the first byte of the hash is checked. If it is two bytes, then the first two bytes of the hash are checked.

Finally, in the case of an indexed address, the index should be decoded into a 32-byte account identifier. This can be done by inspecting the storage of the Indices module.

### Looking up an index

Looking up an index is a bit fiddly, since it involves looking up some storage and decoding and interpreting it.

The specific storage item that we care about is `EnumSet` in the `Indices` module. Inspecting the storage is done through the `state_getStorage` RPC, to which a key must be supplied. The key encodes the entire "query". In general, the metadata should be consulted on how to generate the key. To do this, we first find the `Module` whose name is `Indices`, then find the entry in that module's `storage` field of the `Storage` item with the name `EnumSet`. This item contains all the information we need to construct and interpret the query.

For Polkadot, we find that the item has a `type` of `Map` whose associate value is a `StorageMapType` whose `hasher` is `Blake2_256`, whose `key` is `T::AccountIndex` (equivalent to a `u32` for Polkadot) and whose `value` is `Vec<T::AccountId>`.

This means that if our index, encoded by SCALE as a `u32`, is `<INDEX>`, then our storage key is determined through the Blake2 256 hash of the string `Indices EnumSet<INDEX>`. In fact, accounts are stored in batches of 64, so to look up a particular index, we don't query by the account index but rather the index of its batch. This just means we first need to divide the index by 64 before encoding.

This will return a SCALE-encoded `Vec<T::AccountId>` (`T::AccountId` may be defined in SCALE as `[u8; 32]` or a 32-byte fixed quantity) of up the batch that contains the account we are interested in. To get the `AccountId` item, just take the `index % 64`th item from the vector. If that item doesn't exist (or you get an empty storage item), then the account index is invalid.

Otherwise, you have your account ID and it can be displayed to the user along with its identicon and balance.

## 4. Working with balances

In Polkadot, account balances can be looked up within the `Balances` module using the metadata in a manner not dissimilar to looking up an account index. In this case, we need to query the `FreeBalance` item in storage. Here, the `StorageMapType` is similar, except that the `key` is of type `T::AccountId` (the 32-byte quantity) and the `value` is `BalanceOf<T>`, which for the purposes of Polkadot is a `u128` (128-bit value). The hash function is the same Blake2 256, so the full storage key would be given by the Blake2 256 hash of the string `Balances FreeBalance<ID>` where `<ID>` is the 32-byte `AccountId`.

NOTE: `FreeBalance` gives the total balance controlled by that account, but does not account for temporarily locked portions of balance, such as those locked for staking, voting or vesting. This information can be queried from the chain, but it is outside the scope of this document.

The balance encodes the DOT token with 12 decimal places. To get the actual number of DOTs, you need to divide the 128-bit balance by 1,000,000,000,000 (10\*\*12). For completeness, The exact denominations of the Polkadot currency are:

| Balance value | Name      |
| ------------- | --------- |
|               |           |
| 1             | Planck 10 |

**3 | Point 10**6 | Microdot (UDOT) 10**9 | Millidot (MDOT) 10**12 | Dot (DOT) 10\*\*15 | Blob

### Transferring balances

To transfer a balance, a transaction must be constructed and sent. In constructing a transaction, there are two key parts: the general part of the transaction and the module-specific `function` part of the transaction with the latter generally needing information from the chain's metadata must generally.

In general, Polkadot's transactions are encoded as _signed_ `Extrinsic`s in SCALE. To facilitate forward compatibility, extrinsics are double-encoded, so the initial encoding is passed back into SCALE (as a `Vec<u8>`) and the output of that is used. This has the effect of adding a small length prefix onto it allowing systems that cannot interpret the transaction data itself to still be able to pass them around as opaque packets of data.

The SCALE format is given by `Extrinsic`:

```
struct Extrinsic:
    tx: Option TransactionInfo
    function: Function
struct TransactionInfo:
    sender: Address
    sig: [u8; 64]
    era: Era
    nonce: Compact Nonce
    tip: Compact Balance
struct TransactionPayload:
    function: Function
    era: Era
    nonce: Nonce
    tip: Balance
    checkpoint_hash: Hash
```

For a transaction, the optional `tx` is always used. The `Address` type is a specially encoded SCALE type, allowing an account to be presented either as an account index or as a 32-byte account ID, whichever is more convenient. The format is described here in the SCALE [TODO]. Assuming you wish to present a 32-byte account ID, then it can be expressed as an `Address` merely by prefixing the `0xff` byte.

The `sig` field must contain a 25519-family signature of the SCALE-encoded `SigPayload`. The key used to sign the payload must correspond to the `sender` account. Schnorr/Ristretto 25519 ("sr25519") is the recommended signing format to use.

Era is a one or two byte item, again with a special SCALE encoding format and it encodes the period (as a range of blocks) for which this transaction should be considered valid. It is an important safeguard against certain transaction replay attacks and should generally be used, however a simple wallet implementation that has no plans to reuse accounts after they become empty could ignore it. To ignore it and make the transaction "immortal", use an encoded `Era` of just one byte: `0x00`. However, if an account is removed from storage and a user re-funds an address, then previous immortal transactions could be replayed. Therefore, you may want to prevent account reaping and use mortal transactions to be safe.

The nonce is the number of transactions send so far by the sender account, much like in Ethereum. It is of type `Nonce`, logically equivalent to a `u64`. To get the correct value, the appropriate storage item must be queried, much like when querying an account's balance. In this case, it is the `System` module's `AccountNonce` item; thus the storage key required is the Blake2 256 hash of the string `System AccountNonce<ID>` where `<ID>` is the 32-byte `AccountId`. It will return a `Nonce` which may be decoded and used here.

NOTE: The nonce retrieved from storage does not take into account _pending_ transactions. If you are sending more than one transaction from a single account at a time, then you will need to increment and track this value manually.

The `tip` is a `Balance` (logically equivalent to the `u128` type in SCALE), which denotes some additional fees paid to the block author for prioritized inclusion at busy times. It will typically be zero.

The `checkpoint_hash` is the hash of the "checkpoint block", which is to say the first block of the era specified by the `era` field. If just making the transaction "immortal", then the genesis hash of the blockchain should be used. This can be determined through the RPC `chain_getBlockHash(0)`.

Finally, the `function` is a `Function` type (sometimes known as a `Call` or `Proposal` in certain contexts) which describes what action shall be dispatched. It must be constructed according to metadata. In this case, we want our transaction to effect the `transfer` function in the `Balances` module, to transfer a balance from one account to another. It is important to check the index of the Balances module itself in the list of modules. In this case, it is the 6th item, or index 5. It is also necessary to inspect the `calls` field of the Balances `Module` in the metadata, and determine what index in the list of calls the transfer function is. As it happens, it is first in the list, and thus has an index of 0.

Finally, we need to know what parameters to this function are expected in order to construct the rest of the transaction. This is provided in the `Call` item of the metadata that we just located. Two parameters are expected:

- `dest` with a type of `<T::Lookup as StaticLookup>::Source` (aka `Address`); and
- `value` with a type of `Compact<T::Balance>` (aka `Compact Balance`).

The `function` _in this case_ (i.e. specifically and only for the Balance transfer transaction on Polkadot as of right now) would be the struct:

```
struct BalanceTransferFunction:
    module_index: u8
    call_index: u8
    dest: Address
    value: Compact Balance
```

where `module_index` is `0x05` and `call_index` is `0x00`. `dest` is similar to `sender` and may be provided as either an account index or a 32-byte account ID, whichever is more convenient. If providing as an account ID, then it can be formed into an address simply by prefixing the byte `0xff` to it.

The amount to be transferred (not including any fees payable to the system) is given by `value`, and must be a SCALE compact-encoded number.

### Submitting and checking transactions

Once a transaction has been crafted, you will need to submit it for inclusion in the chain and eventually want to verify that it has indeed been included.

This can be done in two ways: one is to use the simple RPC `author_submitExtrinsic`, which will return the transaction's hash. Once submitted, you can keep checking transactions in finalised blocks manually (since you are tracking the finalised heads anyway) until you see the transaction you submitted, at which point you know it is in the chain.

The other way is to use the pub/sub RPC `author_submitAndWatchExtrinsic`. Again, you provide the SCALE-encoded transaction, but here you receive a subscription ID. You will be notified over the RPC as the transaction gets validated, broadcast and included in the chain with separate messages that are pushed.

## Conclusion

This concludes the article. Here you should have a good idea of how to interact with a Substrate/Polkadot node in order to track the finalised chain head, to decode SS58 addresses, check account information like balances & nonces and to construct, submit and track transactions. You've also learnt a little about the SCALE codec, the Substrate metadata system and how to build future-proof and generic Substrate-based systems.

If you have any questions, please come ask in [Substrate Technical](https://area51.stackexchange.com/proposals/126136/substrate).

_The original source of this page was published [here](https://hackmd.io/@gavwood/r1jTRX2Zr)._
