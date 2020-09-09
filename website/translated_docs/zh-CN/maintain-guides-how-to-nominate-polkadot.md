---
id: maintain-guides-how-to-nominate-polkadot
title: How to Nominate on Polkadot
sidebar_label: How to Nominate on Polkadot
---

> The following information applies to the Polkadot network. If you want to nominate on Kusama, check out the [Kusama guide](mirror-maintain-guides-how-to-nominate-kusama) instead.

提名人是 Polkadot 抵押子系统的一种参与者。 他们负责将会参与抵押中的代币分配给第二种参与者的验证人。 通过抵押他们的代币，他们能够选举活跃的验证人并分享抵押所支付的奖励。

当[ 验证人 ][]是网络中的活跃参与者，他们参与了出区和最终确定。 在提名机制中，提名者通过 "一劳永逸" 的方法承担着更为被动的角色。 成为提名人不需要运行自己的节点或担心在线运行时间。 但是好的提名人会对他们选出的验证人进行尽职调查。 在寻找要提名的验证人时，提名人应注意自己提名特定验证人的报酬百分比-以及如果验证人被惩罚，他们也有被惩罚的风险。

## Setting up Stash and Controller keys

建议提名人设置单独的 stash 帐户和 controller 帐户。 Wiki 的[密钥][]部分详细说明了为此生成不同帐户的理由。

您可以通过 [帐户生成][]页上详细介绍的任何推荐方法来生成 stash 和 controller 帐户。

## Using Polkadot UI

### 第一步: 绑定您的代币

