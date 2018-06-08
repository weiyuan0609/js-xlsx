const engine = require('./engine.js');

var fs = require("fs");
var contents = fs.readFileSync("./data.json");
var data = JSON.parse(contents);
// console.log(data);

engine(data);