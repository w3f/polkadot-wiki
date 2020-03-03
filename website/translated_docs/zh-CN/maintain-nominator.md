---
id: maintain-nominator
title: 提名人
sidebar_label: 提名人
---

提名人通过选择好的验证人和抵押 DOT 来保护中继链。

您的帐户可能拥有 DOT，并希望赚取新的 DOT。您可以作为验证人执行此操作，这需要全天候24小时运行节点。如果您没有这样的节点或不想费心，您仍然可以通过提名另一个验证人来赚取 DOT。

通过这样您就成为选择验证人的提名人。仔细挑选你的验证器人-如果他们有不良的表现，他们将得到惩罚，你也将失去DOT。

通过提名验证人来抵押您的 DOT 时，它们是被 "锁定" (绑定)。你可以在你的帐号接收新的 DOTs，但是您不能作为验证人进行抵押或将 DOTs 转帐出您的帐户。你可以在任何时间选择[取消提名](maintain-guides-how-to-unbond)从而解锁你的资金。请记住取消提名将在下一个时代生效。

### Active vs. Inactive 提名

当你前往到抵押页面的 [Account actions](https://polkadot.js.org/apps/#/staking/actions)，你应该会看到绑定了的帐号和提名状态。如果没有，您可以先跟随[这个](maintain-guides-how-to-nominate-kusama)教程设置。你的提名将会在下一个时代生效即是在 Kusama 上大概6小时而 Polkadot 是24小时。

![Nominations](/img/staking/polkadotjs-staking-account-actions.jpg)

假设你已经提名了5个侯选验证人，但是只有3个当选成为验证人，那你应该会看见有2个提名被标为 inactive。 Active nomination 意思是你提名的验证人成功当选，而 inactive 则是没有成功当选。

### 无效提名对奖励的可能影响

只要你有提名多个一个侯选验证人并且有至少一个当选，你绑定的 DOTs 将会全部抵押到当选的验证人身上。话虽如此，如果你只提名很少侯选验证人并且没有人当选，你仍然有机会没有奖励，所以最安全做法是尽可能提名愈多验证人(最多16)愈好从而减少没有一个当选的风险。

### 提名时要考虑的因素

![Staking Returns](/img/staking/polkadotjs-staking-returns.jpg)

作为提名人，如果你只想知道每个验证人在每个时代的利润，你可以前往抵押页面下的 [ Return ](https://polkadot.js.org/apps/#/staking/returns)部份，输入你将会抵押多少币，之后提名有较高的验证人，但是这并不保证是正确的方法去评估验证人的整体表现。

例子：如果验证人时常不稳定离线，其提名人则有可能获得比其他提名人更少的奖励。更重要的是，当超过一定数量的验证人[没有回应](learn-staking#unresponsiveness)时，所有提名他的人也会被 slash。

![Validator Stats](/img/staking/polkadotjs-staking-validator-stats.jpg)

所以作为一个聪明的提名人，最好是会查看验证人的[历史](https://polkadot.js.org/apps/#/staking/query/CmD9vaMYoiKe7HiFnfkftwvhKbxN9bhyjcDrfFRGbifJEG8)例如创造区块，rewards and slashes 和[身份](learn-identity)(如果他们有设置)。另外提名人应对其候选验证人进行全面研究例如前往他们的网页查看一下他们是怎么样的团队，使用什么架构，声誉，验证人背后的愿景等等。


### 指南

- [提名人指南 (Kusama)](maintain-guides-how-to-nominate-kusama)- 如何在 Kusama 金丝雀网络上进行提名。
- [停止作为提名人(所有网络)](maintain-guides-how-to-unbond) - 停止提名和提取币的指南。
