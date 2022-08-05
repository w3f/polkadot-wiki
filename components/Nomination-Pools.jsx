import React from 'react';
import RPC from "./RPC-Connection";

// TODO - Not yet live
const PolkadotDefaults = { };

const KusamaDefaults = {
  maxPoolMembers: 65536,
  maxPoolMembersPerPool: 16,
  maxPools: 64,
  minCreateBond: 1000000000000,
  minJoinBond: 1666666650,
  palletVersion: 1,
}

function NominationPools({network}) { 

  // Set defaults based on network
  let defaults = undefined;
  if (network === "polkadot") { defaults = PolkadotDefaults }
  else if (network === "kusama") { defaults = KusamaDefaults }
  else { return( <div/> )}

	return (
    <table>
      <tbody>
        <tr>
          <td>Max Pool Members</td>
          <td><RPC network={network} path="query.nominationPools.maxPoolMembers" defaultValue={defaults.maxPoolMembers}/></td>
        </tr>
        <tr>
          <td>Max Pool Members per Pool</td>
          <td><RPC network={network} path="query.nominationPools.maxPoolMembersPerPool" defaultValue={defaults.maxPoolMembersPerPool}/></td>
        </tr>
        <tr>
          <td>Max Pools</td>
          <td><RPC network={network} path="query.nominationPools.maxPools" defaultValue={defaults.maxPools}/></td>
        </tr>
        <tr>
          <td>Min Creation Bond</td>
          <td><RPC network={network} path="query.nominationPools.minCreateBond" defaultValue={defaults.minCreateBond} filter="humanReadable"/></td>
        </tr>
        <tr>
          <td>Min Bond to Join Pool</td>
          <td><RPC network={network} path="query.nominationPools.minJoinBond" defaultValue={defaults.minJoinBond} filter="humanReadable"/></td>
        </tr>
        <tr>
          <td>Pallet Version</td>
          <td><RPC network={network} path="query.nominationPools.palletVersion" defaultValue={defaults.palletVersion}/></td>
        </tr>
      </tbody>
    </table>
  );
}

export default NominationPools;