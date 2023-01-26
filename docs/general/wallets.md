---
id: wallets
title: Wallets
sidebar_label: Wallets
description: An overview of wallets in Polkadot ecosystem.
keywords: [wallets, account, signer, supported wallets, balance, token]
slug: ../wallets
---

Navigating the space of wallets can be overwhelming, if you are new to blockchain technology. In
general, an account on a typical blockchain network is a public-private key pair. Access to a
private key gives full access to all the allowed transactions on that blockchain account. It is
important to keep the private key secure.

:::tip Not your keys, not your tokens!

With custodial wallets (like accounts central exchanges), another party controls your private keys.
With non-custodial wallets, only you have access to your account's private key.

:::

To realize the multichain vision of Polkadot, it is important to have non-custodial wallets that
make it convenient to interact with multiple blockchains in Polkadot ecosystem.

## Non-Custodial Wallets

:::caution

You should use your own due diligence in researching and using the wallets listed below. For any
issues related to these wallet, reach out to their support teams directly.

:::

Typically, the account keys are either stored and accessed through a browser extension or a
smartphone app (which are considered as a hot wallets as they are exposed online) or an airgapped
device or a hardware wallet (which considered as a cold wallets as they are offline).

### Browser Wallets

It is possible to use your browser to interact with your blockchain account through the wallets
listed below. Typically, these wallets use the browser extension as a keystore for the blockchain
accounts. Some of the browser extensions also allow interacting with airgapped devices and hardware
wallets in a secure way.

| Wallet                                | Browsers                                    | Staking and Nomination Pools | NFTs    | Crowdloans | Ledger support | Governance | Other features                   |
| ------------------------------------- | ------------------------------------------- | ---------------------------- | ------- | ---------- | -------------- | ---------- | -------------------------------- |
| [Enkrypt](https://www.enkrypt.com/)   | Brave, Chrome, Edge, Firefox, Opera, Safari | No, No                       | **Yes** | No         | **Yes**        | No         | [Enkrypt Features](#enkrypt)     |
| [PolkaGate](https://polkadotjs.plus/) | Firefox                                     | **Yes**, **Yes**             | No      | **Yes**    | **Yes**        | No         | [PolkaGate features](#polkagate) |
| [SubWallet](https://subwallet.app/)   | Brave, Chrome, Edge, Firefox                | **Yes**, **Yes**             | **Yes** | **Yes**    | **Yes**        | No         | [SubWallet features](#subwallet) |
| [Talisman](https://www.talisman.xyz/) | Brave, Chrome, Edge, Firefox                | **Yes**, **Yes**             | **Yes** | **Yes**    | **Yes**        | No         | [Talisman features](#talisman)   |

### Mobile Wallets

Mobile wallets are fully packaged apps with the key-store as well as functionalities unlike browser
based wallets, which typically use a browser extension as a key-store (some wallets put a lot more
functionality into the extensions) and the browser for interacting with the blockchain networks.
Some mobile wallets also support hardware wallets which provide bluetooth connectivity.

| Wallet                                        | Platforms                 | Staking and Nomination Pools | NFTs    | Crowdloans | Ledger support | Governance | Other features                               |
| --------------------------------------------- | ------------------------- | ---------------------------- | ------- | ---------- | -------------- | ---------- | -------------------------------------------- |
| [Fearless Wallet](https://fearlesswallet.io/) | iOS, Android              | **Yes**, **Yes**             | No      | No         | No             | No         | [Fearless Wallet Features](#fearless-wallet) |
| [Nova Wallet](https://novawallet.io/)\*       | iOS, Android              | **Yes**, **Yes**             | No      | **Yes**    | **Yes**        | **Yes**    | [Nova Wallet features](#nova-wallet)         |
| [Polkawallet](https://polkawallet.io/)        | iOS, Android              | **Yes**, **Yes**             | No      | **Yes**    | No             | **Yes**    | [Polkawallet features](#polkawallet)         |
| [SubWallet](https://subwallet.app/)           | iOS (Testflight), Android | **Yes**, **Yes**             | **Yes** | No         | **Yes**        | No         | [SubWallet features](#subwallet)             |

:::caution \*Note about Nova wallet

There's **another** Nova wallet that is **unrelated** to the Polkadot ecosystem. Users are advised
to ensure that they use the correct Nova wallet by downloading the app from their official website:
[https://novawallet.io/](https://novawallet.io/). Before creating or restoring accounts , it is wise
to double-check the wallet website URLs through official channels (most projects have it listed on
their official social media handles).

:::

### Enkrypt

A multichain crypto wallet - Bitcoin, Ethereum, Polkadot, Kusama and a few parachains.
Non-custodial, private, Hardware wallet support (Ledger and Trezor). Private and Open Source. Hold,
send, and receive tokens and NFTs. Swap tokens and bridge assets between chains. Manage multiple
accounts on multiple networks. Connect to web3 apps. Recepient of development grant from Web3
Foundation.

### PolkaGate

Proxy accounts and Social recovery.

### SubWallet

XCM Transfer, NFT Management, Parity Signer & Ledger Support, Light Clients Support, QR-code Account
Import, Token Import, EVM DApp Support, MetaMask Compatibility, Custom Endpoint, Fiat On-ramp

### Talisman

NFT Management, Ledger Support, Fiat On-ramp, Portfolio tracking

### Fearless Wallet

Parachain Accounts, dApp signer (experimental), Scam addresses warning, Network issues warning

### Nova Wallet

OpenGov, Governance v1, XCM Transfers, Parity Signer & Ledger Support, DApp Support with Polkadot JS
and Metamask/EVM Integration.

### Polkawallet

Cross-chain De-Fi.

## Supported Wallets

[Polkadot support](https://support.polkadot.network/) can provide assistance with issues related to
Polkadot-JS UI, the Polkadot-JS extension, or Parity Signer. For other wallet software, you should
contact the developers of that wallet. Please note that these wallets are quite bare bones and
oriented towards power users.

| Wallet Name                                                         | Development State | Team Name | Description                                                                                                                                                     |
| ------------------------------------------------------------------- | ----------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Parity Signer](https://www.parity.io/signer/)                      | Live              | Parity    | iOS and Android app used with [Companion](https://parity.link/signer-companion) or [Polkadot-JS Extension](https://github.com/polkadot-js/extension)            |
| [Polkadot-JS Desktop](https://github.com/polkadot-js/apps/releases) | Live              | Parity    | Win, Mac, Linux                                                                                                                                                 |
| [Polkadot-JS UI](https://polkadot.js.org/apps/#/accounts)           | Live              | Parity    | Browser based wallet used with [Polkadot-JS Extension](https://github.com/polkadot-js/extension)                                                                |
| [Ledger](https://github.com/Zondax/ledger-polkadot)                 | Live              | Zondax    | Hardware wallet app used with [Polkadot-JS UI](https://polkadot.js.org/apps/#/accounts) (and [Polkadot-JS Extension](https://github.com/polkadot-js/extension)) |

## Encryption Enhancement

Some newly generated `JSON` account files cannot be imported (restored) into older wallet software.
This is due to an enhanced encryption method, which is also noticeable in a slight delay when
encrypting/decrypting your wallet. If you are unable to load a `JSON` file, please ensure that you
are using the latest version of the wallet software. If you are still unable to load it, ensure that
the wallet software is using the latest version of the [Polkadot API](https://polkadot.js.org/api/).
