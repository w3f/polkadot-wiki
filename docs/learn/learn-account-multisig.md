---
id: learn-account-multisig
title: Multi-Signature Accounts
sidebar_label: Multi-signature accounts
description: Multisigs accounts on Polkadot.
keywords: [account, multisig, polkadot account, polkadotjs]
slug: ../learn-account-multisig
---

import RPC from "./../../components/RPC-Connection";

## Multi-signature Accounts

It is possible to create a multi-signature account in Substrate-based chains. A multi-signature
account is composed of one or more addresses and a threshold. The threshold defines how many
signatories (participating addresses) need to agree on submitting an extrinsic for the call to be
successful.

For example, Alice, Bob, and Charlie set up a multi-sig with a threshold of 2. This means Alice and
Bob can execute any call even if Charlie disagrees with it. Likewise, Charlie and Bob can execute
any call without Alice. A threshold is typically a number smaller than the total number of members
but can also be equal to it, which means they all have to agree.

:::note Explainer on multisig accounts

Learn more about multisig accounts from our
[technical explainer video](https://www.youtube.com/watch?v=ZJLqszvhMyM&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=25&ab_channel=Polkadot).

:::

Multi-signature accounts have several uses:

- securing your own stash: use additional signatories as a 2FA mechanism to secure your funds. One
  signer can be on one computer, and another can be on another or in cold storage. This slows down
  your interactions with the chain but is orders of magnitude more secure.
- board decisions: legal entities such as businesses and foundations use multi-sigs to govern over
  the entity's treasury collectively.
- group participation in governance: a multi-sig account can do everything a regular account can. A
  multi-sig account could be a council member in Kusama's governance, where a set of community
  members could vote as one entity.

Multi-signature accounts **cannot be modified after being created**. Changing the set of members or
altering the threshold is not possible and instead requires the dissolution of the current multi-sig
and creation of a new one. As such, multi-sig account addresses are **deterministic**, i.e. you can
always calculate the address of a multi-sig by knowing the members and the threshold, without the
account existing yet. This means one can send tokens to an address that does not exist yet, and if
the entities designated as the recipients come together in a new multi-sig under a matching
threshold, they will immediately have access to these tokens.

### Generating Addresses of Multi-signature Accounts

:::note Addresses that are provided to the multi-sig wallets must be sorted

The below methods for generating sort the accounts for you, but if you are implementing your own
sorting, then be aware that the public keys are compared byte-for-byte and sorted ascending before
being inserted in the payload that is hashed.

:::

Addresses are deterministically generated from the signers and threshold of the multisig wallet. For
a code example (in TypeScript) of generating you can view the internals of `@w3f/msig-util`
[here](https://github.com/lsaether/msig-util/blob/master/src/actions/deriveAddress.ts).

The `@w3f/msig-util` is a small CLI tool that can determine the multi-signature address based on
your inputs.

```zsh
$ npx @w3f/msig-util@1.0.7 derive --addresses 15o5762QE4UPrUaYcM83HERK7Wzbmgcsxa93NJjkHGH1unvr,1TMxLj56NtRg3scE7rRo8H9GZJMFXdsJk1GyxCuTRAxTTzU --threshold 1
npx: installed 79 in 7.764s
--------------------------------
Addresses: 15o5762QE4UPrUaYcM83HERK7Wzbmgcsxa93NJjkHGH1unvr 1TMxLj56NtRg3scE7rRo8H9GZJMFXdsJk1GyxCuTRAxTTzU
Threshold: 1
Multisig Address (SS58: 0): 15FKUKXC6kwaXxJ1tXNywmFy4ZY6FoDFCnU3fMbibFdeqwGw
--------------------------------
```

The Polkadot-JS Apps UI also supports multi-sig accounts, as documented in the
[Account Generation page](learn-account-generation.md#multi-signature-accounts). This is easier than
generating them manually.

### Making Transactions with a Multi-signature Account

There are three types of actions you can take with a multi-sig account:

- Executing a call `as_multi`.
- Approving a call `approve_as_multi`.
- Cancelling a call `cancel_as_multi`.

In scenarios where only a single approval is needed, a convenience method `as_multi_threshold_1`
should be used. This function takes only the other signatories and the raw call as its arguments.

However, in anything but the simple one approval case, you will likely need more than one of the
signatories to approve the call before finally executing it. When you create a new call or approve a
call as a multi-sig, you will need to place a small deposit. The deposit stays locked in the pallet
until the call is executed. The deposit is to establish an economic cost on the storage space that
the multi-sig call takes up on the chain and discourage users from creating dangling multi-sig
operations that never get executed. The deposit will be reserved in the caller's accounts, so
participants in multi-signature wallets should have spare funds available.

The deposit is dependent on the `threshold` parameter and is calculated as follows:

```
Deposit = DepositBase + threshold * DepositFactor
```

Where `DepositBase` and `DepositFactor` are chain constants set in the runtime code.

Currently, the **DepositBase** equals `deposit(1, 88)` (key size is 32; value is size 4+4+16+32 = 56
bytes) and the **DepositFactor** equals `deposit(0, 32)` (additional address of 32 bytes).

The deposit function in JavaScript is defined below, cribbed from the
[Rust source](https://github.com/paritytech/polkadot/blob/master/runtime/polkadot/constants/src/lib.rs).

```js
// Polkadot
const DOLLARS = 10000000000; // planck
const MILLICENTS = 100000; // planck

// Kusama
// const DOLLARS = 166666666666.67;
// const MILLICENTS = 1666666.66;

const deposit = (items, bytes) => {
  return items * 20 * DOLLARS + bytes * 100 * MILLICENTS;
};

console.log("DepositBase", deposit(1, 88));
console.log("DepositFactor", deposit(0, 32));
```

Thus the deposit values can be calculated as shown in the table below. They are also shown
in [plancks](learn-DOT.md#polkadot) for convenience.

|          | Deposit Base                                                                                                    | Deposit Factor                                                                                                  |
| -------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Polkadot | <RPC network="polkadot" path="consts.multisig.depositBase" defaultValue={200880000000} filter="humanReadable"/> (<RPC network="polkadot" path="consts.multisig.depositBase" defaultValue={200880000000}/> Planck) | <RPC network="polkadot" path="consts.multisig.depositFactor" defaultValue={320000000 } filter="humanReadable"/> (<RPC network="polkadot" path="consts.multisig.depositFactor" defaultValue={320000000 }/> Planck) |
| Kusama   | <RPC network="kusama" path="consts.multisig.depositBase" defaultValue={66959996400} filter="humanReadable"/> (<RPC network="kusama" path="consts.multisig.depositBase" defaultValue={66959996400}/> Planck)    | <RPC network="kusama" path="consts.multisig.depositFactor" defaultValue={106665600} filter="humanReadable"/> (<RPC network="kusama" path="consts.multisig.depositFactor" defaultValue={106665600}/> Planck)   |

Let's consider an example of a multi-sig on Polkadot with a threshold of 2 and 3 signers: Alice,
Bob, and Charlie. First, Alice will create the call on-chain by calling `as_multi` with the raw
call. When doing this Alice will have to deposit `DepositBase + (2 * DepositFactor) = 20.152 DOT`
while she waits for either Bob or Charlie also to approve the call using the `approve_as_multi`
extrinsic. When Bob comes to approve the call and execute the transaction, he will not need to place
the deposit, and Alice will receive her deposit back. Similarly, after Alice sends the initial
transaction, say Bob or Charlie choose to cancel the transaction due to an error on Alice's part,
they can use the `cancel_as_multi` extrinsic. The cancellation will release the deposit back to
Alice.

### Example with Polkadot JS

:::info

Check the "How to create a multisig account" section on
[this support page](https://support.polkadot.network/support/solutions/articles/65000181826-how-to-create-and-use-a-multisig-account).
We recommend trying out the tutorial on
[Westend network](../maintain/maintain-networks.md#westend-test-network) - Polkadot's testnet.

:::

## Decoding Call Data

:::info

Check the "How to use a multisig account" section on
[this support page](https://support.polkadot.network/support/solutions/articles/65000181826-how-to-create-and-use-a-multisig-account).

:::