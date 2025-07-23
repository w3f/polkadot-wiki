---
title: Polkadot 2.0
description: Explore Polkadot 2.0's innovations making Polkadot's decentralized computer more accessible and efficient.
---

Understanding what [Polkadot 1.0](./polkadot-v1.md) is about, and the philosophy behind it, will help
us envision the future direction of the Polkadot as a high-performance decentralized computer capable of delivering resilient and verifiable computation, and interoperability to anyone and anything.
  
## Polkadot 2.0 Definition

Polkadot is **a multi-core decentralized computer** that provides resilient and verifiable computation via virtual cores. Chains that continuously operate in parallel on different virtual cores are called [rollup chains](../learn/learn-parachains.md) (also called parachains).

The Polkadot community [voted on a Wish for Change proposal](https://polkadot.polkassembly.io/referenda/747) stating that Polkadot 2.0 includes the following major technical upgrades:

- [asnychronous backing](../learn/learn-async-backing.md) allowing pipelining and thus a more efficient rollup system that grants rollups more throughput without compromising security.
- [coretime](../learn/learn-agile-coretime.md) allowing agile allocation of cores and thus execution on the Polkadot decentralized computer.
- [elastic scaling](../learn/learn-elastic-scaling.md) allowing the use of multiple cores simultaneously by the same rollup chain to boost throughput.

These technical upgrades made the Polkadot decentralized computer more efficient, powerful, and accessible for anyone to use.

## From Slot Auctions to Coretime Marketplace

Polkadot 1.0 has been abstracted and generalized beyond what was initially proposed and envisioned in the [Polkadot whitepaper](https://polkadot.network/whitepaper/).

Polkadot is a service provider of trustless, resilient, and verifiable computation via cores and secure interoperability between core-secured rollup chains. The future development of Polkadot can be directed towards the following paradigm shift:

- from being an ecosystem where each rollup chain owned an execution core at all times
  (acquired through a candle auction mechanism), which allowed a simple and secure, sharded execution environment
- to being an ecosystem where we remove the assumption that each rollup chain
  owns a core, and instead, all execution cores are a resource to be used as needed by all rollup chains.

The previously used candle auction mechanism was not agile, made access to blockspace competitive, created high entry barriers, and was designed for long-running single blockchains (i.e., the original vision proposed in the Polkadot whitepaper).

The end product of a blockchain is [**blockspace**](./polkadot-v1.md#polkadots-blockspace). In the Polkadot context, blockspace is better described by computation provided by validators and secured via the [ELVES protocol](../learn/learn-parachains-protocol.md).
The entry points to access Polkadot's computation are the virtual cores. Thus, rollups need to reserve time on Polkadot's cores (or **coretime**) to gain the right to access Polkadot's secure computation and interoperability for a finite period.

Thus, classic lease auctions were deprecated to create an agile marketplace for [coretime], where coretime becomes a commodity that can be tokenized, sold, and traded. Rollup chains can purchase:

- **bulk coretime**: a standard purchase of coretime through [the Coretime System Chain](../learn/learn-system-chains.md#existing-system-chains) at a fixed
price for a fixed period, with a predictable renewal price.
- **on-demand coretime**: On-demand purchase of coretime available through ongoing sale for immediate use at a spot price.

This dramatically decreases the barrier-to-entry for software tinkerers and rollup teams. Coretime will allow any rollup chain to access Polkadot's computation based on their needs, maximizing the use of valuable computation. This setup
maximizes the agility of Polkadot and lets the market figure out the best solution needed for rollup chains to be successful.

Coretime sales are burned and contribute to the protocol's revenue by adding deflationary pressure on the DOT token.

## Polkadot 2.0 Core Usage and Functionalities

We have seen how in Polkadot 1.0, one rollup chain has a specific core at all times for a fixed two-year period, whether they needed it or not. However, blocks must be produced when required to achieve full efficiency, and the system must target full block capacity, lowering the probability of incentivizing validators to build blocks half full or, worse, empty.

Polkadot 2.0 generalizes core usage to meet different rollup needs. For more information about coretime, see the [agile coretime documentation](../learn/learn-agile-coretime.md).

The figure below shows the core usage for Polkadot 2.0. The horizontal axis is time, and each row represents a virtual core. The colors show different rollup chains.

<div align="center"> <img src="../../assets/polkadot-v2-cores.png" style="width:600px;" alt="V1 Cores Scheme"> </div>

As shown above, coretime can be:

- **split**: Owners of coretime can split or trade it. A rollup R1 can run on Core 1 for a finite period, and then another rollup R2 can run on that core, or R1 can continue running on another core. Some applications might stop running for some time and resume later on. Note that there is no rollup affinity for cores.
- **interlaced**: Cores can be accessed concurrently, meaning that applications can take turns on a core to share costs or decrease block production rate, for example.

An application can be assigned to multiple cores simultaneously. Some applications can have a
permanent core assignment and an intermittent one, for example, in a period of high demand to send
multiple blocks to multiple cores at the same time slot to reduce latency. Combining coretime across multiple cores is achieved through [elastic scaling](../learn/learn-elastic-scaling.md).

Below is an example of two rollup chains accessing two separate Polkadot cores. The CPU load diagram shows that Chain 1 uses Core 1 computation at 100% while Chain 2 uses Core 2 at 25%.

<div align="center"> <img src="../../assets/one-core-full.png" style="width:400px;" alt="Two Cores Diagram"> </div>

Chain 1 uses Core 1 to its maximum capacity and needs more computation from Polkadot to secure additional rollup blocks. Chain 2 can interlace its coretime so that both chains can access Polkadot's secure computation concurrently via Core 2.

<div align="center"> <img src="../../assets/two-cores-elastic-scaling.png" style="width:400px;" alt="Two Cores Diagram"> </div>

Chain 1 uses elastic scaling by parallelizing computation on two cores. Note how Chain 2 now uses Core 2 at 50% because it sends information to the core less often.




