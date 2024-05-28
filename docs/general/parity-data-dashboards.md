---
id: parity-data-dashboards
title: Parity Data Dashboards
sidebar_label: Parity Data Dashboards
description: Data dashboards maintained by the Parity Data team
keywords: [data, data-analytics, polkadot, dashboard, dashboards]
slug: ../parity-data-dashboards
---

## Accessing Polkadot Ecosystem Dashboards

The Parity Data Team has made publicly available a [website](https://dashboards.data.paritytech.io/) that displays a number of dashboards relating to Polkadot Ecosystem On-Chain data. The graphs provided are grouped into the following sections: [Stablecoins](https://dashboards.data.paritytech.io/stablecoins.html), [Treasury Related Activity](https://dashboards.data.paritytech.io/treasuries.html), [Staking](https://dashboards.data.paritytech.io/staking.html) and aggregated [Ecosystem-wide](https://dashboards.data.paritytech.io/parachains.html) metrics. There is also a [Monthly Report](https://dashboards.data.paritytech.io/eoyr.html) which provides a monthly updated version of [The Polkadot in Numbers: Annual Report 2023](https://dashboards.data.paritytech.io/reports/2023/index.html).

## Where the Data Comes From

The data displayed on the website comes from Dotlake, which is a scalable and cost-efficient data platform built on Google Cloud Platform (GCP) by the Data Team at [Parity Technologies](https://www.parity.io/). It's designed to store all blocks, events, extrinsics, and more for all the chains in the Polkadot ecosystem. The platform uses a range of existing technologies, keeping the architecture simple with low operational overhead. This includes tools like Terraform, the Substrate Sidecar, Rust & Python programming languages, and various GCP services like Cloud Storage, BigQuery, Cloud Run & Jobs, and Workflows & Functions.

The approach allows the processing of data from block number N to M, storing the raw results as JSON in Google Cloud Storage. This method not only provides a convenient abstraction, but also avoids the pitfalls of custom block parsing strategies in the ever-evolving Substrate Framework. The key to the platform's efficiency is the Block Compressor, which optimizes and reduces the data size significantly, making it more manageable for analytical purposes.

Dotlake has evolved from it's origins as a data warehouse built to serve Parity's internal data needs. Since then, the scope has been broadened to share data intitiatives and learnings with the wider community. The plan is to progressively make datasets available to the public, alongside dashboards, metrics, code, and best practices employed to ingest and decode Substrate data. 

Dotlake currently consists of 70+ Polkadot & Kusama chains with their full history and is continuously expanding.

**Dotlake Batch Architecture**
![Batch](https://dashboards.data.paritytech.io/dotlake-batch.39e50357.png)

**Real-Time Architecture**
![Real-Time](https://dashboards.data.paritytech.io/dotlake-rt.74537c4d.png)

## Support

Questions or requests for support regarding Polkadot data can be made by getting in contact with data-team@parity.io. 
