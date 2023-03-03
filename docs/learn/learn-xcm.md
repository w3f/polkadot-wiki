---
id: learn-xcm
title: Cross-Consensus Message Format (XCM)
sidebar_label: Cross-Consensus Message Format (XCM)
description: Learn about the messaging format at the forefront of interoperability.
keywords: [cross-consensus, XCM, XCMP, interoperability, communication]
slug: ../learn-xcm
---

The Cross-Consensus Message Format, or **XCM**, is a **messaging format** and language used to
communicate between consensus systems.

One of {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}'s main functionalities is
interoperability amongst parachains and any other participating consensus-driven systems. XCM is the
language through which complex, cross-consensus interactions can occur. Two blockchains can "speak" XCM
to seamlessly interact with each other using a standard messaging format.

![xcm](../assets/cross-consensus/xcm.drawio.svg)

:::info

We typically discuss XCM in the context of parachains, but please bear this in mind that it expands to the domain of all consensus systems!
Remember, a consensus system here means any system or protocol that achieves finality to agree on
the latest and correct state, whether it's a Polkadot parachain, an EVM smart contract, or other
bridged consensus systems. 

:::

XCM is not meant to be only specific to
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, but rather its primary intention is
to define a **generic** and **common** format amongst different consensus systems to communicate.

It's important to note that XCM does not define how messages are delivered but rather define how they should look, act, and
contain relative instructions to the on-chain actions the message intends to perform.

