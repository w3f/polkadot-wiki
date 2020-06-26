---
id: learn-architecture
title: Arsitektur
sidebar_label: Arsitektur
---

Polkadot adalah multichain heterogen dengan keamanan scalable dan protokol interoperabilitas.

## Relay Chain

The Relay Chain is the central chain of Polkadot. All validators of Polkadot are staked on the Relay Chain in DOTs and validate for the Relay Chain. The Relay Chain is composed of a small number of transaction types that include ways to interact with the governance mechanism, parachain auctions, and participating in NPoS. Transactions on the Relay Chain will likely be priced higher than they will be on parachains. This is because most of the computational work is expected to be delegated to the parachains, which have differing implementations and features.

## [Parachains](build-deploy-parachains)

Most of the computation that happens across the Polkadot network as a whole will be delegated to specific parachain implementations that handle various use cases. Polkadot places no constraints over what parachains are able to do besides that they must be able to generate a proof that can be validated by the validators assigned to the parachain. Some parachains may be DApp specific, others may focus on specific features like privacy or scalability -- still others might be experimental architectures that are not necessarily blockchain in nature.

## Keadaan bersama

Polkadot has a shared state between the Relay Chain and all of the connected parachains. If the Relay Chain must revert for any reason, then all of the parachains would also revert. This is to ensure that the validity of the entire system can persist and no individual part is corruptible.

The shared state makes it so that the trust assumptions when using Polkadot parachains are only those of the Relay Chain validator set, and no other. Since the validator set on the Relay Chain is expected to be secure with a large amount of stake put up to back it, it is desirable for parachains to benefit from this security.

## Serial papan tulis

For a video overview of the architecture of Polkadot watch the video below for the whiteboard interview with W3F researcher Alistair Stewart: <iframe width="560" height="315" src="https://www.youtube.com/embed/xBfC6uTjvbM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>
