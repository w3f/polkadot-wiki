---
id: learn-system-chains
title: System Parachains
sidebar_label: System Parachains
description: System Parachains currently deployed on Polkadot.
keywords: [common good, system, parachains, system level, public utility]
slug: ../learn-system-chains
---

import RPC from "./../../components/RPC-Connection"; import Tabs from "@theme/Tabs"; import TabItem
from "@theme/TabItem";

## Overview

System parachains are those that contain core Polkadot protocol features, but in parachains rather
than the Relay Chain. Rather than leasing an execution core by economic means (e.g., auction),
execution cores are allocated by network [governance](./learn-guides-polkadot-opengov.md).

By hosting core protocol logic in parachains instead of the Relay Chain, Polkadot uses its own
scaling technology -- namely, parallel execution -- to host _itself_. System parachains remove
transactions from the Relay Chain, allowing more Relay Chain
[blockspace](https://www.rob.tech/polkadot-blockspace-over-blockchains/) to be used for Polkadot's
primary purpose: validating parachains.

System parachains always defer to on-chain governance to manage their upgrades and other sensitive
actions. That is, they do not have their own native tokens or governance systems separate from DOT
KSM. In fact, there will likely be a system parachain specifically for network governance.

:::note

In the past, these were often called "Common Good Parachains", so you may come across articles and
discussions using that term. As the network has evolved, that term has been confusing in many cases,
so "System Parachains" is preferred now. A discussion on this evolution can be found in
[this forum thread](https://forum.polkadot.network/t/polkadot-protocol-and-common-good-parachains/866).

:::

## Existing System Chains

<!-- prettier-ignore -->
<Tabs groupId="clients" values={[ {label: 'Polkadot', value: 'polkadot'}, { label: 'Kusama', value: 'kusama'} ]}>

<TabItem value="polkadot">

### Asset Hub

The [Asset Hub](https://github.com/paritytech/polkadot-sdk/tree/master/cumulus#asset-hub-) on both
Polkadot and Kusama are the first system parachains.

The Asset Hub is an asset portal for the entire network. It helps asset creators (e.g. reserve
backed stablecoin issuers) to track the total issuance of their asset in the
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} network, including amounts that have
been transferred to other parachains. It is also the point where they can transact, to mint and
burn, to manage the on-chain asset.

The Asset Hub also supports non-fungible assets (NFTs) via the
[Uniques pallet](https://polkadot.js.org/docs/substrate/extrinsics#uniques) and the new
[nfts pallet](https://polkadot.js.org/docs/substrate/extrinsics#nfts). For more information about
NFTs see the [dedicated wiki page](./learn-nft-pallets.md).

This logic for asset management is not encoded in smart contracts, but rather directly in the
runtime of the chain. Because of the efficiency of executing logic in a parachain, fees and deposits
are about 1/10th of their respective value on the Relay Chain.

These low fee levels mean that the Asset Hub is well suited for handling
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} balances and transfers as well as managing
on-chain assets. For example, the existential deposit for
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} is
{{ polkadot: <RPC network="polkadot" path="consts.balances.existentialDeposit" defaultValue={10000000000} filter="humanReadable"/>,  :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.balances.existentialDeposit" defaultValue={333333333} filter="humanReadable"/>,  :kusama }}
while only
{{ polkadot: <RPC network="statemint" path="consts.balances.existentialDeposit" defaultValue={1000000000} filter="humanReadable"/>  :polkadot }}
{{ kusama: <RPC network="statemine" path="consts.balances.existentialDeposit" defaultValue={3333333} filter="humanReadable"/>  :kusama }}
on the Asset Hub.

### Collectives

The Polkadot Collectives parachain was added in
[Referendum 81](https://polkadot.polkassembly.io/referendum/81) and exists only on Polkadot (i.e.,
there is no Kusama equivalent). The Collectives chain hosts on-chain collectives that serve the
Polkadot network.

Some of these collectives are the
[Polkadot Alliance](https://polkadot.polkassembly.io/referendum/94) and the Polkadot Technical
[Fellowship](./learn-polkadot-technical-fellowship.md). These on-chain collectives will play
important roles in the future of network stewardship and decentralized governance.

Networks themselves can act as collectives and express their legislative voices as single opinions
within other networks. This is achieved with the assistance from a [bridge hub](#bridge-hubs).

### Bridge Hubs

Before Polkadot and Kusama supported their first parachains, the only way to design a bridge was to
put the logic onto the Relay Chain itself. Since both networks now support parachains, it makes
sense to have a parachain on each network dedicated to bridges. This is because of the execution
isolation provided by parachains.

See the [Bridges page](learn-bridges.md) for information on the latest bridge projects.

### People Chain

The People Chain allows users to mange their account [identity](./learn-identity.md).

### Coretime Chain

The Coretime system chain allows users to buy coretime to access Polkadot's computation.
[Coretime marketplaces](./learn-guides-coretime-marketplaces.md) run on top of the Coretime chain.
For more information about agile coretime, see [here](./learn-agile-coretime.md).

</TabItem>
<TabItem value="kusama">

Compared to Polkadot, Kusama does not have the Collectives system chain, and it has the
[Encointer](https://encointer.org/encointer-for-web3/) system chain.

### Encointer

Encointer is a blockchain platform for self-sovereign ID and a global universal basic income. With
[referendum 158](https://kusama.polkassembly.io/referendum/158) Encointer was registered as the
second system parachain on Kusama's network. The functionality of Encointer adds logic to the Relay
Chain that aims to bring financial inclusivity to Web3 and mitigate Sybil attacks with a novel Proof
of Personhood (PoP) system for unique identity.

Encointer offers a framework that, in principle, allows for any group of real people to create,
distribute, and use their own digital community tokens.
[Referendum 187](https://kusama.polkassembly.io/referendum/187) introduced a runtime upgrade
bringing governance and full functionality for communities to be able to use the protocol.

Encointer aims to invert the
[Cantillon Effect](https://www.newworldencyclopedia.org/entry/Richard_Cantillon), where money is
issued at the bottom, and not as credit to businesses or creditworthy individuals. This way, every
individual gets a [universal basic income (UBI)](https://book.encointer.org/economics-ubi.html).

To resist Sybil attacks, the Encointer protocol uses a PoP mechanism to foster a unique identity
system. The notion is that a person can only be present at one place at a given time. Participants
are requested to attend physical key-signing ceremonies with small groups of random people at
randomized locations, where these local meetings are part of one global ceremony that co-occur.
Participants use the Encointer wallet app to participate in these ceremonies, and the wallet enables
the management of local community currencies. Watch an Encointer ceremony in action in
[this video](https://www.youtube.com/watch?v=tcgpCCYBqko).

The protocol involves [other mechanisms](https://book.encointer.org/ssi.html#privacy-considerations)
to protect the privacy of users in addition to the physical key-signing ceremonies.

Encointer was accepted as a system chain based on its offer of a Sybil defense mechanism as a basis
for digital democracy. This can also be adapted by other chains, which can use the unique identity
system to prevent Sybil attacks and use PoP for token airdrops or faucets.

:::tip

To learn more about Encointer, check out the official
[Encointer book](https://book.encointer.org/introduction.html).

:::

</TabItem>
</Tabs>
