---
id: claims
title: Claims
sidebar_label: Claims
description: Step-by-step guide on how to claim your tokens.
keywords: [claims, tokens, kusama, polkadot]
slug: ../claims
---

If you participated in a previous DOT sale before 2020 and received your DOT allocation indicator
tokens, you can now claim your DOT (and a proportional amount of KSM on the Kusama network), i.e.
connect the address where your DOT indicators have been stored on Ethereum with a native Polkadot
address.

To do this, you must sign a message containing the address of your
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} account. You can do this by using the
Polkadot-JS UI [Claims app](https://polkadot.js.org/apps/#/claims). Ensure that you are connected to
the {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} network (displayed in the
upper-left hand corner of the screen).

:::warning Third-party claim processes

Claiming using a third-party process can lead to the loss of your allocation; therefore, we cannot
recommend using any third-party apps to do so. Manually specifying your transaction data, as
specified in our claims process below, is the only way to be certain you will receive your
allocation.

:::

## Generate an Account

You will need to generate a {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} account
to claim {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }}. See the
[available wallets and extensions](./wallets-and-extensions.md) for more information about wallets
and browser extensions you can use to create an account. In terms of hardware wallet support, you
can use the [Ledger](./ledger.md) devices, or [Polkadot Vault](./polkadot-vault.md).

## Claiming Tokens with MyCrypto

The Polkadot-JS [Claims app](https://polkadot.js.org/apps/#/claims) helps you sign a message from
MyCrypto. MyCrypto is good to use in case you have stored the key to the Ethereum account holding
your DOT indicator tokens on a hardware device like a Ledger Nano. It also supports raw private
keys, mnemonics, and the Polkadot Vault.

Once you've downloaded MyCrypto and have it running locally (we recommend an air-gapped computer for
maximum security), you can start by navigating to the Claims app on the Polkadot-JS UI. Select the
account you would like to claim the KSM into and click the blue "Continue" button to proceed. Your
screen should look something like this:

![Claim Step 1](../assets/kusama/claim/claim-1.png)

The hex-encoded string that follows the sentence: "Pay KSM to the Kusama account:" is the
hex-encoded public key of your Kusama account, minus the `0x` prefix. To verify that the public key
is correct, you can use the Subkey tool to inspect your address.

The next step is to go to the MyCrypto application and click on "Sign & Verify Message" tab. This
will prompt you to select a method for unlocking your wallet. After unlocking your wallet, you will
copy and paste the outputted sentence into the input box.

![Claim Step 2](../assets/kusama/claim/claim-2.png)

When you click "Sign Message" you will get a JSON output like the below:

![claim_3](../assets/kusama/claim/claim_3.png)

Copy and paste the JSON output of the signed message from MyCrypto into the input box on the
Polkadot-JS UI and click "Confirm Claim."

![claim-3](../assets/kusama/claim/claim-3.png)

At this point, you will see a success message if everything went right and your KSM will now be in
the account that you claimed to. Congratulations you can now participate in aspects of the Kusama
network such as [governance](../learn/learn-polkadot-opengov.md) and
[staking](../learn/learn-staking.md). During the soft launch period balance transfers will not be
enabled.

![Claim Step 4](../assets/kusama/claim/claim-4.png)]

#### Verifying your Claim

After you make an on-chain claim for KSM, your balance should be updated on Polkadot-JS Apps
immediately.

Are you having trouble? Get in touch on the
[Polkadot Support page](https://support.polkadot.network).
