---
id: learn-comparisons-ethereum-2
title: Polkadot and Ethereum 2.0
sidebar_label: Ethereum 2.0
description: A high-level comparison between Polkadot and Ethereum 2.0.
keywords: [ethereum, ethereum 2.0, proof of stake, sharding]
slug: ../learn-comparisons-ethereum-2
---

Polkadot and Ethereum 2.0 are both sharded blockchain protocols. As such, they provide scalability
by executing transactions in separate shards and provide a protocol to send messages between shards.

## Model

The shards in Ethereum 2.0 all have the same state transition function (STF), as in the rules
governing how the blockchain can change state with each block. This STF provides an interface for
smart contract execution. Contracts exist on a single shard and can send asynchronous messages
between shards.

Likewise, in Polkadot, each shard hosts core logic, the shards are executed in parallel, and
Polkadot can send cross-shard asynchronous messages. However, each Polkadot shard (in Polkadot
terminology, "[parachain](learn-parachains.md)") has a unique STF. Applications can exist either
within a single shard or across shards by composing logic. Polkadot uses WebAssembly (Wasm) as a
"meta-protocol". A shard's STF can be abstract as long as the validators on Polkadot can execute it
within a Wasm environment. Polkadot will support smart contracts through parachains. To offer some
perspective, on Ethereum, smart contracts can call each other synchronously in the same shard and
asynchronously between shards. On Polkadot, smart contracts will be able to call each other
synchronously in the same parachain and asynchronously across parachains.

## Architecture

### Ethereum 2.0

Ethereum 2.0's main chain is called the Beacon Chain. The primary load on the Beacon Chain is
attestations, which are votes on the availability of shard data and Beacon Chain validity. Each
shard in Ethereum 2 is simply a blockchain with the Ethereum Wasm (eWasm) interface.

Ethereum 2.0 launched phase 0 of a multi-phase rollout in December 2020, operating in parallel to the
legacy Ethereum 1.0 chain:

- **Phase 0** provisioned the Beacon Chain, accepting deposits from validators and implementing
  proof-of-stake consensus, eventually among many shards.
- **Phase 1** launches 64 shards as simple chains, to test the Beacon Chain's finality. Each shard
  submits "crosslinks" to the Beacon Chain, which contains the information to finalize shard data.
- **Phase 1.5** integrates Eth 1 as a shard to finalize the proof-of-work chain's blocks.
- **Phase 2** implements the eWasm interface, phasing out proof-of-work, finally making the system
  usable to end-users. [1]

After the launch of the Beacon Chain in phase 0, the roadmap was altered to prioritize the
transition of the legacy Ethereum 1.0 chain from Proof-of-Work to Ethereum 2.0's Proof-of-Stake
consensus, preceding the rollout of shards on the network. [2]

The network will also have "side chains" to interact with chains that are not under the finality
protocol of Ethereum 2.0.

### Polkadot

Like Ethereum 2.0, Polkadot also has a main chain, called the Relay Chain, with several shards,
called [parachains](learn-parachains.md). Parachains are not restricted to a single interface like
eWasm. Instead, they can define their own logic and interface, as long as they provide their STF to
the Relay Chain validators so that they can execute it.

Polkadot, now live as a Relay Chain, only plans to launch the ability to validate up to 20 shards
per block, gradually scaling up to 100 shards per block. Besides parachains, which are scheduled for
execution every block, Polkadot also has [parathreads](learn-parathreads.md), which are scheduled on
a dynamic basis. This allows chains to share the sharded slots, much like multiple small airlines
might share a gate at an airport.

In order to interact with chains that want to use their own finalization process (e.g. Bitcoin),
Polkadot has [bridge parachains](learn-bridges.md) that offer two-way compatibility.

## Consensus

Both Ethereum 2.0 and Polkadot use hybrid consensus models where block production and finality each
have their own protocol. The finality protocols - Casper FFG for Ethereum 2.0 and GRANDPA for
Polkadot - are both GHOST-based and can both finalize batches of blocks in one round. For block
production, both protocols use slot-based protocols that randomly assign validators to a slot and
provide a fork choice rule for unfinalized blocks - RandDAO/LMD for Ethereum 2.0 and BABE for
Polkadot.

There are two main differences between Ethereum 2.0 and Polkadot consensus:

1. Ethereum 2.0 finalizes batches of blocks according to periods of time called "epochs". The
   current plan is to have 32 blocks per epoch, and finalize them all in one round. With a predicted
   block time of 12 seconds, this means the expected time to finality is 6 minutes (12 minutes
   maximum). [3] Polkadot's finality protocol, GRANDPA, finalizes batches of blocks based on
   availability and validity checks that happen as the proposed chain grows. The time to finality
   varies with the number of checks that need to be performed (and invalidity reports cause the
   protocol to require extra checks). The expected time to finality is 12-60 seconds.
2. Ethereum 2.0 requires a large number of validators per shard to provide strong validity
   guarantees. Polkadot can provide stronger guarantees with fewer validators per shard. Polkadot
   achieves this by making validators distribute an erasure coding to all validators in the system,
   such that anyone - not only the shard's validators - can reconstruct a parachain's block and test
   its validity. The random parachain-validator assignments and secondary checks performed by
   randomly selected validators make it impossible for the small set of validators on each parachain
   to collude.

