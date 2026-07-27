---
title: How to Participate in Polkadot OpenGov
description: "Polkadot OpenGov allows you to decide on protocol changes and manage its Treasury. Thanks to Polkassembly and Subsquare, this is easy and user-friendly. Learn here how to do it."
---

!!!info "Related Wiki page"
    For the underlying concepts, see [Polkadot OpenGov](../learn-polkadot-opengov.md).

Participating in Polkadot OpenGov allows you to raise your voice on the trajectory of the network protocol and its Treasury. User-friendly interfaces like Polkassembly and Subsquare facilitate the process, offering easy access to discussions, voting on referenda, and monitoring past votes. Whether casting a direct vote or delegating voting power to community members you trust, you can actively contribute to shaping Polkadot's governance with just a few clicks.

This article guides you on the basic functionalities offered by [Polkassembly](https://polkassembly.io/) and [Subsquare](https://www.subsquare.io/).

!!! danger "READ THIS FIRST!"

    The delegations or votes cast for this article are for educational purposes only and do not imply a position for or against any referenda.


### How to use Polkassembly

#### **Create your profile**

[Polkassembly](https://polkassembly.io/) allows you to create a complete profile using any account in your wallet. Under a chosen username, you can comment on referenda or discussions and monitor the status of your past votes.

To create a profile, you must connect your account and sign a raw message to prove ownership.

Once you have finished creating your profile, connect your account again to automatically log in to Polkassembly and manage your Polkadot OpenGov activity.

#### **How to vote**

If you want to vote on any referenda, you'll find it easy to do so from [Polkassembly](https://polkassembly.io/). Follow the steps below to do it:

1\. Go to the page in Polkassembly dedicated to the specific referendum on which you want to vote.

2\. Click the "Cast your vote" button on the right side of the screen.

![](../../assets/how-to/65023337293.png)

3\. Select the account you'd like to vote with. It might be different from the account you used to log in to Polkassembly.

4\. Select the direction of your vote:

  * Aye: Vote in favor of the referendum.
  * Nay: Vote against the referendum.
  * Split: Select the amount of voting power allocated for aye, nay, or abstention.
  * Abstain: Your vote won't be taken into account for the approval of the referendum, but it will increase the [support](../learn-polkadot-opengov.md#approval-and-support) for it.

5\. Enter the amount of tokens you wish to lock. The lockable balance is displayed in the top-right corner. Keep in mind that locks can overlap, allowing the same balance to be used for staking or voting on other referenda.

6\. Select the [voluntary locking period](../learn-polkadot-opengov.md#voluntary-locking-conviction-voting) for your tokens. This factor will multiply your voting power while increasing the locking period.

7\. Once you have entered and reviewed all the required information, click “Confirm" and sign the voting extrinsic with your account from your wallet.

![](../../assets/how-to/65023115500.png)

#### **How to remove and unlock expired votes**

When a referendum ends, the balance you used to vote with remains locked. If you had voted without conviction or with the losing side, you can immediately unlock that balance. Otherwise, the lock expires once the locking period passes.

Once a lock has expired, you can remove the vote and lock. Conveniently, you can perform both actions from your Polkassembly profile.

!!! info

    If you remove your vote on an ongoing referendum, locks applied to that balance can be inmediately removed, regardless of the final outcome of that referendum.

To remove your vote and unlock your balance from Polkassembly, follow the steps below:

1\. Go to your Polkassembly profile.

2\. Go to the “Overview” tab.

3\. On the right side of the screen, you’ll see the “Balance” section, with the option to “Unlock Your Tokens” if the conditions are met. Click on it.

![](../../assets/how-to/65023338235.png)

4\. A new panel will display the unlockable balance and other details regarding the locked balance on ongoing referenda. Click "Unlock tokens," and Polkassembly will generate the batch call with all the necessary information to remove and unlock all possible votes. Sign the transaction with your account, and the locks should be removed from that balance.

![](../../assets/how-to/65023338420.png)

!!! info

    Remember that locks can overlap, so removing a lock on your balance does not remove all other locks that might prevent the balance from becoming transferable.

#### **How to delegate**

Participating in Polkadot OpenGov offers an opportunity to contribute to decisions that will shape the protocol's future or Treasury management. However, you may not always have the time to keep up with the continuous flow of proposals or analyze them all. In such cases, you can delegate your voting power to a trusted member of the community within the selected tracks (e.g., root, big spender, small tipper, etc.).

To delegate your voting power using Polkassembly, follow the steps below:

1\. Hover the mouse over the lateral panel on your left and go to the “[Delegation](https://polkadot.polkassembly.io/delegation)” section.

2\. This section displays the delegation status for each available track. You can filter the tracks where you have delegated or received delegations.

3\. Click on the track where you’d like to delegate your voting power.

![](../../assets/how-to/65023454810.jpeg)

4\. If you have not delegated yet, you'll see a "Delegate" option within the top panel. Click on it.

![](../../assets/how-to/65029070265.png)

!!! warning "ATTENTION"

    Notice that you cannot delegate on tracks where you have non-expired votes on any of its referenda. Remove and unlock expired votes from your Polkassembly profile before delegating on that specific track.

5\. Paste the public address you want to delegate if it’s not prepopulated.

6\. Enter the balance you’d like to delegate.

7\. You can voluntarily lock your votes, increasing your voting power and extending the locking period.

!!! info

    The locking period starts once you initiate the undelegation. It does not matter when you delegate or wheter the delegate voted on any referenda or not.

8\. Add tracks for which you’d like to delegate your voting power.

9\. Click “Delegate” after reviewing everything is correct and sign the transaction from your wallet. And that’s it, you delegated your voting power on Polkadot OpenGov.

![](../../assets/how-to/65023202359.png)

!!! warning "IMPORTANT"

    The duration of the locking period of your balance depends on the conviction lock you chose when you delegated your vote, not the conviction used by your delegate when voting.

    Your delegated balance will always be included to any referenda the delegate votes for with your selected voting power.

#### **How to undelegate**

After delegating your voting power, you can initiate undelegation on any track at any time. Keep in mind that the locking period will begin as soon as you initiate undelegation and will last for a period that depends on the conviction you used when delegating your voting power. Follow the steps below to learn how to undelegate:

1\. Hover the mouse over the lateral panel on your left and go to the “[Delegation](https://polkadot.polkassembly.io/delegation)” section.

2\. In this section, you'll find the delegation status for each available track. You can filter the tracks on which you have already delegated your voting power.

![](../../assets/how-to/65023202363.png)

3\. Click on the track where you’d like to undelegate your voting power.

4\. Additional information about the delegation on the selected track will be displayed. Click "Undelegate" to proceed.

![](../../assets/how-to/65023202364.png)

5\. Review your delegation information and the lockup period. If you agree, click "Undelegate" and sign the transaction from your wallet.

![](../../assets/how-to/65023202389.png)

!!! warning "ATTENTION"

    Once the unlocking period has passed after undelegating, you can unlock your votes by following the Polkadot Wiki article: "[Removing Expired Voting Locks](../learn-guides-polkadot-opengov.md#removing-expired-voting-locks)."

* * *

### How to use Subsquare

[Subsquare](https://www.subsquare.io/) is a complete platform that allows you to engage with the democratic processes across multiple Substrate-based networks. The sections below outline how to participate in Polkadot OpenGov using Subsquare.

#### **Connect your wallet**

You can check the content and status of any proposals without connecting an account. However, any further interaction with Subsquare (e.g., voting, delegation, commenting, etc.) will require you to connect an account from your wallet. Follow the steps below to do so.

1\. Go to [Subsquare.io](https://www.subsquare.io/) and expand the network selector by clicking the "Launch App" button on the top-right corner. Select the network in which you want to participate. This article guides you on Polkadot, but many features are shared on other networks.

![](../../assets/how-to/65023204942.png)2\. Once on the main site, click "Connect".

![](../../assets/how-to/65023205009.png)

3\. From the wallet selection panel, connect with the one controlling your account. Then, choose it from the drop-down menu at the bottom of the panel.

4\. Click "Next," and Subsquare will use the selected account to interact with Polkadot OpenGov.

![](../../assets/how-to/65023340837.png)

#### **How to vote**

Once you have connected your account, you can vote on any ongoing referenda. To do it, follow the simple steps below:

1\. To vote on a referendum, navigate to it by selecting it from "Recent Proposals" or by hovering over the left panel and clicking on the track where the desired referendum is located.

![](../../assets/how-to/65023206546.png)

2\. After selecting a referendum, the right side of the site should display the current voting status. You can click '"Vote" at the bottom of that panel to cast your vote.

![](../../assets/how-to/65023451429.png)

3\. On the following panel, you'll be able to set up your vote. Begin by confirming the voting account.

4\. Select the direction of your vote:

  * Aye: Vote in favor of the referendum.
  * Nay: Vote against the referendum.
  * Split: Select the amount of voting power allocated for aye, nay, or abstention.
  * Abstain: Your vote won't be taken into account for the approval of the referendum, but it will increase the [support](../learn-polkadot-opengov.md#approval-and-support) for it.

5\. Enter the amount of tokens you wish to lock. The "voting balance" is displayed in the top-right corner. Keep in mind that locks can overlap, allowing the same balance to be used for staking or voting on other referenda.

6\. Select the conviction with which you want to vote. This factor will multiply your voting power while increasing the locking period.

7\. Once you have entered and reviewed all the required information, click “Confirm" and sign the voting extrinsic with your account from your wallet.

![](../../assets/how-to/65023206922.png)

#### **How to remove and unlock expired votes**

Once the referenda on which you voted have finished, you can remove and unlock expired votes. You can do it easily in just one extrinsic from Subsquare. Follow the steps below:

1\. Click Overview on the left side of the screen.

2\. Go to the “Account” tab.

3\. In the “Account” tab, you can remove each vote separately by clicking the “X” to the right of each referendum.

4\. You can also remove and unlock all your expired votes by clicking “Clear expired votes.”

![](../../assets/how-to/65023436450.png)

5\. In the “Clear expired votes” panel, you can review the referenda for which votes will be removed and tracks where they’ll be unlocked. Once you have checked the information provided, click “Confirm” and sign the extrinsic from your wallet.

![](../../assets/how-to/65023436509.png)

#### **How to delegate**

Participating in Polkadot OpenGov provides an avenue to contribute to decisive decisions for the protocol's future or Polkadot's Treasury management. However, keeping up with the continuous stream of proposals and analyzing them all may not be feasible. In such instances, you can delegate your voting power to a community member you trust.

You can easily delegate from Subsquare by following the steps below:

1\. Connect your account following the steps in the previous section.

2\. Go to the left panel and click on "[Delegation](https://polkadot.subsquare.io/delegation)."

![](../../assets/how-to/65023248679.png)

3\. In the screen below, you can view the current delegations (A) from your connected account, paste the account address of the delegate (B), or select one from the section at the bottom (C).

![](../../assets/how-to/65023249013.png)

4\. To delegate, paste your delegate's address (B) or select it from the delegates who have shown their interest in being a delegate (C), then click "Delegate."

5\. On the screen below, configure your delegation by selecting the tracks you'd like to delegate on. Note that you can select multiple tracks, and you cannot delegate on tracks where you have non-expired votes or ongoing delegations.

6\. Enter the balance you'd like to delegate from the available "voting balance" on the top-right corner of the panel.

7\. Select the conviction that will be applied to your voting power. This will multiply your voting power and increase the locking period after you undelegate.

8\. After reviewing all set parameters, click "Confirm." Sign with your account, and you're all set!

![](../../assets/how-to/65023249372.png)

#### **How to undelegate**

Undelegating from Subsquare is as easy as delegating. Follow the steps below to undelegate from one or all tracks:

1\. Go to the "[Delegation](https://polkadot.subsquare.io/delegation)" section on the left side of Subsquare.

![](../../assets/how-to/65023249637.png)

2\. Click "Detail" on the bottom-right of the "Delegates" panel.

![](../../assets/how-to/65023249661.png)

3\. In "My Delegation" tab, you'll see your current delegations on different tracks.

4\. Click the "X" at the top of the delegations section to undelegate your voting power in all tracks, or click the "X" next to each track to do it individually.

![](../../assets/how-to/65023249754.png)

5\. Click "Confirm" on the displayed panel, sign the transaction from your wallet, and you're done. Depending on the conviction you delegated with, your balance will be ready to be unlocked once the locking period has passed since you initiated the undelegation.

!!! warning "ATTENTION"

    Once the unlocking period has passed after undelegating, you can unlock your votes by following the Polkadot Wiki article: "[Removing Expired Voting Locks](../learn-guides-polkadot-opengov.md#removing-expired-voting-locks)."

* * *
