---
id: learn-wasm
title: WebAssembly (Wasm)
sidebar_label: WebAssembly (Wasm)
description: Learn how Wasm plays a role in Polkadot's runtime.
slug: ../learn-wasm
---

WebAssembly is used in Polkadot and Substrate as the compilation target for the runtime.

## What is WebAssembly?

WebAssembly, shortened to simply _Wasm_, is a binary instruction format for a stack-based virtual
machine. Wasm is designed as a portable target for compilation of high-level languages like
C/C++/Rust, enabling deployment on the web for client and server applications.

## Why WebAssembly?

WebAssembly is a platform agnostic binary format, meaning that it will run the same instructions
across whatever machine it is operating on. Blockchains need determinacy in order to have reliable
state transition updates across all nodes in the peer-to-peer network without forcing every peer to
run the same exact hardware. Wasm is a nice fit for reliability among the possibly diverse set of
machines. Wasm is both efficient and fast. The efficiency means that it can be uploaded onto the
chain as a blob of code without causing too much state bloat while keeping its ability to execute at
near-native speeds.

### Forkless Upgrades

By using Wasm in Substrate, the framework powering Polkadot, Kusama, and many connecting chains, the
chains are given the ability to upgrade their runtime logic without hard forking. Hard forking is a
standard method of upgrading a blockchain that is slow, inefficient, and error prone due to the
levels of offline coordination required, and thus, the propensity to bundle many upgrades into one
large-scale event. By deploying Wasm on-chain and having nodes auto-enact the new logic at a certain
block height, upgrades can be small, isolated, and very specific.

## Resources

- [WebAssembly.org](https://webassembly.org/) - WebAssembly homepage that contains a link to the
  spec.
- [Wasmi](https://github.com/paritytech/Wasmi) - WebAssembly interpreter written in Rust.
- [Parity Wasm](https://github.com/paritytech/parity-Wasm) - WebAssembly
  serialization/deserialization in Rust.
- [Wasm utils](https://github.com/paritytech/Wasm-utils) - Collection of Wasm utilities used in
  Parity and Wasm contract development.