[**XCMP**](#xcmp-cross-chain-message-passing), or Cross Chain Message Passing, is the actual
network-layer protocol to deliver XCM-formatted messages to other participating parachains. There
are also other ways to define transport layer protocols for delivering XCM messages.

XCM has four, high-level core design principles in which it stands to follow:

1. **Asynchronous**: XCM messages in no way assume that the sender will be blocking on its
   completion.
2. **Absolute**: XCM messages are guaranteed to be delivered and interpreted accurately, in order
   and in a timely fashion. Once a message is sent, one can be sure it will be processed as it was
   intended to be.
3. **Asymmetric**: XCM messages, by default, do not have results that let the sender know that the
   message was received - they are 'fire and forget'. Any results must be separately communicated to
   the sender with an additional message back to the origin.
4. **Agnostic**: XCM makes no assumptions about the nature of the Consensus Systems between which
   the messages are being passed. XCM as a message format should be usable in any system that
   derives consensus.

These four crucial design decisions allow for XCM messages to be a reliable yet convenient way to
properly convey the intentions from one consensus system to another without any compatibility
issues.

:::note

XCM is a work-in-progress - meaning the format is expected to change over time. XCM v2 is deployed
on {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} and v3 is currently close to
deployment. Learn more about XCM v3 and its new features in the [resources](#resources) and the
[XCM v3](#xcm-v3---whats-new) sections!

:::

## A Format, Not a Protocol

What started as an approach to _cross-chain communication_, has evolved into a format for
[**Cross-Consensus Communication**](https://polkadot.network/cross-chain-communication) that is not
only conducted between chains, but also between smart contracts, pallets, bridges, and even sharded
enclaves like [SPREE](learn-spree.md).

XCM cannot actually send messages between systems. It is a format for how message transfer should be
performed, similar to how RESTful services use REST as an architectural style of development, where
HTTP requests contain specific parameters to perform some action.

Similar to UDP, out of the box XCM is a "fire and forget" model, unless there is a separate XCM
message designed to be a response message which can be sent from the recipient to the sender. All
error handling should also be done on the recipient side.

:::info

XCM is not designed in a way where every system supporting the format is expected to be able to
interpret any possible XCM message. Practically speaking, one can imagine that some messages will
not have reasonable interpretations under some systems or will be intentionally unsupported.

:::

Furthermore, it's essential to realize that XCM messages by themselves are _not_ considered transactions. XCM
describes how to change the state of the target network, but the message by itself doesn't perform the
state change.

This partly ties to what is called **asynchronous composability**, which allows XCM messages to bypass
the concept of time-constrained mechanisms, like on-chain scheduling and execution over time in the
correct order in which it was intended.

### Example Use-Cases

- Request for specific operations to occur on the recipient system such as governance voting.
- Enables single use-case chains e.g. [Statemint/e](learn-statemint.md) as asset parachains
- Optionally include payment of fees on a target network for requested operation.
- Provide methods for various asset transfer models:
  - **Remote Transfers**: control an account on a remote chain, allowing the local chain to have an
    address on the remote chain for receiving funds and to eventually transfer those funds it
    controls into other accounts on that remote chain.
  - **Asset Teleportation**: movement of an asset happens by destroying it on one side and creating
    a clone on the other side.
  - **Reserve Asset Transfer**: there may be two chains that want to nominate a third chain, where
    one includes a native asset that can be used as a reserve for that asset. Then, the derivative
    form of the asset on each of those chains would be fully backed, allowing the derivative asset
    to be exchanged for the underlying asset on the reserve chain backing it.

Let's review two of these example asset transfer use cases: **Asset Teleportation** and **Reserve
Asset Transfer**.

### Asset Teleportation

An asset teleport operation from a single source to a single destination.

![Diagram of the usage flow while teleporting assets](../assets/cross-consensus/xcm-asset-teleportation.png)

1. [InitiateTeleport](https://github.com/paritytech/xcm-format#initiateteleport)

The source gathers the assets to be teleported from the sending account and takes them out of the
circulating supply, taking note of the total amount of assets that was taken out.

2. [ReceiveTeleportedAsset](https://github.com/paritytech/xcm-format#receiveteleportedasset)

The source then creates an XCM instruction called `ReceiveTeleportedAssets` and puts the amount of
assets taken out of circulation and the receiving account as parameters to this instruction. It then
sends this instruction over to the destination, where it gets processed and new assets gets put back
into circulating supply accordingly.

3. [DepositAsset](https://github.com/paritytech/xcm-format#depositasset)

The destination then deposits the assets to the receiving account of the asset.

### Reserve Asset Transfer

When consensus systems do not have a established layer of trust over which they can transfer assets,
they can opt for a trusted 3rd entity to store the assets.

![xcm-reserve-asset-transfer](../assets/cross-consensus/xcm-reserve-asset-transfer.png)

1. [InitiateReserveWithdraw](https://github.com/paritytech/xcm-format#initiatereservewithdraw)

The source gathers the derivative assets to be transferred from the sending account and burns them,
taking note of the amount of derivatives that were burned.

2. [WithdrawAsset](https://github.com/paritytech/xcm-format#withdrawasset)

The source sends a WithdrawAsset instruction to the reserve, instructing the reserve to withdraw
assets equivalent to the amount of derivatives burned from the source's sovereign account.

3. [DepositReserveAsset](https://github.com/paritytech/xcm-format#depositreserveasset)

The reserve deposits the assets withdrawn from the previous step to the destination's sovereign
account, taking note of the amount of assets deposited.

4. [ReserveAssetDeposited](https://github.com/paritytech/xcm-format#reserveassetdeposited)

The reserve creates a ReserveAssetDeposited instruction with the amount of assets deposited to the
destination's sovereign account, and sends this instruction onwards to the destination. The
destination receives the instruction and processes it, minting the derivative assets as a result of
the process.

5. [DepositAsset](https://github.com/paritytech/xcm-format#depositasset)

The destination deposits the derivative assets minted to the receiving account.

### XCM Tech Stack

![xcm tech stack](../assets/cross-consensus-tech-stack.png)

XCM can be used to express the meaning of the messages over each of these three communication
channels.

## XCM v3 - What's new?

[XCM v3](https://github.com/paritytech/polkadot/pull/4097/) is currently in the process of being
approved and audited but is merged in the Polkadot codebase. The upgrade to XCM v3 will open the
doors to multi-hop, multi-network communications.

XCM v3 introduces some key features and additions to cross-consensus messaging, including:

1. **Programmability** - the ability to have **expectations** for messages, which allow for more
   comprehensive use cases, safe dispatches for version checking, branching, and NFT/Asset support.

2. **Functional Multichain Decomposition** - the ability to define mechanisms to cross-reference and
   perform actions on other chains on behalf of the origin chain (remote locking), context/id for
   these messages, and asset namespacing.

3. **Bridging** - introduces the concept of a universal location, which allows for a base reference
   for global consensus systems for multi-hop setups. This location is above the parent relay chain
   or other consensus systems like Ethereum or Bitcoin.

### Why does XCM v3 matter?

A core part of the vision that XCM v3 provides is improving communication between the chains to make
**system parachains** a reality. For example, the Polkadot relay chain handles more than just
parachain management and shared security - it handles user balances/assets, auctions, governance,
and staking. Ideally, the relay chain should be for what it's intended to be - a place for shared
security. System parachains can alleviate these core responsibilities from the relay chain but only
by using a standard format like XCM.

This is where system parachains come in, where each of these core responsibilities can be delegated
to a system parachain respectively.

:::info

XCM v3's bridging, functional multichain decomposition, and programmability upgrades are crucial to
bringing ecosystems together using a common communication abstraction.

:::

### XCM v3 Instruction Overview

To reflect the functionality above, XCM v3 introduced a multitude of new instructions to include within its
messages. This list isn't exhaustive, however contains the necessary instruction sets to showcase
the previously explained concepts of XCM v3.

:::note

Note that most of these instruction definitions came from the source code, which you may
[explore for more depth!](https://github.com/paritytech/polkadot/blob/master/xcm/src/v3/mod.rs)

:::

#### Programmability

These are the primary instructions that enable programmability and branching to be possible.
Branching in this context is the ability for errors and logic to be handled as needed when dealing
with a message.

- [`ExpectAsset(MultiAssets)`](https://github.com/paritytech/xcm-format/tree/master#expectassetmultiassets) -
  Checks if the Holding register has a specific amount of assets, throws an error if it doesn't.
- [`ExpectError(Option<(u32, Error)>)`](https://github.com/paritytech/xcm-format/tree/master#expecterroroptionu32-error) -
  Ensures the Error register contains the given error, and throws an error if it doesn't.
- [`ExpectOrigin(MultiLocation)`](https://github.com/paritytech/xcm-format/tree/master#expectoriginmultilocation) -
  Ensures the Origin register contains the expected origin, and throws an error if it doesn't.
- `QueryPallet` - Queries the existence of a particular pallet type.

- `ExpectPallet` - Ensure that a particular pallet with a particular version exists.

- `ReportTransactStatus(QueryResponseInfo)` - Send a `QueryResponse` message containing the value of
  the Transact Status Register to some destination.

- `ClearTransactStatus` - Set the Transact Status Register to its default, cleared, value.

#### Functional Multichain Decomposition

These instructions highlight the key instructions focused on Functional Multichain Decomposition.

- `LockAsset(MultiAsset, MultiLocation)` - Lock the locally held asset and prevent further transfer
  or withdrawal.

- `UnlockAsset(MultiAsset, MultiLocation)` - Remove the lock over `asset` on this chain and (if
  nothing else is preventing it) allow the asset to be transferred.

- `NoteUnlockable(MultiAsset, MultiLocation)` - Asset (`asset`) has been locked on the `origin`
  system and may not be transferred. It may only be unlocked with the receipt of the `UnlockAsset`
  instruction from this chain.

- `RequestUnlock(MultiAsset, MultiLocation)` - Send an `UnlockAsset` instruction to the `locker` for
  the given `asset`.

## XCVM (Cross-Consensus Virtual Machine)

At the core of XCM lies the Cross-Consensus Virtual Machine (XCVM). A “message” in XCM is an XCVM
program. The XCVM is a state machine, state is kept track in Registers.

It’s an ultra-high level non-Turing-complete computer whose instructions are designed to be roughly
at the same level as transactions. Messages are one or more XCM instructions. The program executes
until it either runs to the end or hits an error, at which point it finishes up and halts. An XCM
executor following the XCVM specification is provided by Parity, and it can be extended or
customized, or even ignored altogether and users can create their own construct that follows the
XCVM spec.

A _message_ in XCM is simply just a programme that runs on the `XCVM`: in other words, one or more
XCM instructions. To learn more about the XCVM and the XCM Format, see the latest
[blog post](https://medium.com/polkadot-network/xcm-the-cross-consensus-message-format-3b77b1373392)
by Dr. Gavin Wood.

XCM instructions might change a register, they might change the state of the consensus system or
both.

One example of such an instruction would be `TransferAsset` which is used to transfer an asset to
some other address on the remote system. It needs to be told which asset(s) to transfer and to
whom/where the asset is to be transferred.

```
enum Instruction {
    TransferAsset {
        assets: MultiAssets,
        beneficiary: MultiLocation,
    }
    /* snip */
}
```

A `MultiAsset` is a general identifier for an asset. It may represent both fungible and non-fungible
assets, and in the case of a fungible asset, it represents some defined amount of the asset.

A `MultiLocation` is a relative identifier, meaning that it can only be used to define the relative
path between two locations, and cannot generally be used to refer to a location universally. Much
like a relative file-system path will first begin with any "../" components used to ascend into to
the containing directory, followed by the directory names into which to descend, a `MultiLocation`
has two main parts to it: the number of times to ascend into the outer consensus from the local and
then an interior location within that outer consensus.

## Cross-Consensus Protocols (XCMP, VMP, HRMP)

With the XCM format established, common patterns for protocols of these messages are needed.
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} implements two message passing
protocols for acting on XCM messages between its constituent parachains.

### XCMP (Cross-Chain Message Passing)

:::caution

XCMP is currently under development and most cross-chain message passing uses HRMP channels for the
time being.

:::

XCM is related to XCMP in the same way that REST is related to RESTful.

_Cross-Chain Message Passing_ secure message passing between parachains. There are two variants:
_Direct_ and _Relayed_.

- With _Direct_, message data goes direct between parachains and is O(1) on the side of the
  Relay-chain and is very scalable.
- With _Relayed_, message data is passed via the Relay-chain, and piggy-backs over VMP. It is much
  less scalable, and parathreads in particular may not receive messages due to excessive queue
  growth.

Cross-chain transactions are resolved using a simple queuing mechanism based around a Merkle tree to
ensure fidelity. It is the task of the Relay Chain validators to move transactions on the output
queue of one parachain into the input queue of the destination parachain. However, only the
associated metadata is stored as a hash in the Relay Chain storage.

The input and output queue are sometimes referred to in the
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} codebase and associated documentation
as `ingress` and `egress` messages, respectively.

:::info

For detailed information about VMP see dedicated section in
[The Polkadot Parachain Host Implementers' Guide](https://paritytech.github.io/polkadot/book/messaging.html#horizontal-message-passing).

:::

### VMP (Vertical Message Passing)

_Vertical Message Passing_ message passing between the Relay-chain itself and a parachain. Message
data in both cases exists on the Relay-chain and are interpreted by the relay chain according to
[XCM](./learn-xcm.md/#cross-consensus-message-format-xcm) standards. This includes:

- #### UMP (Upward Message Passing)

  _Upward Message Passing_ message passing from a parachain to the Relay-chain.

- #### DMP (Downward Message Passing)
  _Downward Message Passing_ message passing from the Relay-chain to a parachain.

:::info

For detailed information about VMP see dedicated section in
[The Polkadot Parachain Host Implementers' Guide](https://paritytech.github.io/polkadot/book/messaging.html#vertical-message-passing).

:::

### HRMP (XCMP-Lite)

While XCMP is still being implemented, a stop-gap protocol (see definition below) known as
**Horizontal Relay-routed Message Passing (HRMP)** exists in its place. HRMP has the same interface
and functionality as XCMP but is much more demanding on resources since it stores all messages in
the Relay Chain storage. When XCMP has been implemented, HRMP is planned to be deprecated and phased
out in favor of it.

:::note

A stop-gap protocol is a temporary substitute for the functionality that is not fully complete.
While XCMP proper is still in development, HRMP is a working replacement.

:::

A tutorial on how to open an HRMP channel on a parachain can be found
[here](../build/build-hrmp-channels.md).

#### XCMP Design

- Cross-chain messages will _not_ be delivered to the Relay Chain.
- Cross-chain messages will be constrained to a maximum size specified in bytes.
- Parachains are allowed to block messages from other parachains, in which case the dispatching
  parachain would be aware of this block.
- Collator nodes are responsible for routing messages between chains.
- Collators produce a list of `egress` messages and will receive the `ingress` messages from other
  parachains.
- On each block, parachains are expected to route messages from some subset of all other parachains.
- When a collator produces a new block to hand off to a validator, it will collect the latest
  ingress queue information and process it.
- Validators will check the proof that the new candidate for the next parachain block includes the
  processing of the expected ingress messages to that parachain.

XCMP queues must be initiated by first opening a channel between two parachains. The channel is
identified by both the sender and recipient parachains, meaning that it's a one-way channel. A pair
of parachains can have at most establish two channels between them, one for sending messages to the
other chain and another for receiving messages. The channel will require a deposit in DOT to be
opened, which will get returned when the channel is closed.

#### Cross-Consensus Message Format (XCM)

For an updated and complete description of the cross-consensus message format please see the
[xcm-format repository on GitHub](https://github.com/paritytech/xcm-format).

#### The Anatomy of an XCMP Interaction

A smart contract that exists on parachain `A` will route a message to parachain `B` in which another
smart contract is called that makes a transfer of some assets within that chain.

Charlie executes the smart contract on parachain `A`, which initiates a new cross-chain message for
the destination of a smart contract on parachain `B`.

The collator node of parachain `A` will place this new cross-chain message into its outbound
messages queue, along with a `destination` and a `timestamp`.

The collator node of parachain `B` routinely pings all other collator nodes asking for new messages
(filtering by the `destination` field). When the collator of parachain `B` makes its next ping, it
will see this new message on parachain `A` and add it into its own inbound queue for processing into
the next block.

Validators for parachain `A` will also read the outbound queue and know the message. Validators for
parachain `B` will do the same. This is so that they will be able to verify the message transmission
happened.

When the collator of parachain `B` is building the next block in its chain, it will process the new
message in its inbound queue as well as any other messages it may have found/received.

During processing, the message will execute the smart contract on parachain `B` and complete the
asset transfer as intended.

The collator now hands this block to the validator, which itself will verify that this message was
processed. If the message was processed and all other aspects of the block are valid, the validator
will include this block for parachain `B` into the Relay Chain.

Check out our animated video below that explores how XCMP works.

<!-- Made with Adobe Animate and Canvas -->

<video
      controls="controls"  
      name="XCMP Animated Video" 
      width="560" height="315"
      src="https://storage.googleapis.com/w3f-tech-ed-contents/XCMP.mp4"> Sorry, your browser
doesn't support embedded videos. </video>

## Resources

- [Shawn Tabrizi: XCM - The Backbone Of A Multichain Future | Polkadot Decoded 2022](https://www.youtube.com/watch?v=cS8GvPGMLS0) -
  High level overview which should answer “What is XCM?

- [XCM: The Cross-Consensus Message Format](https://medium.com/polkadot-network/xcm-the-cross-consensus-message-format-3b77b1373392) -
  Detailed blog post by Dr. Gavin Wood about the XCM Format.

- [XCM Format specification](https://github.com/paritytech/xcm-format) - The best starting point for
  understanding the XCM API at a technical level.

- [Gavin Wood, Polkadot founder: XCM v3 | Polkadot Decoded 2022](https://www.youtube.com/watch?v=K2c6xrCoQOU&t=1196s) -
  High level overview of XCM and specifically the new features available in XCM v3.

- [XCMP Scheme](https://research.web3.foundation/en/latest/polkadot/XCMP.html) - Full technical
  description of cross-chain communication on the Web3 Foundation research wiki.

- [Messaging Overview](https://paritytech.github.io/polkadot/book/types/messages.html) - An overview
  of the messaging schemes from the Polkadot Parachain Host Implementor's guide.

- [Sub0 Online: Getting Started with XCM - Your First Cross Chain Messages](https://www.youtube.com/watch?v=5cgq5jOZx9g) -
  Code focused workshop on how XCM v1 works, and the core concepts of XCM.

- [XCM: Cross-Consensus Messaging Audit](https://blog.quarkslab.com/resources/2022-02-27-xcmv2-audit/21-12-908-REP.pdf) -
  Technical audit report by Quarkslab prepared for Parity.

- [XCM pallet code](https://github.com/paritytech/polkadot/blob/master/xcm/pallet-xcm/src/lib.rs) -
  The pallet that contains XCM logic from the Polkadot code repository
