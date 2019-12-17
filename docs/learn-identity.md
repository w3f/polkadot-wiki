---
id: learn-identity
title: Identity
sidebar_label: Identity
---

Polkadot provides a naming system that allows participants to ask for verification of off-chain information from registrars. Users can ask for verification of multiple attributes (e.g. name, website, image). 

## Registrars

Registrars are appointed from a specified "Registrar Origin", which will start as the [council](learn-governance). Either the council or a public referendum could appoint a new registrar origin to appoint registrars.

Registrars can set a fee for their services and limit their attestation to certain fields. For example, a registrar could charge 1 DOT to verify one's legal name, email, and GPG key. When a user requests judgement, they will pay this fee to the registrar who provides the judgement on those claims. Users set a maximum fee they are willing to pay and only registrars below this amount would provide judgement.

## Information

Users can register the following information:

- Display name
- Legal name
- Website
- Riot handle
- Email address
- PGP fingerprint
- Image

Additionally, users can add extra, custom fields for which they would like attestations. Users must reserve funds in a bond to store their information on chain. Each field can only store up to 32 bytes of information, so a hash of the data is stored on chain and the preimage supplied elsewhere.

## Judgements

After a user injects their information on chain, they can request judgement from a registrar. Users declare a maximum fee that they are willing to pay for judgement, and registrars whose fee is below that amount can provide a judgement.

When a registrar provides judgement, they can select up to six levels of confidence in their attestation:

- Unknown: The default value, no judgement made yet.
- Reasonable: The data appears reasonable, but no in-depth checks (e.g. formal KYC process) were performed.
- Known Good: The registrar has certified that the information is correct.
- Out of Date: The information used to be good, but is now out of date.
- Low Quality: The information is low quality or imprecise, but can be fixed with an update.
- Erroneous: The information is erroneous and may indicate malicious intent.

A seventh state, "fee paid", is for when a user has requested judgement and it is in progress. Information that is in this state or "erroneous" cannot be modified; it can only be removed by complete removal of the identity.

Registrars gain trust by performing proper due diligence and would presumably be replaced for issuing faulty judgements.

## Sub Accounts

Users can also link accounts by setting "sub accounts", each with its own identity, under a primary account. The system reserves a bond for each sub account. An example of how you might use this would be a validation company running multiple validators. A single entity, "My Staking Company", could register multiple sub accounts that represent the [Stash accounts](learn-keys) of each of their validators.

## Clearing and Killing

**Clearing:** Users can clear their identity information and have their deposit returned. Clearing an identity also clears all sub accounts.

**Killing:** The council can kill an identity that it deems erroneous. This results in a slash of the deposit.
