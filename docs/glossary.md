---
id: glossary
title: Glossary
sidebar_label: Glossary
---

## Alexander

The fourth proof of concept (PoC-4) testnet for Polkadot.

## Block

A collection of data, such as transactions, that together indicates a state transition of the blockchain.

## Block explorer

An application that allows a user to explore the different blocks on a blockchain.

## BLS

Boneh-Lynn-Shacham (BLS) signatures have slow signing, very slow verification, require slow and much less secure pairing friendly curves, and tend towards dangerous malleability. Yet, BLS permits a diverse array of signature aggregation options far beyond any other known signature scheme, which makes BLS a preferred scheme for voting in consensus algorithms and for threshold signatures.

## Bonding

A process by which tokens can be "frozen" in exchange for some other benefit. For example, staking is a form of bonding for which you receive rewards in exchange for securing the network. You can also bond tokens in exchange for a parachain slot.

## Bridge

A parachain that acts as an intermediary between the Polkadot relay chain and an external chain, in such a way that it appears to the relay chain that the external chain is a parachain (i.e., meets the Polkadot Runtime Environment requirements). Bridges allow for interaction between other blockchains, such as Ethereum and Bitcoin, that are not natively compatible with Polkadot.

## Byzantine Fault Tolerance

The property of a system that is tolerant of Byzantine faults; that is, a system where not only may individual subsystems fail, but it may not be clear if a particular subsystem has failed or not. That is, different observers on the system may not agree on whether or not the system has failed. Ensuring Byzantine fault tolerance is an important part of developing any distributed system.

## Collator

A node that maintains a parachain by collecting parachain transactions and producing state transition proofs for the validators.

## Consensus

The process of a group of entities to agree on a particular data value (such as the ordering and makeup of blocks on a blockchain). There are a variety of algorithms used for determining consensus. The consensus algorithm used by Polkadot is GRANDPA.

## DOTs

The native token for Polkadot. DOTs serve three purposes: network governance (allowing them to vote on network upgrades and other exceptional events), general operation (rewarding good actors and punishing bad actors), and bonding (adding new parachains by "freezing" DOTs while they are connected the relay chain).

## Dapps

A generic term for a decentralized application, that is, one that runs as part of a distributed network as opposed to being run on a specific system or set of systems.

## Epoch

