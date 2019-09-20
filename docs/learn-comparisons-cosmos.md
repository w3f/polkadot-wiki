---
id: learn-comparisons-cosmos
title: Polkadot vs. Cosmos: Design Comparison
sidebar_label: Polkadot vs. Cosmos: Design Comparison
---

Both Polkadot and Cosmos are projects in the blockchain space that aim to solve interoperability and scalability of blockchains.

Polkadot takes a shared-state heterogeneous multichain approach, while Cosmos assumes all chains are independent but connected.

This article will attempt to break down the core differences between the Polkadot and Cosmos designs, explain some benefits and drawbacks of each, and argues that the two projects are complimentary in nature.

## In one sentence

Polkadot is a heterogeneous sharded multichain with scalable security and a trustless data transmission protocol.

Cosmos is composed of individual chains with independent security and bridges between them that allow for the transfer of messages.

## Architecture

### Polkadot

The center of the Polkadot multichain is the relay-chain. All validators validate for the relay-chain by participating in Polkadot's hybrid consensus model known as BABE/GRANDPA using a variant of Proof-of-Stake.

Validators are selected through a Nominated Proof-of-Stake (NPoS) scheme in which DOT holders can nominate their stake to a set of validators and the stake will attempt to equalize between them. For more on Polkadot's NPoS click [here](https://medium.com/web3foundation/how-nominated-proof-of-stake-will-work-in-polkadot-377d70c6bd43).

Polkadot is a sharded design that allows parachains with their own contained logic to connect and share in the security of the relay-chain validators. These parachains (short for parallelized chain) are something between a side-chain and a shard since they encapsulate their own state and state transitions, but must report it to the relay-chain for verification.

For each parachain, a type of network maintainer known as the collators engage with a subset of validators by handing proofs of state transitions which the validators can then easily verify. In this way, only a few validators are assigned to verify each parachain shard and computation can scale with the number of parachains. Parachains are able to transmit data between each other in a trustless manner which can be escalated to the security of the entire relay-chain validator set when necessary (known as ICMP, more on that below).

Some of the parachains on Polkadot will act as interpreters to external chains such as Bitcoin, Ethereum, and Cosmos. These are called parachain bridges.

### Cosmos

