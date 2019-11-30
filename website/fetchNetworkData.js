const { ApiPromise, WsProvider } = require('@polkadot/api');
const fs = require('fs');

const filename = 'networkData.json' || process.env.NETWORK_DATA_FILE_NAME;
const KSM_DECIMAL = 1000000000000;
let numOfProposal, numOfValidator, totalIssuance;

(async function () {
  // Initialise the provider to connect to the local node
  const provider = new WsProvider('wss://kusama-rpc.polkadot.io/');

  // Create the API and wait until ready
  const api = await ApiPromise.create({ provider });

  // Retrieve the chain & node information information via rpc calls
  [numOfProposal, numOfValidator, totalIssuance] = await Promise.all([
    api.query.treasury.proposalCount(),
    api.query.staking.validatorCount(),
    api.query.balances.totalIssuance(),
  ]);

  processData();
  process.exit();
  
})();

const processData = () => {
  const totalKSM =  parseInt(totalIssuance.toString()) / KSM_DECIMAL;
  const data = {
    proposalCount: numOfProposal.toString(),
    validatorCount: numOfValidator.toString(),
    totalIssuance: totalKSM.toString()
  }

  const json = JSON.stringify(data)

  try {
    // Write those fetched data to the file
    fs.writeFileSync(filename, json)
    console.log('Successfully wrote data to the file')
  } catch(err) {
     // An error occurred
    console.error('Error writing network data to the file', err)
  }
}
