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

const main = async () => {
  // js-cluster-api doesn't support libp2p so we have to use go shell version...
  const runCommandOnCluster = async (command) => execSync(
    `ipfs-cluster-ctl \
    --enc json \
    --basic-auth ${argv.auth} \
    --host /dns4/ipfs.w3f.community/tcp/9096/p2p/12D3KooWMfXzp2nmNrb7DM4PETYZbaKALnrnwiqnhrvUC66KyYrb \
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
