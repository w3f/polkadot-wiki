---
title: How to Store Your Mnemonic Phrase & Backup Safely
description: "This article will teach you the best practices to keep your Polkadot mnemonic phrase, JSON backup file, and private keys safe and secure."
---

!!!info "Related concepts"
    For the underlying concepts, see [Accounts](../learn-accounts.md).

If you ever lose access to your account, the only ways to restore it are your mnemonic phrase or your account's JSON backup file in combination with a password. You must keep them secure and private to ensure you can access your account anytime, and nobody else can.

!!! danger "READ THIS FIRST!"

    **Do not share your mnemonic phrase, backup file, raw seed, or password with anyone!** No official representative will ever ask you for this information or suggest you enter it on a third-party website. Learn more about [protecting yourself from scams](../../general/scams.md).


### Storing your mnemonic phrase

The mnemonic phrase is the key to your account. If you lose access to your account (for example, you forget the password), you can always [restore it with the mnemonic phrase](restore-account-signer.md). Each mnemonic phrase generates a unique account, so you cannot change it, unlike the password. It gives full access to your account to anyone who has it, so you need to keep it secret and safe. The mnemonic phrase is shown to you once when [creating an account](create-polkadot-account.md). The [wallets we support](where-to-store-dot.md) and most of the wallets in the ecosystem use 12-word mnemonic phrases. However, some wallets, like the Ledger hardware wallet, use 24 words.

  * Write your mnemonic phrase down on paper.
  * Make sure to write all 12 or 24 words in the correct order. The same words in a different order won't restore your account.
  * We recommend having several copies of the mnemonic phrase in separate locations: for example, one in your home safe and one in a safety deposit box at your bank.
  * To protect your mnemonic phrase from physical damage, you can store it in a sealed plastic bag to prevent water damage, in a fireproof safe, etched in metal, etc.
 * Do **not** store your mnemonic phrase on any electronic device. Do not store it on a USB drive, on your computer, on your phone, or in the cloud. Do **not** take screenshots or send it to yourself via email or messenger.

!!! warning "ATTENTION"

    **Your password does not protect your mnemonic phrase!**  It is only used to encrypt your account locally on your device. The mnemonic phrase alone can give full access to your account, which is why you can use your mnemonic phrase to restore the account if you forget your password. As a result, an attacker doesn’t need to know your password to compromise your account, just your mnemonic phrase.

* * *

### Storing your JSON backup file

JSON is a file format for storing and sharing data that uses human-readable text. Your JSON backup file is named like this: _your_account_address.json_. Unlike your mnemonic phrase, your JSON backup file is password-protected. It has all the information to restore your account, but you cannot just read it because it is encrypted for safety. To restore your account with the JSON backup file, you must have both the file and the password to decrypt it. If you don't have a backup file yet, you can create it for your account or all of them at once:

[How to export your JSON backup file](export-json-backup.md)

  * You can save your JSON backup file on any electronic medium. It's safer to store it on a USB drive than on a device connected to the internet.
  * You can make several copies of the backup file and store them on different devices in case one of them gets damaged.
  * Your backup file is only as secure as the password you used to encrypt it. The recommended way to create passwords is with a dedicated password manager app. It can create random, unique passwords and store them securely.
  * Otherwise, you can use a password of random four to five words. These are nearly impossible for computers to guess due to the number of combinations possible but are much easier for humans to remember.
  * Do **not** reuse your password for any websites or apps.
  * Do **not** store your password in the same place as your backup file.

* * *

### Storing your raw seed

Raw seed is a hexadecimal number derived from the mnemonic phrase. It can also be called a private key. Most of the wallets in the ecosystem provide a mnemonic phrase instead of a raw seed. However, if you created your Polkadot account in an older wallet or the [vanity generator](create-vanity-address.md), you may have a raw seed and no mnemonic phrase. To [restore your account from the raw seed](import-private-key.md), you'll need to use the Polkadot-JS UI web wallet instead of the Polkadot browser extension.

Like the mnemonic phrase, your raw seed gives full access to the account to anyone who knows it. **It is**  **not password-protected**.

  * Save your raw seed in a temporary text document and print it using a non-public printer.

  * We recommend having several copies of the printed raw seed in separate locations and protecting them from physical damage.
  * Make sure to permanently delete the text document with your raw seed after you print it.
  * **Do not store your raw seed online or on any electronic device.**
  * When restoring your account with the raw seed, double-check it after entering it to avoid any mistakes or typos.
  * We recommend having a secondary backup option, like [exporting your JSON backup file](export-json-backup.md),  whenever possible.

* * *
