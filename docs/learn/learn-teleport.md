---
id: learn-teleport
title: Teleporting Assets
sidebar_label: Teleporting Assets
description: Steps on how to teleport assets across parachains.
keywords: [teleport, assets, transfer]
slug: ../learn-teleport
---
import RPC from "./../../components/RPC-Connection"

One of the main properties that Polkadot and Kusama bring to the ecosystems is decentralized
blockchain interoperability. This interoperability allows for asset teleportation: the process of
moving assets, such as coins, tokens, or NFTs, between chains (parachains) to use them as you would
any other asset native to that chain. Interoperability is possible through [XCM][] and [SPREE
modules][], which together ensure that assets are not lost or duplicated across multiple chain.

## How Teleports work

![teleport](../assets/statemint/teleport-asset.png)

As you can see from the diagram above, there are only 2 actors within this model: the source and the destination.
The way in which we transfer assets between the source and the destination are briefly summarized in the numbered 
labels on the diagram, and are explained in more detail below:

### Initiate Teleport

The source gathers the assets to be teleported from the sending account and **takes them out of the circulating supply**, 
taking note of the total amount of assets that was taken out.

### Receive Teleported Assets

The source then creates an XCM instruction called `ReceiveTeleportedAssets` and puts the amount of assets taken out of 
circulation and the receiving account as parameters to this instruction. It then sends this instruction over to the 
destination, where it gets processed and new assets get **put back into circulating supply accordingly**.

### Deposit Asset

The destination then deposits the assets to the receiving account of the asset.

The phrases **taken out of circulating supply** and **put back into circulating supply** are highlighted above to firstly give 
an indication of how much flexibility an XCM executor has in implementing the semantics of taking an asset out of and 
putting it back into its circulating supply. The straightforward answer is to burn the assets to take them out of 
circulation, but one can imagine that there are indeed multiple methods of achieving the same goal, such as transferring 
the assets locally to an inaccessible account, and likewise for putting assets back to circulation -- the receiving 
consensus system can freely choose to implement such semantics by releasing assets from a pre-filled and inaccessible 
treasury of the assets transferred, or perform a mint of the assets.

As such, the above also gives a hint on the disadvantages of this model -- it requires both the source and destination 
of have a high level of mutual trust. The destination must trust that the source has appropriately removed the assets 
that was sent over from the circulating supply, and the source must also trust the destination to put the assets that 
was taken out of circulation back into circulation. The result of an asset teleportation should result in the same 
circulating supply of the asset. Failing to uphold either of these two conditions will result in a change in the asset's 
total issuance (in the case of fungible tokens) or a complete loss/duplication of an NFT.


## Teleporting Tokens using Polkadot-JS Apps UI

- [Video tutorial on Teleporting](https://youtu.be/PGyDpH2kad8)
- [Additional support article](https://support.polkadot.network/support/solutions/articles/65000181119-how-to-teleport-dot-or-ksm-between-statemint-or-statemine)

## Troubleshooting

If you do not see "Accounts > Teleport" in [PolkadotJS Apps], the source chain that you have
selected does not support teleportation yet.

[polkadotjs apps]: https://polkadot.js.org/apps/
[xcm]: learn-cross-consensus.md
[spree modules]: learn-spree.md
