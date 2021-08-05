---
id: build-wallets
title: Polkadot Wallets
sidebar_label: Polkadot Wallets
---

## Polkadot Wallets

The integration of a [wallet](glossary.md#wallet) with Polkadot allows for simple and easy access to
private keys and signing transactions. Below are some wallets that support Polkadot along with their
development statuses.

[Polkadot support](https://support.polkadot.network/) can provide assistance with issues related to
Polkadot-JS, the Polkadot{.js} extension, or Parity Signer. For other wallet software, you should
contact the developers of that wallet.

> Note that only Parity-developed wallets are listed on this page. Other third-party wallets are
> available, but are not listed here.

## Encryption Enhancement

Some newly generated `JSON` account files cannot be imported (restored) into older wallet software.
This is due to an enhanced encryption method, which is also noticeable in a slight delay when
encrypting/decrypting your wallet. If you are unable to load a `JSON` file, please ensure that you
are using the latest version of the wallet software. If you are still unable to load it, ensure that
the wallet software is using the latest version of the [Polkadot API](https://polkadot.js.org/api/).

### Supported Wallets

| Wallet Name                                                         | Development State | Team Name | Description       | Custody       | Supports |
| ------------------------------------------------------------------- | ----------------- | --------- | ----------------- | ------------- | -------- |
| [Parity Signer](https://www.parity.io/signer/) (see warning below)  | Live              | Parity    | iOS and Android   | Non-custodial | Staking  |
| [Polkadot-js Desktop](https://github.com/polkadot-js/apps/releases) | Live              | Parity    | Win, Mac, Linux   | Non-custodial | Staking  |
| [Polkadot-js extension](https://github.com/polkadot-js/extension)   | Live              | Parity    | Browser extension | Non-custodial | Staking  |
| [Polkadot-js apps](https://polkadot.js.org/apps/#/accounts)         | Live              | Parity    | Browser           | Non-Custodial | Staking  |

> Warning: Parity Signer currently does not allow you to see the transaction you are signing. This
> means that you are at risk if connected to a compromised version of Polkadot-JS. A fix is being
> worked on; please see [this GitHub issue](https://github.com/paritytech/parity-signer/issues/724)
> for more details.
