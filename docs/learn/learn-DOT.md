---
id: learn-DOT
title: DOT
sidebar_label: DOT
description: Tokenomics of Polkadot's Native Token DOT.
keywords: [token, DOT, what are the uses of DOT, KSM, faucet]
slug: ../learn-DOT
---

## What is DOT?

DOT is the native token of the Polkadot network in a similar way that BTC is the native token of
Bitcoin or Ether is the native token of the Ethereum blockchain.

### The Planck Unit

The smallest unit for the account balance on Substrate based blockchains (Polkadot, Kusama, etc.) is
Planck (a reference to [Planck Length](https://en.wikipedia.org/wiki/Planck_length), the smallest
possible distance in the physical Universe). You can compare DOT's Planck to BTC's Satoshi or ETH's
Wei. Polkadot's native token DOT equals to 10<sup>10</sup> Planck and Kusama's native token KSM
equals to 10<sup>12</sup> Planck.

### Polkadot

| Unit            | Decimal Places | Conversion to Planck   | Conversion to DOT |
| --------------- | -------------- | ---------------------- | ----------------- |
| Planck          | 0              | 1 Planck               | 0.0000000001 DOT  |
| Microdot (uDOT) | 4              | 10<sup>4</sup> Planck  | 0.0000010000 DOT  |
| Millidot (mDOT) | 7              | 10<sup>7</sup> Planck  | 0.0010000000 DOT  |
| Dot (DOT)       | 10             | 10<sup>10</sup> Planck | 1.0000000000 DOT  |
| Million (MDOT)  | 16             | 10<sup>16</sup> Planck | 1,000,000.00 DOT  |

!!!note "DOT was redenominated at block #1_248_328"
    DOT was originally equal to 10<sup>12</sup> Planck just like Kusama (which is referred to as "DOT (old)"), but went through a process of [redenomination](./archive/learn-redenomination.md) which increased DOT's supply by 100x. As a consequence, 1 DOT now equals to 10<sup>10</sup> Planck.

### Kusama

| Unit            | Decimal Places | Conversion to Planck   | Conversion to KSM  |
| --------------- | -------------- | ---------------------- | ------------------ |
| Planck          | 0              | 1 Planck               | 0.000000000001 KSM |
| Point           | 3              | 10<sup>3</sup> Planck  | 0.000000001000 KSM |
| MicroKSM (uKSM) | 6              | 10<sup>6</sup> Planck  | 0.000001000000 KSM |
| MilliKSM (mKSM) | 9              | 10<sup>9</sup> Planck  | 0.001000000000 KSM |
| KSM             | 12             | 10<sup>12</sup> Planck | 1.000000000000 KSM |

## What are the uses of DOT?

DOT serves three key functions in Polkadot:

- to be used for governance of the network,
- to be staked for the operation of the network,
- to be bonded to connect a chain to Polkadot as a parachain.

DOT can also serve ancillary functions by being a transferrable token. For example, DOT stored in
the Treasury can be sent to teams working on relevant projects for the Polkadot network.

!!!note "Explainer video on token utility"
    These concepts have been further explained in the video
    [Usage of DOT and KSM on Polkadot and Kusama](https://www.youtube.com/watch?v=POfFgrMfkTo&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=7).

### DOT for Governance

The first function of DOT is to entitle holders to control the governance of the platform. Some
functions that are included under the governance mechanism include determining the fees of the
network, the addition or removal of parachains, and exceptional events such as upgrades and fixes to
the Polkadot platform.

Polkadot will enable any holder of DOT to participate in governance. For details on how holders can
participate in governance, as well as their rights and responsibilities, see the
[governance page](./learn-polkadot-opengov.md).

### DOT for Consensus

DOT will be used to facilitate the consensus mechanism that underpins Polkadot. For the platform to
function and allow for valid transactions to be carried out across parachains, Polkadot will rely on
holders of DOT to play active roles. Participants will put their DOT at risk (via staking) to
perform these functions. The staking of DOT acts as a disincentive for malicious participants who
will be punished by the network by getting their DOT [slashed](./learn-offenses.md). The DOT
required to participate in the network will vary depending on the activity that is being performed,
the duration the DOT will be staked for, and the total number of DOT staked. For more information
about staking on Polkadot visit [the dedicated staking page](./learn-staking.md).

### DOT to Access Cores on the Relay Chain

DOT can be used to [purchase coretime in-bulk or on-demand](./learn-agile-coretime.md) and access
the relay chain to benefit from Polkadot's security and interoperability.

### Token Issuance

#### Total Issuance

The [total issuance](../general/chain-state-values.md#total-issuance) is the total number of token
units in existence on the network.

#### Inactive Issuance

The [inactive issuance](../general/chain-state-values.md#inactive-issuance) is the total units of
outstanding deactivated balance on the network that cannot be used for participation in governance.
This comprises tokens locked away in crowdloans and nomination pools.

#### Active Issuance

Active issuance = Total issuance - Inactive issuance

All the tokens under active issuance are can be used to participate in the governance on-chain.

## Obtaining Testnet Tokens

DOT are required to make transactions on the Polkadot network. Tokens on Polkadot's Testnets do not
have any value besides allowing you to experiment with the features on the network.

Tokens for each testnet described below can be obtained [**here**](https://faucet.polkadot.io/).

### Getting Tokens on the Paseo Testnet

The Paseo testnet mirrors the Polkadot runtime and it is maintained by the community. The PAS tokens
can be obtained [here](https://faucet.polkadot.io/) and have the same Planck conversion as
Polkadot's native token DOT.

| Unit            | Decimal Places | Conversion to Planck   | Conversion to PAS |
| --------------- | -------------- | ---------------------- | ----------------- |
| Planck          | 0              | 1 Planck               | 0.0000000001 PAS  |
| Microdot (uPAS) | 4              | 10<sup>4</sup> Planck  | 0.0000010000 PAS  |
| Millidot (mPAS) | 7              | 10<sup>7</sup> Planck  | 0.0010000000 PAS  |
| Dot (PAS)       | 10             | 10<sup>10</sup> Planck | 1.0000000000 PAS  |
| Million (MPAS)  | 16             | 10<sup>16</sup> Planck | 1,000,000.00 PAS  |

Users can also obtain PAS by posting `!drip <PASEO_ADDRESS>` in the Matrix chatroom
[#paseo_faucet:matrix.org](https://matrix.to/#/#paseo_faucet:matrix.org).

### Getting Tokens on the Westend Testnet

Polkadot's testnet is called [Westend](../maintain/maintain-networks.md#westend-test-network).
Besides the [official faucet](https://faucet.polkadot.io/westend), you can obtain its native WND
tokens by posting `!drip <WESTEND_ADDRESS>` in the Matrix chatroom
[#westend_faucet:matrix.org](https://matrix.to/#/#westend_faucet:matrix.org). Your account will be
credited with 1 WND by default. You can also specify to get more tokens by
`!drip <WESTEND_ADDRESS> X`, where X is the number of tokens.

On the Westend network, you can also earn WNDs as rewards by
[becoming a validator](learn-validator.md). Watch the video below on how to get started on Westend.

<div className="row">
  <div className="col text--center">
    <a href="https://www.youtube.com/watch?v=0ji0ccZyb3k">
      <img src="https://img.youtube.com/vi/0ji0ccZyb3k/0.jpg" width="350" style="borderRadius: 10, border: '1px solid slategrey'" />
    </a>
    <p>
      <a href="https://www.youtube.com/watch?v=0ji0ccZyb3k">Testing Polkadot features on Westend</a>
    </p>
  </div>
</div>

| Unit            | Decimal Places | Conversion to Planck   | Conversion to WND  |
| --------------- | -------------- | ---------------------- | ------------------ |
| Planck          | 0              | 1 Planck               | 0.000000000001 WND |
| Point           | 3              | 10<sup>3</sup> Planck  | 0.000000001000 WND |
| MicroWND (uWND) | 6              | 10<sup>6</sup> Planck  | 0.000001000000 WND |
| MilliWND (mWND) | 9              | 10<sup>9</sup> Planck  | 0.001000000000 WND |
| WND             | 12             | 10<sup>12</sup> Planck | 1.000000000000 WND |

### Faucets support

If you require help with using faucets, or wish to report an issue, there is a support chat
[#faucets-support:matrix.org](https://matrix.to/#/#faucets-support:matrix.org), or you can
[create an issue](https://github.com/paritytech/polkadot-testnet-faucet/issues/new/choose) directly
in the faucets repo

## Kusama Tokens

Unlike testnet DOT, Kusama tokens are not freely given away. Kusama tokens are available via the
[claims process](https://claim.kusama.network/) (if you had DOT at the time of Kusama genesis) or
through the [Treasury](./archive/learn-treasury.md). Alternatively, they can be obtained on the open
market.

## Polkadot Mainnet DOT

Polkadot Mainnet DOT are not freely given away. If you purchased DOT in the original 2017 offering,
you may claim them via the [Polkadot claims process](https://claims.polkadot.network/).
Alternatively, they are available on the open market.
