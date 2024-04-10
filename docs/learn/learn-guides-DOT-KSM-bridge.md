---
id: learn-guides-dot-ksm-bridge
title: Polkadot and Kusama Bridge Guides
sidebar_label: DOT <> KSM Bridge
description: Polkadot-JS Guides about Polkadot and Kusama Bridge.
keywords: [Bridge, XCM, Bridge Hub, polkadot-js]
slug: ../learn-guides-dot-ksm-bridge
---

<div className="sticky" style={{ zIndex: 1 }}> 
<br />

These guides are for developers and power users only.

</div>

The fully functional Polkadot < > Kusama bridge facilitates secure asset transfers between the
chains in both the ecosystems. The progress of Polkadot < > Kusama bridge implementation can be
tracked [here](https://forum.polkadot.network/t/polkadot-kusama-bridge/2971/1).

## Transfer DOT to Kusama Asset Hub

This tutorial shows how to transfer DOT on Polkadot Asset Hub to Kusama Asset Hub. The first step is
to ensure that your account on Polkadot Asset Hub has enough DOT to cover the XCM transfer fee and
the bridge fee (which is around 2 DOT). The next step is to craft an XCM message to be sent from
Polkadot Asset Hub.

[BagPipes (formerly called xcmsend)](https://xcmsend.com/#/builder) is an opensource application
that lets you create workflows in a drag and drop style interface in order to build execution flows
of cross chain assets transfers using XCM. Check
[Bagpipes docs](https://xcmsend.github.io/workflows/dotksm.html) for more information on how to
create workflows for crafting XCM transfers. The snapshot below shows a workflow on BagPipes that is
designed to send 3 DOT from an account Polkadot Asset Hub to Kusama Asset Hub.

![BagPipes Snapshot DOT Transfer](../assets/bridge-hub/PAH-to-KAH-DOT-transfer.png)

This workflow crafts an XCM transfer as shown below.

```
{
  "isSigned": false,
  "method": {
    "args": {
      "dest": {
        "V3": {
          "parents": "2",
          "interior": {
            "X2": [
              {
                "GlobalConsensus": "Kusama"
              },
              {
                "Parachain": "1,000"
              }
            ]
          }
        }
      },
      "beneficiary": {
        "V3": {
          "parents": "0",
          "interior": {
            "X1": {
              "AccountId32": {
                "network": null,
                "id": "0x9e4e7009937c56d267338762a60ed004293afd40e7c2081847c12cb63c76a818"
              }
            }
          }
        }
      },
      "assets": {
        "V3": [
          {
            "id": {
              "Concrete": {
                "parents": "1",
                "interior": "Here"
              }
            },
            "fun": {
              "Fungible": "30,000,000,000"
            }
          }
        ]
      },
      "fee_asset_item": "0",
      "weight_limit": "Unlimited"
    },
    "method": "limitedReserveTransferAssets",
    "section": "polkadotXcm"
  }
}
```

Once this [extrinsic](https://assethub-polkadot.subscan.io/extrinsic/6028374-2) is signed and
submitted, it is broadcast to Polkadot Asset Hub nodes. As this is a reserve asset transfer, the DOT
is transferred to the destination's sovereign account on Polkadot Asset Hub and
[the wrapped DOT is issued](https://assethub-kusama.subscan.io/extrinsic/6758392-0?event=6758392-1)
as a foreign asset and deposited onto the destination account on Kusama Asset Hub. The foreign asset
balances of any account on Kusama Asset Hub can be queried on-chain through the
`foreignAssets`pallet as shown below.

![Wrapped DOT Balance](../assets/bridge-hub/KAH-DOT-Balance.png)

## Transfer KSM to Polkadot Asset Hub

This tutorial shows how to transfer KSM on Kusama Asset Hub to Polkadot Asset Hub. The first step is
to ensure that your account on Kusama Asset Hub has enough KSM to cover the XCM transfer fee and the
bridge fee (which is around 0.4 KSM). The next step is to craft an XCM message to be sent from
Kusama Asset Hub.

The XCM transfer extrinsic shown below can be accessed
[here.](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama-asset-hub-rpc.polkadot.io#/extrinsics/decode/0x1f08030202090200a10f03000101008479c8ea5480acca5a847133cd97a87801b6e698a98f2eab0e8e9d5c51b14a33030400010000070088526a740000000000)
If you plan on reusing this extrinsic, ensure that you change the Account ID and the transfer amount
highlighted in the snapshot below.

![PJS Snapshot KSM Transfer](../assets/bridge-hub/KAH-PAH-KSM-Transfer-PJS-Extrinsic.png)

Once this [extrinsic](https://assethub-kusama.subscan.io/extrinsic/6761480-2) is signed and
submitted, it is broadcast to Kusama Asset Hub nodes. As this is a reserve asset transfer, the KSM
is transferred to the sovereign account on Kusama Asset Hub and
[the wrapped KSM is issued](https://assethub-polkadot.subscan.io/extrinsic/6031467-0?event=6031467-6)
as a foreign asset and deposited onto the destination account on Kusama Asset Hub. The foreign asset
balances of any account on Kusama Asset Hub can be queried on-chain through the
`foreignAssets`pallet as shown below.

![Wrapped KSM Balance](../assets/bridge-hub/PAH-KSM-Balance.png)
