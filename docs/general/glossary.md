--- 
title: Glossary
description: Definitions of common terms and concepts in the Polkadot ecosystem.
---

# Polkadot Wiki Glossary

## Active Nomination

A validator (or validators) that a nominator has selected to nominate and is actively validating
this era. The nominator is placing their stake behind this validator for this era and will
potentially receive staking rewards in return for doing so.

## Alexander

The fourth (now defunct) proof of concept (PoC-4) [testnet](#testnet) for Polkadot.

## Asset Hub

A system parachain used for asset management.

## Attestation

In the network's validity system, an _attestation_ is a type of message that validators broadcast
that says whether they think a parachain candidate block is valid or invalid.

## Auction (Parachain)

Parachain auctions were used by non-system parachains to access Polkadot. The current method is
through purchase of [coretime](#coretime).

## Aura

Authority-based round-robin scheduling (AURA) provides a slot-based block authoring mechanism, where
a known set of authorities take turns producing blocks.

## Authority

An authority is a generic term for the role in a blockchain that can participate in the consensus
mechanisms. In [GRANDPA](#grandpa-finality-gadget), the authorities vote on chains they consider
final. In BABE, the authorities are block producers. Authority sets can be chosen to be mechanisms
such as Polkadot's NPoS algorithm.

## Availability Cores

Slots used to process parachains. The runtime assigns each parachain to an availability core and
validators can fetch information about the cores, such as parachain block candidates, by calling the
appropriate Runtime API.

## BABE

Blind Assignment for Blockchain Extension (BABE) is Polkadot's block production mechanism.

## Bitfield Array

A bitfield array contains single-bit values which indicate whether a [candidate](#candidate) is
available. The number of items is equal of to the number of
[availability cores](#availability-cores) and each bit represents a vote on the corresponding core
in the given order.

## Block

A collection of data, such as transactions, that together indicate a state transition of the
blockchain.

## Blockspace

[Blockspace](https://polkadot.network/blog/blockspace-blockspace-ecosystems-how-polkadot-is-unlocking-the-full-potential-of-web3)
is the capacity of a blockchain to finalize and commit operations. It represents a blockchain's
security, computing, and storage capability as an end product. Blockspace produced by different
blockchains can vary in quality, availability, and flexibility. Polkadot has a
[blockspace-centric architecture](https://www.rob.tech/blog/polkadot-blockspace-over-blockchains/).

## Block Explorer

An application that allows a user to explore the different blocks on a blockchain.

## Blocks Nominations

This indicates that a validator does not allow any more nominations. This is controlled by
the validator.

## BLS

Boneh-Lynn-Shacham (BLS) signatures have a slow signing, very slow verification, require slow and
much less secure pairing friendly curves, and tend towards dangerous malleability. Yet, BLS permits
a diverse array of signature aggregation options far beyond any other known signature scheme, which
makes BLS a preferred scheme for voting in consensus algorithms and threshold signatures.

## Bonding

A process by which tokens can be "frozen" in exchange for some other benefit. For example, staking
is a form of bonding for which you receive rewards in exchange for securing the network.

## [Bounty](../learn/learn-polkadot-opengov-treasury.md#bounties)

A mechanism that allows network participants to access treasury funding without going through the
process of submitting an OpenGov referendum. Note that a bounty got funds through OpenGov in the
first place, but the subsequent disbursement of those funds is controlled by curators based on
achieved milestones by the recipient.

## Bridge

A parachain that acts as an intermediary between the relay chain and an external chain, in such a
way that it appears to the relay chain that the external chain is a parachain (i.e., meets the
network Host's requirements of parachains). Bridges allow for interaction between other blockchains,
such as Ethereum and Bitcoin, that are not natively compatible with the relay chain.

## Byzantine Fault Tolerance

The property of a system that is tolerant of Byzantine faults; a system where not only may
individual subsystems fail, but it may not be clear if a particular subsystem has failed or not.
That is, different observers on the system may not agree on whether or not the system has failed.
Ensuring Byzantine fault tolerance is an important part of developing any distributed system.

## Capacity

The maximum number of nominators signalling intent to nominate a validator (and thus could
potentially actively nominate that validator in the next session).

## Candidate

A candidate is a submitted parachain block to the relay chain validators. A parachain block stops
being referred to as a candidate as soon it has been finalized.

## Collations

Parachain blocks or candidates that are being proposed to the relay chain validators. More
specifically, a collation is a [data structure](https://spec.polkadot.network/#defn-collation) which
contains the proposed parachain candidate, including an optional validation parachain Runtime update
and upward messages.

## Collator

A node that maintains a parachain by collecting parachain transactions and producing state
transition proofs for the validators.

## Collectives

The Polkadot Collectives parachain was added in [Referendum 81](https://polkadot-old.polkassembly.io/referendum/81) and exists only on Polkadot (i.e., there is no Kusama equivalent). The Collectives chain hosts on-chain groups that serve the Polkadot network, such as the [Polkadot Technical Fellowship](#technical-fellowship), the [Polkadot Alliance](#polkadot-alliance), and the Ambassador Fellowship. Collectives enable governance through customizable parameters, manage sub-treasuries, and facilitate collaborative decision-making.

## Commission

Validators and nominators get paid from block production on the network, where validators can set a
variable commission rate, which is initially subtracted from the total rewards that validator is
entitled to (for that period), where the commission determines the rate of distribution for the
remaining rewards set out for the nominators that are backing that validator.

## Common Good (Parachain)

See [System Parachains](#system-parachains), which is generally preferred over the term "common
good".

## Community Queue

The queue for proposals originating from individual accounts (i.e. not the Council) which are
waiting to become referenda. Compare the External queue.

## Consensus

The process of a group of entities to agree on a particular data value (such as the ordering and
makeup of blocks on a blockchain). There are a variety of algorithms used for determining consensus.
The consensus algorithm used by Polkadot is [GRANDPA](#grandpa-finality-gadget).

## Coretime

The time allocated for utilizing a core that can be purchased in bulk or on demand. It is measured
in relay chain blocks.

## Crowdloan

A mechanism used in the past for potential parachains to temporarily source tokens to win an auction
for a relay chain core. Tokens gathered in this way were programmatically returned to the lender
after the lease period was over or the crowdloan period ended.

## Curator

A person, group, or other entity charged with judging and verifying the successful completion of a
Bounty.


## DApp

A generic term for a decentralized application, that is, one that runs as part of a distributed
network as opposed to being run on a specific system or set of systems.

## DOT

The native token for Polkadot. DOT serves three purposes: network governance (allowing them to vote
on-chain upgrades and other exceptional events), general operation (rewarding good actors and
punishing bad actors), and bonding (adding new parachains by "freezing" DOT while they are connected
the relay chain).

## Duty Roster

A lookup table that specifies the job that a particular validator is required to do (i.e. attest to
the validity of a specific parachain). The duty roster routinely shuffles the validator set into
different subsets per parachain.

## Epoch

An epoch is a time duration in the BABE protocol that is broken into smaller time slots. Each slot
has at least one slot leader who has the right to propose a block. In Kusama, it is the same
duration as a [session](#session).

## Era

A (whole) number of sessions, which is the period that the validator set (and each validator's
active nominator set) is recalculated and where rewards are paid out.

## Equivocation

Providing conflicting information to the network. BABE equivocation entails creating multiple blocks
in the same slot. [GRANDPA](#grandpa-finality-gadget) equivocation would consist of signing multiple
conflicting chains.

## External Queue

**Not applicable to OpenGov.** The queue for proposals originating with the Council which are
waiting to become referenda. Compare the Community queue.

## Extrinsic

A [SCALE encoded](https://docs.polkadot.com/polkadot-protocol/basics/data-encoding/#scale-codec) array consisting of a version
number, signature, and varying data types indicating the resulting runtime function to be called,
including the parameters required for that function to be executed. These state changes are invoked
from the outside world, i.e. they are not part of the system itself. Extrinsics can take two forms,
"[inherents](#inherent)" and "[transactions](#transaction)". For more technical details see the
[polkadot spec](https://spec.polkadot.network/#id-extrinsics)

## Technical Fellowship

A mostly self-governing expert body with a primary goal of representing humans who embody and
contain the technical knowledge base of the Kusama and/or Polkadot networks and protocols.

## Finality

The property of a block that cannot be reverted. Generally, created blocks are not final until some
point in the future - perhaps never, in the case of "probabilistic finality". The relay chain uses a
deterministic finality gadget known as [GRANDPA](#grandpa-finality-gadget).

## Finality Gadget

A mechanism that determines finality.

## Frame

The collection of Substrate-provided pallets (Substrate Runtime Modules).

## Genesis

The origin of a blockchain, also known as block 0. It can also be used to reference the initial
state of the blockchain at origination.

!!!note "Example"
    In the _genesis_ state Alice, Bob, and Charlie had 30 tokens each.

## Governance

The process of determining what changes to the network are permissible, such as modifications to
code or movement of funds. The governance system is on-chain and revolves around stakeholder voting.

## Governance Council

An on-chain entity that consists of several on-chain accounts (starting at 6, eventually moving to
the final value of 24). The Council can act as a representative for "passive" (non-voting)
stakeholders. Council members have two main tasks: proposing referenda for the overall stakeholder
group to vote on and cancelling malicious referenda.

## GRANDPA Finality Gadget

GHOST-based Recursive ANcestor Deriving Prefix Agreement. It is the finality gadget allows
asynchronous, accountable, and safe finality to the blockchain. For an overview of GRANDPA, see
[this Medium post](https://medium.com/polkadot-network/polkadot-proof-of-concept-3-a-better-consensus-algorithm-e81c380a2372).

## Hard Fork

A permanent diversion of a blockchain occurs quickly due to a high priority change in a consensus
rule. Clients who follow a hard fork always need to upgrade their clients to continue following the
upgraded chain. Hard forks are considered permanent divergences of a chain for which non-upgraded
clients are following consensus rules incompatible to the ones followed by upgraded clients.

## Hard Spoon

Defined by Jae Kwon of Cosmos as "a new chain that takes into account state from an existing chain;
not to compete, but to provide broad access." A non-contentious blockchain that inherits the state
of the underlying blockchain and creates a new branch of _the same blockchain_.

## Horizontal Relay-routed Message Passing

Horizontal Relay-routed Message Passing, also known as HRMP, is a precursor to the complete XCMP
implementation, that mimics the same interface and semantics of XCMP. It is similar to XCMP except
for how it stores all messages in the relay chain storage, therefore making it more expensive and
demanding more resources than XCMP. The plan is to retire HRMP once the implementation of XCMP is
complete.

## Inactive Nomination

A validator (or validators) that a nominator has selected to nominate, but is not actively
validating this era. This type of nomination may become active in a future era.

## Inherent

Extrinsics that are "inherently true." Inherents are not gossiped on the network and are put into
blocks by the block author. They are not provably true the way that the desire to send funds is,
therefore they do not carry a signature. A blockchain's [runtime](#runtime) must have rules for
validating inherents. For example, timestamps are inherents. They are validated by being within some
margin that each validator deems reasonable.

## Injected Account

An account that is not directly managed by the Polkadot UI but can be accessed through it, such as
accounts controlled by the Polkadot-JS extension.

## Interoperability

The ability for some sort of system to exchange and make use of information often compared to
"cross-chain" technologies.

## Keep-Alive Check

The keep-alive check is used to indicate whether or not a transfer can allow the sending account to
be reduced to less than the existential deposit, causing it to be reaped.

## KSM

The abbreviation for Kusama network tokens.

## Kusama

The "canary network" for Polkadot. It consists of an early-release, unaudited version of the
Polkadot software. It is **not** a [testnet](#testnet) - after the transition to NPoS, the network
is entirely in the hands of the community (i.e., Kusama token holders).

## Lease Period

A particular amount of time that a parachain for which the parachain can connect to the relay chain.

## LIBP2P

An open-source library for encrypted peer-to-peer communications and other networking functions.
More information at: [https://libp2p.io/](https://libp2p.io/)

## Liveness

The property of a distributed system is that it will eventually come to some sort of consensus. A
system stuck in an infinite loop would not be considered live, even if computations are taking
place; a system that eventually provides a result, even if incorrect or it takes a long time, is
considered to have liveness.

## Mainnet

Short for "main network": the fully functional and acting chain that runs its own network.

## Message

In Polkadot's XCMP protocol, a _message_ is arbitrary data that is sent from one parachain (the
egress chain) to another (the ingress chain) through a channel and ensured delivery by the validator
set.

## Message Queue

In Polkadot's XCMP protocol, a _message queue_ is the list of messages waiting to be processed by a
particular receiving parachain over a channel.

## Metadata

Data that includes information about other data, such as information about a specific transaction.

## Motion

A motion is essentially a "referendum" or "decision" being considered by the Council. The Council
can vote on motions like approving Treasury Proposals or making proposals for the community to vote
on.

## Next Session

This indicates that the validator will be a member of the active set in the next session.

## Node Explorer

A tool that gives you information about a node, such as the latest blocks sealed, finalized, and the
current chain state as known by that node.

## Nominated Proof of Stake (NPoS)

A Proof-of-Stake system where nominators back validators with their own stake as a show of faith in
the good behavior of the validator. Nominated Proof-of-Stake differs from the more generic concept
Delegated Proof-of-Stake in that nominators are subject to loss of stake if they nominate a bad
validator; delegators are not subject to loss of stake based on the behavior of the validator. Note
that some other blockchain technologies may use the term Delegated Proof-of-Stake, even if
delegators can be [slashed](../learn/learn-offenses.md). Polkadot uses the Phragmén method to
allocate stake to nominees.

## Nominator

Accounts that select a set of validators to nominate by bonding their tokens. Nominators receive
some of the validators' rewards, but are also liable for slashing if their nominated validators
misbehave.

## NFT

A non-fungible token is a token that does not hold the property of fungibility, which, in turn,
means that it cannot be interchangeable and indistinguishable from other tokens. NFTs allow the
tokenization of unique items and provide exclusive ownership for those tokens.

## On-chain Governance

A governance system of a blockchain that is controlled by mechanisms on the blockchain. On-chain
governance allows decisions to be made transparently. Note that there are a variety of different
algorithms for making these decisions, such as simple majority voting, adaptive quorum biasing, or
identity-based quadratic voting.

## Polkadot OpenGov

Previously known as Governance v2 (Gov2) during early development,
[Polkadot OpenGov](../learn/learn-polkadot-opengov.md) serves as the current governance protocol for
both Kusama and Polkadot.

## Origin

The initiator of an extrinsic. A simple origin would be the account that is sending a token to
another account. Polkadot also supports more complex origin types, such as the
[root origin](#root-origin), from which privileged functions can be called.

## Pallet

A [Substrate](#substrate) runtime module.

## Parachain

A blockchain that meets several characteristics that allow it to work within the confines of the
network Host. Also known as "parallelized chain". All parachains start their life-cycle as a
parathread.

## ParaID

A unique numeric (non-negative integer) identifier for a parachain.

## Parathread

Historically, the term "parathread" has been used in two contexts: a chain registered with a
`ParaID` on the [relay chain](#relay-chain) that has not yet become a parachain (i.e. not connected
to a relay chain core), or as an on-demand parachain (i.e. a parachain using on-demand coretime)
which does not produce blocks at regular intervals.

## Parachain Registry

A relatively simple database-like construct that holds both static and dynamic information on each
chain.

## Parity Technologies

A company, founded by Dr. Gavin Wood and Dr. Jutta Steiner, that is developing Substrate, Kusama and
Polkadot. It has also released several other projects including Parity Ethereum and Parity Secret
Store.

## People Chain

A [system parachain](#system-parachains) for identity management.

## Polkadot

A heterogeneous, multi-chain network allowing various blockchains of different characteristics to
perform arbitrary, cross-chain communication under shared security.

## Polkadot Alliance

The Polkadot Alliance is an [on-chain collective](#collectives) founded by Acala, Astar, Interlay,
Kilt, Moonbeam, Phala, and Subscan, to establish standards and ethics for open-source development in
[referendum #94](https://polkadot-old.polkassembly.io/referendum/94). It aims to support development
standards and expose bad actors within the ecosystems of Polkadot.

## Polkadot SDK

A modular framework for building blockchains. Polkadot is built using
[Substrate](https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk/#substrate). Chains built with Substrate will be easy to connect as
parachains. For developers, see the
[Substrate GitHub repository](https://github.com/paritytech/polkadot-sdk/tree/master/substrate).

## Polkadot-JS

The JavaScript API for interacting with Polkadot.

## Preimage

The on-chain proposals do not require the entire image of extrinsics and data (for instance the WASM
code, in case of upgrades) to be submitted, but would rather just need that image's hash. That
**preimage** can be submitted and stored on-chain against the hash later, upon the proposal's
dispatch.

## Proof of Stake (PoS)

A method of selecting participation in a consensus system, in which participants are chosen based on
how many tokens they have at stake (at risk of loss due to misbehavior). Normally, Proof-of-Stake
systems limit the number of participants.

## Proof of Validity

A proof produced by parachain collators. Based on this proof and the parachain registry, a validator
can verify that a parachain has properly executed its state transition function. Proofs of Validity
go into the relay chain blocks.

## Proof of Work (PoW)

A method of selecting participants in a consensus system, typically the longest chain rule, in which
participants try to solve a puzzle like finding a partial pre-image of a hash. Normally, a
Proof-of-Work system can have any number of participants.

## Proposal

A potential function call to be voted on in a referendum. Proposals can modify the behavior of the
network, from minor parameter tuning up to replacing the runtime code.

## Protocol

A system of rules that allows two or more entities of a communications system to transmit
information. The protocol defines the rules, syntax, semantics, and synchronization of communication
and possible recovery methods.

## Random Seed

A random seed is a pseudo-random number available on-chain. It is used in various places of the
protocol, most prominently in [BABE](#babe), the block production mechanism.

## Referendum

A vote on whether or not a proposal should be accepted by the network. Referenda may be initiated by
the Governance Council, by a member of the public, or as the result of a previous proposal.
Stakeholders vote on referenda, weighted by both the size of their stake (i.e. number of DOT held)
and the amount of time they are willing to lock their tokens.

## Re-Genesis

Re-Genesis is the process of exporting the current chain state, and creating a new chain that builds
on it. Re-Genesis will involve stop-the-world migration, which results in a period of time when no
actual blocks are added to the blockchain. In a way, re-genesis can be viewed as a hard fork
process. A formal design of Re-Genesis on Substrate is still under development -
[Re-Genesis Rationale and Design](https://github.com/paritytech/substrate/issues/7458).

## Relay Chain

The chain that coordinates consensus and communication between parachains (and external chains, via
bridges).

## Remarks

Remarks are extrinsics with no effect. They provide additional information to external inputs,
acting as _notes_. Remarks are stored alongside block records and do not change the chain's storage;
the information is not stored in the chain's trie, but along blocks.

## Rococo

Rococo was a [testnet](#testnet) set aside for testing parachains, cumulus, and related technology.
Please refer to Paseo test network.

## Root Origin

A system-level origin in [Substrate](#substrate). This is the highest privilege level and can be
thought of as the superuser of the runtime origin. To learn about more raw origins in Substrate,
visit [Substrate Docs](https://docs.polkadot.com/polkadot-protocol/glossary/#origin)

## Runtime

The state transition function of a blockchain. It defines a valid algorithm for determining the
state of the next block given the previous state.

## Runtime Module

A module that implements specific transition functions and features one might want to have in their
runtime. Each module should have domain-specific logic. For example, a Balances module has logic to
deal with accounts and balances. In Substrate, modules are called "pallets".

## Safety

The property of a distributed system indicating that a particular state transition will not be
reverted. [GRANDPA](#grandpa-finality-gadget) provides _deterministic_ safety. That is, for a state
changed marked as "safe" or "final", one would require a hard fork to revert that change.

## Scalability

While an ambiguous concept, [blockchain] scalability can be understood as the ability for the
network to scale in capabilities (e.g. processing more transactions) when needed.

## Sealing

The process of adding a block to the relay chain. Note that finalization is a separate process -
blocks are finalized sometime after they are sealed.

## Session

A session is a Substrate implementation term for a period that has a constant set of validators.
Validators can only join or exit the validator set at a session change.

## Session Certificate

A message containing a signature on the concatenation of all the Session keys.

## Session Key

Hot keys that are used for performing network operations by validators, for example, signing
[GRANDPA](#grandpa-finality-gadget) commit messages.

## Shared Security

The security model used whereby all chains are equally secured. This is achieved by placing proofs
of the validity of parachain blocks into the relay chain such that, in order to revert finality of a
single parachain, an attacker would need to attack the entire system.

## Slashing

The removal of a percentage of an account's DOT as a punishment for a validator acting maliciously
or incompetently. For more information, see the [page about offenses](../learn/learn-offenses.md).

## Soft Fork

A backward compatible change to client code causes upgraded clients to start mining a new chain.
Requires a "vote-by-hashrate" of a majority of miners to enact successfully. Soft forks are
considered temporary divergences in a chain since non-upgraded clients do not follow the new
consensus rules but upgraded clients are still compatible with old consensus rules.

## Software Development Kit (SDK)

A collection of software tools (and programs) packaged together that can be used to develop
software.

## Spend Period

Successfully enacted Treasury track referenda will get funded at the end of the
[spending period](./chain-state-values.md). Treasury funds are directly
sent to the beneficiary account at the end of the spend period.

## Staking

The act of bonding tokens by putting them up as "collateral" for a chance to produce a valid block
(and thus obtain a block reward). Validators and nominators stake their tokens in order to secure
the network.

## State transition function

A function that describes how the state of a blockchain can be transformed. For example, it may
describe how tokens can be transferred from one account to another.

## Substrate

A modular framework for building blockchains. Polkadot is built using
[Substrate](https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk/#substrate). Chains built with Substrate will be easy to connect as
parachains. For developers, see the
[Substrate GitHub repository](https://github.com/paritytech/polkadot-sdk/tree/master/substrate).

## System Parachains

Parachains that are part of the Polkadot core protocol. These are allocated a parachain execution
core by governance rather than by coretime purchase. Examples of system parachains include
[Asset Hub](../learn/learn-assets.md), [Bridge Hub](../learn/learn-system-chains.md#bridge-hub),
[Collectives](../learn/learn-system-chains.md#collectives) and
[People Chain](../learn/learn-system-chains.md#people-chain).

## Tabling

In governance, bringing a proposal to a vote via referendum. Note that this is the British meaning
of "tabling", which is different from the US version, which means "to postpone" a measure.

## Teleport

Send an asset from an account on one chain to an account on a different chain. This occurs by
burning an amount on the sending chain and minting an equivalent amount on the destination chain.

## Testnet

Short for "test network": an experimental network where testing and development takes place.
Networks are often executed on a testnet before they are deployed to a [mainnet](#mainnet).

## Tracks

Each [Origin](#origin) is associated with a single referendum class and each class is associated
with a [Track](../learn/learn-polkadot-opengov-origins.md#origins-and-tracks-info). The Track outlines
the lifecycle for the proposal and is independent from other class's tracks. Having independent
tracks allows the network to tailor the dynamics of referenda based upon their implied privilege
level.

## Tranche

Validators use a subjective, tick-based system to determine when the approval process should start.
A validator starts the tick-based system when a new availability core candidates have been proposed,
which can be retrieved via the
[Runtime API](https://spec.polkadot.network/#sect-rt-api-availability-cores), and increments the
tick every 500 milliseconds. Each tick/increment is referred to as a “tranche”, represented as an
integer, starting at 0.

## Transfer

Send an asset from one account to another. This generally refers to transfers that occur only on the
same chain.

## Transaction

An extrinsic that is signed. Transactions are gossiped on the network and incur a transaction fee.
Transactions are "provably true", unlike inherents. For example, one can prove that Alice wants to
send funds to Bob by the fact that she signed a transfer-funds message with her private key.

## Validator

A node that secures the relay chain by staking DOT, validating proofs from collators on parachains
and voting on consensus along with other validators.

## Vertical Message Passing

Vertical message passing consists of two separate types of message passing, Downward Message Passing
(DMP) and Upward Message Passing (UMP). Downward messages pass from the relay chain to a parachain,
although they may also originate from another parachain via
[HRMP](#horizontal-relay-routed-message-passing). Upward messages originate from parachains and go
up to the relay chain via runtime entry points.

## Voting

The process of stakeholders determining whether or not a referendum should pass. Votes are weighted
both by the number of DOT that the stakeholder account controls and the amount of time they are
willing to lock their DOT.

## Waiting Nomination

The nominator has nominated this validator, but the validator was not elected into the active
validator set this era and thus cannot produce blocks for the canonical chain. If the validator does
get into the active set in a future era, this may turn into an active or inactive nomination.

## Wallet

A program that allows one to store private keys and sign transactions for Polkadot or other
blockchain networks.

## Wasm

The abbreviation for [WebAssembly](#webassembly).

## Watermark

In Polkadot's parachain messaging scheme, the _watermark_ is the minimum processed send-height of
the receiving parachain. All messages on all channels that are sending to this parachain at or
before the watermark are guaranteed to be processed.

## Web3 Foundation

A Switzerland-based foundation that nurtures and stewards technologies and applications in the
fields of decentralized web software protocols, particularly those that utilize modern cryptographic
methods to safeguard decentralization, to the benefit and for the stability of the
[Web3 ecosystem](./web3-and-polkadot.md).

## WebAssembly

An instruction format for a virtual, stack-based machine. Polkadot Runtime Modules are compiled to
WebAssembly. Also known as Wasm.

## Weights

A permission-less system needs to implement a mechanism to measure and limit usage in order to
establish an economic incentive structure, to prevent the network overload, and to mitigate DoS
vulnerabilities. This mechanism must enforce a limited time-window for block producers to create a
block and include limitations on block size, to prevent execution of certain extrinsics which are
deemed too expensive and could decelerate the network. This is handled by the weight system, where
the cost of the transactions (referred to as [extrinsics](#extrinsic)) are determined before
execution. Checkout this section of the Substrate docs covering
[transaction weights and fees](https://docs.polkadot.com/polkadot-protocol/basics/blocks-transactions-fees/fees/#transactions-weights-and-fees).

## Westend

The [testnet](#testnet) is set aside for testing the Polkadot relay chain. Contrary to the Paseo testnet, the Westend testnet is used by the core developers to iterate on
protocol-level features like [asynchronous backing](../learn/learn-async-backing.md), etc, that are
not relevant for parachain developers.

## Witness

Cryptographic proof statements of data validity.

## Whitelist Pallet

Allows one [Origin ](#origin) to escalate the privilege level of another Origin for a certain
operation. In terms of OpenGov, it allows the [Fellowship](#technical-fellowship) to authorise a new origin
(which we will call Whitelisted-Root) to be executed with Root-level privileges.

## Zombienet

A tool for running local Polkadot and Substrate testnets.


# Other Glossaries

See below other glossaries about the Polkadot Ecosystem.

- [Polkadot Glossary by UX Bounty](https://polkadot-ux-bounty.notion.site/UX-Glossary-v01-1a4e1c2781f3809c9292c6764804fa74)
- [Glossary by Polkadot Support](https://support.polkadot.network/support/solutions/articles/65000110873-glossary)
