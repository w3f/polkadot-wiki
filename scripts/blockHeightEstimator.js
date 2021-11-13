// Required imports
const { ApiPromise, WsProvider } = require('@polkadot/api');

// Time info
const hours = 1.5;
const hoursToSeconds = hours * 60 * 60;
const blockTimeInSeconds = 6;

async function getProvider() {
  // Initialise the provider to connect to the polkadot rpc
  const provider = new WsProvider('wss://rpc.polkadot.io');

  // Create the API and wait until ready
  const api = await ApiPromise.create({ provider });

  // Retrieve the chain & node information information via rpc calls
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
  ]);

  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
}

async function calculateNewBlockHeight() {
  // Initialise the provider to connect to the polkadot rpc
  const provider = new WsProvider('wss://rpc.polkadot.io');

  // Create the API and wait until ready
  const api = await ApiPromise.create({ provider });

  // Get current time
  const now = await api.query.timestamp.now();
  const dateTimeObj = new Date(now.toNumber());

  // Get block number at now
  const { number } = await api.rpc.chain.getHeader();
  console.log(`Chain is at currently block: #${number} at ${dateTimeObj.toString()}`);

  const getBlockHeightFromTime = (currBlockHeight) => {
    // TODO: take in user input
    const newBlockHeight = hoursToSeconds / blockTimeInSeconds + currBlockHeight;
    return newBlockHeight;
  };
  return getBlockHeightFromTime(number.toNumber());
}

async function main() {
  const provider = await getProvider();
  console.log(" Getting new block height...");
  const blockHeight = await calculateNewBlockHeight();
  return blockHeight;
}

main()
  .then((res) => console.log(`In ${hours} hours, the chain will be at block height #${res}`))
  .catch(console.error)
  .finally(() => process.exit(0));
