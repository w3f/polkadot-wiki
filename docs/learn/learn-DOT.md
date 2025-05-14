---
title: DOT Token Overview
description: Overview of Polkadot's native token DOT, its uses, denominations, and how to obtain it.
---

## What is DOT?

DOT is Polkadot's native token, similar to BTC for Bitcoin or ETH for Ethereum.

### The Planck Unit

The smallest unit of account balance on Polkadot SDK-based blockchains is Planck, named after the [Planck Length](https://en.wikipedia.org/wiki/Planck_length). DOT equals 10<sup>10</sup> Planck, while Kusama's KSM equals 10<sup>12</sup> Planck.

### Denominations

=== "Polkadot"
    | Unit            | Decimal Places | Conversion to Planck   | Conversion to DOT |
    | --------------- | -------------- | ---------------------- | ----------------- |
    | Planck          | 0              | 1 Planck               | 0.0000000001 DOT  |
    | Microdot (uDOT) | 4              | 10<sup>4</sup> Planck  | 0.0000010000 DOT  |
    | Millidot (mDOT) | 7              | 10<sup>7</sup> Planck  | 0.0010000000 DOT  |
    | Dot (DOT)       | 10             | 10<sup>10</sup> Planck | 1.0000000000 DOT  |
    | Million (MDOT)  | 16             | 10<sup>16</sup> Planck | 1,000,000.00 DOT  |

    !!!note "DOT Redenomination"
        DOT was redenominated at block #1_248_328, increasing its supply by 100x. Previously, 1 DOT equaled 10<sup>12</sup> Planck.
=== "Kusama"
    | Unit            | Decimal Places | Conversion to Planck   | Conversion to KSM  |
    | --------------- | -------------- | ---------------------- | ------------------ |
    | Planck          | 0              | 1 Planck               | 0.000000000001 KSM |
    | Point           | 3              | 10<sup>3</sup> Planck  | 0.000000001000 KSM |
    | MicroKSM (uKSM) | 6              | 10<sup>6</sup> Planck  | 0.000001000000 KSM |
    | MilliKSM (mKSM) | 9              | 10<sup>9</sup> Planck  | 0.001000000000 KSM |
    | KSM             | 12             | 10<sup>12</sup> Planck | 1.000000000000 KSM |

## Uses of DOT

DOT has three main functions:

1. **Governance**: DOT holders control network governance, including fees, parachain management, and upgrades. Learn more on the [governance page](./learn-polkadot-opengov.md).
2. **Staking**: DOT is staked to secure the network via [Nominated Proof of Stake](./learn-staking.md).
3. **Resource Purchase**: DOT is used to purchase [Coretime](../general/glossary.md#coretime) and reserve [parachain identifiers](../general/glossary.md#paraid) for rollups.

The DOT token is transferable; a portion of its inflation is diverted to the Treasury, which can fund Polkadot-related projects via OpenGov referenda.

### Governance

DOT holders participate in governance to manage network fees, parachains, and upgrades. Details are available on the [governance page](./learn-polkadot-opengov.md).

### Consensus

DOT facilitates Polkadot's consensus mechanism. Staking DOT ensures valid transactions and penalizes malicious actors through [slashing](./learn-offenses.md). Learn more on the [staking page](./learn-staking.md).

### Relay Chain Access

DOT is used to [purchase coretime](./learn-agile-coretime.md), enabling rollups to leverage Polkadot's security and interoperability.

## Token Issuance

### Total Issuance

The [total issuance](../general/chain-state-values.md) is the total number of tokens in existence.

### Inactive Issuance

The [inactive issuance](../general/chain-state-values.md) includes tokens locked in crowdloans and nomination pools, which cannot participate in governance.

### Active Issuance

Active issuance = Total issuance - Inactive issuance. Active tokens can participate in governance.

## Obtaining Testnet Tokens

Testnet tokens allow experimentation on Polkadot's features. Obtain tokens [here](https://faucet.polkadot.io/).

### Paseo Testnet

Paseo mirrors Polkadot's runtime. Obtain PAS tokens [here](https://faucet.polkadot.io/) or via `!drip <PASEO_ADDRESS>` in the [Matrix chatroom](https://matrix.to/#/#paseo_faucet:matrix.org).

| Unit            | Decimal Places | Conversion to Planck   | Conversion to PAS |
| --------------- | -------------- | ---------------------- | ----------------- |
| Planck          | 0              | 1 Planck               | 0.0000000001 PAS  |
| Microdot (uPAS) | 4              | 10<sup>4</sup> Planck  | 0.0000010000 PAS  |
| Millidot (mPAS) | 7              | 10<sup>7</sup> Planck  | 0.0010000000 PAS  |
| Dot (PAS)       | 10             | 10<sup>10</sup> Planck | 1.0000000000 PAS  |
| Million (MPAS)  | 16             | 10<sup>16</sup> Planck | 1,000,000.00 PAS  |

### Westend Testnet

Westend is Polkadot's testnet. Obtain WND tokens via the [faucet](https://faucet.polkadot.io/westend) or `!drip <WESTEND_ADDRESS>` in the [Matrix chatroom](https://matrix.to/#/#westend_faucet:matrix.org). Validators can also earn WND. Watch the [video guide](https://www.youtube.com/watch?v=0ji0ccZyb3k).

| Unit            | Decimal Places | Conversion to Planck   | Conversion to WND  |
| --------------- | -------------- | ---------------------- | ------------------ |
| Planck          | 0              | 1 Planck               | 0.000000000001 WND |
| Point           | 3              | 10<sup>3</sup> Planck  | 0.000000001000 WND |
| MicroWND (uWND) | 6              | 10<sup>6</sup> Planck  | 0.000001000000 WND |
| MilliWND (mWND) | 9              | 10<sup>9</sup> Planck  | 0.001000000000 WND |
| WND             | 12             | 10<sup>12</sup> Planck | 1.000000000000 WND |

### Faucet Support

For faucet issues, use the [support chat](https://matrix.to/#/#faucets-support:matrix.org) or [create an issue](https://github.com/paritytech/polkadot-testnet-faucet/issues/new/choose).

## Kusama Tokens

Kusama tokens are not freely distributed. Obtain them via the [claims process](https://claim.kusama.network/), [Treasury](./archive/learn-treasury.md), or the open market.

## Polkadot Mainnet DOT

Mainnet DOT is not freely distributed. Claim them via the [Polkadot claims process](https://claims.polkadot.network/) or purchase on the open market.
