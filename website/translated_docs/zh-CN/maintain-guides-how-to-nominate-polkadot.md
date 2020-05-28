---
id: maintain-guides-how-to-nominate-polkadot
title: 提名人指南
sidebar_label: 提名人指南
---

> 以下信息适用于当前处于非正式发布的 Polkadot 网络。 在非正式发布期间，网络在转换为权益证明(PoS) 之前先作为权威证明网络 (PoA) 启动。 您将可以按照本指南设置验证人，但是直到正式发布以后才开始第一次验证人选举和奖励。 如果您想在 Kusama 上成为提名人，请查看[Kusama 指南](mirror-maintain-guides-how-to-nominate-kusama)。

提名人是 Polkadot 抵押子系统的一种参与者。 他们负责将会参与抵押中的代币分配给第二种参与者的验证人。 通过抵押他们的代币，他们能够选举活跃的验证人并分享抵押所支付的奖励。

当[ 验证人 ][]是网络中的活跃参与者，他们参与了出区和最终确定。 在提名机制中，提名者通过 "一劳永逸" 的方法承担着更为被动的角色。 成为提名人不需要运行自己的节点或担心在线运行时间。 但是好的提名人会对他们选出的验证人进行尽职调查。 在寻找要提名的验证人时，提名人应注意自己提名特定验证人的报酬百分比-以及如果验证人被惩罚，他们也有被惩罚的风险。

# 设置 Stash 和 Controller 密钥

建议提名人设置单独的 stash 帐户和 controller 帐户。 Wiki 的[密钥][]部分详细说明了为此生成不同帐户的理由。

您可以通过 [帐户生成][]页上详细介绍的任何推荐方法来生成 stash 和 controller 帐户。

# 使用 Polkadot UI

### 第一步: 绑定您的代币

> 注意：由于 Polkadot 在 PoA 阶段验证人选举尚未开始，因此以下大多数信息在这阶段不会完全出现。

