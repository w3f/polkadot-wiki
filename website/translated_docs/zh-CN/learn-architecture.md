---
id: learn-architecture
title: 架构
sidebar_label: 架构
---

Polkadot 采用共享安全性和可互操作的异构多链结构。

## 中继链 (Relay Chain)

中继链是 Polkadot 的中心链。所有的验证者都在中继链上抵押DOT并验证中继链。中继链仅由相对少量的交易类型构成，包括和治理机制互交，平行链拍卖，参与NPo'S。中继链是可以被设计成具有最精简的功能的 - 例如，中继链并不支持智能合约。中继链的主要只能是负责协调整个系统，包括各个平行链。其他的具体工作应该交予实现不同功能的平行链来执行。

## [Parachain](learn-parachains) and [Parathread](learn-parathreads) Slots

Polkadot can support a number of execution slots. These slots are like cores on a computer's processor (a modern laptop's processor may have eight cores, for example). Each one of these cores can run one process at a time. Polkadot allots these slots using two subscription models: parachains and parathreads. Parachains have a dedicated slot (core) for their chain and are like a process that runs constantly. Parathreads share slots amongst a group, and are thus more like processes that need to be woken up and run less frequently.

Most of the computation that happens across the Polkadot network as a whole will be delegated to specific parachain or parathread implementations that handle various use cases. Polkadot places no constraints over what parachains are able to do besides that they must be able to generate a proof that can be validated by the validators assigned to the parachain. This proof verifies the state transition of the parachain. Some parachains may be specific to a particular application, others may focus on specific features like smart contracts, privacy, or scalability &mdash; still others might be experimental architectures that are not necessarily blockchain in nature.

Polkadot provides many ways to secure a slot for a parachain slot for a particular length of time. Parathreads are part of a pool that shares slots and must win auctions for individual blocks. Parathreads and parachains have the exact same API; their difference is economic. Parachains will have to reserve DOT for duration of their slot lease; parathreads will pay on a per-block basis. Parathreads can become parachains, and vice-versa.

## 共享安全性

Parachains connected to the Polkadot Relay Chain all share in the security of the Relay Chain. Polkadot has a shared state between the Relay Chain and all of the connected parachains. If the Relay Chain must revert for any reason, then all of the parachains would also revert. This is to ensure that the validity of the entire system can persist and no individual part is corruptible.

The shared state makes it so that the trust assumptions when using Polkadot parachains are only those of the Relay Chain validator set, and no other. Since the validator set on the Relay Chain is expected to be secure with a large amount of stake put up to back it, it is desirable for parachains to benefit from this security.

## 角色

### 验证人

Validators, if elected to the validator set, produce blocks on the Relay Chain. They also accept proofs of valid state transition from collators. In return, they will receive staking rewards.

### 收集人

Collators are full nodes on both a parachain and the Relay Chain. They collect parachain transactions and produce state transition proofs for the validators on the Relay Chain. They can also send and receive messages from other parachains using XCMP.

### 提名人

Nominators bond their stake to particular validators in order to help them get into the active validator set and thus produce blocks for the chain. In return, nominators are generally rewarded with the portion of the staking rewards from that validator.

## 白板系列

For a video overview of the architecture of Polkadot watch the video below for the whiteboard interview with W3F researcher Alistair Stewart: <iframe width="560" height="315" src="https://www.youtube.com/embed/xBfC6uTjvbM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>
