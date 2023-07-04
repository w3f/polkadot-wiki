---
id: learn-polkadot-opengov-treasury
title: Treasury
sidebar_label: Treasury
description: Details about on-chain Treasury.
keywords: [treasury, funds, funding, tips, tipping]
slug: ../learn-polkadot-opengov-treasury
---

import RPC from "./../../components/RPC-Connection";

The Treasury is a pot of funds collected through a portion of block production rewards, transaction
fees, slashing, and [staking inefficiencies](learn-staking.md#inflation).

The Treasury funds are held in a [system account](./learn-account-advanced.md#system-accounts) that
cannot be controlled by any external account; only the system internal logic can access it.

OpenGov allows for managing funds through six tracks, each with its own [origin and track parameters](../maintain/maintain-guides-polkadot-opengov.md#origins-and-tracks-info).

- Treasurer
- Big Spender
- Medium Spender
- Small Spender
- Big Tipper
- Small Tipper

:::info How to access Treasury funds?

Access to Treasury funds requires successful enactment of referendum in the respective treasury track on-chain.
Learn how to create a referendum [here](../maintain/maintain-guides-polkadot-opengov.md#create-a-referenda-proposal-using-polkadot-js-ui).

:::

## Treasurer

This track can be used for treasury spending requests up to {{ polkadot: 10M DOT :polkadot }}{{ kusama:  333333.33 KSM  :kusama }} per referendum. 
Each referendum requires a decision deposit of {{ polkadot: 1000 DOT :polkadot }}{{ kusama:  33.33 KSM  :kusama }}.

## Big Spender

This track can be used for treasury spending requests up to {{ polkadot: 1M DOT :polkadot }}{{ kusama:  33333.33 KSM  :kusama }} per referendum.
Each referendum requires a decision deposit of {{ polkadot: 400 DOT :polkadot }}{{ kusama:  13.33 KSM  :kusama }}.

## Medium Spender

This track can be used for treasury spending requests up to {{ polkadot: 100K DOT :polkadot }}{{ kusama:  3333.33 KSM  :kusama }} per referendum.
Each referendum requires a decision deposit of {{ polkadot: 200 DOT :polkadot }}{{ kusama:  6.66 KSM  :kusama }}.

## Small Spender

This track can be used for treasury spending requests up to {{ polkadot: 10K DOT :polkadot }}{{ kusama:  333.33 KSM  :kusama }} per referendum.
Each referendum requires a decision deposit of {{ polkadot: 100 DOT :polkadot }}{{ kusama:  3.33 KSM  :kusama }}.

## Big Tipper

This track can be used for treasury spending requests up to {{ polkadot: 1000 DOT :polkadot }}{{ kusama:  33.33 KSM  :kusama }} per referendum.
Each referendum requires a decision deposit of {{ polkadot: 10 DOT :polkadot }}{{ kusama:  0.33 KSM  :kusama }}.

## Small Tipper

This track can be used for treasury spending requests up to {{ polkadot: 100 DOT :polkadot }}{{ kusama:  8.25 KSM  :kusama }} per referendum.
Each referendum requires a decision deposit of {{ polkadot: 1 DOT :polkadot }}{{ kusama:  0.033 KSM  :kusama }}.

