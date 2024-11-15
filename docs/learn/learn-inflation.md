---
id: learn-inflation
title: DOT Inflation Model
sidebar_label: DOT Inflation
description: Explanation of DOT's Inflation.
keywords: [token, DOT, inflation]
slug: ../learn-inflation
---

import MessageBox from "../../components/MessageBox"; import "../../components/MessageBox.css";

<MessageBox message="[Polkadot transitioned from an exponential inflation model to a linear inflation model in November 2024.](https://forum.polkadot.network/t/proposal-for-adjusting-polkadots-inflation-system-reducing-issuance-and-complexity/9157) The exponential inflation model is still in use for [Kusama](./learn-kusama-inflation)." />

DOT is an inflationary token, with
[**fixed annual inflation of 120,000,000 DOT**](https://github.com/polkadot-fellows/runtimes/pull/471),
of which 15% goes to the [treasury](./learn-polkadot-opengov-treasury.md) and 85% to
[stakers](./learn-staking.md).

It is essential to understand that the primary objective of inflation is to incentivize network
participants through
[Nominated Proof of Stake (NPoS)](./learn-consensus.md#nominated-proof-of-stake) and to grow the
network through funding the on-chain treasury. Token inflation rate can be updated in the future
through [on-chain governance](./learn-polkadot-opengov.md) based on thorough tokenomics research.

Below is a 25-year prediction of DOT gross annual inflation assuming current fixed inflation rate.

Net DOT inflation depends on [treasury expenditures](./learn-polkadot-opengov-treasury.md) and
[coretime sales](./learn-agile-coretime.md#agile-coretime-implementation), and thus cannot be
predicted. Net inflation can be defined as follows:

```

Net Inflation = Gross fixed inflation - burned supply (treasury + coretime sales)

```

Where `Gross fixed inflation` is the annual inflation of 120M DOT and the `burned supply` is the
annual burn supply due to treasury burns and coretime sale burns.
