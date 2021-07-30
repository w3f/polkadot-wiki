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
  .help()
  .alias("help", "h").argv;

if (!argv.websiteDir || !argv.pinName) {
  throw new Error("Must pass --websiteDir and --pinName arguments.");
}

const main = async () => {
  // ipfs daemon api and cluster api instances
  const ipfsDaemon = create({
    host: 'localhost',
    port: 5001,
    protocol: "http",
  });

  // js-cluster-api doesn't support libp2p so we have to use go shell version...
  // CLUSTER_BASIC_AUTH_USER and CLUSTER_BASIC_AUTH_PASSWORD should match the clusters "basic_auth_credentials" service.json value
  const runCommandOnCluster = async (command) => execSync(
    `ipfs-cluster-ctl \
    --enc json \
    --basic-auth ${process.env.CLUSTER_BASIC_AUTH_USER}:${process.env.CLUSTER_BASIC_AUTH_PASSWORD} \
    --host /dns4/hemmerle.dev/tcp/9097/p2p/12D3KooWBxH7hKkvvp2oCDay9jSh8gw5FkdBsdgPytXFjRgqDvf8 \
    ${command}`,
    { encoding: 'utf-8' });

  // return CID as string from a named pin on the cluster
  const getCidByPinName = async (pinName) => {
    const pins = JSON.parse(await runCommandOnCluster('status'));
    const prevCidObject = pins.find(pin => pin.name == pinName);
    return prevCidObject ? prevCidObject.cid["/"] : null;
  }
  
  // get and unpin the previous build from the cluster
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
};

try {
  main();
} catch (err) {
  throw new Error(err.toString());
}
