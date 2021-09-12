---
id: build-parachains
title: Parachain Development
sidebar_label: Parachain Development
---

This section will cover the motivation to build a parachian or parathread, the tools available
to facilitate this, and the steps to test, and finally launch your network on Polkadot!

## Why Create a Parachain?

Parachains can [lease the security](learn-security) of the Polkadot network by bonding
[DOT](learn-DOT) for a parachain slot. This means that the social costs of building a community
around your project and convincing validators to participate in your network security are reduced.
Polkadot has strong security, and decentralized application projects wishing to benefit from this
security would want to become a parachain to share in that pooled security. For more information
on the mechanic of leasing a parachain slot through a candle auction see [here](learn-auction).

Any decentralized application or chain that wants to enable trustless messaging to other parachains
already connected to Polkadot would want to become a parachain. Interoperability between sovereign
chains involves certain constraints and complex protocols to enable across a wide breadth of chains.
With Polkadot, you will get this feature out of the box if your build your application as a
parachain. The [XCMP protocol](learn-crosschain) allows any parachains to communicate by
passing messages between them. Furthermore, as bridges to other chains are connected (such as those
to Bitcoin or Ethereum) Polkadot's parachains will be able to communicate with these as well!

## What is a Parachain Development Kit (PDK)?

A PDK is a set of tools that allows developers to easily create a parachain. In
practice this means that the PDK will consist of a couple key components:

- _State transition function_ - a way for your application to move from one state to another state.
- _Collator node_ - a type of peer-to-peer node in the Polkadot network with certain
  responsibilities in regard to parachains.

The state transition function (STF) can be any abstract way for an application to go from one state
to another state. The only constraint that Polkadot places on this STF is that it must be easily
verifiable -- usually though what we call a _witness_ or _proof_. It must be so because the Relay
Chain validators will need to check that each state it receives from the collator node is correct
without actually running through the entire computation. Some examples of these proofs include the
Proof-of-Validity blocks or zk-SNARKs, which require less computational resources to verify than
they do to generate. The verification asymmetry in proof generation of the STF is one of the
integral insights that allows Polkadot to scale while keeping high security guarantees.

A collator node is one of the types of network maintainers in the Polkadot protocol. They are
responsible for **keeping availability** of the state of the parachain and the new states returned
from iteration of the state transition function. They must remain online in order to keep track of
the state and also of the XCMP messages that it will route between itself and other parachains.
Collator nodes are responsible for passing the succinct proofs to the relay chain's validators, and
tracking the latest blocks from the relay chain. In essence, a collator node also acts as a light
client for the relay chain. For more on collator nodes see [here](learn-collator).

## What PDKs exist?

