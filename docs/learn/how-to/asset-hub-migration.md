---
title: Asset Hub Migration — What You Must Know
description: "Several key features are moving from the Polkadot Relay Chain to Asset Hub, paving the way for a more scalable, feature-rich Polkadot. Read the article to learn more!"
---

!!!info "Related concepts"
    For the underlying concepts, see [Asset Hub](../learn-assets.md).

!!! danger "READ THIS FIRST!"

    The Asset Hub migrations for Kusama and Polkadot were successfully executed on October 7th and November 4th, respectively.

    **No action was  required on your part**. The process happenned in the background and it took a few hours.

    Your funds moved from one network to another, but never left your account.

To increase the ecosystem's scalability, Polkadot distributes its functionalities across different chains. Thanks to its interoperability, this distribution is seamless, and you don't need to worry about which network a feature runs on. All functionalities remain accessible through your preferred tools and wallets as part of the overall Polkadot experience.

This article solves some of the questions that you might have regarding one of the main feature migrations from one network to another: from the Polkadot Relay Chain to the Polkadot Asset Hub.

!!! info

    This article explains the Asset Hub Migration at a high level. If you are a developer or just to know more about the process, visit the links below:

    * [Asset Hub Migration FAQ](https://docs.google.com/document/u/1/d/1XR3vL2p4QV0wC7FrlC8eN-q62BqNFTFElbj21wEmMGg/edit): Essential questions about the migration.
    * [Polkadot Forum post](https://forum.polkadot.network/t/asset-hub-migration-2025/11129/58): Monthly updates and great source of information.
    * [Critical User Journeys for external testing of AH-Next](https://docs.google.com/document/d/1legRcwMYzKn8tWCAsGzoUe2H22JiV-N7xfNjGrivBIE/edit?usp=sharing): Document aiming developers and dApp maintainers.
    * [Substrate API Sidecar - Asset Hub Migration Guide](https://github.com/paritytech/substrate-api-sidecar/blob/b0053ca328136a1af8fe7f568ac3c001b361704e/guides/ASSET_HUB_MIGRATION.md): Asset Hub Migration & Elastic Scaling Guide.

If you have any question, join the [Asset Hub Migration Support](https://t.me/+CjOtzipvBHllMWYy) Telegram channel and ask away.


### What's Polkadot Asset Hub?

Polkadot Asset Hub is a system chain that provides Polkadot with a unified platform for creating and managing assets beyond its native token. Unlike the Polkadot Relay Chain, which supports only DOT, Polkadot Asset Hub enables the storage and transfer of a wide variety of assets, including memecoins, stablecoins, NFTs, and tokens from other Polkadot chains.

Polkadot Asset Hub also facilitates cross-chain transfers, bringing in assets from other networks such as KSM from Kusama and ETH from Ethereum.

Since Polkadot Asset Hub can hold almost any asset, it offers the perfect network to record Polkadot's main balance and support features like governance and staking, leaving the Polkadot Relay Chain with the essential task of providing security and interoperability to Polkadot.

* * *

### Benefits of Polkadot Asset Hub

While the Polkadot Relay Chain focuses on core functions, Polkadot Asset Hub enhances the user experience with added capabilities. It offers a better user experience with features like:

  * Lower existential deposit: reduced from 1 DOT to 0.01 DOT.
  * Significantly reduced transaction fees and deposits.
  * Expanded asset support: stablecoins (USDT, USDC) and other ecosystem tokens.
  * Fee flexibility: ability to pay transaction fees in any supported asset.
  * Direct access to trustless Ethereum bridges.

After the Polkadot Asset Hub migration, all Polkadot users will benefit from these improvements by default. There's no need to teleport assets, as balances will be migrated automatically.

* * *

### What would happen during the migration?

!!! tip "GOOD TO KNOW"

    This migration was **succesfully** executed on October 7th, 2025, for Kusama and on November 4th, 2025, for Polkadot.

The migration will take place once all the potential issues have been minimized. However, during the process, there will be a planned service interruption on the Polkadot Relay Chain and Polkadot Asset Hub, lasting approximately 8 to 10 hours. The expected interruptions include:

  * Balance display: Your funds are safe, but your account balance may appear incorrectly during the migration on your wallet. From then on, wallets will query the Polkadot Asset Hub, but the balance records may take some time to update fully.
  * Transfer limitations: You won't be able to teleport DOT to or from the Polkadot Relay Chain or Polkadot Asset Hub. However, DOT and assets should be able to be transferred within Polkadot Asset Hub.
  * Feature temporary restrictions: Some functionalities (for example, governance, proxies, multisig, vesting, and other pallets) will be disabled on the Polkadot Relay Chain _during_ the migration. Once the migration is complete, they'll also be available on Polkadot Asset Hub.

!!! warning "ATTENTION"

    Funds that participated on crowdloans will still be locked on the Polkadot Relay Chain. However, there's a plan that will be put in place after the migration to refund these funds to Polkadot Asset Hub.

* * *

### What would happen after the migration?

Since this is only a migration of information and features, your funds remain safe and will be fully recorded in Polkadot Asset Hub. As a regular user, you won't need to interact with the Polkadot Relay Chain after the migration.

With balances now recorded on the Polkadot Asset Hub, wallets will query this chain to display your account balances. It may take some time for all wallets to fully update and pull data from the new source, but they will.

!!! warning "ATTENTION"

    If your wallet shows no balance, it probably hasn't updated to the migration yet. Check for a new version and reach out to the wallet's support team for help.

    If you use Polkadot Developer Interface, connect to Asset Hub:
    [Polkadot Developer Interface: How to Switch Network Nodes](switch-network-nodes.md)

The same applies to staking or governance activities. All interactions will occur on the Polkadot Asset Hub. Wallets and interfaces will be ready to support this change, so you don't need to adjust any settings.

In essence, even if the migration seems complex, end users like you shouldn't be affected and won’t notice any change. It won’t matter where your balances are stored or which network your wallet interacts with—everything will be handled behind the scenes. No action is required on your part, and your funds will remain fully on Polkadot.

The migration will let the Relay Chain focus on security and interoperability, bringing it closer to the vision of a “[minimal Relay](https://paritytech.github.io/RFCs/approved/0032-minimal-relay.html)“ chain.

* * *

### Special attention: Polkadot Vault users

The only case where user action may be required is for Polkadot Vault users running older versions (≤7.0). Accounts created in Polkadot Vault (formerly Parity Signer) might use by default different derivation paths depending on the network they were generated for (for example, //polkadot if it was created for the Polkadot Relay Chain, //statemint for Polkadot Asset Hub, etc.).

If you want to continue using your Polkadot (Relay Chain) account on Polkadot Asset Hub, you should create a new Polkadot Asset Hub account and customize the derivation path to match the one used by the Polkadot Relay Chain account. Most likely, the derivation path will be //polkadot.

Find further information in the article “[Polkadot Vault: How to Create the Same Account on Different Networks](vault-same-account-networks.md)”

* * *
