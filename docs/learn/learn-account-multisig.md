---
id: learn-account-multisig
title: Multi-Signature Accounts
sidebar_label: Multi-Signature Accounts
description: Multi-signature Accounts on Polkadot.
keywords: [account, multisig, polkadot account, polkadotjs, multix]
slug: ../learn-account-multisig
---

!!!info "Multisig Apps"
    See the [multisig apps](../general/multisig-apps.md) page for more information about user-friendly tools about multi-signature accounts.

It is possible to create multi-signature accounts (multisig) in Substrate-based chains. A multisig
is composed of one or more addresses and a threshold. The threshold defines how many signatories
(participating addresses) need to agree on submitting an extrinsic for the call to be successful.

For example, Alice, Bob, and Charlie set up a multisig with a threshold of 2. This means Alice and
Bob can execute any call even if Charlie disagrees with it. Likewise, Charlie and Bob can execute
any call without Alice. A threshold is typically a number smaller than the total number of members
but can also be equal to it, which means they all have to agree.

Multi-signature accounts have several uses:

- securing your stash: use additional signatories as a 2FA mechanism to secure your funds. One
  signer can be on one computer, and another can be on another or in cold storage. This slows down
  your interactions with the chain but is orders of magnitude more secure.
- board decisions: legal entities such as businesses and foundations use multisigs to govern over
  the entity's treasury collectively.
- group participation in governance: a multisig account can do everything a regular account can. A
  multisig account could be a referendum proposer or a recipient of funds (recommended) in
  governance.

Multi-signature accounts **cannot be modified after being created**. Changing the set of members or
altering the threshold is not possible and instead requires the dissolution of the current multisig
and creation of a new one. As such, multisig account addresses are **deterministic**, i.e. you can
always calculate the address of a multisig by knowing the members and the threshold, without the
account existing yet. This means one can send tokens to an address that does not exist yet, and if
the entities designated as the recipients come together in a new multisig under a matching
threshold, they will immediately have access to these tokens.

---

!!!info "Polkadot-JS Guides"
    If you are an advanced user, see the [Polkadot-JS guides about multi-signature accounts](./learn-guides-accounts-multisig.md).
