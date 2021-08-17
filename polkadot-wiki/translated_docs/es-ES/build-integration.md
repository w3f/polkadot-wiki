---
id: build-integration
title: Polkadot Integration Guide
sidebar_label: Integration Initiation
---

Welcome to the Polkadot integration guide. This guide will provide all the information you need to get started on your integration. The target audiences for this article are wallets and custodians, but it will be useful to any infrastructure provider such as validators or chain indexers.

## Structure

The guide focuses on Polkadot and Kusama, but the principles will apply to parachains and other Substrate-based chains. The guide contains four sections:

1. [Protocol Info](build-protocol-info): The entry point to the guide. Please read it carefully as it provides information about Polkadot that differentiates it from other blockchains. Use this page to check your assumptions.
1. [Node Management](build-node-management): This page will guide you to starting and monitoring a node.
1. [Node Interaction](build-node-interaction): This page will teach you to interact with your node via multiple RPC tooling options.
1. [Transaction Construction](build-transaction-construction): A guide to transaction construction, signing, decoding, and serialization using several available tools.

## Recommendation

Each page in the guide, especially the Node Interaction and Transaction Construction pages, tries to list several options to accomplish the same thing. We want you to know your options and choose the solution that is best for you.

That said, the easiest path to integration is almost always to use [Substrate API Sidecar](https://github.com/paritytech/substrate-api-sidecar) to interact with your node and [TxWrapper](https://github.com/paritytech/txwrapper) to construct and sign transactions. Parity and Web3 Foundation will be able to provide the best support if you use these tools.

If your team would like support, join some of our [community channels](community) or contact support@polkadot.network.
