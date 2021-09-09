---
id: ens
title: Adding accounts to an ENS domain
sidebar_label: Using ENS with DOT/KSM accounts
---

ENS (Ethereum Name Service) is a system of smart contracts on the Ethereum blockchain which allows users to claim domain names like `bruno.eth`. Supporting wallets can then allow senders to input ENS domains instead of long and unwieldy addresses. This prevents phishing, fraud, typos, and adds a layer of usability on top of the regular wallet user experience.

> Note: You will need an ENS name and an Ethereum account with some ether in it to follow along with this guide. To register an ENS name, visit the [ENS App](https://app.ens.domains) or any number of subdomain registrars like [Nameth](https://nameth.io). Note that if you're using an older ENS name, you should make sure you're using the [new resolver](https://medium.com/the-ethereum-name-service/ens-registry-migration-is-over-now-what-a-few-things-to-know-fb05f921872a). Visiting the ENS App will warn you about this if not. You will also need some way to use your Ethereum address - following this guide on a personal computer is recommended. Wallets like [Frame](https://frame.sh/) and [Metamask](https://metamask.io) are safe and will make interacting with the Ethereum blockchain through your browser very easy.

Despite living on the Ethereum blockchain, the ENS system has multi-chain support. In this guide you'll go through the process of adding a KSM and DOT address to ENS. We cover both KSM and DOT to show two different approaches.

> Note: DOT can currently only be added using the Resolver method. KSM can be added through both methods described below.

This guide is also available in video format [on Youtube](https://youtu.be/XKjZk-5_mQc).

## Adding via the UI

The [ENS App](https://app.ens.domains) allows an ENS domain owner to inspect all records bound to the domain, and to add new ones.

![bruno.eth domain name in the ENS application](assets/ens/01-min.png)

In the example above, the domain `bruno.eth` has an Ethereum and a Bitcoin address attached. Let's attach a KSM account. First, click the `[+]` icon in the Records tab.

![The plus icon in the records tab](assets/ens/02-min.png)

Then, pick "Other Addresses", "KSM", and input the Kusama address:

![Inputs needed to register a KSM address](assets/ens/03-min.png)

After clicking Save, your Ethereum wallet will ask you to confirm a transaction. Once processed, the record will show up on the domain's page:

![KSM address now visible in bruno.eth records](assets/ens/04-min.png)

## Adding via the Resolver

DOT has only recently been added to ENS, so it's not available in the UI yet. Let's go through an alternative method of registering a DOT address on the `bruno.eth` domain.

First, you need to find out which resolver we have set on the domain. This should be [Public Resolver 2](https://etherscan.io/address/0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41), but you can double check on the domain's ENS page.

![The domain's resolver is highlighted on the ENS app page](assets/ens/05-min.png)

Next, you need to go to the [resolver contract's Write Contract interface on Etherscan](https://etherscan.io/address/0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41#writeContract) by clicking on "_Contract -> Write Contract_", or appending `#writeContract` to the resolver's URL in Etherscan, like so: https://etherscan.io/address/0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41#writeContract

There should be an option to "Connect to Web3" which, when clicked, will ask your active wallet for permission to connect.

![Connect to Web3 option](assets/ens/06-min.png)

Allow this. If for some reason the option "Connect to Web3" does not automatically switch to "Connected - Web3 [YOUR_ADDRESS]", refresh the page and try again.

![Connected to Web3](assets/ens/07-min.png)

Scroll down to `setAddr`. There will be three input fields on this function: `node` is the [namehash](https://docs.ens.domains/contract-api-reference/name-processing#algorithm) of your domain. You can get it by entering your domain into [this tool](https://swolfeyes.github.io/ethereum-namehash-calculator/). Cointype is the ID of the supported coin, as specified in the [address-encoder](https://github.com/ensdomains/address-encoder) library which wallets can use to integrate ENS. The file to look for is [src/index.ts](https://github.com/ensdomains/address-encoder/blob/master/src/index.ts) - scroll to the bottom and notice DOT and KSM. The coin ID of KSM is 434, while DOT is 354, so we enter this into `coinType`. `a` is the address to bind to this value, in public key format. To turn your address into a public key, use [this tool](https://www.shawntabrizi.com/substrate-js-utilities/) and enter your address into the `AccountId to Hex` left field, then copy the output of the right field.

![Filled out information in the contract's write interface](assets/ens/08-min.png)

Clicking "Write" will initiate a transaction. Note that Etherescan's UI is in beta and might throw a "GasLimit" error. If this happens, modify the gas limit in your wallet to 80,000. You can leave the gas fee as is - any wallet you use will usually be good at estimating the required fee.

Once the transaction is confirmed, your DOT address will be bound to your ENS domain. Because the ENS App UI is currently missing support for DOT, this entry will not be visible. However, should a wallet decide to implement ENS before the official ENS App does, the resolving will work just fine.

### Wallet Support

There is no wallet support for ENS names for either KSM or DOT at this time.

### Relevant links

- [ENS docs](https://docs.ens.domains/)
- [ENS Multi-chain announcement](https://medium.com/the-ethereum-name-service/ens-launches-multi-coin-support-15-wallets-to-integrate-92518ab20599)
- [Address encoder](https://github.com/ensdomains/address-encoder)
- [Namehash calculator](https://swolfeyes.github.io/ethereum-namehash-calculator/)
- [Address to pubkey converter](https://www.shawntabrizi.com/substrate-js-utilities/)
