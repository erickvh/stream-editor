import { IArgv } from './interfaces/interfaces';

export default function getPatternResult(
  pattern: string,
  contentText: string,
  yargs: IArgv
) {
  const splittedPattern = pattern.split('/');
  const searchPattern = splittedPattern[1];
  const stringToReplace = splittedPattern[2];
  const flag = splittedPattern[3];
  let resultText = '';
  let searchRegexPattern: RegExp;
  //not flag options implemented case doesn't exist flag, or when exist w flag or n

  switch (flag) {
    case 'I':
      searchRegexPattern = new RegExp(searchPattern, 'i');
      break;
    case 'g':
      searchRegexPattern = new RegExp(searchPattern, 'g');
      break;
    case 'p': {
      searchRegexPattern = new RegExp(searchPattern);
      resultText = getResultPFlag(
        yargs,
        contentText,
        searchRegexPattern,
        stringToReplace
      );
    }
    default:
      searchRegexPattern = new RegExp(searchPattern);
  }

  if (!yargs.n) {
    resultText = contentText.replace(searchRegexPattern, stringToReplace);
  }
  return resultText;
}

function getResultPFlag(
  yargs: IArgv,
  contentText: string,
  searchRegexPattern: RegExp,
  stringToReplace: string
) {
  let resultText: string;

  if (yargs.n) {
    let lines = contentText.split('\n');
    lines = lines.filter((line) => {
      return searchRegexPattern.test(line);
    });
    lines = lines.map((line) =>
      line.replace(searchRegexPattern, stringToReplace)
    );
    resultText = lines.join('\n');
  } else {
    resultText = '';
  }
  return resultText;
}
