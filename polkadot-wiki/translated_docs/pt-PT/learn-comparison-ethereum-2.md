---
id: learn-comparisons-ethereum-2
title: Polkadot and Ethereum 2.0
sidebar_label: Ethereum 2.0
---

Polkadot and Ethereum 2.0 are both sharded blockchain protocols. As such, they provide scalability by executing transactions in separate shards and providing a protocol to send messages between shards.

## Model

The shards in Ethereum 2.0 all have the same state transition function (STF), as in the rules governing how the blockchain can change state with each block. This STF provides an interface for smart contract execution. Contracts exist on a single shard (and can send asynchronous messages between shards) and thus scales by executing shards in parallel.

Likewise, in Polkadot, each shard hosts core logic, the shards are executed in parallel, and Polkadot can send cross-shard asynchronous messages. However, each shard in the protocol has a unique STF. Applications can exist either within a single shard or across shards by composing logic. Polkadot uses WebAssembly (Wasm) as a "meta-protocol". A shard's STF can be abstract as long as the validators on Polkadot can execute it within a Wasm environment.

## Architecture

### Ethereum 2.0

Ethereum 2.0's main chain is called the Beacon Chain. The primary load on the Beacon Chain is attestations, which are votes on availability of shard data and Beacon Chain validity. Each shard in Ethereum 2 is simply a blockchain with the Ethereum Wasm (eWasm) interface.

Ethereum 2.0 will launch Phase 0 with just a Beacon Chain. In Phase 1, it will launch 64 shards as simple chains to test the Beacon Chain's finality. Each shard submits "crosslinks" to the Beacon Chain, which contain the information to finalize shard data. Later, in Phase 2, the shards will implement the eWasm interface, finally making the system usable. [1]

The network will also have "side chains" to interact with chains that are not under the finality protocol of Ethereum 2.0.

### Polkadot

Like Ethereum 2.0, Polkadot also has a main chain, called the Relay Chain, with a number of shards, called "[parachains](learn-parachains)". Parachains are not restricted to a single interface like eWasm. Instead, they can define their own logic and interface, as long as they provide their STF to the Relay Chain validators so that they can execute it.

Polkadot plans to launch with the ability to validate up to 100 shards per block. Besides parachains, which are scheduled for execution every block, Polkadot also has [parathreads](learn-parathreads), which are scheduled on a dynamic basis. This allows chains to share the sharded slots, much like multiple small airlines might share a gate at an airport.

In order to interact with chains that want to use their own finalization process (e.g. Bitcoin), Polkadot has [bridge parachains](learn-bridges) that offer two-way compatibility.

## Consensus

Both Ethereum 2.0 and Polkadot use hybrid consensus models where block production and finality each have their own protocol. The finality protocols - Casper FFG for Ethereum 2.0 and GRANDPA for Polkadot - are GHOST-based and both can finalize batches of blocks in one round. For block production, both protocols use slot-based protocols that randomly assign validators to a slot and provide a fork choice rule for unfinalized blocks - RandDAO/LMD for Ethereum 2.0 and BABE for Polkadot.

There are two main differences between Ethereum 2.0 and Polkadot consensus:

1. Ethereum 2.0 finalizes batches of blocks according to periods of time called "epochs". The current plan is to have 64 blocks per epoch, and finalize them all in one round. With a predicted block time of 12 seconds, this means the expected time to finality is 6 minutes (12 minutes maximum). [2] Polkadot's finality protocol, GRANDPA, finalizes batches of blocks based on availability and validity checks that happen as the proposed chain grows. The time to finality varies with the number of checks that need to be performed (and invalidity reports cause the protocol to require extra checks). The expected time to finality is 12-60 seconds.
2. Ethereum 2.0 requires a large number of validators per shard to provide strong validity guarantees. Polkadot is able to provide stronger guarantees with fewer validators per shard. Polkadot achieves this by making validators distribute an erasure coding to all validators in the system, such that anyone - not only the shard's validators - can reconstruct a parachain's block and test its validity. The random parachain-validator assignments and secondary checks performed by randomly selected validators make it impossible for the small set of validators on each parachain to collude.

## Staking Mechanics

Ethereum 2.0 will be a proof-of-stake network that requires 32 ETH to stake for each validator instance. Validators will run a primary Beacon Chain node and multiple validator clients - one for each 32 ETH. These validators get assigned to "committees", which are randomly selected groups to validate shards in the network. Ethereum 2.0 relies on having a large validator set to provide availability and validity guarantees: They need at least 111 validators per shard to run the network and 256 validators per shard to finalize all shards within one epoch. With 64 shards, that's 16,384 validators (given 256 validators per shard). \[3\]\[4\]

