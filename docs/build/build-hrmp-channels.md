---
id: build-hrmp-channels
title: Opening HRMP Channels
sidebar_label: Opening HRMP Channels
description: Steps on how to open HRMP channels between parachains.
keywords: [HRMP, parachain, statemint, proposal, asset hub, statemine]
slug: ../build-hrmp-channels
---

In order to communicate over [HRMP](../learn/learn-xcm-transport.md#hrmp-xcmp-lite), parachains must
establish channels by registering them on the Relay Chain. Like
[XCMP](../learn/learn-xcm-transport.md#xcmp-cross-chain-message-passing), HRMP is a message
transport protocol, but passes all messages via the Relay Chain. When XCMP is implemented on
Polkadot, HRMP is planned to be deprecated and phased out.

HRMP channels are uni-directional. Bi-directional communication between two parachains will require
two channels, one in each direction.

## Opening HRMP Channels

Opening a channel between two parachains is a two-phase process, with one chain first initiating a
channel request and then the second chain accepting it. When neither chain is a system chain, they
will use the `hrmpInitOpenChannel` and `hrmpAcceptOpenChannel` calls, respectively.

Each chain must dispatch the following calls on the Relay Chain from its parachain origin.

1. `hrmp > hrmpInitOpenChannel(recipient, proposedMaxCapacity, proposedMaxMessageSize)`: Initiates
   channel establishment by creating a channel request with a given configuration. Note that the max
   capacity and max message size must be within the `configuration`'s limits.

2. `hrmp > hrmpAcceptOpenChannel(sender)`: Accept the channel open request from the given sender.

In order to dispatch a call from its sovereign origin, a parachain may use governance to send the
encoded call in a `Transact` instruction to the Relay Chain, but it may also execute this logic
autonomously (e.g. on the notification that a channel was requested).

## Opening HRMP Channels with System Parachains

HRMP channel management involving system parachains takes place entirely on the Relay Chain. No
action is required from the parachain origin.

Opening an HRMP channel with a system parachain requires an
[OpenGov referendum](../learn/learn-guides-polkadot-opengov.md) using the
[General Admin Track](../learn/learn-polkadot-opengov-origins.md#general-admin).

Proposals should generally be a `batchAll` call containing two `forceOpenHrmpChannel` calls (one for
each direction of the channel).

As an example, see [Referendum 280](https://polkadot.polkassembly.io/referenda/280), which opened
two bi-directional channels with Asset Hub (one for Zeitgeist and one for Composable).

:::caution

Please ensure that you use the new `forceOpenHrmpChannel` directly on the Relay Chain, rather than
the old two-phase channel request/accept method.

:::

:::info

As of Polkadot and Kusama runtimes 1,001,000, channel establishment with system chains will not
require a deposit. However, for lower spec versions, each chain in the channel will need a free
balance of at least the required channel deposits plus the existential deposit.

For example, on Polkadot the sender and recipient deposit are both 10 DOT and the existential
deposit is 1 DOT. Each chain, as in both the system chain and its interlocutor, will need 21 DOT; 10
as a channel sender, 10 as a channel recipient, and 1 as existential.

Someone must transfer this DOT to the parachain sovereign accounts prior to the execution of the
`forceOpenHrmpChannel` calls.

:::

## Opening HRMP Channels Between Two System Parachains

As of Polkadot and Kusama runtimes 1,001,000, anyone can call an `establishSystemChannel` extrinsic
with two system parachains as arguments in order to establish a channel from the given sender to
receiver.
