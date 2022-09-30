---
id: learn-DOT
title: DOT
sidebar_label: DOT
description: Learn about the tokenomics of the Polkadot ecosystem.
keywords: [token, DOT, what are the uses of DOT, KSM]
slug: ../learn-DOT
---

## What is DOT?

DOT is the native token of the Polkadot network in a similar way that BTC is the native token of
Bitcoin or Ether is the native token of the Ethereum blockchain.

### The Planck Unit

The smallest unit of account in a Substrate network (Polkadot, Kusama, etc.) is the Planck (a
reference to [Planck Length](https://en.wikipedia.org/wiki/Planck_length), the smallest possible
distance in the physical Universe). You can compare the Planck to Satoshis or Wei, while the DOT is
like a BTC or an ETH. Kusama tokens (KSM) are equal to 10<sup>12</sup> Planck, and Polkadot mainnet
DOT is equal to 10<sup>10</sup> Planck.

### Polkadot

| Unit            | Decimal Places | Conversion to Planck   | Conversion to DOT |
| --------------- | -------------- | ---------------------- | ----------------- |
| Planck          | 0              | 1 Planck               | 0.0000000001 DOT  |
| Microdot (uDOT) | 4              | 10<sup>4</sup> Planck  | 0.0000010000 DOT  |
| Millidot (mDOT) | 7              | 10<sup>7</sup> Planck  | 0.0010000000 DOT  |
| Dot (DOT)       | 10             | 10<sup>10</sup> Planck | 1.0000000000 DOT  |
| Million (MDOT)  | 16             | 10<sup>16</sup> Planck | 1,000,000.00 DOT  |

:::note DOT was redenominated at block #1_248_328

DOT was originally equal to 10<sup>12</sup> Planck just like Kusama (which is referred to as "DOT (old)"), but went through a 
process of [redenomination](../general/redenomination.md) which increased DOT's supply
by 100x. As a consequence, 1 DOT now equals to 10<sup>10</sup> Planck. 

:::

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

:::note Explainer video on token utility

These concepts have been further explained in the video
[Usage of DOT and KSM on Polkadot and Kusama](https://www.youtube.com/watch?v=POfFgrMfkTo&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=7).

:::

### DOT for Governance

The first function of DOT is to entitle holders to control the governance of the platform. Some
functions that are included under the governance mechanism include determining the fees of the
network, the addition or removal of parachains, and exceptional events such as upgrades and fixes to
the Polkadot platform.

Polkadot will enable any holder of DOT to participate in governance. For details on how holders can
participate in governance, as well as their rights and responsibilities, see the
[governance page](learn-governance.md).

### DOT for Consensus

DOT will be used to facilitate the consensus mechanism that underpins Polkadot. For the platform to
function and allow for valid transactions to be carried out across parachains, Polkadot will rely on
holders of DOT to play active roles. Participants will put their DOT at risk (via staking) to
perform these functions. The staking of DOT acts as a disincentive for malicious participants who
will be punished by the network by getting their DOT slashed. The DOT required to participate in the
network will vary depending on the activity that is being performed, the duration the DOT will be
staked for, and the total number of DOT staked. For more information about staking on Polkadot visit
[the dedicated staking page](./learn-staking.md).

### DOT for Parachain Slot Acquisition

DOT will have the ability to be locked for a duration in order to secure a parachain slot in the
network. The DOT will be reserved during the slot lease and will be released back to the account
that reserved them after the duration of the lease has elapsed and the parachain is removed. You can
learn more about this aspect by reading about the [auctions](learn-auction.md) that govern parachain
slots.

### Vesting

DOT may have a lock placed on them to account for vesting funds. Like other types of locks, these
funds cannot be transferred but can be used in other parts of the protocol such as voting in
governance or being staked as a validator or nominator.

Vesting funds are on a linear release schedule and unlock a constant number of tokens at each block.
Although the tokens are released in this manner, it does not get reflected on-chain automatically
since locks are [lazy](#lazy-vesting) and require an extrinsic to update.

There are two ways that vesting schedules can be created.

- One way is as part of the genesis configuration of the chain. In the case of Polkadot and Kusama,
  the chain specification genesis script reads the state of the Polkadot Claims contract that exists
  on the Ethereum blockchain and creates vesting schedules in genesis for all the allocations
  registered as being vested.
- A second way is through an extrinsic type available in the Vesting pallet, `vested_transfer`. The
  vested transfer function allows anyone to create a vesting schedule with a transfer of funds, as
  long as the account for which the vesting schedule will be created does not already have one and
  the transfer moves at least `MinVestedTransfer` funds, which is specified as a chain constant.

Vesting schedules have three parameters, `locked`, `per_block`, and `starting_block`. The
configuration of these three fields dictates the amount of funds that are originally locked, the
slope of the unlock line and the block number for when the unlocking begins.

#### Lazy Vesting

Like [simple payouts](learn-simple-payouts.md), vesting is _lazy_, which means that someone must
explicitly call an extrinsic to update the lock that is placed on an account.

- The `vest` extrinsic will update the lock that is placed on the caller.
- The `vest_other` will update the lock that is placed on another "target" account's funds.

These extrinsics are exposed from the Vesting pallet.

If you are using Polkadot-JS, when there are DOT available to vest for an account, then you will
have the ability to unlock DOT which has already vested from the
[Accounts](https://polkadot.js.org/apps/#/accounts) page.

![unbond](../assets/unlock-vesting.png)

#### Calculating When Vesting DOT Will Be Available

Generally, you should be able to see from the [Accounts](https://polkadot.js.org/apps/#/accounts) by
looking at your accounts and seeing when the vesting will finish. However, some DOT vest with
"cliffs" - a single block where all the DOT are released, instead of vesting over time. In this
case, you will have to query the chain state directly to see when they will be available (since
technically, the vesting has not yet started - all of the vesting will occur in a single block in
the future).

1. Navigate to the
   [Chain State](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/chainstate) page on
   Polkadot-JS.
2. Query chain state for `vesting.vesting(ACCOUNT_ID)`
3. Note the `startingBlock` where the unlock starts, and how much DOT is unlocked per block
   (`perBlock`).
4. You will have to calculate the result into “human time". To do this, remember that there are
   approximately 14’400 blocks per day, and you can see what the latest block is shown on the
   [Explorer](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/explorer) page.

## Obtaining Testnet Tokens

DOT are required to make transactions on the Polkadot network. Tokens on Polkadot's Testnets like Westend and Rococo do not have any value besides allowing you to experiment with the features on the network.

### Getting Tokens on the Westend Testnet

Polkadot's testnet is called
[Westend](../maintain/maintain-networks.md#westend-test-network) and you can obtain its native
tokens (called Westies!) by posting `!drip <WESTEND_ADDRESS>` in the Matrix chatroom
[#westend_faucet:matrix.org](https://matrix.to/#/#westend_faucet:matrix.org). Your account will be
credited with 1 WND by default. You can also specify to get more tokens by
`!drip <WESTEND_ADDRESS> X`, where X is the number of tokens.

You can also earn WNDs as rewards by [becoming a validator](learn-validator.md) on Westend network. Watch the video
below on how to get started on Westend.

[![Testing Polkadot features on Westend](https://img.youtube.com/vi/0ji0ccZyb3k/0.jpg)](https://www.youtube.com/watch?v=0ji0ccZyb3k)

| Unit            | Decimal Places | Conversion to Planck   | Conversion to WND  |
| --------------- | -------------- | ---------------------- | ------------------ |
| Planck          | 0              | 1 Planck               | 0.000000000001 WND |
| Point           | 3              | 10<sup>3</sup> Planck  | 0.000000001000 WND |
| MicroWND (uWND) | 6              | 10<sup>6</sup> Planck  | 0.000001000000 WND |
| MilliWND (mWND) | 9              | 10<sup>9</sup> Planck  | 0.001000000000 WND |
| KSM             | 12             | 10<sup>12</sup> Planck | 1.000000000000 WND |

### Getting Tokens on the Rococo Testnet

Rococo is a parachain testnet. Tokens are given directly to teams working on parachains or exploring
the [cross consensus](learn-xcm.md) message passing aspects of this testnet. General users can
obtain ROC by posting `!drip <ROCOCO_ADDRESS>` in the Matrix chatroom
[#rococo-faucet:matrix.org](https://matrix.to/#/#rococo-faucet:matrix.org). Learn more about Rococo
on its [dedicated wiki section](../build/build-parachains.md##testing-a-parachains:-rococo-testnet).

## Kusama Tokens

Unlike testnet DOT, Kusama tokens are not freely given away. Kusama tokens are available via the
[claims process](https://claim.kusama.network/) (if you had DOT at the time of Kusama genesis) or
through the [Treasury](learn-treasury.md). Alternatively, they can be obtained on the open market.

## Polkadot Mainnet DOT

Polkadot Mainnet DOT are not freely given away. If you purchased DOT in the original 2017 offering,
you may claim them via the [Polkadot claims process](https://claims.polkadot.network/).
Alternatively, they are available on the open market.
