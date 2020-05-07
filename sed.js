const path = require('path');
const fs = require('fs');
const yargs = require('yargs')
  .boolean('n')
  .boolean('i')
  .array('e')
  .string('f')
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
const replacer = require('./src/replacer');

// this variable store all the parameters in which it's not a option
const rawArgs = yargs._;
// validator needed for the minimun case needed
validator.hasEnoughParams(rawArgs);
// this variables will store pattern and filepath
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
  // this variable catch the initial data, and transform into a new result on each call
  let contentText = data.toString();
  // options: -i, -n
  if (validator.hasTwoParams(rawArgs)) {
    // first check if the pattern is correct
    validator.isAValidPattern(pattern);
    contentText = replacer.getPatternResult(pattern, contentText);
  }
  // options: -f,-e,-i,-n
  else {
    if (Array.isArray(yargs.e)) {
      const patterns = yargs.e;
      for (pattern of patterns) {
        validator.isAValidPattern(pattern);
        contentText = replacer.getPatternResult(pattern, contentText);
      }
    }
    if (typeof yargs.f === 'string') {
      let patterns;
      // this catch if the file has an error
      try {
        // split each line as a pattern
        patterns = fs.readFileSync(yargs.f, 'utf8').split('\r\n');
      } catch (e) {
        console.log('Script file does not exist');
        return process.exit();
      }
      for (pattern of patterns) {
        validator.isAValidPattern(pattern);
        contentText = replacer.getPatternResult(pattern, contentText);
      }
    }
  }
  // at the end this can be done with -i and show on screen it's not needed
  if (yargs.i) {
    fs.writeFileSync(absolutePath, contentText);
  } else {
    console.log(contentText);
  }
});
