---
id: build-smart-contracts
title: Smart Contracts
sidebar_label: Smart Contracts
description: How smart contracts play their role in the Polkadot ecosystem.
slug: ../build-smart-contracts
---

The Polkadot Relay Chain will not natively support smart contracts, however,
**parachains on Polkadot will support smart contracts**.

## What is the difference between developing a smart contract versus a parachain?

### Layer of Abstraction

When you write a smart contract, you are creating the instructions that will be deployed and
associated to a specific chain address.

In comparison, a runtime module is the entire logic of a chain's state transitions (what's called a
state transition function).

Smart contracts must consciously implement upgradeability while parachains will have the ability to
swap out their code entirely through a root command or via the governance pallet.

When you build a smart contract, it will eventually be deployed to a target chain with its own
environment. Parachains allow the developer to declare the environment of their own chain, even
allowing others to write smart contracts for it.

### Gas Fees

Smart contracts must find a way to limit their own execution, or else full nodes are vulnerable to
DOS attacks. An infinite loop in a smart contract, for example, could consume the computational
resources of an entire chain, preventing others from using it. The
[halting problem](https://en.wikipedia.org/wiki/Halting_problem) shows that with a powerful enough
language, it is impossible to know ahead of time whether or not a program will ever cease execution.
Some platforms, such as Bitcoin, get around this constraint by providing a very restricted scripting
language. Others, such as Ethereum, "charge" the smart contract "gas" for the rights to execute
their code. If a smart contract does get into a state where execution will never halt, it eventually
runs out of gas, ceases execution, and any state transition that the smart contract would have made is
rolled back. Polkadot uses a _weight-fee model_ and not a _gas-metering model_.

Parachains can implement arbitrarily powerful programming languages and contain no gas notion for their
own native logic. This means that some functionality is easier to implement for the
developer, but there are some constructs, such as a loop without a terminating
condition, which should _never_ be implemented. Leaving certain logic, such as complex loops that
could run indefinitely, to a non-smart contract layer, or even trying to eliminate it, will often be a
wiser choice. Parachains try to be proactive, while smart contract
platforms are event-driven.

## Substrate Contracts

Substrate offers a built-in
[contract pallet](https://substrate.dev/rustdocs/latest/pallet_contracts/index.html);
as time goes on, more parachains will support [WebAssembly](../learn/learn-wasm.md) smart contracts.
Additionally, there is the
[EVM Pallet](https://substrate.dev/docs/en/knowledgebase/smart-contracts/evm-pallet), which allows
a parachain to implement the Ethereum Virtual Machine, thereby supporting almost direct ports of
Ethereum contracts.

A video version of the recap of the smart contract situation on Polkadot and Kusama is available
on the [Polkadot YouTube channel](https://www.youtube.com/watch?v=fKHkFBXaUxQ).

### Storage Rent: Deprecated

`pallet_contracts` was initially designed to combat unbounded state growth by charging contracts for
the state they consume but has since been deprecated.

See the associated [pull request](https://github.com/paritytech/substrate/pull/9669) for more details.

### Resources

[When should I build a Substrate runtime versus a Substrate smart contract](https://stackoverflow.com/a/56041305)?
This post answers the question more technically of when a developer might choose to develop a
runtime versus a smart contract.

Here is the list of current resources available to developers who want to get started writing smart
contracts to deploy on parachains based on Substrate.

- [ink!](https://github.com/paritytech/ink) - Parity's ink to write smart contracts.
- [Substrate Contracts Workshop](https://substrate.dev/substrate-contracts-workshop/) - Walks you
  through the basics of writing and deploying an ERC20 token using `ink!`.

## Examples of Smart Contracts in `ink!`

Collected below are some community examples of smart contracts in `ink!`. **Are you working on a
smart contract example? Ask us to add it to this page!**

- [Ownable](https://github.com/JesseAbram/foRust/): Port of the OpenZeppelin `Ownable` contract.
- [OpenBrush](https://docs.openbrush.io/): an `ink!` library providing standard contracts based on
  [PSP](https://github.com/w3f/PSPs) with useful contracts and macros for building.
