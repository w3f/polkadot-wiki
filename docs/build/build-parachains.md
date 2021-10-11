---
id: build-parachains
title: Parachain Development
sidebar_label: Parachain Development
description: An extensive guide on what it means to become a Parachain and the steps to do so.
slug: ../build-pdk
---

This section will cover the motivation to build a parachain or parathread, the tools available
to facilitate this, the steps to test, and finally, how to launch your network on Polkadot.

## Why Create a Parachain?

Parachains are connected to and secured by the Relay Chain. They benefit from the *pooled security*,
*thought-through governance*, and overall *scalability* of the heterogeneous sharding approach of the network. Creating a parachain can be seen as creating a **Layer-1 blockchain**, which has its own logic and runs in parallel within the Polkadot ecosystem.

Developers can focus on creating state-of-the-art chains that take advantage of Polkadot's next-generation
approach. Some examples of what a parachain could be are:

- DeFi (Decentralized Finance) Applications
- Digital Wallets
- IoT (Internet of Things) Applications
- Gaming
- Web 3.0 Infrastructure

and more.

Polkadot aims to be a bet against so-called *chain-maximalism*, where the success of Polkadot's
heterogeneous multi-chain approach will play a key part in the overall advancement of Web 3.0 and
decentralized systems. As a result, Polkadot’s parachain model was designed with the belief that the
internet of the future will have many different types of blockchains working together.

### Benefits of Deploying on Polkadot

