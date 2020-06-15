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
devices.

## Installing the Ledger Application

> NOTE: These instructions are for pre-release only. They will be replaced by the instructions for
> downloading the applicaton directly from Ledger Live when it becomes available.

Instructions for downloading the prerelease binary from the GitHub releases is written [on the
README][prerelease instructions] for the Kusama Ledger application GitHub repository.

On the [releases page][] you can download the file `zxtool.sh` and then make it executable in your
shell by typing the command `chmod +x zxtool.sh`.

Next, you must make sure your Ledger device is plugged in and unlocked and you're using the latest
firmware (1.6 at the time of writing). If everything is prepared, then type `zxtool.sh load` and
accept the prompts on your Ledger device to install the application.

## Using on Polkadot-JS Apps

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

[ledger]: https://www.ledger.com/
[prerelease instructions]: https://github.com/Zondax/ledger-kusama#download-and-install
[releases page]: https://github.com/Zondax/ledger-kusama/releases
