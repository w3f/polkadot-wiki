---
title: Why Can't I Transfer My DOT?
description: "There are a couple of reasons why you might not be able to transfer your DOT. In this article we examine the most common reasons and what you can do."
---

!!!info "Related Wiki page"
    For the underlying concepts, see [Transactions](../learn-transactions.md).

There are a couple of reasons why you might not be able to transfer your DOT. In this article, we examine the most common of them, but if you encounter a situation not covered by this article or have any questions, feel free to [contact us](https://docs.polkadot.com/get-support/).

* * *

### Most common errors when transferring DOT

Your account can have different types of balances, more specifically, transferable, frozen, and reserved. Only the transferable balance can be sent out of your account. Your frozen and reserved balance can't be moved. But it can be made transferable if or when the locks are removed or the reasons for the reserves cease to exist. To learn more about the different types of balance, please check [this article](https://paritytech.github.io/polkadot-support/getting-started/basics/polkadot-account-balances-and-locks), and to learn how to remove locks and make your balance transferable, please watch the video at the end of the article.

If transferring funds resulted in a failed extrinsic, these are the most common errors and how to solve them:

  * **NotExpendable** : Withdrawing these funds would cause an unwanted loss from your account. If you intend to send all your funds to the destination, use an extrinsic like 'transfer_all' or 'transfer_allow_death'.

  * **Frozen** : The funds you are trying to send are currently locked by another process, such as staking, voting, or similar activities. Please remove the lock and try again.

Another possibility is that you're trying to empty your account of an asset that holds the [existential deposit](existential-deposit.md), while other non-sufficient assets remain. These assets would be destroyed if they are not transferred first.

  * **BelowMinimum** : The account cannot exist with the amount you are trying to send. This usually happens when you attempt to send less than the [existential deposit](existential-deposit.md) to an empty account. You must send an amount exceeding the network's existential deposit, or ensure the destination account is already active.

  * **FundsUnavailable** : The amount you are trying to send exceeds your transferable balance. Keep in mind that transaction fees are deducted from your remaining balance. If you want to send your full balance, use an extrinsic like 'transfer_all' that accounts for fees.



* * *

In the following video, we dive a little deeper into the various locks that can exist on your balance and how to remove them to make your balance transferable again:

[Learn How You Can Free Funds - Deep Dive into Polkadot's Locks](https://www.youtube.com/watch?v=LHgY7ds_bZ0)

* * *
