import React from "react";
import { useState, useEffect } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import Packages from "./../package.json";

// Load PolkadotJS version
const PolkadotJSVersion = Packages.devDependencies["@polkadot/api"].substring(1);

// Chains that will appear in the dropdown selection menu (add new parachains here)
const Networks = [
  { name: "Polkadot", rpc: "wss://rpc.ibp.network/polkadot" },
  { name: "Polkadot Asset Hub", rpc: "wss://polkadot-asset-hub-rpc.polkadot.io" },
  { name: "Polkadot People", rpc: "wss://polkadot-people-rpc.polkadot.io"},
  { name: "Polkadot Bridge Hub", rpc: "wss://polkadot-bridge-hub-rpc.polkadot.io"},
  { name: "Polkadot Collectives", rpc: "wss://polkadot-collectives-rpc.polkadot.io"},
  { name: "Kusama", rpc: "wss://rpc.ibp.network/kusama" },
  { name: "Kusama Asset Hub", rpc: "wss://kusama-asset-hub-rpc.polkadot.io" },
  { name: "Kusama People", rpc: "wss://kusama-people-rpc.polkadot.io"},
  { name: "Kusama Bridge Hub", rpc: "wss://kusama-bridge-hub-rpc.polkadot.io"},
  { name: "Kusama Coretime", rpc: "wss://kusama-coretime-rpc.polkadot.io"},
  { name: "Westend", rpc: "wss://westend-rpc.polkadot.io" },
  { name: "Rococo", rpc: "wss://rococo-rpc.polkadot.io" },
  { name: "Westmint", rpc: "wss://westmint-rpc.polkadot.io" },
];

// Common pallets specific to Polkadot/Kusama.
const CommonRuntimeModules = ["auctions", "claims", "crowdloan", "registrar", "slots"];
const CommonParachainRuntimeModules = ["configuration", "hrmp", "initializer", "paras_inherent", "paras", "disputes", "disputes/slashing"];
// Mappings from metadata to names compatible with searching in Rust docs
const PalletNameMappings = {
  "registrar": "paras_registrar",
  "xcmpallet": "xcm",
  "voterlist": "bags_list",
  "fastunstake": "fast_unstake",
  "childbounties": "child_bounties",
  "nominationpools": "nomination_pools",
  "convictionvoting": "conviction_voting",
  "imonline": "im_online",
  "parasdisputes": "disputes",
  "parasslashing": "disputes/slashing",
  "parainherent": "paras_inherent",
  "messagequeue": "message_queue",
  "electionprovidermultiphase": "election_provider_multi_phase",
  "system": "frame_system",
};

// Track all top-level containers for expand/collapse all functionality
let Expandable = [];

// Timeout for performing search requests
let SearchThrottle;

// Component
export default function Metadata({ version }) {
  const [returnValue, setReturnValue] = useState("");

  useEffect(async () => {
    // Load default network
    let defaultNetwork = "Polkadot";
    if (document.title === "Metadata Explorer · Guide") { defaultNetwork = "Kusama"; }
    const network = Networks.find(network => { return network.name === defaultNetwork });
    const wsUrl = network.rpc;

    // Build selection dropdown
    let options = [];
    Networks.forEach(chain => {
      const option = <option value={chain.rpc} key={chain.name}>{`${chain.name.charAt(0).toUpperCase() + chain.name.slice(1)}`}</option>
      options.push(option);
    });
    const dropdown = (
      <select defaultValue={network.rpc} style={DropDownStyle} onChange={(e) => GetMetadata(version, e.target.value, dropdown, setReturnValue)}>
        {options.map((option) => (option))}
      </select>
    )

    // Set loading status
    setReturnValue(<div style={PinkText}><b>Loading Metadata Explorer...</b></div>);

    // Fetch metadata from the chain
    await GetMetadata(version, wsUrl, dropdown, setReturnValue);
  }, []);

  return (returnValue);
}

