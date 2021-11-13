// Required imports
const { ApiPromise, WsProvider } = require('@polkadot/api');

// replace hours with user input
const hours = 1.5;

// Time info
const hoursToSeconds = hours * 60 * 60;
const blockTimeInSeconds = 6;

const getProvider = async () => {
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
};

const calculateNewBlockHeight = async () => {
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

  // calculate new block height after some time
  const getBlockHeightFromTime = (currBlockHeight) => {
    const newBlockHeight = hoursToSeconds / blockTimeInSeconds + currBlockHeight;
    return newBlockHeight;
  };

  return getBlockHeightFromTime(number.toNumber());
};

const main = async () => {
  const provider = await getProvider();
  console.log(' Getting new block height...');
  const blockHeight = await calculateNewBlockHeight();
  return blockHeight;
};

main()
  .then((res) => console.log(`In ${hours} hours, the chain will be at block height #${res}`))
  .catch(console.error)
  .finally(() => process.exit(0));
