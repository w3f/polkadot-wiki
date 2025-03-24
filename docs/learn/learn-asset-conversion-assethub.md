---
id: learn-asset-conversion-assethub
title: Asset Conversion on AssetHub
sidebar_label: Asset Conversion
description: Asset Conversion implementation details on AssetHub.
keywords: [Assets, DEX, Exchange, Pools, Tokens]
slug: ../learn-asset-conversion-assethub
---

Asset conversion is a simple AMM (Automated Market Maker) based on
[Uniswap V2](https://github.com/Uniswap/v2-core) logic, deployed as a
[pallet on Polkadot AssetHub](https://github.com/paritytech/polkadot-sdk/tree/master/substrate/frame/asset-conversion).
In the AMM model the prices of tokens are determined by a mathematical formula based on the ratio of
tokens in a liquidity pool, unlike traditional exchanges that use an order book. This will be a
“trustless” DEX, controlled through Polkadot OpenGov.

!!!note
    The asset pairs of the liquidity pools of AssetHub will always contain the relay chain's native token as one of the assets. Provision of liquidity for pools with arbitrary asset pairs is not allowed.

Asset Conversion on Asset Hub enables fee payment in any asset, given it has a liquidity pool, such
that the fee handler (in this case, a Collator) only receives the native asset.

Asset Conversion pallet allows you to:

- [Create a liquidity pool](https://docs.rs/pallet-asset-conversion/latest/pallet_asset_conversion/pallet/struct.Pallet.html#method.create_pool)
  with the relay chain's native token and an asset
- [Provide the liquidity](https://docs.rs/pallet-asset-conversion/latest/pallet_asset_conversion/pallet/struct.Pallet.html#method.add_liquidity)
  and receive back an LP token
- [Exchange the LP token back to assets](https://docs.rs/pallet-asset-conversion/latest/pallet_asset_conversion/pallet/struct.Pallet.html#method.remove_liquidity)
- [Swap assets if there is a pool created](https://docs.rs/pallet-asset-conversion/latest/pallet_asset_conversion/pallet/struct.Pallet.html#method.swap_exact_tokens_for_tokens)
- [Query for an exchange price](https://docs.rs/pallet-asset-conversion/latest/pallet_asset_conversion/trait.AssetConversionApi.html#method.quote_price_exact_tokens_for_tokens)
  via a runtime call endpoint
- [Query the size of a liquidity pool](https://docs.rs/pallet-asset-conversion/latest/pallet_asset_conversion/trait.AssetConversionApi.html#method.get_reserves).

!!!info "Asset Conversion Tutorials"
    The Asset Conversion user guide and tutorials are available [here](./learn-guides-asset-conversion.md)

## Fee Payment in Any Asset - Wallets

Without Asset Conversion pallet, only DOT and
[sufficient assets](./learn-assets.md#sufficient-assets) can be used for paying transaction fees.
With the Asset Conversion pallet deployed, Wallets can enable users to pay transaction fees through
any arbitrary asset made available in pools with either DOT or sufficient assets. More specifically,
this functionality is enabled through
[Asset Conversion Transaction Payment Pallet](https://github.com/paritytech/polkadot-sdk/tree/cdc8d197e6d487ef54f7e16767b5c1ab041c8b10/substrate/frame/transaction-payment/asset-conversion-tx-payment),
allowing runtimes that include it to pay for transactions in assets other than the native token of
the chain.

!!!caution "Handling Pools with Low Liquidity"
    The wallets and UIs should ensure that the user is prompted with the necessary warnings, such that they do not accidentally spend all of their funds to perform a swap on a pool with no or low liquidity.

## Fee Payment in Any Asset - Parachains

Parachains can pay for their XCM execution fees in any asset with a liquidity pool on AssetHub.

## Creation of Pools with Foreign Assets - Parachains

Assets pallet uses XCM MultiLocations to represent assets, and their corresponding origins to
control them.

One of the pain points of integrating parachain tokens natively on wallets and exchanges is that
they require running individual parachain infrastructure like full nodes to process deposits, and
require additional code to handle withdrawals because they need to be able to construct and
broadcast transactions on each parachain. These parachains could use different balances pallets or
order them differently. When Polkadot hosts hundreds of parachains (and possibly thousands of
threads), this becomes a huge burden in terms of network support. This is in contrast to adding
support for an additional ERC20 token; the marginal effort is very small since an Ethereum node
already serves all the data they need.

With support for these assets on Asset Hub, exchanges/custodians could monitor one chain for
deposits (applications and UIs would need to give the option to transfer to Asset Hub). For
withdrawals, users could choose to withdraw to their address on Asset Hub. There are two user
experience bonuses here:

- The exchange/custodian only needs to transact on one parachain and can access every other without
  any infrastructure lift.
- For the user, they never actually need to “see” AssetHub. It’s entirely abstracted away behind
  either the parachain wallet/application or the exchange/custodian.
