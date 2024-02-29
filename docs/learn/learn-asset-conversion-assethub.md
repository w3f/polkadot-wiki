---
id: learn-asset-conversion-assethub
title: Asset Conversion on AssetHub
sidebar_label: Asset Conversion on AssetHub
description: Asset Conversion implementation details on AssetHub.
keywords: [Assets, DEX, Exchange, Pools, Tokens]
slug: ../learn-asset-conversion-assethub
---

Asset conversion is a simple AMM (Automated Market Maker) based on [Uniswap V2](https://github.com/Uniswap/v2-core)
logic, deployed as a [pallet on Polkadot AssetHub](https://github.com/paritytech/polkadot-sdk/tree/master/substrate/frame/asset-conversion).
In the AMM model the prices of tokens are determined by a mathematical formula based on the ratio of 
tokens in a liquidity pool, unlike traditional exchanges that use an order book.

Asset Conversion on Asset Hub enables fee payment in any asset, given it has a liquidity pool, such 
that the fee handler (in this case, a Collator) only receives the native asset (DOT).

Asset Conversion pallet allows you to:

- create a liquidity pool for 2 assets
- provide the liquidity and receive back an LP token
- exchange the LP token back to assets
- swap 2 assets if there is a pool created
- query for an exchange price via a new runtime call endpoint
- query the size of a liquidity pool.


