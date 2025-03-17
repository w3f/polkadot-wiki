---
id: ledger
title: Using the Polkadot Ledger Apps
description: Use the Polkadot Ledger Application.
keywords: [Ledger, Polkadot Ledger app, Ledger Generic]
slug: ../ledger
---

<!-- MessageBox -->
<div id="messageBox" class="floating-message-box">
  <p>
    If you need help using Ledger, see
    <a href="https://support.ledger.com/article/Migrate-Assets-to-Polkadot-Generic-App-Accounts-Using-the-Polkadot-Generic-App" target="_blank" rel="noopener noreferrer">
      this support article.
    </a>
    If the problem persists, you can contact the
    <a href="https://support.polkadot.network/support/home" target="_blank" rel="noopener noreferrer">
      Polkadot Support Team.
    </a>
  </p>
  <button class="close-messagebox" aria-label="Close message">✖</button>
</div>

The Polkadot [Ledger](https://www.ledger.com/) application is compatible with the Ledger Nano S,
Nano X, and Stax devices. Ledger devices are hardware wallets that keep your secret key secured on a
physical device that does not expose it to your computer or the internet. The private keys will not
be exposed even if you connect your Ledger device via USB to your computer.

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

But you will be able to add them to [wallets and extensions](wallets-and-extensions.md) that
support Ledger devices.

More information on Ledger device comparisons
[here](https://shop.ledger.com/pages/hardware-wallets-comparison).

## Requirements

Here is a list of what you will need before using Polkadot with Ledger:

- A Ledger Nano X, Stax, or Nano S plus (recommended for the Polkadot Ledger App space requirements
  and functionalities).
- [Ledger Live](https://www.ledger.com/ledger-live) installed and up-to-date.
- The latest firmware of the Polkadot Ledger App installed (always check for updates in Ledger Live
  under the "Manager" tab; you will need to allow access with your nano).
- A Chromium-based web browser if you use a browser extension.

Ledger devices are tiny computers. They have an operating system (or firmware), and on top of it,
you can install applications. Every blockchain needs to develop its own application to use Ledger
devices. Make sure you have your Ledger devices with firmware and apps up-to-date.

## Polkadot Ledger Apps

Ledger devices can be equipped with applications that are blockchain-specific. Third parties usually
develop such applications, enabling users to transact securely on the blockchain network. Polkadot
Ledger apps are developed by [Zondax](https://zondax.ch/) and are available
[here](https://github.com/Zondax/ledger-polkadot). The Polkadot Ledger application allows you to
manage Polkadot, Kusama and their parachains native tokens.

!!! note "Ledger apps may not support all the transactions"
    Check the [Ledger Polkadot App](https://github.com/Zondax/ledger-polkadot) specification for the list of transactions supported. Some transactions are supported only on a specific app version, and others are not supported by any version. For instance, joining a [nomination pool](../learn/learn-nomination-pools.md) is only possible with the **XL version** but not on the **lite version**.

### Polkadot Migration App

!!! warning "For Migration Only"
    This app is only meant for performing the migration to the Polkadot Generic App; do not use it frequently. 

    After you migrate your assets, delete the Migration app and use the Polkadot Generic App.

The Polkadot Migration app is for users having **old Ledger accounts not on the Polkadot relay chain
and [Polkadot System Chains](glossary.md#system-parachains)**. Old Ledger accounts are accounts
that have been created using the old Kusama Ledger app and any parachain Ledger apps (for both
Kusama and Polkadot) except for Polkadot System Chains.

Suppose you have accounts on any Polkadot parachain, Kusama relay chain, and Kusama parachains. In
that case, you will need the Polkadot Migration app to move fungible and non-fungible assets (NFT),
identities, etc., from old Ledger accounts to a new one or an existing one created with the Polkadot
Ledger app.

### Polkadot (Generic) App

!!! info "Ledger Generic Support"
    See [this page](https://data.parity.io/metadata) to see which chains support the Ledger Generic App.

The Polkadot Ledger Generic App will allow you to use your Ledger device on the relay chain and
parachains without being affected by runtime upgrades. The goal is to provide a single application
for the entire Polkadot ecosystem without compromising security. This new app will also count with
Clear Signing, allowing you to see what you sign on a trusted display. This way, unintentionally
signing rogue transactions can be avoided. [See this page](transaction-attacks.md) to understand
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
[Nova Wallet](https://novawallet.io/), [Talisman](https://www.talisman.xyz/),
[Subwallet](https://www.subwallet.app/), and [PolkaGate](https://polkagate.xyz/).

For more information about the Polkadot Generic App, see the
[Ledger FAQ](https://support.ledger.com/hc/en-us/articles/17550211746845-New-Polkadot-app-FAQ?docs=true%20:dot),
and [Zondax beryx page](https://substrate.beryx.io/new_polkadot_ledger_app).

## Migration Process

The migration process is not meant for Polkadot relay chain and System Chains users. Those users can
install the Polkadot app and operate it as usual. For users of Kusama relay chain, Kusama System
Chains and parachains, and Polkadot parachains, see the procedure below:

- Install Polkadot Migration and Polkadot App.
- Use a browser extension or mobile wallet that supports the new apps. No application will
  automatically migrate your assets. You need to manually migrate your assets,
  [identities](../learn/learn-identity.md), [staking](../learn/learn-staking.md), etc., to the
  account controlled by the Polkadot app and sign in with the Migration app (some extensions and
  wallets UI will prompt which app you need to use to sign in depending on the chain you are in).
- When the migration process is finished, you can delete the Migration app, and everything will be
  accessible using the Polkadot Generic app.

!!! info "Staking and Identities"
    The migration process will also include removing identities from your old account and resetting them
    to the new one. You will also need to unstake, wait for the unbonding period, transfer the funds to
    the new account, and stake again.

## Using Ledger Live

See
[this support article](https://support.polkadot.network/support/solutions/articles/65000175822-how-to-use-polkadot-and-stake-with-ledger-live)
to learn how to use Polkadot with ledger live.

---

!!! info "Polkadot-JS Guides"
    If you are an advanced user, see the
    [Polkadot-JS guides about Ledger](../learn/learn-guides-ledger.md).


