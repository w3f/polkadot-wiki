---
id: glossary
title: 专业术语
sidebar_label: 专业术语
---

## Alexander

Polkadot 最新测试网。

## 区块

数据集合在一起(例如交易)标明区块链的状态转换。

## 区块浏览器

允许用户浏览区块链上不同区块的程序

## BLS

Boneh-Lynn-Shacham(BLS)签名速度慢，验证速度非常慢，需要慢和低安全性的友好曲线，并且可能造成危险的延展性。 但是 BLS 允许多种的聚合签名选项，这使 BLS 成为共识算法中投票和阈值签名的首选方案。

## 绑定

A process by which tokens can be "frozen" in exchange for attaching a parachain to a relay chain. This process ensures that only chains that are valid and running will be attached to the relay chain, as it would behoove DOT holders to stop bonding their tokens.

## 桥接

节点充当着在 Polkadot 中继链与外部链之间的中介，以这种方式在中继链中看起来外部链是平行链(即满足 Polkadot Runtime 环境要求)。桥接允许像以太坊和比特币等其他与 Polkadot 原生不兼容的区块链之间进行交互。

## 拜占庭容错

拜占庭容错能力是系统一种属性。也就是说系统不仅可以容忍单个子系统发生故障，但是可能不清楚某个子系统是否发生故障。也就是说系统上的不同观察者可能无法就系统是否发生故障达成共识。确保拜占庭容错能力是开发任何分布式系统的重要部分。

## 收集人

通过收集平行链交易并为验证人生成状态转换证明来维持平行链的节点。

## 共识

一组计算机就特定数据值达成一致共识的过程(例如区块链上的区块排序和组成)。有多种用于确定共识的算法。 Polkadot 使用的共识算法是 GRANDPA。

## DOTs

DOT 是 Polkadot 的原生代币。 DOTs 具有三个用途: 网络治理(允许他们对网络升级和其他特殊事件进行投票)，一般操作(奖励行为好和惩罚行为坏的人)和绑定(通过连接到中继链需要"锁上" DOTs 来添加新的平行链) 。

## 分布式应用

Dapps 是分布式应用程序的通用术语，即作为分布式网络的一部分而不是在特定系统或一组系统上运行的应用程序。

## 周期

