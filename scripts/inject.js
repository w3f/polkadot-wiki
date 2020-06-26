const replace = require('replace-in-file');
const yargs = require('yargs');
const replacements = require("./inject-dict.json");
const api = require("@polkadot/api");

const argv = yargs
    .option('node', {
        alias: 'n',
        description: 'Websocket node URL to query',
        type: 'string',
    })
    .option('dry', {
        alias: 'd',
        description: 'Dry run - check values before replacing',
        type: 'boolean',
    })
    .option("rootDir", {
        alias: "r",
        description: "root directory to find files",
        type: "string",
    })
    .help()
    .alias('help', 'h')
    .argv;

if (!argv.rootDir) { throw new Error("Must pass a --rootDir option."); }

const node = (argv.node || 'wss://kusama-rpc.polkadot.io/');
console.log("Connecting to node " + node);

let filledDict = {};

// Connect to a node
const wsProvider = new api.WsProvider(node);
api.ApiPromise.create({provider: wsProvider}).then(function (instance) {

    console.log("Connected");
    replacements.forEach(async function (replacement) {

        let chainValue = undefined;
        try {
            // Simple const retrieve
            if (replacement.path.indexOf("consts") === 0) {
                console.log("In const for " + replacement.path);
                chainValue = Object.byString(instance, replacement.path);
            }

            // Query calls
            if (replacement.path.indexOf("query") === 0) {
                console.log("In query for " + replacement.path);
                chainValue = Object.byString(instance, replacement.path);
                chainValue = await chainValue();
            }

            // Convert to human readable number if possible
            if (undefined !== chainValue.toNumber) {
                chainValue = chainValue.toNumber();
            }

        } catch (e) {}
        filledDict["{{ " + replacement.tpl + " }}"] = chainValue || replacement.default;
    });
}).catch(function(e){
    console.error("Error connecting! Check your node URL and make sure its websockets are open, secure if remote (wss), and allow RPC from all.");
    process.exit(1);
});

let v = setInterval(function () {
    if (Object.keys(filledDict).length === Object.keys(replacements).length) {
        clearInterval(v);

        // Init template options for replace-in-file
        const options = {
            files: [
                `${argv.rootDir}/docs/*/*/index.html`
            ],
            from: Object.keys(filledDict).map(el => {return new RegExp(el, 'ig')}),
            to: Object.values(filledDict)
        };

        console.log("Replacement configuration: ");
        console.log(options);

        if (!argv.dry) {
            try {
                let results = replace.sync(options);
                
                const changedFiles = results
                    .filter(result => result.hasChanged)
                    .map(result => result.file);
                console.log('Modified files:', changedFiles);

                process.exit(0);
            } catch (error) {
                console.error('Error occurred:', error);
                process.exit(1);
            }
        } else {
            console.log("Dry run complete, exiting.");
            process.exit(0);
        }
    }
}, 1000);


Object.byString = function (o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, ''); // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}