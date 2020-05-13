import { promises, access } from 'fs';
import { IArgv } from './interfaces/interfaces';
import { validEOption } from './types/types';

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
    await promises.access(absolutePath);
  } catch (e) {
    console.error(
      "File doesn't exists or user doesn't have permissions to access to it"
    );
    process.exit();
  }
}
// check if rawargs has at least one rawargs
export function hasAtLeastOneRawArgs(rawArgs: string[]): void {
  if (!(Array.isArray(rawArgs) && rawArgs.length >= 1)) {
    console.error('Any parameters to operate');
    process.exit();
  }
}

// check if rawargs has many rawargs
export function hasManyRawArgs(rawArgs: string[]): void {
  if (!(Array.isArray(rawArgs) && rawArgs.length <= 3)) {
    console.error('at least three parameters needed to operate');
    process.exit();
  }
}

export function isFirstParamPattern(rawArgs: string[]): boolean {
  let isFirstParamPattern = false;
  if (regexForPattern.test(rawArgs[0])) {
    isFirstParamPattern = true;
  }
  return isFirstParamPattern;
}

// check both validators into a single one
export function hasEnoughParams(rawArgs: string[]): void {
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

// when the params are two can be used a patter and a file
export function hasTwoParams(rawArgs: string[]): boolean {
  let hasTwoParams = false;
  if (Array.isArray(rawArgs) && rawArgs.length == 2) {
    hasTwoParams = true;
  }
  return hasTwoParams;
}

export function hasAValidFlag(rawArgs: string[]) {
  const splittedArg = rawArgs[0].split('/');
  const checklast = splittedArg[splittedArg.length - 1];
  const availableFlags: [string, string, string, string] = ['I', 'p', 'g', 'w'];
  // if it has the 4 splitted has a flag
  if (splittedArg.length === 4 && checklast) {
    if (!availableFlags.includes(checklast)) {
      console.error('It should have a valid flag');
      process.exit();
    }
  }
}

export function hasWFlag(rawArgs: string[]): boolean {
  const splittedArg = rawArgs[0].split('/');
  let checklast = splittedArg[splittedArg.length - 1];
  if (checklast === 'w' && splittedArg.length == 4 && checklast) {
    return true;
  }
  return false;
}

export function optionEHasNumber(eValue: validEOption): void {
  if (eValue) {
    const hasSomeNumber = eValue.some((value) => {
      typeof value == 'number';
    });

    if (hasSomeNumber) {
      console.error('Has at least one number param for -e option');
      process.exit();
    }
  }
}
