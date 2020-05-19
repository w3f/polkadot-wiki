---
id: learn-launch
title: Polkadot Launch Phases
sidebar_label: Polkadot Launch Phases
description: An explanation of Polkadot's launch process and its individual phases
---

The Polkadot network will have a phased roll-out plan, with important milestones toward
decentralization marking each phase. Until Sudo is removed, the chain will be considered a _chain
candidate_ (CC), and not fully launched. During the CC phase, the chain may reset and change
dramatically due to critical bugs, important changes in the code, or other circumstances.

## The PoA Launch

Web3 Foundation will launch Polkadot in Proof of Authority (PoA) mode. Chain functionality will be
limited to claiming and staking DOT tokens. For those who plan to run validators, they can also set
their session keys.

During this time, governance is restricted to the Sudo key, which will be held by Web3 Foundation to
issue the commands and upgrades necessary to complete the launch process. There are no inflation or
rewards during this period.

The purpose of PoA is to ensure the network starts properly and allow community
[validators](maintain-validator) to claim their tokens, set up their infrastructure, and start
receiving nominations.

## Nominated Proof of Stake

Once Web3 Foundation is confident in the stability of the network and there are a sufficient number
of validator intentions, Web3 Foundation will use [Sudo](https://youtu.be/InekMjJpVdo) - a superuser
account with access to [governance](learn-governance) functions - to initiate the first validator
election. This election will transition the network from PoA into its second phase,
[Nominated Proof of Stake (NPoS)](learn-staking), where the network is
[secured by the economic stake](learn-security) that is bonded to the validators by the
[nominators](maintain-nominator) and the validators themselves.

Time-wise, the transition to Proof-of-Stake will largely depend on when a sufficient number of
validators are ready to take over the security of the network. This transition will probably require
at least 100 well back validators.

## Governance

After the chain has been running well with a sufficiently large validator set, the Sudo key will
issue a runtime upgrade that enables the suite of governance modules in Polkadot; namely, the
modules to enable a [Council](learn-governance#council), a
[Technical Committee](learn-governance#technical-committee), and
[public referenda](learn-governance#public-referenda). Once a Council and governance tools are in
place, the public has the avenues to effect changes in the system.

## Removal of Sudo

A runtime upgrade &mdash; either via governance processes or from Sudo itself &mdash; will remove
the Sudo module from the runtime.

From this point, the network is entirely in the hands of the token holders and no longer under
control of any centralized authority. Without Sudo, the chain will no longer be a candidate (CC) and
will be a live, decentralized network.

## Balance Transfers

To enable balance transfers, the community will have to come together and
[make a public proposal](maintain-guides-democracy) for a runtime upgrade that would lift the
restriction on balance transfers. Once the proposal passes referendum, there will be an enactment
period after which the change will automatically come into effect.

## Core Functionality

Once balance transfers are enabled, Polkadot can start to open up its core functionality, like
parachain slot auctions, parathreads, and cross-chain message passing. These upgrades will require
runtime upgrades that will pass through Polkadot's normal governance processes. The core
functionality does not have to be unlocked sequentially &mdash; several features can be unlocked
with a single proposal.
