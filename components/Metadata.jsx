import React from "react";
import { useState, useEffect } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import Packages from "./../package.json";

// Load PolkadotJS version
const PolkadotJSVersion = Packages.dependencies["@polkadot/api"].substring(1);

// Chains that will appear in the dropdown selection menu
const Networks = [
  { name: "polkadot", rpc: "wss://rpc.polkadot.io" },
  { name: "kusama", rpc: "wss://kusama-rpc.polkadot.io" },
  { name: "statemine", rpc: "wss://statemine-rpc.polkadot.io" },
  { name: "statemint", rpc: "wss://statemint-rpc.polkadot.io" },
  { name: "westend", rpc: "wss://westend-rpc.polkadot.io" },
  { name: "rococo", rpc: "wss://rococo-rpc.polkadot.io" },
];

// Track all top-level containers for expand/collapse all functionality
let Expandable = [];

// Component
function Metadata({ version }) {
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
        style={DropDownStyle}
      >
        {options.map((option) => (option))}
      </select>
    )

    // Set loading status
    setReturnValue(<div style={PinkText}><b>Loading Metadata...</b></div>);

    // Fetch metadata from the chain
    await GetMetadata(version, wsUrl, dropdown, setReturnValue);
  }, []);

  return (returnValue);
}

// Retrieve metadata from selected chain and render results
async function GetMetadata(version, wsUrl, dropdown, setReturnValue) {
  ToggleLoading();
  // Load websocket
  const wsProvider = new WsProvider(wsUrl);
  const api = await ApiPromise.create({ provider: wsProvider });

  // Clear any existing expandable containers
  Expandable = [];

  // Fetch metadata from on-chain
  const rawMeta = await api.rpc.state.getMetadata();
  const meta = rawMeta.toHuman();

  // Set types for currently loaded metadata
  const types = meta.metadata[version].lookup.types;
  //console.log(api.runtimeMetadata.getUniqTypes(false));

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
            <b>{constant.name}</b>
            <ul>
              <li>{`Description: ${constant.docs.join(" ")}`}</li>
              <li>API Endpoint: <span style={PinkText}>{`api.consts.${Camel(pallet.name)}.${Camel(constant.name)}`}</span></li>
              <li>Chain Value: <span style={PinkText}>{`${JSON.stringify(constObj)}`}</span></li>
              <li>{`Chain Value Type: ${Object.keys(constantType)[0]} - ${Object.values(constantType)[0]}`}</li>
            </ul>
          </li>
        )
        constants.push(item);
      } else {
        // TODO: These 2 edge-cases have to do w/ Camel casing variants
        // system.sS58Prefix &  utility.batched_calls_limit
        console.log(`Excluding: ${Camel(pallet.name)}.${Camel(constant.name)}`)
      }
    });
    constants = IsEmpty(constants);

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
            <b>{error.name}</b>
            <ul>
              <li>{`Description: ${error.docs.join(" ")}`}</li>
              <li>API Endpoint: <span style={PinkText}>{`api.errors.${Camel(pallet.name)}.${errorName}`}</span></li>
            </ul>
          </li>
        )
        errors.push(item);
      });
    }
    errors = IsEmpty(errors);

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
        if (params === "(") { params = "None"; }
        const item = (
          <li key={`${pallet.name}.${event.name}`}>
            <b>{event.name}</b>
            <ul>
              <li>{`Description: ${event.docs.join(" ")}`}</li>
              <li>API Endpoint: <span style={PinkText}>{`api.events.${Camel(pallet.name)}.${eventName}`}</span></li>
              <li>{`Fields: ${params}`}</li>
            </ul>
          </li>
        )
        events.push(item);
      });
    }
    events = IsEmpty(events);

    // Extrinsics
    let extrinsics = [];
    const palletExtrinsics = api.tx[Camel(pallet.name)];
    if (palletExtrinsics !== undefined) {
      const keys = Object.keys(palletExtrinsics);
      keys.forEach(key => {
        const meta = api.tx[Camel(pallet.name)][Camel(key)].meta.toHuman();
        let params = "(";
        if (meta.args.length > 0) {
          meta.args.forEach(param => {
            params += `${param.name}: ${param.type}, `
          })
          params = `${params.slice(0, -2)})`;
        }
        if (params === "(") { params = "None"; }
        const extrinsicItem = (
          <li key={`api.tx.${Camel(pallet.name)}.${Camel(key)}`}>
            <b>{key.charAt(0).toUpperCase() + key.slice(1)}</b>
            <ul>
              <li>{`Description: ${meta.docs.join(" ")}`}</li>
              <li>API Endpoint: <span style={PinkText}>{`api.tx.${Camel(pallet.name)}.${Camel(key)}`}</span></li>
              <li>{`Parameters: ${params}`}</li>
            </ul>
          </li>
        )
        extrinsics.push(extrinsicItem);
      })
    }
    extrinsics = IsEmpty(extrinsics);

    // Pallet Storage
    let storage = [];
    if (pallet.storage !== null && pallet.storage.hasOwnProperty("items")) {
      const storagePrefix = pallet.storage.prefix;
      pallet.storage.items.sort((a, b) => a.name.localeCompare(b.name));
      pallet.storage.items.forEach(item => {
        //const test = api.query[Camel(storagePrefix)][Camel(item.name)];
        //console.log(test.meta.toHuman());
        const typeKey = Object.keys(item.type)[0];
        let storageType;
        // TODO - this needs improvements to more efficiently unwrap types
        if (typeKey === "Plain") {
          storageType = types[item.type[typeKey]].type.def;
        } else if (typeKey === "Map") {
          storageType = types[item.type[typeKey].key].type.def;
          /*
          const { hashers, key, value } = item.type.Map;
          if (hashers.length === 1) {
            storageType = types[key].type.def;
          } else {
            storageType = "";
            hashers.forEach(hasher => {
              storageType += `${types[key].type.def}, `;
            })
            console.log(`${Camel(storagePrefix)}.${Camel(item.name)}`);
          }
          */
        } else {
          console.log("Unknown Storage Type");
        }
        const storageItem = (
          <li key={item.name}>
            <b>{`${item.name}`}</b>
            <ul>
              <li>{`Description: ${item.docs.join(" ")}`}</li>
              <li>API Endpoint: <span style={PinkText}>{`api.query.${Camel(storagePrefix)}.${Camel(item.name)}`}</span></li>
              <li>{`Return Type: ${Object.keys(storageType)[0]} - ${Object.values(storageType)[0]}`}</li>
            </ul>
          </li>
        )
        storage.push(storageItem);
      });
    }
    storage = IsEmpty(storage);

    palletData.push(
      <div key={pallet.name}>
        <span><b id={`${pallet.name}-button`} style={TreeControl} onClick={() => { ToggleExpand(pallet.name) }}>+</b>&nbsp;{name}</span>
        <div id={pallet.name} style={TopLevelDiv}>
          <ul style={NoMargin}>
            <span><b id={`${pallet.name}-constants-button`} style={TreeControl} onClick={() => { ToggleExpand(`${pallet.name}-constants`) }}>+</b>&nbsp;<b>Constants:</b></span>
            <div id={`${pallet.name}-constants`} style={CollapsedDiv}>
              <ul>{constants}</ul>
            </div>
          </ul>
          <ul style={NoMargin}>
            <span><b id={`${pallet.name}-errors-button`} style={TreeControl} onClick={() => { ToggleExpand(`${pallet.name}-errors`) }}>+</b>&nbsp;<b>Errors:</b></span>
            <div id={`${pallet.name}-errors`} style={CollapsedDiv}>
              <ul>{errors}</ul>
            </div>
          </ul>
          <ul style={NoMargin}>
            <span><b id={`${pallet.name}-events-button`} style={TreeControl} onClick={() => { ToggleExpand(`${pallet.name}-events`) }}>+</b>&nbsp;<b>Events:</b></span>
            <div id={`${pallet.name}-events`} style={CollapsedDiv}>
              <ul>{events}</ul>
            </div>
          </ul>
          <ul style={NoMargin}>
            <span><b id={`${pallet.name}-extrinsics-button`} style={TreeControl} onClick={() => { ToggleExpand(`${pallet.name}-extrinsics`) }}>+</b>&nbsp;<b>Extrinsics:</b></span>
            <div id={`${pallet.name}-extrinsics`} style={CollapsedDiv}>
              <ul>{extrinsics}</ul>
            </div>
          </ul>
          <ul style={NoMargin}>
            <span><b id={`${pallet.name}-storage-button`} style={TreeControl} onClick={() => { ToggleExpand(`${pallet.name}-storage`) }}>+</b>&nbsp;<b>Storage:</b></span>
            <div id={`${pallet.name}-storage`} style={CollapsedDiv}>
              <ul>{storage}</ul>
            </div>
          </ul>
        </div>
      </div>
    )

    Expandable.push(pallet.name);
    Expandable.push(`${pallet.name}-constants`, `${pallet.name}-errors`, `${pallet.name}-events`, `${pallet.name}-extrinsics`, `${pallet.name}-storage`);
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
            <ul style={NoMargin}>
              <li>{`Description: ${call.description}`}</li>
              <li>API Endpoint: <span style={PinkText}>{`api.call.${callName}.${method}`}</span></li>
              <li>{`Type: ${call.type}`}</li>
            </ul>
          </div>
        )
        childCalls.push(item);
      });

      const header = callName.charAt(0).toUpperCase() + callName.slice(1);
      const formattedCalls = (
        <div key={callName}>
          <span><b id={`${callName}-button`} style={TreeControl} onClick={() => { ToggleExpand(callName) }}>+</b>&nbsp;<b>{header}</b></span>
          <div id={callName} style={TopLevelDiv}>
            <ul style={NoMargin}>
              {childCalls}
            </ul>
          </div>
        </div >
      )
      calls.push(formattedCalls);
      Expandable.push(callName);
    });
  }

  // RPC Methods
  const rpcKeys = Object.keys(api.rpc);
  rpcKeys.sort((a, b) => a.localeCompare(b));
  let rpcs = [];
  rpcKeys.forEach(key => {
    let methods = [];
    const rpcMethods = Object.keys(api.rpc[key]);
    rpcMethods.sort((a, b) => a.localeCompare(b));
    rpcMethods.forEach(method => {
      const rpc = api.rpc[key][method].meta;
      let params = "(";
      if (rpc.params.length > 0) {
        rpc.params.forEach(param => {
          params += `${param.name}: ${param.type}, `
        })
        params = `${params.slice(0, -2)})`;
      }
      if (params === "(") { params = "None"; }
      const item = (
        <div key={`${key}.${method}`}>
          <b>{`${method.charAt(0).toUpperCase() + method.slice(1)}`}</b>
          <ul style={NoMargin}>
            <li>{`Description: ${rpc.description}`}</li>
            <li>API Endpoint: <span style={PinkText}>{`api.rpc.${key}.${method}`}</span></li>
            <li>{`Return Type: ${rpc.type}`}</li>
            <li>{`Parameters: ${params}`}</li>
          </ul>
        </div>
      )
      methods.push(item);
    })
    methods = IsEmpty(methods);
    const header = key.charAt(0).toUpperCase() + key.slice(1);
    const formattedRPC = (
      <div key={key}>
        <span><b id={`${key}-button`} style={TreeControl} onClick={() => { ToggleExpand(key) }}>+</b>&nbsp;<b>{header}</b></span>
        <div id={key} style={TopLevelDiv}>
          <ul style={NoMargin}>
            {methods}
          </ul>
        </div>
      </div >
    )
    rpcs.push(formattedRPC);
    Expandable.push(key);
  })

  ToggleLoading();

  // Render
  setReturnValue(
    <div>
      {dropdown}
      <br />
      <b>{`@polkadot/api version ${PolkadotJSVersion}`}</b>
      <br />
      <div id="metadataLoading" style={LoadingStatus}><b>Loading Metadata...</b></div>
      {/*<input type="text" placeholder="Search Metadata" style={{ border: "2px solid #000000", width: "225px", height: "40px", fontSize: "16px", textAlign: "center" }}/>*/}
      <div id="buttonControls">
        <button onClick={() => ExpandAll(true)}>Expand All</button>
        <button onClick={() => ExpandAll(false)}>Collapse All</button>
      </div>
      <b>Pallets:</b>
      {palletData}
      <br />
      <b>RPC:</b>
      {rpcs}
      <br />
      <b>Runtime:</b>
      {calls}
    </div>
  );
}

