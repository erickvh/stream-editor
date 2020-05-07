const path = require('path');
const fs = require('fs');
const yargs = require('yargs')
  .boolean('n')
  .boolean('i')
  .array('e')
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
  .help('h').argv;

const raw_args = yargs._;

const pattern = raw_args[0];
const filePath = raw_args[1];

const regexForPattern = /^s\/[a-zA-Z. ]+\/[a-zA-Z. ]+\/[g|p]?$/;
const absolutePath = path.resolve(filePath);

if (!regexForPattern.test(pattern)) {
  console.log(`Command not valid: ${command}`);
  return process.exit();
}

fs.access(absolutePath, (err, data) => {
  if (err) {
    console.log(
      "The file doesn't exist or the user don't have permissions to read the file"
    );
    return;
  }
  fs.readFile(absolutePath, (err, data) => {
    if (err) {
      console.log('Error while reading the file');
      return;
    }
    let lines = data.toString().split('\n');
    const splittedPattern = pattern.split('/');
    const searchPattern = splittedPattern[1];
    const stringToReplace = splittedPattern[2];

    const searchRegexPattern = new RegExp(searchPattern);

    lines = lines.map((line) => line.replace(searchPattern, stringToReplace));

    for (line of lines) {
      console.log(line);
    }
  });
});
