---
id: learn-identity
title: Identity
sidebar_label: Identity
description: Learn about on-chain identity, judgements and registrars.
slug: ../learn-identity
---

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} provides a naming system that allows 
participants to add personal information to their on-chain account and subsequently ask for verification 
of this information by [registrars](#registrars).

## Setting an Identity

Users can set an identity by registering through default fields such as legal name, display name,
website, Twitter handle, Riot handle, etc. along with some extra, custom fields for which they would
like attestations (see [Judgements](#judgements)).

Users must reserve funds in a bond to store their information on chain:
{{ identity_reserve_funds }}, and {{ identity_field_funds }} per each field beyond the legal name.
These funds are *locked*, not spent - they are returned when the identity is cleared.

These amounts can also be extracted by querying constants through the
[Chain state constants](https://polkadot.js.org/apps/#/chainstate/constants) tab on
Polkadot-JS Apps.

First, select `identity` as the `selected constant query`.

![Identity as the selected constant query](../assets/identity/17.jpg)

Then on the right-hand side, you can select the constants that you would like to view and add them
onto the webpage by clicking the "plus" icon at the end of the bar.

![Identity as the selected constant query](../assets/identity/18.jpg)

Each field can store up to 32 bytes of information, so the data must be less than that. When
inputting the data manually through the [Extrinsics UI](https://polkadot.js.org/apps/#/extrinsics),
a [UTF8 to bytes](https://onlineutf8tools.com/convert-utf8-to-bytes) converter can help.

The easiest way to add the built-in fields is to click the gear icon next to your account and select
"Set on-chain identity".

![Gear icon provides the option to set identity](../assets/identity/01.jpg)

A popup will appear, offering the default fields.

![Identity field setup popup](../assets/identity/02.jpg)

To add custom fields beyond the default ones, use the Extrinsics UI to submit a raw transaction by
first clicking "Add Item" and adding any field name you like. The example below adds a field
`steam`, which is a user's [Steam](https://store.steampowered.com) username. The first value is the
field name in bytes ("steam") and the second is the account name in bytes ("theswader"). The display
name also has to be provided, otherwise, the Identity pallet would consider it wiped if we submitted
it with the "None" option still selected. That is to say, every time you make a change to your
identity values, you need to re-submit the entire set of fields: the write operation is always
"overwrite", never "append".

![Setting a custom field](../assets/identity/03.jpg)

Note that custom fields are not shown in the UI by default:

![Only built-in fields are shown](../assets/identity/04.jpg)

The rendering of such custom values is, ultimately, up to the UI/dapp makers. In the case of
Polkadot-JS, the team prefers to only show official fields for now. If you want to check that the
values are still stored, use the [Chain State UI](https://polkadot.js.org/apps/#/chainstate) to
query the active account's identity info:

![Raw values of custom fields are available on-chain](../assets/identity/05.jpg)

It is up to your own UI or dapp to then do with this data as it pleases. The data will remain
available for querying via the Polkadot API, so you don't have to rely on the Polkadot-JS UI.

You can have a maximum of 100 custom fields.

:::note 

The Ledger app doesn't support the extrinsic for setting identity yet. As a workaround, create a primary
identity with an on-chain account and then using that primary identity, assign a [sub-identity](#sub-accounts) 
to the Ledger stash.

:::

### Format Caveat

Please note the following caveat: because the fields support different formats, from raw bytes to
various hashes, a UI has no way of telling how to encode a given field it encounters. The Polkadot-JS
UI currently encodes the raw bytes it encounters as UTF8 strings, which makes these values readable
on-screen. However, given that there are no restrictions on the values that can be placed into these
fields, a different UI may interpret them as, for example, IPFS hashes or encoded bitmaps. This
means any field stored as raw bytes will become unreadable by that specific UI. As field standards
crystallize, things will become easier to use but for now, every custom implementation of displaying
user information will likely have to make a conscious decision on the approach to take, or support
multiple formats and then attempt multiple encodings until the output makes sense.

## Judgements

After a user injects their information on chain, they can request judgement from a registrar. Users
declare a maximum fee that they are willing to pay for judgement, and registrars whose fee is below
that amount can provide a judgement.

When a registrar provides judgement, they can select up to six levels of confidence in their
attestation:

- Unknown: The default value, no judgement made yet.
- Reasonable: The data appears reasonable, but no in-depth checks (e.g. formal KYC process) were
  performed.
- Known Good: The registrar has certified that the information is correct.
- Out of Date: The information used to be good, but is now out of date.
- Low Quality: The information is low quality or imprecise, but can be fixed with an update.
- Erroneous: The information is erroneous and may indicate malicious intent.

A seventh state, "fee paid", is for when a user has requested judgement and it is in progress.
Information that is in this state or "erroneous" is "sticky" and cannot be modified; it can only be
removed by the complete removal of the identity.

Registrars gain trust by performing proper due diligence and would presumably be replaced for
issuing faulty judgements.

To be judged after submitting your identity information, go to the
["Extrinsics UI"](https://polkadot.js.org/apps/#/extrinsics) and select the `identity` pallet, then
`requestJudgement`. For the `reg_index` put the index of the registrar you want to be judged by, and
for the `max_fee` put the maximum you're willing to pay for these confirmations.

If you don't know which registrar to pick, first check the available registrars by going to
["Chain State UI"](#) and selecting `identity.registrars()` to get the full list.

### Requesting a Judgement

Select one of the registrars from the query you made above.

![Requesting judgement](../assets/identity/08.jpg)

This will make your identity go from unjudged:

![An unjudged identity](../assets/identity/07.jpg)

To "waiting":

![A pending identity](../assets/identity/09.jpg)

At this point, direct contact with the registrar is required - the contact info is in their identity
as shown above. Each registrar will have their own set of procedures to verify your identity and
values, and only once you've satisfied their requirements will the process continue.

Once the registrar has confirmed the identity, a green checkmark should appear next to your account
name with the appropriate confidence level:

![A confirmed identity](../assets/identity/10.jpg)

*Note that changing even a single field's value after you've been verified will un-verify your
account and you will need to start the judgement process anew. However, you can still change fields
while the judgement is going on - it's up to the registrar to keep an eye on the changes.*

### Cancelling a Judgement

You may decide that you do not want to be judged by a registrar (for instance, because you realize
you entered incorrect data or selected the wrong registrar). In this case, after submitting the
request for judgement but before your identity has been judged, you can issue a call to cancel the
judgement using an extrinsic.

![Cancel Registrar](../assets/registrar_cancel_judgement.png)

To do this, first, go to the ["Extrinsics UI"](https://polkadot.js.org/apps/#/extrinsics) and select
the `identity` pallet, then `cancelRequest`. Ensure that you are calling this from the correct
account (the one for which you initially requested judgement). For the `reg_index`, put the index of
the registrar from which you requested judgement.

Submit the transaction, and the requested judgement will be cancelled.

## Registrars

Registrars can set a fee for their services and limit their attestation to certain fields. For
example, a registrar could charge {{ kusama: 0.1 KSM :kusama }}{{ polkadot: 1 DOT :polkadot }} to 
verify one's legal name, email, and GPG key. When a user requests judgement, they will pay this fee 
to the registrar who provides the judgement on those claims. Users set a maximum fee they are willing 
to pay and only registrars below this amount would provide judgement.

### Becoming a Registrar

To become a registrar, submit a pre-image and proposal into
[Democracy](../maintain/maintain-guides-democracy.md), then wait for people to vote
on it. For best results, write a post about your identity and intentions beforehand, and once the
proposal is in the queue ask people to second it so that it gets ahead in the referendum queue.

Here's how to submit a proposal to become a registrar:

Go to the Democracy tab, select "Submit preimage", and input the information for this motion -
notably which account you're nominating to be a registrar in the `identity.setRegistrar` function.

![Setting a registrar](../assets/identity/12.jpg)

Copy the preimage hash. In the above image, that's
`0x90a1b2f648fc4eaff4f236b9af9ead77c89ecac953225c5fafb069d27b7131b7`. Submit the preimage by signing
a transaction.

Next, select "Submit Proposal" and enter the previously copied preimage hash. The `locked balance`
field needs to be at least {{ identity_reserve_funds }} {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}. 
You can find out the minimum by querying the chain state under [Chain State](https://polkadot.js.org/apps/#/chainstate) -> Constants -> democracy -> minimumDeposit.

![Submitting a proposal](../assets/identity/13.jpg)

At this point, DOT holders can second the motion. With enough seconds, the motion will become a
referendum, which is then voted on. If it passes, users will be able to request judgement from this
registrar.

### Current Registrars

There are multiple registrars on {{ kusama: Kusama :kusama }}{{ polkadot: Polkadot :polkadot }}. 
Unless no additional information is available here, you must reach out to specific registrars 
individually if you want to be judged by those.

Registrar 0:  <br />
**URL**: https://registrar.web3.foundation/  <br />
**Account**: {{ kusama: H4XieK3r3dq3VEvRtqZR7wN7a1UEkXxf14orRsEfdFjmgkF,  <br /> :kusama }}{{ polkadot: 12j3Cz8qskCGJxmSJpVL2z2t3Fpmw3KoBaBaRGPnuibFc7o8,  <br /> :polkadot }}
**Fee**: {{ kusama:  0.04 KSM  <br /> :kusama }}{{ polkadot: 0 DOT,  <br /> :polkadot }}
  
Registrar 1:  <br />
**URL**: https://registrar.d11d.net/  <br />
**Account**: {{ kusama: Fom9M5W6Kck1hNAiE2mDcZ67auUCiNTzLBUdQy4QnxHSxdn,  <br /> :kusama }}{{ polkadot: 1Reg2TYv9rGfrQKpPREmrHRxrNsUDBQKzkYwP1UstD97wpJ,  <br /> :polkadot }}
**Fee**: {{ kusama: 0.65 KSM,  <br /> :kusama }}{{ polkadot: 10 DOT,  <br /> :polkadot }}
  
Registrar 2:  <br />
**Account**: {{ kusama: EK8veMNH6sVtvhSRo4q1ZRh6huCDm69gxK4eN5MFoZzo3G7,  <br /> :kusama }}{{ polkadot: 1EpXirnoTimS1SWq52BeYx7sitsusXNGzMyGx8WPujPd1HB,  <br /> :polkadot }}
**Fee**: {{ kusama: 1 KSM,  <br /> :kusama }}{{ polkadot: 0 DOT. :polkadot }}

{{ kusama: Registrar 3:  <br />
**Account**: GLiebiQp5f6G5vNcc7BgRE9T3hrZSYDwP6evERn3hEczdaM,  <br />
**Fee**: 1 KSM,  <br /> :kusama }}

{{ kusama: Registrar 4:  <br />
**Account**: GhmpzxUyTVsFJhV7s2wNvD8v3Bgikb6WvYjj4QSuSScAUw6,  <br />
**Fee**: 0.04 KSM.  <br /> :kusama }}

To find out how to contact the registrar after the application for judgement or to learn who they
are, we can check their identity by adding them to our Address Book. Their identity will be
automatically loaded.

![Chevdor is registrar #1](../assets/identity/16.jpg)

## Sub Accounts

Users can also link accounts by setting "sub accounts", each with its own identity, under a primary
account. The system reserves a bond for each sub account. An example of how you might use this would
be a validation company running multiple validators. A single entity, "My Staking Company", could
register multiple sub accounts that represent the [Stash accounts](learn-keys.md) of each of their
validators.

An account can have a maximum of 100 sub-accounts. Note that a deposit of {{ identity_sub_reserve_funds }}
is required for every sub-account.

- Go to https://polkadot.js.org/apps/#/accounts. Click on the three vertical dots correponding to the account
to which you already set identity. You should see an option to set onchain sub-identities. Click on it.

  ![Add sub-identity in PolkadotJS](../assets/identity/sub-id-1.png)
- In the pop-up window, select your Ledger account from the dropdown and enter text in sub name field. Then,
click on set subs button.
![Set sub-identity in PolkadotJS](../assets/identity/sub-id-2.png)
- Sign and submit the transaction from the parent account with the identity

You should now see the sub-identity displayed on-chain. 

:::note Explainer video on setting sub-identities

Here is a [video tutorial](https://www.youtube.com/watch?v=0Yh1JYg3ZKU) on setting sub-identities using
Polkadot-JS UI

:::

You can also use the
[Extrinsics UI](https://polkadot.js.org/apps/#/extrinsics). There, select the identity pallet, then
`setSubs` as the function to use. Click "Add Item" for every child account you want to add to the
parent sender account. The value to put into the Data field of each parent is the optional name of
the sub-account. If omitted, the sub-account will inherit the parent's name and be displayed as
`parent/parent` instead of `parent/child`.

![Sub account setup](../assets/identity/06.jpg)

You can use
[Polkadot-JS Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/chainstate/constants)
again to verify this amount by querying the `identity.subAccountDeposit` constant.

![Sub account constant](../assets/identity/19.jpg)

## Clearing and Killing an Identity

**Clearing:** Users can clear their identity information and have their deposit returned. Clearing
an identity also clears all sub accounts and returns their deposits.

To clear an identity:

1. Navigate to the [Accounts UI](https://polkadot.js.org/apps/#/accounts).
2. Click the three dots corresponding to the account you want to clear and select 'Set on-chain
   identity'.
3. Select 'Clear Identity', and sign and submit the transaction.

**Killing:** The Council can kill an identity that it deems erroneous. This results in a slash of
the deposit.
