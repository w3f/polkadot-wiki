import { useState, useEffect } from "react";
import React from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";

function Tracks({ network, defaultValue }) {
  const [returnValue, setReturnValue] = useState('');

  useEffect(async () => {
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

  // If unknown network is provided
  if (network !== "polkadot" && network !== "kusama") {
    setReturnValue(<div></div>);
    return;
  }
  
  // Else grab the tracks value from on-chain and build the table
  let tableData = [];

  // Get current tracks
  const rawTracksData = api.consts.referenda.tracks;
  
  // Iterate all tracks
  rawTracksData.forEach(track => {
    const trackData = track.toHuman();
    // Format origin names
    let origin = trackData[1].name.replace("_", " ");
    origin = origin.split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    // Format minApproval and min Support (objects - contain nested values)
    const minApproval = FormatObject(trackData[1].minApproval);
    const minSupport = FormatObject(trackData[1].minSupport);
    // Row
    tableData.push(
      <tr key={trackData[0]}>
        <td><b>{trackData[0]}</b></td>
        <td>{origin}</td>
        <td>{trackData[1].maxDeciding}</td>
        <td>{HumanReadable(trackData[1].decisionDeposit, network)}</td>
        <td>{trackData[1].preparePeriod}</td>
        <td>{trackData[1].decisionPeriod}</td>
        <td>{trackData[1].confirmPeriod}</td>
        <td>{trackData[1].minEnactmentPeriod}</td>
        <td>{minApproval}</td>
        <td>{minSupport}</td>
      </tr>
    )
  });

  // Render Table
  setReturnValue(
    <div style={{ textAlign: "center" }}>
      <b>Current {network.charAt(0).toUpperCase() + network.slice(1)} Tracks ({tableData.length}):</b>
      <br /><br />
      <div style={{ border: "1px solid #dadde1" }}>
        <table style={{ margin: 0, maxHeight: "800px", borderCollapse: "separate", borderSpacing: 0 }}>
          <thead style={{ width: "100%", textAlign: "center", position: "sticky", top: 0, background: "#c1c1c1" }}>
            <tr>
              <th>ID</th>
              <th>Origin</th>
              <th>Max Deciding</th>
              <th>Decision Deposit</th>
              <th>Prepare Period</th>
              <th>Decision Period</th>
              <th>Confirm Period</th>
              <th>Min Enactment Period</th>
              <th>Min Approval</th>
              <th>Min Support</th>
            </tr>
          </thead>
          <tbody style={{ width: "100%", textAlign: "center" }}>
            {tableData}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Format MinApproval and MinSupport Objects
function FormatObject(item) {
  if (item.hasOwnProperty("Reciprocal")) {
    const Reciprocal = item.Reciprocal;
    return (
      <div>
        <p style={{margin: 0}}>Reciprocal</p>
        <p style={{fontSize: "10px", margin: 0}}>{`Factor: ${Reciprocal.factor}`}</p>
        <p style={{fontSize: "10px", margin: 0}}>{`X-Offset: ${Reciprocal.xOffset}`}</p>
        <p style={{fontSize: "10px", margin: 0}}>{`Y-Offset: ${Reciprocal.yOffset}`}</p>
      </div>
    );
  } else if (item.hasOwnProperty("LinearDecreasing")) {
    const LinearDecreasing = item.LinearDecreasing;
    return (
      <div>
        <p style={{margin: 0}}>Linear Decreasing</p>
        <p style={{fontSize: "10px", margin: 0}}>{`Length: ${LinearDecreasing.length}`}</p>
        <p style={{fontSize: "10px", margin: 0}}>{`Floor: ${LinearDecreasing.floor}`}</p>
        <p style={{fontSize: "10px", margin: 0}}>{`Ceiling: ${LinearDecreasing.ceil}`}</p>
      </div>
    );
  } else {
    return "";
  }
}

function HumanReadable(value, network) {
  const values = {
    polkadot: {
      precision: 1e10,
      symbol: "DOT",
    },
    kusama: {
      precision: 1e12,
      symbol: "KSM",
    }
  }
  let decimals = undefined;
  if (network === "polkadot") {
    decimals = 3;
  } else if (network === "kusama") {
    decimals = 6;
  } else {
    return;
  }
  // Remove commas
  value = value.replace(/\,/g, '');
  // String to number
  value = parseFloat(value);
  // Apply precision
  if (Number.isInteger(value / values[network].precision)) {
    value = `${value / values[network].precision} ${values[network].symbol}`;
  } else {
    value = `${(value / values[network].precision).toFixed(decimals)} ${values[network].symbol}`;
  }
  // Update value
  return value.toString();
}

export default Tracks;