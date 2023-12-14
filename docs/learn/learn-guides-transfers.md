---
id: learn-guides-transfers
title: Polkadot-JS Guides about Transfers
sidebar_label: Transfers
description: Polkadot-JS Guides about Balances Transfers.
keywords: [gides, advanced, polkadot-js, transfers]
slug: ../learn-guides-transfers
---

import RPC from "./../../components/RPC-Connection"; import Tabs from "@theme/Tabs"; import TabItem
from "@theme/TabItem"; import DocCardList from '@theme/DocCardList';

## Metadata Updates with the Polkadot-JS Browser Extension

Before signing extrinsics with the Polkadot-JS Browser Extension, always check for metadata updates.
[**This video tutorial**](https://youtu.be/gbvrHzr4EDY?t=84) will explain how to do it.

### Polkadot Vault vs Polkadot-JS Browser Extension

The Polkadot Vault app updates the full metadata through the QR fountain while the extension updates
the metadata index (the metadata is not loaded into it). As a consequence the process of updating
metadata is different in this two cases (you will notice that on the Vault app the update takes
longer for example). Having outdated metadata on the Vault app will prevent you from signing, while
on the extension you will be able to click the sign button but the extrinsic will likely fail
(similarly of having an outdated Ledger app). In general, failing to update metadata will most
likely result in you not being able to sign extrinsics.

## Verify Extrinsics with the Polkadot-JS Browser Extension

Visit the
[**dedicated support page**](https://support.polkadot.network/support/solutions/articles/65000179161-how-can-i-verify-what-extrinsic-i-m-signing-#Verify-an-extrinsic-in-the-Polkadot-extension)
and see [**this video tutorial**](https://youtu.be/bxMs-9fBtFk?t=261) tutorial to learn about how to
verify extrinsics before signing them. The video will also mention potential attacks that can happen
to you while signing for transactions.

## Verify Extrinsics with the Polkadot-JS UI

Visit the
[**dedicated support page**](https://support.polkadot.network/support/solutions/articles/65000179161-how-can-i-verify-what-extrinsic-i-m-signing-#Verify-an-extrinsic-in-the-Polkadot-JS-UI)
and see [**this video tutorial**](https://youtu.be/bxMs-9fBtFk?t=163) tutorial to learn about how to
verify extrinsics before signing them. The video will also mention potential attacks that can happen
to you while signing for transactions.
