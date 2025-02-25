---
id: polkadot-opengov-referendum-voting-analysis
title: Polkadot Opengov - Referendum Voting Analysis
sidebar_label: Referendum Voting Analysis
description: Polkadot Opengov - Referendum Voting Analysis descriptions
keywords: [polkadot, governance, dashboard, dune]
slug: ../polkadot-opengov-referendum-voting-analysis
---

# Polkadot Opengov - Referendum Voting Analysis

## View On Dune: [Polkadot Opengov - Referendum Voting Analysis](https://dune.com/substrate/polkadot-referendum)

We're using **default parameters** for all of the following parameterized charts. Visit our
dashboard on Dune to use the **referendum_id** parameter and analyze a specific referendum.

Source table: **polkadot.events**, **polkadot.calls**

Authored by [**@ colorfulnotion**](https://x.com/colorfulnotion)

## Voting Power Daily Accumulation

- Daily cumulative "Aye" and "Nay" voting powers, along with approval and support rates for a
  specific referendum.
- **Approval Rate** - (Conviction _ Aye token) / ((Conviction _ Aye token) + (Conviction \* Nay
  token))
- **Support Rate** - (Aye token + Abstain token) / Total Issuance
- Learn more about
  [**Opengov Support & Approval**](https://wiki.polkadot.network/docs/learn-polkadot-opengov-origins#origins-and-tracks-info)

<iframe src="https://dune.com/embeds/3394377/5695923/" height="350" width="100%"></iframe>

## Aye vs Nay

"Aye Power" (Conviction _ Aye Token) vs "Nay Power" (Conviction _ Nay Token)

<iframe src="https://dune.com/embeds/3394358/5695887/" height="350" width="100%"></iframe>

## Aye votes analysis

All voters who voted **AYE** for the referendum, sorted by "Voting Power" (Conviction \* Token),
including split Aye

<iframe src="https://dune.com/embeds/3394729/5696475/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3394729/5697343/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3394729/5701237/" height="350" width="100%"></iframe>

## Nay votes analysis

All voters who voted **NAY** for the referendum, sorted by "Voting Power" (Conviction \* Token),
including Split NAY

<iframe src="https://dune.com/embeds/3394774/5696554/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3394774/5697365/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3394774/5701248/" height="350" width="100%"></iframe>

## Abstain votes analysis

All voters who **Abstain** themselves for the referendum, sorted by "Voting Power" (0.1X \* Token)

<iframe src="https://dune.com/embeds/3394782/5696570/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3394782/5697378/" height="350" width="100%"></iframe>

## First time voter analysis

A Referendum is considered hot or controversital if it has high turnout or high **First-time Voting
Rate**

- First-time voters who voted “Aye” or “Nay” in a specific referendum.
- First-time Voting Rate: first-time voters / total voters

<iframe src="https://dune.com/embeds/3395256/5697453/" height="350" width="100%"></iframe>

## Voter conviction adjustment

Analyze the change in voter's voting conviction for a specific referendum which offers insights into
how voter convictions shift across referenda.

## Methodology

Calculates each voter's previous average conviction, compares it to their current conviction in the
referendum, and categorizes the change as Increase 🔼, Maintain 🔁, or Decrease 🔽. Finally, it
provides counts and percentages for each category

<iframe src="https://dune.com/embeds/3397420/5701499/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3397420/5703298/" height="350" width="100%"></iframe>

## Awakened Voters

Enumerate the "Aye" and "Nay" voters who have not voted in the last 90 days

<iframe src="https://dune.com/embeds/3399552/5705369/" height="350" width="100%"></iframe>

<iframe src="https://dune.com/embeds/3401113/5707996/" height="350" width="100%"></iframe>
