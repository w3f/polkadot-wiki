---
id: maintain-guides-how-to-validate-polkadot
title: 运行验证人 (Polkadot)
sidebar_label: 验证人指南
---

> The following information applies to the Polkadot network, which is currently in the soft launch phase. During soft launch the network starts as a Proof-of-Authority network before transitioning to Proof-of-Stake. You will be able to follow this guide to set up your validator but the first validator election and rewards will not start until later. If you want to set up a validator on Kusama, check out the [Kusama guide](mirror-maintain-guides-how-to-validate-kusama) instead.

本指南将指导您如何在 Polkadot 网络上设置验证人节点。

## 首先

在主网上运行验证人有很大的责任！你不仅要对自己抵押的 DOTs 负责，还有目前提名你的提名人抵押。如果你犯了错误并且被惩罚，你的钱和声誉将处于危险之中。但是运行验证人也有非常可观的回报，您为安全性做出了贡献，使网络更分散。

由于安全性对运行验证人至关重要，因此您最好看一下[设定安全验证人](maintain-guides-secure-validator)资料使您了解在构建网络架构时要考虑的要素。 Web3 基金会也会保持更新[安全验证人设置的参考](https://github.com/w3f/polkadot-secure-validator)使您也可以自己部署来使用(视频教程在[这里](https://www.youtube.com/watch?v=tTn8P6t7JYc))。随着您成为验证人愈长时间，您可能使用此库作为自己的_起点_进行修改和自定义。

如果您需要帮助，请前往 [ Riot 上的 Polkadot 验证人聊天室](https://matrix.to/#/!NZrbtteFeqYKCUGQtr:matrix.parity.io?via=matrix.parity.io&via=matrix.org&via=web3.foundation) 。团队和其他验证人在那里帮助回答问题并提供经验。

### 我需要多少 DOTs？

You can have a rough estimate on that by using the methods listed [here](faq#what-is-the-minimum-stake-necessary-to-be-elected-as-an-active-validator). Validators are elected based on [Phragmen's algorithm](learn-phragmen). To be elected into the set, you need a minimum stake behind your validator. This stake can come from yourself or from [nominators](maintain-nominator). This means that as a minimum, you will need enough DOT to set up Stash and Controller [accounts](learn-keys) with the existential deposit, plus a little extra for transaction fees. The rest can come from nominators.

**警告: ** 验证人抵押中的 DOTs 都有可能遭到大幅削减(惩罚)，这意味着不安全或设置不当可能会导致 KSM 被削减！ 如果您对运行验证人节点的能力不太确定，建议最好把您的 DOT 提名给你信任的验证人节点。

## 初始设置

### 要求

初学者运行验证人的最常见方法是在 Linux 云服务器 上。 您可以选择自己喜欢的[ VPS ](#vps-list)服务商，以及自己喜欢的操作系统。 在本指南中，我们将使用** Ubuntu 18.04 **，但其他平台的设置应相似。

Polkadot 中的交易权重以标准硬件为基准。 建议验证人至少运行标准硬件，以确保它们能够及时处理所有区块。以下不是_最低要求_，但是如果您决定以低于此的速度运行，则可能会遇到性能问题。

#### 标准硬件

关于标准硬件的详细信息，请在[这里](https://github.com/paritytech/substrate/pull/5848)查看。

- **CPU** - Intel(R) Core(TM) i7-7700K CPU @ 4.20GHz
- **Storage** - NVMe 固态硬盘，应该合理调整大小以应对区块链增长。 从大约 30GB 开始 - 在 Polkadot 的头六个月内可以使用 50GB，但需要每六个月重新评估一次。
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

### 构建并安装 `polkadot` 二进制文件

您需要从[ paritytech/polkadot ](https://github.com/paritytech/polkadot) GitHub 库的** v0.8 **分支中构建 ` polkadot ` 二进制文件。

You should generally use the latest **0.8.x** tag. At the time of writing, this was **0.8.3**, but you should review the output from the "git tag" command (`git tag | grep "$v\0\.8"`) to see a list of all the potential 0.8 releases. You should replace `v0.8.8` with the latest build (i.e., the highest number). You can also find the latest Polkadot version on the [release](https://github.com/paritytech/polkadot/releases) tab.

> 注意：如果您喜欢使用 SSH 而不是 HTTPS，则可以将下面的第一行替换为 `git clone git@github.com:paritytech/polkadot.git`。

```sh
git clone https://github.com/paritytech/polkadot.git
cd polkadot
git tag | grep "$v\0\.8"
git checkout v0.8.8
./scripts/init.sh
cargo build --release
```

这步将需要一段时间(通常需要 10 - 40 分钟，具体取决于您的硬件)。

> 注意如果您遇到编译错误，您可能不得不切换到一个没有那么近的 nightly。这可以是通过运行：
> 
> ```sh
rustup install nightly-2020-05-15
rustup override set nightly-2020-05-15
rustup target add wasm32-unknown-unknown --toolchain nightly-2020-05-15
```

如果您想在本地生成密钥，您还可以在同一目录安装` subkey `。然后您可以把生成好的` subkey `可执行文件，并将其转移到与世隔绝的电脑中，以提高安全性。

```sh
cargo install --force --git https://github.com/paritytech/substrate subkey
```

### 同步链数据

> **注意:**验证人节点预设是以 archive 模式同步。如果您已经同步好并不是 archive 模式，您必须首先运行` polkadot purge-chain `删除之前的数据库，然后确保使用` --pruning=archive `运行 Polkadot。
> 
> 您可以通过添加以下选项在非 archive 模式下运行验证人节点：`-unsafe-pruning --pruning OF BLOCKS>`，但请注意，archive 节点和非 archive 节点的数据库彼此不兼容，要进行切换，您将需要清除链数据。

您可以通过运行以下指令来开始同步您的节点:

```sh
./target/release/polkadot --pruning=archive
```

如果您不想马上运行验证模式下。

`--pruning=archive`选项意味着` --validator `和`-sentry `选项，因此仅如果在没有这两个选项之一的情况下启动节点，则必须明确要求。 如果您不设置为 archive 节点，即使不在运行验证人和哨兵模式时，也需要切换时重新同步数据库。

> **注意: **验证人应使用 rocksdb 后端同步。默认情况下这是隐式的，但可以显式绕过 `--database RocksDb`。 将来建议切换到使用更快，更有效的 ParityDb 选项。 在数据库后端之间切换将需要重新同步。
> 
> 如果要测试 ParityDB，可以添加` ---database paritydb `选项。

根据当时链的大小，此步可能需要几分钟到几个小时不等。

如果您想估计还需要再多少时间，服务器日志(在 ` polkadot ` STDOUT 程序中显示)显示了您的节点已处理和最新验证的区块。 然后您可以与[ Telemetry ](https://telemetry.polkadot.io/#list/Polkadot%20CC1)或当前[ PolkadotJS 区块链浏览器](https://polkadot.js.org/apps/#/explorer)比较。

> **注意:** 如果您还没有 DOTs，您只能做到这一步，直至升级到 PoS 之后。您仍然可以运行节点，但是因为在非正式发布期间轉帳是不能使用，所以您需要少数量 DOTs 才能继续操作。 在 NPoS 开始之前，即使有 DOTs 的人也只能表达他们_有意_成为验证人，他们现在是无法成为验证人。

## 绑定 DOTS

> **注意: **在 Polkadot 的非正式发布阶段将禁用转帐。 这意味着如果您在这段时间内设置验证人，则可能无法按照建议的方式将 stash 和 controller 设置为两个单独的帐号。 您必须使它们成为同一帐号，这意味着您将把该帐号绑定到其自身。 但是强烈建议您尽快更换 controller。

强烈建议您将 controller 和 stash 帐号设为两个单独的帐号。 为此，您将创建两个帐号，并确保每个帐号至少有足够的资金来支付进行交易的费用。 将您的大部分资金保留在 stash 帐号中，因为这是您存入资金的托管人。

确保不对所有 DOT 余额进行绑定，因为您将无法从绑定的余额中支付交易费用。

现在可以开始设定验证人，首先我们将会做以下步骤：

- 绑定 Stash 帐户的 DOT。 为了网络的安全，这些 DOT 将会抵押到网络，并且可以被惩罚。
- 选择 Controller，Controller 是决定何时开始或停止验证的帐户。

首先前往[ Staking ](https://polkadot.js.org/apps/#/staking/actions)部分。按下 "Account Actions"，然后再按 "New stake" 按钮。

![dashboard bonding](assets/guides/how-to-validate/polkadot-dashboard-bonding.jpg)

- **Stash 帐号** -选择 Stash 账号。在这个例子我们会绑定 100 milliDOTs - 确保你的 Stash 帐户拥有_至少_这个数量。当然你也可以绑定更多。
- **Controller 帐号** - 选择你之前创建的 Controller 帐号。此帐户也需要少量 DOTs 才能开始和停止验证。
- **Value bonded** - 选择从 Stash 帐号绑定/抵押 DOTs 数量， 因为你需要支付交易费，所以不能够把全部 DOTs 作押抵。另外你之后还可以绑定_更多_。但是_提取_ 已经绑定了的 DOTs 是需要等待一段时间 (Kusama 解绑时间是 7 天，而 Polkadot 计划是 28 天)。
- **Payment destination** - 把奖励发送到那个帐号，详情请看[这里](https://wiki.polkadot.network/en/latest/polkadot/learn/staking/#reward-distribution)。

当所有资料填写好后，使用 Stash 帐号按下`Bond`并签署交易。

几秒钟后您应该看到 "ExtrinsicSuccess" 信息。现在您应该会看到包含所有帐号的新卡 (注意: 您可能需要重新整理页面)。 右侧的保证金金额对应于 Stash 的绑定帐号。

## 设置 Session 密钥

> **注意:** Session 密钥是共识的关键，因此如果不确定节点是否具有进行` setKeys `交易 当前 session 密钥，则可以使用以下之一: 有两种可用的 RPC 查询节点的方法: [ hasKey ](https://polkadot.js.org/api/substrate/rpc.html#haskey-publickey-bytes-keytype-text-bool)检查特定密钥，或[ hasSessionKeys ](https://polkadot.js.org/api/substrate/rpc.html#hassessionkeys-sessionkeys-bytes-bool)检查完整的 session key 公钥字串。

节点同步好后，请按 Ctrl-C 停止该程序。 在终端机提示下，您现在将开始在验证人模式下运行节点，并带有允许进行某些高级操作所需不安全 RPC 调用的选项。

```sh
./target/release/polkadot --validator --name "name on telemetry"
```

您可以为验证者人改任何名称，但其他人也可以看到。该名称也会显示在 telemetry 服务器里。由于多人也在使用 telemetry，因此建议您的名称尽可能独特一点。

### 生成 Session 密钥

您需要通过签名并提交交易设定 Session 密钥。这就是用来与您的验证节点和 Controller 帐号连接起来。

#### 选项 1: PolkadotJS-APPS

您可以使用客户端通过 RPC 生成[ Session 密钥](https://wiki.polkadot.network/en/latest/polkadot/learn/keys/#session-key)。 如果执行此操作，确保已将 PolkadotJS-Apps 浏览器连接到验证人节点。 您可以在 "Settings" 标签中将应用程序设置连接到验证人的地址。如果您连接到 Web3 Foundation 的 Parity 托管的地址，则不能使用此方法，因为向该节点发出 RPC 请求是_公开节点_上托管的 keystore，因此您需要确认正在与_您的节点_的 keystore 连接。

一旦确定已连接到节点，最简单为节点设置 session 密钥的方法是调用 ` author_rotateKeys ` RPC 请求在验证人的 keystore 中创建新密钥。前往到工具箱选项卡并调用 RPC，然后选择 author > rotateKeys() 选项并记住保存回传结果。

![Explorer RPC call](assets/guides/how-to-validate/polkadot-explorer-rotatekeys-rpc.jpg)

#### 选项 2: CLI

如果您在远程服务器上，运行此指令在同一台电脑上会更容易(当节点是运行中并且配置默认 HTTP RPC 端口):

```sh
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' http://localhost:9933
```

结果将是十六进制编码的 "result"。這结果是四个公钥的合并。保存结果供后续使用。

此时您可以重新启动节点，省略`---unsafe-rpc-expose `选项，因为不再需要它。

### 提交` setKeys `交易

您需要通过签名并提交交易设定你的 Session 密钥。 这是把您的 Controller 帳戶与验证人连接起来。

前往 [ Stake > Account Actions](https://polkadot.js.org/apps/#/staking/actions)，然后在您先前生成的绑定(Stash)帐户。 按下 "Set Session Key" 之后输入之前在` author_rotateKeys `的结果。

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

验证人竞选在每个 era 也会重新运行。当下一个 era 如果有位置空缺并且您的节点成功成为验证人，您的节点将会正式成为验证人。在此之前它将停留在 _waiting_队列中。如果您的节点沒有成功成为验证人，它将会一直停留在_waiting_队列中排队。你不需要重新启动它。但是为了成为验证人，你可能需要增加抵押 DOTs 的数量或寻找提名人支持你的节点。

**恭喜你!** 如果你有按照以上步骤操作，你经已设定好 Polkadot 网络的验证人！若果你需要帮助，请前往 <a href="[Polkadot 验证人聊天室](https://matrix.to/#/!NZrbtteFeqYKCUGQtr:matrix.parity.io?via=matrix.parity.io&via=matrix.org&via=web3.foundation)

## 常见问题

### 为什么我无法同步链？

![zero-peer](assets/guides/how-to-validate/polkadot-zero-peer.jpg)

确保 libp2p 端口 `30333` 打开，可能需要一点时间发现网络上其它的 peers。

### 如何清除链的所有数据？

```sh
./target/release/polkadot purge-chain
```

## VPS 服务器

- [OVH](https://www.ovh.com.au/)
- [Digital Ocean](https://www.digitalocean.com/)
- [Vultr](https://www.vultr.com/)
- [Linode](https://www.linode.com/)
- [Contabo](https://contabo.com/)
- [Scaleway](https://www.scaleway.com/)

## 使用 Docker

如果安装了 Docker，则可以使用它启动验证人节点，而无需要构建二进制文件。您可以使用简单的指令执行:

```sh
$ docker run parity/polkadot:latest --validator --name "name on telemetry"
```
