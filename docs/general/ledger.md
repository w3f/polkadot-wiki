---
id: ledger
title: Using the Polkadot Ledger Application
sidebar_label: Ledger Application
description: How to use the Polkadot application on Ledger.
keywords: [ledger, staking, polkadot app]
slug: ../learn-ledger
---

:::info

Because of required WebUSB support, Ledger wallets currently only work on Chromium-based
browsers like Brave and Chrome.

:::

The Polkadot [Ledger][] application is compatible with both the Ledger Nano S and the Ledger Nano X
devices. Ledger devices are hardware wallets that keep your secret key secured on a physical device that
does not expose it to your computer or the internet. That is, even if you connect your nano via USB to your computer, the private keys will not be leacked. Ledger devices are also hierarchical deterministic wallets (HD wallets), that is:

  - Deterministic means that there is only one seed phrase to generate all the accounts for different cryptocurrencies.
  - Hierarchical means that the accounts are generated in a tree-like structure for different purposes.

Ledger devices can be equipped with applications that are blockchain-specific. Such applications are usually develped by third parties and they enable the user to perform essential actions such as transacting and staking.
The Polkadot Ledger application allows you to manage Polkadot's native token, DOT. It supports
most of the transaction types of the network, including batch transactions from the Utility pallet. Note that the Polkadot Ledger application does not currently support the staking extrinsic `rebag`.

