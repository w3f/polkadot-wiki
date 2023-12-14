---
id: learn-balance-transfers
title: Balance Transfers
sidebar_label: Balances Transfers
keywords: [balance, transfers, transaction, signing]
description: Perform Balance Transfers between Accounts.
slug: ../learn-balance-transfers
---

import RPC from "./../../components/RPC-Connection";

Balance transfers are used to send a balance from one account to another account.

## Vested Transfers

{{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} may have a lock placed on them to account for
vesting funds. Like other types of locks, these funds cannot be transferred but can be used in other
parts of the protocol such as voting in governance or being staked as a validator or nominator.

Vesting funds are on a release schedule and unlock a constant number of tokens at each block
(**linear vesting**) or can unlock the full amount after a specific block number (**cliff
vesting**). Although the tokens are released in this manner, it does not get reflected on-chain
automatically since locks are [lazy](#lazy-vesting) and require an extrinsic to update.

There are two ways that vesting schedules can be created.

- One way is through an extrinsic type available in the Vesting pallet, `vested_transfer`. The
  vested transfer function allows anyone to create a vesting schedule with a transfer of funds, as
  long as the account for which the vesting schedule will be created does not already have one and
  the transfer moves at least `MinVestedTransfer` funds, which is specified as a chain constant.
- A second way is as part of the genesis configuration of the chain. In the case of
  {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, the chain specification genesis
  script reads the state of the Claims contract that exists on the Ethereum blockchain and creates
  vesting schedules in genesis for all the allocations registered as being vested.

Vesting schedules have three parameters:

- **locked**, the amount of tokens to be transferred in
  [Planck units](../learn/learn-DOT#the-planck-unit))
- **per block**, the number of tokens that are released per block
- **starting block**, the block number after which the vesting schedule starts

The configuration of these three fields dictates the amount of funds that are originally locked, the
slope of the unlock line and the block number for when the unlocking begins.
