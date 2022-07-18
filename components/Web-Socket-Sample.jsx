import React, { useState, useEffect, useRef } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';

/*
This sample component shows how to connect to an external
web socket RPC and render the response data.

The component can be used in Docusaurus markdown
by adding the following lines anywhere within the file.

import Socket from "./../../components/Web-Socket-Sample"
{{ polkadot: <Socket url="wss://rpc.polkadot.io" color="#e6007a">Polkadot</Socket> :polkadot }}
{{ kusama: <Socket url="wss://kusama-rpc.polkadot.io" color="#000000">Kusama</Socket> :kusama }}
*/

function RPCFeed({children, url, color}) {
    const [block, setBlock] = useState('Loading...');
    let unsubscribe = useRef(null);

    useEffect(() => {
        // Mounting Tasks
        const connect = async () => {
            unsubscribe = await getData(url, setBlock);
        }
        connect();

        // Unmounting Tasks
        return () => {
            // Make sure to unsubscribe before changing pages
            console.log(`Unsubscribing from ${url}`);
            unsubscribe();
        };
    }, []);

    return (
        <span
            style={{
                backgroundColor: color,
                borderRadius: '2px',
                color: '#ffffff',
                padding: '0.5rem',
            }}
        >
            {children}: Current Block = {block}
        </span>
    )
}

async function getData(url, setBlock) {
    // Connect
    const wsProvider = new WsProvider(url);
    const api = await ApiPromise.create({ provider: wsProvider });

    // Subscribe to all new headers
    const unsubscribe = await api.derive.chain.subscribeNewHeads((header) => {
        setBlock(header.number.toString());
    });

    return unsubscribe;
}

export default RPCFeed;