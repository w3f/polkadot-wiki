---
id: kusama-statemine-ledger
title: Using Ledger Devices with Statemine
sidebar_label: Ledger Devices with Statemine
---

> Note: Because of required WebUSB support, Ledger wallets currently only work on Chromium-based
> browsers like Brave, Chrome or Edge.

Statemine has a [Ledger][] application that is compatible with the Ledger Nano S and Ledger Nano X
devices. The Ledger devices are hardware wallets that keep your private key secured on a physical
device that does not get directly exposed to your computer or the internet.

The Statemine application allows you to manage your KSM and other tokens on the Statemine parachain.
It supports most of the available transaction types of the network in the XL version of the app
(details [below](#installing-the-ledger-application)).

If you have trouble using Ledger or following the directions below, you can try searching for your
issue on the [Polkadot Knowledge Base](https://support.polkadot.network/).

> Please check out our
> [intro to Ledger video on Youtube for more information](https://www.youtube.com/watch?v=p24yOcLLFmI&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=33&ab_channel=Polkadot).

## Requirements

Here is a list of what you will need before starting:

- A Ledger Nano S or a Ledger Nano X.
- The latest firmware installed.
- Ledger Live is installed and at version 2.29 or newer (see settings -> about to find out if you're
  up to date).
- A web browser is installed that you can use to access [Polkadot-JS Apps UI][apps].

## Installing the Ledger Application

### Using Ledger Live

> Note for **Ledger Nano S**: There are two versions of the Statemine app: the normal (light)
> version and the XL version. The light version has smaller size but it supports only basic
> functionality. If you want access to all the supported extrinsics, you need to install the XL
> version of the app. You can see [here][prerelease instructions] a full list of the extrinsics
> supported by both versions.

- Open the "Manager" tab in Ledger Live.
- Connect and unlock your Ledger device.
- If asked, allow the manager on your device by pressing both buttons on the YES screen.
- Search for Statemine in the app catalog.
- If you are using a Ledger Nano S, install either the normal (light) version or the XL version. For
  Ledger Nano X, there will only be one app available.

Please proceed to the [usage instructions](#using-on-polkadot-js-apps) below.

### Using the Developer Release

> NOTE: These instructions are for development installation only. It is recommended to install the
> application from Ledger Live unless you _know exactly what you're doing_.

Instructions for downloading the prerelease binary from the GitHub releases is written [on the
README][prerelease instructions] for the Statemine Ledger application GitHub repository.

On the [releases page][] you can download the shell script `install_app.sh` and then make it
executable in your shell by typing the command `chmod +x install_app.sh`.

Using `install_app.sh` help command will show you the available options:

```zsh
$ ./install_app.sh --help
Zondax Installer [Statemine-1.1.1] [Warning: use only for test/demo apps]
  load    - Load Kusama app
  delete  - Delete Kusama app
  version - Show Kusama app version
```

Next, you must make sure your Ledger device is plugged in and unlocked and you're using the latest
firmware. If everything is prepared, then type `./install_app.sh load` and accept the prompts on
your Ledger device to install the application.

First it will prompt you to allow an unsafe manager - confirm this by switching the screen to the
allow screen and pressing the corresponding buttons.

After some processing time, the screen of your device will update to say "Install app Statemine".
Navigate all the way to the right, verify the Identifier hash matches the one that is printed in
your terminal. Click both buttons on "Perform Installation" to install the application. It will ask
again for your Pin code and you should enter it in the device.

At the end of the process you should have the newly installed Statemine application on the device.

## Using on Polkadot-JS Apps UI

### Adding Your Account

> **IMPORTANT:** WebUSB doesn't work with Chromium version 91.xx. For this reason there is a new
> option "WebHID" that needs to be selected in this version of Chromium for your Ledger device to
> work. This option doesn't work currently with the Polkadot extension.

[Polkadot-JS Apps UI][apps] already has an integration with the Ledger application so that your
device will work with the browser interface after installation. The functionality is currently gated
behind a feature setting that you will need to turn on.

In order to turn on the interoperability with the Statemine Ledger application, go to the "Settings"
tab in [Polkadot-JS Apps UI][apps]. Find the option for attaching Ledger devices and switch the
option from the default "Do not attach Ledger devices" to "Attach Ledger via WebUSB" (**but see note
above**).

![Dropdown selector for allowing Ledger connections in Polkadot-JS Apps UI Settings](assets/ledger.png)

Click "Save" to keep your settings.

Now when you go to the "Accounts" tab you will see a new button that says "Add via Ledger". Ensure
that your Ledger device is unlocked, Ledger Live is **closed** and you have
[switched over](https://support.polkadot.network/support/solutions/articles/65000169778-how-to-switch-network-nodes)
to the Statemine application, then click this button.

![Add Ledger button in Polkadot-JS Apps UI](assets/ledger/query-ledger.png)

A popup will appear asking you to select an account and derivation path.

![Picking an account and derivation path](assets/ledger/add-account.png)

The first option lets you select an account. You can have multiple accounts on a single Ledger
device. The second dropdown lets you pick a derivation path - think of it like a formula from which
child accounts are generated. If in doubt, pick the default option for both.

Once you confirm your selection, depending on your browser and its security settings, you might need
to confirm the USB connection through a popup like the one below when adding the Ledger device for
the first time:

![Display the device connection popup](assets/ledger/query-device.png)

You should now be able to scroll down and find a new account on the page with the type "ledger".

![Displaying the Ledger account in the list](assets/ledger/ledger-balance.png)

You can now use this account to interact with Statemine on [Polkadot-JS Apps UI][apps] and it will
prompt your ledger for confirmation when you initiate a transaction.

### Confirming the Address on your Device

On the "Accounts" tab, find your Ledger-connected account. Click on the three vertical dots at the
end of the row. This will open a new menu, here you can click the "Show address on hardware device"
option to display the address on your device.

![Options menu of an account in the Accounts screen of Polkadot-JS Apps UI](assets/ledger-4.png)

Here you can scroll through and make sure the address matches to what is displayed on [Polkadot-JS
Apps UI][apps].

#### Using Polkadot-JS Apps

Once you have your account loaded on the "Accounts" tab it should show a row with your Ledger
account. At the far right of the row is located your account's DOT balance. If you expand the
balance arrow, it will show details of your balance such as locks or reserved amounts.

![Account row showing empty balance](assets/ledger/ledger-balance.png)

### Sending a Transfer

If you would like to send a transfer from your account housed on the Ledger device, the easiest
method is to use [Polkadot-JS Apps UI][apps].

> _Important:_ Transfering in this way sends tokens to another account on the Statemine parachain.
> If you need to transfer KSM between Statemine and Kusama, see the [Teleporting](#teleporting)
> section below.

- Click on the "Send" button next to your account.
- In the second input, select one of the accounts from the drop-down menu or paste the address that
  you want to transfer funds to.
- In the third input, enter the amount of KSM you want to transfer.
- Click the "Make Transfer" button.
- Confirm the transaction on your device.
- A green success notification will be displayed when the transaction is included in a block.

> Note the "Transfer with Keep-Alive Checks" toggle. While this toggle is in the _On_ state, your
> account will be unable to make transactions which would get its balance below the existential
> deposit. This prevents reaping of accounts with low balances. If you toggle this to _Off_, you
> will be able to go below existential deposit balance, causing your account to be deleted and any
> dust amount of KSM to be burned. If you encounter KeepAlive errors when making transactions, this
> might be the reason.

A detailed guide on doing transfers is available [here](learn-balance-transfers.md).

### Receiving a Transfer

In order to receive a transfer on the accounts stored on your Ledger device, you will need to
provide the sender (i.e. the payer) with your address.

The easiest way to get your address is to click on the account name which will open a sidebar. Your
address will be shown in this sidebar, along with some other information. Another method is just
clicking on your account's avatar icon - this immediately copies your address to the clipboard.

**Please note** that your Statemine address is the same as your Kusama address. So make sure that
you clarify to the sender that you wish to receive your tokens on the Statemine parachain, otherwise
(if you're receiving KSM tokens) they could be sent on the Kusama chain.

> **Warning**: before giving anyone your address, make sure it matches what's really on the Ledger
> by [confirming the address on your device](#confirming-the-address-on-your-device). Some malware
> will intercept clicks and clipboard requests and can change your copied value in-flight, so being
> extra vigilant around copy-paste operations makes sense.

### Teleporting

Teleporting allows you to send tokens between the Relay chain and a parachain, or between different
parachains.

The Statemine Ledger app doesn't support the `teleport` extrinsic at this point, so an intermediary
account needs to be created first.

To teleport KSM to the Relay chain follow these steps:

- Create an account outside your Ledger. Instructions can be found [here](learn-account-generation).
- Transfer the desired amount as described [above](#sending-a-transfer). If you want to send exactly
  the amount you want to teleport, don't forget take into account the fees for teleporting that will
  be deducted in the next step.
- Teleport your tokens following the instructions you will find [here](learn-teleport).

Teleporting **to** a Ledger account from a non-Ledger account doesn't require these extra steps.

## Support

If you need support please send an email to [support@kusama.network](mailto:support@kusama.network)
or visit [our Support page](https://support.polkadot.network).

[ledger]: https://www.ledger.com/
[apps]:
  https://cloudflare-ipfs.com/ipns/dotapps.io/?rpc=wss%3A%2F%2Fkusama-statemine-rpc.paritytech.net#/explorer
[prerelease instructions]: https://github.com/Zondax/ledger-statemine
[releases page]: https://github.com/Zondax/ledger-statemine/releases
