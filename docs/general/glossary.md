---
id: glossary
title: Glossary
sidebar_label: Glossary
description: Common terms and concepts you may come across in the Polkadot ecosystem.
slug: ../glossary
---

## Active Nomination

A validator (or validators) that a nominator has selected to nominate and is actively validating
this era. The nominator is placing their stake behind this validator for this era and will
potentially receive staking rewards in return for doing so.

## Alexander

The fourth (now defunct) proof of concept (PoC-4) [testnet](##testnet) for Polkadot.

## Attestation

In the Polkadot validity system, an *attestation* is a type of message that validators broadcast
that says whether they think a parachain candidate block is valid or invalid.

## Auction (Parachain)

Parachain auctions are how non-common-good parathreads win a slot to become a parachain.

## Authority

An authority is a generic term for the role in a blockchain that can participate in the consensus
mechanisms. In [GRANDPA](#grandpa-finality-gadget), the authorities vote on chains they consider
final. In BABE, the authorities are block producers. Authority sets can be chosen to be mechanisms
such as Polkadot's NPoS algorithm.

## BABE

Blind Assignment of Block Extension is Polkadot's block production mechanism.

## Block

A collection of data, such as transactions, that together indicate a state transition of the
blockchain.

## Block Explorer

An application that allows a user to explore the different blocks on a blockchain.

## Blocks Nominations

This indicates that a validator does not currently allow any more nominations. This is controlled by
the validator.

## BLS

Boneh-Lynn-Shacham (BLS) signatures have a slow signing, very slow verification, require slow and
much less secure pairing friendly curves, and tend towards dangerous malleability. Yet, BLS permits
a diverse array of signature aggregation options far beyond any other known signature scheme, which
makes BLS a preferred scheme for voting in consensus algorithms and threshold signatures.

## Bonding

A process by which tokens can be "frozen" in exchange for some other benefit. For example, staking
is a form of bonding for which you receive rewards in exchange for securing the network. You can
also bond tokens in exchange for a parachain slot.

## Bounty

A mechanism which works in some sense as the reverse of a Treasury Proposal, allowing the Polkadot
Council to indicate that there is a need to do some task for the Polkadot network and allowing users
to receive DOT in return for working on that task.

## Bridge

A parachain that acts as an intermediary between the Polkadot Relay Chain and an external chain, in
such a way that it appears to the Relay Chain that the external chain is a parachain (i.e., meets
the Polkadot Host's requirements of parachains). Bridges allow for interaction between other
blockchains, such as Ethereum and Bitcoin, that are not natively compatible with Polkadot.

## Byzantine Fault Tolerance

The property of a system that is tolerant of Byzantine faults; a system where not only may
individual subsystems fail, but it may not be clear if a particular subsystem has failed or not.
That is, different observers on the system may not agree on whether or not the system has failed.
Ensuring Byzantine fault tolerance is an important part of developing any distributed system.

## Capacity

The maximum number of nominators signalling intent to nominate a validator (and thus could
potentially actively nominate that validator in the next session). This maximum number will equal
the number of nominators necessary to oversubscribe a validator. Any validator which is "at
capacity" or higher may potentially be oversubscribed in the next session; a validator that is not
at capacity cannot be oversubscribed unless more nominators select it before the next election.

## Collator

A node that maintains a parachain by collecting parachain transactions and producing state
transition proofs for the validators.

## Commission

Validators and nominators get paid from block production on the network, where validators can set a
variable commission rate, which is initially subtracted from the total rewards that validator is
entitled to (for that period), where the commission determines the rate of distribution for the
remaining rewards set out for the nominators that are backing that validator.

## Common Good (Parachain)

A parachain which does not win a parachain slot due to winning a slot auction, but is allowed on due
to providing a common good service for the network.

## Community Queue

The queue for proposals originating from individual accounts (i.e. not the Council) which are
waiting to become referenda. Compare the External queue.

## Consensus

The process of a group of entities to agree on a particular data value (such as the ordering and
makeup of blocks on a blockchain). There are a variety of algorithms used for determining consensus.
The consensus algorithm used by Polkadot is [GRANDPA](#grandpa-finality-gadget).

## Crowdloan

A mechanism for potential parachains to temporarily source tokens to win an auction for a parachain
slot. Tokens gathered in this way are programmatically returned to the lender after the lease period
is over or the crowdloan period ends.

## Curator

A person, group, or other entity charged with judging and verifying the successful completion of a
Bounty.

## Dapps

A generic term for a decentralized application, that is, one that runs as part of a distributed
network as opposed to being run on a specific system or set of systems.

## DOT

The native token for Polkadot. DOT serves three purposes: network governance (allowing them to vote
on-chain upgrades and other exceptional events), general operation (rewarding good actors and
punishing bad actors), and bonding (adding new parachains by "freezing" DOT while they are connected
the Relay Chain).

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

The queue for proposals originating with the Polkadot Council which are waiting to become referenda.
Compare the Community queue.

## Extrinsic

State changes that come from the outside world, i.e. they are not part of the system itself.
Extrinsics can take two forms, "[inherents](#inherent)" and "[transactions](#transaction)".

## Finality

The property of a block that cannot be reverted. Generally, created blocks are not final until some
point in the future - perhaps never, in the case of "probabilistic finality". The Polkadot Relay
Chain uses a deterministic finality gadget known as [GRANDPA](#grandpa-finality-gadget).

## Finality Gadget

A mechanism that determines finality.

## Frame

The collection of Substrate-provided pallets (Substrate Runtime Modules).

## Genesis

The origin of a blockchain, also known as block 0. It can also be used to reference the initial
state of the blockchain at origination.

> Example: "In the *genesis* state Alice, Bob, and Charlie had 30 tokens each."

## Governance

The process of determining what changes to the network are permissible, such as modifications to
code or movement of funds. The governance system in Polkadot is on-chain and revolves around
stakeholder voting.

## Governance Council

An on-chain entity that consists of several on-chain accounts (starting at 6, eventually moving to
the final value of 24). The Council can act as a representative for "passive" (non-voting)
stakeholders. Council members have two main tasks: proposing referenda for the overall stakeholder
group to vote on and cancelling malicious referenda.

## GRANDPA Finality Gadget

GHOST-based Recursive ANcestor Deriving Prefix Agreement. It is the finality gadget for Polkadot,
which allows asynchronous, accountable, and safe finality to the blockchain. For an overview of
GRANDPA, see
[this Medium post](https://medium.com/polkadot-network/polkadot-proof-of-concept-3-a-better-consensus-algorithm-e81c380a2372)

## Hard Fork

A permanent diversion of a blockchain occurs quickly due to a high priority change in a consensus
rule. Clients who follow a hard fork always need to upgrade their clients to continue following the
upgraded chain. Hard forks are considered permanent divergences of a chain for which non-upgraded
clients are following consensus rules incompatible to the ones followed by upgraded clients.

## Hard Spoon

Defined by Jae Kwon of Cosmos as "a new chain that takes into account state from an existing chain;
not to compete, but to provide broad access." A non-contentious blockchain that inherits the state
of the underlying blockchain and creates a new branch of *the same blockchain*.

## Horizontal Relay-routed Message Passing

Horizontal Relay-routed Message Passing, also known as HRMP, is a precursor to the complete XCMP
implementation, that mimics the same interface and semantics of XCMP. It is similar to XCMP except
for how it stores all messages in the Relay Chain storage, therefore making it more expensive and
demanding more resources than XCMP. The plan is to retire HRMP once the implementation of XCMP is
complete.

## Inactive Nomination

A validator (or validators) that a nominator has selected to nominate, but is not actively
validating this era. This type of nomination may become active in a future era.

## Inherent

Extrinsics that are "inherently true." Inherents are not gossiped on the network and are put into
blocks by the block author. They are not provably true the way that the desire to send funds is,
therefore they do not carry a signature. A blockchain's [runtime](##runtime) must have rules for
validating inherents. For example, timestamps are inherents. They are validated by being within some
margin that each validator deems reasonable.

## Injected Account

An account that is not directly managed by the Polkadot UI but can be accessed through it, such as
accounts controlled by the Polkadot{.js} extension.

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
Polkadot software. It is **not** a [testnet](##testnet) - after the transition to NPoS, the network
is entirely in the hands of the community (i.e., Kusama token holders).

## Lease Period

A particular amount of time that a parachain for which the parachain can connect to the Relay Chain.

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

In Polkadot's XCMP protocol, a *message* is arbitrary data that is sent from one parachain (the
egress chain) to another (the ingress chain) through a channel and ensured delivery by the validator
set.

## Message Queue

In Polkadot's XCMP protocol, a *message queue* is the list of messages waiting to be processed by a
particular receiving parachain over a channel.

## Metadata

Data that includes information about other data, such as information about a specific transaction.

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
delegators can be slashed. Polkadot uses the Phragmén method to allocate stake to nominees.

## Nominator

Accounts that select a set of validators to nominate by bonding their tokens. Nominators receive
some of the validators' rewards, but are also liable for slashing if their nominated validators
misbehave.

## Non-fungible Token (NFT)

A non-fungible token is a token that does not hold the property of fungibility, which, in turn,
means that it cannot be interchangeable and indistinguishable from other tokens. NFTs allow the
tokenization of unique items and provide exclusive ownership for those tokens.

## On-chain Governance

A governance system of a blockchain that is controlled by mechanisms on the blockchain. On-chain
governance allows decisions to be made transparently. Note that there are a variety of different
algorithms for making these decisions, such as simple majority voting, adaptive quorum biasing, or
identity-based quadratic voting.

## Online Message

This is a message that is broadcast by a validator to verify to the network that the validator is
online, even if they haven't published a block this epoch. This is sometimes referred to as
"ImOnline".

## Origin

The initiator of an extrinsic. A simple origin would be the account that is sending a token to
another account. Polkadot also supports more complex origin types, such as the [root origin](##Root Origin), from
which privileged functions can be called.

## Oversubscribed

If more than the maximum number of nominators nominate the same validator, it is "oversubscribed",
and only the top staked nominators (ranked by the amount of stake, up to the maximum number of
nominators) are paid rewards. Other nominators will receive no rewards for that era. The current
maximum number of nominators is {{ kusama_max_nominators }} on Kusama and
{{ polkadot_max_nominators }} on Polkadot, but it can be modified via governance.

## Pallet

A [Substrate](##substrate) runtime module.

## Parachain

A blockchain that meets several characteristics that allow it to work within the confines of the
Polkadot Host. Also known as "parallelized chain."

## Parachain Development Kit (PDK)

Similar to an [SDK](##sdk), parachain development kits (PDK) is a set of tools that make it easy for
developers to create Polkadot compatible [parachains](##parachain).

## ParaID

A unique numeric (non-negative integer) identifier for a parathread.

## Parathread

A blockchain that works within the confines of the Polkadot Host, thus allowing it to connect to the
Polkadot Relay Chain. This can be done either by becoming a parachain or connecting on a "pay as you
go" basis. All parachains start their life-cycle as a parathread.

## Parachain Registry

A relatively simple database-like construct that holds both static and dynamic information on each
chain.

## Parity Technologies

A company, founded by Dr. Gavin Wood and Dr. Jutta Steiner, that is developing Substrate and
Polkadot. It has also released several other projects including Parity Ethereum and Parity Secret
Store.

## Polkadot

A heterogeneous, multi-chain network allowing various blockchains of different characteristics to
perform arbitrary, cross-chain communication under shared security.

## Polkadot Host

The environment in which a runtime module can be executed. Parachains must support the Polkadot
Host - external chains that do not will have to use a bridge. Previously known as the Polkadot
Runtime Environment or PRE.

## Polkadot Runtime Environment

The previous name for the [Polkadot Host](##polkadot-host).

## Proof of Stake (PoS)

A method of selecting participation in a consensus system, in which participants are chosen based on
how many tokens they have at stake (at risk of loss due to misbehavior). Normally, Proof-of-Stake
systems limit the number of participants.

## Proof of Validity

A proof produced by parachain collators. Based on this proof and the parachain registry, a validator
can verify that a parachain has properly executed its state transition function. Proofs of Validity
go into the Relay Chain blocks.

## Proof of Work (PoW)

A method of selecting participants in a consensus system, typically the longest chain rule, in which
participants try to solve a puzzle like finding a partial pre-image of a hash. Normally, a
Proof-of-Work system can have any number of participants.

## Proposal

A potential function call to be voted on in a referendum. Proposals modify the behavior of the
Polkadot network, from minor parameter tuning up to replacing the runtime code.

## Protocol

A system of rules that allows two or more entities of a communications system to transmit
information. The protocol defines the rules, syntax, semantics, and synchronization of communication
and possible recovery methods.

## Random Seed

A random seed is a pseudo-random number available on-chain. It is used in various places of the
Polkadot protocol, most prominently in [BABE](##babe) the block production mechanism.

## Referendum

A vote on whether or not a proposal should be accepted by the network. Referenda may be initiated by
the Governance Council, by a member of the public, or as the result of a previous proposal.
Stakeholders vote on referenda, weighted by both the size of their stake (i.e. number of DOT held)
and the amount of time they are willing to lock their tokens.

## Re-Genesis

Re-Genesis is the process of exporting the current chain state, and creating a new chain that builds on it. Re-Genesis will involve stop-the-world migration, which results in a period of time when no actual blocks are added to the blockchain. In a way, re-genesis can be viewed as a hard fork process. A formal design of Re-Genesis on Substrate is still under development - [Re-Genesis Rationale and Design](https://github.com/paritytech/substrate/issues/7458).

## Relay Chain

The chain that coordinates consensus and communication between parachains (and external chains, via
bridges).

## Remarks

Remarks are extrinsics with no effect. They provide additional information to external inputs, acting 
as *notes*. Remarks are stored alongside block records and do not change the chain's storage; the 
information is not stored in the chain's trie, but along blocks. 

## Rococo

The [testnet](##testnet) set aside for testing parachains, cumulus, and related technology.

## Root Origin

A system level origin in [Substrate](##Substrate). This is the highest privilege level and can be thought of as the superuser of the runtime origin.
To learn about more raw origins in Substrate, visit [Substrate Docs](https://docs.substrate.io/v3/runtime/origins/)

## Runtime

The state transition function of a blockchain. It defines a valid algorithm for determining the
state of the next block given the previous state.

## Runtime Module

A module that implements specific transition functions and features one might want to have in their
runtime. Each module should have domain-specific logic. For example, a Balances module has logic to
deal with accounts and balances. In Substrate, modules are called "pallets".

## Safety

The property of a distributed system indicating that a particular state transition will not be
reverted. [GRANDPA](##grandpa-finality-gadget) provides *deterministic* safety. That is, for a state
changed marked as "safe" or "final", one would require a hard fork to revert that change.

## Scalability

While an ambiguous concept, [blockchain] scalability can be understood as the ability for the
network to scale in capabilities (e.g. processing more transactions) when needed.

## Sealing

The process of adding a block to the Relay Chain. Note that finalization is a separate process -
blocks are finalized sometime after they are sealed.

## Session

A session is a Substrate implementation term for a period that has a constant set of validators.
Validators can only join or exit the validator set at a session change.

## Session Certificate

A message containing a signature on the concatenation of all the Session keys. Signed by the
Controller.

## Session Key

Hot keys that are used for performing network operations by validators, for example, signing
[GRANDPA](##grandpa-finality-gadget) commit messages.

## Shared Security

The security model that Polkadot uses whereby all chains are equally secured. This is achieved by
placing proofs of the validity of parachain blocks into the Relay Chain such that, in order to
revert finality of a single parachain, an attacker would need to attack the entire Polkadot system.

## Slashing

The removal of a percentage of an account's DOT as a punishment for a validator acting maliciously
or incompetently (e.g., equivocating or remaining offline for an extended period).

## Soft Fork

A backward compatible change to client code causes upgraded clients to start mining a new chain.
Requires a "vote-by-hashrate" of a majority of miners to enact successfully. Soft forks are
considered temporary divergences in a chain since non-upgraded clients do not follow the new
consensus rules but upgraded clients are still compatible with old consensus rules.

## Software Development Kit (SDK)

A collection of software tools (and programs) packaged together that can be used to develop
software.

## Staking

The act of bonding tokens (for Polkadot, DOT) by putting them up as "collateral" for a chance to
produce a valid block (and thus obtain a block reward). Validators and nominators stake their DOT in
order to secure the network.

## State transition function

A function that describes how the state of a blockchain can be transformed. For example, it may
describe how tokens can be transferred from one account to another.

## Statemint

A common good parachain is used for asset management. The Kusama version is called Statemine; the
Westend version is called Westmint.

## Substrate

A modular framework for building blockchains. Polkadot is built using Substrate. Chains built with
Substrate will be easy to connect as parachains.

## Tabling

In Polkadot governance, bringing a proposal to a vote via referendum. Note that this is the British
meaning of "tabling", which is different from the US version, which means "to postpone" a measure.

## Teleport

Send an asset from an account on one chain to an account on a different chain. This occurs by
burning an amount on the sending chain and minting an equivalent amount on the destination chain.

## Testnet

Short for "test network": an experimental network where testing and development takes place.
Networks are often executed on a testnet before they are deployed to a [mainnet](##mainnet)

## Tokenization

The process of replacing sensitive data with non-sensitive data.

## Transfer

Send an asset from one account to another. This generally refers to transfers that occur only on the
same chain.

## Transaction

An extrinsic that is signed. Transactions are gossiped on the network and incur a transaction fee.
Transactions are "provably true", unlike inherents. For example, one can prove that Alice wants to
send funds to Bob by the fact that she signed a transfer-funds message with her private key.

## Validator

A node that secures the Relay Chain by staking DOT, validating proofs from collators on parachains
and voting on consensus along with other validators.

## Vertical Message Passing

Vertical message passing consists of two separate types of message passing, Downward Message Passing
(DMP) and Upward Message Passing (UMP). Downward messages pass from the Relay Chain to a parachain,
although they may also originate from another parachain via
[HRMP](##Horizontal-Relay-routed-Message-Passing). Upward messages originate from parachains and go
up to the Relay Chain via runtime entry points.

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

The abbreviation for [WebAssembly](##webassembly).

## Watermark

In Polkadot's parachain messaging scheme, the *watermark* is the minimum processed send-height of
the receiving parachain. All messages on all channels that are sending to this parachain at or
before the watermark are guaranteed to be processed.

## Web3 Foundation

A Switzerland-based foundation that nurtures and stewards technologies and applications in the
fields of decentralized web software protocols, particularly those that utilize modern cryptographic
methods to safeguard decentralization, to the benefit and for the stability of the Web3 ecosystem.

## WebAssembly

An instruction format for a virtual, stack-based machine. Polkadot Runtime Modules are compiled to
WebAssembly. Also known as Wasm.

## Witness

Cryptographic proof statements of data validity.
