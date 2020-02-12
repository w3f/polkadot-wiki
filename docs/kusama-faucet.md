---
id: kusama-faucet
title: Kusama Faucet
sidebar_label: Kusama Faucet
---

In order to prevent Sybil attacks, the faucet will only drip to users that have a GitHub account that was created prior to June, 21, 2019. If you do not have a GitHub account that was created prior to this date, please use the [KSM Request Form](https://docs.google.com/forms/d/e/1FAIpQLSfGAqjXY3xLokwl7A-R4JZAnrBnSI3BVXKMKDLCKVtHaxgs-w/formResponse) to request tokens.

### Requirements:

- Github account with a creation date **before** 21 June 2019
- The address that the user requests a drip to must have never received a drip in the past
- The GitHub user requesting the drip must not have received a drip from the faucet during the past 24 hours
- The address must contain the string `ksma` (case-insensitive)

### Step 1: Generate an Address

The faucet will only drip to addresses that contain the string `ksma`(case-insensitive, that is, `KSMA` or `kSmA` would work). It will also never drip to the same address twice. Thus, a new address has to be created each time a user requests KSM tokens.

Obtaining a valid address will require generating numerous addresses until you find one which meets the requirements. You can think of this as a small proof-of-work. You can use the command-line tool [subkey](#Using-Subkey), the web interface ([PolkadotJS Dashboard](#Using-PolkadotJS-Dashboard)), or any other program capable of generating arbitrary addresses which meet the requirements of the faucet.  You can even code up your own if you like.


#### Using PolkadotJS Dashboard

1. Go to [Settings](https://polkadot.js.org/apps/#/settings) and select `Kusama (canary)` on the address network prefix drop-down list, then click `Save & Reload`.
![Faucet 1](../img/faucet_1.png)

2. Under the [Accounts page](https://polkadot.js.org/apps/#/accounts), select `Vanity Address` tab.
![Faucet 2](../img/faucet_2.png)

3. Input `ksma` in the "search for" textbox and leave the "keypair crypto type" by default unless you want to use another type.  After this, click `Start generation`. You may leave YES in the case sensitive field but switching to NO will greatly speed up the process.  It may take 10 minutes or more to generate the address pattern you want, depending on the power of your hardware.
![Faucet 3](../img/faucet_3.png)

4. After you see that a valid `ksma` address has been created, press the blue `+` button to generate an account.  Note that the case does not matter, any of the following are ok: kSmA, KSMA, ksMA, etc.

![Save Generated Account](../img/save_generated_account.png)

5. Give your account a name and password, then click "Save" to save the account.

![Create Account](../img/create_account.png)

6. Save the backup file to your local computer.

![Save Backup](../img/save_backup.png)

7. Click on the Accounts tab, or press "My Accounts" at the top of the page, and look for your newly generated account.  You can then copy the address to your clipboard by clicking on the dot icon next to the account.

![Select Address](../img/select_address.png)


#### Using subkey

#### Installation

You can install `subkey` with this one-line command:

```
cargo install --force --git https://github.com/paritytech/substrate subkey
```

Alternatively, you can build `subkey` from the source code.

1. Follow the build instructions for [Substrate](https://github.com/paritytech/substrate#6-building).
2. When building, build `subkey` by typing `cargo build -p subkey`.
3. The executable is `./target/debug/subkey`.

#### Usage

The command `subkey --network kusama vanity ksma --number 1` will generate a single key-pair where the address contains the string  `ksma`.

Depending on the hardware configuration of your computer and on luck, this computation may take anywhere from a few seconds to approximately 10 minutes.

```
$ subkey --network kusama vanity ksma --number 1
Generating key containing pattern 'ksma'
100000 keys searched; best is 190/237 complete
200000 keys searched; best is 190/237 complete
300000 keys searched; best is 190/237 complete
400000 keys searched; best is 190/237 complete
500000 keys searched; best is 233/237 complete
600000 keys searched; best is 233/237 complete
700000 keys searched; best is 233/237 complete
best: 238 == top: 237
Secret Key URI `0x8baef85b7b366ec293fbf761e24572e4e6dd7ba385cbe04bd475a70cc69a5665` is account:
  Secret seed:      0x8baef85b7b366ec293fbf761e24572e4e6dd7ba385cbe04bd475a70cc69a5665
  Public key (hex): 0x60857d605f87e6b58974e7c8e5ad814617428c6017b9ceb4c938d65db34ece3f
  Account ID:       0x60857d605f87e6b58974e7c8e5ad814617428c6017b9ceb4c938d65db34ece3f
  SS58 Address:     Eksmahpd3pYpSBWyg8DXD4e27wZcWF14AZA1evYYvvNXpgs
```

The `Address (SS58)` field is the Kusama address that you will need to request KSM to. Notice that the string `ksma` starts at the second character. Never share your `Secret Key`, as this controls your funds.

See the [`subkey` documentation](https://substrate.dev/docs/en/ecosystem/subkey) or enter `subkey --help` for more usage examples.

### Step 2: Submit an Issue

Once you have generated your Kusama address containing the string `ksma`, you are ready to request KSM from the faucet.

1. Log in to Github. Go to the [faucet repo](https://github.com/kusamanetwork/faucet/issues) of the Kusama Network organization.
2. Click on the Issues tab, then click "New Issue".
3. Enter any text for the "Title" textbox - it will be ignored.
4. In the "Leave a comment" textbox, enter the address you generated in Step 1 (which must include the string "ksma"). Do not enter any text other than this address.
5. Wait while the faucet verifies the address. Depending on network conditions and server load, this may take a few minutes, but should generally be complete within 30 seconds.
6. You will see a comment posted to your issue indicating success or failure.  Success means that 0.1 KSM has been sent to the posted address; failure means that there was some problem and no KSM was sent to your address. In the event of failure, the message should indicate what the problem is (e.g., the faucet is dry, the address is invalid).
7.  The issue will close automatically after you receive a response, whether or not it was a success.

### After

Remember that you must drip to a different address each time - you will not be able to get a drip from the faucet to this address again.  You also may have a more secure way of storing addresses such as cold wallet, or simply keep all of your KSM at one address.

Therefore, you may wish to move your KSM to a different address after this.  You should be able to move your KSM immediately after receiving them.

Note that you will not be able to transfer the entire 0.1KSM to another account, as there are transfer fees when moving KSM on-chain.  Transferring 0.080 KSM should work.

### Notes:

- A single GitHub account can get 0.1 KSM every 24 hours.
- Remember to post _only the address_ - no other text, and definitely not your seed or mnemonic phrase!
- The total number of KSM available to _all users_ of the faucet is 10 KSM per day.

### What To Do With My KSM

Owning KSM gives you a stake in the Kusama network. Among the things you can do with your KSM tokens are:

* Transfer them to another account
* Nominate validators and passively earn more KSM
* Support (second) democratic proposals to help make them into active referenda
* Vote for or against active referenda
* Vote and support one or more of your favorite council members
* Set your on-chain identity
* and way more!

### Donations:

If you want to support the faucet, please send KSM to this address: **EaG2CRhJWPb7qmdcJvy3LiWdh26Jreu9Dx6R1rXxPmYXoDk**

The faucet's wallet will be periodically refilled from the address above.

### Support:

If you are having difficulties using the faucet, please join the [Kusama Watercooler chat](https://riot.w3f.tech/#/room/#kusamawatercooler:polkadot.builders) and somebody will try to help you.
