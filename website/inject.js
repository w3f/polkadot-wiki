const fs = require('fs');
const path = require('path');
const replace = require('replace-in-file');
const replacements = require("./inject-dict.json");
const api = require("@polkadot/api");

const options = {
    files: [
        'build/polkadot-wiki/docs/*/*/*.html'
    ],
    from: [],
    to: []
};

async function inject() {
    const wsProvider = new api.WsProvider('wss://kusama-rpc.polkadot.io/');
    const instance = await api.ApiPromise.create({ provider: wsProvider });
    console.log("Connected");
    
    replacements.forEach(async function(replacement) {
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
}

Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
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

inject().then(function(){

    let v = setInterval(function(){
        if (options.to.length == options.from.length) {
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

});