在 [Polkadot UI](https://polkadot.js.org/apps) 前往 "Staking" 标签

The "Staking Overview" subsection will show you all the active validators and their information - their identities, the amount of DOT that are staking for them, amount that is their own provided stake, how much they charge in commission, the era points they've earned in the current era, and the last block number that they produced. If you click on the chart button it will take you to the "Validator Stats" page for that validator that shows you more detailed and historical information about the validator's stake, rewards and slashes.

"Account actions" 小节([链接](https://polkadot.js.org/apps/#/staking/actions))可让您抵押并提名。

"Payouts" 小节（[链接](https://polkadot.js.org/apps/#/staking/payouts)）可让您领取抵押所获得的奖励。

"Targets" 小节([链接](https://polkadot.js.org/apps/#/staking/targets)) 将帮助您估算收入，这是个不错的起点选择你喜欢的验证人。

The "Waiting" subsection ([link](https://polkadot.js.org/apps/#/staking/waiting)) lists all pending validators that are awaiting more nominations to enter the active validator set. Validators will stay in the waiting queue until they have enough DOT backing them (as allocated through the [Phragmén election mechanism](https://wiki.polkadot.network/docs/en/learn-phragmen)). It is possible validator can remain in the queue for a very long time if they never get enough backing.

"Validator Stat" 的子部分（[链接](https://polkadot.js.org/apps/#/staking/query)）允许您查询验证人的 stash 地址并查看历史记录例如每个时代所获得的分数，当选时的抵押数量，奖励和惩罚。

选择 "Account Actions"，然后点击灰色 "+ Nominator" 按钮。

您将看到一个如下所示的窗口:![nominator-update-1](assets/nominator-update-1.png)

Select a "value bonded" that is **less** than the total amount of DOT you have, so you have some left over to pay transaction fees. Transaction fees are currently around 0.01 DOT, but they are dynamic based on a variety of factors including the load of recent blocks.

还要注意帐号回收阈值— 帐号必须保留在最低金额，以免帐号被销毁。 这个金额在 Polkadot 中为 0.01 DOT，所以建议在您的帐号中至少保留 0.1 DOT 以便保持账号安全。

选择适合您的付款目的地。 如果不确定，则可以选择 "Stash 帐号 (increase amount at stake)"，将奖励累积到抵押中的帐号。

> These concepts have been further explained in Polkadot's [UI Walkthrough Video](https://www.youtube.com/watch?v=mNStMPZjiHM&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8)

### 第二步: 提名验证人

您现在已经完成了绑定。完成绑定表示您的代币已被锁定，如果您提名的验证人有过失行为，该绑定的代币有可能被[惩罚(削减)](learn-staking#slashing) 。所有绑定资金现在可以分配给最多16个验证人。如果你提名的验证人恶意攻击网络，你也会被惩罚，所以请谨慎选择验证人。

Click on "Nominate" on an account you've bonded and you will be presented with another popup asking you to select up to 16 validators. Although you may choose up to 16 validators, due to the \[Phragmén\]\[\] election algorithm your stake may be dispersed in different proportions to any subset or all of the validators your choose.

![Nominating validators](/img/NPoS/nominate.png)

选择它们，确认交易，然后完成 - 您现在已成功提名。 您的提名将在下一个时代生效。 每个时代在 Polkadot 上是二十四小时-根据您执行此操作的时间，您的提名可能会立即生效，或者您可能必须等待整整二十四个小时才能生效。 您可以在[ Staking 页面](https://polkadot.js.org/apps/#/staking)中查看当前 Polkadot 时代的距离。

假设您的提名中至少有一个最终成为有效的验证人，您将开始获得分配给您的奖励。 为了领取它(即将奖励添加到您的帐户中)，您必须手动领取它们。有关更多详细信息，请参见 Staking Wiki 页面的[领取奖励](learn-staking#claiming-rewards)部分。

### 第三步：停止提名

在某个时候，您可能决定停止提名多个验证人。 您可以随时更改您提名的人，但除非您取消绑定，否则您不能撤回您的代币。详细说明见 [此处](maintain-guides-how-to-unbond)

## Using Command-Line Interface (CLI)

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

> **Note**: DOT has ten decimal places and is always represented as an integer with zeroes at the end. So 1 DOT = 10,000,000,000 units.

`REWARD_DESTINATION`:

- `Staked` - 支付到 Stash 帐号，相应地增加抵押中金额。
- `Stash` - 支付到 stash 帐号，而不增加到抵押中的金额。
- `Controller` - 付款到 Controller 帐号。

例子:

```bash
polkadot-js-api --seed "xxxx xxxxx xxxx xxxxx" tx.staking.bond DMTHrNcmA8QbqRS4rBq8LXn8ipyczFoNMb1X4cY2WD9tdBX 1000000000000 Staked --ws wss://rpc.polkadot.io
```

Result:

```bash
...
...
    "status": {
      "InBlock": "0x0ed1ec0ba69564e8f98958d69f826adef895b5617366a32a3aa384290e98514e"
    }
```

You can check the transaction status by using the value of the `InBlock` in [Polkascan](https://polkascan.io/polkadot-cc1). Also, you can verify the bonding state under the [Staking](https://polkadot.js.org/apps/#/staking/actions) page on the PolkadotJS Apps Dashboard.

### 第三步: 提名验证人

要提名验证人，您可以执行以下指令:

```bash
polkadot-js-api --seed "MNEMONIC_PHRASE" tx.staking.nominate '["VALIDATOR_ADDRESS"]' --ws WS_ENDPOINT
```

```bash
polkadot-js-api --seed "xxxx xxxxx xxxx xxxxx" tx.staking.nominate '["CmD9vaMYoiKe7HiFnfkftwvhKbxN9bhyjcDrfFRGbifJEG8","E457XaKbj2yTB2URy8N4UuzmyuFRkcdxYs67UvSgVr7HyFb"]' --ws wss://rpc.polkadot.io
```

几秒钟后，您应该看到交易的哈希值，并且如果您想验证提名状态，也可以在 PolkadotJS UI 上进行检查。

[ 验证人 ]: maintain-guides-how-to-validate-kusama
[密钥]: learn-keys#controller-and-stash-keys
[帐户生成]: learn-account-generation