## Staking Mechanics

Ethereum 2.0 is a proof-of-stake network that requires 32 ETH to stake for each validator instance.
Validators run a primary Beacon Chain node and multiple validator clients - one for each 32 ETH.
These validators get assigned to "committees", which are randomly selected groups to validate shards
in the network. Ethereum 2.0 relies on having a large validator set to provide availability and
validity guarantees: They need at least 111 validators per shard to run the network and 256
validators per shard to finalize all shards within one epoch. With 64 shards, that's 16_384
validators (given 256 validators per shard). [4][5]

Polkadot can provide strong finality and availability guarantees with much fewer validators.
Polkadot uses [Nominated Proof of Stake (NPoS)](learn-staking.md) to select validators from a
smaller set, letting smaller holders nominate validators to run infrastructure while still claiming
the rewards of the system, without running a node of their own. Polkadot plans to have 1_000
validators by the end of its first year of operation, and needs about ten validators for each
parachain in the network.

## Shards

Every shard in Ethereum 2.0 has the same STF. Each shard will submit "crosslinks" to the beacon chain
and implement an eWasm execution environment. EWasm is a restricted subset of Wasm for contracts in
Ethereum. The eWasm interface provides a set of methods available to contracts. There should be a
similar set of development tools like Truffle and Ganache to develop for eWasm. [7]

Every shard in Polkadot has an abstract STF based on Wasm. Each shard can expose a custom interface,
as long as the logic compiles to Wasm and the shard provides an "execute block" function to Polkadot
validators. Polkadot has the Substrate development framework that allows full spectrum composability
with a suite of modules that can be configured, composed, and extended to develop a chain's STF.

## Rollups

Rollups, a layer-2 scaling solution, has been talked about for some time, and their potential to scale Ethereum. A layer-2 network of nodes would be responsible for "rolling up" transactions together by batching them before publishing them to the main Ethereum chain. A rolled-up transaction could include thousands of transactions. Rollups increase TPS and can reduce transaction fees significantly. Rollups are a broad category of solution which encompass many different possible architectures and implementations.

### Optimistic Rollups

