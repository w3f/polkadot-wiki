---
title: "I Can't Find My Account on the Polkadot Network!"
description: "On Polkadot and Kusama, addresses are only active if they hold a minimum amount known as the \"existential deposit\"."
---

!!!info "Related concepts"
    For the underlying concepts, see [Accounts](../learn-accounts.md).

If you can't find your assets in your account, don't worry just yet. There are a few possible reasons why your wallet or block explorer might not show any assets or activity. Keep reading to learn more.

#### **TABLE OF CONTENTS**

  * Assets on a different network
  * Account below the existential deposit

* * *

### Assets on a different network

Polkadot is a network made up of multiple interconnected blockchains. Your account may hold assets across several of these networks. For example, you might have DOT on the Polkadot Relay Chain, Polkadot Asset Hub, Polkadot People, Hydration, Bifrost, and others.

If you don't see your assets on a specific network, make sure your wallet is connected to all relevant Polkadot networks and then check your balance again.

Additionally, you might visit a [block explorer](block-explorers.md) that allows you to check the balance and activity of an account across multiple networks.

* * *

### Account below the existential deposit

On the other hand, if you cannot find your DOT address on a [block explorer](block-explorers.md) on any network, it has either not received the minimum amount of assets required to activate the account yet, or its balance dropped below that amount, and it was reaped (deactivated).

This amount, called the **[existential deposit (ED)](existential-deposit.md),** is currently set at **0.01 DOT** on Polkadot and **0.00000333333 KSM** on Kusama.

You can reactivate a reaped account by sending at least the ED to it. This will make it findable on block explorers again. For more information, check out our article on the [existential deposit](existential-deposit.md).

!!! tip "GOOD TO KNOW"

    Most block explorers keep the transaction history of reaped accounts, so you can still find them even if they've been deactivated.

* * *
