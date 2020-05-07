const fs = require('fs').promises;

const regexForPattern = /^s\/[a-zA-Z. ]+\/[a-zA-Z. ]+\/[g|p]?$/;

// check if the pattern is correct for the regex given
function isAValidPattern(pattern) {
  if (!regexForPattern.test(pattern)) {
    console.log(`pattern not valid ${pattern}`);
    return process.exit();
  }
}

function isAValidPath(filepath) {
  if (typeof filepath !== 'string') {
    console.log("it's not a valid path");
    return process.exit();
  }
}

// check if the file is readable
async function isAAccesibleFile(absolutePath) {
  try {
    const data = await fs.access(absolutePath);
  } catch (e) {
    console.log(
      "File doesn't exists or user doesn't have permissions to access to it"
    );
    return process.exit();
  }
}
// check if rawargs has at least one rawargs
function hasAtLeastOneRawArgs(rawArgs) {
  if (!(Array.isArray(rawArgs) && rawArgs.length >= 1)) {
    console.log('any parameters to operate');
    return process.exit();
  }
}

// check if rawargs has many rawargs
function hasManyRawArgs(rawArgs) {
  if (!(Array.isArray(rawArgs) && rawArgs.length <= 2)) {
    console.log('at least two parameters needed to operate');
    return process.exit();
  }
}

// check both validators into a single one
function hasEnoughParams(rawArgs) {
  hasAtLeastOneRawArgs(rawArgs);
  hasManyRawArgs(rawArgs);
}

function isValidOneParam(yargs) {
  let isValid = false;
  // option n and i: doesn't need a single pattern and file
  if (yargs.n || yargs.i) {
    isValid = false;
  }
  return isValid;
}

function hasOptionIAndF(yargs) {
  // first check if is valid for one param
  if (isValidOneParam) {
    // if it yargs containg both options is an invalid execution
    if (yargs.e && yargs.f) {
      const e = '-e';
      const f = '-f';
      console.log(`Both options ${e} ${f} are not valid together`);
      return process.exit();
    }
  }
}
// when the params are two can be used a patter and a file
function hasTwoParams(rawArgs) {
  let hasTwoParams = false;
  if (Array.isArray(rawArgs) && rawArgs.length == 2) {
    hasTwoParams = true;
  }
  return hasTwoParams;
}
module.exports = {
  isAValidPath,
  isAValidPattern,
  isAAccesibleFile,
  hasAtLeastOneRawArgs,
  hasManyRawArgs,
  isValidOneParam,
  hasOptionIAndF,
  hasEnoughParams,
  hasTwoParams,
};
