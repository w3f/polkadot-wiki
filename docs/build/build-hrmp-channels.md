---
id: build-hrmp-channels
title: Opening HRMP Channels
sidebar_label: Opening HRMP Channels
description: Steps on how to open HRMP channels between parachains.
keywords: [HRMP, parachain, statemint, proposal, asset hub, statemine]
slug: ../build-hrmp-channels
---

[HRMP](../learn/learn-xcm.md#xcmp-lite-hrmp) has the same interface and functionality as
[XCMP](../learn/learn-xcm.md#xcmp-cross-chain-message-passing) but is much more demanding on
resources since it passes all messages via the Relay Chain. When XCMP is implemented on Polkadot,
HRMP is planned to be deprecated and phased out in favor of it.

## Opening HRMP channel: parachain to parachain

To open a channel from one parachain to another that are not system chains on Polkadot, the
governance of each parachain needs to declare its intent to open a channel on the Relay Chain, and
the second chain needs to accept and do the same.

In order to do this, the calls to be dispatched from both chains are:

1. `hrmp > hrmpInitOpenChannel(recipient, proposedMaxCapacity, proposedMaxMessageSize)`: this call
   initiates opening a channel from a parachain to a given recipient with given channel

2. `hrmp > hrmpAcceptOpenChannel(sender)`: accepting the channel open request from the given sender.

Each parachain is to use its own governance process to execute this. The call will be executed on
the Relay Chain.

## Opening HRMP Channels with System Parachains

Opening an HRMP channel with a system parachain requires a referendum. Like all other governance
proposals, proposers should follow best practices like opening a discussion on
[Polkassembly](https://polkadot.polkassembly.io/) or [Subsquare](https://polkadot.subsquare.io/) and
then submitting the proposal on-chain.

Proposals should generally be a `batch_all` call containing:

1. A `force_transfer` of the channel deposit from the Treasury to the System parachain's sovereign
   account. Remember that a bi-direction channel is _two_ channels so will need double the amount.
1. A `force_open_hrmp_channel` from your chain to the system chain.
1. A `force_open_hrmp_channel` from the system chain to your chain.

:::caution

Please ensure that you use the new `force_open_hrmp_channel` directly on the Relay Chain, rather
than the old two-phase channel request/accept method.

:::

## Publication on Polkassembly for discussion and feedback

The [discussions section of Polkassembly](https://polkadot.polkassembly.io/discussions) is the best
place to share the reasoning behind your proposal: make sure to log in with the proposer address (if
possible) before publishing yours, and if you can do this also make sure the address has an on-chain
identity.

### Example: Opening an HRMP Channel with the AssetHub

The following highlights the steps required to submit a proposal for opening an HRMP channel with
the AssetHub. Your submission should contain the following sections to be considered complete for
the community to review and ultimately vote on:

1.  A request on what the proposal aims to do (opening an HRMP channel with the AssetHub);
2.  The use cases this channel will support for your chain;
3.  Technical details of the proposal, including proposal parameters and technical details of this
    call (On Kusama, most proposals were designed as a batchAll calls):

    - A `forceTransfer` of 20 DOT from the Treasury to AssetHub sovereign account.
    - A `forceOpenhrmpchannel` from AssetHub (1,000) to ParaID.
    - A `forceOpenhrmpChannel` from ParaID to AssetHub (1,000).

    Please note that if governance decides to reduce the HRMP channel deposit on Polkadot to 0 DOT,
    the first transaction should not be necessary (these guidelines will be updated accordingly).

4.  The XCM message to the Asset Hub, which can be decoded on the network;
5.  The call data to verify on
    [Polkadot JS Apps Decode](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/extrinsics/decode)
    tab;
6.  The preimage hash to include in the proposal's submission. Note that if the proposer is planning
    to
    [submit a referendum on the Whitelisted Caller Track](../learn/learn-guides-polkadot-opengov.md#submitting-a-referendum-on-the-whitelisted-caller-track),
    the preimage hash needs to be submitted to and whitelisted by the
    [Technical Fellowship](../learn/learn-polkadot-opengov.md#the-technical-fellowship).

Below is an example of how teams followed this process on Kusama, as a way to:

- Proposal to open HRMP channel between Bifrost and the Asset Hub: the motion can be found
  [here](https://kusama.polkassembly.io/motion/418).

## Preimage submission on democracy tab (Polkadot JS Apps)

Once the community has given enough feedback (we expect these proposal to be non controversial)
please submit the image on the discussion post in the
[Democracy](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/democracy) tab on
Polkadot JS Apps, by using the "Submit Preimage" button:

![submit preimage](../assets/democracy/submit-preimage.png)

On the pop up window, compose the preimage in the discussion post: making sure the proposal hash is
the same as in the post.

## Vote by the community

After the community voting period, there will be an enactment period. In general, on Kusama these
have been defined in shorter terms than the voting periods. Again, it is very important you
encourage the community to vote on this, highlighting the benefits for your chain, use cases enabled
with this submission, among other things. After the enactment period is over, both chains will
authorize the channel.
