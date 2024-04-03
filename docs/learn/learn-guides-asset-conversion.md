---
id: learn-guides-asset-conversion
title: Asset Conversion Tutorials
sidebar_label: Asset Conversion Tutorials
description: Asset Conversion implementation details on AssetHub.
keywords: [Assets, DEX, Exchange, Pools, Tokens]
slug: ../learn-guides-asset-conversion
---

<div className="sticky" style={{ zIndex: 1 }}> 
<br />

Polkadot-JS is for developers and power users only. If you need help using the
[Polkadot-JS UI](../general/polkadotjs-ui.md), you can contact the
[Polkadot Support Team](https://support.polkadot.network/support/home). For more user-friendly tools
see the [wallets](./wallets-index), [apps](./apps-index) and [dashboard](./dashboards-index) pages.

</div>

## Create a Liquidity Pool

The `create_pool` function is used to create an empty liquidity pool along with a new `lp_token`
asset. This asset's ID is announced in the `Event::PoolCreated` event. After creating a pool,
liquidity can be added to it via the `Pallet::add_liquidity` function.

## Liquidity Provision

The `add_liquidity` function allows users to provide liquidity to a pool composed of two assets. It
requires specifying the desired amounts for both assets and minimum acceptable amounts. The function
calculates an optimal contribution of assets, which may differ from the desired amounts but will not
be less than the specified minimums. Liquidity providers receive liquidity tokens representing their
share of the pool.

## Withdraw Provided Liquidity

The `remove_liquidity` function allows users to withdraw their provided liquidity from a pool,
receiving back the original assets. When calling this function, users specify the amount of
liquidity tokens (representing their share in the pool) they wish to burn. They also set minimum
acceptable amounts for the assets they expect to receive back. This mechanism ensures users can
control the minimum value they receive, protecting against unfavourable price movements during the
withdrawal process​.

## Swap Assets

### Swap from an exact amount of Tokens

The `swap_exact_tokens_for_tokens` function allows users to swap a precise amount of one asset for
another within a specified liquidity pool, ensuring the user receives at least a minimum expected
amount of the second asset in return. This function aims to provide predictability in trading
outcomes, allowing users to manage their asset exchanges with confidence regarding the minimum
return.

### Swap to an exact amount of Tokens

On the other hand, the `swap_tokens_for_exact_tokens` function allows users to trade a flexible
amount of one asset to precisely obtain a specified amount of another asset. It ensures that users
do not spend more than a predetermined maximum amount of the initial asset to acquire the exact
target amount of the second asset, providing a way to control the cost of the transaction while
achieving the desired outcome.
