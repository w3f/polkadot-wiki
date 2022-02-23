// Required imports
const { ApiPromise, WsProvider } = require('@polkadot/api');

// Time Constants
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const DEFAULT_BLOCK_TIME = 6000;

const getProvider = async () => {
  // Initialise the provider to connect to the polkadot rpc
  const provider = new WsProvider('wss://rpc.polkadot.io');

  // Create the API and wait until ready
  const api = await ApiPromise.create({ provider });
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
  ]);

  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);

  return api;
};

const convertDateToSeconds = (date: {
  month: number;
  day: number;
  year: number;
  hour: number;
  minute: number;
  second: number;
}) => {
  const dateFromAPI = `${date.month} ${date.day} ${date.year} ${date.hour}:${date.minute}:${date.second}`;
  // const now = await api.query.timestamp.now();
  const now = new Date();
  const datefromAPITimeStamp = new Date(dateFromAPI).getTime();
  const nowTimeStamp = now.getTime();

  const milliSecondsDiff = datefromAPITimeStamp - nowTimeStamp;

  // Math.round is used instead of Math.floor to account for certain DST cases
  // Number of milliseconds per day =
  //   60 minutes/hour * 60 seconds/minute * 1000 ms/second
  const seconds = Math.round(milliSecondsDiff / 1000);

  return seconds;
};

const parseDate = (date: string) => {
  const time = date.split(' ')[1];
  return {
    year: parseInt(date.split('-', 1)[0]),
    month: parseInt(date.split('-', 2)[1]),
    day: parseInt(date.split('-', 3)[2]),
    hour: parseInt(time.split(':', 1)[0]),
    minute: parseInt(time.split(':', 2)[1]),
    second: parseInt(time.split(':', 3)[2]),
  };
};

async function calculateNewBlockHeight<T extends number | null>(
  seconds: T,
  api: any,
  blockTime: number
): Promise<number | Error | null> {
  if (typeof seconds == null) {
    return Error('date is null');
  }
  try {
    const [chain] = await Promise.all([api.rpc.system.chain()]);
    // Get current time
    const now = await api.query.timestamp.now();
    const dateTimeObj = new Date(now.toNumber());

    // Get block number at now
    const { number } = await api.rpc.chain.getHeader();
    console.log(
      `${chain} is currently at block: #${number} at ${dateTimeObj.toLocaleDateString()} ${dateTimeObj.toLocaleTimeString()}`
    );

    return getBlockHeightFromTime(number.toNumber(), seconds as number, blockTime);
  } catch (err) {
    console.error(err);
    return null;
  }
}

const getBlockHeightFromTime = (currBlockHeight: number, seconds: number, blockTime: number) => {
  const blockTimeInSeconds = blockTime / 1000;
  const newBlockHeight = Math.round(seconds / blockTimeInSeconds + currBlockHeight);
  return newBlockHeight;
};

export const driver = async (dateOrHours: string, blockTime: number) => {
  // * blockTime is in ms; dateOrHours in form YEAR-MONTH-DAY HR:MIN:SEC (****-**-** **:**:**)
  console.log('Getting new block height...');
  let seconds: string | number | null = null;
  if (dateOrHours.includes('-')) {
    seconds = convertDateToSeconds(parseDate(dateOrHours));
  } else {
    seconds = parseInt(dateOrHours) * MINUTES_IN_HOUR * SECONDS_IN_MINUTE;
  }
  const api = await getProvider();
  // * If not blockTime is provided, use 6000 ms
  const blockHeight = await calculateNewBlockHeight(seconds, api, blockTime || DEFAULT_BLOCK_TIME);
  return blockHeight;
};

// * TEST
// log to console the new block height, return as number, and exit
// pass in as date (MONTH/DAY/YEAR HR/MIN) or hours (number as string)
// driver(userInput)
//   .then((res) => {
//     if (userInput.includes('/')) {
//       console.log(`At ${formattedUserInput}, the chain will be around block height #${res}`);
//     } else {
//       console.log(
//         `In ${userInput} ${
//           parseInt(userInput) == 1 ? 'hour' : 'hours'
//         }, the chain will be around block height #${res}`
//       );
//     }
//     return res;
//   })
//   .catch(console.error)
//   .finally(() => process.exit(0));
