---
id: learn-proxies
title: Proxy Accounts
sidebar_label: Proxy Accounts
---

Polkadot provides a module that allows users to set proxy accounts to perform a limited number of actions on their behalf. Much like the Stash and Controller account relationship in [staking](learn-staking), proxies allow users to keep one account in cold storage and actively participate in the network with the weight of the tokens in that account.

## Proxy Types

You can set a proxy account via the Proxy module. When you set a proxy, you must choose a type of proxy for the relationship. Polkadot offers:

- Any
- Non-transfer
- Staking
- Governance

When a proxy account makes a `proxy` transaction, Polkadot filters the desired transaction to ensure that the proxy account has the appropriate permission to make that transaction on behalf of the cold account.

As implied by the name, a proxy type of "Any" allows the proxy account to make any transaction, incuding balance transfers. In most cases, this should be avoided as the proxy account is used more frequently than the cold account and is therefore less secure. To allow any type of transaction except balance transfers (including vested transfers), the "Non-transfer" proxy type will be a better fit.

The "Governance" type will allow proxies to make transactions related to governance (i.e., from the Democracy, Council, Treasury, Technical Committee, and Elections pallets).

The "Staking" type allows staking-related transactions, but do not confuse a staking proxy with the Controller account. Within the Staking pallet, some transactions must come from the Stash, while others must come from the Controller. The Stash account is meant to stay in cold storage, while the Controller account makes day-to-day transactions like setting session keys or deciding which validators to nominate. The Stash account still needs to make some transactions, though, like bonding extra funds or designating a new Controller. A proxy doesn't change the _roles_ of Stash and Controller accounts, but does allow the Stash to be accessed even less frequently.

### Anonymous Proxies

Polkadot includes a function to create an anonymous proxy, an account that can only be accessed via proxy. That is, it generates an address but no corresponding private key. Normally, a primary account designates a proxy account, but anonymous proxies are the opposite. The account that creates the proxy relationship is the proxy account and the new account is the primary. Use extreme care with anonymous proxies; once you remove the proxy relationship, the account will be inaccessible.

## Putting It All Together

If the idea of proxy types and their application seems abstract, they are. Here is an example of how you might use these accounts. Imagine you have one account as your primary token-holding account, and don't want to access it very often, but you do want to participate in governance and staking. You could set Governance and Staking proxies.

![proxies](assets/proxies-example.png)

In this example, the primary account A would only make two transactions to set account B as its governance proxy and account C as its staking proxy. Now, account B could participate in governance activity on behalf of A.

Likewise, account C could perform actions typically associated with a stash account, like bonding funds and setting a Controller, in this case account D. Actions that normally require the Stash, like bonding extra tokens or setting a new Controller, can all be handled by its proxy account C. In the case that account C is compromised, it doesn't have access to transfer-related transactions, so the primary account could just set a new proxy to replace it.

By creating multiple accounts that act for a single account, it lets you come up with more granular security practices around how you protect private keys while still being able to actively participate in a network.
