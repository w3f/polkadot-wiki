---
id: learn-dot-ksm-bridge
title: Polkadot <> Kusama Bridge
sidebar_label: DOT <> KSM Bridge
description: Overview of Polkadot and Kusama Bridge.
keywords: [Bridge, XCM, Bridge Hub]
slug: ../learn-dot-ksm-bridge
---

Both Polkadot and Kusama blockchain networks achieve finality through GRANDPA consensus, which
enables trustless bridging of both the networks through their respective Bridge Hubs. Polkadot
Bridge Hub runs a [light client of Kusama network](https://polkadot.polkassembly.io/referenda/545)
and Kusama Bridge Hub runs a
[light client of Polkadot network](https://kusama.polkassembly.io/referenda/354), which were both
enabled through their respective OpenGov referenda. This trustless bridge allows Polkadot Asset Hub
to bridge in wrapped KSM tokens and Kusama Asset Hub to bridge in wrapped DOT tokens, thus making
DOT available to all Kusama parachains and KSM to all Polkadot parachains.

!!!info "Transferring Assets between Polkadot and Kusama"
    The user guides for transferring assets between Polkadot and Kusama are available [here](./learn-guides-DOT-KSM-bridge.md).

## Polkadot and Kusama Bridge Relayers

The job of the relayers is to relay Kusama/Polkadot GRANDPA justifications to the bridge hubs on one
side to the other. They also relay finalized Kusama Bridge Hub and Polkadot Bridge Hub block
headers. They operate only when messages are queued at the bridge hubs. When there are no messages
queued, the relayers stay idle.

### Run a Polkadot and Kusama Bridge Relayer

Anyone can start running a relayer for the Polkadot < > Kusama Bridge. For instructions, check
[the relayer docs on Polkadot-SDK repository](https://github.com/paritytech/polkadot-sdk/blob/master/bridges/docs/running-relayer.md).
Of course, running relayer has costs involved. Apart from paying for the CPU and network, the
relayer pays for transactions at both sides of the bridge.

### Relayer Rewards

!!!caution "Relayer Incentive Mechanism - Work in Progress"
    The initial bridge design supports any number of relayers, but there's no guaranteed reward for each
    and every relayer submitting valid bridge transactions. Also, these rewards are distributed from the
    accounts controlled by the respective relay chain's governance. Hence, any delays in replenishing
    the funds on these accounts will result in not receiving any rewards.

Rewards paid to relayer has two parts - static and dynamic. The static part of the reward is set
through the on-chain governance. It requires the relayer to deliver a preset number of valid
messages to earn a preset number of DOT or KSM. The other reward part is dynamic, which involves
delivering an XCM message from one BridgeHub to another. The relayer needs to submit transactions on
both the bridge hubs, where each transaction has its cost, which can be:

- dynamic, because message size can change and/or fee factor of the target chain may change.
- significant, because the bridge transactions can be of arbitrary size.

The relayers are compensated for the cost of submitting valid, minimal and useful bridge-related
transactions. Valid here means that the transaction doesn't fail. Minimal means that all data within
transaction call is actually required for the transaction to succeed. Useful means that all supplied
data in transaction is new and yet unknown to the target chain.

It is always the sending chain that will be paying for rewards for the relayers. The sending chain
will be paying at both ends of the bridge from its sovereign accounts on each Bridge Hub. For
example Polkadot Asset Hub (PAH) → Kusama Asset Hub (KAH) transfer will involve relayers getting
some rewards from PAH's sovereign account on Polkadot Bridge Hub (PBH) and some rewards from PAH's
sovereign account on Kusama Bridge Hub (KBH). It is the responsibility of Polkadot OpenGov to
replenish the funds of PAH's sovereign account on both the bridge hubs (PBH and KBH). Similarly, KAH
→ PAH transfer is rewarded by KAH's sovereign accounts on PBH and KBH, which have to be replenished
through Kusama OpenGov.

For more information on relayer rewards, check the
[relayers compensation scheme section](https://github.com/paritytech/polkadot-sdk/blob/master/bridges/docs/running-relayer.md#a-brief-introduction-into-relayers-and-our-compensations-scheme)
on the relayer docs on the Polkadot-SDK repository.
