---
id: learn-identity
title: Account Identity
sidebar_label: Account Identity
description: On-chain Identity, Judgements and Registrars.
keywords: [identity, registrars, judgements]
slug: ../learn-identity
---

!!!info "Setting your identity on Polkassembly"
    You can set your identity using the Polkassembly dApp. Follow [these support guides](https://support.polkadot.network/support/solutions/articles/65000187627-how-to-set-your-on-chain-identity-on-polkassembly).

Polkadot provides a naming system that allows participants to add personal information to their
on-chain account and subsequently ask for verification of this information by
[registrars](#registrars).

Users must [reserve funds](../general/chain-state-values.md#identity-deposit) in a bond to store
their information on chain. These funds are _locked_, not spent - they are returned when the
identity is cleared.

Identities are managed on the [People system chain](./learn-system-chains.md).

You can cross-chain transfer your DOT tokens to the People system chain using
[Nova Wallet](https://novawallet.io/). A guide on how to do this can be found
[here](https://docs.novawallet.io/nova-wallet-wiki/asset-management/how-to-send-tokens/send-tokens-cross-chain).

## Sub-Identities

Users can also link accounts by setting "sub accounts", each with its own identity, under a primary
account. The system reserves a bond for each sub account. An example of how you might use this would
be a validation company running multiple validators. A single entity, "My Staking Company", could
register multiple sub accounts that represent the [Stash accounts](learn-cryptography.md) of each of
their validators.

An account can have a maximum of 100 sub-accounts. Note that a
[deposit](../general/chain-state-values.md#sub-identity-deposit) is required for every sub-account.

## Judgements

After a user injects their information on chain, they can request judgement from a registrar. Users
declare a maximum fee that they are willing to pay for judgement, and registrars whose fee is below
that amount can provide a judgement.

When a registrar provides judgement, they can select up to six levels of confidence in their
attestation:

- Unknown: The default value, no judgement made yet.
- Reasonable: The data appears reasonable, but no in-depth checks (e.g. formal KYC process) were
  performed (all the currently verified identities on-chain).
- Known Good: The registrar has certified that the information is correct (this step involves
  verification of state issued identity documents, and at the moment no account has known good
  identity, with the exception of registrars).
- Out of Date: The information used to be good, but is now out of date.
- Low Quality: The information is low quality or imprecise, but can be fixed with an update.
- Erroneous: The information is erroneous and may indicate malicious intent.

A seventh state, "fee paid", is for when a user has requested judgement and it is in progress.
Information that is in this state or "erroneous" is "sticky" and cannot be modified; it can only be
removed by the complete removal of the identity.

Registrars gain trust by performing proper due diligence and would presumably be replaced for
issuing faulty judgments.

## Registrars

Registrars can set a fee for their services and limit their attestation to certain fields. For
example, a registrar could charge 1 DOT to verify one's legal name, email, and GPG key. When a user
requests judgement, they will pay this fee to the registrar who provides the judgement on those
claims. Users set a maximum fee they are willing to pay and only registrars below this amount would
provide judgement.

There are multiple registrars on Polkadot and Kusama. Unless no additional information is available
here, you must reach out to specific registrars individually if you want to be judged by those.

!!!info "Decommissioned Registrar Service"
    From the 1st of April 2024 onwards, **Registrar 0** will still exist on-chain but will not accept any new judgment requests. The registrar fee is set to a substantial amount to dissuade identity judgement requests. Identities judged by the registrar before that date will not be affected. For new identity judgment, please use the other registrars.

=== "Polkadot"

    ~~Registrar 0~~ : <br /> **URL**: NA <br /> **Account**:
    ~~12j3Cz8qskCGJxmSJpVL2z2t3Fpmw3KoBaBaRGPnuibFc7o8~~ <br /> **Fee**: ~~0 DOT~~ <br />

    Registrar 1: <br /> **URL**: https://registrar.d11d.net/ <br /> **Account**:
    1Reg2TYv9rGfrQKpPREmrHRxrNsUDBQKzkYwP1UstD97wpJ <br /> **Fee**: 20 DOT <br />

    Registrar 2: <br /> **Account**: 1EpXirnoTimS1SWq52BeYx7sitsusXNGzMyGx8WPujPd1HB <br /> **Fee**: 0
    DOT <br />

    Registrar 3: <br /> **Account**: 13SceNt2ELz3ti4rnQbY1snpYH4XE4fLFsW8ph9rpwJd6HFC <br /> **Fee**:
    0.5 DOT <br /> Polkassembly (Registrar 3) provides setting on-chain ID as a service on their
    [website](https://polkadot.polkassembly.io/).

    Registrar 4: <br /> **URL**: https://polkaidentity.com/ <br /> **Account**:
    16LYBUcQKWZjAYE4oAPWx9XFaEYnCAffwpPuPWrUvU1mqBZT <br /> **Fee**: 0.5 DOT <br /> PolkaIdentity
    (Registrar 4) provides setting on-chain ID as a service on their
    [website](https://polkaidentity.com/).

=== "Kusama"

    ~~Registrar 0~~ : <br /> **URL**: NA <br /> **Account**:
    ~~H4XieK3r3dq3VEvRtqZR7wN7a1UEkXxf14orRsEfdFjmgkF~~ <br /> **Fee**: ~~0.04 KSM~~ <br />

    Registrar 1: <br /> **URL**: https://registrar.d11d.net/ <br /> **Account**:
    Fom9M5W6Kck1hNAiE2mDcZ67auUCiNTzLBUdQy4QnxHSxdn <br /> **Fee**: 4.5 KSM <br />

    Registrar 2: is no longer offering registrar services on Kusama. <br /> **Account**:
    ~~EK8veMNH6sVtvhSRo4q1ZRh6huCDm69gxK4eN5MFoZzo3G7~~ <br /> **Fee**: ~~1 KSM~~ <br />

    Registrar 3: <br /> **Account**: GLiebiQp5f6G5vNcc7BgRE9T3hrZSYDwP6evERn3hEczdaM <br /> **Fee**: 1
    KSM <br /> Polkassembly (Registrar 3) provides setting on-chain ID as a service on their
    [website](https://kusama.polkassembly.io/).

    Registrar 4: <br /> **Account**: GhmpzxUyTVsFJhV7s2wNvD8v3Bgikb6WvYjj4QSuSScAUw6 <br /> **Fee**:
    0.04 KSM <br />

    Registrar 5: <br /> **Account**: F1wAMxpzvjWCpsnbUMamgKfqFM7LRvNdkcQ44STkeVbemEZ <br /> **Fee**:
    0.04 KSM <br /> Polkassembly (Registrar 5) provides setting on-chain ID as a service on their
    [website](https://kusama.polkassembly.io/).

    Registrar 6: <br /> **URL**: https://polkaidentity.com/ <br /> **Account**:
    HurhThD66KBUf2zcE9Zhx46sCqNJXviKhWAct95rBCkPuix <br /> **Fee**: 0.04 KSM <br /> PolkaIdentity
    (Registrar 6) provides setting on-chain ID as a service on their
    [website](https://polkaidentity.com/).

See [this page](./learn-guides-identity.md#registrars) to learn how to become a Registrar.

---

!!!info "Polkadot-JS Guides"
    If you are an advanced user, see the [Polkadot-JS guides about account identity](./learn-guides-identity.md).
    
    See also [these Polkadot-JS support guides](https://support.polkadot.network/support/solutions/articles/65000181981-how-to-set-and-clear-an-identity).
