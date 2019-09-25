---
id: learn-architecture
title: Architecture
sidebar_label: Architecture
---

Polkadot is a heterogeneous multichain with scalable security and an interoperability protocol.

## Relay-chain

The relay-chain is the central chain of Polkadot. All validators of Polkadot are staked on the relay-chain in DOTs and validate for the relay-chain. The relay-chain is composed of a small amount of transaction types which include ways to interact with the governance mechanism, parachain auctions, and participating in NPoS. Transaction on the relay-chain will likely be priced higher than they will be on parachains. This is because most of the computational work is expected to be delegated to the parachains which have differing implementations and features.

## [Parachains](build-deploy-parachains)

Most of the computation that happens across the Polkadot network as a whole will be delegated to specific parachain implementations that handle various use cases. Polkadot places no constraints over what parachains are able to do besides that they must be able to generate a proof that can be validated by the validators assigned to the parachain. Some parachains may be DApp specific, others may focus on specific features like privacy or scalability -- still others might be experimental architectures that are not necessarily blockchain in nature.

## Shared state

Polkadot has a shared state between the relay-chain and all of the connected parachains. If the relay-chain must revert for any reason, then all of the parachains would also revert. This is to ensure that the validity of the entire system can persist and no individual part is corruptible.

The shared state makes it so that the trust assumptions when using Polkadot parachains are only those of the relay-chain validator set, and no other. Since the validator set on the relay-chain is expected to be secure with a large amount of stake put up to back it, it is desirable for parachains to benefit from this security.

## Whiteboard Series

For a video overview of the architecture of Polkadot watch the video below for the whiteboard interview with W3F researcher Alistair Stewart: <iframe width="560" height="315" src="https://www.youtube.com/embed/xBfC6uTjvbM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>