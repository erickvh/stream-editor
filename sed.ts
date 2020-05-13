import { resolve } from 'path';
import { writeFileSync, readFileSync, readFile } from 'fs';
import yargs from 'yargs';
import { IArgv } from './src/interfaces/interfaces';
// own requires
import {
  hasEnoughParams,
  hasAValidFlag,
  isFirstParamPattern,
  hasWFlag,
  isAAccesibleFile,
  hasTwoParams,
  isAValidPattern,
  optionEHasNumber,
} from './src/validators';

import getPatternResult from './src/replacer';

const argv: IArgv = yargs
  .options({
    n: { type: 'boolean' },
    i: { type: 'boolean' },
    f: { type: 'string' },
    e: { type: 'array' },
  })
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

// this variable store all the parameters in which it's not a option
const rawArgs = argv._;

// validator needed for the minimun case needed
hasEnoughParams(rawArgs);
// check if it has flags or is a valid flag
hasAValidFlag(rawArgs);
// check if -e option contains at least an element number
optionEHasNumber(argv.e);

// this variables will store pattern and filepath
let filePath: string, pattern: string, wfile: string;

// in case filepath is undefined, the first  raw parameter is the path
if (!isFirstParamPattern(rawArgs)) {
  filePath = rawArgs[0];
} else {
  pattern = rawArgs[0];
  // when it has flag w, need to have three files
  if (hasWFlag(rawArgs)) {
    if (rawArgs.length !== 3) {
      console.error('It should have 3 params at leats');
      process.exit();
    }
    // once it has three params is a valid w flag
    wfile = rawArgs[1];
    filePath = rawArgs[2];
  } else {
    // in case is not a flag so can be filepath as second argument raw
    filePath = rawArgs[1];
  }
}

const absolutePath = resolve(filePath);
isAAccesibleFile(absolutePath);

// start to readfile
readFile(absolutePath, (err, data) => {
  if (err) {
    console.log('Error while reading the file');
    return;
  }
  // this variable catch the initial data, and transform into a new result on each call
  let contentText = data.toString();
  // options: -i, -n
  if (hasTwoParams(rawArgs) || wfile) {
    // first check if the pattern is correct
    isAValidPattern(pattern);
    contentText = getPatternResult(pattern, contentText, argv);
    const splittedPattern = pattern.split('/');
    const flag = splittedPattern[3];
    // in case exist wfile has w flag
    if (wfile) {
      writeFileSync(wfile, contentText);
    }
  }
  // options: -f,-e,-i,-n
  else {
    if (Array.isArray(argv.e)) {
      const patterns: string[] = <string[]>argv.e;
      for (pattern of patterns) {
        isAValidPattern(pattern);
        contentText = getPatternResult(pattern, contentText, argv);
      }
    }
    if (typeof argv.f === 'string') {
      let patterns;
      // this catch if the file has an error
      try {
        // split each line as a pattern
        patterns = readFileSync(argv.f, 'utf8').split('\r\n');
      } catch (e) {
        console.log('Script file does not exist');
        return process.exit();
      }
      for (pattern of patterns) {
        isAValidPattern(pattern);
        contentText = getPatternResult(pattern, contentText, argv);
      }
    }
  }
  // at the end this can be done with -i and show on screen it's not needed
  if (argv.i) {
    writeFileSync(absolutePath, contentText);
  } else {
    console.log(contentText);
  }
});
