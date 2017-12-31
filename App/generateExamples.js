const espree = require('espree');
const fs = require("fs-extra");
const path = require("path");

const writeData = (destination => json => fs.writeFile(destination, JSON.stringify(json, null, 4)));
const pathOrign = path.join(__dirname,"src","Data","Examples");
const getExamplePath = file => path.join(pathOrign, file);

const OUTPUT_FILE = "src/Data/examples.json";

console.log("Starting example generation.")
fs.readdir(pathOrign)
  .then(files=> Promise.all(
    files.map(file => fs.readFile(getExamplePath(file))
      .then(code => ({name: path.basename(file,".js"), code: code.toString()}))
    )))
  .then(writeData(OUTPUT_FILE))
  .catch(err => console.error(err))
  .then(() => console.log(`Examples generated at "${OUTPUT_FILE}"`));
