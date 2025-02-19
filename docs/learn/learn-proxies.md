---
id: learn-proxies
title: Proxy Accounts
sidebar_label: Proxy Accounts
description: Proxy Accounts on Polkadot.
keywords: [proxy, proxies, proxy accounts, proxy types, staking proxy]
slug: ../learn-proxies
---

Proxies are helpful because they let you delegate efficiently and add a layer of security. Rather
than using funds in a single account, smaller accounts with unique roles can complete tasks on
behalf of the main stash account. Proxies can be _hotter_ than the initial account, which can be
kept cold, but the _weight_ of the tokens in the colder account can be used by the hotter accounts.
This increases the security of your accounts by minimizing the number of transactions the cold
account has to make. This also drives attention away from the stash account, although it is possible
to determine the relationship between the proxy and the proxied account.

From the security perspective, we can imagine proxies as bodyguards of a VIP, loyal and ready to
risk their lives to ensure the VIP's protection. But proxies are also useful in other contexts such
as efficient account management at the corporate level. They also provide an elegant solution to
change signatories within multi-signature accounts, and they can be used within proxy calls and
nested proxy calls. In this page we will explore all these interesting use cases of proxies within
the Polkadot ecosystem.

Shown below is an example of how you might use these accounts. Imagine you have one stash account as
your primary token-holding account and don't want to access it very often, but you want to
participate in staking to earn staking rewards. You could set one of your existing accounts as a
staking proxy for that stash account, and use your staking proxy to sign all staking-related
transactions.

![proxies](../assets/stash-vs-stash-and-staking-proxy.png)

Having a staking proxy will make the stash account isolated within the staking context. In other
words, the account assigned as a staking proxy can participate in staking on behalf of that stash.
Without the proxy you will need to sign all the staking-related transactions with the stash. If the
proxy is compromised, it doesn't have access to transfer-related transactions, so the stash account
could just set a new proxy to replace it. You can also monitor proxies by
[setting a time-delay](#time-delayed-proxy).

Creating multiple proxy accounts that act for a single account, lets you come up with more granular
security practices around how you protect private keys while still being able to actively
participate in the network.

## Proxy Types

When a proxy account makes a transaction, Polkadot filters the desired transaction to ensure that
the proxy account has the appropriate permission to make that transaction on behalf of the proxied
account. For example, staking proxies have permission to do only staking-related transactions.

When you set a proxy, you must choose a type of proxy for the relationship with the proxied account.

- **Any**: allow any transaction, including balance transfers. In most cases, this should be avoided
  as the proxy account is used more frequently than the cold account and is therefore less secure.
- **Non-transfer**: allow any type of transaction except
  [balance transfers](./learn-transactions.md#balance-transfers) (including
  [vested](./learn-transactions.md#vested-transfers) transfers). Hence, this proxy does not have
  permission to access calls in the Balances and XCM pallet.
- **Governance**: allow to make transactions related to governance.
- **Nomination pool**: allow transactions pertaining to
  [Nomination Pools](./learn-nomination-pools.md).
- **Staking**: allow all staking-related transactions. The stash account is meant to stay in cold
  storage, while the staking proxy account makes day-to-day transactions like setting session keys
  or deciding which validators to nominate. Visit the
  [Advanced Staking Concepts page](./learn-staking-advanced.md#staking-proxies) for more detailed
  information about staking proxies.
- **Identity Judgement**: allow registrars to make judgments on an account's identity. If you are
  unfamiliar with judgment and identities on chain, please refer to
  [this page](learn-identity.md#judgements). This proxy can only access `provide_judgement` call
  from the Identity pallet along with the calls from the Utility pallet.
- **Cancel**: allow to reject and remove any time-delay proxy announcements. This proxy can only
  access `reject_announcement` call from the Proxy pallet.
- **Spokesperson**: Kusama-specific proxy type that only allows `remark` or `remark_with_event`
  calls.
- **Society**: Kusama-specific proxy type that only allows
  [society-related](../maintain/kusama/maintain-guides-society-kusama.md) calls.

## Proxy Deposits

Proxies require deposits in the native currency to be created. The deposit is required because
adding a proxy requires some storage space on-chain, which must be replicated across every peer in
the network. Due to the costly nature of this, these functions could open up the network to a
Denial-of-Service attack. To defend against this attack, proxies require a deposit to be reserved
while the storage space is consumed over the lifetime of the proxy. When the proxy is removed, so is
the storage space, and therefore the deposit is returned.

The required deposit amount for `n` proxies is equal to:

`ProxyDepositBase` + `ProxyDepositFactor` \* `n`

where the [`ProxyDepositBase`](../general/chain-state-values.md#proxy-deposits) is the required
amount to be reserved for an account to have a proxy list (creates one new item in storage). For
every proxy the account has, an additional amount defined by the
[`ProxyDepositFactor`](../general/chain-state-values.md#proxy-deposits) is reserved as well (appends
33 bytes to storage location).

## Time-delayed Proxy

We can add a layer of security to proxies by giving them a delay time. The delay will be quantified
in blocks. Polkadot has approximately 6 seconds of block time. A delay value of 10 will mean ten
blocks, which equals about one minute delay.

The proxy will announce its intended action and will wait for the number of blocks defined in the
delay time before executing it. Within this time window, the intended action may be canceled by
accounts that control the proxy.

Announcing `n` calls using a time-delayed proxy also requires a deposit of the form:

`announcementDepositBase` + `announcementDepositFactor` \* `n`

where the [`announcementDepositBase`](../general/chain-state-values.md#proxy-deposits) is the
required amount to be reserved for an account to announce a proxy call. For every proxy call the
account has, an additional amount defined by the
[`announcementDepositFactor`](../general/chain-state-values.md#proxy-deposits) is reserved as well.

---

!!!info "Polkadot-JS Guides"
    If you are an advanced user, see the [Polkadot-JS guides about proxy accounts](./learn-guides-accounts-proxy.md). You can find information about creating and removing proxies, and more.
