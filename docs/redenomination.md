---
id: redenomination
title: Redenomination of DOT
sidebar_label: Redenomination of DOT
---

> Note: The DOT redenomination is taking place on 21st August, now to be known as Denomination Day,
> at block #1,248,328. This block will happen in Europe's early afternoon, China's evening and
> America's morning.

While [DOT](learn-dot) is the base unti of currency on Polkadot, the smallest unit is called the
Planck. You can think of the Planck's relation to DOT as the relation of Satoshi to Bitcoin. Before
21st August the DOT was denominated as 10e12 Planks, that is twelve decimal places. After this date
the DOT is denominated as 10e10 Plancks, that is ten decimal places.

The change in denomination, henceforth referred to as the _redenomination_, was voted on by the
community of DOT holders. The community decided between four options, to change the DOT denomination
by a factor of ten, one hundred, one thousand, or not at all. The end result was to change the
denomination by a factor of one hundred.

The overall effect of this change was that the amount of Polkadot's smallest unit, the Planck,
remained constant, while DOT balance for all holders was increased by a factor of one hundred. As
one can see from the code block below, the same base unit remained the same throughout the system,
with the real change being the social consensus around where to put the decimal place when we talk
about what constitutes a DOT.

```
   Before the change the decimal was here
   v
  1.000000000000 DOT

  100.0000000000 DOT
     ^
     After the change the decimal is here
```

## Origins

The initial vote for redenomination occurred as a [referendum][referendum 52] on the Kusama
blockchain. The referendum was summarized as having four effects if approved by KSM holders.

> - The total allocations of DOTs will increase one hundred times from 10 million to 1 billion.
> - DOT allocation balances will increase by a factor of one hundred, such that 1 DOT will be 100
>   DOTs.
> - The distribution of DOTs does not change, and holders of DOTs still own an equal share of the
>   network as before the change.
> - The precision of DOT will change from 12 decimal places to 10 decimal places.
> - The main benefit of this change is to avoid using small decimals when dealing with DOT and to
>   achieve an easier calculation system.

The initial referendum was proposed prior to the Polkadot genesis block under the assumption that
making a redenomination would be simpler before the Polkadot chain was live. However, many in the
community pointed out the disconnect of the two networks and how it was unfair for holders of DOT to
be impacted by a vote by a different token holder set. For this reason, the Web3 Foundation [decided
to make a new vote on Polkadot][blog 1] when it went live, although the Kusama vote ended with a
majority in favor of the redenomination change.

A bolded quote from the Foundation read:

> However, given the non-negligible amount of opposition, including from some within the ranks of
> Web3 Foundation and Parity, **the Foundation decided that we cannot, in good faith, sponsor
> redenomination at present.**

## The Vote

After the genesis block of Polkadot was created and the network was running with a decentralized
community of validators securing the network, Web3 Foundation decided to put the redenomination
topic up to a vote again. This time, the vote was explicitly binding - meaning that it would be
executed if voted through. In comparison, the vote on Kusama was of course non-binding, being at
best a way to capture of a signal without a direct way to affect the Polkadot chain.

Due to the feedback received during the Kusama referendum, the Polkadot vote was to be held in an
approval vote style, with four available options. DOT holders could issue votes for any
configuration of the four options: no change, a change of 10x, a change of 100x, or a change of
1000x. The vote logic was contained in a specially-built Substrate pallet that was included in
Polkadot's runtime for this specific purpose.

The important notes of the Polkadot vote are as follows:

> - Any combination of the four options may be approved of by the voter. There is no need to select
>   only one option!
> - Approving of all or none of the options is equivalent and will not affect the outcome.
> - All voters may alter their votes any number of times prior to the close of the poll.
> - Voting costs nothing other than the transaction fee and can be done from all accounts with a
>   non-zero spendable balance. (If you managed to lock up all of your funds in staking to the point
>   that none is left for transacting and you would like to vote, please contact a representative of
>   the Web3 Foundation.)
> - Locked funds (e.g. for staking) are counted.
> - No discretionary lock-voting is in place; all DOT used to vote counts the same.
> - Voting is made on a per-account basis; a single account must all vote the same way and cannot
>   split its vote.
> - This vote does not affect any economics of the Polkadot platform. Staking rewards, inflation,
>   effective market capitalization and the underlying balances of every account remain completely
>   unchanged. It is “merely” about what units we use to denominate the balances into “DOT” for the
>   purpose of display.

With a voting period of two weeks set- the redenomination was now in the hands of the Polkadot
community for a final, binding decision.

## The Outcome

![redenomination](assets/redenomination.png)

After two weeks of voting, the results of the redenomination vote were tallied. With around
one-third of the total DOTs of the network having cast a vote, the redenominaton proposal passed
with 86% of the voters favoring a x100 factor increase (or two decimal places of precision loss).

Polkadot's redenomination is taking place on 21st August, now to be known as Denomination Day, at
block #1,248,328

### What This Means for the Community

If you're a DOT holder or user of the network, then you do not need to take any action. The DOT
redenomination is a purely front-end change. You will still hold the same amount of Plancks after
the change, but now it will appear that you hold 100x more DOTs. This change applies proportionally
to everyone.

### What This Means for Builders of Tools

If you are the builder of a tool that consumes the `@polkadot/api` package - then there should be no
real changes that need to be made in your application. The denomination is technically a cosmetic
change and every value is still a constant amount of Plancks.

However - if you are a builder of a tool which handles DOT balances in an off-chain or custodial way
(such as wallet software) then you will likely need to anticipate the redenomination by changing
some constants in your code. Please reach out to
[support@polkadot.network](mailto:support@polkadot.network) if you need any assistance in making
sure your software is compatible with the redenomination.

[referendum 52]: https://kusama.polkassembly.io/referendum/52
[blog 1]: https://polkadot.network/results-of-dot-redenomination-referendum/
[blog 2]: https://polkadot.network/the-first-polkadot-vote/
[blog 3]: https://polkadot.network/the-results-are-in/
