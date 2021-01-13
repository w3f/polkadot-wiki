const axios = require("axios");

const registryLink = "https://raw.githubusercontent.com/paritytech/substrate/master/ss58-registry.json";

let output = `

## Prefix Registry Table

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
