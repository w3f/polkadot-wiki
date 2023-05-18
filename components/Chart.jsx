import React from "react";
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

import openGovVariables from "./utilities/openGovVariables";

// Maps a type and props to a JSX charts.js component
function mapTypeToComponent(type, key) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );
    // Configure props using data
    let props = configureProps(key);
    ChartJS.defaults.font.size = 18;
    switch (type) {
        case 'line':
            return <Line datasetIdKey={props.datasetIdKey} data={props.data} options={props.options} />
        case 'scatter':
            return <Scatter datasetIdKey={props.datasetIdKey} data={props.data} options={props.options} />
    }
}

function configureProps(key) {
    let govData = openGovVariables[key];

    const approvals = govData.map((_) => { return { x: _.time_hours, y: _.approval } });
    const support = govData.map((_) => { return { x: _.time_hours, y: _.support } });

    const props = {
        data: {
            labels: ['Approval', 'Support'],
            datasets: [{
                label: "Approval",
                data: approvals,
                backgroundColor: '#D3FF33'
            },
            {
                label: "Support",
                data: support,
                backgroundColor: '#56F39A'
            }
            ],
        },
        options: {
            animation: false,
            normalized: true,
            parsing: false,
            scales: {
                y: {
                    type: 'linear',
                    min: 0,
                    max: 100,
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, ticks) {
                            return  `${value}%`;
                        }
                    }

                },
                x: {
                    type: 'linear',
                    min: 0,
                    max: 300,
                    title: {
                        display: true,
                        text: "Hours",
                    },
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        title: function (context) {
                            return `Hour: ${context[0].label}`;
                        },
                        label: function (context) {
                            return `${context.dataset.label}: ${context.parsed.y}%`;
                        }
                    }
                }
            }
        }
    };

    // Return props
    return props;
}

function Chart({ title, type, dataId }) {
    let chart = mapTypeToComponent(type, dataId);
    return (
        <div className="App">
            <header className="App-header">
                <h3>
                    {title}
                </h3>
            </header>
            {chart}
        </div>
    );
}

export default Chart;