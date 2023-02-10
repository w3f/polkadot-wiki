import React from "react";
import { useState, useEffect } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import Packages from "./../package.json";

// Load PolkadotJS version
const PolkadotJSVersion = Packages.devDependencies["@polkadot/api"].substring(1);

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
export default function Metadata({ version }) {
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
      <select defaultValue={0} style={DropDownStyle} onChange={(e) => GetMetadata(version, e.target.value, dropdown, setReturnValue)}>
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

  // Pallets
  const pallets = meta.metadata[version].pallets;
  pallets.sort((a, b) => a.name.localeCompare(b.name));
  let palletData = [];
  pallets.forEach(pallet => {
    // Pallet extractions
    const constants = BuildPalletItems(pallet, api.consts[`${Camel(pallet.name)}`], "constants", types);
    const errors = BuildPalletItems(pallet, api.errors[`${Camel(pallet.name)}`], "errors", types);
    let events = BuildPalletItems(pallet, api.events[`${Camel(pallet.name)}`], "events", types);
    let extrinsics = BuildPalletItems(pallet, api.tx[`${Camel(pallet.name)}`], "extrinsics", types);
    let storage = BuildPalletItems(pallet, api.query[Camel(pallet.name)], "storage", types);

    // Format pallet extractions for rendering
    const constantElements = CompilePalletSection(pallet.name, "constants", constants);
    const errorElements = CompilePalletSection(pallet.name, "errors", errors);
    const eventElements = CompilePalletSection(pallet.name, "event", events);
    const extrinsicElements = CompilePalletSection(pallet.name, "extrinsics", extrinsics);
    const storageElements = CompilePalletSection(pallet.name, "storage", storage);

    // Compile all elements for the given pallet
    palletData.push(
      <div key={pallet.name}>
        <span><b id={`${pallet.name}-button`} style={TreeControl} onClick={() => { ToggleExpand(pallet.name) }}>+</b>&nbsp;<b>{pallet.name}</b></span>
        <div id={pallet.name} style={TopLevelDiv}>
          {constantElements}
          {errorElements}
          {eventElements}
          {extrinsicElements}
          {storageElements}
        </div>
      </div>
    )
    Expandable.push(pallet.name);
    Expandable.push(`${pallet.name}-constants`, `${pallet.name}-errors`, `${pallet.name}-events`, `${pallet.name}-extrinsics`, `${pallet.name}-storage`);
  });

  // Extract RPC and Runtime data
  const rpcs = BuildRPCOrRuntime(api.rpc, "rpc");
  const runtime = BuildRPCOrRuntime(api.call, "runtime");

  ToggleLoading();

  // Render
  setReturnValue(
    <div>
      {dropdown}
      <br />
      <b style={PinkText}>@polkadot/api</b><b>{` version ${PolkadotJSVersion}`}</b>
      <br />
      <div id="metadataLoading" style={LoadingStatus}><b>Loading Metadata...</b></div>
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
      {runtime}
    </div>
  );
}

// Format lists for a given pallet invocation
function BuildPalletItems(pallet, call, type, types) {
  let output = [];
  if (call !== undefined && call !== null) {
    const keys = Object.keys(call).sort((a, b) => a.localeCompare(b));
    keys.forEach(key => {
      const meta = call[key].meta.toHuman();
      const description = FormatDescription(meta.docs.join(" "));
      const keyUpper = key.charAt(0).toUpperCase() + key.slice(1);
      let list;
      switch (type) {
        case "constants":
          const constType = types[meta.type].type.def;
          list = (
            <ul>
              <li><u>Description</u>: {description}</li>
              <li><u>API Endpoint</u>: <span style={PinkText}>{`api.consts.${Camel(pallet.name)}.${Camel(key)}`}</span></li>
              <li><u>Chain Value</u>: <span style={PinkText}>{`${JSON.stringify(call[key])}`}</span></li>
              <li><u>Chain Value Type</u>: {`${Object.keys(constType)[0]} - ${Object.values(constType)[0]}`}</li>
            </ul>
          )
          break;
        case "errors":
          list = (
            <ul>
              <li><u>Description</u>: {description}</li>
              <li><u>API Endpoint</u>: <span style={PinkText}>{`api.errors.${Camel(pallet.name)}.${Camel(key)}`}</span></li>
            </ul>
          )
          break;
        case "events":
          list = (
            <ul>
              <li><u>Description</u>: {description}</li>
              <li><u>API Endpoint</u>: <span style={PinkText}>{`api.events.${Camel(pallet.name)}.${Camel(key)}`}</span></li>
              <li><u>Fields</u>: {FormatArgs(meta, "events")}</li>
            </ul>
          )
          break;
        case "extrinsics":
          list = (
            <ul>
              <li><u>Description</u>: {description}</li>
              <li><u>API Endpoint</u>: <span style={PinkText}>{`api.tx.${Camel(pallet.name)}.${Camel(key)}`}</span></li>
              <li><u>Parameters</u>: {FormatArgs(meta, "extrinsics")}</li>
            </ul>
          )
          break;
        case "storage":
          list = (
            <ul>
              <li><u>Description</u>: {description}</li>
              <li><u>API Endpoint</u>: <span style={PinkText}>{`api.query.${Camel(pallet.name)}.${Camel(key)}`}</span></li>
              <li><u>Return Type</u>: {FormatArgs(meta, "storage", types)}</li>
            </ul>
          )
          break;
        default:
          item = undefined;
          break;
      }
      const item = (
        <li key={key}>
          <b>{keyUpper}</b>
          {list}
        </li>
      )
      output.push(item);
    });
  } else {
    console.log(`No ${type} found for ${pallet.name}`);
  }
  output = IsEmpty(output);
  return output;
}

