const yargs = require("yargs");
const { create, globSource } = require("ipfs-http-client");
const { execSync } = require("child_process");
const cloudflare = require("cloudflare");

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
  .option("cloudflareToken", {
    alias: "cf",
    description: "required",
    type: "string",
  })
  .option("zoneId", {
    alias: "zid",
    description: "required",
    type: "string",
  })
  .help()
  .alias("help", "h").argv;

if (!argv.websiteDir || !argv.pinName || !argv.auth || !argv.cloudflareToken || !argv.zoneId) {
  throw new Error("Must pass --websiteDir, --auth, --cloudflareToken, --zoneId, and --pinName arguments.");
}

var runCommandOnCluster = async (command, retries = 6) => {
  // Note: js-cluster-api doesn't support libp2p so we have to use it via the compiled Go version via shell
  const clusterCommander = async (command) => execSync(
    `ipfs-cluster-ctl \
    --enc json \
    --basic-auth ${argv.auth} \
    --host /dns4/ipfs.w3f.community/tcp/9096/p2p/12D3KooWEGmyEGpLWN8HF2ToNX8sykBaPXTSx2BKiT4YnmAa9UKN \
    ${command} \n`,
    {
      encoding: 'utf-8',
      stdio: null,
    });
  
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
      if (retries > 0) {
        console.log("Retrying cluster command...");
        return runCommandOnCluster(command, retries - 1);
      } else {
        return error;
      }
    });
}

// return CID as string from a named pin on the cluster
const getCidByPinName = async (pinName) => {
  const pins = await runCommandOnCluster('status');
  const prevCidObject = pins.find(pin => pin.name == pinName);
  return prevCidObject ? prevCidObject.cid["/"] : null;
}


class CFClient {

  constructor(pinName, apiToken) {

    this.cf = cloudflare({
      email: "jake@web3.foundation",
      key: apiToken
    })

    this.zone = this._getZoneFromPinName(pinName);
  }

  static _getZoneFromPinName(pinName) {
    const zones = {
      "polkadot-wiki": "polkadot-wiki.w3f.community",
      "kusama-guide": "kusama-guide.w3f.community"
    }

    return zones[pinName];
  }

  async updateDNSLinkFromCID (newMultiaddr) {
    const newRecord = {
      type: "TXT",
      name: this.zone,
      content: `dnslink=/ipfs/${newMultiaddr}`,
      ttl: 120,   // seconds
    }

    try {
      const recordsList = this.cf.dnsRecords.browse(argv.zoneId);
      const existingRecord = recordList.find(record => record.name === this.zone);

      return this.cf.dnsRecords.edit({
        zone_id: argv.zoneId,
        id: existingRecord.id,
        record: newRecord,
      })
    } catch (e) {
      console.log('DNS Record does not exist:');
      console.log(record);
      console.log('Adding...');
      
      return this.cf.dnsRecords.add({
        zone_id: argv.zoneId,
        record,
      })
    }
  }
}

const main = async () => {
  const cf = new CFClient(argv.pinName, argv.cloudflareToken);  // we can derive which dns zone to use based on the pinName
  // get and unpin the previous build from the cluster, if exists
  const prevCid = await getCidByPinName(argv.pinName);
  if (prevCid) {
    await runCommandOnCluster(`pin rm ${prevCid}`);
    console.log(`Unpinned '${argv.pinName}' (CID ${prevCid}).`);
  } else {
    console.log(`No existing pin named '${argv.pinName}'.`);
  }
  
  // pin new build to cluster with new name
  console.log(`Uploading and pinning '${argv.websiteDir}' to the cluster as '${argv.pinName}'...`);
  await runCommandOnCluster(`add -r --name ${argv.pinName} ${argv.websiteDir}`);
  const cid = await getCidByPinName(argv.pinName);
  console.log(`Successfully added and pinned '${argv.pinName}' (CID ${cid}).`);
  console.log("If above values are non-null, previous errors are non-fatal.");

  await cf.updateDNSLinkFromCID(cid);  // update the

  // update DNS entry
  // https://api.cloudflare.com/#dns-records-for-a-zone-update-dns-record
  // https://github.com/cloudflare/node-cloudflare
};

try {
  main();
} catch (err) {
  throw new Error(err.toString());
}
