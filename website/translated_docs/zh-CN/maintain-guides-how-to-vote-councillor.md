---
id: maintain-guides-how-to-vote-councillor
title: 投票选举议员
sidebar_label: 投票选举议员
---

该议会是经在链上选举产生的账户，旨在代表在 Polkadot / Kusama 被动利益相关者。议会在治理方面有两项主要任务: 提议公投和否决危险或恶意的公投。有关议会的更多信息，请参见[治理页面](learn-governance#council)。本指南将引导您如何在选举议员中投票。

## 投票选举议员

在投票给议员期间，您需要锁定 DOT / KSM。像验证人选举一样，您最多可以提名16个不同的议员，您的选票将在所选组中平均分配。与验证人选举不同，您预留的余额代币没有解除绑定期限。一旦您的投票取消，代币将回复流动性。

> 警告: 当投票给议员时，您有责任不要把全部余额也放在预留余额。最好至少保持_ _几个 KSM 来支付交易费用。

前往到 [ Polkadot Apps ](https://polkadot.js.org/apps)，然后选择 "议会"。在右侧窗口中有两个蓝色按钮，按下 "投票" 按钮。

![](assets/council/vote.png)

由于议会使用了同意投票(Approval Voting)，因此当您进行投票时，您只需要获得投票的支持，就可以验证自己，并因此所投票的代币将被分配给投票中的平均分配。 选择 "赞成(Aye)"，最多可以选择16个候选人。当您选择好后，提交交易。

![](assets/council/vote_for_yourself.png)

当你提交的交易被确认后，您应该在界面看到您的投票结果。

## 取消投票

为了取回预留余额，您需要取消你的投票。仅当您参加完选举并且不再希望预留余额计入您支持的议员后，才可以取消投票。

前往到[ Polkadot Apps ](https://polkadot.js.org/apps)上的 "Extrinsics"。

选择要取消投票的帐户，然后选择 "electionsPhragmen-> removeVoter()" 选项并提交交易。

![](assets/council/remove_vote.png)

当交易被确认在一个区块后，您应该会取回你的预留余额并且在下一届选举，你对任何议员的投票都将不再计算在内。