Currently the only PDK is Parity [Substrate](https://github.com/paritytech/substrate) and
[Cumulus](https://github.com/paritytech/cumulus). Substrate is a blockchain framework that provides
the basic building blocks of a blockchain (things like the networking layer, consensus, a Wasm
interpreter) and provides an intuitive way to construct your runtime. Substrate is made to ease the
process of creating a new chain, but it does not provide support for Polkadot compatibility
directly. For this reason, Cumulus, an added library contains all of the Polkadot compatibility
glue code. Cumulus is still in development, but the idea is that it should be simple to take a
Substrate chain and add the parachain code by importing the crates and adding a single line of code.

Substrate and Cumulus provide a PDK from the abstraction of the blockchain format, but it is not
necessary that a parachain even needs to be a blockchain. For example, a parachain just needs to
satisfy the two constraints listed above: _state transition function_ and _collator node_.
Everything else is up to the implementer of the PDK.

> Interested in building a PDK? See the [future PDKs](#future-pdks) section for details!

### Cumulus

> "Cumulus clouds are shaped sort of like dots; together they form a system that is intricate,
> beautiful and functional."

[Cumulus](https://github.com/paritytech/cumulus) is an extension to Substrate that makes it easy to
make any Substrate built runtime into a Polkadot-compatible parachain.

Cumulus Consensus is a consensus engine for Substrate that follows a Polkadot relay chain (i.e.,
parachains). This runs a Polkadot node internally, and dictate to the client and synchronization
algorithms which chain to follow, finalize, and treat as correct.

See the [Cumulus overview](https://github.com/paritytech/cumulus/blob/master/docs/overview.md) for a
more detailed description of Cumulus, and for those with experience in Substrate, give the 
[Cumulus Workshop](https://substrate.dev/cumulus-workshop/) a go!

## Parachain Testing: Rococo

[Rococo](https://github.com/paritytech/cumulus#rococo-crown) is a Polkadot testnet built for testing
parachains. Rococo utilizes Cumulus and HRMP (Horizontal Relay-routed Message Passing) in order to
send transfers and messages between parachains and a relay chain. Every message is sent to the
relay chain, then from the relay chain to the desired parachain. Rococo currently runs four test
system parachains (Statemint, Tick, Trick, and Track), as well as several externally developed parachains.

### What Parachains are on Rococo Now?

You can see the list of included parachains
[here](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frococo-rpc.polkadot.io#/parachains). A list of
proposed parachains is available
[here](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frococo-rpc.polkadot.io#/parachains/proposals).

### Obtaining ROC

ROC are available in the [Rococo Faucet](https://app.element.io/#/room/#rococo-faucet:matrix.org)
channel on Matrix. To receive ROC tokens, use the command:

```
!drip YOUR_ROCOCO_ADDRESS
```

### Build and Register a Rococo Parathread

[Cumulus](https://github.com/paritytech/cumulus#rococo) is set of tools for writing Substrate-based
parachains. 

If you are interested in running and launching your own parathread or parachain, Parity Technologies
has created a [cumulus parachain workshop](https://substrate.dev/cumulus-workshop/) to show you how.
Get stuck or need support along the way? Join the
[Parachain Technical matrix chat channel](https://matrix.to/#/#parachain-technical:matrix.parity.io)
and connect with other builders there.

### How to connect to a Parachain

If you would like to connect to a parachain via [Polkadot-JS Apps](https://polkadot.js.org/apps/),
you may do so by clicking on the network selection at the top left hand corner of the navigation and
selecting any parachain of choice. For the purpose of these following examples, we will be using the
Rococo testnet "Custom Node" underneath "Development", following the
[parachain workshop](https://substrate.dev/cumulus-workshop/).

![parachains on polkadotjs](assets/polkadotjs_network_parachains.png)

## Deploy your parachain or parathread on Polkadot

Substrate-based chains, including the Polkadot and Kusama relay chains, use an
[SS58 encoding](<https://github.com/paritytech/substrate/wiki/External-Address-Format-(SS58)>) for
their address formats. [This page](https://github.com/paritytech/substrate/blob/master/ss58-registry.json)
serves as the canonical registry for teams to see which chain corresponds to a given prefix, and which prefixes are availabe.

### Parachain

In order to include your parachain into the Polkadot network, you will need to acquire a parachain
slot.

Parachain slots will be sold in open auctions, the mechanics of which can be found on the
{{ polkadot: [parachain auction](learn-auction) :polkadot }}
{{ kusama: [parachain auction](mirror-learn-auction) :kusama }} page of the wiki.

### Parathread

Parathreads will not require a parachain slot, so you will not need to engage in the candle auction
mechanism. Instead, you will be able to register your parathread code to a relay chain for a fee
and from then be able to start participating in the per-block auctions for inclusion of your state
transition into a relay chain.

For more information on how parathread per-block auctions work, see the more detailed
{{ polkadot: [parathread](learn-parathreads) :polkadot }}
{{ kusama: [parathread](mirror-learn-parathreads) :kusama }} page.


## Future PDKs

One example of a PDK W3F is interested in supporting is a
[roll-up](https://ethresear.ch/t/roll-up-roll-back-snark-side-chain-17000-tps/3675) kit that allowed
developers to create SNARK-based parachains. If we review the roll-up write-up, we see that the
system uses two roles: users that update **state** and an operator that **aggregates the state
updates** into a single on-chain update. It should be straightforward to see how we can translate
this to the parachain terms. The state transition function for a roll-up-like parachain would be
updating the state (in practice, most likely a merkle tree, which would be easily verifiable) from
the user inputs. The operator would act as the collator node, which would aggregate the state and
create the zk-SNARK proof that it would hand to a relay chain's validators for verification.

If you or your team are interested in developing a PDK feel free to open an issue on the
[W3F collaboration repository](https://github.com/w3f/Web3-collaboration) for comment.
There may be grants available for this type of work.
