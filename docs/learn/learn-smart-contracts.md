---
title: Smart Contracts on Polkadot
description: Learn about Ethereum-compatible smart contracts n Polkadot
---


Smart contracts are self-executing, sandboxed programs that run deterministically on a blockchain, enabling decentralized applications (dApps) without intermediaries. Polkadot natively supports smart contracts written in Ethereum-compatible languages like Solidity or Vyper, as well as Rust. Additionally, the underlying Polkadot Virtual Machine allows any smart contract that compiles to RISC-V to run on its network.

!!!info "Smart Contracts Documentation"
    For detailed guides on writing and deploying smart contracts on Polkadot, refer to the official [Polkadot Developer Docs](https://docs.polkadot.com/develop/). Note that PolkaVM is under active development.

## Smart Contracts vs. Rollups

Polkadot offers two primary ways to build decentralized applications:

- **Smart Contracts** - Deployed on existing blockchains, they are easier to develop but have limited flexibility in terms of governance and consensus.
- **Rollups** - Independent blockchains connected to and secured by Polkadot, allowing full customization of business logic, consensus, and governance. They are also known as _parachains_.

For a deeper comparison, read:  
[Smart Contracts vs. Rollup Development](https://paritytech.github.io/polkadot-sdk/master/polkadot_sdk_docs/reference_docs/runtime_vs_smart_contract/index.html)

## Smart Contracts on Polkadot

Polkadot smart contracts will reside on the **Asset Hub**. When we talk about smart contracts on Polkadot, we're specifically referring to those deployed on the Asset Hub parachain, not the relay chain itself, whose main function stays securing parachain blocks and keeping the shared state. Smart contract functionality on the Hub is made possible thanks to the **pallet-revive**, an upgraded version of the original `pallet-contracts`. Unlike its predecessor (which used Wasm), `pallet-revive` executes contracts compiled to **Polkadot Virtual Machine (PVM)** bytecode.

### Key Differences:
- **pallet-contracts**: Uses **wasmi** (a WebAssembly interpreter).
- **pallet-revive**: Executes **PVM bytecode**, optimized for RISC-V architecture.

## Wasm vs. PVM

While WebAssembly (Wasm) is widely used in blockchain, it has limitations:
    
- **Non-deterministic execution** - The slight variations between Wasm binaries present a hurdle for blockchain protocols, which must achieve an identical state for consensus. While tools within the Polkadot ecosystem exist to address this, it remains an underlying limitation.
- **High computational cost** - Translating Wasm bytecode to machine code is computationally expensive. Wasm instructions are stack-based, while most hardware architecture is register-based with finite number of registers. Register allocation is a known [NP problem](https://en.wikipedia.org/wiki/Register_allocation#Common_problems_raised_in_register_allocation). 

The Polkadot Virtual Machine (PVM) solves both of these problems by using the RISC-V architecture, which is a very common and well-supported standard.


###  RISC-V & PVM
 **RISC-V** is an **Instruction Set Architecture (ISA)**, not a bytecode, making it closer to native CPU execution.

PolkaVM (Parity's implementation of PVM) leverages RISC-V's register-based architecture, where operations use a finite set of CPU registers to pass arguments. This design mirrors modern hardware, enabling near 1:1 translation to native machine code. Unlike x86-64 (which suffers from register scarcity), PolkaVM's optimized register count simplifies compilation—reducing the complex register allocation problem to straightforward mapping. This is key to PolkaVM's rapid compilation speeds.

Initially, smart contracts will be executed by the PolkaVM interpreter within the runtime itself. A later update will deliver a full PolkaVM JIT (Just in Time) compiler running inside the client with future optimizations planned.

## EVM vs. PVM

It is important to note that while Polkadot will support Ethereum-compatible smart contracts (written in Solidity), it is incorrect to say that Polkadot is EVM-compatible, as no Ethereum Virtual machine implementations present in Polkadot's architecture including __pallet-revive__. There are multiple reasons why Polkadot chose to deviate from traditional EVM support and decided to run smart contracts on PolkaVM. 

Like Wasm, EVM is stack-based, resulting in slower execution time. EVM also uses a 256-bit word size, requiring all arithmetic operations to handle these large numbers. This design choice impacts performance, as each operation must be broken down into multiple native machine instructions. PolkaVM improves efficiency using a 64-bit word size that matches modern hardware capabilities. However, when compiling Solidity contracts through YUL (via Revive), operations remain at 256-bit precision since YUL operates at too low a level to optimize integer types automatically. EVM code can only be interpreted, while PVM code can be interpreted and compiled, which is optimal for larger multi-contract projects. EVM is also limited to Solidity, Vyper, and other languages explicitly developed for EVM, while PolkaVM supports any language that can be compiled to RISC-V, including Rust and C++. 

Some parachains support EVM smart contracts. 

## Revive: Solidity to PolkaVM Recompiler

**Revive** is the overarching project for compiling Solidity contracts to PVM bytecode. It includes:
- **resolc**: The Solidity-to-PVM compiler.
- **solc**: The Ethereum Solidity compiler (used internally).

### Compilation Flow:
1. **Solidity (.sol)** → Compiled via `solc` to **YUL** intermediate representation. YUL code is usually then compiled to EVM, however, not on Polkadot.
2. **YUL IR** → Processed by Revive into **LLVM** intermediate representation.
3. **LLVM IR** → Optimized into **RISC-V ELF object**.
4. **PVM Linker** → Generates **PVM blob** (executable bytecode).
5. **Deployment** → PVM blob + metadata uploaded to `pallet-revive`.

This workflow ensures **deterministic**, **efficient** execution on Polkadot.

## Learn more

To learn more about development of  Solidity contracts for PolkaVM, refer to the official [Polkadot developer documentation](https://docs.polkadot.com/develop/). 

## Resources
- [Polkadot Developer Docs](https://docs.polkadot.com/develop/)
- [Revive Compiler](https://github.com/revive)
- [Smart contracts roadmap discussion](https://forum.polkadot.network/t/contracts-on-assethub-roadmap/9513)