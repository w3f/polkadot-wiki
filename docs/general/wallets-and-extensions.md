---
id: wallets-and-extensions
title: Wallets and Extensions
sidebar_label: Wallets and Extensions
description: An Overview of Wallets and Browser Extensions in the Polkadot Ecosystem.
keywords: [wallets, account, signer, supported wallets, balance, token]
slug: ../wallets-and-extensions
---

:::caution

Using your due diligence in researching and using the wallets listed below would be best. For any
issues related to these wallet, reach out to their support teams directly.

:::

:::info

Explore Polkadot with a secure and user-friendly wallets listed on the
[Polkadot website](https://www.polkadot.network/ecosystem/wallets/).

:::

If you are new to blockchain technology, generally a typical blockchain network account is a
public-private key pair. Access to a private key gives full access to all the allowed transactions
on that blockchain account. It is essential to keep the private key secure.

Typically, the account keys are either stored and accessed through a browser extension or a
smartphone app (which are considered as a hot wallets as they are online), or an air-gapped device
or a hardware wallet (which are considered as cold wallets as they are offline).

:::tip Not your keys, not your tokens!

With **custodial wallets** (like accounts in centralized exchanges), another party controls your
private keys. Private keys are used to access funds in your account, so you trust the exchange that
your key will always be given to you whenever you need it. With **non-custodial wallets**, only you
can access your account's private key.

:::

To realize the multichain vision of {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }},
it is important to have non-custodial wallets that make it convenient to interact with multiple
blockchains in {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} ecosystem. Below there
is a list of all non-custodial treasury-funded wallets developed by the community.

## Overview

### Browser Extensions

At a bare minimum, browser extension wallets act as key storage and management solution, allowing
you to use your accounts with apps in the Web3 space. The wallets listed below offer functionality
beyond that, allowing the featured actions to be performed directly through the extension. Some of
them also allow interaction with air-gapped wallets and hardware devices.