If you have trouble using Ledger or following the directions below, you can try searching for your
issue on the [Polkadot Knowledge Base](https://support.polkadot.network/).

## Requirements

Here is a list of what you will need before starting:

- A Ledger Nano X or Nano S plus (reommended since the Polkadot Ledger App takes some space and the Ledger Nano S has limited memory and it is no longer produced).
- The latest firmware of the Polkadot Ledger App installed (always check for updates in Ledger Live under the "Manager" tab, you will need to allow access with your nano).
- Ledger Live is installed and at version 2.1 or newer (see settings -> about to find out if you're
  up to date).
- A Chromium-based web browser is installed that you can use to access [Polkadot-JS Apps][].

## Installing the Ledger Application

### Using Ledger Live

- Open the "Manager" tab in Ledger Live.
- Connect and unlock your Ledger device by inserting the PIN.
- If asked, allow the manager on your device by pressing both buttons on the YES screen.
- Find Polkadot in the app catalog and install it.

![The Polkadot App in the Ledger Manager](../assets/ledger/manager-app-polkadot.png)

Watch the instructions on how to create an account, send/receive and state/unstake DOTs in the video below

[![Polkadot on Ledger Live](https://img.youtube.com/vi/jL-N_IWiYVA/0.jpg)](https://www.youtube.com/watch?v=jL-N_IWiYVA)


:::info

Ledger Live will only show the main account with BIP44 path 44'/354'/0'/0'/0'. This means that if you create a derived account with for example derivation path 44'/354'/0'/0'/1', this will not be displayed on the Ledger Live App. As a consequence it is not possible to transact with derived accounts using the Ledger Live App, but it is possible to do so using Polkadot js. For more information about derived accounts and derivation paths check [the accounts page](../learn/learn-accounts.md).

:::

### Using the Developer Release

:::tip Instructions

These instructions are for development installation only. It is recommended to install the
application from Ledger Live unless you *know exactly what you're doing*.

:::

Instructions for downloading the pre-release binary from the GitHub releases are written [in the
README][prerelease instructions] for the Polkadot Ledger application GitHub repository.

On the [releases page][] you can download the shell script `install_app.sh` and then make it
executable in your shell by typing the command `chmod +x install_app.sh`.

Using `install_app.sh` `help` command will show you the available options:

```zsh
$ ./install_app.sh --help
Zondax Installer [Polkadot-1.2011.1] [Warning: use only for test/demo apps]
  load    - Load Polkadot app
  delete  - Delete Polkadot app
  version - Show Polkadot app version
```

Next, you must make sure your Ledger device is plugged in and unlocked and you're using the latest
firmware (1.6.1 at the time of writing). If everything is prepared, then type
`./install_app.sh load` and accept the prompts on your Ledger device to install the application.

First it will prompt you to allow an unsafe manager - confirm this by switching the screen to the
allow screen and pressing the corresponding buttons.

After some processing time, the screen of your device will update to say "Install app Polkadot".
Navigate all the way to the right, verify the Identifier hash matches the one that is printed in
your terminal. Click both buttons on "Perform Installation" to install the application. It will ask
again for your PIN code.

At the end of the process you should have the newly installed Polkadot application on the device.

## Using on Polkadot-JS Apps

Please consider watching this video tutorial on how to connect your Ledger
device with Polkadot-JS UI, by importing your accounts to Polkadot-JS Extension

[![Connect Ledger to Polkadot JS UI](https://img.youtube.com/vi/7VlTncHCGPc/0.jpg)](https://youtu.be/7VlTncHCGPc)

:::info

Ledger Live should be off while using Ledger with Polkadot-JS Apps as it can interfere with normal operation.

:::

### Loading Your Account

You can import your Ledger account to [Polkadot Extension](https://polkadot.js.org/extension/) or to the Polkadot JS UI. For instructions
on how to import Ledger accounts to Polkadot JS extension in written format, read through this [article](https://support.polkadot.network/support/solutions/articles/65000175387-how-to-add-your-ledger-through-the-polkadot-extension).
For importing your account to the UI, read through the instructions below.

[Polkadot-JS Apps][] already has an integration with the Ledger application so that your device will work with the browser interface after installation. The functionality is currently gated behind a
feature setting that you will need to turn on.

In order to turn on the interoperability with the Polkadot Ledger application, go to the "Settings"
tab in Polkadot-JS Apps. Find the option for attaching Ledger devices and switch the option from the
default "Do not attach Ledger devices" to "Attach Ledger via WebUSB". Be aware: if you are not
seeing this it is because there is
[no Ledger support](https://github.com/polkadot-js/apps/issues/3771) on FireFox.

![Dropdown selector for allowing Ledger connections in PolkadotJS Settings](../assets/ledger.png)

Click "Save" to keep your settings.

Now when you go to the "Accounts" tab you will see a new button that says "Add Ledger". Ensure that
your Ledger device is unlocked and you have navigated into the Polkadot application, then click this
button.

![Add Ledger button in PolkadotJS](../assets/ledger/query-ledger.png)

A popup will appear asking you to select an account and derivation path.

![Picking an account and derivation path](../assets/ledger/add-account.png)

The first input will let you name your account if you have not done so already. If you have already
named your account, this will not change the existing name. The first dropdown lets you select an
account. You can have multiple accounts on a single Ledger device. The second dropdown lets you pick
a derivation path - think of it like a formula from which child accounts are generated. If in doubt,
pick the first option for both. 0 / 0 is a good default.

Once you confirm your selection, depending on your browser and its security settings, you might need
to confirm the USB connection through a popup like the one below when adding the Ledger device for
the first time:

![Display the device connection popup](../assets/ledger/query-device.png)

Click on the "Unknown device" line and the "Connect" button will become available.

You should now be able to scroll down and find a new account on the page with the type "ledger".

![Displaying the Ledger account in the list](../assets/ledger/ledger-balance.png)

You can now use this account to interact with Polkadot on Polkadot-JS Apps and it will prompt your
ledger for confirmation when you initiate a transaction.

### Confirming the Address on your Device

On the "Accounts" tab, find your Ledger-connected account. Click on the three vertical dots at the
end of the row. This will open a new menu, here you can click the "Show address on hardware device"
option to display the address on your device.

![Options menu of an account in the Accounts screen of PolkadotJS](../assets/ledger-4.png)

Here you can scroll through and make sure the address matches to what is displayed on Polkadot-JS
Apps.

### Checking the Balance of Your Account

There are a few methods to check the balance of your account. You can use Polkadot-JS Apps or you
can use a block explorer like [Polkascan][] or [Subscan][].

#### Using Polkadot-JS Apps

Once you have your account loaded on the "Accounts" tab it should show a row with your Ledger
account. At the far right of the row is located your account's DOT balance. If you expand the
balance arrow, it will show details of your balance such as locks or reserved amounts.

![Account row showing empty balance](../assets/ledger/ledger-balance.png)

### Sending a Transfer

Instructions to send a transfer can be found on the
[balance transfer page](../learn/learn-balance-transfers.md).

### Receiving a Transfer

In order to receive a transfer on the accounts stored on your Ledger device, you will need to
provide the sender (i.e. the payer) with your address.

The easiest way to get your address is to click on the account name which will open a sidebar. Your
address will be shown in this sidebar, along with some other information. Another method is just
clicking on your account's avatar icon - this immediately copies your address to the clipboard.

:::warning

Before giving anyone your address, make sure it matches what's really on the Ledger
by [confirming the address on your device](#confirming-the-address-on-your-device). Some malware
will intercept clicks and clipboard requests and can change your copied value in-flight, so being
extra vigilant around copy-paste operations makes sense.

:::

### Staking

You can enable staking by issuing a batch transaction that will include
the required extrinsics.

You can also issue two separate transactions when you want to stake using an account stored on a
Ledger device, as follows:

- Go to the "Staking" tab found under the "Network" dropdown in the top navigation menu.
- Click the "Account Actions" pane in the inner navigation.
- Click "+ Stash" instead of "+ Nominator" or "+ Validator" (selecting the latter two will not
  work).
- Input the amount of tokens to bond and confirm the transaction.
- Confirm the transaction on the Ledger device.
- When the transaction is included you will see the newly bonded account in the "Account Actions"
  page.
- Select "Start Nominating" or "Start Validating" to start nominating or validating.
- Confirm the transaction on Apps and on the Ledger device.

### Removing Expired Democracy Locks

You can remove expired democracy locks by issuing a batch transaction that will include
the required extrinsics.

You can also manually issue several extrinsics when you want remove expired democracy locks on an
account stored on a Ledger device, as follows:

- Go to https://polkadot.js.org/apps/#/accounts. Look at your expired locks and note which referenda
  they were for.
- Go to https://polkadot.js.org/apps/#/extrinsics
- For each referendum with an expired lock, issue a "democracy.removeVote(X)" extrinsic, where X =
  the referendum you voted on and has an expired lock. Make sure you do it from the account with the
  expired locks - you can't do it from another account.
- Once you have removed all of the votes, issue a "democracy.unlock(ACCOUNT)" extrinsic, where
  ACCOUNT is the account you just removed the votes from.
- Go back to https://polkadot.js.org/apps/#/accounts. You'll see that the locks are now removed.

**Please be advised**: Despite the Polkadot ledger application being compatible with both the Ledger
Nano S and the Ledger Nano X, none of the [Democracy](../maintain/maintain-guides-democracy.md) extrinsics
are available in the light version. The following [repo by Zondax][] lists the currently supported Democracy extrinsics on the full ledger.

## Support

If you need support, please visit the
[Polkadot Support page](https://support.polkadot.network).

[ledger]: https://www.ledger.com/
[repo by zondax]: https://github.com/Zondax/ledger-polkadot#democracy
[polkadot-js apps]: https://polkadot.js.org/apps
[prerelease instructions]: https://github.com/Zondax/ledger-polkadot#download-and-install
[releases page]: https://github.com/Zondax/ledger-polkadot/releases
[polkascan]: https://polkascan.io/polkadot
[subscan]: https://polkadot.subscan.io/
