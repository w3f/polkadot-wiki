---
id: maintain-guides-how-to-unbond
title: Unbonding and Rebonding
sidebar_label: Unbonding and Rebonding
---

The following describes how to stop nominating or validating and retrieve your tokens. Please note that all networks on which you can nominate have a delayed exit period, called the _unbonding period_, which serves as a cooldown. You will not be able to transfer your tokens before this period has elapsed.

### 第1步：停止提名

On the [Polkadot-JS Apps](https://polkadot.js.org/apps) navigate to the "Staking" tab.

在页面左上角点击 "Account Actions"。

Here, click "Stop Nominating" or "Stop Validating" (depending on your role) on an account you're staking with and would like to free the funds for.

![Stop Nominating Button](/img/NPoS/unbond1.png)

After you confirm this transaction, your tokens will remain _bonded_. This means they stay ready to be distributed among nominees or used as validator self-stake again. To actually withdraw them, you need to unbond.

### 第2步：取消绑定

要取消绑定，请点击您要取消其资金绑定的帐户旁边的图标，然后选择 "Unbond funds"。

![Unbonding](/img/NPoS/unbond2.png)

选择您要取消绑定的金额，然后单击 "Unbond"，然后确认交易。

![Unbonding all](/img/NPoS/unbond3.png)

如果成功，您的余额将显示为 "unbonding"，并显示还剩余多少区块，你就会完全解锁该数量。

![Unbonding duration](/img/NPoS/unbond4.png)

该持续时间会因您所使用的网络而异，在 Kusama 上的速度通常是 Polkadot 上速度的四倍。

完成此过程后，您将必须发出另一笔交易: 提取已解绑的代币。 然后您的可转出余额将会增加刚解除绑定的代币数量。

## Rebonding before the end of the unbonding period

If you want to rebond your tokens before the unbonding period is over you can do this by issuing a `rebond` extrinsic. This allows you to bond your tokens that are still locked without waiting until the end of the unbonding period.

In order to do this you will need to issue an extrinsic manually from [Polkadot-JS Apps](https://polkadot.js.org/apps).

Go to the "Extrinsics" option that's located in the "Developer" dropdown in the top menu.

![extrinsic menu](assets/rebonding-1.png)

Select the "staking" pallet and the "rebond" extrinsic. Enter the amount of tokens that are currently locked in unbonding that you want to rebond. Then click "Submit Transaction".

![confirm](assets/rebonding-2.png)

Confirm the transaction in the next pop-up. Once the transaction is included in the next block your tokens will be rebonded again and you can start staking with them.
