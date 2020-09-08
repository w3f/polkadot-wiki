---
id: learn-ledger
title: Using the Polkadot Ledger Application
sidebar_label: Ledger Application
---

The Polkadot [Ledger][] application is compatible with both the Ledger Nano S and the Ledger Nano X
devices. Ledger devices are hardware wallets that keep your secret secured on a physical device that
does not expose it to your computer or the internet. It is strongly recommend to use a hardware
wallet if you are managing a significant amount of funds.

The Polkadot application allows you to manage Polkadot's native token, the DOT. It supports most of
the transaction types of the network (a notable exception is the "Batch" transaction from the Utilty
pallet).

## Requirements

Here is a list of what you will need before starting:

- A Ledger Nano S or a Ledger Nano X.
- The latest firmware installed (at the time of writing this is 1.6).
- Ledger Live is installed.
- A web browser is installed that you can use to access [Polkadot-JS Apps][].

## Installing the Ledger Application

### Using Ledger Live

- Open the "Manager" tab in Ledger Live.
- Connect and unlock your Ledger device.
- If asked, allow the manager on your device by pressing the right button.
- Find Polkadot in the app catalog.
- Click the "Install" button of the app.
- An installation window appears.
- Your device will display "Processing…"
- The app installation is confirmed.

Please proceed to the [usage instructions](#using-on-polkadot-js-apps) below.

### Using the Developer Release

> NOTE: These instructions are for development installation only. It is recommended to install the
> application from Ledger Live unless you _know exactly what you're doing_.

Instructions for downloading the prerelease binary from the GitHub releases is written [on the
README][prerelease instructions] for the Polkadot Ledger application GitHub repository.

On the [releases page][] you can download the shell script `install_app.sh` and then make it
executable in your shell by typing the command `chmod +x install_app.sh`.

Using `install_app.sh` help command will show you the available options:

```zsh
$ ./install_app.sh --help
Zondax Installer [Polkadot-1.2011.1] [Warning: use only for test/demo apps]
  load    - Load Polkadot app
  delete  - Delete Polkadot app
  version - Show Polkadot app version
```

Next, you must make sure your Ledger device is plugged in and unlocked and you're using the latest
firmware (1.6 at the time of writing). If everything is prepared, then type `./install_app.sh load`
and accept the prompts on your Ledger device to install the application.

First it will prompt you to allow an unsafe manager. Navigate all the way to the left and click both
buttons to allow the unsafe manager to install the Polkadot app.

After some processing time, the screen of your device will update to say "Install app Polkadot".
Again, navigate all the way to the right, verify the Identifier hash matches the one that is printed
in your terminal. Click both buttons on "Perform Installation" to install the application. It will
ask again for your Pin code and you should enter it in the device.

At the end of the process you should have the newly installed Polkadot application on the device.

## Using on Polkadot-JS Apps

### Loading Your Account

[Polkadot-JS Apps][] already has an integration with the Ledger application so that your device will
work with the browser interface after installation. The functionality is currently gated behind a
feature setting that you will need to turn on.

In order to turn on the interoperability with the Polkadot Ledger application, go to the "Settings"
tab in Polkadot-JS Apps. Find the option for attaching Ledger devices and switch the option from the
default "Do not attach Ledger devices" to "Attach Ledger via WebUSB".

![](assets/ledger.png)

Click "Save" to keep your settings.

Now when you go to the "Accounts" tab you will see a new button that says "Query Ledger". Ensure
that your Ledger device is unlocked and you have navigated into the Polkadot application, then click
this button.

![](assets/ledger-2.png)

You will not get any feedback from the web page, but if all went well you should be able to scroll
down and find a new account on the page named "Ledger". Under the type column, the account will also
show "ledger".

![](assets/ledger-3.png)

You can now use this account to interact with Polkadot on Polkadot-JS Apps and it will prompt your
ledger for confirmation when you initiate a transaction.

### Confirming the Address on your Device

On the "Accounts" tab, find your Ledger-connected account (the one called "Ledger"). Click on the
three vertical dots at the end of the row. This will open a new menu, here you can click the "Show
address on hardware device" option to display the address on your device.

![](assets/ledger-4.png)

Here you can scroll through and make sure the address matches to what is displayed on Polkadot-JS
Apps.

### Checking Balance of Your Account

There are a few methods to check the balance of your account. You can use Polkadot-JS Apps or you
can use a block explorer like [Polkascan][].

#### Using Polkadot-JS Apps

Once you have your account loaded on the "Accounts" tab it should show a row with your Ledger
account. At the far right of the row is located your account's DOT balance. If you click the menu
open it will show details of your balance such as locks or reserve amounts.

### Using a Block Explorer

You can also use a block explorer such as [Polkascan][] or [Subscan][] to check the DOT balance of
your account. On these block explorers you can search for you account in the search box and click on
it to reveal the details. It will show your DOT balance as well as details about your bonded or
locked amounts.

### Sending a Transfer

Instructions to send a transfer can be found on the
[balance transfer page](learn-balance-transfers).

### Receiving a Transfer

In order to receive a transfer on the account that is stored on your Ledger device, you will need to
provide the sender (i.e. the payer) your address. You can copy your address to the clipboard after
loading your device on Polkadot-JS Apps by clicking the account icon or by highlighting the address
and pressing ctrl-c (command-c on Apple keyboards). Then you will provide your address to the payer
so they can send a transfer.

### Staking

Since Ledger does not support batch transactions, you must do two separate transactions when you
want to stake using an account stored on a Ledger device.

- Go to the "Staking" tab found under the "Network" dropdown in the top navigation menu.
- Click the "Account Actions" pane in the inner navigation.
- Click "+ Stash" instead of "+ Nominator" or "+ Validator" (selecting the latter two will not
  work).
- Input the amount of tokens to bond and confirm the transaction.
- When the transaction is include you will see the newly bonded account in the "Account Actions"
  page.
- Select "Start Nominating" or "Start Validating" to start nominating or validating.

## Support

If you need support please send an email to
[support@polkadot.network](mailto:support@polkadot.network).

[ledger]: https://www.ledger.com/
[polkadot-js apps]: https://polkadot.js.org/apps
[prerelease instructions]: https://github.com/Zondax/ledger-polkadot#download-and-install
[releases page]: https://github.com/Zondax/ledger-polkadot/releases
[polkascan]: https://polkascan.io/polkadot
[subscan]: https://polkadot.subscan.io/
