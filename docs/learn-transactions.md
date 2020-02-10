---
id: learn-transactions
title: Transaction Types and Metering
sidebar_label: Transaction Types and Metering
---

Depending on the pallets installed in a [Substrate](https://substrate.dev)-based chain like Polkadot or Kusama, different transactions are possible within the system. For example, one can propose referenda in the Governance pallet, verify identities in the Identities pallet, send tokens through the Balances pallet, shout remarks into the chain through the System pallet, and more. 

Batching these transactions into blocks cannot work based on size like it does in a blockchain like Bitcoin's because smaller transactions might require more computation and vice versa - it's all about their computational effect. These transactions also do not happen on a smart contract platform (as smart contracts are not a first-class citizen of Substrate-based chains), so there is no concept of gas to meter transactions with.

To seemingly complicate matters further, there are parachain transactions (within the parachain, as well as parachain-to-relay-chain), parathread transactions, and smart contract transactions in a smart contract pallet like the EVM pallet or the Ink pallet. This document will explain how it all fits together and how we meter transactions in Polkadot.

## Metering Extrinsics with Weight

Extrinsics are user-initiated transactions: "inputs from the outside world". Extrinsics have *length* or *size*.

Transactions are the consequence of extrinsics. Transactions often have *weight*.

A block in Kusama is limited to [1 billion weight](https://github.com/paritytech/polkadot/blob/master/runtime/common/src/lib.rs#L53) or to [5 MB](https://github.com/paritytech/polkadot/blob/master/runtime/common/src/lib.rs#L55), whichever limit is hit first. These parameters _may_ change for Polkadot mainnet.

Most transactions in the runtime code [have a weight declaration](https://github.com/paritytech/substrate/blob/922b36c8eb6d971fbe2b72d69099a291a368ea25/frame/sudo/src/lib.rs#L122):

![The sudo function has a weight of 50000](/img/tx/01.jpg)

The example above shows that the `sudo` function in the `sudo` pallet has a weight of `50000`. Some transactions are free, meaning they carry no weight and only pay the base transaction fee as calculated by the system.

Another important parameter exists: [`AvailableBlockRatio`](https://github.com/paritytech/polkadot/blob/master/runtime/common/src/lib.rs#L54). This parameter indicates how much of the block's weight or length is reserved for `Operational` transactions - transactions that are necessary for the Relay Chain to run reliably at all (these can be related to nominating, governance, fishermen reporting illegal activity, etc.) If this ratio is 75%, that means 25% is reserved for Operational transactions.

The weight and size limits apply only to blocks on the Relay Chain, and not to parachains or parathreads (see below).

## Parachain Transactions

Once a [parachain](learn-parachains) has won the [auction](learn-auction) for a parachain slot and attached itself to the Relay Chain (RC), that parachain is guaranteed free inclusion of blocks into the relay chain for as long as the slot lease lasts. This means extrinsics initiated by the validators who are including a parachain's block (sent to them by collators of that parachain) in the RC have priority - they are always included. The remaining weight and size is used by RC operations as described above.

The collators of a parachain can but do not have to pay transaction costs, and those costs - if any - are internal to the chain. The economics of a parachain are up to the parachain to define, and whether or not the collators are incentivized to send proofs to the RC validators and process the parachain transactions is entirely up to the designers. For example, a parachain can but does not have to use the weight system.

## Parathread Transactions

[Parathreads](learn-parathreads) are exactly the same in terms of logic as parachains and as such the chain economics are once again up to the parathread designers. A key difference is that a parathread has to pay a fee for its block to be included in the Relay Chain and, thus, to progress. 

Additionally, a parachain slot dedicated to hosting parathreads (a parathread pool) has a current theoretical maximum of 50 parathread blocks per slot being included in the Relay Chain submission, and if there are more than 50 actively writing parathreads in that parathread pool, they will enter an instant on-chain auction. This auction will determine which parathreads get to write their state to the RC in this particular slot and thus progress in their block production. The fee incurred by this auction is non-refundable, and is in fact similar to the fee system in Ethereum or Bitcoin. Indeed, we expect a fee market to arise in times of high demand.

The fee is paid by the collators doing the submission, and the collators will have to gauge when it's worth it for them to try and win that per-block auction. It is because of this difference that we expect parathread collators to be incentivized by some on-parathread local economy. This also means the collators will have to be aware of a conversion rate between the token they're rewarded in and DOT/KSM in which the inclusion fee is paid.

The economics of parathread inclusion are still being fleshed out, so the 50 parathread blocks per slot number may change along with the specific inclusion fee.

Transactions occurring on the parathread itself are, as with parachains, specific to that environment and are not metered by the Relay Chain in any way. Collators can but do not have to be incentivized to process the transactions, and the chain itself can but does not have to have any metering built-in.

## Smart Contract Transactions

Some chains (threads or full parachains) will include a smart contract pallet. This would let third parties develop applications on that chain without having to have native code commit access to that chain's runtime. Transactions within that smart contract pallet will need to be metered or otherwise access-controlled to prevent spam and block fullness.

Just like with parathreads and parachains, the smart contract transactions within a parathread or parachain are entirely local and do not affect any fee or metering calculation on the Relay Chain. The chain implementing the smart contract pallet can meter the transactions using its own design, or it can decide that no metering is necessary at all, or anything in between. The transaction fees and block sizes of the chain are up to the chain and its collators and a block produced by a thread or chain with a smart contract pallet will be like any other thread's or chain's block - as long as the state transition function of the chain offers the `execute_block` function for validators to execute and validate, the chain's internals are no business of the relay chain.

## Short version

There are four types of transactions:

1. Relay Chain transactions (from various pallets like governance, identity, etc.), metered by weight and block size.
2. Parachain block transactions, always free and granted by placement in the parachain slot.
3. Parathread block transactions, basic fee when no other threads in pool want to write, auction when there's high demand for writes.
4. Internal parathread / parachain transactions (including smart contracts): completely local and dependent on whatever the chain designers decide, these do not bleed into Relay Chain economics in any way.
