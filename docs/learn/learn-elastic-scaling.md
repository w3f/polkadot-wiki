---
id: learn-elastic-scaling
title: Polkadot's Elastic Scaling
sidebar_label: Elastic Scaling
description: Pushing Parachains' Boundaries Below 6 seconds Execution Time.
keywords: [elastic scaling, parachains, coretime, blockspace]
slug: ../learn-elastic-scaling
---

The path of parablocks from their creation to their inclusion into the relay chain (discussed in the
[Parachain Protocol Page](./learn-parachains-protocol.md)) is divided into two parts: the parachain
side and the relay chain side. Scaling the Polkadot technology implies scaling how parablocks are
produced and how their data is processed, secured, made it available for additional checks, and
finally included into the relay chain.

[Asynchronous backing](./learn-async-backing.md) is the first implementation to the parachain
protocol that alters how parachains produce blocks and how the relay chain process their data.
Briefly, parachains will be able to take up to 2 seconds execution time (produce parablocks), while
the relay chain will be able to include a parablock every 6 seconds.

The limiting factor now is the relay chain and the 6 seconds it takes backing groups to back and
include parablocks. After asynchronous backing will be implented, parachains can theoretically
already produce parablocks in the sub-second time range, but this would just create large unincluded
segments on their end. Here is where elastic scaling comes into play. With elastic scaling,
parachains will be able to use multiple cores to include multiple parablocks within the same relay
chain block. Take for example a parachain that wants to submit 4 parablocks to the relay chain:

Without elastic scaling it will take 35 s to include all of them through one core. Remember that a
core is occupied after backing and before inclusion, i.e. for the whole data availability process. A
block cannot enter a core before the previous block has been declared available.

```
              R1 <----- R2 <----- R3 <----- R4 <----- R5

C1    |P1     B          I
      |P2                B         I
      |P3                          B         I
      |P4                                    B         I

```

With elastic scaling it will take just 18 s to include all of them using 2 cores (C1 and C2).

```
              R1 <----- R2 <----- R3

C1    |P1     B          I
      |P2                B         I
C2    |P3     B          I
      |P4                B         I

```
