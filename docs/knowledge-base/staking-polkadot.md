---
title: DOT Token
description: Overview of Polkadot's native token DOT, its uses, inflation, denominations, and how to obtain it.
---

<!-- MessageBox -->
<div id="messageBox" class="floating-message-box">
  <p>
    <a href="https://forum.polkadot.network/t/proposal-for-adjusting-polkadots-inflation-system-reducing-issuance-and-complexity/9157" target="_blank" rel="noopener noreferrer">
      In November 2024, Polkadot transitioned from a model that led to exponential growth in the token supply (but with a constant inflation rate) to one with linear growth (with a decreasing inflation rate).
    </a>
    The constant inflation rate model is still in use for
    <a href="./learn-kusama-inflation.md" target="_blank" rel="noopener noreferrer">
      Kusama.
    </a>
  </p>
  <button class="close-messagebox" aria-label="Close message">✖</button>
</div>

DOT is Polkadot's native token, similar to BTC for Bitcoin or ETH for Ethereum. DOT has three main functions:

- **Governance**: DOT holders can vote network governance and propose changes to the protocol, including fees, token inflation, and code upgrades. Learn more on the [governance page](./learn-polkadot-opengov.md).
- **Staking**: DOT holders can lock their tokens to secure the network and get staking rewards for their commitment. Learn more on the [staking page](./learn-staking.md).
- **Access secure computation**: DOT is used to purchase [Coretime](glossary.md#coretime) and access secure computation and interoperability; and reserve [parachain identifiers](glossary.md#paraid) for rollups.

A portion of DOT [inflation](#dot-inflation) is diverted to the [Treasury](foundation.md), which can fund Polkadot-related projects via OpenGov referenda.

See the [chain state values page](../../general/chain-state-values.md) for more information about DOT total issuance, active and inactive issuance, deposits and more.

## The Planck Unit

The smallest unit of account balance on Polkadot SDK-based blockchains is Planck, named after the [Planck Length](https://en.wikipedia.org/wiki/Planck_length). DOT equals 10<sup>10</sup> Planck, while Kusama's KSM equals 10<sup>12</sup> Planck.

=== "Polkadot"
    | Unit            | Decimal Places | Conversion to Planck   | Conversion to DOT |
    | --------------- | -------------- | ---------------------- | ----------------- |
    | Planck          | 0              | 1 Planck               | 0.0000000001 DOT  |
    | Microdot (uDOT) | 4              | 10<sup>4</sup> Planck  | 0.0000010000 DOT  |
    | Millidot (mDOT) | 7              | 10<sup>7</sup> Planck  | 0.0010000000 DOT  |
    | Dot (DOT)       | 10             | 10<sup>10</sup> Planck | 1.0000000000 DOT  |
    | Million (MDOT)  | 16             | 10<sup>16</sup> Planck | 1,000,000.00 DOT  |

=== "Kusama"
    | Unit            | Decimal Places | Conversion to Planck   | Conversion to KSM  |
    | --------------- | -------------- | ---------------------- | ------------------ |
    | Planck          | 0              | 1 Planck               | 0.000000000001 KSM |
    | Point           | 3              | 10<sup>3</sup> Planck  | 0.000000001000 KSM |
    | MicroKSM (uKSM) | 6              | 10<sup>6</sup> Planck  | 0.000001000000 KSM |
    | MilliKSM (mKSM) | 9              | 10<sup>9</sup> Planck  | 0.001000000000 KSM |
    | KSM             | 12             | 10<sup>12</sup> Planck | 1.000000000000 KSM |

## DOT Inflation

DOT is an inflationary token, with
[**fixed annual expansion of the token supply of 120,000,000 DOT**](https://github.com/polkadot-fellows/runtimes/pull/471),
of which 15% goes to the [treasury](./learn-polkadot-opengov-treasury.md) and 85% to
[stakers](./learn-staking.md).

It is essential to understand that the primary objective of inflation is to incentivize network
participants through
[Nominated Proof of Stake (NPoS)](./learn-consensus.md#nominated-proof-of-stake) and to grow the
network through funding the on-chain treasury. The token inflation rate can be updated through
[on-chain governance](./learn-polkadot-opengov.md) based on thorough tokenomics research.

Below is a 25-year prediction of DOT gross annual inflation (red line) and DOT total issuance (blue
line), assuming the current fixed inflation rate.

![inflation](../assets/dot-inflation.png)

The total issuance takes into account the gross DOT inflation and thus does not consider tokens that
are burned.

Net DOT inflation depends on [treasury burns](./learn-polkadot-opengov-treasury.md) and
[coretime sales](./learn-agile-coretime.md#agile-coretime-implementation) that are variables and
thus cannot be predicted. Net inflation can be defined as follows:

```

Net Inflation = Gross fixed inflation - burned supply (treasury + coretime sales)

```

Where `Gross fixed inflation` is the annual inflation of 120M DOT and the `burned supply` is the
annual burn supply due to treasury burns and coretime sale burns.


## DOT and KSM Claims

DOT and KSM are not freely distributed. Obtain them via the [claim process](../learn/learn-guides-claims.md), [Treasury](./learn-polkadot-opengov-treasury.md), or the open market.

## Obtaining Testnet Tokens

Testnet tokens allow experimentation on Polkadot's features. Obtain testnet tokens [on the official faucet](https://faucet.polkadot.io/). For faucet issues, use the [support chat](https://matrix.to/#/#faucets-support:matrix.org) or [create an issue](https://github.com/paritytech/polkadot-testnet-faucet/issues/new/choose).

=== "Paseo"

    Paseo mirrors Polkadot's runtime. Obtain PAS tokens [here](https://faucet.polkadot.io/) or via `!drip <PASEO_ADDRESS>` in the [Matrix chatroom](https://matrix.to/#/#paseo_faucet:matrix.org).

    | Unit            | Decimal Places | Conversion to Planck   | Conversion to PAS |
    | --------------- | -------------- | ---------------------- | ----------------- |
    | Planck          | 0              | 1 Planck               | 0.0000000001 PAS  |
    | Microdot (uPAS) | 4              | 10<sup>4</sup> Planck  | 0.0000010000 PAS  |
    | Millidot (mPAS) | 7              | 10<sup>7</sup> Planck  | 0.0010000000 PAS  |
    | Dot (PAS)       | 10             | 10<sup>10</sup> Planck | 1.0000000000 PAS  |
    | Million (MPAS)  | 16             | 10<sup>16</sup> Planck | 1,000,000.00 PAS  |

=== "Westend"

    Westend is Polkadot's testnet. Obtain WND tokens via the [faucet](https://faucet.polkadot.io/westend) or `!drip <WESTEND_ADDRESS>` in the [Matrix chatroom](https://matrix.to/#/#westend_faucet:matrix.org). Validators can also earn WND. Watch the [video guide](https://www.youtube.com/watch?v=0ji0ccZyb3k).

    | Unit            | Decimal Places | Conversion to Planck   | Conversion to WND  |
    | --------------- | -------------- | ---------------------- | ------------------ |
    | Planck          | 0              | 1 Planck               | 0.000000000001 WND |
    | Point           | 3              | 10<sup>3</sup> Planck  | 0.000000001000 WND |
    | MicroWND (uWND) | 6              | 10<sup>6</sup> Planck  | 0.000001000000 WND |
    | MilliWND (mWND) | 9              | 10<sup>9</sup> Planck  | 0.001000000000 WND |
    | WND             | 12             | 10<sup>12</sup> Planck | 1.000000000000 WND |
