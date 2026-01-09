---
title: Funding Opportunities
description: An Overview of Funding Opportunities within the Polkadot Ecosystem.
---

If you are sure you want to apply for strategic funding, head straight to the
[Web3 Foundation funding support page](https://web3.foundation/funding-support/). Before applying for strategic funding, please read [these guidelines](https://medium.com/web3foundation/new-w3f-grant-guidelines-b2c921a84850).
Alternatively, the flowchart below outlines where we think the strategic funding fits in relation to
other popular funding opportunities.

## Funding Opportunities Overview

```mermaid
flowchart LR
    A(Project Focus)
    A -->|Development| B[Stage of Development]
    A -->|Research| C[Strategic Funding]
    A -->|Other| D[Business model exists]
    B -->|Existing POC| E[Treasury]
    B -->|No POC| F[Strategic Funding]
    D -->|No| H[Treasury]
    D -->|Yes| J[Ecosystem Funds]
    style C stroke:#e83e8c,stroke-width:2px,stroke-dasharray: 5 5
    style E stroke:#e83e8c,stroke-width:2px,stroke-dasharray: 5 5
    style F stroke:#e83e8c,stroke-width:2px,stroke-dasharray: 5 5
    style H stroke:#e83e8c,stroke-width:2px,stroke-dasharray: 5 5
    style J stroke:#e83e8c,stroke-width:2px,stroke-dasharray: 5 5
    click C "https://grants.web3.foundation/docs/Process/how-to-apply" "Apply now"
    click F "https://grants.web3.foundation/docs/Process/how-to-apply" "Apply now"
    click E "https://wiki.polkadot.network/learn/learn-polkadot-opengov-treasury/" _blank
    click H "https://wiki.polkadot.network/learn/learn-polkadot-opengov-treasury/" _blank
    click J "https://wiki.polkadot.network/general/ecosystem-funds/" _blank
```