---
title: Pure Proxy Accounts
description: Discover pure proxy accounts in Polkadot, their unique features, security benefits, and use cases for efficient account management.
---

Pure proxies are very different from other proxy types. So far, the proxies we have described are
_existing accounts_ assigned as proxies by a primary account. These proxies act on behalf of the
primary account, reducing the exposure of the primary account's private key. Remember, the more
often we use an account's private key to sign transactions, the more we expose that key to the
internet, increasing the visibility of that account. The purpose of a proxy is thus to draw the
attention of potential attackers away from the primary account, as proxies' private keys will be
used most of the time to perform actions on behalf of the primary account.

![pure proxies](../assets/proxy-vs-anon.png)

Pure proxies are new accounts that are _created_ (not assigned) by a primary account. That primary
account then acts as _any_ proxy on behalf of the pure proxy. Pure proxies are **keyless
non-deterministic accounts** as they do not have a private key (keyless), but they have a
randomly generated address (non-deterministic). Also, nobody owns a pure proxy, as nobody has a private key to control them.

## Why Pure Proxy?

In the Polkadot ecosystem, pure proxies are helpful in efficiently managing multi-signature accounts. Multi-signature accounts are deterministic, which means that once a multisig is created, the signatories cannot be changed. If one of the signatories wants to leave the multisig, a new multisig must be created. _Pure_ proxies allow keeping the same multisig address when the multisig configuration changes (signatories and threshold). See more examples about using pure proxies with multisigs [here](./learn-guides-accounts-proxy-pure.md#pure-proxies-and-multisigs).

## Use of Pure Proxy

!!!info "Use dApps that deal with pure proxies for you"
    Because dealing with pure proxies is complicated, using [multisig applications](../general/multisig-apps.md) that deal with the complexity for you is recommended.

The use of the _pure proxy_ is strictly bound to the relationship between the _pure proxy_ and the
_any_ proxy. Note that the _any_ proxy does not necessarily be the one who created the _pure proxy_
in the first place. Hence, _pure proxies_ are not really owned by somebody but can be
controlled. 

!!!danger "Once that relationship between the _pure proxy_ and its _any_ proxy is broken, the _pure_ proxy will be inaccessible."

Pure proxies are non-deterministic accounts, meaning that if we lose one _pure proxy_, the next one we create from the same primary account will have a different address.

_Pure proxies_ cannot sign anything because they do not have private keys. However, although they do
not have private keys and cannot sign any transaction directly, they can act as proxies (or better,
proxy channels) within proxy calls via `proxy.proxy` extrinsic. [For example](./learn-guides-accounts-proxy-pure.md#scenario-one-one-pure-proxy-within-a-multisig), having _pure
proxies_ within a multisig is possible. Using proxy calls, it is possible to use the _any_ proxy to call the
_pure_ proxy, which in turn will do a multisig call.

## History of Pure Proxies

In the past, pure proxies were called anonymous proxies. However, pure proxies are not anonymous because they have an address spawned by a primary account acting as _any_ proxy. Even if _any_ proxy changes, it is still possible to find who generated the _anonymous_ proxy by going backward using a block explorer. There was thus the need to change the name of _anonymous_ proxy. People suggested _keyless accounts_ since they do not have a private key and are proxied accounts. However, multisig accounts are also keyless (but deterministic). Moreover, even if _anonymous_ proxies are proxied accounts, they can still act as proxies and control other accounts via proxy calls (see multisig example below). Thus, the name that has been chosen is **pure proxy**. If you want to know more about the reasoning behind the renaming of pure proxies, see the discussion in [this PR](https://github.com/paritytech/substrate/pull/12283) or the discussion on [Polkadot forum](https://forum.polkadot.network/t/parachain-technical-summit-next-steps/51/14).

## Remote Proxies

Remote proxies enable the utilization of pure proxy accounts, initially established on a designated parent chain (i.e., the Polkadot relay chain), for actions on a separate target chain (i.e., Polkadot Asset Hub). This is achieved by providing a cryptographic proof, specifically a storage proof anchored to the parent chain's storage root. This proof verifies that the specified pure proxy account indeed exists and is valid on the parent chain at a particular point in time.

An example would be a multi-signature account, where a pure proxy is created on the Polkadot Relay Chain. To cosign a transaction on Polkadot Asset Hub, this keyless pure proxy cannot directly interact. The remote proxy mechanism bridges this gap. Leveraging the remote proxy pallet on Asset Hub, a transaction can be constructed that includes a storage proof demonstrating the pure proxy's existence on the relay chain. Upon successful verification of this proof, the Asset Hub chain allows actions to be executed as if they originated from the pure proxy on the Relay Chain.

Once a successful remote proxy call is executed, a `ProxyExecuted` event should be visible. 

You can use [this tool](https://w3f.github.io/RemoteProxyCall/) to construct a transaction that transfers all funds from a pure proxy on Kusama Asset Hub to its controlling account on the Kusama Relay Chain. The underlying code is available [on GitHub](https://github.com/w3f/RemoteProxyCall), and is based on [this blog post](https://blog.kchr.de/polkadot/guides/remote-proxies-for-the-braves/). For more context on how remote proxies work and why they're helpful, check out [this blog post](https://blog.kchr.de/ecosystem-proxy/).


---

!!!info "Polkadot-JS Guides"
    If you are an advanced user, see the [Polkadot-JS guides about pure proxy accounts](./learn-guides-accounts-proxy-pure.md).
