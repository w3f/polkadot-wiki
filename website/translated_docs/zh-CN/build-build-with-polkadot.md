---
id: build-build-with-polkadot
title: Polkadot Builders Starter's Guide
sidebar_label: Polkadot Builders Starter's Guide
---

*This article is the up-to-date version of the blog post: [Everything you Need to Know to Prepare for Polkadot](https://medium.com/polkadot-network/everything-you-need-to-know-to-prepare-for-polkadot-32d08b929735).*

Polkadot is a blockchain protocol with two goals: providing **shared security** among all connected parachains and allowing all connected chains to **interoperate** through [ICMP](learn-interchain). With the advent of [PDKs](build-pdk) like Parity Substrate and Cumulus, the time it takes to develop and launch a new chain has dropped significantly. Whereas before it would take years to launch a new chain, now it may only take weeks or even days.

This guide will walk you through the steps you can take today to get started building your vision with Polkadot. It will explain the difference between a parachain and a smart contract (and why one may be better suited for your application over the other). It will lay out the resources that are available now and the ones that are coming soon so that you can get started creating your application in anticipation of the Polkadot mainnet launch later this year.

## Where are we now?

- Initial release: **End of 2019**
- Current PoC release: **PoC-4**
- Current testnet: **Alexander**
- Substrate: **1.0.0-rc**
- Cumulus: **Initial release: end of September 2019**
- ink!: **Pre-Alpha**

**What you need to know**: Polkadot is currently on the PoC-4 release with a running testnet named Alexander. The Alexander testnet has been live for longer than 3 months through the entire PoC-3 release cycle. Polkadot is being built with [implementations in various programming languages](learn-implementations) ranging from Rust to JavaScript. Currently the leading implementation is built in Rust and using the Substrate framework for developing blockchains. Substrate is a library that allows developers to more easily develop entire blockchains by building from a base layer including a networking protocol, consensus, and a Wasm interpreter. An in-development extension to Substrate called Cumulus will allow any Substrate built chain to connect to Polkadot and become a parachain. Substrate is nearing its public 1.0.0 release which will settle its API.

Substrate chains can have smart contracts by including the provided contracts runtime module from the SRML. The contracts module will allow smart contracts compiled to Wasm to be deployed on chain. To facilitate this, Parity has been developing an domain specific language called ink!.

Polkadot is planned to go live with an initial release at the end of 2019, depending on security audits and launch provisions outside of control of the team. Now that the tools have started to appear and stabilize, there has not been a better time to get your feet wet and start preparing for launch. But wait! Before you jump head-first into the code, you should think about the kind of decentralized application you want to make and understand the different paradigms available to developers who want to build for Polkadot.

## What is the difference between building a parachain and a smart contract?

Polkadot provides two ways for you to deploy your application: as a smart contract on an existing parachain, or as your own parachain. There are trade-offs when working with either one of these and reading this section will help you understand them.

Parachains are individual chains containing their own runtime logic that benefit from the shared security and the interchain messaging provided by the Polkadot relay chain. Parachains permit a high degree of flexibility and customization but will require more effort to create.

On the Polkadot mainnet, there will be one or more parachains that act as smart contract platforms. Smart contracts are executable programs that exist on only a single chain and are limited in complexity. Because they exist on a single chain, they have smooth interoperability with other smart contracts. However, they will always be constrained and limited by the inherent characteristics of their host chain.

If there is a need to have a large amount of control over the design and features of your application, a parachain is a better choice. Keep in mind, smart contracts can be used as a testing ground before later being turned into full-fledged parachains. Smart contract platforms will usually have more convenient tooling like IDEs to facilitate quick iterations. A smart contract MVP could be created to gauge user interest before putting in the fuller work to build out a parachain.

Parachains will grant the creators more space to build the monetary system of the chain from the ground up. They will allow for more succinct and efficient execution of complex logic than could ever be offered by a smart contract platform. Parachains also offer more in the form of governance and can perform complete upgrades in a less controversial way than the current process of hard-forks.

Some examples of features you can have on a parachain:

- Custom fee structure (for example, pay a flat fee for transactions or pay by byte)
- Custom inflation policy for the native token
- Treasury to be funded through transitions in your state function
- A governance mechanism that could manage a DAO that is responsible for allocating your on-chain treasury

![build 1](assets/build-1.png)

Parachains open possibilities to construct complex runtimes that would be too expensive to execute with smart contracts. Parachains in comparison lack a gas metering system entirely and could potentially be vulnerable to bugs that cause infinite loops (something that is prevented in smart contracts).

You may also decided to harness a combination of parachain and smart contract. If you have certain logic that requires loops and it cannot be removed, use the native parachain runtime to handle all complex logic and the smart contract to call iteration.

Most likely you’ve already realized that your application is better suited to be one or the other (or a hybrid of the two), but if you need a quick recap to digest the information, you can use this comparison chart as a cheat sheet:

![build 2](assets/build-2.png)

This guide now splits into two sections depending on whether you’ve decided on smart contract or parachain to build your application. Feel free to read both sections, or just the one that is applicable to you.

- [I want to build a parachain](#so-you-want-to-build-a-parachain)
- [I want to build a smart contract](#so-you-want-to-build-a-smart-contract)

## So you want to build a parachain

Now that you have determined that building a parachain is the right approach for your new project, the next step would be to decide which framework to use. Right now, Substrate is the only framework for developing parachains.

In the future, there will be many [implementations](learn-implementations.md) of the Polkadot runtime in various languages ranging through C++, Rust, Go, and JS.

### Get started with Substrate

As mentioned above, Substrate is the underlying framework on which Polkadot itself is built. It is a tool set for blockchain innovators and provides the necessary building blocks for constructing a chain. It includes a library of modular plug-ins from which you can compose more complex chain logic.

The best way to get started with Substrate is to explore the Substrate Development Hub, an online resource built and maintained by Parity Technologies.

> Visit the Substrate Developer Hub -> [**HERE**](https://docs.substrate.dev)

We recommend that you poke around in there to become familiar with the common patterns. Once you have a solid understanding, you can challenge yourself by progressing through the Substratekitties workshop then advancing to the TCR Dappchain tutorial.

### How to set up your parachain

After creating your chain logic with Substrate, you will be able to compile it down to a Wasm executable. This Wasm code blob will contain the entire state transition function of your chain.

Validators on the Polkadot relay chain will use this Wasm blob to validate all of the state transitions of your parachain.

In order for the Polkadot validators to stay up to date with the recent state transitions of your parachain, it will need some required infrastructure. The work described above is performed by your parachain’s collator node.

Substrate comes with its own networking layer built-in but it will not be a Polkadot-compatible collator node out-of-the-box.

For this, Parity Technologies has been developing an extension to Substrate called Cumulus, which will make it easy to turn any Substrate-built chain into a Polkadot-ready parachain.

#### Cumulus

The goal of [Cumulus](build-cumulus) is to be an extension of Substrate that will make any Substrate runtime compatible with Polkadot.

It handles the network compatibility overhead that any parachain would need to implement to be connected to Polkadot. This includes:

- Interchain message passing
- Out-of-the-box Collator node setup
- An embedded light client of the relay chain
- Polkadot block authorship compatibility
- Integrating Cumulus with your Substrate chain will port it into a parachain capable of working on Polkadot with minimal modification, possibly as little work as importing a crate and adding a single line.

Rob Habermeier, a co-founder of Polkadot, recently gave a talk at EthCC that gave the latest on the development of Cumulus, which you can watch below.

[![img](http://img.youtube.com/vi/thgtXq5YMOo/0.jpg)](https://www.youtube.com/watch?v=thgtXq5YMOo)

### How to include your parachain in polkadot

In order to include your parachain into the Polkadot network, you will need to acquire a parachain slot.

Parachain slots will be sold in open auctions, the mechanics of which can be found on the [parachain auction](learn-auction) page of the wiki.

## So you want to build a smart contract

The Polkadot relay chain itself will not support smart contracts but since Polkadot is a network of many heterogeneous blockchains, there will be parachains that do.

Already Parity Technologies has laid much of the groundwork for an out-of-the-box solution for parachains that want to include smart contract functionality. The Substrate [contract](https://github.com/paritytech/substrate/tree/master/srml/contract) module in the core SRML will support smart contracts that are compiled to Wasm.

In order to develop a smart contract that compiles to Wasm, an appropriate language is also needed. For this, Parity has been working on a domain specific language called [Ink](#ink).

One project that has announced intent to become a Polkadot parachain with support for smart contracts is [Edgeware](#edgeware). As the ecosystem matures, there is a high probability that more chains will come forward as smart contract enabled parachains.

Polkadot will also be compatible with preexisting smart contract platforms such as Ethereum and Tezos through bridges. This means that even work spent developing on these platforms today may be applicable to running on Polkadot in the future.

### Edgeware

Edgeware is a planned parachain for Polkadot which will allow for smart contracts. Along with other interesting innovations in governance and token distribution, it will likely be the first parachain that will connect to the Polkadot mainnet with smart contracts enabled. You can stay up to date with the project on their [website](https://edgewa.re).

### Ink

[Ink](https://github.com/paritytech/ink) is intended to be a new domain specific language for writing smart contracts in Rust that will compile down to Wasm code. As stated in the README, it is still in an experimental phase and missing a lot of the planned features but it is possible to start writing smart contracts with it today.

For the interested developers, they can get started writing smart contracts using Ink by studying the [examples](https://github.com/paritytech/ink/tree/master/examples) which have already been written. These can be used as guideposts to writing more complex logic which will be deployable on smart contract parachains.

Ink! has laid much of the groundwork for a new smart contract stack that is based on a Wasm virtual machine and compatible with Substrate chains.

Substrate includes a contract module that includes the core logic needed for a smart contract chain. Along these lines, ink! will be a smart contract language written in Rust that takes advantage of the already existing Rust tooling and support and will compile to Wasm.

## Deploying your smart contract

A smart contract is simply some code that exists at an address on a chain and is callable by external actors. The key part is that you actually have to put the code on chain before anyone can start executing it!

Deploying your smart contract on chain will vary slightly for whichever specific parachain you will use, but generally you will send a special transaction that will CREATE the smart contract on the ledger. You will likely need to pay an associated fee for the initialization logic and any storage that your contract consumes.

## Paying for your smart contract

Each platform will have a different way of paying for and maintaining the state of your smart contract.

The different patterns you may see for paying for your smart contract include:

- A transaction fee associated with deploying each transaction.
- A subscription model in which you pay some chain entity routinely for usage of the platform.
- An access token model for which you need to hold a threshold of native tokens to use the platform (EOS has something similar). Storage rent.
- Free trial or developer promotion.
- Most smart contract platforms use some form of gas to limit the number of operations a user can perform. Users will be required to pay for the gas upfront and will be refunded for what they don’t use.

You will need to consider the storage and complexity of your smart contract to ensure that gas usage stays within reasonable bounds. Storage will likely be expensive for whichever smart contract platform you use, so it is necessary to keep as much data off-chain as possible. You may consider using IPFS or Storj to keep the data and submitting only the content address on chain.

### It's still early

It’s still very early for smart contracts on Polkadot and the development is only now stabilizing. We are actively producing content to help developers get up to speed and will maintain the wiki with the latest resources. You should also keep up to date with the following links:

- [Edgeware](https://edgewa.re).
- [ink!](https://github.com/paritytech/ink). (Keep an eye out for content on the wiki tab.)
- [Substrate contracts module](https://github.com/paritytech/substrate).

## Conclusion

This guide has given you a mental model and shown the requisite resources to help you determine and start building your project as a parachain or smart contract today. Even though the tooling is still maturing, the advantage of being early will be the familiarity and head start on your project, allowing you to innovate and create something truly new.

If you have interesting ideas for parachains or smart contracts on Polkadot feel free to drop in to the [Polkadot Watercooler](https://riot.im/app/#/room/#polkadot-watercooler:matrix.org) to talk about them. Developers may be interested in joining the [Polkadot Beginners Lounge](https://riot.im/app/#/room/#polkadotnoobs:matrix.org) or [Substrate Technical](https://riot.im/app/#/room/#substrate-technical:matrix.org) to ask their questions. As always, keep up to date with Polkadot by following the [social channels](https://wiki.polkadot.network/en/latest/community/). Good luck!