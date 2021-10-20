---
id: build-substrate
title: Substrate Connect
sidebar_label: Substrate Connect
description: Information about Substrate Connect.
slug: ../build-substrate
---

[Substrate Connect](https://substrate.io/substrate-connect/) is a JavaScript library and 
browser extension that builds on the Polkadot-JS API to enable developers to build application 
specific light clients for Substrate chains. 

## Replacing RPC Nodes With Light Clients

Application developers no longer need to rely on single RPC nodes to allow end-users to interact 
with their applications. 

### Blockchain User Interfaces are still Centralized

The communication between a standard user interface (UI) and a network node is through an RPC 
protocol. Generally, the UI will showcase what the information that is available on the node, and 
this is done through two main approaches:

1. User Controlled Nodes: The UI connects to a node client that the user has installed on their 
   machine.
   - These nodes are secure, but installation and maintanence of these nodes tends to be an inconvenience.
2. Publicy-Accesible Nodes: The UI connects to a third-party-owned publicy-accesible node client.
   - While these nodes are more popular in their usage as they are convenient to use, they are centralized 
     and insecure.

There is now a new paradigm: instead of specifying a centralized RPC node, developers just need to 
specify the blockchain's [chain specification](https://docs.substrate.io/v3/runtime/chain-specs/) for 
their application to synchronize with the chain.

### Node Bundled with User Interface

The UI connects to a node client that is directly integrated inside of it: secure, convenient, and 
decentralized. This is accomplished through Substrate connect uses a 
[smoldot](https://github.com/paritytech/smoldot/) Wasm light client 
to securely connect to the blockchain network without relying on specific third parties.

Application developers can now run a Substrate light client in any NodeJS environment 
([@substrate/connect](https://www.npmjs.com/package/@substrate/connect), as well as 
in-browser applications and extensions, Electron apps, IOT devices, and mobile phones.

#### Two key features

1. Ready-to-use light clients for Substrate chains: Currenlty, Substrate Connect supports Polkadot, 
   Kusama, Westend and Rococo; because light clients are part of the overall Substrate framework, they 
   are available for Substrate-based blockchains.
2. Bundling light-clients of multiple chains: The 
   [browser extension](https://www.npmjs.com/package/@substrate/connect-extension-protocol) allows 
   end-users to interact with applications connected to multiple blockchains or connect their own 
   blockchains to applications that support it.

## Resources

- [What is a light client and why you should care?](https://www.parity.io/blog/what-is-a-light-client/)
- [Introducing Substrate Connect: Browser-Based Light Clients for Connecting to Substrate Chains](https://www.parity.io/blog/introducing-substrate-connect)
- [Substrate Connect GitHub Repo](https://github.com/paritytech/substrate-connect/tree/master/projects/extension)
- [Substrate Connect Docs](https://docs.substrate.io/v3/integration/substrate-connect/)
- 