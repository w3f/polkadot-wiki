---
id: learn-keys
title: Polkadot Keys
sidebar_label: Keys
description: Learn about the different cryptographic keys used in Polkadot.
keywords: [keys, account keys, session keys, ed25519, BLS, signatures]
slug: ../learn-keys
---

Public and private keys are an important aspect of most crypto-systems and an essential component
that enables blockchains like {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} to
exist.

## Account Keys

Account keys are keys that are meant to control funds. They can be either:

- The vanilla `ed25519` implementation using Schnorr signatures.
- The Schnorrkel/Ristretto `sr25519` variant using Schnorr signatures.
- ECDSA signatures on secp256k1

There are no differences in security between `ed25519` and `sr25519` for simple signatures. We
expect `ed25519` to be much better supported by commercial HSMs for the foreseeable future. At the
same time, `sr25519` makes implementing more complex protocols safer. In particular, `sr25519` comes
with safer version of many protocols like HDKD common in the Bitcoin and Ethereum ecosystem.

### "Controller" and "Stash" Keys

When we talk about "controller" and "stash" keys, we usually talk about them in the context of
running a validator or nominating, but they are useful concepts for all users to know. Both keys are
types of account keys. They are distinguished by their intended use, not by an underlying
cryptographic difference. All the info mentioned in the parent section applies to these keys. When
creating new controller or stash keys, all cryptography supported by account keys are an available
option.

The controller key is a semi-online key that will be in the direct control of a user, and used to
submit manual extrinsics. For validators or nominators, this means that the controller key will be
used to start or stop validating or nominating. Controller keys should hold some
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} to pay for fees, but they should not be used
to hold huge amounts or life savings. Since they will be exposed to the internet with relative
frequency, they should be treated carefully and occasionally replaced with new ones.

The stash key is a key that will, in most cases, be a cold wallet, existing on a piece of paper in a
safe or protected by layers of hardware security. It should rarely, if ever, be exposed to the
internet or used to submit extrinsics. The stash key is intended to hold a large amount of funds. It
should be thought of as a saving's account at a bank, which ideally is only ever touched in urgent
conditions. Or, perhaps a more apt metaphor is to think of it as buried treasure, hidden on some
random island and only known by the pirate who originally hid it.

Since the stash key is kept offline, it must be set to have its funds bonded to a particular
controller. For non-spending actions, the controller has the funds of the stash behind it. For
example, in nominating, staking, or voting, the controller can indicate its preference with the
weight of the stash. It will never be able to actually move or claim the funds in the stash key.
However, if someone does obtain your controller key, they could use it for slashable behavior, so
you should still protect it and change it regularly.

## Session Keys

Session keys are hot keys that must be kept online by a validator to perform network operations.
Session keys are typically generated in the client, although they don't have to be. They are _not_
meant to control funds and should only be used for their intended purpose. They can be changed
regularly; your controller only need create a certificate by signing a session public key and
broadcast this certificate via an extrinsic.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} uses six session keys:

- Authority Discovery: sr25519
- GRANDPA: ed25519
- BABE: sr25519
- I'm Online: sr25519
- Parachain Assignment: sr25519
- Parachain Validator: ed25519

BABE requires keys suitable for use in a [Verifiable Random Function](learn-randomness.md/#vrfs) as
well as for digital signatures. Sr25519 keys have both capabilities and so are used for BABE.

In the future, we plan to use a BLS key for GRANDPA because it allows for more efficient signature
aggregation.

## FAQ

### Why was `ed25519` selected over `secp256k1`?

The original key derivation cryptography that was implemented for
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} and Substrate chains was `ed25519`,
which is a Schnorr signature algorithm implemented over the Edward's Curve 25519 (so named due to
the parameters of the curve equation).

Most cryptocurrencies, including Bitcoin and Ethereum, currently use ECDSA signatures on the
secp256k1 curve. This curve is considered much more secure than NIST curves, which
[have possible backdoors from the NSA](#appendix-a-on-the-security-of-curves). The Curve25519 is
considered possibly _even more_ secure than this one and allows for easier implementation of Schnorr
signatures. A recent patent expiration on it has made it the preferred choice for use in
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}.

