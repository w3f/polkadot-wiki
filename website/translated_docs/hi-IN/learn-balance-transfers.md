---
id: learn-balance-transfers
title: Balance Transfers
sidebar_label: How to transfer Balances
---

Balance transfers are used to send balance from one account to another account. To start transferring balances, we will begin by using [Polkadot-JS Apps][]. This guide assumes that you've already [created an account](learn-account-generation) and have some funds that will be transferred.

## Polkadot-JS Apps

> NOTE: In this walkthrough we will be using the Polkadot network. If you would like to switch to Kusama or a different network, you can change it by clicking the top left navigation dropdown and selecting a different network.

Let's begin by opening [Polkadot-JS Apps][]. There are two ways to make a balance transfer:

1. By using the "Transfer" tab in the "Accounts" dropdown (located on the top navigational menu).
2. Clicking the "send" button while in the "Accounts" page.

### Using the Transfer Tab

Click on the "Transfer" tab in the "Accounts" dropdown.

![transfer](assets/transfer-1.png)

Now a modal window will appear on the page. The modal asks you to enter 3 inputs:

- "send from account": Your account with funds that you will send from.
- "send to address": The address of the account that will receive the funds.
- "amount": The amount of tokens you will transfer.

The "existential deposit" box shows you the minimum amount of funds you must keep in the account for it to remain active. See the [existential deposit][] section for more information.

![transfer](assets/transfer-2.png)

After setting your inputs correctly, click the "Make Transfer" button and confirm. Once the transfer is included in a block you will see a green notification in the top-right corner of your screen.

### Keep-Alive Checks

At an [extrinsic](glossary#extrinsic) level, there are two main ways to transfer funds from one account to another. These are `transfer` and `transfer_keep_alive`. `transfer` will allow you to send DOTs regardless of the consequence; `transfer_keep_alive` will not allow you to send an amount that would allow the sending account to be removed due to it going below the existential deposit.

By default, Polkadot-JS Apps will use `transfer_keep_alive`, ensuring that the account you send from cannot drop below the existential deposit (1 DOT or 0.001666 KSM). However, it may be that you do not want to keep this account alive (for example, because you are moving all of your funds to a different address). In this case, click on the "keep-alive" toggle at the bottom of the modal window. The label should switch from "Transfer with account keep-alive checks"(`transfer_keep_alive` will be used) to "Normal transfer without keep-alive checks" (`transfer` extrinsic will be used). As a common use case for using normal transfers is to entirely clear out the account, a second toggle will appear if you have the keep-alive check turned off that will send all the tokens in the account, minus a transaction fee, to the destination address.

Note that attempting to send less than the existential deposit to an account with 0 DOT will always fail, no matter if the keep-alive check is on or not. For instance, attempting to transfer 0.1 DOT to an account you just generated (and thus has no DOT) will fail, since 0.1 is less than the existential deposit of 1 DOT and the account cannot be initialized with such a low balance.

Note that even if the transfer fails due to a keep-alive check, the transaction fee will be deducted from the sending account if you attempt to transfer.

### From the Accounts Page

Navigate to the "Accounts" page by selecting the "Accounts" tab from the "Accounts" dropdown located on the top navigational menu of Polkadot-JS Apps.

You will see a list of accounts you have loaded. Click the "Send" button in the row for the account you will like to send funds from.

![transfer](assets/transfer-3.png)

Now you will see the same modal window as if using the "Transfer" tab. Fill in the inputs correctly and hit "Make Transfer" then confirm the balance transfer. You will see a green notification in the top-right corner of the screen when the transfer is included in a block.

[Polkadot-JS Apps]: https://polkadot.js.org/apps
[existential deposit]: build-protocol-info#existential-deposit
