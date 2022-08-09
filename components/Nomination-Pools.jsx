import React from "react";
import RPC from "./RPC-Connection";

const divStyle = {
  display: "flex",
  justifyContent: "center",
};

const tableStyle = {
  margin: "0",
  alignSelf: "center",
}

// TODO - Not yet live
const PolkadotDefaults = {};

const KusamaDefaults = {
  lastPoolId: 59,
  poolMembers: 149,
  maxPoolMembers: 65536,
  maxPoolMembersPerPool: 16,
  maxPools: 64,
  minCreateBond: 1000000000000,
  minJoinBond: 1666666650,
  minPointsToBalance: 10,
}

function NominationPools({ network }) {

  // Set defaults based on network
  let defaults = undefined;
  if (network === "polkadot") { defaults = PolkadotDefaults }
  else if (network === "kusama") { defaults = KusamaDefaults }
  else { return (<div />) }

  return (
    <div style={divStyle}>
      <table style={tableStyle}>
        <tbody style={tableStyle}>
          <tr>
            <td>Total Pools</td>
            <td><RPC network={network} path="query.nominationPools.lastPoolId" defaultValue={defaults.lastPoolId} /></td>
            <td>Max Pools</td>
            <td><RPC network={network} path="query.nominationPools.maxPools" defaultValue={defaults.maxPools} /></td>
          </tr>
          <tr>
            <td>Total Pool Members</td>
            <td><RPC network={network} path="query.nominationPools.counterForPoolMembers" defaultValue={defaults.poolMembers} /></td>
            <td>Max Pool Members</td>
            <td><RPC network={network} path="query.nominationPools.maxPoolMembers" defaultValue={defaults.maxPoolMembers} /></td>
          </tr>
          <tr>
            <td>Max Pool Members per Pool</td>
            <td><RPC network={network} path="query.nominationPools.maxPoolMembersPerPool" defaultValue={defaults.maxPoolMembersPerPool} /></td>
            <td>Min Pool Points-to-Balance Ratio</td>
            <td><RPC network={network} path="consts.nominationPools.minPointsToBalance" defaultValue={defaults.minPointsToBalance} /></td>
          </tr>
          <tr>
            <td>Min Creation Bond</td>
            <td><RPC network={network} path="query.nominationPools.minCreateBond" defaultValue={defaults.minCreateBond} filter="humanReadable" /></td>
            <td>Min Bond to Join Pool</td>
            <td><RPC network={network} path="query.nominationPools.minJoinBond" defaultValue={defaults.minJoinBond} filter="humanReadable" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default NominationPools;