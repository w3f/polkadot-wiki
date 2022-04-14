---
id: learn-teleport
title: Teleporting KSM between Kusama and Statemine
sidebar_label: Teleporting Assets
description: Steps on how to teleport assets across parachains.
slug: ../learn-teleport
---

One of the main properties that Polkadot and Kusama bring to the ecosystems is decentralized
blockchain interoperability. This interoperability allows for asset teleportation: the process of
moving assets, such as coins, tokens, or NFTs, between chains (parachains) to use them as you would
any other asset native to that chain. Interoperability is possible through [XCM][] and [SPREE
modules][], which together ensure that assets are not lost or duplicated across multiple chain.

## How to Teleport

Here are a couple of things that you need to understand before submitting a teleport transaction

- There will be a transaction fee imposed on the source chain. This fee is **not** automatically
  deducted from the teleport amount you plan to send. Your account balance should be greater than
  the teleport amount and the transaction fees. If you do not account for the sending fee, the
  teleport transaction will fail. The sending fee will be deducted from your account balance.

- There will be a transaction fee imposed at the destination chain. This fee is automatically
  deducted from the teleport amount you send. After this fee is deducted, the remaining account
  balance on the destination chain should be greater than its Existential Deposit. If not, the
  teleport transaction will fail and the sending fee along with the teleport amount will be deducted
  from your account balance.

  ![teleport](../assets/kusama/KSM-teleport-small.png)

Teleportation can be done through the [PolkadotJS Apps] interface or through the
`xcmPallet.limitedTeleportAssets()` extrinsic. In the following example, we will be using the
PolkadotJS interface to teleport KSM from Kusama to Statemine.

1. Navigate to [PolkadotJS Apps] and connect to the chain with the tokens you want to teleport.
2. Navigate to "Accounts > Teleport". This opens the 'teleport assets' interface:

   ![transfer](../assets/kusama/ksm-teleport-apps.png)

3. Fill out the transaction:
   1. "send from account" - Select the account with the source tokens.
   2. "destination chain" - Select the parachain you want to send the assets to.
   3. "send to address" - Select the account you want to be in control of the coins on the
      destination chain.
   4. "amount" - Insert the number of tokens you want to teleport. This does not include the
      transfer fee
4. After reviewing the transaction information and fees, click the "Teleport" button. Remember that
   the destination chain imposes receiving fee on the teleport amount (It is currently 0.000010666 KSM on
   Statemine)
5. Click "Sign and Submit".
6. Enter your password, and click "Sign the transaction".

The transaction will be signed and broadcasted, and the tokens will appear on the destination chain
shortly. In the given example screenshot, the received balance would be around 0.0049 KSM (Teleport amount
0.005 KSM - Receiving fee 0.000010666 KSM). If you plan to teleport KSM back to Kusama from Statemine, you
will follow the same procedure as above.

## Troubleshooting

If you do not see "Accounts > Teleport" in [PolkadotJS Apps], the source chain that you have
selected does not support teleportation yet. As of June 2021, unsupported chains include Polkadot
mainnet, Rococo testnet, and their respective parachains.

[polkadotjs apps]: https://polkadot.js.org/apps/
[xcm]: learn-cross-consensus.md
[spree modules]: learn-spree.md
