import React from "react";
import { useState, useEffect } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";

const Networks = [
  { name: "polkadot", rpc: "wss://rpc.polkadot.io" },
  { name: "kusama", rpc: "wss://kusama-rpc.polkadot.io" },
  { name: "statemine", rpc: "wss://statemine-rpc.polkadot.io" },
  { name: "statemint", rpc: "wss://statemint-rpc.polkadot.io" },
  { name: "westend", rpc: "wss://westend-rpc.polkadot.io" },
  { name: "rococo", rpc: "wss://rococo-rpc.polkadot.io" },
];

function Metadata() {
  const [returnValue, setReturnValue] = useState("");

  useEffect(async () => {
    // Load defaults
    let wsUrl = Networks[0].rpc;

    // Build selection dropdown
    let options = [];
    Networks.forEach(chain => {
      const option = <option value={chain.rpc} key={chain.name}>{`${chain.name.charAt(0).toUpperCase() + chain.name.slice(1)}`}</option>
      options.push(option);
    });
    const dropdown = (
      <select
        defaultValue={0}
        onChange={(e) => GetMetadata(e.target.value, dropdown, setReturnValue)}
        style={{ border: "2px solid #e6007a", width: "225px", height: "40px", fontSize: "16px", textAlign: "center", fontWeight: "bold" }}
      >
        {options.map((option) => (option))}
      </select>
    )

    // Set loading status
    setReturnValue(<div style={{ color: "#e6007a" }}><b>Loading Metadata...</b></div>);

    // Fetch metadata from the chain
    await GetMetadata(wsUrl, dropdown, setReturnValue);
  }, []);

  return (returnValue);
}

async function GetMetadata(wsUrl, dropdown, setReturnValue) {
  ToggleLoading();
  // Load websocket
  const wsProvider = new WsProvider(wsUrl);
  const api = await ApiPromise.create({ provider: wsProvider })

  // Fetch metadata from on-chain
  const rawMeta = await api.rpc.state.getMetadata();
  const meta = rawMeta.toHuman();
  const block = meta.magicNumber;

  // Pallets
  // TODO - Add dropdown selection for version
  const pallets = meta.metadata.V14.pallets;
  pallets.sort((a, b) => a.name.localeCompare(b.name));
  let palletData = [];
  pallets.forEach(pallet => {
    // Pallet Name
    const name = <b>{pallet.name}</b>;

    // Pallet Index 
    const index = pallet.index;

    // Pallet Runtime Calls
    let calls = pallet.calls;
    /* TODO - Decode */
    if (calls !== null && calls.hasOwnProperty("type")) { calls = <li>{`Type: ${calls.type}`}</li>; }
    else { calls = <div /> }

    // Pallet Constants
    let constants = [];
    pallet.constants.sort((a, b) => a.name.localeCompare(b.name));
    pallet.constants.forEach(constant => {
      let constObj = api["consts"][`${Camel(pallet.name)}`][`${Camel(constant.name)}`];
      if (constObj !== undefined) {
        const item = (
          <li key={constant.name}>
            {constant.name}
            <ul>
              <li>{`Docs: ${constant.docs.join(" ")}`}</li>
              <li>API Endpoint: <span style={{ color: "#e6007a" }}>{`api.consts.${Camel(pallet.name)}.${Camel(constant.name)}`}</span></li>
              <li>Return Value: <span style={{ color: "#e6007a" }}>{`${JSON.stringify(constObj)}`}</span></li>
              {/*<li>{`Return Type: ${typeof constObj.toJSON()}`}</li>*/}
            </ul>
          </li>
        )
        constants.push(item);
      } else {
        // TODO: These 2 edge-cases have to do w/ Camel casing variants
        console.log(`Excluding: ${Camel(pallet.name)}.${Camel(constant.name)}`)
      }
    });

    // Pallet Errors
    let errors = pallet.errors;
    /* TODO - Decode */
    if (errors !== null && errors.hasOwnProperty('type')) { errors = <li>{`Type: ${errors.type}`}</li>; }
    else { errors = <div /> }

    // Pallet Events
    let events = pallet.events;
    /* TODO - Decode */
    if (events !== null && events.hasOwnProperty("type")) { events = <li>{`Type: ${events.type}`}</li>; }
    else { events = <div /> }

    // Pallet Storage
    let storage = [];
    if (pallet.storage !== null && pallet.storage.hasOwnProperty("items")) {
      const storagePrefix = pallet.storage.prefix;
      pallet.storage.items.sort((a, b) => a.name.localeCompare(b.name));
      pallet.storage.items.forEach(item => {
        const storageItem = (
          <li key={item.name}>
            {`${storagePrefix}.${item.name}`}
            <ul>
              {/* TODO - Decode */}
              <li>{`Docs: ${item.docs.join(" ")}`}</li>
              <li>{`API Endpoint: api.query.${Camel(storagePrefix)}.${Camel(item.name)}`}</li>
              <li>{`Return Type: ${JSON.stringify(item.type)}`}</li>
              <li>{`Modifier: ${item.modifier}`}</li>
              <li>{`Fallback: ${item.fallback}`}</li>
            </ul>
          </li>
        )
        storage.push(storageItem);
      });
    }

    palletData.push(
      <div key={pallet.name}>
        <span><button id={`${pallet.name}-button`} onClick={(e) => { ToggleExpand(pallet.name) }}>+</button>&nbsp;{name}</span>
        <div id={pallet.name} style={{ maxHeight: "0px", overflow: "hidden" }}>
          <ul><b>Index:</b> {index} </ul>
          <ul><b>Calls:</b> <ul>{calls}</ul> </ul>
          <ul><b>Constants:</b> <ul>{constants}</ul> </ul>
          <ul><b>Errors:</b> <ul>{errors}</ul> </ul>
          <ul><b>Events:</b> <ul>{events}</ul> </ul>
          <ul><b>Storage:</b> <ul>{storage}</ul> </ul>
        </div>
      </div>
    )
  });

  ToggleLoading();

  // Render
  setReturnValue(
    <div>
      {dropdown}
      <br />
      <b>{`Magic Number: ${block}`}</b>
      <br />
      <div id="metadataLoading" style={{ color: "#e6007a", visibility: "hidden" }}><b>Loading Metadata...</b></div>
      {palletData}
    </div>
  );
}

function Camel(input) {
  return input.charAt(0).toLowerCase() + input.slice(1);
}

function ToggleLoading() {
  const el = document.getElementById("metadataLoading");
  if (el !== null) {
    if (el.style.visibility === "hidden") { el.style.visibility = "visible"; }
    else { el.style.visibility = "hidden" };
  }
}

function ToggleExpand(id) {
  const div = document.getElementById(id);
  const button = document.getElementById(`${id}-button`);
  console.log(div.style.maxHeight);
  if (div.style.maxHeight === "0px") {
    div.style.maxHeight = "100%";
    button.innerText = "-";
  } else {
    div.style.maxHeight = "0px";
    button.innerText = "+";
  }
}

export default Metadata;