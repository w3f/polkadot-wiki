# Validator Payout Mechanism Overview

## Payout Scheme

Validators are paid for authoring blocks on the relay chain and signing parachain blocks.  Validator payouts occur at the end of every era (on the Alexander testnet, this is approximately once per hour, although this may be modified on Kusama and the Polkadot mainnet). No matter how much stake is behind a validator (by the validator stash itself, as well as by nominators), all validators split the block authoring payout equally.

For example:

```
Validator Set Size (v): 4
Validator 1 Stake (v1): 18 DOTs
Validator 2 Stake (v2): 9 DOTs
Validator 3 Stake (v3): 8 DOTs
Validator 4 Stake (v4): 7 DOT
Payout (p): 8 DOTs

Payout for each validator (v1 - v4):
p / v = 8 / 4 = 2 DOTs
```

Note that this is different than most other proof-of-stake systems such as Cosmos.  As long as a validator is in the validator set, it does not matter how much stake is behind that particular validator, in terms of rewards.  Validator `v1`, with 18 DOTs staked, received the same reward (2 DOTs) in this era as `v4` who had only 7 DOTs staked.

The initial goal of the Kusama network is to have 50 - 100 validators after the initial proof-of-authority phase.  Not all of these validators must be run by different entities (companies or people); in fact, it is often to your advantage to run multiple validators.

## Running Multiple Validators

It is possible for a single entity to run multiple validators.  It is explicity encouraged by the protocol, as some examples will show.  Assuming you have enough DOTs, or enough stake nominates your validator, to ensure that your validators remain in the validator set, running multiple validators will often result in a higher return than running a single validator.

Assume you have 20 DOTs to stake - for simplicity's sake, we will ignore nominators for now.  Running a single validator, as in the example above, would net you 2 DOTs in this era.

```
Validator Set Size (v): 4
Validator 1 Stake (v1): 18 DOTs <- Your validator
Validator 2 Stake (v2): 9 DOTs
Validator 3 Stake (v3): 8 DOTs
Validator 4 Stake (v4): 7 DOTs
Payout (p): 8 DOTs

Your payout = (p / v) * 1 = (8 / 4) * 1 = 2
```

Running two validators, and splitting the stake equally, would result in the original validator `v4` to be kicked out of the validator set, as only the top `v` validators (as measured by stake) are selected to be in the validator set.  More importantly, it would also double the amount of rewards that you get from each era.

```
Validator Set Size (v): 4
Validator 1 Stake (v1): 9 DOTs <- Your first validator
Validator 2 Stake (v2): 9 DOTs <- Your second validator
Validator 3 Stake (v3): 9 DOTs
Validator 4 Stake (v4): 8 DOTs
Payout (p): 8 DOTs

Your payout = (p / v) * 1 = (8 / 4) * 2 = 4
```

You may now think, if two validators are good, perhaps three would be better?  However, if you continue to split your stake equally, you will soon find yourself without enough stake to keep yourself in the validator set.  In the following example, assume that there are other potential validators with 6.5 DOTs staked.  If you split your stake equally amongst all three of your validators (18 / 3 = 6 DOTs), none of your validators can make it into the validator set.  The original `v4`, who had 7 DOTs staked, and another validator who has 6.5 DOTs staked, enter the validator set and none of your validators join.

```
Validator Set Size (v): 4
Validator 1 Stake (v1): 9 DOTs <- (previous v3)
Validator 2 Stake (v2): 8 DOTs <- (previous v4)
Validator 3 Stake (v3): 7 DOTs <- (v4 in original example)
Validator 4 Stake (v4): 6.5 DOTs <- (other validator)
Payout (p): 8 DOTs

Your payout = (p / v) * 1 = (8 / 4) * 0 = 0
```

In this era, you received no payout, since none of your validators were in the validator set.

It is anticipated that this will be a dynamic equilibrium.  Potential validators will run different numbers of validators and apply different amounts of stake to them as time goes on, and in response to the actions of other validators on the network.
