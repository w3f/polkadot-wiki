const replace = require('replace-in-file');
const replacements = require("./inject-dict.json");
const api = require("@polkadot/api");

// Init template options for replace-in-file
const options = {
    files: [
        'build/polkadot-wiki/docs/*/*/*.html'
    ],
    from: [],
    to: []
};

/**
 * Process input args
 * 
 * args[0]: node URL, must be websocket URL
 */
const args = process.argv.slice(2);
const node = (undefined !== args[0]) ? args[0] : 'wss://kusama-rpc.polkadot.io/';
console.log("Connecting to node " + node);

// Connect to a node
const wsProvider = new api.WsProvider(node);
api.ApiPromise.create({provider: wsProvider}).then(function (instance) {

    console.log("Connected");
    replacements.forEach(async function (replacement) {
        options.from.push("/{{ " + replacement.tpl + " }}/g");

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

        console.log(chainValue);
        options.to.push(chainValue || replacement.default);
    });
}).catch(function(e){
    console.error("Error connecting! Check your node URL and make sure its websockets are open, secure if remote (wss), and allow RPC from all.");
    process.exit(1);
});



let v = setInterval(function () {
    if (options.to.length == options.from.length && options.to.length > 0) {
        clearInterval(v);
        console.log("Replacement configuration: ");
        console.log(options);

        try {
            let results = replace.sync(options);
            const changedFiles = results
                .filter(result => result.hasChanged)
                .map(result => result.file);
            console.log('Modified files:', changedFiles);
            process.exit(0);
        } catch (error) {
            console.error('Error occurred:', error);
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