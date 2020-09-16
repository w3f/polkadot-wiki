const DOTS = 1000000000000;
const DOLLARS = DOTS / 100;
const CENTS = DOLLARS / 100;
const MILLICENTS = CENTS / 1000;

const DotDecimals = 10**10;

const dotDeposit = (items, bytes) => {
  return items * 20 * DOLLARS + bytes * 100 * MILLICENTS;
}

// Polkadot
// https://github.com/paritytech/polkadot/blob/master/runtime/polkadot/src/lib.rs#L747
const dotProxyDepositBase = dotDeposit(1, 8) / DotDecimals;
const dotProxyDepositFactor = dotDeposit(0, 33) / DotDecimals;

// Kusama
// https://github.com/paritytech/polkadot/blob/master/runtime/kusama/src/lib.rs#L758
// const ksmProxyDepositBase = deposit(1, 8);
// const ksmProxyDepositFactor = deposit(0, 33);

const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

module.exports = {
  dotProxyDepositBase,
  dotProxyDepositFactor,
  // ksmProxyDepositBase,
  // ksmProxyDepositFactor,
  toCamelCase,
};