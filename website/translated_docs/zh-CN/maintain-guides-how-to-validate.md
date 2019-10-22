---
id: maintain-guides-how-to-validate
title: 运行验证人 (Alexander)
sidebar_label: 运行验证人 (Alexander)
---

__Note: This guide is for the Alexander testnet in the Polkadot repository on the v0.4 branch.__

想成为一个好验证人，你需要留意以下几点:

- 拥有DOTs作抵押(**基本要求**）
- 确保节点运行最新版本
- 拥有网络保安知识

如果你有DOT但是没有足够技术知识，你最好也 **不要**当验证人，反而提议把你的DOTs提名到其它你信任的验证人身上去帮你做这个工作。

你仍然能成为提名人提名多个验证人从而获得奖励。你可以在[这裹](maintain-nominator)了解更多关于提名人的操作。

这个教程我们使用Ubuntu 18.04并将在PoC-4测试网运行，不论你使用那个操作系统，大部份设定也不会有太大区别。另外这里有些[VPS服务器](#vps-list)给大家选择。

_Please make sure that you do **NOT** use this setup and configuration on mainnet. This guide simply walks you through step-by-step how to set up and run a validator node. If you would like to run a validator seriously when mainnet is live, you have to be REALLY careful on some areas like key management, DDoS protection, and high availability._

## 安裝 Rust

```bash
curl https://sh.rustup.rs -sSf | sh
sudo apt install make clang pkg-config libssl-dev
```

以上指令将会下载最新Rust版本并安装，第二个指令是安装其它所需要的程序。

```bash
rustup update
```

假如你经已安装好Rust，执行以上指令检查一下是否有新版本。

## 安装 `Polkadot` PoC-4

在没有一键安装之前，你需要从源代码编译`Polkadot`。

**您必须使用特定版本的 nightly 安装 PoC-4.**按照以下说明操作：

```
rustup toolchain install nightly-2019-07-14
rustup default nightly-2019-07-14
rustup target add wasm32-unknown-unknown --toolchain nightly-2019-07-14
```

切换到`nightly-2019-07-14`作为默认后，以下指令应该没有问题。

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

这可能需要一段时间，具体取决于您的硬件!

## 同步链数据

现在，您可以启动 Polkadot 节点。通过执行以下命令开始同步链数据：

```bash
polkadot --chain alex
```

这至少需要几个小时。

您可以通过<a href=https://telemetry.polkadot.io/#/Alexander">Telemetry</a>或 [polkadotJS 区块浏览器](https://polkadot.js.org/apps/#/Explorer)来检查当前最高块。

## 创建帐号

To be a validator, you will need three separate accounts for managing your funds, namely `stash`, `controller`, and `session`. If you want to know more about these accounts, please see [here](learn-staking#accounts).

![create account](assets/guides/how-to-validate/polkadot-dashboard-create-account.jpg) First, go to [PolkadotJS => Account](https://polkadot.js.org/apps/#/accounts) and click on the `add account` button.

To help easily identify your accounts later, make sure to use `stash`, `controller`, and `session` in the names of your accounts. A mnemonic seed phrase is given to you. You can save it in a safe place, offline, or you can choose to save your account using a JSON keyfile that will be generated automatically when clicking on `Save`. The password that is required to create an account will be used to sign any transaction made for each account. It will also be used to encrypt the JSON keyfile and will be required if you wish to restore your account using this file.

You need to generate three accounts:

1. Stash
2. Controller
3. Session

You should use `Schnorrkel (sr25519)` for your Stash and Controller accounts and `Edwards (ed25519)` for your Session key.

The mnemonic phrase for the Session account needs to be used later in this guide to validate. Make sure you save it safely.

![backup seed](assets/guides/how-to-validate/polkadot-overview.jpg)

## 获取测试币

To continue the following steps, you are required to get some testnet DOTs for the `stash` and `controller` accounts in order to submit transactions and use these DOTs as stake. The `session` account doesn't need any DOTs. See the [DOTs page](learn-DOT#getting-testnet-dots) for recommendations on getting testnet DOTs. Each of your accounts should have at least 150 milliDOTs to cover the existential deposit and transaction fees.

## 绑定 DOTS

现在可以开始设定验证人，首先我们将会做以下步骤：

- Bond the DOTs of the `stash` account. These DOTs will be put at stake for the security of the network and can be slashed.
- Select the `controller`. This is the account that will decide when to start or stop validating.
- Select the `session` account. This is the account whose seed will be used to run the node.

First, go to the [Staking](https://polkadot.js.org/apps/#/staking/actions) section. Click on the "New stake" button.

![dashboard bonding](assets/guides/how-to-validate/polkadot-dashboard-bonding.jpg)

- **Stash account** - Select your `stash` account, we will bond 100 milliDOTs, make sure it has enough funds.
- **Controller account** - Select the `controller` account created earlier.
- **Value bonded** - Enter how many DOTs from the `stash` account you want to bond/stake. You can top up this amount and bond more DOTs later, however, withdrawing any bonded amount requires the bonding duration period to be over (several months at the time of writing).
- **Payment destination** - Select where the rewards get sent. More info [here](learn-staking#reward-distribution).

正确填写所有内容后，单击`Bond`并签署交易(使用`stash`帐户)。

## 设定 Session Key

现在您应该会看到一张新卡，其中带有您的所有帐户。右边的绑定金额与`stash`账户所绑定的资金相对应。

![dashboard validate](assets/guides/how-to-validate/polkadot-dashboard-set-session-key.jpg)

点击 `Set Session Key`。选择之前创建的`session`帐户，然后单击`Set Session Key`。

## 验证

您现在应该能够看到Session Key的`Validate`和`Nominate`按钮

此时，在验证之前，应确保节点已同步。打开终端机，使用`session`帐户的种子或助记符运行验证人，例如：

```bash
polkadot --chain alex --validator --key="SESSION_ACCOUNT_SEED" --name NAME_ON_TELEMETRY
```

Make sure that the address generated from the seed corresponds to your `session` account's address. Don't worry if the last characters diverge, it's just the checksum that has recently changed.

![terminal session key verification](assets/guides/how-to-validate/polkadot-node-seed.jpg)

要验证您的节点是否处于活动状态并且处于同步状态，请转到[Telemetry](https://telemetry.polkadot.io/#/Alexander)，几秒钟后，将显示您节点的信息。

如果一切看起来都很好，请在Polkadot UI 中点击`Validate`。

![dashboard validate](assets/guides/how-to-validate/polkadot-dashboard-validate.jpg) ![dashboard validate](assets/guides/how-to-validate/polkadot-dashboard-validate-modal.jpg)

- **Unstake Threshold** - Set how often you want to be reported offline (and slashed) before being removed from the validator set. A higher value will allow you to be offline more times before being slashed, but you will be slashed more severely.
- **Reward Commission** - Select how much of the reward you will keep; the rest will be shared among you and your nominators.

点击`Validate`。

前往 [Staking apps](https://polkadot.js.org/apps/#/staking) 选择 "Staking Overview"，你应该看到所有运行中的验证人。在最顶部份，你会看到有多少验证人位置空缺和有多少人有意成为验证人。

![staking queue](assets/guides/how-to-validate/polkadot-dashboard-staking-queue.jpg)

有意成为验证人的节点将会在*next up*队列显示，每过一小时后，如果有位置空缺或你背后支持的抵押大过排最后那一位验证人，你的节点将会成为验证人。

**恭喜你！**

> 如果要将验证器作为`systemd`进程运行，请参阅[此处](maintain-guides-how-to-systemd)简短指南。

**注意:**随着主网越来越近，您可以估计有更多的空缺位置用于测试。

## VPS 服务器

* [OVH](https://www.ovh.com.au/)
* [Digital Ocean](https://www.digitalocean.com/)
* [Vultr](https://www.vultr.com/)
* [Linode](https://www.linode.com/)
* [Contabo](https://contabo.com/)
* [Scaleway](https://www.scaleway.com/)
