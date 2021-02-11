const IpfsHttpClient = require("ipfs-http-client");
const { globSource } = IpfsHttpClient;
const core = require('@actions/core')

const main = async () => {
  const ipfs = IpfsHttpClient({
    host: 'ipfs.komputing.org',
    port: '443',
    protocol: 'https',
    timeout: 60000 * 3}
  );
  const file = process.env.FILE
  const glob = globSource(`./website/static/${file}`);
  const result = await ipfs.add(glob, { pin: true, timeout: 60000 * 3, progress: console.log })
  const url = `https://ipfs.io/ipfs/${result.cid.toString()}?filename=${file}`
  
  core.setOutput('url', url)
  console.log(url)
}

try {
  main();
} catch (err) {
  throw new Error(err.toString());
}