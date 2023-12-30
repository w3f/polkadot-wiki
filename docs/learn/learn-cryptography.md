![Ggggg](https://github.com/w3f/polkadot-wiki/assets/138715838/b911f0cb-c254-443c-80a4-47d1edf5520b)
![qrcode](https://github.com/w3f/polkadot-wiki/assets/138715838/983a8b51-b5d6-402b-830b-d425360588ce)
![avatar](https://github.com/w3f/polkadot-wiki/assets/138715838/6e75ea32-b913-4d95-bd21-5252b6b00f25)
---
id: learn-cryptography
title: Cryptography on Polkadot
sidebar_label: Cryptography
description: Cryptographic Functions used in Polkadot.
keywords:
  [cryptography, hashing, keypair, signing, keys, randomness, verifiable random function, VDF]
slug: ../learn-cryptography
---

This is a high-level overview of the cryptography used in Polkadot. It assumes that you have some
knowledge about cryptographic primitives that are generally used in blockchains such as hashes,
elliptic curve cryptography (ECC), and public-private keypairs.

For detailed descriptions on the cryptography used in Polkadot please see the more advanced
[research wiki](https://research.web3.foundation).

## Hashing Algorithm

The hashing algorithm used in Polkadot is
[Blake2b](<https://en.wikipedia.org/wiki/BLAKE_(hash_function)#BLAKE2>). Blake2 is considered to be
a very fast cryptographic hash function that is also used in the cryptocurrency
[Zcash](https://z.cash).

## Keypairs and Signing

Polkadot uses Schnorrkel/Ristretto x25519 ("sr25519") as its key derivation and signing algorithm.

Sr25519 is based on the same underlying [Curve25519](https://en.wikipedia.org/wiki/Curve25519) as
its EdDSA counterpart, [Ed25519](https://en.wikipedia.org/wiki/EdDSA#Ed25519). However, it uses
Schnorr signatures instead of the EdDSA scheme. Schnorr signatures bring some noticeable benefits
over the ECDSA/EdDSA schemes. For one, it is more efficient and still retains the same feature set
and security assumptions. Additionally, it allows for native multisignature through
[signature aggregation](https://bitcoincore.org/en/2017/03/23/schnorr-signature-aggregation/).

The names Schnorrkel and Ristretto come from the two Rust libraries that implement this scheme, the
[Schnorrkel](https://github.com/w3f/schnorrkel) library for Schnorr signatures and the
[Ristretto](https://ristretto.group/ristretto.html) library that makes it possible to use cofactor-8
curves like Curve25519.

## Keys

Public and private keys are an important aspect of most crypto-systems and an essential component
that enables blockchains like {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} to
exist.

### Account Keys

Account keys are keys that are meant to control funds. They can be either:

- The vanilla `ed25519` implementation using Schnorr signatures.
- The Schnorrkel/Ristretto `sr25519` variant using Schnorr signatures.
- ECDSA signatures on secp256k1

There are no differences in security between `ed25519` and `sr25519` for simple signatures. We
expect `ed25519` to be much better supported by commercial HSMs for the foreseeable future. At the
same time, `sr25519` makes implementing more complex protocols safer. In particular, `sr25519` comes
with safer version of many protocols like HDKD common in the Bitcoin and Ethereum ecosystem.

### Stash and Staking Proxy Keys

When we talk about stash and staking proxy keys, we usually talk about them in the context of
running a validator or nominating, but they are useful concepts for all users to know. Both keys are
types of account keys. They are distinguished by their intended use, not by an underlying
cryptographic difference. All the info mentioned in the parent section applies to these keys. When
creating new staking proxy or stash keys, all cryptography supported by account keys are an
available option.

The staking proxy key is a semi-online key that will be in the direct control of a user, and used to
submit manual extrinsics. For validators or nominators, this means that the proxy key will be used
to start or stop validating or nominating. Proxy keys should hold some
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} to pay for fees, but they should not be used
to hold huge amounts or life savings. Since they will be exposed to the internet with relative
frequency, they should be treated carefully and occasionally replaced with new ones.

The stash key is a key that will, in most cases, be a cold wallet, existing on a piece of paper in a
safe or protected by layers of hardware security. It should rarely, if ever, be exposed to the
internet or used to submit extrinsics. The stash key is intended to hold a large amount of funds. It
should be thought of as a saving's account at a bank, which ideally is only ever touched in urgent
conditions. Or, perhaps a more apt metaphor is to think of it as buried treasure, hidden on some
random island and only known by the pirate who originally hid it.

Since the stash key is kept offline, it must be set to have its funds bonded to a particular staking
proxy. For non-spending actions, the staking proxy has the funds of the stash behind it. For
example, in nominating, staking, or voting, the proxy can indicate its preference with the weight of
the stash. It will never be able to actually move or claim the funds in the stash key. However, if
someone does obtain your proxy key, they could use it for slashable behavior, so you should still
protect it and change it regularly.

### Session Keys

Session keys are hot keys that must be kept online by a validator to perform network operations.
Session keys are typically generated in the client, although they don't have to be. They are _not_
meant to control funds and should only be used for their intended purpose. They can be changed
regularly; your staking proxy only need create a certificate by signing a session public key and
broadcast this certificate via an extrinsic.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} uses six session keys:

- Authority Discovery: sr25519
- GRANDPA: ed25519
- BABE: sr25519
- I'm Online: sr25519
- Parachain Assignment: sr25519
- Parachain Validator: ed25519

BABE requires keys suitable for use in a [Verifiable Random Function](#vrf) as well as for digital
signatures. Sr25519 keys have both capabilities and so are used for BABE.

In the future, we plan to use a BLS key for GRANDPA because it allows for more efficient signature
aggregation.

### FAQ about Keys

#### Why was `ed25519` selected over `secp256k1`?

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

The choice of using Schnorr signatures over using ECDSA is not so cut and dried. Jeff Burdges (a
Web3 researcher) provides additional details on the decision in this
[research post](https://research.web3.foundation/Polkadot/security/keys) on the topic:

:::info Choosing Schnorr signatures over ECDSA signatures

There is one sacrifice we make by choosing Schnorr signatures over ECDSA signatures for account
keys: Both require 64 bytes, but only ECDSA signatures communicate their public key. There are
obsolete Schnorr variants that support recovering the public key from a signature, but they break
important functionality like hierarchical deterministic key derivation. In consequence, Schnorr
signatures often take an extra 32 bytes for the public key.

:::

But ultimately the benefits of using Schnorr signatures outweigh the tradeoffs, and future
optimizations may resolve the inefficiencies pointed out in the quote above.

#### What is `sr25519` and where did it come from?

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

#### Are BLS signatures used in Polkadot?

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

## Randomness

Randomness in Proof of Stake blockchains is important for a fair and unpredictable distribution of
validator responsibilities. Computers are bad at random numbers because they are deterministic
devices (the same input always produces the same output). What people usually call random numbers on
a computer (such as in a gaming application), are _pseudo-random_ - that is, they depend on a
sufficiently random _seed_ provided by the user or another type of _oracle_, like a
[weather station for atmospheric noise](https://www.random.org/randomness/), your
[heart rate](https://mdpi.altmetric.com/details/47574324), or even
[lava lamps](https://en.wikipedia.org/wiki/Lavarand), from which it can generate a series of
seemingly-random numbers. But given the same seed, the same sequence will always be generated.

Though, these inputs will vary based on time and space, and it would be impossible to get the same
result into all the nodes of a particular blockchain around the world. If nodes get different inputs
on which to build blocks, forks happen. Real-world entropy is not suitable for use as a seed for
blockchain randomness.

There are two main approaches to blockchain randomness in production today: `RANDAO` and `VRF`.
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} uses VRF.

### VRF

A verifiable random function (VRF) is a mathematical operation that takes some input and produces a
random number along with a proof of authenticity that this random number was generated by the
submitter. The proof can be verified by any challenger to ensure the random number generation is
valid.

The VRF used in {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} is roughly the same
as the one used in Ouroboros Praos. Ouroboros randomness is secure for block production and works
well for [BABE](learn-consensus.md#BABE). Where they differ is that Polkadot's VRF does not depend
on a central clock (the problem becomes - whose central clock?), rather, it depends on its own past
results to determine present and future results, and it uses slot numbers as a clock emulator,
estimating time.

#### Here's how it works in detail:

Slots are discrete units of time six seconds in length. Each slot can contain a block, but may not.
Slots make up [epochs](../general/glossary.md##epoch) - on
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, 2400 slots make one epoch, which
makes epochs four hours long.

In every slot, each validator "rolls a die". They execute a function (the VRF) that takes as input
the following:

- **The "secret key",** a key specifically made for these die rolls.
- **An epoch randomness value,** which is the hash of VRF values from the blocks in the epoch before
  last (N-2), so past randomness affects the current pending randomness (N).
- **The slot number.**

![VRF_babe](../assets/VRF_babe.png)

The output is two values: a `RESULT` (the random value) and a `PROOF` (a proof that the random value
was generated correctly).

The `RESULT` is then compared to a _threshold_ defined in the implementation of the protocol
(specifically, in the {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} Host). If the
value is less than the threshold, then the validator who rolled this number is a viable block
production candidate for that slot. The validator then attempts to create a block and submits this
block into the network along with the previously obtained `PROOF` and `RESULT`. Under VRF, every
validator rolls a number for themselves, checks it against a threshold, and produces a block if the
random roll is under that threshold.

The astute reader will notice that due to the way this works, some slots may have no validators as
block producer candidates because all validator candidates rolled too high and missed the threshold.
We clarify how we resolve this issue and make sure that
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} block times remain near constant-time
in the wiki page on [consensus](learn-consensus.md).

### RANDAO

An alternative method for getting randomness on-chain is the
[RANDAO](https://github.com/randao/randao) method from Ethereum. RANDAO requires each validator to
prepare by performing many thousands of hashes on some seed. Validators then publish the final hash
during a round and the random number is derived from every participant's entry into the game. As
long as one honest validator participates, the randomness is considered secure (non-economically
viable to attack). RANDAO is optionally augmented with VDF.

### VDFs

[Verifiable Delay Functions](https://vdfresearch.org/) are computations that take a prescribed
duration of time to complete, even on parallel computers. They produce unique output that can be
independently and efficiently verified in a public setting. By feeding the result of RANDAO into a
VDF, a delay is introduced that renders any attacker's attempt at influencing the current randomness
obsolete.

VDFs will likely be implemented through ASIC devices that need to be run separately from the other
types of nodes. Although only one is enough to keep the system secure, and they will be open source
and distributed at nearly no charge, running them is neither cheap nor incentivized, producing
unnecessary friction for users of the blockchains opting for this method.

## Resources

- [Key discovery attack on BIP32-Ed25519](https://web.archive.org/web/20210513183118/https://forum.w3f.community/t/key-recovery-attack-on-bip32-ed25519/44) -
  Archive of forum post detailing a potential attack on BIP32-Ed25519. A motivation for transition
  to the sr25519 variant.
- [Account signatures and keys in Polkadot](https://research.web3.foundation/Polkadot/security/keys) -
  Research post by Web3 researcher Jeff Burdges.
- [Are Schnorr signatures quantum computer resistant?](https://bitcoin.stackexchange.com/questions/57965/are-schnorr-signatures-quantum-computer-resistant/57977#57977)
- [Polkadot's research on blockchain randomness and sortition](https://research.web3.foundation/Polkadot/protocols/block-production) -
  contains reasoning for choices made along with proofs
- [Discussion on Randomness used in Polkadot](https://github.com/paritytech/ink/issues/57) - W3F
  researchers discuss the randomness in Polkadot and when it is usable and under which assumptions.

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
