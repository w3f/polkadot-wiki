---
id: learn-registrar
title: Using W3F Registrar
sidebar_label: How to use W3F Registrar
---

An on-chain identity is a good way to build up your reputation and let the community know more about you if you plan on running a validator or being a councilor. Web3 Foundation provides a registrar service in the Kusama and Polkadot networks that only charges a small fee (0.04 KSM) on Kusama, and no fees on Polkadot (although there may be a small fee in the future). However, you will of course need to reserve some DOT in your account while you have an identity, no matter which registrar you use. For details on amount necessary to reserve, as well as the identity system as a whole, see the [identity](learn-identity) page.

The whole process of doing the verification is done by the bot. You will have one hour to complete the verification. If you are not able to finish it within an hour, the judgement will be issued as "Erroneous". If this occurs, you will have to submit a `clearIdentity` transaction and redo everything.

> **Note**: The registrar bot will not ask you to send any DOT, and never expose your private keys to anyone!

If you have provided `display name`, `email`, `twitter`, or `element name (previously called Riot)` when setting an on-chain identity, these will be required to verify one by one by signing a challenge message. Be aware that the `display name` cannot be too similar to others that have verified already. There is no need to set all of the fields when using the service. You are free to set whichever field or fields that you like.

Free feel to join the [Polkadot's community](community#polkadot) to ask questions if there is anything unclear.

## Setting an On-chain Identity

> **Note**: The W3F Registrar currently **does not** support KYC or web verification. Make sure to leave it blank when you fill in your identity information.

Go to [Accounts]((https://polkadot.js.org/apps/#/accounts)) page in Polkadot-JS Apps. The easiest way to add the built-in fields is to click the vertical three dots next to one's account and select "Set on-chain identity".

![registrar](assets/registrar/1.jpg)

A popup will appear, offering the default fields.

Currently, the registrar only supports the following fields:

- Display Name.
- Element (formerly known as Riot)
- Email
- Twitter

![registrar](assets/registrar/2.jpg)

Once you have filled in the information you would like to store on-chain, click `Set Identity` to submit the transaction.

![registrar](assets/registrar/3.jpg)

Now you have set the identity information on-chain, but that is not verified yet, so you should see a little grey icon beside your name. It is the time to interact with the W3F's verification bot by submitting the judgment request to the W3F's registrar.

## Request Judgement

> Friendly reminder: Once you have submitted "requestJudgement" transaction, if you are not able to complete the verification procedure in an hour, you would have to submit the "clearidentity" transaction first and then redo the whole thing from the beginning again.

![registrar](assets/registrar/4.jpg)

Go to [Developer->Extrinics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/extrinsics) and select your account to submit the `identity -> requestJudgement(reg_index, max_fee)` transaction. This will request the registrar to validate the information you set on-chain earlier.

The `reg_index` is the position of the registrar. For W3F, use 0.

The `max_fee` is the amount of DOT or KSM to pay the registrar. For Kusama use **0.04 KSM** and for Polkadot use **0 DOT**.

Note that in the future, a fee may be charged for the Polkadot registrar.

## Element Verification

Since we provided the Element, Twitter, and Email information in this example, we would start to receive the verification requests from those platforms. As for Element, an invitation will be sent by the bot named "W3F Registrar Verification".

> Note: The handle of the W3F bot is called @registrar:web3.foundation. If you are not sure whether that is ours or not, ask in the Polkadot community chat first.

![registrar](assets/registrar/5.jpg)

Once you accept the invitation, you should see the following information.

![registrar](assets/registrar/6.jpg)

Then go to [Sign and Verify](https://polkadot.js.org/apps/#/signing) under the Developer tab in the PolkadotJS and select your account, paste the "Challenge" data to the "sign the following data" field and click "Sign message".

![registrar](assets/registrar/7.jpg)

Copy the result of the "signature of supplied data" and paste it to the W3F Registrar Verification chat.

![registrar](assets/registrar/8.jpg)

If the information is correct, you should see a message like the above image that indicates your address has been verified. This basically proves you are the owner of the account.

## Email Verification

Next, you should receive an email called "W3F Registrar Verification Service". Below is an example for reference.

> Note: Please double-check the sender is "registrar@web3.foundation", not the others.

![registrar](assets/registrar/9.jpg)

You would do what you did in the above again. Copy the "Challenge" data and go to [Sign and Verify](https://polkadot.js.org/apps/#/signing) under the Developer tab in the PolkadotJS and select your account, paste the "Challenge" data to the "sign the following data" field and click "Sign message"

![registrar](assets/registrar/10.jpg)

And reply with your signed data only in the email. Then click "Send".

> Note: Do not add anything in the email except the signed data.

![registrar](assets/registrar/11.jpg)

Wait 1 or 2 minutes. You should receive another email that shows your email has been verified successfully.

## Twitter Verification

Lastly, if you have provided Twitter handle, you would have to follow [@w3f_registrar](https://twitter.com/w3f_registrar) first.

After following the Registrar account on Twitter, you will need to send it a DM. A simple "hello" will do the trick.

![registrar](assets/registrar/12.jpg)

After waiting a few mintues you should receive a challenge similar to the previous two.

![registrar](assets/registrar/13.jpg)

Again, just like how you did in the above. By using your account to sign the "Challenge" data that you received on Twitter in the [Sign and Verify](https://polkadot.js.org/apps/#/signing) page.

![registrar](assets/registrar/14.jpg)

Paste the signed data to the chat and you would receive the verification status after 1 to 2 minutes.

If everything has been verified successfully, you would see your account verification status has been marked as "reasonable" with a green tick icon on the [Accounts](https://polkadot.js.org/apps/#/accounts) page.

![registrar](assets/registrar/15.jpg)

Congratulations! Your identity should now show as a green "verified" checkmark on Polkadot-JS Apps.
