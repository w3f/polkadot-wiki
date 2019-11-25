---
id: maintain-guides-how-to-validate-kusama
title: 成为验证人 (Kusama)
sidebar_label: 成为验证人 (Kusama)
---

本指南将指导您如何在 Kusama 网络上设置验证人节点。

## 首先

在主网上运行验证人有很大的责任！你不仅要对自己抵押的 KSM 负责， 还有目前提名你的提名人抵押。如果你犯了一个错误并且被削减，你的钱和声誉 将处于危险之中。但是运行验证人也有非常可观的回报，您为安全性做出了贡献，使网络更分散。

由于安全性对运行验证人至关重要，因此您最好看一下[设定安全验证人](maintain-guides-secure-validator) 资料使您了解在构建网络架构时要考虑的要素。 Web3 基金会也 会保持更新[安全验证人设置的参考](https://github.com/w3f/polkadot-secure-validator)使您也可以自己部署来使用。随着您成为验证人愈长时间，您可能使用此库作为自己的_起点_进行修改和自定义。

如果您需要帮助，请在[Kusama 验证人聊天室](https://riot.im/app/#/room/#KusamaValidatorLounge:polkadot.builders) 发问。(而中文朋友可以在微信群找 anson) 团队和其他验证人在那里帮助回答问题并提供协助。如果您还有更重要的建议，您可以在[ Kusama论坛](https://forum.kusama.network)提交。

**警告: ** 验证人抵押中的 KSM 都有可能遭到大幅削减(惩罚)，这意味着不安全或设置不当可能会导致 KSM 丢失！ 如果您对运行验证人节点的能力不太确定，那最好建议把您的KSM 提名给你信任的验证人节点。

## 初始设置

### 要求

您可以选择任何你喜欢我[ VPS ](#vps-list)服务器以及任何操作系统。在本指南中我们将使用** Ubuntu 18.04 ** ，但其它系统的设定也应类似。

您并不需要非常强大的电脑运行验证人，但是您应该意识到资源限制。验证人节点最重要的资源是网络带宽，其次是存储和内存功能。对运行验证人节点的计算机最低要求如下:

- **存储:** 40GB - 80GB。 Kusama 对存储空间的要求不是很高，因此这范围经已可以满足所需要的要求，请记住如果链的存储持续增加，则可能需要稍后对其进行升级。
- **内存:** 2GB - 8GB。2GB 实际上是运行验证人最低的要求，小于 2GB 会使构建时间更长。 为了有更好性能，您可以将其提高到 4GB 或 8GB。
- ** 中央处理器:** 1 - 2。一个 CPU 是可以，但是2个更好。 同样地这是一种性能偏好。

在大多数云服务提供商中，这些规格通常在每月 10 到 20 美元之间。

### 安装 Rust

选择云端服务供应商并设置新服务器后，第一件您要做的事就是安装 Rust。

如果您从未安装过 Rust，则应先执行此指令。该指令将下载最新版本的 Rust 并 安装。

```sh
curl https://sh.rustup.rs -sSf | sh
```

相反如果您已经安装了 Rust，请运行以下指令以确保您使用的是最新版本。

```sh
rustup update
```

最后运行此指令以安装必要的相关依赖，以编译和运行 Kusama 节点。

```sh
sudo apt install make clang pkg-config libssl-dev build-essential
```

注意 - 如果您使用的是 OSX，并且已安装[ Homebrew ](https://brew.sh)，则可以执行以下指令而不是之前的指令：

```sh
brew install cmake pkg-config openssl git llvm
```

### 生成和安装 `polkadot `

您需要从[ paritytech/polkadot ](https://github.com/paritytech/polkadot) GitHub 库的** v0.6 **分支中构建 ` polkadot ` 二进制文件。

> 注意：如果您喜欢使用 SSH 而不是 HTTPS，则可以将下面的第一行替换为 `git clone git@github.com:paritytech/polkadot.git`。

```sh
git clone https://github.com/paritytech/polkadot.git
cd polkadot
git checkout v0.6
./scripts/init.sh
cargo build --release
```

这一步将需要一段时间（通常需要 15 - 30 分钟，具体取决于您的硬件）。

如果您想在本地生成密钥，您还可以在同一目录安装` subkey `。 然后您可以把生成好的` subkey `可执行文件，并将其转移到与世隔绝的电脑中，以提高安全性。

```sh
cargo install --force --git https://github.com/paritytech/substrate subkey
```

### 同步链数据

> **注意：**验证人节点必须以 archive 模式同步以避免被惩罚。如果您已经同步好，您必须首先运行` polkadot purge-chain `删除之前的数据库，然后确保使用` --pruning=archive `运行 Polkadot。

#### 第一次运行 Kusama 网络

如果您没有在 Kusama CC1 上运行的验证人，则可以通过执行以下指令开始同步：

```sh
./target/release/polkadot --pruning=archive
```

#### 之前 Kusama CC1 的验证人

在同步 CC2 链数据之前，您需要将以前的 keystore 复制到新的链 Id，以便使用先前设置的 session 密钥。 如果您不这样做，您需要再次生成 session 密钥并设置。

Kusama CC1 和 Kusama CC2 具有不同的默认数据目录，通常位于基于 Linux 上的` 
 $HOME/.local/share/polkadot/chains `目录中。 例如 Kusama CC1 默认目录为` $HOME/.local/share/polkadot/chains/ksma/keystore `，而 CC2 密钥位于` $HOME/.local/share/polkadot/chains/ksmcc2/keystore `。

首先开始同步节点并退出节点客户端，这样做您可以轻松生成 CC2 的默认 keystore。

```sh
./target/release/polkadot
# 待启动数秒后，它会创建数据资料夹，之后再按下 `ctrl-c`。
```

现在您可以使用以下指令将旧的 session 密钥复制到新的 CC2 keystore 中：

```sh
cp -r $HOME/.local/share/polkadot/chains/ksma/keystore $HOME/.local/share/polkadot/chains/ksmcc2/keystore
```

如果 keystore 是空，则意味着节点没有在 CC1 链中创建密钥。 解决此问题最好的方法是调用 ` author_rotateKeys ` RPC 并确保将调用指向到您的 验证人节点(而不是 Polkadot JS 默认的连接 或 其它节点)。 在提交` setKeys `交易之前，请验证密钥是否在新的 CC2 keystore 中。在下面的[部分](#generating-session-keys)中查看更多信息。

把 keystore 复制到新链的目录后，密钥将会注入到节点的内存中。为此您可以使用 ` author_insertKey `方法生成：'babe'，'gran'，'imon' 和 ' para' 四种类型的密钥。您可以通过 ` rotateKeys ` RPC 调用，把这些 keys 映射到 keystore 中。它们将按照以下 struct 声明的顺序连接：

```rust
pub struct SessionKeys {
    #[id(key_types::GRANDPA)]
    pub grandpa: GrandpaId,
    #[id(key_types::BABE)]
    pub babe: BabeId,
    #[id(key_types::IM_ONLINE)]
    pub im_online: ImOnlineId,
    #[id(parachain::PARACHAIN_KEY_TYPE_ID)]
    pub parachain_validator: parachain::ValidatorId,
}
```

> **注意:** session 密钥在共识中是很关键，因此如果不确定节点是否有执行 ` setKeys ` 具有设定好的 session 密钥，最简单方法是生成和设置多一次，使用下面 ` rotateKeys ` 方法。小心驶得万年船！

启动您的节点。

```sh
./target/release/polkadot --pruning=archive
```

根据当时链的大小，此一步可能需要几分钟到几个小时不等。

如果您想估计还需要再多少时间，服务器日志（在 ` polkadot ` STDOUT 程序中显示）显示了您的节点已处理和最新验证的区块。 然后您可以与[ Telemetry ](https://telemetry.polkadot.io/#list/Kusama%20CC2)或当前 [ PolkadotJS 区块链浏览器](https://polkadot.js.org/apps/#/explorer)比较。

> **注意:** 如果您还没有 KSM，您只能做到这一步，直至升级到 PoS 之后。您仍然可以运行节点，但是因为在非正式发布期间轉帳是不能使用，所以您需要少数量 KSM 才能继续操作。 在 NPoS 开始之前，即使有 KSM 的人也只能表达他们_有意_成为验证人，他们现在是无法成为验证人。

## 绑定 KSM

在非正式发布期间，由于转帐不能使用，所以您需要将 Controller 和 Stash 帐户设置为 相同的帐户。如果您有两个帐户同时也有 KSM，建议的做法仍然是把 Controller 和 Stash 分开成不同的帐户。当网络升级到 PoS 后，您可以重新设置 Controller，使二个帐户分隔开。

确保不要绑定所有 KSM，因为在 Kusama CC2 最新代码中不允许使用绑定的 KSM 作支付交易费用。

现在是时候设置我们的验证人了。 我们将执行以下操作：

- 绑定 Stash 帐户的KSM。 这些抵押中的 KSM 是为了保护网络的安全，并可以大幅削减(惩罚)。
- 选择 Controller，Controller 是决定何时开始或停止验证的帐户。

首先，进入[ Staking ](https://polkadot.js.org/apps/#/staking/actions)部分。按下"Account Actions"，然后再按 "New stake" 按钮。

![dashboard bonding](assets/guides/how-to-validate/polkadot-dashboard-bonding.jpg)

- **Stash account** -选择 Stash 账户。在这个例子我们会绑定 100 milliKSMs - 确保你的 Stash 帐户拥有_至少_这个数量。当然你也可以绑定更多。
- **Controller account** - 选择你之前创建的 Controller 帐号。此帐户也需要少量 KMS 才能开始和停止验证。
- **Value bonded** - How much KSM from the Stash account you want to bond/stake. Note that you do not need to bond all of the KSM in that account. Also note that you can always bond _more_ KSM later. However, _withdrawing_ any bonded amount requires the duration of the unbonding  period. On Kusama, the unbonding period is 7 days. On Polkadot, the planned unbonding period is 28 days.
- **Payment destination** - 把奖励发送到那个帐戶，详情请看[这里](https://wiki.polkadot.network/en/latest/polkadot/learn/staking/#reward-distribution)。

当所有资料填写好后，使用 Stash 帐号按下`Bond`并签署交易。

几秒钟后您应该看到 "ExtrinsicSuccess" 信息。 现在您应该会看到包含所有帐户的新卡 (注意：您可能需要重新整理页面)。 右侧的保证金金额对应于 Stash 的绑定帐户。

## 设置 Session 密钥

同步好节点后，按下 Ctrl-C 停下节点。使用` archive ` 模式开始运行验证人。

```sh
./target/release/polkadot --validator --name "name on telemetry" --pruning=archive
```

您可以为验证者人改任何名称，但其他人也可以看到。该名称也会显示在 telemetry 服务器里。由于多人也在使用 telemetry，因此建议您的名称尽可能独特一点。

### 生成 Session 密钥

您需要通过签名并提交交易设定 Session 密钥。这就是用来与您的验证节点和 Controller 帐户连接起来。

#### 第一个选项: PolkadotJS-APPS

您可以使用客户端通过 RPC 生成[ Session 密钥](https://wiki.polkadot.network/en/latest/polkadot/learn/keys/#session-key)。 如果执行此操作，确保已将 PolkadotJS-Apps 浏览器连接到验证人节点。 您可以在 "Settings" 标签中将应用程序设置连接到验证人的地址。如果您连接到 Web3 Foundation 的 Parity 托管的地址，则不能使用此方法，因为向该节点发出 RPC 请求是_公开节点_上托管的 keystore，因此您需要确认正在与_您的节点_的 keystore 连接。

一旦确定已连接到节点，最简单为节点设置 session 密钥的方法是调用 ` author_rotateKeys ` RPC 请求在验证人的 keystore 中创建新密钥。前往到工具箱选项卡并调用 RPC，然后选择 author > rotateKeys() 选项并记住保存回传结果。

![Explorer RPC call](assets/guides/how-to-validate/polkadot-explorer-rotatekeys-rpc.jpg)

#### 第二个选项: CLI

如果您在远程服务器上，运行此指令在同一台电脑上会更容易(当节点是运行中并且配置默认HTTP RPC 端口):

```sh
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' http://localhost:9933
```

结果将是十六进制编码的 "result"。這结果是四个公钥的合并。保存结果供后续使用。

### 提交` setKeys `交易

您需要通过签名并提交交易设定你的 Session 密钥。 这就是把您的 Controller 帳戶与验证人连接起来。

前往 [ Stake > Account Actions](https://polkadot.js.org/apps/#/staking/actions)，然后在您先前生成的绑定(Stash)帐户。 按下 "Set Session Key" 之后输入之前在` author_rotateKeys `的结果。

![staking-change-session](assets/guides/how-to-validate/set-session-key-1.jpg) ![staking-session-result](assets/guides/how-to-validate/set-session-key-2.jpg)

提交交易，现在您可以开始验证了。

## 验证

要核实您的节点是否处于运行状态并已同步，前往[Telemetry](https://telemetry.polkadot.io/#list/Kusama%20CC1) 并找您的节点。注意: 这里显示 Kusama 网络上的所有节点，因此拥有一个独一无二的名字很重要。

如果一切看起来顺利，请继续操作，在 Polkadot UI 中按下 "Validate"。

![dashboard validate](assets/guides/how-to-validate/polkadot-dashboard-validate.jpg) ![dashboard validate](assets/guides/how-to-validate/polkadot-dashboard-validate-modal.jpg)

- **Payment preferences** - 验证人会先取下这里设定的奖励，余下那些将会与提名你的人按比例分配。

按下 "Validate"。

前往 Staking 页面，你应该看到所有在网络中运行的验证人和所有侯选验证人节点。在最顶部份，你会看到有多少验证人位置空缺和有多少人有意成为验证人。

![staking queue](assets/guides/how-to-validate/polkadot-dashboard-staking-queue.jpg)

您的节点将会在 *next up* 队列显示，在[非正式发表发布](#soft-launch)期间，era 是不会改变和你的节点将会保持在等待队列中直至转换成 PoS 网络运行验证人算法。

**升级 PoS 后:** 验证人竞选在每个 era 也会重新运行。当下一个 era 如果有位置空缺并且您的节点成功成为验证人，您的节点将会正式成为验证人。在此之前它将停留在 _next up_队列中。如果您的节点沒有成功成为验证人，它将会一直停留在_ next up _队列中排队。你不需要重新启动它。但是为了成为验证人，你可能需要增加抵押 KSM 的数量或寻找提名人支持你的节点。

## 非正式发布

当 Kusama 启动时，它将成为一个权威证明(Proof-of-Authority) 网络，由 Web3 Foundation 运行节点。當具有足够的 _next up_ 队列（50-100 个验证人）之后，网络将升级到 PoS 并允许验证人根据其抵押竞选成为验证人。

**恭喜你!** 如果你有按照以上步骤操作，你经已设定好 Kusama 网络的验证人！若果你需要帮助，请前往 [Kusama 论坛](https://forum.kusama.network/) 或 [Kusama 验证人聊天室](https://riot.im/app/#/room/#KusamaValidatorLounge:polkadot.builders)。

## 常见问题

### 为什么我无法同步链？

![zero-peer](assets/guides/how-to-validate/polkadot-zero-peer.jpg)

确保 libp2p 端口 `30333` 打开，可能需要一点时间发现网络上其它的 peers。

### 如何清除链的所有数据？

```sh
./target/release/polkadot purge-chain
```

## 云端服务器

* [OVH](https://www.ovh.com.au/)
* [Digital Ocean](https://www.digitalocean.com/)
* [Vultr](https://www.vultr.com/)
* [Linode](https://www.linode.com/)
* [Contabo](https://contabo.com/)
* [Scaleway](https://www.scaleway.com/)

## 使用 Docker

如果安装了 Docker，则可以使用它启动验证人节点，而无需要构建二进制文件。您可以使用简单的指令执行：

```sh
$ docker run parity/polkadot:v0.5.0 --validator --name "name on telemetry"
```
