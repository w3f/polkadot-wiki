---
id: learn-nominator
title: Nominator
sidebar_label: Nominator
---

Nominators secure the Relay Chain by selecting good validators and staking DOT.

You may have an account with DOT and want to earn fresh DOT. You could do so as validator, which
requires a node running 24/7. If you do not have such node or do not want to bother, you can still
earn DOT by nominating another validator.

By doing so, you become a nominator for the validator(s) of your choice. Pick your validators
carefully - if they do not behave properly, they will get slashed and you will lose DOT as well.

While your DOT are staked by nominating a validator, they are 'locked' (bonded). You can receive new
DOT in your account but you cannot stake as validator or transfer DOT away from your account. You
can [un-nominate at any time](maintain-guides-how-to-unbond) to stop staking your funds. Keep in
mind that the un-nomination is effective in the next era, and that un-nominating does not
automatically unbond your funds. There is an unbonding period of 7 days on Kusama and 28 days on
Polkadot before bonded funds can be transferred.

### Active vs. Inactive Nomination

When you go to the [Account actions](https://polkadot.js.org/apps/#/staking/actions) under staking
page, you should see your bonded accounts and nomination status. If not, you can follow
[this](maintain-guides-how-to-nominate-kusama) guide to configure it first. Your nominations will be
effective in the next era, that means roughly 6 hours on Kusama and 24 hours on Polkadot.

![Nominations](assets/staking/polkadotjs-staking-account-actions.jpg)

Suppose you have nominated five validator candidates, and three out of five were elected to the
active validator set, then you should see two of your nominations as "waiting", and most likely one
as "active" and the rest as "inactive". Active or inactive nomination means your nominated
validators have been elected to be in the validator set, whereas waiting means they did not get
elected. Generally, you will only have a single validator have an active nomination, which means
that you are directly supporting it with your stake this era and thus potentially receiving staking
rewards. Every era, a new election will take place and you may have be assigned a different active
nomination from among the validators you have selected.

If you are committing a very large amount of stake, then you may have more than one active
nomination. However, the election algorithm attempts to minimize this situation, and it should not
occur often. See the [section on Phragmén optimization](learn-phragmen#optimizations) for more
details.

### Oversubscribed Validators

Validators can only pay out to 64 nominators per era. If more than 64 nominators nominate the same
validator, it is "oversubscribed", and only the top 64 staked nominators (ranked by amount of stake)
are paid rewards. Other nominators will receive no rewards for that era, although their stake will
still be used to calculate entry into the active validator set.

Although it is difficult to determine exactly how many nominators will nominate a given validator in
the next era, one can estimate based on the current number of nominators. A nominator with only 5
nominators in this era, for instance, is unlikely to have more than 64 in the next era. An
already-oversubscribed validator with 100 nominators this era, however, is much more likely to be
oversubscribed in the next era as well.

### Possible effect of inactive nominations on rewards

As long as you have nominated more than one validator candidate and at least one of them got
elected, your bonded stake will be fully distributed to one or more validators. That being said, you
still will have the chance to get 0 rewards if you nominated very few validator candidates and no
one got elected, or your stake is small and you only selected oversubscribed validators. It is
generally wise to choose as many trustworthy validators as you can (up to 16) to reduce the risk of
none of your nominated validators being elected.

### What to take into consideration during nominating

![Staking Returns](assets/staking/polkadotjs-staking-returns.jpg)

As a nominator, if you only want to know the profit each validator made for each era, you can go to
the [Targets](https://polkadot.js.org/apps/#/staking/targets) section under the staking page by
inputting the number of tokens you would like to stake to check it. Then, nominate those who have a
higher profit. However, that does not guarantee the right way to evaluate the validators' overall
performance.

One example would be if a validator is regularly offline, their nominators most likely would get
fewer rewards than others. More importantly, when many validators are
[unreachable](learn-staking#unresponsiveness), those nominators who staked with them will be
slashed.

![Validator Stats](assets/staking/polkadotjs-staking-validator-stats.jpg)

Thus, to be a smart nominator, it would be better to query their
[histories](https://polkadot.js.org/apps/#/staking/query/) to see statistics such as blocks
produced, rewards and slashes, and [identity](learn-identity) (if they have it set). Moreover, a
nominator should do comprehensive research on their validator candidates - they should go over the
validators' websites to see who they are, what kind of infrastructure setup they are using,
reputation, the vision behind the validator, and more.

> These concepts have been further explained in the
> [Why Nominate on Polkadot & Kusama video](https://www.youtube.com/watch?v=weG_uzdSs1E&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=4)
> and
> [What to Consider when Nominating Validators on Polkadot and Kusama](https://www.youtube.com/watch?v=K-a4CgVchvU&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=9)
> and
> [Nominating/Staking on Polkadot and Kusama](https://www.youtube.com/watch?v=NYs9oWAbzbE&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=14)

### Guides

- [Be a Nominator (Polkadot)](maintain-guides-how-to-nominate-polkadot) - Guide on nominating on the
  Kusama canary network.
- [Stop Being a Nominator (all networks)](maintain-guides-how-to-unbond) - Guide on stopping
  nominations and withdrawing tokens.
