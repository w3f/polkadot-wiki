---
id: learn-staking-miner
title: Staking Miner
sidebar_label: Staking Miner
description: Learn about Phragmén optimization on-chain via staking miners
keywords: [staking, npos, miner, phragmén]
slug: ../learn-staking-miner
---

The staking miner is a binary that is mostly passive, and is only activated whenever a network wants to elect a new validator set. In a sense, it mines a validator set (which is a computationally intense task, ergo mining). In principle, if the miner ever fails, the same process will happen by validators of the network in their offchain worker API. In the long term, we want to rely as much as possible on the staking-miner, and NOT the offchain workers. The most obvious reason for this is that the offchain workers have limited computational resources. Moreover, the incur a rather unnecessary CPU cost on validators.

The submitted solution is packed in the form of the submit transaction and is submitted to the chain as a normal signed extrinsic. A relatively large deposit and transaction fee is charged as a result. If the solution is correct, the deposit is returned and a reward is given to the submitted, which should always, at the minimum, cover the basic transaction fee.

See pallet-election-provider-multi-phase's documentation on signed phase for more info

:::caution

The staking-miner code is experimental and it is still in development phase. Use is at your
own discression, some funds might be lost.

:::

## Where is staking miner used?

Substrate chains validators compute a basic solution for the NPoS election. The optimization of the solution is computing-intensive and can be delegated to the staking-miner. The staking-miner does not act as validator and focuses solely on the optimization of the solution.

The staking miner connects to a specified chain and keeps listening to new Signed phase of the pallet-election-provider-multi-phase in order to submit solutions to the NPoS election. When the correct time comes, it computes its solution and submit it to the chain. The default miner algorithm is sequential-phragmen] with a configurable number of balancing iterations that improve the score.

Running the staking-miner requires passing the seed of a funded account in order to pay the fees for the transactions that will be sent. The same account's balance is used to reserve deposits as well. The best solution in each round is rewarded. All correct solutions will get their bond back. Any invalid solution will lose their bond.


### NPoS election optimization

Mention simple election results being optimized by the staking miner

### Council election (?)

Does this need to be included?

## Signed Phase

pallet_election_provider_multi_phase

Code snippets?

## Further Resources

- [Crate definition](https://crates.parity.io/pallet_election_provider_multi_phase/index.html#signed-phase)
