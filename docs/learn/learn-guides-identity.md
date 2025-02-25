---
id: learn-guides-identity
title: Polkadot-JS Guides about Identity
sidebar_label: Identity Guides
description: Polkadot-JS Guides about Identity.
keywords: [registrar, identity, sub-identity, polkadot-js]
slug: ../learn-guides-identity
---

<!-- MessageBox -->
<div id="messageBox" class="floating-message-box">
  <p>
    Polkadot-JS is for developers and power users only. If you need help using the Polkadot-JS UI, you can contact the
    <a href="https://support.polkadot.network/support/home" target="_blank" rel="noopener noreferrer">
      Polkadot Support Team.
    </a>
  </p>
  <button class="close-messagebox" aria-label="Close message">✖</button>
</div>

!!!warning "The identity pallet is no longer on the Kusama relay chain."
    If you are on **Kusama**, any of the extrinsics which require you to use the relay chain now have to be called via the system parachain, [which you can find here.](https://polkadot.js.org/apps/?rpc=wss://kusama-people-rpc.polkadot.io)
    
    The identity pallet, along with all of its data, has been migrated to the [People Chain](../general/glossary.md#people-chain), a system parachain which can now be used for identity management.

This is an advanced guide that is relevant for entities that would like to become registrars or
would like to set sub-identities to an existing account with an identity. See
[this page](./learn-identity.md) to learn about how to set an identity and have it verified.

## Setting an Identity

Users can set an identity by registering through default fields such as legal name, display name,
website, Twitter handle, Riot handle, etc. along with some extra, custom fields for which they would
like attestations (see [Judgements](./learn-identity.md#judgements)).

!!!info "Instructions for setting and clearing Identities"
    The procedure to set and clear identities is explained in detail in this support article - [How to set and clear an Identity](https://support.polkadot.network/support/solutions/articles/65000181981-how-to-set-and-clear-an-identity)

!!!note The Ledger app on **Nano S** doesn't support the extrinsic for setting identity. As a workaround, create a primary identity with an on-chain account and then using that primary identity, assign a [sub-identity](./learn-identity.md#sub-identities) to the Ledger stash.

### Format Caveat

Please note the following caveat: because the fields support different formats, from raw bytes to
various hashes, a UI has no way of telling how to encode a given field it encounters. The
Polkadot-JS UI currently encodes the raw bytes it encounters as UTF8 strings, which makes these
values readable on-screen. However, given that there are no restrictions on the values that can be
placed into these fields, a different UI may interpret them as, for example, IPFS hashes or encoded
bitmaps. This means any field stored as raw bytes will become unreadable by that specific UI. As
field standards crystallize, things will become easier to use but for now, every custom
implementation of displaying user information will likely have to make a conscious decision on the
approach to take, or support multiple formats and then attempt multiple encodings until the output
makes sense.

## Request Judgement

!!!info "Instructions for requesting and cancelling Identity judgements"
    The procedure to request and cancel identity judgments is explained in detail in this [support article](https://support.polkadot.network/support/solutions/articles/65000181990-how-to-request-and-cancel-identity-judgement)

To be judged after submitting your identity information, go to the
[Extrinsics tab in the Polkadot-JS UI](https://polkadot.js.org/apps/#/extrinsics) and select the
`identity` pallet, then `requestJudgement`. For the `reg_index` put the index of the registrar you
want to be judged by, and for the `max_fee` put the maximum you're willing to pay for these
confirmations.

If you don't know which registrar to pick, first check the available registrars by going to
[Chain State tab in the Polkadot-JS UI](https://polkadot.js.org/apps/#/chainstate) and selecting
`identity.registrars()` to get the full list.

To find out how to contact the registrar after the application for judgement or to learn who they
are, you can check their identity by adding them to your Address Book. Their identity will be
automatically loaded.

![Chevdor is registrar #1](../assets/identity/16.jpg)

!!!info "Requesting judgement through Web3 Foundation Registrar"
    If you requested judgement for your on-chain identity through the Web3 Foundation Registrar (i.e. Registrar #0) you will need to complete a few additional tasks. For more information visit [this support article](https://support.polkadot.network/support/solutions/articles/65000179747-how-to-use-the-w3f-registrar-page).

!!!caution
    The set identity calls go on-chain. Hence, the contact information is available publicly, for both legitimate entities, like registrars or validators, but also scammers who might impersonate them. The strings in the identity fields are good candidates for homograph attacks, as someone could list a fraudulent website (web3.f0undation instead of web3.foundation for example) and still get verified by the registrar (if the checks are automated)!
    
    In a decentralized network, one should be cautious making transactions with accounts solely based on their identity. If an account on-chain claims to be of Web3 Foundation, it is wise to verify its authenticity by checking directly with Web3 Foundation or examining the established history of that account on-chain.

## Clearing and Killing an Identity

!!!info
    Visit the section "Clear an Identity" on [this support article](https://support.polkadot.network/support/solutions/articles/65000181981) for guidelines about clearing identities.

**Clearing:** Users can clear their identity information and have their deposit returned. Clearing
an identity also clears all sub accounts and returns their deposits.

**Killing:** It is possible to kill an identity that deems erroneous. This results in a slash of the
deposit.

## Setting Sub-Identities

To set up sub-identities with Polkadot-JS see the
[how to set sub-identities](https://support.polkadot.network/support/solutions/articles/65000181991-how-to-set-identities-for-sub-accounts)
support article and this [video tutorial](https://www.youtube.com/watch?v=0Yh1JYg3ZKU).

### Setting Sub-Identity (Sub-ID) for your Ledger Account

Setting an Identity is not possible on Ledger app yet, but as a workaround, you can
[set the identity for an on-chain account ](../learn/learn-guides-identity.md#setting-an-identity) and then
use it to set a sub-identity to your Ledger account.

- Go to https://polkadot.js.org/apps/#/accounts. Click on the three vertical dots corresponding to
  the account to which you already set identity. You should see an option to set onchain
  sub-identities. Click on it.

  ![Add sub-identity in PolkadotJS](../assets/identity/sub-id-1.png)

- In the pop-up window, select your Ledger account from the dropdown and enter text in sub name
  field. Then, click on set subs button.
  ![Set sub-identity in PolkadotJS](../assets/identity/sub-id-2.png)
- Sign and submit the transaction from the parent account with the identity

You should now see the sub-identity displayed on-chain. You need to be aware that the creation of
identities and sub-identities requires
[deposits](../general/chain-state-values.md#identity-deposit). This reserved account balance is
freed once you [clear the identities](../learn/learn-guides-identity.md#clearing-and-killing-an-identity)
on the account.

![Sub-identity example](../assets/identity/sub-id-3.png)

## Registrars

### Becoming a Registrar

To become a registrar, submit a pre-image and proposal on
[OpenGov](../learn/learn-guides-polkadot-opengov.md), then wait for people to vote on it. For best
results, write a post about your identity and intentions beforehand, and once the proposal is in the
queue ask people to endorse it so that it gets ahead in the referendum queue.
