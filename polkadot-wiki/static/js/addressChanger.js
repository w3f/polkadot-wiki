const decodeAddress = require("@polkadot/util-crypto/address/decode").default;
const encodeAddress = require("@polkadot/util-crypto/address/encode").default;

const addressChanger = () => {
  const inEl = document.getElementById("input");
  const prefEl = document.getElementById("prefix-select");
  const outEl = document.getElementById("output");

  const prefix = prefEl.options[prefEl.selectedIndex].value;

  try {
    const decoded = decodeAddress(inEl.value);
    const encoded = encodeAddress(decoded, prefix);
    outEl.textContent = encoded.toString();
  } catch (err) {
    console.log(err);
  }
};
globalThis.addressChanger = addressChanger;
