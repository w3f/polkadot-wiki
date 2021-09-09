---
id: build-smart-contracts
title: Smart Contracts
sidebar_label: Smart Contracts
---

The Polkadot Relay Chain will not support smart contracts natively. However, parachains on Polkadot will support smart contracts. There are already announced projects such as [Edgeware](https://edgewa.re), and thanks to the Substrate built-in [contract pallet](https://crates.parity.io/pallet_contracts/index.html), it is likely that more parachains will support this feature.

Additionally, there is the EVM pallet which lets a parachain implement the Ethereum Virtual Machine, thereby supporting almost direct ports of Ethereum contracts. Some of the projects using this approach are [Moonbeam](https://moonbeam.network/) and [Frontier](https://github.com/paritytech/frontier).

A video version of the recap of the smart contract situation on Polkadot and Kusama is available [here](https://www.youtube.com/watch?v=fKHkFBXaUxQ).

## Resources

Here is the list of current resources available to developers who want to get started writing smart contracts to deploy on parachains based on Substrate.

- [ink!](https://github.com/paritytech/ink) - Parity's ink to write smart contracts.
- [Substrate Contracts Workshop](https://substrate.dev/substrate-contracts-workshop/#/) - Walks you through the basics of writing and deploying an ERC20 token using `ink!`.

## Examples

Collected below are some community examples of smart contracts in `ink!`. Are you working on a smart contract example? Ask us to add it to this page!

- [Ownable](https://github.com/JesseAbram/foRust/) - Port of the OpenZeppelin `Ownable` contract.

## Storage Rent

Storage rent limits the footprint that a contract can have on the blockchain's storage.

A contract deployed to the chain produces a code hash from which new instances of the chain can be created, but there is currently no rent applied to the code hash itself. The rent applies only to instances of this contract which have their own _contract accounts_. Deploying a code hash currently has a one-time byte-fee applied to the transaction, but no recurring cost.

An account of a contract instance is charged proportionally to the amount of storage its account uses. When a contract's balance goes below a defined limit, the contract's account is turned into a "tombstone" (a hash of the contract's current state) and its storage is cleaned up. A tombstone contract can be restored by providing the data that was cleaned up when it became a tombstone as well as any additional funds needed to keep the contract alive. This fee will retroactively apply to missed rent periods.

Block producers or regular users of the chain can "poke" a smart contract if they think it ran out of funds for rent. This will initiate the cleanup process and the _poker_ will get a finder's fee.

## What is the difference between developing a smart contract versus a parachain?

### Layer of Abstraction

When you write a smart contract you are creating the instructions that will be deployed and associated to a specific chain address.

In comparison, a runtime module is the entire logic of a chain's state transitions (what's called a state transition function).

Smart contracts must consciously implement upgradeability while parachains will have the ability to swap out their code entirely through a root command or via the governance pallet.

When you build a smart contract, it will eventually be deployed to a target chain with its own environment. Parachains allow the developer to declare the environment of their own chain, even allowing others to write smart contracts for it.

### Gas Fees

Smart contracts must find a way to limit their own execution, or else full nodes are vulnerable to DOS attacks. An infinite loop in a smart contract, for example, could consume the computational resources of an entire chain, preventing others from using it. The [halting problem](https://en.wikipedia.org/wiki/Halting_problem) shows that with a powerful enough language, it is impossible to know ahead of time whether or not a program will ever cease execution. Some platforms, such as Bitcoin, get around this constraint by providing a very restricted scripting language. Others, such as Ethereum, "charge" the smart contract "gas" for the rights to execute their code. If a smart contract does get into a state where execution will never halt, it eventually runs out of gas, ceases execution, and any state transition that would have been made by the smart contract is rolled back.

Parachains can implement arbitrarily powerful programming languages and also contain no notion of gas for their own native logic. This means that some functionality is easier to implement for the developer, but it also means there are some constructs, such as a loop without a terminating condition, which should _never_ be implemented. Leaving certain logic, such as complex loops that could possibly run indefinitely, to a non-smart contract layer, or even trying to eliminate it entirely, will often be a wiser choice.

## Resources

- [When should I build a Substrate runtime versus a Substrate smart contract](https://stackoverflow.com/a/56041305) - From a technical standpoint answers the question of when a developer might choose to develop a runtime versus a smart contract.
