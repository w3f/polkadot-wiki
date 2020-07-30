---
id: learn-crosschain
title: Cross-chain Message Passing (XCMP)
sidebar_label: Cross-chain Message Passing (XCMP)
---

Cross-chain transactions are resolved using a simple queuing mechanism based around a Merkle tree to
ensure fidelity. It is the task of the Relay Chain validators to move transactions on the output
queue of one parachain into the input queue of the destination parachain.

The input and output queue are sometimes referred to in the codebase as "ingress" and "egress"
messages.

## Overview

- Cross-chain messages will _not_ go on to the Relay Chain.
- Cross-chain messages will be constrained to a maximum size in bytes.
- Parachains are allowed to block messages from other parachains, in which case the dispatching
  parachain would be aware of this block.
- Collator nodes are responsible for routing messages between chains.
- Collators produce a list of "egress" messages and will receive the "ingress" messages from other
  parachains.
- On each block, parachains are expected to route messages from some subset of all other parachains.
- When a collator produces a new block to hand off to a validator, it will collect the latest
  ingress queue information and process it.
- Validators will check a proof that the new candidate for the next parachain block includes the
  processing of the expected ingress messages to that parachain.

## Example

A smart contract that exists on parachain A will route a message to parachain B in which another
smart contract is called that makes a transfer of some assets within that chain.

Charlie executes the smart contract on parachain A, which initiates a new cross-chain message for
the destination of a smart contract on parachain B.

The collator node of parachain A will place this new cross-chain message into its outbound messages
queue, along with a `destination` and a `timestamp`.

The collator node of parachain B routinely pings all other collator nodes asking for new messages
(filtering by the `destination` field). When the collator of parachain B makes its next ping, it
will see this new message on parachain A and add it into its own inbound queue for processing into
the next block.

Validators for parachain A will also read the outbound queue and know the message. Validators for
parachain B will do the same. This is so that they will be able to verify the message transmission
happened.

When the collator of parachain B is building the next block in its chain, it will process the new
message in its inbound queue as well as any other messages it may have found/received.

During processing, the message will execute the smart contract on parachain B and complete the asset
transfer like intended.

The collator now hands this block to the validator, which itself will verify that this message was
processed. If the message was processed and all other aspects of the block are valid, the validator
will include this block for parachain B into the Relay Chain.

Check out our interactive animation below that explores how XCMP works.

<!-- <div id="tooltip"></div> -->
<div classname="svgWrapper" id="svgWrapper">
<svg id="svg">
</svg>
<button id="nextButton" type="button" onclick="Next()">Next</button>
</div>
<script>
// var text_Data2 = [{
//     "x": 0,
//     "y": 50,
//     "text": "We want to send a message from A to B"
// }];
var text_data = [{
    "x": 40,
    "y": 85,
    "text": "A"
},
{
    "x": 240,
    "y": 85,
    "text": "B"
}];
var text_data2 = [{
    "x": 40,
    "y": 95,
    "text": "A"
},
{
    "x": 60,
    "y": 75,
    "text": "B"
},
{
    "x": 85,
    "y": 55,
    "text": "C"
},
{
    "x": 110,
    "y": 45,
    "text": "D"
},
{
    "x": 135,
    "y": 40,
    "text": "E"
},
{
    "x": 160,
    "y": 40,
    "text": "F"
},
{
    "x": 180,
    "y": 45,
    "text": "G"
},
{
    "x": 205,
    "y": 55,
    "text": "H"
},
{
    "x": 230,
    "y": 70,
    "text": "I"
},
{
    "x": 245,
    "y": 85,
    "text": "J"
}];
var circle_data = [{
        "x": 150,
        "y": 75,
        "r": 60
}];
var engressMessage_data = [{
    "x1": 210,
    "y1": 75,
    "x2": 140,
    "y2": 180
},
{
    "x1": 180,
    "y1": 60,
    "x2": 100,
    "y2": 200
},
{
    "x1": 90,
    "y1": 75,
    "x2": 100,
    "y2": 200
},
{
    "x1": 140,
    "y1": 60,
    "x2": 100,
    "y2": 200
}];
var line_data = [{
    "x1": 210,
    "y1": 75,
    "x2": 95,
    "y2": 100
},
{
    "x1": 100,
    "y1": 50,
    "x2": 205,
    "y2": 50
},
{
    "x1": 210,
    "y1": 90,
    "x2": 95,
    "y2": 100
},
{
    "x1": 200,
    "y1": 40,
    "x2": 95,
    "y2": 90
},
{
    "x1": 185,
    "y1": 30,
    "x2": 95,
    "y2": 60
},
{
    "x1": 185,
    "y1": 30,
    "x2": 95,
    "y2": 100
},
{
    "x1": 140,
    "y1": 18,
    "x2": 95,
    "y2": 100
},
{
    "x1": 100,
    "y1": 40,
    "x2": 200,
    "y2": 100
},
{
    "x1": 160,
    "y1": 18,
    "x2": 200,
    "y2": 100
},
{
    "x1": 150,
    "y1": 17,
    "x2": 180,
    "y2": 125
}];
var svg = d3.select("#svg");
// var div = d3.select("#svg").append("div")	
//     .attr("class", "tooltip")				
//     .style("opacity", 0);
var circle = svg.selectAll("circle")
    .data(circle_data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
        return d.x;
    })
    .attr("cy", function (d) {
        return d.y;
    })
    .attr("r", function (d) {
        return d.r;
    });
    var relayLines = svg.selectAll('line').data(line_data).enter().append("line")
        .attr("x1", function(d){return d.x1})
        .attr("y1", function(d){return d.y1})
        .attr("x2", function (d) { return d.x2})
        .attr("y2", function(d){return d.y2})
        .attr("style", "stroke-width:1");
    // .on("mouseover", function(d) {		
    //     div.transition()		
    //         .duration(200)		
    //         .style("opacity", .9);	
    //     div.html("hello")	
    //         .style("left", (d3.event.pageX) + "px")		
    //         .style("top", (d3.event.pageY - 28) + "px");
    // })				
    // .on("mouseout", function(d) {		
    //     div.transition()		
    //         .duration(500)		
    //         .style("opacity", 0);	
    // });
