---
id: learn-elastic-scaling
title: Parallel Computing
sidebar_label: Parallel Computing
description: How the Polkadot Cloud achieves parallel computation to boost throughput.
keywords: [elastic scaling, parachains, coretime, blockspace, parallel computing]
slug: ../learn-elastic-scaling
---

<!-- MessageBox -->
<div id="messageBox" class="floating-message-box">
  <p>
    To fully follow the material on this page, it is recommended to be familiar with the primary stages of the 
    <a href="./learn-parachains-protocol.md" target="_blank" rel="noopener noreferrer">
      Parachain Protocol.
    </a>
  </p>
  <button class="close-messagebox" aria-label="Close message">✖</button>
</div>

[Parallel computing](https://en.wikipedia.org/wiki/Parallel_computing) involves performing many
calculations or processes simultaneously by dividing tasks into sub-tasks that run on multiple
processors or cores. This is essential for high-performance computing tasks, where many operations
are executed in parallel to speed up processing.

Polkadot uses [pipelining](./learn-async-backing.md) and
[multi-threading](./learn-agile-coretime.md) to increase throughput and achieve concurrency,
respectively. Polkadot also provides throughput boost via parallel computation for a single task
with **elastic scaling**: parachains can use multiple cores to include multiple parablocks within
the same relay chain block.

The relay chain receives a sequence of parachain blocks on multiple cores, which are validated and
checked if all their state roots line up during their inclusion, but assume they’re unrelated
parachain blocks during backing, availability, and approvals. With elastic scaling implemented, a
parachain's throughput depends upon its collator infrastructure.

The [elastic scaling implementation](https://github.com/paritytech/polkadot-sdk/issues/1829) will be
rolled out in multiple phases. In the first phase, elastic scaling is set to work on parachains with
a trusted/permissioned collator set. With this restriction, it is possible to launch elastic scaling
without changing the candidate receipt. After successfully implementing the first phase, changes can
be made to the candidate receipt so the collator set can be untrusted/permissionless again. The
final phase will feature full integration with the Cumulus framework, enabling parachains to be
configured to access multiple cores continuously.

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
