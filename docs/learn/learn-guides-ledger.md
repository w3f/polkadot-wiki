---
id: learn-guides-ledger
title: Polkadot-JS Guides for Ledger Devices
sidebar_label: Ledger Guides
description: Polkadot-JS Guides for Ledger Devices.
keywords: [ledger, polkadot-js]
slug: ../learn-guides-ledger
---

import MessageBox from "../../components/MessageBox"; import "../../components/MessageBox.css";

<MessageBox message="Polkadot-JS is for developers and power users only. If you need help using the
[Polkadot-JS UI](../general/polkadotjs-ui.md), you can contact the
[Polkadot Support Team](https://support.polkadot.network/support/home). For more user-friendly tools
see the [wallets](./wallets-index), [apps](./apps-index) and [dashboard](./dashboards-index) pages." />

:::info

Because of required WebUSB support, Ledger wallets currently only work on Chromium-based browsers
like Brave, Chrome or Edge.

:::

The [Ledger devices](../general/ledger.md) are hardware wallets that keep your private key secured
on a physical device that does not get directly exposed to your computer or the internet.

The [Polkadot Generic application](../general/ledger#polkadot-generic-app) allows you to manage your
tokens and other tokens on the Asset Hub and any other chain within the Polkadot ecosystem.

## Adding Your Account to the UI

:::note

These instructions will guide you on how to add a Ledger account that's **only** available on the
Asset Hub. If you want to use the same Ledger account on both
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} **and** the Asset Hub check the
instructions [below](#working-on-relay-chains-and-asset-hubs).

:::

[Polkadot-JS Apps UI](https://polkadot.js.org/apps/#/explorer) already has an integration with the
Ledger application so that your device will work with the browser interface after installation. The
functionality is currently gated behind a feature setting that you will need to turn on.

In order to turn on the interoperability with the Statemine Ledger application, go to the "Settings"
tab in [Polkadot-JS Apps UI](https://polkadot.js.org/apps/#/explorer). Find the option for attaching
Ledger devices and switch the option from the default "Do not attach Ledger devices" to "Attach
Ledger via WebUSB" (**but see note above**).

![Dropdown selector for allowing Ledger connections in Polkadot-JS Apps UI Settings](../assets/ledger.png)

Click "Save" to keep your settings.

Now when you go to the "Accounts" tab you will see a new button that says "Add via Ledger". Ensure
that your Ledger device is unlocked, Ledger Live is **closed** and you have
[switched over](https://support.polkadot.network/support/solutions/articles/65000169778-how-to-switch-network-nodes)
to the Statemine application, then click this button.

![Add Ledger button in Polkadot-JS Apps UI](../assets/ledger/query-ledger.png)

A popup will appear asking you to select an account and derivation path.

![Picking an account and derivation path](../assets/ledger/add-account.png)

The first option lets you select an account. You can have multiple accounts on a single Ledger
device. The second dropdown lets you pick a derivation path - think of it like a formula from which
child accounts are generated. If in doubt, pick the default option for both.

Once you confirm your selection, depending on your browser and its security settings, you might need
to confirm the USB connection through a popup like the one below when adding the Ledger device for
the first time:

![Display the device connection popup](../assets/ledger/query-device.png)

You should now be able to scroll down and find a new account on the page with the type "ledger".

![Displaying the Ledger account in the list](../assets/ledger/ledger-balance.png)

You can now use this account to interact with the Asset Hub on
[Polkadot-JS Apps UI](https://polkadot.js.org/apps/#/explorer) and it will prompt your ledger for
confirmation when you initiate a transaction.

### Confirming the Address on your Device

On the "Accounts" tab, find your Ledger-connected account. Click on the three vertical dots at the
end of the row. This will open a new menu, here you can click the "Show address on hardware device"
option to display the address on your device.

![Options menu of an account in the Accounts screen of Polkadot-JS Apps UI](../assets/ledger-4.png)

Here you can scroll through and make sure the address matches to what is displayed on
[Polkadot-JS Apps UI](https://polkadot.js.org/apps/#/explorer).

## Navigating your Account

Once you have your account loaded on the "Accounts" tab it should show a row with your Ledger
account. At the far right of the row is located your account's DOT balance. If you expand the
balance arrow, it will show details of your balance such as locks or reserved amounts.

![Account row showing empty balance](../assets/ledger/ledger-balance.png)

## Loading Your Account

:::info

Ledger Live should be off while using Ledger with Polkadot-JS UI as it can interfere with normal
operation.

:::

You can import your Ledger account to [Polkadot Extension](https://polkadot.js.org/extension/) or to
the [Polkadot-JS UI](https://polkadot.js.org/apps/#/explorer). For instructions on how to import
Ledger accounts to the Polkadot Extension read through
[this support article](https://support.polkadot.network/support/solutions/articles/65000175387-how-to-add-your-ledger-through-the-polkadot-extension),
while if you want to import Ledger accounts to the Polkadot-JS UI you can consult
[this other article](https://support.polkadot.network/support/solutions/articles/65000170812-how-to-add-ledger-account-through-the-polkadot-js-ui).

### Derivation paths

When adding a Ledger account using the extension or the UI, you will be asked to select an
`account type` and an `account index`. The first lets you select an account, while the second lets
you pick a derivation path from that account - think of it like a formula from which child accounts
are generated. When you are creating a
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} ledger account for the first time on
Ledger Live with name {{ polkadot: `Polkadot 1` :polkadot }}{{ kusama: `Kusama 1` :kusama }}, this
can be added to Polkadot-JS using the 0/0 derivation path (i.e. account type = 0 and account index =
0). If you add a second account called
{{ polkadot: `Polkadot 2` :polkadot }}{{ kusama: `Kusama 2` :kusama }}, this will correspond to the
1/0 derivation path, and so on. We thus have multiple parent accounts that can be viewed and used in
both Ledger Live and Polkadot-JS. Additionally, we can use Polkadot-JS UI to create multiple
children accounts from each parent account. For example,
{{ polkadot: `Polkadot 1` :polkadot }}{{ kusama: `Kusama 1` :kusama }} with 0/0 derivation path can
have child 0/1, 0/2, etc. that can be used within the UI. However, such children accounts cannot be
used in Ledger Live, as it only scans through the parent accounts. So, remember that the balances on
the children accounts cannot be viewed, and you will not be able to transact with those accounts on
Ledger Live.

### Connecting your ledger device

While using a ledger device to sign transactions, depending on your browser and its security
settings, you might need to confirm the USB connection through a popup like the one below:

![Display the device connection popup](../assets/ledger/query-device.png)

If you are adding your Ledger Nano for the first time, click on the "Unknown device" line and the
"Connect" button will become available.

:::info Signature error message

If you have already connected your device, but an error message appears before signing a
transaction, make sure you have opened the
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} application on your Ledger Nano
device. Visit
[this support page](https://support.polkadot.network/support/solutions/articles/65000181994) for
more information about signing transactions using your ledger.

:::

## Confirming the Address on your Device

To display your {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} ledger account
address on your Ledger Nano, you can follow the guidelines on
[this support article](https://support.polkadot.network/support/solutions/articles/65000181854-how-to-confirm-your-account-address-on-your-ledger-device).
Here you can scroll through and make sure the address matches what is displayed on
[Polkadot-JS UI](https://polkadot.js.org/apps/#/explorer).

## Checking the Balance of Your Account

There are a few methods to check the balance of your account. Check out
[this support article](https://support.polkadot.network/support/solutions/articles/65000169332-where-can-i-see-the-balance-of-my-account-)
for information.

## Sending a Transfer with Ledger Devices

:::danger Verifying Extrinsics

Visit the
[**dedicated support page**](https://support.polkadot.network/support/solutions/articles/65000179161-how-can-i-verify-what-extrinsic-i-m-signing-#Verify-an-extrinsic-using-Ledger)
and see [**this video tutorial**](https://youtu.be/bxMs-9fBtFk?t=360) tutorial to learn about how to
verify extrinsics before signing them. The video will also mention potential attacks that can happen
to you while signing for transactions.

:::

General instructions to send a transfer can be found on
[this support page](https://support.polkadot.network/support/solutions/articles/65000170304-how-to-send-transfer-funds-out-of-your-dot-account-on-the-polkadot-js-ui).
To sign transactions with your Ledger nano check
[this support article](https://support.polkadot.network/support/solutions/articles/65000181994) or
see [this video tutorial](https://youtu.be/gbvrHzr4EDY?t=579).

## Receiving a Transfer

To receive a transfer on the accounts stored on your Ledger device, you must provide the sender
(i.e. the payer) with your address. To do so, follow the instructions on
[this support page](https://support.polkadot.network/support/solutions/articles/65000181866-how-to-receive-dot-to-my-account-on-polkadot-js-ui).

:::warning

Before giving anyone your address, ensure it matches what's on the Ledger by
[confirming the address on your device](#confirming-the-address-on-your-device). Some malware will
intercept clicks and clipboard requests and can change your copied value in-flight, so being extra
vigilant around copy-paste operations makes sense.

:::

## Receiving a Transfer

In order to receive a transfer on the accounts stored on your Ledger device, you will need to
provide the sender (i.e. the payer) with your address.

The easiest way to get your address is to click on the account name which will open a sidebar. Your
address will be shown in this sidebar, along with some other information. Another method is just
clicking on your account's avatar icon - this immediately copies your address to the clipboard.

:::note Your Asset Hub address is the same as your Relay Chain address

Make sure that you clarify to the sender that you wish to receive your tokens on the Asset Hub
parachain, otherwise (if you're receiving {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}
tokens) they could be sent on the {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}
chain.

:::

:::caution Before giving anyone your address

Make sure it matches what's really on the Ledger by
[confirming the address on your device](#confirming-the-address-on-your-device). Some malware will
intercept clicks and clipboard requests and can change your copied value in-flight, so being extra
vigilant around copy-paste operations makes sense.

:::

## Staking

For staking using Ledger devices, check the section "How to stake using your Ledger" on
[this support article](https://support.polkadot.network/support/solutions/articles/65000168057-how-do-i-stake-nominate-on-polkadot-).

## Removing Expired Democracy Locks

Check out
[this support page](https://support.polkadot.network/support/solutions/articles/65000181870-how-to-remove-expired-democracy-locks)
the learn how to remove democracy locks after the end of a Governance referendum.

**Please be advised**: Despite the Polkadot ledger application being compatible with both the Ledger
Nano S and the Ledger Nano X, some extrinsics are not supported by the light version. The following
[repository by Zondax](https://github.com/Zondax/ledger-polkadot) lists the currently supported
extrinsics on the XL version of the Ledger app.

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

Currently, the developer release can be installed only on the Nano S and S Plus devices and can't be
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

- Attach your Ledger Nano (in this case, Nano S Plus) to your computer, enter the PIN code, and run
  the command `./installer_nanos_plus.sh load`. Scroll with the right button until you see "Allow
  unsafe manager", left and right press to confirm. You will be asked to confirm the action of
  uninstalling the app and subsequently installing the newer version. After confirming both actions,
  the shell script will install the version on your device. You must insert the PIN code to use the
  device after the installation.
- If you wish to revert the version to the stable release, go to Ledger Live. The app will
  automatically detect the developer release and give the option to install the previous stable
  release.
