---
id: learn-teleport
title: Teleporting Assets To Other Parachains
sidebar_label: Teleporting Assets
description: Steps on how to teleport assets across parachains.
slug: ../learn-teleport
---

One of the main properties that Polkadot and Kusama bring to the ecosystems is decentralized
blockchain interoperability. This interoperability allows for asset teleportation: the process of
moving assets, such as coins, tokens, or NFTs, between chains (parachains) to use them as you would
any other asset native to that chain. Interoperability is possible through [XCM][]
and [SPREE modules][], which together ensure that assets are not lost or duplicated across multiple chain.

## How to Teleport

Teleportation can be done through the [PolkadotJS Apps] interface or through the
`xcmPallet.teleportAssets()` extrinsic. In the following example, we will be using the PolkadotJS
interface.

1. Navigate to [PolkadotJS Apps] and connect to the chain with the tokens you want to teleport.
2. Navigate to "Accounts > Teleport". This opens the 'teleport assets' interface:
   ![transfer](../assets/teleport_interface.png)
3. Fill out the transaction:
   1. "send from account" - Select the account with the source tokens.
   2. "destination chain" - Select the parachain you want to send the assets to.
   3. "send to address" - Select the account you want to be in control of the coins on the
      destination chain.
   4. "amount" - Insert the number of tokens you want to teleport
4. After reviewing the transaction information and fees, click the "Teleport" button.
5. Click "Sign and Submit".
6. Enter your password, and click "Sign the transaction".

The transaction will be signed and broadcasted, and the tokens will appear on the destination chain
shortly.

## Troubleshooting

If you do not see "Accounts > Teleport" in [PolkadotJS Apps], the source chain that you have
selected does not support teleportation yet. As of June 2021, unsupported chains include Polkadot
mainnet, Rococo testnet, and their respective parachains.

[polkadotjs apps]: https://polkadot.js.org/apps/
[xcm]: learn-cross-consensus.md
[spree modules]: learn-spree.md
