function getPatternResult(pattern, contentText, yargs) {
  const splittedPattern = pattern.split('/');
  const searchPattern = splittedPattern[1];
  const stringToReplace = splittedPattern[2];
  const flag = splittedPattern[3];
  let resultText = '';
  let searchRegexPattern;
  //not flag options implemented case doesn't exist flag, or when exist w flag or n
  if (!flag || flag === 'w') {
    searchRegexPattern = new RegExp(searchPattern);
  } else {
    switch (flag) {
      case 'I':
        searchRegexPattern = new RegExp(searchPattern, 'i');
        break;
      case 'g':
        searchRegexPattern = new RegExp(searchPattern, 'g');
        break;
      case 'p': {
        searchRegexPattern = new RegExp(searchPattern);

        if (yargs.n) {
          lines = contentText.split('\n');
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
      }
    }
  }
  if (!yargs.n) {
    resultText = contentText.replace(searchRegexPattern, stringToReplace);
  }
  return resultText;
}

module.exports = {
  getPatternResult,
};
