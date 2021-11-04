import axios from "axios";

const registryLink = "https://raw.githubusercontent.com/paritytech/ss58-registry/main/ss58-registry.json";

let output = `
---
id: build-ss58-registry
title: SS58 Registry
sidebar_label: SS58 Registry
---

Substrate-based chains, including the Polkadot and Kusama relay chains, use an [SS58 encoding](https://github.com/paritytech/substrate/wiki/External-Address-Format-(SS58)) for their address formats. This page serves as a registry for teams to see which chain corresponds to a given prefix, and which prefixes are availabe.

| Prefix | Network | Name | Symbols | Decimals | Standard Account | Website |
| - | - | - | - | - | - | - |`;

(async () => {
  try {
    const { data } = await axios.get(registryLink);
    for (const item of data.registry) {
      const { prefix, network, displayName, symbols, decimals, standardAccount, website } = item;
      output = output.concat(`\n|${prefix}|${network}|${displayName}|${symbols && symbols.join(", ")}|${decimals && decimals.join(", ")}|${standardAccount}|${website}|`);
    }

    console.log(output);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
