---
id: learn-elastic-scaling
title: Polkadot's Elastic Scaling
sidebar_label: Elastic Scaling
description: Pushing Parachains' Boundaries Below 6 seconds Execution Time.
keywords: [elastic scaling, parachains, coretime, blockspace]
slug: ../learn-elastic-scaling
---

The path of parablocks from their creation to their inclusion into the relay chain (discussed in the
[Parachain Protocol Page](./learn-parachains-protocol.md)) span two domains: the parachain's role
and the relay chain's role. Scaling the Polkadot protocol involves consideration on how parablocks
are validated, processed, secured, made available for additional checks, and finally included in the
relay chain as part of its final state

[Asynchronous backing](./learn-async-backing.md) is the first implementation to the parachain
protocol that alters how parachains produce blocks and how the relay chain processes their data.
This upgrade will allow parachains to take up to 2 seconds execution time (for producing
parablocks), while the relay chain will be able to include a parablock every 6 seconds.

With asynchronous backing enabled, parachains can theoretically produce parablocks in the sub-second
time range. However, to accomplish this, asynchronous backing must temporarily **hold** blocks in
[unincluded segments](./learn-async-backing.md#unincluded-segments). This is the bottleneck that
elastic scaling addresses. With elastic scaling, parachains can use multiple cores to include
multiple parablocks within the same relay chain block. Take, for example, a parachain that wants to
submit 4 parablocks to the relay chain:

Without elastic scaling, it will take 24 seconds to include all of them through one core. Remember
that a core is occupied after backing and before inclusion, i.e. for the whole data availability
process. A block cannot enter a core before the previous block has been declared available.

```
              R1 <----- R2 <----- R3 <----- R4 <----- R5

C1    |P1     B          I
      |P2                B         I
      |P3                          B         I
      |P4                                    B         I

```

The diagram above shows how backing and inclusion of parablocks (P) happen within the same relay
chain block (R). With one core (C1), it is a 6-second block time. Note how P4 is included after 30
seconds (not 24 seconds), because when P1 was pushed to the relay chain to being backed, there was
no other parablock.

With elastic scaling, it will take just 12 seconds (3-second block time) to include all of them
using two cores.

```
              R1 <----- R2 <----- R3

C1    |P1     B          I
      |P2                B         I
C2    |P3     B          I
      |P4                B         I

```

The diagram above shows how 4 parablocks are backed and included in the relay chain using two cores
(C1 and C2). Note how P2 and P4 are included after 18 seconds (not 12 seconds), because when P1 and
P3 were pushed to the relay chain for being backed, there were no other parablocks.

## Technical Considerations

If the pace per core on the relay chain will not change (backing and inclusion every 6 seconds per
core), on the parachain side collators will need to increase the parablock production rate to push
P1 and P2 to the two relay chain cores.

Assuming a constant number of cores, from the relay chain side, elastic scaling will not see major
upgrades as a parachain will use multiple existing cores instead of just one. However, from the
parachain side, collators will need to produce more parablocks per unit time, implying that
technical specifications for collators will likely increase.

For more advanced technical challenges, see the
[Elastic Scaling GitHub PR](https://github.com/paritytech/polkadot-sdk/issues/1829).
