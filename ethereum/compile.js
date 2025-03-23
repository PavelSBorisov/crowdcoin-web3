const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// Path to build folder
const buildPath = path.resolve(__dirname, 'build');
// Remove build folder
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

// Compile the contract
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

// Write the output to the build folder
for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}
