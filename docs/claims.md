---
id: claims
title: Polkadot Claims
sidebar_label: Claims
---


Polkadot is a sharded protocol that enables blockchain networks to operate together seamlessly.

If you hold the DOT indicator token, you are entitled to claim an equivalent amount of DOT on the Polkadot network.

You can claim DOTs by signing a message with the Ethereum account that holds your DOT indicator tokens.

## Step 1. Create a Polkadot account

You will need to generate a Polkadot account to claim DOT. There are a few ways you can create one.

For most users, we recommend using the [Polkadot UI](https://polkadot.js.org/apps/#/explorer) since it will allow you to store your encrypted keystore locally.

Another option you may consider using is the `subkey` command line utility, which will allow you to take extra steps to protect the security of your key. Additionally, another option is the Polkawallet mobile wallet, although it requires an extra step to generate Polkadot addresses.

### Using polkadot{.js} extension (Chrome/Brave or Firefox)

1. Install the polkadot{.js} extension from the [Chrome store](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en) or [Firefox store](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/).
1. Create a new account by clicking on `I want to create a new account with a new seed`.
1. Copy the seed phrase and store it somewhere safe. Don't share the seed phrase with anyone, you can use it to access your account if you forget your password or want to import your account again.
1. Enter a name for the account and type a strong password (at least 6 characters).
1. Click on `Add the account with the generated seed`.
1. You can copy the account's address to the clipboard by clicking on its identicon.

### Using `subkey`

#### Installation

You can install `subkey` with this one-line command:

```
cargo install --force --git https://github.com/paritytech/substrate subkey
```

Note that you will already have had to install the proper Rust version and dependencies.  If you have not done so, or experience problems installing using that command, run the following commands first, and then re-try the previous command:

```
curl https://sh.rustup.rs -sSf | sh

rustup update nightly
rustup target add wasm32-unknown-unknown --toolchain nightly
rustup update stable
cargo install --git https://github.com/alexcrichton/wasm-gc
```

Alternatively, you can build `subkey` from the source code.

1. Follow the build instructions for [Substrate](https://substrate.dev/docs/en/overview/getting-started/#substrate).
2. When building, only build `subkey` by typing `cargo build -p subkey`.
3. The executable is `./target/debug/subkey`.

#### Usage

You can use subkey on a computer that is not connected to the Internet for added security.

The command `subkey --network polkadot generate` will generate a new key-pair. If you want to be more secure, use 24 words, `subkey --network polkadot generate --words 24`.

```
$ subkey --network polkadot generate
Secret phrase `strong account nose debris chronic picture sting sphere device common couple grab` is account:
  Secret seed:      0x245d3640042035207a0502bd3d1cd3d7702d43c6aa5ba17384c1cd6fe94c56f6
  Public key (hex): 0xc4760a73e91584faa67074a63d6723ca2e820161ab167ffca5249540a3cc1f70
  Account ID:       0xc4760a73e91584faa67074a63d6723ca2e820161ab167ffca5249540a3cc1f70
  SS58 Address:     15SbT9fu2me2zGzfBh3Brj3YhTzNyxHx97QtNwwvXWh8rGLY
```

The `Address (SS58)` field is what you should use to claim your DOT tokens. Never share your `Secret phrase` or `Secret seed`, as these can both control your funds.

NOTE: Previous versions of `subkey` only generated Substrate addresses. If you do not want to generate a new seed, you can convert the Substrate address to a Polkadot address by following [this section](#Polkadot-from-Substrate-address).

See the [`subkey` documentation](https://substrate.dev/docs/en/ecosystem/subkey) or enter `subkey --help` for more usage examples.

### Using Polkadot UI

1. Open up the [Polkadot UI](https://polkadot.js.org/apps) and navigate to the `Settings` tab. Find the configuration dropdown for `address network prefix` and select `Polkadot (mainnet)`. Click `Save and reload`.

1. Navigate to the [Polkadot UI Accounts page](https://polkadot.js.org/apps/#/accounts) and click on the `Add account` button.

<img src="/img/claim/polkadotui-find-the-accounts-page.jpg" width=50% />

2. Enter a name for your account and create a secure password. This password will be used to decrypt your account.

<img src="/img/claim/polkadotui_claim_create_account.jpg" width=50% />

3. Ignore the advanced options unless you want to change the type of cryptography used for your keys (we recommend "Schnorrkel (sr25519)").

4. Click `Save` and `Create and backup account`.

5. Save your encrypted keystore locally.

6. The account now appears in your Accounts page and is backed up to the keystore you just saved.

7. Click on the DOT identicon to copy the address to the clipboard.
<img src="/img/claim/polkadotui_claim_copy_address.jpg" width=50% />

### Using Polkawallet

1. Install [Polkawallet](https://polkawallet.io). Click `Download` and select the link corresponding to the platform you are using. On Android you may need to allow installing apps from external sources. On iOS, you may need to "trust" Polkawallet in the `General > Profiles & Device Management > Enterprise App` section before running the app.

2. Once the app is open, copy the seed phrase and store it in a safe place. Don't share the seed phrase with anyone, you can use it to access your account if you forget your password or otherwise lose your keystore.

_TODO_UPDATE_IMG_

3. Name your account and make a strong password, make sure to write it down in another place, then click `Save`.

4. You will be asked to confirm your seed phrase - this is to make sure you have copied it somewhere safe.

5. Click on the pink QR Code symbol and select `Copy address` to copy your address to clipboard.

_TODO_UPDATE_IMG_

6. [Get the Polkadot address from the Substrate address.](#polkadot-from-substrate-address)

### Polkadot from Substrate address

If you used one of the generation methods that gave you a generic Substrate address (begins with a `5`), then you will need to take an extra step to turn this into the properly encoded Polkadot address.

1. Copy your Substrate generic address to the clipboard.
2. Go to the [Polkadot UI](https://polkadot.js.org/apps).
3. Go to the `Settings` tab and find the configuration for `address network prefix`.
4. Select `Substrate (generic)` and click `Save and reload`.
5. Go to the `Accounts` page, select the `My contracts` tab and click `Add contact`.
6. Enter your address and give it a name like "My Address".
7. Go back to the `Settings` tab and select the `Polkadot (mainnet)` option in `address network prefix` and click `Save and reload`.
8. Go back to the `My contracts` and find the account you just added (it will have the same name).
9. The address is now formatted as a Polkadot address.

## Step 2. Get DOT tokens

Those who participated in the Polkadot sales and have been allocated DOT indicator tokens can claim the equivalent amount of DOTs on the Polkadot Network.

To do this you must sign a message containing the address of your Polkadot account. You can do this by using the Polkadot UI [Claims app](https://polkadot.js.org/apps/#/claims).

#### Generate a Polkadot address

If you haven't already done so, you will need to generate a Polkadot address. See further up this page for detailed instructions first!

#### Claiming your DOT with MyCrypto

The Polkadot JS [Claims app](https://polkadot.js.org/apps/#/claims) helps you sign a message from MyCrypto. MyCrypto is good to use in case you have stored the key to the Ethereum account holding your DOT indicator tokens on a hardware device like a Ledger Nano S or a Trezor. It also supports raw private keys, mnemonics and the Parity signer. 

**NOTICE**: It is much more secure to download and use the MyCrypto app locally. Please make sure to download the latest version for your operating system. You can always find the most up-to-date releases of the desktop app on their [releases page](https://github.com/MyCryptoHQ/MyCrypto/releases).

Once you've downloaded MyCrypto and have it running locally (we recommend an air-gapped computer for maximum security), you can start by navigating to the Claims app on the Polkadot JS UI. Select the account you would like to claim the DOTs into and click the blue "Continue" button to proceed. Your screen should look something like this:

_TODO_UPDATE_IMG_

The hex encoded string that follows the sentence: "Pay DOTs to the Polkadot account:" is the hex-encoded public key of your Polkadot account, minus the `0x` prefix. To verify that the public key is correct you can use the `subkey` tool to inspect your address.

The next step is to go to the MyCrypto application and click on "Sign & Verify Message" tab. This will prompt you to select a method for unlocking your wallet. After unlocking your wallet, you will copy and paste the outputted sentence into the input box. 

_TODO_UPDATE_IMG_

When you click "Sign Message" you will get a JSON output like the below:

_TODO_UPDATE_IMG_

Copy and paste the JSON output of the signed message from MyCrypto into the input box on the Polkadot JS UI and click "Confirm Claim."

_TODO_UPDATE_IMG_

At this point you will see a success message if everything went right and your DOTs will now be in the account that you claimed to. Congratulations you can now participate in aspects of the Polkadot network such as [governance](learn-governance) and [staking](learn-staking). During the soft launch period balance transfers will not be enabled.

_TODO_UPDATE_IMG_

#### Verifying your Claim

After you make an on-chain claim for DOTs, your balance should be updated on the Polkadot UI immediately.

Having trouble? Get support in the DOT [Claims Support](https://riot.im/app/#/room/!kwIkVteRpPRjjTyvTe:web3.foundation?via=web3.foundation&via=matrix.org&via=matrix.parity.io) channel.

### Third Party Claims Processes


_COINBASE_TO_DO

**We do not recommend using a third-party app or process to perform your claim or acquire DOT**

Claiming using a third-party process can lead to the loss of your allocation, therefore we cannot recommend using any third party apps to do so. Manually specifying your transaction data, as specified in our claims process, is the only way to be certain you will receive your allocation. 