| Wallet                                                                                     | Browsers                                                                                                                                                                                                                                                                                                                                                                                                          | Staking and Nomination Pools | NFTs    | Crowdloans | Ledger support | Governance | Other features                               |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------- | ---------- | -------------- | ---------- | -------------------------------------------- |
| [Enkrypt](https://www.enkrypt.com/?mtm_campaign=Polkadot%20Wiki%20-%20Supported%20Wallets) | Brave, Chrome, Edge, Firefox, Opera, Safari                                                                                                                                                                                                                                                                                                                                                                       | No, No                       | **Yes** | No         | **Yes**        | No         | [Enkrypt Features](#enkrypt)                 |
| [PolkaGate](https://polkagate.xyz/)                                                        | [Brave](https://chrome.google.com/webstore/detail/polkagate-the-gateway-to/ginchbkmljhldofnbjabmeophlhdldgp), [Chrome](https://chrome.google.com/webstore/detail/polkagate-the-gateway-to/ginchbkmljhldofnbjabmeophlhdldgp), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/polkagate), [Edge](https://chrome.google.com/webstore/detail/polkagate-the-gateway-to/ginchbkmljhldofnbjabmeophlhdldgp)     | **Yes**, **Yes**             | No      | **Yes**    | **Yes**        | **Yes**    | [PolkaGate features](#polkagate)             |
| [SubWallet](https://subwallet.app/)                                                        | [Brave](https://chrome.google.com/webstore/detail/subwallet-polkadot-extens/onhogfjeacnfoofkfgppdlbmlmnplgbn), [Chrome](https://chrome.google.com/webstore/detail/subwallet-polkadot-extens/onhogfjeacnfoofkfgppdlbmlmnplgbn), [Edge](https://chrome.google.com/webstore/detail/subwallet-polkadot-extens/onhogfjeacnfoofkfgppdlbmlmnplgbn), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/subwallet/) | **Yes**, **Yes**             | **Yes** | **Yes**    | **Yes**        | No         | [SubWallet features](#subwallet)             |
| [Talisman](https://www.talisman.xyz/)                                                      | Brave, Chrome, Edge, Firefox                                                                                                                                                                                                                                                                                                                                                                                      | **Yes**, **Yes**             | **Yes** | **Yes**    | **Yes**        | No         | [Talisman features](#talisman)               |
| [Fearless Wallet](https://fearlesswallet.io/)                                              | [Brave](https://chrome.google.com/webstore/detail/fearless-wallet/nhlnehondigmgckngjomcpcefcdplmgc), [Chrome](https://chrome.google.com/webstore/detail/fearless-wallet/nhlnehondigmgckngjomcpcefcdplmgc)                                                                                                                                                                                                         | No, No                       | **Yes**      | No         | No             | No         | [Fearless Wallet Features](#fearless-wallet) |

:::info Ledger support only for chromium-based browsers

Currently, all browser extensions support Ledger devices only on chromium-based browsers (i.e.
Chrome, Brave, Edge, Opera).

:::

### Mobile Wallets

Mobile wallets are fully packaged apps that allow all the featured actions, as well as the storage
and management of your accounts, through the mobile app. Unlike browser extensions, mobile wallets
usually can’t connect to third-party web apps. Some mobile wallets provide support for hardware
wallets through Bluetooth connectivity.

| Wallet                                        | Platforms                                                                                              | Staking and Nomination Pools | NFTs    | Crowdloans | Ledger support | Governance | Other features                               |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------- | ------- | ---------- | -------------- | ---------- | -------------------------------------------- |
| [Fearless Wallet](https://fearlesswallet.io/) | iOS, Android                                                                                           | **Yes**, **Yes**             | No      | **Yes**    | No             | No         | [Fearless Wallet Features](#fearless-wallet) |
| [Nova Wallet](https://novawallet.io/)\*       | iOS, Android                                                                                           | **Yes**, **Yes**             | **Yes** | **Yes**    | **Yes**        | **Yes**    | [Nova Wallet features](#nova-wallet)         |
| [Polkawallet](https://polkawallet.io/)        | iOS, Android                                                                                           | **Yes**, **Yes**             | No      | **Yes**    | No             | **Yes**    | [Polkawallet features](#polkawallet)         |
| [SubWallet](https://subwallet.app/)           | [iOS](https://apps.apple.com/us/app/subwallet-polkadot-wallet/id1633050285), [Android](bit.ly/3DE2Dlg) | **Yes**, **Yes**             | **Yes** | **Yes**    | No             | No         | [SubWallet features](#subwallet)             |

:::caution \*Note about Nova wallet

There's **another** Nova wallet that is **unrelated** to the Polkadot ecosystem. Users are advised
to ensure that they use the correct Nova wallet by downloading the app from their official website:
[https://novawallet.io/](https://novawallet.io/). Before creating or restoring accounts , it is wise
to double-check the wallet website URLs through official channels (most projects have it listed on
their official social media handles).

:::

### Web Wallets

Web Wallets are the all-in-one solution to accessing the Web3 space, allowing you to sign
transactions on the web without having to download and install any browser extension and mobile app.
With all of the features of mobile wallets, you can also connect to and interact with decentralized
web apps.

| Wallet                                  | Platforms        | Staking and Nomination Pools | Liquid Staking | NFTs    | Crowdloans | Ledger support | Governance | Other features                   |
| --------------------------------------- | ---------------- | ---------------------------- | -------------- | ------- | ---------- | -------------- | ---------- | -------------------------------- |
| [SubWallet](https://web.subwallet.app/) | Any web browsers | **Yes, Yes**                 | **Yes**        | **Yes** | **Yes**    | **Yes**        | No         | [SubWallet features](#subwallet) |

## Enkrypt

A multichain crypto wallet - Bitcoin, Ethereum, Polkadot, Kusama and a few parachains.
Non-custodial, private, hardware wallet support (Ledger and Trezor). Private and open source. Hold,
send, and receive tokens and NFTs. Swap tokens and bridge assets between chains. Manage multiple
accounts on multiple networks. Connect to web3 apps. Recipient of a development grant from Web3
Foundation.

## Fearless Wallet

The Fearless DeFi Wallet for the Future. Simply, intuitively, and fearlessly interact with
[Web3](./web3-and-polkadot.md). Currently supports Staking, Crowdloans, Parachain Accounts,
Nomination Pools Native Staking, dApp Signer on desktop through your mobile phone (experimental),
Chromium-based browser extension. Safety features such as Scam Address Warning and Network Failure
Warnings help fearlessly navigate [web3](./web3-and-polkadot.md). Formerly funded and supported by
Kusama Treasury [[1](https://kusama.polkassembly.io/treasury/23),
[2](https://kusama.polkassembly.io/treasury/34), [3](https://kusama.polkassembly.io/treasury/74),
[4](https://kusama.polkassembly.io/treasury/102), [5](https://kusama.polkassembly.io/treasury/178)],
and the SORA community [[1](https://sora.subscan.io/referenda/193?tab=votes)], developed with <3 by
SORAMITSU. Stay Fearless!

## Nova Wallet

A user-friendly wallet for the Polkadot & Kusama ecosystems, providing a smooth web3 experience on
both iOS and Android. Nova Wallet supports [Polkadot OpenGov](../learn/learn-polkadot-opengov.md)
(including agile delegations), Governance v1 (including support for parachain governance), Staking,
NFT management, XCM Transfers, Parity Signer & Ledger Support, DApp Support with Polkadot JS and
Metamask/EVM Integration and crowdloans. Nova Wallet received funding from Kusama Treasury
[[1](https://kusama.polkassembly.io/treasury/122),
[2](https://kusama.polkassembly.io/treasury/158)], as well as funding from the Polkadot Treasury
[[1](https://polkadot.polkassembly.io/motion/314)].

## PolkaGate

PolkaGate extension is a user-friendly and feature-rich wallet/extension, supported by the Kusama
Treasury [[1](https://kusama.polkassembly.io/treasury/205),
[2](https://kusama.polkassembly.io/referenda/124)]. It provides a diverse range of functionalities
to enhance your experience, such as proxy management, open governance, pool staking management, spam
address warning, support for address-only accounts, crowdloans, account export/import/derivation,
ledger support, parachain accounts, phishing website detection, QR account import, solo staking,
remote node selection, fund transfers, balance viewing in both cryptocurrency and USD, transaction
history viewing, and the ability to generate QR codes for addresses.

## Polkawallet

Polkawallet provides cross-chain asset one-stop management, convenient staking, governance, and
multiple DeFi services; the private key is self-owned. Polkawallet received funding from Kusama
Treasury [[1](https://kusama.polkassembly.io/treasury/32),
[2](https://kusama.polkassembly.io/treasury/41)].

## SubWallet

A non-custodial Polkadot, Substrate & Ethereum wallet. Track, send, receive, and monitor multi-chain
assets on 150+ networks. Import account with seed phrase, private key, QR code, and JSON file.
Import token & NFT, attach read-only account. XCM Transfer, NFT Management, Parity Signer & Ledger
support, light clients support, EVM DApp support, MetaMask compatibility, custom endpoints, fiat
on-ramp, phishing detection, transaction history. SubWallet received funding from Polkadot Treasury
[[1](https://polkadot.polkassembly.io/treasury/138),
[2](https://polkadot.polkassembly.io/treasury/162),
[3](https://polkadot.polkassembly.io/treasury/218),
[4](https://polkadot.polkassembly.io/treasury/272)].

## Talisman

A better way to explore Web3. Keep your assets safe, manage your portfolio and explore Polkadot and
Ethereum apps with Talisman. Interact with Web3 apps, store your favourite crypto assets and manage
your accounts on over 150+ Substrate and EVM networks. NFT Management, ledger Support, fiat On-ramp,
portfolio tracking. Talisman received funding from Polkadot Treasury
[[1](https://polkadot.polkassembly.io/treasury/148)].
