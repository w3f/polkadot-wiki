---
id: learn-elastic-scaling
title: Polkadot's Elastic Scaling
sidebar_label: Elastic Scaling
description: Enabling parachains to scale on-demand through instantaneous coretime.
keywords: [elastic scaling, parachains, coretime, blockspace]
slug: ../learn-elastic-scaling
---

The path of parablocks from their creation to their inclusion into the relay chain (discussed in the
[Parachain Protocol Page](./learn-parachains-protocol.md)) spans two domains: the parachain's and
relay chain's. Scaling the Polkadot protocol involves consideration of how parablocks are produced by the
parachain and then
validated, processed, secured, made available for additional checks, and finally included on the
relay chain.


[Asynchronous backing](./learn-async-backing.md) is the optimization implemented on the relay chain
that allows parachains to produce blocks faster and allows relay chain to process them seamlessly. Async backing also improves the parachain side with unincluded segments and augmented info that allows collators to produce multiple parablocks even if the previous blocks are not yet included.
This upgrade allows parachains to utilize up to 2 seconds execution time per parablock, and the relay chain will be able to include a parablock every 6 seconds.

With elastic scaling, parachains can use multiple cores to include multiple parablocks
within the same relay chain block.

The relay chain receives a sequence of parachain blocks on multiple cores, which are validated and checked if all their state roots line up during their inclusion, but assume they’re unrelated parachain blocks during backing, availability, and approvals. With elastic scaling implemented, a parachain's throughput depends upon its collator infrastructure.

The [elastic scaling implementation](https://github.com/paritytech/polkadot-sdk/issues/1829) will be rolled out in multiple phases. In the first phase, elastic scaling is set to work on parachains with a trusted/permissioned collator set. With this restriction, it is possible to launch elastic scaling without changing the candidate receipt. After successfully implementing the first phase, changes can be made to the candidate receipt so the collator set can be untrusted/permissionless again. The final phase will feature full integration with the Cumulus framework, enabling parachains to be configured to access multiple cores continuously.


Take, for example, a parachain that wants to submit four parablocks to the relay chain. Without
elastic scaling, it will take 24 seconds to include all of them through one core. Remember that a
core is occupied after backing and before inclusion, i.e., for the whole data availability process.
A block cannot enter a core before the previous block has been declared available.

```
              R1 <----- R2 <----- R3 <----- R4 <----- R5

C1    |P1     B          I
      |P2                B         I
      |P3                          B         I
      |P4                                    B         I

```

The diagram above shows how the backing and inclusion of parablocks (P) happen within the same relay
chain block (R). With one core (C1), a parablock is included every 6 seconds. Note how P4 is
included after 30 seconds (not 24 seconds) because when P1 was pushed to the relay chain for being
backed, there was no previous parablock.

With elastic scaling, it will take just 12 seconds (3-second block time) to include all four
parablocks using two cores.

```
              R1 <----- R2 <----- R3

C1    |P1     B          I
      |P2                B         I
C2    |P3     B          I
      |P4                B         I

```

The diagram above shows how four parablocks are backed and included in the relay chain using two
cores (C1 and C2). Note how P2 and P4 are included after 18 seconds (not 12 seconds) because when P1
and P3 were pushed to the relay chain for being backed, there were no other parablocks before them.

## Technical Considerations

If the pace per core on the relay chain will not change (backing and inclusion every 6 seconds per
core), on the parachain side, collators will need to increase the parablock production rate to push
P1 and P2 to the two relay chain cores.

Assuming a constant number of cores, from the relay chain side, elastic scaling will not see major
upgrades as a parachain will use multiple existing cores instead of just one. However, from the
parachain side, collators must produce more parablocks per unit of time, implying that technical
specifications for collators will likely increase.

For more advanced technical challenges, see the
[Elastic Scaling GitHub PR](https://github.com/paritytech/polkadot-sdk/issues/1829).
