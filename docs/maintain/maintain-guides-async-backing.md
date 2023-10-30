---
id: maintain-guides-async-backing
title: Upgrade Parachain for Asynchronous Backing Compatibility
sidebar_label: Async Backing Upgrade
description:
  Steps on how to upgrade a parachain to be compatible with the relay chain's async backing feature.
keywords: [async, backing, parachain, consensus]
slug: ../maintain-guides-async-backing
---

:::info Who is this guide for?

This guide is relevant for cumulus based parachain projects started in 2023 or before. Later
projects should already be async backing compatible. If starting a new parachain project, please use
an async backing compatible template such as
[`cumulus/parachain-template`](https://github.com/paritytech/cumulus/tree/rh-test-async-backing).

:::

The rollout process for Async Backing has three phases. Phases 1 and 2 below put new infrastructure
in place. Then we can simply turn on async backing in phase 3. But first, some pre-reqs and context
to set the stage.

## Async Backing Prerequisites

Pull the latest version of Cumulus for use with your parachain. It contains necessary changes for
async backing compatibility. Latest on master branch of
[Polkadot-SDK](https://github.com/paritytech/polkadot-sdk) is currently sufficient. Any 2024 release
will work as well.

## Async Backing Terminology and Parameters

Time for a bit of context before we get started. The following concepts will aid in demystifying the
collator side of Async Backing and establish a basic understanding of the changes being made:

- _Unincluded segment_ - From the perspective of a parachain block under construction, the
  unincluded segment describes a chain of recent block ancestors which have yet to be included on
  the relay chain. The ability to build new blocks on top of the unincluded segment rather than on
  top of blocks freshly included in the relay chain is the core of asynchronous backing.
- _Capacity_ - The maximum size of the unincluded segment. The longer this is, the farther ahead a
  parachain can work, producing new candidates before the ancestors of those candidates have been
  seen as included on-chain. Practically, a capacity of 2-3 is sufficient to realize the full
  benefits of asynchronous backing, at least until the release of elastic scaling.
- _Velocity_ - The base rate at which a parachain should produce blocks. A velocity of 1 indicates
  that 1 parachain block should be produced per relay chain block. In order to fill the unincluded
  segment with candidates, collators may build up to `Velocity + 1` candidates per aura slot while
  there is remaining capacity. When elastic scaling has been released velocities greater than 1 will
  be supported.
- _AllowMultipleBlocksPerSlot_ - If this is `true`, Aura will allow slots to stay the same across
  sequential parablocks. Otherwise the slot number must increase with each block. To fill the
  unincluded segment as described above we need this to be `true`.
- _FixedVelocityConsensusHook_ - This is a variety of `ConsensusHook` intended to be passed to
  `parachain-system` as part of its `Config`. It is triggered on initialization of a new runtime. An
  instance of `FixedVelocityConsensusHook` is defined with both a fixed capacity and velocity. It
  aborts the runtime early if either capacity or velocity is exceeded, as the collator shouldn’t be
  creating additional blocks in that case.
- _AsyncBackingParams.max_candidate_depth_ - This parameter determines the maximum unincluded
  segment depth the relay chain will support. Candidates sent to validators which exceed
  `max_candidate_depth` will be ignored. `Capacity`, as mentioned above, should not exceed
  `max_candidate_depth`.
- _AsyncBackingParams.allowed_ancestry_len_ - Each parachain block candidate has a `relay_parent`
  from which its execution and validation context is derived. Before async backing the
  `relay_parent` for a candidate not yet backed was required to be the fresh head of a fork. With
  async backing we can relax this requirement. Instead we set a conservative maximum age in blocks
  for the `relay_parent`s of candidates in the unincluded segment. This age, `allowed_ancestry_len`
  lives on the relay chain and is queried by parachains when deciding which block to build on top
  of.
- _Lookahead Collator_ - A collator for Aura that looks ahead of the most recently included
  parachain block when determining what to build upon. This collator also builds additional blocks
  when the maximum backlog is not saturated. The size of the backlog is determined by invoking the
  AuraUnincludedSegmentApi. If that runtime API is not supported, this assumes a maximum backlog
  size of 1.

## Phase 1 - Update Parachain Runtime

## Phase 2 - Update Parachain Nodes

## Phase 3 - Activate Async Backing

## Timing by Block Number

With asynchronous backing it will be possible for parachains to opt for a block time of six seconds
rather than twelve seconds. But modifying block duration isn’t so simple for a parachain which was
measuring time in terms of its own block number. It could result in expected and actual time not
matching up, stalling the parachain.

One strategy to deal with this issue is to instead rely on relay chain block numbers for timing.
Relay block number is kept track of by each parachain in `pallet-parachain-system` with the storage
value `LastRelayChainBlockNumber`. This value can be obtained and used wherever timing based on
block number is needed.
