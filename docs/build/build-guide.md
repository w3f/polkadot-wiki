---
id: build-guide
title: Builders Starter's Guide
sidebar_label: Builders Starter's Guide
description: Start building with Polkadot/Kusama.
keywords: [build, how to build, develop, parachain, smart contract]
slug: ../build-build-with-polkadot
---

Polkadot is a blockchain protocol with two goals: providing **shared security** among all connected
parachains and allowing all connected chains to **interoperate** by using
[XCM](../learn/learn-xcm.md). With the advent of
[PDKs](../build/build-parachains.md##parachain-development-kit-(pdk)>) like Parity Substrate and Cumulus,
the time it takes to develop and launch a new chain has dropped significantly. While before it would
take years to launch a new chain, now it may only take weeks or even days.

This guide will walk you through the steps you can take today to get started building your vision
with {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}. It will explain the difference
between a parachain and a smart contract (and why one may be better suited for your application over
the other).

### Polkadot Ecosystem Networks

- Mainnet: **Polkadot**
- Canary network: **Kusama**
  - [Kusama](https://kusama.network/) is a value-bearing canary network that gets features before
    Polkadot does. _Expect Chaos_.
- Official testnets:
  - **Westend** - Functionality equal to the current Polkadot mainnet, with possible next-generation
    testing of features from time to time that will eventually migrate onto Polkadot. Perma-testnet
    (is not reset back to genesis block).
  - **Canvas** - Wasm based Smart Contract enabled testnet, primarily for `ink!` development.
  - **Rococo** - Parachains and XCM testnet. Occasionally reset (started over again with a new
    genesis block).

{{ polkadot: Polkadot mainnet has been running since May 2020 :polkadot }}{{ kusama: Kusama mainnet has been
running since August 2019 :kusama }} and has [implementations in various programming languages](../learn/learn-implementations.md)
ranging from Rust to JavaScript. Currently, the leading implementation is built in Rust and built using
the Substrate framework.

Tooling is rapidly evolving to interact with the network; there are so many ways to get started!

But before you jump head-first into the code, you should consider the _kind_ of decentralized
application you want to make and understand the different paradigms available to developers who want
to build on {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}.

## What is the difference between building a parachain, a parathread, or a smart contract?

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} provides several ways for you to
deploy your application: as a smart contract on an existing parachain, as your own parachain, or as
a parathread. There are trade-offs when working with each of these and reading this section will
help you understand them.

### Parachains & Parathreads

Parachains are _parallel_ chains containing their own runtime logic and benefit from the shared
security and the cross-chain messaging provided by the {{ polkadot: Polkadot :polkadot }}{{ kusama:
Kusama :kusama }} Relay Chain. Parachains permit a high degree of flexibility and customization but require
more effort to create and maintain over time.

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
hours (this makes the most sense if the data is useful to other players in the
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} ecosystem too).

Most likely you’ve already realized that your application is better suited to be one or the other
(or a hybrid of them both), but if you need a quick recap to digest the information, you can use
this comparison chart as a cheat sheet:

![build 2](../assets/build-2.png)

:::note The image above does not include parathreads

As we mentioned before, all the benefits of parachains apply just as well to parathreads.
Parathreads, however, _are_ cheaper to deploy and maintain. So if they had a column on the table
above, it would look like the parachain column with "Ease of deployment" and "Maintenance overhead"
changed to `+`.

:::

---

### Smart Contracts

A smart contract is simply some code that exists at an address on a chain and is callable by
external actors. The key part is that you actually have to put the code on chain before anyone can
start executing it!

Deploying your smart contract on chain will vary slightly for whichever specific parachain you will
use, but generally you will send a special transaction that will create the smart contract on the
ledger. You will likely need to pay an associated fee for the initialization logic and any storage
that your contract consumes.

On {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, there will be parachains that act
as smart contract platforms. Smart contracts are executable programs that exist on only a single
chain and are limited in complexity. Because they exist on a single chain, they can have smooth
interoperability with other smart contracts on the same chain. However, they will always be
constrained and limited by the inherent characteristics of their host chain.

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
using the listed options on the [decentralized storage](build-storage.md) page to keep the data and
submitting only the content address on chain.

---

### Building a parachain or parathread

Please see the [parachain development guide](build-parachains.md) for how to get started on building
a parachain or parathread.

### Building a smart contract

Please see the [smart contracts guide](build-smart-contracts.md) for how to get started on building
a smart contract.
