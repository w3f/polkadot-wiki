---
id: kusama-timeline
title: Kusama Timeline
sidebar_label: Timeline
description: Stay up-to-date with the latest action on Kusama.
slug: ../../kusama-timeline
---

Kusama network started as a Proof-of-Authority network and was transitioned to Proof-of-Stake on
October 28, 2019 at approximately 16:43 UTC. The first successful validator set rotation
took place at 20:45 UTC.

Currently, Kusama is a healthy Proof-of-Stake network with over 900 validators and over eight
million blocks produced. If you are curious about the history of the Kusama network, you will find
more information in the sections below.

## Rollout plan

The rollout of full functionality of Kusama was staggered to allow for a safe transition. The first
PoS phase began with 20 validators. Of the 20, the Web3 Foundation ran nine and Parity Technologies
ran six. Five were ran by highly staked community members as voted in by the Phragmén election.

When the initial transition was successful, additional validator spots were opened 10 at a time in
order to allow for more validators to enter the active set.

When the first transition to PoS took place, the full functionality of Kusama was not fully
available. Notably, the Sudo key still existed and was used to initiate further upgrades. Balance
transfers were still disabled for a short while.

Kusama now has its full functionality enabled.

## Kusama's First Adventure

[Source](https://polkadot.network/kusamas-first-adventure/)

On January 4, 2020, the Polkadot mainnet runtime, which at that time still wasn't live, was
uploaded to the Kusama chain during a runtime upgrade. The mishap was due to a recent split of the
Kusama logic from the Polkadot logic and that runtime was not correctly named. This led to a halt of
block production on the Kusama chain and bricked the chain entirely.

The solution to the issue involved a rollback of the chain history before the problematic runtime
upgrade. However, due to intricacies of the block production mechanism, it was also
necessary to encapsulate the validators of the chain into a time bubble to trick them into believing
that they were producing blocks in the past. Furthermore, in order for the chain to catch up to the
present moment it was necessary to make time flow in the bubble at a speed of six times greater than
the speed of time in the real world. Therefore, the session of Kusama which would normally last one
hour would last only 10 minutes until the validators caught up to the present moment.

The above plan was executed successfully on January 7, 2020. Due to the time warp, the number of
missed blocks in the sessions directly following
[block #516558](https://polkascan.io/kusama/block/516558) was significantly higher. This is partly
what contributes to the much higher ratio of missed blocks on Kusama versus Polkadot today.

## Kusama's Current Adventure: Auctions

### Round One

Kusama promised chaos, and it delivered on that promise. On June 15th, 2021, the roll out of the
first public parachain slot auction commenced, marking the beginning of the end to deliver on the
last piece of core functionality outlined in the Polkadot whitepaper: purpose-built, interoperable
parachains.

Teams and projects looking to become an official parachain on the Kusama network have been working
hard to bring their technologies to life, many of whom started a
[crowdloan campaign](../../learn/learn-crowdloans.md##starting-a-crowdloan-campaign) in order to participate in
the slot auctions.

The five Kusama parachain winners for the first batch were: 
Karura, Moonriver, Shiden, Khala, and Bifrost.

Kusama made history with a permissionless launch of five independent parachains. As parachains become operational, the community will determine which additional features and network upgrades should be added over time.

### Round Two

While Kusama’s first five parachains are taking advantage of the built-in features of the network and forkless upgradability provided by Substrate,

chaos continues.

And in the spirit of chaos, more teams are eager to deploy on Kusama.
The launch of the second batch of parachain slot auctions officially went live in Septmeber 2021.
Slot auctions occurred over six weeks, where the auctions were expanded by Kusama Council to include 
six auctions instead of the original five. 

There will be a pause for evaluation of overall network performance before a third batch of auctions begins 
in a similar schedule.

The six Kusama parachain winners for the second batch were: 
KILT, Calamari, Basilisk, Altair, Parallel Heiko and ****

The path of Kusama deployment will pave the way to Polkadot's parachains as the technology becomes proven.