var clicks = 0;
function Next(){
    clicks += 1;
    document.getElementById("nextButton").innerHTML="Next";
    var relayLines = svg.selectAll('line').remove();
    var text = svg.selectAll('text').data(text_data).enter().append("text").transition()
        .duration(2500);
    var textLabels = text
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .text(function(d) {
            return d.text;
        });
    var lines = svg.selectAll('line').data(circle_data).enter().append("line")
        .transition()
        .duration(2500)
        .attr("x1", function(d){return d.x- d.r -20})
        .attr("y1", function(d){return d.y + 20})
        .attr("x2", function (d) { return d.x+ d.r +20})
        .attr("y2", function(d){return d.y +20});
    var circle = svg.selectAll("circle").data(circle_data)
        .transition()
        .duration(1000)
        .attr("cx", function (d) { return d.x })
        .attr("cy", function (d) { return d.y + 75 })
        .attr("r", function (d) { return d.r + 40 });
    if(clicks >= 2){
        d3.selectAll("text").remove();
        d3.selectAll("line").remove();
        var engressMessage = svg.selectAll('line').data(engressMessage_data).enter().append("line")
        .transition()
        .duration(2500)
        .attr("x1", function(d){return d.x1})
        .attr("y1", function(d){return d.y1})
        .attr("x2", function (d) { return d.x2})
        .attr("y2", function(d){return d.y2});
        document.getElementById("nextButton").innerHTML="Send Engress Message";
        var text = svg.selectAll('text').data(text_data2).enter().append("text").transition()
        .duration(2500);
         var textLabels = text
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .text(function(d) {
            return d.text;
        });
        // var text = svg.selectAll('text').data(text_Data2).enter().append("text").transition()
        //     .duration(2500);
        // var textLabels = text
        // .attr("x", function (d) {
        //     return d.x;
        // })
        // .attr("y", function (d) {
        //     return d.y;
        // })
        // .text(function(d) {
        //     return d.text;
        // });
    }
    if(clicks >= 3){
        d3.selectAll("text").remove();
        d3.selectAll("line").remove();
        document.getElementById("nextButton").innerHTML="Verify Message";
        var text = svg.selectAll('text').data(text_data).enter().append("text").transition()
        .duration(2500);
        var textLabels = text
            .attr("x", function (d) {
                return d.x;
            })
            .attr("y", function (d) {
                return d.y;
            })
            .text(function(d) {
                return d.text;
            });
        var lines = svg.selectAll('line').data(circle_data).enter().append("line")
            .transition()
            .duration(2500)
            .attr("x1", function(d){return d.x- d.r -20})
            .attr("y1", function(d){return d.y + 20})
            .attr("x2", function (d) { return d.x+ d.r +20})
            .attr("y2", function(d){return d.y +20});
    }
    if(clicks >= 4){
    }
    if(clicks >= 5){
        d3.selectAll("text").remove();
        d3.selectAll("line").remove();
        document.getElementById('nextButton').type = "reset";
        document.getElementById('nextButton').innerHTML = "Reset";
        var circle = svg.selectAll("circle").data(circle_data)
        .transition()
        .duration(1000)
        .attr("cx", function (d) { return d.x })
        .attr("cy", function (d) { return d.y })
        .attr("r", function (d) { return d.r });
        var relayLines = svg.selectAll('line').data(line_data).enter().append("line")
        .transition()
        .duration(1000)
        .attr("x1", function(d){return d.x1})
        .attr("y1", function(d){return d.y1})
        .attr("x2", function (d) { return d.x2})
        .attr("y2", function(d){return d.y2})
        .attr("style", "stroke-width:1");
    }
    if(clicks >= 6){
        clicks = 0;
        document.getElementById('nextButton').innerHTML = "Next";
    }
}
</script>
<style>
    div.tooltip {	
        position: absolute;			
        text-align: center;			
        width: 60px;					
        height: 28px;					
        padding: 2px;				
        font: 12px sans-serif;		
        background: lightsteelblue;	
        border: 0px;		
        border-radius: 8px;			
        pointer-events: none;			
    }
    line {
        stroke-width: 2;
        stroke: #E6007A;
    }
    text {
        font-family: sans-serif;
        font-size: 20px;
        fill: #B7B8BB;
    }
    circle {
        fill: #172126;
        stroke: #B7B8BB;
        stroke-width: 5;
    }
    #svgWrapper{
        background-color: #172126; 
        display:flex; 
        align-items: safe center;
        flex-direction: column; 
        height:210px;
    }
    #nextButton{
        margin-top: 5px;
        border: 1px solid #E6007A;
        border-radius: 3px;
        background-color: transparent;
        color: #E6007A;
        display: inline-block;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.2em;
        padding: 6px;
        text-decoration: none !important;
        transition: background 0.3s, color 0.3s;
        outline: none !important;
    }
    #nextButton:hover{
        transition: background 0.3s, color 0.3s;
        background-color: #E6007A;
        color: white;
        text-decoration: none !important;
    }
</style>

## Resources

- [XCMP Scheme](https://research.web3.foundation/en/latest/polkadot/XCMP.html) - Full technical
  description of cross-chain communication on the Web3 Foundation research wiki.