An epoch is a time duration in the BABE protocol that is broken into smaller time slots. Each slot has at least one slot leader who has the right to propose a block.
In Kusama, it is the same duration as a [session](#session).

## Era

A (whole) number of sessions, which is the period that the validator set (and each validator's active nominator set) is
recalculated and where rewards are paid out.

## Equivocation

Providing conflicting information to the network. BABE equivocation entails creating multiple blocks in the same slot. GRANDPA equivocation would consist of signing multiple conflicting chains.

## Extrinsic

State changes that come from the outside world, i.e. they are not part of the system itself. Extrinsics can take two forms, "[inherents](#inherents)" and "[transactions](#transactions)".

## Finality

The property of a block that cannot be reverted. Generally, created blocks are not final until some point in the future - perhaps never, in the case of "probabilistic finality". The Polkadot relay chain uses a deterministic finality gadget known as [GRANDPA](#GRANDPA-consensus-algorithm).

## Finality Gadget

A mechanism that determines finality.

## Fisherman

Nodes that monitor the network for validators or collators who are behaving badly. Fishermen must stake a small amount of DOTs but can be rewarded greatly if they find bad behavior.

## GRANDPA Consensus Algorithm

GHOST-based Recursive ANcestor Deriving Prefix Agreement. It is the finality gadget for Polkadot, which allows asynchronous, accountable, and safe finality to the blockchain. For an overview of GRANDPA, see this Medium post: [https://medium.com/polkadot-network/polkadot-proof-of-concept-3-a-better-consensus-algorithm-e81c380a2372](https://medium.com/polkadot-network/polkadot-proof-of-concept-3-a-better-consensus-algorithm-e81c380a2372)

## Governance

The process of determining what changes to the network are permissible, such as modifications to code or movement of funds. The governance system in Polkadot is on-chain and revolves around stakeholder voting.

## Governance Council

An on-chain entity that consists of several on-chain accounts (starting at 6, eventually moving to the final value of 24). The Council can act as a representative for "passive" (non-voting) stakeholders. Council members have two main tasks: proposing referenda for the overall stakeholder group to vote on and cancelling malicious referenda.

## Hard Fork

A permanent diversion of a blockchain that can occur quickly due to a high priority change in a consensus rule. Clients who follow a hard fork always need to upgrade their clients in order to continue following the upgraded chain. Hard forks are considered permanent divergences of a chain for which non-upgraded clients are following consensus rules incompatible to the ones followed by upgraded clients.

## Hard Spoon

Defined by Jae Kwon of Cosmos as "a new chain that takes into account state from an existing chain; not to compete, but to provide broad access." A non-contentious blockchain that inherits the state of the underlying blockchain and creates a new branch of *the same blockchain*.

## Inherent

Extrinsics that are "inherently true." Inherents are not gossiped on the network and are put into blocks by the block author. They are not provably true the way that the desire to send funds is, therefore they do not carry a signature. A blockchain's [runtime](#runtime) must have rules for validating inherents. For example, timestamps are inherents. They are validated by being within some margin that each validator deems reasonable.

## KSM

The abbreviation for Kusama network tokens.

## Kusama

The "canary network" for Polkadot. It consists of an early-release, unaudited version of the Polkadot software. It is not a testnet - after the transition to NPoS, the network is entirely in the hands of the community (i.e., Kusama token holders).

## LIBP2P

An open-source library for encrypted peer-to-peer communications and other networking functionality. More information at: [https://libp2p.io/](https://libp2p.io/)

## Liveness

The property of a distributed system that it will eventually come to some sort of consensus. A system stuck in an infinite loop would not be considered live, even if computations are taking place; a system that eventually provides a result, even if incorrect or it takes a long time, is considered to have liveness.

## Node Explorer

A tool that gives you information about a node, such as the latest blocks sealed, finalized, and the current chain state as known by that node.

## Nominated Proof of Stake (NPoS)

A Proof-of-Stake system where nominators back validators with their own stake as a show of faith in the good behavior of the validator. Nominated Proof-of-Stake differs from the more generic concept Delegated Proof-of-Stake in that nominators are subject to loss of stake if they nominate a bad validator; delegators are not subject to loss of stake based on the behavior of the validator. Note that some other blockchain technologies may use the term Delegated Proof-of-Stake, even if delegators can be slashed. Polkadot uses the Phragmen method to allocate stake to nominees.

## Nominator

Accounts that select a set of validators to nominate by bonding their tokens. Nominators receive some of the validators' rewards, but are also liable for slashing if their nominated validators misbehave.

## On-chain Governance

A governance system of a blockchain that is controlled by mechanisms on the blockchain. On-chain governance allows decisions to be made in a transparent manner. Note that there are a variety of different algorithms for making these decisions, such as simple majority voting, adaptive quorum biasing, or identity-based quadratic voting.

## Parachain

A blockchain that meets several characteristics that allow it work within the confines of the Polkadot Runtime Environment. Also known as "parallelized chain."

## Parachain Registry

A relatively simple database-like construct that holds both static and dynamic information on each chain.

## Parity Technologies

A company, founded by Dr. Gavin Wood, that is developing Substrate and Polkadot. It has also released several other projects including Parity Ethereum and Parity Secret Store.

## Polkadot

A heterogeneous, multi-chain network allowing various blockchains of different characteristics to perform arbitrary, interchain communication under shared security.

## Polkadot Runtime Environment

The runtime environment in which a runtime module can be executed. Parachains must support the Polkadot Runtime Environment - external chains that do not will have to use a bridge.

## Proof of Stake (PoS)

A method of selecting participation in a consensus system, in which participants are chosen based on how many tokens they have at stake (at risk of loss due to misbehavior). Normally, Proof-of-Stake systems limit the number of participants.

## Proof of Validity

A proof produced by parachain collators. Based on this proof and the parachain registry, a validator can verify that a parachain has properly executed its state transition function. Proofs of Validity go into the relay chain blocks.

## Proof of Work (PoW)

A method of selecting participants in a consensus system, typically the longest chain rule, in which participants try to solve a puzzle like finding a partial pre-image of a hash. Normally, a Proof-of-Work system can have any number of participants.

## Proposal

A potential function call to be voted on in a referendum. Proposals modify the behavior of the Polkadot network, from minor parameter tuning all the way up to replacing the runtime code.

## Protocol

A system of rules that allows two or more entities of a communications system to transmit information. The protocol defines the rules, syntax, semantics and synchronization of communication and possible recovery methods.

## Referendum

A vote on whether or not a proposal should be accepted by the network. Referenda may be initiated by the Governance Council, by a member of the public, or as the result of a previous proposal. Stakeholders vote on referenda, weighted by both the size of their stake (i.e. number of DOTs held) and the amount of time they are willing to lock their tokens.

## Relay chain

The chain that coordinates consensus and communication between parachains (and external chains, via bridges).

## Runtime

The state transition function of a blockchain. It defines a valid algorithm for determining the state of the next block given the previous state.

## Runtime Module

A module that implements specific transition functions and features one might want to have in their runtime. Each module should have domain-specific logic. For example, a Balances module has logic to deal with accounts and balances. In Substrate, modules are called "pallets".

## Safety

The property of a distributed system indicating that a particular state transition will not be reverted. GRANDPA provides _deterministic_ safety. That is, for a state changed marked as "safe" or "final", one would require a hard fork to revert that change.

## Sealing

The process of adding a block to the relay chain. Note that finalization is a separate process - blocks are finalized some time after they are sealed.

## Session

A session is a Substrate implementation term for a period of time that has a constant set of validators. Validators can only join or exit the validator set at a session change.

## Session Certificate

A message containing a signature on the concatenation of all the Session keys. Signed by the Controller.

## Session Key

Hot keys that are used for performing network operations by validators, for example signing GRANDPA commit messages.

## Shared Security

The security model that Polkadot uses whereby all chains are equally secured. This is acheived by placing proofs of validity of parachain blocks into the relay chain such that, in order to revert finality of a single parachain, an attacked would need to attack the entire Polkadot system.

## Slashing

The removal of a percentage of an account's DOTs as a punishment for a validator acting maliciously or incompetently (e.g., equivocating or remaining offline for an extended period of time).

## Soft Fork

A backwards compatible change to client code which causes upgraded clients to start mining a new chain. Requires a "vote-by-hashrate" of majority of miners in order to enact successfully. Soft forks are considered temporary divergences in a chain since non-upgraded clients do not follow the new consensus rules but upgraded clients are still compatible with old consensus rules.

## Staking

The act of bonding tokens (for Polkadot, DOTs) which are put up as "collateral" for a chance to produce a valid block (and thus obtain a block reward). Validators and nominators stake their DOTs in order to secure the network.

## State transition function

A function that describes how the state of a blockchain can be transformed. For example, it may describe how tokens can be transferred from one account to another.

## Substrate

A modular framework for building blockchains. Polkadot is built using Substrate. Chains built with Substrate will be easy to connect as parachains.

## Tabling

In Polkadot governance, bringing a proposal to a vote via referendum. Note that this is the British meaning of "tabling", which is different than the US version, which means "to postpone" a measure.

## Transaction

An extrinsic that is signed. Transactions are gossiped on the network and incur a transaction fee. Transactions are "provably true", unlike inherents. For example, one can prove that Alice wants to send funds to Bob by the fact that she signed a transfer-funds message with her private key.

## Validator

A node that secures the relay chain by staking DOTs, validating proofs from collators on parachains, and voting on consensus along with other validators.

## Voting

The process of stakeholders determining whether or not a referendum should pass. Votes are weighted both by the number of DOTs that the stakeholder account controls and the amount of time they are willing to lock their DOTs.

## Wallet

A program that allows one to store private keys and sign transactions for Polkadot or other blockchain networks.

## Web3 Foundation

A Switzerland-based foundation that nurtures and stewards technologies and applications in the fields of decentralized web software protocols, particularly those that utilize modern cryptographic methods to safeguard decentralization, to the benefit and for the stability of the Web3 ecosystem.

## WebAssembly

An instruction format for a virtual, stack-based machine. Polkadot Runtime Modules are compiled to WebAssembly. Also known as Wasm.

## Wasm

An instruction format for a virtual, stack-based machine. Polkadot Runtime Modules are compiled to Wasm.

## Witness

Cryptographic proof statements of data validity.
