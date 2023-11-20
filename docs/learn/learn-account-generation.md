---
id: learn-account-generation
title: Account Generation
sidebar_label: Account Generation
description: Generate a Polkadot Basic Account.
keywords: [account, account generation, polkadot account, polkadot vault, ledger]
slug: ../learn-account-generation
---

## Ways to Generate an Account

:::info Treasury-funded Wallets and Browser Extensions

If you are a general user, you are recommended to create accounts using any of the
[wallets and extensions](../general/wallets-and-extensions.md) funded by the Treasury or Grants. If
you are a power user or a developer, you can use
[Polkadot-JS Extension](../general/polkadotjs.md#polkadot-js-extension).

:::

When you create accounts using browser extensions like
[the Polkadot-JS extension](#polkadot-js-browser-extension), it stores your accounts in a private
vault and lets you clear your browser cache without fear. Remember to back up your seed phrase - if
you lose access to this computer or the extension somehow crashes beyond repair, the seed phrase
will come in handy. Alternatively, you can create accounts using the
[Polkadot-JS UI](#polkadot-js-ui), although this option is disabled by default. More info about the
Polkadot-JS UI can be found on [the dedicated page](../general/polkadotjs-ui.md).

Please note that all wallets that are connected to the internet are considered "hot wallets" that
are susceptible to a wide range of attacks, so it is recommended to use cold storage when dealing
with non-trivial amounts.

Current popular cold storage solutions within the
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} ecosystem include
[Ledger](../general/ledger.md) and [Polkadot Vault](../general/polkadot-vault.md). The latter keeps
your keys on an air-gapped mobile phone. However, it does require obtaining a dedicated Android or
iOS-compatible phone that you are comfortable using only for Polkadot Vault.

Besides the Polkadot-JS browser extension and the Polkadot-JS UI,
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} addresses can also be created with
the [Subkey tool](https://github.com/paritytech/substrate/tree/master/bin/utils/subkey). Subkey is
intended for users comfortable using the command line and can seem intimidating, but it is quite
approachable. Follow the instructions in the
[Subkey documentation](https://docs.substrate.io/reference/command-line-tools/subkey/).

## Backing Up Accounts

Depending on what software you use to access your account, there are various ways to back up and
restore your account. It is a good idea to back your information up and keep it secure. In general,
as long as you know how you created your account and have the seed phrase
([mnemonic phrase](learn-accounts#portability)) or JSON file (and password) stored securely, you can
restore your account.