There is not a center in the Cosmos universe, where in true decentralized fashion each chain is independent and maintains their own validator set. However, the _hubs_ such as the Cosmos Hub or the [Iris Hub](https://www.irisnet.org) provide a juncture for which the chains can communicate.

Cosmos does not attempt to create an environment of shared security among the chains connected by the bridge _zones_ and hubs. Instead they take a sovereign-first approach and strictly require chains to maintain their own validator set and economic security.

Cosmos connects to external chains through the use of what are called _peg zones_ which provide a kind of specialized bridge that can understand the external consensus. For all chains that satisfy [consensus requirements](https://github.com/cosmos/ics/tree/master/spec/ics-002-consensus-verification), their interoperability protocol (known as IBC, more on that below) will work without the need of this special peg.

The Cosmos hub uses a Proof-of-Stake algorithm that weighs validators by the amount of tokens backing them. It also allows smaller holders to delegate their tokens to one of its validators (currently 100, but there are plans to increase this number to >300). However, other zones in Cosmos may implement variants of this Proof-of-Stake scheme.

## Trust model

Polkadot and Cosmos enforce the notion of honest behavior of their validator set through slashing punishments in which some of the validators' stakes could get depleted if they are found doing something bad.

Polkadot depends on the complete validator set in cases where the subset of validators are unable to make a new state transition for a parachain. At all times, there is the possibility to tap into the entire security of all of Polkadot. This is because Polkadot has the notion of shared state, in which all the pieces fit together into one unanimous multichain. So in this way, if one parachain is tainted the entire state of Polkadot is able to revert the tainted operations and slash the unscrupulous validators.

The entire validator set must resolve a conflict if it so happens that the supermajority of the validators which are assigned to a parachain shard become dishonest (or Byzantine, a word to refer nodes which have failed in some fashion-- whether this means they have gone offline or become malicious).

Cosmos does not operate under the assumption that all the connected chains have shared state, so in this way each chain is independent and responsible for incentivizing their own security. The Cosmos IBC design does not make additional security guarantees on any of the interchain messaging. If a user decided to send a message from one Cosmos Tendermint chain to another, and later that second chain is corrupted because it had much lower security, it could have an indirect effect on the original chain. Cosmos' model is only as secure as the least secure of the bridged chains that the user uses. It is expected that the security will vary widely between each chain on Cosmos and users of the chains should know and understand this. This is different from Polkadot which is designed to distribute security as a blanket over all parachains through the shared-state model.

## Interoperability

Polkadot and Cosmos are both working on blockchain interoperability protocols.

Polkadot uses the Interchain Message Passing (ICMP) protocol to send messages between parachains. The messages which are passed can be any arbitrary string of bytes, meaning they could be encoded to be asset transfers or more complex cross-chain calls. ICMP is trustless because it is verified by the validator as part of the validity check of each new parachain block that the messages will be included. Validators only accept new parachain blocks if they've included all of the incoming messages from other parachains (given a one or two blocks buffer). Additionally, the Shared Protected Runtime Execution Environment (SPREE) gives even stronger guarantees that the messages will trigger the same exact code across parachains.

Cosmos's work in this regard is currently focused on Inter-Blockchain Communication (IBC). IBC resembles TCP in the legacy world of networking because it treats each blockchain as its own separate process with its own security assumptions.

Both ICMP and IBC require consensus verification, but ICMP provides state machine verification while IBC leaves this aspect up to the user.

> Protip: For more on SPREE see [here](https://wiki.polkadot.network/en/latest/polkadot/learn/spree/).

### Connecting Polkadot and Cosmos

The astute reader will notice that the two interoperability protocols used respectively by Polkadot and Cosmos have different formats and try to achieve different goals. While Polkadot wants to enable trustless data transmission among the parachains, Cosmos wants to be able to send packet-like messages from one blockchain with finality to another.

Since the Polkadot relay-chain comes to finality by using the GRANDPA finality gadget, the IBC scheme proposed by Cosmos should be able to work with Polkadot (more on finality in the [section below](#finality)).

There does not need to be any tweaks made to the design of either of the protocols, but an interpreter for IBC packets would need to occupy a parachain slot on Polkadot. This is so that this slot could serve as a Tendermint light client and consensus interpreter and be able to verify which blocks have been signed with finality. On the Cosmos side they would watch for the headers of this interpreter which would be included in the relay-chain blocks.

## Validity

In Polkadot validity of the entire state of the network is secured by 100% of the validators. The way this happens is as follows: validators will be shuffled into groups (subsets) and assigned to be validating for specific parachains. Every time a parachain submits a proof of a new block (i.e. the state transition), the subset of validators will verify its validity using only a proof and the necessary data. The validators then must only commit the hash of the parachain header to the relay chain block in order to include it. In this way, the parachain execution is compressed first into a proof and given to a subset of validators which then compress it further before writing it onto the relay chain.

Cosmos does not treat validity in the same way. Validity for Cosmos chains require the supermajority of validator sets on each chain to sign off on every block, and to perform the complete verification on the transactions in the blocks. The acts of compression which take place during Polkadot's validity checking process do not happen during Cosmos' process. For this reason, the same scalability among the shared state of Polkadot would be infeasible on Cosmos, which prefers to take an approach in which chains are connected in a sparse graph.

## Availability

Polkadot has additional mechanisms which guarantee the availability of data and gives even stronger security assurances. Namely, these are the use of erasure codes for parachain data availability among the entire validator set and fishermen which are bounty hunters that watch for invalid validator behaviors.

Cosmos chains must keep the entire data for the chains they are validating, and for bridge chains will need to be also a light client of that chain. Cosmos has no plan to use erasure codes or fishermen at the base layer, but acknowledges that these could be implemented on top of IBC.

## Consensus

Polkadot uses a hybrid consensus composed of BABE, a block production mechanism and GRANDPA, a Byzantine finality gadget.

Cosmos uses Tendermint BFT consensus, which is closely inspired by Practical Byzantine Fault Tolerance (PBFT).

### Finality

Polkadot's GRANDPA finality gadget comes to finality on _chains of blocks_ rather than individual blocks. This is largely different from Cosmos, which comes to consensus on every block. In fact, Cosmos' Tendermint algorithm conflates the act of block production with the finality, which means that blocks can only be produced if they have been finalized. GRANDPA, instead is placed on top of the block production (BABE), and can finalize more than one block at once, making the overall consensus process run quicker.

### Liveness

Polkadot's design has stronger liveness guarantees than Cosmos' Tendermint, which prioritizes the safety.

In Tendermint, block production will stop along with the finality, once more than 1/3 of the validator set has become Byzantine.

Tendermint uses a weight-based proof-of-stake algorithm which gives validators voting power based on the amount of ATOM tokens they hold (or are delegated). Currently only 5 out of 100 validators control 1/3 of the stake and thus could halt the finalization procedure of the network. In Polkadot, the number of validators will always be 33% of the total (so with 100 validators, 33).

While Polkadot's GRANDPA will also stop finalizing blocks once more than 1/3 of the validator set is Byzantine, BABE will continue to produce blocks. Once the validator set has been restored by either kicking out the unresponsive validators or validators coming back online, GRANDPA will start to finalize on all the blocks BABE has produced in the meantime.

### Validator selection (PoS)

Polkadot uses a nominated Proof-of-Stake (NPoS) scheme to elect its validator set. Since the NPoS algorithm gives equal voting weights to each validator, an equalizing algorithm known as Phragmen's method is used to distribute the nominated DOTs equally among all validators as evenly as possible.

Even though the Proof-of-Stake models in both projects differ, they are both based on the idea of economic sybil resistance. While Cosmos validators are observed to be a power law relationship (something that is much more resisted in Polkadot's NPoS equalization algorithm known as the Phragmen method), it is possible that in Polkadot large actors simply maintain more than one validator. Even if this becomes the case, Polkadot slashes coordinated faults more strongly than uncoordinated faults. This means that there is greater pressure for the network to be decentralized even if more than one validator is ran by a single actor.

## Programming languages

Cosmos favors the Go programming language and has currently constructed the Cosmos-SDK in Golang. However, the Tendermint consensus engine implements a binary wire protocol called ABCI, and has libraries for interacting with it in [roughly a dozen languages](https://tendermint.com/ecosystem). It is not a direct comparison to Polkadot since the Cosmos Hub only currently has a single implementation in Golang.

In comparison, Polkadot currently has 5 in progress implementations in the languages: Rust, Golang, JavaScript, Golang (there are two), and C++. Additionally, Polkadot is made to use Web Assembly for its runtime compilation target, which means that any language that can compile to Wasm could be used to construct a parachain or write a smart contract for a Polkadot parachain. Until more frameworks for creating parachains is developed, only Substrate and Rust are available to be used.

## Conclusion

Polkadot has a shared state multichain architecture compared to the Cosmos independent bridged chains network.

The trust model of Polkadot ensures that the shared state of parachains are secured by the entire relay-chain validator set, while Cosmos assumes no such shared security and maintains independence of each chain. The ICMP of Polkadot allows for trustless transmission of data among parachains. Cosmos' IBC places no constraint on chains to share state but requires them to fit certain constraints, and does not ensure the same security among each zone. Polkadot ensures validity and availability using erasure codes, which Cosmos does not implement at the base layer. The hybrid BABE/GRANDPA consensus is intended to be able to reach finality more rapidly on chains of blocks than the Cosmos Tendermint algorithm which can only finalize one block at a time. There are stronger liveness guarantees for Polkadot because of the BABE block production mechanism that will continue making blocks even when GRANDPA has halted. Validator set selection using the Phragmen method in Polkadot equalizes validators votes while Cosmos uses stake weighted voting. Finally, Polkadot embraces a broad ecosystem of programming languages thanks to its backbone of WebAssembly, while Cosmos favors the Golang programming language.
