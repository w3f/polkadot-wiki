---
id: build-wallets
title: Wallets
sidebar_label: Wallets
description: An overview of the current supported wallets on Polkadot.
keywords: [wallets, account, signer, supported wallets, balance, token]
slug: ../build-wallets
---

The integration of a [wallet](../general/glossary.md#wallet) with {{ polkadot: Polkadot :polkadot }}
{{ kusama: Kusama :kusama }} allows for simple and easy access to private keys and signing
transactions. Below are some non-custodial wallets that support Polkadot along with their development statuses.

### Supported Wallets

| Wallet Name                                                         | Development State | Team Name | Description       | Staking support |
| ------------------------------------------------------------------- | ----------------- | --------- | ----------------- | ------- |
| [Parity Signer](https://www.parity.io/signer/)                      | Live              | Parity    | iOS and Android   | Yes |
| [Polkadot-js Desktop](https://github.com/polkadot-js/apps/releases) | Live              | Parity    | Win, Mac, Linux   | Yes |
| [Polkadot-js extension](https://github.com/polkadot-js/extension)   | Live              | Parity    | Browser extension | Yes |
| [Polkadot-js apps](https://polkadot.js.org/apps/#/accounts)         | Live              | Parity    | Browser           | Yes |

[Polkadot support](https://support.polkadot.network/) can provide assistance with issues related to
Polkadot-JS, the Polkadot{.js} extension, or Parity Signer. For other wallet software, you should
contact the developers of that wallet.

### Treasury Funded Wallets

These are non-custodial wallets which have been supported by either the Polkadot or Kusama Treasury via Treasury
Proposal. Links in the Proposals section go to the Polkassembly post where the Treasury Proposal was
discussed.

:::caution Web3 Technologies Foundation does not endorse these wallets

These third-party wallets have been funded by the community through either the Polkadot or Kusama
[Treasury](learn-treasury). You should use your own due diligence in researching and using them. The
official Polkadot Support cannot provide support for issues with these wallets or other non-Parity
developed wallets.

:::

| Wallet Name                                   | Proposals                                                                                                                                                                                           | Development State | Team Name       | Description  |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | --------------- | ------------ | 
| [Fearless Wallet](https://fearlesswallet.io/) | [1](https://kusama.polkassembly.io/treasury/23), [2](https://kusama.polkassembly.io/treasury/34), [3](https://kusama.polkassembly.io/treasury/74), [4](https://kusama.polkassembly.io/treasury/102), [5](https://kusama.polkassembly.io/treasury/178)  | Live              | SORAMITSU       | iOS, Android |
| [Polkawallet](https://polkawallet.io/)        | [1](https://kusama.polkassembly.io/treasury/32), [2](https://kusama.polkassembly.io/treasury/41)                                                                                                    | Live              | Polkawallet     | iOS, Android | 
| [Stylo](https://stylo-app.com/)               | [1](https://polkadot.polkassembly.io/treasury/39)                                                                                                                                                   | Live              | Thibaut Sardan  | Android      | 
| [Nova Wallet](https://novawallet.io/)*         | [1](https://kusama.polkassembly.io/treasury/122), [2](https://kusama.polkassembly.io/treasury/158)                                                                                                 | Live              | Nova Foundation | iOS, Android | 
| [Talisman](https://talisman.xyz/)             | [1](https://polkadot.polkassembly.io/treasury/148); Treasury tipp**                                                                                                                                                                                    | Live              | TalismanSociety | Browser      | 
| [SubWallet](https://subwallet.app/)             | [1](https://polkadot.polkassembly.io/treasury/138)                                                                                                                                                | Live              | SubWallet | Browser      | Non-custodial | Staking  |
| [Polkadot js Plus](http://polkadotjs.plus/)      | [1](https://kusama.polkassembly.io/treasury/205)    | Live              | PolkaGate | Browser      |


:::caution \*Note about Nova wallet

There's **another** Nova wallet that is **unrelated** to the Polkadot ecosystem. Users are advised
to ensure that they use the correct Nova wallet by downloading the app from their official website:
[https://novawallet.io/](https://novawallet.io/). Before creating or restoring accounts , it is wise
to double-check the wallet website URLs through official channels (most projects have it listed on
their official social media handles).

:::

:::note \*\*Tip from the Treasury

This third-party wallet was not funded by a Treasury Proposal and instead received a tip from the
Treasury. Unlike a Treasury Proposal, tipping is a separate system that the council members
individually participate in to collectively decide on the value of the tip. Learn more about tipping
on the [Treasury Page](learn-treasury#tipping).

:::

## Encryption Enhancement

Some newly generated `JSON` account files cannot be imported (restored) into older wallet software.
This is due to an enhanced encryption method, which is also noticeable in a slight delay when
encrypting/decrypting your wallet. If you are unable to load a `JSON` file, please ensure that you
are using the latest version of the wallet software. If you are still unable to load it, ensure that
the wallet software is using the latest version of the [Polkadot API](https://polkadot.js.org/api/).
