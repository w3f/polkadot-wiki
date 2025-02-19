---
id: learn-xcm-docs-overview-architecture
title: The XCM Architecture
sidebar_label: Architecture
description: The XCM Architecture.
keywords: [xcm, cross-consensus messaging, xcvm, architecture]
slug: ../overview-architecture
---

# Architecture

XCM is a [format](https://github.com/paritytech/xcm-format). Anyone can create an implementation of
the XCVM to interpret said format.

Parity Technologies maintains a Rust implementation, primarily for
[Substrate](https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk/#substrate)-based chains in the [Polkadot](https://polkadot.network/)
ecosystem. It is this implementation that we use throughout this documentation.

All the code lives in the
[Polkadot repo](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot/xcm). The main
structure is as follows:

- [XCM](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot/xcm/src): Defines the
  fundamental constructs used in XCM and an enum with all the instructions available.
- [Executor](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot/xcm/xcm-executor/src):
  Implements the XCVM, capable of executing XCMs. Highly configurable.
- [Builder](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot/xcm/xcm-builder/src):
  Offers common configuration building blocks for the executor.
- [Pallet](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot/xcm/pallet-xcm/src):
  FRAME pallet that provides extrinsics for interacting with the XCM executor, as well as specific
  XCM programs, such as teleports and reserve asset transfers.
- [Simulator](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot/xcm/xcm-simulator/example/src):
  Allows for testing of XCM programs.

## Executor

The XCM executor is responsible for interpreting and executing XCM messages. It is the core engine
that processes and handles XCM instructions, ensuring that they are carried out accurately and in
the correct order. The XCM executor follows the Cross-Consensus Virtual Machine (XCVM) specification
and can be extended, customized, or even replaced with an alternative construct that adheres to the
XCVM spec.

## Builder

The XCM executor is highly configurable. XCM builder provides building blocks people can use to
configure their executor according to their needs. Many of these building blocks will be explained
in the [Config Deep Dive](../executor_config/config.md) chapter. They cover common use-cases but are
not meant to be exhaustive. It's very easy to build your own building blocks for your specific
configuration when needed, using these as examples.

## Pallet

The XCM pallet is a [FRAME](https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk/#frame) pallet
that can be used to execute XCMs locally or send them to a different system. It also has extrinsics
for specific use cases such as teleporting assets or doing reserve asset transfers, which we'll talk
about later. It's the glue between XCM and FRAME, which is highly used in the Polkadot ecosystem.

## Simulator

The simulator allows for testing XCMs fast, without needing to boot up several different nodes in a
network, or test in production. It's a very useful tool which we'll use throughout this document to
build and test different XCMs.
