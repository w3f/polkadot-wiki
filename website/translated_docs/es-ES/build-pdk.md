---
id: build-pdk
title: Parachain Development Kits (PDKs)
sidebar_label: Parachain Development Kits (PDKs)
---

Parachain development kits (PDKs) are a set of tools that make it easy for developers to create Polkadot compatible [parachains](learn-parachains).

## Why create a parachain?

Before diving into what a PDK is and how it would be used, let's revisit *why* a developer would want to create a parachain and connect it to Polkadot.

A parachain has two major value adds that make it a desirable choice for a developer over creating a standalone chain:

- *Shared security* - removes the necessity of bootstrapping a chain's own validator set.
- *Interchain communication* - allows parachains to interoperate with each other through the ICMP protocol.

Parachains can [lease the security](learn-security) of the Polkadot network by bonding [DOTs](learn-DOT) for a parachain slot. This means that the social costs of building a community around your project and convincing validators to participate in your network security are reduced. It is anticipated that Polkadot will have strong security, and decentralized application projects wishing to benefit from this security would want to become a parachain. For more information on the mechanic of leasing a parachain slot through a candle auction see [here](learn-auction).

Any decentralized application or chain that wants to enable trustless messaging to other parachains already connected to Polkadot would want to become a parachain. Interoperability between sovereign chains involves certain constraints and complex protocols to enable across a wide breadth of chains. With Polkadot, you will get this feature out of the box if your build your application as a parachain. The [ICMP protocol](learn-interchain) will allow any parachains to interoperate by passing messages between them. Furthermore, as bridges to other chains are launched (such as those to Bitcoin or Ethereum) the parachains will be able to operate with these as well.

## What is a PDK?

As mentioned, a PDK is a set of tools that allows developers to easily create a parachain. In practice this means that the PDK will consist of a couple key components:

- *State transition function* - a way for your application to move from one state to another state.
- *Collator node* - a type of peer-to-peer node in the Polkadot network with certain responsibilities in regard to parachains.

The state transition function (STF) can be any abstract way for an application to go from one state to another state. The only constraint that Polkadot places on this STF is that it must be easily verifiable -- usually though what we call a *witness* or *proof*. It must be so because the relay chain validators will need to check that each state it receives from the collator node is correct without actually running through the entire computation. Some examples of these proofs include the Proof-of-Validity blocks or zk-SNARKs which require less computational resources to verify than they do to generate. The verification asymmetry in proof generation of the STF is one of the integral insights that allows Polkadot to scale while keeping high security guarantees.

A collator node is one of the types of network maintainers in the Polkadot protocol. They are responsible for **keeping availability** of the state of the parachain and the new states returned from iteration of the state transition function. They must remain online in order to keep track of the state and also of the ICMP messages that it will route between itself and other parachains. Collator nodes are responsible for passing the succinct proofs to the relay chain validators, and tracking the latest blocks from the relay chain. In essence, a collator node also acts as a light client for the Polkadot relay chain. For more on collator nodes see [here](maintain-collator).

## What kind of PDKs exist?

Currently the only PDK is Parity [Substrate](https://github.com/paritytech/substrate) and [Cumulus](https://github.com/paritytech/cumulus). Substrate is a blockchain framework that provides the basic building blocks of a blockchain (things like the networking layer, consensus, a Wasm interpreter) and provides an intuitive way to construct your runtime. Substrate is made to ease the process of creating a new chain, but it does not provide support for Polkadot compatibility directly. For this reason, Cumulus, an added library will contain all of the Polkadot compatibility glue code. Cumulus is still in development, but the idea is that it should be simple to take a Substrate chain and add the parachain code by importing the crates and adding a single line of code.

Substrate and Cumulus provide a PDK from the abstraction of the blockchain format, but it is not necessary that a parachain even needs to be a blockchain. For example, a parachain just needs to satisfy the two constraints listed above: *state transition function* and *collator node*. Everything else is up to the implementer of the PDK.

One interesting idea for a PDK that would be nice to see is to have a [roll_up](https://ethresear.ch/t/roll-up-roll-back-snark-side-chain-17000-tps/3675) kit that allowed developers to create snark-based parachains. If we review the roll_up write-up we see that the system uses two roles: users that update **state** and an operator that **aggregates the state updates** into a single on-chain update. It should be straight forward to see how we can translate this to the parachain terms. The state transition function for a roll_up-like parachain would be updating the state (in practice, most likely a merkle tree which would be easily verifiable) from the user inputs. The operator would act as the collator node which would aggregate the state and create the zk-SNARK proof which it would hand to the relay chain validators for verification.

## Build a PDK

If you or your team are interested in developing a PDK feel free to open an issue on the W3F collaboration repository for comment. There may be grants available for this type of work.
