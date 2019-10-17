---
id: learn-treasury
title: Treasury
sidebar_label: Treasury
---

财政库是通过交易费用，Slashing 惩罚，低抵押效率下， 和丢失的存款收集。刻资金存放在财政库可通过提交开支方案。如果议会批准， 将放置到每24天清除一次的队列(称为预算期)。 财政库尝试花费在队列中尽可能多的提案，而又不会耗尽资金。 如果财政库在预算期间内没有花光所有的资金，一小部分资金将会被消耗，从而造成通缩压力。

当利益相关者希望从财政库中增加支出时，他们必须为分配的总支出计存入5％的抵押金。如果提案被拒绝，则该笔抵押金将被Slash。如果提案被接受，则该抵押金将被退还。

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
