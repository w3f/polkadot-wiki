---
id: build-wallets
title: Wallets
sidebar_label: Wallets
description: An overview of the current supported wallets on Polkadot.
slug: ../build-wallets
---

The integration of a [wallet](../general/glossary.md#wallet) with {{ polkadot: Polkadot :polkadot }}
{{ kusama: Kusama :kusama }} allows for simple and easy access to private keys and signing
transactions. Below are some wallets that support Polkadot along with their development statuses.

### Supported Wallets

| Wallet Name                                                         | Development State | Team Name | Description       | Custody       | Supports |
| ------------------------------------------------------------------- | ----------------- | --------- | ----------------- | ------------- | -------- |
| [Parity Signer](https://www.parity.io/signer/) (see warning below)  | Live              | Parity    | iOS and Android   | Non-custodial | Staking  |
| [Polkadot-js Desktop](https://github.com/polkadot-js/apps/releases) | Live              | Parity    | Win, Mac, Linux   | Non-custodial | Staking  |
| [Polkadot-js extension](https://github.com/polkadot-js/extension)   | Live              | Parity    | Browser extension | Non-custodial | Staking  |
| [Polkadot-js apps](https://polkadot.js.org/apps/#/accounts)         | Live              | Parity    | Browser           | Non-Custodial | Staking  |

[Polkadot support](https://support.polkadot.network/) can provide assistance with issues related to
Polkadot-JS, the Polkadot{.js} extension, or Parity Signer. For other wallet software, you should
contact the developers of that wallet.

> Warning: Parity Signer currently does not allow you to see the transaction you are signing. This
> means that you are at risk if connected to a compromised version of Polkadot-JS. A fix is being
> worked on; please see [this GitHub issue](https://github.com/paritytech/parity-signer/issues/724)
> for more details.

### Treasury Funded Wallets

These are wallets which have been supported by either the Polkadot or Kusama Treasury via Treasury Proposal. Links in the Proposals section go to the Polkassembly post where the Treasury Proposal was discussed.

| Wallet Name                                   | Proposals                                                                                                                                                                                           | Development State | Team Name       | Description  | Custody       | Supports |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | --------------- | ------------ | ------------- | -------- |
| [Fearless Wallet](https://fearlesswallet.io/) | [1](https://kusama.polkassembly.io/treasury/23), [2](https://kusama.polkassembly.io/treasury/34), [3](https://kusama.polkassembly.io/treasury/74), [4](https://kusama.polkassembly.io/treasury/102) | Live              | SORAMITSU       | iOS, Android | Non-custodial | Staking  |
| [Klever](https://klever.io/)                  | [1](https://kusama.polkassembly.io/treasury/91)                                                                                                                                                     | Live              | Klever          | iOS, Android | Non-custodial | Staking  |
| [Polkawallet](https://polkawallet.io/)        | [1](https://kusama.polkassembly.io/treasury/32), [2](https://kusama.polkassembly.io/treasury/41)                                                                                                    | Live              | Polkawallet     | iOS, Android | Non-custodial | Staking  |
| [Stylo](https://stylo-app.com/)               | [1](https://polkadot.polkassembly.io/treasury/39)                                                                                                                                                   | Live              | Thibaut Sardan  | Android      | Non-custodial | Staking  |
| [Nova Wallet](https://novawallet.io/)         | [1](https://kusama.polkassembly.io/treasury/122)                                                                                                                                                    | Live              | Nova Foundation | iOS, Android | Non-custodial | Staking  |
| [Talisman](https://talisman.xyz/)             | Received a Tip**                                                                                                                                                                                  | Live              | TalismanSociety | Browser      | Non-custodial | Staking  |

> **Important**: These third-party wallets have been funded by the community through either the Polkadot or Kusama [Treasury](learn-treasury). **Web 3.0 Technologies Foundation does not endorse these wallets, and you should use your own due diligence in researching them.** The official Polkadot Support cannot provide support for issues with these wallets or other non-Parity developed wallets.

> **This third-party wallet was not funded by a Treasury Proposal and instead received a tip from the Treasury. Unlike a Treasury Proposal, tipping is a separate system that the council members individually participate in to collectively decide on the value of the tip. Learn more about tipping on the [Treasury Page](../learn/learn-treasury.md##tipping). 

## Encryption Enhancement

Some newly generated `JSON` account files cannot be imported (restored) into older wallet software.
This is due to an enhanced encryption method, which is also noticeable in a slight delay when
encrypting/decrypting your wallet. If you are unable to load a `JSON` file, please ensure that you
are using the latest version of the wallet software. If you are still unable to load it, ensure that
the wallet software is using the latest version of the [Polkadot API](https://polkadot.js.org/api/).
