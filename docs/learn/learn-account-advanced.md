---
id: learn-account-advanced
title: Polkadot Accounts Advanced
sidebar_label: Accounts Advanced Info
description: Advanced information about Polkadot accounts
keywords: [account, polkadot account, polkadotjs, indices, identity, reaping]
slug: ../learn-account-advanced
---

import RPC from "./../../components/RPC-Connection";

### Derivation Paths

If you would like to create and manage several accounts on the network using the same seed, you can
use derivation paths. We can think of the derived accounts as child accounts of the root account
created using the original mnemonic seed phrase. Many Polkadot key generation tools support hard and
soft derivation. For instance, if you intend to create an account to be used on the Polkadot chain,
you can derive a **hard key** child account using **//** after the mnemonic phrase.

```
'caution juice atom organ advance problem want pledge someone senior holiday very//0'
```

and a **soft key** child account using **/** after the mnemonic phrase

```
'caution juice atom organ advance problem want pledge someone senior holiday very/0'
```

If you would like to create another account for using the Polkadot chain using the same seed, you
can change the number at the end of the string above. For example, `/1`, `/2`, and `/3` will create
different derived accounts.

You can use any letters or numbers in the derivation path as long as they make sense to you; they do
not have to follow any specific pattern. You may combine multiple derivations in your path, as well.
For instance, `//bill//account//1` and `//john/polkadot/initial` are both valid. To recreate a
derived account, you must know both the seed and the derivation path, so you should either use a
well-defined sequence (e.g. //0, //1, //2...) or be sure to write down any derivation paths you use.

:::info

It is not possible to generate a derived account without also knowing the derivation path.

:::

There is an additional type of derivation called password derivation. On Polkadot you can derive a
**password key** account using **///** after the mnemonic phrase

```
'caution juice atom organ advance problem want pledge someone senior holiday very///0'
```

In this type of derivation, if the mnemonic phrase would leak, accounts cannot be derived without
the initial password. In fact, for soft- and hard-derived accounts, if someone knows the mnemonic
phrase and the derivation path, they will have access to your account. For password-derived
accounts, the password is applied on the derivation path. You can know the mnemonic phrase and the
derivation path, but without the password it is not possible to access the account. In mathematical
terms, if we have a `written derivation path` and a `password`, we can calculate the
`real derivation path` as `f(written derivation path, password)`; where `f` is a function. We can
then calculate the `account key pair` using `f(seed, real derivation path)`. Note that unlike hard
and soft derivations that can be mixed, only a single password should be specified per derivation.

:::info

Password-derived account are as secure as the chosen password.

:::

### Soft vs. Hard Derivation

A soft derivation allows someone to potentially "go backwards" to figure out the initial account's
private key if they know the derived account's private key. It is also possible to determine that
different accounts generated from the same seed are linked to that seed. A hard derivation path does
not allow either of these - even if you know a derived private key, it's not feasible to figure out
the private key of the root address, and it's impossible to prove that the first account is linked
with the second. These derivation methods have their use cases, given that the private keys for all
the derived accounts are fully secure. Unless you have a specific need for a soft derivation, it is
recommended to generate the account using a hard derivation path.

See the [Subkey documentation](https://docs.substrate.io/reference/command-line-tools/subkey/) for
details and examples of derivation path formats. The Polkadot-JS Apps and Extension and Parity
Signer support custom derivation paths using the same syntax as Subkey.

Some wallets will automatically add derivation paths to the end of the generated mnemonic phrase.
This will generate separate seeds for separate paths, allowing separate signing keys with the same
mnemonic, e.g. `<mnemonic phrase>//polkadot` and `<mnemonic phrase>//kusama`. Although you may
correctly save the mnemonic phrase, using it in another wallet will not generate the same addresses
unless both wallets use the same derivation paths.

Polkadot and Kusama both have paths registered in the
[BIP44 registry](https://github.com/satoshilabs/slips/blob/master/slip-0044.md).

:::warning

You must have both the _parent_ private key and the derivation path to arrive at the key for an
address. Do not use custom derivation paths unless you are comfortable with your understanding of
this topic.

:::

### For the Curious: How Prefixes Work

The [SS58 document](<https://github.com/paritytech/substrate/wiki/External-Address-Format-(SS58)>)
states that:

- Polkadot has an address type of `00000000b`, so `0` is in decimal.
- Kusama (Polkadot Canary) has an address type of `00000010b`, so `2` is in decimal.
- Generic Substrate has `00101010b` as the address type, `42` is in decimal.

Because the `Base58-check` alphabet has no number 0, the lowest value is indeed 1. So `00000000b` is
1 in Base58-check. If we try to
[decode](https://www.better-converter.com/Encoders-Decoders/Base58Check-to-Hexadecimal-Decoder) a
Polkadot address like `1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg`, the result is
`000aff6865635ae11013a83835c019d44ec3f865145943f487ae82a8e7bed3a66b29d7`. The first byte is `00`,
which is indeed `00000000` in binary and `0` in decimal and thus matches the address type of
Polkadot.

Let's take a look at Substrate addresses. If we decode
`5CK8D1sKNwF473wbuBP6NuhQfPaWUetNsWUNAAzVwTfxqjfr`, we get
`2a0aff6865635ae11013a83835c019d44ec3f865145943f487ae82a8e7bed3a66b77e5`. The first byte is `2a`
which when
[converted from hex to decimal](https://www.rapidtables.com/convert/number/hex-to-decimal.html)
is 42. 42 is `00101010` in binary, just as the SS58 document states.

Finally, let's look at Kusama addresses. Decoding `CpjsLDC1JFyrhm3ftC9Gs4QoyrkHKhZKtK7YqGTRFtTafgp`
gives us `020aff6865635ae11013a83835c019d44ec3f865145943f487ae82a8e7bed3a66b0985` with the first
byte being `02`, just as specified. If we try a Kusama address that starts with a completely
different letter, like `J4iggBtsWsb61RemU2TDWDXTNHqHNfBSAkGvVZBtn1AJV1a`, we still get `02` as the
first byte: `02f2d606a67f58fa0b3ad2b556195a0ef905676efd4e3ec62f8fa1b8461355f1142509`. It seems
counterintuitive that some addresses always have the same prefix and others like Kusama can vary
wildly, but it's just a quirk of Base58-check encoding.