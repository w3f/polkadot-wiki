---
id: maintain-guides-democracy
title: 参与民主权利
sidebar_label: 参与民主权利
---

公投议院是在 Polkadot 和 Kusama 中实例的三个链上治理机构之一。其它两个机构是[议会](maintain-guides-how-to-join-council)和[技术委员会](learn-governance#technical-committee)。

任何代币持有人只要绑定他们的币，他们也可以提出公投和投票。当议案提交后，其它人如果同意，他们可以通过绑定同一数量的币作_支持_该议案。在经过一段时段后，最多人支持的议案将会进入下一步全民投票。投票人可以把他们的币锁定更长的时间来换取更大的投票权重。详情关于治理系统请看[这里](learn-governance)。

这个指南将会指引代币持有人如何在 Kusama 上实现的民主权利模块提交和在公投上投票。

## 重要参数

使用民主权利模块进行投票时要注意的重要参数如下:

**Launch Period** - 新的公民投票多久才开始。

**Voting Period** - 公投的投票时间。

**Emergency Voting Period** -快速紧急公投的最少投票时间。

**Minimum Deposit** - 公投提案的最低保证金。

**Enactment Period** - 锁定资金的最短期限以_及_提案被批准和颁布之间的期限。

**Cooloff Period** - 否决之后在一段时间内可能无法重新提交 (以区块为单位)。

## 提出议案

提出议案需要要求您绑定一些代币。为了确保您有足够的代币来提交，您可以在链状态下检查该参数。

在 Polkadot 程序上，你可以在"民主权利"的标签提交新的议案。为了提交议案，你将会需要提交一个称为 preimage 的哈希。 Preimage 的哈希只是需要执行议案的哈希。最简单取得 preimage 的哈希是通过按下 "Submit preimage" 并且设置你将会提交的议案。

例如: 你想提交一个议案是 "Dave" 的帐户拥有10个代币，你的议案将会像下图一样。 Preimage 哈希会是 ` 0xa50af1fadfca818feea213762d14cd198404d5496bca691294ec724be9d2a4c0` 你可以复制那个 preimage 哈希并且储存用作下一步。尽管你可以在这一步提交 Preimage，但是我们将会留在下一个部份。

![submit preimage](assets/democracy/submit_preimage.png)

现在你按下 "Submit proposal" 并且在 "preimage hash" 里输入 preimage 哈希和储入_至少_数量的 "locked balance" 。再按下 "Submit proposal" 和确认交易。之后你应该看到你的议案显示在 "proposals" 页面上。

![submit proposal](assets/democracy/submit_proposal.png)

现在任何人访问该链都可以看到您的提案，其他人可以支持你的提案或提交 preimage。但是，由于该提案只显示了其哈希值，因此很难说出该提案的确切功能。其它人将无法判断他们是否赞成，除非有人提交了该提案的实际 preimage。在下一步，您将提交 preimage。

![proposals](assets/democracy/proposals.png)

## 提交 Preimage

The act of making a proposal is split from submitting the preimage for the proposal since the storage cost of submitting a large preimage could be pretty expensive. Allowing for the preimage submission to come as a separate transaction means that another account could submit the preimage for you if you don't have the funds to do so. It also means that you don't have to pay so many funds right away as you can prove the preimage hash out-of-band.

但是，在提案通过之前的时候，您将需要提交 preimage，否则提案将无法生效。 现在将向您展示如何执行此操作。

按下 "Submit preimage" 和设置成在你之前取得的 preimage 哈希。这次您将继续操作并按下 "Submit preimage" 并确认交易，而不是将哈希复制到另一个选项。

![submit preimage](assets/democracy/submit_preimage.png)

当交易被确认后，您应该会看到包含您已提交议案的 UI 更新了信息 。

![proposals updated](assets/democracy/proposals_updated.png)

## 支持议案

支持该议案意味着您同意该提案并且会存入同一样数量的币锁起来。通过支持该议案使它会排到更高的位置。背后最多币支持的议案 (不是最多人支持)将会在每个投票期间成为公投。

若支持该议案，前往到该议案并按下 "Second"。

![second button](assets/democracy/second_button.png)

系统将提示您该提案的完整详细信息 (如果 preimage 已提交!)，然后可以通过按下 "Second" 提交交易。

![second confirm](assets/democracy/second_confirm.png)

一旦成功，您将会在下拉菜单中看到您支持该提案的详细信息。

![second result](assets/democracy/second_result.png)

## 议案投票

在每个启动投票期之前时，支持最多的提案将移至全民投票。在此期间，您可以对提案投赞成票或反对票。在这个时侯您可以对该提案投赞成票或反对票。你也可以锁上你的币更长一点时间来换取投票权重更多一点。在这个时侯你的币将会是锁上，所以你也不能够转帐它。但是你仍然可以之后的投票。锁币是彼此层叠，意思是如果你在一星期后再投另一个提案，你不会变成需要锁15星期。而只是将锁延长1星期。

若要参与公投，前往到 [在 Polkadot 程序的 "民主权利" 标签](https://polkadot.js.org/apps/#/democracy/)。任何生效中的公投也会显示在 "referenda" 中。按下 "Vote" 为公投投票。

如果您想对该提案投赞成票，请选择 "Aye, I approve" 选项。 如果您想对公投中的提案投反对票，您将选择 "Nay, I do not approve"。

第二个选项是选择您对此票的信念。您愿意锁币的时间越长，投票权重就越大。不愿意锁币意味着您的投票只占您持有的代币的10％，而最多锁256天意味着您可以让您的投票占您拥有的币的600％。

如果您对所做出的决定感到满意，请按下 "Vote" 以提交您的交易，并等待其交易被包含到区块中。

![voting](assets/democracy/voting.png)

## 委托投票

如果您太忙而无法跟上即将举行的公投并投票，可以选择将您的投票委托给您信任其意见的另一个帐户。当您委托到另一个帐户，该帐户将获得您所拥有的币的附加投票权。委派的方式与正常投票的方式一样，只不过您的代币锁定时间可能比通常时间长，因为当您取消投票时锁定重置。

委派的帐户在委派到后不会采取任何特殊行动。他们可以继续就他们认为合适的公投进行投票。不同的是，现在当民主权利系统统计选票时，委托代币现在被添加到授权人所做的任何投票中。

您可以将投票委托给另一个帐户，甚至可以对委托附加 "Conviction"。 前往到Polkadot Apps上的 "Extrinsics" 标签，然后选择 "民主权利" 和 "delegate" 选项。 这意味着您正在访问民主权利模块并选择要发送的委托交易类型。您的委托人将计入您委托进行投票的帐户，直到您明确撤消投票为止。

在第一个输入，选择要委派给的帐户，在第二个选择投票時想要的投票權重(倍數愈高即鎖幣時間愈長)。请记住，更高的倍數意味着您的投票将被锁定更长的时间。 因此請明智地选择！

![delegate](assets/democracy/delegate.png)

当你提交了委托交易后，你可以在 "Chain State" 里选择 "democracy" 和 "delegations" 选项中核对一下。 您将看到类似于以下的信息，显示您已将投票权委派给的地址。

![delegate state](assets/democracy/delegate_state.png)

## 取消委托投票

您可能在日后某个时候决定将委派删除到目标帐户。在这种情况下，根据您在委派开始时的设置，您的代币将被锁定为最长时间。例如如果选择 "2x" 委派进行四周的锁定时间，则代币将在发送 `undelegate` 交易后锁定 4 周。一旦你的投票被取消授权，你将可以再次用它进行投票。您可以开始直接投票，或选择其它帐户作为您的代表。

`undelegate`交易必须从您要清除其委托的帐户发送。例如如果 Alice 委托了 Bob, Alice 需要使用她自己的帐户提交 `undelegate`交易清除其委托。

最简单的方法是从 Polkadot 程序的 "Extrinsics" 选项。 选择 "democracy" 和 "undelegate" 交易。 确保您是从要清除委托的帐户发送交易。 按 "Submit transaction" 并确认。

![undelegate](assets/democracy/undelegate.png)

## 代理

代理可用于代表 Stash 帐户进行投票。与委派不同，代理是打算作为一个长期帐户，使所有投票决定持有不同账户的资金。委派是一个合乎逻辑的行动， 采取当你信任另一个帐户的判断，而代理是一个更建议的安全做法，以保护您的资金安全和使用主动低资金的帐户。

### 设置代理

设置代理只涉及提交一个交易，交易类型 "setProxy" 来自 "democracy" 模块。

您可以从 Polkadot Apps 通过前往到 "Extrinsics" 选项并选择 "democracy" 和 "setProxy" 交易类型进行此交易。将交易从 "Stash" 帐户发送，该账户持有您要使用的资金，目标将发送到负责投票的账户。在下面的示例中，"Alice Stash" 是代理 "Alice"，以便 Alice 可以代表 Alice Stash 投票。

![set proxy](assets/democracy/set_proxy.png)

### 代理投票

代表 Stash 进行投票需要 `proxyVote` 交易。发送此交易时，您将指定正在公投投票的索引以及判决(即"Aye"以获得批准或"Nay"拒绝)。

![proxy vote](assets/democracy/proxy_vote.png)

### 移除代理

在某个时候您可能想要移除代理，无法为 stash 账户投票。 这可以通过提交 `removeProxy` 交易从 stash 帐户中提交该交易，针对代理帐户。

![remove proxy](assets/democracy/remove_proxy.png)

### 移除代理

如果代理帳戶想把它的代理狀態移除為不同的 stash 帳戶，這是可通過提交 `resignProxy` 交易完成。 只需调用該代理帐户來提交交易及其所有代理职责将會被删除。

![resign proxy](assets/democracy/resign_proxy.png)
