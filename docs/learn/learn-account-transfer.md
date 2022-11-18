---
id: learn-account-transfer
title: Transfer of Polkadot-JS Accounts between Computers
sidebar_label: Account Transfer
description: Steps on transferring Accounts between computers.
keywords: [account, account transfer, polkadot account, polkadotjs]
slug: ../learn-account-transfer
---

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
