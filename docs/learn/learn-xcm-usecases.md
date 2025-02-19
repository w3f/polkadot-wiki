---
id: learn-xcm-usecases
title: XCM Use-cases & Examples
sidebar_label: XCM Use-cases
description: Cross-consensus Interactions and the XCM Format.
keywords: [cross-consensus, XCM, XCMP, interoperability, communication]
slug: ../learn-xcm-usecases
---

!!!info "XCM Documentation"
    For a more practical approach to utilizing XCM, refer to the [XCM Docs](./xcm/overview/intro.md). Please keep in mind that XCM is under active development.

XCM has a multitude of use cases. While the wiki covers some of the key commonplace interactions,
the XCM format can be used to construct many more combinations to suit the use case at hand.

### Example Use-Cases

- Request for specific operations to occur on the recipient system such as governance voting.
- Enables single use-case chains e.g. the [Asset Hub](./learn-guides-assets-create.md) as asset
  parachains
- Optionally include payment of fees on a target network for requested operation.
- Provide methods for various asset transfer models:
  - **Remote Transfers**: control an account on a remote chain, allowing the local chain to have an
    address on the remote chain for receiving funds and to eventually transfer those funds it
    controls into other accounts on that remote chain.
  - **Asset Teleportation**: movement of an asset happens by destroying it on one side and creating
    a clone on the other side.
  - **Reserve Asset Transfer**: there may be two chains that want to nominate a third chain, where
    one includes a native asset that can be used as a reserve for that asset. Then, the derivative
    form of the asset on each of those chains would be fully backed, allowing the derivative asset
    to be exchanged for the underlying asset on the reserve chain backing it.

Let's review two of these example asset transfer use cases: **Asset Teleportation** and **Reserve
Asset Transfer**.

### Asset Teleportation

An asset teleport operation from a single source to a single destination.

![Diagram of the usage flow while teleporting assets](../assets/cross-consensus/xcm-asset-teleportation.png)

1. [InitiateTeleport](https://github.com/paritytech/xcm-format#initiateteleport)

The source gathers the assets to be teleported from the sending account and takes them out of the
circulating supply, taking note of the total amount of assets that was taken out.

2. [ReceiveTeleportedAsset](https://github.com/paritytech/xcm-format#receiveteleportedasset)

The source then creates an XCM instruction called `ReceiveTeleportedAssets` and puts the amount of
assets taken out of circulation and the receiving account as parameters to this instruction. It then
sends this instruction over to the destination, where it gets processed and new assets gets put back
into circulating supply accordingly.

3. [DepositAsset](https://github.com/paritytech/xcm-format#depositasset)

The destination then deposits the assets to the receiving account of the asset.

### Reserve Asset Transfer

When consensus systems do not have a established layer of trust over which they can transfer assets,
they can opt for a trusted 3rd entity to store the assets.

![xcm-reserve-asset-transfer](../assets/cross-consensus/xcm-reserve-asset-transfer.png)

1. [InitiateReserveWithdraw](https://github.com/paritytech/xcm-format#initiatereservewithdraw)

The source gathers the derivative assets to be transferred from the sending account and burns them,
taking note of the amount of derivatives that were burned.

2. [WithdrawAsset](https://github.com/paritytech/xcm-format#withdrawasset)

The source sends a WithdrawAsset instruction to the reserve, instructing the reserve to withdraw
assets equivalent to the amount of derivatives burned from the source's sovereign account.

3. [DepositReserveAsset](https://github.com/paritytech/xcm-format#depositreserveasset)

The reserve deposits the assets withdrawn from the previous step to the destination's sovereign
account, taking note of the amount of assets deposited.

4. [ReserveAssetDeposited](https://github.com/paritytech/xcm-format#reserveassetdeposited)

The reserve creates a ReserveAssetDeposited instruction with the amount of assets deposited to the
destination's sovereign account, and sends this instruction onwards to the destination. The
destination receives the instruction and processes it, minting the derivative assets as a result of
the process.

5. [DepositAsset](https://github.com/paritytech/xcm-format#depositasset)

The destination deposits the derivative assets minted to the receiving account.
