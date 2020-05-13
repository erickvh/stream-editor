import { promises, access } from 'fs';
import { IArgv } from './interfaces/interfaces';

const regexForPattern: RegExp = /^s\/[a-zA-Z. ]+\/[a-zA-Z. ]+\/[g|p|I|w]?$/;

// check if the pattern is correct for the regex given
export function isAValidPattern(pattern: string) {
  if (!regexForPattern.test(pattern)) {
    console.error(`pattern not valid ${pattern}`);
    return process.exit();
  }
}

// check if the file is readable
export async function isAAccesibleFile(absolutePath: string) {
  try {
    const data = await promises.access(absolutePath);
  } catch (e) {
    console.error(
      "File doesn't exists or user doesn't have permissions to access to it"
    );
    return process.exit();
  }
}
// check if rawargs has at least one rawargs
export function hasAtLeastOneRawArgs(rawArgs: string[]) {
  if (!(Array.isArray(rawArgs) && rawArgs.length >= 1)) {
    console.error('any parameters to operate');
    return process.exit();
  }
}

// check if rawargs has many rawargs
export function hasManyRawArgs(rawArgs: string[]) {
  if (!(Array.isArray(rawArgs) && rawArgs.length <= 3)) {
    console.error('at least three parameters needed to operate');
    return process.exit();
  }
}

export function isFirstParamPattern(rawArgs: string[]) {
  let isFirstParamPattern = false;
  if (regexForPattern.test(rawArgs[0])) {
    isFirstParamPattern = true;
  }
  return isFirstParamPattern;
}

// check both validators into a single one
export function hasEnoughParams(rawArgs: string[]) {
  hasAtLeastOneRawArgs(rawArgs);
  hasManyRawArgs(rawArgs);
}

export function isValidOneParam(yargs: IArgv) {
  let isValid = false;
  // option n and i: doesn't need a single pattern and file
  if (yargs.n || yargs.i) {
    isValid = false;
  }
  return isValid;
}

export function hasOptionIAndF(yargs: IArgv) {
  // first check if is valid for one param
  if (isValidOneParam(yargs)) {
    // if it yargs containg both options is an invalid execution
    if (yargs.e && yargs.f) {
      const e = '-e';
      const f = '-f';
      console.error(`Both options ${e} ${f} are not valid together`);
      return process.exit();
    }
  }
}
// when the params are two can be used a patter and a file
export function hasTwoParams(rawArgs: string[]) {
  let hasTwoParams = false;
  if (Array.isArray(rawArgs) && rawArgs.length == 2) {
    hasTwoParams = true;
  }
  return hasTwoParams;
}

export function hasAValidFlag(rawArgs: string[]) {
  const splittedArg = rawArgs[0].split('/');
  let checklast = splittedArg[splittedArg.length - 1];
  const availableFlags = ['I', 'p', 'g', 'w'];
  // if it has the 4 splitted has a flag
  if (splittedArg.length === 4 && checklast) {
    if (!availableFlags.includes(checklast)) {
      console.error('it should have a valid flag');
      return process.exit();
    }
  }
}

export function hasWFlag(rawArgs: string[]) {
  const splittedArg = rawArgs[0].split('/');
  let checklast = splittedArg[splittedArg.length - 1];
  if (checklast === 'w' && splittedArg.length == 4 && checklast) {
    return true;
  }
  return false;
}
