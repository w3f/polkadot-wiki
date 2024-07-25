const Polkadot = "polkadot";
const Kusama = "kusama";
const Statemine = "statemine";
const Statemint = "statemint";
const PolkadotPeople = "polkadotpeople";
const KusamaPeople = "kusamapeople";

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
  polkadotpeople: {
    precision: 1e7,
    symbol: "milliDOT",
  },
  kusamapeople: {
    precision: 1e9,
    symbol: "milliKSM",
  },
};

module.exports = {

  HumanReadable: function (value, network, setReturnValue) {
    let decimals = undefined;
    if (network === Polkadot || network === Statemint || network == PolkadotPeople) {
      decimals = 3;
    } else if (network === Kusama || network === Statemine || network == KusamaPeople) {
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

  Precise: function (value, network, setReturnValue) {
    // String to number
    value = parseFloat(value);
    // Apply precision and append symbol without additional rounding
    value = `${value / values[network].precision} ${values[network].symbol}`;
    // Update value
    setReturnValue(value);
  },

  BlocksToDays: function (value, setReturnValue) {
    value = (value * 6) / 86400;
    // Update value
    setReturnValue(value.toString());
  },

  ErasToDays: function (value, setReturnValue, network) {
    let factor = undefined;
    if (network === Polkadot || network === Statemint || network == PolkadotPeople) {
      factor = 1;
    } else if (network === Kusama || network === Statemine || network == KusamaPeople) {
      factor = 4;
    } else {
      console.log("Unknown network type found when attempting to apply 'Human Readable' filter");
      return;
    }
    
    value = value/factor;
    // Update value
    setReturnValue(value.toString());
  },

  Percentage: function (value, setReturnValue) {
    value = (value) / 10000000;
    // Update value
    setReturnValue(value.toString());
  },

  PermillToPercent: function (value, setReturnValue) {
    value = (value) / 10000;
    // Update value
    setReturnValue(value.toString());
  },

  ArrayLength: function (value, setReturnValue) {
    value = value.split(',').length;
    // Update value
    setReturnValue(value.toString());
  }

}