Using an "innocent until proven guilty" approach, optimistic rollups will accept transaction commitments to the network while validating for errors and security issues. If something is invalid, validators can submit fraudulent commitment proof (fraud-proofs). These proofs will be used to reject fraudulent transactions. This way, transaction results along with proof can be stored on the main network, but transaction data can be stored elsewhere. Optimistic rollups can improve transaction scalability 10-100x, and write transactions to Ethereum as [`calldata`](https://ethereum.stackexchange.com/questions/52989/what-is-calldata), reducing gas fees significantly.

Examples of optimistic rollup solutions include [Optimisim](https://www.optimism.io/), [Arbitrum](https://bridge.arbitrum.io/) and [Unipig](https://unipig.exchange/welcome).

### Zero-knowledge Rollups

:::note

Currently, Turing completeness is difficult in ZK rollups, a trusted setup is required to run the ZK Proofs, as well as the soundness of the cryptography, used needs to meet certain standards.

:::

[Zero-knowledge proofs](https://en.wikipedia.org/wiki/Zero-knowledge_proof) can be used as a "proof" of valid transactions when batching, effectively reducing the transaction payload to be the size of a zk-proof. This, similar to the optimistic approach, allows transaction data to be abstracted away and reduced significantly in size before being committed to the main chain. Similar to most on-chain transactions and states, a ZK-rollup's state is represented as a [merkle tree](https://en.wikipedia.org/wiki/Merkle_tree), and the cryptographic hash of the tree's root(Merkle root) is what is stored on-chain. This allows for efficient batching, and tracking of changes to the transaction states. Any changes to the state will require the operator who initiated the changes to compute a new state root and commit it to the on-chain contract. If the contract verifies the new state as valid, then provided root hash becomes the new state root.

#### EIP 4844

"Introduce a new transaction format for “blob-carrying transactions” which contain a large amount of data that cannot be accessed by EVM execution, but whose commitment can be accessed. The format is intended to be fully compatible with the format that will be used in full sharding."

Until the full spec of ETH 2.0 sharding is implemented, this stopgap introduces the "blob-transactions" transaction format, in the same way they would be designed with sharding, but without sharding those transactions. Blob-transactions are transactions that carry a large amount of data that cannot be accessed by the EVM, but whose commitment can be accessed. Compared to full sharding where the space allocated for this additional transaction data will be ~16MB, this EIP allows for a reduced cap corresponding to a target of ~1MB and a limit of ~2MB, which the rollup transactions can utilize. 

### Rollups in Polkadot

In Polkadot, the Parachains can be considered as a different way to achieve what rollups do. The sharding model already exists as the Relay-chain being the beacon chain and Parachains being the shards. Parachains are most similar in implementation to an Optimistic rollup and in architecture to a ZK-rollup. Parachain logic runs a validity proof. The proof (the approvals protocol) is interactive, unlike ZK-rollups, which are non-interactive. Additionally, unlike ZK-rollups, there are no difficulties in creating parachains with Turing-complete logic. This is a fundamental weakness of ZK rollups, as Turing completeness within ZK circuits is not easy.
In addition, Optimistic rollups are required by architecture to have their 'sequencer selection' logic live in their host contract. This is because the smart contract needs to accept blocks that may be bad and may not be executed and needs to filter out spam. Parachains, like ZK rollups, can encapsulate the sequencer-selection logic within their validation code.

## Message Passing

Shards in Ethereum 2.0 will have access to each other's state via their crosslinks and state proofs.
In the model of Ethereum 2.0 with 64 shards, each one posts a crosslink in the Beacon Chain for
every block, [4] meaning that shards could contain logic that executes based on some light client
proof of a transaction on another shard. [8] Ethereum 2.0 has not released a specification for which
nodes pass messages between shards.

Polkadot uses [Cross-Consensus Message Passing Format (XCM)](learn-cross-consensus.md) for
parachains to send arbitrary messages to each other. Parachains open connections with each other
and can send messages via their established channels. Given that collators will need to be full
nodes of the Relay Chain as well, they will be connected and will be able to relay messages from
parachain A to parachain B.. Messages do not pass through the Relay Chain, only proofs of post and
channel operations (open, close, etc.) go into the Relay Chain. This enhances scalability by keeping
data on the edges of the system.

Polkadot will add a protocol called [SPREE](learn-spree.md) that provides shared logic for
cross-chain messages. Messages sent with SPREE carry additional guarantees about provenance and
interpretation by the receiving chain.

## Governance

Ethereum 2.0 governance is still unresolved. Ethereum currently uses off-chain governance procedures
like GitHub discussions, All Core Devs calls, and Ethereum Magicians to make decisions about the
protocol. [9]

Polkadot uses on-chain [governance](learn-governance.md) with a multicameral system. There are
several avenues to issue proposals, e.g. from the on-chain Council, the Technical Committee, or from
the public. All proposals ultimately pass through a public referendum, where the majority of tokens
can always control the outcome. For low-turnout referenda, Polkadot uses adaptive quorum biasing to
set the passing threshold. Referenda can cover a variety of topics, including fund allocation from
an on-chain [Treasury](learn-treasury.md) or modifying the underlying runtime code of the chain.
Decisions get enacted on-chain and are binding and autonomous.

## Upgrades

Upgrades on Ethereum 2.0 will follow the normal hard-fork procedure, requiring validators to upgrade
their nodes to implement protocol changes.

Using the Wasm meta-protocol, Polkadot can enact chain upgrades and successful proposals without a
hard fork. Anything that is within the STF, the transaction queue, or off-chain workers can be
upgraded without forking the chain.

## Conclusion

Ethereum 2.0 and Polkadot both use a sharded model where shard chains ("shards" in Ethereum 2.0 and
"parachains/parathreads" in Polkadot) are secured by a main chain by linking shard state in the
blocks of the main chains. The two protocols differ in a few main areas. First, all shards in
Ethereum 2.0 has the same STF, while Polkadot lets shards have an abstract STF. Second, governance
processes in Ethereum 2.0 are planned to be off-chain and thus require coordination for a hard fork
to enact governance decisions, while in Polkadot the decisions are on-chain and enacted
autonomously. Third, the validator selection mechanisms are different because Polkadot can provide
strong availability and validity guarantees with a smaller number of validators per shard.

## References

1. [Ethereum 2.0 Phases](https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/eth-2.0-phases/)
2. [Ethereum 2.0 Merge](https://ethereum.org/en/eth2/merge/)
3. [Ethereum 2 Block Time](https://github.com/ethereum/eth2.0-specs/blob/676e216/specs/phase0/beacon-chain.md#time-parameters)
4. [Ethereum 2.0 Economics](https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/eth-2.0-economics/)
5. [Buterin, Eth2 shard chain simplification proposal](https://notes.ethereum.org/@vbuterin/HkiULaluS)
6. [Messari Crypto Theses for 2020](https://messari.io/report/crypto-theses-for-2020)
7. [eWasm Design](https://github.com/ewasm/design)
8. [Sharding FAQ](https://github.com/ethereum/wiki/wiki/Sharding-FAQ#how-would-synchronous-cross-shard-messages-work)
9. [Ethereum Governance Compendium](https://github.com/ethereum/wiki/wiki/Governance-compendium)
10. [ETH Docs: ZK Rollups](https://ethereum.org/en/developers/docs/scaling/zk-rollups/)
11. [ETH Docs: Optimistic Rollups](https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/)
12. [EIP-4844 definition](https://eips.ethereum.org/EIPS/eip-4844?ref=hackernoon.com)
13. [Scaling Public Blockchains by Tobias Schaffner](https://wwz.unibas.ch/fileadmin/user_upload/wwz/00_Professuren/Schaer_DLTFintech/Lehre/Tobias_Schaffner_Masterthesis.pdf?ref=hackernoon.com)