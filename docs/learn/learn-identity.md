---
id: learn-identity
title: Account Identity
sidebar_label: Account Identity
description: On-chain Identity, Judgements and Registrars.
keywords: [identity, registrars, judgements]
slug: ../learn-identity
---

import RPC from "./../../components/RPC-Connection";

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} provides a naming system that allows
participants to add personal information to their on-chain account and subsequently ask for
verification of this information by [registrars](#registrars).

Users must reserve funds in a bond to store their information on chain:
{{ polkadot: <RPC network="polkadot" path="consts.identity.basicDeposit" defaultValue={202580000000} filter="humanReadable"/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.identity.basicDeposit" defaultValue={33333000000} filter="humanReadable"/> :kusama }}
and
{{ polkadot: <RPC network="polkadot" path="consts.identity.fieldDeposit" defaultValue={660000000} filter="humanReadable"/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.identity.fieldDeposit" defaultValue={8333000000} filter="humanReadable"/> :kusama }}
per each field beyond the legal name. These funds are _locked_, not spent - they are returned when
the identity is cleared.

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
example, a registrar could charge {{ polkadot: 1 DOT :polkadot }}{{ kusama: 0.1 KSM :kusama }} to
verify one's legal name, email, and GPG key. When a user requests judgement, they will pay this fee
to the registrar who provides the judgement on those claims. Users set a maximum fee they are
willing to pay and only registrars below this amount would provide judgement.

There are multiple registrars on {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}.
Unless no additional information is available here, you must reach out to specific registrars
individually if you want to be judged by those.

Registrar 0: <br /> **URL**: https://registrar.web3.foundation/ <br /> **Account**:
{{ polkadot: 12j3Cz8qskCGJxmSJpVL2z2t3Fpmw3KoBaBaRGPnuibFc7o8 :polkadot }}
{{ kusama: H4XieK3r3dq3VEvRtqZR7wN7a1UEkXxf14orRsEfdFjmgkF :kusama }} <br /> **Fee**:
{{ polkadot: 0 DOT :polkadot }}{{ kusama:  0.04 KSM :kusama }} <br />

Registrar 1: <br /> **URL**: https://registrar.d11d.net/ <br /> **Account**:
{{ polkadot: 1Reg2TYv9rGfrQKpPREmrHRxrNsUDBQKzkYwP1UstD97wpJ :polkadot }}
{{ kusama: Fom9M5W6Kck1hNAiE2mDcZ67auUCiNTzLBUdQy4QnxHSxdn :kusama }} <br /> **Fee**:
{{ polkadot: 20 DOT :polkadot }}{{ kusama: 4.5 KSM :kusama }} <br />

Registrar 2: <br /> **Account**:
{{ polkadot: 1EpXirnoTimS1SWq52BeYx7sitsusXNGzMyGx8WPujPd1HB :polkadot }}
{{ kusama: EK8veMNH6sVtvhSRo4q1ZRh6huCDm69gxK4eN5MFoZzo3G7 :kusama }} <br /> **Fee**:
{{ polkadot: 0 DOT :polkadot }}{{ kusama: 1 KSM :kusama }} <br />

Registrar 3: <br /> **Account**:
{{ polkadot: 13SceNt2ELz3ti4rnQbY1snpYH4XE4fLFsW8ph9rpwJd6HFC :polkadot }}
{{ kusama: GLiebiQp5f6G5vNcc7BgRE9T3hrZSYDwP6evERn3hEczdaM :kusama }} <br /> **Fee**:
{{ polkadot: 0.5 DOT :polkadot }}{{ kusama: 1 KSM :kusama }} <br />

{{ kusama: Registrar 4: <br /> **Account**: GhmpzxUyTVsFJhV7s2wNvD8v3Bgikb6WvYjj4QSuSScAUw6 <br /> **Fee**: 0.04 KSM <br /> :kusama }}

{{ polkadot: Polkassembly (Registrar 3) provides setting on-chain ID as a service on their [website](https://polkadot.polkassembly.io/). :polkadot }}

See [this page](./learn-guides-identity.md#registrars) to learn how to become a Registrar.

## Sub-Identities

Users can also link accounts by setting "sub accounts", each with its own identity, under a primary
account. The system reserves a bond for each sub account. An example of how you might use this would
be a validation company running multiple validators. A single entity, "My Staking Company", could
register multiple sub accounts that represent the [Stash accounts](learn-cryptography.md) of each of
their validators.

An account can have a maximum of 100 sub-accounts. Note that a deposit of
{{ polkadot: <RPC network="polkadot" path="consts.identity.subAccountDeposit" defaultValue={200530000000} filter="humanReadable"/> :polkadot }}
{{ kusama: <RPC network="kusama" path="consts.identity.subAccountDeposit" defaultValue={6666000000} filter="humanReadable"/> :kusama }}
is required for every sub-account.

---

:::info Polkadot-JS Guides

If you are an advanced user, see the
[Polkadot-JS guides about account identity](./learn-guides-identity.md).

:::