// Enforce lower casings of first character on camel case api calls
function Camel(input) {
  return input.charAt(0).toLowerCase() + input.slice(1);
}

// Display loading notification
function ToggleLoading() {
  const el = document.getElementById("metadataLoading");
  if (el !== null) {
    if (el.style.visibility === "hidden") { el.style.visibility = "visible"; }
    else { el.style.visibility = "hidden" };
  }
}

// Expand or collapse a div
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

function ExpandAll(bool) {
  Expandable.forEach(item => {
    const div = document.getElementById(item);
    const button = document.getElementById(`${item}-button`);
    if (bool) {
      div.style.maxHeight = "100%";
      button.innerText = "-";
    } else {
      div.style.maxHeight = "0px";
      button.innerText = "+";
    }
  })
}

// If any sub-sections (Constants, Errors, Events, Storage) contain no children display "None"
function IsEmpty(result) {
  if (result.length === 0) { return (<p style={NoMargin}>None</p>) }
  else { return result; }
}

// Styling
const PinkText = { color: "#e6007a" };
const TopLevelDiv = { maxHeight: "0px", overflow: "hidden" };
const CollapsedDiv = { maxHeight: "0px", overflow: "hidden", margin: "0px" };
const NoMargin = { margin: "0px" };
const DropDownStyle = { border: "2px solid #e6007a", width: "225px", height: "40px", fontSize: "16px", textAlign: "center", fontWeight: "bold" };
const LoadingStatus = { color: "#e6007a", visibility: "hidden" };
const TreeControl = { margin: "0px", color: "#e6007a", cursor: "pointer" };

export default Metadata;