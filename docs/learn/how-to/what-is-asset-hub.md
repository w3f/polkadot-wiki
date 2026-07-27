---
title: What is Asset Hub and How Do I Use It?
description: "Polkadot and Kusama Asset Hub (former Statemint and Statemine) are system parachains for creating and sending fungible and non-fungible (NFTs) tokens."
---

!!!info "Related Wiki page"
    For the underlying concepts, see [Asset Hub](../learn-assets.md).

Polkadot and Kusama Asset Hubs are system chains initially designed to facilitate the issuance and transfer of assets and NFTs. Since launch, they have evolved through two key upgrades: the Asset Hub migration and the ability to deploy smart contracts directly on the network.

Continue reading to learn more about Asset Hub, its role in the Polkadot ecosystem, and the different assets that can keep an account alive on this network.

!!! warning "ATTENTION"

    After the upgrade to runtime [version 2.0.0](https://polkadot.subsquare.io/referenda/1777), Polkadot and Kusama have migrated balances, staking, and governance from the Relay Chain to Asset Hub.

    Learn more about the Asset Hub migration in the following link: [Polkadot Asset Hub Migration: What You Must Know](asset-hub-migration.md)


### What's Asset Hub?

Originally, Asset Hub was created as a system chain designed to hold more than just the native token. Features such as NFTs were deployed on Asset Hub so that the Polkadot ecosystem could offer functionality beyond what the Relay Chain provided. Today, Asset Hub continues to provide these capabilities and, after the [migration](asset-hub-migration.md), it also hosts features that previously ran on the Relay Chain. More recently, Asset Hub was enhanced with smart contract capabilities, transforming it into a more flexible and programmable network.

Here are the key things to know about Asset Hub and its role in the Polkadot ecosystem:

  * Features that already existed on Asset Hub, such as creating new assets or NFTs, continue to function as always.
  * Developers can deploy smart contracts and users can interact with them.

  * For regular users, Asset Hub is the main network needed for everyday activity on Polkadot.
  * Most wallets automatically handle the network connection, so users often don't need to choose the network manually.
  * The Relay Chain is now used almost exclusively by validators and parachain operators.
  * Account balances were migrated from the Relay Chain to Asset Hub on October 7th, 2025, on Kusama and on November 4th, 2025, for Polkadot.
  * Staking and governance are now alive on Asset Hub and are no longer available on the Relay Chain.
  * The existential deposit in DOT is lower on Asset Hub than on the Relay Chain, and on Asset Hub there are additional sufficient assets (check section below) that can keep an account alive.

* * *

### How to use Asset Hub

Many of the features available on Asset Hub can already be accessed through the usual platforms and wallets. You can still transfer balances, stake your funds, participate in Polkadot OpenGov, create new assets, or manage your NFTs just as before.

Most wallets in the ecosystem automatically connect to the correct network to perform each action, so you don't need to change how you interact with Polkadot. Simply continue using your preferred wallet or tool.

* * *

### Smart contracts on Asset Hub

Starting with runtime version [2.0.4 on Kusama](https://github.com/polkadot-fellows/runtimes/releases/tag/v2.0.4) and [2.0.5 on Polkadot](https://github.com/polkadot-fellows/runtimes/releases/tag/v2.0.5), Asset Hub gained support for smart contract deployment, expanding its role beyond asset issuance and transfers.

With this upgrade, Polkadot Hub enables developers to deploy smart contracts while continuing to use familiar Ethereum tooling, workflows, and programming languages, making it easy to bring existing applications and development practices into the Polkadot ecosystem without switching stacks.

Obtain more information about smart contracts on Polkadot in our documentation:

  * Support article: [Polkadot Hub: Smart Contracts on Polkadot](https://paritytech.github.io/polkadot-support/trending/top-articles/polkadot-hub-smart-contracts-on-polkadot)
  * Polkadot Docs: [Smart Contracts on Polkadot Hub](https://docs.polkadot.com/smart-contracts/overview/)

* * *

### Sufficient and non-sufficient assets in Asset Hub

There are two types of assets on Asset Hub: sufficient and non-sufficient.

To hold a non-sufficient asset in an account, the account needs to exist on-chain, which means it needs to have a balance in the native asset at least as much as the [Existential Deposit (ED)](existential-deposit.md). This means **0.01 DOT**  on Polkadot Asset Hub and **0.000003333 KSM** on Kusama Asset Hub. These existential deposits are ten times smaller than those on the Relay Chains.

So, to send a non-sufficient asset, you need to ensure that the recipient account has at least the ED. A sufficient asset doesn't require the account to have any balance in the native token to be received.

However, each asset (either sufficient or non-sufficient) has its own minimum balance that an account must hold.

!!! warning "ATTENTION"

    Tether, the entity behind USDT, [has announced the discontinuation of USDT on the Kusama network](https://tether.to/en/tether-makes-strategic-transition-to-meet-community-demands-and-foster-innovation) (though it'll still be available on Polkadot).

    It's recommended you redeem your USDT from Kusama Asset Hub (formerly Statemine) by sending them to a compatible exchange (like[ Bitfinex](withdraw-usdt-from-exchanges.md)) before the specified deadline mentioned in Tether's official announcement.

Currently, the sufficient tokens and foreign assets (native assets on other networks) in Polkadot Asset Hub are:

  * USDC (asset ID: 1337)
  * USDT (asset ID: 1984)
  * ETH (foreign asset transferred via Snowbridge)
  * WETH (foreign asset transferred via Snowbridge)
  * KSM (foreign asset transferred via Polkadot <> Kusama bridge)
  * USDC (foreign asset transferred via Snowbridge)
  * USDT (foreign asset transferred via Snowbridge)

Sufficient tokens and foreign assets in Kusama Asset Hub are:

  * USDT (asset ID: 1984)
  * RMRK (asset ID: 8)
  * ETH (foreign asset transferred via Snowbridge)
  * WETH (foreign asset transferred via Snowbridge)
  * DOT (foreign asset transferred via Polkadot <> Kusama bridge)
  * USDC (foreign asset transferred via Snowbridge)
  * USDT (foreign asset transferred via Snowbridge)

!!! warning "ATTENTION"

    Anyone can create and name an asset on Asset Hub, which means many assets may share familiar names. However, that doesn't guarantee they're the real or official versions. To avoid scams, always verify the asset's unique ID before accepting or paying for it. For instance, the legitimate Tether USDT on Asset Hub has the ID 1984, anything else is fake USDT.

    If you don't know what the asset ID is for the token you're interested in, **contact the issuer** of the token and find out, before accepting any tokens.

* * *
