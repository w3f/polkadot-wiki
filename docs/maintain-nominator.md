---
id: maintain-nominator
title: Nominator
sidebar_label: Nominator
---

Nominators secure the relay chain by selecting good validators and staking DOTs.

You may have an account with DOTs and want to earn fresh DOTs. You could do so as validator, which requires a node running 24/7. If you do not have such node or do not want to bother, you can still earn DOTs by nominating another validator.

By doing so, you become a nominator for the validator of your choice. Pick your validator carefully - if they do not behave properly, they will get slashed and you will lose DOTs as well.

While your DOTs are staked by nominating a validator, they are 'locked' (bonded). You can receive new DOTs in your account but you cannot stake as validator or transfer DOTs away from your account. You can [un-nominate at any time](maintain-guides-how-to-unbond) to unlock your funds. Keep in mind that the un-nomination is effective in the next era.

### What does active/inactive nomination mean?

When you go to the [Account actions](https://polkadot.js.org/apps/#/staking/actions) under staking page, you should see your bonded accounts and nomination
status. If not, you can follow [this](maintain-guides-how-to-nominate-kusama) guide to configure it first. Your nominations will be effective in the next era, that means roughly 6 hours on Kusama and 24 hours on Polkadot.

![Nominations](/img/staking/polkadotjs-staking-account-actions.jpg)

Suppose you have nominated five validator candidates, but 3 out of 5 were elected to 
be the active validators then you should see 2 of your nominations are inactive. Active nomination means your nominated validators have been elected to be the active validator, whereas inactive means not get elected. 

### What does inactive nominations could affect your rewards?

As long as you have nominated more than one validator candidates and have at least one of them got elected, your bonded stake will be fully distributed to the elected validators. That being said, you still will have the chance to get 0 rewards if you nominated very few validator candidates and no one got elected. So it would be safe to to choose as many trustworthy validators as you can (up to 16) to reduce the risk of getting nothing happened.

### What you should take into consideration during nominating? 

![Staking Returns](/img/staking/polkadotjs-staking-returns.jpg)

As a nominator, if you only want to know the profit of each validator has been made for each era, you can go to the [Returns](https://polkadot.js.org/apps/#/staking/returns) section under staking page by inputting the number of tokens you would like to stake to check it. And then nominate those who have a higher profit. However, that does not mean the right way to evaluate the validators' performance in overall.

One example would be like if a validator regularly offline, their nominators most likely would get fewer rewards than the others. More importantly, when there are more than certain percentages of validators are [unreachable / unresponsiveness](learn-staking#unresponsiveness), those nominators who staked to the offline validators will be slashed (including validator itself).

![Validator Stats](/img/staking/polkadotjs-staking-validator-stats.jpg)

Thus, to be a smart nominator, it would be better to look at their [histories](https://polkadot.js.org/apps/#/staking/query/CmD9vaMYoiKe7HiFnfkftwvhKbxN9bhyjcDrfFRGbifJEG8) such as blocks produced, rewards & slashes and identity (if they have set) as well. Blocks produced means how many blocks they have been created for each era, while rewards & slashes indicate the total amount of tokens they have earned in each era. 
[Identity](learn-identity) is usually used to know who is behind running the validator. 
Moreover, you should do deep-dive research on the underlying validator candidates such as go over their websites to see who they are, what kind of infrastructure setup they are using, reputation, the vision behind the validator, and many more. 

To sum things up, instead of just by looking at the single indicator, combining with all these information together could form a more comprehensive metrics to evaluate the validators' capability.

### Guides

- [Be a Nominator (Kusama)](maintain-guides-how-to-nominate-kusama) - Guide on nominating on the Kusama canary network.
- [Stop Being a Nominator (all networks)](maintain-guides-how-to-unbond) - Guide on stopping nominations and withdrawing tokens.
