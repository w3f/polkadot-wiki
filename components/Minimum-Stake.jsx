import { useState, useEffect } from "react";
import React from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { HumanReadable } from "./utilities/filters";

function MinimumStake({ network, defaultValue }) {
  const [returnValue, setReturnValue] = useState('');

  useEffect(async () => {
    // Set defaults based on network
    let wsUrl = undefined;
    if (network === "polkadot") { wsUrl = "wss://rpc.polkadot.io" }
    else if (network === "kusama") { wsUrl = "wss://kusama-rpc.polkadot.io/" }
    else { return (<div />) }

    // Set default value to render on component
    HumanReadable(defaultValue, network, setReturnValue);
    // Calculate a more accurate approximation using on-chain data
    await CalcValidatorMinStake(network, wsUrl, setReturnValue);
  }, []);

  return (returnValue);
}

async function CalcValidatorMinStake(network, wsUrl, setReturnValue) {
  const wsProvider = new WsProvider(wsUrl);
  const api = await ApiPromise.create({ provider: wsProvider })

  const [currentValidators, currentEra] = await Promise.all([
    api.query.session.validators(),
    api.query.staking.currentEra(),
  ]);

  // Get validators stake for current error and first validator
  const validatorStake = await api.query.staking.erasStakers(currentEra.toString(), currentValidators[0])
  let validatorMinStake = parseInt(validatorStake['total'].toString())

  // Iterate era validators
  const validators = await api.query.staking.erasStakers.entries(currentEra.toString());
  validators.forEach(([key, validator]) => {
    const validatorTotalStake = parseInt(validator.total);
    if (validatorTotalStake < validatorMinStake) {
      validatorMinStake = validatorTotalStake;
    }
  });
  
  const result = validatorMinStake.toString();
  HumanReadable(result, network, setReturnValue);
}

export default MinimumStake;