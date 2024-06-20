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

> This page will be updated as progress ensues.

SAFROLE is a SNARK-based block production algorithm. It uses SNARK specifically for their anonymity
features. And it delivers constant time block production, almost entirely fork-free. There are a
couple of instances where forks could possibly arise. They basically only happen when there's a net
split or someone's being intentionally malicious. The great value for the anonymity is not
specifically to keep validators' identities sort of a secret. In fact, when they actually produce a
block, they give away their identity anyway, but rather for ensuring that the block production
mechanism itself is secure, basically to avoid spamming.

## Resources

- [Web3 Foundation Research page](https://research.web3.foundation/Polkadot/protocols/block-production/SASSAFRAS)
  about SASSAFRAS.