// Retrieve metadata from selected chain and render results
async function GetMetadata(version, wsUrl, dropdown, setReturnValue) {
  ToggleLoading("metadataLoading", false);
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
    const events = BuildPalletItems(pallet, api.events[`${Camel(pallet.name)}`], "events", types);
    const extrinsics = BuildPalletItems(pallet, api.tx[`${Camel(pallet.name)}`], "extrinsics", types);
    const storage = BuildPalletItems(pallet, api.query[Camel(pallet.name)], "storage", types);

    // Format pallet extractions for rendering
    const constantElements = CompilePalletSection(pallet.name, "constants", constants);
    const errorElements = CompilePalletSection(pallet.name, "errors", errors);
    const eventElements = CompilePalletSection(pallet.name, "events", events);
    const extrinsicElements = CompilePalletSection(pallet.name, "extrinsics", extrinsics);
    const storageElements = CompilePalletSection(pallet.name, "storage", storage);

    // Compile all elements for the given pallet
    palletData.push(
      <div key={pallet.name} style={SecondLevel}>
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

  ToggleLoading("metadataLoading", true);

  // Render
  setReturnValue(
    <div>
      <div style={ExplorerControls}>
        <input id="metaSearch" type="text" placeholder="Search Metadata" style={SearchStyle} onInput={() => Search()} /><br />
        {dropdown}
        <div id="buttonControls">
          <button style={ExpandCollapseButton} onClick={() => ExpandAll(true)}><span style={{ fontSize: "10px" }}>Expand All</span></button>
          <button style={ExpandCollapseButton} onClick={() => ExpandAll(false)}><span style={{ fontSize: "10px" }}>Collapse All</span></button>
        </div>
        <div style={{ fontSize: "10px" }}>
          <b style={PinkText}>metadata</b><b>{` ${version}`}</b>&nbsp;
          <b style={PinkText}>@polkadot/api</b><b>{` V${PolkadotJSVersion}`}</b>
        </div>
        <div id="metadataLoading" style={LoadingStatus}><b>{`Connecting to ${wsUrl}...`}</b></div>
        <div id="searchLoading" style={LoadingStatus}><b>Searching...</b></div>
        <div id="searchResults" style={LoadingStatus}><b>{`Matches: `}</b><b id="searchCount" style={PinkText}>0</b></div>
      </div>
      <b style={TopLevel}>Pallets:</b>
      {palletData}
      <br />
      <b style={TopLevel}>RPC:</b>
      {rpcs}
      <br />
      <b style={TopLevel}>Runtime:</b>
      {runtime}
    </div>
  );
}

// Format lists for a given pallet invocation
function BuildPalletItems(pallet, call, type, types) {
  // BuildPalletItems(pallet, api.tx[`${Camel(pallet.name)}`], "extrinsics", types);
  let output = [];
  if (call !== undefined && call !== null) {
    const keys = Object.keys(call).sort((a, b) => a.localeCompare(b));
    keys.forEach(key => {
      const meta = call[key].meta.toHuman();
      const description = FormatDescription(pallet.name.toLowerCase(), meta.docs.join(" "));
      const keyUpper = key.charAt(0).toUpperCase() + key.slice(1);
      let list;
      switch (type) {
        case "constants":
          const constType = types[meta.type].type.def;
          list = (
            <ul>
              <li className="searchable"><u>Description</u>: {description}</li>
              <li className="searchable"><u>API Endpoint</u>: <span style={PinkText}>{`api.consts.${Camel(pallet.name)}.${Camel(key)}`}</span></li>
              <li className="searchable"><u>Chain Value</u>: <span style={PinkText}>{`${JSON.stringify(call[key])}`}</span></li>
              <li className="searchable"><u>Chain Value Type</u>: {`(${Object.keys(constType)[0]}: ${Object.values(constType)[0]})`}</li>
            </ul>
          )
          break;
        case "errors":
          list = (
            <ul>
              <li className="searchable"><u>Description</u>: {description}</li>
              <li className="searchable"><u>API Endpoint</u>: <span style={PinkText}>{`api.errors.${Camel(pallet.name)}.${Camel(key)}`}</span></li>
            </ul>
          )
          break;
        case "events":
          list = (
            <ul>
              <li className="searchable"><u>Description</u>: {description}</li>
              <li className="searchable"><u>API Endpoint</u>: <span style={PinkText}>{`api.events.${Camel(pallet.name)}.${Camel(key)}`}</span></li>
              <li className="searchable"><u>Fields</u>: {FormatArgs(meta, "events")}</li>
            </ul>
          )
          break;
        case "extrinsics":
          list = (
            <ul>
              <li className="searchable"><u>Description</u>: {description}</li>
              <li className="searchable"><u>API Endpoint</u>: <span style={PinkText}>{`api.tx.${Camel(pallet.name)}.${Camel(key)}`}</span></li>
              <li className="searchable"><u>Parameters</u>: {FormatArgs(meta, "extrinsics")}</li>
            </ul>
          )
          break;
        case "storage":
          list = (
            <ul>
              <li className="searchable"><u>Description</u>: {description}</li>
              <li className="searchable"><u>API Endpoint</u>: <span style={PinkText}>{`api.query.${Camel(pallet.name)}.${Camel(key)}`}</span></li>
              <li className="searchable"><u>Return Type</u>: {FormatArgs(meta, "storage", types)}</li>
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
      const callDescription = FormatDescription('', childCall.description);
      let listItems;
      switch (type) {
        case "rpc":
          listItems = (
            <ul style={NoMargin}>
              <li className="searchable"><u>Description</u>: {callDescription}</li>
              <li className="searchable"><u>API Endpoint</u>: <span style={PinkText}>{`api.rpc.${key}.${methodKey}`}</span></li>
              <li className="searchable"><u>Return Type</u>: {childCall.type}</li>
              <li className="searchable"><u>Parameters</u>: {FormatArgs(childCall, "rpc")}</li>
            </ul>
          )
          break;
        case "runtime":
          listItems = (
            <ul style={NoMargin}>
              <li className="searchable"><u>Description</u>: {callDescription}</li>
              <li className="searchable"><u>API Endpoint</u>: <span style={PinkText}>{`api.call.${key}.${methodKey}`}</span></li>
              <li className="searchable"><u>Type</u>: {childCall.type}</li>
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
      <div key={key} style={SecondLevel}>
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

function BuildDocLink(pallet, method) {
  let mapped = PalletNameMappings[pallet] != undefined ? PalletNameMappings[pallet] : pallet;
  if (CommonRuntimeModules.includes(pallet)) {
    return `https://paritytech.github.io/polkadot-sdk/master/polkadot_runtime_common/${mapped}/pallet/struct.Pallet.html#method.${method}`;
  } else if (CommonParachainRuntimeModules.includes(mapped)) {
    return `https://paritytech.github.io/polkadot-sdk/master/polkadot_runtime_parachains/${mapped}/pallet/struct.Pallet.html#method.${method}`;
  } else if (pallet == "staking") {
    // not sure why this needs a special link, but oh well
    return `https://paritytech.github.io/polkadot-sdk/master/pallet_${mapped}/struct.Pallet.html#method.${method}`;
  }
  else if (mapped.startsWith("frame_")) {
    return `https://paritytech.github.io/polkadot-sdk/master/${mapped}/pallet/struct.Pallet.html#method.${method}`;

  } else {
    return `https://paritytech.github.io/polkadot-sdk/master/pallet_${mapped}/pallet/struct.Pallet.html#method.${method}`;
  }
}

// Format a description string
function FormatDescription(pallet, description) {
  let descriptionItems = description.split("`");
  let output = [];
  for (let i = 0; i < descriptionItems.length; i++) {
    if (i % 2 === 0) {
      output.push(<p key={i} style={DescriptionRegular}>{descriptionItems[i]}</p>)
    } else if (descriptionItems[i].startsWith("Pallet::")) {
      let method = descriptionItems[i].split("Pallet::")[1];
      let link = BuildDocLink(pallet, method);
      output.push(<a key={i} target="_blank" href={link} style={DescriptionHighlighting}>{descriptionItems[i]}</a>)
    } else {
      output.push(<p key={i} style={DescriptionHighlighting}>{descriptionItems[i]}</p>)
    }
  }
  return <span>{output}</span>;
}

// Extract and format arguments from metadata
function FormatArgs(item, type, types = null) {
  let params = "(";
  switch (type) {
    case "rpc":
      item.params.forEach(param => {
        params += `${param.name}: ${param.type}, `;
      })
      break;
    case "extrinsics":
      for (let i = 0; i < item.args.length; i++) {
        params += `${item.args[i].name}: ${item.args[i].type}, `
      }
      break;
    case "events":
      for (let i = 0; i < item.args.length; i++) {
        params += `${item.fields[i].typeName}: ${item.args[i]}, `
      }
      break;
    case "storage":
      const key = Object.keys(item.type)[0];
      if (key === "Plain") {
        const typeKey = item.type.Plain;
        const def = types[typeKey].type.def
        params = StorageDecoder(def, types);
      } else if (key === "Map") {
        const typeKey = item.type.Map.key;
        const def = types[typeKey].type.def
        params = StorageDecoder(def, types);
      } else {
        console.log("Unknown Storage Type");
      }
      break;
    default:
      break;
  }
  params = `${params.slice(0, -2)})`;
  if (params === "(" || params === ")") { params = "None"; }
  return params;
}

// Decode and format storage return types
function StorageDecoder(def, types) {
  let params = "(";
  const type = Object.keys(def)[0];
  switch (type) {
    case "Array":
      const length = def.Array.len;
      const arrayTypeDef = types[def.Array.type].type.def;
      const typeDefKey = Object.keys(arrayTypeDef)[0];
      const typeDefValue = arrayTypeDef[typeDefKey];
      params += `Array[${length}]: ${typeDefKey} ${typeDefValue} )`;
      break;
    case "Compact":
      params = StorageDecoder(types[def.Compact.type].type.def, types);
      break;
    case "Composite":
      def.Composite.fields.forEach((item) => {
        params = StorageDecoder(types[item.type].type.def, types);
      })
      break;
    case "Primitive":
      const primitiveType = def.Primitive;
      params += `Primitive: ${primitiveType}) `;
      break;
    case "Sequence":
      params = StorageDecoder(types[def.Sequence.type].type.def, types);
      break;
    case "Tuple":
      params += "Tuple: [ "
      def.Tuple.forEach((item) => {
        params += `${StorageDecoder(types[item].type.def, types)}, `;
      })
      params = `${params.slice(0, -2)}]  `;
      break;
    case "Variant":
      params += "Variant: "
      def.Variant.variants.forEach((variant) => {
        let fieldNames = [];
        variant.fields.forEach((field) => {
          fieldNames.push(field.typeName);
        })
        params += `{${variant.name}: [${fieldNames.join(", ")}]}, `
      });
      params = `${params.slice(0, -2)}  `;
      break;
    default:
      console.log("Unknown Decoder Type");
      break;
  }
  return params;
}

// Display loading notification
function ToggleLoading(id, hidden) {
  const el = document.getElementById(id);
  if (el !== null) {
    if (hidden === false) { el.style.display = "block"; }
    else { el.style.display = "none" };
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

// Search content
function Search() {
  ToggleLoading("searchLoading", false);
  clearTimeout(SearchThrottle);
  SearchThrottle = setTimeout(function () {
    const query = document.getElementById("metaSearch").value;
    if (query.length < 2) {
      ExpandAll(false);
      Expandable.forEach((elementId) => {
        const div = document.getElementById(elementId);
        const searchable = div.getElementsByClassName("searchable");
        for (let item of searchable) { item.style.background = "transparent"; }
      })
      ToggleLoading("searchResults", true);
    } else {
      const matcher = new RegExp(query, "gi");
      let matchCount = 0;
      Expandable.forEach((elementId) => {
        const div = document.getElementById(elementId);
        const searchable = div.getElementsByClassName("searchable");
        const button = document.getElementById(`${elementId}-button`);
        if (matcher.test(div.innerText)) {
          for (let item of searchable) {
            if (matcher.test(item.innerText)) {
              item.style.background = "#ffff00";
              matchCount += 1;
            } else { item.style.background = "transparent"; }
          }
          div.style.maxHeight = "100%";
          button.innerText = "-";
        } else {
          for (let item of searchable) { item.style.background = "transparent"; }
          div.style.maxHeight = "0px";
          button.innerText = "+";
        }
        document.getElementById("searchCount").innerText = matchCount;
      });
      ToggleLoading("searchResults", false);
    }
    ToggleLoading("searchLoading", true);
  }, 200); // Perform search after 0.2s
}

// Styling
const PinkText = { color: "#e6007a" };
const ExplorerControls = { textAlign: "center " };
const DescriptionRegular = { margin: "0px", display: "inline" };
const DescriptionHighlighting = { color: "#e6007a", margin: "0px", display: "inline", background: "#f0f0f0", paddingLeft: "5px", paddingRight: "5px" }
const TopLevelDiv = { maxHeight: "0px", overflow: "hidden" };
const CollapsedDiv = { maxHeight: "0px", overflow: "hidden", margin: "0px" };
const NoMargin = { margin: "0px" };
const DropDownStyle = { border: "1px solid #e6007a", width: "400px", height: "40px", fontSize: "16px", textAlign: "center", fontWeight: "bold", margin: "1px", cursor: "pointer" };
const ExpandCollapseButton = { border: "1px solid #e6007a", width: "199px", height: "28px", margin: "1px", fontWeight: "bold", cursor: "pointer" };
const LoadingStatus = { display: "none" };
const TreeControl = { margin: "0px", color: "#e6007a", cursor: "pointer" };
const SearchStyle = { border: "1px solid #e6007a", width: "400px", height: "40px", fontSize: "16px", textAlign: "center", margin: "1px" }
const TopLevel = { fontSize: "18px" }
const SecondLevel = { paddingLeft: "16px" }
