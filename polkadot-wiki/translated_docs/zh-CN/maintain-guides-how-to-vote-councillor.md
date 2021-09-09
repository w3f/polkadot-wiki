---
id: maintain-guides-how-to-vote-councillor
title: 投票给选举议员
sidebar_label: 投票给选举议员
---

议会是经在链上选举产生的账户，旨在代表在 Polkadot / Kusama 被动利益相关者。议会在治理方面有两项主要任务: 提议公投和否决危险或恶意的公投。有关议会的更多信息，请参见[治理页面](learn-governance#council)。本指南将引导您如何在选举议员中投票。

## 投票给选举议员

Voting for councillors requires you to lock 5 DOT on Polkadot or 0.0083 KSM on Kusama for the duration of your vote.

> Warning: If your balance is vesting, you cannot use unvested tokens for this lock. You will have to wait until you have at least that many **free** tokens to vote.

Like the validator elections, you can approve up to 16 different councillors and your vote will be equalized among the chosen group. Unlike validator elections, there is no unbonding period for your reserved tokens. Once you remove your vote, your tokens will be liquid again.

> Warning: It is your responsibility not to put your entire balance into the reserved value when you make a vote for councillors. It's best to keep _at least_ enough DOT/KSM to pay for transaction fees.

Go to the [Polkadot-JS Apps Dashboard](https://polkadot.js.org/apps) and click on the "Council" tab. On the right side of the window there are two blue buttons, click on the one that says "Vote."

![](assets/council/vote.png)

Since the council uses approval voting, when you vote you signal which of the candidates you approve of and your voted tokens will be equalized among the selected candidates. Select up to 16 council candidates by moving the slider to "Aye" for each one that you want to be elected. When you've made the proper configuration submit your transaction.

![](assets/council/vote_for_yourself.png)

You should see your vote appear in the interface immediately after your transaction is included.

## 取消投票

In order to get your reserved tokens back, you will need to remove your vote. Only remove your vote when you're done participating in elections and you no longer want your reserved tokens to count for the councillors that you approve.

Go to the "Governance" > "Council" tab on the [Polkadot-JS Apps Dashboard](https://polkadot.js.org/apps).

Under the "Council overview" tab, click on "Vote".

![](assets/council/polkadotjs_removeVoter.png)

Issue the "Unvote all" option.

When the transaction is included in a block you should have your reserved tokens made liquid again and your vote will no longer be counting for any councillors in the elections starting in the next term.
