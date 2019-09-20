---
id: maintain-guides-how-to-validate
title: How to validate
sidebar_label: How to validate
---

_This tutorial works with the current Alexander testnet and has been updated for PoC-4._

To be a good validator, you should

- Have DOTs to stake (**basic requirement**).
- Keep your node up to the latest version.
- Have enough knowledge of network security to create a secure network.

You should **NOT** run a validator if you have DOTs but do not have enough technical knowledge to set up a validator. If this is the case, you should nominate your DOTs to someone you trust.

Nominators still earn rewards. You can even nominate multiple validators. If you want to know more about nominators, please see [here](maintain-nominator).

For this tutorial, we use Ubuntu 18.04 and will be running on the PoC-4 Alexander testnet. No matter what operating system you are using, setup should not be too different. There are a lot of [VPS](#vps-list) choices out there, feel free to pick the one you like.

_Please make sure that you do **NOT** use this setup and configuration on mainnet. This guide simply walks you through step-by-step how to set up and run a validator node. If you would like to run a validator seriously when mainnet is live, you have to be REALLY careful on some areas like key management, DDoS protection, and high availability._

## Install Rust

```bash
curl https://sh.rustup.rs -sSf | sh
sudo apt install make clang pkg-config libssl-dev
```

The first command will fetch the latest version of Rust and install it. Execute the second command to install the required dependencies for Polkadot.

```bash
rustup update
```

If you have already installed Rust, run this command to check whether there is a new version available.

## Install `polkadot` PoC-4

Until support for the one-line installer is back up for PoC-4, you will need to build `polkadot` from source.

**You must use a specific version of nightly to install PoC-4.** Follow the directions below:

```
rustup toolchain install nightly-2019-07-14
rustup default nightly-2019-07-14
rustup target add wasm32-unknown-unknown --toolchain nightly-2019-07-14
```

After switching to `nightly-2019-07-14` as the default toolchain, the below instructions should work as written.

```bash
git clone https://github.com/paritytech/polkadot.git
# To update your node. Run from this step.
cd polkadot
cargo clean
git checkout v0.4
git pull origin v0.4
./scripts/init.sh
./scripts/build.sh
cargo install --path ./ --force
```

This may take a while depending on your hardware!

## Synchronize Chain Data

Now you can start your Polkadot node. Start synchronizing the chain by executing the following command:

```bash
polkadot --chain alex
```

It will take at least a few hours.

You can check the current highest block via [Telemetry](https://telemetry.polkadot.io/#/Alexander) or the [PolkadotJS Block Explorer](https://polkadot.js.org/apps/#/explorer).

## Create accounts

To be a validator, you will need three separate accounts for managing your funds, namely `stash`, `controller`, and `session`. If you want to know more about it, please see [here](learn-staking#accounts).

![create account](assets/guides/how-to-validate/polkadot-dashboard-create-account.jpg)
First, go to [PolkadotJS => Account](https://polkadot.js.org/apps/#/accounts) and click on the `add account` button.

To help identify your accounts easily later, make sure to use `stash`, `controller`, and `session` in the names of your accounts. A mnemonic seed phrase is given to you. You can save it in a safe place, offline, or you can choose to save your account using a JSON keyfile that will be generated automatically when clicking on `Save`. The password that is required to create an account will be used to sign any transaction made for each account. It will also be used to encrypt the JSON keyfile and will be required if you wish to restore your account using this file.

You need to generate three accounts:

1. Stash
2. Controller
3. Session

You should use `Schnorrkel (sr25519)` for your Stash and Controller accounts and `Edwards (ed25519)` for your Session key.

The mnemonic phrase for the Session account needs to be used later in this guide to validate. Make sure you save it safely.

![backup seed](assets/guides/how-to-validate/polkadot-overview.jpg)

## Get Testnet DOTs Tokens

To continue the following steps, you are required to get some testnet DOTs for the `stash` and `controller` accounts in order to submit transactions and use these DOTs as stake. The `session` account doesn't need any DOTs. See the [DOTs page](learn-DOT#getting-testnet-dots) for recommendations on getting testnet DOTs. Each of your accounts should have at least 150 milliDOTs to cover the existential deposit and transaction fees.

## Bond DOTs

It is now time to set up our validator. We will do the following:

- Bound the DOTs of the `stash` account. These DOTs will be put at stake for the security of the network and can be slashed.
- Select the `controller`. This is the account that will decide when to start or stop validating.
- Select the `session` account. This is the account whose seed will be used to run the node.

First, go to the [Staking](https://polkadot.js.org/apps/#/staking/actions) section. Click on the "New stake" button.

![dashboard bonding](assets/guides/how-to-validate/polkadot-dashboard-bonding.jpg)

- **Stash account** - Select your `stash` account, we will bond 100 milliDOTs, make sure it has enough funds.
- **Controller account** - Select the `controller` account created earlier.
- **Value bonded** - Enter how many DOTs from the `stash` account you want to bond/stake. You can top up this amount and bond more DOTs later, however, withdrawing any bonded amount requires the bonding duration period to be over (several months at the time of writing).
- **Payment destination** - Select where the rewards get sent. More info [here](learn-staking#reward-distribution).

Once everything is filled properly, click `Bond` and sign the transaction (with your `stash` account).

## Set the Session Key

You should now see a new card with all your accounts. The bonded amount on the right corresponds to the funds bonded by the `stash` account.

![dashboard validate](assets/guides/how-to-validate/polkadot-dashboard-set-session-key.jpg)

Click on `Set Session Key`. Select the `session` account created previously and click on `Set Session Key`.

## Validate

You should now be able to see both `Validate` and `Nominate` buttons for your Session key.

At this point, and before validating, you should make sure your node is synced. Open your terminal and run your validator with the seed or the mnemonic from the `session` account, e.g:

```bash
polkadot --chain alex --validator --key="SESSION_ACCOUNT_SEED" --name NAME_ON_TELEMETRY
```

Make sure that the address generated from the seed corresponds to your `session` account's address. Don't worry if the last characters diverge, it's just the checksum that has recently changed.

![terminal session key verification](assets/guides/how-to-validate/maintain-seed.jpg)

To verify that your node is live and in sync, head to [Telemetry](https://telemetry.polkadot.io/#/Alexander), after a few seconds, your node's information will be shown.

If everything looks good, go ahead and click on `Validate` in Polkadot UI.

![dashboard validate](assets/guides/how-to-validate/polkadot-dashboard-validate.jpg)
![dashboard validate](assets/guides/how-to-validate/polkadot-dashboard-validate-modal.jpg)

- **Unstake Threshold** - Set how often you want to be reported offline (and slashed) before being removed from the validator set. A higher value will allow you to be offline more times before being slashed, but you will be slashed more severely.
- **Reward Commission** - Select how much of the reward you will keep; the rest will be shared among you and your nominators.

Click `Validate`.

Go to the Staking tab, you should see a list of active validators out there. At the top of the page, it shows how many validator slots are available and how many nodes intend to be a validator.

![staking queue](assets/guides/how-to-validate/polkadot-dashboard-staking-queue.jpg)

Your node will be shown on the *next up* queue. In the next era (up to 1 hour), if you have enough backing, your node will become an active validator.

**Congratulations!**

> If you want to run your validator as a `systemd` process, see the short guide [here](maintain-guides-how-to-systemd).

**Notice:** As mainnet gets closer, you can expect more slots to be available for testing.

## VPS List

* [OVH](https://www.ovh.com.au/)
* [Digital Ocean](https://www.digitalocean.com/)
* [Vultr](https://www.vultr.com/)
* [Linode](https://www.linode.com/)
* [Contabo](https://contabo.com/)
* [Scaleway](https://www.scaleway.com/)
