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

function Metadata({version}) {
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
        onChange={(e) => GetMetadata(version, e.target.value, dropdown, setReturnValue)}
        style={{ border: "2px solid #e6007a", width: "225px", height: "40px", fontSize: "16px", textAlign: "center", fontWeight: "bold" }}
      >
        {options.map((option) => (option))}
      </select>
    )

    // Set loading status
    setReturnValue(<div style={{ color: "#e6007a" }}><b>Loading Metadata...</b></div>);

    // Fetch metadata from the chain
    await GetMetadata(version, wsUrl, dropdown, setReturnValue);
  }, []);

  return (returnValue);
}

async function GetMetadata(version, wsUrl, dropdown, setReturnValue) {
  ToggleLoading();
  // Load websocket
  const wsProvider = new WsProvider(wsUrl);
  const api = await ApiPromise.create({ provider: wsProvider })

  // Fetch metadata from on-chain
  const rawMeta = await api.rpc.state.getMetadata();
  const meta = rawMeta.toHuman();
  const block = meta.magicNumber;

  // Set types for currently loaded metadata
  const types = meta.metadata[version].lookup.types;

  // Pallets
  const pallets = meta.metadata[version].pallets;
  pallets.sort((a, b) => a.name.localeCompare(b.name));
  let palletData = [];
  pallets.forEach(pallet => {
    // Pallet Name
    const name = <b>{pallet.name}</b>;

    // Pallet Constants
    let constants = [];
    pallet.constants.sort((a, b) => a.name.localeCompare(b.name));
    pallet.constants.forEach(constant => {
      let constObj = api["consts"][`${Camel(pallet.name)}`][`${Camel(constant.name)}`];
      if (constObj !== undefined) {
        const constantType = types[constant.type].type.def;
        const item = (
          <li key={constant.name}>
            {constant.name}
            <ul>
              <li>{`Docs: ${constant.docs.join(" ")}`}</li>
              <li>API Endpoint: <span style={{ color: "#e6007a" }}>{`api.consts.${Camel(pallet.name)}.${Camel(constant.name)}`}</span></li>
              <li>Return Value: <span style={{ color: "#e6007a" }}>{`${JSON.stringify(constObj)}`}</span></li>
              <li>{`Return Type: ${Object.keys(constantType)[0]} - ${Object.values(constantType)[0]}`}</li>
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
    let errors = [];
    const errorClass = api.errors[`${Camel(pallet.name)}`];
    if (errorClass !== undefined) {
      //const errorTypes = types[pallet.errors.type].type.def;
      const errorNames = Object.keys(errorClass);
      errorNames.sort((a, b) => a.localeCompare(b));
      errorNames.forEach(errorName => {
        const rawError = api.errors[`${Camel(pallet.name)}`][errorName];
        const error = rawError.meta.toHuman();
        const item = (
          <li key={`${pallet.name}.${error.name}`}>
            {error.name}
            <ul>
              <li>{`Docs: ${error.docs.join(" ")}`}</li>
              <li>API Endpoint: <span style={{ color: "#e6007a" }}>{`api.errors.${Camel(pallet.name)}.${errorName}`}</span></li>
            </ul>
          </li>
        )
        errors.push(item);
      });
    }

    // Pallet Events
    let events = [];
    const eventsClass = api.events[`${Camel(pallet.name)}`];
    if (eventsClass !== undefined) {
      //const eventTypes = types[pallet.events.type].type.def;
      const eventNames = Object.keys(eventsClass);
      eventNames.sort((a, b) => a.localeCompare(b));
      eventNames.forEach(eventName => {
        const rawEvent = api.events[`${Camel(pallet.name)}`][eventName];
        const event = rawEvent.meta.toHuman();
        let params = "(";
        for (let i = 0; i < event.args.length; i++) {
          params += `${event.fields[i].typeName}: ${event.args[i]}, `
        }
        params = `${params.slice(0, -2)})`;
        const item = (
          <li key={`${pallet.name}.${event.name}`}>
            {event.name}
            <ul>
              <li>{`Docs: ${event.docs.join(" ")}`}</li>
              <li>API Endpoint: <span style={{ color: "#e6007a" }}>{`api.events.${Camel(pallet.name)}.${eventName}`}</span>{params}</li>
            </ul>
          </li>
        )
        events.push(item);
      });
    }

    // Pallet Storage
    let storage = [];
    if (pallet.storage !== null && pallet.storage.hasOwnProperty("items")) {
      const storagePrefix = pallet.storage.prefix;
      pallet.storage.items.sort((a, b) => a.name.localeCompare(b.name));
      pallet.storage.items.forEach(item => {
        const typeKey = Object.keys(item.type)[0];
        let storageType;
        // TODO - this needs improvements to more efficiently unwrap types
        if (typeKey === "Plain") {
          storageType = types[item.type[typeKey]].type.def;
        } else if (typeKey === "Map") {
          storageType = types[item.type[typeKey].key].type.def;
        } else {
          console.log("Unknown Storage Type");
        }
        const storageItem = (
          <li key={item.name}>
            {`${storagePrefix}.${item.name}`}
            <ul>
              <li>{`Docs: ${item.docs.join(" ")}`}</li>
              <li>API Endpoint: <span style={{ color: "#e6007a" }}>{`api.query.${Camel(storagePrefix)}.${Camel(item.name)}`}</span></li>
              <li>{`Return Type: ${Object.keys(storageType)[0]} - ${Object.values(storageType)[0]}`}</li>
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
          <ul><b>Constants:</b> <ul>{constants}</ul> </ul>
          <ul><b>Errors:</b> <ul>{errors}</ul> </ul>
          <ul><b>Events:</b> <ul>{events}</ul> </ul>
          <ul><b>Storage:</b> <ul>{storage}</ul> </ul>
        </div>
      </div>
    )
  });

  // Runtime
  let calls = [];
  const callsClass = api.call;
  if (callsClass !== undefined) {
    const callNames = Object.keys(callsClass);
    callNames.sort((a, b) => a.localeCompare(b));
    callNames.forEach(callName => {
      let childCalls = [];
      const methods = api.call[callName];
      const methodNames = Object.keys(methods);
      methodNames.sort((a, b) => a.localeCompare(b));
      methodNames.forEach(method => {
        const call = methods[method].meta;
        const item = (
          <div key={`${callName}.${method}`}>
            <b>{`${method.charAt(0).toUpperCase() + method.slice(1)}`}</b>
            <ul>
              <li>{`Docs: ${call.description}`}</li>
              <li>API Endpoint: <span style={{ color: "#e6007a" }}>{`api.call.${callName}.${method}`}</span></li>
              <li>{`Type: ${call.type}`}</li>
            </ul>
          </div>
        )
        childCalls.push(item);
      });

      const header = callName.charAt(0).toUpperCase() + callName.slice(1);
      const formattedCalls = (
        <div key={callName}>
          <span><button id={`${callName}-button`} onClick={(e) => { ToggleExpand(callName) }}>+</button>&nbsp;<b>{header}</b></span>
          <div id={callName} style={{ maxHeight: "0px", overflow: "hidden" }}>
            <ul>
              {childCalls}
            </ul>
          </div>
        </div >
      )
      calls.push(formattedCalls);
    });
  }

  ToggleLoading();

  // Render
  setReturnValue(
    <div>
      {dropdown}
      <br />
      <b>{`Magic Number: ${block}`}</b>
      <br />
      <div id="metadataLoading" style={{ color: "#e6007a", visibility: "hidden" }}><b>Loading Metadata...</b></div>
      {/*<input type="text" placeholder="Search Metadata" style={{ border: "2px solid #000000", width: "225px", height: "40px", fontSize: "16px", textAlign: "center" }}/>*/}
      Pallets:
      {palletData}
      <br />
      Runtime:
      {calls}
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
  if (div.style.maxHeight === "0px") {
    div.style.maxHeight = "100%";
    button.innerText = "-";
  } else {
    div.style.maxHeight = "0px";
    button.innerText = "+";
  }
}

export default Metadata;