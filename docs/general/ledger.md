---
id: ledger
title: Using the Polkadot Ledger Apps
sidebar_label: Ledger
description: Use the Polkadot Ledger Application.
keywords: [ledger, staking, polkadot app]
slug: ../ledger
---

import MessageBox from "../../components/MessageBox"; import "../../components/MessageBox.css";

<MessageBox message="If you need help using Ledger, see [this support article](https://support.ledger.com/hc/en-us/articles/360016289919-Polkadot-DOT?docs=true). If the problem persists, you can contact the
[Polkadot Support Team](https://support.polkadot.network/support/home)." />

The {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} [Ledger](https://www.ledger.com/)
application is compatible with the Ledger Nano S, Nano X, and Stax devices. Ledger devices are
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

If you do use a Nano S with the XL version, you will not be able to:

- Install any other Ledger application on your device
- Add Polkadot accounts to the Ledger Live App.

But you will be able to add them to [wallets and extensions](./wallets-and-extensions.md) that
support Ledger devices.

More information on Ledger device comparisons
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
develop such applications, enabling users to transact securely on the blockchain network. Polkadot
Ledger apps are developed by [Zondax](https://zondax.ch/) and are available
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

These Ledger apps must be updated every time there is a runtime upgrade.

## Polkadot Ledger Generic App

:::info In Development

Check this [website](https://substrate.beryx.io/new_polkadot_ledger_app) for updates and info.

:::

The Polkadot Ledger Generic App will allow you to use your Ledger device on the Relay Chain and
parachains without being affected by runtime upgrades. The goal is to provide a single application
for the entire Polkadot ecosystem without compromising security. This new app will also count with
Clear Signing, allowing you to see what you sign on a trusted display. This way, unintentionally
signing rogue transactions can be avoided. [See this page](./transaction-attacks.md) to understand
the importance of verifying transactions before signing them.

The Polkadot Ledger Generic app brings the following benefits:

- Innovation Acceleration: Enabling teams to innovate and develop new features for relay chains,
  parachains, and current/future users.
- Network Adoption: Facilitating a smoother and more user-friendly adoption of the Polkadot
  ecosystem.
- Innovation without compromising security: The new Polkadot app comes with the highest security
  standards so that users can keep their assets safe.
- Development Efficiency: The app helps developing teams save costs by having and maintaining their
  app.

The Polkadot Ledger Generic app will be supported by Ledger Live,
[Nova Wallet](https://novawallet.io/), [Talisman](https://www.talisman.xyz/), and
[Subwallet](https://www.subwallet.app/).

For more information about the Polkadot Generic App, see the
[Ledger FAQ](https://support.ledger.com/hc/en-us/articles/17550211746845-New-Polkadot-app-FAQ?docs=true%20:dot),
and [Zondax beryx page](https://substrate.beryx.io/new_polkadot_ledger_app).

## Using Ledger Live

See
[this support article](https://support.polkadot.network/support/solutions/articles/65000175822-how-to-use-polkadot-and-stake-with-ledger-live)
to learn how to use {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} with ledger live.

---

:::info Polkadot-JS Guides

If you are an advanced user, see the
[Polkadot-JS guides about Ledger](../learn/learn-guides-ledger.md).

:::
