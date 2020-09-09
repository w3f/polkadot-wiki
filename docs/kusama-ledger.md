---
id: kusama-ledger
title: Using Ledger Devices
sidebar_label: Ledger Devices
---

Kusama has a [Ledger][] application that is compatible with the Ledger Nano S and Ledger Nano X
devices. The Ledger devices are hardware wallets that keep your private key secured on a physical
device that does not get directly exposed to your computer or the internet. It is strongly
recommended to use a hardware wallet if you are managing a significant amount of funds.

The Kusama application allows you to manage Kusama's native asset, the KSM. It supports most of the
available transaction types of the network (a notable exception is the "Batch" transaction from the
Utility pallet).

## Requirements

Here is a list of what you will need before starting:

- A Ledger Nano S or a Ledger Nano X.
- The latest firmware installed (at the time of writing this is 1.6.1).
- Ledger Live is installed and at version 2.1 or newer (see settings -> about to find out if you're
  up to date).
- A web browser is installed that you can use to access [Polkadot-JS Apps][].

## Installing the Ledger Application

### Using Ledger Live

- Open the "Manager" tab in Ledger Live.
- Connect and unlock your Ledger device.
- If asked, allow the manager on your device by pressing both buttons on the YES screen.
- Find Kusama in the app catalog and install it.
  ![The Kusama App in the Ledger Manager](assets/ledger/manager-app-kusama.png)

Please proceed to the [usage instructions](#using-on-polkadot-js-apps) below.

### Using the Developer Release

> NOTE: These instructions are for development installation only. It is recommended to install the
> application from Ledger Live unless you _know exactly what you're doing_.

Instructions for downloading the prerelease binary from the GitHub releases is written [on the
README][prerelease instructions] for the Kusama Ledger application GitHub repository.

On the [releases page][] you can download the shell script `install_app.sh` and then make it
executable in your shell by typing the command `chmod +x install_app.sh`.

Using `install_app.sh` help command will show you the available options:

```zsh
$ ./install_app.sh --help
Zondax Installer [Kusama-1.2011.1] [Warning: use only for test/demo apps]
  load    - Load Kusama app
  delete  - Delete Kusama app
  version - Show Kusama app version
```

Next, you must make sure your Ledger device is plugged in and unlocked and you're using the latest
firmware (1.6.1 at the time of writing). If everything is prepared, then type
`./install_app.sh load` and accept the prompts on your Ledger device to install the application.

First it will prompt you to allow an unsafe manager - confirm this by switching the screen to the
allow screen and pressing the corresponding buttons.

After some processing time, the screen of your device will update to say "Install app Kusama".
Navigate all the way to the right, verify the Identifier hash matches the one that is printed in
your terminal. Click both buttons on "Perform Installation" to install the application. It will ask
again for your Pin code and you should enter it in the device.

At the end of the process you should have the newly installed Kusama application on the device.

## Using on Polkadot-JS Apps

### Loading Your Account

[Polkadot-JS Apps][] already has an integration with the Ledger application so that your device will
work with the browser interface after installation. The functionality is currently gated behind a
feature setting that you will need to turn on.

In order to turn on the interoperability with the Polkadot Ledger application, go to the "Settings"
tab in Polkadot-JS Apps. Find the option for attaching Ledger devices and switch the option from the
default "Do not attach Ledger devices" to "Attach Ledger via WebUSB".

![Dropdown selector for allowing Ledger connections in PolkadotJS Settings](assets/ledger.png)

Click "Save" to keep your settings.

Now when you go to the "Accounts" tab you will see a new button that says "Query Ledger". Ensure
that your Ledger device is unlocked and you have navigated into the Polkadot application, then click
this button.

![Query Ledger button in PolkadotJS](assets/ledger/query-ledger.png)

Depending on your browser and its security settings, you might need to confirm the USB connection
through a popup like the one below:

![Display of the Ledger account in the Accounts list of PolkadotJS](assets/ledger/query-device.png)

You should be able to scroll down and find a new account on the page named "Ledger". Under the type
column, the account will also show "ledger".

![Confirm device connection popup](assets/ledger/ledger-balance.png)

You can now use this account to interact with Polkadot on Polkadot-JS Apps and it will prompt your
ledger for confirmation when you initiate a transaction.

### Confirming the Address on your Device

On the "Accounts" tab, find your Ledger-connected account (the one called "Ledger"). Click on the
three vertical dots at the end of the row. This will open a new menu, here you can click the "Show
address on hardware device" option to display the address on your device.

![Options menu of an account in the Accounts screen of PolkadotJS](assets/ledger-4.png)

Here you can scroll through and make sure the address matches to what is displayed on Polkadot-JS
Apps.

### Checking the Balance of Your Account

There are a few methods to check the balance of your account. You can use Polkadot-JS Apps or you
can use a block explorer like [Polkascan][].

#### Using Polkadot-JS Apps

Once you have your account loaded on the "Accounts" tab it should show a row with your Ledger
account. At the far right of the row is located your account's DOT balance. If you expand the
balance arrow, it will show details of your balance such as locks or reserved amounts.

![Account row showing empty balance](assets/ledger/ledger-balance.png)

#### Using a Block Explorer

You can also use a block explorer such as [Polkascan][] or [Subscan][] to check the DOT balance of
your account. On these block explorers you can search for your account in the search box and click
on it to reveal the details. It will show your DOT balance as well as details about your bonded or
locked amounts.

### Sending a Transfer

If you would like to send a transfer from your account housed on the Ledger device, the easiest
method is to use [Polkadot-JS Apps][].

- Click on the "Transfer" button in "Accounts" dropdown in the top navigation menu.
- In the top input, select "Ledger" as your sending account.
- In the second input, select the account that you want to transfer funds to.
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

### Receiving a Transfer

In order to receive a transfer on the account that is stored on your Ledger device, you will need to
provide the sender (i.e. the payer) with your address.

The easiest way to get your address is to click on the account name (Ledger) which will open a
sidebar. Your address will be shown in this sidebar, along with some other information. Another
method is just clicking on your account's avatar icon - this immediately copies your address to the
clipboard.

> **Warning**: before giving anyone your address, make sure it matches what's really on the Ledger
> by [confirming the address on your device](#confirming-the-address-on-your-device). Some malware
> will intercept clicks and clipboard requests and can change your copied value in-flight, so being
> extra vigilant around copy-paste operations makes sense.

## Support

If you need support please send an email to [support@kusama.network](mailto:support@kusama.network)
or visit [our Support page](https://support.polkadot.network).

[ledger]: https://www.ledger.com/
[polkadot-js apps]: https://polkadot.js.org/apps
[prerelease instructions]: https://github.com/Zondax/ledger-kusama#download-and-install
[releases page]: https://github.com/Zondax/ledger-kusama/releases
[polkascan]: https://polkascan.io/kusama
[subscan]: https://kusama.subscan.io/
