---
title: What is the Existential Deposit?
description: "On the Polkadot network, an address is only active when it holds a minimum amount, which is called an existential deposit (ED)."
---

!!!info "Related concepts"
    For the underlying concepts, see [Account Balances](../learn-account-balances.md).

On most Polkadot SDK-based chains, an account is only active when it holds a minimum amount of determined assets, currently set at **0.01 DOT** on Polkadot and **0.00000333333 KSM** on Kusama. This minimum amount is called the Existential Deposit (ED).

The ED exists so that accounts with very small balances or completely empty don't "bloat" the state of the blockchain. This limit allows the network to maintain high performance and reduce fees.

If an account drops below the ED on every sufficient asset, the account is reaped ("deactivated"), and any remaining funds are destroyed. It can be reactivated with a new deposit larger than the ED at any time. This won't restore the destroyed funds.

!!! tip "GOOD TO KNOW"

    These are the existential deposits on the following chains:

    * **Polkadot Asset Hub** : 0.01 DOT
    * **Polkadot People** : 0.1 DOT
    * **Polkadot Bridge Hub** : 0.1 DOT
    * **Polkadot Coretime** : 0.1 DOT
    * **Polkadot Relay Chain** : 1 DOT

    * **Kusama Asset Hub:**  0.0000033333 KSM
    * **Kusama People:** 0.000033333333 KSM
    * **Kusama Bridge Hub:** 0.000033333333 KSM
    * **Kusama Coretime:** 0.000033333333 KSM
    * **Kusama Relay Chain:** 0.00033333333 KSM


### Facts to know about the existential deposit

  * Accounts that have never received a deposit aren't discoverable on block explorers.
  * If you send funds lower than the ED to an empty account, the account won't receive the funds (nominators need to pay attention to this when collecting staking rewards, see below).
  * If you send all (or almost all) of your funds out of an account, which will result in the remaining balance going under the ED, the account will be reaped, and any remaining funds will be burned.

  * An account can be reactivated at any time. However, this won't bring back any previously burned funds.

  * To protect yourself from accidentally slipping below the ED amount and losing your funds, ensure the remaining balance after the transaction stays above the ED. However, most of the wallets would display a warning if you try otherwise.

  * Exchanges have their own minimum deposit requirements for **each** asset, usually slightly higher than the ED. Make sure to check with your exchange what these minimums are before sending any funds to it.
  * There are other sufficient assets besides DOT or KSM that can contribute toward the existential deposit and keep an account alive, like USDC or ETH.

* * *

### How to prevent going below the existential deposit

Most native Polkadot and Kusama wallets will warn you if a transaction could cause your account to be reaped by leaving a balance below the existential deposit (0.01 DOT or 0.00000333333 KSM). However, if you want to keep your account alive, always ensure that the remaining balance after each transaction stays above the required existential deposit.

Please note that the existential deposit is spendable and that it simply keeps your account active. If you wish to deactivate your account, you can transfer out your entire balance at any time. You can also reactivate your account at any time by depositing at least the existential deposit.

!!! warning "ATTENTION"

    An account needs to be activated with the existential deposit before staking rewards can be sent to it. **DO NOT direct staking rewards to an inactive account.** If a reward is below 0.01 DOT, it won't arrive and you'll lose it.

* * *

### Native, sufficient, and non-sufficient assets

There are three types of assets on Polkadot and Kusama:

  * **Native asset** : The native asset for Polkadot is DOT, while for Kusama it is KSM. These are considered when determining if an account is active, as long as they are present over a certain amount (0.01 DOT or 0.000003333 KSM)
  * **Sufficient asset** : These aren't native tokens, but they have been approved by governance to keep an account active if the account holds an amount above their designated existential deposit. A sufficient asset doesn't require the account to have any balance in the native token to be received.
  * **Non-sufficient asset** : These aren't native tokens and can't maintain an account's activity on their own. To hold a non-sufficient asset in an account, the account needs to exist on-chain, which means it needs to have a balance in the native or sufficient asset at least as much as the existential deposit.

Currently, the sufficient tokens and foreign assets (native assets on other networks) in Polkadot Asset Hub are:

  * USDC (asset ID: 1337)
  * USDT (asset ID: 1984)
  * ETH (foreign asset transferred via Snowbridge)
  * WETH (foreign asset transferred via Snowbridge)
  * KSM (foreign asset transferred via Polkadot <> Kusama bridge)
  * USDC (foreign asset transferred via Snowbridge)
  * USDT (foreign asset transferred via Snowbridge)

Sufficient tokens and foreign assets in Kusama Asset Hub are:

  * RMRK (asset ID: 8)
  * ETH (foreign asset transferred via Snowbridge)
  * WETH (foreign asset transferred via Snowbridge)
  * DOT (foreign asset transferred via Polkadot <> Kusama bridge)
  * USDC (foreign asset transferred via Snowbridge)
  * USDT (foreign asset transferred via Snowbridge)
  * USDT (native asset ID: 1984). Discontinued.

!!! warning "ATTENTION"

    Anyone can create and name an asset on Asset Hub, which means many assets may share familiar names. However, that doesn't guarantee they're the real or official versions. To avoid scams, always verify the asset's unique ID before accepting or paying for it. For instance, the legitimate USDC on Asset Hub has the ID 1337, anything else is fake USDC.

    If you don't know what the asset ID is for the token you're interested in, **contact the issuer** of the token and find out, before accepting any tokens.

* * *
