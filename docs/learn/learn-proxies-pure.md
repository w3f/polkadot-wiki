---
id: learn-proxies-pure
title: Pure Proxy Accounts
sidebar_label: Pure Proxy Accounts
description: Pure Proxy Accounts on Polkadot.
keywords: [proxy, proxies, proxy accounts, pure proxy, anonymous proxy]
slug: ../learn-proxies-pure
---

Pure proxies are very different from other proxy types. The proxies we described so far are
_existing accounts_ assigned as proxies by a primary account. These proxies act on behalf of the
primary account, reducing the exposure of the primary account's private key. Remember, the more
often we use an account's private key to sign transactions, the more we expose that key to the
internet, increasing the visibility of that account. The purpose of a proxy is thus to draw the
attention of potential attackers away from the primary account, as proxies' private keys will be
used most of the time to perform actions on behalf of the primary account.

![anonymous proxies](../assets/proxy-vs-anon.png)

Pure proxies are new accounts that are _created_ (not assigned) by a primary account. That primary
account then acts as _any_ proxy on behalf of the pure proxy. Pure proxies are **keyless
non-deterministic accounts** as they do not have a private key but they have an address that is
randomly generated. Also, in some sense, nobody owns a pure proxy as nobody has a private key to
control them.

!!!info "Pure proxies were called anonymous proxies"
    Pure proxies are not anonymous because they have an address that is spawned by a primary account acting as _any_ proxy. Even if _any_ proxy changes, it is still possible to find who generated the _anonymous_ proxy by going backward using a block explorer. There was thus the need to change the name of _anonymous_ proxy. People suggested _keyless accounts_ since they do not have a private key and are proxied accounts. However, multisig accounts are also keyless (but deterministic). Moreover, even if _anonymous_ proxies are proxied accounts, they can still act as proxies and control other accounts via proxy calls (see multisig example below). Thus, the name that has been chosen is **pure proxy**. If you want to know more about the reasoning behind renaming of pure proxies, see the discussion in [this PR](https://github.com/paritytech/substrate/pull/12283) or the discussion on [Polkadot forum](https://forum.polkadot.network/t/parachain-technical-summit-next-steps/51/14).

## Use of Pure Proxy

The use of the _pure proxy_ is strictly bound to the relationship between the _pure proxy_ and the
_any_ proxy. Note that the _any_ proxy does not necessarily be the one who created the _pure proxy_
in the first place. Hence, _pure proxies_ are not really owned by somebody, but they can be
controlled. Once that relationship between the _pure proxy_ and its _any_ proxy is broken, the _pure
proxy_ will be inaccessible (even if visible on the Polkadot-JS UI). Also, _pure proxies_ are
non-deterministic, meaning that if we lose one _pure proxy_, the next one we create from the same
primary account will have a different address.

_Pure proxies_ cannot sign anything because they do not have private keys. However, although they do
not have private keys and cannot sign any transaction directly, they can act as proxies (or better,
proxy channels) within `proxy.proxy` calls (proxy calls). For example, it is possible to have _pure
proxies_ within a multisig. Using proxy calls, it is possible to use the _any_ proxy to call the
_pure_ proxy, which in turn will do a multisig call. More about this later on.

!!!danger
    Once you remove the relationship with _any_ proxy, the _pure_ proxy will be inaccessible. Also, _pure_ proxies cannot sign for anything.

## Why Pure Proxy?

Pure proxies have important benefits that we discuss below:

- **Enhanced Security**: Pure proxies cannot be stolen because they do not have private keys. The
  only accounts that have full access to the _pure_ proxies are _any_ proxies. Security can be
  further increased if the _any_ proxy is a multi-signature account.
- **Simplified and Secure Account Management**: Pure proxies can simplify the management of complex
  account relationships at a corporate level.
- **Multi-signature Account Management**: Pure proxies are useful to efficiently manage
  multi-signature (multisig) accounts. In fact, multi-signature accounts are deterministic, which
  means that once a multisig is created the signatories cannot be changed. If one of the signatories
  wants to leave the multisig, a new multisig must be created. This is inconvenient, especially at
  corporate-level management where the chance of replacing someone within a multisig can be high.
  _Pure_ proxies allow keeping the same multisig when the signatories change.

---

!!!info "Polkadot-JS Guides"
    If you are an advanced user, see the [Polkadot-JS guides about pure proxy accounts](./learn-guides-accounts-proxy-pure.md).
