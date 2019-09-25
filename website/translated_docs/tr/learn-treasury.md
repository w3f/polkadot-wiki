---
id: learn-treasury
title: Treasury
sidebar_label: Treasury
---

The treasury is a pot of funds collected through transaction fees, slashing, inefficiencies in the chain's staking set, and lost deposits. The funds held in the treasury can be spent by making a spending proposal that, if approved by the council, will enter a queue that is cleared every 24 days (known as the budget period). The treasury attempts to spend as many proposals in the queue as it can without running out of funds. If the treasury ends a budget period without spending all of its funds, it suffers a burn of small percentage of its funds -- thereby causing deflationary pressure.

When a stakeholder wishes to propose a spend from the treasury, they must reserve a deposit totaling 5% of the proposed spend. This deposit will be slashed if the proposal is rejected, and returned if the proposal was accepted.

Proposals may consist of (but are not limited to):

- Infrastructure deployment and continued operation.
- Network security operations (monitoring services, continuous auditing).
- Ecosystem provisions (collaborations with friendly chains).
- Marketing activities (advertising, paid features, collaborations).
- Community events and outreach (meetups, pizza parties, hackerspaces).
- Software development (wallets and wallet integration, clients and client upgrades).

The treasury is ultimately controlled by the stakeholders, and how the funds will be spent is up to their judgment.

## Resources

- [Substrate's Treasury Module](https://github.com/paritytech/substrate/blob/master/srml/treasury/src/lib.rs) - The Rust implementation of the treasury. ([Docs](https://substrate.dev/rustdocs/master/srml_treasury/index.html))
- [Gavin Wood's Kusama Rollout Plan](https://medium.com/@gavofyork/kusama-rollout-and-governance-31eb18041044) - Details the treasury in its first live environment on the Kusama network.