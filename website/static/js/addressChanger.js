const decodeAddress = require("@polkadot/util-crypto/address/decode").default;
const encodeAddress = require("@polkadot/util-crypto/address/encode").default;

const addressChanger = () => {
  const inEl = document.getElementById('input');
  const prefEl = document.getElementById('prefix-select');
  const outEl = document.getElementById('output');

  const prefix = prefEl.options[prefEl.selectedIndex].value;

  try {
    const decoded = decodeAddress(inEl.value);
    const encoded = encodeAddress(decoded, prefix);
    outEl.textContent = encoded.toString();
  } catch (err) {
    console.log(err);
  }
}
globalThis.addressChanger = addressChanger;

// const test = () => {
//   const addr = "5CJK5pSJWjZ7V3tiuo6jJPZKX7hxSPhNQds1g28icsrmUXaT";
//   const decoded = decodeAddress(addr);
//   const encoded = encodeAddress(decoded, "2");
//   console.log(encoded.toString())
// }

// test();

// npx browserify addressChanger.js > addressChanger-browser.js; npx uglify-es --mangle --compress -- addressChanger-browser.js > packaged/addressChanger.js; rm addressChanger-browser.js
