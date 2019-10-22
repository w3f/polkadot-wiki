---
id: maintain-guides-how-to-nominate-kusama
title: 成为提名人 (Kusama)
sidebar_label: 成为提名人 (Kusama)
---

## 在非正式发布

当 Kusama 仍处于在非正式发布阶段时，除了抵押之外，大多数功能都被禁用。 这样一来希望有50至100个验证人来注册通过运行[验证人节点](maintain-validator)其保护Kusama 网络。如果您不想做验证人节点，则仍可以通过<em x-id =“ 4”>提名</em>给信誉良好的验证人来获得奖励。 本指南将引导您逐步在非正式发布阶段的操作。

### 第一步: 绑定代币

在非正式发布阶段，您可能只有一个KSM帐户。 这意味着您的<em x-id =“ 4”> stash </em>和<em x-id =“ 4”> controller </em>帐户将是同一帐户。 在正式发布之后，建议在您的 stash 帐户上设置一个新的 controller。

在 [Polkadot UI](https://polkadot.js.org/apps) 前往 "Staking" 标签

在页面左上角点击 "Account Actions"。

按下蓝色 "New Stake" 按键

您将看到一个视窗口，如下所示：

![Bonding](assets/guides/how-to-nominate/polkadot-dashboard-bonding.jpg)

如之前所述，**controller 和 stash 选择为同一个帐户**。

选择 "value bonded" 时，输入一个比您总量 **少**的 KSM 数量，这样，当转帐功能启用后，您还有一些剩余的 KSM 可以转移。 尝试保存至少 500 mKSM，以支付转入新帐户和一些费用。

选择任何您喜欢的付款目的地。 如果您不确定，请选择 "Stash 帐号 (increase amount at stake)"。

### 第二步: 提名验证人

现在您经已绑定了并且最多可以提名16位验证人。请谨慎选择验证人，因为如果您的验证人做出损害网络行为，您抵押中的 KSM 也将被大幅削减。

前往 "Staking Overview" 标签。

当前的权威证明验证人显示在左侧栏中。您不能选择这些验证人。

在右列上，显示为 "next up" 的列表中，您将看到所有表示有兴趣成为 Kusama 一开始的验证人。

从图标中选择一个(或多个)验证人来提名并复制其地址。

![Bonding](assets/guides/how-to-nominate/validators.png)

返回到 "Account Actions" 页面，您将看到绑定的帐户。

按下 "Nominate" 按钮，然后在空白字段中填写所选验证人的地址。

签署并提交交易，您现在经已提名了！

### 第五步：停止提名

在某一刻，您可能决定停止提名一个或多个验证人。

您可以通过按下 "Stop nominating" 按钮来完成此操作，这会将您的帐户设置为* chill *（这意味着您可以不做任何动作）。如果要重新开始提名，只需重新执行在第二步中执行的操作即可！
