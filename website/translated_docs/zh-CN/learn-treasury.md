---
id: learn-treasury
title: Treasury
sidebar_label: Treasury
---

The treasury is a pot of funds collected through transaction fees, slashing, inefficiencies in the chain's staking set, and lost deposits. The funds held in the treasury can be spent by making a spending proposal that, if approved by the council, will enter a queue that is cleared every 24 days (known as the budget period). The treasury attempts to spend as many proposals in the queue as it can without running out of funds. If the treasury ends a budget period without spending all of its funds, it suffers a burn of small percentage of its funds -- thereby causing deflationary pressure.

When a stakeholder wishes to propose a spend from the treasury, they must reserve a deposit totaling 5% of the proposed spend. This deposit will be slashed if the proposal is rejected, and returned if the proposal was accepted.

提案可能包括 (但不限于):

 - 基础架构部署
 - 网络安全操作(监视服务，审核)。
 - 生态系统发展(与友好链的合作)。
 - 推广活动(广告，合作)。
 - 社区活动(聚会，比萨派对，黑客空间)。
 - 软件开发(钱包和钱包整合，客户端升级)。

财政库最终由利益相关者控制，资金的使用方式取决于他们的判断。

## 资源

 - [Substrate's 财政库模块](https://github.com/paritytech/substrate/blob/master/srml/treasury/src/lib.rs) - 财政库的 Rust 实现 ([文档](https://substrate.dev/rustdocs/master/srml_treasury/index.html))
 - [Gavin Wood's Kusama 推出计划](https://medium.com/@gavofyork/kusama-rollout-and-governance-31eb18041044) - 在 Kusama 网络上的第一个上线环境中详细描述了财政库。
