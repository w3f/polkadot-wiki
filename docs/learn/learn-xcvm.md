---
id: learn-xcvm
title: XCM Virtual Machine (XCVM) & XCM Executor
sidebar_label: XCM Virtual Machine (XCVM)
description: Learn about the design of the XCM executor, and how the XCM Virtual machine works.
keywords: [cross-consensus, XCM, XCMP, interoperability, communication]
slug: ../learn-xcvm
---

At the core of XCM lies the Cross-Consensus Virtual Machine (XCVM). A “message” in XCM is an XCVM
program, referred to as an **"XCM"** or **"XCMs"** for multiple messages. The XCVM is a
register-based state machine. The state is tracked in domain-specific registers that hold
information that is used and mutated along the execution of a particular message. Most of the XCM format comprises
these registers and the instructions used to compose XCVM programs.

The XCVM is an ultra-high-level non-Turing-complete computer whose instructions are designed to be
roughly at the same level as transactions in terms of definition. Messages are one or more XCM
instructions executed in order by the XCVM. An XCM is executed until it either runs to the end or
hits an error, at which point it finishes up and halts.

The primary implementation of the XCVM is the
[`xcm-executor`](https://github.com/paritytech/polkadot/tree/26b0c4f6273190f4538b24939a56b6a0b51a344c/xcm/xcm-executor).
It follows the XCVM specification provided by Parity. It's engineered to be extendable, providing
maximum customizability when configuring XCM. Because the `xcm-executor` is just an implementation
of XCVM, it's entirely possible to create another implementation if desired.

## XCMs are XCVM Programs

A cross consensus message (XCM) is just a program that runs on the `XCVM`: in other words, one or
more XCM instructions that are executed by the `xcm-executor`. To learn more about the XCVM and the
XCM format, see the latest
[blog post on XCM v3](https://medium.com/polkadot-network/xcm-part-iii-execution-and-error-management-ceb8155dd166)
by Dr. Gavin Wood.

XCM instructions might change a register, the state of the consensus system, or both. Depending on
the program's goal, whether it is to teleport assets from one chain to another or call a smart
contract on another chain, XCMs usually require changes to the registers before any changes to the
consensus system can be made.

## XCM Executor & Configuration

The XCM Executor's implementation centers around a core piece: the XCM configuration. Each instance
of the Executor must have a valid configuration, which specifies a multitude of options on how a
chain may treat incoming messages via
[Barriers](https://github.com/paritytech/polkadot/blob/26b0c4f6273190f4538b24939a56b6a0b51a344c/xcm/xcm-executor/src/config.rs#L52),
calculate weight for a message via the
[Weigher](https://github.com/paritytech/polkadot/blob/26b0c4f6273190f4538b24939a56b6a0b51a344c/xcm/xcm-executor/src/config.rs#L55),
how much weight to purchase via the
[Trader](https://github.com/paritytech/polkadot/blob/26b0c4f6273190f4538b24939a56b6a0b51a344c/xcm/xcm-executor/src/config.rs#L58),
[configure fees](https://github.com/paritytech/polkadot/blob/26b0c4f6273190f4538b24939a56b6a0b51a344c/xcm/xcm-executor/src/config.rs#L89),
how to
[convert origins](https://github.com/paritytech/polkadot/blob/26b0c4f6273190f4538b24939a56b6a0b51a344c/xcm/xcm-executor/src/config.rs#L40),
and more.

## Cross Consensus Message (XCM) Anatomy & Flow

An XCM is made up of a list of instructions that are executed in order. There are four different
kinds of XCM instructions:

1. **Instruction** - Results in a state change in the local consensus system or some state change.
2. **Trusted Indication** - Tells the XCVM, or the Executor, that some action has been done before
   already - meaning, this action is now trusted and can be acted on, i.e., in a teleport scenario.
3. **Information** - Provides additional information about a particular origin, usually the result
   of a query, i.e., a `QueryResponse` instruction.
4. **System Notification** - Typically used in the context of when an HRMP channel is being opened,
   closed, or accepted.

Typically, an XCM takes the following path through the XCVM:

1.  Instructions within an XCM are read one-by-one by the XCVM. An XCM may old one or more
    instructions.
2.  The instruction is executed. This means that the current values of the _XCVM registers_, the
    _instruction type_, and the _instruction operands_ are all used to execute some operation, which
    might result in some registers changing their value, or in an error being thrown, which would
    halt execution.
3.  Each subsequent instruction within the XCM is read until the end of the message has been
    reached.

### Example Register: The Holding Register

There are many instructions that depend on the Holding register. The Holding register is an XCVM
register that provides a place for any assets that are in an intermediary state to be held until
they are deposited to the beneficiary. They require an instruction to place assets within and
another to withdraw them. The simplest example of this occurring is the `DepositAsset` instruction,
which in its Rust form looks like this:

```rust
enum Instruction {
    DepositAsset {
        assets: MultiAssetFilter,
        beneficiary: MultiLocation,
    },
    /* snip */
}
```

This instruction specifies how many assets are going to be withdrawn (useful for fee calculation),
which assets to filter from the Holding register, and the beneficiary (the recipient of) the assets.
It is very common for instructions to remove and place assets into the Holding register when
transacting between chains.

### Example: TransferAsset

An example below illustrates how a chain may transfer assets locally, or locally on a remote chain
(as part of another instruction) using an XCM. In this message, the `TransferAsset` instruction is
defined with two parameters: `assets`, which are the assets to be transferred, and the
`beneficiary`, whoever will be the sole beneficiary of these assets. More complex instructions,
especially those which perform actions that target a location other than the interpreting consensus
system may make use of XCVM registers.

```rust
enum Instruction {
    TransferAsset {
        assets: MultiAssets,
        beneficiary: MultiLocation,
    }
    /* snip */
}
```

- A `MultiAsset` is a general identifier for an asset. It may represent both fungible and
  non-fungible assets, and in the case of a fungible asset, it represents some defined amount of the
  asset.

- A `MultiLocation` is a relative identifier, meaning that it can only be used to define the the
  relative path between two locations, and cannot generally be used to refer to a location
  universally.

`TransferAsset` is one of the many instructions that can be executed within an XCM. For more
information, please read [XCM Instructions in the wiki](./learn-xcm-instructions.md).

## Locations in XCM

XCM's abstract nature allows for locations to be relatively abstract notions that point to where but
also _to who_ a particular action may affect. The `MulitLocation` type is what XCM uses to define
these locations. A `MultiLocation` is a relative identifier that defines a **relative** path into
some state-bearing consensus system.

It is used to define the relative path between two locations, and cannot generally be used to refer
to a location universally. It is very much akin to how a **relative** filesystem path works and is
dependent on the context on which consensus system the message is being sent from, and what
consensus system it is being sent to be executed.

![XCM MultiLocation](../assets/cross-consensus/multilocation.png)

`MultiLocation` has two primary fields:

- A series of paths, called `Junctions`, which define an interior portion of state to descend into
  it (sometimes called a "sub-consensus" system, such as a smart contract or pallet). An interior
  location may also be used to refer to a Junction, used in the context of "a parachain is an
  interior location of the relay chain", or how a UTXO is interior to Bitcoin's consensus.
- The number of parent junctions at the beginning of a `MultiLocation`'s formation - in other words,
  the number of parent consensus systems above it.

There are a number of various `Junction` variants that may be used to describe a particular
location - whether it's a 32 byte account, a Substrate pallet, or a pluralistic body.

## Simulating XCVM using the xcm-simulator

Within the Polkadot repository exists the
[`xcm-simulator`](https://github.com/paritytech/polkadot/tree/master/xcm/xcm-simulator), which
allows developers to experiment with building, executing, and simulating various XCM use scenarios.
