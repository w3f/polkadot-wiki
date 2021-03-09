import { ApiPromise, WsProvider } from "@polkadot/api";

// A big string to put all of the output.
let output = `

## Error Table

The below table is a reference to the errors that exists in Polkadot. It 
is generated from the runtime's metadata.

|Pallet | Error | Documentation |
| - | - | - |`;

(async () => {
  const api = await ApiPromise.create({
    provider: new WsProvider("wss://rpc.polkadot.io"),
  });

  const metadata = await api.rpc.state.getMetadata();
  const inner = metadata.get('metadata');
  for (const module of inner.toJSON().V12.modules) {
    const { name, errors, index } = module;
    // skip any that don't have errors
    if (!errors.length) continue;
    output = output.concat(`\n|${name} (${index})| | |`);
    let errorIndex = 0;
    for (const error of errors) {
      const { name: errorName, documentation } = error;
      output = output.concat(`\n| |${errorName} (${errorIndex})|${documentation.join(' ')}|`);
      errorIndex = errorIndex + 1;
    }
  }

  console.log(output);
  api.disconnect();
})();
