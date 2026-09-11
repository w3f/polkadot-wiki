---
title: "Polkadot Developer Interface: How to Troubleshoot Connection Issues"
description: "How to troubleshoot the message \"Waiting to make a connection to the remote endpoint and finishing API initialization\" and other errors"
---

!!!info "Related concepts"
    For the underlying concepts, see [Polkadot Developer Interface](../../general/polkadotjs-ui.md).

!!! warning "IMPORTANT"

    Polkadot Developer Interface is a web wallet meant for power users and developers. For everyday use, there are several user-friendly wallets that support a plethora of features and platforms. Discover them in [this article](where-to-store-dot.md).

Sometimes you may experience connection issues, e.g., when trying to confirm a transaction or when trying to access the network in the first place. You may encounter the error _"Waiting to make a connection to the remote endpoint and finishing API initialization" or "Waiting to complete metadata retrieval from remote endpoint"._

This article will indicate some of the more common causes that might bring connection issues from the Polkadot Developer Interface.

* * *

### Troubleshooting

  * Do you have another DOT extension installed? Disable them and try again. Some of them might be interfering with the Polkadot Developer Signer.

If this does not help, try out the following options:

  * [Switch to another network node](switch-network-nodes.md) (e.g., OnFinality, Dwellir, Parity, etc., in the image above). This usually fixes things in case one node has connection issues. Simply select another node and then click the "Switch" button at t top.

  * Update your browser to the latest version.

  * Try a different browser. Please note that in this case, you won't see any of your accounts because they exist in your current browser, but we're trying to figure out the connection issue, so that's ok for now.

  * If you're using a VPN, please disable it.

  * Restart your router.

  * Are you perhaps on a company network? Sometimes, company networks have firewall rules that prevent access to certain sites.

  * Disable automatic translations. Some browsers allow translating any site to your language of choice automatically. However, sometimes it might interfere with the Polkadot Developer Interface and block the connection.

  * If none of these things work, connect your computer to a hotspot on your phone and see if you can connect through that instead of your WiFi.

* * *
