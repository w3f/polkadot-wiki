let fs = require('fs');

let test = {
  sample: []
};

test.sample.push({ polkadot: 1, kusama:2 });

let json = JSON.stringify(test);

fs.writeFile('auctions-sample.json', json, 'utf8', callback);

fs.readFile('auctions-sample.json', 'utf8', function readFileCallback(err, data){
  if (err){
    console.log(err);
  } else {
  test = JSON.parse(data);
  test.sample.push({ westend: 3 });
  json = JSON.stringify(test); //convert it back to json
  fs.writeFile('auctions-sample.json', json, 'utf8', callback);
}});

function callback() {
  console.log("Done writing");
}