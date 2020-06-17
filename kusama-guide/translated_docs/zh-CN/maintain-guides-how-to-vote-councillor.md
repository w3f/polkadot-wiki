---
id: maintain-guides-how-to-vote-councillor
title: 投票选举议员
sidebar_label: 投票选举议员
---

The council is an elected body of on-chain accounts that are intended to represent the passive stakeholders of Polkadot and/or Kusama. The council has two major tasks in governance: proposing referenda and vetoing dangerous or malicious referenda. For more information on the council, see the [governance page](learn-governance#council). This guide will walk you through voting for councillors in the elections.

## 投票选举议员

Voting for councillors requires you to lock your DOTs / KSMs for the duration of your vote. Like the validator elections, you can approve up to 16 different councillors and your vote will be equalized among the chosen group. Unlike validator elections, there is no unbonding period for your reserved tokens. Once you remove your vote, your tokens will be liquid again.

> Warning: It is your responsibility not to put your entire balance into the reserved value when you make a vote for councillors. It's best to keep _at least_ a few KSM to pay for transaction fees.

Go to the [Polkadot Apps Dashboard](https://polkadot.js.org/apps) and click on the "Council" tab. On the right side of the window there are two blue buttons, click on the one that says "Vote."

![](assets/council/vote.png)

Since the council uses approval voting, when you vote you signal which of the validators you approve of and your voted tokens will be equalized among the selected candidates. Select up to 16 council candidates by moving the slider to "Aye" for each one that you want to be elected. When you've made the proper configuration submit your transaction.

![](assets/council/vote_for_yourself.png)

当你提交的交易被确认后，您应该在界面看到您的投票结果。

## 取消投票

In order to get your reserved tokens back, you will need to remove your vote. Only remove your vote when you're done participating in elections and you no longer want your reserved tokens to count for the councillors that you approve.

前往到[ Polkadot Apps ](https://polkadot.js.org/apps)上的 "Extrinsics"。

Choose the account you want to remove the vote of and select the "electionsPhragmen -> removeVoter()" options and submit the transaction.

![](assets/council/remove_vote.png)

When the transaction is included in a block you should have your reserved tokens made liquid again and your vote will no longer be counting for any councillors in the elections starting in the next term.
