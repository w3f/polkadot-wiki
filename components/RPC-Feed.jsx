import React, { useState, useEffect } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';

function RPCFeed({children, url, color}) {
    const [block, setBlock] = useState('Loading...');

    useEffect(() => {
        // Mounting Tasks
        const unsubscribe = getData(url, setBlock);
        // Unmounting Tasks
        return () => {
            console.log('unsubscribing!');
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