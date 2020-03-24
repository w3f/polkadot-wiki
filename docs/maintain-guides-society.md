---
id: maintain-guides-society
title: Participate in Society
sidebar_label: Participate in Society
---

Society is an economic game to incentivize users to join the society that coordinates around whatever the rules are decided to be. The members of the society are incentivized to participate in society via the rewards paid by the treasury. Currently, there is only one society on Kusama but it is possible to have multiple societies in the future through the runtime upgrade.

![Society Dashboard](assets/society/dashboard.jpg)

Before joining the society, let's take a brief look at the [Society UI](https://polkadot.js.org/apps/#/society) on PolkadotJS apps and what are the [rules](https://polkascan.io/pre/kusama/transaction/0x948d3a4378914341dc7af9220a4c73acb2b3f72a70f14ee8089799da16d94c17) to become a member of the society on the Kusama.


`Members`: Currently, the maximum number of members is set as `150`. It can be changed by using governance to increase the number.

`rotation`:

`challenge`:

`pot`: The resource that is used to support the member of society.

`defender`:

`candidates`:

`bids`:

Once you have read through the rules, we can go through the user life cycle to get a sense of how it works.

### 1. Bid Phase

![Society Dashboard](assets/society/submit_bid.jpg)

Anyone who wants to join the society that is required to reserve `10 KSM` on Kusama and provides the bid that you want to get when joining the society. 

![Society Dashboard](assets/society/test_bid.jpg)

Once you have submitted the transaction, your bid will be listed on the Society page. You can cancel the bidding if you decided not to join the society by calling the `unbid(pos)`.   

### 2. Candidate Phase


### 3. Member Phase