> The parachain model attempts to alleviate five key *build* failures of present technology stacks,
> as described in the [Polkadot Whitepaper](https://polkadot.network/PolkaDotPaper.pdf):
>
> - **Scalability**: How much is spent on resources and will the network be subject to bottlenecks?
> - **Isolatability**: Are the needs of many accounted for under the same framework?
> - **Developability**: Is the system tooling, system support, and overall system integrity dependable?
> - **Governance**: Can the network remain flexible to evolve and adapt over time? Can decisions be
>   made with sufficient inclusivity, legitimacy, and transparency to provide effective leadership of a
>   decentralised system?
> - **Applicability**: Does the technology address a burning need on its own? Is other “middleware”
>   required to bridge the gap to actual applications?

#### Pooled Security

Parachains can [lease the security](../learn/learn-security.md) of the Polkadot network by bonding
[DOT](../learn/learn-DOT.md) for a parachain slot. This means that the social costs of building a community
around your project and convincing validators to participate in your network security are reduced.
Polkadot has strong security, and decentralized application projects wishing to benefit from this
security would want to become a parachain to share in that pooled security. For more information
on the mechanic of leasing a parachain slot through a [candle auction](../learn/learn-auction.md).

#### Interoperability

Any decentralized application or chain that wants to enable trustless messaging to other parachains
already connected to Polkadot would want to become a parachain. Interoperability between sovereign
chains involves certain constraints and complex protocols to enable across a wide breadth of chains.
With Polkadot, you will get this feature out of the box if you build your application as a
parachain. The [XCM format](../learn/learn-cross-consensus.md) allows any parachains to communicate by
passing messages between them. Furthermore, as bridges to other chains are connected (such as those
to Bitcoin or Ethereum) Polkadot's parachains will be able to communicate with these as well.

> NOTE: Despite the benefits of becoming a parachain, developers should be conscious of the challenges in
> becoming a parachain, and whether building a blockchain with an end goal of becoming a
> parachain is a viable one for their project.

On Polkadot, you are able to put your blockchain’s latest block head onto the Relay Chain.
As a parachain, the blocks you submit are verified by validators with a Wasm runtime, which can
be stored on the Relay Chain. You also get the ability to communicate with other parachains using the
[XCM](../learn/learn-cross-consensus.md) format: an abstract message passing system.
Message passing is tracked on the Relay Chain - as such, you can prove the delivery of messages and
facilitate trustless interactions.

As you can place your blockchain’s latest block head, you can achieve deterministic finalization
for your chain. The hard part of reaching finalization for blockchains tends to be the consensus, where,
in the parachain model, a blockchain can offload consensus to the overall shared network, and focus on
block production. Since the validators have the Wasm runtime for all the parachains, your parachain
shares the security of the validator pool with everyone on the Relay Chain.

Any validator in the validator pool can help validate your blockchain.

## Creating a Parachain

### Things to Consider

#### Para-Economics

Parachains can be seen as autonomous agents; networks that act as decentralised digital nation states.
Parachains have their own communities, rules, economies, governance, treasuries, and relationships
with external chains. As a result, the economic policies within parachain ecosystems are subject to the
developers and overall community of that parachain ecosystem; there isn't necessarily a go-to economic
model a parachain should follow.

Nonetheless, *becoming a parachain* has an opportunity cost associated. Ideally, you can increase the value
of the network by participating in the parachain selection process, and this should serve as a good return
on investment.

[Collators](../learn/learn-collator.md) are incentivized with a native token payout from:

- Transaction fees collected
- Parathread token sponsorship
  - Blocks are naturally produced when a parathread bid is less than the native token payout.

#### Para-objects

The Polkadot network will encourage the connection and interoperability between different *para-objects*.

> Here, para-objects is referring to objects on the network that operate in parallel.

These could be in the form of:

- System level chains (permanent chains):
  [leased slots](../learn/learn-auction.md),
  [parathread pool](learn-parathreads.md)
- [Bridge](../learn/learn-bridges.md) Hubs
- Nested Relay Chains: [Polkadot 2.0](../learn/learn-launch.md##polkadot2.0)

#### Migration

Projects that are already functioning as solochains or in isolated environments may be interested
in migrating onto Polkadot as a para-object. While the parachain model has its benefits, it may
not be the go-to strategy for some projects.

As a path for migration onto Polkadot, it may be more viable to migrate to one of the
chains in one of the reserved slots.

For instance, there are currently options for smart contract deployment on Kusama through the
networks that have secured a slot in the latest slot auctions.

## Parachain Development Kit (PDK)

A **PDK** is a set of tools that allows developers to easily create a parachain. In
practice, the PDK will consist of the following key components:

- *State transition function*: a way for your application to move from one state to another state.
- *Collator node*: - a type of peer-to-peer node in the Polkadot network with certain
  responsibilities regarding parachains.

### Key Components

The state transition function (STF) can be an abstract way for an application to go from one state
to another state. The only constraint that Polkadot places on this STF is that it must be easily
verifiable -- usually through what we call a *witness* or *proof*. It must be so because the Relay
Chain validators will need to check that each state it receives from the collator node is correct
without actually running through the entire computation. Some examples of these proofs include the
Proof-of-Validity blocks or zk-SNARKs, which require less computational resources to verify than
they do to generate. The verification asymmetry in the proof generation of the STF is one of the
integral insights that allows Polkadot to scale while keeping high-security guarantees.

A collator node is one of the types of network maintainers in the Polkadot protocol. They are
responsible for **keeping availability** of the state of the parachain and the new states returned
from the iteration of the state transition function. They must remain online to keep track of
the state and also of the XCMP messages that it will route between itself and other parachains.
Collator nodes are responsible for passing the succinct proofs to the Relay Chain's validators and
tracking the latest blocks from the Relay Chain. In essence, a collator node also acts as a light
client for the Relay Chain. For more on collator nodes, see the [collator page](../learn/learn-collator.md).

### What PDKs Exist?

Currently, the only PDK is [Parity Substrate](https://github.com/paritytech/substrate) and
[Cumulus](https://github.com/paritytech/cumulus). **Substrate** is a blockchain framework that provides
the basic building blocks of a blockchain (things like the networking layer, consensus, a Wasm
interpreter) while providing an intuitive way to construct your runtime. Substrate is made to ease the
process of creating a new chain, but it does not provide support for Polkadot compatibility
directly. For this reason, `Cumulus`, an added *library* contains all of the Polkadot compatibility
glue code. Cumulus is still in development, but the idea is that it should be simple to take a
Substrate chain and add the parachain code by importing the crates and adding a single line of code.
Keep up-to-date with the latest Cumulus developments from the [Cumulus section](###cumulus).

> Substrate and Cumulus provide a PDK from the abstraction of the blockchain format, but it is **not
> necessary** that a parachain even needs to be a blockchain. For example, a parachain just needs to
> satisfy the two constraints listed above: *state transition function* and *collator node*.
>
> Everything else is up to the implementer of the PDK.

Interested in building a PDK? See the [future PDKs](##future-pdks) section for details.

### Cumulus

> "Cumulus clouds are shaped sort of like dots; together they form an intricate system;
> beautiful and functional."

[Cumulus](https://github.com/paritytech/cumulus) is an extension to Substrate that makes it easy to
make any Substrate-built runtime into a Polkadot-compatible parachain.

Cumulus Consensus is a consensus engine for Substrate that follows a Polkadot Relay Chain (i.e.,
parachains). This runs a Polkadot node internally, and dictates to the client and synchronization
algorithms which chain to follow, finalize, and treat as correct.

See the [Cumulus overview](https://github.com/paritytech/cumulus/blob/master/docs/overview.md) for a
more detailed description of Cumulus, and for those with experience in Substrate, give the
[Cumulus Workshop](https://substrate.dev/cumulus-workshop/) a try.

## Testing a Parachain: Rococo Testnet

[Rococo](https://github.com/paritytech/cumulus#rococo-crown) is a Polkadot testnet built for testing
parachains. Rococo utilizes Cumulus and HRMP (Horizontal Relay-routed Message Passing) in order to
send transfers and messages between parachains and a Relay Chain. Every message is sent to the
Relay Chain, then from the Relay Chain to the desired parachain. Rococo currently runs four test
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

### How to Make Cross Chain Transfers

To send a transfer between parachains, navigate to "Accounts" > "Transfer". From here, you'll need
to select the parachain node that you are running. Next, enter in the amount that you'd like to send
to another parachain. Be sure to select the correct parachain you'd like to send an amount to. Once
you've hit the "Submit" button, you should see a green notification, indicating a successful
transfer.

#### Downward Transfers

Downward transfers are when an account on the Relay Chain sends a transfer to their account on a
different parachain. This type of transfer uses a depository and mint model, meaning that when the
DOT leave the sender's account on the Relay Chain and are transferred into an account on a
parachain, the parachain mints a corresponding amount of tokens on the parachain.

For example, we can send tokens from Alice's account on the Relay Chain to her account on
parachain 200. To do so, we will need to head to the "Network" > "Parachains" tab and click on the
"Transfer to chain" button.

![rococo downward transfer](../assets/rococo/rococo-downward-transfer.png)

Notice here, that we can select which parachain to send the funds to, specify the amount to be sent,
and add any comments or a memo for the transfer.

#### Upward Transfers

Upward transfers occur *from* a parachain *to* an account on the Relay Chain. To proceed with this
kind of transfer, we need to be connected to a parachain node on the network and be on the
"Network" > "Parachains" tab. Click on the "Transfer to chain" button.

![rococo upward transfer](../assets/rococo/rococo-upward-transfer.png)

Note that the toggle should be set to off, ensuring that the funds go to the Relay Chain and not
another parachain.

#### Lateral Transfers

Lateral transfers are only possible with at least two different registered parachains. In true
XCMP, lateral transfers would allow for messages to be sent directly from one parachain to another.
However, this is not yet implemented, so the Relay Chain is helping us deliver messages for the time
being. Lateral transfers work through the depository model, which means that in order to transfer
tokens from chain 200 to chain 300, tokens must already be owned by chain 200 deposited on
chain 300. Lateral transfers are called HRMP, Horizontal Relay-Chain Message Passing.

Before we can send funds from one parachain to another, we must ensure that the chain's
account on the recipient chain has some funds in it. In this example, Alice will be sending some
funds from her account on parachain 200 to her account on parachain 300.

We can get that parachain account address, from our parachain 300's terminal:

```
2020-08-26 14:46:34 Parachain Account: 5Ec4AhNv5ArwGxtngtW8qcVgzpCAu8nokvnh6vhtvvFkJtpq
```

From Alice's account on the Relay Chain, she can send some amount to parachain 200's
depository.

![rococo lateral transfer](../assets/rococo/rococo-lateral-transfer.png)

Alice is now able to send from her account on parachain 200 to her account on parachain 300.

![rococo lateral transfer part 2](../assets/rococo/rococo-lateral-transfer2.png)

### How to Connect to a Parachain

If you would like to connect to a parachain via [Polkadot-JS Apps](https://polkadot.js.org/apps/),
you may do so by clicking on the network selection at the top left-hand corner of the navigation and
selecting any parachain of choice. For the purpose of these following examples, we will be using the
Rococo testnet "Custom Node" underneath "Development", following the
[parachain workshop](https://substrate.dev/cumulus-workshop/).

![parachains on polkadotjs](../assets/polkadotjs_network_parachains.png)

### Parachain Playground

You can also take advantage of the account functions offered on PolkadotJS Apps
to test the entire Parachain onboarding process (e.g. crowdloans, auctions, registrations).

Start a local node on [Westend](../maintain/maintain-networks.md###westend-test-network)
by running:

```bash
polkadot --chain=westend-dev --alice
```

Then, connect your local node with PolkadotJS Apps.

![parachains playground](../assets/parachain-playground.png)

## Deploy a Parachain or Parathread on Polkadot

Substrate-based chains, including the Polkadot and Kusama Relay Chains, use an
[SS58 encoding](<https://github.com/paritytech/substrate/wiki/External-Address-Format-(SS58)>) for
their address formats. [This page](https://github.com/paritytech/substrate/blob/master/ss58-registry.json)
serves as the canonical registry for teams to see which chain corresponds to a given prefix, and which prefixes are available.

### Parachain

To include your parachain into the Polkadot network, you will need to acquire a parachain
slot.

Parachain slots will be sold in open auctions, the mechanics of which can be found on the
{{ polkadot: [parachain auction](../learn/learn-auction.md) :polkadot }}
{{ kusama: [parachain auction](../learn/mirror-learn-auction.md) :kusama }} page of the wiki.

### Parathread

Parathreads will not require a parachain slot, so you will not need to engage in the candle auction
mechanism. Instead, you will be able to register your parathread code to a Relay Chain for a fee
and from then be able to start participating in the per-block auctions for inclusion of your state
transition into a Relay Chain.

For more information on how parathread per-block auctions work, see the more detailed
{{ polkadot: [parathread](../learn/learn-parathreads.md) :polkadot }}
{{ kusama: [parathread](../learn/mirror-learn-parathreads.md) :kusama }} page.

## Future PDKs

One example of a PDK W3F is interested in supporting is a
[roll-up](https://ethresear.ch/t/roll-up-roll-back-snark-side-chain-17000-tps/3675) kit that allowed
developers to create SNARK-based parachains. If we review the roll-up write-up, we see that the
system uses two roles: users that update **state** and an operator that **aggregates the state
updates** into a single on-chain update. It should be straightforward to see how we can translate
this to the parachain terms. The state transition function for a roll-up-like parachain would be
updating the state (in practice, most likely a Merkle tree, which would be easily verifiable) from
the user inputs. The operator would act as the collator node, which would aggregate the state and
create the zk-SNARK proof that it would hand to a Relay Chain's validators for verification.

If you or your team are interested in developing a PDK feel free to open an issue on the
[W3F collaboration repository](https://github.com/w3f/Web3-collaboration) for comment.
There may be grants available for this type of work.
