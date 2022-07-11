---
id: maintain-guides-how-to-validate-polkadot
title: Run a Validator (Polkadot)
sidebar_label: Validator Guide
---

> The following information applies to the Polkadot network, which is currently in the soft launch phase. During soft launch the network starts as a Proof-of-Authority network before transitioning to Proof-of-Stake. You will be able to follow this guide to set up your validator but the first validator election and rewards will not start until later. If you want to set up a validator on Kusama, check out the [Kusama guide](maintain-guides-how-to-validate-kusama) instead.

This guide will instruct you how to set up a validator node on the Polkadot network.

## Preliminaries

Running a validator on a live network is a lot of responsibility! You will be accountable for not only your own stake, but also the stake of your current nominators. If you make a mistake and get slashed, your money and your reputation will be at risk. However, running a validator can also be very rewarding, knowing that you contribute to the security of a decentralized network while growing your stash.

Since security is so important to running a successful validator, you should take a look at the [secure validator](maintain-guides-secure-validator) information to make you understand the factors to consider when constructing your infrastructure. The Web3 Foundation also maintains a [reference implementation for a secure validator set-up](https://github.com/w3f/polkadot-secure-validator) that you can use by deploying yourself (video walkthrough is available [here](https://www.youtube.com/watch?v=tTn8P6t7JYc)). As you progress in your journey as a validator, you will likely want to use this repository as a _starting point_ for your own modifications and customizations.

If you need help, please reach out on the [Polkadot Validator Lounge](https://matrix.to/#/!NZrbtteFeqYKCUGQtr:matrix.parity.io?via=matrix.parity.io&via=matrix.org&via=web3.foundation) on Riot. The team and other validators are there to help answer questions and provide tips from experience.

### How many DOTs do I need?

You can have a rough estimate on that by using the methods listed [here](faq#what-is-the-minimum-stake-necessary-to-be-elected-as-an-active-validator). Validators are elected based on [Phragmen's algorithm](learn-phragmen). To be elected into the set, you need a minimum stake behind your validator. This stake can come from yourself or from [nominators](maintain-nominator). This means that as a minimum, you will need enough DOT to set up Stash and Controller [accounts](learn-keys) with the existential deposit, plus a little extra for transaction fees. The rest can come from nominators.

**Warning:** Any DOTs that you stake for your validator is liable to be slashed, meaning that an insecure or improper setup may result in loss of DOT tokens! If you are not confident in your ability to run a validator node, it is recommended to nominate your DOT to a trusted validator node instead.

## Initial Set-up

### Requirements

The most common way for a beginner to run a validator is on a cloud server running Linux. You may choose whatever [VPS](#vps-list) provider that your prefer, and whatever operating system you are comfortable with. For this guide we will be using **Ubuntu 18.04**, but the instructions should be similar for other platforms.

The transactions weights in Polkadot were benchmarked on standard hardware. It is recommended that validators run at least the standard hardware in order to ensure they are able to process all blocks in time. The following are not _minimum requirements_ but if you decide to run with less than this beware that you might have performance issue.

#### Standard Hardware

For the full details of the standard hardware please see [here](https://github.com/paritytech/substrate/pull/5848).

- **CPU** - Intel(R) Core(TM) i7-7700K CPU @ 4.20GHz
- **Storage** - A NVMe solid state drive. Should be reasonably sized to deal with blockchain growth. Starting around 80GB - 160GB will be okay for the first six months of Polkadot, but will need to be re-evaluated every six months.
- **Memory** - 64GB.

The specs posted above are by no means the minimum specs that you could use when running a validator, however you should be aware that if you are using less you may need to toggle some extra optimizations in order to be equal to other validators that are running the standard.

### Install Rust

Once you choose your cloud service provider and set-up your new server, the first thing you will do is install Rust.

If you have never installed Rust, you should do this first. This command will fetch the latest version of Rust and install it.

```sh
curl https://sh.rustup.rs -sSf | sh
```

Otherwise, if you have already installed Rust, run the following command to make sure you are using the latest version.

```sh
rustup update
```

Finally, run this command to install the necessary dependencies for compiling and running the Polkadot node software.

```sh
sudo apt install make clang pkg-config libssl-dev build-essential
```

Note - if you are using OSX and you have [Homebrew](https://brew.sh) installed, you can issue the following equivalent command INSTEAD of the previous one:

```sh
brew install cmake pkg-config openssl git llvm
```

### Install & Configure Network Time Protocol (NTP) Client

[NTP](https://en.wikipedia.org/wiki/Network_Time_Protocol) is a networking protocol designed to synchronize the clocks of computers over a network. NTP allows you to synchronize the clocks of all the systems within the network. Currently it is required that validators' local clocks stay reasonably in sync, so you should be running NTP or a similar service. You can check whether you have the NTP client by running:

_If you are using Ubuntu 18.04 / 19.04, NTP Client should be installed by default._

```sh
timedatectl
```

If NTP is installed and running, you should see `System clock synchronized: yes` (or a similar message). If you do not see it, you can install it by executing:

```sh
sudo apt-get install ntp
```

ntpd will be started automatically after install. You can query ntpd for status information to verify that everything is working:

```sh
sudo ntpq -p
```

### Building and Installing the `polkadot` Binary

You will need to build the `polkadot` binary from the [paritytech/polkadot](https://github.com/paritytech/polkadot) repository on GitHub using the source code available in the **v0.8** branch.

You should generally use the latest **0.8.x** tag. At the time of writing, this was **0.8.3**, but you should review the output from the "git tag" command (`git tag | grep "$v\0\.8"`) to see a list of all the potential 0.8 releases. You should replace `v0.8.8` with the latest build (i.e., the highest number). You can also find the latest Polkadot version on the [release](https://github.com/paritytech/polkadot/releases) tab.

> Note: If you prefer to use SSH rather than HTTPS, you can replace the first line of the below with `git clone git@github.com:paritytech/polkadot.git`.

```sh
git clone https://github.com/paritytech/polkadot.git
cd polkadot
git tag | grep "$v\0\.8"
git checkout v0.8.8
./scripts/init.sh
cargo build --release
```

This step will take a while (generally 10 - 40 minutes, depending on your hardware).

> Note if you run into compile errors, you may have to switch to a less recent nightly. This can be done by running:
>
> ```sh
> rustup install nightly-2020-05-15
> rustup override set nightly-2020-05-15
> rustup target add wasm32-unknown-unknown --toolchain nightly-2020-05-15
> ```

````

If you are interested in generating keys locally, you can also install `subkey` from the same directory. You may then take the generated `subkey` executable and transfer it to an air-gapped machine for extra security.

```sh
cargo install --force --git https://github.com/paritytech/substrate subkey
````

### Synchronize Chain Data

> **Note:** By default, Validator nodes are in archive mode. If you've already synced the chain not in archive mode, you must first remove the database with `polkadot purge-chain` and then ensure that you run Polkadot with the `--pruning=archive` option.
>
> You may run a validator node in non-archive mode by adding the following flags: `-unsafe-pruning --pruning OF BLOCKS>`, but note that an archive node and non-archive node's databases are not compatible with each other, and to switch you will need to purge the chain data.

You can begin syncing your node by running the following command:

```sh
./target/release/polkadot --pruning=archive
```

if you do not want to start in validator mode right away.

The `--pruning=archive` flag is implied by the `--validator` and `--sentry` flags, so it is only required explicitly if you start your node without one of these two options. If you do not set your pruning to archive node, even when not running in validator and sentry mode, you will need to re-sync your database when you switch.

> **Note:** Validators should sync using the RocksDb backend. This is implicit by default, but can be explicit by passing the `--database RocksDb` flag. In the future, it is recommended to switch to using the faster and more efficient ParityDb option. Switching between database backends will require a resync.
>
> If you want to test out ParityDB you can add the flag `--database paritydb`.

Depending on the size of the chain when you do this, this step may take anywhere from a few minutes to a few hours.

If you are interested in determining how much longer you have to go, your server logs (printed to STDOUT from the `polkadot` process) will tell you the latest block your node has processed and verified. You can then compare that to the current highest block via [Telemetry](https://telemetry.polkadot.io/#list/Polkadot%20CC1) or the [PolkadotJS Block Explorer](https://polkadot.js.org/apps/#/explorer).

> **Note:** If you do not already have DOTs, this is as far as you will be able to go until the end of the soft launch period. You can still run a node, but you will need to have a minimal amount of DOTs to continue, as balance transfers are disabled during the soft launch. Please keep in mind that even for those with DOTs, they will only be indicating their _intent_ to validate; they will also not be able to run a validator until the NPoS phase starts.

## Bond DOTs

> **Note:** Transfers are disabled during the soft launch phase of Polkadot. This means that if you are setting up a validator during this time you may not be able to make your stash and controller two separate accounts, as is recommended. You must make them the same account, meaning that you will bond the account to itself. However it is highly recommended that you change your controller as soon as possible.

It is highly recommended that you make your controller and stash accounts be two separate accounts. For this, you will create two accounts and make sure each of them have at least enough funds to pay the fees for making transactions. Keep most of your funds in the stash account since it is meant to be the custodian of your staking funds.

Make sure not to bond all your DOT balance since you will be unable to pay transaction fees from your bonded balance.

It is now time to set up our validator. We will do the following:

- Bond the DOTs of the Stash account. These DOTs will be put at stake for the security of the network and can be slashed.
- Select the Controller. This is the account that will decide when to start or stop validating.

First, go to the [Staking](https://polkadot.js.org/apps/#/staking/actions) section. Click on "Account Actions", and then the "New stake" button.

![dashboard bonding](assets/guides/how-to-validate/polkadot-dashboard-bonding.jpg)

- **Stash account** - Select your Stash account. In this example, we will bond 100 milliDOTs - make sure that your Stash account contains _at least_ this much. You can, of course, stake more than this.
- **Controller account** - Select the Controller account created earlier. This account will also need a small amount of DOTs in order to start and stop validating.
- **Value bonded** - How much DOts from the Stash account you want to bond/stake. Note that you do not need to bond all of the DOTs in that account. Also note that you can always bond _more_ DOTs later. However, _withdrawing_ any bonded amount requires the duration of the unbonding period. On Kusama, the unbonding period is 7 days. On Polkadot, the planned unbonding period is 28 days.
- **Payment destination** - The account where the rewards from validating are sent. More info [here](https://wiki.polkadot.network/en/latest/polkadot/learn/staking/#reward-distribution).

Once everything is filled in properly, click `Bond` and sign the transaction with your Stash account.

After a few seconds, you should see an "ExtrinsicSuccess" message. You should now see a new card with all your accounts (note: you may need to refresh the screen). The bonded amount on the right corresponds to the funds bonded by the Stash account.

## Set Session Keys

> **Note:** The session keys are consensus critical, so if you are not sure if your node has the current session keys that you made the `setKeys` transaction then you can use one of the two available RPC methods to query your node: [hasKey](https://polkadot.js.org/api/substrate/rpc.html#haskey-publickey-bytes-keytype-text-bool) to check for a specific key or [hasSessionKeys](https://polkadot.js.org/api/substrate/rpc.html#hassessionkeys-sessionkeys-bytes-bool) to check the full session key public key string.

Once your node is fully synced, stop the process by pressing Ctrl-C. At your terminal prompt, you will now start running the node in validator mode with a flag allowing unsafe RPC calls, needed for some advanced operations.

```sh
./target/release/polkadot --validator --name "name on telemetry"
```

You can give your validator any name that you like, but note that others will be able to see it, and it will be included in the list of all servers using the same telemetry server. Since numerous people are using telemetry, it is recommended that you choose something likely to be unique.

### Generating the Session Keys

You need to tell the chain your Session keys by signing and submitting an extrinsic. This is what associates your validator node with your Controller account on Polkadot.

#### Option 1: PolkadotJS-APPS

You can generate your [Session keys](https://wiki.polkadot.network/en/latest/polkadot/learn/keys/#session-key) in the client via the apps RPC. If you are doing this, make sure that you have the PolkadotJS-Apps explorer attached to your validator node. You can configure the apps dashboard to connect to the endpoint of your validator in the Settings tab. If you are connected to a default endpoint hosted by Parity of Web3 Foundation, you will not be able to use this method since making RPC requests to this node would effect the local keystore hosted on a _public node_ and you want to make sure you are interacting with the keystore for _your node_.

Once ensuring that you have connected to your node, the easiest way to set session keys for your node is by calling the `author_rotateKeys` RPC request to create new keys in your validator's keystore. Navigate to Toolbox tab and select RPC Calls then select the author > rotateKeys() option and remember to save the output that you get back for a later step.

![Explorer RPC call](assets/guides/how-to-validate/polkadot-explorer-rotatekeys-rpc.jpg)

#### Option 2: CLI

If you are on a remote server, it is easier to run this command on the same machine (while the node is running with the default HTTP RPC port configured):

```sh
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' http://localhost:9933
```

The output will have a hex-encoded "result" field. The result is the concatenation of the four public keys. Save this result for a later step.

You can restart your node at this point, omitting the `--unsafe-rpc-expose` flag as it is no longer needed.

### Submitting the `setKeys` Transaction

You need to tell the chain your Session keys by signing and submitting an extrinsic. This is what associates your validator with your Controller account.

Go to [Staking > Account Actions](https://polkadot.js.org/apps/#/staking/actions), and click "Set Session Key" on the bonding account you generated earlier. Enter the output from `author_rotateKeys` in the field and click "Set Session Key".

![staking-change-session](assets/guides/how-to-validate/set-session-key-1.jpg) ![staking-session-result](assets/guides/how-to-validate/set-session-key-2.jpg)

Submit this extrinsic and you are now ready to start validating.

## Validate

To verify that your node is live and synchronized, head to [Telemetry](https://telemetry.polkadot.io/#list/Polkadot%20CC1) and find your node. Note that this will show all nodes on the Polkadot network, which is why it is important to select a unique name!

If everything looks good, go ahead and click on "Validate" in Polkadot UI.

![dashboard validate](assets/guides/how-to-validate/polkadot-dashboard-validate.jpg) ![dashboard validate](assets/guides/how-to-validate/polkadot-dashboard-validate-modal.jpg)

- **Payment preferences** - You can specify the percentage of the rewards that will get paid to you. The remaining will be split among your nominators.

Click "Validate".

If you go to the "Staking" tab, you will see a list of active validators currently running on the network. At the top of the page, it shows the number of validator slots that are available as well as the number of nodes that have signaled their intention to be a validator. You can go to the "Waiting" tab to double check to see whether your node is listed there.

![staking queue](assets/guides/how-to-validate/polkadot-dashboard-staking.jpg)

The validator set is refreshed every era. In the next era, if there is a slot available and your node is selected to join the validator set, your node will become an active validator. Until then, it will remain in the _waiting_ queue. If your validator is not selected to become part of the validator set, it will remain in the _waiting_ queue until it is. There is no need to re-start if you are not selected for the validator set in a particular era. However, it may be necessary to increase the number of DOTs staked or seek out nominators for your validator in order to join the validator set.

**Congratulations!** If you have followed all of these steps, and been selected to be a part of the validator set, you are now running a Polkadot validator! If you need help, reach out on the [Polkadot Validator chat](https://matrix.to/#/!NZrbtteFeqYKCUGQtr:matrix.parity.io?via=matrix.parity.io&via=matrix.org&via=web3.foundation).

## FAQ

### Why am I unable to synchronize the chain with 0 peers?

![zero-peer](assets/guides/how-to-validate/polkadot-zero-peer.jpg)

Make sure to enable `30333` libp2p port. Eventually, it will take a little bit of time to discover other peers over the network.

### How do I clear all my chain data?

```sh
./target/release/polkadot purge-chain
```

## VPS List

- [OVH](https://www.ovh.com.au/)
- [Digital Ocean](https://www.digitalocean.com/)
- [Vultr](https://www.vultr.com/)
- [Linode](https://www.linode.com/)
- [Contabo](https://contabo.com/)
- [Scaleway](https://www.scaleway.com/)

## Using Docker

If you have Docker installed, you can use it to start your validator node without needing to build the binary. You can do this with a simple one line command:

```sh
$ docker run parity/polkadot:latest --validator --name "name on telemetry"
```
