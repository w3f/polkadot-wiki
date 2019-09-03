---
id: polkadot-learn-parachains
title: Parachains
sidebar_label: Parachains
---

# Parachains

![One parachain](../../img/network/one_parachain.png)

## What is a parachain?

A parachain is an application specific data structure that is globally coherent and validatable by the validators of the Polkadot relay chain. Most commonly a parachain will take the form of a blockchain, but there is no specific need for them to be blockchain in nature. They take their name from the concept of parallelized chains that run parallel to the relay chain. Due to their parallel nature, they are able to parallelize transaction processing and achieve scalability of the Polkadot system. They [share in the security](polkadot-learn-security) of the entire Polkadot network and communicate with other parachains through [ICMP](polkadot-learn-interchain).

Parachains are maintained by a network maintainer known as a [collator](polkadot-node-collator). The role of the collator node is to maintain a full-node of the parachain, retain all necessary information of the parachain, and produce new block candidates to pass to the relay chain validators for verification and inclusion in the shared state of Polkadot. The incentivization of a collator node is an implementation detail of the parachain (see [parachain economies](#parachain-economies)) and they are not required to be staked on the relay chain or own DOT token unless stipulated to do so by the parachain implementation.

The Polkadot runtime environment (PRE) allows for the state transitions performed on parachains to be specified as a Wasm executable. Proofs of new state transitions that occur on a parachain must be validated against the registered state transition function (STF) that is stored on the relay chain by the validators before Polkadot acknowledges a state transition has occurred on a parachain. The only constraint to the logic that a parachain is allowed to implement is that it must be verifiable by the relay chain validators. Verification most commonly takes the form a  bundled proof of a state transition known as a Proof-of-Verification (PoV) block, which is submitted to the validators from one or more of the parachain collators to be checked.

## Parachain economies

Parachains may have their own economies with their own native tokens. Schemes such as Proof-of-Stake are usually used to select the validator set in order to handle validation and finalization; parachains will not be required to do either of those things. However, since Polkadot is general over what the parachain can implement, it may be the choice of the parachain to implement a staking token, but it's not generally necessary.

Collators may be incentivized through inflation of a native parachain token. There may be other ways to incentivize the collator nodes which do not involve inflating the native parachain token.

Transaction fees in a native parachain token can also be an implementation choice of parachains. Polkadot makes no hard and fast rules for how the parachains decide on original validity of transactions. For example, a parachain may be implemented so that transactions must pay a minimum fee to collators to be valid. The relay chain will enforce this validity. Similarly, a parachain could not include that in their implementation and Polkadot would still enforce its validity.

Parachains are not required to have their own token and if they do it is up to the parachain to make the economic case for their token, not Polkadot.

## Examples

Some examples of parachains:

- **Encrypted Consortium Chains** - These are possibly private chains that do not leak any information to the public, but still can be interacted with trustlessly due to the nature of the ICMP protocol.
- **High Frequency Chains** - These are chains which can compute many transactions in a short amount of time by taking certain trade-offs or making optimizations.
- **Privacy Chains** - These are chains which do not leak any information to the public through use of novel cryptography.
- **Smart Contract Chains** - These are chains which can have additional logic implemented on them through the deployment of code known as _smart contracts_.

## FAQ

### What is "parachain consensus"?

"Parachain consensus" is special in that it will follow the Polkadot relay chain. Parachains cannot use other consensus algorithms that provide their own finality, and if they do will be sovereign chains that must bridge to the relay chain. Parachains have control over how blocks are authored and by who.

### How will parachain slots be distributed?

Parachain slots will be acquirable through auction, please see the [parachain slots](polkadot-learn-auction) article.

### Parachain Development Kits (PDKs)

Parachain Development Kits are a set of tools that enable developers to create their own applications as parachains. For more info see [here](polkadot-build-pdk).

### Deploying parachains

Please see the builder's article on [deploying parachains](polkadot-build-deploy-parachains).

## Resources

- [Polkadot: The Parachain](https://medium.com/polkadot-network/polkadot-the-parachain-3808040a769a) - Blog post by Polkadot co-founder Rob Habermeier that introduced parachains in 2017 as "a simpler form of blockchain, which attaches to the security provided by a ‘relay chain’ rather than providing its own. The relay chain provides security to attached parachains, but also provides a guarantee of secure message-passing between them."
