---
id: ledger
title: Using the Polkadot & Kusama Ledger Applications
sidebar_label: Ledger
description: Use the Polkadot Ledger Application.
keywords: [ledger, staking, polkadot app]
slug: ../ledger
---

:::info Need support with your Ledger Wallet?

If you need help using Ledger you can contact the
[**Polkadot Support Team**](https://support.polkadot.network/support/home).

:::

:::warning Please Note

Because of required WebUSB support, Ledger wallets currently only work on Chromium-based browsers
like Google Chrome.

:::

The {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} [Ledger](https://www.ledger.com/)
application is compatible with the Ledger Nano S and the Ledger Nano X devices. Ledger devices are
hardware wallets that keep your secret key secured on a physical device that does not expose it to
your computer or the internet. The private keys will not be leaked even if you connect your nano via
USB to your computer. Ledger devices are also hierarchical deterministic wallets (HD wallets), that
is:

- _Deterministic_ means that only one seed phrase generates all the accounts for different
  blockchain networks.
- _Hierarchical_ means that the accounts are generated in a tree-like structure for different
  purposes.

Ledger devices can be equipped with applications that are blockchain-specific. Third parties usually
develop such applications, enabling the user to transact securely on the blockchain network. The
Polkadot Ledger application allows you to manage
{{ polkadot: Polkadot's :polkadot }}{{ kusama: Kusama's :kusama }} native token,
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}. It supports most of the transaction types of
the network, including batch transactions from the Utility pallet.

:::note Ledger apps may not support all the transactions

Check the
{{ polkadot: [Ledger Polkadot App](https://github.com/Zondax/ledger-polkadot) :polkadot }}{{ kusama: [Ledger Kusama App](https://github.com/Zondax/ledger-kusama) :kusama }}
specification for the list of transactions supported. Some transactions are supported only on a
specific app version, and others are not supported by any version. For instance, the staking `rebag`
extrinsic is supported on the **XL version** but not on the **lite version**. Also, joining a
[nomination pool](../learn/learn-nomination-pools.md) is only possible with the XL version.

:::

If you have trouble using Ledger or following the directions below, you can try searching for your
issue on the [Polkadot support pages](https://support.polkadot.network/).

## Requirements

:::info For Ledger Nano S users only

The lite version of the Polkadot Ledger App that you can install by default in the Ledger Nano S has
limited functionality. The Ledger Nano S is no longer produced and has limited memory that is just
right to accommodate the XL version of the Polkadot Ledger App, which gives the user more
functionalities.

If you do use a Nano S with the XL version you will not be able to:

- Install any other Ledger application on your device
- Add Polkadot accounts to the Ledger Live App.

But you will be able to add them to [**wallets and extensions**](./wallets-and-extensions.md) that
support Ledger devices.

:::

Here is a list of what you will need before using
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} with Ledger:

- A Ledger Nano X or Nano S plus (recommended for
  {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} Ledger App space requirements and
  functionalities).
- The latest firmware of the {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} Ledger
  App installed (always check for updates in Ledger Live under the "Manager" tab, you will need to
  allow access with your nano).
- Ledger Live is installed and up-to-date.
- A Chromium-based web browser if you use a browser extension.

## Using Ledger Live

See
[this support article](https://support.polkadot.network/support/solutions/articles/65000175822-how-to-use-polkadot-and-stake-with-ledger-live)
to learn how to use {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} with ledger live.

## Ledger Developer Release

:::warning

This section is for developers only. It is recommended to install the application from Ledger Live
unless you _know precisely what you're doing_.

:::

### Why you might need the Developer Release

Ledger apps for the {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} ecosystem are
developed by [Zondax](https://zondax.ch/). When new functionalities are added to the Ledger apps,
they are made available on a developer release for testing purposes. After a successful audit and
review, the apps would be available for download and installation using
[Ledger Live](https://www.ledger.com/ledger-live). As it takes some time for Ledger to audit and
review the release, the app upgrade option may not be available on Ledger Live when the new runtime
is deployed on the network. If this happens, users cannot use Ledger devices with the Polkadot-JS
UI, and while signing for a transaction, will most likely incur the error message "txn version not
supported". Please do not panic if this happens, as there are solutions to this problem. Suppose you
cannot wait a few days until the app passes the Ledger audit, you can install the developer release
from the shell using the latest version published on
[the Zondax GitHub repository](https://github.com/Zondax/ledger-polkadot/releases).

### Install the Developer Release

:::info

See [**this video tutorial**](https://youtu.be/4SyVQrlXZ_Q) to learn how to install the developer
release of your ledger app.

Currently, the developer release can be installed only on the Nano S and S plus devices and can't be
installed on the Nano X.

:::

To install the developer version, make sure you have the latest `pip` version and follow the steps
below:

- Install _ledgerblue_ running the command `python3 -m pip install ledgerblue`.
- Download the developer release from the
  [Zondax GitHub repository](https://github.com/Zondax/ledger-polkadot/releases). The file will be
  named `installer_nanos_plus.sh` or something similar, depending on your ledger device.
- Locate the downloaded shell script and make it executable in your shell by typing the command
  `chmod +x installer_nanos_plus.sh`.
- You can now use the `./installer_nanos_plus.sh --help` command to visualize the available options
  (see below)

![Dev Ledger Help Menu](../assets/ledger-help-menu.png)

- Attach your Ledger Nano (in this case Nano S Plus) to your computer, enter the PIN code, and run
  the command `./installer_nanos_plus.sh load`. Scroll with the right button until you see "Allow
  unsafe manager", left and right press to confirm. You will be asked to confirm the action of
  uninstalling the app and subsequently installing the newer version. After confirming both actions,
  the shell script will install the version on your device. You must insert the PIN code to use the
  device after the installation.
- If you wish to revert the version to the stable release, go to Ledger Live. The app will
  automatically detect the developer release and give the option to install the previous stable
  release.
