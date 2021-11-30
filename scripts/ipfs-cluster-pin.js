const yargs = require("yargs");
const { create, globSource } = require("ipfs-http-client");
const { execSync } = require("child_process");

const argv = yargs(process.argv)
  .option("websiteDir", {
    alias: "d",
    description: "root directory to find files",
    type: "string",
  })
  .option("pinName", {
    alias: "n",
    description: "required. eg. polkadot-wiki",
    type: "string",
  })
  .option("auth", {
    alias: "a",
    description: "required. eg. asdf:1234",
    type: "string",
  })
  .help()
  .alias("help", "h").argv;

if (!argv.websiteDir || !argv.pinName || !argv.auth) {
  throw new Error("Must pass --websiteDir, --auth, and --pinName arguments.");
}

var runCommandOnCluster = async (command, retries = 3) => {
  // Note: js-cluster-api doesn't support libp2p so we have to use it via the compiled Go version via shell
  const clusterCommander = async (command) => execSync(
    `ipfs-cluster-ctl \
    --enc json \
    --basic-auth ${argv.auth} \
    --host /dns4/ipfs.w3f.community/tcp/9096/p2p/12D3KooWMfXzp2nmNrb7DM4PETYZbaKALnrnwiqnhvrUC66KyYrb \
    ${command} \n`,
    { encoding: 'utf-8' });
  
  return clusterCommander(command).then(
    (result) => {
      try {
        return JSON.parse(result);
      } catch (err) {
        // https://github.com/ipfs/ipfs-cluster/issues/1365
        console.log("Could not parse IPFS Cluster JSON response. This is not fatal.");
        return null;
      }
    },
    (error) => {
      return retries ? runCommandOnCluster(command, retries - 1) : error;
    });
}

// return CID as string from a named pin on the cluster
const getCidByPinName = async (pinName) => {
  const pins = await runCommandOnCluster('status');
  const prevCidObject = pins.find(pin => pin.name == pinName);
  return prevCidObject ? prevCidObject.cid["/"] : null;
}

const main = async () => {
  // get and unpin the previous build from the cluster, if exists
  const prevCid = await getCidByPinName(argv.pinName);
  if (prevCid) {
    await runCommandOnCluster(`pin rm ${prevCid}`);
    console.log(`Unpinned '${argv.pinName}' (CID ${prevCid}).`);
  } else {
    console.log(`No existing pin named '${argv.pinName}'.`);
  }
  
  // pin new build to cluster with new name
  console.log(`Uploading and pinning '${argv.websiteDir}' to the cluster as '${argv.pinName}'...`)
  await runCommandOnCluster(`add -r --name ${argv.pinName} ${argv.websiteDir}`);
  const cid = await getCidByPinName(argv.pinName);
  console.log(`Successfully added and pinned '${argv.pinName}' (CID ${cid}).`);

  // update DNS entry
};

try {
  main();
} catch (err) {
  throw new Error(err.toString());
}
