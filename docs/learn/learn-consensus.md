---
id: learn-consensus
title: Polkadot Consensus
sidebar_label: Consensus
description: An explanation of the consensus model used in Polkadot.
keywords: [consensus, proof of stake, nominated proof of stake, hybrid consensus, finality]
slug: ../learn-consensus
---

## Why do we need Consensus?

Consensus is a method for coming to agreement over a shared state. In order for the state of the
blockchain to continue to build and move forward, all nodes in the network must agree and come to
consensus. It is the way that the nodes in a decentralized network are able to stay synced with each
other. Without consensus for the decentralized network of nodes in a blockchain, there is no way to
ensure that the state one node believes is true will be shared by the other nodes. Consensus aims to
provide the _objective_ view of the state amid participants who each have their own _subjective_
views of the network. It is the process by which these nodes communicate and come to agreement, and
are able to build new blocks.

## What are PoW and PoS?

Proof of Work (PoW) and Proof of Stake (PoS) have been inaccurately used as short hand to refer to
consensus mechanisms of blockchains, but that does not capture the full picture. PoW is the method
for agreeing on a block author and part of the fuller [Nakamoto consensus](#nakamoto-consensus) that
also encompasses a chain selection algorithm (longest chain rule in Bitcoin). Similarly, PoS is a
set of rules for selecting the validator set and does not specify a chain selection rule or how a
chain might reach finality. PoS algorithms have traditionally been paired with an algorithm for
coming to Byzantine agreement between nodes. For example, [Tendermint](learn-comparisons-cosmos.md)
is a practical Byzantine fault tolerant algorithm that uses PoS as its validator set selection
method.

## Why not Proof of Work?

Although simple and effective in coming to a decentralized consensus on the next block producer,
proof of work with Nakamoto consensus consumes an incredible amount of energy, has no economic or
provable finality, and has no effective strategy in resisting cartels.

## Nominated Proof of Stake

In traditional PoS systems, block production participation is dependent on token holdings as opposed
to computational power. While PoS developers usually have a proponent for equitable participation in
a decentralized manner, most projects end up proposing some level of centralized operation, where
the number of validators with full participation rights is limited. These validators are often seen
to be the most wealthy, and, as a result, influence the PoS network as they are the most staked.
Usually, the number of candidates to maintain the network with the necessary knowledge (and
equipment) is limited; this can directly increase operational costs as well. Systems with a large
number of validators tend to form pools to decrease the variance of their revenue and profit from
economies of scale. These pools are often off-chain.

A way to alleviate this is to implement pool formation on-chain and allow token holders to vote
[with their stake] for validators to represent them.

Polkadot uses NPoS (Nominated Proof-of-Stake) as its mechanism for selecting the validator set. It
is designed with the roles of **validators** and **nominators**, to maximize chain security. Actors
who are interested in maintaining the network can run a validator node.

Validators assume the role of producing new blocks in
[BABE](learn-consensus.md/#block-production-babe), validating parachain blocks, and guaranteeing
finality. Nominators can choose to back select validators with their stake. Nominators can approve
candidates that they trust and back them with their tokens.

## Probabilistic vs. Provable Finality

A pure Nakamoto consensus blockchain that runs PoW is only able to achieve the notion of
_probabilistic finality_ and reach _eventual consensus_. Probabilistic finality means that under
some assumptions about the network and participants, if we see a few blocks building on a given
block, we can estimate the probability that it is final. Eventual consensus means that at some point
in the future, all nodes will agree on the truthfulness of one set of data. This eventual consensus
may take a long time and will not be able to be determined how long it will take ahead of time.
However, finality gadgets such as GRANDPA (GHOST-based Recursive ANcestor Deriving Prefix Agreement)
or Ethereum's Casper FFG (the Friendly Finality Gadget) are designed to give stronger and quicker
guarantees on the finality of blocks - specifically, that they can never be reverted after some
process of Byzantine agreements has taken place. The notion of irreversible consensus is known as
_provable finality._

In the [GRANDPA paper](https://github.com/w3f/consensus/blob/master/pdf/grandpa.pdf), it is phrased
in this way:

:::note

We say an oracle A in a protocol is _eventually consistent_ if it returns the same value to all
participants after some unspecified time.

:::

## Hybrid Consensus

There are two protocols we use when we talk about the consensus protocol of Polkadot, GRANDPA and
BABE (Blind Assignment for Blockchain Extension). We talk about both of these because Polkadot uses
what is known as _hybrid consensus_. Hybrid consensus splits up the finality gadget from the block
production mechanism.

This is a way of getting the benefits of probabilistic finality (the ability to always produce new
blocks) and provable finality (having a universal agreement on the canonical chain with no chance
for reversion) in Polkadot. It also avoids the corresponding drawbacks of each mechanism (the chance
of unknowingly following the wrong fork in probabilistic finality, and a chance for "stalling" - not
being able to produce new blocks - in provable finality). By combining these two mechanisms,
Polkadot allows for blocks to be rapidly produced, and the slower finality mechanism to run in a
separate process to finalize blocks without risking slower transaction processing or stalling.

Hybrid consensus has been proposed in the past. Notably, it was proposed (now defunct) as a step in
Ethereum's transition to proof of stake in [EIP 1011](http://eips.ethereum.org/EIPS/eip-1011), which
specified [Casper FFG](#casper-ffg).

## Block Production: BABE

BABE (Blind Assignment for Blockchain Extension) is the block production mechanism that runs between
the validator nodes and determines the authors of new blocks. BABE is comparable as an algorithm to
[Ouroboros Praos](https://eprint.iacr.org/2017/573.pdf), with some key differences in chain
selection rule and slot time adjustments. BABE assigns block production slots to validators
according to stake and using the Polkadot [randomness cycle](learn-randomness.md).

BABE execution happens in sequential non-overlapping phases known as epochs. Each epoch is divided
into a predefined number of slots. All slots in each epoch are sequentially indexed starting from 0
(slot number). At the beginning of each epoch, the BABE node needs to run the
[Block-Production-Lottery algorithm](https://spec.polkadot.network/#algo-block-production-lottery)
to find out in which slots it should produce a block and gossip to the other block producers.

Validators participate in a lottery for every slot, which will inform whether or not they are the
block producer candidate for that slot. Slots are discrete units of time of approximately 6 seconds
in length. Because the mechanism of allocating slots to validators is based on a randomized design,
multiple validators could be candidates for the same slot. Other times, a slot could be empty,
resulting in inconsistent block time.

### Multiple Validators per Slot

When multiple validators are block producer candidates in a given slot, all will produce a block and
broadcast it to the network. At that point, it's a race. The validator whose block reaches most of
the network first wins. Depending on network topology and latency, both chains will continue to
build in some capacity, until finalization kicks in and amputates a fork. See Fork Choice below for
how that works.

### No Validators in Slot

When no validators have rolled low enough in the randomness lottery to qualify for block production,
a slot can remain seemingly blockless. We avoid this by running a secondary, round-robin style
validator selection algorithm in the background. The validators selected to produce blocks through
this algorithm always produce blocks, but these _secondary_ blocks are ignored if the same slot also
produces a primary block from a [VRF-selected](learn-randomness.md) validator. Thus, a slot can have
either a _primary_ or a _secondary_ block, and no slots are ever skipped.

For more details on BABE, please see the
[BABE paper](https://research.web3.foundation/en/latest/polkadot/block-production/Babe.html).

### BADASS BABE: SASSAFRAS

SASSAFRAS (Semi Anonymous Sortition of Staked Assignees For Fixed-time Rhythmic Assignment of Slots)
(aka SASSY BABE or BADASS BABE), is an extension of BABE and acts as a constant-time block
production protocol. This approach tries to address the shortcomings of BABE by ensuring that
exactly one block is produced with time-constant intervals. The protocol utilizes zk-SNARKs to
construct a ring-VRF and is a work in progress. This section will be updated as progress ensues.

## Finality Gadget: GRANDPA

GRANDPA (GHOST-based Recursive ANcestor Deriving Prefix Agreement) is the finality gadget that is
implemented for the Polkadot Relay Chain.

The Polkadot Host uses the GRANDPA Finality protocol to finalize blocks. Finality is obtained by
consecutive rounds of voting by the validator nodes. Validators execute GRANDPA finality process in
parallel to Block Production as an independent service.

It works in a partially synchronous network model as long as 2/3 of nodes are honest and can cope
with 1/5 Byzantine nodes in an asynchronous setting.

A notable distinction is that GRANDPA reaches agreements on chains rather than blocks, greatly
speeding up the finalization process, even after long-term network partitioning or other networking
failures.

In other words, as soon as more than 2/3 of validators attest to a chain containing a certain block,
all blocks leading up to that one are finalized at once.

### Protocol

Please refer to [the GRANDPA paper](https://github.com/w3f/consensus/blob/master/pdf/grandpa.pdf)
for a full description of the protocol.

### Implementation

The
[Substrate implementation of GRANDPA](https://github.com/paritytech/substrate/blob/master/frame/grandpa/src/lib.rs)
is part of Substrate Frame.

## Bridging: BEEFY

The BEEFY (Bridge Efficiency Enabling Finality Yielder) is a secondary protocol to GRANDPA to
support efficient bridging between the Polkadot network (relay chain) and remote, segregated
blockchains, such as Ethereum, which were not built with the Polkadot interchain operability in
mind. The protocol allows participants of the remote network to verify finality proofs created by
the Polkadot relay chain validators. In other words: clients in the Ethereum network should able to
verify that the Polkadot network is at a specific state.

Storing all the information necessary to verify the state of the remote chain, such as the block
headers, is too expensive. BEEFY stores the information in a space-efficient way and clients can
request additional information over the protocol.

For additional implementation details, check out
[this](https://spec.polkadot.network/#sect-grandpa-beefy) section of the Polkadot Spec.

## Fork Choice

Bringing BABE and GRANDPA together, the fork choice of Polkadot becomes clear. BABE must always
build on the chain that has been finalized by GRANDPA. When there are forks after the finalized
head, BABE provides probabilistic finality by building on the chain with the most primary blocks.

![Best chain choice](../assets/best_chain.png)

In the above image, the black blocks are finalized, and the yellow blocks are not. Blocks marked
with a "1" are primary blocks; those marked with a "2" are secondary blocks. Even though the topmost
chain is the longest chain on the latest finalized block, it does not qualify because it has fewer
primaries at the time of evaluation than the one below it.

# Comparisons

## Nakamoto consensus

Nakamoto consensus consists of the longest chain rule using proof of work as its Sybil resistance
mechanism and leader election.

Nakamoto consensus only gives us probabilistic finality. Probabilistic finality states that a block
in the past is only as safe as the number of confirmations it has, or the number of blocks that have
been built on top of it. As more blocks are built on top of a specific block in a Proof of Work
chain, more computational work has been expended behind this particular chain. However, it does not
guarantee that the chain containing the block will always remain the agreed-upon chain, since an
actor with unlimited resources could potentially build a competing chain and expend enough
computational resources to create a chain that did not contain a specific block. In such a
situation, the longest chain rule employed in Bitcoin and other proof of work chains would move to
this new chain as the canonical one.

## PBFT / Tendermint

Please see the [relevant section](learn-comparisons-cosmos.md#consensus) in the Cosmos comparison
article.

## Casper FFG

The two main differences between GRANDPA and Casper FFG are:

- in GRANDPA, different voters can cast votes simultaneously for blocks at different heights
- GRANDPA only depends on finalized blocks to affect the fork-choice rule of the underlying block
  production mechanism

# Resources

- [BABE paper](https://research.web3.foundation/en/latest/polkadot/block-production/Babe.html) - The
  academic description of the BABE protocol.
- [GRANDPA paper](https://github.com/w3f/consensus/blob/master/pdf/grandpa.pdf) - The academic
  description of the GRANDPA finality gadget. Contains formal proofs of the algorithm.
- [Rust implementation](https://github.com/paritytech/finality-grandpa) - The reference
  implementation and the accompanying
  [Substrate pallet](https://github.com/paritytech/substrate/blob/master/frame/grandpa/src/lib.rs).
- [Block Production and Finalization in Polkadot](https://www.crowdcast.io/e/polkadot-block-production) -
  An explanation of how BABE and GRANDPA work together to produce and finalize blocks on Kusama,
  with Bill Laboon.
- [Block Production and Finalization in Polkadot: Understanding the BABE and GRANDPA Protocols](https://www.youtube.com/watch?v=1CuTSluL7v4&t=4s) -
  An academic talk by Bill Laboon, given at MIT Cryptoeconomic Systems 2020, describing Polkadot's
  hybrid consensus model in-depth.
