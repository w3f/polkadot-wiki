---
id: learn-xcvm
title: XCM Virtual Machine (XCVM) & XCM Executor
sidebar_label: XCM Virtual Machine (XCVM)
description: Learn about the design of the XCM executor, and how the XCM Virtual machine works.
keywords: [cross-consensus, XCM, XCMP, interoperability, communication]
slug: ../learn-xcvm
---

At the core of XCM lies the Cross-Consensus Virtual Machine (XCVM). A “message” in XCM is an XCVM
program. The XCVM is a register-based state machine, state is kept track in domain-specific
registers. The majority of the XCM format comprises of these registers, and the instructions that
are used to compose XCVM programs.

The XCVM is an ultra-high level non-Turing-complete computer whose instructions are designed to be
roughly at the same level as transactions in terms of definition. Messages are one or more XCM
instructions, executed in order by the XCVM. An XCM is executed until it either runs to the end or
hits an error, at which point it finishes up and halts.

The primary implementation of the XCVM is the
[`xcm-executor](https://github.com/paritytech/polkadot/tree/master/xcm/xcm-executor). It follows the
XCVM specification provided by Parity. It's engineered to be extendable, providing maximum
customizability when configuring XCM. Because the `xcm-executor` is just an implementation of XCVM,
it's entirely possible to create another implementation if desired.

## XCMs are XCVM Programs

A cross consensus message, (XCM), is simply just a programme that runs on the `XCVM`: in other
words, one or more XCM instructions that are executed by the `xcm-executor`. To learn more about the
XCVM and the XCM Format, see the latest
[blog post](https://medium.com/polkadot-network/xcm-the-cross-consensus-message-format-3b77b1373392)
by Dr. Gavin Wood.

XCM instructions might change a register, they might change the state of the consensus system or
both. Depending on the goal of the program, whether it is to teleport assets from one chain to
another, or call a smart contract on another chain, XCMs usually require changes to the registers
before any changes to the consensus system can be made.

## XCM Executor & Configuration

The XCM Executor's implementation centers around a core piece: the XCM configuration. Each instance
of the executor must have a valid configuration, which specifies a multitude of options on how a
chain may treat incoming messages, calculate fees, where to route messages, how to convert origins,
and more.

## XCM Message Anatomy & Flow

One example of such an instruction would be `TransferAsset` which is used to transfer an asset to
some other address on the remote system. It needs to be told which asset(s) to transfer and to
whom/where the asset is to be transferred.

There are four different kinds of XCM instructions:

1. **Instruction** - Results in a state change in the local consensus system, or some state change.
2. **Trusted Indication** - Tells the XCVM, or the executor, that some action has been done before
   already - meaning, this action is now trusted and can be acted on, i.e in a teleport scenario.
3. **Information** - Provides additional information about a particular origin, usually the result
   of a query, i.e a `QueryResponse` instruction.
4. **System Notification** - Typically used in the context of when an HRMP channel is being opened,
   closed, or accepted.

Typically, an XCM takes the following path:

1. The XCM Executor, and XCVM in general, is very much analogous to a CPU. It has various registers,
   which instructions usually modify.
2. The resulting values from these registers are used later in the transfer. An example of a common
   register used in many instructions is the `Holding` register, which places assets in a holding
   until fulfilled on the destination chain.
3. The resulting instructions modify the holding register as needed and execute extrinsics on the
   destination chain to perform the state change. The executor is able to convert incoming
   instructions into FRAME compatible origins, which enable for the actual state changes to take
   place.

An example below illustrates how a chain may transfer assets locally using an XCM. In this message,
the `TransferAsset` instruction is defined with two parameters: `assets`, which are the assets to be
transferred, and the `beneficiary`, whomever will be the sole beneficiary of these assets.

```
enum Instruction {
    TransferAsset {
        assets: MultiAssets,
        beneficiary: MultiLocation,
    }
    /* snip */
}
```

### Key XCM Terminology

- A `MultiAsset` is a general identifier for an asset. It may represent both fungible and
  non-fungible assets, and in the case of a fungible asset, it represents some defined amount of the
  asset.

- A `MultiLocation` is a relative identifier, meaning that it can only be used to define the
  relative path between two locations, and cannot generally be used to refer to a location
  universally. Much like a relative file-system path will first begin with any "../" components used
  to ascend into to the containing directory, followed by the directory names into which to descend,
  a `MultiLocation` has two main parts to it: the number of times to ascend into the outer consensus
  from the local and then an interior location within that outer consensus.

## Simulating XCVM using the xcm-simulator

Within the Polkadot repository exists the
[`xcm-simulator`](https://github.com/paritytech/polkadot/tree/master/xcm/xcm-simulator), which
allows developers to experiment with building, executing, and simulate various XCM use scenarios.
