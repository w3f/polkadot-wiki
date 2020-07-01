---
id: kusama-ledger
title: Using Ledger Devices
sidebar_label: Ledger Devices
---

> WARNING: The Kusama Ledger application has not been approved by Ledger at the time of writing.
> Until the application is approved, you must either build the application yourself or download a
> pre-built binary from GitHub. The application is still considered in a development pre-release
> until an official release happens on the Ledger Live marketplace. Proceed with caution and use a
> spare development Ledger device if available.

Kusama has a [Ledger][] application that is compatible with the Ledger Nano S and Ledger Nano X
devices. The Ledger devices are hardware wallets that keep your secret secured on a physical device
that does not get exposed to your computer or the internet. It is strongly recommended to use a
hardware wallet if you are managing a significant amount of funds.

The Kusama application allows your to manage Kusama's native asset, the KSM. It supports all of the
available transaction types of the network.

## Requirements

This is a list of what you will need before starting:

- A Ledger Nano S or a Ledger Nano X.
- The latest firmware installed. At the time of writing this was 1.6.
- Ledger Live is installed.
- A web browser is installed that you can use to access [Polkadot-JS Apps][].

## Installing the Ledger Application

### Using Ledger Live

> NOTE: If you are reading this notice the Kusama application has not been approved for Ledger Live
> yet. If you would like to proceed with the pre-release installation please follow the "Using the
> Developer Release" instruction below. Otherwise hold tight, the application should be approved
> soon!

- Open the Manager in Ledger Live.
- Connect and unlock your Ledger device.
- If asked, allow the manager on your device by pressing the right button.
- Find Kusama in the app catalog.
- Click the Install button of the app.
- An installation window appears.
- Your device will display Processing…
- The app installation is confirmed.

### Using the Developer Release

> NOTE: These instructions are for pre-release only. They will be replaced by the instructions for
> downloading the applicaton directly from Ledger Live when it becomes available.

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
firmware (1.6 at the time of writing). If everything is prepared, then type `install_app.sh load`
and accept the prompts on your Ledger device to install the application.

First it will prompt you to allow an unsafe manager. Navigate all the way to the left and click both
buttons to allow the unsafe manager to install the kusama app.

After some processing time, the screen of your device will update to say "Install app Kusama".
Again, navigate all the way to the right, verify the Identifier hash matches the one that is printed
in your terminal. Click both buttons on "Perform Installation" to install the application. It will
ask again for your Pin code and you should enter it in the device.

At the end of the process you should the newly installed Kusama application on the device. Great
job!

## Using on Polkadot-JS Apps

### Loading Your Account

[Polkadot-JS Apps][] already has an integration with the Ledger application so that your device will
work with the browser interface after installation. The functionality is currently gated behind a
feature setting that you will need to turn on.

In order to turn on the interoperability with the Kusama Ledger application, go to the "Settings"
tab in Polkadot-JS Apps. Find the option for attachting Ledger devices and switch the option from
the default "Do not attach Ledger devices" to "Attach Ledger via WebUSB".

![](assets/ledger.png)

Click "Save" to keep your settings.

Now when you go to the "Accounts" tab you will see a new button that says "Query Ledger". Ensure
that your Ledger device is unlocked and you have navigated into the Kusama application, then click
this button.

![](assets/ledger-2.png)

You will not get any feedback from the web page, but if all went fine you should be able to scroll
down and find a new account on the page named "Ledger". Under the type column, the account will also
show "ledger".

![](assets/ledger-3.png)

You can now use this account to interact with Kusama on Polkadot-JS Apps and it will prompt your
ledger for confirmation when you initiate a transaction.

### Confirming the Address on your Device

On the "Accounts" tab, find your Ledger-connected account (the one called "Ledger"). Click on the
three vertical dots at the left of the row. This will open a new menu, here you can click the "Show
address on hardware device" option to display the address on your device.

![](assets/ledger-4.png)

Here you can scroll through and make sure the address matches to what is displayed on Polkadot-JS
Apps.

### Checking Balance of Your Account

There are a couple methods to check the balance of your account. You can use Polkadot-JS Apps or you
can use a block explorer like Polkascan.

#### Using Polkadot-JS Apps

Once you have your account loaded on the "Accounts" tab it should show a row with your Ledger
account. At the far right of the row is located your account's KSM balances. If you click the menu
open it will show details of your balance such as locks or reserve amounts.

### Using a Block Explorer

You can also use a block explorer such as [Polkascan][] or [Subscan][] to check the KSM balance of
your account. On these block explorers you can search for you account in the search box and click on
it to reveal the details. It will show your KSM balance as well as details about your bonded or
locked amounts.

### Sending a Transaction

If you would like to send a transaction from your account housed on the Ledger device, the easiest
method is to use Polkadot-JS Apps.

- Click on the "Transfer" button on the left navigation menu.
- In the top input, select "Ledger" as your sending account.
- In the second input, select the account that you want to transfer funds to.
- In the third input, enter the amount of KSM you want to transfer.
- Click the "Make Transfer" button.
- Confirm the transaction on your device.
- A green success notification will be displayed when the transaction is included in a block.

## Support

If you need support please send an email to [support@kusama.network](mailto:support@kusama.network).

[ledger]: https://www.ledger.com/
[polkadot-js apps]: https://polkadot.js.org/apps
[prerelease instructions]: https://github.com/Zondax/ledger-kusama#download-and-install
[releases page]: https://github.com/Zondax/ledger-kusama/releases
[polkascan]: https://polkascan.io/kusama
[subscan]: https://kusama.subscan.io/