在 [Polkadot UI](https://polkadot.js.org/apps) 前往 "Staking" 标签

"Staking Overview" 小节将向您显示所有生效的验证人及其信息 - 他们的身份，为他们抵押的 DOT 数量，其自己所提供的抵押数量，佣金，现时获得的时代积分收益和最后出块的区块。如果你点击图表按钮，您将进入该验证人的 "Validator Stats" 页面，该页面向您显示有关验证人 的抵押，奖励和惩罚的更多详细历史信息。

"Account actions" 小节([链接](https://polkadot.js.org/apps/#/staking/actions))可让您抵押并提名。

"Payouts" 小节（[链接](https://polkadot.js.org/apps/#/staking/payouts)）可让您领取抵押所获得的奖励。

"Targets" 小节([链接](https://polkadot.js.org/apps/#/staking/targets)) 将帮助您估算收入，这是个不错的起点选择你喜欢的验证人。

"Waiting" 小节 ([链接](https://polkadot.js.org/apps/#/staking/waiting)) 列出了所有等待更多提名成为验证人的等待队列。验证人将一直在等待队列，直到他们有足够的DOT支持（通过[ Phragmen 选举机制](https://wiki.polkadot.network/docs/en/learn-phragmen)分配)。 如果验证人从未得到足够的支持，很可能会在队列中保留很长时间。

"Validator Stat" 的子部分（[链接](https://polkadot.js.org/apps/#/staking/query)）允许您查询验证人的 stash 地址并查看历史记录例如每个时代所获得的分数，当选时的抵押数量，奖励和惩罚。

选择 "Account Actions"，然后点击灰色 "+ Nominator" 按钮。

您将看到一个如下所示的窗口:![nominator-update-1](assets/nominator-update-1.png)

输入** 少于 **您拥有 DOTs 的总量到 "value bonded"，这样您就剩下一些代币来支付交易费用。交易费用目前大约为 0.01 DOTs，但是交易费用是动态根据包括最近区块的负载在内的多种因素。

还要注意帐号回收阈值— 帐号必须保留在最低金额，以免帐号被销毁。 这个金额在 Polkadot 中为 0.01 DOT，所以建议在您的帐号中至少保留 0.1 DOT 以便保持账号安全。

选择适合您的付款目的地。 如果不确定，则可以选择 "Stash 帐号 (increase amount at stake)"，将奖励累积到抵押中的帐号。

### 第二步: 提名验证人

您现在已经完成了绑定。完成绑定表示您的代币已被锁定，如果您提名的验证人有过失行为，该绑定的代币有可能被[惩罚(削减)](learn-staking#slashing) 。所有绑定资金现在可以分配给最多16个验证人。如果你提名的验证人恶意攻击网络，你也会被惩罚，所以请谨慎选择验证人。

在已绑定的帐号上点击 "Nominate"，您将看到另一个弹出窗口，要求您选择最多16个验证人。 尽管您最多可以选择16个验证人，但是由于 \[Phragmen\] \[\] 选举算法的缘故，您参与抵押的代币可能会以不同的比例分散到部份或全部 您选择的任何验证人中。

![Nominating validators](/img/NPoS/nominate.png)

选择它们，确认交易，然后完成 - 您现在已成功提名。 您的提名将在下一个时代生效。 每个时代在 Polkadot 上是二十四小时-根据您执行此操作的时间，您的提名可能会立即生效，或者您可能必须等待整整二十四个小时才能生效。 您可以在[ Staking 页面](https://polkadot.js.org/apps/#/staking)中查看当前 Polkadot 时代的距离。

假设您的提名中至少有一个最终成为有效的验证人，您将开始获得分配给您的奖励。 为了领取它(即将奖励添加到您的帐户中)，您必须手动领取它们。有关更多详细信息，请参见 Staking Wiki 页面的[领取奖励](learn-staking#claiming-rewards)部分。

### 第三步：停止提名

在某个时候，您可能决定停止提名多个验证人。 您可以随时更改您提名的人，但除非您取消绑定，否则您不能撤回您的代币。详细说明见 [此处](maintain-guides-how-to-unbond)

# 使用命令行 (CLI)

除了使用 Polkadot-JS Apps 参与抵押，您还可以在 CLI 中完成所有这些操作。 CLI 方法使您无需进入 Polkado-JS Apps 即可与 Polkadot 网络进行交互。

### 第一步: 安装 @polkadot/api-cli

我们假设您已安装了 [NodeJS 与 npm](https://nodejs.org)。运行以下指令安装 `@polkadot/api-cli` ：

```bash
npm install -g @polkadot/api-cli
```

### Step 2. Bond your DOT

运行以下命令:

```bash
polkadot-js-api --seed "MNEMONIC_PHRASE" tx.staking.bond CONTROLLER_ADDRESS NUMBER_OF_TOKENS REWARD_DESTINATION --ws WEBSOCKET_ENDPOINT
```

`CONTROLLER_ADDRESS`: 您要绑定到 stash 帐号的地址。 Stash 和 Controller 可以是相同的地址，但是不建议这样设定，因为它破坏了两个帐号抵押模型的安全性。

`NUMBER_OF_TOKENS`:: 您想抵押到网络的 DOT 数量。

> **注意**：DOT 具有十二个小数位，并且始终以结尾为零的整数表示。 因此 1 DOT = 1,000,000,000,000 单位

`REWARD_DESTINATION`:

- `Staked` - 支付到 Stash 帐号，相应地增加抵押中金额。
- `Stash` - 支付到 stash 帐号，而不增加到抵押中的金额。
- `Controller` - 付款到 Controller 帐号。

例子:

```bash
polkadot-js-api --seed "xxxx xxxxx xxxx xxxxx" tx.staking.bond DMTHrNcmA8QbqRS4rBq8LXn8ipyczFoNMb1X4cY2WD9tdBX 1000000000000 Staked --ws wss://kusama-rpc.polkadot.io/
```

Result:

```bash
...
...
    "status": {
      "InBlock": "0x0ed1ec0ba69564e8f98958d69f826adef895b5617366a32a3aa384290e98514e"
    }
```

您可以使用[ Polkascan ](https://polkascan.io/pre/kusama)中的` InBlock `的值来检查交易状态。另外您可以在 PolkadotJS Apps 上的[ Staking ](https://polkadot.js.org/apps/#/staking/actions)页面下验证绑定状态。

### 第三步: 提名验证人

要提名验证人，您可以执行以下指令:

```bash
polkadot-js-api --seed "MNEMONIC_PHRASE" tx.staking.nominate '["VALIDATOR_ADDRESS"]' --ws WS_ENDPOINT
```

```bash
polkadot-js-api --seed "xxxx xxxxx xxxx xxxxx" tx.staking.nominate '["CmD9vaMYoiKe7HiFnfkftwvhKbxN9bhyjcDrfFRGbifJEG8","E457XaKbj2yTB2URy8N4UuzmyuFRkcdxYs67UvSgVr7HyFb"]' --ws wss://kusama-rpc.polkadot.io/
```

几秒钟后，您应该看到交易的哈希值，并且如果您想验证提名状态，也可以在 PolkadotJS UI 上进行检查。

[ 验证人 ]: maintain-guides-how-to-validate-kusama
[密钥]: learn-keys#controller-and-stash-keys
[帐户生成]: learn-account-generation
