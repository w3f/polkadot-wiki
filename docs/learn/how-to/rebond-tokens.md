---
title: How to Rebond Tokens During the Unbonding Period
description: "You can rebond your locked tokens before the unbonding period is over by issuing a rebond extrinsic manually in polkadot developer interface."
---

!!!info "Related Wiki page"
    For the underlying concepts, see [Staking (advanced)](../learn-staking-advanced.md).

_Discover the new Staking Dashboard that makes staking much easier and check our[extensive article list](../../general/dashboards/staking-dashboard.md) to help you get started._

* * *

If you unbonded your tokens but changed your mind, you can rebond them before the unbonding period is over through the  "**Network** "  **> "Staking**"  **> "**[**Account page**](https://polkadot.js.org/apps/#/staking-async/actions)" on the Polkadot Developer Interface. This extrinsic is issued by the **controller or staking proxy** account.

!!! warning "ATTENTION"

    Controller accounts are being deprecated. You can still use existing ones for now, but creating new ones is no longer possible.

    It is recommended to set your stash account as its own controller (described in [this article](change-controller-account.md)) and create a staking proxy to obtain the same benefits and greater flexibility.

    Check out the article on [creating a proxy account](create-proxy-account.md) for more information.

1\. Click on the three dots on the right side of your account under the "Stashes" section.

2\. Select "**Rebond funds** ":

![](../../assets/how-to/65032556831.png)
3. On the window that opens up, enter the amount you want to rebond or leave the profiled amount if you want to rebond the entire amount that's unbonding:

![](../../assets/how-to/65032556845.png)

4\. Then click "**Rebond** ," sign and submit the transaction. You have rebonded your DOT!

* * *
