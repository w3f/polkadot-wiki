---
id: learn-PRE
title: Polkadot Runtime Environment (PRE)
sidebar_label: Polkadot Runtime Environment (PRE)
---

The Polkadot Runtime Environment is an important component of the Polkadot protocol. It consists of the networking, consensus and Wasm VM subsystems, and acts as the lower layers of the stack underlying the Polkadot runtime and the runtimes of the parachains. Loosely, the Polkadot RE can be thought of as synonymous with a virtual machine running the Polkadot relay chain (although as stated below, there is a clear separation between the chain logic itself, and the PRE on which it runs).

The components of the Polkadot RE are:

- Network Interactions
- State storage and the Storage Trie
- Consensus Engine
- Wasm Virtual Machine (VM)

The runtime, which is defined as the code implementing the logic of the chain, is decoupled from the Polkadot RE. The separation of the two components allows the runtime to be easily upgradable without needing to upgrade the Polkadot RE.

The Polkadot runtime (as well as the runtimes of the parachains) must be compiled WebAssembly (Wasm) blobs. The Polkadot runtime "plugs-in" to the Polkadot RE and will be swappable through the governance mechanism.

The image below is taken from the [slide deck](https://slides.com/paritytech/paritysubstrate#/8) that Gavin Wood presented on Substrate and demonstrates visually the 4 layers of the Polkadot stack.

![PRE](assets/PRE.png)

## Resources

- [Polkadot Runtime Environment Protocol Specification](https://github.com/w3f/polkadot-spec) - Incubator for the PRE spec, including tests.
