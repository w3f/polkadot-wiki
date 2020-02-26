---
id: learn-polkadot-host
title: Polkadot Host (PH)
sidebar_label: Polkadot Host (PH)
---

The Polkadot Host is an important component of the Polkadot protocol. It consists of the networking, consensus and Wasm VM subsystems, and acts as the lower layers of the stack underlying the Polkadot runtime and the runtimes of the parachains. Loosely, the Polkadot Host can be thought of as synonymous with a virtual machine running the Polkadot Relay Chain (although as stated below, there is a clear separation between the chain logic itself, and the Polkadot Host on which it runs).

The components of the Polkadot Host are:

- The networking layer that facilitates network interactions.
- State storage and the storage trie along with the database layer.
- Consensus engine.
- Wasm interpreter and virtual machine.

The runtime, which is defined as the code implementing the logic of the chain, is decoupled from the Polkadot Host. The separation of the two components allows the runtime to be easily upgradable without needing to upgrade the Polkadot Host.

The Polkadot runtime (as well as the runtimes of the parachains) must be compiled to WebAssembly (Wasm) blobs. The Polkadot runtime "plugs-in" to the Polkadot Host and will be swappable through the governance mechanism.

The image below is taken from the [slide deck](https://slides.com/paritytech/paritysubstrate#/8) that Gavin Wood presented on Substrate and demonstrates visually the 4 layers of the Polkadot stack.

![Polkadot Host](assets/PH.png)

## Resources

- [Polkadot Host Protocol Specification](https://github.com/w3f/polkadot-spec) - Incubator for the Polkadot Host spec, including tests.
