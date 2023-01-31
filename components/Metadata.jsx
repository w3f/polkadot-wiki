import { useState, useEffect } from "react";
import React from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";

function Metadata({ network, defaultValue }) {
  const [returnValue, setReturnValue] = useState('');

  useEffect(async () => {
    // Set defaults based on network
    let wsUrl = undefined;
    if (network === "polkadot") { wsUrl = "wss://rpc.polkadot.io" }
    else if (network === "kusama") { wsUrl = "wss://kusama-rpc.polkadot.io/" }
    else { return (<div />) }
    // Set default value to render on component
    setReturnValue(
      <div style={{ color: "#e6007a", textAlign: "center" }}>
        <b>{defaultValue}</b>
      </div>
    );
    // Calculate a more accurate approximation using on-chain data
    await GetMetadata(network, wsUrl, setReturnValue);
  }, []);

  return (returnValue);
}

async function GetMetadata(network, wsUrl, setReturnValue) {
  const wsProvider = new WsProvider(wsUrl);
  const api = await ApiPromise.create({ provider: wsProvider })

  // Get current fellows
  const rawMeta = await api.rpc.state.getMetadata();
  console.log(rawMeta.toHuman());


  // Render Table
  setReturnValue(
    <div style={{ textAlign: "center" }}>
      {JSON.stringify(rawMeta.toHuman())}
    </div>
  );
}

export default Metadata;