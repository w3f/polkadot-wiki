const DOTS = 1000000000000;
const DOLLARS = DOTS / 100;
const CENTS = DOLLARS / 100;
const MILLICENTS = CENTS / 1000;

const DotDecimals = 10**10;
const KsmDecimals = 10**12;

const dotDeposit = (items, bytes) => {
  return items * 20 * DOLLARS + bytes * 100 * MILLICENTS;
}

// Polkadot
// https://github.com/paritytech/polkadot/blob/master/runtime/polkadot/src/lib.rs#L747
const dotProxyDepositBase = dotDeposit(1, 8) / DotDecimals;
const dotProxyDepositFactor = dotDeposit(0, 33) / DotDecimals;

const KSM_DOLLARS = DOTS / 6;
const KSM_CENTS = KSM_DOLLARS / 100;
const KSM_MILLICENTS = KSM_CENTS / 1000;

const ksmDeposit = (items, bytes) => {
  return items* 20 * KSM_DOLLARS + bytes * 100 * KSM_MILLICENTS
}

const dotIpfsPdfUrl = `https://ipfs.io/ipfs/${process.env.IPFS_PDF_HASH}?filename=polkadot-wiki.pdf`

// Kusama
// https://github.com/paritytech/polkadot/blob/master/runtime/kusama/src/lib.rs#L758
const ksmProxyDepositBase = ksmDeposit(1, 8) / KsmDecimals;
const ksmProxyDepositFactor = ksmDeposit(0, 33) / KsmDecimals;

const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

export {
  dotProxyDepositBase,
  dotProxyDepositFactor,
  ksmProxyDepositBase,
  ksmProxyDepositFactor,
  dotIpfsPdfUrl,
  toCamelCase,
}
