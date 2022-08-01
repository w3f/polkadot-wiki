---
id: kusama-statemine
title: Statemine
sidebar_label: Statemine
description: Statemine and its features
slug: ../../kusama-statemine
---
import RPC from "./../../../components/RPC-Connection"

Statemine is a generic assets parachain which provides functionality for deploying and transferring assets — both Fungible and Non-Fungible Tokens (NFTs). It is a common good parachain on Kusama (not to be confused with [Statemint](../../learn/learn-common-good-chains.md#statemint), which is a parachain on Polkadot). The native token of Statemine is KSM. Balance transfers and the Existential Deposit (ED) of KSM on Statemine are about 1/10th of the values on the Relay chain. For example, the Existential Deposit of a Statemine account is <RPC network="statemine" path="consts.balances.existentialDeposit" defaultValue={3333333} filter="humanReadable"/>, 
when compared to <RPC network="kusama" path="consts.balances.existentialDeposit" defaultValue={33333333} filter="humanReadable"/>, on Kusama.
Apart from the core protocol token KSM, the assets held on Statemine can be broadly categorized as 

- Assets backed by an on-chain protocol’s utility
- Assets with off-chain backing
- Assets without any backing

## Creating Assets on Statemine

:::info

Before minting assets on Statemine, we recommend that you try out this tutorial on Westmint, which is a parachain on Westend. 
The WND tokens (Westies) are free and are available through a [faucet](https://wiki.polkadot.network/docs/learn-DOT#getting-westies).

:::

To create an asset on Statemine, you would need a deposit of <RPC network="statemine" path="consts.assets.assetDeposit" defaultValue={100000000000} filter="humanReadable"/>
and around <RPC network="statemine" path="consts.assets.metadataDepositBase" defaultValue={668933304} filter="humanReadable"/> for the metadata
. Before you create an asset on Statemine, ensure that your Statemine account balance is a bit more 
than the sum of those two deposits, which should seamlessly account for the required deposits 
and transaction fees. You can send KSM from a Kusama account to a Statemine account using the 
teleport functionality. For instructions on teleporting KSM, check this [tutorial on Teleports](../../learn/learn-teleport.md).

Assuming you have the required KSM balance on your Statemine account, the following instructions should let you successfully create an asset on Statemine

- Access Statemine through Polkdot-JS Apps UI.
- Navigate to Network > Assets.

![Navigate to Assets page](../../assets/kusama/statemine-asset-0.png)

- Click on the create button and you will be presented with a pop-up window. Choose the creator account, name of the asset to be
displayed on Statemine, the asset's symbol, number of decimals for the asset, the minimum balance required to hold this asset on a Statemine account and the most important field of your asset - the unique asset ID. The UI would not let you enter an ID that has already been taken. After all the details are entered, click on the next button.

![Add Asset Metadata](../../assets/kusama/statemine-asset-1.png)

- Choose the admin, issuer and the freezer accounts for your asset and click on the create button.

![Asset managing accounts](../../assets/kusama/statemine-asset-2.png)

- Sign and submit the transaction. (If you like to verify the transaction details before signing, you can click on the dropdown button pointed by the arrow in the snapshot below)

![Sign asset creating transaction](../../assets/kusama/statemine-asset-3.png)

If the transaction is successful,  you should see the asset and its details displayed in the Network > Assets page on Statemine.

## Transferring Assets on Statemine

:::caution Beware of scams

Due to the permissionless nature of Statemine, anyone can create an asset with any name and symbol. The most important attribute 
of an asset is the asset ID. There could be multiple assets with the same name and symbol, but they cannot have the same asset ID. Ex: The USDT by Tether minted on Statemine holds the asset ID: 1984.

:::

:::info

The assets can be Sufficient or Non-Sufficient. To hold a Non-Sufficient asset, the Statemine account needs to exist on-chain. This is different from Ethereum where a non-existent account can hold ERC-20 tokens. Ensure that the receiver account has at least 3.33 microKSM which is the Existential Deposit for a Statemine account. Although, there are a few exceptions to this - If an asset is Sufficient or someone has placed a deposit for that account to hold the asset, the Existential Deposit in KSM on the receiver account is not needed.

:::

To hold, send or receive most of the assets on Statemine (which are Non-Suffcient), the accounts need to have a minimum balance of 3.33 microKSM (The Existential Deposit on Statemine). You can send KSM from a Kusama account to a Statemine account using the teleport functionality. For instructions on teleporting KSM, check this [tutorial on Teleports](../../learn/learn-teleport.md). The balance transfers of KSM on Statemine are similar to the balance transfers KSM on Kusama and can be done on the accounts page on Polkadot-JS Apps UI.

In this tutorial, transfer of BILLCOINs (Asset ID: 223, Symbol: BILL) is demonstrated.


- Access Statemine through Polkdot-JS Apps UI.
- Navigate to Network > Assets and click on the Balances tab
- Select the asset to transfer from the drop-down (The assets are sorted based on their IDs). If you have accounts with the selected asset, they will be displayed.

![Finding the asset](../../assets/kusama/statemine-asset-transfer-1.png)

- Click on the send button 
- Enter the receiver address and the amount to transfer.

![Asset transfer transaction](../../assets/kusama/statemine-transfer-asset-2.png)

- Sign and submit the transaction

![Sign asset creating transaction](../../assets/kusama/statemine-asset-transfer-3.png)

If the transaction is successful, the assets are transferred to the receiver account. 
