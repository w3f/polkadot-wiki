---
id: learn-randomness
title: Randomness
sidebar_label: Randomness
---

## VRFs

BABE assigns block production slots to validators according to stake and using the Polkadot randomness cycle.

The VRF used in Polkadot is roughly the same as the one used in Ouroboros Praos. Ouroboros randomness is secure for block production and works well for BABE. However, Polkadot requires a stronger source of randomness since it would be viable for an attacker to manipulate this randomness and effect validator-parachain selection.

There are proposed solutions that have been considered for stronger randomness, but each has its own weakness (see [the section](http://research.web3.foundation/en/latest/polkadot/BABE/3-VDF/#unbiased-randomness) in the research wiki for a fuller explanation). For this reason, Polkadot uses randomness which is based on a VDF.

## VDFs

[Verifiable Delay Functions](https://vdfresearch.org/) are computations which take a prescribed duration of time to complete, even on parallel computers. They produce unique output which can independently and efficiently verified in a public setting.

## Other approaches to randomness on blockchains

- [RANDAO](https://github.com/randao/randao) - RANDAO requires each validator to prepare by performing a series of hashes on some seed. Validators then publish the final hash during a round and the random number is derived from every participant's entry into the game. As long as one honest validator participates, the randomness is considered secure (non-economically viable to attack). It was not chosen as the randomness method for the VRF used in Polkadot because revealing a hash from every block producer for each slot costs quadratic bandwidth, or at least quadratic computation.

## Resources

- [Discussion on Randomness used in Polkadot](https://github.com/paritytech/ink/issues/57) - W3F researchers discuss the randomness in Polkadot and when it is usable and under which assumptions.
