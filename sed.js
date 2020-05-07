const path = require('path');
const fs = require('fs');
const yargs = require('yargs')
  .boolean('n')
  .boolean('i')
  // .array('e')
  .array('f')
  .describe(
    'n',
    'consider files as separate rather than as a single, continuous long stream'
  )
  .describe('i', 'edit files in place')
  .describe(
    'e',
    'Add the commands in script to the set of commands to be run while processing the input.'
  )
  .describe(
    'f',
    'Add the commands contained in the file script-file to the set of commands to be run while processing the input.'
  )
  .help('h')
  .alias('h', 'help').argv;

// own requires
const validator = require('./src/validators');

// this variable store all the parameters in which it's not a option
const rawArgs = yargs._;
// validator needed for the minimun case needed
validator.hasEnoughParams(rawArgs);
// this variables will store pattern and filepath
let pattern, filePath;

[pattern, filePath] = rawArgs;

// in case filepath is undefined, the first  raw parameter is the path
if (!filePath) {
  filePath = rawArgs[0];
}

const absolutePath = path.resolve(filePath);

validator.isAAccesibleFile(absolutePath);

// start to readfile
fs.readFile(absolutePath, (err, data) => {
  if (err) {
    console.log('Error while reading the file');
    return;
  }
  let contentText = data.toString();
  let resultText = '';
  // options: -i, -n
  if (validator.hasTwoParams(rawArgs)) {
    // first check if the pattern is correct
    validator.isAValidPattern(pattern);

    const splittedPattern = pattern.split('/');
    const searchPattern = splittedPattern[1];
    const stringToReplace = splittedPattern[2];
    const flag = splittedPattern[3];

    const searchRegexPattern = new RegExp(searchPattern);
    resultText += contentText.replace(searchRegexPattern, stringToReplace);
    console.log(resultText);
  }
  // options: -f,-e
  else {
  }
});
