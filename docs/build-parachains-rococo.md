---
id: build-parachains-rococo
title: Rococo Parachain Testnet
sidebar_label: Rococo Parachain Test Network
---

[Rococo](https://github.com/paritytech/cumulus#rococo-crown) is a Polkadot testnet built for testing
parachains. Rococo utilizes Cumulus and HRMP (Horizontal Relay-routed Message Passing) in order to
send transfers and messages between parachains and the Relay Chain. Every message is sent to the
Relay Chain, then from the Relay Chain to the desired parachain. Rococo currently runs four test
system parachains (Statemint, Tick, Trick, and Track), as well as several externally developed
parachains.

## What Parachains are on Rococo Now?

You can see the list of included parachains
[here](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frococo-rpc.polkadot.io#/parachains). A list of
proposed parachains is available
[here](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frococo-rpc.polkadot.io#/parachains/proposals).

## Obtaining ROC

ROC are available in the [Rococo Faucet](https://app.element.io/#/room/#rococo-faucet:matrix.org)
channel on Matrix. To receive ROC tokens, use the command:

```
!drip YOUR_ROCOCO_ADDRESS
```

## Build and Register a Rococo Parathread

[Cumulus](https://github.com/paritytech/cumulus#rococo) is set of tools for writing Substrate-based
parachains.

If you are interested in running and launching your own parathread or parachain, Parity Technologies
has created a [cumulus parachain workshop](https://substrate.dev/cumulus-workshop/) to show you how.
Get stuck or need support along the way? Join the
[Rococo matrix chat channel](https://matrix.to/#/#rococo:matrix.parity.io) and connect with other
builders there.

## How to connect to a Parachain

If you would like to connect to a parachain via [Polkadot-JS Apps](https://polkadot.js.org/apps/),
you may do so by clicking on the network selection at the top left hand corner of the navigation and
selecting any parachain of choice. For the purpose of these following examples, we will be using the
Rococo testnet "Custom Node" underneath "Development", following the
[parachain workshop](https://substrate.dev/cumulus-workshop/).

![parachains on polkadotjs](assets/polkadotjs_network_parachains.png)

## How to make Cross Chain transfers

To send a transfer between parachains, navigate to "Accounts" > "Transfer". From here, you'll need
to select the parachain node that you are running. Next, enter in the amount that you'd like to send
to another parachain. Be sure to select the correct parachain you'd like to send an amount to. Once
you've hit the "Submit" button, you should see a green notification, indicating a successful
transfer.

### Downward Transfers

Downward transfers are when an account on the Relay Chain sends a transfer to their account on a
different parachain. This type of transfer uses a depository and mint model, meaning that when the
DOT leave the sender's account on the Relay Chain and are transferred into an account on a
parachain, the parachain mints a corresponding amount of tokens on the parachain.

For example, we can send tokens from Alice's account on the Relay Chain to her account on
parachain 200. To do so, we will need to head to the "Network" > "Parachains" tab and click on the
"Transfer to chain" button.

![rococo downward transfer](assets/rococo/rococo-downward-transfer.png)

Notice here, that we can select which parachain to send the funds to, specify the amount to be sent,
and add any comments or a memo for the transfer.

### Upward Transfers

Upward transfers occur _from_ a parachain _to_ an account on the Relay Chain. To proceed with this
kind of transfer, we need to be connected to a parachain node on the network and be on the
"Network" > "Parachains" tab. Click on the "Transfer to chain" button.

![rococo upward transfer](assets/rococo/rococo-upward-transfer.png)

Note that the toggle should be set to off, ensuring that the funds go to the Relay Chain and not
another parachain.

### Lateral Transfers

This type of transfer is only possible with at least two different registered parachains. In true
XCMP, lateral transfers would allow for messages to be sent directly from one parachain to another.
However, this is not yet implemented, so the Relay Chain is helping us deliver messages for the time
being. Lateral transfers work through the depository model, which means that in order to transfer
tokens from chain 200 to chain 300, there must already be tokens owned by chain 200 deposited on
chain 300. Lateral transfers are called HRMP, Horizontal Relay-Chain Message Passing.

Before we can actually send funds from one parachain to another, we must ensure that the chain's
account on the recipient chain has some funds in it. In this example, Alice will be sending some
funds from her account on parachain 200 to her account on parachain 300.

We can get that parachain account address, from our parachain 300's terminal:

```
2020-08-26 14:46:34 Parachain Account: 5Ec4AhNv5ArwGxtngtW8qcVgzpCAu8nokvnh6vhtvvFkJtpq
```

From Alice's account on the Relay Chain, she is able to send some amount to parachain 200's
depository.

![rococo lateral transfer](assets/rococo/rococo-lateral-transfer.png)

Alice is now able to send from her account on parachain 200 to her account on parachain 300.

![rococo lateral transfer part 2](assets/rococo/rococo-lateral-transfer2.png)
