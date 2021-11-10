// Required imports
const { ApiPromise, WsProvider } = require('@polkadot/api');

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

async function calculate() {
  // Initialise the provider to connect to the polkadot rpc
  const provider = new WsProvider('wss://rpc.polkadot.io');

  // Create the API and wait until ready
  const api = await ApiPromise.create({ provider });

  const now = await api.query.timestamp.now();

  // Subscribe to the new headers on-chain. The callback is fired when new headers
  // are found, the call itself returns a promise with a subscription that can be
  // used to unsubscribe from the newHead subscription
  const getBlockHeightFromTime = await api.rpc.chain.subscribeNewHeads((header) => {
    console.log(`Chain is at currently block: #${header.number} at ${now}`);
    
    // TODO: take in user input
    const hours = 1;
    const hoursToSeconds = hours * 60 * 60;
    const blockTimeInSeconds = 6;
    const newBlockHeight = hoursToSeconds / blockTimeInSeconds + header.number.toNumber();
    console.log(`In ${hours} hours, the chain will be at block height ${newBlockHeight}`);
    return newBlockHeight;
  });
  return getBlockHeightFromTime();
}

getProvider().catch(console.error);

// TODO: exits before promise returns
calculate().catch(console.error);
//   .finally(() => process.exit());
