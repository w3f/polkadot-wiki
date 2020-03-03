---
id: maintain-nominator
title: ผู้เสนอชื่อ (Nominator)
sidebar_label: ผู้เสนอชื่อ (Nominator)
---

ผู้เสนอชื่อ (Nominator) ดูแลความปลอดภัยของรีเลย์เชนโดยการเลือกผู้ตรวจสอบ (Validator) ที่ดีและวางโทเคน DOT เป็นหลักประกัน

คุณอาจมีบัญชีที่มี DOT และต้องการ DOT เพิ่ม คุณสามารถทำได้โดยการเป็นผู้ตรวจสอบ ซึ่งต้องมีโหนดที่ทำงานตลอด 24 ชั่วโมงทุกวัน หากคุณไม่มีโหนดดังกล่าวหรือไม่สนใจที่รันโหนด คุณยังสามารถหารายได้เพิ่มโดยการเสนอชื่อผู้ตรวจสอบท่านอื่น

การทำเช่นนี้ คุณจะกลายเป็นผู้เสนอชื่อสำหรับผู้ตรวจสอบที่คุณเลือก ควรเลือกผู้ตรวจสอบอย่างระมัดระวัง หากพวกเขาทำหน้าที่บกพร่อง พวกเขาจะถูกลงโทษและคุณจะเสีย DOT เช่นกัน

While your DOTs are staked by nominating a validator, they are 'locked' (bonded). You can receive new DOTs in your account but you cannot stake as validator or transfer DOTs away from your account. You can [un-nominate at any time](maintain-guides-how-to-unbond) to unlock your funds. Keep in mind that the un-nomination is effective in the next era.

### Active vs. Inactive Nomination

When you go to the [Account actions](https://polkadot.js.org/apps/#/staking/actions) under staking page, you should see your bonded accounts and nomination status. If not, you can follow [this](maintain-guides-how-to-nominate-kusama) guide to configure it first. Your nominations will be effective in the next era, that means roughly 6 hours on Kusama and 24 hours on Polkadot.

![Nominations](/img/staking/polkadotjs-staking-account-actions.jpg)

Suppose you have nominated five validator candidates, but three out of five were elected to be the active validators, then you should see two of your nominations as inactive. Active nomination means your nominated validators have been elected to be in the active validator set, whereas inactive means they did not get elected.

### Possible effect of inactive nominations on rewards

As long as you have nominated more than one validator candidate and at least one of them got elected, your bonded stake will be fully distributed to the elected validators. That being said, you still will have the chance to get 0 rewards if you nominated very few validator candidates and no one got elected. So it would be safe to choose as many trustworthy validators as you can (up to 16) to reduce the risk of none of your nominated validators being elected.

### What to take into consideration during nominating

![Staking Returns](/img/staking/polkadotjs-staking-returns.jpg)

As a nominator, if you only want to know the profit each validator made for each era, you can go to the [Returns](https://polkadot.js.org/apps/#/staking/returns) section under the staking page by inputting the number of tokens you would like to stake to check it. Then, nominate those who have a higher profit. However, that does not guarantee the right way to evaluate the validators' overall performance.

One example would be if a validator is regularly offline, their nominators most likely would get fewer rewards than others. More importantly, when many validators are [unreachable](learn-staking#unresponsiveness), those nominators who staked with them will be slashed.

![Validator Stats](/img/staking/polkadotjs-staking-validator-stats.jpg)

Thus, to be a smart nominator, it would be better to look at their [histories](https://polkadot.js.org/apps/#/staking/query/CmD9vaMYoiKe7HiFnfkftwvhKbxN9bhyjcDrfFRGbifJEG8) such as blocks produced, rewards and slashes, and [identity](learn-identity) (if they have it set). Moreover, a nominator should do comprehensive research on their validator candidates - they should go over the validators' websites to see who they are, what kind of infrastructure setup they are using, reputation, the vision behind the validator, and more.


### Guides

- [Be a Nominator (Kusama)](maintain-guides-how-to-nominate-kusama) - Guide on nominating on the Kusama canary network.
- [Stop Being a Nominator (all networks)](maintain-guides-how-to-unbond) - Guide on stopping nominations and withdrawing tokens.
