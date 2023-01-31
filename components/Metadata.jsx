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

  // Fetch metadata from on-chain
  const rawMeta = await api.rpc.state.getMetadata();
  const meta = rawMeta.toHuman();
  const block = meta.magicNumber;

  // Pallets
  const pallets = meta.metadata.V14.pallets;
  pallets.sort((a, b) => a.name.localeCompare(b.name));
  let palletData = [];
  pallets.forEach(pallet => {
    // Pallet Name
    const name = <b>{pallet.name}:</b>;

    // Pallet Index 
    const index = pallet.index;

    // Pallet Calls
    let calls = pallet.calls;
    /* TODO - Decode */
    if (calls !== null && calls.hasOwnProperty('type')) { calls = <li>{`Type: ${calls.type}`}</li>; }
    else { calls = <div /> }

    // Pallet Constants
    let constants = [];
    pallet.constants.sort((a, b) => a.name.localeCompare(b.name));
    pallet.constants.forEach(constant => {
      const item = (
        <li key={constant.name}>
          {constant.name}
          <ul>
            {/* TODO - Decode */}
            <li>{`Endpoint: api.consts.${pallet.name.toLocaleLowerCase()}.${constant.name.toLocaleLowerCase()}`}</li>
            <li>{`Type: ${constant.type}`}</li>
            <li>{`Value: ${constant.value}`}</li>
            <li>{`Docs: ${constant.docs.join(' ')}`}</li>
          </ul>
        </li>
      )
      constants.push(item);
    });

    // Pallet Errors
    let errors = pallet.errors;
    /* TODO - Decode */
    if (errors !== null && errors.hasOwnProperty('type')) { errors = <li>{`Type: ${errors.type}`}</li>; }
    else { errors = <div /> }

    // Pallet Events
    let events = pallet.events;
    /* TODO - Decode */
    if (events !== null && events.hasOwnProperty('type')) { events = <li>{`Type: ${events.type}`}</li>; }
    else { events = <div /> }

    // Pallet Storage
    let storage = [];
    let storagePrefix = '';
    if (pallet.storage !== null && pallet.storage.hasOwnProperty('items')) {
      storagePrefix = pallet.storage.prefix;
      pallet.storage.items.sort((a, b) => a.name.localeCompare(b.name));
      pallet.storage.items.forEach(item => {
        const storageItem = (
          <li key={item.name}>
            {`${storagePrefix}.${item.name}`}
            <ul>
              {/* TODO - Decode */}
              <li>{`Endpoint: api.query.${storagePrefix.toLocaleLowerCase()}.${item.name.toLocaleLowerCase()}`}</li>
              <li>{`Type: ${JSON.stringify(item.type)}`}</li>
              <li>{`Modifier: ${item.modifier}`}</li>
              <li>{`Fallback: ${item.fallback}`}</li>
              <li>{`Docs: ${item.docs.join(' ')}`}</li>
            </ul>
          </li>
        )
        storage.push(storageItem);
      });
    }

    palletData.push(
      <div key={pallet.name}>
        <div>
          {name}
          <br />
          <ul>Index: {index} </ul>
          <ul>Calls: <ul>{calls}</ul> </ul>
          <ul>Constants: <ul>{constants}</ul> </ul>
          <ul>Errors: <ul>{errors}</ul> </ul>
          <ul>Events: <ul>{events}</ul> </ul>
          <ul>Storage: <ul>{storage}</ul> </ul>
        </div>
      </div>
    )
  });


  // Render
  setReturnValue(
    <div>
      <b>{`Chain: ${network.charAt(0).toUpperCase() + network.slice(1)}`}</b>
      <br />
      <b>{`Magic Number: ${block}`}</b>
      <br /><br />
      {palletData}
    </div>
  );
}

export default Metadata;