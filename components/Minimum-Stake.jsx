import { useState, useEffect } from "react";
import React from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { HumanReadable } from "./utilities/filters";

function MinimumStake({ network, defaultValue }) {
  const [returnValue, setReturnValue] = useState('');

  useEffect(async () => {
    console.log(defaultValue);
    // Set defaults based on network
    let wsUrl = undefined;
    if (network === "polkadot") { wsUrl = "wss://rpc.polkadot.io" }
    else if (network === "kusama") { wsUrl = "wss://kusama-rpc.polkadot.io/" }
    else { return (<div />) }

    // Set default value to render on component
    HumanReadable(defaultValue, network, setReturnValue);
    // Calculate a more accurate approximation using on-chain data
    await CalcValidatorMinStake(network, wsUrl, setReturnValue);
  });

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

  // TODO: this operation takes too long - try and see if we can batch the requests or use async
  // For all current validators
  for (let i = 1; i < currentValidators.length; i++) {
    // Get the validators stake
    const validatorStake = await api.query.staking.erasStakers(currentEra.toString(), currentValidators[i])
    const validatorTotalStake = parseInt(validatorStake['total'].toString())
    // Compare against current minimum
    if (validatorTotalStake < validatorMinStake) {
      validatorMinStake = validatorTotalStake;
    }
  }
  const output = validatorMinStake.toString();
  HumanReadable(output, network, setReturnValue);
}

export default MinimumStake;