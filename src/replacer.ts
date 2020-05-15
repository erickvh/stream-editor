import { IArgv } from './interfaces/interfaces';
import { validNOption } from './types/types';

export default function getPatternResult(
  pattern: string,
  contentText: string,
  yargs: IArgv
) {
  const splittedPattern = pattern.split('/');
  const searchPattern = splittedPattern[1];
  const stringToReplace = splittedPattern[2];
  const flag = splittedPattern[3];
  let resultText: string = '';
  let searchRegexPattern: RegExp;
  //not flag options implemented case doesn't exist flag, or when exist w flag or n

  searchRegexPattern = getRegexByFlag(flag, searchPattern);

  // if flag has p option will execute the
  if (flag.includes('p')) {
    resultText = getResultPFlag(
      yargs.n,
      contentText,
      searchRegexPattern,
      stringToReplace
    );
  }
  // if it doesn't have -n option will print  an empty value for result text
  if (!yargs.n && !flag.includes('p')) {
    resultText = contentText.replace(searchRegexPattern, stringToReplace);
  }
  return resultText;
}

function getResultPFlag(
  nOption: validNOption,
  contentText: string,
  searchRegexPattern: RegExp,
  stringToReplace: string
) {
  let resultText: string;

  let lines = contentText.split('\n');
  const repeatedLines: string[] = [];
  //  if exist n will print each line with changes else  there's not print nothing
  if (nOption) {
    lines = lines.filter((line) => {
      return searchRegexPattern.test(line);
    });

    lines = lines.map((line) =>
      line.replace(searchRegexPattern, stringToReplace)
    );

    resultText = lines.join('\n');
  } else {
    lines.forEach((line) => {
      const replace: string = line.replace(searchRegexPattern, stringToReplace);
      if (searchRegexPattern.test(line)) {
        repeatedLines.push(replace);
      }
      repeatedLines.push(replace);
    });
    resultText = repeatedLines.join('\n');
  }
  return resultText;
}

function getRegexByFlag(flag: string, searchPattern: string): RegExp {
  let searchRegexPattern: RegExp;
  //multi flag support
  if (flag.includes('Ig') || flag.includes('gI')) {
    return RegExp(searchPattern, 'ig');
  }
  // only one option flag
  switch (flag) {
    case 'I':
      searchRegexPattern = new RegExp(searchPattern, 'i');
      break;
    case 'g':
      searchRegexPattern = new RegExp(searchPattern, 'g');
      break;
    default:
      searchRegexPattern = new RegExp(searchPattern);
  }
  return searchRegexPattern;
}
