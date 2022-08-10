---
id: maintain-guides-how-to-vote-councillor
title: Voting for Councillors
sidebar_label: Voting for Councillors
description: Steps on how to vote for councillors.
keywords: [council, vote, councillors]
slug: ../maintain-guides-how-to-vote-councillor
---

The council is an elected body of on-chain accounts that are intended to represent the passive
stakeholders of Polkadot and/or Kusama. The council has two major tasks in governance: proposing
referenda and vetoing dangerous or malicious referenda. For more information on the council, see the
[governance page](../learn/learn-governance.md#council). This guide will walk you through voting for
councillors in the elections.

## Voting for Councillors

Voting for councillors requires you to reserve 
{{ polkadot: ~20.064 DOT :polkadot }}{{ kusama: ~0.067 KSM :kusama }} as a base amount
and an amount per vote {{ polkadot: ~0.032 DOT :polkadot }}{{ kusama: ~0.00011 KSM :kusama }}. You can then bond whatever amount you wish to put 
behind your vote. See the [democracy guide](maintain-guides-democracy.md) for more information.

:::info Voting and staking locks can overlap

* A user can use staked funds to vote for Councillors (and/or use those funds in referenda).
* A user is only prohibited from transferring these funds to another account.

:::

:::warning 

If your balance is vesting, you cannot use unvested tokens for this lock. 
You will have to wait until you have at least that many **free** tokens to vote.

:::

Like the validator elections, you can approve up to 16 different councillors and your vote will be
equalized among the chosen group. Unlike validator elections, there is no unbonding period for your
reserved tokens. Once you remove your vote, your tokens will be liquid again.


:::warning

It is your responsibility not to put your entire balance into the reserved value when you
make a vote for councillors. It's best to keep *at least* enough DOT/KSM to pay for transaction
fees.

:::

Go to the [Polkadot-JS Apps Dashboard](https://polkadot.js.org/apps) and click on the "Council" tab.
On the right side of the window there are two blue buttons, click on the one that says "Vote."

Since the council uses approval voting, when you vote you signal which of the candidates you approve
of and your voted tokens will be equalized among the selected candidates. Select up to 16 council
candidates by moving the slider to "Aye" for each one that you want to be elected. When you've made
the proper configuration submit your transaction.

You should see your vote appear in the interface immediately after your transaction is included.

## Removing your Vote

In order to get your reserved tokens back, you will need to remove your vote. Only remove your vote
when you're done participating in elections and you no longer want your reserved tokens to count for
the councillors that you approve.

Go to the "Governance" > "Council" tab on the
[Polkadot-JS Apps Dashboard](https://polkadot.js.org/apps).

Under the "Council overview" tab, click on "Vote".

![](../assets/council/polkadotjs_removeVoter.png)

Issue the "Unvote all" option.

When the transaction is included in a block you should have your reserved tokens made liquid again
and your vote will no longer be counting for any councillors in the elections starting in the next
term.
