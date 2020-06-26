---
id: maintain-guides-how-to-unbond
title: 停止成为提名人
sidebar_label: 停止成为提名人
---

下面介绍如何停止提名和取回代币。 请注意您可以提名的所有网络都有一个延迟的退出期，称为<em x-id =“ 4”>解除绑定期</em>，这是个冷却时间。 在此期限过后，您将无法转让代币。

### 第1步：停止提名

在 [Polkadot UI](https://polkadot.js.org/apps) 前往 "Staking" 标签

在页面左上角点击 "Account Actions"。

在这里，点击您要提名并希望腾出资金的帐户上的 "Stop Nominating"。

![Stop Nominating Button](/img/NPoS/unbond1.png)

确认此交易后，您的代币将保持_绑定_。 这意味着他们随时准备再次分配给被提名人。 要撤回它们，您需要取消绑定。

### 第2步：取消绑定

要取消绑定，请点击您要取消其资金绑定的帐户旁边的图标，然后选择 "Unbond funds"。

![Unbonding](/img/NPoS/unbond2.png)

选择您要取消绑定的金额，然后单击 "Unbond"，然后确认交易。

![Unbonding all](/img/NPoS/unbond3.png)

如果成功，您的余额将显示为 "unbonding"，并显示还剩余多少区块，你就会完全解锁该数量。

![Unbonding duration](/img/NPoS/unbond4.png)

该持续时间会因您所使用的网络而异，在 Kusama 上的速度通常是 Polkadot 上速度的四倍。

完成此过程后，您将必须发出另一笔交易: 提取已解绑的代币。 然后您的可转出余额将会增加刚解除绑定的代币数量。
