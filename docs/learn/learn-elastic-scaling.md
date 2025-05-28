---
title: Parallel Computation (Elastic Scaling)
description: Explore how Polkadot achieves parallel computation and elastic scaling to boost throughput and efficiency.
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

The capabilities of elastic scaling were tested live on Kusama in December 2024 with [the Spammening Event](https://polkadot.com/spammening/). During this event, 143,343 TPS were recorded on 23 out of 100 cores (23% capacity), consistently achieving an average block time of 6.3 seconds and finality of 16.5 seconds.

!!! info "Polkadot 2.0"
    Elastic scaling is the last technical upgrade of Polkadot 2.0 that includes pipelining, agile scheduling, and now parallel computing. This makes Polkadot a true decentralized computer offering secure computation. 

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

The relay chain receives a sequence of parachain blocks on multiple cores, which are validated and
checked if all their state roots line up during their inclusion, but assume they’re unrelated
parachain blocks during backing, availability, and approvals. With elastic scaling implemented, a
parachain's throughput depends upon its collator infrastructure.

If the pace per core on the relay chain will not change (backing and inclusion every 6 seconds per
core), on the parachain side, collators will need to increase the parablock production rate to push
P1 and P3 to the two relay chain cores.

## Elastic Scaling Benefits

- **Higher throughput**: Parachains can utilize multiple cores simultaneously, enabling much faster transaction processing. Previously, parachains were limited to one block per Relay Chain block. They can handle much greater capacity with elastic scaling, significantly increasing overall performance.

- **Latency**: Elastic scaling reduces latency significantly, enabling faster block production and processing. For example, parachains on Kusama can reduce latency to 2 seconds with three cores today and potentially achieve 500ms latency with 12 cores in 2025, ensuring quicker response times for real-time applications.

- **Cost efficiency for applications**: Applications only pay for the resources they use, saving money and reducing upfront costs. Coretime can be purchased dynamically - by the block, hour, or month. This is perfect for apps with bursts in activity, like online auctions or sudden social media surges.

- **Flexible scaling for new applications**: Elastic scaling allows applications to start small with On-Demand Coretime and scale up seamlessly beyond one core when demand grows. This prevents over-allocation (wasting money on unused resources) or under-allocation (causing performance issues), both common in traditional setups.

- **Resource optimization**: Parachains can load-balance their core usage by leasing additional cores when demand increases and releasing them when activity subsides. Secondary markets for coretime also ensure that unused resources are reallocated efficiently, optimizing overall system performance.

- **Improved user experience**: End-users enjoy smooth and reliable performance, even during peak traffic. Applications no longer face the risk of slowing down or freezing when demand spikes, ensuring a consistent, high-quality experience.

Elastic scaling increases the throughput of a parachain. Polkadot’s approach to scaling has traditionally been to scale via multiple parachains, called “horizontal scaling” or “horizontal sharding” through cross-consensus messaging (XCM). However, setting up and parallelizing processes over multiple parachains and opening channels via XCM takes time and effort. With elastic scaling, projects can benefit from higher throughput before parallelizing processes over multiple parachains.

## Elastic Scaling Use Cases

- **"Bursty” applications**: Many applications experience sporadic spikes in activity rather than constant demand, e.g., Gaming, DeFi, Auctions, Messaging, Social Media, etc. With elastic scaling, these applications can acquire additional coretime during peak usage and release it during off-peak hours, optimizing performance while reducing costs.

- **Growing applications & startups**: Startups and new projects often face unpredictable user growth. Elastic scaling allows them to start with minimal resources (e.g., a single core) and scale seamlessly as user demand increases before scaling horizontally, thus preventing overcommitting resources upfront. This ensures applications can grow efficiently while maintaining performance and cost-effectiveness.

- **Large-scale IoT applications**: IoT systems require massive scalability to process data from millions of devices. Elastic scaling enables parachains to process high transaction volumes cost-effectively, while Polkadot’s model ensures the privacy and security needed in IoT environments.

- **Real-time applications**: Some applications require low latency and real-time performance (e.g., gaming, payments / financial services, or data feeds). These benefit from elastic scaling’s ability to reduce latency down to 2s. This ensures smooth and reliable performance during high-demand scenarios.

## Elastic Scaling Roadmap

The [elastic scaling implementation](https://github.com/paritytech/polkadot-sdk/issues/1829) will be
rolled out in multiple phases. In the first phase, elastic scaling is set to work on parachains with
a trusted/permissioned collator set. With this restriction, it is possible to launch elastic scaling
without changing the candidate receipt. After successfully implementing the first phase, changes can
be made to the candidate receipt so the collator set can be untrusted/permissionless again. The
final phase will feature full integration with the Cumulus framework, enabling parachains to be
configured to access multiple cores continuously.

## Technical Considerations

Assuming a constant number of cores, from the relay chain side, elastic scaling will not see major
upgrades as a parachain will use multiple existing cores instead of just one. However, from the
parachain side, collators must produce more parablocks per unit of time, implying that technical
specifications for collators will likely increase.

For more advanced technical challenges, see the
[Elastic Scaling GitHub PR](https://github.com/paritytech/polkadot-sdk/issues/1829).

## Elastic Scaling FAQ

- Is there a maximum number of cores per rollup? There is no maximum number of cores per rollup defined. However, it depends on your goals. If you wish to achieve 500ms blocks, you can do that with 12 cores. But it will not be efficient; you can only use a fraction (up to 25%) of the reference CPU time. For max TPS, there is a limitation of three cores.

- Can multiple cores be reserved in bulk? Yes, you can do a batch call to acquire multiple cores. For more info, see [the coretime FAQ](./learn-agile-coretime.md#agile-coretime-faq).

- Are some cores reserved only for elastic scaling? No, and you can combine bulk with on-demand coretime.