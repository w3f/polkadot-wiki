import IpfsHttpClient, { globSource } from "ipfs-http-client";
import path from "path";

const main = async () => {
  const ipfs = IpfsHttpClient({
    host: "ipfs.komputing.org",
    port: "443",
    protocol: "https",
    timeout: 60000 * 3,
  });

  const root = path.basename("./build");
  console.log(root);

  const glob = globSource("./build", { recursive: true });
  for await (const file of ipfs.add(glob, {
    pin: true,
    timeout: 60000 * 3,
    progress: console.log,
  })) {
    console.log(file);
  }
};

try {
  main();
} catch (err) {
  throw new Error(err.toString());
}
