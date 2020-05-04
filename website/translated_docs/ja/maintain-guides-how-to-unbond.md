---
id: maintain-guides-how-to-unbond
title: Stop Being a Nominator
sidebar_label: Stop Being a Nominator
description: The full process of how to stop being a nominator in order to unlock and withdraw your tokens for sending or selling.
---

The following describes how to stop nominating and retrieve your tokens. Please note that all networks on which you can nominate have a delayed exit period, called the _unbonding period_, which serves as a cooldown. You will not be able to transfer your tokens before this period has elapsed.

### Step 1: Stop Nominating

On the [Polkadot UI](https://polkadot.js.org/apps) navigate to the "Staking" tab.

On this tab click on the "Account Actions" tab at the top of the screen.

Here, click "Stop Nominating" on an account you're nominating with and would like to free the funds for.

![Stop Nominating Button](/img/NPoS/unbond1.png)

After you confirm this transaction, your tokens will remain _bonded_. This means they stay ready to be distributed among nominees again. To actually withdraw them, you need to unbond.

### Step 2: Unbonding an amount

To unbond the amount, click the little gear icon next to the account you want to unbond money for, and select "Unbond funds".

![Unbonding](/img/NPoS/unbond2.png)

Select the amount you wish to unbond and click Unbond, then confirm the transaction.

![Unbonding all](/img/NPoS/unbond3.png)

If successful, your balance will show as "unbonding" with an indicator of how many more blocks remain until the amount is fully unlocked.

![Unbonding duration](/img/NPoS/unbond4.png)

This duration will vary depending on the network you're on and will typically be four times as fast on Kusama as it is on Polkadot.

Once this process is complete, you will have to issue another, final transaction: Withdraw Unbonded. Then, your transferrable balance will increase by the amount of tokens you've just fully unbonded.