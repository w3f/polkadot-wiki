---
id: learn-comparisons-avalanche
title: Polkadot and Avalanche
sidebar_label: Avalanche
description: A high-level comparison between Polkadot and Avalanche.
keywords: [avalance, proof of stake, comparison]
slug: ../learn-comparisons-avalanche
---

Polkadot and Avalance both have an architecture which allows for application specific blockchains to be designed and connected via a "main" chain. In Polkadot this is the Relay-chain and Avalance does this with 3 primary chains, the P-chain, X-chain, and C-chain. Similar to how Polkadot has its Parachains that connect to the Relay-chain, Avalanche has what're called subnets. Subnets are application specific chains that can be deployed along side the primary chains. Similar to Polkadot, Avalanche also uses a PoS mechanism for in its consensus algorithm to elect its validators who stake their AVAX tokens to be able to secure the network.

## Model

Avalanche's architecture seperates the responsibility of a layer-1 smart contract platform into three manageable chains. This allows for a seperation of concernover consensus, transactions and smart contract execution runtime. Polkadot is not a smart contract platform and does not have plans to be. The Relay-chain manages the consensus layer as well as the transactions.

## Architecture

As formentioned, the Avalanche architecture is comprised of three different chains. With this model, the seperations of concerns targets the main platform, exchange, and contracts. It also has what're called Subnets, which allow a subsection of the validators to validate blockchain

#### P-chain (Platform)

The P-chain is responsible for the validator set and securing the network. AVAX token holders can spin up their own nodes and become validators by staking their tokens. Similar to the NPoS system that Polkadot uses, Avalanche allows token holders who do not want to spin up their own node to become validators to delegate their token stake to existing validators. When a new subnet is spun up, it will also be connected to the p-chain. 

<!-- TODO: do subnet validators also have to validate the p-chain? In Polkadot collators do not have to do this, but they do have to sync with the relay chain effectively running a relay chain node on their machine. -->

#### X-chain (Exchange)

The X-chain is responsible for the transaction layer of the Avalanche blockchain. It uses a UTXO model like Bitcoin vs Polkadot which uses an account model like Ethereum.

<!-- TODO: Figure out what a Directed Acyclyc Graph (DAG) is in accordance to a linear blockchain. And state the different in the Polkadot model -->

#### C-chain (Contracts)

The C-chain is where most activity will happen on the Avalanche blockchain. It allows for different virtual machines to execute smart contract code. Out of the box it has support for EVM and AVM(Avalanche VM). 

#### Subnets or sub-networks

Subnets can be public or private and allow for developers to design and launch a blockchain on Avalanche. These are one or many validators that are subsets from the overall validator set of the network. Any validator in the Avalanche network has to validate all three chains making them a part of the primary network subnet. Subnets can validate any blockchains, however each blcokcahin is validated by exactly one subnet. 

<!-- TODO: How different is this model from the parachain model? Do subnets also have to use the avalanche consensus model? They have a choice of VM but do they of consensus? -->

## Consensus                       

## Staking Mechanics

## Shards

## Message Passing

## Governance
<!-- 
TODO: Add definitions to each key parameter that is subject to change via governance -->

Avalanche plans to have an on-chain governance mechanism based on its whitepaper. Even though it does not currently have an on-chain or off-chain system in production. Its governance system will be subject to only a few key protocol parameters which include:

- Staking amount
- Minimum staking time for a node
- Maximum staking time for a node
- Minting rate
- Transaction fee amount

Limiting the governance functionality is a design choice to increase predictibility and safety.

Polkadot's governance mechanism has been in production from the very begining, and was used to slowly release functionality and decentralize the initial network. It is also not limited to a few parameters, the whole runtime is subject to change via protocol.

## Upgrades

## Conclusion

## References

1. [abc](https://xyz.com)

