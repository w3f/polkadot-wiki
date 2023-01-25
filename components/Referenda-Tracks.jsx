import { useState, useEffect } from "react";
import React from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";

function Tracks({ network, defaultValue }) {
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
    await GetTracks(network, wsUrl, setReturnValue);
  }, []);

  return (returnValue);
}

async function GetTracks(network, wsUrl, setReturnValue) {
  const wsProvider = new WsProvider(wsUrl);
  const api = await ApiPromise.create({ provider: wsProvider })

  if (network !== "polkadot" && network !== "kusama") {
    setReturnValue(<div></div>);
    return;
  }

  // Get current tracks
  const rawTracksData = api.consts.referenda.tracks;

  rawTracksData.forEach(track => {
    const trackData = track.toHuman();
    console.log(`ID: ${trackData[0]}`);
    for (let key in trackData[1]) {
      if (key === "minApproval" || key === "minSupport") {
        if (trackData[1][key].hasOwnProperty("Reciprocal")) {
          const Reciprocal = trackData[1][key].Reciprocal;
          console.log(`Reciprocal - Factor: ${Reciprocal.factor}, X-Offset: ${Reciprocal.xOffset}, Y-Offset: ${Reciprocal.yOffset}`);
        } else if (trackData[1][key].hasOwnProperty("LinearDecreasing")) {
          const LinearDecreasing = trackData[1][key].LinearDecreasing;
          console.log(`LinearDecreasing - Length: ${LinearDecreasing.length}, Floor: ${LinearDecreasing.floor}, Ceiling: ${LinearDecreasing.ceil}`)
        }
      } else {
        console.log(key, trackData[1][key]);
      }
    }
    console.log("");
  });

  const header = (
    <thead>
      <tr>
        <th style={{ width: "100%" }}>Account</th>
        <th style={{ width: "100%" }}>Rank</th>
      </tr>
    </thead>
  )

  /*

  let tableData = [];

  // Decode and style accounts and ranks
  collectiveData.forEach((member) => {
    const hash = member[0].toHuman();
    const rank = JSON.parse(member[1]).rank;
    tableData.push(
      <tr key={hash.toString()}>
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
    <div style={{ textAlign: "center" }}>
      <b>Current {chain} Fellows ({tableData.length}):</b>
      <br /><br />
      <div style={{ margin: "auto", maxWidth: "650px", border: "1px solid #dadde1" }}>
        <table style={{ margin: 0 }}>
          {header}
        </table>
        <table style={{ margin: 0, width: "100%", overflow: "auto", height: "300px" }}>
          <tbody style={{ width: "100%", textAlign: "center" }}>
            {tableData}
          </tbody>
        </table>
      </div>
    </div>
  );

  */
}

export default Tracks;