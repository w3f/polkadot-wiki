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
transactions. Below are some wallets that support Polkadot along with their development statuses.

:::tip Non-Custodial Wallets

 **All the wallets listed on this page are non-custodial wallets**. With non-custodial wallets, only you have access to your account's private key. With custodial wallets (like accounts on Central Exchanges), another party controls your private keys.

:::

### Supported Wallets

[Polkadot support](https://support.polkadot.network/) can provide assistance with issues related to
Polkadot-JS UI, the Polkadot-JS extension, or Parity Signer. For other wallet software, you should
contact the developers of that wallet.

| Wallet Name                                                         | Development State | Team Name | Description       |
| ------------------------------------------------------------------- | ----------------- | --------- | ----------------- |
| [Parity Signer](https://www.parity.io/signer/)                       | Live              | Parity    | iOS and Android app used with [Companion](https://parity.link/signer-companion) or [Polkadot-JS Extension](https://github.com/polkadot-js/extension)    |
| [Polkadot-JS Desktop](https://github.com/polkadot-js/apps/releases) | Live              | Parity    | Win, Mac, Linux   |
| [Polkadot-JS UI](https://polkadot.js.org/apps/#/accounts)         | Live              | Parity    | Browser based wallet used with [Polkadot-JS Extension](https://github.com/polkadot-js/extension)            |
| [Ledger](https://github.com/Zondax/ledger-polkadot)         | Live              | Zondax    | Hardware wallet app used with [Polkadot-JS UI](https://polkadot.js.org/apps/#/accounts) (and [Polkadot-JS Extension](https://github.com/polkadot-js/extension))            |

### Treasury Funded Wallets

These are wallets which have been supported by either the Polkadot or Kusama Treasury via Treasury
Proposal. Links in the Proposals section go to the Polkassembly post where the Treasury Proposal was
discussed.

:::caution Web3 Technologies Foundation does not endorse these wallets

These third-party wallets have been funded by the community through either the Polkadot or Kusama
[Treasury](learn-treasury). You should use your own due diligence in researching and using them. The
official Polkadot Support cannot provide support for issues with these wallets or other non-Parity
developed wallets.

:::

| Wallet Name                                   | Proposals                                                                                                                                                                                                                                             | Development State | Team Name       | Description  | Features |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | --------------- | ------------ | --------------- |
| [Fearless Wallet](https://fearlesswallet.io/) | [1](https://kusama.polkassembly.io/treasury/23), [2](https://kusama.polkassembly.io/treasury/34), [3](https://kusama.polkassembly.io/treasury/74), [4](https://kusama.polkassembly.io/treasury/102), [5](https://kusama.polkassembly.io/treasury/178) | Live              | SORAMITSU       | iOS, Android | Staking, Crowdloans, parachain accounts            |
| [Polkawallet](https://polkawallet.io/)        | [1](https://kusama.polkassembly.io/treasury/32), [2](https://kusama.polkassembly.io/treasury/41)                                                                                                                                                      | Live              | Polkawallet     | iOS, Android | Staking, Crowdloans, parachain accounts, Governance             |
| [Stylo](https://stylo-app.com/)               | [1](https://polkadot.polkassembly.io/treasury/39)                                                                                                                                                                                                     | Live              | Thibaut Sardan  | Android      | Air-gapped offline wallet             |
| [Nova Wallet](https://novawallet.io/)\*       | [1](https://kusama.polkassembly.io/treasury/122), [2](https://kusama.polkassembly.io/treasury/158)                                                                                                                                                    | Live              | Novasama Technologies | iOS, Android | Staking, Nomination Pools, OpenGov, Governance v1, XCM Transfers, Parity Signer & Ledger Support, DApp Support with Polkadot JS and Metamask/EVM Integration, Crowdloans, Parachain Accounts,  NFT Management            |
| [Talisman](https://talisman.xyz/)             | [1](https://polkadot.polkassembly.io/treasury/148)                                                                                                                                                                                | Live              | TalismanSociety | Browser      | Staking, Nomination Pools, Crowdloans, parachain accounts, Ledger support            |
| [SubWallet](https://subwallet.app/)           | [1](https://polkadot.polkassembly.io/treasury/138), [2](https://polkadot.polkassembly.io/treasury/162)                                                                                                                                                                                                     | Live              | SubWallet       | Browser, Android, iOS      | Staking, Crowdloans, parachain accounts, Parity Signer and Ledger Support, Staking (Nomination Pools), XCM Transfer, NFT management             |

:::caution \*Note about Nova wallet

There's **another** Nova wallet that is **unrelated** to the Polkadot ecosystem. Users are advised
to ensure that they use the correct Nova wallet by downloading the app from their official website:
[https://novawallet.io/](https://novawallet.io/). Before creating or restoring accounts , it is wise
to double-check the wallet website URLs through official channels (most projects have it listed on
their official social media handles).

:::

## Encryption Enhancement

Some newly generated `JSON` account files cannot be imported (restored) into older wallet software.
This is due to an enhanced encryption method, which is also noticeable in a slight delay when
encrypting/decrypting your wallet. If you are unable to load a `JSON` file, please ensure that you
are using the latest version of the wallet software. If you are still unable to load it, ensure that
the wallet software is using the latest version of the [Polkadot API](https://polkadot.js.org/api/).
