---
id: build-transaction-construction
title: Transaction Construction and Signing
sidebar_label: Transaction Construction
description: Information about how transactions are constructed on Polkadot.
keywords: [transaction, transaction construction, format, tools]
slug: ../build-transaction-construction
---

This page will discuss the transaction format in Polkadot and how to create, sign, and broadcast
transactions. Like the other pages in this guide, this page demonstrates some of the available
tools. **Always refer to each tool's documentation when integrating.**

## Transaction Format

Polkadot has some basic transaction information that is common to all transactions.

- Address: The SS58-encoded address of the sending account.
- Block Hash: The hash of the [checkpoint](build-protocol-info.md#transaction-mortality) block.
- Block Number: The number of the checkpoint block.
- Genesis Hash: The genesis hash of the chain.
- Metadata: The SCALE-encoded metadata for the runtime when submitted.
- Nonce: The nonce for this transaction.\*
- Spec Version: The current spec version for the runtime.
- Transaction Version: The current version for transaction format.
- Tip: Optional, the [tip](build-protocol-info.md#fees) to increase transaction priority.
- Era Period: Optional, the number of blocks after the checkpoint for which a transaction is valid.
  If zero, the transaction is [immortal](build-protocol-info.md#transaction-mortality)

:::caution

There are risks to making a transaction immortal. If an account is reaped and a user re-funds the
account, then they could replay an immortal transaction. Always default to using a mortal extrinsic.

:::

\*The nonce queried from the System module does not account for pending transactions. You must track
and increment the nonce manually if you want to submit multiple valid transactions at the same time.

Each transaction will have its own (or no) parameters to add. For example, the `transferKeepAlive`
function from the Balances pallet will take:

- `dest`: Destination address
- `#[compact] value`: Number of tokens (compact encoding)

**Serialized transaction format**

Before being submitted, transactions are serialized. Serialized transactions are hex encoded
SCALE-encoded bytes. The {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} runtimes are
upgradable and therefore any interfaces are subject to change, the metadata allows developers to
structure any extrinsics or storage entries accordingly. This being said, the serialization format
can be described as follows:

- Compact encoded number of SCALE encoded bytes following this.
- 1 bit: it is a 0 if no signature is present, or a 1 if it is.
- 7 bits: the extrinsic version, it is equal to 4 in decimal.\- 4 bytes: Spec version of the
  runtime.
- 4 bytes: Transaction version of the runtime.
- 32 bytes: Genesis hash of the chain.
- 32 bytes: Block hash serving as the era reference. If the transaction is immortal, then this would
  be the genesis hash.
- If there is a signature:
  - a SCALE encoded `sp_runtime::MultiAddress::Id<AccountId32, u32>` indicating the signer(s) of the
    transaction.
  - a SCALE encoded `sp_runtime::MultiSignature::{SigningScheme}` with the signature\*.
  - a SCALE encoded `sp_runtime::generic::Era` indicating for how long this transaction is valid:
    - If the transaction is immortal, the Era would be simply 0.
    - Otherwise, it would be a `Vec[u64, u64]` comprising the period and the phase.
  - Compact encoded `u32` with the nonce.
  - Compact encoded `u128` with the tip paid to the block producer.
  - a SCALE encoded `sp_runtime::traits::SignedExtension<Vec<Text>>` with the additional data and
    logic associated with this transaction.
- The specific transaction parameters or call data, which consists of:
  - 1 byte: the pallet index the transaction is calling into.
  - 1 byte: the function in the pallet the transaction is calling.
  - variable: the SCALE-encoded parameters required by the function being called.

The metadata provides you with all of the information required to know how to construct the
serialized call data specific to your transaction. You can read more about the metadata, its format
and how to get it in the
[Substrate documentation](https://docs.substrate.io/reference/command-line-tools/subxt/#metadata).

\* Polkadot supports sr25519, ed25519, and ECDSA as signing schemes.

**Summary**

Once you have all the necessary information, you will need to:

1. Construct an unsigned transaction.
2. Create a signing payload.
3. Sign the payload.
4. Serialize the signed payload into a transaction.
5. Submit the serialized transaction.

Parity provides the following tools to help perform these steps.

## Polkadot-JS Tools

[Polkadot-JS Tools](https://github.com/polkadot-js/tools) contains a set of command line tools for
interacting with a Substrate client, including one called "Signer CLI" to create, sign, and
broadcast transactions.

This example will use the `signer submit` command, which will create and submit the transaction. The
`signer sendOffline` command has the exact same API, but will not broadcast the transaction.
`submit` and `sendOffline` must be connected to a node to fetch the current metadata and construct a
valid transaction. Their API has the format:

```bash
yarn run:signer <submit|sendOffline> --account <from-account-ss58> --ws <endpoint> <module.method> [param1] [...] [paramX]
```

Signing:

```bash
yarn run:signer sign --account <from-account-ss58> --seed <seed> --type <sr25519|ed25519> <payload>
```

For example, let's send 0.5 DOT from `121X5bEgTZcGQx5NZjwuTjqqKoiG8B2wEAvrUFjuw24ZGZf2` to
`15vrtLsCQFG3qRYUcaEeeEih4JwepocNJHkpsrqojqnZPc2y`.

```bash
yarn run:signer submit --account 121X5bEgTZcGQx5NZjwuTjqqKoiG8B2wEAvrUFjuw24ZGZf2 --ws ws://127.0.0.1:9944 balances.transferKeepAlive 15vrtLsCQFG3qRYUcaEeeEih4JwepocNJHkpsrqojqnZPc2y 5000000000
```

This will return a payload to sign and an input waiting for a signature. Take this payload and use
your normal signing environment (e.g. air gapped machine, VM, etc.). Sign the payload:

```bash
yarn run:signer sign --account 121X5bEgTZcGQx5NZjwuTjqqKoiG8B2wEAvrUFjuw24ZGZf2 --seed "pulp gaze fuel ... mercy inherit equal" --type sr25519 0x040300ff4a83f1...a8239139ff3ff7c3f6
```

Save the output and bring it to the machine that you will broadcast from, enter it into `submit`'s
signature field, and send the transaction (or just return the serialized transaction if using
`sendOffline`).

## Tx Wrapper Polkadot

If you do not want to use the CLI for signing operations, Parity provides an SDK called
[TxWrapper Core](https://github.com/paritytech/txwrapper-core) to generate and sign transactions
offline. For Polkadot, Kusama, and select parachains, use the `txwrapper-polkadot` package. Other
Substrate-based chains will have their own `txwrapper-{chain}` implementations. See the
[examples](https://github.com/paritytech/txwrapper-core/blob/main/packages/txwrapper-examples/README.md)
for a guide.

**Import a private key**

```ts
import { importPrivateKey } from '@substrate/txwrapper-polkadot';

const keypair = importPrivateKey(“pulp gaze fuel ... mercy inherit equal”);
```

**Derive an address from a public key**

```ts
import { deriveAddress } from '@substrate/txwrapper-polkadot';

// Public key, can be either hex string, or Uint8Array
const publicKey = “0x2ca17d26ca376087dc30ed52deb74bf0f64aca96fe78b05ec3e720a72adb1235”;
const address = deriveAddress(publicKey);
```

**Construct a transaction offline**

```ts
import { methods } from "@substrate/txwrapper-polkadot";

const unsigned = methods.balances.transferKeepAlive(
  {
    dest: "15vrtLsCQFG3qRYUcaEeeEih4JwepocNJHkpsrqojqnZPc2y",
    value: 5000000000,
  },
  {
    address: "121X5bEgTZcGQx5NZjwuTjqqKoiG8B2wEAvrUFjuw24ZGZf2",
    blockHash: "0x1fc7493f3c1e9ac758a183839906475f8363aafb1b1d3e910fe16fab4ae1b582",
    blockNumber: 4302222,
    genesisHash: "0xe3777fa922cafbff200cadeaea1a76bd7898ad5b89f7848999058b50e715f636",
    metadataRpc, // must import from client RPC call state_getMetadata
    nonce: 2,
    specVersion: 1019,
    tip: 0,
    eraPeriod: 64, // number of blocks from checkpoint that transaction is valid
    transactionVersion: 1,
  },
  {
    metadataRpc,
    registry, // Type registry
  }
);
```

**Construct a signing payload**

```ts
import { methods, createSigningPayload } from '@substrate/txwrapper-polkadot';

// See "Construct a transaction offline" for "{...}"
const unsigned = methods.balances.transferKeepAlive({...}, {...}, {...});
const signingPayload = createSigningPayload(unsigned, { registry });
```

**Serialize a signed transaction**

```ts
import { createSignedTx } from "@substrate/txwrapper-polkadot";

// Example code, replace `signWithAlice` with actual remote signer.
// An example is given here:
// https://github.com/paritytech/txwrapper-core/blob/b213cabf50f18f0fe710817072a81596e1a53cae/packages/txwrapper-core/src/test-helpers/signWithAlice.ts
const signature = await signWithAlice(signingPayload);
const signedTx = createSignedTx(unsigned, signature, { metadataRpc, registry });
```

**Decode payload types**

You may want to decode payloads to verify their contents prior to submission.

```ts
import { decode } from "@substrate/txwrapper-polkadot";

// Decode an unsigned tx
const txInfo = decode(unsigned, { metadataRpc, registry });

// Decode a signing payload
const txInfo = decode(signingPayload, { metadataRpc, registry });

// Decode a signed tx
const txInfo = decode(signedTx, { metadataRpc, registry });
```

**Check a transaction's hash**

```ts
import { getTxHash } from ‘@substrate/txwrapper-polkadot’;
const txHash = getTxHash(signedTx);
```

## Submitting a Signed Payload

There are several ways to submit a signed payload:

1. Signer CLI (`yarn run:signer submit --tx <signed-transaction> --ws <endpoint>`)
1. [Substrate API Sidecar](build-node-interaction.md#substrate-api-sidecar)
1. [RPC](build-node-interaction.md#polkadot-rpc) with `author_submitExtrinsic` or
   `author_submitAndWatchExtrinsic`, the latter of which will subscribe you to events to be notified
   as a transaction gets validated and included in the chain.

## Notes

Some addresses to use in the examples. See
[Subkey documentation](https://docs.substrate.io/reference/command-line-tools/subkey/).

```bash
$ subkey --network polkadot generate
Secret phrase `pulp gaze fuel ... mercy inherit equal` is account:
  Secret seed:      0x57450b3e09ba4598 ... ... ... ... ... ... ... .. 219756eeba80bb16
  Public key (hex): 0x2ca17d26ca376087dc30ed52deb74bf0f64aca96fe78b05ec3e720a72adb1235
  Account ID:       0x2ca17d26ca376087dc30ed52deb74bf0f64aca96fe78b05ec3e720a72adb1235
  SS58 Address:     121X5bEgTZcGQx5NZjwuTjqqKoiG8B2wEAvrUFjuw24ZGZf2

$ subkey --network polkadot generate
Secret phrase `exercise auction soft ... obey control easily` is account:
  Secret seed:      0x5f4bbb9fbb69261a ... ... ... ... ... ... ... .. 4691ed7d1130fbbd
  Public key (hex): 0xda04de6cd781c98acf0693dfb97c11011938ad22fcc476ed0089ac5aec3fe243
  Account ID:       0xda04de6cd781c98acf0693dfb97c11011938ad22fcc476ed0089ac5aec3fe243
  SS58 Address:     15vrtLsCQFG3qRYUcaEeeEih4JwepocNJHkpsrqojqnZPc2y
```