The choice of using Schnorr signatures over using ECDSA is not so cut and dry. Jeff Burdges (a Web3
researcher) provides additional details on the decision in this
[research post](https://research.web3.foundation/en/latest/polkadot/keys/1-accounts.html) on the
topic:

:::info Choosing Schnorr signatures over ECDSA signatures

There is one sacrifice we make by choosing Schnorr signatures over ECDSA signatures for account
keys: Both require 64 bytes, but only ECDSA signatures communicate their public key. There are
obsolete Schnorr variants that support recovering the public key from a signature, but they break
important functionality like hierarchical deterministic key derivation. In consequence, Schnorr
signatures often take an extra 32 bytes for the public key.

:::

But ultimately the benefits of using Schnorr signatures outweigh the tradeoffs, and future
optimizations may resolve the inefficiencies pointed out in the quote above.

### What is `sr25519` and where did it come from?

Some context: The Schnorr signatures over the Twisted Edward's Curve25519 are considered secure,
however Ed25519 has not been completely devoid of its bugs. Most notably,
[Monero and all other CryptoNote currencies](https://www.getmonero.org/2017/05/17/disclosure-of-a-major-bug-in-cryptonote-based-currencies.html)
were vulnerable to a double spend exploit that could have potentially led to undetected, infinite
inflation.

These exploits were due to one peculiarity in Ed25519, which is known as its cofactor of 8. The
cofactor of a curve is an esoteric detail that could have dire consequences for the security of
implementation of more complex protocols.

Conveniently, [Mike Hamburg's Decaf paper](https://www.shiftleft.org/papers/decaf/index.xhtml)
provides a possible path forward to solving this potential bug. Decaf is basically a way to take
Twisted Edward's Curves cofactor and mathematically change it with little cost to performance and
gains to security.

The Decaf paper approach by the [Ristretto Group](https://ristretto.group/) was extended and
implemented in Rust to include cofactor-8 curves like the Curve25519 and makes Schnorr signatures
over the Edward's curve more secure.

Web3 Foundation has implemented a Schnorr signature library using the more secure Ristretto
compression over the Curve25519 in the [Schnorrkel](https://github.com/w3f/schnorrkel) repository.
Schnorrkel implements related protocols on top of this curve compression such as HDKD, MuSig, and a
verifiable random function (VRF). It also includes various minor improvements such as the hashing
scheme STROBE that can theoretically process huge amounts of data with only one call across the Wasm
boundary.

The implementation of Schnorr signatures that is used in Polkadot and implements the Schnorrkel
protocols over the Ristretto compression of the Curve25519 is known as **sr25519**.

### Are BLS signatures used in Polkadot?

Not yet, but they will be. BLS signatures allow more efficient signature aggregation. Because
GRANDPA validators are usually signing the same thing (e.g. a block), it makes sense to aggregate
them, which can allow for other protocol optimizations.

:::info From the BLS library's README

Boneh-Lynn-Shacham (BLS) signatures have slow signing, very slow verification, require slow and much
less secure pairing friendly curves, and tend towards dangerous malleability. Yet, BLS permits a
diverse array of signature aggregation options far beyond any other known signature scheme, which
makes BLS a preferred scheme for voting in consensus algorithms and for threshold signatures.

:::

Even though Schnorr signatures allow for signature aggregation, BLS signatures are much more
efficient in some fashions. For this reason it will be one of the session keys that will be used by
validators on the Polkadot network and critical to the GRANDPA finality gadget.

## Resources

- [Key discovery attack on BIP32-Ed25519](https://web.archive.org/web/20210513183118/https://forum.w3f.community/t/key-recovery-attack-on-bip32-ed25519/44) -
  Archive of forum post detailing a potential attack on BIP32-Ed25519. A motivation for transition
  to the sr25519 variant.
- [Account signatures and keys in Polkadot](https://research.web3.foundation/en/latest/polkadot/keys/index.html) -
  Research post by Web3 researcher Jeff Burdges.
- [Are Schnorr signatures quantum computer resistant?](https://bitcoin.stackexchange.com/questions/57965/are-schnorr-signatures-quantum-computer-resistant/57977#57977)

## Appendix A: On the security of curves

:::note From the
[Introduction of Curve25519](https://git.libssh.org/projects/libssh.git/tree/doc/curve25519-sha256@libssh.org.txt#n10)
into `libssl`

The reason is the following: During summer of 2013, revelations from ex- consultant at [the] NSA
Edward Snowden gave proof that [the] NSA willingly inserts backdoors into software, hardware
components and published standards. While it is still believed that the mathematics behind ECC
(Elliptic-curve cryptography) are still sound and solid, some people (including Bruce Schneier
[SCHNEIER]), showed their lack of confidence in NIST-published curves such as nistp256, nistp384,
nistp521, for which constant parameters (including the generator point) are defined without
explanation. It is also believed that [the] NSA had a word to say in their definition. These curves
are not the most secure or fastest possible for their key sizes [DJB], and researchers think it is
possible that NSA have ways of cracking NIST curves. It is also interesting to note that SSH belongs
to the list of protocols the NSA claims to be able to eavesdrop. Having a secure replacement would
make passive attacks much harder if such a backdoor exists.

However an alternative exists in the form of Curve25519. This algorithm has been proposed in 2006 by
DJB [Curve25519]. Its main strengths are its speed, its constant-time run time (and resistance
against side-channel attacks), and its lack of nebulous hard-coded constants.

:::