Epoch(周期)是 BABE 协议中的持续时间，该协议将分配领导职务给验证人在时隙中生产区块的权限。在 Kusama，持续时间与 [session](#session) 相同。

## 纪元

A (whole) number of sessions, which is the period that the validator set (and each validator's active nominator set) is recalculated and where rewards are paid out.
## Equivocation

Providing conflicting information to the network. BABE equivocation entails creating multiple blocks in the same slot. GRANDPA equivocation would consist of signing multiple conflicting chains.

## 交易 (Extrinsic)

Generically, some function declared by the programmer, i.e., one that is not built-in to the language or framework. Specifically for Polkadot, this refers to a binary blob which represents some state transition (such as a transaction) and is used for parachains to communicate via the relay chain.

## 确定性

The property of a block which cannot be reverted. Generally, created blocks are not final until some point in the future - perhaps never, in the case of "probabilistic finality" such as in Bitcoin (although Bitcoin blocks are generally considered "final" after six confirmations due to the unlikelihood of reverting at that point). In the Polkadot relay chain, the goal is for blocks to be finalized 10-12 seconds after creation.

## 确定性工具

A mechanism which determines finality.

## 钓鱼人

Nodes which monitor the network for validators or collators which are behaving badly. Fishermen must stake a small amount of DOTs but can be rewarded greatly if they find bad behavior.

## GRANDPA 共识算法

GHOST-based Recursive Ancestor Deriving Prefix Agreement. It is the finality gadget for Polkadot, which allows asynchronous, accountable, and safe finality to the blockchain. For an overview of GRANDPA, see this Medium post: [https://medium.com/polkadot-network/polkadot-proof-of-concept-3-a-better-consensus-algorithm-e81c380a2372](https://medium.com/polkadot-network/polkadot-proof-of-concept-3-a-better-consensus-algorithm-e81c380a2372)

## 治理

The process of determining what changes to the network are permissible, such as modifications to code or movement of funds. The governance system in Polkadot is on-chain and revolves around stakeholder voting, i.e. the majority of the stake (DOTs) determines the direction of the network.

## 治理议会

An on-chain entity which consists of several on-chain accounts (starting at 6, eventually moving to the final value of 24) which can act as a representative for "passive" (non-voting) stakeholders. Council members have two main tasks: proposing referenda for the overall stakeholder group to vote on and cancelling malicious referenda.

## 硬分叉

A permenant diversion of a blockchain that can occur quickly due to a high priority change in a consensus rule. Clients who follow a hard fork always need to upgrade their clients in order to continue following the hard-forked chain. Hard forks are considered permanent divergences of a chain for which non-upgraded clients are following consensus rules incompatible to the ones followed by upgraded clients.

## Hard Spoon

Defined by Jae Kwon of Cosmos as "a new chain that takes into account state from an existing chain; not to compete, but to provide broad access." A non-contentious blockchain that inherits the state of the underlying blockchain and creates a new branch of *the same blockchain*.

## KSM

The abbreviation for Kusama network tokens.

## Kusama

The "canary network" for Polkadot. It consists of an early-release, unaudited version of the Polkadot software. It is not a testnet - after the transition to NPoS, the network is entirely in the hands of the community (i.e., Kusama token holders).

## LIBP2P

An open-source library for encrypted peer-to-peer communications and other networking functionality. More information at: [https://libp2p.io/](https://libp2p.io/)

## 活跃性

The property of a distributed system that it will eventually come to some sort of consensus. A system stuck in an infinite loop would not be considered live, even if computations are taking place; a system which eventually provides a result, even if incorrect or it takes a long time, is considered to have liveness.

## 节点浏览器

A tool which gives you information about a node, such as the latest blocks sealed, finalized, and the current chain state as known by that node.

## 提名权益证明 (NPoS)

A proof of stake system whereby nominators "lend" their stake to validators, as a show of faith in the good behavior of the validator. Nominated proof-of-stake differs from the more generic concept delegated proof of stake in that nominators are subject to loss of stake if they nominate a bad validator; delegates are not subject to loss of stake based on the behavior of the validator. Note that some other blockchain technologies may use the term delegated proof of stake, even if delegates can be slashed.

## 提名人

Nodes which select a set of validators. A certain amount of DOTs must be staked in order to do so, which may be lost if the validator behaves badly. This forces nominators to carefully select validators.

## 链上治理

Governance of a blockchain which is controlled by mechanisms controlled by the blockchain. On-chain governance allows for decisions can be made in a transparent manner. Note that there are a variety of different algorithms for making these decisions, such as simple majority voting or identity-based quadratic voting.

## 平行链 / 并行链

A blockchain which meets several characteristics which allow it work within the confines of the Polkadot Runtime Environment. Also known as "parallelized chain."

## 平行链注册表

A relatively simple database-like construct that holds both static and dynamic information on each chain.

## Parity Technologies

A company, founded by Dr. Gavin Wood, which is developing Substrate. It has also released several other projects including Parity Ethereum and Parity Wasm.

## Polkadot

A heterogeneous multi-chain technology allowing for various blockchains of different characteristics to perform interchain communication.

## Polkadot Runtime 环境

The runtime environment which a runtime module can be executed in. Parachains must support the Polkadot Runtime Environment - external chains which do not will have to use a bridge.

## 权益证明 (PoS)

A method of achieving consensus in which the next block is determined by a node that is chosen by some characteristic (e.g., the amount of tokens that they stake).

## 工作量证明 (PoW)

A method of achieving consensus in which the next block is determined by the first to solve a difficult puzzle (e.g., in Bitcoin, solving a partial pre-image hash for a block candidate).

## 提案

A potential function call to be voted on in a referendum. Proposals modify the behavior of the Polkadot network, from minor parameter tuning all the way up to replacing the runtime code.

## 协议

A system of rules that allow two or more entities of a communications system to transmit information. The protocol defines the rules, syntax, semantics and synchronization of communication and possible recovery methods.

## 公投

A vote on whether or not a proposal should be accepted by the network. These referenda may be initiated by the Governance Council, by a member of the public, or as the result of a previous proposal. Stakeholders vote on referenda, weighted by both the size of their stake (i.e. number of DOTs held) and the amount of time they are willing to lock their tokens.

## 中继链

A chain which coordinates consensus and communication between parachains (and external chains, via bridges).

## Runtime

A state transition function which indicates a valid algorithm for determining the state of the next block given the previous block.

## Runtime 模块

Wasm code which encodes a state transition function.

## 安全

The property of a distributed system indicating that the system will properly meet all invariants; that is, that nothing "bad" ever happens to the data (such as it being corrupted).

## Sealing

The process of adding a block to the relay chain. Note that finalization is a separate process - blocks are finalized some time after they are sealed (the goal is approximately 10 - 12 seconds).

## Session

A session is a Substrate implementation term for a period of time that has a constant set of validators. Validators can only join or exit the validator set at a session change.

## Session 证书

Another name for the session "key" which is a BLS key for GRANDPA, a sr25519 key for BABE, and eventually an Ed25519 key for libp2p.

## Session 密钥

A session "key" is a BLS key for GRANDPA, a sr25519 key for BABE, and eventually an Ed25519 key for libp2p.

## 惩罚 (Slashing)

The removal of a percentage of an account's DOTs as a punishment for a validator acting maliciously or incompetently (e.g., equivocating or remaining offline for an extended period of time).

## 软分叉

A backwards compatible change to client code which causes upgraded clients to start mining a new chain. Requires a "vote-by-hashrate" of majority of miners in order to enact successfully. Soft forks are considered temporary divergences in a chain since non-upgraded clients do not follow the new consensus rules but upgraded clients are still compatible with old consensus rules.

## 抵押

"Reserving" tokens (for Polkadot, DOTs) which are put up as "collateral" for a chance to produce a valid block (and thus obtain a block reward). Validators and nominators (who back validators through NPoS) together stake their DOTs in order to add blocks to the relay chain.

## 状态转变函数

A function which describes how the state of a blockchain can be transformed. For example, it may describe how tokens can be transferred from one account to another.

## Substrate

An implementation of the Polkadot Runtime Environment which allows developers to generate parachains which are compatible with the Polkadot relay chain.

## 推迟

In Polkadot governance, bringing a proposal to a vote via referendum. Note that this is the British meaning of "tabling", which is different than the US version, which means "to postpone" a measure.

## 交易

An individual element of the state transition function of a block, such as moving tokens from one account to another.

## 验证人

A node which secures the relay chain by staking DOTs, validating proofs from collators on parachains, and determine a consensus along with other validators.

## 投票

The process of stakeholders determining whether or not a referendum to implement a specific proposal should pass. Votes are weighted both by the number of DOTs that the stakeholder account controls and the amount of time they are willing to lock their DOTs up. Voting may be overridden by the Governance Council if there is unanimous agreement that it not

## 钱包

A program which allows one to store, receive, and transmit DOTs or other blockchain-based tokens.

## Web3 基金会

A Switzerland-based foundation which nurtures and stewards technologies and applications in the fields of decentralized web software protocols, particularly those which utilize modern cryptographic methods to safeguard decentralization, to the benefit and for the stability of the Web3 ecosystem.

## WebAssembly

An instruction format for a virtual, stack-based machine. Polkadot Runtime Modules are compiled to WebAssembly. Also known as Wasm.

## Wasm

An instruction format for a virtual, stack-based machine. Polkadot Runtime Modules are compiled to Wasm.

## 见证人

Cryptographic proof statements of data validity.