// Format lists for a given RPC or runtime
function BuildRPCOrRuntime(call, type) {
  let output = [];
  const keys = Object.keys(call);
  keys.sort((a, b) => a.localeCompare(b));
  keys.forEach(key => {
    let children = [];
    const methods = call[key];
    const methodKeys = Object.keys(methods);
    methodKeys.sort((a, b) => a.localeCompare(b));
    methodKeys.forEach(methodKey => {
      const childCall = methods[methodKey].meta;
      const callDescription = FormatDescription(childCall.description);
      let listItems;
      switch (type) {
        case "rpc":
          listItems = (
            <ul style={NoMargin}>
              <li><u>Description</u>: {callDescription}</li>
              <li><u>API Endpoint</u>: <span style={PinkText}>{`api.rpc.${key}.${methodKey}`}</span></li>
              <li><u>Return Type</u>: {childCall.type}</li>
              <li><u>Parameters</u>: {FormatArgs(childCall, "rpc")}</li>
            </ul>
          )
          break;
        case "runtime":
          listItems = (
            <ul style={NoMargin}>
              <li><u>Description</u>: {callDescription}</li>
              <li><u>API Endpoint</u>: <span style={PinkText}>{`api.call.${key}.${methodKey}`}</span></li>
              <li><u>Type</u>: {childCall.type}</li>
            </ul>
          )
          break;
        default:
          break;
      }
      const item = (
        <div key={`${key}.${methodKey}`}>
          <b>{`${methodKey.charAt(0).toUpperCase() + methodKey.slice(1)}`}</b>
          {listItems}
        </div>
      )
      children.push(item);
    });
    children = IsEmpty(children);
    const header = key.charAt(0).toUpperCase() + key.slice(1);
    const formattedCalls = (
      <div key={key}>
        <span><b id={`${key}-button`} style={TreeControl} onClick={() => { ToggleExpand(key) }}>+</b>&nbsp;<b>{header}</b></span>
        <div id={key} style={TopLevelDiv}>
          <ul style={NoMargin}>
            {children}
          </ul>
        </div>
      </div >
    )
    output.push(formattedCalls);
    Expandable.push(key);
  });
  return output;
}

// Enforce lower casings of first character on camel case api calls
function Camel(input) {
  return input.charAt(0).toLowerCase() + input.slice(1);
}

// If any sub-sections (Constants, Errors, Events, Storage) contain no children display "None"
function IsEmpty(result) {
  if (result.length === 0) { return (<p style={NoMargin}>None</p>) }
  else { return result; }
}

// Construction pallet sub-categories (constants, errors, events, extrinsics, storage)
function CompilePalletSection(palletName, category, items) {
  return (
    <ul style={NoMargin}>
      <span>
        <b id={`${palletName}-${category}-button`} style={TreeControl} onClick={() => { ToggleExpand(`${palletName}-${category}`) }}>+</b>
        &nbsp;<b>{category.charAt(0).toUpperCase() + category.slice(1)}</b>
      </span>
      <div id={`${palletName}-${category}`} style={CollapsedDiv}>
        <ul>{items}</ul>
      </div>
    </ul>
  )
}

// Format a description string
function FormatDescription(description) {
  let descriptionItems = description.split('`');
  let output = [];
  for (let i = 0; i < descriptionItems.length; i++) {
    if (i % 2 === 0) {
      output.push(<p key={i} style={DescriptionRegular}>{descriptionItems[i]}</p>)
    } else {
      output.push(<p key={i} style={DescriptionHighlighting}>{descriptionItems[i]}</p>)
    }
  }
  return <span>{output}</span>;
}

// Extract and format arguments from metadata
function FormatArgs(item, type, types=null) {
  let params = "(";
  if (type === "rpc") {
    item.params.forEach(param => {
      params += `${param.name}: ${param.type}, `;
    })
  } else if (type === "extrinsics") {
    for (let i = 0; i < item.args.length; i++) {
      params += `${item.args[i].name}: ${item.args[i].type}, `
    }
  } else if (type === "events") {
    for (let i = 0; i < item.args.length; i++) {
      params += `${item.fields[i].typeName}: ${item.args[i]}, `
    }
  } else if (type === "storage") {
    const key = Object.keys(item.type)[0];
    // TODO - still need to further decode tuple types
    if (key === "Plain") {
      const type = types[item.type[key]].type.def;
      params += `${Object.keys(type)[0]}: ${Object.values(type)[0]}, `
    } else if (key === "Map") {
      const type = types[item.type[key].key].type.def;
      params += `${Object.keys(type)[0]}: ${Object.values(type)[0]}, `
    } else {
      console.log("Unknown Storage Type");
    }
  }
  params = `${params.slice(0, -2)})`;
  if (params === "(" || params === ")") { params = "None"; }
  return params;
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

// Expand or collapse all divs
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

// Styling
const PinkText = { color: "#e6007a" };
const DescriptionRegular = { margin: "0px", display: "inline" };
const DescriptionHighlighting = { color: "#e6007a", margin: "0px", display: "inline", background: "#f0f0f0", paddingLeft: "5px", paddingRight: "5px" }
const TopLevelDiv = { maxHeight: "0px", overflow: "hidden" };
const CollapsedDiv = { maxHeight: "0px", overflow: "hidden", margin: "0px" };
const NoMargin = { margin: "0px" };
const DropDownStyle = { border: "2px solid #e6007a", width: "225px", height: "40px", fontSize: "16px", textAlign: "center", fontWeight: "bold" };
const LoadingStatus = { color: "#e6007a", visibility: "hidden" };
const TreeControl = { margin: "0px", color: "#e6007a", cursor: "pointer" };
