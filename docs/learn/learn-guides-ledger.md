---
id: learn-guides-ledger
title: Polkadot-JS Guides for Ledger Devices
sidebar_label: Ledger Guides
description: Polkadot-JS Guides for Ledger Devices.
keywords: [ledger, polkadot-js]
slug: ../learn-guides-ledger
---

<!-- MessageBox -->
<div id="messageBox" class="floating-message-box">
  <p>
    Polkadot-JS is for developers and power users only. If you need help using the Polkadot-JS UI, you can contact the
    <a href="https://support.polkadot.network/support/home" target="_blank" rel="noopener noreferrer">
      Polkadot Support Team.
    </a>
  </p>
  <button class="close-messagebox" aria-label="Close message">✖</button>
</div>

The [Ledger devices](../general/ledger.md#polkadot-generic-app) are hardware wallets that keep your private key secured
on a physical device not directly exposed to your computer or the internet.

The [Polkadot Generic application](../general/ledger.md#polkadot-generic-app) allows you to manage
your DOT/KSM on Polkadot/Kusama networks, tokens on their Asset Hubs and possibly all chains within
the Polkadot ecosystem. It is versatile and capable of handling parachains and relay chains without
being affected by their runtime upgrades.

## Loading Your Account

!!!info
    Ledger Live should be off while using Ledger with Polkadot-JS UI, as it can interfere with normal operation.

You can import your Ledger account to [Polkadot Extension](https://polkadot.js.org/extension/) or to
the [Polkadot-JS UI](https://polkadot.js.org/apps/#/explorer). For instructions on how to import
Ledger accounts to the Polkadot Extension read through
[this support article](https://support.polkadot.network/support/solutions/articles/65000175387-how-to-add-your-ledger-through-the-polkadot-extension),
while if you want to import Ledger accounts to the Polkadot-JS UI, you can consult
[this other article](https://support.polkadot.network/support/solutions/articles/65000170812-how-to-add-ledger-account-through-the-polkadot-js-ui).

### Derivation paths

When adding a Ledger account using the extension or the UI, you will be asked to select an
`account type` and an `account index`. The first lets you select an account, while the second lets
you pick a derivation path from that account - think of it like a formula from which child accounts
are generated. When you are creating a Polkadot ledger account for the first time on Ledger Live
with name `Polkadot 1`, this can be added to Polkadot-JS using the 0/0 derivation path (i.e. account
type = 0 and account index = 0). If you add a second account called `Polkadot 2`, this will
correspond to the 1/0 derivation path, and so on. We thus have multiple parent accounts that can be
viewed and used in both Ledger Live and Polkadot-JS. Additionally, we can use Polkadot-JS UI to
create multiple children accounts from each parent account. For example, `Polkadot 1` with 0/0
derivation path can have child 0/1, 0/2, etc. that can be used within the UI. However, such children
accounts cannot be used in Ledger Live, as it only scans through the parent accounts. So, remember
that the balances on the children accounts cannot be viewed, and you will not be able to transact
with those accounts on Ledger Live.

### Confirming the Address on your Device

If your Ledger account is directly imported into the Polkadot-JS UI, you can ask the UI to confirm
the address on your Ledger device. There are a few methods to check the balance of your Ledger
account. Check out
[this support article](https://support.polkadot.network/support/solutions/articles/65000169332-where-can-i-see-the-balance-of-my-account-)
for information.

## Navigating your Account

Once you have loaded your account on the “Accounts” tab, it should show a row with your Ledger
account. Your account’s DOT balance is on the row’s far right. Expanding the balance arrow will show
your balance details, such as locks or reserved amounts. For more information about the type of
balances, visit the [balances page](./learn-account-balances.md#balance-types-on-polkadot-js).

## Sending a Transfer with Ledger Devices

!!!danger "Verifying Extrinsics"
    Visit the [**dedicated support page**](https://support.polkadot.network/support/solutions/articles/65000179161-how-can-i-verify-what-extrinsic-i-m-signing-#Verify-an-extrinsic-using-Ledger) and see [**this video tutorial**](https://youtu.be/bxMs-9fBtFk?t=360) tutorial to learn how to verify extrinsics before signing them. The video will also mention potential attacks that can happen while signing transactions.

!!!info "Signature error message"
    If you have already connected your device, but an error message appears before signing a transaction, make sure you have opened the Polkadot Ledger Generic application on your Ledger Nano device. Visit [this support page](https://support.polkadot.network/support/solutions/articles/65000181994) for more information about signing transactions using your ledger.

General instructions to send a transfer can be found on
[this support page](https://support.polkadot.network/support/solutions/articles/65000170304-how-to-send-transfer-funds-out-of-your-dot-account-on-the-polkadot-js-ui).
To sign transactions with your Ledger Nano check
[this support article](https://support.polkadot.network/support/solutions/articles/65000181994) or
see [this video tutorial](https://youtu.be/gbvrHzr4EDY?t=579).

## Receiving a Transfer

To receive a transfer on the accounts stored on your Ledger device, you must provide the sender
(i.e., the payer) with your address. To do so, follow the instructions on
[this support page](https://support.polkadot.network/support/solutions/articles/65000181866-how-to-receive-dot-to-my-account-on-polkadot-js-ui).

!!!caution "Sharing your account address"
    Before giving anyone your address, ensure it matches what's on the Ledger by [confirming the address on your device](#confirming-the-address-on-your-device). Some malware will intercept clicks and clipboard requests and can change your copied value in-flight, so being extra vigilant around copy-paste operations makes sense.

The easiest way to get your address is to click on the account name. This will open a sidebar
showing your address and other information, such as on-chain identity. Another method is just
clicking on your account's avatar icon - this immediately copies your address to the clipboard.

!!!note "Your Asset Hub address is the same as your relay chain address"
    Make sure that you clarify to the sender that you wish to receive your tokens on the Asset Hub parachain, otherwise (if you're receiving DOT or KSM tokens) they could be sent on the Polkadot or Kusama relay chain.

## Staking

For staking using Ledger devices, follow the instructions on
[this support article](https://support.polkadot.network/support/solutions/articles/65000168057-how-do-i-stake-nominate-on-polkadot-).

## Ledger Developer Release

!!!warning
    This section is for developers only. It is recommended to install the application from Ledger Live unless you _know precisely what you're doing_.

### Why you might need the Developer Release

Ledger apps for the Polkadot ecosystem are developed by [Zondax](https://zondax.ch/). When new
functionalities are added to the Ledger apps, they are made available on a developer release for
testing purposes. After a successful audit and review, the apps would be available for download and
installation using [Ledger Live](https://www.ledger.com/ledger-live). As it takes some time for
Ledger to audit and review the release, the app upgrade option may not be available on Ledger Live
when the new runtime is deployed on the network. If this happens, users cannot use Ledger devices to
sign transactions. Suppose you cannot wait a few days until the app passes the Ledger audit, you can
install the developer release from the shell using the latest version published on
[the Zondax GitHub repository](https://github.com/Zondax/ledger-polkadot/releases).

### Install the Developer Release

!!!info
    See [**this video tutorial**](https://youtu.be/4SyVQrlXZ_Q) to learn how to install the developer release of your ledger app.

Currently, the developer release can be installed only on the Nano S and S Plus devices and can't be
installed on the Nano X.

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

- Attach your Ledger Nano (in this case, Nano S Plus) to your computer, enter the PIN code, and run
  the command `./installer_nanos_plus.sh load`. Scroll with the right button until you see "Allow
  unsafe manager", left and right press to confirm. You will be asked to confirm the action of
  uninstalling the app and subsequently installing the newer version. After confirming both actions,
  the shell script will install the version on your device. You must insert the PIN code to use the
  device after the installation.
- If you wish to revert the version to the stable release, go to Ledger Live. The app will
  automatically detect the developer release and give the option to install the previous stable
  release.
