---
title: "Ledger: Can I Import an Existing Account from Polkadot Developer Interface to my Ledger Device?"
description: "It is not possible to import an account created on the Polkadot Developer Interface or other wallets to a Ledger device. You should transfer your funds from your existing account instead."
---

!!!info "Related concepts"
    For the underlying concepts, see [Ledger](../../general/ledger.md).

This article examines whether it's possible, or advisable, to import an account created on the Polkadot Developer Interface or the Polkadot Developer Signer into your Ledger. This is usually the case when you have bought a new Ledger and you want to move your funds to it for better security.

* * *

### Is it possible to import my account to Ledger?

Unfortunately, the answer is no, it's not possible. Accounts created in Polkadot Developer Interface, the Polkadot Developer Signer, and other third-party ecosystem [wallets](where-to-store-dot.md), use a different [derivation mechanism](../learn-account-advanced.md#portability) than Ledger.

This means that if you were to restore your Ledger with the 12-word mnemonic phrase of your account, you wouldn't get the same account.

But even if it was possible, it wouldn't be recommended. A hardware wallet's security relies on the fact that the private keys are never, nor have ever been, exposed online. Restoring on Ledger an account that was previously online would severely compromise its security.

Furthermore, if it is not a new device, restoring your Ledger with a mnemonic phrase other than the one you got when you first set it up would remove any previously created accounts on **all chains** , which means you would lose access to any accounts you had previously created on your Ledger, along with their funds!

* * *

### What can I do?

The best approach is to create a new account on your Ledger and [send all your funds](send-all-funds.md) from your existing account(s) to it.

If you have staked funds in your account, then you would need to unstake them first and wait until they are ready to be withdrawn. Here's how to unstake your funds:

  * [Using the Staking Dashboard](../../general/dashboards/staking-dashboard.md)
  * [Using Polkadot Developer Interface](unstake-tokens.md)

The unbonding process takes 1-2 days for nominators and 28 days for validators, and during that time you won't receive staking rewards.

* * *
