---
id: learn-account-restore
title: Backing up and Restoring Accounts
sidebar_label: Backing up and Restoring Accounts
description: Steps on backing up and restoring a Polkadot account.
keywords: [account, restore account, polkadot account, polkadotjs]
slug: ../learn-account-restore
---

Depending on what software you are using to access your account, there are various ways to back up
and restore your account. It is a good idea to back your information up and keep it in a secure
place. Note that in order to recover an account, you should create your account according to the
instructions [here](learn-account-generation.md). In general, however, as long as you know how you
created your account, and have the seed phrase ([mnemonic phrase](learn-accounts#portability)) or
JSON file (and password) stored securely, you will be able to restore your account.

:::info Check the relevant support articles to learn more about restoring your account using the
[_Polkadot Extension_](https://support.polkadot.network/support/solutions/articles/65000169952-how-to-restore-your-account-in-the-polkadot-extension),
[_Polkadot-JS UI_](https://support.polkadot.network/support/solutions/articles/65000180110-how-to-restore-your-account-in-polkadot-js-ui),
and
[_Parity Signer_](https://support.polkadot.network/support/solutions/articles/65000167901-how-to-restore-an-account-in-parity-signer).

:::

## Transferring Polkadot-JS Apps Accounts/Addresses From One Computer to Another

:::caution

This will overwrite any existing accounts with the same pubkey on your new computer. This generally
should not make a difference (since it can still access the same account), but might if you have
e.g. an account which was stored externally in the extension on the old computer but was created
directly in browser on the new one.

:::

This has been tested on Brave and Chrome, but not other browsers.

1. Go to Polkadot-JS Apps
2. Go to JavaScript console on the browser (Available in Developer Tools)
3. Type in the command:

```
JSON.stringify(localStorage)
```

4. Copy and paste the returned string to a text editor and save the file.
5. Check that the string you pasted both begins and ends with a tick mark ('). If not, add one to
   the beginning and end.
6. Save and send that file with the copied string to the new computer.
7. On new computer, go to Polkadot-JS Apps
8. Open the Javascript console on the browser (Available in Developer Tools)
9. Set a variable raw equal to the string from the text file

```
raw = ... copy-pasted json from original computer ...
```

10. Run the following code on the console:

```
accounts = JSON.parse(raw);
for (var key in accounts) {
    if (accounts.hasOwnProperty(key)) {
        val = JSON.stringify(accounts[key]).replace(/\\/g,'').slice(1,-1);
        console.log(key + " -> " + val);
        localStorage.setItem(key, val);
    }
}
```

11. Refresh Polkadot-JS App browser and check Accounts and Addresses pages. All of your accounts and
    addresses should now be available.
