---
id: learn-account-generation
title: Account Generation
sidebar_label: Account Generation
description: Generate a Polkadot Basic Account.
keywords: [account, account generation, polkadot account, polkadot vault, ledger]
slug: ../learn-account-generation
---

## DISCLAIMER: Key Security

The _only_ ways to access your account are via your secret seed or your account's JSON file in
combination with a password. Keep them offline in a secure and private location. If you share these
with anyone, they can access your account, including your funds. This information is always a target
for hackers and malicious actors. Check out the wiki doc on
[how to recognize scams](../general/scams.md).

[![Account Creation Tutorial](https://img.youtube.com/vi/ARsdXZycJAg/0.jpg)](https://www.youtube.com/watch?v=ARsdXZycJAg)

:::info

Visit
[this support article](https://support.polkadot.network/support/solutions/articles/65000181874-how-to-store-your-mnemonic-phrase-and-backup-file-safely)
for more information about key security.

:::

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

:::info How-to guides to generate an account

See our Support Articles for more information about how to create an account using the tools below.

- [Ledger Hardware Wallet](#ledger-hardware-wallet)
- [Polkadot Vault](#polkadot-vault)
- [Subkey](#subkey)
- [Vanity Generator](#vanity-generator)

:::

## Backing Up Accounts

Depending on what software you use to access your account, there are various ways to back up and
restore your account. It is a good idea to back your information up and keep it secure. In general,
as long as you know how you created your account and have the seed phrase
([mnemonic phrase](learn-accounts#portability)) or JSON file (and password) stored securely, you can
restore your account.

## Ledger Hardware Wallet

To use a Ledger hardware wallet to create your address and keep your tokens in cold storage, follow
the instructions on the [Ledger hardware wallet guide page](../general/ledger.md).

## Polkadot Vault

Parity Signer is a secure way of storing your DOT on an air-gapped device. It is highly recommended
that you turn off wifi, cellular network, Bluetooth, NFC, and any other communications methods after
installing it.

For guidelines about how to create an account using Parity Signer, see
[**this video tutorial**](https://youtu.be/hgv1R9mPEXw?t=120) and visit
[**this support article**](https://support.polkadot.network/support/solutions/articles/65000180512-how-to-create-an-account-in-parity-signer).

### Restore Account on Polkadot Vault

See [**this video tutorial**](https://youtu.be/hgv1R9mPEXw?t=407) and
[**this support page**](https://support.polkadot.network/support/solutions/articles/65000167901-how-to-restore-an-account-in-parity-signer)
to learn how to restore your account on the Polkadot-JS UI.

## Subkey

Subkey is recommended for technically advanced users comfortable with the command line and compiling
Rust code. Subkey lets you generate keys on any device that can compile the code. Subkey may also be
useful for automated account generation using an air-gapped device. It is not recommended for
general users.

:::info

For guidelines about how to create an account using Subkey, see
[**this video tutorial**](https://youtu.be/SWfE_EwxgIU) and visit
[**this support article**](https://support.polkadot.network/support/solutions/articles/65000180519-how-to-create-an-account-in-subkey).

:::
