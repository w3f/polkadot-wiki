---
id: build-guide
title: Polkadot Builders Starter's Guide
sidebar_label: Polkadot Builders Starter's Guide
description: Start building with Polkadot.
slug: ../build-build-with-polkadot
---

Polkadot is a blockchain protocol with two goals: providing **shared security** among all connected
parachains and allowing all connected chains to **interoperate** by using
[XCM](../learn/learn-cross-consensus.md). With the advent of [PDKs](<build-pdk#parachain-development-kit-pdk>) like Parity Substrate and
Cumulus, the time it takes to develop and launch a new chain has dropped significantly. While before
it would take years to launch a new chain, now it may only take weeks or even days.

This guide will walk you through the steps you can take today to get started building your vision
with Polkadot. It will explain the difference between a parachain and a smart contract (and why one
may be better suited for your application over the other).

## Polkadot Ecosystem Networks

- Mainnet: **Polkadot**
- Canary network: **Kusama**
  - [Kusama](https://kusama.network/) is a value-bearing canary network that gets features before
    Polkadot does... *expect chaos*...
- Official testnets:
  - **Westend** - Functionality equal to the current Polkadot mainnet, with possible next-generation
    testing of features from time to time that will eventually migrate onto Polkadot. Perma-testnet (is not reset back to genesis block).
  - **Canvas** - Wasm based Smart Contract enabled testnet, primarily for `ink!` development.
  - **Rococo** - Parachains and XCM testnet. Occasionally reset (started over again with a new genesis block).

Polkadot mainnet has been running since May 2020 and has
[implementations in various programming languages](../learn/learn-implementations.md) ranging from Rust to
JavaScript. Currently, the leading implementation is built in Rust and built using the Substrate
framework.

Tooling is rapidly evolving to interact with the network; there are so many ways to get started!

But before you jump head-first into the code, you should consider the *kind* of decentralized
application you want to make and understand the different paradigms available to developers who want
to build on Polkadot.

## What is the difference between building a parachain, a parathread, or a smart contract?

Polkadot provides several ways for you to deploy your application: as a smart contract on an existing
parachain, as your own parachain, or as a parathread. There are trade-offs when working with each of
these and reading this section will help you understand them.

### Parachains & Parathreads

Parachains are "parallel" chains containing their own runtime logic and benefit from the shared
security and the cross-chain messaging provided by the Polkadot Relay Chain. Parachains permit a
high degree of flexibility and customization but require more effort to create and maintain over
time.

Parathreads are like parachains and enable the developer to have lower-level control of the logic of
their application. The main difference between the two is economic since parathreads will be much
less expensive to secure than a parachain. The lower costs of parathreads are due to the fact that
parathreads will only produce a block when they need to, unlike parachains, which have secured a
slot to produce a block at every block of the Relay Chain. When building a parathread, you will use
the same tools (like PDKs) and you get all of the benefits of building a parachain, without the
drawback of the cost.

Parachains grant the creators more space to build the monetary system and other aspects of the chain
from the ground up. They will allow for more succinct and efficient execution of complex logic than
could ever be offered by a smart contract platform. Parachains also offer more flexibility in the
form of governance and can perform complete upgrades in a less controversial way than the current
process of hard-forks.

Some examples of features you can have on a parachain or parathread:

- Custom fee structure (for example, pay a flat fee for transactions or pay per byte).
- Custom monetary policy for the native token and local economy.
- Treasury to be funded through transitions in your state function.
- A governance mechanism that could manage a DAO that is responsible for allocating your on-chain
  treasury.

![build 1](../assets/build-1.png)

Parachains open possibilities to construct complex runtime logic that would be too expensive to
execute with smart contracts. However, unlike smart contracts, parachains lack a mandatory gas
metering system entirely and could potentially be vulnerable to bugs that cause infinite loops
(something that is prevented by design in smart contracts). This vulnerability is mitigated by the
weight system that is implemented in Substrate -- although it places more of a burden on the
developer of the parachain to properly perform benchmarks.

You may also decide to harness a combination of parachain, parathread, and smart contract. If you
have certain logic that requires loops and it cannot be removed, use the native parachain runtime to
handle all complex logic and the smart contract to call iteration. If you require off-chain data
from an oracle, you may want to use a parathread as an oracle feed that only triggers once every 24
hours (this makes the most sense if the data is useful to other players in the Polkadot ecosystem
too).

Most likely you’ve already realized that your application is better suited to be one or the other
(or a hybrid of them both), but if you need a quick recap to digest the information, you can use
this comparison chart as a cheat sheet:

![build 2](../assets/build-2.png)

> **Note:** The image above does not include parathreads, but as we mentioned before all the
> benefits of parachains apply just as well to parathreads. Parathreads, however, *are* cheaper to
> deploy and maintain. So if they had a column on the table above, it would look like the parachain
> column with "Ease of deployment" and "Maintenance overhead" changed to `+`.

### Smart Contracts

A smart contract is simply some code that exists at an address on a chain and is callable by
external actors. The key part is that you actually have to put the code on chain before anyone can
start executing it!

Deploying your smart contract on chain will vary slightly for whichever specific parachain you will
use, but generally you will send a special transaction that will create the smart contract on the
ledger. You will likely need to pay an associated fee for the initialization logic and any storage
that your contract consumes.

On the Polkadot mainnet, there will be parachains that act as smart contract platforms. Smart
contracts are executable programs that exist on only a single chain and are limited in complexity.
Because they exist on a single chain, they can have smooth interoperability with other smart
contracts on the same chain. However, they will always be constrained and limited by the inherent
characteristics of their host chain.

If there is a need to have a large amount of control over the design and features of your
application, a parachain is a better choice. Keep in mind, smart contracts can be used as a testing
ground before later being turned into full-fledged parachains. Smart contract platforms will usually
have convenient tooling like IDEs to facilitate quick iterations. A smart contract MVP could be
created to gauge user interest before putting in the work to build out a parachain.

Each platform will have a different way of paying for and maintaining the state of your smart
contract. The different patterns you may see for paying for your smart contract include:

- A transaction fee associated with deploying each transaction.
- A subscription model in which you pay some chain entity routinely for the usage of the platform.
- An access token model for which you need to hold a threshold of native tokens to use the platform
  (EOS has something similar). Storage rent.
- Free trial or developer promotion.
- Most smart contract platforms use some form of gas to limit the number of operations a user can
  perform. Users will be required to pay for the gas upfront and will be refunded for what they
  don’t use.

You will need to consider the storage and complexity of your smart contract to ensure that gas usage
stays within reasonable bounds. Storage will likely be expensive for whichever smart contract
platform you use, so it is necessary to keep as much data off-chain as possible. You may consider
using [IPFS](https://ipfs.io/) or [Storj](https://storj.io/) to keep the data and submitting only
the content address on chain.

---

This guide now splits into two sections depending on whether you’ve decided on a smart contract or a
parachain to build your application. Feel free to read both sections or just the one that is
applicable to you.

- [I want to build a parachain or parathread!](#so-you-want-to-build-a-parachain-or-parathread)
- [I want to build a smart contract!](#so-you-want-to-build-a-smart-contract)

## So you want to build a parachain or parathread...

Now that you have determined that building a parachain or parathread is the right approach for your
new project, the next step is to decide which framework to use. Frameworks for building a parachain
or parathread are known as parachain development kits ([PDKs](<build-parachains.md##parachain-development-kit-(PDK)>). Currently, the only
PDK available is Substrate and Cumulus from Parity Technologies.

In the future, there will be many different PDKs available in different programming languages, just
like there are multiple [implementations of the Polkadot Host](../learn/learn-implementations.md).

> **Call to Action:** Do you want to build a Parachain Development Kit from scratch? The Web3
> Foundation is giving grants to teams who are doing this, learn more and apply on the
> [W3F grants page](https://grants.web3.foundation).

### Get started with Substrate

Substrate is the underlying framework on which Polkadot itself is built. It is a toolset for
blockchain innovators that provides the necessary building blocks for constructing a chain. It
includes a library of modular runtime plug-ins from which you can compose your chain logic.

The best way to get started with Substrate is to explore the
[Substrate Developer Hub](https://substrate.dev/docs/en/), an online resource built and maintained
by [Parity Technologies](https://parity.io).

### How to set up your parachain

After creating your chain runtime logic with Substrate, you will be able to compile it down to a
Wasm executable. This Wasm code blob will contain the entire state transition function of your
chain, and is what you will need to deploy your project to Polkadot as either a parachain or
parathread.

Validators on Polkadot will use the submitted Wasm code to validate the state transitions of your
chain or thread, but doing this requires some additional infrastructure. A validator needs some way
to stay up to date with the most recent state transitions, since Polkadot nodes will not be required
to also be nodes of your chain.

This is where the collator node comes into play. A collator is a maintainer of your parachain and
performs the critical action of producing new block candidates for your chain and passing them to
Polkadot validators for inclusion in the Polkadot Relay Chain.

Substrate comes with its own networking layer built-in but unfortunately only supports solo chains
(that is, chains that do not connect to the Relay Chain). However, there is the Cumulus extension
that includes a collator node and allows for your Substrate-built logic to be compatible with
Polkadot as either a parachain or parathread.

#### Cumulus

The goal of [Cumulus](build-parachains.md###cumulus) is to be an extension of Substrate that will make any
Substrate runtime compatible with Polkadot.

It handles the network compatibility overhead that any parachain would need to implement to be
connected to Polkadot. This includes:

- Cross-chain message passing (XCMP).
- Out-of-the-box Collator node setup.
- An embedded full client of the Relay Chain.
- Polkadot block authorship compatibility.

Integrating Cumulus with your Substrate chain will port it into a parachain capable of working on
Polkadot with minimal modification, possibly as little work as importing a crate and adding a few
lines!

### How to deploy your parachain or parathread in Polkadot

#### Parachain

In order to include your parachain into the Polkadot network, you will need to acquire a parachain
slot.

Parachain slots will be sold in open auctions, the mechanics of which can be found on the
{{ polkadot: [parachain auction](../learn/learn-auction.md) :polkadot }}
{{ kusama: [parachain auction](../learn/mirror-learn-auction.md) :kusama }} page of the wiki.

#### Parathread

Parathreads will not require a parachain slot, so you will not need to engage in the candle auction
mechanism. Instead, you will be able to register your parathread code to the Relay Chain for a fee
and from then be able to start participating in the per-block auctions for inclusion of your state
transition into the Relay Chain.

For more information on how parathread per-block auctions work, see the more detailed
{{ polkadot: [parathread](../learn/learn-parathreads.md) :polkadot }}
{{ kusama: [parathread](../learn/mirror-learn-parathreads.md) :kusama }} page.

## So you want to build a smart contract...

The Polkadot Relay Chain itself will not support smart contracts. However, since the parachains that
connect to Polkadot can support arbitrary state transitions, they can support smart contracts.

Substrate presently supports smart contracts out-of-the-box in two ways:

- The EVM pallet offered by [Frontier][].
- The [Contracts pallet][substrate contracts] in the FRAME library for Wasm based contracts.

### Frontier EVM Contracts

[Frontier][] is the suite of tools that enables a Substrate chain to run Ethereum contacts
(EVM) natively with the same API/RPC interface Ethereum exposes on Substrate. Ethereum Addresses
can also be mapped directly to and from Substrate's SS58 scheme from existing accounts.

### Contracts Pallet

The experience of deploying to an EVM-based chain may be more familiar to developers that have
written smart contracts before. However, the Contracts pallet makes some notable improvements to the
design of the EVM:

1. **Wasm**. The Contracts pallet uses WebAssembly as its compilation target. Any language that
   compiles to Wasm can potentially be used to write smart contracts. Nevertheless, it is better to have a dedicated domain-specific language, and for that reason Parity offers the [ink!](#ink) language.

2. **Rent**. Contracts must pay rent or else hold a deposit suitably large enough in order to
   justify its existence on-chain. When a contract does not uphold this, it may create what's called
   a *tombstone* which is a reference to the contract. In some conditions, the contract will be
   deleted outright along with its storage if it does not maintain these requirements.

3. **Caching**. Contracts are cached by default and therefore means they only need to be deployed
   once and afterward be instantiated as many times as you want. This helps to keep the storage load
   on the chain down to the minimum. On top of this, when a contract is no longer being used and the
   *existential deposit* is drained, the code will be erased from storage (known as reaping).

### Ink

[ink!](https://github.com/paritytech/ink) is a domain specific language for writing smart contracts
in Rust and compiles to Wasm code. As it states in its README, it is still in an experimental phase
so brave developers should be aware that they might have a bumpy - but workable - development
experience. There are some projects that have built projects in ink! with a decent level of
complexity such as Plasm's [Plasma contracts][plasm plasma], so it is mature enough to start
building interesting things.

For interested developers, they can get started writing smart contracts using ink! by studying the
[examples](https://github.com/paritytech/ink/tree/master/examples) that were already written. These
can be used as guideposts to writing more complex logic that will be deployable on smart contract
parachains.

ink! has laid much of the groundwork for a new smart contract stack that is based on a Wasm virtual
machine and compatible with Substrate chains.

### It is still early

It is still very early for smart contracts on Polkadot and the development is only now stabilizing.
We are actively producing content to help developers get up to speed and will maintain the wiki with
the latest resources. You should also keep up to date with the following links:

#### Parity Tech

- [ink!](https://github.com/paritytech/ink)
- [Substrate contracts pallet](https://github.com/paritytech/substrate/tree/master/frame/contracts)

#### Parachains

- [Edgeware][]
- [Moonbeam][]
- [Astar](https://astar.network/)
- [Acala](https://acala.network/)
- [Phala](https://phala.network)

There are many smart contract platforms being built with the intent of becoming a parachain on the Polkadot and/or Kusama networks. A community created and maintained list of different smart contract platforms building on Polkadot can be found at [PolkaProjects](https://www.polkaproject.com/#/projects?cateID=1&tagID=6).

### Edgeware

[Edgeware][edgeware] is a permissionless smart contract platform. It is an option for smart contract developers and want to deploy to a live environment. Users can deploy both EVM and WASM smart contracts on Edgeware. Edgeware intends to connect to Polkadot and Kusama as a smart contract parachain.

Try deploying a smart contract on Edgeware by following their [documentation][edgeware contracts documentation].

### Moonbeam

[Moonbeam][] is another project that is planning to deploy to Polkadot as a parachain and will
support Ethereum compatible smart contracts. Since Moonbeam uses [Frontier][], an interoperability layer with existing Ethereum tooling, it will support all applications that are written to target the EVM environment with little friction.

[Moonriver](https://docs.moonbeam.network/networks/moonriver/), a companion network to Moonbeam, launched as a parachain on Kusama. Parachain functionality is live, and features are being incrementally released. The final phase of the launch will include EVM functionality and balance transfers.

Try deploying a smart contract to Moonbeam by following their [documentation][moonbeam docs].

### Astar

[Astar](https://astar.network/) (formerly Plasm) is built on Substrate as a smart contract platform and intends to integrate with Polkadot as a parachain. [Shiden](https://shiden.astar.network/) is the sister network to Astar, is currently live on Kusama, and supports EVM, WASM, and Layer 2 solutions. Astar aims to house all layer 2 scaling solutions and support all layer 2 protocols through the [OVM](https://docs.astar.network/learn/layer2/optimistic-virtual-machine) (Optimistic Virtual Machine).

Try deploying an Ethereum or ink! smart contract by following their [documentation](https://docs.astar.network/build/smart-contracts).

### Acala

[Acala](https://acala.network/) is a decentralized finance consortium and DeFi infrastructure chain delivering a set of protocols to serve as the DeFi hub on Polkadot. [Karura](https://acala.network/karura), Acala's canary network, is live as a parachain on Kusama. Interested teams are now able to deploy DApps and smart contracts on Karura's platform. Acala is also implementing the [Acala EVM](https://wiki.acala.network/learn/acala-evm/why-acala-evm).

Try deploying an Acala EVM smart contract by following their [documentation](https://wiki.acala.network/build/development-guide/smart-contracts).

### Phala

[Phala](https://phala.network) is a privacy-preserving cloud compute platform and aims to provide strong guarantees of confidentiality as a cross-chain platform. As a smart contract platform, Phala will enable the use of confidential smart contracts on Polkadot. [Khala](https://phala.network/en/khala) is Phala's canary network and is live as a parachain on Kusama.

Try deploying a confidential smart contract by following their [documentation](https://wiki.phala.network/en-us/docs/developer/your-first-confidential-contract/).

## Conclusion

This guide has given you a mental model and shown the requisite resources to help you determine and
start building your project as a parachain or smart contract today. Even though the tooling is still
maturing, the advantage of being early will be the familiarity and head start on your project,
allowing you to innovate and create something truly new.

If you have interesting ideas for parachains or smart contracts on Polkadot feel free to drop into
the [Polkadot Watercooler](https://matrix.to/#/#polkadot-watercooler:matrix.org) to talk about them.
Developers may be interested in joining the
[Polkadot Beginners Lounge](https://matrix.to/#/#polkadotnoobs:matrix.org) or
[Substrate Technical](https://matrix.to/#/#substrate-technical:matrix.org) to ask their questions.
As always, keep up to date with Polkadot and Kusama by following the
[social channels](../general/community.md).

Good luck!

[edgeware]: https://edgewa.re
[edgeware documentation]: https://docs.edgewa.re/
[edgeware contracts documentation]: https://main.edgeware.wiki/development/develop/smart-contracts
[plasm plasma]: https://github.com/staketechnologies/Plasm
[moonbeam]: https://moonbeam.network
[moonbeam docs]: https://docs.moonbeam.network/
[frontier]: (https://github.com/paritytech/frontier)
