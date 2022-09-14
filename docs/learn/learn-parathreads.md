---
id: learn-parathreads
title: Parathreads
sidebar_label: Parathreads
description: An introductory guide to Parathreads.
keywords: [parathreads, slots]
slug: ../learn-parathreads
---

Parathreads are an idea for parachains to temporarily participate (on a block by block basis) in
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} security without needing to lease a
dedicated parachain slot. This is done through economically sharing the scarce resource of a
_parachain slot_ among several competing resources (parathreads). Chains that otherwise would not be
able to acquire a full parachain slot or do not find it economically sensible to do so, are enabled
to participate in {{ polkadot: Polkadot's :polkadot }}{{ kusama: Kusama's :kusama }} shared security
&mdash; albeit with an associated fee per executed block. It also offers a graceful off-ramp to
parachains that no longer require a dedicated parachain slot, but would like to continue using the
Relay Chain.

## Origin

According to [this talk](https://v.douyu.com/show/a4Jj7llO5q47Dk01) in Chengdu, the origin of the
idea came from similar notions in the limited resource of memory on early personal computers of the
late '80s and '90s. Since computers have a limited amount of physical memory, when an application
needs more, the computer can create virtual memory by using _swap space_ on a hard disk. Swap space
allows the capacity of a computer's memory to expand and for more processes to run concurrently with
the trade-off that some processes will take longer to progress.

## How do Parathreads Operate?

A portion of the parachain slots on the Relay Chain will be designated as part of the parathread
pool. In other words, some parachain slots will have no parachain attached to them and rather will
be used as a space for which the winner(s) of the block-by-block parathread fee auction can have
their block candidate included.

Collators will offer a bid designated in {{ polkadot: DOT :polkadot }} {{ kusama: KSM :kusama }} for
inclusion of a parathread block candidate. The Relay Chain block author is able to select from these
bids to include a parathread block. The obvious incentive is for them to accept the block candidate
with the highest bid, which would bring them the most profit. The tokens from the parathread bids
will likely be split 80-20, meaning that 80% goes into
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} treasury and 20% goes to the block
author. This is the same split that applies also to transaction fees and, like many other parameters
in {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, can be changed through a
governance mechanism.

## Parachain vs. Parathread

Parachains and parathreads are very similar from a development perspective. One can imagine that a
chain developed with Substrate can at different points in its lifetime assume one of three states:
an independent chain with secured bridge, a parachain, or a parathread. It can switch between these
last two states with relatively minimal effort since the difference is more of an economic
distinction than a technological one.

Parathreads have the exact same benefits for connecting to {{ polkadot: Polkadot :polkadot }}
{{ kusama: Kusama :kusama }} that a full parachain has. Namely, it is able to send messages to other
para-objects through [XCMP](learn-cross-consensus.md###XCMP) and it is secured under the full
economic security of {{ polkadot: Polkadot's :polkadot }} {{ kusama: Kusama's :kusama }} validator
set.

The difference between parachains and parathreads is economic. Parachains must be registered through
a normal means of {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, i.e. governance
proposal or parachain slot auction. Parathreads have a fixed fee for registration that would
realistically be much lower than the cost of acquiring a parachain slot. Similar to how
{{ polkadot: DOT :polkadot }} {{ kusama: KSM :kusama }} are locked for the duration of parachain
slots and then returned to the winner of the auction, the deposit for a parathread will be returned
to the parathread after the conclusion of its term.

Registration of the parathread does not guarantee anything more than the registration of the
parathread code to the {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} Relay Chain.
When a parathread progresses by producing a new block, there is a fee that must be paid in order to
participate in a per-block auction for inclusion in the verification of the next Relay Chain block.
All parathreads that are registered are competing in this auction for their parathread to be
included for progression.

There are two interesting observations to make about parathreads. Since they compete on a per-block
basis, it is similar to how transactions are included in Bitcoin or Ethereum. A similar fee market
will likely develop, which means that busier times will drive the price of parathread inclusion up,
while times of low activity will require lower fees. Two, this mechanism is markedly different from
the parachain mechanism, which guarantees inclusion as long as a parachain slot is held; parathread
registration grants no such right to the parathread.

## Parathread Economics

There are two sources of compensation for collators:

1. Assuming a parathread has its own local token system, it pays the collators from the transaction
   fees in its local token. If the parathread does not implement a local token, or its local token
   has no value (e.g. it is used only for governance), then it can use {{ polkadot: DOT :polkadot }}
   {{ kusama: KSM :kusama }} to incentivize collators.
2. Parathread protocol subsidy. A parathread can mint new tokens in order to provide additional
   incentives for the collator. Probably, the amount of local tokens to mint for the parathread
   would be a function of time, the more time that passes between parathread blocks that are
   included in the Relay Chain, the more tokens the parathread is willing to subsidize in order to
   be considered for inclusion. The exact implementation of this minting process could be through
   local parathread inflation or via a stockpile of funds like a treasury.

Collators may be paid in local parathread currency. However, the Relay Chain transacts with the
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} native currency only. Collators must
then submit block candidates with an associated bid in {{ polkadot: DOT :polkadot }}
{{ kusama: KSM :kusama }}.

## Parachain Slot Swaps

It will be possible for a parachain that holds a parachain slot to swap this slot with a parathread
so that the parathread "upgrades" to a full parachain and the parachain becomes a parathread. The
chain can also stop being a chain and continue as a thread without swapping the slot. The slot, if
unoccupied, would be auctioned off in the next [auction period](learn-auction.md).

This provides a graceful off-ramp for parachains that have reached the end of their lease and do not
have sufficient usage to justify renewal; they can remain registered on the Relay Chain but only
produce new blocks when they need to.

Parathreads help ease the sharp stop of the parachain slot term by allowing parachains that are
still doing something useful to produce blocks, even if it is no longer economically viable to rent
a parachain slot.

## Resources

- [Parathreads: Pay-as-you-go Parachains](https://medium.com/polkadot-network/parathreads-pay-as-you-go-parachains-7440d23dde06)
