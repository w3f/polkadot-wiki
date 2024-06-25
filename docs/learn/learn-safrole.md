---
id: learn-safrole
title: "Polkadot Block Production: SAFROLE"
sidebar_label: SAFROLE
description: The Consensus Mechanism of Polkadot.
keywords:
  [
    consensus,
    proof of stake,
    nominated proof of stake,
    hybrid consensus,
    block production,
    sassafras,
    safrole,
    babe,
  ]
slug: ../learn-safrole
---

SAFROLE (formerly known as SASSAFRAS) is a SNARK-based block production algorithm that provides
anonymity in the validator selection process. SAFROLE also aims to deliver (nearly) fork-free,
constant time block production. SAFROLE is an upgrade to BABE, the block production portion of the
[hybrid consensus model](https://wiki.polkadot.network/docs/learn-consensus#hybrid-consensus) that
Polkadot uses (and later JAM).

zkSNARKs, in conjunction with a RingVRF, are used to ensure that slots are not preassigned to
malicious actors that are not part of the active validator set. Using a zkSNARK would allow
anonymity to be preserved when a validator submits a ticket, proving they are in the active set
without revealing their identity. This solution enables a validator to prove they are part of an
eligible group (via the RingVRF) while preserving anonymity within the block production mechanism
and preventing the likelihood of spam.

Part of how SAFROLE minimizes the possibility of forks is by limiting the possibility of multiple
valid authors per six-second timeslot (the time to produce a block) where a valid, possible author
must only be a single key-holder from within a pre-specified group of validators. In other words, it
limits the possibility of two heads of the chain (built on the same parent) forming. More on how
SAFROLE prevents forks can be found in
[Section 4.3, 4.8, and 6 of the JAM Graypaper.](https://graypaper.com/graypaper.pdf)

## Resources

- [The JAM Graypaper (see: **Block Production and Chain Growth**)](https://graypaper.com/graypaper.pdf)
- [Web3 Foundation Research Page (SASSAFRAS)](https://research.web3.foundation/Polkadot/protocols/block-production/SASSAFRAS)
  about SASSAFRAS.
