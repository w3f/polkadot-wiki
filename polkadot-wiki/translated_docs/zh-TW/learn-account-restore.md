---
id: learn-account-restore
title: Backing up and Restoring Accounts
sidebar_label: Backing up and Restoring Accounts
description: Step-by-step guides on backing up and restoring a Polkadot account.
---

Depending on what software you are using to access your account, there are various ways to back up and restore your account. It is a good idea to back your information up and keep it in a secure place.. Note that in order to recover an account, you should create your account according to the instructions [here](learn-account-generation). In general, however, as long as you know how you created your account, and have the seed phrase (mnemonic phrase) or JSON file (and password) stored securely, you will be able to restore your account.

This page covers backing up and restoring accounts in Polkadot{.js} Browser Plugin, Polkadot-JS UI, and Parity Signer. For other wallet applications, please see their specific documentation.

## Polkadot{.js} Browser Plugin

To back up an account using the Polkadot{.js} browser plugin, open the extension and selecting the desired account to back up. Click on the three dots beside the address to open up the account options menu.

![list-accounts-plugin](assets/accounts/polkadot.js_list_accounts.png)

Click on the Export Account button, which will then ask you for the password for that specific account. Once you enter the correct password, the browser will automatically download a `.json` file that will hold all the account restoration details that will be used when you restore your account. You should store this file securely. Note that you will need the password for this account to restore it.

![enter-password-plugin](assets/accounts/polkadot.js_enter_password.png)

To restore the account from this JSON file, once again open the Polkadot{.js} browser plugin. Click on the + button at the top. This will open up a menu wih several choices - select "Restore account from backup JSON file". The program then prompt you for the `.json` file which was download earlier and the password for that account.

![restore-account-plugin](assets/accounts/polkadot.js_restore_account.png)

Once these are filled out, and the "Restore" button has been pressed, you'll be taken back to the main page of the plugin. This account will now be listed with the rest of your accounts.

## Polkadot-JS

If you're using the main Polkadot-JS UI, restoring an account will feel similar to restoring an account on Polkadot-JS browser plugin. Navigate to the [Accounts page](https://polkadot.js.org/apps/#/accounts) of Polkadot-JS.

![click-account-restore-polkadot](assets/accounts/polkadot_click_restore.png)

Click on the "Restore JSON" button, which will let you upload your `.json` file that you downloaded and enter your password for that account. This `.json` file holds all relevant data about the account to be used in account restoration. Note that you will need to enter your password here; the file cannot be unencrypted without it.

![restore-account-polkadot](assets/accounts/polkadot_restore_account.png)

After you press the "Restore" button, you should see a green notification letting you know that your account has been restored. It will now be included in your accounts list on this browser.

![restore-complete-polkadot](assets/accounts/polkadot_restore_complete.png)

### Using an Existing Mnemonic Seed to Restore an Account

You can also always restore an account by using the mnemonic phrase (seed words).

To do this with Polkadot-JS, navigate to the [Polkadot-JS Accounts Page](https://polkadot.js.org/apps/#/accounts). Click on the "Add Account" button, and enter a name and password for the account. The name and the password of this added account can be set to whatever you'd like, it does not need to be the same name and password as when this account was initilly created.

After this, delete the generated mnemonic phrase (seed words) and replace them with your _existing seed words_. When you replace the generated mnemonic seed with your existing one, you aren't actually creating a new account, rather adding that account onto the Polkadot-JS UI. Any account using the same seed words will have control over that account on-chain. This is why it is so important to keep your seed words secret and safe.

![restore-using-json](assets/accounts/polkadot-js-existing-json.png)

Finally, click the "Save" button, then click the "Create and backup account" button. This will download the `.json` file which contains the data to be used in account restoration. You can use this JSON file to restore this account in the future using the instructions above, or simply delete the file and continue to use the mnemnonic phrase to restore the account again if necessary.

## Parity Signer

If you've created an account with Parity Signer, you can recover that account with your seed words. If you generated the account with another wallet, there may be additional steps necessary, including setting the derivation path: see [this document](https://github.com/paritytech/parity-signer/blob/master/docs/tutorials/Recover-Account-Polkadotjs.md) for details.

On Parity Signer, click on the top right user icon on the screen. Proceed to "+ Add Identity". On this screen, tap on the "recover existing identity" button.

![restore-using-parity](assets/parity_Signer_restore1.PNG)

Enter in the identity name and the mnemonic seed phrase from the account you'd like to restore.

Set an identity PIN that will be used to unlock this account when you need to.

![restore-using-parity](assets/parity_Signer_restore2.PNG)

The identity has now been recovered and you can select a network to create the first account.
