import { useState, useEffect } from "react";
import React from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Line, Scatter } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

let gov = require('./utilities/data/opengov_root.json');

// Maps a type and props to a JSX charts.js component
function mapTypeToComponent(type, props) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );
    switch (type) {
        case 'line':
            return <Line datasetIdKey={props.datasetIdKey} data={props.data} />
        case 'scatter':
            return <Scatter datasetIdKey={props.datasetIdKey} data={props.data} />
    }
}

function Chart({ title, type }) {

    // Root Data
    const approvals = gov.map((_) => { return {x: _.time_hours, y: _.approval } });
    const support = gov.map((_) => { return { x: _.time_hours, y: _.support } });


    let props = {
        data: {
            labels: ['Approval', 'Support'],
            datasets: [{
                label: "Approval",
                data: approvals,
                backgroundColor: 'blue'
            },
            {
                label: "Support",
                data: support,
                backgroundColor: 'red'
            }
            ],
        },
    };

    let chart = mapTypeToComponent(type, props);
    return (
        <div className="App">
            <header className="App-header">
                <h2>
                    {title}
                </h2>
            </header>
            {chart}
        </div>
    );
}

export default Chart;