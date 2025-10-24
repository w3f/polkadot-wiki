---
title: System Chains
description: System parachains on Polkadot offload core functionalities such as governance, balances, transfers, and bridging from the relay chain for better performance.
---

!!! info "Information about Polkadot's system chains is also available on the [Polkadot Developer Documentation](https://docs.polkadot.com/polkadot-protocol/architecture/system-chains/)"

The primary functionality of the relay chain is to secure the parachains and facilitate secure
communication between them. All other functionalities such as asset transfers, governance, identities
and bridging (a potentially resource intensive task) can benefit from operating separately on system
chains. System chains are responsible for delegating functionality away from the relay chain for
peformance reasons, taking advantage of the inherent parallelization the architecture of Polkadot
provides.

## Overview

System parachains are those that contain core Polkadot protocol features, but in parachains rather
than the relay chain. Rather than purchasing coretime on a marketplace, execution cores for system
chains are allocated through the network [governance](./learn-guides-polkadot-opengov.md).

By hosting core protocol logic in parachains instead of the relay chain, Polkadot uses its own
scaling technology -- namely, parallel execution -- to host _itself_. System parachains remove
transactions from the relay chain, allowing more relay chain
[blockspace](https://www.rob.tech/blog/polkadot-blockspace-over-blockchains/) to be used for Polkadot's
primary purpose: validating parachains.

System parachains always defer to on-chain governance to manage their upgrades and other sensitive
actions. That is, they do not have their own native tokens or governance systems separate from DOT
KSM. In fact, there will likely be a system parachain specifically for network governance.

!!!note
    In the past, these were often called "Common Good Parachains", so you may come across articles and discussions using that term. As the network has evolved, that term has been confusing in many cases, so "System Parachains" is preferred now. A discussion on this evolution can be found in [this forum thread](https://forum.polkadot.network/t/polkadot-protocol-and-common-good-parachains/866).

## Existing System Chains

=== "Polkadot"

    ### Asset Hub

    The [Asset Hub](https://github.com/paritytech/polkadot-sdk/tree/master/cumulus#asset-hub-) on both
    Polkadot and Kusama are the first system parachains.

    The Asset Hub was initially designed as an asset portal for the Polkadot network. Over time, its role expanded, and it has evolved into the primary technical host for most user-facing functionalities within the ecosystem.

    When users interact with Polkadot - such as creating an account, transferring tokens, or staking - they are, in practice, interacting with the Asset Hub. Although this is abstracted away in most wallets and interfaces, the underlying account data, balances, and staking mechanisms are managed by Asset Hub. It serves as the operational backbone for these activities, even if users are not directly aware of it.

    Core functionalities such as balances, transfers, staking, and asset management are executed on Asset Hub. Users can also issue and manage their own assets, including non-fungible tokens (NFTs), directly on the network.

    The Asset Hub provides tools for asset creators, such as reserve-backed stablecoin issuers, to monitor the total issuance of their assets across the entire network, including amounts transferred to other parachains. It also enables them to perform on-chain actions such as minting, burning, and asset administration.

    Unlike smart contract-based systems, asset management, staking and transfer logic on Asset Hub is embedded directly in the chain’s runtime. Due to the efficiency of parachain execution, transaction fees and required deposits are approximately one-tenth of those on the relay chain. 

    ### Collectives

    The Polkadot Collectives parachain was added in
    [Referendum 81](https://polkadot-old.polkassembly.io/referendum/81) and exists only on Polkadot (i.e.,
    there is no Kusama equivalent). The Collectives chain hosts on-chain collectives that serve the
    Polkadot network.

    Some of these collectives are the
    [Polkadot Alliance](https://polkadot-old.polkassembly.io/referendum/94) and the Polkadot Technical
    [Fellowship](./learn-polkadot-technical-fellowship.md). These on-chain collectives will play
    important roles in the future of network stewardship and decentralized governance.

    Networks themselves can act as collectives and express their legislative voices as single opinions
    within other networks. This is achieved with the assistance from a [bridge hub](#bridge-hub).

    ### Bridge Hub

    Before Polkadot and Kusama supported their first parachains, the only way to design a bridge was to
    put the logic onto the relay chain itself. Since both networks now support parachains, it makes
    sense to have a parachain on each network dedicated to bridges. This is because of the execution
    isolation provided by parachains.

    The Bridge Hub system parachain operates on the relay chain, and is responsible for faciliating
    bridges to the wider Web3 space. It contains the required bridge
    [pallets](../general/glossary.md#pallet) in its runtime, which enable trustless bridging with other
    blockchain networks like Polkadot, Kusama and Ethereum. The Bridge Hub uses the native token of the
    relay chain.

    See the [Bridges page](learn-bridges.md) for information on the latest bridge projects.

    ### People Chain

    The People Chain allows users to mange their account [identity](./learn-identity.md).

    ### Coretime Chain

    The Coretime system chain allows users to buy coretime to access Polkadot's computation.
    [Coretime marketplaces](./learn-guides-coretime-marketplaces.md) run on top of the Coretime chain.
    For more information about agile coretime, see [here](./learn-agile-coretime.md).

=== "Kusama"

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

    !!!tip
        To learn more about Encointer, check out the official [Encointer book](https://book.encointer.org/introduction.html).