Polkadot is able to provide strong finality and availability guarantees with much fewer validators. Therefore, Polkadot uses [Nominated Proof of Stake (NPoS)](learn-staking) to select validators from a smaller set, letting smaller holders nominate validators to run infrastructure while still claiming the rewards of the system, without running a node of their own. Polkadot plans to have 1,000 validators in the first year and needs about ten validators for each parachain in the network.

## Shards

Every shard in Ethereum 2.0 has the same STF. During phase 1 (expected 2021 [5]), the shards will be simple data containers that provide crosslinks to the Beacon Chain. In phase 2 (expected 2023), they will implement the eWasm execution environment. EWasm is a restricted subset of Wasm for contracts in Ethereum. The eWasm interface provides a set of methods available to contracts. There should be a similar set of development tools like Truffle and Ganache to develop for eWasm. [6]

Every shard in Polkadot has an abstract STF based on Wasm. Each shard can expose a custom interface, as long as the logic compiles to Wasm and the shard provides an "execute block" function to Polkadot validators. Polkadot has the Substrate development framework that allows full spectrum composability with a suite of modules that can be configured, composed, and extended to develop a chain's STF.

## Message Passing

Shards in Ethereum 2.0 will have access to each other's state via their crosslinks and state proofs. In the model of Ethereum 2.0 with 64 shards, each one posts a crosslink in the Beacon Chain for every block, [4] meaning that shards could contain logic that executes based on some light client proof of a transaction on another shard. [7] Ethereum 2.0 has not released a specification for which nodes pass messages between shards.

Polkadot uses [Cross-Chain Message Passing (XCMP)](learn-xcm) for parachains to send arbitrary messages to each other. Parachains open connections with each other and can send messages via their established channels. If two parachains have any full nodes in common, they can gossip messages via the full nodes. Otherwise, Relay Chain validators will handle message delivery. Messages do not pass through the Relay Chain, only proofs of post and channel operations (open, close, etc.) go into the Relay Chain. This enhances scalability by keeping data on the edges of the system.

Polkadot has an additional protocol called [SPREE](learn-spree) that provides shared logic for cross-chain messages. Messages sent with SPREE carry additional guarantees about provenance and interpretation by the receiving chain.

## Governance

Ethereum 2.0 governance is still unresolved. Ethereum currently uses off-chain governance procedures like Github discussions, All Core Devs calls, and Ethereum Magicians to make decisions about the protocol. [8]

Polkadot uses on-chain [governance](learn-governance) with a multicameral system. There are several avenues to pass proposals, e.g. from an on-chain Council, a Technical Committee, or from the public. All proposals ultimately pass through a public referendum, where the majority of tokens can always control the outcome. For low-turnout referenda, Polkadot uses adaptive quorum biasing to set the passing threshold. Referenda can contain a variety of proposals, including fund allocation from an on-chain [Treasury](learn-treasury). Decisions get enacted on-chain and are binding and autonomous.

## Upgrades

Upgrades on Ethereum 2.0 will follow the normal hard-fork procedure, requiring validators to upgrade their nodes in order to implement protocol changes.

Using the Wasm meta-protocol, Polkadot can enact chain upgrades and successful proposals without a hard fork. Anything that is within the STF, the transaction queue, or off-chain workers can be upgraded without forking the chain.

## Conclusion

Ethereum 2.0 and Polkadot both use a sharded model where shard chains ("shards" in Ethereum 2.0 and "parachains/parathreads" in Polkadot) are secured by a main chain by linking shard state in the blocks of the main chains. The two protocols differ in a few main areas. First, all shards in Ethereum 2.0 have the same STF, while Polkadot lets shards have an abstract STF. Second, governance processes in Ethereum are off-chain and require coordination for a hard fork to enact governance decisions, while in Polkadot the decisions are on-chain and enacted autonomously. Third, the validator selection mechanisms are different because Polkadot can provide strong availability and validity guarantees with a smaller number of validators per shard.

## References

1. [Ethereum 2.0 Phases](https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/eth-2.0-phases/)
2. [Ethereum 2 Block Time](https://github.com/ethereum/eth2.0-specs/blob/676e216/specs/phase0/beacon-chain.md#time-parameters)
3. [Ethereum 2.0 Economics](https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/eth-2.0-economics/)
4. [Buterin, Eth2 shard chain simplification proposal](https://notes.ethereum.org/@vbuterin/HkiULaluS)
5. [Messari Crypto Theses for 2020](https://messari.io/report/crypto-theses-for-2020)
6. [eWasm Design](https://github.com/ewasm/design)
7. [Sharding FAQ](https://github.com/ethereum/wiki/wiki/Sharding-FAQ#how-would-synchronous-cross-shard-messages-work)
8. [Ethereum Governance Compendium](https://github.com/ethereum/wiki/wiki/Governance-compendium)
