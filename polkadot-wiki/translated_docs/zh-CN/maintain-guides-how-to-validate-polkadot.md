---
id: maintain-guides-how-to-validate-polkadot
title: 运行验证人 (Polkadot)
sidebar_label: How to run a Validator on Polkadot
---

> The following information applies to the Polkadot network. If you want to set up a validator on Kusama, check out the [Kusama guide](https://guide.kusama.network/docs/en/maintain-guides-how-to-validate-kusama) instead.

本指南将指导您如何在 Polkadot 网络上设置验证人节点。

## 首先

在主网上运行验证人有很大的责任！你不仅要对自己抵押的 DOTs 负责，还有目前提名你的提名人抵押。如果你犯了错误并且被惩罚，你的钱和声誉将处于危险之中。但是运行验证人也有非常可观的回报，您为安全性做出了贡献，使网络更分散。

由于安全性对运行验证人至关重要，因此您最好看一下[设定安全验证人](maintain-guides-secure-validator)资料使您了解在构建网络架构时要考虑的要素。 Web3 基金会也会保持更新[安全验证人设置的参考](https://github.com/w3f/polkadot-secure-validator)使您也可以自己部署来使用(视频教程在[这里](https://www.youtube.com/watch?v=tTn8P6t7JYc))。随着您成为验证人愈长时间，您可能使用此库作为自己的*起点*进行修改和自定义。

如果您需要帮助，请前往 [ Riot 上的 Polkadot 验证人聊天室](https://matrix.to/#/!NZrbtteFeqYKCUGQtr:matrix.parity.io?via=matrix.parity.io&via=matrix.org&via=web3.foundation) 。团队和其他验证人在那里帮助回答问题并提供经验。

### How many DOT do I need?

You can have a rough estimate on that by using the methods listed [here](faq#what-is-the-minimum-stake-necessary-to-be-elected-as-an-active-validator). Validators are elected based on [Phragmén's algorithm](learn-phragmen). To be elected into the set, you need a minimum stake behind your validator. This stake can come from yourself or from [nominators](learn-nominator). This means that as a minimum, you will need enough DOT to set up Stash and Controller [accounts](learn-keys) with the existential deposit, plus a little extra for transaction fees. The rest can come from nominators.

**Warning:** Any DOT that you stake for your validator is liable to be slashed, meaning that an insecure or improper setup may result in loss of DOT tokens! If you are not confident in your ability to run a validator node, it is recommended to nominate your DOT to a trusted validator node instead.

## 初始设置

### 要求

初学者运行验证人的最常见方法是在 Linux 云服务器 上。 您可以选择自己喜欢的[ VPS ](#vps-list)服务商，以及自己喜欢的操作系统。 在本指南中，我们将使用** Ubuntu 18.04 **，但其他平台的设置应相似。

Polkadot 中的交易权重以标准硬件为基准。 建议验证人至少运行标准硬件，以确保它们能够及时处理所有区块。以下不是*最低要求*，但是如果您决定以低于此的速度运行，则可能会遇到性能问题。

#### 标准硬件

关于标准硬件的详细信息，请在[这里](https://github.com/paritytech/substrate/pull/5848)查看。

- **CPU** - Intel(R) Core(TM) i7-7700K CPU @ 4.20GHz
- **Storage** - A NVMe solid state drive. Should be reasonably sized to deal with blockchain growth. Starting around 80GB - 160GB will be okay for the first six months of Polkadot, but will need to be re-evaluated every six months.
- **Memory** - 64GB.

上面发布的规格绝不是运行验证人时可以使用的最低规格，但是您应该意识到，如果使用的规格较少，则可能需要切换一些额外的优化才能与其他运行标准验证人相同。

### 安裝 Rust

当你选择云端服务供应商并设置新服务器后，第一件您要做的事就是安装 Rust。

如果您从未安装过 Rust，则应先执行此指令。该指令将下载最新版本的 Rust 并安装。

```sh
curl https://sh.rustup.rs -sSf | sh
```

相反如果您已经安装了 Rust，请运行以下指令以确保您使用的是最新版本。

```sh
rustup update
```

最后运行此指令以安装必要的相关依赖，以编译和运行 Polkadot 节点。

```sh
sudo apt install make clang pkg-config libssl-dev build-essential
```

注意 - 如果您使用的是 OSX，并且已安装[ Homebrew ](https://brew.sh)，则可以执行以下指令而不是之前的指令：

```sh
brew install cmake pkg-config openssl git llvm
```

### 安装 & 配置网络时间协议 (NTP) 客户端

[ NTP ](https://en.wikipedia.org/wiki/Network_Time_Protocol)是种网络协议，旨在通过网络同步计算机的时钟。NTP 允许您同步网络中所有系统的时钟。 验证人现在要求本地时钟保持合理的同步，因此您应该运行 NTP 或类似的服务。 您可以通过运行以下命令检查是否具有 NTP 客户端：

_如果您正在使用 Ubuntu 18.04 / 19.04, NTP 客户端应默认已安装。_

```sh
timedatectl
```

如果已安装并正在运行 NTP，则应该看到`System clock synchronized: yes`(或类似的消息)。如果看不到它，可以通过执行以下命令进行安装:

```sh
sudo apt-get install ntp
```

ntpd 将在安装后自动启动。您可以查询 ntpd 获取状态信息以验证一切是否正常:

```sh
sudo ntpq -p
```

> _WARNING_: Skipping this can result in the validator node missing block authorship opportunities. If the clock is out of sync (even by a small amount), the blocks the validator produces may not get accepted by the network. This will result in `ImOnline` heartbeats making it on chain, but zero allocated blocks making it on chain.

### 构建并安装 `polkadot` 二进制文件

您需要从[ paritytech/polkadot ](https://github.com/paritytech/polkadot) GitHub 库的** v0.8 **分支中构建 `polkadot` 二进制文件。

You should generally use the latest **0.8.x** tag. You should either review the output from the "git tag" command or visit the [Releases](https://github.com/paritytech/polkadot/releases) to see a list of all the potential 0.8 releases. You should replace `VERSION` below with the latest build (i.e., the highest number).

> Note: If you prefer to use SSH rather than HTTPS, you can replace the first line of the below with `git clone git@github.com:paritytech/polkadot.git`.

```sh
git clone https://github.com/paritytech/polkadot.git
cd polkadot
git tag -l | sort -V | grep -v -- '-rc'
echo Get the latest version and replace VERSION (below) with it.
git checkout VERSION
./scripts/init.sh
cargo build --release
```

这步将需要一段时间(通常需要 10 - 40 分钟，具体取决于您的硬件)。

> Note if you run into compile errors, you may have to switch to a less recent nightly. This can be done by running:
>
> ```sh
> rustup install nightly-2020-10-06
> rustup target add wasm32-unknown-unknown --toolchain nightly-2020-10-06
> cargo +nightly-2020-10-06 build --release
> ```

````

如果您想在本地生成密钥，您还可以在同一目录安装` subkey `。然后您可以把生成好的` subkey `可执行文件，并将其转移到与世隔绝的电脑中，以提高安全性。

```sh
cargo install --force --git https://github.com/paritytech/substrate subkey
````

### 同步链数据

> **Note:** By default, Validator nodes are in archive mode. If you've already synced the chain not in archive mode, you must first remove the database with `polkadot purge-chain` and then ensure that you run Polkadot with the `--pruning=archive` option.
>
> You may run a validator node in non-archive mode by adding the following flags: `--unsafe-pruning --pruning <NUM OF BLOCKS>`, a reasonable value being 1000. Note that an archive node and non-archive node's databases are not compatible with each other, and to switch you will need to purge the chain data.

您可以通过运行以下指令来开始同步您的节点:

```sh
./target/release/polkadot --pruning=archive
```

如果您不想马上运行验证模式下。

`--pruning=archive`选项意味着`--validator`和`-sentry `选项，因此仅如果在没有这两个选项之一的情况下启动节点，则必须明确要求。 如果您不设置为 archive 节点，即使不在运行验证人和哨兵模式时，也需要切换时重新同步数据库。

> **Note:** Validators should sync using the RocksDb backend. This is implicit by default, but can be explicit by passing the `--database RocksDb` flag.
>
> In the future, it is recommended to switch to the faster and more efficient ParityDB option. Note that **ParityDB is still experimental and should not be used in production.** If you want to test out ParityDB, you can add the flag `--database paritydb`. Switching between database backends will require a resync.

根据当时链的大小，此步可能需要几分钟到几个小时不等。

如果您想估计还需要再多少时间，服务器日志(在 `polkadot` STDOUT 程序中显示)显示了您的节点已处理和最新验证的区块。 然后您可以与[ Telemetry ](https://telemetry.polkadot.io/#list/Polkadot%20CC1)或当前[ PolkadotJS 区块链浏览器](https://polkadot.js.org/apps/#/explorer)比较。

## Bond DOT

强烈建议您将 controller 和 stash 帐号设为两个单独的帐号。 为此，您将创建两个帐号，并确保每个帐号至少有足够的资金来支付进行交易的费用。 将您的大部分资金保留在 stash 帐号中，因为这是您存入资金的托管人。

确保不对所有 DOT 余额进行绑定，因为您将无法从绑定的余额中支付交易费用。

现在可以开始设定验证人，首先我们将会做以下步骤：

- Bond the DOT of the Stash account. These DOT will be put at stake for the security of the network and can be slashed.
- 选择 Controller，Controller 是决定何时开始或停止验证的帐户。

First, go to the [Staking](https://polkadot.js.org/apps/#/staking/actions) section. Click on "Account Actions", and then the "+ Stash" button.

![dashboard bonding](assets/guides/how-to-validate/polkadot-dashboard-bonding.jpg)

- **Stash account** - Select your Stash account. In this example, we will bond 100 milliDOT - make sure that your Stash account contains _at least_ this much. You can, of course, stake more than this.
- **Controller account** - Select the Controller account created earlier. This account will also need a small amount of DOT in order to start and stop validating.
- **Value bonded** - How much DOT from the Stash account you want to bond/stake. Note that you do not need to bond all of the DOT in that account. Also note that you can always bond _more_ DOT later. However, _withdrawing_ any bonded amount requires the duration of the unbonding period. On Kusama, the unbonding period is 7 days. On Polkadot, the planned unbonding period is 28 days.
- **Payment destination** - The account where the rewards from validating are sent. More info [here](learn-staking/#reward-distribution). Starting with runtime version v23 natively included in client version [0.8.23](https://github.com/paritytech/polkadot/releases/tag/v0.8.23), payouts can go to any custom address. If you'd like to redirect payments to an account that is neither the controller nor the stash account, set one up. Note that it is extremely unsafe to set an exchange address as the recipient of the staking rewards.

当所有资料填写好后，使用 Stash 帐号按下`Bond`并签署交易。

几秒钟后您应该看到 "ExtrinsicSuccess" 信息。现在您应该会看到包含所有帐号的新卡 (注意: 您可能需要重新整理页面)。 右侧的保证金金额对应于 Stash 的绑定帐号。

## 设置 Session 密钥

> **Note:** The session keys are consensus critical, so if you are not sure if your node has the current session keys that you made the `setKeys` transaction then you can use one of the two available RPC methods to query your node: [hasKey](https://polkadot.js.org/docs/substrate/rpc/#haskeypublickey-bytes-keytype-text-bool) to check for a specific key or [hasSessionKeys](https://polkadot.js.org/docs/substrate/rpc/#hassessionkeyssessionkeys-bytes-bool) to check the full session key public key string.

Once your node is fully synced, stop the process by pressing Ctrl-C. At your terminal prompt, you will now start running the node.

```sh
./target/release/polkadot --validator --name "name on telemetry"
```

您可以为验证者人改任何名称，但其他人也可以看到。该名称也会显示在 telemetry 服务器里。由于多人也在使用 telemetry，因此建议您的名称尽可能独特一点。

### 生成 Session 密钥

您需要通过签名并提交交易设定 Session 密钥。这就是用来与您的验证节点和 Controller 帐号连接起来。

#### 选项 1: PolkadotJS-APPS

您可以使用客户端通过 RPC 生成[ Session 密钥](https://wiki.polkadot.network/en/latest/polkadot/learn/keys/#session-key)。 如果执行此操作，确保已将 PolkadotJS-Apps 浏览器连接到验证人节点。 您可以在 "Settings" 标签中将应用程序设置连接到验证人的地址。如果您连接到 Web3 Foundation 的 Parity 托管的地址，则不能使用此方法，因为向该节点发出 RPC 请求是*公开节点*上托管的 keystore，因此您需要确认正在与*您的节点*的 keystore 连接。

一旦确定已连接到节点，最简单为节点设置 session 密钥的方法是调用 `author_rotateKeys` RPC 请求在验证人的 keystore 中创建新密钥。前往到工具箱选项卡并调用 RPC，然后选择 author > rotateKeys() 选项并记住保存回传结果。

![Explorer RPC call](assets/guides/how-to-validate/polkadot-explorer-rotatekeys-rpc.jpg)

#### 选项 2: CLI

如果您在远程服务器上，运行此指令在同一台电脑上会更容易(当节点是运行中并且配置默认 HTTP RPC 端口):

```sh
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' http://localhost:9933
```

结果将是十六进制编码的 "result"。這结果是四个公钥的合并。保存结果供后续使用。

You can restart your node at this point.

### 提交`setKeys`交易

您需要通过签名并提交交易设定你的 Session 密钥。 这是把您的 Controller 帳戶与验证人连接起来。

前往 [ Stake > Account Actions](https://polkadot.js.org/apps/#/staking/actions)，然后在您先前生成的绑定(Stash)帐户。 按下 "Set Session Key" 之后输入之前在`author_rotateKeys`的结果。

![staking-change-session](assets/guides/how-to-validate/set-session-key-1.jpg) ![staking-session-result](assets/guides/how-to-validate/set-session-key-2.jpg)

提交交易，现在您可以开始验证了。

## 验证

要核实您的节点是否处于运行状态并已同步，前往[Telemetry](https://telemetry.polkadot.io/#list/Polkadot%20CC1) 并找您的节点。注意: 这里显示 Polkadot 网络上的所有节点，因此拥有一个独一无二的名字很重要。

如果一切看起来顺利，请继续操作，在 Polkadot UI 中按下 "Validate"。

![dashboard validate](assets/guides/how-to-validate/polkadot-dashboard-validate.jpg) ![dashboard validate](assets/guides/how-to-validate/polkadot-dashboard-validate-modal.jpg)

- **Payment preferences** -您可以指定将获得报酬的百分比。剩余的将与您的提名人之间进行分配。

按下 "Validate"。

如果您前往 "Staking" 标签，将看到当前在网络上运行的验证人列表。 在页面顶部，它显示了验证人的数量，以及已发出有意表示希望成为验证人节点的数量。 您可以转到 "Waiting" 标签仔细检查以查看是否在此处列出了您的节点。

![staking queue](assets/guides/how-to-validate/polkadot-dashboard-staking.jpg)

The validator set is refreshed every era. In the next era, if there is a slot available and your node is selected to join the validator set, your node will become an active validator. Until then, it will remain in the _waiting_ queue. If your validator is not selected to become part of the validator set, it will remain in the _waiting_ queue until it is. There is no need to re-start if you are not selected for the validator set in a particular era. However, it may be necessary to increase the number of DOT staked or seek out nominators for your validator in order to join the validator set.

**恭喜你!** 如果你有按照以上步骤操作，你经已设定好 Polkadot 网络的验证人！若果你需要帮助，请前往 <a href="[Polkadot 验证人聊天室](https://matrix.to/#/!NZrbtteFeqYKCUGQtr:matrix.parity.io?via=matrix.parity.io&via=matrix.org&via=web3.foundation)

## Thousand Validators Programme

The Thousand Validators Programme is a joint initiative by Web3 Foundation and Parity Technologies to provide support for community validators. If you are interested in applying for the programme, you can find more information [on the wiki page](thousand-validators.md).

## FAQ

### 为什么我无法同步链？

![zero-peer](assets/guides/how-to-validate/polkadot-zero-peer.jpg)

Make sure to enable `30333` libp2p port. Eventually, it will take a little bit of time to discover other peers over the network.

### 如何清除链的所有数据？

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
