import { useState, useEffect } from "react";
import React from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";

function Fellowship({ network, defaultValue }) {
  const [returnValue, setReturnValue] = useState('');

  useEffect(async () => {
    // Set defaults based on network
    let wsUrl = undefined;
    if (network === "polkadot") { wsUrl = "wss://rpc.polkadot.io" }
    else if (network === "kusama") { wsUrl = "wss://kusama-rpc.polkadot.io/" }
    else { return (<div />) }
    // Set default value to render on component
    setReturnValue(
      <div style={{ color: "#e6007a" }}>
        {defaultValue}
      </div>
    );
    // Calculate a more accurate approximation using on-chain data
    await GetFellows(network, wsUrl, setReturnValue);
  }, []);

  return (returnValue);
}

async function GetFellows(network, wsUrl, setReturnValue) {
  const wsProvider = new WsProvider(wsUrl);
  const api = await ApiPromise.create({ provider: wsProvider })

  let chain = "";
  let explorerUrl = "";
  if (network === "polkadot") {
    chain = "Polkadot"
    explorerUrl = "https://polkadot.subscan.io/account/";
  } else if (network === "kusama") {
    chain = "Kusama"
    explorerUrl = "https://kusama.subscan.io/account/";
  } else {
    setReturnValue(<div></div>);
    return;
  }

  // Get current fellows
  const collectiveData = await api.query.fellowshipCollective.members.entries();

  // Sort by rank
  collectiveData.sort(function (a, b) {
    return JSON.parse(b[1]).rank - JSON.parse(a[1]).rank;
  })

  const header = (
    <thead>
      <tr>
        <th style={{ width: "100%" }}>Account</th>
        <th style={{ width: "100%" }}>Rank</th>
      </tr>
    </thead>
  )

  let tableData = [];

  // Decode and style accounts and ranks
  collectiveData.forEach((member) => {
    const hash = member[0].toHuman();
    const rank = JSON.parse(member[1]).rank;
    tableData.push(
      <tr key={ hash.toString() }>
        <td style={{ width: "100%", border: "none" }}>
          <a href={`${explorerUrl + hash}`}>
            {`${hash}`}
          </a>
        </td>
        <td style={{ width: "100%", border: "none" }}>{`${rank}`}</td>
      </tr>
    )
  });

  // Render Table
  setReturnValue(
    <div>
      Current { chain } Fellows:
      <div style={{ margin: "auto", maxWidth: "650px", border: "1px solid #dadde1" }}>
        <table style={{ margin: 0 }}>
          {header}
        </table>
        <table style={{ width: "100%", overflow: "auto", height: "300px" }}>
          <tbody style={{ width: "100%", textAlign: "center" }}>
            {tableData}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Fellowship;