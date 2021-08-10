---
id: learn-DOT
title: DOT
sidebar_label: DOT
---

## What are DOT?

DOT is the native token of the Polkadot network in a similar way that BTC is the native token of Bitcoin or ether is the native token of the Ethereum blockchain.

The smallest unit of account in a Substrate network (Polkadot, Kusama, etc.) is the Planck (a reference to [Planck Length](https://en.wikipedia.org/wiki/Planck_length), the smallest possible distance in the physical Universe). You can compare the Planck to satoshis or wei, while the DOT is like a bitcoin or an ether. Kusama tokens (KSM) are equal to 1e12 Planck, and Polkadot mainnet DOT are equal to 1e10 Planck.

### Polkadot

| Unit            | Decimal Places | Example      |
| --------------- | -------------- | ------------ |
| Planck          | 0              | 0.0000000001 |
| Microdot (uDOT) | 4              | 0.0000010000 |
| Millidot (mDOT) | 7              | 0.0010000000 |
| Dot (DOT)       | 10             | 1.0000000000 |

_Note: This changed at block #1,248,328. Previously, DOT were denominated as equal to 1e12 Planck, just like Kusama. This denomination is deprecrated, and, if necessary, referred to as "DOT (old)". See [Redenomination of DOT](redenomination) for more details._

### Kusama

| Unit            | Decimal Places | Example        |
| --------------- | -------------- | -------------- |
| Planck          | 0              | 0.000000000001 |
| Point           | 3              | 0.000000001000 |
| MicroKSM (uKSM) | 6              | 0.000001000000 |
| MilliKSM (mKSM) | 9              | 0.001000000000 |
| KSM             | 12             | 1.000000000000 |

## What are the uses of DOT?

DOT serve three key functions in Polkadot:

- to be used for governance of the network,
- to be staked for operation of the network,
- to be bonded to connect a chain to Polkadot as a parachain.

DOT can also serve ancillary functions by virtue of being a transferrable token. For example, DOT stored in the Treasury can be sent to teams working on relevant projects for the Polkadot network.

> These concepts have been further explained in the video [Usage of DOT and KSM on Polkadot and Kusama](https://www.youtube.com/watch?v=POfFgrMfkTo&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=7).

### DOT for Governance

The first function of DOT is to entitle holders to control of the governance of the platform. Some functions that are included under the governance mechanism include determining the fees of the network, the addition or removal of parachains, and exceptional events such as upgrades and fixes to the Polkadot platform.

Polkadot will enable any holder of DOT to participate in governance. For details on how holders can participate in governance, as well as their rights and responsibilities, see the [governance page](learn-governance).

### DOT for Consensus

DOT will be used to facilitate the consensus mechanism that underpins Polkadot. In order for the platform to function and allow for valid transactions to be carried out across parachains, Polkadot will rely on holders of DOT to play active roles. Participants will put their DOT at risk (via staking) to perform these functions. The staking of DOT acts as a disincentive for malicious participants who will be punished by the network by getting their DOT slashed. The DOT required to participate in the network will vary depending on the activity that is being performed, the duration the DOT will be staked for, and the total number of DOT staked.

### DOT for Parachain Slot Acquisition

DOT will have the ability to be locked for a duration in order to secure a parachain slot in the network. The DOT will be reserved during slot lease and will be released back to the account that reserved them after the duration of the lease has elapsed and the parachain is removed. You can learn more about this aspect by reading about the [auctions](learn-auction) that govern parachain slots.

### Vesting

DOT may have a lock placed on them to account for vesting funds. Like other types of locks, these funds cannot be transferred but can be used in other parts of the protocol such as voting in governance or being staked as a validator or nominator.

Vesting funds are on a linear release schedule and unlock a constant number of tokens at each block. Although the tokens are released in this manner, it does not get reflected on-chain automatically due to the fact that locks are [lazy](#lazy-vesting) and require an extrinsic to update.

There are two ways that vesting schedules can be created.

- One way is as part of the genesis configuration of the chain. In the case of Polkadot and Kusama, the chain specification genesis script reads the state of the Polkadot Claims contract that exists on the Ethereum blockchain and creates vesting schedules in genesis for all the allocations registered as being vested.
- A second way is through an extrinsic type available in the Vesting pallet, `vested_transfer`. The vested transfer function allows anyone to create a vesting schedule with a transfer of funds, as long as the account for which the vesting schedule will be created does not already have one and the transfer moves at least `MinVestedTransfer` funds, which is specified as a chain constant.

Vesting schedules have three parameters, `locked`, `per_block`, and `starting_block`. The configuration of these three fields dictate the amount of funds that are originally locked, the slope of the unlock line, and the block number for when the unlocking begins.

#### Lazy Vesting

Like [simple payouts](learn-simple-payouts), vesting is _lazy_, which means that someone must explicitly call an extrinsic to update the lock that is placed on an account.

- The `vest` extrinsic will update the lock that is placed on the caller.
- The `vest_other` will update the lock that is placed on another "target" account's funds.

These extrinsics are exposed from the Vesting pallet.

If you are using Polkadot-JS, when there are DOT available to vest for an account, then you will have the ability to unlock DOT which have already vested from the [Accounts](https://polkadot.js.org/apps/#/accounts) page.

![unbond](assets/unlock-vesting.png)

#### Calculating When Vesting DOT Will Be Available

Generally, you should be able to see from the [Accounts](https://polkadot.js.org/apps/#/accounts) by looking at your accounts and seeing when the vesting will finish. However, some DOT vest with "cliffs" - a single block where all the DOT are released, instead of vesting over time. In this case, you will have to query the chain state directly to see when they will be available (since technically, the vesting has not yet started - all of the vesting will occur in a single block in the future).

1. Navigate to the [Chain State](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/chainstate) page on Polkadot-JS.
2. Query chain state for `vesting.vesting(ACCOUNT_ID)`
3. Note the `startingBlock` where the unlock starts, and how much DOT is unlocked per block (`perBlock`).
4. You will have to calculate the result into “human time". To do this, remember that there are approximately 14’400 blocks per day, and you can see what the latest block is shown on the [Explorer](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/explorer) page.

## Obtaining Testnet DOT

DOT are required to make transactions on the Polkadot network. Testnet DOT do not have any value beside allowing you to experiment with the network.

### Getting Westies

The current testnet is called [Westend](maintain-networks#westend-test-network) and you can obtain its native tokens by posting `!drip <WESTEND_ADDRESS>` in the Matrix chatroom [#westend_faucet:matrix.org](https://matrix.to/#/#westend_faucet:matrix.org).

You can also make your own WNDs (testnet DOT) by [becoming a validator](learn-validator).

### Getting Rococo Tokens

Rococo is a parachain testnet. It does not have a faucet, and tokens are given only to teams working on parachains or exploring the [crosschain](learn-crosschain) message passing aspects of this testnet. Learn more about Rococo on the [matching wiki page](build-parachains-rococo).

## Kusama Tokens

Unlike testnet DOT, Kusama tokens are not freely given away. Kusama tokens are available via the [claims process](https://claim.kusama.network/) (if you had DOT at the time of Kusama genesis) or through the [Treasury](learn-treasury). Alternatively, they can be obtained on the open market.

## Polkadot Mainnet DOT

Polkadot Mainnet DOT are not freely given away. If you purchased DOT in the original 2017 offering, you may claim them via the [Polkadot claims process](https://claims.polkadot.network/). Alternatively, they are available on the open market.
