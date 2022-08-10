import { useState, useEffect } from "react";
import React from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { HumanReadable } from "./utilities/filters";

const PolkadotDefaults = {
  wsUrl: "wss://rpc.polkadot.io",
  validators: 18684315524834056,
  currentEra: 799
};

const KusamaDefaults = {
  wsUrl: "wss://kusama-rpc.polkadot.io/",
  validators: 5367388652143741,
  currentEra: 4058
}

async function CalcValidatorMinStake(defaults, setReturnValue) {
  const wsProvider = new WsProvider(defaults.wsUrl);
  const api = await ApiPromise.create({ provider: wsProvider })

  const [currentValidators, currentEra] = await Promise.all([
    api.query.session.validators(),
    api.query.staking.currentEra(),
  ]);

  // Get validators stake for current error and first validator
  const validatorStake = await api.query.staking.erasStakers(currentEra.toString(), currentValidators[0])
  let validatorMinStake = parseInt(validatorStake['total'].toString())

  // For all current validators
  for (let i = 1; i < currentValidators.length; i++) {
    console.log(i);
    // Get the validators stake
    const validatorStake = await api.query.staking.erasStakers(currentEra.toString(), currentValidators[i])
    const validatorTotalStake = parseInt(validatorStake['total'].toString())
    // Compare against current minimum
    if (validatorTotalStake < validatorMinStake) {
      validatorMinStake = validatorTotalStake;
    }
  }
  const output = validatorMinStake.toString();

  console.log(output);

  setReturnValue(output);
}

function MinimumStake({ network }) {
  const [returnValue, setReturnValue] = useState('');

  useEffect(async () => {
    // Set defaults based on network
    let defaults = undefined;
    if (network === "polkadot") { defaults = PolkadotDefaults }
    else if (network === "kusama") { defaults = KusamaDefaults }
    else { return (<div />) }
    // Set default value to render on component
    HumanReadable(defaults.validators, network, setReturnValue);
    // Calculate a more accurate approximation using on-chain data
    await CalcValidatorMinStake(defaults, setReturnValue);
  });

  return (returnValue);
}

export default MinimumStake;