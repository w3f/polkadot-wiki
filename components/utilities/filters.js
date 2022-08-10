const Polkadot = "polkadot";
const Kusama = "kusama";
const Statemine = "statemine";
const Statemint = "statemint";

const values = {
  polkadot: {
      precision: 1e10,
      symbol: "DOT",
  },
    kusama: {
      precision: 1e12,
      symbol: "KSM",
  },
  statemint: {
    precision: 1e10,
    symbol: "DOT",
  },
  statemine: {
    precision: 1e12,
    symbol: "KSM",
  },
};

module.exports = {

  HumanReadable: function (value, network, setReturnValue) {
    let decimals = undefined;
    if (network === Polkadot || network === Statemint) {
      decimals = 3;
    } else if (network === Kusama || network === Statemine) {
      decimals = 6;
    } else {
      console.log("Unknown network type found when attempting to apply 'Human Readable' filter");
      return;
    }
    // String to number
    value = parseFloat(value);
    // Apply precision
    if (Number.isInteger(value / values[network].precision)) {
      value = `${value / values[network].precision} ${values[network].symbol}`;
    } else {
      value = `${(value / values[network].precision).toFixed(decimals)} ${values[network].symbol}`;
    }
    // Update value
    setReturnValue(value.toString());
  },

  BlocksToDays: function (value, setReturnValue) {
    value = (value * 6) / 86400;
    // Update value
    setReturnValue(value.toString());
  }
}