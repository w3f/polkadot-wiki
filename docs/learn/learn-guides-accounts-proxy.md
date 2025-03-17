---
id: learn-guides-accounts-proxy
title: Polkadot-JS Guides about Proxy Accounts
sidebar_label: Proxy Guides
description: Polkadot-JS Guides about Proxy Accounts
keyword: [guides, polkadot-js, accounts, proxy]
slug: ../learn-guides-accounts-proxy
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

Proxies allow users to use an account (it can be in cold storage or a hot wallet) less frequently
but actively participate in the network with the weight of the tokens in that account. Proxies are
allowed to perform a limited amount of actions related to specific
[substrate pallets](https://docs.polkadot.com/develop/parachains/intro-polkadot-sdk/#frame) on behalf of another
account. The videos below contain more information about using proxies.

<div className="row">
  <div className="col text--center">
    <a href="https://www.youtube.com/watch?v=1tcygkq52tU">
      <img src="https://img.youtube.com/vi/1tcygkq52tU/0.jpg" width="350" style="borderRadius: 10, border: '1px solid slategrey'" />
    </a>
    <p>
      <a href="https://www.youtube.com/watch?v=1tcygkq52tU">Proxy Accounts Tutorial</a>
    </p>
  </div>
  <div className="col text--center">
    <a href="https://www.youtube.com/watch?v=Qv_nJVcvQr8&t=4437s">
      <img src="https://img.youtube.com/vi/Qv_nJVcvQr8/0.jpg" width="350" style="borderRadius: 10, border: '1px solid slategrey'" />
    </a>
    <p>
      <a href="https://www.youtube.com/watch?v=Qv_nJVcvQr8&t=4437s">Proxy Accounts Advanced Tutorial</a>
    </p>
  </div>
</div>

!!!tip "Know how to check the calls and pallets accessible by proxies"
    For the latest information on the calls and pallets that can be fully accessed by proxies, check the [source code in the runtime folder](https://github.com/paritytech/polkadot-sdk/blob/153543b0c8c582e73f520e5c08cbe33bddfb5f69/runtime/polkadot/src/lib.rs#L1158) on the [Polkadot repository](https://github.com/paritytech/polkadot-sdk)

## Creating Proxy with Polkadot-JS

To create a proxy account with Polkadot-JS read
[this support article](https://support.polkadot.network/support/solutions/articles/65000182179-how-to-create-a-proxy-account).

## Removing Proxy with Polkadot-JS

Read the section "Removing Proxies" on
[this support page](https://support.polkadot.network/support/solutions/articles/65000182179-how-to-create-a-proxy-account)
to learn how to remove proxies.

## View your Proxy on Polkadot-JS

To view your proxy, just go on the _Accounts_ menu in the Polkadot-JS UI, next to the proxied
account you will notice a blue icon. Hover on it, and you will see _Proxy overview_. Click on it and
you will be presented with a list of all proxies for that account.

![polkadot_view_proxies](../assets/polkadot_view_proxies.png)

Additionally, you can head over to the _Chain State_ tab (underneath the _Developer_ menu) on
[Polkadot-JS Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/chainstate). If
you've created your proxy on a Polkadot account, it is required to change your network accordingly
using the top left navigation button. On this page, the proxy pallet should be selected, returning
the announcements and proxies functions. The proxies function will allow you to see your created
proxies for either one account or for all accounts (using the toggle will enable this). Proxy
announcements are what time lock proxies do to announce they are going to conduct an action.

![polkadot_view_proxies_dev](../assets/polkadot_view_proxies_dev.png)

## Set-up and Use of Time-delayed Proxies with Polkadot-JS

!!!info
    See [this video tutorial](https://youtu.be/3L7Vu2SX0PE) to learn how you can setup and use time-delayed proxies. The video goes through the example below.

Initially the time time-delayed proxy announces its intended action using the `proxy.announce`
extrinsic and will wait for the number of blocks defined in the delay time before executing it. The
proxy will include the hash of the intended function call in the announcement. Within this time
window, the intended action may be canceled by accounts that control the proxy. This can be done by
the proxy itself using the `proxy.removeAnnouncement` extrinsic or by the proxied account using the
the `proxy.rejectAnnouncement` extrinsic. Now we can use proxies knowing that any malicious actions
can be noticed and reverted within a delay period. After the time-delay, the proxy can use the
`proxy.proxyAnnounced` extrinsic to execute the announced call.

Let's take for example the stash account Eleanor setting Bob as a time-delayed staking proxy. In
this way, if Bob submits an extrinsic to change the reward destination, such extrinsic can be
rejected by Eleanor. This implies that Eleanor monitors Bob, and that within the time-delay she can
spot the announced extrinsic. Eleanor can check all the proxy call announcements made by her
account's proxies on-chain. On Polkadot-JS UI, go to Developer > Storage > Proxy > Announcements to
check the hashes for the calls made by the proxy accounts and the block height at which they are
enabled for execution.

![time-delayed proxies](../assets/time-delayed-proxies.png)

!!!info
    If you try to use `proxy.proxyAnnounced` to execute the call within the time-delay window you will get an error "Proxy unannounced" since the announcement will be done after the time delay. Also note that regular `proxy.proxy` calls do not work with time-delayed proxies, you need to announce the call first and then execute the announced call on a separate transaction.

## Proxy calls

Proxy calls are used by proxies to call proxied accounts. These calls are important for example in
the case of _pure_ proxies, as any attempt to sign transactions with a _pure_ proxy will fail. For
more details see the [dedicated section about pure proxies](./learn-proxies-pure.md).

### Nested Proxy Calls

As the term suggests, nested proxy calls are proxy calls within proxy calls. Such calls are needed
if there are proxied accounts that are proxies themselves. In the example diagram below, Alice has a
stash account that has a _staking_ proxy account, P-C. P-C is a _pure_ proxy, a proxied account
originally spawned by Charly that is now an _any_ proxy of P-C and signs everything on its behalf.

![nested proxy calls](../assets/nested-proxy-calls.png)

For example, to bond more funds, Charly needs to submit a `prox.proxy` extrinsic to P-C, which in
turn submits a `proxy.proxy` extrinsic to Alice including for example a `staking.bondExtra`
extrinsic, specifying the number of extra tokens that need to be bounded. If Charly wants to leave,
a new account can take his place as any proxy (before Charly leaves!). There is no need to change
the staking proxy account. Also, Alice is the only one who can remove P-C as a staking proxy, and
P-C can only perform staking-related tasks. For example, P-C cannot send funds out from Alice's
account.

Proxy calls can be done using the Extrinsic Tab in the Polkadot-JS UI. Nested proxy calls can be
done by calling each `proxy.proxy` extrinsic separately, or in some cases by just calling the last
`proxy.proxy` extrinsic. In the diagram above, submitting the proxy call from P-C to Alice will
automatically ask for Charly's signature. Thus one proxy call will trigger the second one because
Charly's is the only _any_ proxy of P-C, and P-C cannot sign anything. While if we want to use Bob's
account we will need to submit all three proxy calls.
