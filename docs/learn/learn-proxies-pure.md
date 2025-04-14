---
title: Pure Proxy Accounts
description: Discover pure proxy accounts in Polkadot, their unique features, security benefits, and use cases for efficient account management.
---

Pure proxies are very different from other proxy types. The proxies we described so far are
_existing accounts_ assigned as proxies by a primary account. These proxies act on behalf of the
primary account, reducing the exposure of the primary account's private key. Remember, the more
often we use an account's private key to sign transactions, the more we expose that key to the
internet, increasing the visibility of that account. The purpose of a proxy is thus to draw the
attention of potential attackers away from the primary account, as proxies' private keys will be
used most of the time to perform actions on behalf of the primary account.

![pure proxies](../assets/proxy-vs-anon.png)

Pure proxies are new accounts that are _created_ (not assigned) by a primary account. That primary
account then acts as _any_ proxy on behalf of the pure proxy. Pure proxies are **keyless
non-deterministic accounts** as they do not have a private key (keyless) but they have an address that is
randomly generated (non-deterministic). Also, in some sense, nobody owns a pure proxy as nobody has a private key to control them.

## Why Pure Proxy?

In the Polkadot ecosystem, pure proxies are useful to efficiently manage multi-signature accounts. In fact, multi-signature accounts are deterministic, which means that once a multisig is created the signatories cannot be changed. If one of the signatories wants to leave the multisig, a new multisig must be created. _Pure_ proxies allow keeping the same multisig address when the multisig configuration changes (signatories and threshold). See more examples about using pure proxies with multisigs [here](./learn-guides-accounts-proxy-pure.md#pure-proxies-and-multisigs).

## Use of Pure Proxy

!!!info "Use dApps that deal with pure proxies for you"
    Because dealing with pure proxies is complicated, it is recommended to use [multisig applications](../general/multisig-apps.md) that deal with the complexity for you.

The use of the _pure proxy_ is strictly bound to the relationship between the _pure proxy_ and the
_any_ proxy. Note that the _any_ proxy does not necessarily be the one who created the _pure proxy_
in the first place. Hence, _pure proxies_ are not really owned by somebody, but they can be
controlled. 

!!!danger "Once that relationship between the _pure proxy_ and its _any_ proxy is broken, the _pure_ proxy will be inaccessible."

Pure proxies are non-deterministic accounts, meaning that if we lose one _pure proxy_, the next one we create from the same primary account will have a different address.

_Pure proxies_ cannot sign anything because they do not have private keys. However, although they do
not have private keys and cannot sign any transaction directly, they can act as proxies (or better,
proxy channels) within proxy calls via `proxy.proxy` extrinsic. [For example](./learn-guides-accounts-proxy-pure.md#scenario-one-one-pure-proxy-within-a-multisig), it is possible to have _pure
proxies_ within a multisig. Using proxy calls, it is possible to use the _any_ proxy to call the
_pure_ proxy, which in turn will do a multisig call.

## History of Pure Proxies

In the past, pure proxies were called anonymous proxies. However, pure proxies are not anonymous because they have an address that is spawned by a primary account acting as _any_ proxy. Even if _any_ proxy changes, it is still possible to find who generated the _anonymous_ proxy by going backward using a block explorer. There was thus the need to change the name of _anonymous_ proxy. People suggested _keyless accounts_ since they do not have a private key and are proxied accounts. However, multisig accounts are also keyless (but deterministic). Moreover, even if _anonymous_ proxies are proxied accounts, they can still act as proxies and control other accounts via proxy calls (see multisig example below). Thus, the name that has been chosen is **pure proxy**. If you want to know more about the reasoning behind renaming of pure proxies, see the discussion in [this PR](https://github.com/paritytech/substrate/pull/12283) or the discussion on [Polkadot forum](https://forum.polkadot.network/t/parachain-technical-summit-next-steps/51/14).

---

!!!info "Polkadot-JS Guides"
    If you are an advanced user, see the [Polkadot-JS guides about pure proxy accounts](./learn-guides-accounts-proxy-pure.md).
