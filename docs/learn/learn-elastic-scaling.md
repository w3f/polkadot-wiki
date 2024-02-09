---
id: learn-elastic-scaling
title: Polkadot's Elastic Scaling
sidebar_label: Elastic Scaling
description: Pushing Parachains' Boundaries Below 6 seconds Execution Time.
keywords: [elastic scaling, parachains, coretime, blockspace]
slug: ../learn-elastic-scaling
---

The path of parablocks from their creation to their inclusion into the relay chain (discussed in the
[Parachain Protocol Page](./learn-parachains-protocol.md)) span two domains: the parachain side and
the relay chain side. Scaling the Polkadot technology implies scaling how parablocks are produced
and how their data is processed, secured, made available for additional checks, and finally included
in the relay chain.

[Asynchronous backing](./learn-async-backing.md) is the first implementation to the parachain
protocol that alters how parachains produce blocks and how the relay chain processes their data.
Briefly, parachains will take up to 2 seconds execution time (produce parablocks), while the relay
chain will be able to include a parablock every 6 seconds.

The limiting factor now is the relay chain and the 6 seconds it takes backing groups to back and
include parablocks. After asynchronous backing is implemented, parachains can theoretically produce
parablocks in the sub-second time range, but this would just create large
[unincluded segments](./learn-async-backing.md#unincluded-segments) on their end and a bottleneck on
the relay chain. Here is where elastic scaling comes into play. With elastic scaling, parachains can
use multiple cores to include multiple parablocks within the same relay chain block. Take for
example a parachain that wants to submit 4 parablocks to the relay chain:

Without elastic scaling, it will take 35 s to include all of them through one core. Remember that a
core is occupied after backing and before inclusion, i.e. for the whole data availability process. A
block cannot enter a core before the previous block has been declared available.

```
              R1 <----- R2 <----- R3 <----- R4 <----- R5

C1    |P1     B          I
      |P2                B         I
      |P3                          B         I
      |P4                                    B         I

```

The diagram above shows how backing and inclusion of parablocks (P) happen within the same relay
chain block (R). With one core (C1), it is 6 s block time. With two cores is 3 seconds block time
(see below).

With elastic scaling, it will take just 18 s to include all of them using two cores (C1 and C2).

```
              R1 <----- R2 <----- R3

C1    |P1     B          I
      |P2                B         I
C2    |P3     B          I
      |P4                B         I

```

If the pace per core on the relay chain will not change (backing and inclusion every 6 seconds per
core), on the parachain side collators will need to increase the parablock production rate to push
P1 and P2 to the two relay chain cores.

## Challenges

Assuming a constant number of cores, from the relay chain side, elastic scaling will not see major
upgrades as a parachain will use multiple existing cores instead of just one. However, from the
parachain side, collators will need to produce more parablocks per unit time, implying that
technical specifications for collators will likely increase.

For more advanced technical challenges, see the
[Elastic Scaling GitHub PR](https://github.com/paritytech/polkadot-sdk/issues/1829).
