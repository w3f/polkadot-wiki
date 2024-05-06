---
id: ledger
title: Using the Polkadot Ledger Apps
sidebar_label: Ledger
description: Use the Polkadot Ledger Application.
keywords: [ledger, staking, polkadot app]
slug: ../ledger
---

import MessageBox from "../../components/MessageBox"; import "../../components/MessageBox.css";

<MessageBox message="If you need help using Ledger see [this support article](https://support.ledger.com/hc/en-us/articles/360016289919-Polkadot-DOT?docs=true). If the problem persists you can contact the
[Polkadot Support Team](https://support.polkadot.network/support/home)." />

The {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} [Ledger](https://www.ledger.com/)
application is compatible with the Ledger Nano S, Nano X and Stax devices. Ledger devices are
hardware wallets that keep your secret key secured on a physical device that does not expose it to
your computer or the internet. The private keys will not be exposed even if you connect your Ledger
device via USB to your computer.

Ledger devices are hierarchical deterministic wallets (HD wallets), where:

- _Deterministic_ means that only one seed phrase generates all the accounts for different
  blockchain networks.
- _Hierarchical_ means that the accounts are generated in a tree-like structure for different
  purposes.

## Ledger Devices Compatibility

|   Device    |         Platform         | Battery |            Apps            |              Security               |    Status     |
| :---------: | :----------------------: | :-----: | :------------------------: | :---------------------------------: | :-----------: |
|   Nano S    |      PC<sup>1</sup>      |   No    | All (lite, XL<sup>2</sup>) | Certified Secure Element (CC EAL5+) | Discontinued  |
| Nano S Plus |            PC            |   No    |    All (lite, XL, plus)    | Certified Secure Element (CC EAL6+) | In Production |
|   Nano X    | PC, Mobile via bluetooth |   Yes   |    All (lite, XL, plus)    | Certified Secure Element (CC EAL5+) | In Production |
|    Stax     | PC, Mobile via bluetooth |   Yes   |         Dedicated          | Certified Secure Element (CC EAL6+) | In Production |

<sup>1</sup> Because of required WebUSB support, Ledger wallets currently only work on
Chromium-based browsers like Google Chrome.<br/><br/>

<sup>2</sup> The lite version of the Polkadot Ledger App that you can install by default in the
Ledger Nano S has limited functionality. The Ledger Nano S is no longer produced and has limited
memory that is just right to accommodate the XL version of the Polkadot Ledger App, which gives the
user more functionalities.<br/><br/>

If you do use a Nano S with the XL version you will not be able to:

- Install any other Ledger application on your device
- Add Polkadot accounts to the Ledger Live App.

But you will be able to add them to [wallets and extensions](./wallets-and-extensions.md) that
support Ledger devices.

More information on Ledger devices comparisons
[here](https://shop.ledger.com/pages/hardware-wallets-comparison).

## Requirements

Here is a list of what you will need before using
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} with Ledger:

- A Ledger Nano X, Stax, or Nano S plus (recommended for
  {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} Ledger App space requirements and
  functionalities).
- [Ledger Live](https://www.ledger.com/ledger-live) installed and up-to-date.
- The latest firmware of the {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} Ledger
  App installed (always check for updates in Ledger Live under the "Manager" tab, you will need to
  allow access with your nano).
- A Chromium-based web browser if you use a browser extension.

## Polkadot Ledger App

Ledger devices can be equipped with applications that are blockchain-specific. Third parties usually
develop such applications, enabling the user to transact securely on the blockchain network.
Polkadot Ledger apps are developed by [Zondax](https://zondax.ch/) and are available
[here](https://github.com/Zondax/ledger-polkadot). The Polkadot Ledger applications allow you to
manage {{ polkadot: Polkadot's :polkadot }}{{ kusama: Kusama's :kusama }} native token,
{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}, and more depending on the version of the
app.

:::note Ledger apps may not support all the transactions

Check the
{{ polkadot: [Ledger Polkadot App](https://github.com/Zondax/ledger-polkadot) :polkadot }}{{ kusama: [Ledger Kusama App](https://github.com/Zondax/ledger-kusama) :kusama }}
specification for the list of transactions supported. Some transactions are supported only on a
specific app version, and others are not supported by any version. For instance, joining a
[nomination pool](../learn/learn-nomination-pools.md) is only possible with the **XL version** but
not on the **lite version**.

:::

There are currently three versions of the Polkadot Ledger app, described below.

|   App Version    | Support |
| :--------------: | :-----: |
|       lite       | Ongoing |
|        XL        | Ongoing |
| Nano SP/X - Stax | Ongoing |

These Ledger apps need to be updated every time there is a runtime upgrade.

## Polkadot Ledger Generic App

:::info In Development

Check this [website](https://substrate.beryx.io/new_polkadot_ledger_app) for updates and info.

:::

The Polkadot Ledger Generic App will allow to use your Ledger device on the Relay Chain and
parachains as well, without being affected by runtime upgrades. The goal is to provide a single
application for the entire Polkadot ecosystem without compromising security. This new app will also
count with Clear Signing which allows you to see what you sign on a trusted display. This way,
unintentionally signing rogue transactions can be avoided. [See this page](./transaction-attacks.md)
to understand the importance of verifying transactions before signing them.

The Polkadot Ledger Generic app brings the following benefits:

- Innovation Acceleration: Enabling teams to innovate and develop new features for relay chains,
  parachains, and current/future users.
- Network Adoption: Facilitating a smoother and more user-friendly adoption of the Polkadot
  ecosystem.
- Innovation without compromising security: The new Polkadot app comes with the highest security
  standards so that users can keep their assets in a safe way.
- Development Efficiency: The app helps developing teams by saving costs for having and maintaining
  their own app.

The Polkadot Ledger Generic app will be supported by Ledger Live,
[Nova Wallet](https://novawallet.io/), [Talisman](https://www.talisman.xyz/), and
[Subwallet](https://www.subwallet.app/).

For more information about the Polkadot Generic App see the
[Ledger FAQ](https://support.ledger.com/hc/en-us/articles/17550211746845-New-Polkadot-app-FAQ?docs=true%20:dot),
and [Zondax beryx page](https://substrate.beryx.io/new_polkadot_ledger_app).

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
is deployed on the network. If this happens, users cannot use Ledger devices to sign transactions.
Suppose you cannot wait a few days until the app passes the Ledger audit, you can install the
developer release from the shell using the latest version published on
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

---

:::info Polkadot-JS Guides

If you are an advanced user, see the
[Polkadot-JS guides about Ledger](../learn/learn-guides-ledger.md).

:::
