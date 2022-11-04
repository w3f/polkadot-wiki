---
id: learn-staking-miner
title: Staking Miner
sidebar_label: Staking Miner
description: Learn about Phragmén optimization on-chain via staking miners
keywords: [staking, npos, miner, phragmén]
slug: ../learn-staking-miner
---

import RPC from "./../../components/RPC-Connection";

:::caution

The staking-miner code is experimental and it is still in the development phase. Use is at your own
discretion, as there is a risk of losing some funds.

:::

At the end of each era on Polkadot and Kusama, using [NPoS](learn-phragmen), a new set of validators
must be elected based on the nominator preferences. This is a computationally intensive process,
hence the usage of the term "mining" for computing the solution. The validators use
[off-chain workers](https://docs.substrate.io/reference/how-to-guides/offchain-workers/) to compute
the result and submit a transaction to propose the set of winners. This can also be delegated to
stand-alone programs, whose task is to mine the optimal solution. Staking miners compete with each
other to produce election solutions which consist of a validator set, stake distribution across that
set, and a score indicating how optimal the solution is. Staking miners run any given staking
algorithms (as of now, sequential Phragmén or PhragMMS, subject to change if improved algorithms are
introduced) to produce results, which are then sent as a transaction to the relay chain via a normal
signed extrinsic. The transaction requires a bond and a transaction fee. The best solution is
rewarded, which the least covers the transaction fee, and the bond is returned to the account.
[The bond and the fee](learn-staking-miner#deposit-and-reward-mechanics) are lost if the solution is
invalid.

Staking miner uses a pallet called `pallet_election_provider_multi_phase` and can only produce
solutions during the
[`SignedPhase`](https://crates.parity.io/pallet_election_provider_multi_phase/index.html#signed-phase)
of the pallet's life cycle. Once the `SignedPhase` is over and the
[`UnsignedPhase`](https://crates.parity.io/pallet_election_provider_multi_phase/index.html#unsigned-phase)
starts, only the off-chain workers can provide election results.

Running the staking miner requires passing the seed of a funded account in order to pay the fees for
the transactions that will be sent. The same account's balance is used to reserve deposits as well.
The best solution in each round is rewarded. All correct solutions will get their deposit back and
the ones that submit invalid solutions will lose their deposit.

## NPoS election optimization

![NPoS election optimization](../assets/staking-miner/NPoS-election-optimization.png)

A basic election solution is a simple distribution of stake across validators, but this can be
optimized for better distribution equaling a higher security score. The staking miner does not act
as a validator and focuses solely on the election result and optimization of the solution. It
connects to a specified chain and keeps listening to new signed phase of the election pallet in
order to submit solutions to the NPoS election. When the correct time comes, it computes its
solution and submits it to the chain. The default miner algorithm is sequential Phragmén with a
configurable number of balancing iterations that improve the score.

## Signed Phase of the election pallet

The election provider pallet `pallet_election_provider_multi_phase` is divided into two phases,
**signed** and **unsigned**. At the end of the pallet's timeline, the function `elect()` is called.

```
                                                                   elect()
                +   <--T::SignedPhase-->  +  <--T::UnsignedPhase-->   +
  +-------------------------------------------------------------------+
   Phase::Off   +       Phase::Signed     +      Phase::Unsigned      +
```

Solutions provided by the staking miner can only be submitted during the signed phase. Solutions are
submitted and queued on the chain as a `RawSolution`. Once submitted, a solution cannot be retracted
by the originating account.

`RawSolution` struct definition:

```
pub struct RawSolution<S> {
    pub solution: S, // The solution itself
    pub score: ElectionScore, // The claimed score of the solution.
    pub round: u32, // The round at which this solution should be submitted.
}
```

A maximum of `pallet::Config::MaxSignedSubmissions` will be stored on-chain and they will be sorted
based on score. Higher the score the more optimal the election solution is. On both Polkadot and
Kusama the
['MaxSignedSubmissions'](https://github.com/paritytech/polkadot/blob/master/runtime/polkadot/src/lib.rs#L446)
is set to
{{ polkadot: <RPC network="polkadot" path="consts.electionProviderMultiPhase.signedMaxSubmissions" defaultValue={16}/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.electionProviderMultiPhase.signedMaxSubmissions" defaultValue={16}/> :kusama }}
submissions. This variable can be modified if needed through governance.

Upon arrival of a new solution:

1. If the queue is not full, it is stored in the appropriate sorted index.
2. If the queue is full but the submitted solution is better than one of the queued ones, the worse
   solution is discarded, the deposit of the outgoing solution is returned, and the new solution is
   stored in the correct index.
3. If the queue is full and the solution is not an improvement compared to any of the queued ones,
   it is instantly rejected and no deposit is reserved.

Upon the end of the `SignedPhase`, no more solutions can be submitted and the solutions in the queue
will be checked using
[`Pallet::feasibility_check`](https://paritytech.github.io/substrate/master/pallet_election_provider_multi_phase/pallet/struct.Pallet.html#method.feasibility_check)
which ensures the score is indeed correct, and marks them as valid or invalid. By checking each
solution in the queue, the queue will be reorganized by score. The highest valid score will be
rewarded. Invalid solutions with higher score than the winning solution will be slashed. The rest of
the solutions will be discarded and their deposit will be returned. Once the staking miner with a
winning solution is ready to be rewarded the runtime will automatically execute
[`finalize_signed_phase_accept_solution`](https://github.com/paritytech/substrate/blob/f2bc08a3071a91b71fec63cf2b22c707411cec0e/frame/election-provider-multi-phase/src/signed.rs#L453-L474)
which reward account associated with the winning solution.

```
Queue
+-------------------------------+
|Solution(score=20, valid=false)| +-->  Slashed
+-------------------------------+
|Solution(score=15, valid=true )| +-->  Rewarded, Saved
+-------------------------------+
|Solution(score=10, valid=true )| +-->  Discarded
+-------------------------------+
|Solution(score=05, valid=false)| +-->  Discarded
+-------------------------------+
|             None              |
+-------------------------------+
```

## Deposit and reward mechanics

The staking miners are required to pay a deposit to post their solutions. Deposit amount is the sum
of `SignedDepositBase` +`SignedDepositByte` + `SignedDepositWeight`. All good solutions are subject
to receiving a `SignedRewardBase`.

### Deposit

Current deposit(`SignedDepositBase`) is
{{ polkadot: <RPC network="polkadot" path="consts.electionProviderMultiPhase.signedDepositBase" defaultValue={400000000000} filter="humanReadable"/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.electionProviderMultiPhase.signedDepositBase" defaultValue={133333332000} filter="humanReadable"/> :kusama }}
which is a fixed amount.

Current deposit per byte(`SignedDepositByte`) is
{{ polkadot: <RPC network="polkadot" path="consts.electionProviderMultiPhase.signedDepositByte" defaultValue={97656} filter="precise"/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.electionProviderMultiPhase.signedDepositByte" defaultValue={32551} filter="precise"/> :kusama }}
and the total is variable depending on the size of the solution data. For example a solution
weighing 200KB would yield {{ polkadot: 200 x 0.0000097656 = **0.00195312 DOT**. :polkadot }}

And the weight deposit(`SignedDepositWeight`) is currently set to `0` and has no effect.

### Reward

Current reward(`SignedRewardBase`) is
{{ polkadot: <RPC network="polkadot" path="consts.electionProviderMultiPhase.signedRewardBase" defaultValue={10000000000} filter="humanReadable"/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.electionProviderMultiPhase.signedRewardBase" defaultValue={100000000000} filter="humanReadable"/> :kusama }}
which is a fixed amount.

## Further Resources

If you want to run a staking miner on your validator, refer to the repository provided in the
resources section below.

- [Staking Miner repository](https://github.com/paritytech/staking-miner-v2)
- [Election Pallet definition](https://crates.parity.io/pallet_election_provider_multi_phase/index.html)
- [Signed phase parameter configuration on Polkadot](https://github.com/paritytech/polkadot/blob/f610ffc05876d4b98a14cee245b4cc27bd3c0c15/runtime/polkadot/src/lib.rs#L389:L397)
